import pgvector from 'pgvector/pg';
import { pool } from '../db.js';
import type { PendingChunk } from './types.js';

export type EmbeddedChunk = PendingChunk & { embedding: number[] };

// Replaces every chunk for a page/video with the freshly-embedded set — the
// sync job re-fetches a whole page/video each run, so this is simpler and
// safer than diffing individual chunks, and naturally handles content that
// shrank. `pageKey` is a stable per-page/per-video grouping key used only
// for this delete-and-replace — it's deliberately separate from each
// chunk's own `url` (shown to users as SourceCard.url), since one page now
// produces several chunks that each link to a different real wiki item
// page rather than all sharing one URL.
export async function upsertChunksForUrl(pageKey: string, chunks: EmbeddedChunk[]): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM chunks WHERE page_key = $1', [pageKey]);
    for (const chunk of chunks) {
      await client.query(
        `INSERT INTO chunks (source_type, title, url, page_key, content, video_id, start_seconds, embedding)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          chunk.sourceType,
          chunk.title,
          chunk.url,
          pageKey,
          chunk.content,
          chunk.sourceType === 'video' ? chunk.videoId : null,
          chunk.sourceType === 'video' ? chunk.startSeconds : null,
          pgvector.toSql(chunk.embedding),
        ],
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export interface SearchResult {
  sourceType: 'article' | 'video';
  title: string;
  url: string;
  content: string;
  videoId: string | null;
  startSeconds: number | null;
  distance: number; // cosine distance, 0 = identical, 2 = opposite
}

// Nearest-neighbor search via pgvector's cosine distance operator (<=>).
// Not wired into /ask yet — retrieval.ts stays on the mock until a real
// source is indexed (build order step 4, still pending the ToS decision).
export async function searchChunks(embedding: number[], limit = 5): Promise<SearchResult[]> {
  const { rows } = await pool.query(
    `SELECT source_type, title, url, content, video_id, start_seconds,
            embedding <=> $1 AS distance
     FROM chunks
     ORDER BY distance
     LIMIT $2`,
    [pgvector.toSql(embedding), limit],
  );
  return rows.map((r) => ({
    sourceType: r.source_type,
    title: r.title,
    url: r.url,
    content: r.content,
    videoId: r.video_id,
    startSeconds: r.start_seconds,
    distance: r.distance,
  }));
}
