# Enemy/Boss Combat Stats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ingest the "ER - PvE Health/Defense/DmgNeg/Resistances/Drops/Flags" sheet's full enemy combat-stat dataset (all 8 NG cycles + item drops) into a new browsable website section, plus a schema-ready (not-yet-live) Postgres table and small `/ask` enrichment for named bosses.

**Architecture:** A disposable script fetches 9 row-aligned CSV tabs (NG through NG+7, plus Item Drops — same `ID` at the same row index in every tab), groups them per unique enemy with change-detection dedup across cycles, and writes two outputs: static JSON files for a new Astro Content Collection (website, built and deployed) and a SQL-ready schema addition plus lookup module (server, code-complete but not applied to a live database, same deferral as every other DB-touching piece of work this session).

**Tech Stack:** `tsx`, Node's built-in `fetch`, the same hand-rolled CSV parser pattern as sub-project #1 (a small shared module, not duplicated), Astro Content Collections (glob loader), JSONB in Postgres for the grouped stat fields.

## Global Constraints

- No new npm dependencies.
- Disposable script convention: write, run once, delete; keep only its generated data outputs.
- Row alignment across all 9 tabs is verified once at the start of ingestion (same `ID` at the same row index in every tab); mismatches fail loudly.
- Dedup rule: for each enemy (`ID`), keep a row only when its full stat block differs from the immediately preceding *stored* cycle for that same enemy.
- Do not re-sync the live database — this pass produces schema + code only for the server half.
- The `Additional info on PVE enemy stats` sheet, and the primary sheet's `Flags/Other`/`dlcGameClearSpEffect`/`MultiPlayCorrection`/`ResistanceCorrectParam` tabs, are out of scope for this pass.

---

## File Structure

**Create (disposable — deleted in the final task):**
- `server/scripts/ingest-enemy-stats.ts` — fetches all 9 tabs, dedupes, writes both outputs
- `server/scripts/ingest-enemy-stats.test.ts` — unit tests for parsing/dedup/drop-parsing logic

**Create (permanent, server):**
- `server/src/pipeline/enemy-stats-store.ts` — `getEnemyStats(name)` lookup + `extractPageTitle(chunkTitle)` helper, used by `ask.ts`

**Modify (permanent, server):**
- `server/db/schema.sql` — add the `enemy_stats` table
- `server/src/routes/ask.ts` — fold a boss's key resistance/weakness into synthesis when the top match is a boss with stats on file

**Create (permanent, web):**
- `web/src/content/enemies/{npcId}.json` — one file per unique enemy (generated data)
- `web/src/enemies/search.ts` — client-side search, mirrors `web/src/wiki/search.ts`
- `web/src/pages/elden-ring/enemies/index.astro` — index + search box
- `web/src/pages/elden-ring/enemies/search-index.json.ts` — build-time search index endpoint
- `web/src/pages/elden-ring/enemies/[npcId].astro` — detail page (per-cycle stat table + drops)

**Modify (permanent, web):**
- `web/src/content.config.ts` — add the `enemies` collection
- `web/src/components/SubTabs.astro` — add a third "Enemies" sub-tab

---

### Task 1: CSV parser reuse + dedup + drop-string parser, with tests

**Files:**
- Create: `server/scripts/ingest-enemy-stats.ts`
- Create: `server/scripts/ingest-enemy-stats.test.ts`

**Interfaces:**
- Produces: `parseCsv` (reused verbatim from sub-project #1's now-deleted script — reimplemented here since that one was disposable and already removed), `parseDropCell(cell: string): { item: string; quantity: number; baseChancePercent: number; discoveryScaling: boolean } | null`, `dedupeCycles(cyclesInOrder: { cycle: string; row: Record<string, string> }[]): { cycle: string; row: Record<string, string> }[]`, `EnemyRecord` type.

- [ ] **Step 1: Write the failing tests**

```typescript
// server/scripts/ingest-enemy-stats.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, parseDropCell, dedupeCycles } from './ingest-enemy-stats.js';

test('parseCsv handles plain rows', () => {
  assert.deepEqual(parseCsv('a,b\n1,2\n'), [['a', 'b'], ['1', '2']]);
});

test('parseCsv handles quoted fields with embedded commas and newlines', () => {
  assert.deepEqual(parseCsv('"a, b","line1\nline2"\n'), [['a, b', 'line1\nline2']]);
});

test('parseDropCell parses the real sheet format', () => {
  assert.deepEqual(parseDropCell('Serpent Arrow - {5} (10%) [True]'), {
    item: 'Serpent Arrow',
    quantity: 5,
    baseChancePercent: 10,
    discoveryScaling: true,
  });
});

test('parseDropCell returns null for an empty cell', () => {
  assert.equal(parseDropCell(''), null);
});

test('dedupeCycles keeps only cycles where the stat block actually changed', () => {
  const result = dedupeCycles([
    { cycle: 'NG', row: { Health: '100' } },
    { cycle: 'NG+', row: { Health: '100' } },
    { cycle: 'NG+2', row: { Health: '200' } },
    { cycle: 'NG+3', row: { Health: '200' } },
  ]);
  assert.deepEqual(
    result.map((r) => r.cycle),
    ['NG', 'NG+2'],
  );
});

test('dedupeCycles always keeps at least the first cycle', () => {
  const result = dedupeCycles([{ cycle: 'NG', row: { Health: '50' } }]);
  assert.deepEqual(
    result.map((r) => r.cycle),
    ['NG'],
  );
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx tsx --test server/scripts/ingest-enemy-stats.test.ts`
Expected: FAIL — the module doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// server/scripts/ingest-enemy-stats.ts
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHEET_ID = '1BVwmKqB8pvuyJkSTGYOM2kAJxFMQ0jVsc6aKYz_Upes';
const NG_CYCLES = ['NG', 'NG+', 'NG+2', 'NG+3', 'NG+4', 'NG+5', 'NG+6', 'NG+7'];

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (ch === '\r') {
      i++;
      continue;
    }
    if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export interface DropInfo {
  item: string;
  quantity: number;
  baseChancePercent: number;
  discoveryScaling: boolean;
}

const DROP_PATTERN = /^(.+?) - \{(\d+)\} \((\d+(?:\.\d+)?)%\) \[(True|False)\]$/;

export function parseDropCell(cell: string): DropInfo | null {
  if (!cell.trim()) return null;
  const match = DROP_PATTERN.exec(cell.trim());
  if (!match) return null;
  return {
    item: match[1],
    quantity: Number(match[2]),
    baseChancePercent: Number(match[3]),
    discoveryScaling: match[4] === 'True',
  };
}

export function dedupeCycles(
  cyclesInOrder: { cycle: string; row: Record<string, string> }[],
): { cycle: string; row: Record<string, string> }[] {
  const kept: { cycle: string; row: Record<string, string> }[] = [];
  let lastSerialized: string | null = null;
  for (const entry of cyclesInOrder) {
    const serialized = JSON.stringify(entry.row);
    if (serialized !== lastSerialized) {
      kept.push(entry);
      lastSerialized = serialized;
    }
  }
  return kept;
}

async function fetchTab(tabName: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  const res = await fetch(url);
  const rows = parseCsv(await res.text());
  const [header, ...dataRows] = rows;
  return dataRows
    .filter((r) => r.some((cell) => cell.trim().length > 0))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

function statBlock(row: Record<string, string>): Record<string, string> {
  // Everything except the per-cycle location column, which legitimately
  // differs in header name per tab ("NG Location" vs "NG+7 Location") but
  // isn't itself a stat — excluded so dedup compares stats only.
  const { ID, Name, ...rest } = row;
  const withoutLocation = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !key.includes('Location')),
  );
  return withoutLocation;
}

async function main() {
  const cycleData = await Promise.all(NG_CYCLES.map((cycle) => fetchTab(cycle)));
  const dropData = await fetchTab('Item Drops');

  // Verify row alignment: same ID at the same index in every tab.
  const rowCount = cycleData[0].length;
  for (let cycleIdx = 1; cycleIdx < cycleData.length; cycleIdx++) {
    if (cycleData[cycleIdx].length !== rowCount) {
      throw new Error(`${NG_CYCLES[cycleIdx]} has ${cycleData[cycleIdx].length} rows, expected ${rowCount}`);
    }
    for (let i = 0; i < rowCount; i++) {
      if (cycleData[cycleIdx][i].ID !== cycleData[0][i].ID) {
        throw new Error(`Row ${i} ID mismatch: NG has ${cycleData[0][i].ID}, ${NG_CYCLES[cycleIdx]} has ${cycleData[cycleIdx][i].ID}`);
      }
    }
  }
  if (dropData.length !== rowCount || dropData.some((r, i) => r.ID !== cycleData[0][i].ID)) {
    throw new Error('Item Drops tab is not row-aligned with the NG tab');
  }

  const enemiesForWeb: Record<string, unknown>[] = [];
  const enemiesForDb: Record<string, unknown>[] = [];
  let totalKeptRows = 0;

  for (let i = 0; i < rowCount; i++) {
    const id = cycleData[0][i].ID;
    const name = cycleData[0][i].Name;
    if (!id || !name) continue;

    const cyclesInOrder = NG_CYCLES.map((cycle, idx) => ({ cycle, row: statBlock(cycleData[idx][i]) }));
    const kept = dedupeCycles(cyclesInOrder);
    totalKeptRows += kept.length;

    const drops = Object.entries(dropData[i])
      .filter(([key]) => key.startsWith('Drop '))
      .map(([, value]) => parseDropCell(value))
      .filter((d): d is DropInfo => d !== null);

    const location = cycleData[0][i][Object.keys(cycleData[0][i]).find((k) => k.includes('Location'))!];

    enemiesForWeb.push({ npcId: id, name, location, cycles: kept, drops });
    for (const entry of kept) {
      enemiesForDb.push({ npcId: id, name, ngCycle: entry.cycle, location, statBlock: entry.row, drops });
    }
  }

  const outDir = 'web/src/content/enemies';
  await mkdir(outDir, { recursive: true });
  for (const enemy of enemiesForWeb) {
    await writeFile(join(outDir, `${enemy.npcId}.json`), JSON.stringify(enemy, null, 2) + '\n');
  }
  await writeFile('server/scripts/enemy-stats-for-db.json', JSON.stringify(enemiesForDb, null, 2));

  console.log(`Processed ${rowCount} enemy placements across ${NG_CYCLES.length} NG cycles.`);
  console.log(`Wrote ${enemiesForWeb.length} enemy JSON files to ${outDir}.`);
  console.log(`Kept ${totalKeptRows} deduped (npcId, cycle) rows for the database (in server/scripts/enemy-stats-for-db.json).`);
}

if (basename(process.argv[1] ?? '') === basename(fileURLToPath(import.meta.url))) {
  main();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx tsx --test server/scripts/ingest-enemy-stats.test.ts`
Expected: PASS, all 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add server/scripts/ingest-enemy-stats.ts server/scripts/ingest-enemy-stats.test.ts
git commit -m "Add enemy-stats ingestion script"
```

---

### Task 2: Run the ingestion for real

**Files:**
- Produces (generated data): `web/src/content/enemies/*.json`, `server/scripts/enemy-stats-for-db.json`

- [ ] **Step 1: Run the script**

```bash
npx tsx server/scripts/ingest-enemy-stats.ts
```

Expected: prints the raw row count (3342), the number of enemy JSON files written, and the total deduped row count kept for the database. No thrown alignment errors. This will take a little while — it makes 9 sequential fetches of a ~3,342-row sheet each.

- [ ] **Step 2: Spot-check the output**

Open one generated file, e.g. `web/src/content/enemies/38001940.json` (Cleanrot Knight (Sickle) [Boss]) and confirm it has a `cycles` array with at least one entry and a `drops` array (possibly empty for this specific enemy).

- [ ] **Step 3: Commit**

```bash
git add web/src/content/enemies
git commit -m "Generate enemy combat-stat data from the PvE stats spreadsheet"
```

(`server/scripts/enemy-stats-for-db.json` is NOT committed here — it's consumed by Task 7 and deleted in the final task, per the disposable-output convention.)

---

### Task 3: Content Collection schema for enemies

**Files:**
- Modify: `web/src/content.config.ts`

**Interfaces:**
- Consumes: the JSON shape written by Task 1/2 — `{ npcId: string; name: string; location: string; cycles: { cycle: string; row: Record<string, string> }[]; drops: DropInfo[] }`.
- Produces: an `enemies` collection consumable via `getCollection('enemies')`.

- [ ] **Step 1: Add the schema**

```typescript
// web/src/content.config.ts — add alongside the existing `wiki` collection
const enemyCycle = z.object({
  cycle: z.string(),
  row: z.record(z.string(), z.string()),
});

const enemyDrop = z.object({
  item: z.string(),
  quantity: z.number(),
  baseChancePercent: z.number(),
  discoveryScaling: z.boolean(),
});

const enemies = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/enemies' }),
  schema: z.object({
    npcId: z.string(),
    name: z.string().min(1),
    location: z.string(),
    cycles: z.array(enemyCycle).min(1),
    drops: z.array(enemyDrop),
  }),
});

export const collections = { wiki, enemies };
```

- [ ] **Step 2: Verify the collection loads**

Run (from `web/`): `npx astro sync`
Expected: completes with no schema errors.

- [ ] **Step 3: Commit**

```bash
git add web/src/content.config.ts
git commit -m "Add Content Collection schema for enemy combat stats"
```

---

### Task 4: Enemies index page with search

**Files:**
- Create: `web/src/pages/elden-ring/enemies/search-index.json.ts`
- Create: `web/src/enemies/search.ts`
- Create: `web/src/pages/elden-ring/enemies/index.astro`
- Modify: `web/src/components/SubTabs.astro`

**Interfaces:**
- Consumes: `WikiLayout` (reused as-is — it's generic, not wiki-specific, from `web/src/components/WikiLayout.astro`), `getCollection('enemies')`.

- [ ] **Step 1: Write the search index endpoint**

```typescript
// web/src/pages/elden-ring/enemies/search-index.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const entries = await getCollection('enemies');
  const index = entries.map((e) => ({ name: e.data.name, url: `/elden-ring/enemies/${e.data.npcId}` }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
```

- [ ] **Step 2: Write the client-side search module**

```typescript
// web/src/enemies/search.ts
interface EnemySearchEntry {
  name: string;
  url: string;
}

const MAX_RESULTS = 8;

export function initEnemySearch(): void {
  const input = document.getElementById('enemy-search') as HTMLInputElement | null;
  const results = document.getElementById('enemy-search-results');
  if (!input || !results) return;

  let entries: EnemySearchEntry[] | null = null;
  const loadEntries = () =>
    (entries ??= fetch('/elden-ring/enemies/search-index.json').then((r) => r.json())) as Promise<
      EnemySearchEntry[]
    >;

  input.addEventListener('input', async () => {
    const query = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!query) return;
    const all = await loadEntries();
    const matches = all.filter((e) => e.name.toLowerCase().includes(query)).slice(0, MAX_RESULTS);
    for (const match of matches) {
      const link = document.createElement('a');
      link.className = 'enemy-search-result';
      link.href = match.url;
      link.textContent = match.name;
      results.appendChild(link);
    }
  });
}
```

- [ ] **Step 3: Write the index page**

```astro
---
// web/src/pages/elden-ring/enemies/index.astro
import WikiLayout from '../../../components/WikiLayout.astro';
import { getCollection } from 'astro:content';

const entries = await getCollection('enemies');
const sorted = [...entries].sort((a, b) => a.data.name.localeCompare(b.data.name));
---
<WikiLayout title="Elden Ring Enemies">
  <div class="enemy-index">
    <h1>Enemies</h1>
    <div id="enemy-search-box">
      <input id="enemy-search" type="text" placeholder="Search enemies…" autocomplete="off" />
      <div id="enemy-search-results"></div>
    </div>
    <ul class="enemy-list">
      {sorted.map((entry) => (
        <li><a href={`/elden-ring/enemies/${entry.data.npcId}`}>{entry.data.name}</a></li>
      ))}
    </ul>
  </div>
</WikiLayout>
<script>
  import { initEnemySearch } from '../../../enemies/search.js';
  initEnemySearch();
</script>
<style>
  .enemy-index {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  #enemy-search-box {
    position: relative;
    margin-bottom: 24px;
  }
  #enemy-search {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px;
    background: var(--bg-panel);
    color: inherit;
    border: 1px solid var(--border);
    border-radius: 4px;
    font: inherit;
  }
  #enemy-search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1;
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 4px 4px;
    overflow: hidden;
  }
  .enemy-search-result {
    display: block;
    padding: 8px 14px;
    text-decoration: none;
    color: var(--text);
  }
  .enemy-search-result:hover {
    background: rgba(201, 162, 75, 0.15);
  }
  .enemy-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 8px;
  }
  .enemy-list a {
    display: block;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--text);
    font-size: 0.9em;
  }
  .enemy-list a:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
```

- [ ] **Step 4: Add the sub-tab**

```astro
<!-- web/src/components/SubTabs.astro — update Props and nav -->
---
interface Props {
  active: 'wiki' | 'map' | 'enemies';
}
const { active } = Astro.props;
---
<nav class="sub-tabs">
  <a href="/elden-ring/wiki" class:list={['sub-tab', { active: active === 'wiki' }]}>Wiki</a>
  <a href="/elden-ring/map" class:list={['sub-tab', { active: active === 'map' }]}>Map</a>
  <a href="/elden-ring/enemies" class:list={['sub-tab', { active: active === 'enemies' }]}>Enemies</a>
</nav>
```

(Keep the existing `<style>` block in that file unchanged — only `Props` and the `<nav>` body change.)

- [ ] **Step 5: Verify live**

Run (from `web/`): `astro dev --background`, then navigate to `http://localhost:4321/elden-ring/enemies`.
Expected: page loads, lists enemies alphabetically, "Enemies" sub-tab is active and styled consistently with Wiki/Map. Typing a partial boss name (e.g. "cleanrot") into the search box shows matching results.

- [ ] **Step 6: Commit**

```bash
git add web/src/pages/elden-ring/enemies/search-index.json.ts web/src/enemies/search.ts "web/src/pages/elden-ring/enemies/index.astro" web/src/components/SubTabs.astro
git commit -m "Add enemies index page with search"
```

---

### Task 5: Enemy detail page

**Files:**
- Create: `web/src/pages/elden-ring/enemies/[npcId].astro`

- [ ] **Step 1: Write the page**

```astro
---
// web/src/pages/elden-ring/enemies/[npcId].astro
import WikiLayout from '../../../components/WikiLayout.astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('enemies');
  return entries.map((entry) => ({ params: { npcId: entry.data.npcId }, props: { entry } }));
}

interface Props {
  entry: CollectionEntry<'enemies'>;
}

const { entry } = Astro.props;
const { name, location, cycles, drops } = entry.data;
const allKeys = [...new Set(cycles.flatMap((c) => Object.keys(c.row)))];
---
<WikiLayout title={name}>
  <div class="enemy-detail">
    <p><a href="/elden-ring/enemies">&larr; Enemies</a></p>
    <h1>{name}</h1>
    <p class="enemy-location">{location}</p>

    <h2>Stats by NG cycle</h2>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Cycle</th>
            {allKeys.map((key) => <th>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {cycles.map((c) => (
            <tr>
              <td>{c.cycle}</td>
              {allKeys.map((key) => <td>{c.row[key] ?? ''}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {drops.length > 0 && (
      <>
        <h2>Item drops</h2>
        <ul>
          {drops.map((d) => (
            <li>{d.item} ×{d.quantity} — {d.baseChancePercent}% base chance{d.discoveryScaling ? ' (scales with Discovery)' : ''}</li>
          ))}
        </ul>
      </>
    )}
  </div>
</WikiLayout>
<style>
  .enemy-detail {
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
  }
  .enemy-location {
    color: var(--text-dim);
  }
  .table-scroll {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    font-size: 0.85em;
    white-space: nowrap;
  }
  th, td {
    border: 1px solid var(--border);
    padding: 4px 8px;
    text-align: left;
  }
</style>
```

- [ ] **Step 2: Verify live**

Navigate to `http://localhost:4321/elden-ring/enemies/38001940` (Cleanrot Knight (Sickle) [Boss]).
Expected: page loads, shows a stat table with one column per raw sheet field and one row per kept NG cycle, plus a drops list if non-empty. Back-link returns to the index.

- [ ] **Step 3: Commit**

```bash
git add "web/src/pages/elden-ring/enemies/[npcId].astro"
git commit -m "Add enemy detail page with per-cycle stat table"
```

---

### Task 6: `/ask` enrichment for named bosses (code-complete, not live)

**Files:**
- Create: `server/src/pipeline/enemy-stats-store.ts`
- Modify: `server/src/routes/ask.ts`
- Modify: `server/src/synthesis.ts:13-30`
- Modify: `server/db/schema.sql`

**Interfaces:**
- Produces: `extractPageTitle(chunkTitle: string): string | null` (returns the part *before* the " — " separator — the inverse of `location-store.ts`'s existing `extractItemName`, needed because boss chunk titles are `"{BossName} — {SectionName}"`, opposite of item chunk titles' `"{Category} — {ItemName}"`), `getEnemyStats(name: string): Promise<EnemyStatsResult | null>`.

- [ ] **Step 1: Add the schema table**

```sql
-- server/db/schema.sql — add after the item_locations table
-- Enemy/boss combat stats, keyed by name (not embedded — see
-- docs/superpowers/specs/2026-08-01-enemy-combat-stats-design.md for why
-- this is structured reference data like item_locations, not chunked
-- prose). One row per (npc_id, ng_cycle) where the stat block actually
-- changed from the previous cycle.
CREATE TABLE enemy_stats (
  id                       BIGSERIAL PRIMARY KEY,
  npc_id                   TEXT NOT NULL,
  name                     TEXT NOT NULL,
  ng_cycle                 TEXT NOT NULL,
  location                 TEXT,
  stat_block               JSONB NOT NULL,
  drops                    JSONB NOT NULL,
  UNIQUE (npc_id, ng_cycle)
);
CREATE INDEX enemy_stats_name_idx ON enemy_stats (lower(name));
```

- [ ] **Step 2: Write the lookup module**

```typescript
// server/src/pipeline/enemy-stats-store.ts
import { pool } from '../db.js';

// Boss/enemy chunk titles are "{BossName} — {SectionName}" (chunking.ts's
// chunkArticle, called with the boss name as `title` and section headings
// like "Strategy"/"Location") — the opposite layout from item chunks
// ("{Category} — {ItemName}"), so this extracts the *first* half, not the
// second half extractItemName (location-store.ts) already extracts.
export function extractPageTitle(chunkTitle: string): string | null {
  const sepIndex = chunkTitle.indexOf(' — ');
  return sepIndex === -1 ? null : chunkTitle.slice(0, sepIndex);
}

export interface EnemyStatsResult {
  ngCycle: string;
  statBlock: Record<string, string>;
}

// Returns the NG (base) cycle's row for a name — the common case for a
// synthesized answer, which doesn't need every later-cycle variant.
export async function getEnemyStats(name: string): Promise<EnemyStatsResult | null> {
  const { rows } = await pool.query(
    `SELECT ng_cycle, stat_block FROM enemy_stats WHERE lower(name) = lower($1) AND ng_cycle = 'NG'`,
    [name],
  );
  if (rows.length === 0) return null;
  return { ngCycle: rows[0].ng_cycle, statBlock: rows[0].stat_block };
}
```

- [ ] **Step 3: Add a 5th optional parameter to `synthesize()`**

`synthesize()` currently takes exactly one optional context string (`locationSummary`, labeled
"Where to find it:" in the prompt). Combat stats are a different kind of context, so this adds
a second, independent optional parameter rather than overloading the existing one:

```typescript
// server/src/synthesis.ts:13-30 — replace the whole function
export async function synthesize(
  question: string,
  ctx: GameContext | null,
  match: Match,
  locationSummary?: string,
  enemySummary?: string,
): Promise<string> {
  const response = await genai.models.generateContent({
    model: MODEL,
    config: { systemInstruction: SYSTEM_PROMPT },
    contents:
      `Question: ${question}\n\n` +
      (ctx ? `Current game state: ${ctx.summary}\n\n` : '') +
      `Source (${match.source.title}):\n${match.content}` +
      (locationSummary ? `\n\nWhere to find it: ${locationSummary}` : '') +
      (enemySummary ? `\n\nCombat stats: ${enemySummary}` : ''),
  });

  return response.text ?? '';
}
```

- [ ] **Step 4: Wire the lookup into `ask.ts`**

```typescript
// server/src/routes/ask.ts — add to the existing import block
import { extractPageTitle, getEnemyStats } from '../pipeline/enemy-stats-store.js';
```

```typescript
// server/src/routes/ask.ts — insert directly after the existing
// `if (top.source.kind === 'article') { ... }` item-location block (before `return`):
    let enemySummary: string | undefined;
    if (top.source.kind === 'article') {
      const bossName = extractPageTitle(top.source.title);
      const stats = bossName ? await getEnemyStats(bossName) : null;
      if (stats) {
        const negations = Object.entries(stats.statBlock)
          .filter(([key]) => key.startsWith('Damage Negation'))
          .map(([key, value]) => `${key.replace('Damage Negation ', '')} ${value}%`)
          .join(', ');
        enemySummary = negations ? `Damage negations — ${negations}.` : undefined;
      }
    }
```

```typescript
// server/src/routes/ask.ts — update the existing return statement's synthesize() call
    return {
      answerId,
      answer: await synthesize(question, ctx, top, locationSummary, enemySummary),
```

This mirrors the item-location fold-in pattern but is intentionally a smaller addition, per
the spec — a one-line negation summary, not a full stat dump.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/src/pipeline/enemy-stats-store.ts server/src/routes/ask.ts server/src/synthesis.ts server/db/schema.sql
git commit -m "Add enemy-stats lookup and /ask enrichment (schema-ready, not yet live)"
```

---

### Task 7: Full build verification, cleanup, live deploy

**Files:** None created — verification, cleanup, and deployment only.

- [ ] **Step 1: Full production build**

Run (from `web/`): `astro dev stop` then `astro build`.
Expected: completes with no schema errors. Confirm the build includes one `enemies/{npcId}/index.html` per generated JSON file.

- [ ] **Step 2: Delete disposable script + its test + the DB-only intermediate file**

```bash
git rm server/scripts/ingest-enemy-stats.ts server/scripts/ingest-enemy-stats.test.ts
rm server/scripts/enemy-stats-for-db.json
```

- [ ] **Step 3: Run the full server test suite**

Run: `npm test -w server`
Expected: all previously-passing tests still pass — no regressions.

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "Remove disposable enemy-stats ingestion script"
```

- [ ] **Step 5: Push and deploy, then spot-check live**

Same as prior phases: pushing to the remote and running `vercel --prod` are separate actions from local commits — confirm with the user before doing either. Once deployed, navigate to `/elden-ring/enemies` on the live site, confirm search works, and open one boss's detail page (e.g. the Cleanrot Knight) to confirm its stat table renders.
