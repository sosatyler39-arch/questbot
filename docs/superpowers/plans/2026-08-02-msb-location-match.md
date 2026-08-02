# Matching Sites of Grace to Existing Locations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce calibration anchors — pairs of real world coordinates and existing schematic
positions for the same real-world entity — for Stage 4 to use.

**Architecture:** A pure matching function joins Stage 2's grace coordinates to
`web/src/map/locations.ts`'s existing named locations by normalized name, excluding any
ambiguous (multiply-matched) names; a disposable script runs it for real.

**Tech Stack:** TypeScript, `node:test` (this project's established test convention).

## Global Constraints

- Any grace name matched by more than one grace row is excluded entirely — not averaged, not
  arbitrarily picked (per the design spec: there's no principled way to choose between two real,
  physically-different locations sharing one existing pin).
- Any location name matched by more than one location entry is excluded the same way (checked,
  not assumed impossible).
- Underground regions having few/zero anchors is expected and fine — they're out of scope for
  calibration regardless (Stage 4 only calibrates surface regions).

---

## File Structure

**Create (permanent):**
- `server/src/pipeline/msb-location-match.ts` — `matchGracesToLocations()`.
- `server/src/pipeline/msb-location-match.test.ts` — tests against hand-built fixtures.

**Create (disposable, deleted after Task 2):**
- `server/scripts/generate-calibration-anchors.ts`

**Create (permanent, committed):**
- `tools/msb-extractor/output/calibration-anchors.json`

---

### Task 1: `matchGracesToLocations()`, with tests against hand-built fixtures

**Files:**
- Create: `server/src/pipeline/msb-location-match.ts`
- Create: `server/src/pipeline/msb-location-match.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  interface GraceInput {
    graceName: string;
    worldX: number;
    worldZ: number;
  }
  interface LocationInput {
    name: string;
    category: string;
    regionId: string;
    fx: number;
    fy: number;
  }
  interface CalibrationAnchor {
    name: string;
    category: string;
    regionId: string;
    existingFx: number;
    existingFy: number;
    worldX: number;
    worldZ: number;
  }
  function matchGracesToLocations(graces: GraceInput[], locations: LocationInput[]): CalibrationAnchor[]
  ```
  Consumed by Task 2's script.

- [ ] **Step 1: Write the failing test**

```typescript
// server/src/pipeline/msb-location-match.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchGracesToLocations, type GraceInput, type LocationInput } from './msb-location-match.js';

const churchOfElleh: LocationInput = {
  name: 'Church of Elleh',
  category: 'church',
  regionId: 'limgrave',
  fx: 0.793,
  fy: 0.691,
};

test('matchGracesToLocations pairs a grace with its matching location by normalized name', () => {
  const grace: GraceInput = { graceName: 'Church of Elleh', worldX: 10711.266, worldZ: 9295.338 };
  const result = matchGracesToLocations([grace], [churchOfElleh]);
  assert.deepEqual(result, [
    {
      name: 'Church of Elleh',
      category: 'church',
      regionId: 'limgrave',
      existingFx: 0.793,
      existingFy: 0.691,
      worldX: 10711.266,
      worldZ: 9295.338,
    },
  ]);
});

test('matchGracesToLocations matches names case/punctuation-insensitively', () => {
  const grace: GraceInput = { graceName: "church of elleh!", worldX: 1, worldZ: 2 };
  const result = matchGracesToLocations([grace], [churchOfElleh]);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Church of Elleh');
});

test('matchGracesToLocations excludes a grace with no matching location (not an error)', () => {
  const grace: GraceInput = { graceName: 'Castleward Tunnel', worldX: 1, worldZ: 2 };
  const result = matchGracesToLocations([grace], [churchOfElleh]);
  assert.deepEqual(result, []);
});

test('matchGracesToLocations excludes an ambiguous grace name matched by more than one grace', () => {
  const eldenThrone: LocationInput = {
    name: 'Elden Throne',
    category: 'landmark',
    regionId: 'leyndell',
    fx: 0.925,
    fy: 1.939,
  };
  const preBurn: GraceInput = { graceName: 'Elden Throne', worldX: 37.25, worldZ: -416.03 };
  const postBurn: GraceInput = { graceName: 'Elden Throne', worldX: 1317.18, worldZ: -415.93 };
  const result = matchGracesToLocations([preBurn, postBurn], [eldenThrone]);
  assert.deepEqual(result, []);
});

test('matchGracesToLocations excludes an ambiguous location name matched by more than one location', () => {
  const dupeA: LocationInput = { name: 'Church of Elleh', category: 'church', regionId: 'limgrave', fx: 0.1, fy: 0.1 };
  const dupeB: LocationInput = { name: 'church of elleh', category: 'church', regionId: 'limgrave', fx: 0.2, fy: 0.2 };
  const grace: GraceInput = { graceName: 'Church of Elleh', worldX: 1, worldZ: 2 };
  const result = matchGracesToLocations([grace], [dupeA, dupeB]);
  assert.deepEqual(result, []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/src/pipeline/msb-location-match.test.ts`
Expected: FAIL — `msb-location-match.ts` doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// server/src/pipeline/msb-location-match.ts
export interface GraceInput {
  graceName: string;
  worldX: number;
  worldZ: number;
}

export interface LocationInput {
  name: string;
  category: string;
  regionId: string;
  fx: number;
  fy: number;
}

export interface CalibrationAnchor {
  name: string;
  category: string;
  regionId: string;
  existingFx: number;
  existingFy: number;
  worldX: number;
  worldZ: number;
}

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function matchGracesToLocations(
  graces: GraceInput[],
  locations: LocationInput[],
): CalibrationAnchor[] {
  const gracesByNormName = new Map<string, GraceInput[]>();
  for (const g of graces) {
    const key = normalize(g.graceName);
    const list = gracesByNormName.get(key) ?? [];
    list.push(g);
    gracesByNormName.set(key, list);
  }

  const locationsByNormName = new Map<string, LocationInput[]>();
  for (const loc of locations) {
    const key = normalize(loc.name);
    const list = locationsByNormName.get(key) ?? [];
    list.push(loc);
    locationsByNormName.set(key, list);
  }

  const anchors: CalibrationAnchor[] = [];
  for (const [key, matchingGraces] of gracesByNormName) {
    if (matchingGraces.length !== 1) continue; // ambiguous grace name - excluded
    const matchingLocations = locationsByNormName.get(key);
    if (!matchingLocations || matchingLocations.length !== 1) continue; // no match, or ambiguous location name

    const grace = matchingGraces[0];
    const location = matchingLocations[0];
    anchors.push({
      name: location.name,
      category: location.category,
      regionId: location.regionId,
      existingFx: location.fx,
      existingFy: location.fy,
      worldX: grace.worldX,
      worldZ: grace.worldZ,
    });
  }

  return anchors;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/src/pipeline/msb-location-match.test.ts`
Expected: PASS, all 5 tests green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/src/pipeline/msb-location-match.ts server/src/pipeline/msb-location-match.test.ts
git commit -m "Add matchGracesToLocations() for building calibration anchors"
```

---

### Task 2: Generate the real calibration anchors, with verification

**Files:**
- Create (disposable): `server/scripts/generate-calibration-anchors.ts`
- Create (permanent, committed): `tools/msb-extractor/output/calibration-anchors.json`

**Interfaces:**
- Consumes: `matchGracesToLocations()` (Task 1), `MAP_LOCATIONS` (`web/src/map/locations.ts`, already an exported `MapLocation[]` with `{ name, category, regionId, layer, fx, fy }` fields — importable directly, no parsing needed), `tools/msb-extractor/output/sites-of-grace-world.json` (Stage 2's output — array of `{ graceName: string; bonfireEntityId: number; worldX: number; worldZ: number }`).
- Produces: `tools/msb-extractor/output/calibration-anchors.json` — the input Stage 4 consumes next.

No unit test for this task — it's a thin script wiring already-tested logic to real file I/O and
a real import, matching this project's established pattern for disposable data-generation
scripts (verified by running for real, not unit tested).

- [ ] **Step 1: Write the script**

```typescript
// server/scripts/generate-calibration-anchors.ts (disposable - delete after running)
import { readFileSync, writeFileSync } from 'node:fs';
import { matchGracesToLocations, type GraceInput } from '../src/pipeline/msb-location-match.js';
import { MAP_LOCATIONS } from '../../web/src/map/locations.js';

const graces: GraceInput[] = JSON.parse(
  readFileSync('tools/msb-extractor/output/sites-of-grace-world.json', 'utf-8'),
);

const anchors = matchGracesToLocations(graces, MAP_LOCATIONS);

writeFileSync('tools/msb-extractor/output/calibration-anchors.json', JSON.stringify(anchors, null, 2));
console.log(`Wrote ${anchors.length} calibration anchors to tools/msb-extractor/output/calibration-anchors.json`);

const byRegion = new Map<string, number>();
for (const a of anchors) byRegion.set(a.regionId, (byRegion.get(a.regionId) ?? 0) + 1);
console.log('By region:');
for (const [region, count] of [...byRegion.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${region}: ${count}`);
}
```

- [ ] **Step 2: Run it for real (from the repo root)**

Run: `npx tsx server/scripts/generate-calibration-anchors.ts`
Expected: prints `Wrote 117 calibration anchors to tools/msb-extractor/output/calibration-anchors.json`, followed by a by-region breakdown matching (in some order): `liurnia: 21`, `limgrave: 17`, `caelid: 16`, `mt-gelmir: 9`, `altus-plateau: 9`, `mountaintops: 9`, `weeping-peninsula: 7`, `consecrated-snowfield: 7`, `leyndell: 5`, `farum-azula: 5`, `nokron: 3`, `haligtree: 3`, `ainsel-river: 2`, `deeproot-depths: 2`, `nokstella: 1` (no `siofra-river` or `mohgwyn-palace` lines — zero matches there, which is fine since underground regions aren't calibrated). A different count means either `locations.ts` changed since this plan was written or there's a bug — don't proceed past a mismatch without investigating.

- [ ] **Step 3: Spot-check Church of Elleh's anchor**

Open `tools/msb-extractor/output/calibration-anchors.json` and find the `"Church of Elleh"`
entry. Confirm it reads exactly:

```json
{
  "name": "Church of Elleh",
  "category": "church",
  "regionId": "limgrave",
  "existingFx": 0.793,
  "existingFy": 0.691,
  "worldX": 10711.266,
  "worldZ": 9295.338
}
```

- [ ] **Step 4: Delete the disposable script and commit the output**

```bash
rm server/scripts/generate-calibration-anchors.ts
git add tools/msb-extractor/output/calibration-anchors.json
git commit -m "Generate calibration anchors from Sites of Grace and existing locations"
```
