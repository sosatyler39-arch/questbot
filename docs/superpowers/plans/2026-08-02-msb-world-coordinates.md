# World-Space Coordinate Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Stage 1's tile-local Site of Grace coordinates into one unified world-space
coordinate system.

**Architecture:** A pure function (`tileToWorld`) parses a tile ID and applies the verified
`gridIndex * 256 + local` formula; a disposable script applies it to all 314 real entries from
Stage 1's output.

**Tech Stack:** TypeScript, `node:test` (this project's established test convention).

## Global Constraints

- Small tiles only (`_00` resolution suffix) — the verified formula doesn't cover medium/large
  tiles, and no current input needs them; throw rather than silently mishandle one.
- No fixed grid-size bound is asserted anywhere (the "41×41" wiki figure predates the DLC map
  expansion — real data already includes `gridXNo=42`).

---

## File Structure

**Create (permanent):**
- `server/src/pipeline/msb-coordinates.ts` — `tileToWorld()`.
- `server/src/pipeline/msb-coordinates.test.ts` — tests against real verified values.

**Create (disposable, deleted after Task 2):**
- `server/scripts/convert-sites-of-grace-to-world-coordinates.ts`

**Create (permanent, committed):**
- `tools/msb-extractor/output/sites-of-grace-world.json`

---

### Task 1: `tileToWorld()`, with tests against real verified values

**Files:**
- Create: `server/src/pipeline/msb-coordinates.ts`
- Create: `server/src/pipeline/msb-coordinates.test.ts`

**Interfaces:**
- Produces: `tileToWorld(mapTileId: string, localX: number, localZ: number): { worldX: number; worldZ: number }` — consumed by Task 2's conversion script.

- [ ] **Step 1: Write the failing test**

```typescript
// server/src/pipeline/msb-coordinates.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileToWorld } from './msb-coordinates.js';

// Real values from tools/msb-extractor/output/sites-of-grace.json, verified by hand against
// the formula during design (see docs/superpowers/specs/2026-08-02-msb-world-coordinates-design.md).
test('tileToWorld converts Church of Elleh\'s tile-local position to world-space', () => {
  const result = tileToWorld('m60_42_36_00', -40.734, 79.338);
  assert.ok(Math.abs(result.worldX - 10711.266) < 1e-6);
  assert.ok(Math.abs(result.worldZ - 9295.338) < 1e-6);
});

test('tileToWorld converts The First Step\'s tile-local position to world-space', () => {
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/src/pipeline/msb-coordinates.test.ts`
Expected: FAIL — `msb-coordinates.ts` doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// server/src/pipeline/msb-coordinates.ts
const TILE_SIZE = 256;

// Elden Ring overworld tile IDs: "m{areaNo}_{gridX}_{gridZ}_{resolution}", e.g. "m60_42_36_00".
// Verified against the Souls Modding wiki's Map Overview reference during design: small tiles
// (resolution "00") are exactly 256 game units apart, with each tile's own local coordinate
// origin (0,0,0) at that tile's center. Grid X maps to the game's world X-axis, grid Z to the
// world Z-axis. Medium/large tiles ("01"/"02") aren't handled - no current input needs them.
const TILE_ID_PATTERN = /^m\d+_(\d+)_(\d+)_(\d+)$/;

export function tileToWorld(
  mapTileId: string,
  localX: number,
  localZ: number,
): { worldX: number; worldZ: number } {
  const match = TILE_ID_PATTERN.exec(mapTileId);
  if (!match) {
    throw new Error(`Malformed tile ID "${mapTileId}"`);
  }

  const [, gridXStr, gridZStr, resolution] = match;
  if (resolution !== '00') {
    throw new Error(`Unsupported tile resolution "${resolution}" in tile ID "${mapTileId}" (only small tiles, resolution "00", are supported)`);
  }

  const gridX = Number(gridXStr);
  const gridZ = Number(gridZStr);

  return {
    worldX: gridX * TILE_SIZE + localX,
    worldZ: gridZ * TILE_SIZE + localZ,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/src/pipeline/msb-coordinates.test.ts`
Expected: PASS, all 5 tests green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/src/pipeline/msb-coordinates.ts server/src/pipeline/msb-coordinates.test.ts
git commit -m "Add tileToWorld() for converting MSB tile-local coordinates to world-space"
```

---

### Task 2: Convert Stage 1's output to world-space, with real-data verification

**Files:**
- Create (disposable): `server/scripts/convert-sites-of-grace-to-world-coordinates.ts`
- Create (permanent, committed): `tools/msb-extractor/output/sites-of-grace-world.json`

**Interfaces:**
- Consumes: `tileToWorld()` (Task 1), `tools/msb-extractor/output/sites-of-grace.json` (Stage 1's output — array of `{ graceName: string; bonfireEntityId: number; mapTileId: string; localX: number; localZ: number }`).
- Produces: `tools/msb-extractor/output/sites-of-grace-world.json` — array of `{ graceName: string; bonfireEntityId: number; worldX: number; worldZ: number }`, the input Stage 3 consumes next.

No unit test for this task — it's a thin, one-shot script wiring already-tested logic (`tileToWorld`) to real file I/O, matching this project's established pattern (e.g. the weapon-regulation-data vendoring script) of verifying disposable scripts by running them for real rather than unit testing them.

- [ ] **Step 1: Write the script**

```typescript
// server/scripts/convert-sites-of-grace-to-world-coordinates.ts (disposable — delete after running)
import { readFileSync, writeFileSync } from 'node:fs';
import { tileToWorld } from '../src/pipeline/msb-coordinates.js';

interface GraceInput {
  graceName: string;
  bonfireEntityId: number;
  mapTileId: string;
  localX: number;
  localZ: number;
}

const INPUT_PATH = 'tools/msb-extractor/output/sites-of-grace.json';
const OUTPUT_PATH = 'tools/msb-extractor/output/sites-of-grace-world.json';

const graces: GraceInput[] = JSON.parse(readFileSync(INPUT_PATH, 'utf-8'));

const output = graces.map((g) => {
  const { worldX, worldZ } = tileToWorld(g.mapTileId, g.localX, g.localZ);
  return {
    graceName: g.graceName,
    bonfireEntityId: g.bonfireEntityId,
    worldX,
    worldZ,
  };
});

writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`Wrote ${output.length} world-space coordinates to ${OUTPUT_PATH}`);
```

- [ ] **Step 2: Run it for real (from the repo root)**

Run: `npx tsx server/scripts/convert-sites-of-grace-to-world-coordinates.ts`
Expected: prints `Wrote 314 world-space coordinates to tools/msb-extractor/output/sites-of-grace-world.json`.

- [ ] **Step 3: Spot-check the output**

Open `tools/msb-extractor/output/sites-of-grace-world.json` and find "Church of Elleh" and "The
First Step". Confirm their `worldX`/`worldZ` values match the ones verified in Task 1's tests
(10711.266/9295.338 and 10739.17/9161.5 respectively) and that they're close together, matching
their known real in-game adjacency in Limgrave.

- [ ] **Step 4: Delete the disposable script and commit the output**

```bash
rm server/scripts/convert-sites-of-grace-to-world-coordinates.ts
git add tools/msb-extractor/output/sites-of-grace-world.json
git commit -m "Convert Sites of Grace to unified world-space coordinates"
```
