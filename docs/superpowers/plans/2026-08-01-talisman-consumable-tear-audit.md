# Talisman / Consumable / Crystal Tear Corpus Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit `talismans.ts` against a data-mined source (correcting wrong numbers) and enrich `crystal-tears.ts` / `consumables.ts` (adding exact numbers where the corpus is currently qualitative), closing the last unaudited gap named in README's "Corpus audit against ERDB" section for these three categories.

**Architecture:** A disposable script fetches three tabs of a public Google Sheet via its CSV export endpoint (hand-rolled RFC 4180 parser, no new dependency), imports the three corpus files' real `ArticlePage[]` data directly (via `tsx`, same as the pipeline does), and name-matches sheet rows to corpus sections. It writes a JSON report of every matched pair (corpus text + sheet's raw effect data side by side) plus every unmatched row on each side — no automatic text mutation, since deciding whether a mismatch is real and how to phrase a fix requires reading natural-language text, not a formula diff. A human (the plan's executor) then reviews the report and edits the three corpus files directly.

**Tech Stack:** `tsx` (already a server devDependency), Node's built-in `fetch`, a hand-rolled CSV parser (~30 lines, matches this project's existing preference for small hand-rolled parsers over new dependencies — see `png-encoder.ts`).

## Global Constraints

- No new npm dependencies — CSV parsing is hand-rolled.
- Disposable script convention: write, run once, delete both the script and its test; keep only the generated audit log.
- PvE values only — ignore the sheet's PvP-altered columns entirely.
- Only change the specific number/clause that's wrong or missing — never reword unrelated text in a corpus entry.
- Report unmatched rows/entries; never guess or silently skip a mismatch.
- Do not re-sync the live database — this pass only touches the `.ts` source files.
- Whetstones are out of scope (the sheet has no dedicated tab for them).

---

## File Structure

**Create (disposable — deleted in Task 3):**
- `server/scripts/audit-talisman-consumable-tear.ts` — fetches the 3 sheet tabs, imports the 3 corpus files, matches by normalized name, writes `server/scripts/audit-report.json`
- `server/scripts/audit-talisman-consumable-tear.test.ts` — unit tests for the CSV parser and matching logic

**Create (permanent):**
- `docs/superpowers/audit-logs/2026-08-01-talisman-consumable-tear-audit.md` — human-written summary of every correction/enrichment actually applied, same format as `docs/superpowers/audit-logs/2026-07-22-corpus-audit.md`

**Modify:**
- `server/src/pipeline/sources/data/talismans.ts` — correct any wrong percentages found
- `server/src/pipeline/sources/data/crystal-tears.ts` — add exact numbers where currently qualitative
- `server/src/pipeline/sources/data/consumables.ts` — add exact numbers to the 8 in-scope entries (Albinauric Pot, Oil Pot, Roped Oil Pot, Hefty Oil Pot, Uplifting Aromatic, Acid Spraymist, Bloodboil Aromatic, Ironjar Aromatic)

---

### Task 1: CSV parser + sheet-to-corpus matcher, with tests

**Files:**
- Create: `server/scripts/audit-talisman-consumable-tear.ts`
- Create: `server/scripts/audit-talisman-consumable-tear.test.ts`
- Reads (at runtime, not import-time for the test): `server/src/pipeline/sources/data/talismans.ts`, `crystal-tears.ts`, `consumables.ts`

**Interfaces:**
- Produces (used by Task 2's real run): `parseCsv(text: string): string[][]`, `normalizeName(name: string): string`, `matchRows(sheetRows: Record<string, string>[], corpusHeadings: string[]): { matched: string[]; sheetOnly: string[]; corpusOnly: string[] }`

- [ ] **Step 1: Write the failing tests**

```typescript
// server/scripts/audit-talisman-consumable-tear.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, normalizeName, matchRows } from './audit-talisman-consumable-tear.js';

test('parseCsv handles plain rows', () => {
  assert.deepEqual(parseCsv('a,b,c\n1,2,3\n'), [['a', 'b', 'c'], ['1', '2', '3']]);
});

test('parseCsv handles quoted fields with embedded commas', () => {
  assert.deepEqual(parseCsv('"Raises HP, greatly","10%"\n'), [['Raises HP, greatly', '10%']]);
});

test('parseCsv handles escaped quotes inside quoted fields', () => {
  assert.deepEqual(parseCsv('"She said ""hi""","ok"\n'), [['She said "hi"', 'ok']]);
});

test('parseCsv handles embedded literal newlines inside quoted fields', () => {
  assert.deepEqual(parseCsv('"line one\nline two","ok"\n'), [['line one\nline two', 'ok']]);
});

test('normalizeName lowercases and trims', () => {
  assert.equal(normalizeName('  Prince of Death\'s Pustule  '), "prince of death's pustule");
});

test('matchRows separates matched, sheet-only, and corpus-only names', () => {
  const result = matchRows(
    [{ Name: 'Golden Vow' }, { Name: 'Only In Sheet' }],
    ['Golden Vow', 'Only In Corpus'],
  );
  assert.deepEqual(result.matched, ['golden vow']);
  assert.deepEqual(result.sheetOnly, ['only in sheet']);
  assert.deepEqual(result.corpusOnly, ['only in corpus']);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx tsx --test server/scripts/audit-talisman-consumable-tear.test.ts`
Expected: FAIL — the module doesn't exist yet.

- [ ] **Step 3: Write the implementation**

```typescript
// server/scripts/audit-talisman-consumable-tear.ts
import { writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TALISMAN_PAGES } from '../src/pipeline/sources/data/talismans.js';
import { CRYSTAL_TEAR_PAGES } from '../src/pipeline/sources/data/crystal-tears.js';
import { CONSUMABLE_PAGES } from '../src/pipeline/sources/data/consumables.js';
import type { ArticlePage } from '../src/pipeline/sources/types.js';

const SHEET_ID = '1rfYfa5kcyoCuKgnS23dc8J8lLLTqWXsWtq9qG4TxT50';

// Minimal RFC 4180 parser: quoted fields, escaped "" quotes, embedded
// commas and literal newlines inside quotes. No new dependency needed for
// three small tabs — same "hand-roll it" precedent as png-encoder.ts.
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

export function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export function matchRows(
  sheetRows: Record<string, string>[],
  corpusHeadings: string[],
): { matched: string[]; sheetOnly: string[]; corpusOnly: string[] } {
  const sheetNames = new Set(sheetRows.map((r) => normalizeName(r.Name ?? Object.values(r)[0] ?? '')));
  const corpusNames = new Set(corpusHeadings.map(normalizeName));
  const matched = [...sheetNames].filter((n) => corpusNames.has(n));
  const sheetOnly = [...sheetNames].filter((n) => !corpusNames.has(n));
  const corpusOnly = [...corpusNames].filter((n) => !sheetNames.has(n));
  return { matched, sheetOnly, corpusOnly };
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

function headingsOf(pages: ArticlePage[]): { heading: string; text: string; pageTitle: string }[] {
  return pages.flatMap((p) => p.sections.map((s) => ({ heading: s.heading, text: s.text, pageTitle: p.title })));
}

async function main() {
  const [talismanRows, tearRows, consumableRows] = await Promise.all([
    fetchTab('Effects - Talismans'),
    fetchTab('Effects - Wonderous Physick'),
    fetchTab('Effects - Consumables'),
  ]);

  const report = {
    talismans: {
      corpus: headingsOf(TALISMAN_PAGES),
      sheet: talismanRows,
      ...matchRows(talismanRows, headingsOf(TALISMAN_PAGES).map((h) => h.heading)),
    },
    crystalTears: {
      corpus: headingsOf(CRYSTAL_TEAR_PAGES),
      sheet: tearRows,
      ...matchRows(tearRows, headingsOf(CRYSTAL_TEAR_PAGES).map((h) => h.heading)),
    },
    consumables: {
      corpus: headingsOf(CONSUMABLE_PAGES),
      sheet: consumableRows,
      ...matchRows(consumableRows, headingsOf(CONSUMABLE_PAGES).map((h) => h.heading)),
    },
  };

  writeFileSync('server/scripts/audit-report.json', JSON.stringify(report, null, 2));
  console.log(
    `Talismans: ${report.talismans.matched.length} matched, ${report.talismans.sheetOnly.length} sheet-only, ${report.talismans.corpusOnly.length} corpus-only`,
  );
  console.log(
    `Crystal Tears: ${report.crystalTears.matched.length} matched, ${report.crystalTears.sheetOnly.length} sheet-only, ${report.crystalTears.corpusOnly.length} corpus-only`,
  );
  console.log(
    `Consumables: ${report.consumables.matched.length} matched, ${report.consumables.sheetOnly.length} sheet-only, ${report.consumables.corpusOnly.length} corpus-only`,
  );
  console.log('Full report written to server/scripts/audit-report.json');
}

if (basename(process.argv[1] ?? '') === basename(fileURLToPath(import.meta.url))) {
  main();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx tsx --test server/scripts/audit-talisman-consumable-tear.test.ts`
Expected: PASS, all 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add server/scripts/audit-talisman-consumable-tear.ts server/scripts/audit-talisman-consumable-tear.test.ts
git commit -m "Add talisman/consumable/crystal-tear audit script"
```

---

### Task 2: Run the audit, apply corrections and enrichments

**Files:**
- Modify: `server/src/pipeline/sources/data/talismans.ts`
- Modify: `server/src/pipeline/sources/data/crystal-tears.ts`
- Modify: `server/src/pipeline/sources/data/consumables.ts`

**Interfaces:**
- Consumes: `server/scripts/audit-report.json`, produced by Task 1's script (`{ talismans, crystalTears, consumables }`, each `{ corpus: {heading, text, pageTitle}[], sheet: Record<string,string>[], matched: string[], sheetOnly: string[], corpusOnly: string[] }`).

- [ ] **Step 1: Run the script for real**

```bash
npx tsx server/scripts/audit-talisman-consumable-tear.ts
```

Expected: prints match counts for all three categories and writes `server/scripts/audit-report.json`. Talismans should show close to 154/155 matched (see spec's note on the near-1:1 count); Crystal Tears close to 37/37; Consumables should show exactly 8 matched against `consumables.ts` (Phantom Great Rune will show as sheet-only, since it lives in `great-runes.ts`, out of this pass's scope — expected, not a bug).

- [ ] **Step 2: Review Talisman matches and correct any wrong numbers**

Open `server/scripts/audit-report.json`'s `talismans.matched` list. For each matched name, compare the corpus's `text` field (from `talismans.corpus`) against the sheet row's `Effect` column (from `talismans.sheet`, matched by normalized `Talisman` field) — converting the sheet's multiplier notation to the corpus's percentage phrasing where needed (e.g. sheet `⌊1.1x⌋` on a damage-negation talisman corresponds to the corpus's "+10%" phrasing). Where they disagree, edit the exact number in `talismans.ts`'s matching `text` field — change only the number, not the surrounding sentence. Note every real correction (heading, old value, new value) for Task 3's audit log.

- [ ] **Step 3: Review Crystal Tear matches and add missing numbers**

Same process against `crystalTears.matched`, editing `crystal-tears.ts`. Where the corpus text is qualitative ("Temporarily boosts maximum HP") and the sheet gives an exact value, append the number to the existing sentence rather than replacing it (e.g. "Temporarily boosts maximum HP by 10%. Lasts 180 seconds."). Note every change for the audit log.

- [ ] **Step 4: Review the 8 in-scope Consumable matches and add missing numbers**

Same process for the 8 `consumables.ts` entries (Albinauric Pot, Oil Pot, Roped Oil Pot, Hefty Oil Pot, Uplifting Aromatic, Acid Spraymist, Bloodboil Aromatic, Ironjar Aromatic) against `consumables.matched`. Skip "Phantom Great Rune" entirely — it's out of this file's scope. Note every change for the audit log.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w server`
Expected: PASS with no errors.

- [ ] **Step 6: Commit**

```bash
git add server/src/pipeline/sources/data/talismans.ts server/src/pipeline/sources/data/crystal-tears.ts server/src/pipeline/sources/data/consumables.ts
git commit -m "Audit talismans, enrich consumables and crystal tears with exact values"
```

---

### Task 3: Write the audit log, clean up, final verification

**Files:**
- Create: `docs/superpowers/audit-logs/2026-08-01-talisman-consumable-tear-audit.md`
- Delete: `server/scripts/audit-talisman-consumable-tear.ts`, `server/scripts/audit-talisman-consumable-tear.test.ts`, `server/scripts/audit-report.json`

**Interfaces:**
- Consumes: the list of real corrections/enrichments recorded during Task 2's Steps 2–4.

- [ ] **Step 1: Write the audit log**

Follow the exact format of `docs/superpowers/audit-logs/2026-07-22-corpus-audit.md` (a short intro naming the source and method, then one section per file with a `checked - corrected/enriched - unmatched - unchanged` summary line and a table of every real change with `Heading | Field | Old → New` columns). Name the source explicitly: "ER - Miscellaneous Data" Google Sheet (user-provided, confirmed free/uncopyrighted, App Ver. 1.16.1), tabs `Effects - Talismans` / `Effects - Wonderous Physick` / `Effects - Consumables`. Note Whetstones and PvP-specific values as explicitly out of scope, same as the design spec.

- [ ] **Step 2: Delete the disposable script, its test, and the report**

```bash
git rm server/scripts/audit-talisman-consumable-tear.ts server/scripts/audit-talisman-consumable-tear.test.ts
rm server/scripts/audit-report.json
```

- [ ] **Step 3: Run the full server test suite**

Run: `npm test -w server`
Expected: all previously-passing tests still pass (no regressions from the corpus edits).

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/audit-logs/2026-08-01-talisman-consumable-tear-audit.md
git commit -m "Add audit log for talisman/consumable/crystal-tear pass; remove disposable script"
```
