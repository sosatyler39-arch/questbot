import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './regions.js';
import { MAP_LOCATIONS, type MapLocation } from './locations.js';
import { seeded, catmullRomPath, polygonCentroid } from './geometry.js';
import { CATEGORY_COLOR, buildLegend } from './legend.js';
import type { Category } from './locations.js';

// A workspace for hand-molding each region's outline (dragging vertices) and
// now also for repositioning every location pin — moved here from the Map
// tab's old "Edit positions" mode, so the browsable Map stays read-only and
// all authoring tools live in one place. Both exports (shape adjustments,
// pin adjustments) are hand-pasted back into regions.ts / locations.ts; nothing
// here writes to disk.
//
// Reference image: loaded from the user's own local disk via a plain file
// picker, held only as an in-memory object URL for this session. Never
// downloaded, saved, or committed by this app — deliberately, so a
// copyrighted reference image (e.g. the official game map) can be used as
// a personal molding aid without ever becoming a file in this project.

const SVG_NS = 'http://www.w3.org/2000/svg';
const SURFACE_VIEWBOX = { width: 1200, height: 1050 };
const UNDERGROUND_VIEWBOX = { width: 1200, height: 800 };
const MIN_POINTS = 4;
const DRAG_THRESHOLD = 4; // px, in screen space — below this a shape mousedown is treated as a click (add point)
const RESIZE_HANDLE_SIZE = 8;

type Layer = 'surface' | 'underground';
type EditorMode = 'shape' | 'pin';

// The 8 handles around a region's bounding box, image-editor style: corners
// resize freely on both axes, edge midpoints resize just the one axis.
type HandlePos = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';
const HANDLE_POSITIONS: HandlePos[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const RESIZE_CURSOR: Record<HandlePos, string> = {
  nw: 'nwse-resize',
  se: 'nwse-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
};

interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

function affectsX(pos: HandlePos): boolean {
  return pos !== 'n' && pos !== 's';
}

function affectsY(pos: HandlePos): boolean {
  return pos !== 'e' && pos !== 'w';
}

// The handle's own position, and its opposite anchor (the point that stays
// fixed while dragging that handle) — standard corner/edge resize pairing.
function handleCoord(bbox: BBox, pos: HandlePos): [number, number] {
  const midX = (bbox.minX + bbox.maxX) / 2;
  const midY = (bbox.minY + bbox.maxY) / 2;
  const x = pos === 'nw' || pos === 'w' || pos === 'sw' ? bbox.minX : pos === 'ne' || pos === 'e' || pos === 'se' ? bbox.maxX : midX;
  const y = pos === 'nw' || pos === 'n' || pos === 'ne' ? bbox.minY : pos === 'sw' || pos === 's' || pos === 'se' ? bbox.maxY : midY;
  return [x, y];
}

function anchorCoord(bbox: BBox, pos: HandlePos): [number, number] {
  const opposite: Record<HandlePos, HandlePos> = { nw: 'se', n: 's', ne: 'sw', e: 'w', se: 'nw', s: 'n', sw: 'ne', w: 'e' };
  return handleCoord(bbox, opposite[pos]);
}

let layer: Layer = 'surface';
let mode: EditorMode = 'shape';
const hiddenCategories = new Set<Category>();
let scale = 1;
let panX = 0;
let panY = 0;
let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let panStartX = 0;
let panStartY = 0;
let referenceObjectUrl: string | null = null;

// Per-region working vertex list (fractions of that region's own bbox).
// Seeded from the region's existing shapePoints if it has one, otherwise
// baked from the same jittered-perimeter algorithm render.ts's fallback
// path uses — so an un-molded region starts here looking like it does on
// the Map tab, not like a jarring plain rectangle.
const shapeOverrides: Record<string, [number, number][]> = {};
const labelOverrides: Record<string, [number, number]> = {};
const touchedRegions = new Set<string>();
const touchedLabels = new Set<string>();

// Session-local pin position corrections, keyed by location name — applied
// on top of the authored fx/fy in locations.ts while this tab is open. Not
// persisted; the pin export panel below turns them into a snippet to
// hand-paste back into locations.ts.
const pinOverrides = new Map<string, { fx: number; fy: number }>();
// The pin list order the Prev/Next buttons and the sidebar both walk —
// every location in the current layer, in locations.ts's own file order
// (already grouped region-by-region), so stepping through it visits one
// region's pins together before moving to the next.
let pinOrder: PinLike[] = [];
let selectedPinIndex = -1;
const pinDotByName = new Map<string, SVGCircleElement>();

// User-created pins, not present in locations.ts yet. Kept separate from
// MAP_LOCATIONS (a read-only import) rather than routed through
// pinOverrides — a brand-new pin has no authored fx/fy to override, and its
// export format (a full pasteable object literal) differs from the
// existing "adjust this pin" comment format below.
interface CustomPin {
  isCustom: true;
  id: number;
  name: string;
  category: Category;
  regionId: string;
  layer: Layer;
  fx: number;
  fy: number;
}
type PinLike = MapLocation | CustomPin;
function isCustomPin(loc: PinLike): loc is CustomPin {
  return 'isCustom' in loc;
}
const customPins: CustomPin[] = [];
let nextCustomPinId = 1;

function allPinsForLayer(l: Layer): PinLike[] {
  return [...MAP_LOCATIONS.filter((loc) => loc.layer === l), ...customPins.filter((p) => p.layer === l)];
}

function findPinByName(name: string): PinLike | undefined {
  return MAP_LOCATIONS.find((l) => l.name === name) ?? customPins.find((p) => p.name === name);
}

const STORAGE_KEY = 'questbot-shape-editor-state';

interface PersistedState {
  shapeOverrides: Record<string, [number, number][]>;
  labelOverrides: Record<string, [number, number]>;
  touchedRegions: string[];
  touchedLabels: string[];
  pinOverrides: [string, { fx: number; fy: number }][];
  customPins: CustomPin[];
  nextCustomPinId: number;
}

function persist(): void {
  try {
    const state: PersistedState = {
      shapeOverrides,
      labelOverrides,
      touchedRegions: [...touchedRegions],
      touchedLabels: [...touchedLabels],
      pinOverrides: [...pinOverrides.entries()],
      customPins,
      nextCustomPinId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable/full — the in-memory session still works,
    // it just won't survive a refresh. Not a user-facing error.
  }
}

function restore(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw) as PersistedState;
    for (const [id, points] of Object.entries(state.shapeOverrides ?? {})) shapeOverrides[id] = points;
    for (const [id, pos] of Object.entries(state.labelOverrides ?? {})) labelOverrides[id] = pos;
    for (const id of state.touchedRegions ?? []) touchedRegions.add(id);
    for (const id of state.touchedLabels ?? []) touchedLabels.add(id);
    for (const [name, pos] of state.pinOverrides ?? []) pinOverrides.set(name, pos);
    customPins.push(...(state.customPins ?? []));
    nextCustomPinId = state.nextCustomPinId ?? 1;
  } catch {
    // Malformed/foreign data — treat exactly like "nothing saved yet".
  }
}

const wrap = document.getElementById('shapes-canvas-wrap')!;
const layerToggle = document.getElementById('shapes-layer-toggle') as HTMLButtonElement;
const resetButton = document.getElementById('shapes-reset') as HTMLButtonElement;
const exportOutput = document.getElementById('shapes-export-output') as HTMLTextAreaElement;
const exportCopy = document.getElementById('shapes-export-copy') as HTMLButtonElement;
const refImg = document.getElementById('shapes-reference-img') as HTMLImageElement;
const refFileInput = document.getElementById('shapes-ref-file') as HTMLInputElement;
const refLoadButton = document.getElementById('shapes-ref-load') as HTMLButtonElement;
const refOpacity = document.getElementById('shapes-ref-opacity') as HTMLInputElement;
const refClearButton = document.getElementById('shapes-ref-clear') as HTMLButtonElement;
const pinSearch = document.getElementById('shapes-pin-search') as HTMLInputElement;
const pinList = document.getElementById('shapes-pin-list')!;
const pinPrev = document.getElementById('shapes-pin-prev') as HTMLButtonElement;
const pinNext = document.getElementById('shapes-pin-next') as HTMLButtonElement;
const pinCurrent = document.getElementById('shapes-pin-current')!;
const modeToggle = document.getElementById('shapes-mode-toggle') as HTMLButtonElement;
const pinSide = document.getElementById('shapes-pin-side')!;
const refToolbar = document.getElementById('shapes-ref-toolbar')!;
const shapesLegend = document.getElementById('shapes-legend')!;

function regionsFor(l: Layer): Region[] {
  return l === 'surface' ? SURFACE_REGIONS : UNDERGROUND_REGIONS;
}

function viewboxFor(l: Layer) {
  return l === 'surface' ? SURFACE_VIEWBOX : UNDERGROUND_VIEWBOX;
}

// Mirrors render.ts's fallback (non-shapePoints) region silhouette, but
// normalized to fractions instead of absolute coordinates.
function bakedPoints(region: Region): [number, number][] {
  const { id, width: w, height: h } = region;
  const edges: ((t: number) => [number, number])[] = [
    (t) => [t * w, 0],
    (t) => [w, t * h],
    (t) => [w - t * w, h],
    (t) => [0, h - t * h],
  ];
  const perEdge = 3;
  const perimeter: [number, number][] = [];
  for (const edge of edges) for (let i = 0; i < perEdge; i++) perimeter.push(edge(i / perEdge));

  const jitterAmt = Math.min(w, h) * 0.13;
  return perimeter.map(([px, py], i): [number, number] => {
    const low = seeded(id, Math.floor(i / 2)) - 0.5;
    const high = seeded(id, i + 100) - 0.5;
    const jx = (low * 0.7 + high * 0.3) * 2 * jitterAmt;
    const jy = (seeded(id, i + 200) - 0.5) * 2 * jitterAmt * 0.6 + (seeded(id, Math.floor(i / 2) + 50) - 0.5) * jitterAmt * 0.8;
    let x = px + jx;
    const y = py + jy;
    if (id === 'weeping-peninsula' && py > h * 0.55) {
      const southFrac = Math.min(1, (py - h * 0.55) / (h * 0.45));
      x += (w * 0.5 - x) * southFrac * 0.7;
    }
    return [x / w, y / h];
  });
}

function workingPoints(region: Region): [number, number][] {
  if (!shapeOverrides[region.id]) {
    shapeOverrides[region.id] = region.shapePoints
      ? region.shapePoints.map((p) => [...p] as [number, number])
      : bakedPoints(region);
  }
  return shapeOverrides[region.id];
}

function absPoint(region: Region, pt: [number, number]): [number, number] {
  return [region.x + pt[0] * region.width, region.y + pt[1] * region.height];
}

function pathFor(region: Region, points: [number, number][]): string {
  return catmullRomPath(points.map((p) => absPoint(region, p)));
}

function computeBBox(region: Region, points: [number, number][]): BBox {
  const abs = points.map((p) => absPoint(region, p));
  const xs = abs.map((p) => p[0]);
  const ys = abs.map((p) => p[1]);
  return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
}

function workingLabelPos(region: Region, points: [number, number][]): [number, number] {
  if (!labelOverrides[region.id]) {
    if (region.labelPos) {
      labelOverrides[region.id] = [...region.labelPos];
    } else {
      const centroidAbs = polygonCentroid(points.map((p) => absPoint(region, p)));
      labelOverrides[region.id] = [(centroidAbs[0] - region.x) / region.width, (centroidAbs[1] - region.y) / region.height];
    }
  }
  return labelOverrides[region.id];
}

function distanceToSegment(p: [number, number], a: [number, number], b: [number, number]): number {
  const [px, py] = p;
  const [ax, ay] = a;
  const [bx, by] = b;
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

// Converts a mouse event's screen position into this SVG's own user-space
// coordinates, accounting for the viewBox and the wrap div's pan/zoom
// transform in one step — more robust than reversing that math by hand.
function svgPointFromEvent(svg: SVGSVGElement, pos: { clientX: number; clientY: number }): [number, number] {
  const pt = svg.createSVGPoint();
  pt.x = pos.clientX;
  pt.y = pos.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return [0, 0];
  const p = pt.matrixTransform(ctm.inverse());
  return [p.x, p.y];
}

function addRegion(svg: SVGSVGElement, region: Region): void {
  const points = workingPoints(region);
  const labelPos = workingLabelPos(region, points);

  const shape = document.createElementNS(SVG_NS, 'path');
  shape.setAttribute('class', 'shape-outline');
  shape.setAttribute('fill', region.color);
  shape.setAttribute('fill-opacity', '0.3');
  shape.setAttribute('stroke', 'rgba(232, 226, 213, 0.7)');
  shape.setAttribute('stroke-width', '2');
  shape.setAttribute('stroke-dasharray', '5 4');
  svg.appendChild(shape);

  const label = document.createElementNS(SVG_NS, 'text');
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('class', 'shape-editor-label');
  label.textContent = region.name;
  svg.appendChild(label);

  const handleGroup = document.createElementNS(SVG_NS, 'g');
  svg.appendChild(handleGroup);

  // Resize overlay: a bounding-box outline + 8 handles (4 corners, 4 edge
  // midpoints), image-editor style. Drawn after handleGroup so its handles
  // sit on top and stay grabbable even where they land near a vertex.
  const bboxGroup = document.createElementNS(SVG_NS, 'g');
  svg.appendChild(bboxGroup);

  function redrawShape(): void {
    shape.setAttribute('d', pathFor(region, points));
  }

  function redrawLabel(): void {
    const [lx, ly] = absPoint(region, labelPos);
    label.setAttribute('x', String(lx));
    label.setAttribute('y', String(ly));
  }

  function refreshHandles(): void {
    handleGroup.replaceChildren();
    points.forEach((pt, i) => {
      const handle = document.createElementNS(SVG_NS, 'circle');
      handle.setAttribute('r', '6');
      handle.setAttribute('class', 'shape-handle');
      const [hx, hy] = absPoint(region, pt);
      handle.setAttribute('cx', String(hx));
      handle.setAttribute('cy', String(hy));

      handle.addEventListener('mousedown', (e) => {
        if (mode !== 'shape') return;
        e.stopPropagation(); // don't also start a viewport pan
        const startClientX = e.clientX;
        const startClientY = e.clientY;
        const startFx = points[i][0];
        const startFy = points[i][1];

        const onMove = (me: MouseEvent) => {
          const dxFrac = (me.clientX - startClientX) / scale / region.width;
          const dyFrac = (me.clientY - startClientY) / scale / region.height;
          points[i] = [startFx + dxFrac, startFy + dyFrac];
          const [ax, ay] = absPoint(region, points[i]);
          handle.setAttribute('cx', String(ax));
          handle.setAttribute('cy', String(ay));
          redrawShape();
          refreshBBox();
          touchedRegions.add(region.id);
        };
        const onUp = () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
          persist();
          renderExportOutput();
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      });

      // Double-click a handle to remove that vertex (keeps a minimum
      // viable shape so it can't be collapsed to nothing).
      handle.addEventListener('dblclick', (e) => {
        if (mode !== 'shape') return;
        e.stopPropagation();
        if (points.length <= MIN_POINTS) return;
        points.splice(i, 1);
        touchedRegions.add(region.id);
        redrawShape();
        refreshHandles();
        refreshBBox();
        persist();
        renderExportOutput();
      });

      handleGroup.appendChild(handle);
    });
  }

  // Dragging a resize handle scales every point (and the label) relative
  // to the opposite corner/edge, which stays fixed — the same mental model
  // as resizing an image by its corner/edge. Corners scale both axes
  // independently (free resize, not locked to aspect ratio); edges scale
  // just the one axis.
  function startResize(pos: HandlePos, e: MouseEvent): void {
    if (mode !== 'shape') return;
    e.stopPropagation();
    const bboxStart = computeBBox(region, points);
    const anchor = anchorCoord(bboxStart, pos);
    const startHandlePos = handleCoord(bboxStart, pos);
    const originalAbs = points.map((p) => absPoint(region, p));
    const originalLabelAbs = absPoint(region, labelPos);
    const startClientX = e.clientX;
    const startClientY = e.clientY;

    const onMove = (me: MouseEvent) => {
      const dx = (me.clientX - startClientX) / scale;
      const dy = (me.clientY - startClientY) / scale;
      const newHandleX = startHandlePos[0] + (affectsX(pos) ? dx : 0);
      const newHandleY = startHandlePos[1] + (affectsY(pos) ? dy : 0);

      const denomX = startHandlePos[0] - anchor[0];
      const denomY = startHandlePos[1] - anchor[1];
      const scaleX = affectsX(pos) && Math.abs(denomX) > 1e-6 ? (newHandleX - anchor[0]) / denomX : 1;
      const scaleY = affectsY(pos) && Math.abs(denomY) > 1e-6 ? (newHandleY - anchor[1]) / denomY : 1;

      points.forEach((p, i) => {
        const [ox, oy] = originalAbs[i];
        const newX = affectsX(pos) ? anchor[0] + (ox - anchor[0]) * scaleX : ox;
        const newY = affectsY(pos) ? anchor[1] + (oy - anchor[1]) * scaleY : oy;
        p[0] = (newX - region.x) / region.width;
        p[1] = (newY - region.y) / region.height;
      });

      const [olx, oly] = originalLabelAbs;
      const newLX = affectsX(pos) ? anchor[0] + (olx - anchor[0]) * scaleX : olx;
      const newLY = affectsY(pos) ? anchor[1] + (oly - anchor[1]) * scaleY : oly;
      labelPos[0] = (newLX - region.x) / region.width;
      labelPos[1] = (newLY - region.y) / region.height;

      touchedRegions.add(region.id);
      touchedLabels.add(region.id);
      redrawShape();
      refreshHandles();
      redrawLabel();
      refreshBBox();
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      persist();
      renderExportOutput();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function refreshBBox(): void {
    bboxGroup.replaceChildren();
    const bbox = computeBBox(region, points);

    const outline = document.createElementNS(SVG_NS, 'rect');
    outline.setAttribute('x', String(bbox.minX));
    outline.setAttribute('y', String(bbox.minY));
    outline.setAttribute('width', String(Math.max(0, bbox.maxX - bbox.minX)));
    outline.setAttribute('height', String(Math.max(0, bbox.maxY - bbox.minY)));
    outline.setAttribute('class', 'shape-bbox');
    bboxGroup.appendChild(outline);

    for (const pos of HANDLE_POSITIONS) {
      const [hx, hy] = handleCoord(bbox, pos);
      const handle = document.createElementNS(SVG_NS, 'rect');
      handle.setAttribute('x', String(hx - RESIZE_HANDLE_SIZE / 2));
      handle.setAttribute('y', String(hy - RESIZE_HANDLE_SIZE / 2));
      handle.setAttribute('width', String(RESIZE_HANDLE_SIZE));
      handle.setAttribute('height', String(RESIZE_HANDLE_SIZE));
      handle.setAttribute('class', 'shape-resize-handle');
      handle.style.cursor = RESIZE_CURSOR[pos];
      handle.addEventListener('mousedown', (e) => startResize(pos, e));
      bboxGroup.appendChild(handle);
    }
  }

  function addPointAt(clientX: number, clientY: number): void {
    const [cx, cy] = svgPointFromEvent(svg, { clientX, clientY });
    let bestIndex = 0;
    let bestDist = Infinity;
    for (let i = 0; i < points.length; i++) {
      const a = absPoint(region, points[i]);
      const b = absPoint(region, points[(i + 1) % points.length]);
      const d = distanceToSegment([cx, cy], a, b);
      if (d < bestDist) {
        bestDist = d;
        bestIndex = i;
      }
    }
    const newPoint: [number, number] = [(cx - region.x) / region.width, (cy - region.y) / region.height];
    points.splice(bestIndex + 1, 0, newPoint);
    touchedRegions.add(region.id);
    redrawShape();
    refreshHandles();
    refreshBBox();
    persist();
    renderExportOutput();
  }

  // Mousedown on the shape body does one of two things, decided by whether
  // the mouse actually moves: no movement -> click, insert a vertex at the
  // nearest edge (previous behavior). Movement past a small threshold ->
  // drag, translate every point (and the label) together, i.e. move the
  // whole region. Doing this as one handler (rather than a separate click
  // listener) avoids relying on the browser's own click-after-drag
  // suppression, which isn't reliable for small movements.
  shape.addEventListener('mousedown', (e) => {
    if (mode !== 'shape') return;
    e.stopPropagation();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    let lastClientX = e.clientX;
    let lastClientY = e.clientY;
    let moved = false;

    const onMove = (me: MouseEvent) => {
      if (!moved && Math.hypot(me.clientX - startClientX, me.clientY - startClientY) > DRAG_THRESHOLD) {
        moved = true;
      }
      if (moved) {
        const dxFrac = (me.clientX - lastClientX) / scale / region.width;
        const dyFrac = (me.clientY - lastClientY) / scale / region.height;
        for (const p of points) {
          p[0] += dxFrac;
          p[1] += dyFrac;
        }
        labelPos[0] += dxFrac;
        labelPos[1] += dyFrac;
        touchedRegions.add(region.id);
        touchedLabels.add(region.id);
        redrawShape();
        refreshHandles();
        redrawLabel();
        refreshBBox();
      }
      lastClientX = me.clientX;
      lastClientY = me.clientY;
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (moved) {
        persist();
        renderExportOutput();
      } else {
        addPointAt(startClientX, startClientY);
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  // Independent label drag, for fine-tuning after (or without) moving the
  // whole region.
  label.addEventListener('mousedown', (e) => {
    if (mode !== 'shape') return;
    e.stopPropagation();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startFx = labelPos[0];
    const startFy = labelPos[1];

    const onMove = (me: MouseEvent) => {
      const dxFrac = (me.clientX - startClientX) / scale / region.width;
      const dyFrac = (me.clientY - startClientY) / scale / region.height;
      labelPos[0] = startFx + dxFrac;
      labelPos[1] = startFy + dyFrac;
      touchedLabels.add(region.id);
      redrawLabel();
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      persist();
      renderExportOutput();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  redrawShape();
  redrawLabel();
  refreshHandles();
  refreshBBox();
}

// A location's current working fx/fy: a custom pin's own (directly mutable)
// fields, or for an authored location, the session-local override if the
// user has dragged it this session, otherwise its authored value.
function currentFraction(loc: PinLike): { fx: number; fy: number } {
  if (isCustomPin(loc)) return { fx: loc.fx, fy: loc.fy };
  return pinOverrides.get(loc.name) ?? { fx: loc.fx, fy: loc.fy };
}

function pinAbsolutePosition(loc: PinLike): [number, number] | null {
  const region = regionsFor(loc.layer).find((r) => r.id === loc.regionId);
  if (!region) return null;
  const { fx, fy } = currentFraction(loc);
  return [region.x + fx * region.width, region.y + fy * region.height];
}

// Draws one location's dot on top of the region shapes. Deliberately no
// text label baked in — with 200+ pins on screen at once that's unreadable
// clutter (the exact problem the Map tab's own zoom-based label hiding
// exists to solve). The selected pin (from the sidebar / Prev-Next) gets
// its own always-visible label plus a highlight ring instead.
function addPin(svg: SVGSVGElement, loc: PinLike): void {
  const pos = pinAbsolutePosition(loc);
  if (!pos) return;
  const [x, y] = pos;

  // A larger invisible hit target sits under the small visible dot, so a
  // pin stays easy to grab/re-grab without needing pixel-perfect aim — the
  // visible dot alone (r=4) was an easy miss right after dragging one,
  // which landed the next click on the map/shape underneath instead.
  const hitTarget = document.createElementNS(SVG_NS, 'circle');
  hitTarget.setAttribute('cx', String(x));
  hitTarget.setAttribute('cy', String(y));
  hitTarget.setAttribute('r', '9');
  hitTarget.setAttribute('class', 'shape-editor-pin-hit');
  hitTarget.setAttribute('fill', CATEGORY_COLOR[loc.category]);
  hitTarget.setAttribute('data-category', loc.category);
  svg.appendChild(hitTarget);

  const dot = document.createElementNS(SVG_NS, 'circle');
  dot.setAttribute('cx', String(x));
  dot.setAttribute('cy', String(y));
  dot.setAttribute('r', '4');
  dot.setAttribute('class', isCustomPin(loc) ? 'shape-editor-pin custom' : 'shape-editor-pin');
  dot.setAttribute('fill', CATEGORY_COLOR[loc.category]);
  dot.setAttribute('data-category', loc.category);
  dot.style.pointerEvents = 'none';
  svg.appendChild(dot);
  pinDotByName.set(loc.name, dot);

  hitTarget.addEventListener('mousedown', (e) => {
    e.stopPropagation(); // don't also start a viewport pan or shape drag
    // No recenter here (unlike sidebar/Prev-Next selection): the viewport
    // snapping to scale 3 the instant you grab a pin is what made "moving
    // a pin" feel like it also moved the map out from under the cursor.
    selectPinByName(loc.name, false);

    // Bring the grabbed pin to the front and mark it visually — in a dense
    // cluster a neighboring pin can otherwise sit on top and quietly eat
    // the drag, which reads as "I moved it but it snapped back" (the pin
    // you meant to grab never moved; a different one did, out of sight).
    svg.appendChild(hitTarget);
    svg.appendChild(dot);
    hitTarget.classList.add('dragging');
    dot.classList.add('dragging');

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const region = regionsFor(loc.layer).find((r) => r.id === loc.regionId)!;
    let curX = x;
    let curY = y;
    let pendingMove: MouseEvent | null = null;
    let frame = 0;

    // Coalesce mousemove into one DOM update per animation frame — a mouse
    // can fire far more move events than the screen repaints, and writing
    // 5 attributes on every single one of them is what made dragging feel
    // stuttery rather than smooth.
    const applyMove = () => {
      frame = 0;
      if (!pendingMove) return;
      curX = x + (pendingMove.clientX - startClientX) / scale;
      curY = y + (pendingMove.clientY - startClientY) / scale;
      pendingMove = null;
      hitTarget.setAttribute('cx', String(curX));
      hitTarget.setAttribute('cy', String(curY));
      dot.setAttribute('cx', String(curX));
      dot.setAttribute('cy', String(curY));
      updateSelectedPinLabelPosition();
    };
    const onMove = (me: MouseEvent) => {
      pendingMove = me;
      if (!frame) frame = requestAnimationFrame(applyMove);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (frame) cancelAnimationFrame(frame);
      applyMove(); // flush any move coalesced into the frame that just got cancelled
      hitTarget.classList.remove('dragging');
      dot.classList.remove('dragging');
      // No 0-1 clamp: several regions' real shapePoints deliberately extend
      // outside their own nominal box (see regions.ts) to close gaps
      // between neighbors, and pins need that same freedom.
      const fx = (curX - region.x) / region.width;
      const fy = (curY - region.y) / region.height;
      if (isCustomPin(loc)) {
        loc.fx = fx;
        loc.fy = fy;
      } else {
        pinOverrides.set(loc.name, { fx, fy });
      }
      renderExportOutput();
      persist();
      refreshPinListRow(loc.name);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  if (isCustomPin(loc)) {
    hitTarget.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      deleteCustomPin(loc.id);
    });
  }
}

let selectedPinLabel: SVGTextElement | null = null;
let selectedPinRing: SVGCircleElement | null = null;

function updateSelectedPinLabelPosition(): void {
  if (!selectedPinLabel || !selectedPinRing || selectedPinIndex < 0) return;
  const dot = pinDotByName.get(pinOrder[selectedPinIndex].name);
  if (!dot) return;
  const x = Number(dot.getAttribute('cx'));
  const y = Number(dot.getAttribute('cy'));
  selectedPinRing.setAttribute('cx', String(x));
  selectedPinRing.setAttribute('cy', String(y));
  selectedPinLabel.setAttribute('x', String(x + 8));
  selectedPinLabel.setAttribute('y', String(y + 4));
}

function refreshSelectedPinOverlay(svg: SVGSVGElement): void {
  selectedPinLabel?.remove();
  selectedPinRing?.remove();
  selectedPinLabel = null;
  selectedPinRing = null;
  if (selectedPinIndex < 0) return;
  const loc = pinOrder[selectedPinIndex];
  if (loc.layer !== layer) return;
  const dot = pinDotByName.get(loc.name);
  if (!dot) return;

  const ring = document.createElementNS(SVG_NS, 'circle');
  ring.setAttribute('r', '8');
  ring.setAttribute('class', 'shape-editor-pin-selected-ring');
  ring.setAttribute('cx', dot.getAttribute('cx')!);
  ring.setAttribute('cy', dot.getAttribute('cy')!);
  ring.style.pointerEvents = 'none';
  svg.appendChild(ring);
  selectedPinRing = ring;

  const label = document.createElementNS(SVG_NS, 'text');
  label.setAttribute('class', 'shape-editor-pin-selected-label');
  label.textContent = loc.name;
  label.style.pointerEvents = 'none';
  svg.appendChild(label);
  selectedPinLabel = label;
  updateSelectedPinLabelPosition();
}

// Pin mode's non-interactive stand-in for a region: just the outline path
// and its name, so you still see the region boundaries and know where you
// are while placing pins — without the shape-editing vertex/resize handles
// cluttering the view or intercepting clicks meant for a pin.
function addRegionOutline(svg: SVGSVGElement, region: Region): void {
  const points = workingPoints(region);
  const labelPos = workingLabelPos(region, points);

  const shape = document.createElementNS(SVG_NS, 'path');
  shape.setAttribute('class', 'shape-outline');
  shape.setAttribute('d', pathFor(region, points));
  shape.setAttribute('fill', region.color);
  shape.setAttribute('fill-opacity', '0.3');
  shape.setAttribute('stroke', 'rgba(232, 226, 213, 0.7)');
  shape.setAttribute('stroke-width', '2');
  shape.setAttribute('stroke-dasharray', '5 4');
  shape.style.pointerEvents = 'none';
  svg.appendChild(shape);

  const [lx, ly] = absPoint(region, labelPos);
  const label = document.createElementNS(SVG_NS, 'text');
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('class', 'shape-editor-label');
  label.setAttribute('x', String(lx));
  label.setAttribute('y', String(ly));
  label.style.pointerEvents = 'none';
  label.textContent = region.name;
  svg.appendChild(label);
}

function buildSvg(): SVGSVGElement {
  const { width, height } = viewboxFor(layer);
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));

  if (mode === 'shape') {
    for (const region of regionsFor(layer)) addRegion(svg, region);
  } else {
    for (const region of regionsFor(layer)) addRegionOutline(svg, region);
  }

  pinDotByName.clear();
  if (mode === 'pin') {
    for (const loc of allPinsForLayer(layer)) addPin(svg, loc);
    refreshSelectedPinOverlay(svg);
  }

  return svg;
}

function applyTransform(): void {
  wrap.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
}

// Rebuilds the SVG (shapes + pins) in place without touching the current
// pan/zoom — use this whenever a data change (create/rename/delete a pin,
// toggle mode) just needs the canvas to reflect it. Panning/zooming back
// to scale 1 on every such edit is what made "adjust a pin" feel like it
// also zoomed the map out from under you.
function rebuildSvg(): void {
  const { width, height } = viewboxFor(layer);
  refImg.style.width = `${width}px`;
  refImg.style.height = `${height}px`;

  const oldSvg = wrap.querySelector('svg');
  oldSvg?.remove();
  wrap.appendChild(buildSvg());
  applyPinFilters();
}

// Hides pins whose category is unchecked in the legend — lets you isolate
// one category (e.g. just Weapons) while placing/adjusting its pins instead
// of hunting through all 200+ pins on screen at once.
function applyPinFilters(): void {
  wrap.querySelectorAll<SVGElement>('[data-category]').forEach((el) => {
    const category = el.getAttribute('data-category') as Category;
    el.style.display = hiddenCategories.has(category) ? 'none' : '';
  });
}

// Rebuilds the SVG and resets the view to scale 1 — only appropriate when
// the viewBox itself just changed size (switching Surface/Underground) or
// on first load, where there's no "current view" worth preserving yet.
function renderLayer(): void {
  rebuildSvg();
  scale = 1;
  panX = 0;
  panY = 0;
  applyTransform();
}

function initPanZoom(): void {
  const viewport = document.getElementById('shapes-viewport')!;

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

  window.addEventListener('mouseup', (e) => {
    if (dragging && mode === 'pin' && Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) <= DRAG_THRESHOLD) {
      handleCreatePinClick(e);
    }
    dragging = false;
    viewport.classList.remove('dragging');
  });

  viewport.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      // Zoom toward the cursor (see render.ts for the same fix + rationale).
      const rect = viewport.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const contentX = (mx - panX) / scale;
      const contentY = (my - panY) / scale;

      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      const { width, height } = viewboxFor(layer);
      const minScale = Math.max(0.05, Math.min(viewport.clientWidth / width, viewport.clientHeight / height) * 0.85);
      scale = Math.min(8, Math.max(minScale, scale * factor));

      panX = mx - contentX * scale;
      panY = my - contentY * scale;
      applyTransform();
    },
    { passive: false },
  );
}

function initLayerToggle(): void {
  layerToggle.addEventListener('click', () => {
    layer = layer === 'surface' ? 'underground' : 'surface';
    layerToggle.textContent = layer === 'surface' ? 'Surface' : 'Underground';
    renderLayer();
    renderPinList();
  });
}

function renderExportOutput(): void {
  const lines: string[] = [];
  if (touchedRegions.size > 0 || touchedLabels.size > 0) {
    lines.push('// --- Region/label adjustments (regions.ts) ---');
    for (const id of touchedRegions) {
      lines.push(`  // '${id}': shapePoints: [`);
      for (const [fx, fy] of shapeOverrides[id]) lines.push(`  //   [${fx.toFixed(3)}, ${fy.toFixed(3)}],`);
      lines.push('  // ],');
    }
    for (const id of touchedLabels) {
      const [fx, fy] = labelOverrides[id];
      lines.push(`  // '${id}': labelPos: [${fx.toFixed(3)}, ${fy.toFixed(3)}],`);
    }
  }
  if (pinOverrides.size > 0) {
    if (lines.length > 0) lines.push('');
    lines.push('// --- Pin position adjustments (locations.ts) ---');
    for (const [name, pos] of pinOverrides.entries()) {
      lines.push(`  // '${name}': fx: ${pos.fx.toFixed(3)}, fy: ${pos.fy.toFixed(3)}`);
    }
  }
  if (customPins.length > 0) {
    if (lines.length > 0) lines.push('');
    lines.push('// --- New pins (locations.ts) ---');
    for (const p of customPins) {
      lines.push(
        `  { name: '${p.name.replace(/'/g, "\\'")}', category: '${p.category}', regionId: '${p.regionId}', layer: '${p.layer}', fx: ${p.fx.toFixed(3)}, fy: ${p.fy.toFixed(3)} },`,
      );
    }
  }
  exportOutput.value = lines.join('\n');
}

function initExport(): void {
  exportCopy.addEventListener('click', () => {
    void navigator.clipboard?.writeText(exportOutput.value);
  });
  resetButton.addEventListener('click', () => {
    for (const key of Object.keys(shapeOverrides)) delete shapeOverrides[key];
    for (const key of Object.keys(labelOverrides)) delete labelOverrides[key];
    touchedRegions.clear();
    touchedLabels.clear();
    pinOverrides.clear();
    customPins.length = 0;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    renderExportOutput();
    renderLayer();
    renderPinList();
  });
}

// Local-only reference image: picked from the user's own disk via a plain
// <input type="file">, held as an object URL for this session only. Never
// fetched, saved, or bundled by the app — see file header comment.
function initReferenceImage(): void {
  refLoadButton.addEventListener('click', () => refFileInput.click());

  refFileInput.addEventListener('change', () => {
    const file = refFileInput.files?.[0];
    if (!file) return;
    if (referenceObjectUrl) URL.revokeObjectURL(referenceObjectUrl);
    referenceObjectUrl = URL.createObjectURL(file);
    refImg.src = referenceObjectUrl;
    refImg.hidden = false;
  });

  refOpacity.addEventListener('input', () => {
    refImg.style.opacity = String(Number(refOpacity.value) / 100);
  });
  refImg.style.opacity = String(Number(refOpacity.value) / 100);

  refClearButton.addEventListener('click', () => {
    refImg.hidden = true;
    refImg.removeAttribute('src');
    if (referenceObjectUrl) {
      URL.revokeObjectURL(referenceObjectUrl);
      referenceObjectUrl = null;
    }
    refFileInput.value = '';
  });
}

// ---- Pin repositioning + "go through every pin" sidebar ----

function centerOnSelectedPin(): void {
  if (selectedPinIndex < 0) return;
  const loc = pinOrder[selectedPinIndex];
  if (loc.layer !== layer) {
    layer = loc.layer;
    layerToggle.textContent = layer === 'surface' ? 'Surface' : 'Underground';
    renderLayer();
  } else {
    refreshSelectedPinOverlay(wrap.querySelector('svg')!);
  }
  const pos = pinAbsolutePosition(loc);
  if (!pos) return;
  const viewport = document.getElementById('shapes-viewport')!;
  scale = 3;
  panX = viewport.clientWidth / 2 - pos[0] * scale;
  panY = viewport.clientHeight / 2 - pos[1] * scale;
  applyTransform();
}

function updatePinCurrentReadout(): void {
  if (selectedPinIndex < 0) {
    pinCurrent.textContent = '';
    return;
  }
  const loc = pinOrder[selectedPinIndex];
  const { fx, fy } = currentFraction(loc);
  pinCurrent.textContent = `${selectedPinIndex + 1} / ${pinOrder.length} — ${loc.name} (fx: ${fx.toFixed(3)}, fy: ${fy.toFixed(3)})`;
}

function selectPinByName(name: string, recenter = true): void {
  const index = pinOrder.findIndex((l) => l.name === name);
  if (index < 0) return;
  selectedPinIndex = index;
  if (recenter) {
    centerOnSelectedPin();
  } else {
    refreshSelectedPinOverlay(wrap.querySelector('svg')!);
  }
  updatePinCurrentReadout();
  refreshPinListSelection();
}

function selectPinByIndex(index: number): void {
  if (pinOrder.length === 0) return;
  selectedPinIndex = Math.max(0, Math.min(pinOrder.length - 1, index));
  centerOnSelectedPin();
  updatePinCurrentReadout();
  refreshPinListSelection();
}

const pinListRows = new Map<string, HTMLButtonElement>();

function refreshPinListSelection(): void {
  for (const [name, row] of pinListRows) {
    row.classList.toggle('selected', selectedPinIndex >= 0 && pinOrder[selectedPinIndex]?.name === name);
  }
  pinListRows.get(pinOrder[selectedPinIndex]?.name ?? '')?.scrollIntoView({ block: 'nearest' });
}

function refreshPinListRow(name: string): void {
  const row = pinListRows.get(name);
  const loc = findPinByName(name);
  if (!row || !loc) return;
  const { fx, fy } = currentFraction(loc);
  const posEl = row.querySelector('.shapes-pin-row-pos');
  if (posEl) posEl.textContent = `${fx.toFixed(2)}, ${fy.toFixed(2)}`;
  row.classList.toggle('adjusted', pinOverrides.has(name));
}

function deleteCustomPin(id: number): void {
  const idx = customPins.findIndex((p) => p.id === id);
  if (idx === -1) return;
  const wasSelected = selectedPinIndex >= 0 && pinOrder[selectedPinIndex]?.name === customPins[idx].name;
  customPins.splice(idx, 1);
  if (wasSelected) {
    selectedPinIndex = -1;
    updatePinCurrentReadout();
  }
  persist();
  rebuildSvg();
  renderPinList();
  renderExportOutput();
}

function renderPinList(): void {
  const query = pinSearch.value.trim().toLowerCase();
  pinOrder = allPinsForLayer(layer).filter((l) => !query || l.name.toLowerCase().includes(query));
  pinList.replaceChildren();
  pinListRows.clear();

  let lastRegionId: string | null = null;
  for (const loc of pinOrder) {
    if (loc.regionId !== lastRegionId) {
      lastRegionId = loc.regionId;
      const header = document.createElement('div');
      header.className = 'shapes-pin-region-header';
      header.textContent = loc.regionId;
      pinList.appendChild(header);
    }

    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'shapes-pin-row';
    const dot = document.createElement('span');
    dot.className = 'shapes-pin-row-dot';
    dot.style.background = CATEGORY_COLOR[loc.category];
    let name: HTMLElement;
    if (isCustomPin(loc)) {
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'shapes-pin-row-name shapes-pin-row-name-input';
      nameInput.value = loc.name;
      nameInput.addEventListener('mousedown', (e) => e.stopPropagation());
      nameInput.addEventListener('click', (e) => e.stopPropagation());
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') nameInput.blur();
      });
      nameInput.addEventListener('blur', () => {
        const trimmed = nameInput.value.trim();
        if (!trimmed || trimmed === loc.name) {
          nameInput.value = loc.name;
          return;
        }
        loc.name = trimmed;
        persist();
        renderExportOutput();
        rebuildSvg();
        renderPinList();
        updatePinCurrentReadout();
      });
      name = nameInput;
    } else {
      const nameSpan = document.createElement('span');
      nameSpan.className = 'shapes-pin-row-name';
      nameSpan.textContent = loc.name;
      name = nameSpan;
    }
    let categorySelect: HTMLSelectElement | null = null;
    if (isCustomPin(loc)) {
      categorySelect = document.createElement('select');
      categorySelect.className = 'shapes-pin-row-category';
      for (const category of Object.keys(CATEGORY_COLOR) as Category[]) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        option.selected = category === loc.category;
        categorySelect.appendChild(option);
      }
      categorySelect.addEventListener('mousedown', (e) => e.stopPropagation());
      categorySelect.addEventListener('click', (e) => e.stopPropagation());
      categorySelect.addEventListener('change', () => {
        loc.category = categorySelect!.value as Category;
        persist();
        renderExportOutput();
        rebuildSvg();
        renderPinList();
      });
    }
    const pos = document.createElement('span');
    pos.className = 'shapes-pin-row-pos';
    const { fx, fy } = currentFraction(loc);
    pos.textContent = `${fx.toFixed(2)}, ${fy.toFixed(2)}`;
    row.classList.toggle('adjusted', pinOverrides.has(loc.name));
    row.append(dot, name, pos);
    if (categorySelect) row.appendChild(categorySelect);
    if (isCustomPin(loc)) {
      row.classList.add('custom');
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'shapes-pin-row-delete';
      del.textContent = '×';
      del.title = 'Delete this pin';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteCustomPin(loc.id);
      });
      row.appendChild(del);
    }
    row.addEventListener('click', () => selectPinByName(loc.name));
    pinList.appendChild(row);
    pinListRows.set(loc.name, row);
  }

  if (selectedPinIndex >= pinOrder.length) selectedPinIndex = pinOrder.length - 1;
  refreshPinListSelection();
}

function initPinTools(): void {
  pinSearch.addEventListener('input', renderPinList);
  pinPrev.addEventListener('click', () => selectPinByIndex(selectedPinIndex <= 0 ? pinOrder.length - 1 : selectedPinIndex - 1));
  pinNext.addEventListener('click', () => selectPinByIndex(selectedPinIndex >= pinOrder.length - 1 ? 0 : selectedPinIndex + 1));
  renderPinList();
}

// ---- Create-and-name new pins ----
//
// In pin mode, a plain click on the viewport (not a pan-drag, not a click
// on an existing pin/shape/handle — those already stopPropagation on their
// own mousedown) creates a new pin immediately at that spot, with an
// auto-generated placeholder name/category and the region auto-detected
// under the click. Double-clicking a custom pin's dot removes it. The
// export panel emits full object literals for these, ready to paste as
// brand-new locations.ts entries — unlike the pin-adjustment section
// above, which only describes fx/fy diffs for pins that already exist
// there.

function pointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect = yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Regions deliberately overlap (see regions.ts) to close gaps between
// neighbors, so a click can land inside more than one shape — pick
// whichever's centroid is nearest.
function regionContainingPoint(absX: number, absY: number): Region | null {
  const candidates = regionsFor(layer).filter((region) => {
    const points = workingPoints(region).map((p) => absPoint(region, p));
    return pointInPolygon([absX, absY], points);
  });
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];
  let best = candidates[0];
  let bestDist = Infinity;
  for (const region of candidates) {
    const points = workingPoints(region).map((p) => absPoint(region, p));
    const [cx, cy] = polygonCentroid(points);
    const d = Math.hypot(absX - cx, absY - cy);
    if (d < bestDist) {
      bestDist = d;
      best = region;
    }
  }
  return best;
}

function handleCreatePinClick(e: MouseEvent): void {
  const svg = wrap.querySelector('svg');
  if (!svg) return;
  const [x, y] = svgPointFromEvent(svg, e);
  const region = regionContainingPoint(x, y);
  if (!region) return; // clicked outside every region shape
  const id = nextCustomPinId++;
  const pin: CustomPin = {
    isCustom: true,
    id,
    name: `New Pin ${id}`,
    category: 'locations',
    regionId: region.id,
    layer,
    fx: (x - region.x) / region.width,
    fy: (y - region.y) / region.height,
  };
  customPins.push(pin);
  persist();
  rebuildSvg();
  renderPinList();
  renderExportOutput();
  selectPinByName(pin.name, false);
}

function setMode(next: EditorMode): void {
  mode = next;
  modeToggle.textContent = mode === 'shape' ? 'Shape adjustment' : 'Pin adjustment';
  pinSide.hidden = mode === 'shape';
  refToolbar.hidden = mode === 'pin';
  shapesLegend.hidden = mode === 'shape';
  rebuildSvg();
  if (mode === 'pin') renderPinList();
}

function initModeToggle(): void {
  modeToggle.textContent = 'Shape adjustment';
  pinSide.hidden = true;
  refToolbar.hidden = false;
  shapesLegend.hidden = true;
  modeToggle.addEventListener('click', () => {
    setMode(mode === 'shape' ? 'pin' : 'shape');
  });
}

function initShapesLegend(): void {
  buildLegend(shapesLegend, (category, hidden) => {
    if (hidden) hiddenCategories.add(category);
    else hiddenCategories.delete(category);
    applyPinFilters();
  });
}

export function initShapeEditor(): void {
  restore();
  initModeToggle();
  initShapesLegend();
  renderLayer();
  initPanZoom();
  initLayerToggle();
  initExport();
  initReferenceImage();
  initPinTools();
  // restore() only repopulates the in-memory structures the export panel
  // reads from — re-render it now so a restored session shows its pending
  // changes immediately, not just after the next edit.
  renderExportOutput();
}
