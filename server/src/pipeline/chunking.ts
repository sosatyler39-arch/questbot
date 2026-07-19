import type { PendingChunk } from './types.js';

export interface ArticleSection {
  heading: string;
  text: string;
}

// Wiki pages chunked by section/heading (brief §4). Source-agnostic: whichever
// text source eventually gets wired in just needs to produce this shape.
export function chunkArticle(title: string, url: string, sections: ArticleSection[]): PendingChunk[] {
  return sections
    .filter((s) => s.text.trim().length > 0)
    .map((s) => ({
      sourceType: 'article',
      title: s.heading ? `${title} — ${s.heading}` : title,
      url,
      content: s.text.trim(),
    }));
}

export interface TranscriptLine {
  text: string;
  start: number; // seconds
}

const WINDOW_SECONDS = 45; // within the brief's ~30-60s target

// Groups caption lines into ~WINDOW_SECONDS timestamped segments (brief §4).
export function chunkTranscript(
  title: string,
  url: string,
  videoId: string,
  lines: TranscriptLine[],
): PendingChunk[] {
  if (lines.length === 0) return [];
  const chunks: PendingChunk[] = [];
  let windowStart = lines[0].start;
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    chunks.push({
      sourceType: 'video',
      title,
      url: `${url}&t=${Math.floor(windowStart)}s`,
      content: buffer.join(' ').trim(),
      videoId,
      startSeconds: Math.floor(windowStart),
    });
    buffer = [];
  };

  for (const line of lines) {
    if (line.start - windowStart >= WINDOW_SECONDS) {
      flush();
      windowStart = line.start;
    }
    buffer.push(line.text);
  }
  flush();

  return chunks;
}
