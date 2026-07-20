import { test } from 'node:test';
import assert from 'node:assert/strict';
import { acceleratorFromEvent, isDuplicateHotkey } from '../src/renderer/settings-logic.js';

function combo(overrides: Partial<{ ctrlKey: boolean; shiftKey: boolean; altKey: boolean; metaKey: boolean; key: string }>) {
  return { ctrlKey: false, shiftKey: false, altKey: false, metaKey: false, key: '', ...overrides };
}

test('acceleratorFromEvent builds an Electron accelerator string from a modifier + key', () => {
  assert.equal(acceleratorFromEvent(combo({ ctrlKey: true, key: 'q' })), 'Control+Q');
  assert.equal(acceleratorFromEvent(combo({ ctrlKey: true, shiftKey: true, key: 'q' })), 'Control+Shift+Q');
  assert.equal(acceleratorFromEvent(combo({ altKey: true, key: 'F1' })), 'Alt+F1');
});

test('acceleratorFromEvent returns null with no modifier held', () => {
  assert.equal(acceleratorFromEvent(combo({ key: 'q' })), null);
});

test('acceleratorFromEvent returns null while only a bare modifier is pressed', () => {
  assert.equal(acceleratorFromEvent(combo({ ctrlKey: true, key: 'Control' })), null);
});

test('isDuplicateHotkey is case-insensitive', () => {
  assert.equal(isDuplicateHotkey('Control+Q', 'control+q'), true);
  assert.equal(isDuplicateHotkey('Control+Q', 'Control+Shift+Q'), false);
});
