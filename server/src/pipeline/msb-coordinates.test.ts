import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileToWorld } from './msb-coordinates.js';

// Real values from tools/msb-extractor/output/sites-of-grace.json, verified by hand against
// the formula during design (see docs/superpowers/specs/2026-08-02-msb-world-coordinates-design.md).
test("tileToWorld converts Church of Elleh's tile-local position to world-space", () => {
  const result = tileToWorld('m60_42_36_00', -40.734, 79.338);
  assert.ok(Math.abs(result.worldX - 10711.266) < 1e-6);
  assert.ok(Math.abs(result.worldZ - 9295.338) < 1e-6);
});

test("tileToWorld converts The First Step's tile-local position to world-space", () => {
  const result = tileToWorld('m60_42_36_00', -12.83, -54.5);
  assert.ok(Math.abs(result.worldX - 10739.17) < 1e-6);
  assert.ok(Math.abs(result.worldZ - 9161.5) < 1e-6);
});

test('tileToWorld places two graces on the same tile close together in world-space', () => {
  const elleh = tileToWorld('m60_42_36_00', -40.734, 79.338);
  const firstStep = tileToWorld('m60_42_36_00', -12.83, -54.5);
  const distance = Math.hypot(elleh.worldX - firstStep.worldX, elleh.worldZ - firstStep.worldZ);
  // Both are well within a single 256-unit tile, so the distance between them must be less
  // than the tile's own diagonal (256 * sqrt(2) ~= 362).
  assert.ok(distance < 362);
});

test('tileToWorld throws on a malformed tile ID', () => {
  assert.throws(() => tileToWorld('not-a-tile-id', 0, 0), /Malformed tile ID/);
});

test('tileToWorld throws on a non-"00" resolution tile', () => {
  assert.throws(() => tileToWorld('m60_42_36_01', 0, 0), /Unsupported tile resolution/);
});
