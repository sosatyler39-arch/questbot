import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './map/regions.js';
import { MAP_LOCATIONS, type MapLocation } from './map/locations.js';
import { catmullRomPath, minZoomScale, clampedLabelFontSize } from './map/geometry.js';
import { ROLE_FOR_CATEGORY } from './map/roles.js';
import { toggleStop, removeStopAt, serializeRoute, deserializeRoute } from './speedrun-logic.js';
import { makeChecklist } from './checklist-logic.js';
import { saveChecklist, renderSavedChecklists } from './checklists.js';

// FEATURE_ADDENDUM §B2: route builder on the project's own original map.
// Deliberately its own compact renderer over the same data modules the Map
// tab uses (regions/locations/geometry) rather than a refactor of the Map
// tab's render.ts — that file's behavior was hand-tuned over many sessions
// and §B2 needs only a backdrop + clickable pins, not its full feature set.
// The route auto-persists on every change and restores on load (§B2's
// save/reload requirement); its checklist goes through the shared §B1 store.

const SVG_NS = 'http://www.w3.org/2000/svg';
const SURFACE_VIEWBOX = { width: 1200, height: 1050 };
const UNDERGROUND_VIEWBOX = { width: 1200, height: 800 };
const ROUTE_KEY = 'questbot_route';

// Same clamp values as the Map tab (render.ts) — pins should feel identical
// when zooming/hovering across both tabs.
const PIN_LABEL_BASE_PX = 9;
const PIN_LABEL_MIN_SCREEN_PX = 6;
const PIN_LABEL_MAX_SCREEN_PX = 20;
const PIN_LABEL_HOVER_FACTOR = 1.35;

function pinLabelFontSize(scaleVal: number): number {
  return clampedLabelFontSize(scaleVal, PIN_LABEL_BASE_PX, PIN_LABEL_MIN_SCREEN_PX, PIN_LABEL_MAX_SCREEN_PX);
}

function pinLabelHoverFontSize(scaleVal: number): number {
  return clampedLabelFontSize(scaleVal, PIN_LABEL_BASE_PX, PIN_LABEL_MIN_SCREEN_PX, PIN_LABEL_MAX_SCREEN_PX, PIN_LABEL_HOVER_FACTOR);
}

type Layer = 'surface' | 'underground';

let layer: Layer = 'surface';
let route: string[] = deserializeRoute(localStorage.getItem(ROUTE_KEY));
let scale = 1;
let panX = 0;
let panY = 0;

const wrap = document.getElementById('speedrun-canvas-wrap')!;
const viewport = document.getElementById('speedrun-viewport')!;
const routeList = document.getElementById('speedrun-route')!;
const clearButton = document.getElementById('speedrun-clear') as HTMLButtonElement;
const checklistButton = document.getElementById('speedrun-make-checklist') as HTMLButtonElement;
const layerToggle = document.getElementById('speedrun-layer-toggle') as HTMLButtonElement;
const checklistsEl = document.getElementById('speedrun-checklists')!;
const filterLocations = document.getElementById('speedrun-filter-locations') as HTMLInputElement;
const filterBosses = document.getElementById('speedrun-filter-bosses') as HTMLInputElement;

const locationsByName = new Map<string, MapLocation>(MAP_LOCATIONS.map((l) => [l.name, l]));

function regionsFor(l: Layer): Region[] {
  return l === 'surface' ? SURFACE_REGIONS : UNDERGROUND_REGIONS;
}

function viewboxFor(l: Layer) {
  return l === 'surface' ? SURFACE_VIEWBOX : UNDERGROUND_VIEWBOX;
}

function absolutePosition(loc: MapLocation): { x: number; y: number } | null {
  const region = regionsFor(loc.layer).find((r) => r.id === loc.regionId);
  if (!region) return null;
  return { x: region.x + loc.fx * region.width, y: region.y + loc.fy * region.height };
}

// Same two-group filter as the Map tab (locations vs. bosses) — a route stop
// that's currently filtered out stays in the saved route, it just isn't
// shown as a clickable pin until the filter is switched back on.
function filterAllows(loc: MapLocation): boolean {
  return ROLE_FOR_CATEGORY[loc.category] === 'boss' ? filterBosses.checked : filterLocations.checked;
}

function setRoute(next: string[]): void {
  route = next;
  localStorage.setItem(ROUTE_KEY, serializeRoute(route));
  renderRouteList();
  renderLayer(); // pin selection state + route polyline both derive from it
}

function regionPath(region: Region): string {
  if (region.shapePoints) {
    return catmullRomPath(
      region.shapePoints.map(([fx, fy]): [number, number] => [region.x + fx * region.width, region.y + fy * region.height]),
    );
  }
  const { x, y, width: w, height: h } = region;
  return `M ${x},${y} L ${x + w},${y} L ${x + w},${y + h} L ${x},${y + h} Z`;
}

function buildSvg(): SVGSVGElement {
  const { width, height } = viewboxFor(layer);
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));

  for (const region of regionsFor(layer)) {
    const shape = document.createElementNS(SVG_NS, 'path');
    shape.setAttribute('d', regionPath(region));
    shape.setAttribute('fill', region.color);
    shape.setAttribute('fill-opacity', '0.35');
    shape.setAttribute('stroke', 'rgba(0,0,0,0.4)');
    shape.setAttribute('stroke-width', '2');
    svg.appendChild(shape);
  }

  // Route polyline under the pins: connects this layer's stops in route
  // order (stops on the other layer simply don't contribute points here).
  const routePoints = route
    .map((name) => locationsByName.get(name))
    .filter((l): l is MapLocation => !!l && l.layer === layer)
    .map((l) => absolutePosition(l))
    .filter((p): p is { x: number; y: number } => p !== null);
  if (routePoints.length >= 2) {
    const line = document.createElementNS(SVG_NS, 'polyline');
    line.setAttribute('points', routePoints.map((p) => `${p.x},${p.y}`).join(' '));
    line.setAttribute('class', 'route-line');
    svg.appendChild(line);
  }

  // Painted last (see below) so a hovered pin's enlarged clone always draws
  // above its neighbors — same technique as the Map tab (render.ts), for
  // the same reason: reparenting the real pin on hover instead of cloning
  // caused a "stuck enlarged" bug there.
  const frontLayer = document.createElementNS(SVG_NS, 'g');
  frontLayer.style.pointerEvents = 'none';

  for (const loc of MAP_LOCATIONS.filter((l) => l.layer === layer && filterAllows(l))) {
    const pos = absolutePosition(loc);
    if (!pos) continue;
    const orderIndex = route.indexOf(loc.name);

    const group = document.createElementNS(SVG_NS, 'g');
    // pin-group is what the shared .pin-group.pin-hover CSS (map.css) keys
    // off for both the hover enlarge and the bold label — route-pin alone
    // doesn't match it, which is why bold (and the real enlarge) weren't
    // actually applying before, just a color-brightening from a separate
    // native :hover rule.
    group.setAttribute('class', `route-pin pin-group${orderIndex !== -1 ? ' selected' : ''}`);

    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('cx', String(pos.x));
    dot.setAttribute('cy', String(pos.y));
    dot.setAttribute('r', orderIndex !== -1 ? '7' : '4');
    dot.setAttribute('class', 'pin');
    const title = document.createElementNS(SVG_NS, 'title');
    title.textContent = loc.name;
    dot.append(title);
    group.append(dot);

    // Visible label, not just the hover-delay native tooltip above — hard
    // to tell stops apart by an unlabeled dot alone (found via user testing).
    // Sized live from the current zoom scale, same clamp as the Map tab, so
    // it shrinks/grows on zoom instead of staying a fixed size.
    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', String(pos.x + 6));
    label.setAttribute('y', String(pos.y + 3));
    label.setAttribute('class', 'pin-label');
    label.style.fontSize = `${pinLabelFontSize(scale)}px`;
    label.textContent = loc.name;
    group.append(label);

    if (orderIndex !== -1) {
      const order = document.createElementNS(SVG_NS, 'text');
      order.setAttribute('x', String(pos.x));
      order.setAttribute('y', String(pos.y + 3.5));
      order.setAttribute('text-anchor', 'middle');
      order.setAttribute('class', 'route-order');
      order.textContent = String(orderIndex + 1);
      group.append(order);
    }

    group.addEventListener('click', (e) => {
      e.stopPropagation();
      setRoute(toggleStop(route, loc.name));
    });

    let hoverClone: SVGGElement | null = null;
    group.addEventListener('mouseenter', () => {
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

    svg.appendChild(group);
  }

  svg.appendChild(frontLayer); // last child: hover clones paint above every pin
  return svg;
}

// Re-applies the current scale's clamped label size to every already-built
// pin, so text grows/shrinks continuously while zooming instead of only on
// the next full re-render (layer toggle) — same as the Map tab.
function updateLabelSizes(): void {
  const px = pinLabelFontSize(scale);
  wrap.querySelectorAll<SVGTextElement>('.pin-label').forEach((el) => {
    el.style.fontSize = `${px}px`;
  });
}

function applyTransform(): void {
  wrap.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  updateLabelSizes();
}

function renderLayer(): void {
  const oldSvg = wrap.querySelector('svg');
  oldSvg?.remove();
  wrap.appendChild(buildSvg());
  applyTransform();
}

function renderRouteList(): void {
  routeList.replaceChildren();
  route.forEach((name, i) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    const loc = locationsByName.get(name);
    label.textContent = loc && loc.layer === 'underground' ? `${name} (underground)` : name;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '✕';
    remove.title = 'Remove stop';
    remove.addEventListener('click', () => setRoute(removeStopAt(route, i)));
    li.append(label, remove);
    routeList.append(li);
  });
  checklistButton.disabled = route.length === 0;
  clearButton.disabled = route.length === 0;
}

function initPanZoom(): void {
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let panStartX = 0;
  let panStartY = 0;

  viewport.addEventListener('mousedown', (e) => {
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
      // Same zoom-to-cursor + fit-floor math as the Map tab (render.ts).
      const rect = viewport.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const contentX = (mx - panX) / scale;
      const contentY = (my - panY) / scale;
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      const { width, height } = viewboxFor(layer);
      const minScale = minZoomScale(viewport.clientWidth, viewport.clientHeight, width, height);
      scale = Math.min(4, Math.max(minScale, scale * factor));
      panX = mx - contentX * scale;
      panY = my - contentY * scale;
      applyTransform();
    },
    { passive: false },
  );
}

layerToggle.addEventListener('click', () => {
  layer = layer === 'surface' ? 'underground' : 'surface';
  layerToggle.textContent = layer === 'surface' ? 'Surface' : 'Underground';
  scale = 1;
  panX = 0;
  panY = 0;
  renderLayer();
});

filterLocations.addEventListener('change', renderLayer);
filterBosses.addEventListener('change', renderLayer);

clearButton.addEventListener('click', () => setRoute([]));

checklistButton.addEventListener('click', () => {
  if (!route.length) return;
  const list = makeChecklist(`Speedrun route (${route.length} stops)`, [...route], 'route');
  saveChecklist(list);
  renderSavedChecklists(checklistsEl, 'route');
});

renderRouteList();
renderLayer();
initPanZoom();
renderSavedChecklists(checklistsEl, 'route');
