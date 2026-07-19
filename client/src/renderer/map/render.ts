import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './regions.js';
import { MAP_LOCATIONS, type MapLocation } from './locations.js';
import { clamp, clamp01, seeded, catmullRomPath, polygonCentroid } from './geometry.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const SURFACE_VIEWBOX = { width: 1200, height: 1050 };
const UNDERGROUND_VIEWBOX = { width: 1200, height: 800 };

type Layer = 'surface' | 'underground';
type Category = MapLocation['category'];
type Role = 'location' | 'boss';

// Grouping for the two filter checkboxes. Evergaol + Great Enemy are the
// only boss-type pins we place today; legacy/minor dungeon *bosses* (the
// thing inside the dungeon) aren't in the dataset yet — planned addition,
// at which point they'll join the 'boss' role too.
const ROLE_FOR_CATEGORY: Record<Category, Role> = {
  'legacy-dungeon': 'location',
  'minor-dungeon': 'location',
  church: 'location',
  landmark: 'location',
  'town-or-fort': 'location',
  evergaol: 'boss',
  'great-enemy': 'boss',
};

// One visually distinct hue per category (legend + pins share this map).
const CATEGORY_COLOR: Record<Category, string> = {
  'legacy-dungeon': '#c23b32',
  'great-enemy': '#e0752f',
  'minor-dungeon': '#c9a24b',
  church: '#e8d16b',
  landmark: '#5b9bd5',
  'town-or-fort': '#4fae7a',
  evergaol: '#8f5ee0',
};

const CATEGORY_LABEL: Record<Category, string> = {
  'legacy-dungeon': 'Legacy dungeon',
  'minor-dungeon': 'Minor dungeon',
  evergaol: 'Evergaol',
  church: 'Church',
  landmark: 'Landmark',
  'town-or-fort': 'Town / fort / ruins',
  'great-enemy': 'Great Enemy',
};

// Pin/region label font sizes are computed live from the current zoom
// `scale`, not fixed — like Google Maps, labels grow as you zoom in and
// shrink as you zoom out, but clamped in *screen* pixels at both ends so
// they never wash out to sub-pixel illegibility when fully zoomed out nor
// balloon into oversized blur when fully zoomed in. Outside the clamped
// range the growth is flat; inside it, it's exactly proportional to scale
// (continuous — recomputed on every zoom tick, not a stepped threshold).
const PIN_LABEL_BASE_PX = 9;
const PIN_LABEL_MIN_SCREEN_PX = 6;
const PIN_LABEL_MAX_SCREEN_PX = 20;
const PIN_LABEL_HOVER_FACTOR = 1.35;
const REGION_LABEL_BASE_PX = 21;
const REGION_LABEL_MIN_SCREEN_PX = 14;
const REGION_LABEL_MAX_SCREEN_PX = 40;

// Returns a font-size in SVG user-space units — dividing the clamped
// *screen*-pixel target by `scale` cancels out the wrap's CSS transform, so
// the rendered on-screen size is exactly the clamped target.
function pinLabelFontSize(scaleVal: number): number {
  return clamp(PIN_LABEL_BASE_PX * scaleVal, PIN_LABEL_MIN_SCREEN_PX, PIN_LABEL_MAX_SCREEN_PX) / scaleVal;
}

function pinLabelHoverFontSize(scaleVal: number): number {
  const normalScreenPx = clamp(PIN_LABEL_BASE_PX * scaleVal, PIN_LABEL_MIN_SCREEN_PX, PIN_LABEL_MAX_SCREEN_PX);
  const hoverScreenPx = clamp(normalScreenPx * PIN_LABEL_HOVER_FACTOR, PIN_LABEL_MIN_SCREEN_PX * PIN_LABEL_HOVER_FACTOR, PIN_LABEL_MAX_SCREEN_PX * PIN_LABEL_HOVER_FACTOR);
  return hoverScreenPx / scaleVal;
}

function regionLabelFontSize(scaleVal: number): number {
  return clamp(REGION_LABEL_BASE_PX * scaleVal, REGION_LABEL_MIN_SCREEN_PX, REGION_LABEL_MAX_SCREEN_PX) / scaleVal;
}

let layer: Layer = 'surface';
let scale = 1;
let panX = 0;
let panY = 0;
let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let panStartX = 0;
let panStartY = 0;
let editMode = false;

// Session-local manual position corrections, keyed by location name —
// applied on top of the authored fx/fy in locations.ts. Set by dragging a
// pin in "Edit positions" mode. Not persisted to disk; the edit panel
// exports them as a snippet to hand-paste back into locations.ts.
const pinPositionOverrides: Record<string, { fx: number; fy: number }> = {};
const adjustments = new Map<string, { fx: number; fy: number }>();

const wrap = document.getElementById('map-canvas-wrap')!;
const layerToggle = document.getElementById('map-layer-toggle') as HTMLButtonElement;
const searchInput = document.getElementById('map-search') as HTMLInputElement;
const searchResults = document.getElementById('map-search-results')!;
const filterLocations = document.getElementById('filter-locations') as HTMLInputElement;
const filterBosses = document.getElementById('filter-bosses') as HTMLInputElement;
const legend = document.getElementById('map-legend')!;
const editToggle = document.getElementById('map-edit-toggle') as HTMLButtonElement;
const editPanel = document.getElementById('map-edit-panel')!;
const editOutput = document.getElementById('map-edit-output') as HTMLTextAreaElement;
const editCopy = document.getElementById('map-edit-copy') as HTMLButtonElement;

function regionsFor(l: Layer): Region[] {
  return l === 'surface' ? SURFACE_REGIONS : UNDERGROUND_REGIONS;
}

function viewboxFor(l: Layer) {
  return l === 'surface' ? SURFACE_VIEWBOX : UNDERGROUND_VIEWBOX;
}

function currentFraction(loc: MapLocation): { fx: number; fy: number } {
  return pinPositionOverrides[loc.name] ?? { fx: loc.fx, fy: loc.fy };
}

function absolutePosition(loc: MapLocation): { x: number; y: number } | null {
  const region = regionsFor(loc.layer).find((r) => r.id === loc.regionId);
  if (!region) return null;
  const { fx, fy } = currentFraction(loc);
  return { x: region.x + fx * region.width, y: region.y + fy * region.height };
}

function shade(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent);
  return `rgb(${Math.round((t - r) * p + r)}, ${Math.round((t - g) * p + g)}, ${Math.round((t - b) * p + b)})`;
}

// Organic region silhouette: 12 points walked around the rect perimeter,
// jittered with a blend of a low-frequency wave (broad bays) and a
// high-frequency one (fine detail), then connected with a smooth closed
// spline instead of straight edges — reads as a coastline, not a box.
// Weeping Peninsula gets one deliberate, named exception: its southern
// points taper toward the centerline so it reads as an actual peninsula,
// its single most recognizable real-world silhouette. Still hand-designed
// from general geography knowledge, not traced from any real map.
function smoothRegionPath(region: Region): string {
  const { id, x, y, width: w, height: h } = region;

  if (region.shapePoints) {
    // Hand-authored silhouette (see regions.ts comment) — light jitter only,
    // for hand-drawn texture, not to reshape the deliberate design.
    const jitterAmt = Math.min(w, h) * 0.03;
    const points = region.shapePoints.map(([fx, fy], i): [number, number] => {
      const jx = (seeded(id, i * 2) - 0.5) * 2 * jitterAmt;
      const jy = (seeded(id, i * 2 + 1) - 0.5) * 2 * jitterAmt;
      return [x + fx * w + jx, y + fy * h + jy];
    });
    return catmullRomPath(points);
  }

  const edges: ((t: number) => [number, number])[] = [
    (t) => [x + t * w, y],
    (t) => [x + w, y + t * h],
    (t) => [x + w - t * w, y + h],
    (t) => [x, y + h - t * h],
  ];
  const perEdge = 3;
  const perimeter: [number, number][] = [];
  for (const edge of edges) {
    for (let i = 0; i < perEdge; i++) perimeter.push(edge(i / perEdge));
  }

  const jitterAmt = Math.min(w, h) * 0.13;
  const points = perimeter.map(([px, py], i): [number, number] => {
    const low = seeded(id, Math.floor(i / 2)) - 0.5;
    const high = seeded(id, i + 100) - 0.5;
    const jx = (low * 0.7 + high * 0.3) * 2 * jitterAmt;
    const jy = (seeded(id, i + 200) - 0.5) * 2 * jitterAmt * 0.6 + (seeded(id, Math.floor(i / 2) + 50) - 0.5) * jitterAmt * 0.8;
    let fx = px + jx;
    const fy = py + jy;
    if (id === 'weeping-peninsula' && py > y + h * 0.55) {
      const southFrac = Math.min(1, (py - y - h * 0.55) / (h * 0.45));
      const centerX = x + w * 0.5;
      fx += (centerX - fx) * southFrac * 0.7;
    }
    return [fx, fy];
  });

  return catmullRomPath(points);
}

function addDefs(svg: SVGSVGElement, regions: Region[]): void {
  const defs = document.createElementNS(SVG_NS, 'defs');

  for (const region of regions) {
    const grad = document.createElementNS(SVG_NS, 'radialGradient');
    grad.setAttribute('id', `grad-${region.id}`);
    grad.setAttribute('cx', '35%');
    grad.setAttribute('cy', '28%');
    grad.setAttribute('r', '80%');
    const stop1 = document.createElementNS(SVG_NS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', shade(region.color, 0.22));
    const stop2 = document.createElementNS(SVG_NS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', shade(region.color, -0.18));
    grad.append(stop1, stop2);
    defs.appendChild(grad);
  }

  const filter = document.createElementNS(SVG_NS, 'filter');
  filter.setAttribute('id', 'grain');
  const turbulence = document.createElementNS(SVG_NS, 'feTurbulence');
  turbulence.setAttribute('type', 'fractalNoise');
  turbulence.setAttribute('baseFrequency', '0.85');
  turbulence.setAttribute('numOctaves', '2');
  turbulence.setAttribute('result', 'noise');
  const colorMatrix = document.createElementNS(SVG_NS, 'feColorMatrix');
  colorMatrix.setAttribute('in', 'noise');
  colorMatrix.setAttribute('type', 'matrix');
  colorMatrix.setAttribute('values', '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.35 0.35 0.35 0 0');
  filter.append(turbulence, colorMatrix);
  defs.appendChild(filter);

  const glow = document.createElementNS(SVG_NS, 'filter');
  glow.setAttribute('id', 'pin-glow');
  glow.setAttribute('x', '-100%');
  glow.setAttribute('y', '-100%');
  glow.setAttribute('width', '300%');
  glow.setAttribute('height', '300%');
  const blur = document.createElementNS(SVG_NS, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '3');
  blur.setAttribute('result', 'blur');
  const merge = document.createElementNS(SVG_NS, 'feMerge');
  const m1 = document.createElementNS(SVG_NS, 'feMergeNode');
  m1.setAttribute('in', 'blur');
  const m2 = document.createElementNS(SVG_NS, 'feMergeNode');
  m2.setAttribute('in', 'SourceGraphic');
  merge.append(m1, m2);
  glow.append(blur, merge);
  defs.appendChild(glow);

  svg.appendChild(defs);
}

// Adds one pin's interactive group to `svg`. Hover no longer reorders the
// real pin (that caused the "stuck enlarged" bug — reparenting a node the
// mouse is over confuses the browser's enter/leave pairing). Instead hover
// paints a throwaway, non-interactive clone into `frontLayer` — which is
// always the last SVG child — and removes it on mouseleave. The real pin
// never moves, so its own hover state can never get stuck.
function addPin(svg: SVGSVGElement, frontLayer: SVGGElement, loc: MapLocation): void {
  const pos = absolutePosition(loc);
  if (!pos) return;

  const group = document.createElementNS(SVG_NS, 'g');
  group.setAttribute('class', `pin-group role-${ROLE_FOR_CATEGORY[loc.category]}`);

  const dot = document.createElementNS(SVG_NS, 'circle');
  dot.setAttribute('cx', String(pos.x));
  dot.setAttribute('cy', String(pos.y));
  dot.setAttribute('r', '4');
  dot.setAttribute('class', 'pin');
  dot.setAttribute('fill', CATEGORY_COLOR[loc.category]);

  const text = document.createElementNS(SVG_NS, 'text');
  text.setAttribute('x', String(pos.x + 6));
  text.setAttribute('y', String(pos.y + 3));
  text.setAttribute('class', 'pin-label');
  text.style.fontSize = `${pinLabelFontSize(scale)}px`;
  text.textContent = loc.name;

  group.append(dot, text);

  let hoverClone: SVGGElement | null = null;
  group.addEventListener('mouseenter', () => {
    if (editMode) return;
    hoverClone = group.cloneNode(true) as SVGGElement;
    hoverClone.classList.add('pin-hover');
    hoverClone.style.pointerEvents = 'none';
    const cloneLabel = hoverClone.querySelector<SVGTextElement>('.pin-label');
    if (cloneLabel) cloneLabel.style.fontSize = `${pinLabelHoverFontSize(scale)}px`;
    frontLayer.appendChild(hoverClone);
  });
  group.addEventListener('mouseleave', () => {
    hoverClone?.remove();
    hoverClone = null;
  });

  group.addEventListener('mousedown', (e) => {
    if (!editMode) return;
    e.stopPropagation(); // don't also start a viewport pan
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    let curX = pos.x;
    let curY = pos.y;

    const onMove = (me: MouseEvent) => {
      curX = pos.x + (me.clientX - startClientX) / scale;
      curY = pos.y + (me.clientY - startClientY) / scale;
      dot.setAttribute('cx', String(curX));
      dot.setAttribute('cy', String(curY));
      text.setAttribute('x', String(curX + 6));
      text.setAttribute('y', String(curY + 3));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      const region = regionsFor(loc.layer).find((r) => r.id === loc.regionId);
      if (!region) return;
      const fx = clamp01((curX - region.x) / region.width);
      const fy = clamp01((curY - region.y) / region.height);
      pinPositionOverrides[loc.name] = { fx, fy };
      adjustments.set(loc.name, { fx, fy });
      renderEditOutput();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  svg.appendChild(group);
}

function buildSvg(): SVGSVGElement {
  const { width, height } = viewboxFor(layer);
  const regions = regionsFor(layer);
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));

  addDefs(svg, regions);

  for (const region of regions) {
    const shape = document.createElementNS(SVG_NS, 'path');
    shape.setAttribute('d', smoothRegionPath(region));
    shape.setAttribute('fill', `url(#grad-${region.id})`);
    shape.setAttribute('fill-opacity', '0.75');
    shape.setAttribute('stroke', 'rgba(0,0,0,0.4)');
    shape.setAttribute('stroke-width', '2');
    shape.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(shape);

    const label = document.createElementNS(SVG_NS, 'text');
    let labelX = region.x + region.width / 2;
    let labelY = region.y + 24;
    if (region.labelPos) {
      labelX = region.x + region.labelPos[0] * region.width;
      labelY = region.y + region.labelPos[1] * region.height;
    } else if (region.shapePoints) {
      const [cx, cy] = polygonCentroid(region.shapePoints.map(([fx, fy]) => [region.x + fx * region.width, region.y + fy * region.height]));
      labelX = cx;
      labelY = cy;
    }
    label.setAttribute('x', String(labelX));
    label.setAttribute('y', String(labelY));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'region-label');
    label.style.fontSize = `${regionLabelFontSize(scale)}px`;
    label.textContent = region.name;
    svg.appendChild(label);
  }

  // Subtle parchment grain over the whole map, above regions, below pins.
  const grain = document.createElementNS(SVG_NS, 'rect');
  grain.setAttribute('x', '0');
  grain.setAttribute('y', '0');
  grain.setAttribute('width', String(width));
  grain.setAttribute('height', String(height));
  grain.setAttribute('filter', 'url(#grain)');
  grain.setAttribute('opacity', '0.08');
  grain.setAttribute('pointer-events', 'none');
  svg.appendChild(grain);

  const frontLayer = document.createElementNS(SVG_NS, 'g');
  frontLayer.setAttribute('id', 'front-layer');
  frontLayer.style.pointerEvents = 'none';

  for (const loc of MAP_LOCATIONS.filter((l) => l.layer === layer)) {
    addPin(svg, frontLayer, loc);
  }

  svg.appendChild(frontLayer); // last child: hover clones paint above every pin

  return svg;
}

// Re-applies the current scale's clamped font sizes to every already-built
// label, so text grows/shrinks continuously as the user zooms instead of
// only updating on the next full re-render (layer toggle / centerOn).
function updateLabelSizes(): void {
  const pinPx = pinLabelFontSize(scale);
  const regionPx = regionLabelFontSize(scale);
  wrap.querySelectorAll<SVGTextElement>('.pin-label').forEach((el) => {
    el.style.fontSize = `${pinPx}px`;
  });
  wrap.querySelectorAll<SVGTextElement>('.region-label').forEach((el) => {
    el.style.fontSize = `${regionPx}px`;
  });
}

function applyTransform(): void {
  wrap.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  updateLabelSizes();
}

function applyFilters(): void {
  wrap.classList.toggle('hide-locations', !filterLocations.checked);
  wrap.classList.toggle('hide-bosses', !filterBosses.checked);
}

function renderLayer(): void {
  wrap.innerHTML = '';
  wrap.appendChild(buildSvg());
  scale = 1;
  panX = 0;
  panY = 0;
  applyTransform();
  applyFilters();
}

function centerOn(loc: MapLocation): void {
  if (loc.layer !== layer) {
    layer = loc.layer;
    layerToggle.textContent = layer === 'surface' ? 'Surface' : 'Underground';
    renderLayer();
  }
  const pos = absolutePosition(loc);
  if (!pos) return;
  const viewport = document.getElementById('map-viewport')!;
  scale = 2;
  panX = viewport.clientWidth / 2 - pos.x * scale;
  panY = viewport.clientHeight / 2 - pos.y * scale;
  applyTransform();
}

function initPanZoom(): void {
  const viewport = document.getElementById('map-viewport')!;

  viewport.addEventListener('mousedown', (e) => {
    if (editMode) return;
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    panStartX = panX;
    panStartY = panY;
    viewport.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    panX = panStartX + (e.clientX - dragStartX);
    panY = panStartY + (e.clientY - dragStartY);
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    viewport.classList.remove('dragging');
  });

  viewport.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      // Zoom toward the cursor: convert its position to a content-space
      // point before changing scale, then re-solve pan so that same point
      // stays under the cursor after the scale change (previously pan
      // wasn't adjusted at all, so zooming visibly drifted toward the
      // wrap's transform-origin instead of tracking the mouse).
      const rect = viewport.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const contentX = (mx - panX) / scale;
      const contentY = (my - panY) / scale;

      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      const { width, height } = viewboxFor(layer);
      // Zoom out only until the whole map is visible, plus a small margin
      // — not the old fixed 0.4 floor, which allowed zooming out far past
      // that. Zoom-in ceiling (4) is unchanged.
      const minScale = Math.max(0.05, Math.min(viewport.clientWidth / width, viewport.clientHeight / height) * 0.85);
      scale = Math.min(4, Math.max(minScale, scale * factor));

      panX = mx - contentX * scale;
      panY = my - contentY * scale;
      applyTransform();
    },
    { passive: false },
  );
}

function initSearch(): void {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if (!query) return;
    const matches = MAP_LOCATIONS.filter((l) => l.name.toLowerCase().includes(query)).slice(0, 8);
    for (const match of matches) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'map-search-result';
      const dot = document.createElement('span');
      dot.className = 'result-dot';
      dot.style.background = CATEGORY_COLOR[match.category];
      const name = document.createElement('span');
      name.textContent = match.name;
      item.append(dot, name);
      item.addEventListener('click', () => {
        centerOn(match);
        searchInput.value = match.name;
        searchResults.innerHTML = '';
      });
      searchResults.appendChild(item);
    }
  });
}

function initLayerToggle(): void {
  layerToggle.addEventListener('click', () => {
    layer = layer === 'surface' ? 'underground' : 'surface';
    layerToggle.textContent = layer === 'surface' ? 'Surface' : 'Underground';
    renderLayer();
  });
}

function initFilters(): void {
  filterLocations.addEventListener('change', applyFilters);
  filterBosses.addEventListener('change', applyFilters);
}

function initLegend(): void {
  for (const category of Object.keys(CATEGORY_LABEL) as Category[]) {
    const item = document.createElement('span');
    const dot = document.createElement('i');
    dot.style.background = CATEGORY_COLOR[category];
    item.append(dot, document.createTextNode(CATEGORY_LABEL[category]));
    legend.appendChild(item);
  }
}

function renderEditOutput(): void {
  if (adjustments.size === 0) {
    editOutput.value = '';
    return;
  }
  const lines = [...adjustments.entries()].map(
    ([name, pos]) => `  // '${name}': fx: ${pos.fx.toFixed(3)}, fy: ${pos.fy.toFixed(3)}`,
  );
  editOutput.value = lines.join('\n');
}

function initEditMode(): void {
  editToggle.addEventListener('click', () => {
    editMode = !editMode;
    editToggle.classList.toggle('active', editMode);
    editPanel.hidden = !editMode;
    wrap.classList.toggle('edit-mode', editMode);
  });
  editCopy.addEventListener('click', () => {
    void navigator.clipboard?.writeText(editOutput.value);
  });
  // Safety net: if focus leaves the window mid-hover (e.g. alt-tab), any
  // stray hover clones would otherwise linger until the next layer render.
  window.addEventListener('blur', () => {
    document.getElementById('front-layer')?.replaceChildren();
  });
}

export function initMap(): void {
  renderLayer();
  initPanZoom();
  initSearch();
  initLayerToggle();
  initFilters();
  initLegend();
  initEditMode();
}
