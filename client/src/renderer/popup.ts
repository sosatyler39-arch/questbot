import type { AskResponse, SourceCard } from './types.js';
import { ask, captureScreenshot, sendFeedback, generateChecklist } from './api.js';
import { isMultiStepAnswer, makeChecklist } from './checklist-logic.js';
import { saveChecklist, renderChecklistCard, renderSavedChecklists } from './checklists.js';
import { isAnswerFavorite } from './library-logic.js';
import { loadFavorites, toggleFavoriteStored, recordHistory } from './library.js';
import { switchToTab } from './tabs.js';
import { focusLocationByName } from './map/render.js';

const questionEl = document.getElementById('question') as HTMLInputElement;
const answerEl = document.getElementById('answer')!;
const sourceEl = document.getElementById('source')!;
const feedbackEl = document.getElementById('feedback')!;
const thumbsUp = document.getElementById('thumbs-up') as HTMLButtonElement;
const thumbsDown = document.getElementById('thumbs-down') as HTMLButtonElement;
const makeChecklistBtn = document.getElementById('make-checklist') as HTMLButtonElement;
const favoriteAnswerBtn = document.getElementById('favorite-answer') as HTMLButtonElement;
const answerChecklists = document.getElementById('answer-checklists')!;

// Popup, not a sidebar: auto-dismiss after inactivity (§3.1 of the brief),
// configurable in Settings. null means "never" — deliberately a distinct
// off-switch rather than a huge millisecond number: window.setTimeout with
// an enormous/Infinity delay isn't guaranteed to mean "never fires" (32-bit
// overflow risk), so "never" instead means no timer gets scheduled at all.
let autoDismissMs: number | null = 30_000;
let dismissTimer: number | undefined;
function resetDismissTimer(): void {
  clearTimeout(dismissTimer);
  if (autoDismissMs === null) return;
  dismissTimer = window.setTimeout(dismiss, autoDismissMs);
}
function dismiss(): void {
  if (typeof window.questbot !== 'undefined') {
    window.questbot.dismiss();
  } else {
    window.close();
  }
}
['keydown', 'mousemove', 'mousedown'].forEach((ev) =>
  document.addEventListener(ev, resetDismissTimer),
);

// Exported so settings.ts can apply a change live, in the same session,
// without a page reload — same cross-module call pattern already used
// elsewhere (e.g. library.ts calling into map/render.ts).
export function setAutoDismissSeconds(seconds: number): void {
  autoDismissMs = seconds === 0 ? null : seconds * 1000;
  resetDismissTimer();
}

if (typeof window.questbot !== 'undefined') {
  void window.questbot.getSettings().then((s) => setAutoDismissSeconds(s.autoDismissSeconds));
} else {
  resetDismissTimer(); // no preload bridge (tests/plain-browser preview) — fall back to the 30s default
}

function renderSource(source: SourceCard, locations?: string[]): void {
  const card = document.createElement('div');
  card.className = 'card';
  const link = document.createElement('a');
  link.href = source.url;
  link.target = '_blank';
  link.textContent = source.title;
  card.append(link);
  if (source.kind === 'article') {
    const snippet = document.createElement('p');
    snippet.textContent = source.snippet;
    card.append(snippet);
  } else {
    // Timestamp deep-link via YouTube embed — never re-hosted or clipped (§6).
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${source.videoId}?start=${source.startSeconds}`;
    iframe.allowFullscreen = true;
    card.append(iframe);
  }
  for (const name of locations ?? []) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'show-on-map';
    btn.textContent = `Show on map: ${name}`;
    btn.addEventListener('click', () => {
      switchToTab('map');
      focusLocationByName(name);
    });
    card.append(btn);
  }
  sourceEl.replaceChildren(card);
  sourceEl.hidden = false;
}

function renderAnswer(res: AskResponse, question: string): void {
  answerEl.textContent = res.answer;
  answerEl.classList.toggle('low-confidence', !!res.lowConfidence);
  answerEl.hidden = false;
  sourceEl.hidden = true;
  if (res.source) renderSource(res.source, res.locations);
  thumbsUp.classList.remove('selected');
  thumbsDown.classList.remove('selected');
  feedbackEl.hidden = false;
  thumbsUp.onclick = () => {
    sendFeedback(res.answerId, true);
    thumbsUp.classList.add('selected');
    thumbsDown.classList.remove('selected');
  };
  thumbsDown.onclick = () => {
    sendFeedback(res.answerId, false);
    thumbsDown.classList.add('selected');
    thumbsUp.classList.remove('selected');
  };

  // §B4: every answered question lands in history (low-confidence included
  // — knowing what Questbot couldn't answer is useful too). locations is a
  // frozen snapshot, same as the answer text itself, so "Show on map" still
  // works when revisiting an old entry.
  recordHistory({
    id: res.answerId,
    question,
    answer: res.answer,
    lowConfidence: res.lowConfidence,
    locations: res.locations,
    createdAt: Date.now(),
  });

  // §B3: star saves the answer to favorites; hidden for low-confidence
  // non-answers (nothing worth saving).
  favoriteAnswerBtn.hidden = !!res.lowConfidence;
  const refreshStar = () => {
    const starred = isAnswerFavorite(loadFavorites(), res.answerId);
    favoriteAnswerBtn.textContent = starred ? '★' : '☆';
    favoriteAnswerBtn.classList.toggle('selected', starred);
    favoriteAnswerBtn.title = starred ? 'Remove from favorites' : 'Save to favorites';
  };
  refreshStar();
  favoriteAnswerBtn.onclick = () => {
    toggleFavoriteStored({ kind: 'answer', id: res.answerId, question, answer: res.answer, locations: res.locations, createdAt: Date.now() });
    refreshStar();
  };

  // §B1: offer a checklist only when the answer reads as multi-step —
  // never for low-confidence non-answers.
  makeChecklistBtn.hidden = !!res.lowConfidence || !isMultiStepAnswer(res.answer);
  makeChecklistBtn.disabled = false;
  makeChecklistBtn.textContent = 'Turn into checklist';
  makeChecklistBtn.onclick = async () => {
    makeChecklistBtn.disabled = true;
    makeChecklistBtn.textContent = 'Building…';
    try {
      const { title, steps } = await generateChecklist(question, res.answer);
      if (steps.length) {
        const list = makeChecklist(title, steps, 'answer');
        saveChecklist(list);
        answerChecklists.prepend(renderChecklistCard(list));
      }
      makeChecklistBtn.hidden = true;
    } catch {
      makeChecklistBtn.disabled = false;
      makeChecklistBtn.textContent = 'Checklist failed — retry';
    }
  };
}

questionEl.addEventListener('keydown', async (e) => {
  if (e.key !== 'Enter' || !questionEl.value.trim()) return;
  const question = questionEl.value.trim();
  answerEl.textContent = 'Thinking…';
  answerEl.classList.remove('low-confidence');
  answerEl.hidden = false;
  sourceEl.hidden = true;
  feedbackEl.hidden = true;
  try {
    const shots = await captureScreenshot();
    renderAnswer(await ask(question, shots), question);
  } catch (err) {
    answerEl.textContent = `Something went wrong: ${err instanceof Error ? err.message : err}`;
  }
});

// Saved answer checklists survive close/reopen (§B1 persistence
// requirement) — restore them on load.
renderSavedChecklists(answerChecklists, 'answer');
