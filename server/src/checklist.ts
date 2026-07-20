import { genai, MODEL } from './llm.js';

// FEATURE_ADDENDUM §B1: turn a multi-step answer into discrete checkable
// steps. Shared engine — the /checklist route uses it for answers; the
// client's Speedrun tab (§B2) builds route checklists from stop names
// directly and never needs the LLM.
const SYSTEM_PROMPT =
  'Break the provided Elden Ring guidance into a short ordered checklist of ' +
  'concrete actions. Reply with one step per line, no numbering, no bullets, ' +
  'no extra prose before or after. Use 3-10 steps. Each step is a single ' +
  'imperative sentence.';

// Tolerant of the model ignoring the "no numbering" instruction — strips
// leading list markers either way. Pure, unit-tested without the API.
export function parseSteps(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function generateChecklistSteps(question: string | undefined, answer: string): Promise<string[]> {
  const response = await genai.models.generateContent({
    model: MODEL,
    config: { systemInstruction: SYSTEM_PROMPT },
    contents: (question ? `Question: ${question}\n\n` : '') + `Guidance:\n${answer}`,
  });
  return parseSteps(response.text ?? '');
}
