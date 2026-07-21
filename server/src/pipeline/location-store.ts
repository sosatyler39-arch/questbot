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
