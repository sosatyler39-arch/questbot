import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv } from './ingest-frame-data.js';

test('parseCsv handles plain rows', () => {
  assert.deepEqual(parseCsv('a,b\n1,2\n'), [['a', 'b'], ['1', '2']]);
});

test('parseCsv handles quoted fields with embedded commas and newlines', () => {
  assert.deepEqual(parseCsv('"a, b","line1\nline2"\n'), [['a, b', 'line1\nline2']]);
});
