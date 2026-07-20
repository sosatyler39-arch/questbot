import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setBufferDurationMinutes, getBufferDurationMs } from '../src/main/buffer-duration.js';

test('setBufferDurationMinutes converts minutes to milliseconds', () => {
  setBufferDurationMinutes(7);
  assert.equal(getBufferDurationMs(), 7 * 60 * 1000);
});

test('setBufferDurationMinutes clamps below the 5-minute floor', () => {
  setBufferDurationMinutes(1);
  assert.equal(getBufferDurationMs(), 5 * 60 * 1000);
});

test('setBufferDurationMinutes clamps above the 10-minute ceiling', () => {
  setBufferDurationMinutes(99);
  assert.equal(getBufferDurationMs(), 10 * 60 * 1000);
});
