# Parry & i-Frame Reference Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a small browsable reference page showing the "Parry and I-frame Data" sheet's two tables (Parry Frames, iFrames) on the website.

**Architecture:** A disposable script fetches both tabs via the same CSV-export pattern used twice already this session, writes one small static JSON file. A single new Astro page imports that JSON directly (no Content Collection needed — one file, one consumer) and renders two tables. Linked from the wiki's existing `mechanic` category page.

**Tech Stack:** `tsx`, Node's built-in `fetch`, the same hand-rolled CSV parser pattern as the two prior sub-projects this session (reimplemented here since each prior copy was disposable and already deleted).

## Global Constraints

- No new npm dependencies.
- Disposable script convention: write, run once, delete; keep only the generated JSON.
- Display the sheet's raw values with its own "DATA COLLECTED AT 30FPS!" note shown verbatim — do not silently double the values for 60fps.
- Not wired into `/ask` — this is quick-reference lookup data, not conversational content.

---

## File Structure

**Create (disposable — deleted in Task 2):**
- `server/scripts/ingest-frame-data.ts` — fetches both tabs, writes the JSON output
- `server/scripts/ingest-frame-data.test.ts` — unit tests for the CSV parser

**Create (permanent):**
- `web/src/content/frame-data.json` — generated data (both tables)
- `web/src/pages/elden-ring/frame-data.astro` — the reference page

**Modify (permanent):**
- `web/src/pages/elden-ring/wiki/[category]/index.astro` — add a "See also" link when `category === 'mechanic'`

---

### Task 1: Ingestion script with tests, run for real

**Files:**
- Create: `server/scripts/ingest-frame-data.ts`
- Create: `server/scripts/ingest-frame-data.test.ts`
- Produces (generated data): `web/src/content/frame-data.json`

**Interfaces:**
- Produces: `parseCsv(text: string): string[][]` (same shape as the prior two scripts). Output JSON shape: `{ parryFrames: Record<string, string>[]; iFrames: Record<string, string>[] }`.

- [ ] **Step 1: Write the failing test**

```typescript
// server/scripts/ingest-frame-data.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv } from './ingest-frame-data.js';

test('parseCsv handles plain rows', () => {
  assert.deepEqual(parseCsv('a,b\n1,2\n'), [['a', 'b'], ['1', '2']]);
});

test('parseCsv handles quoted fields with embedded commas and newlines', () => {
  assert.deepEqual(parseCsv('"a, b","line1\nline2"\n'), [['a, b', 'line1\nline2']]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/scripts/ingest-frame-data.test.ts`
Expected: FAIL — the module doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// server/scripts/ingest-frame-data.ts
import { mkdir, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHEET_ID = '1Hgqmd7FgKbrfPA6Zqu7kobDlVMbNcIj24QLGzztrIFQ';

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

async function fetchTab(tabName: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  const res = await fetch(url);
  const rows = parseCsv(await res.text());
  const [header, ...dataRows] = rows;
  return dataRows
    .filter((r) => r.some((cell) => cell.trim().length > 0))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

async function main() {
  const parryFrames = await fetchTab('Parry Frames');
  const iFrames = await fetchTab('iFrames');

  await mkdir('web/src/content', { recursive: true });
  await writeFile(
    'web/src/content/frame-data.json',
    JSON.stringify({ parryFrames, iFrames }, null, 2) + '\n',
  );

  console.log(`Parry Frames: ${parryFrames.length} rows.`);
  console.log(`iFrames: ${iFrames.length} rows.`);
  console.log('Wrote web/src/content/frame-data.json');
}

if (basename(process.argv[1] ?? '') === basename(fileURLToPath(import.meta.url))) {
  main();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/scripts/ingest-frame-data.test.ts`
Expected: PASS, both tests green.

- [ ] **Step 5: Run the script for real**

Run: `npx tsx server/scripts/ingest-frame-data.ts`
Expected: prints `Parry Frames: 11 rows.` and `iFrames: 24 rows.`, writes `web/src/content/frame-data.json`.

- [ ] **Step 6: Commit**

```bash
git add server/scripts/ingest-frame-data.ts server/scripts/ingest-frame-data.test.ts web/src/content/frame-data.json
git commit -m "Add parry/i-frame reference data"
```

---

### Task 2: Reference page, wiki cross-link, verify, clean up

**Files:**
- Create: `web/src/pages/elden-ring/frame-data.astro`
- Modify: `web/src/pages/elden-ring/wiki/[category]/index.astro`
- Delete: `server/scripts/ingest-frame-data.ts`, `server/scripts/ingest-frame-data.test.ts`

**Interfaces:**
- Consumes: `web/src/content/frame-data.json`'s shape from Task 1 — `{ parryFrames: Record<string, string>[]; iFrames: Record<string, string>[] }`. Each row's keys are the sheet's own raw column headers (e.g. `"DATA COLLECTED AT 30FPS! Double the values for terms of 60fps. PARRY FRAMES "` for the name column, `"Startup"`, `"Recovery to Roll/Crouch"`, etc.).

- [ ] **Step 1: Write the reference page**

```astro
---
// web/src/pages/elden-ring/frame-data.astro
import WikiLayout from '../../components/WikiLayout.astro';
import frameData from '../../content/frame-data.json';

function renderTable(rows: Record<string, string>[]) {
  const keys = Object.keys(rows[0]);
  return { keys, rows };
}

const parry = renderTable(frameData.parryFrames);
const iframes = renderTable(frameData.iFrames);
---
<WikiLayout title="Parry &amp; i-Frame Data">
  <div class="frame-data">
    <p><a href="/elden-ring/wiki/mechanic">&larr; Mechanic</a></p>
    <h1>Parry &amp; i-Frame Data</h1>
    <p class="frame-data-note">Data collected at 30fps — double the values for 60fps.</p>

    <h2>Parry Frames</h2>
    <div class="table-scroll">
      <table>
        <thead><tr>{parry.keys.map((k) => <th>{k}</th>)}</tr></thead>
        <tbody>
          {parry.rows.map((r) => <tr>{parry.keys.map((k) => <td>{r[k]}</td>)}</tr>)}
        </tbody>
      </table>
    </div>

    <h2>i-Frames</h2>
    <div class="table-scroll">
      <table>
        <thead><tr>{iframes.keys.map((k) => <th>{k}</th>)}</tr></thead>
        <tbody>
          {iframes.rows.map((r) => <tr>{iframes.keys.map((k) => <td>{r[k]}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  </div>
</WikiLayout>
<style>
  .frame-data {
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
  }
  .frame-data-note {
    color: var(--text-dim);
    font-size: 0.9em;
  }
  .table-scroll {
    overflow-x: auto;
    margin-bottom: 32px;
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

- [ ] **Step 2: Add the "See also" link on the wiki's mechanic category page**

```astro
<!-- web/src/pages/elden-ring/wiki/[category]/index.astro — insert directly after the <h1>{humanize(category)}</h1> line -->
{category === 'mechanic' && (
  <p><a href="/elden-ring/frame-data">See also: Parry &amp; i-Frame Data &rarr;</a></p>
)}
```

- [ ] **Step 3: Verify live**

Run (from `web/`): `astro dev --background`, then navigate to `http://localhost:4321/elden-ring/frame-data`.
Expected: both tables render with the sheet's real column headers and the 30fps note is visible. Then navigate to `http://localhost:4321/elden-ring/wiki/mechanic` and confirm the new "See also" link appears and goes to the right page.

- [ ] **Step 4: Full build + delete disposable script**

```bash
astro dev stop
astro build
```

(Run from `web/`.) Expected: completes with no errors, includes `/elden-ring/frame-data/index.html`.

```bash
git rm server/scripts/ingest-frame-data.ts server/scripts/ingest-frame-data.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add "web/src/pages/elden-ring/frame-data.astro" "web/src/pages/elden-ring/wiki/[category]/index.astro"
git commit -m "Add parry/i-frame reference page, linked from the wiki mechanic category"
```
