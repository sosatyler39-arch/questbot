import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, parseDropCell, dedupeCycles } from './ingest-enemy-stats.js';

test('parseCsv handles plain rows', () => {
  assert.deepEqual(parseCsv('a,b\n1,2\n'), [['a', 'b'], ['1', '2']]);
});

test('parseCsv handles quoted fields with embedded commas and newlines', () => {
  assert.deepEqual(parseCsv('"a, b","line1\nline2"\n'), [['a, b', 'line1\nline2']]);
});

test('parseDropCell parses the real sheet format', () => {
  assert.deepEqual(parseDropCell('Serpent Arrow - {5} (10%) [True]'), {
    item: 'Serpent Arrow',
    quantity: 5,
    baseChancePercent: 10,
    discoveryScaling: true,
  });
});

test('parseDropCell returns null for an empty cell', () => {
  assert.equal(parseDropCell(''), null);
});

test('dedupeCycles keeps only cycles where the stat block actually changed', () => {
  const result = dedupeCycles([
    { cycle: 'NG', row: { Health: '100' } },
    { cycle: 'NG+', row: { Health: '100' } },
    { cycle: 'NG+2', row: { Health: '200' } },
    { cycle: 'NG+3', row: { Health: '200' } },
  ]);
  assert.deepEqual(
    result.map((r) => r.cycle),
    ['NG', 'NG+2'],
  );
});

test('dedupeCycles always keeps at least the first cycle', () => {
  const result = dedupeCycles([{ cycle: 'NG', row: { Health: '50' } }]);
  assert.deepEqual(
    result.map((r) => r.cycle),
    ['NG'],
  );
});
