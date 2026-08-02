export interface AffinePoint {
  worldX: number;
  worldZ: number;
  fx: number;
  fy: number;
}

export interface AffineTransform {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

function det3x3(m: number[][]): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

// Solves the 3x3 linear system M*v = b via Cramer's rule.
function solve3x3(m: number[][], b: number[]): number[] {
  const d = det3x3(m);
  if (Math.abs(d) < 1e-9) {
    throw new Error('Cannot fit an affine transform: points are collinear or coincident');
  }

  const withColumn = (col: number) =>
    m.map((row, i) => row.map((val, j) => (j === col ? b[i] : val)));

  return [0, 1, 2].map((col) => det3x3(withColumn(col)) / d);
}

/**
 * Fits fx = a*worldX + b*worldZ + c and fy = d*worldX + e*worldZ + f via least squares
 * (normal equations, solved in closed form). With exactly 3 points the system is exactly
 * determined (zero residual); with more, it's the standard least-squares solution.
 */
export function fitAffineTransform(points: AffinePoint[]): AffineTransform {
  if (points.length < 3) {
    throw new Error(`fitAffineTransform needs at least 3 points, got ${points.length}`);
  }

  let sxx = 0, sxz = 0, sx = 0, szz = 0, sz = 0;
  let sxfx = 0, szfx = 0, sfx = 0;
  let sxfy = 0, szfy = 0, sfy = 0;

  for (const p of points) {
    sxx += p.worldX * p.worldX;
    sxz += p.worldX * p.worldZ;
    sx += p.worldX;
    szz += p.worldZ * p.worldZ;
    sz += p.worldZ;
    sxfx += p.worldX * p.fx;
    szfx += p.worldZ * p.fx;
    sfx += p.fx;
    sxfy += p.worldX * p.fy;
    szfy += p.worldZ * p.fy;
    sfy += p.fy;
  }

  const n = points.length;
  const m = [
    [sxx, sxz, sx],
    [sxz, szz, sz],
    [sx, sz, n],
  ];

  const [a, b, c] = solve3x3(m, [sxfx, szfx, sfx]);
  const [d, e, f] = solve3x3(m, [sxfy, szfy, sfy]);

  return { a, b, c, d, e, f };
}

export function applyAffineTransform(
  transform: AffineTransform,
  worldX: number,
  worldZ: number,
): { fx: number; fy: number } {
  const { a, b, c, d, e, f } = transform;
  return {
    fx: a * worldX + b * worldZ + c,
    fy: d * worldX + e * worldZ + f,
  };
}
