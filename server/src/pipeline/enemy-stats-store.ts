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
