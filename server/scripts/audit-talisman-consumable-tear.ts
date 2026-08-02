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
