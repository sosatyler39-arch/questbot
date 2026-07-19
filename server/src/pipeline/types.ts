// Mirrors server/db/schema.sql `chunks` table, minus id/embedding/updated_at
// (embedding is added by embeddings.ts, the rest is server-generated).
export type PendingChunk =
  | { sourceType: 'article'; title: string; url: string; content: string }
  | {
      sourceType: 'video';
      title: string;
      url: string;
      content: string;
      videoId: string;
      startSeconds: number;
    };
