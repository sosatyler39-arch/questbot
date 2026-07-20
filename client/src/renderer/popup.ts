import type { AskResponse, SourceCard } from './types.js';
import { ask, captureScreenshot, sendFeedback, generateChecklist } from './api.js';
import { isMultiStepAnswer, makeChecklist } from './checklist-logic.js';
import { saveChecklist, renderChecklistCard, renderSavedChecklists } from './checklists.js';
import { isAnswerFavorite } from './library-logic.js';
import { loadFavorites, toggleFavoriteStored, recordHistory } from './library.js';

const AUTO_DISMISS_MS = 30_000;

const questionEl = document.getElementById('question') as HTMLInputElement;
const answerEl = document.getElementById('answer')!;
const sourceEl = document.getElementById('source')!;
const feedbackEl = document.getElementById('feedback')!;
const thumbsUp = document.getElementById('thumbs-up') as HTMLButtonElement;
const thumbsDown = document.getElementById('thumbs-down') as HTMLButtonElement;
const makeChecklistBtn = document.getElementById('make-checklist') as HTMLButtonElement;
const favoriteAnswerBtn = document.getElementById('favorite-answer') as HTMLButtonElement;
const answerChecklists = document.getElementById('answer-checklists')!;

// Popup, not a sidebar: auto-dismiss after inactivity (§3.1 of the brief).
let dismissTimer: number | undefined;
function resetDismissTimer(): void {
  clearTimeout(dismissTimer);
  dismissTimer = window.setTimeout(dismiss, AUTO_DISMISS_MS);
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
resetDismissTimer();

function renderSource(source: SourceCard): void {
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
  sourceEl.replaceChildren(card);
  sourceEl.hidden = false;
}

function renderAnswer(res: AskResponse, question: string): void {
  answerEl.textContent = res.answer;
  answerEl.classList.toggle('low-confidence', !!res.lowConfidence);
  answerEl.hidden = false;
  sourceEl.hidden = true;
  if (res.source) renderSource(res.source);
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
  // — knowing what Questbot couldn't answer is useful too).
  recordHistory({
    id: res.answerId,
    question,
    answer: res.answer,
    lowConfidence: res.lowConfidence,
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
    toggleFavoriteStored({ kind: 'answer', id: res.answerId, question, answer: res.answer, createdAt: Date.now() });
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
