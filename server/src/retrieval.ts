import type { SourceCard } from '../../shared/types.js';
import type { GameContext } from './vision.js';
import { embedText } from './pipeline/embeddings.js';
import { searchChunks } from './pipeline/store.js';

export interface Match {
  score: number; // 0..1
  content: string;
  source: SourceCard;
}

export interface Retriever {
  search(question: string, ctx: GameContext | null): Promise<Match[]>;
}

const SNIPPET_LENGTH = 220;

// Real retrieval: embeds the question (+ any vision context) and does a
// cosine-similarity search against the pgvector-indexed corpus. Cosine
// distance is 0 (identical) to 2 (opposite) for normalized vectors —
// score = 1 - distance keeps the existing 0..1 confidence convention
// (CONFIDENCE_THRESHOLD in tiers.ts) working unchanged.
export const pgvectorRetriever: Retriever = {
  async search(question, ctx) {
    const query = ctx ? `${question}\n\nCurrent game state: ${ctx.summary}` : question;
    const embedding = await embedText(query);
    const results = await searchChunks(embedding, 5);
    return results.map((r) => ({
      score: 1 - r.distance,
      content: r.content,
      source:
        r.sourceType === 'video'
          ? { kind: 'video', title: r.title, videoId: r.videoId!, startSeconds: r.startSeconds!, url: r.url }
          : {
              kind: 'article',
              title: r.title,
              snippet: r.content.length > SNIPPET_LENGTH ? r.content.slice(0, SNIPPET_LENGTH) + '…' : r.content,
              url: r.url,
            },
    }));
  },
};

// Kept for reference / offline testing without live services — no longer
// used by /ask (see routes/ask.ts). Superseded by pgvectorRetriever now that
// there's a real indexed corpus (server/src/pipeline/sources/original-content.ts).
const MOCK_CHUNKS: { content: string; source: SourceCard }[] = [
  {
    content:
      'Margit, the Fell Omen is the boss of Stormveil Castle approach in Limgrave. ' +
      'Weak to bleed; Margit’s Shackle (sold by Patches) pins him twice. ' +
      'Summon Sorcerer Rogier at the fog gate for help.',
    source: {
      kind: 'article',
      title: 'Margit, the Fell Omen',
      snippet: 'Weak to bleed. Margit’s Shackle pins him twice; Rogier can be summoned at the fog gate.',
      url: 'https://eldenring.wiki.fextralife.com/Margit,+the+Fell+Omen',
    },
  },
  {
    content:
      'How to beat Margit easily: buy Margit’s Shackle from Patches in Murkwater Cave, ' +
      'level to 25 first at the troll fields, use jump attacks to break his stance.',
    source: {
      kind: 'video',
      title: 'Elden Ring: Beat Margit EASILY (Shackle + Stance Break)',
      videoId: 'dQw4w9WgXcQ',
      startSeconds: 217,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=217s',
    },
  },
  {
    content:
      'Ranni’s questline starts at Ranni’s Rise in Liurnia, northwest of the ' +
      'Caria Manor. Speak to Ranni after defeating Royal Knight Loretta to begin serving her.',
    source: {
      kind: 'article',
      title: 'Ranni’s Questline',
      snippet: 'Starts at Ranni’s Rise in Liurnia, reached through Caria Manor after Royal Knight Loretta.',
      url: 'https://eldenring.wiki.fextralife.com/Ranni+the+Witch',
    },
  },
  {
    content:
      'Stormveil Castle secret entrance: talk to Gatekeeper Gostoc at the main gate site of ' +
      'grace and choose the side path to skip the ballista courtyard.',
    source: {
      kind: 'video',
      title: 'Stormveil Castle Walkthrough — Secret Entrance',
      videoId: 'oHg5SJYRHA0',
      startSeconds: 94,
      url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0&t=94s',
    },
  },
];

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'i', 'do', 'how', 'to', 'what', 'where', 'in', 'of', 'and', 'my', 'me',
]);

function keywords(text: string): Set<string> {
  return new Set(
    text.toLowerCase().split(/[^a-z0-9']+/).filter((w) => w.length > 1 && !STOPWORDS.has(w)),
  );
}

export const mockRetriever: Retriever = {
  async search(question, ctx) {
    const q = keywords(question + ' ' + (ctx?.summary ?? ''));
    if (q.size === 0) return [];
    return MOCK_CHUNKS.map((chunk) => {
      const c = keywords(chunk.content + ' ' + chunk.source.title);
      let hits = 0;
      for (const w of q) if (c.has(w)) hits++;
      return { score: hits / q.size, content: chunk.content, source: chunk.source };
    })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score);
  },
};
