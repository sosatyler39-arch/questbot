# Weapon AR Calculator GUI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the ported weapon AR calculator (`server/src/calculator/`) a user-facing GUI: a single-weapon lookup page on the static `web/` Astro site.

**Architecture:** The pure calculator files get copied into `web/src/calculator/` (this codebase duplicates small ported modules per-workspace rather than sharing across `server`/`web`, which have no shared build — `web/src/map/*` already does this for the Electron client's map code). A one-time ingestion script vendors a trimmed snapshot of the live regulation JSON into `web/src/content/weapon-regulation-data.json`. A new Astro page + API route serve it; a vanilla client-side script recomputes attack power on every input change — no framework, matching `map/render.ts` and `enemies/search.ts`, the only precedent for interactivity in this codebase.

**Tech Stack:** Astro (static output), vanilla TypeScript, `node:test` via `tsx --test` (new for the `web` workspace — mirrors `server`'s existing setup).

## Global Constraints

- Single-weapon lookup only — no ranked table across all weapons (explicitly descoped in the spec).
- No new npm dependencies beyond `tsx` (already used elsewhere in this monorepo, just not yet in the `web` workspace).
- No framework (React/Vue/etc.) — vanilla DOM wiring only.
- The vendored weapon data is a one-time snapshot (like every other data source in this site) — no live fetch to a third party in production.
- Weapon select is a flat, alphabetically-sorted list of distinct `weaponName`s — no category grouping.

---

## File Structure

**Create (permanent):**
- `web/src/calculator/attributes.ts`, `attackPowerTypes.ts`, `weaponTypes.ts`, `weapon.ts`, `calculator.ts`, `scaling-curve.ts` — byte-identical copies of the same-named files in `server/src/calculator/`.
- `web/src/calculator/decode-weapon.ts` — the `decodeWeapon` half of `server/src/calculator/load-weapons.ts` (no `fetch`/`loadWeapons`).
- `web/src/calculator/decode-weapon.test.ts` — mirrors `server/src/calculator/load-weapons.test.ts`.
- `web/src/calculator/weapon-index.ts` — new pure helpers: distinct weapon names, affinity variants for a weapon, affinity label.
- `web/src/calculator/weapon-index.test.ts` — tests for the above.
- `web/src/calculator/ui.ts` — client-side DOM wiring.
- `web/src/content/weapon-regulation-data.json` — vendored data (committed).
- `web/src/pages/elden-ring/calculator-data.json.ts` — API route serving the vendored JSON at runtime (mirrors `enemies/search-index.json.ts`).
- `web/src/pages/elden-ring/calculator.astro` — the page.

**Create (disposable, deleted after Task 1):**
- `server/scripts/vendor-weapon-regulation-data.ts`

**Modify:**
- `web/src/components/SubTabs.astro` — add a 4th tab.
- `web/src/components/WikiLayout.astro` — `active` prop union grows.
- `web/package.json` — add `tsx` devDependency, `test`/`typecheck` scripts.
- `package.json` (root) — wire `web`'s test/typecheck into the root scripts.

---

### Task 1: Vendor the regulation data

**Files:**
- Create (disposable): `server/scripts/vendor-weapon-regulation-data.ts`
- Create (permanent, committed): `web/src/content/weapon-regulation-data.json`

**Interfaces:**
- Produces: `web/src/content/weapon-regulation-data.json`, shaped exactly like `RegulationData` in Task 3 (`calcCorrectGraphs`, `attackElementCorrects`, `reinforceTypes`, `scalingTiers`, `weapons: RawWeapon[]`) — every later task reads this file.

No dedicated test file — the only logic here is picking a fixed set of object keys, which isn't complex enough to be worth a test (unlike this session's earlier CSV-parsing ingestion scripts, which had real parsing logic).

- [ ] **Step 1: Write the script**

```typescript
// server/scripts/vendor-weapon-regulation-data.ts (disposable — delete after running)
import { writeFileSync } from 'node:fs';

const REGULATION_DATA_URL = 'https://eldenring.tclark.io/regulation-vanilla-v1.14.js';
const OUTPUT_PATH = 'web/src/content/weapon-regulation-data.json';

const RAW_WEAPON_FIELDS = [
  'name',
  'weaponName',
  'url',
  'affinityId',
  'weaponType',
  'requirements',
  'attack',
  'attributeScaling',
  'reinforceTypeId',
  'attackElementCorrectId',
  'calcCorrectGraphIds',
  'paired',
  'sorceryTool',
  'incantationTool',
  'dlc',
] as const;

const res = await fetch(REGULATION_DATA_URL);
const data = await res.json();

const trimmed = {
  calcCorrectGraphs: data.calcCorrectGraphs,
  attackElementCorrects: data.attackElementCorrects,
  reinforceTypes: data.reinforceTypes,
  scalingTiers: data.scalingTiers,
  weapons: data.weapons.map((raw: Record<string, unknown>) =>
    Object.fromEntries(RAW_WEAPON_FIELDS.filter((field) => field in raw).map((field) => [field, raw[field]])),
  ),
};

writeFileSync(OUTPUT_PATH, JSON.stringify(trimmed));
console.log(`Wrote ${trimmed.weapons.length} weapons to ${OUTPUT_PATH}`);
```

- [ ] **Step 2: Run it for real (from the repo root)**

Run: `npx tsx server/scripts/vendor-weapon-regulation-data.ts`
Expected: prints `Wrote 3216 weapons to web/src/content/weapon-regulation-data.json` (weapon count matches the live dataset as of this session — a materially different count on rerun means the upstream data changed, not a bug).

- [ ] **Step 3: Spot-check the output**

Open `web/src/content/weapon-regulation-data.json` and confirm one known entry looks right — search for `"name":"Uchigatana"`. It should show `"affinityId":0`, `"calcCorrectGraphIds":{}` (empty — this weapon defaults to graph 0, see the comment in Task 3's `decode-weapon.ts`), and no extra fields beyond `RAW_WEAPON_FIELDS` plus `weaponType`/`requirements`/`attack`/`attributeScaling`.

- [ ] **Step 4: Delete the disposable script and commit the vendored data**

```bash
rm server/scripts/vendor-weapon-regulation-data.ts
git add web/src/content/weapon-regulation-data.json
git commit -m "Vendor a trimmed snapshot of the weapon regulation data for the web calculator"
```

---

### Task 2: Set up the `web` workspace's test/typecheck infrastructure and copy the pure calculator files

**Files:**
- Create: `web/src/calculator/attributes.ts`, `attackPowerTypes.ts`, `weaponTypes.ts`, `weapon.ts`, `calculator.ts`, `scaling-curve.ts`
- Modify: `web/package.json`
- Modify: `package.json` (root)

**Interfaces:**
- Produces: `allAttributes`, `Attribute`, `Attributes` (attributes.ts); `AttackPowerType`, `allDamageTypes`, `allStatusTypes` (attackPowerTypes.ts); `WeaponType` (weaponTypes.ts); `Weapon`, `AttackElementCorrect` (weapon.ts); `getWeaponAttack` default export, `WeaponAttackResult` (calculator.ts); `evaluateCalcCorrectGraph`, `CalcCorrectGraph` (scaling-curve.ts) — all consumed by Task 3's `decode-weapon.ts` and Task 5's `ui.ts`.

The `web` workspace has no test runner or typecheck script today (its `package.json` only has `dev`/`build`/`preview`/`astro`). This task adds both before any new code needs them.

- [ ] **Step 1: Add test/typecheck scripts and the `tsx` devDependency to `web/package.json`**

Current `web/package.json`:

```json
{
  "name": "web",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^7.1.6"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.10",
    "typescript": "^5.9.3"
  }
}
```

Change the `scripts` and `devDependencies` blocks to:

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "tsx --test src/**/*.test.ts",
    "typecheck": "tsc --noEmit"
  },
```

```json
  "devDependencies": {
    "@astrojs/check": "^0.9.10",
    "@types/node": "^26.1.1",
    "tsx": "^4.19.0",
    "typescript": "^5.9.3"
  }
```

`@types/node` (matching the version already used in `server/package.json`) is needed for the test files added in Tasks 3–4, which import `node:test`/`node:assert/strict` — without it, `tsc` can't resolve those module types and `npm run typecheck -w web` fails.

- [ ] **Step 2: Install**

Run: `npm install` (from the repo root)
Expected: `tsx` and `@types/node` installed for the `web` workspace, no errors.

- [ ] **Step 3: Wire `web` into the root scripts**

In `package.json` (root), change:

```json
    "test": "npm test -w server && npm test -w client",
    "typecheck": "npm run typecheck -w server && npm run typecheck -w client"
```

to:

```json
    "test": "npm test -w server && npm test -w client && npm test -w web",
    "typecheck": "npm run typecheck -w server && npm run typecheck -w client && npm run typecheck -w web"
```

- [ ] **Step 4: Run the (currently empty) test/typecheck scripts to confirm they work**

Run: `npm test -w web`
Expected: `tsx --test` reports no test files found (there are none yet) and exits 0 — not an error, just nothing to run.

Run: `npm run typecheck -w web`
Expected: PASS, no errors (existing `.ts` files like `map/*.ts` and `enemies/search.ts` already typecheck cleanly since the site is deployed and working).

- [ ] **Step 5: Copy the six pure calculator files verbatim**

```typescript
// web/src/calculator/attributes.ts
export const allAttributes = ["str", "dex", "int", "fai", "arc"] as const;

export type Attribute = (typeof allAttributes)[number];
export type Attributes = Record<Attribute, number>;
```

```typescript
// web/src/calculator/attackPowerTypes.ts
export const AttackPowerType = {
  PHYSICAL: 0,
  MAGIC: 1,
  FIRE: 2,
  LIGHTNING: 3,
  HOLY: 4,
  POISON: 5,
  SCARLET_ROT: 6,
  BLEED: 7,
  FROST: 8,
  SLEEP: 9,
  MADNESS: 10,
  DEATH_BLIGHT: 11,
} as const;

export type AttackPowerType = (typeof AttackPowerType)[keyof typeof AttackPowerType];

export const allDamageTypes: AttackPowerType[] = [
  AttackPowerType.PHYSICAL,
  AttackPowerType.MAGIC,
  AttackPowerType.FIRE,
  AttackPowerType.LIGHTNING,
  AttackPowerType.HOLY,
];

export const allStatusTypes: AttackPowerType[] = [
  AttackPowerType.POISON,
  AttackPowerType.SCARLET_ROT,
  AttackPowerType.BLEED,
  AttackPowerType.FROST,
  AttackPowerType.SLEEP,
  AttackPowerType.MADNESS,
  AttackPowerType.DEATH_BLIGHT,
];

export const allAttackPowerTypes = [...allDamageTypes, ...allStatusTypes];
```

```typescript
// web/src/calculator/weaponTypes.ts
export const WeaponType = {
  DAGGER: 1,
  STRAIGHT_SWORD: 3,
  GREATSWORD: 5,
  COLOSSAL_SWORD: 7,
  CURVED_SWORD: 9,
  CURVED_GREATSWORD: 11,
  KATANA: 13,
  TWINBLADE: 14,
  THRUSTING_SWORD: 15,
  HEAVY_THRUSTING_SWORD: 16,
  AXE: 17,
  GREATAXE: 19,
  HAMMER: 21,
  GREAT_HAMMER: 23,
  FLAIL: 24,
  SPEAR: 25,
  GREAT_SPEAR: 28,
  HALBERD: 29,
  REAPER: 31,
  FIST: 35,
  CLAW: 37,
  WHIP: 39,
  COLOSSAL_WEAPON: 41,
  LIGHT_BOW: 50,
  BOW: 51,
  GREATBOW: 53,
  CROSSBOW: 55,
  BALLISTA: 56,
  GLINTSTONE_STAFF: 57,
  DUAL_CATALYST: 59,
  SACRED_SEAL: 61,
  SMALL_SHIELD: 65,
  MEDIUM_SHIELD: 67,
  GREATSHIELD: 69,
  TORCH: 87,
  HAND_TO_HAND: 88,
  PERFUME_BOTTLE: 89,
  THRUSTING_SHIELD: 90,
  THROWING_BLADE: 91,
  BACKHAND_BLADE: 92,
  LIGHT_GREATSWORD: 93,
  GREAT_KATANA: 94,
  BEAST_CLAW: 95,
} as const;

export type WeaponType = (typeof WeaponType)[keyof typeof WeaponType];
```

```typescript
// web/src/calculator/weapon.ts
import type { Attribute } from "./attributes.js";
import type { AttackPowerType } from "./attackPowerTypes.js";
import type { WeaponType } from "./weaponTypes.js";

export type AttackElementCorrect = Partial<
  Record<AttackPowerType, Partial<Record<Attribute, number | true>>>
>;

export interface Weapon {
  name: string;
  weaponName: string;
  variant?: string;
  url: string | null;
  affinityId: number;
  weaponType: WeaponType;
  requirements: Partial<Record<Attribute, number>>;
  attributeScaling: Partial<Record<Attribute, number>>[];
  attack: Partial<Record<AttackPowerType, number>>[];
  attackElementCorrect: AttackElementCorrect;
  calcCorrectGraphs: Record<AttackPowerType, number[]>;
  paired?: boolean;
  sorceryTool?: boolean;
  incantationTool?: boolean;
  scalingTiers: [number, string][];
  dlc: boolean;
}
```

```typescript
// web/src/calculator/calculator.ts
import { allAttributes, type Attribute, type Attributes } from "./attributes.js";
import { AttackPowerType, allDamageTypes, allStatusTypes } from "./attackPowerTypes.js";
import type { Weapon } from "./weapon.js";
import { WeaponType } from "./weaponTypes.js";

interface WeaponAttackOptions {
  weapon: Weapon;
  attributes: Attributes;
  twoHanding?: boolean;
  upgradeLevel: number;
  disableTwoHandingAttackPowerBonus?: boolean;
  ineffectiveAttributePenalty?: number;
}

export interface WeaponAttackResult {
  upgradeLevel: number;
  attackPower: Partial<Record<AttackPowerType, number>>;
  spellScaling: Partial<Record<AttackPowerType, number>>;
  ineffectiveAttributes: Attribute[];
  ineffectiveAttackPowerTypes: AttackPowerType[];
}

/**
 * Adjust a set of character attributes to take into account the 50% Strength bonus when two
 * handing a weapon
 */
export function adjustAttributesForTwoHanding({
  twoHanding = false,
  weapon,
  attributes,
}: {
  twoHanding?: boolean;
  weapon: Weapon;
  attributes: Attributes;
}): Attributes {
  let twoHandingBonus = twoHanding;

  if (weapon.paired) {
    twoHandingBonus = false;
  }

  if (
    weapon.weaponType === WeaponType.LIGHT_BOW ||
    weapon.weaponType === WeaponType.BOW ||
    weapon.weaponType === WeaponType.GREATBOW ||
    weapon.weaponType === WeaponType.BALLISTA
  ) {
    twoHandingBonus = true;
  }

  if (twoHandingBonus) {
    return {
      ...attributes,
      str: Math.floor(attributes.str * 1.5),
    };
  }

  return attributes;
}

/**
 * Determine the damage for a weapon with the given player stats
 */
export default function getWeaponAttack({
  weapon,
  attributes,
  twoHanding,
  upgradeLevel,
  disableTwoHandingAttackPowerBonus,
  ineffectiveAttributePenalty = 0.4,
}: WeaponAttackOptions): WeaponAttackResult {
  const adjustedAttributes = adjustAttributesForTwoHanding({ twoHanding, weapon, attributes });

  const ineffectiveAttributes = (Object.entries(weapon.requirements) as [Attribute, number][])
    .filter(([attribute, requirement]) => adjustedAttributes[attribute] < requirement)
    .map(([attribute]) => attribute);

  const ineffectiveAttackPowerTypes: AttackPowerType[] = [];

  const attackPower: Partial<Record<AttackPowerType, number>> = {};
  const spellScaling: Partial<Record<AttackPowerType, number>> = {};

  for (const attackPowerType of [...allDamageTypes, ...allStatusTypes]) {
    const isDamageType = allDamageTypes.includes(attackPowerType);

    const baseAttackPower = weapon.attack[upgradeLevel][attackPowerType] ?? 0;
    if (baseAttackPower || weapon.sorceryTool || weapon.incantationTool) {
      const scalingAttributes = weapon.attackElementCorrect[attackPowerType] ?? {};

      let totalScaling = 1;

      if (ineffectiveAttributes.some((attribute) => scalingAttributes[attribute])) {
        totalScaling = 1 - ineffectiveAttributePenalty;
        ineffectiveAttackPowerTypes.push(attackPowerType);
      } else {
        const effectiveAttributes =
          !disableTwoHandingAttackPowerBonus && isDamageType ? adjustedAttributes : attributes;
        for (const attribute of allAttributes) {
          const attributeCorrect = scalingAttributes[attribute];
          if (attributeCorrect) {
            let scaling: number;
            if (attributeCorrect === true) {
              scaling = weapon.attributeScaling[upgradeLevel][attribute] ?? 0;
            } else {
              scaling =
                (attributeCorrect * (weapon.attributeScaling[upgradeLevel][attribute] ?? 0)) /
                (weapon.attributeScaling[0][attribute] ?? 0);
            }

            if (scaling) {
              totalScaling +=
                weapon.calcCorrectGraphs[attackPowerType][effectiveAttributes[attribute]] * scaling;
            }
          }
        }
      }

      if (baseAttackPower) {
        attackPower[attackPowerType] = baseAttackPower * totalScaling;
      }

      if (isDamageType && (weapon.sorceryTool || weapon.incantationTool)) {
        spellScaling[attackPowerType] = 100 * totalScaling;
      }
    }
  }

  return {
    upgradeLevel,
    attackPower,
    spellScaling,
    ineffectiveAttributes,
    ineffectiveAttackPowerTypes,
  };
}
```

```typescript
// web/src/calculator/scaling-curve.ts
export interface CalcCorrectGraphPoint {
  maxVal: number;
  maxGrowVal: number;
  adjPt: number;
}

export type CalcCorrectGraph = CalcCorrectGraphPoint[];

/**
 * Expands a CalcCorrectGraph's 5 breakpoints into a lookup array indexed by attribute
 * investment (1 to 148), interpolating between each pair of breakpoints. Ported verbatim from
 * ThomasJClark/elden-ring-weapon-calculator's regulationData.ts (MIT license).
 */
export function evaluateCalcCorrectGraph(calcCorrectGraph: CalcCorrectGraph): number[] {
  const arr: number[] = [];

  for (let i = 1; i < calcCorrectGraph.length; i++) {
    const prevStage = calcCorrectGraph[i - 1];
    const stage = calcCorrectGraph[i];

    const minAttributeValue = i === 1 ? 1 : prevStage.maxVal + 1;
    const maxAttributeValue = i === calcCorrectGraph.length - 1 ? 148 : stage.maxVal;

    for (
      let attributeValue = minAttributeValue;
      attributeValue <= maxAttributeValue;
      attributeValue++
    ) {
      if (!arr[attributeValue]) {
        let ratio = Math.max(
          0,
          Math.min(1, (attributeValue - prevStage.maxVal) / (stage.maxVal - prevStage.maxVal)),
        );

        if (prevStage.adjPt > 0) {
          ratio = ratio ** prevStage.adjPt;
        } else if (prevStage.adjPt < 0) {
          ratio = 1 - (1 - ratio) ** -prevStage.adjPt;
        }

        arr[attributeValue] =
          prevStage.maxGrowVal + (stage.maxGrowVal - prevStage.maxGrowVal) * ratio;
      }
    }
  }

  return arr;
}
```

- [ ] **Step 6: Typecheck**

Run: `npm run typecheck -w web`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add web/package.json package.json web/src/calculator/attributes.ts web/src/calculator/attackPowerTypes.ts web/src/calculator/weaponTypes.ts web/src/calculator/weapon.ts web/src/calculator/calculator.ts web/src/calculator/scaling-curve.ts
git commit -m "Copy the pure weapon calculator files into the web workspace"
```

---

### Task 3: `decode-weapon.ts`, with tests

**Files:**
- Create: `web/src/calculator/decode-weapon.ts`
- Create: `web/src/calculator/decode-weapon.test.ts`

**Interfaces:**
- Consumes: `Attribute` (attributes.ts), `AttackPowerType` (attackPowerTypes.ts), `Weapon`/`AttackElementCorrect` (weapon.ts), `evaluateCalcCorrectGraph`/`CalcCorrectGraph` (scaling-curve.ts) — all from Task 2.
- Produces: `RawWeapon`, `RegulationData` types, `decodeWeapon(raw: RawWeapon, data: RegulationData): Weapon` — consumed by Task 4's `weapon-index.ts` and Task 6's `ui.ts`.

This is the same `decodeWeapon` already tested and verified against the live site in `server/src/calculator/load-weapons.ts` — copied here without its `loadWeapons()`/`fetch()` half, since the web workspace gets its data from the vendored JSON (Task 1) via a runtime `fetch` to its own API route (Task 5), not a live third-party fetch.

- [ ] **Step 1: Write the failing test**

```typescript
// web/src/calculator/decode-weapon.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeWeapon, type RawWeapon, type RegulationData } from './decode-weapon.js';
import { AttackPowerType } from './attackPowerTypes.js';

const testData: RegulationData = {
  calcCorrectGraphs: {
    '0': [
      { maxVal: 1, maxGrowVal: 5, adjPt: 1 },
      { maxVal: 150, maxGrowVal: 5, adjPt: 1 },
    ],
    '1': [
      { maxVal: 1, maxGrowVal: 0, adjPt: 1 },
      { maxVal: 150, maxGrowVal: 1, adjPt: 1 },
    ],
  },
  attackElementCorrects: {
    '10000': { [AttackPowerType.PHYSICAL]: { str: true } },
  },
  reinforceTypes: {
    '100': [
      { attack: { '0': 1 }, attributeScaling: { str: 1 } },
      { attack: { '0': 1.1 }, attributeScaling: { str: 1.05 } },
    ],
  },
  scalingTiers: [],
  weapons: [],
};

const testRawWeapon: RawWeapon = {
  name: 'Test Dagger',
  weaponName: 'Test Dagger',
  affinityId: 0,
  weaponType: 1,
  requirements: { str: 5 },
  attack: [[AttackPowerType.PHYSICAL, 100]],
  attributeScaling: [['str', 0.5]],
  reinforceTypeId: 100,
  attackElementCorrectId: 10000,
  calcCorrectGraphIds: { [AttackPowerType.PHYSICAL]: 1 },
};

test('decodeWeapon expands reinforceTypeId into per-upgrade-level attack/attributeScaling', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  // Floating-point multiplication (100 * 1.1) doesn't land on an exact
  // decimal, so compare with a tolerance rather than strict equality.
  assert.equal(weapon.attack[0][AttackPowerType.PHYSICAL], 100);
  assert.ok(Math.abs(weapon.attack[1][AttackPowerType.PHYSICAL]! - 110) < 1e-9);
  assert.equal(weapon.attributeScaling[0].str, 0.5);
  assert.ok(Math.abs(weapon.attributeScaling[1].str! - 0.525) < 1e-9);
});

test('decodeWeapon resolves calcCorrectGraphIds into evaluated lookup arrays', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  assert.equal(weapon.calcCorrectGraphs[AttackPowerType.PHYSICAL].length, 149);
  assert.equal(weapon.calcCorrectGraphs[AttackPowerType.PHYSICAL][1], 0);
});

test('decodeWeapon passes attackElementCorrect through directly', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  assert.deepEqual(weapon.attackElementCorrect, { [AttackPowerType.PHYSICAL]: { str: true } });
});

test('decodeWeapon throws on an unknown reinforceTypeId rather than silently producing wrong data', () => {
  const badWeapon = { ...testRawWeapon, reinforceTypeId: 999 };
  assert.throws(() => decodeWeapon(badWeapon, testData), /Unknown reinforceTypeId/);
});

test('decodeWeapon defaults a damage type missing from calcCorrectGraphIds to graph "0"', () => {
  // Real regulation data omits a type's entry from calcCorrectGraphIds when it uses the
  // standard graph (id 0) — e.g. every standard-affinity melee weapon's physical scaling.
  const weaponWithNoOverride: RawWeapon = { ...testRawWeapon, calcCorrectGraphIds: {} };
  const weapon = decodeWeapon(weaponWithNoOverride, testData);
  assert.equal(weapon.calcCorrectGraphs[AttackPowerType.PHYSICAL][1], 5);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test web/src/calculator/decode-weapon.test.ts`
Expected: FAIL — `decode-weapon.ts` doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// web/src/calculator/decode-weapon.ts
import type { Attribute } from './attributes.js';
import type { AttackPowerType } from './attackPowerTypes.js';
import type { Weapon, AttackElementCorrect } from './weapon.js';
import { evaluateCalcCorrectGraph, type CalcCorrectGraph } from './scaling-curve.js';

export interface RawReinforceLevel {
  attack: Record<string, number>;
  attributeScaling: Record<string, number>;
}

export interface RawWeapon {
  name: string;
  weaponName: string;
  url?: string;
  affinityId: number;
  weaponType: number;
  requirements: Partial<Record<Attribute, number>>;
  attack: [AttackPowerType, number][];
  attributeScaling: [Attribute, number][];
  reinforceTypeId: number;
  attackElementCorrectId: number;
  calcCorrectGraphIds: Partial<Record<AttackPowerType, number>>;
  paired?: boolean;
  sorceryTool?: boolean;
  incantationTool?: boolean;
  dlc?: boolean;
}

export interface RegulationData {
  calcCorrectGraphs: Record<string, CalcCorrectGraph>;
  attackElementCorrects: Record<string, AttackElementCorrect>;
  reinforceTypes: Record<string, RawReinforceLevel[]>;
  scalingTiers: [number, string][];
  weapons: RawWeapon[];
}

export function decodeWeapon(raw: RawWeapon, data: RegulationData): Weapon {
  const reinforceLevels = data.reinforceTypes[raw.reinforceTypeId];
  if (!reinforceLevels) {
    throw new Error(`Unknown reinforceTypeId ${raw.reinforceTypeId} on "${raw.name}"`);
  }

  const attack = reinforceLevels.map((level) =>
    Object.fromEntries(raw.attack.map(([type, base]) => [type, base * (level.attack[type] ?? 1)])),
  );

  const attributeScaling = reinforceLevels.map((level) =>
    Object.fromEntries(
      raw.attributeScaling.map(([attr, base]) => [attr, base * (level.attributeScaling[attr] ?? 1)]),
    ),
  );

  // The live regulation data omits a damage type's entry from calcCorrectGraphIds when it
  // uses the standard graph (id 0) — e.g. every standard-affinity melee weapon's physical
  // scaling. So every type the weapon actually deals damage in needs a graph, defaulting to
  // graph 0 when calcCorrectGraphIds doesn't override it.
  const damageTypes = new Set([
    ...raw.attack.map(([type]) => String(type)),
    ...Object.keys(raw.calcCorrectGraphIds),
  ]);
  const calcCorrectGraphs = Object.fromEntries(
    [...damageTypes].map((type) => {
      const graphId = raw.calcCorrectGraphIds[type as unknown as AttackPowerType] ?? 0;
      const graph = data.calcCorrectGraphs[graphId];
      if (!graph) {
        throw new Error(`Unknown calcCorrectGraph ${graphId} on "${raw.name}"`);
      }
      return [type, evaluateCalcCorrectGraph(graph)];
    }),
  ) as Record<AttackPowerType, number[]>;

  const attackElementCorrect = data.attackElementCorrects[raw.attackElementCorrectId];
  if (!attackElementCorrect) {
    throw new Error(`Unknown attackElementCorrectId ${raw.attackElementCorrectId} on "${raw.name}"`);
  }

  return {
    name: raw.name,
    weaponName: raw.weaponName,
    url: raw.url ?? null,
    affinityId: raw.affinityId,
    weaponType: raw.weaponType as Weapon['weaponType'],
    requirements: raw.requirements,
    attributeScaling,
    attack,
    attackElementCorrect,
    calcCorrectGraphs,
    paired: raw.paired,
    sorceryTool: raw.sorceryTool,
    incantationTool: raw.incantationTool,
    scalingTiers: data.scalingTiers,
    dlc: raw.dlc ?? false,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test web/src/calculator/decode-weapon.test.ts`
Expected: PASS, all 5 tests green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w web`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/calculator/decode-weapon.ts web/src/calculator/decode-weapon.test.ts
git commit -m "Add decode-weapon.ts to the web calculator module"
```

---

### Task 4: `weapon-index.ts` helpers, with tests

**Files:**
- Create: `web/src/calculator/weapon-index.ts`
- Create: `web/src/calculator/weapon-index.test.ts`

**Interfaces:**
- Consumes: `RawWeapon` (Task 3).
- Produces: `distinctWeaponNames(weapons: RawWeapon[]): string[]`, `affinitiesForWeapon(weaponName: string, weapons: RawWeapon[]): RawWeapon[]`, `affinityLabel(weapon: RawWeapon): string` — consumed by Task 5's `calculator.astro` (`distinctWeaponNames`) and Task 6's `ui.ts` (`affinitiesForWeapon`, `affinityLabel`).

`affinityLabel` strips the weapon's own name off the end of its full display name to get the affinity prefix (e.g. `"Heavy Dagger"` minus `"Dagger"` → `"Heavy"`) — confirmed against the real regulation data during brainstorming: `name` is exactly `"{Affinity} {weaponName}"` for every affinity variant (affinityId 1–12), and equals `weaponName` exactly for Standard (affinityId 0) and single-affinity weapons like catalysts/seals (affinityId -1).

- [ ] **Step 1: Write the failing test**

```typescript
// web/src/calculator/weapon-index.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { distinctWeaponNames, affinitiesForWeapon, affinityLabel } from './weapon-index.js';
import type { RawWeapon } from './decode-weapon.js';

function makeWeapon(overrides: Partial<RawWeapon>): RawWeapon {
  return {
    name: 'Dagger',
    weaponName: 'Dagger',
    affinityId: 0,
    weaponType: 1,
    requirements: {},
    attack: [],
    attributeScaling: [],
    reinforceTypeId: 100,
    attackElementCorrectId: 10000,
    calcCorrectGraphIds: {},
    ...overrides,
  };
}

test('distinctWeaponNames returns one sorted entry per weaponName, dropping affinity duplicates', () => {
  const weapons = [
    makeWeapon({ name: 'Heavy Dagger', weaponName: 'Dagger', affinityId: 1 }),
    makeWeapon({ name: 'Dagger', weaponName: 'Dagger', affinityId: 0 }),
    makeWeapon({ name: 'Longsword', weaponName: 'Longsword', affinityId: 0 }),
  ];
  assert.deepEqual(distinctWeaponNames(weapons), ['Dagger', 'Longsword']);
});

test('affinitiesForWeapon returns only that weapon\'s variants, sorted by affinityId', () => {
  const dagger0 = makeWeapon({ name: 'Dagger', weaponName: 'Dagger', affinityId: 0 });
  const dagger1 = makeWeapon({ name: 'Heavy Dagger', weaponName: 'Dagger', affinityId: 1 });
  const longsword = makeWeapon({ name: 'Longsword', weaponName: 'Longsword', affinityId: 0 });
  const result = affinitiesForWeapon('Dagger', [longsword, dagger1, dagger0]);
  assert.deepEqual(result, [dagger0, dagger1]);
});

test('affinityLabel returns "Standard" for affinityId 0 and -1', () => {
  assert.equal(
    affinityLabel(makeWeapon({ name: 'Dagger', weaponName: 'Dagger', affinityId: 0 })),
    'Standard',
  );
  assert.equal(
    affinityLabel(
      makeWeapon({ name: 'Glintstone Staff', weaponName: 'Glintstone Staff', affinityId: -1 }),
    ),
    'Standard',
  );
});

test('affinityLabel strips the trailing weaponName to get the affinity prefix', () => {
  assert.equal(
    affinityLabel(makeWeapon({ name: 'Heavy Dagger', weaponName: 'Dagger', affinityId: 1 })),
    'Heavy',
  );
  assert.equal(
    affinityLabel(makeWeapon({ name: 'Flame Art Dagger', weaponName: 'Dagger', affinityId: 5 })),
    'Flame Art',
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test web/src/calculator/weapon-index.test.ts`
Expected: FAIL — `weapon-index.ts` doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// web/src/calculator/weapon-index.ts
import type { RawWeapon } from './decode-weapon.js';

export function distinctWeaponNames(weapons: RawWeapon[]): string[] {
  return [...new Set(weapons.map((w) => w.weaponName))].sort((a, b) => a.localeCompare(b));
}

export function affinitiesForWeapon(weaponName: string, weapons: RawWeapon[]): RawWeapon[] {
  return weapons
    .filter((w) => w.weaponName === weaponName)
    .sort((a, b) => a.affinityId - b.affinityId);
}

export function affinityLabel(weapon: RawWeapon): string {
  if (weapon.affinityId <= 0) return 'Standard';
  return weapon.name.slice(0, weapon.name.length - weapon.weaponName.length - 1);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test web/src/calculator/weapon-index.test.ts`
Expected: PASS, all 4 tests green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w web`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/calculator/weapon-index.ts web/src/calculator/weapon-index.test.ts
git commit -m "Add weapon-index.ts helpers for the web calculator"
```

---

### Task 5: The API route and the page markup

**Files:**
- Create: `web/src/pages/elden-ring/calculator-data.json.ts`
- Create: `web/src/pages/elden-ring/calculator.astro`
- Modify: `web/src/components/SubTabs.astro`
- Modify: `web/src/components/WikiLayout.astro`

**Interfaces:**
- Consumes: `web/src/content/weapon-regulation-data.json` (Task 1), `distinctWeaponNames` (Task 4).
- Produces: `/elden-ring/calculator-data.json` (runtime-fetchable endpoint, consumed by Task 6's `ui.ts`), the DOM element IDs Task 6 wires up: `calc-weapon`, `calc-affinity`, `calc-level`, `calc-str`, `calc-dex`, `calc-int`, `calc-fai`, `calc-arc`, `calc-two-handing`, `calc-output`.

No new tests in this task — `.astro` files and markup aren't unit tested anywhere in this codebase (verified manually in the browser, per existing convention). Task 6 adds the interactive script; this task is markup/plumbing only, so there's nothing to click yet — verification is deferred to Task 7.

- [ ] **Step 1: Add the API route**

```typescript
// web/src/pages/elden-ring/calculator-data.json.ts
import type { APIRoute } from 'astro';
import regulationData from '../../content/weapon-regulation-data.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(regulationData), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

- [ ] **Step 2: Add the 4th sub-tab**

In `web/src/components/SubTabs.astro`, change the `Props` interface and add the new tab:

```astro
---
interface Props {
  active: 'wiki' | 'map' | 'enemies' | 'calculator';
}
const { active } = Astro.props;
---
<nav class="sub-tabs">
  <a href="/elden-ring/wiki" class:list={['sub-tab', { active: active === 'wiki' }]}>Wiki</a>
  <a href="/elden-ring/map" class:list={['sub-tab', { active: active === 'map' }]}>Map</a>
  <a href="/elden-ring/enemies" class:list={['sub-tab', { active: active === 'enemies' }]}>Enemies</a>
  <a href="/elden-ring/calculator" class:list={['sub-tab', { active: active === 'calculator' }]}>Calculator</a>
</nav>
```

(The `<style>` block below the nav is unchanged — leave it as-is.)

- [ ] **Step 3: Grow `WikiLayout.astro`'s `active` prop union**

In `web/src/components/WikiLayout.astro`, change:

```astro
  active?: 'wiki' | 'map' | 'enemies';
```

to:

```astro
  active?: 'wiki' | 'map' | 'enemies' | 'calculator';
```

- [ ] **Step 4: Write the page**

```astro
---
// web/src/pages/elden-ring/calculator.astro
import WikiLayout from '../../components/WikiLayout.astro';
import regulationData from '../../content/weapon-regulation-data.json';
import { distinctWeaponNames } from '../../calculator/weapon-index.js';
import type { RawWeapon } from '../../calculator/decode-weapon.js';

const weaponNames = distinctWeaponNames(regulationData.weapons as unknown as RawWeapon[]);
---
<WikiLayout title="Weapon Calculator" active="calculator">
  <div class="calculator">
    <h1>Weapon Attack Rating Calculator</h1>
    <div class="calc-grid">
      <div class="calc-inputs">
        <label>Weapon
          <select id="calc-weapon">
            {weaponNames.map((name) => <option value={name}>{name}</option>)}
          </select>
        </label>
        <label>Affinity
          <select id="calc-affinity"></select>
        </label>
        <label>Upgrade Level
          <input id="calc-level" type="number" min="0" value="0" />
        </label>
        <label>Strength
          <input id="calc-str" type="number" min="0" value="10" />
        </label>
        <label>Dexterity
          <input id="calc-dex" type="number" min="0" value="10" />
        </label>
        <label>Intelligence
          <input id="calc-int" type="number" min="0" value="10" />
        </label>
        <label>Faith
          <input id="calc-fai" type="number" min="0" value="10" />
        </label>
        <label>Arcane
          <input id="calc-arc" type="number" min="0" value="10" />
        </label>
        <label class="calc-checkbox">
          <input id="calc-two-handing" type="checkbox" />
          Two-Handing
        </label>
      </div>
      <div id="calc-output" class="calc-output">Loading weapon data…</div>
    </div>
  </div>
</WikiLayout>
<style>
  .calculator {
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
  }
  .calc-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 32px;
    margin-top: 24px;
  }
  .calc-inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .calc-inputs label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.9em;
    color: var(--text-dim);
  }
  .calc-inputs select,
  .calc-inputs input[type='number'] {
    background: var(--bg-panel);
    color: inherit;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 6px 8px;
    font: inherit;
  }
  .calc-checkbox {
    flex-direction: row !important;
    align-items: center;
    gap: 8px !important;
  }
  .calc-output {
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 20px;
    height: fit-content;
  }
  .calc-output h2 {
    margin-top: 0;
    font-size: 1em;
    color: var(--text-dim);
  }
  .calc-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid var(--border);
  }
  .calc-warning {
    color: #d68;
    margin-top: 12px;
    font-size: 0.9em;
  }
</style>
```

Note: there's no `<script>` tag yet — Task 6 adds it once `ui.ts` exists. Without it, the page renders the form but the "Loading weapon data…" placeholder never updates. That's expected at the end of this task.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w web`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/pages/elden-ring/calculator-data.json.ts web/src/pages/elden-ring/calculator.astro web/src/components/SubTabs.astro web/src/components/WikiLayout.astro
git commit -m "Add the calculator page markup and data API route"
```

---

### Task 6: Client-side wiring

**Files:**
- Create: `web/src/calculator/ui.ts`
- Modify: `web/src/pages/elden-ring/calculator.astro`

**Interfaces:**
- Consumes: `decodeWeapon`, `RawWeapon`, `RegulationData` (Task 3); `affinitiesForWeapon`, `affinityLabel` (Task 4); `getWeaponAttack` default export, `WeaponAttackResult` (Task 2's `calculator.ts`); `Attributes` (Task 2's `attributes.ts`); `AttackPowerType`, `allDamageTypes`, `allStatusTypes` (Task 2's `attackPowerTypes.ts`); the DOM element IDs from Task 5.
- Produces: `initCalculator(): void` — called from `calculator.astro`'s `<script>` tag.

No dedicated unit test for `ui.ts` itself — it's DOM wiring (event listeners, `innerHTML` updates), which this codebase verifies manually in the browser rather than with jsdom/testing-library (no such tooling exists here). The pure logic it depends on (`decodeWeapon`, `affinitiesForWeapon`, `affinityLabel`, `getWeaponAttack`) is already tested in Tasks 2–4.

- [ ] **Step 1: Write `ui.ts`**

```typescript
// web/src/calculator/ui.ts
import { decodeWeapon, type RegulationData } from './decode-weapon.js';
import getWeaponAttack, { type WeaponAttackResult } from './calculator.js';
import type { Attributes } from './attributes.js';
import { AttackPowerType, allDamageTypes, allStatusTypes } from './attackPowerTypes.js';
import { affinitiesForWeapon, affinityLabel } from './weapon-index.js';

const DAMAGE_LABELS: Record<number, string> = {
  [AttackPowerType.PHYSICAL]: 'Physical',
  [AttackPowerType.MAGIC]: 'Magic',
  [AttackPowerType.FIRE]: 'Fire',
  [AttackPowerType.LIGHTNING]: 'Lightning',
  [AttackPowerType.HOLY]: 'Holy',
  [AttackPowerType.POISON]: 'Poison',
  [AttackPowerType.SCARLET_ROT]: 'Scarlet Rot',
  [AttackPowerType.BLEED]: 'Bleed',
  [AttackPowerType.FROST]: 'Frost',
  [AttackPowerType.SLEEP]: 'Sleep',
  [AttackPowerType.MADNESS]: 'Madness',
  [AttackPowerType.DEATH_BLIGHT]: 'Death Blight',
};

export function initCalculator(): void {
  const weaponSelect = document.getElementById('calc-weapon') as HTMLSelectElement | null;
  const affinitySelect = document.getElementById('calc-affinity') as HTMLSelectElement | null;
  const levelInput = document.getElementById('calc-level') as HTMLInputElement | null;
  const strInput = document.getElementById('calc-str') as HTMLInputElement | null;
  const dexInput = document.getElementById('calc-dex') as HTMLInputElement | null;
  const intInput = document.getElementById('calc-int') as HTMLInputElement | null;
  const faiInput = document.getElementById('calc-fai') as HTMLInputElement | null;
  const arcInput = document.getElementById('calc-arc') as HTMLInputElement | null;
  const twoHandingInput = document.getElementById('calc-two-handing') as HTMLInputElement | null;
  const output = document.getElementById('calc-output');
  if (
    !weaponSelect ||
    !affinitySelect ||
    !levelInput ||
    !strInput ||
    !dexInput ||
    !intInput ||
    !faiInput ||
    !arcInput ||
    !twoHandingInput ||
    !output
  ) {
    return;
  }

  let data: RegulationData | null = null;

  function populateAffinities(): void {
    if (!data) return;
    const variants = affinitiesForWeapon(weaponSelect!.value, data.weapons);
    affinitySelect!.innerHTML = '';
    for (const variant of variants) {
      const option = document.createElement('option');
      option.value = String(variant.affinityId);
      option.textContent = affinityLabel(variant);
      affinitySelect!.appendChild(option);
    }
  }

  function renderResult(result: WeaponAttackResult): void {
    const rows = [...allDamageTypes, ...allStatusTypes]
      .filter((type) => result.attackPower[type] !== undefined)
      .map(
        (type) =>
          `<div class="calc-row"><span>${DAMAGE_LABELS[type]}</span><span>${Math.floor(
            result.attackPower[type]!,
          )}</span></div>`,
      )
      .join('');

    const warning = result.ineffectiveAttributes.length
      ? `<div class="calc-warning">Attribute requirement not met: ${result.ineffectiveAttributes
          .join(', ')
          .toUpperCase()} (scaling reduced)</div>`
      : '';

    output!.innerHTML = `<h2>Attack Power</h2>${rows}${warning}`;
  }

  function recompute(): void {
    if (!data) return;
    const affinityId = Number(affinitySelect!.value);
    const raw = data.weapons.find(
      (w) => w.weaponName === weaponSelect!.value && w.affinityId === affinityId,
    );
    if (!raw) return;

    const weapon = decodeWeapon(raw, data);
    const maxLevel = weapon.attack.length - 1;
    levelInput!.max = String(maxLevel);
    const level = Math.max(0, Math.min(Number(levelInput!.value) || 0, maxLevel));

    const attributes: Attributes = {
      str: Number(strInput!.value) || 0,
      dex: Number(dexInput!.value) || 0,
      int: Number(intInput!.value) || 0,
      fai: Number(faiInput!.value) || 0,
      arc: Number(arcInput!.value) || 0,
    };

    const result = getWeaponAttack({
      weapon,
      attributes,
      twoHanding: twoHandingInput!.checked,
      upgradeLevel: level,
    });

    renderResult(result);
  }

  for (const input of [levelInput, strInput, dexInput, intInput, faiInput, arcInput, twoHandingInput]) {
    input.addEventListener('input', recompute);
  }
  weaponSelect.addEventListener('change', () => {
    populateAffinities();
    recompute();
  });
  affinitySelect.addEventListener('change', recompute);

  fetch('/elden-ring/calculator-data.json')
    .then((r) => r.json())
    .then((loaded: RegulationData) => {
      data = loaded;
      populateAffinities();
      recompute();
    });
}
```

- [ ] **Step 2: Wire it into the page**

In `web/src/pages/elden-ring/calculator.astro`, add this `<script>` tag directly after the closing `</WikiLayout>` tag (before the existing `<style>` block):

```astro
<script>
  import { initCalculator } from '../../calculator/ui.js';
  initCalculator();
</script>
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck -w web`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add web/src/calculator/ui.ts web/src/pages/elden-ring/calculator.astro
git commit -m "Wire up the calculator page's client-side interactivity"
```

---

### Task 7: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full test suite**

Run: `npm test` (from the repo root)
Expected: PASS — includes the new `web` tests (`decode-weapon.test.ts`, `weapon-index.test.ts`) alongside the existing `server`/`client` suites.

- [ ] **Step 2: Run the full typecheck**

Run: `npm run typecheck` (from the repo root)
Expected: PASS.

- [ ] **Step 3: Build the site**

Run: `npm run build -w web`
Expected: PASS, no errors. Confirms `calculator.astro` and `calculator-data.json.ts` both prerender correctly in static output mode (the same mode `enemies/search-index.json.ts` already uses successfully).

- [ ] **Step 4: Manual browser verification**

Start the dev server (`astro dev --background` per this workspace's `web/CLAUDE.md`), navigate to `/elden-ring/calculator`, and confirm:
- The "Calculator" tab appears in the sub-tab nav and is highlighted active.
- The weapon `<select>` is populated and alphabetically sorted.
- Select **Uchigatana**, set **Upgrade Level** to `25`, **Strength** to `15`, **Dexterity** to `40`, leave Intelligence/Faith/Arcane at their defaults changed to `0`, leave Two-Handing unchecked.
- The output shows **Physical: 438** — matching the value already verified against the live `eldenring.tclark.io` calculator in the previous sub-project.
- Switch the **Affinity** dropdown to a non-Standard option (e.g. Heavy) and confirm the output updates to a different number without a page reload.

- [ ] **Step 5: Stop the dev server**

Run: `astro dev stop` (per `web/CLAUDE.md`).
