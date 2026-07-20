import {
  type Favorite,
  type HistoryEntry,
  toggleFavorite,
  isAnswerFavorite,
  pushHistory,
} from './library-logic.js';

// Library tab (FEATURE_ADDENDUM §B3 favorites + §B4 history): storage
// wrappers and rendering. Thin shell over library-logic.ts, same pattern
// as checklists.ts. popup.ts and map/render.ts import the storage helpers;
// this module also owns the tab's own DOM.

const FAVORITES_KEY = 'questbot_favorites';
const HISTORY_KEY = 'questbot_history';

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function loadFavorites(): Favorite[] {
  return load<Favorite>(FAVORITES_KEY);
}

export function toggleFavoriteStored(fav: Favorite): Favorite[] {
  const updated = toggleFavorite(loadFavorites(), fav);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  renderLibrary();
  return updated;
}

export function loadHistory(): HistoryEntry[] {
  return load<HistoryEntry>(HISTORY_KEY);
}

export function recordHistory(entry: HistoryEntry): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(pushHistory(loadHistory(), entry)));
  renderLibrary();
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
  renderLibrary();
}

const favoritesEl = document.getElementById('library-favorites');
const historyEl = document.getElementById('library-history');
const clearHistoryBtn = document.getElementById('library-clear-history') as HTMLButtonElement | null;

// Q&A entry shared by both sections: question line expands to the full
// answer on click; star toggles/removes the favorite.
function qaEntry(opts: { question: string; answer: string; id: string; createdAt: number; starred: boolean }): HTMLElement {
  const item = document.createElement('div');
  item.className = 'library-entry';

  const row = document.createElement('div');
  row.className = 'library-row';
  const q = document.createElement('button');
  q.type = 'button';
  q.className = 'library-question';
  q.textContent = opts.question;
  const star = document.createElement('button');
  star.type = 'button';
  star.className = `library-star${opts.starred ? ' starred' : ''}`;
  star.title = opts.starred ? 'Remove from favorites' : 'Save to favorites';
  star.textContent = opts.starred ? '★' : '☆';
  star.addEventListener('click', () => {
    toggleFavoriteStored({ kind: 'answer', id: opts.id, question: opts.question, answer: opts.answer, createdAt: opts.createdAt });
  });
  row.append(q, star);

  const answer = document.createElement('p');
  answer.className = 'library-answer';
  answer.textContent = opts.answer;
  answer.hidden = true;
  q.addEventListener('click', () => {
    answer.hidden = !answer.hidden;
  });

  item.append(row, answer);
  return item;
}

// Location favorites jump to the Map tab with the search prefilled — the
// Map tab's own search-to-center flow takes it from there.
function locationEntry(name: string, createdAt: number): HTMLElement {
  const item = document.createElement('div');
  item.className = 'library-entry';
  const row = document.createElement('div');
  row.className = 'library-row';

  const link = document.createElement('button');
  link.type = 'button';
  link.className = 'library-question';
  link.textContent = `📍 ${name}`;
  link.addEventListener('click', () => {
    document.querySelector<HTMLButtonElement>('.tab-button[data-tab="map"]')?.click();
    const search = document.getElementById('map-search') as HTMLInputElement | null;
    if (search) {
      search.value = name;
      search.dispatchEvent(new Event('input', { bubbles: true }));
      // Take the top search hit to center the map, then close the dropdown.
      document.querySelector<HTMLButtonElement>('#map-search-results .map-search-result')?.click();
    }
  });

  const star = document.createElement('button');
  star.type = 'button';
  star.className = 'library-star starred';
  star.title = 'Remove from favorites';
  star.textContent = '★';
  star.addEventListener('click', () => {
    toggleFavoriteStored({ kind: 'location', name, createdAt });
  });

  row.append(link, star);
  item.append(row);
  return item;
}

export function renderLibrary(): void {
  if (!favoritesEl || !historyEl) return; // markup not present (tests)

  const favorites = loadFavorites();
  favoritesEl.replaceChildren();
  if (!favorites.length) {
    const empty = document.createElement('p');
    empty.className = 'library-empty';
    empty.textContent = 'Nothing saved yet — star an answer, or click a map pin to save a location.';
    favoritesEl.append(empty);
  }
  for (const fav of favorites) {
    favoritesEl.append(
      fav.kind === 'answer'
        ? qaEntry({ question: fav.question, answer: fav.answer, id: fav.id, createdAt: fav.createdAt, starred: true })
        : locationEntry(fav.name, fav.createdAt),
    );
  }

  const history = loadHistory();
  historyEl.replaceChildren();
  if (!history.length) {
    const empty = document.createElement('p');
    empty.className = 'library-empty';
    empty.textContent = 'No questions asked yet.';
    historyEl.append(empty);
  }
  const favs = favorites;
  for (const entry of history) {
    historyEl.append(
      qaEntry({
        question: entry.question,
        answer: entry.answer,
        id: entry.id,
        createdAt: entry.createdAt,
        starred: isAnswerFavorite(favs, entry.id),
      }),
    );
  }
  if (clearHistoryBtn) clearHistoryBtn.disabled = history.length === 0;
}

clearHistoryBtn?.addEventListener('click', clearHistory);
renderLibrary();
