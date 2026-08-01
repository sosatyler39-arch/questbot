import { pool } from '../db.js';
import type { CategorizedItemLocationEntry } from './sources/types.js';

export async function upsertItemLocations(entries: CategorizedItemLocationEntry[]): Promise<void> {
  for (const entry of entries) {
    await pool.query(
      `INSERT INTO item_locations (item_name, category, location_names, summary)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (item_name, category) DO UPDATE
       SET location_names = EXCLUDED.location_names, summary = EXCLUDED.summary`,
      [entry.itemName, entry.category, entry.locationNames, entry.summary],
    );
  }
}

export interface ItemLocationResult {
  locationNames: string[];
  summary: string;
}

// category disambiguates same-named items across categories (e.g. "Golden
// Vow" the incantation vs "Golden Vow" the Ash of War) — see schema.sql.
export async function getItemLocation(itemName: string, category: string): Promise<ItemLocationResult | null> {
  const { rows } = await pool.query(
    `SELECT location_names, summary FROM item_locations WHERE lower(item_name) = lower($1) AND category = $2`,
    [itemName, category],
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
