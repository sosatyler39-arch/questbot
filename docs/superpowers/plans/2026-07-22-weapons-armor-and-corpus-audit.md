# Weapons/Armor Corpus + Full Item-Data Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the full base-game Weapons and Armor corpora (stats + locations), and audit the 8 existing item-stat categories against the same ground-truth source, fixing wrong numbers and adding missing fields without touching anything already correct.

**Architecture:** ERDB extracts item data directly from Elden Ring's own game files (not scraped from a wiki) into JSON. Two disposable conversion scripts turn that JSON into this project's `ArticlePage[]` format for `weapons.ts`/`armor.ts`. Location data for the two new categories is authored directly, same as the 8 existing categories. A disposable audit script diffs the 8 existing categories' already-authored numbers against ERDB and applies corrections in place, writing a log of what changed.

**Tech Stack:** Python 3 + `erdb` (PyPI, MIT) for extraction, WitchyBND for game-archive unpacking, TypeScript/`tsx` for the conversion and audit scripts (matching every other pipeline script in this repo).

## Global Constraints

- Weapon/armor stat numbers come **only** from ERDB's extraction of the game's own files — never scraped, never from model recall (per `stats.ts`/`talismans.ts` precedent).
- `locationNames` in any `*-locations.ts` file only ever reference real `MapLocation.name` values from `client/src/renderer/map/locations.ts` (base game only) — per the established convention in every existing `*-locations.ts` file.
- Shadow of the Erdtree (DLC) weapons/armor, and any DLC correction to the 8 existing categories, are **out of scope** this pass — ERDB's data predates the DLC (tops out at game version 1.10.0).
- The audit never touches: the "general information" pages (dungeons, churches, chests, key items, questlines, mechanics-*, starting-classes, great-enemies, evergaols), any `*-locations.ts` file, Great Runes (not numeric stats), or `[SOTE]`-tagged entries (logged as unverified instead of silently passed or failed).
- All one-off extraction/conversion/seed scripts are disposable: write, run once against real data, delete immediately after — same convention as every prior pipeline script in this project.

---

## Task 1: Fix the erdb Python environment

**Files:**
- Create (disposable, delete at the end of this task): a scratch venv under the scratchpad directory (not inside the repo).

**Interfaces:**
- Produces: a working `erdb` CLI invocable from an isolated venv, confirmed via `erdb --help`.

- [ ] **Step 1: Create an isolated venv**

```bash
python -m venv /tmp/erdb-venv   # or your OS scratchpad equivalent
```

- [ ] **Step 2: Install the `cgi` backport before erdb**

```bash
/tmp/erdb-venv/Scripts/pip install legacy-cgi
```

Expected: installs cleanly (it's a small pure-Python shim, no build step).

- [ ] **Step 3: Install erdb**

```bash
/tmp/erdb-venv/Scripts/pip install erdb
```

Expected: PASS. If it still fails with `ModuleNotFoundError: No module named 'cgi'` or any other Python-3.13+-removal error from a different transitive dependency, **stop and ask the user** whether to install a dedicated older Python (e.g. 3.11) instead of continuing to patch around it — installing a new Python version is a bigger environment change than a single backport package and deserves an explicit go-ahead.

- [ ] **Step 4: Verify the CLI runs**

```bash
/tmp/erdb-venv/Scripts/erdb --help
```

Expected: prints erdb's usage/subcommand list (confirms the install is functional, not just that pip succeeded).

- [ ] **Step 5: No commit** (nothing in this task touches the repo — the venv lives outside it).

---

## Task 2: Unpack the game install and run erdb's extraction

**Files:**
- Create (disposable, not committed): extracted JSON output under the scratchpad directory, e.g. `<scratchpad>/erdb-data/{armaments,armor,talismans,spells,tools,ashes_of_war}.json`.

**Interfaces:**
- Consumes: the working `erdb` CLI from Task 1.
- Produces: six JSON files, one per table, used by every later task in this plan.

- [ ] **Step 1: Confirm WitchyBND's exact unpack invocation**

WitchyBND's exact CLI flags for this game aren't pre-verified in this plan — check its `--help` output or README before running it against real files:

```bash
witchybnd --help
```

- [ ] **Step 2: Unpack the game's data archives (read-only against the install, output elsewhere)**

Point WitchyBND at the Elden Ring install found at
`C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING`, unpacking to a
separate scratch output directory — do not unpack in place inside the Steam
folder. Confirm the unpacked output contains a readable `regulation.bin` (or
its unpacked equivalent) before proceeding.

- [ ] **Step 3: Point erdb at the unpacked game directory**

```bash
/tmp/erdb-venv/Scripts/erdb source --game-dir "<unpacked-output-dir>/Game"
```

Expected: completes without error, prints confirmation it parsed the regulation data.

- [ ] **Step 4: Generate JSON for every table this plan needs**

```bash
/tmp/erdb-venv/Scripts/erdb generate armaments armor talismans spells tools ashes_of_war --out /tmp/erdb-data
```

Expected: six `.json` files appear in `/tmp/erdb-data`.

- [ ] **Step 5: Spot-check the output**

Open `/tmp/erdb-data/armaments.json` and confirm a known weapon (e.g. search
for `"Bloodhound's Fang"` or `"Uchigatana"`) appears with plausible stat
fields (attack power values, scaling letters, requirements, weight). Repeat
for `/tmp/erdb-data/armor.json` with a known armor piece (e.g.
`"Bull-Goat Helm"`). If names don't match what you expect, note the exact
field names and structure now — Tasks 3, 4, and 7 depend on knowing them
precisely.

- [ ] **Step 6: No commit** (extracted JSON is regenerable derived data, not authored content — it stays out of the repo, same as this session's other disposable extraction outputs).

---

## Task 3: Weapons corpus — conversion script + generated `weapons.ts`

**Files:**
- Create: `server/src/pipeline/sources/data/weapons-convert-tmp.mts` (disposable)
- Create (committed): `server/src/pipeline/sources/data/weapons.ts`
- Modify: `server/src/pipeline/sources/original-content.ts`
- Test: `server/test/weapons-convert.test.ts` (disposable — deleted along with the converter script, since it tests a script that won't exist after this task)

**Interfaces:**
- Consumes: `/tmp/erdb-data/armaments.json` (Task 2's output); `ArticlePage`/`ArticleSection` from `server/src/pipeline/sources/types.js`.
- Produces: `WEAPON_PAGES: ArticlePage[]` exported from `weapons.ts`, following the exact shape and precision conventions of `TALISMAN_PAGES` in `talismans.ts`.

- [ ] **Step 1: Write the failing test for the conversion function**

Create `server/test/weapons-convert.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { armamentsToPages, type ErdbArmament } from '../src/pipeline/sources/data/weapons-convert-tmp.js';

test('groups armaments into one page per weapon category, one section per weapon', () => {
  const sample: ErdbArmament[] = [
    {
      name: 'Uchigatana',
      category: 'Katana',
      weight: 5.5,
      requirements: { str: 12, dex: 15, int: 0, fai: 0, arc: 0 },
      scaling: { str: 'D', dex: 'D', int: '-', fai: '-', arc: '-' },
      attack: { physical: 104, magic: 0, fire: 0, lightning: 0, holy: 0 },
      skill: 'Unsheathe',
    },
    {
      name: 'Rivers of Blood',
      category: 'Katana',
      weight: 6,
      requirements: { str: 12, dex: 18, int: 0, fai: 0, arc: 20 },
      scaling: { str: '-', dex: 'D', int: '-', fai: '-', arc: 'B' },
      attack: { physical: 78, magic: 0, fire: 0, lightning: 0, holy: 0 },
      skill: 'Corpse Piler',
    },
  ];

  const pages = armamentsToPages(sample);

  assert.equal(pages.length, 1);
  assert.equal(pages[0].title, 'Katana');
  assert.equal(pages[0].sections.length, 2);
  assert.equal(pages[0].sections[0].heading, 'Uchigatana');
  assert.match(pages[0].sections[0].text, /104 physical attack/);
  assert.match(pages[0].sections[0].text, /Str 12/);
  assert.match(pages[0].sections[0].text, /Dex scaling D/);
  assert.match(pages[0].sections[0].text, /Weight 5\.5/);
  assert.match(pages[0].sections[0].text, /Unsheathe/);
});

test('omits zero requirement/scaling stats from the text', () => {
  const sample: ErdbArmament[] = [
    {
      name: 'Uchigatana',
      category: 'Katana',
      weight: 5.5,
      requirements: { str: 12, dex: 15, int: 0, fai: 0, arc: 0 },
      scaling: { str: 'D', dex: 'D', int: '-', fai: '-', arc: '-' },
      attack: { physical: 104, magic: 0, fire: 0, lightning: 0, holy: 0 },
      skill: 'Unsheathe',
    },
  ];

  const pages = armamentsToPages(sample);
  assert.doesNotMatch(pages[0].sections[0].text, /Int|Fai|Arc/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd server && npx tsx --test test/weapons-convert.test.ts
```

Expected: FAIL — `Cannot find module '../src/pipeline/sources/data/weapons-convert-tmp.js'`

- [ ] **Step 3: Write the conversion script**

Create `server/src/pipeline/sources/data/weapons-convert-tmp.mts`:

```ts
import { writeFileSync } from 'node:fs';
import type { ArticlePage } from '../types.js';

export interface ErdbArmament {
  name: string;
  category: string;
  weight: number;
  requirements: { str: number; dex: number; int: number; fai: number; arc: number };
  scaling: { str: string; dex: string; int: string; fai: string; arc: string };
  attack: { physical: number; magic: number; fire: number; lightning: number; holy: number };
  skill: string;
}

const STAT_LABELS: Record<keyof ErdbArmament['requirements'], string> = {
  str: 'Str',
  dex: 'Dex',
  int: 'Int',
  fai: 'Fai',
  arc: 'Arc',
};

function attackLine(attack: ErdbArmament['attack']): string {
  const parts = Object.entries(attack)
    .filter(([, v]) => v > 0)
    .map(([type, v]) => `${v} ${type} attack`);
  return parts.join(', ') + '.';
}

function requirementsLine(req: ErdbArmament['requirements']): string {
  const parts = (Object.keys(req) as (keyof typeof req)[])
    .filter((k) => req[k] > 0)
    .map((k) => `${STAT_LABELS[k]} ${req[k]}`);
  return parts.length > 0 ? `Requires ${parts.join(', ')}.` : 'No stat requirements.';
}

function scalingLine(scaling: ErdbArmament['scaling']): string {
  const parts = (Object.keys(scaling) as (keyof typeof scaling)[])
    .filter((k) => scaling[k] !== '-')
    .map((k) => `${STAT_LABELS[k]} scaling ${scaling[k]}`);
  return parts.length > 0 ? parts.join(', ') + '.' : '';
}

function weaponText(w: ErdbArmament): string {
  const lines = [attackLine(w.attack), requirementsLine(w.requirements), scalingLine(w.scaling)].filter(Boolean);
  lines.push(`Weight ${w.weight}.`);
  if (w.skill) lines.push(`Innate skill: ${w.skill}.`);
  return lines.join(' ');
}

export function armamentsToPages(armaments: ErdbArmament[]): ArticlePage[] {
  const byCategory = new Map<string, ErdbArmament[]>();
  for (const w of armaments) {
    const list = byCategory.get(w.category) ?? [];
    list.push(w);
    byCategory.set(w.category, list);
  }

  return [...byCategory.entries()].map(([category, weapons]) => ({
    title: category,
    url: `questbot://guide/weapon/${category.toLowerCase().replace(/\s+/g, '-')}`,
    sections: weapons.map((w) => ({ heading: w.name, text: weaponText(w) })),
  }));
}

// Run directly against Task 2's extracted JSON to produce weapons.ts.
if (import.meta.url === `file://${process.argv[1]}`) {
  const raw: ErdbArmament[] = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('node:fs').readFileSync(process.argv[2] ?? '/tmp/erdb-data/armaments.json', 'utf-8'),
  );
  const pages = armamentsToPages(raw);
  const body = `import type { ArticlePage } from '../types.js';

// Base-game weapons. Every attack/requirement/scaling/weight number comes
// directly from ERDB (github.com/EldenRingDatabase/erdb), which extracts
// this data from the game's own files — not scraped, not from model
// recall. Shadow of the Erdtree weapons are not covered (ERDB predates the
// DLC) and are deferred to a future pass.
export const WEAPON_PAGES: ArticlePage[] = ${JSON.stringify(pages, null, 2)};
`;
  writeFileSync('server/src/pipeline/sources/data/weapons.ts', body);
  console.log(`wrote weapons.ts with ${pages.length} pages, ${armaments.length} weapons`);
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd server && npx tsx --test test/weapons-convert.test.ts
```

Expected: PASS (2/2)

- [ ] **Step 5: Generate the real `weapons.ts` from Task 2's extracted data**

```bash
cd server && npx tsx src/pipeline/sources/data/weapons-convert-tmp.mts /tmp/erdb-data/armaments.json
```

Expected: `wrote weapons.ts with N pages, M weapons` — if the field names
from Task 2's spot-check differ from `ErdbArmament`'s shape above, adjust
the interface and re-run before continuing.

- [ ] **Step 6: Wire into the pipeline**

In `server/src/pipeline/sources/original-content.ts`, add the import near
the other item-category imports:

```ts
import { WEAPON_PAGES } from './data/weapons.js';
```

And add it to `ALL_PAGES`, alongside the other item categories:

```ts
  ...ASH_OF_WAR_PAGES,
  ...WEAPON_PAGES,
```

- [ ] **Step 7: Typecheck**

```bash
npm run typecheck -w server
```

Expected: clean.

- [ ] **Step 8: Delete the disposable converter script and its test**

```bash
rm server/src/pipeline/sources/data/weapons-convert-tmp.mts server/test/weapons-convert.test.ts
```

- [ ] **Step 9: Commit**

```bash
git add server/src/pipeline/sources/data/weapons.ts server/src/pipeline/sources/original-content.ts
git commit -m "Add base-game Weapons corpus, sourced from ERDB"
```

---

## Task 4: Armor corpus — conversion script + generated `armor.ts`

**Files:**
- Create: `server/src/pipeline/sources/data/armor-convert-tmp.mts` (disposable)
- Create (committed): `server/src/pipeline/sources/data/armor.ts`
- Modify: `server/src/pipeline/sources/original-content.ts`
- Test: `server/test/armor-convert.test.ts` (disposable)

**Interfaces:**
- Consumes: `/tmp/erdb-data/armor.json` (Task 2's output); `ArticlePage`/`ArticleSection` from `server/src/pipeline/sources/types.js`.
- Produces: `ARMOR_PAGES: ArticlePage[]` exported from `armor.ts`.

- [ ] **Step 1: Write the failing test**

Create `server/test/armor-convert.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { armorToPages, type ErdbArmor } from '../src/pipeline/sources/data/armor-convert-tmp.js';

test('groups armor into one page per slot, one section per piece', () => {
  const sample: ErdbArmor[] = [
    {
      name: 'Bull-Goat Helm',
      slot: 'Helm',
      weight: 8.5,
      defense: { physical: 66, magic: 40, fire: 43, lightning: 33, holy: 40 },
      resistance: { immunity: 44, robustness: 88, focus: 22, vitality: 22, poise: 21 },
    },
  ];

  const pages = armorToPages(sample);

  assert.equal(pages.length, 1);
  assert.equal(pages[0].title, 'Helm');
  assert.equal(pages[0].sections[0].heading, 'Bull-Goat Helm');
  assert.match(pages[0].sections[0].text, /66 physical defense/);
  assert.match(pages[0].sections[0].text, /Poise 21/);
  assert.match(pages[0].sections[0].text, /Weight 8\.5/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd server && npx tsx --test test/armor-convert.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the conversion script**

Create `server/src/pipeline/sources/data/armor-convert-tmp.mts`:

```ts
import { writeFileSync, readFileSync } from 'node:fs';
import type { ArticlePage } from '../types.js';

export interface ErdbArmor {
  name: string;
  slot: string;
  weight: number;
  defense: { physical: number; magic: number; fire: number; lightning: number; holy: number };
  resistance: { immunity: number; robustness: number; focus: number; vitality: number; poise: number };
}

function defenseLine(defense: ErdbArmor['defense']): string {
  const parts = Object.entries(defense).map(([type, v]) => `${v} ${type} defense`);
  return parts.join(', ') + '.';
}

function resistanceLine(resistance: ErdbArmor['resistance']): string {
  const parts = Object.entries(resistance).map(
    ([type, v]) => `${type[0].toUpperCase()}${type.slice(1)} ${v}`,
  );
  return parts.join(', ') + '.';
}

function armorText(a: ErdbArmor): string {
  return `${defenseLine(a.defense)} ${resistanceLine(a.resistance)} Weight ${a.weight}.`;
}

export function armorToPages(armor: ErdbArmor[]): ArticlePage[] {
  const bySlot = new Map<string, ErdbArmor[]>();
  for (const a of armor) {
    const list = bySlot.get(a.slot) ?? [];
    list.push(a);
    bySlot.set(a.slot, list);
  }

  return [...bySlot.entries()].map(([slot, pieces]) => ({
    title: slot,
    url: `questbot://guide/armor/${slot.toLowerCase().replace(/\s+/g, '-')}`,
    sections: pieces.map((a) => ({ heading: a.name, text: armorText(a) })),
  }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const raw: ErdbArmor[] = JSON.parse(readFileSync(process.argv[2] ?? '/tmp/erdb-data/armor.json', 'utf-8'));
  const pages = armorToPages(raw);
  const body = `import type { ArticlePage } from '../types.js';

// Base-game armor. Every defense/resistance/weight number comes directly
// from ERDB (github.com/EldenRingDatabase/erdb), extracted from the game's
// own files — not scraped, not from model recall. Shadow of the Erdtree
// armor is not covered (ERDB predates the DLC) and is deferred.
export const ARMOR_PAGES: ArticlePage[] = ${JSON.stringify(pages, null, 2)};
`;
  writeFileSync('server/src/pipeline/sources/data/armor.ts', body);
  console.log(`wrote armor.ts with ${pages.length} pages, ${armor.length} pieces`);
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd server && npx tsx --test test/armor-convert.test.ts
```

Expected: PASS

- [ ] **Step 5: Generate the real `armor.ts`**

```bash
cd server && npx tsx src/pipeline/sources/data/armor-convert-tmp.mts /tmp/erdb-data/armor.json
```

Expected: `wrote armor.ts with N pages, M pieces` (adjust `ErdbArmor` to match the real field names from Task 2's spot-check if they differ, then re-run).

- [ ] **Step 6: Wire into the pipeline**

In `server/src/pipeline/sources/original-content.ts`:

```ts
import { ARMOR_PAGES } from './data/armor.js';
```

```ts
  ...WEAPON_PAGES,
  ...ARMOR_PAGES,
```

- [ ] **Step 7: Typecheck**

```bash
npm run typecheck -w server
```

- [ ] **Step 8: Delete the disposable converter script and its test**

```bash
rm server/src/pipeline/sources/data/armor-convert-tmp.mts server/test/armor-convert.test.ts
```

- [ ] **Step 9: Commit**

```bash
git add server/src/pipeline/sources/data/armor.ts server/src/pipeline/sources/original-content.ts
git commit -m "Add base-game Armor corpus, sourced from ERDB"
```

---

## Task 5: Weapons location data

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/weapons-locations.ts`
- Create (disposable): a one-off seed script, e.g. `server/seed-weapons-locations-tmp.mts`

**Interfaces:**
- Consumes: `ItemLocationEntry` from `server/src/pipeline/sources/types.js`; `upsertItemLocations` from `server/src/pipeline/location-store.js`.
- Produces: `WEAPON_LOCATIONS: ItemLocationEntry[]`.

- [ ] **Step 1: Author the location file**

Create `server/src/pipeline/sources/data/item-locations/weapons-locations.ts`, one
entry per weapon from `WEAPON_PAGES` (Task 3), following the exact pattern
of `whetstones-great-runes-locations.ts`: authored from general game
knowledge, original phrasing, never scraped, `locationNames` only
referencing real `MapLocation.name` values (empty array when the drop
source isn't a fixed map location — e.g. a boss not yet on the map, or a
random enemy drop). Example shape (repeat for every weapon in
`WEAPON_PAGES`):

```ts
import type { ItemLocationEntry } from '../../types.js';

// Base-game weapon locations. Authored from general game knowledge,
// original phrasing, never scraped — same policy as
// whetstones-great-runes-locations.ts. locationNames only ever reference
// real MapLocation.name values (base game only).
export const WEAPON_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Uchigatana',
    locationNames: [],
    summary: 'Dropped by Bloody Finger Hunter Yura, an NPC found in Limgrave and later at other locations across the game.',
  },
  {
    itemName: "Bloodhound's Fang",
    locationNames: ['Stormveil Castle'],
    summary: 'Dropped by Bloodhound Knight Darriwil in Stormveil Castle.',
  },
  // ... one entry per weapon actually present in WEAPON_PAGES
];
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w server
```

- [ ] **Step 3: Seed the real database**

Create the disposable seed script `server/seed-weapons-locations-tmp.mts`:

```ts
import { upsertItemLocations } from './src/pipeline/location-store.js';
import { WEAPON_LOCATIONS } from './src/pipeline/sources/data/item-locations/weapons-locations.js';

await upsertItemLocations(WEAPON_LOCATIONS);
console.log(`seeded ${WEAPON_LOCATIONS.length} weapon locations`);
```

Run it (needs `DATABASE_URL` set):

```bash
cd server && npx tsx seed-weapons-locations-tmp.mts
```

Expected: `seeded N weapon locations`.

- [ ] **Step 4: Delete the disposable seed script**

```bash
rm server/seed-weapons-locations-tmp.mts
```

- [ ] **Step 5: Commit**

```bash
git add server/src/pipeline/sources/data/item-locations/weapons-locations.ts
git commit -m "Author base-game weapon locations"
```

---

## Task 6: Armor location data

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/armor-locations.ts`
- Create (disposable): `server/seed-armor-locations-tmp.mts`

**Interfaces:**
- Consumes: `ItemLocationEntry` from `server/src/pipeline/sources/types.js`; `upsertItemLocations` from `server/src/pipeline/location-store.js`.
- Produces: `ARMOR_LOCATIONS: ItemLocationEntry[]`.

- [ ] **Step 1: Author the location file**

Same pattern as Task 5, one entry per armor piece from `ARMOR_PAGES` (Task
4). Most armor comes in matched sets found together, so many entries will
share the same `locationNames`:

```ts
import type { ItemLocationEntry } from '../../types.js';

// Base-game armor locations. Authored from general game knowledge,
// original phrasing, never scraped — same policy as weapons-locations.ts.
export const ARMOR_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Bull-Goat Helm',
    locationNames: ['Volcano Manor'],
    summary: 'Part of the Bull-Goat set, dropped by Fingerprint Grape Louis and Fingerprint Golem-Curator Devola/Rya-adjacent fights tied to Volcano Manor.',
  },
  // ... one entry per armor piece actually present in ARMOR_PAGES
];
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck -w server
```

- [ ] **Step 3: Seed the real database**

```ts
import { upsertItemLocations } from './src/pipeline/location-store.js';
import { ARMOR_LOCATIONS } from './src/pipeline/sources/data/item-locations/armor-locations.js';

await upsertItemLocations(ARMOR_LOCATIONS);
console.log(`seeded ${ARMOR_LOCATIONS.length} armor locations`);
```

```bash
cd server && npx tsx seed-armor-locations-tmp.mts
```

- [ ] **Step 4: Delete the disposable seed script**

```bash
rm server/seed-armor-locations-tmp.mts
```

- [ ] **Step 5: Commit**

```bash
git add server/src/pipeline/sources/data/item-locations/armor-locations.ts
git commit -m "Author base-game armor locations"
```

---

## Task 7: Audit script for the 8 existing item categories

**Files:**
- Create: `server/src/pipeline/audit-corpus-tmp.mts` (disposable)
- Test: `server/test/audit-corpus.test.ts` (disposable)
- Create (committed): `docs/superpowers/audit-logs/2026-07-22-corpus-audit.md`
- Modify (only where the audit finds real mismatches): `server/src/pipeline/sources/data/{talismans,incantations,sorceries,consumables,ashes-of-war,crystal-tears,whetstones}.ts`

**Interfaces:**
- Consumes: `/tmp/erdb-data/{talismans,spells,tools,ashes_of_war}.json` (Task 2's output); the existing `ArticlePage[]` exports from the 8 category files.
- Produces: `type AuditOutcome = 'unchanged' | 'corrected' | 'field-added' | 'unmatched' | 'skipped-dlc'`; `reconcileItem(existing: ArticleSection, erdbFields: Record<string, string | number>): { outcome: AuditOutcome; section: ArticleSection; detail: string }`.

- [ ] **Step 1: Write the failing test**

Create `server/test/audit-corpus.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reconcileItem } from '../src/pipeline/audit-corpus-tmp.js';

test('reports unchanged when the authored text already matches ERDB', () => {
  const existing = { heading: 'Dragoncrest Shield Talisman', text: 'Raises physical damage negation by 10%.' };
  const result = reconcileItem(existing, { physNegation: 10 });
  assert.equal(result.outcome, 'unchanged');
  assert.equal(result.section.text, existing.text);
});

test('corrects a wrong number found in the authored text', () => {
  const existing = { heading: 'Dragoncrest Shield Talisman', text: 'Raises physical damage negation by 8%.' };
  const result = reconcileItem(existing, { physNegation: 10 });
  assert.equal(result.outcome, 'corrected');
  assert.match(result.section.text, /10%/);
  assert.match(result.detail, /8% .* 10%/);
});

test('skips DLC-tagged entries without comparing them', () => {
  const existing = { heading: 'Golden Braid', text: 'Raises holy damage negation by 22%. Shadow of the Erdtree.' };
  const result = reconcileItem(existing, { physNegation: 999 });
  assert.equal(result.outcome, 'skipped-dlc');
  assert.equal(result.section.text, existing.text);
});

test('flags an unmatched item name without altering it', () => {
  const existing = { heading: 'Some Renamed Talisman', text: 'Does something.' };
  const result = reconcileItem(existing, null);
  assert.equal(result.outcome, 'unmatched');
  assert.equal(result.section.text, existing.text);
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd server && npx tsx --test test/audit-corpus.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the reconciliation logic**

Create `server/src/pipeline/audit-corpus-tmp.mts`:

```ts
import { readFileSync, writeFileSync } from 'node:fs';
import type { ArticleSection } from './sources/types.js';

export type AuditOutcome = 'unchanged' | 'corrected' | 'field-added' | 'unmatched' | 'skipped-dlc';

export interface ReconcileResult {
  outcome: AuditOutcome;
  section: ArticleSection;
  detail: string;
}

const NUMBER_PATTERN = /(\d+(?:\.\d+)?)%?/g;

function isDlcTagged(section: ArticleSection): boolean {
  return /Shadow of the Erdtree/i.test(section.text);
}

// Finds the first number in `text` that differs from `expected` and swaps
// it in, preserving surrounding wording exactly. Returns null if every
// number already matches.
function correctFirstMismatch(text: string, expected: number): string | null {
  const matches = [...text.matchAll(NUMBER_PATTERN)];
  for (const m of matches) {
    if (Number(m[1]) !== expected) {
      return text.slice(0, m.index) + text.slice(m.index).replace(m[1], String(expected));
    }
  }
  return null;
}

export function reconcileItem(
  existing: ArticleSection,
  erdbFields: Record<string, number> | null,
): ReconcileResult {
  if (isDlcTagged(existing)) {
    return { outcome: 'skipped-dlc', section: existing, detail: 'DLC-tagged, not verifiable against ERDB.' };
  }
  if (erdbFields === null) {
    return { outcome: 'unmatched', section: existing, detail: `No ERDB match for "${existing.heading}".` };
  }

  for (const expected of Object.values(erdbFields)) {
    const corrected = correctFirstMismatch(existing.text, expected);
    if (corrected !== null) {
      const oldMatch = existing.text.match(NUMBER_PATTERN)?.[0] ?? '?';
      return {
        outcome: 'corrected',
        section: { heading: existing.heading, text: corrected },
        detail: `${existing.heading}: ${oldMatch} -> ${expected}`,
      };
    }
  }

  return { outcome: 'unchanged', section: existing, detail: `${existing.heading}: matches ERDB.` };
}

interface CategoryAudit {
  tsFile: string; // e.g. 'server/src/pipeline/sources/data/talismans.ts'
  exportName: string; // e.g. 'TALISMAN_PAGES'
  erdbTable: Record<string, number>; // itemName (normalized) -> the single ERDB numeric field to check
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+\+\d+$/, '').trim();
}

// Worked example for Talismans, following exactly how existing entries are
// phrased (e.g. "Raises physical damage negation by 10%." for the
// Dragoncrest Shield Talisman) — repeat this same load/match/reconcile/
// rewrite shape for the other 6 categories once Task 2's spot-check has
// confirmed each table's exact field names:
//   - incantations.ts / sorceries.ts <- erdb `spells` table
//   - consumables.ts / crystal-tears.ts / whetstones.ts <- erdb `tools` table
//   - ashes-of-war.ts <- erdb `ashes_of_war` table
function auditCategory(audit: CategoryAudit): { outcomes: ReconcileResult[]; correctedCount: number } {
  const source = readFileSync(audit.tsFile, 'utf-8');
  const pages: { title: string; url: string; sections: ArticleSection[] }[] = JSON.parse(
    source.slice(source.indexOf('['), source.lastIndexOf(']') + 1),
  );

  const outcomes: ReconcileResult[] = [];
  for (const page of pages) {
    for (let i = 0; i < page.sections.length; i++) {
      const section = page.sections[i];
      const expected = audit.erdbTable[normalizeName(section.heading)] ?? null;
      const result = reconcileItem(section, expected === null ? null : { value: expected });
      outcomes.push(result);
      page.sections[i] = result.section;
    }
  }

  const correctedCount = outcomes.filter((o) => o.outcome === 'corrected' || o.outcome === 'field-added').length;
  if (correctedCount > 0) {
    const exportLine = `export const ${audit.exportName} = ${JSON.stringify(pages, null, 2)};\n`;
    const head = source.slice(0, source.indexOf(`export const ${audit.exportName}`));
    writeFileSync(audit.tsFile, head + exportLine);
  }
  return { outcomes, correctedCount };
}

// Run directly against the 8 existing category files + Task 2's extracted
// JSON. Repeats auditCategory() once per category with that category's
// real ERDB table data (loaded from Task 2's JSON output) substituted in
// place of the Talismans example below, then writes the combined outcomes
// to docs/superpowers/audit-logs/2026-07-22-corpus-audit.md.
if (import.meta.url === `file://${process.argv[1]}`) {
  const talismanErdbTable: Record<string, number> = {}; // populate from /tmp/erdb-data/talismans.json using Task 2's confirmed field names
  const { outcomes, correctedCount } = auditCategory({
    tsFile: 'server/src/pipeline/sources/data/talismans.ts',
    exportName: 'TALISMAN_PAGES',
    erdbTable: talismanErdbTable,
  });
  console.log(`talismans: ${outcomes.length} checked, ${correctedCount} corrected`);
  // ... same auditCategory() call for the other 6 categories
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd server && npx tsx --test test/audit-corpus.test.ts
```

Expected: PASS (4/4)

- [ ] **Step 5: Wire the real category files and run the audit**

Fill in the execution-time block from Step 3: for each of the 8 files
(`talismans.ts`, `incantations.ts`, `sorceries.ts`, `consumables.ts`,
`ashes-of-war.ts`, `crystal-tears.ts`, `whetstones.ts` — Great Runes
excluded per the Global Constraints), match each section's `heading`
against the corresponding ERDB table by name (normalizing case and
upgrade-tier suffixes like "+1"/"+2"), call `reconcileItem`, collect
results. Run it:

```bash
cd server && npx tsx src/pipeline/audit-corpus-tmp.mts
```

Expected: prints a summary count per outcome type across all 8 files.

- [ ] **Step 6: Write the audit log**

Create `docs/superpowers/audit-logs/2026-07-22-corpus-audit.md` listing
every item and its outcome, grouped by category and then by outcome
(corrected items first, with old value → new value; then field-added; then
unmatched; then skipped-dlc; then a count of unchanged items — no need to
list every unchanged item by name, just the count).

- [ ] **Step 7: Typecheck**

```bash
npm run typecheck -w server
```

- [ ] **Step 8: Run the full server test suite**

```bash
npm test -w server
```

Expected: all passing (existing category-file content changes are data
corrections, not shape changes, so no existing test should break).

- [ ] **Step 9: Delete the disposable audit script and its test**

```bash
rm server/src/pipeline/audit-corpus-tmp.mts server/test/audit-corpus.test.ts
```

- [ ] **Step 10: Commit**

```bash
git add docs/superpowers/audit-logs/2026-07-22-corpus-audit.md server/src/pipeline/sources/data/talismans.ts server/src/pipeline/sources/data/incantations.ts server/src/pipeline/sources/data/sorceries.ts server/src/pipeline/sources/data/consumables.ts server/src/pipeline/sources/data/ashes-of-war.ts server/src/pipeline/sources/data/crystal-tears.ts server/src/pipeline/sources/data/whetstones.ts
git commit -m "Audit existing item corpora against ERDB, correct mismatches"
```

(If a given file had zero corrections, its `git add` is a no-op — fine to include all seven in one `add` regardless.)

---

## Task 8: Sync and live verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: `syncGame` from `server/src/pipeline/sync.js` (already wired to `ALL_PAGES` via Tasks 3-4).

- [ ] **Step 1: Re-run the full sync**

```ts
import { syncGame } from './server/src/pipeline/sync.js';
await syncGame('elden-ring');
```

Run this via `tsx` with `GEMINI_API_KEY` and `DATABASE_URL` set. Expected:
completes with the new weapon/armor chunk count added to the previous
total, zero quota errors (paid tier is already active from earlier this
session).

- [ ] **Step 2: Live retrieval spot-checks**

Against the running server, send real `/ask` requests for a sample of new
and audit-corrected items (e.g. "What's the AR on Rivers of Blood?", "What
does the Bull-Goat Helm's poise look like?", "What does the Dragoncrest
Shield Talisman do?" — the last one specifically to confirm an
audit-corrected or audit-confirmed item retrieves correctly). Record the
confidence scores.

- [ ] **Step 3: Update the README status section**

Add a paragraph following the exact style of the existing Ashes of
War/Crystal Tears paragraphs: item counts for `weapons.ts`/`armor.ts`,
the ERDB source and its DLC limitation, and the audit summary (how many
corrected, how many unmatched, link to the audit log).

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "Document Weapons/Armor corpus and corpus audit, verified live"
```
