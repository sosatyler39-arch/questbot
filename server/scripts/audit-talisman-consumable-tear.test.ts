import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, normalizeName, matchRows } from './audit-talisman-consumable-tear.js';

test('parseCsv handles plain rows', () => {
  assert.deepEqual(parseCsv('a,b,c\n1,2,3\n'), [['a', 'b', 'c'], ['1', '2', '3']]);
});

test('parseCsv handles quoted fields with embedded commas', () => {
  assert.deepEqual(parseCsv('"Raises HP, greatly","10%"\n'), [['Raises HP, greatly', '10%']]);
});

test('parseCsv handles escaped quotes inside quoted fields', () => {
  assert.deepEqual(parseCsv('"She said ""hi""","ok"\n'), [['She said "hi"', 'ok']]);
});

test('parseCsv handles embedded literal newlines inside quoted fields', () => {
  assert.deepEqual(parseCsv('"line one\nline two","ok"\n'), [['line one\nline two', 'ok']]);
});

test('normalizeName lowercases and trims', () => {
  assert.equal(normalizeName("  Prince of Death's Pustule  "), "prince of death's pustule");
});

test('matchRows separates matched, sheet-only, and corpus-only names', () => {
  const result = matchRows(
    [{ Name: 'Golden Vow' }, { Name: 'Only In Sheet' }],
    ['Golden Vow', 'Only In Corpus'],
  );
  assert.deepEqual(result.matched, ['golden vow']);
  assert.deepEqual(result.sheetOnly, ['only in sheet']);
  assert.deepEqual(result.corpusOnly, ['only in corpus']);
});
