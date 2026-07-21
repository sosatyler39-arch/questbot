// Pure favorites/history logic for FEATURE_ADDENDUM §B3/§B4, DOM-free and
// unit-tested (same split as the other *-logic.ts modules).

export interface FavoriteAnswer {
  kind: 'answer';
  id: string; // the answerId from /ask
  question: string;
  answer: string;
  locations?: string[]; // frozen snapshot from AskResponse at the time this was saved
  createdAt: number;
}

export interface FavoriteLocation {
  kind: 'location';
  name: string;
  createdAt: number;
}

export type Favorite = FavoriteAnswer | FavoriteLocation;

function favoriteKey(fav: Favorite): string {
  return fav.kind === 'answer' ? `answer:${fav.id}` : `location:${fav.name}`;
}

// Toggle semantics: adding an already-favorited item removes it. Newest
// first, since the list renders top-down.
export function toggleFavorite(favorites: Favorite[], fav: Favorite): Favorite[] {
  const key = favoriteKey(fav);
  const without = favorites.filter((f) => favoriteKey(f) !== key);
  return without.length === favorites.length ? [fav, ...favorites] : without;
}

export function isLocationFavorite(favorites: Favorite[], name: string): boolean {
  return favorites.some((f) => f.kind === 'location' && f.name === name);
}

export function isAnswerFavorite(favorites: Favorite[], id: string): boolean {
  return favorites.some((f) => f.kind === 'answer' && f.id === id);
}

export interface HistoryEntry {
  id: string; // answerId
  question: string;
  answer: string;
  lowConfidence?: boolean;
  locations?: string[]; // frozen snapshot from AskResponse at the time this was asked
  createdAt: number;
}

export const HISTORY_CAP = 100;

// Newest first, capped — history is a log, not an archive (§B4: current
// session minimum; localStorage persistence gives cross-session for free
// without needing server-side sync).
export function pushHistory(entries: HistoryEntry[], entry: HistoryEntry, cap = HISTORY_CAP): HistoryEntry[] {
  return [entry, ...entries].slice(0, cap);
}
