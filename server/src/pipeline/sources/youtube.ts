export interface VideoMeta {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
}

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';

// Real: official Data API v3, video metadata only — the documented, intended
// use. Curated channel list (brief §4: not open-ended YouTube search).
export async function listRecentVideos(channelId: string, publishedAfter?: string): Promise<VideoMeta[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error('YOUTUBE_API_KEY is not set');

  const params = new URLSearchParams({
    key: apiKey,
    channelId,
    part: 'snippet',
    type: 'video',
    order: 'date',
    maxResults: '25',
  });
  if (publishedAfter) params.set('publishedAfter', publishedAfter);

  const res = await fetch(`${YOUTUBE_API}/search?${params}`);
  if (!res.ok) throw new Error(`YouTube search failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as {
    items?: { id: { videoId: string }; snippet: { title: string; publishedAt: string } }[];
  };

  return (data.items ?? []).map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    publishedAt: item.snippet.publishedAt,
  }));
}

export interface TranscriptLine {
  text: string;
  start: number; // seconds
}

// Not implemented. Google's YouTube API Developer Policies (checked
// 2026-07-17) state: "You and your API Clients must not... directly or
// indirectly, scrape YouTube Applications or Google Applications, or obtain
// scraped YouTube data or content" — that covers using a third-party
// transcript library too, not just writing one ourselves. The official path
// (captions.list / captions.download) needs OAuth granted by each video's
// own channel owner, which we don't have for third-party creators. Before
// this can be implemented for real: partner with the curated creators for
// caption access, or knowingly accept the risk of the unofficial endpoint
// most third-party transcript tools rely on.
export async function fetchTranscript(_videoId: string): Promise<TranscriptLine[]> {
  throw new Error('Transcript fetching not implemented — see the comment above this function.');
}
