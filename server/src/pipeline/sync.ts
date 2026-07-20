import { CREATORS } from './creators.js';
import { originalContentSource } from './sources/original-content.js';
import { listRecentVideos, fetchTranscript } from './sources/youtube.js';
import { chunkArticle, chunkTranscript } from './chunking.js';
import { embedText } from './embeddings.js';
import { upsertChunksForUrl } from './store.js';
import type { PendingChunk } from './types.js';

async function embedAndStore(url: string, chunks: PendingChunk[]): Promise<void> {
  if (chunks.length === 0) return;
  // Sequential, not Promise.all — the free-tier embed quota is 100
  // requests/minute, and firing a page's chunks in parallel burns it in
  // seconds. This is a scheduled batch job (brief §4); slow is fine,
  // crashed is not. embeddings.ts additionally retries 429s.
  const embedded = [];
  for (const chunk of chunks) {
    embedded.push({ ...chunk, embedding: await embedText(chunk.content) });
  }
  await upsertChunksForUrl(url, embedded);
}

// Scheduled sync job (brief §4: nightly/weekly, not live per-question).
// Article text comes from our own original guide content (sources/
// original-content.ts) rather than a scraped wiki — see that file's header
// comment for why. Transcript fetching is still unimplemented (YouTube API
// policy conflict, sources/youtube.ts), so the video loop below is a no-op
// until a creator channel is configured in creators.ts.
export async function syncGame(gameKey: keyof typeof CREATORS): Promise<void> {
  const creators = CREATORS[gameKey];
  if (!creators) throw new Error(`No creator config for game "${gameKey}"`);

  const pages = await originalContentSource.fetchPages();
  for (const page of pages) {
    await embedAndStore(page.url, chunkArticle(page.title, page.url, page.sections));
  }

  for (const channelId of creators.youtubeChannelIds) {
    const videos = await listRecentVideos(channelId);
    for (const video of videos) {
      try {
        const lines = await fetchTranscript(video.videoId);
        await embedAndStore(video.url, chunkTranscript(video.title, video.url, video.videoId, lines));
      } catch (err) {
        console.warn(`[sync] transcript unavailable for ${video.videoId}:`, (err as Error).message);
      }
    }
  }
}
