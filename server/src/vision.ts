import { genai, MODEL } from './llm.js';

export interface GameContext {
  summary: string; // free-text game-state description fed into retrieval + synthesis
}

const VISION_PROMPT =
  'This is a screenshot from the game Elden Ring. In 1-2 short sentences, describe ' +
  'the visible game state relevant to answering a player question: location/area, ' +
  'any dialogue or menu text on screen, boss/enemy names, and quest info if visible. ' +
  'Be factual and terse. If nothing informative is visible, say so briefly.';

// Vision-only game-state extraction (§6 of the brief: no game-memory reading, ever).
// Screenshots never leave this module except as an API call to Gemini.
export async function extractGameContext(screenshots?: string[]): Promise<GameContext | null> {
  if (!screenshots?.length) return null;

  const response = await genai.models.generateContent({
    model: MODEL,
    contents: [
      ...screenshots.map((data) => ({ inlineData: { data, mimeType: 'image/jpeg' } })),
      { text: VISION_PROMPT },
    ],
  });

  return { summary: response.text ?? '' };
}
