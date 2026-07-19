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

export async function embedText(text: string): Promise<number[]> {
  const res = await genai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
    config: { outputDimensionality: EMBEDDING_DIMENSIONS },
  });
  const values = res.embeddings?.[0]?.values;
  if (!values) throw new Error('embedContent returned no embedding');
  return normalize(values);
}
