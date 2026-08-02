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
