import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunkArticle, chunkTranscript } from '../src/pipeline/chunking.js';
import { normalize } from '../src/pipeline/embeddings.js';
import { extractItemName } from '../src/pipeline/location-store.js';

test('chunkArticle: one chunk per non-empty section, titled by heading', () => {
  const chunks = chunkArticle('Margit', 'https://example.com/margit', [
    { heading: 'Strategy', text: 'Use bleed weapons.' },
    { heading: 'Empty', text: '   ' },
    { heading: 'Rewards', text: 'Remembrance of the Fell Omen.' },
  ]);
  assert.equal(chunks.length, 2);
  assert.equal(chunks[0].title, 'Margit — Strategy');
  assert.equal(chunks[0].content, 'Use bleed weapons.');
  assert.equal(chunks[1].title, 'Margit — Rewards');
});

test('chunkTranscript: groups lines into ~45s windows, tags each with its start time', () => {
  const chunks = chunkTranscript('Margit Guide', 'https://youtube.com/watch?v=abc', 'abc', [
    { text: 'First,', start: 0 },
    { text: 'go to the fog gate.', start: 20 },
    { text: 'Then', start: 50 }, // >= 45s from window start (0) -> new window
    { text: 'summon Rogier.', start: 60 },
  ]);
  assert.equal(chunks.length, 2);
  assert.equal(chunks[0].content, 'First, go to the fog gate.');
  if (chunks[0].sourceType === 'video') assert.equal(chunks[0].startSeconds, 0);
  assert.equal(chunks[1].content, 'Then summon Rogier.');
  if (chunks[1].sourceType === 'video') assert.equal(chunks[1].startSeconds, 50);
});

test('chunkTranscript: empty input produces no chunks', () => {
  assert.deepEqual(chunkTranscript('t', 'u', 'v', []), []);
});

test('normalize: rescales a truncated embedding to unit length', () => {
  const result = normalize([3, 4]); // 3-4-5 triangle -> norm 5
  assert.deepEqual(result, [0.6, 0.8]);
  const magnitude = Math.sqrt(result.reduce((sum, x) => sum + x * x, 0));
  assert.ok(Math.abs(magnitude - 1) < 1e-9);
});

test('normalize: zero vector passes through unchanged (no divide-by-zero)', () => {
  assert.deepEqual(normalize([0, 0]), [0, 0]);
});

test('extractItemName: splits on the chunkArticle title separator', () => {
  assert.equal(extractItemName('Magic, skill, and FP talismans — Radagon Icon'), 'Radagon Icon');
});

test('extractItemName: returns null when there is no separator (e.g. video chunk titles)', () => {
  assert.equal(extractItemName('Some Video Title With No Heading'), null);
});
