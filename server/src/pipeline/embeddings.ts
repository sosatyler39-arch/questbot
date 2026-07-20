import { genai } from '../llm.js';

const EMBEDDING_MODEL = 'gemini-embedding-001';
export const EMBEDDING_DIMENSIONS = 1536; // must match `vector(N)` in db/schema.sql

// gemini-embedding-001 only pre-normalizes its native 3072-dim output. Any
// other outputDimensionality (1536 here, to keep pgvector's HNSW index
// cheaper) comes back un-normalized, which would silently skew cosine
// similarity — so we re-normalize by hand. Verified against Google's docs,
// not assumed.
export function normalize(vec: number[]): number[] {
  const norm = Math.sqrt(vec.reduce((sum, x) => sum + x * x, 0));
  return norm === 0 ? vec : vec.map((x) => x / norm);
}

// Free-tier quota is 100 embed requests/minute; the sync's corpus is several
// hundred chunks. Retry 429s with the server-suggested delay (parsed from
// the error body's RetryInfo) instead of crashing the whole sync mid-run.
const MAX_RETRIES = 5;
const FALLBACK_DELAY_MS = 45_000;

function retryDelayMs(err: unknown): number {
  const message = err instanceof Error ? err.message : String(err);
  const match = /retry in (\d+(?:\.\d+)?)s/i.exec(message) ?? /"retryDelay":"(\d+)s"/.exec(message);
  return match ? Math.ceil(Number(match[1]) * 1000) + 1_000 : FALLBACK_DELAY_MS;
}

function isRateLimit(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || /RESOURCE_EXHAUSTED|429/.test(err instanceof Error ? err.message : '');
}

export async function embedText(text: string): Promise<number[]> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await genai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text,
        config: { outputDimensionality: EMBEDDING_DIMENSIONS },
      });
      const values = res.embeddings?.[0]?.values;
      if (!values) throw new Error('embedContent returned no embedding');
      return normalize(values);
    } catch (err) {
      if (!isRateLimit(err) || attempt >= MAX_RETRIES) throw err;
      const delay = retryDelayMs(err);
      console.warn(`[embeddings] rate limited, retrying in ${Math.round(delay / 1000)}s (attempt ${attempt + 1}/${MAX_RETRIES})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
