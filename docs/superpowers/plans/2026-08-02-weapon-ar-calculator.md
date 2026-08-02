# Weapon Attack Rating Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the real, MIT-licensed weapon attack-rating calculator into `server/src/calculator/` as a self-contained, tested module a future GUI can call directly.

**Architecture:** Four files ported near-verbatim from `ThomasJClark/elden-ring-weapon-calculator` (types + the core AR formula + the scaling-curve interpolation function), plus one new loader module that decodes the raw regulation JSON (already used for `weapons.ts`) into the shape the ported calculator expects.

**Tech Stack:** TypeScript, Node's built-in `fetch`, `node:test` + `assert/strict` (this project's established test convention).

## Global Constraints

- No GUI, no API endpoint — this pass produces a callable module only.
- Ported files stay as close to the original source as this project's module conventions require (ESM `.js`-extension imports, no other logic changes).
- The loader must fail loudly (throw) on an unrecognized ID reference rather than silently producing wrong numbers.
- No new npm dependencies.

---

## File Structure

**Create (permanent):**
- `server/src/calculator/attributes.ts` — ported verbatim
- `server/src/calculator/attackPowerTypes.ts` — ported verbatim
- `server/src/calculator/weaponTypes.ts` — ported verbatim
- `server/src/calculator/weapon.ts` — ported verbatim (import extensions adjusted)
- `server/src/calculator/calculator.ts` — ported verbatim (import extensions adjusted)
- `server/src/calculator/calculator.test.ts` — new test proving the port works in this project
- `server/src/calculator/scaling-curve.ts` — ported interpolation function + `CalcCorrectGraph` type
- `server/src/calculator/scaling-curve.test.ts` — new test against real breakpoint data
- `server/src/calculator/load-weapons.ts` — new original loader/decoder
- `server/src/calculator/load-weapons.test.ts` — new test with a hand-built fixture

---

### Task 1: Port `attributes.ts`, `attackPowerTypes.ts`, `weaponTypes.ts` (verbatim, no logic)

**Files:**
- Create: `server/src/calculator/attributes.ts`
- Create: `server/src/calculator/attackPowerTypes.ts`
- Create: `server/src/calculator/weaponTypes.ts`

**Interfaces:**
- Produces: `allAttributes`, `Attribute`, `Attributes` (attributes.ts); `AttackPowerType`, `allDamageTypes`, `allStatusTypes`, `allAttackPowerTypes` (attackPowerTypes.ts); `WeaponType` (weaponTypes.ts) — all used by every later task in this plan.

These three files have no internal imports, so they're copied byte-for-byte from the MIT-licensed source (verified verbatim during brainstorming).

- [ ] **Step 1: Create the three files**

```typescript
// server/src/calculator/attributes.ts
export const allAttributes = ["str", "dex", "int", "fai", "arc"] as const;

export type Attribute = (typeof allAttributes)[number];
export type Attributes = Record<Attribute, number>;
```

```typescript
// server/src/calculator/attackPowerTypes.ts
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
// server/src/calculator/weaponTypes.ts
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

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS (these files have no dependents yet, so this just confirms valid syntax).

- [ ] **Step 3: Commit**

```bash
git add server/src/calculator/attributes.ts server/src/calculator/attackPowerTypes.ts server/src/calculator/weaponTypes.ts
git commit -m "Port calculator attribute/damage-type/weapon-type constants"
```

---

### Task 2: Port `weapon.ts` and `calculator.ts`, with a test proving the port works

**Files:**
- Create: `server/src/calculator/weapon.ts`
- Create: `server/src/calculator/calculator.ts`
- Create: `server/src/calculator/calculator.test.ts`

**Interfaces:**
- Consumes: `Attribute`/`Attributes` (Task 1), `AttackPowerType`/`allDamageTypes`/`allStatusTypes` (Task 1), `WeaponType` (Task 1).
- Produces: `Weapon`, `AttackElementCorrect` interfaces (weapon.ts); `getWeaponAttack` default export, `WeaponAttackResult` interface, `adjustAttributesForTwoHanding` (calculator.ts) — consumed by Task 3's loader and Task 4's smoke test.

- [ ] **Step 1: Write the failing test**

```typescript
// server/src/calculator/calculator.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import getWeaponAttack from './calculator.js';
import { AttackPowerType } from './attackPowerTypes.js';
import { WeaponType } from './weaponTypes.js';
import type { Weapon } from './weapon.js';

// A flat scaling curve (0.01 per attribute point) makes the expected math
// easy to verify by hand: at attribute value N, the curve contributes
// exactly N * 0.01 to totalScaling.
function flatGraph(rate: number): number[] {
  return Array.from({ length: 149 }, (_, i) => i * rate);
}

function makeTestWeapon(overrides: Partial<Weapon> = {}): Weapon {
  return {
    name: 'Test Dagger',
    weaponName: 'Test Dagger',
    url: null,
    affinityId: 0,
    weaponType: WeaponType.DAGGER,
    requirements: { str: 10 },
    attributeScaling: [{ str: 1 }],
    attack: [{ [AttackPowerType.PHYSICAL]: 100 }],
    attackElementCorrect: { [AttackPowerType.PHYSICAL]: { str: true } },
    calcCorrectGraphs: { [AttackPowerType.PHYSICAL]: flatGraph(0.01) } as Record<
      AttackPowerType,
      number[]
    >,
    scalingTiers: [],
    dlc: false,
    ...overrides,
  };
}

test('getWeaponAttack applies scaling when attribute requirements are met', () => {
  const weapon = makeTestWeapon();
  const result = getWeaponAttack({
    weapon,
    attributes: { str: 40, dex: 0, int: 0, fai: 0, arc: 0 },
    upgradeLevel: 0,
  });
  // totalScaling = 1 + flatGraph(0.01)[40] * 1 = 1 + 0.4 = 1.4
  // attackPower = 100 * 1.4 = 140
  assert.equal(result.attackPower[AttackPowerType.PHYSICAL], 140);
  assert.deepEqual(result.ineffectiveAttributes, []);
});

test('getWeaponAttack applies the ineffective-attribute penalty when requirements are unmet', () => {
  const weapon = makeTestWeapon();
  const result = getWeaponAttack({
    weapon,
    attributes: { str: 5, dex: 0, int: 0, fai: 0, arc: 0 },
    upgradeLevel: 0,
  });
  // requirement str:10 not met by str:5 -> penalty path: totalScaling = 1 - 0.4 = 0.6
  // attackPower = 100 * 0.6 = 60
  assert.equal(result.attackPower[AttackPowerType.PHYSICAL], 60);
  assert.deepEqual(result.ineffectiveAttributes, ['str']);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/src/calculator/calculator.test.ts`
Expected: FAIL — `calculator.ts`/`weapon.ts` don't exist yet.

- [ ] **Step 3: Write the ported implementation**

```typescript
// server/src/calculator/weapon.ts
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
// server/src/calculator/calculator.ts
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

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/src/calculator/calculator.test.ts`
Expected: PASS, both tests green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/src/calculator/weapon.ts server/src/calculator/calculator.ts server/src/calculator/calculator.test.ts
git commit -m "Port weapon attack-rating calculator core logic"
```

---

### Task 3: Port the scaling-curve interpolation function, with a test against real data

**Files:**
- Create: `server/src/calculator/scaling-curve.ts`
- Create: `server/src/calculator/scaling-curve.test.ts`

**Interfaces:**
- Produces: `CalcCorrectGraphPoint`, `CalcCorrectGraph` types, `evaluateCalcCorrectGraph(graph: CalcCorrectGraph): number[]` — consumed by Task 4's loader.

- [ ] **Step 1: Write the failing test**

Uses the real `calcCorrectGraphs["0"]` breakpoints from the live regulation data
(`https://eldenring.tclark.io/regulation-vanilla-v1.14.js`), verified directly during
brainstorming, to check exact boundary values rather than a synthetic fixture.

```typescript
// server/src/calculator/scaling-curve.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCalcCorrectGraph, type CalcCorrectGraph } from './scaling-curve.js';

const REAL_GRAPH_0: CalcCorrectGraph = [
  { maxVal: 1, maxGrowVal: 0, adjPt: 1.2 },
  { maxVal: 18, maxGrowVal: 0.25, adjPt: -1.2 },
  { maxVal: 60, maxGrowVal: 0.75, adjPt: 1 },
  { maxVal: 80, maxGrowVal: 0.9, adjPt: 1 },
  { maxVal: 150, maxGrowVal: 1.1, adjPt: 1 },
];

test('evaluateCalcCorrectGraph hits each breakpoint exactly at its maxVal boundary', () => {
  const result = evaluateCalcCorrectGraph(REAL_GRAPH_0);
  assert.equal(result[1], 0);
  assert.equal(result[18], 0.25);
  assert.equal(result[80], 0.9);
});

test('evaluateCalcCorrectGraph produces an array long enough to index up to 148', () => {
  const result = evaluateCalcCorrectGraph(REAL_GRAPH_0);
  assert.equal(result.length, 149);
  // Index 148 is capped below the final breakpoint's own maxVal (150), so it
  // never actually reaches that breakpoint's maxGrowVal (1.1) exactly —
  // ratio = (148-80)/(150-80) = 68/70, short of 1.
  assert.equal(result[148], 0.9 + 0.2 * (68 / 70));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/src/calculator/scaling-curve.test.ts`
Expected: FAIL — the module doesn't exist yet.

- [ ] **Step 3: Write the ported implementation**

```typescript
// server/src/calculator/scaling-curve.ts
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

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/src/calculator/scaling-curve.test.ts`
Expected: PASS, all 4 assertions green.

- [ ] **Step 5: Commit**

```bash
git add server/src/calculator/scaling-curve.ts server/src/calculator/scaling-curve.test.ts
git commit -m "Port scaling-curve interpolation function"
```

---

### Task 4: Write the regulation-data loader, with tests and a real end-to-end smoke check

**Files:**
- Create: `server/src/calculator/load-weapons.ts`
- Create: `server/src/calculator/load-weapons.test.ts`

**Interfaces:**
- Consumes: `Attribute` (Task 1), `AttackPowerType` (Task 1), `Weapon`/`AttackElementCorrect` (Task 2), `evaluateCalcCorrectGraph`/`CalcCorrectGraph` (Task 3).
- Produces: `RawWeapon`, `RegulationData` types, `decodeWeapon(raw: RawWeapon, data: RegulationData): Weapon`, `loadWeapons(): Promise<Weapon[]>`.

This is original code (there's no single verbatim function to port — the real app builds this
across several files), written as the direct inverse of `buildData.ts`'s `parseWeapon()` /
`parseCalcCorrectGraph()`, both read in full during brainstorming. Every raw field shape below
(`attack` as `[type, value][]` tuples, `attributeScaling` as `[attr, value][]` tuples,
`calcCorrectGraphIds` as a `{type: graphId}` record, `reinforceTypes[id]` as a 26-element
per-upgrade-level array) was verified directly against the real, live JSON during brainstorming
— not assumed from reading the source code alone.

- [ ] **Step 1: Write the failing test**

```typescript
// server/src/calculator/load-weapons.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeWeapon, type RawWeapon, type RegulationData } from './load-weapons.js';
import { AttackPowerType } from './attackPowerTypes.js';

const testData: RegulationData = {
  calcCorrectGraphs: {
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
  assert.deepEqual(weapon.attack, [{ [AttackPowerType.PHYSICAL]: 100 }, { [AttackPowerType.PHYSICAL]: 110 }]);
  assert.deepEqual(weapon.attributeScaling, [{ str: 0.5 }, { str: 0.525 }]);
});

test('decodeWeapon resolves calcCorrectGraphIds into evaluated lookup arrays', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  // Length 149 confirms the interpolated array covers indices 0-148 (the
  // full attribute range evaluateCalcCorrectGraph produces — see Task 3).
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/src/calculator/load-weapons.test.ts`
Expected: FAIL — the module doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// server/src/calculator/load-weapons.ts
import type { Attribute } from './attributes.js';
import type { AttackPowerType } from './attackPowerTypes.js';
import type { Weapon, AttackElementCorrect } from './weapon.js';
import { evaluateCalcCorrectGraph, type CalcCorrectGraph } from './scaling-curve.js';

const REGULATION_DATA_URL = 'https://eldenring.tclark.io/regulation-vanilla-v1.14.js';

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

  const calcCorrectGraphs = Object.fromEntries(
    Object.entries(raw.calcCorrectGraphIds).map(([type, graphId]) => {
      const graph = data.calcCorrectGraphs[graphId as unknown as string];
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

export async function loadWeapons(): Promise<Weapon[]> {
  const res = await fetch(REGULATION_DATA_URL);
  const data = (await res.json()) as RegulationData;
  return data.weapons.map((raw) => decodeWeapon(raw, data));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/src/calculator/load-weapons.test.ts`
Expected: PASS, all 4 tests green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/src/calculator/load-weapons.ts server/src/calculator/load-weapons.test.ts
git commit -m "Add regulation-data loader for the weapon AR calculator"
```

- [ ] **Step 7: Real end-to-end smoke check (not a permanent test — a one-time verification)**

Write a small disposable script `server/scripts/smoke-test-calculator.ts`:

```typescript
// server/scripts/smoke-test-calculator.ts (disposable — delete after running)
import { loadWeapons } from '../src/calculator/load-weapons.js';
import getWeaponAttack from '../src/calculator/calculator.js';

const weapons = await loadWeapons();
const uchigatana = weapons.find((w) => w.name === 'Uchigatana');
if (!uchigatana) throw new Error('Uchigatana not found in loaded weapon data');

const result = getWeaponAttack({
  weapon: uchigatana,
  attributes: { str: 15, dex: 40, int: 0, fai: 0, arc: 0 },
  upgradeLevel: 25,
});
console.log('Uchigatana +25, 15 STR / 40 DEX:', result.attackPower);
```

Run: `npx tsx server/scripts/smoke-test-calculator.ts`

Then navigate to `https://eldenring.tclark.io/` in the browser, select Uchigatana, set it to
+25, set Strength to 15 and Dexterity to 40 (leave other stats at the site's default minimums),
and compare the site's displayed total physical Attack Power against this script's printed
`attackPower[0]` value (physical). Expected: they match (small rounding differences are
acceptable — the live site may round for display; a large discrepancy means a real bug in the
port and must be investigated before continuing).

Delete the smoke-test script once the numbers are confirmed to match:

```bash
rm server/scripts/smoke-test-calculator.ts
```

No commit needed for this step — it's verification only, nothing to keep.
