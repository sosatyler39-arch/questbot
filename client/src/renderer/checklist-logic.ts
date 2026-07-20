// Pure detection logic for FEATURE_ADDENDUM §B1, kept DOM-free so it's
// unit-testable (same split as settings-logic.ts vs settings.ts).

// Does an answer read as inherently multi-step (questline, staged boss
// strategy, multi-part puzzle)? Cheap heuristic, not an LLM call — this
// only decides whether to *offer* the checklist button; the actual step
// extraction happens server-side on demand.
export function isMultiStepAnswer(text: string): boolean {
  const listMarkers = (text.match(/(?:^|\n)\s*(?:\d+[.)]|[-*•])\s+/g) ?? []).length;
  if (listMarkers >= 2) return true;
  const connectives = text.toLowerCase().match(/\b(?:then|after that|next|once you|first|afterwards|finally)\b/g) ?? [];
  return connectives.length >= 2;
}

export interface ChecklistStep {
  text: string;
  done: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  source: 'answer' | 'route';
  steps: ChecklistStep[];
  createdAt: number;
}

export function makeChecklist(title: string, steps: string[], source: Checklist['source']): Checklist {
  return {
    id: crypto.randomUUID(),
    title,
    source,
    steps: steps.map((text) => ({ text, done: false })),
    createdAt: Date.now(),
  };
}

// Pure list-in/list-out mutations — the localStorage wrapper in
// checklists.ts stays a thin untested shell around these.
export function toggleStep(list: Checklist, index: number): Checklist {
  return {
    ...list,
    steps: list.steps.map((s, i) => (i === index ? { ...s, done: !s.done } : s)),
  };
}

export function upsertChecklist(lists: Checklist[], list: Checklist): Checklist[] {
  const existing = lists.findIndex((l) => l.id === list.id);
  if (existing === -1) return [...lists, list];
  return lists.map((l, i) => (i === existing ? list : l));
}

export function removeChecklist(lists: Checklist[], id: string): Checklist[] {
  return lists.filter((l) => l.id !== id);
}
