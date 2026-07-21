# Item Location Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every item already in the corpus (talismans, incantations, sorceries, consumables, ashes of war, crystal tears, whetstones, great runes — 708 items) a "where do I find this" answer, surfaced through `/ask` and deep-linkable to the existing Map tab.

**Architecture:** A new `item_locations` Postgres table, separate from the `chunks`/pgvector pipeline (no embedding involved). `/ask`'s existing confidence-gated top match is used to look up the matched item's location by name; the summary folds into LLM synthesis and the location names ride along in the response for a client-side "Show on map" link that reuses the Map tab's existing search/center logic.

**Tech Stack:** Same as the rest of the project — Fastify + `pg` on the server, plain TS/DOM on the Electron renderer, `node:test` for both.

## Global Constraints

- Location facts are authored from general game knowledge, original phrasing, never scraped — same policy already used for `chests.ts`/`key-items.ts`/dungeon pages (per spec, Context section).
- Every item gets a real, non-empty `summary` — no item is skipped. `location_names` is the only field allowed to be empty, and only when the item's real source is genuinely diffuse (roaming merchants, common enemy drops) rather than a single point (per spec, Non-goals).
- `location_names` values must exactly match `MapLocation.name` strings in `client/src/renderer/map/locations.ts` — loose string coupling, no shared package (per spec, Data model).
- This feature must never call `embedText`/consume the Gemini embedding quota — it's a plain Postgres table, not part of the chunking/embedding pipeline (per spec, Data model).
- `client/src/renderer/types.ts` mirrors `shared/types.ts` manually (existing project convention, see that file's own header comment) — every wire-type change needs both files touched.

---

## Task 1: `item_locations` table and store functions

**Files:**
- Modify: `server/db/schema.sql`
- Modify: `server/src/pipeline/sources/types.ts`
- Create: `server/src/pipeline/location-store.ts`
- Create: `server/test/location-store.test.ts`
- Modify: `server/test/pipeline.test.ts`

**Interfaces:**
- Produces: `ItemLocationEntry { itemName: string; locationNames: string[]; summary: string }` (in `sources/types.ts`)
- Produces: `upsertItemLocations(entries: ItemLocationEntry[]): Promise<void>` (in `location-store.ts`)
- Produces: `ItemLocationResult { locationNames: string[]; summary: string }` and `getItemLocation(itemName: string): Promise<ItemLocationResult | null>` (in `location-store.ts`)
- Produces: `extractItemName(chunkTitle: string): string | null` (in `location-store.ts`) — pure function, no DB

- [ ] **Step 1: Add the table to the schema**

Append to `server/db/schema.sql`:

```sql

-- Where each item is actually found ("where do I find X"), kept separate
-- from the chunks/pgvector pipeline entirely — no embedding involved.
-- location_names ties (by exact string match, not a foreign key) to
-- MapLocation.name values in client/src/renderer/map/locations.ts; empty
-- when an item's real source is too diffuse for a single map pin (roaming
-- merchants, common enemy drops).
CREATE TABLE item_locations (
  item_name      TEXT PRIMARY KEY,
  location_names TEXT[] NOT NULL DEFAULT '{}',
  summary        TEXT NOT NULL
);
```

- [ ] **Step 2: Apply it to the local dev database**

With the local Postgres instance running (see README "Local database"), run:

```bash
psql.exe -p 5433 -U questbot -d questbot -c "CREATE TABLE item_locations (item_name TEXT PRIMARY KEY, location_names TEXT[] NOT NULL DEFAULT '{}', summary TEXT NOT NULL);"
```

(Targeted `-c`, not re-running the whole `schema.sql` — the other tables already exist and `CREATE TABLE` isn't idempotent in this schema.)

- [ ] **Step 3: Add the `ItemLocationEntry` type**

Add to `server/src/pipeline/sources/types.ts` (after the existing `ArticlePage` interface):

```ts
export interface ItemLocationEntry {
  itemName: string;
  locationNames: string[];
  summary: string;
}
```

- [ ] **Step 4: Write the failing tests**

Create `server/test/location-store.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upsertItemLocations, getItemLocation, extractItemName } from '../src/pipeline/location-store.js';

const skip = !process.env.DATABASE_URL;

test('upsert + lookup roundtrip, case-insensitive', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([
    { itemName, locationNames: ['Church of Elleh'], summary: 'Test fixture summary.' },
  ]);
  const result = await getItemLocation(itemName.toUpperCase());
  assert.deepEqual(result, { locationNames: ['Church of Elleh'], summary: 'Test fixture summary.' });
});

test('upsert overwrites an existing row for the same item name', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([{ itemName, locationNames: [], summary: 'First.' }]);
  await upsertItemLocations([{ itemName, locationNames: ['Limgrave'], summary: 'Second.' }]);
  const result = await getItemLocation(itemName);
  assert.deepEqual(result, { locationNames: ['Limgrave'], summary: 'Second.' });
});

test('unknown item returns null', { skip }, async () => {
  assert.equal(await getItemLocation(`no-such-item-${Date.now()}`), null);
});
```

Add to `server/test/pipeline.test.ts` (new `import` line at the top, plus two new `test(...)` blocks at the end):

```ts
import { extractItemName } from '../src/pipeline/location-store.js';
```

```ts
test('extractItemName: splits on the chunkArticle title separator', () => {
  assert.equal(extractItemName('Magic, skill, and FP talismans — Radagon Icon'), 'Radagon Icon');
});

test('extractItemName: returns null when there is no separator (e.g. video chunk titles)', () => {
  assert.equal(extractItemName('Some Video Title With No Heading'), null);
});
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `npm test -w server` (from repo root) or `npm test` from `server/`
Expected: FAIL — `Cannot find module '../src/pipeline/location-store.js'`

- [ ] **Step 6: Implement `location-store.ts`**

Create `server/src/pipeline/location-store.ts`:

```ts
import { pool } from '../db.js';
import type { ItemLocationEntry } from './sources/types.js';

export async function upsertItemLocations(entries: ItemLocationEntry[]): Promise<void> {
  for (const entry of entries) {
    await pool.query(
      `INSERT INTO item_locations (item_name, location_names, summary)
       VALUES ($1, $2, $3)
       ON CONFLICT (item_name) DO UPDATE
       SET location_names = EXCLUDED.location_names, summary = EXCLUDED.summary`,
      [entry.itemName, entry.locationNames, entry.summary],
    );
  }
}

export interface ItemLocationResult {
  locationNames: string[];
  summary: string;
}

export async function getItemLocation(itemName: string): Promise<ItemLocationResult | null> {
  const { rows } = await pool.query(
    `SELECT location_names, summary FROM item_locations WHERE lower(item_name) = lower($1)`,
    [itemName],
  );
  if (rows.length === 0) return null;
  return { locationNames: rows[0].location_names, summary: rows[0].summary };
}

// Article chunk titles are "{pageTitle} — {heading}" (chunking.ts's
// chunkArticle); video chunk titles have no heading suffix. Returns null
// when there's no " — " separator to split on.
export function extractItemName(chunkTitle: string): string | null {
  const sepIndex = chunkTitle.lastIndexOf(' — ');
  return sepIndex === -1 ? null : chunkTitle.slice(sepIndex + 3);
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test -w server` (needs `DATABASE_URL` pointed at the running local Postgres instance for the DB-backed tests; the `extractItemName` tests run regardless)
Expected: PASS (all new tests green; the DB tests only run when `DATABASE_URL` is set, matching the existing skip convention in `server/test/users.test.ts`)

- [ ] **Step 8: Commit**

```bash
git add server/db/schema.sql server/src/pipeline/sources/types.ts server/src/pipeline/location-store.ts server/test/location-store.test.ts server/test/pipeline.test.ts
git commit -m "Add item_locations table and location-store module"
```

---

## Task 2: Wire location lookup into `/ask`

**Files:**
- Modify: `server/src/synthesis.ts`
- Modify: `server/src/routes/ask.ts`
- Modify: `shared/types.ts`
- Modify: `client/src/renderer/types.ts`

**Interfaces:**
- Consumes: `extractItemName(chunkTitle: string): string | null`, `getItemLocation(itemName: string): Promise<ItemLocationResult | null>` (from Task 1)
- Consumes: `CONFIDENCE_THRESHOLD` (`server/src/tiers.ts`), `Match` (`server/src/retrieval.ts`)
- Produces: `synthesize(question, ctx, match, locationSummary?)` — new optional 4th parameter
- Produces: `AskResponse.locations?: string[]` (new optional field on the existing wire type, both `shared/types.ts` and `client/src/renderer/types.ts`)

- [ ] **Step 1: Add the optional field to both type files**

In `shared/types.ts`, add one line to `AskResponse`:

```ts
export interface AskResponse {
  answerId: string;
  answer: string;
  confidence: number; // 0..1
  source?: SourceCard;
  lowConfidence?: boolean; // free tier, no confident match: show upgrade prompt, no guess
  locations?: string[]; // map pin name(s), when the matched item resolves to a known location
}
```

In `client/src/renderer/types.ts`, make the identical addition to its own (duplicated) `AskResponse`:

```ts
export interface AskResponse {
  answerId: string;
  answer: string;
  confidence: number;
  source?: SourceCard;
  lowConfidence?: boolean;
  locations?: string[]; // map pin name(s), when the matched item resolves to a known location
}
```

- [ ] **Step 2: Extend `synthesize()` to fold in a location summary**

In `server/src/synthesis.ts`, replace the `SYSTEM_PROMPT` constant and `synthesize` function:

```ts
const SYSTEM_PROMPT =
  'You are Questbot, an in-game assistant for Elden Ring. Answer the player\'s ' +
  'question using ONLY the provided source content — do not add facts beyond it. ' +
  'Keep the answer to 2-3 short sentences, written for someone glancing at an overlay ' +
  'mid-game. If the source is a video transcript segment, phrase the answer as a ' +
  'summary of what the video shows at that point. If a "Where to find it" note is ' +
  'included, work it naturally into the answer.';

export async function synthesize(
  question: string,
  ctx: GameContext | null,
  match: Match,
  locationSummary?: string,
): Promise<string> {
  const response = await genai.models.generateContent({
    model: MODEL,
    config: { systemInstruction: SYSTEM_PROMPT },
    contents:
      `Question: ${question}\n\n` +
      (ctx ? `Current game state: ${ctx.summary}\n\n` : '') +
      `Source (${match.source.title}):\n${match.content}` +
      (locationSummary ? `\n\nWhere to find it: ${locationSummary}` : ''),
  });

  return response.text ?? '';
}
```

- [ ] **Step 3: Wire the lookup into the `/ask` route**

In `server/src/routes/ask.ts`, add the import:

```ts
import { extractItemName, getItemLocation } from '../pipeline/location-store.js';
```

Replace the final `return` block (currently `return { answerId, answer: await synthesize(question, ctx, top), confidence: top.score, source: top.source };`) with:

```ts
    let locationSummary: string | undefined;
    let locations: string[] | undefined;
    if (top.source.kind === 'article') {
      const itemName = extractItemName(top.source.title);
      const loc = itemName ? await getItemLocation(itemName) : null;
      if (loc) {
        locationSummary = loc.summary;
        if (loc.locationNames.length > 0) locations = loc.locationNames;
      }
    }

    return {
      answerId,
      answer: await synthesize(question, ctx, top, locationSummary),
      confidence: top.score,
      source: top.source,
      locations,
    };
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck -w server`
Expected: clean (no errors)

- [ ] **Step 5: Manual end-to-end verification**

This exercises the full new code path against a real corpus item without waiting for the authoring tasks (Tasks 4-10) to land. Start the local Postgres instance (see README "Local database"), then from `server/`:

```bash
cat > verify-location-tmp.mts << 'EOF'
import { upsertItemLocations } from './src/pipeline/location-store.js';
await upsertItemLocations([
  { itemName: 'Radagon Icon', locationNames: ['Volcano Manor'], summary: 'TEMP VERIFICATION FIXTURE — overwritten by Task 4.' },
]);
console.log('seeded');
process.exit(0);
EOF
DATABASE_URL="postgresql://questbot@localhost:5433/questbot" npx tsx verify-location-tmp.mts
```

Then, with `GEMINI_API_KEY` and `DATABASE_URL` set, start the server (`npm run dev`) and in another shell:

```bash
curl -s -X POST http://localhost:8787/ask -H 'content-type: application/json' \
  -d '{"question": "What does the Radagon Icon do?"}' | grep -o '"locations":\[[^]]*\]'
```

Expected: `"locations":["Volcano Manor"]` present in the response (the exact key existing already, from A3 verification earlier this session, is that "Radagon Icon" reliably top-matches at ~0.74 confidence, above the 0.6 threshold).

Clean up: `rm verify-location-tmp.mts`, stop the server, stop Postgres. Note: the seeded "Radagon Icon" row is a temporary fixture — Task 4 (Talisman locations) will overwrite it with the real authored entry via `upsertItemLocations`' upsert semantics, so no manual cleanup of that row is needed.

- [ ] **Step 6: Commit**

```bash
git add server/src/synthesis.ts server/src/routes/ask.ts shared/types.ts client/src/renderer/types.ts
git commit -m "Wire item location lookup into /ask synthesis and response"
```

---

## Task 3: Client "Show on map" feature

**Files:**
- Modify: `client/src/renderer/tabs.ts`
- Modify: `client/src/renderer/map/render.ts`
- Modify: `client/src/renderer/popup.ts`
- Modify: `client/src/renderer/popup.css`

**Interfaces:**
- Consumes: `AskResponse.locations?: string[]` (from Task 2)
- Produces: `switchToTab(tabId: string): void` (in `tabs.ts`)
- Produces: `focusLocationByName(name: string): boolean` (in `map/render.ts`)

- [ ] **Step 1: Export a tab-switch function from `tabs.ts`**

Replace the full contents of `client/src/renderer/tabs.ts`:

```ts
const buttons = document.querySelectorAll<HTMLButtonElement>('.tab-button');
const panels = document.querySelectorAll<HTMLElement>('.panel');

export function switchToTab(tabId: string): void {
  buttons.forEach((b) => b.classList.toggle('active', b.dataset.tab === tabId));
  panels.forEach((p) => p.classList.toggle('active', p.id === `${tabId}-panel`));
  // Settings hides every .panel via #questbot.settings-open — switching
  // tabs while it's open would otherwise look inert until Settings is
  // separately closed.
  document.getElementById('questbot')?.classList.remove('settings-open');
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    if (target) switchToTab(target);
  });
});
```

- [ ] **Step 2: Export a focus-by-name function from `map/render.ts`**

In `client/src/renderer/map/render.ts`, add this function directly after the existing `centerOn` function (around line 448, right before `initPanZoom`):

```ts
// Exposed for cross-tab "Show on map" links (Ask panel). Returns false
// without effect if `name` doesn't match any known MapLocation — the
// safety valve for the loose string coupling to server-side location data.
export function focusLocationByName(name: string): boolean {
  const match = MAP_LOCATIONS.find((l) => l.name === name);
  if (!match) return false;
  centerOn(match);
  return true;
}
```

- [ ] **Step 3: Render "Show on map" buttons in the Ask panel**

In `client/src/renderer/popup.ts`, add two imports after the existing `import` lines:

```ts
import { switchToTab } from './tabs.js';
import { focusLocationByName } from './map/render.js';
```

Replace `renderSource` with a version that accepts and renders `locations`:

```ts
function renderSource(source: SourceCard, locations?: string[]): void {
  const card = document.createElement('div');
  card.className = 'card';
  const link = document.createElement('a');
  link.href = source.url;
  link.target = '_blank';
  link.textContent = source.title;
  card.append(link);
  if (source.kind === 'article') {
    const snippet = document.createElement('p');
    snippet.textContent = source.snippet;
    card.append(snippet);
  } else {
    // Timestamp deep-link via YouTube embed — never re-hosted or clipped (§6).
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${source.videoId}?start=${source.startSeconds}`;
    iframe.allowFullscreen = true;
    card.append(iframe);
  }
  for (const name of locations ?? []) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'show-on-map';
    btn.textContent = `Show on map: ${name}`;
    btn.addEventListener('click', () => {
      switchToTab('map');
      focusLocationByName(name);
    });
    card.append(btn);
  }
  sourceEl.replaceChildren(card);
  sourceEl.hidden = false;
}
```

In `renderAnswer`, change the one call site from `if (res.source) renderSource(res.source);` to:

```ts
  if (res.source) renderSource(res.source, res.locations);
```

- [ ] **Step 4: Style the button**

Add to `client/src/renderer/popup.css`, directly after the existing `#source .card { ... }` rule:

```css
#source .show-on-map {
  display: block;
  margin-top: 6px;
  background: none;
  border: 1px solid #4a4234;
  border-radius: 4px;
  color: #c9a24b;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
}
```

- [ ] **Step 5: Typecheck and build**

Run: `npm run typecheck -w client`
Expected: clean

Run: `npm run build -w client`
Expected: clean build, `client/dist/renderer/` updated

- [ ] **Step 6: Manual verification**

Launch the built app (`npm run start -w client`, or your existing CDP-based Electron verification approach from earlier this session). With dev tools/console access to the renderer:

1. Confirm `document.querySelector('.tab-button[data-tab="map"]')` and the Map panel exist as before (no regression from the `tabs.ts` refactor — clicking each tab button still switches panels correctly).
2. In the console, run `focusLocationByName('Church of Elleh')` (a real name from `MAP_LOCATIONS`) — expect it to return `true` and the Map view to center/zoom on that pin (only visible if the Map tab is active — switch to it first, or call `switchToTab('map')` beforehand).
3. Run `focusLocationByName('Nonexistent Place')` — expect `false`, no error thrown.
4. With the local server + DB running and a location row seeded (reuse the Task 2 Step 5 fixture or seed a fresh one for e.g. "Radagon Icon" → `['Church of Elleh']`), ask "What does the Radagon Icon do?" in the Ask tab and confirm a "Show on map: Church of Elleh" button appears under the source card, and clicking it switches to the Map tab and centers on that pin.

- [ ] **Step 7: Commit**

```bash
git add client/src/renderer/tabs.ts client/src/renderer/map/render.ts client/src/renderer/popup.ts client/src/renderer/popup.css
git commit -m "Add \"Show on map\" link to Ask panel source cards"
```

---

## Task 4: Author Talisman locations (155 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/talismans-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry` (from Task 1), `upsertItemLocations` (from Task 1)

- [ ] **Step 1: Author the data file**

Create `server/src/pipeline/sources/data/item-locations/talismans-locations.ts`, exporting `TALISMAN_LOCATIONS: ItemLocationEntry[]`. Cover **every item name** from the section headings across all 14 category pages in `server/src/pipeline/sources/data/talismans.ts` (155 items total) — same names, one `ItemLocationEntry` per item.

Format and tone example (these two are real, accurate entries — include them verbatim):

```ts
import type { ItemLocationEntry } from '../../types.js';

export const TALISMAN_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Radagon Icon',
    locationNames: ['Volcano Manor'],
    summary: 'Found in Volcano Manor, in Mt. Gelmir.',
  },
  {
    itemName: 'Dragoncrest Greatshield Talisman',
    locationNames: ['Fort Faroth'],
    summary: 'Found in a chest at the top of Fort Faroth in Caelid, guarded by giant bats.',
  },
  // ... remaining 153 entries
];
```

For any talisman whose real source is diffuse (sold by multiple/rotating merchants, common boss-remembrance reward available at Roundtable Hold, etc.), use an honest summary and `locationNames: []` rather than inventing a single pin — this is expected for some entries, not an error.

- [ ] **Step 2: Verify the count**

```bash
cd server
cat > count-talisman-loc-tmp.mts << 'EOF'
import { TALISMAN_LOCATIONS } from './src/pipeline/sources/data/item-locations/talismans-locations.js';
console.log('total:', TALISMAN_LOCATIONS.length);
EOF
npx tsx count-talisman-loc-tmp.mts
rm count-talisman-loc-tmp.mts
```

Expected: `total: 155`

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck -w server`
Expected: clean

- [ ] **Step 4: Sync into the DB**

With the local Postgres instance running:

```bash
cd server
cat > sync-talisman-loc-tmp.mts << 'EOF'
import { TALISMAN_LOCATIONS } from './src/pipeline/sources/data/item-locations/talismans-locations.js';
import { upsertItemLocations } from './src/pipeline/location-store.js';
await upsertItemLocations(TALISMAN_LOCATIONS);
console.log('synced', TALISMAN_LOCATIONS.length, 'talisman locations');
process.exit(0);
EOF
DATABASE_URL="postgresql://questbot@localhost:5433/questbot" npx tsx sync-talisman-loc-tmp.mts
rm sync-talisman-loc-tmp.mts
```

No `GEMINI_API_KEY` needed — this table isn't embedded, so this step doesn't touch the embedding quota.

- [ ] **Step 5: Spot-check via a real `/ask` call**

With `GEMINI_API_KEY` and `DATABASE_URL` set, start the server and ask 2-3 real questions about talismans covered in this file (e.g. "Where do I find the Radagon Icon?"), confirming the response's `locations` field (when non-empty) matches what was authored, and that the answer text mentions the location naturally.

- [ ] **Step 6: Commit**

```bash
git add server/src/pipeline/sources/data/item-locations/talismans-locations.ts
git commit -m "Add Talisman location data (155 items)"
```

---

## Task 5: Author Incantation locations (129 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/incantations-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry`, `upsertItemLocations` (from Task 1)

Same steps as Task 4, adapted:

- [ ] **Step 1:** Author `INCANTATION_LOCATIONS: ItemLocationEntry[]` covering every item name from the 14 category pages in `server/src/pipeline/sources/data/incantations.ts` (129 items). Example entries to include verbatim:

```ts
import type { ItemLocationEntry } from '../../types.js';

export const INCANTATION_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Catch Flame',
    locationNames: [],
    summary: "A starting incantation for the Prophet class; also purchasable early from Brother Corhyn, wherever he's currently found.",
  },
  {
    itemName: 'Urgent Heal',
    locationNames: [],
    summary: 'A starting incantation for the Confessor class.',
  },
  // ... remaining 127 entries
];
```

- [ ] **Step 2:** Verify count (129) via a disposable count script, same pattern as Task 4 Step 2, importing `INCANTATION_LOCATIONS`.
- [ ] **Step 3:** Typecheck (`npm run typecheck -w server`).
- [ ] **Step 4:** Sync via a disposable script calling `upsertItemLocations(INCANTATION_LOCATIONS)`, same pattern as Task 4 Step 4.
- [ ] **Step 5:** Spot-check 2-3 real `/ask` questions about incantations covered here.
- [ ] **Step 6:** Commit:

```bash
git add server/src/pipeline/sources/data/item-locations/incantations-locations.ts
git commit -m "Add Incantation location data (129 items)"
```

---

## Task 6: Author Sorcery locations (84 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/sorceries-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry`, `upsertItemLocations` (from Task 1)

Same steps as Task 4, adapted:

- [ ] **Step 1:** Author `SORCERY_LOCATIONS: ItemLocationEntry[]` covering every item name from the 11 category pages in `server/src/pipeline/sources/data/sorceries.ts` (84 items). Example entries to include verbatim:

```ts
import type { ItemLocationEntry } from '../../types.js';

export const SORCERY_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Glintstone Pebble',
    locationNames: [],
    summary: "The Astrologer class's starting sorcery; also taught early by Sorcerer Rogier in Liurnia of the Lakes.",
  },
  {
    itemName: 'Meteorite',
    locationNames: [],
    summary: 'Sold by Sorceress Sellen after her introductory questline step.',
  },
  // ... remaining 82 entries
];
```

- [ ] **Step 2:** Verify count (84).
- [ ] **Step 3:** Typecheck.
- [ ] **Step 4:** Sync via disposable script.
- [ ] **Step 5:** Spot-check 2-3 real `/ask` questions.
- [ ] **Step 6:** Commit:

```bash
git add server/src/pipeline/sources/data/item-locations/sorceries-locations.ts
git commit -m "Add Sorcery location data (84 items)"
```

---

## Task 7: Author Consumable locations (196 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/consumables-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry`, `upsertItemLocations` (from Task 1)

Same steps as Task 4, adapted:

- [ ] **Step 1:** Author `CONSUMABLE_LOCATIONS: ItemLocationEntry[]` covering every item name from the 16 category pages in `server/src/pipeline/sources/data/consumables.ts` (196 items). This category has the highest proportion of genuinely diffuse sources — be honest about it. Example entries to include verbatim:

```ts
import type { ItemLocationEntry } from '../../types.js';

export const CONSUMABLE_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Golden Rune [1]',
    locationNames: [],
    summary: 'Sold by merchants throughout the Lands Between and commonly dropped by enemies — no single source.',
  },
  {
    itemName: 'Flask of Wondrous Physick',
    locationNames: [],
    summary: 'Unlocked automatically the first time the player meets Melina at a Site of Grace — not tied to a specific location.',
  },
  // ... remaining 194 entries
];
```

- [ ] **Step 2:** Verify count (196).
- [ ] **Step 3:** Typecheck.
- [ ] **Step 4:** Sync via disposable script.
- [ ] **Step 5:** Spot-check 2-3 real `/ask` questions, including at least one diffuse-source item (confirm `locations` is omitted/empty and the answer text doesn't fabricate a fake pin).
- [ ] **Step 6:** Commit:

```bash
git add server/src/pipeline/sources/data/item-locations/consumables-locations.ts
git commit -m "Add Consumable location data (196 items)"
```

---

## Task 8: Author Ashes of War locations (92 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/ashes-of-war-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry`, `upsertItemLocations` (from Task 1)

Same steps as Task 4, adapted:

- [ ] **Step 1:** Author `ASH_OF_WAR_LOCATIONS: ItemLocationEntry[]` covering every item name from the 14 category pages in `server/src/pipeline/sources/data/ashes-of-war.ts` (92 items). Example entries to include verbatim:

```ts
import type { ItemLocationEntry } from '../../types.js';

export const ASH_OF_WAR_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Sacred Order',
    locationNames: [],
    summary: 'A starting Ash of War for the Prophet class; also purchasable from Brother Corhyn.',
  },
  {
    itemName: 'Lost Ashes of War',
    locationNames: [],
    summary: 'Found as random drops from enemies throughout the Lands Between, not tied to a single source.',
  },
  // ... remaining 90 entries
];
```

- [ ] **Step 2:** Verify count (92).
- [ ] **Step 3:** Typecheck.
- [ ] **Step 4:** Sync via disposable script.
- [ ] **Step 5:** Spot-check 2-3 real `/ask` questions.
- [ ] **Step 6:** Commit:

```bash
git add server/src/pipeline/sources/data/item-locations/ashes-of-war-locations.ts
git commit -m "Add Ashes of War location data (92 items)"
```

---

## Task 9: Author Crystal Tear locations (37 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/crystal-tears-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry`, `upsertItemLocations` (from Task 1)

Same steps as Task 4, adapted:

- [ ] **Step 1:** Author `CRYSTAL_TEAR_LOCATIONS: ItemLocationEntry[]` covering every item name from the 8 category pages in `server/src/pipeline/sources/data/crystal-tears.ts` (37 items). Example entry to include verbatim (note this is the one Crystal Tear whose source is already unambiguous — a boss drop):

```ts
import type { ItemLocationEntry } from '../../types.js';

export const CRYSTAL_TEAR_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Purifying Crystal Tear',
    locationNames: ['Mohgwyn Palace'],
    summary: 'Dropped by Mohg, Lord of Blood, at Mohgwyn Palace.',
  },
  // ... remaining 36 entries
];
```

Most other Crystal Tears are individual world pickups (each typically at one specific spot) rather than diffuse sources — research each one on its own merits rather than defaulting to diffuse phrasing; use an honest diffuse summary only where a single spot genuinely isn't accurate.

- [ ] **Step 2:** Verify count (37).
- [ ] **Step 3:** Typecheck.
- [ ] **Step 4:** Sync via disposable script.
- [ ] **Step 5:** Spot-check 2-3 real `/ask` questions.
- [ ] **Step 6:** Commit:

```bash
git add server/src/pipeline/sources/data/item-locations/crystal-tears-locations.ts
git commit -m "Add Crystal Tear location data (37 items)"
```

---

## Task 10: Author Whetstone and Great Rune locations (15 items)

**Files:**
- Create: `server/src/pipeline/sources/data/item-locations/whetstones-great-runes-locations.ts`

**Interfaces:**
- Consumes: `ItemLocationEntry`, `upsertItemLocations` (from Task 1)

Combined into one task since both categories are small (6 + 9 = 15 items).

- [ ] **Step 1:** Author `WHETSTONE_AND_GREAT_RUNE_LOCATIONS: ItemLocationEntry[]` covering every item name from `server/src/pipeline/sources/data/whetstones.ts` (6 items) and `server/src/pipeline/sources/data/great-runes.ts` (9 items).

For the 9 Great Runes, the boss/location pairing is **already fully specified** in `great-runes.ts`'s own authored prose (e.g. "Dropped by Godrick the Grafted at Stormveil Castle in Limgrave") — reuse that fact directly rather than re-researching it, and note that several of those location names (e.g. "Stormveil Castle") are already exact `MapLocation.name` matches in `client/src/renderer/map/locations.ts`. Great Runes with no boss (Great Rune of the Unborn's boss is Rennala; Phantom Great Rune has no boss/location) get `locationNames: []` where the source text itself says "N/A".

Example entries to include verbatim:

```ts
import type { ItemLocationEntry } from '../../types.js';

export const WHETSTONE_AND_GREAT_RUNE_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: 'Whetstone Knife',
    locationNames: ['Church of Elleh'],
    summary: 'Given by Kalé, the wandering blacksmith found at the Church of Elleh early in Limgrave.',
  },
  {
    itemName: "Godrick's Great Rune",
    locationNames: ['Stormveil Castle'],
    summary: 'Dropped by Godrick the Grafted at Stormveil Castle in Limgrave.',
  },
  {
    itemName: 'Phantom Great Rune',
    locationNames: [],
    summary: 'Not tied to any boss, location, or Divine Tower — obtained through the invasion mechanic itself.',
  },
  // ... remaining 12 entries
];
```

- [ ] **Step 2:** Verify count (15).
- [ ] **Step 3:** Typecheck.
- [ ] **Step 4:** Sync via disposable script.
- [ ] **Step 5:** Spot-check 2-3 real `/ask` questions (e.g. "Where do I get Godrick's Great Rune?").
- [ ] **Step 6:** Commit:

```bash
git add server/src/pipeline/sources/data/item-locations/whetstones-great-runes-locations.ts
git commit -m "Add Whetstone and Great Rune location data (15 items)"
```

---

## Final check

After Task 10, update `README.md`'s corpus-status section to note the item location index is complete (708/708 items), mirroring how every prior corpus addition this session was documented there.
