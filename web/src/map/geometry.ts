// Shared by render.ts (Map tab) and shape-editor.ts (Shape Editor tab) so
// both draw regions with identical math.

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

// Label font size clamped in *screen* pixels as the view zooms — like Google
// Maps, labels grow/shrink with zoom but never wash out illegibly small nor
// balloon oversized. Returns a size in SVG user-space units: dividing the
// clamped screen-pixel target by `scaleVal` cancels out the wrap's CSS
// transform scale, so the rendered on-screen size is exactly the clamped
// target. `hoverFactor` (> 1) scales the result further for a hover state,
// itself reclamped to the same min/max range scaled by that same factor, so
// hovering near either end of the zoom range doesn't blow past it.
// Shared by the Map tab and the Speedrun tab, which duplicate the same pin
// rendering (both need identical zoom-responsive labels).
export function clampedLabelFontSize(
  scaleVal: number,
  basePx: number,
  minScreenPx: number,
  maxScreenPx: number,
  hoverFactor = 1,
): number {
  const normalScreenPx = clamp(basePx * scaleVal, minScreenPx, maxScreenPx);
  if (hoverFactor === 1) return normalScreenPx / scaleVal;
  const hoverScreenPx = clamp(normalScreenPx * hoverFactor, minScreenPx * hoverFactor, maxScreenPx * hoverFactor);
  return hoverScreenPx / scaleVal;
}

// Lowest zoom scale that still keeps the whole map visible, plus a small
// margin (the `margin` factor). Falls back to `fallback` only when the
// viewport isn't measurable yet (0/NaN clientWidth or clientHeight) —
// an unconditional low floor (e.g. a bare 0.05) would let zoom-out go far
// past "the whole map fits" whenever that happens, which is the bug this
// replaced (shared by both the Map tab and the Speedrun tab, which
// duplicate the same pan/zoom viewport).
export function minZoomScale(
  viewportWidth: number,
  viewportHeight: number,
  contentWidth: number,
  contentHeight: number,
  margin = 0.85,
  fallback = 0.3,
): number {
  const fitScale = Math.min(viewportWidth / contentWidth, viewportHeight / contentHeight) * margin;
  return Number.isFinite(fitScale) && fitScale > 0 ? fitScale : fallback;
}

// Deterministic pseudo-random in [0,1), seeded by a string + index.
export function seeded(seed: string, i: number): number {
  let h = 0;
  for (let c = 0; c < seed.length; c++) h = (h * 31 + seed.charCodeAt(c)) | 0;
  const x = Math.sin(h + i * 37.13) * 10000;
  return x - Math.floor(x);
}

// Area-weighted polygon centroid (shoelace formula) — used as the default
// region-label anchor when a region has no explicit labelPos.
export function polygonCentroid(points: [number, number][]): [number, number] {
  let area = 0;
  let cx = 0;
  let cy = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % n];
    const cross = x0 * y1 - x1 * y0;
    area += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  area *= 0.5;
  if (Math.abs(area) < 1e-6) {
    return [points.reduce((s, p) => s + p[0], 0) / n, points.reduce((s, p) => s + p[1], 0) / n];
  }
  return [cx / (6 * area), cy / (6 * area)];
}

export function catmullRomPath(points: [number, number][]): string {
  const n = points.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    if (i === 0) d += `M ${p1[0].toFixed(1)},${p1[1].toFixed(1)} `;
    d += `C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)} `;
  }
  return d + 'Z';
}
