// Trimmed copy of client/src/renderer/library-logic.ts's location-favoriting
// slice only — the website has no Ask tab, so answer-favoriting and
// history don't apply here. Pure logic, DOM-free, same as the original.

export interface FavoriteLocation {
  kind: 'location';
  name: string;
  createdAt: number;
}

export type Favorite = FavoriteLocation;

function favoriteKey(fav: Favorite): string {
  return `location:${fav.name}`;
}

// Toggle semantics: adding an already-favorited item removes it. Newest
// first, since the list would render top-down if a favorites list UI is
// ever added to the website.
export function toggleFavorite(favorites: Favorite[], fav: Favorite): Favorite[] {
  const key = favoriteKey(fav);
  const without = favorites.filter((f) => favoriteKey(f) !== key);
  return without.length === favorites.length ? [fav, ...favorites] : without;
}

export function isLocationFavorite(favorites: Favorite[], name: string): boolean {
  return favorites.some((f) => f.name === name);
}
