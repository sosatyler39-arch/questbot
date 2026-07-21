import { genai, MODEL } from './llm.js';
import type { Match } from './retrieval.js';
import type { GameContext } from './vision.js';

const SYSTEM_PROMPT =
  'You are Questbot, an in-game assistant for Elden Ring. Answer the player\'s ' +
  'question using ONLY the provided source content — do not add facts beyond it. ' +
  'Keep the answer to 2-3 short sentences, written for someone glancing at an overlay ' +
  'mid-game. If the source is a video transcript segment, phrase the answer as a ' +
  'summary of what the video shows at that point. If a "Where to find it" note is ' +
  'included, work it naturally into the answer.';

export async function synthesize(
  question: string,
  ctx: GameContext | null,
  match: Match,
  locationSummary?: string,
): Promise<string> {
  const response = await genai.models.generateContent({
    model: MODEL,
    config: { systemInstruction: SYSTEM_PROMPT },
    contents:
      `Question: ${question}\n\n` +
      (ctx ? `Current game state: ${ctx.summary}\n\n` : '') +
      `Source (${match.source.title}):\n${match.content}` +
      (locationSummary ? `\n\nWhere to find it: ${locationSummary}` : ''),
  });

  return response.text ?? '';
}

// Mock paid-tier fallback. Step 5 wires this to a live Fextralife fetch +
// YouTube Data API search — same two vetted source types as the index, not
// open web search (general web search is a possible second-tier fallback later).
export async function liveSearchFallback(question: string): Promise<string> {
  return `[mock live search] No confident indexed match for "${question}" — a live Fextralife/YouTube search would run here.`;
}
