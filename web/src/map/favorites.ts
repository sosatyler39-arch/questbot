// Trimmed copy of client/src/renderer/library.ts's storage wrapper — the
// original also calls renderLibrary() after every toggle, which is
// specific to the Electron app's Library tab and doesn't exist here.
import { type Favorite, toggleFavorite } from './favorites-logic.js';

const FAVORITES_KEY = 'questbot_favorites';

export function loadFavorites(): Favorite[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as Favorite[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteStored(fav: Favorite): Favorite[] {
  const updated = toggleFavorite(loadFavorites(), fav);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
