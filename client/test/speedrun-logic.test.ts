import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toggleStop, removeStopAt, serializeRoute, deserializeRoute } from '../src/renderer/speedrun-logic.js';

test('toggleStop appends a new stop at the end', () => {
  assert.deepEqual(toggleStop(['Stormveil Castle'], 'Gatefront Ruins'), ['Stormveil Castle', 'Gatefront Ruins']);
});

test('toggleStop removes an existing stop, preserving order of the rest', () => {
  assert.deepEqual(toggleStop(['a', 'b', 'c'], 'b'), ['a', 'c']);
});

test('toggleStop does not mutate the input', () => {
  const route = ['a'];
  toggleStop(route, 'b');
  assert.deepEqual(route, ['a']);
});

test('removeStopAt drops exactly the indexed stop', () => {
  assert.deepEqual(removeStopAt(['a', 'b', 'c'], 1), ['a', 'c']);
});

test('route round-trips through serialization', () => {
  assert.deepEqual(deserializeRoute(serializeRoute(['a', 'b'])), ['a', 'b']);
});

test('deserializeRoute tolerates garbage and wrong shapes', () => {
  assert.deepEqual(deserializeRoute(null), []);
  assert.deepEqual(deserializeRoute('not json'), []);
  assert.deepEqual(deserializeRoute('{"a":1}'), []);
  assert.deepEqual(deserializeRoute('[1, "b", null]'), ['b']);
});
