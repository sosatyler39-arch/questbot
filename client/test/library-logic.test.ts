import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  type Favorite,
  toggleFavorite,
  isLocationFavorite,
  isAnswerFavorite,
  pushHistory,
  HISTORY_CAP,
} from '../src/renderer/library-logic.js';

const answerFav: Favorite = { kind: 'answer', id: 'a1', question: 'q', answer: 'a', createdAt: 1 };
const locationFav: Favorite = { kind: 'location', name: 'Stormveil Castle', createdAt: 2 };

test('toggleFavorite adds new favorites newest-first', () => {
  const favs = toggleFavorite(toggleFavorite([], answerFav), locationFav);
  assert.deepEqual(
    favs.map((f) => f.kind),
    ['location', 'answer'],
  );
});

test('toggleFavorite removes an existing favorite by identity', () => {
  const favs = toggleFavorite([answerFav, locationFav], { ...answerFav, createdAt: 99 });
  assert.equal(favs.length, 1);
  assert.equal(favs[0].kind, 'location');
});

test('answer and location favorites with overlapping text do not collide', () => {
  const loc: Favorite = { kind: 'location', name: 'a1', createdAt: 3 };
  const favs = toggleFavorite([answerFav], loc);
  assert.equal(favs.length, 2);
});

test('isLocationFavorite / isAnswerFavorite look up by the right key', () => {
  const favs = [answerFav, locationFav];
  assert.equal(isLocationFavorite(favs, 'Stormveil Castle'), true);
  assert.equal(isLocationFavorite(favs, 'a1'), false);
  assert.equal(isAnswerFavorite(favs, 'a1'), true);
  assert.equal(isAnswerFavorite(favs, 'Stormveil Castle'), false);
});

test('pushHistory prepends and caps', () => {
  const entry = (id: string) => ({ id, question: 'q', answer: 'a', createdAt: 0 });
  let entries = pushHistory([], entry('1'));
  entries = pushHistory(entries, entry('2'));
  assert.deepEqual(
    entries.map((e) => e.id),
    ['2', '1'],
  );

  let full = Array.from({ length: HISTORY_CAP }, (_, i) => entry(String(i)));
  full = pushHistory(full, entry('newest'));
  assert.equal(full.length, HISTORY_CAP);
  assert.equal(full[0].id, 'newest');
});
