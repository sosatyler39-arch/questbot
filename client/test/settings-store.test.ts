import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { initSettingsStore, getSettings, updateSettings, DEFAULT_SETTINGS } from '../src/main/settings-store.js';

function tempSettingsPath(): string {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'questbot-settings-')), 'settings.json');
}

test('initSettingsStore seeds defaults when the file is missing', () => {
  const filePath = tempSettingsPath();
  const settings = initSettingsStore(filePath);
  assert.deepEqual(settings, DEFAULT_SETTINGS);
  assert.ok(fs.existsSync(filePath), 'settings file should be created');
  assert.deepEqual(JSON.parse(fs.readFileSync(filePath, 'utf-8')), DEFAULT_SETTINGS);
});

test('initSettingsStore loads persisted values from an existing file', () => {
  const filePath = tempSettingsPath();
  fs.writeFileSync(
    filePath,
    JSON.stringify({ popupHotkey: 'Alt+Q', continuousMemoryHotkey: 'Alt+Shift+Q', continuousMemoryBufferMinutes: 7 }),
  );
  const settings = initSettingsStore(filePath);
  assert.equal(settings.popupHotkey, 'Alt+Q');
  assert.equal(settings.continuousMemoryHotkey, 'Alt+Shift+Q');
  assert.equal(settings.continuousMemoryBufferMinutes, 7);
});

test('initSettingsStore falls back to defaults when the file has corrupt JSON', () => {
  const filePath = tempSettingsPath();
  fs.writeFileSync(filePath, '{ not valid json');
  const settings = initSettingsStore(filePath);
  assert.deepEqual(settings, DEFAULT_SETTINGS);
  assert.deepEqual(
    JSON.parse(fs.readFileSync(filePath, 'utf-8')),
    DEFAULT_SETTINGS,
    'corrupt file should be overwritten with valid defaults',
  );
});

test('initSettingsStore fills in missing fields from an older-shape file', () => {
  const filePath = tempSettingsPath();
  fs.writeFileSync(filePath, JSON.stringify({ popupHotkey: 'Alt+Q' }));
  const settings = initSettingsStore(filePath);
  assert.equal(settings.popupHotkey, 'Alt+Q');
  assert.equal(settings.continuousMemoryHotkey, DEFAULT_SETTINGS.continuousMemoryHotkey);
  assert.equal(settings.continuousMemoryBufferMinutes, DEFAULT_SETTINGS.continuousMemoryBufferMinutes);
});

test('updateSettings persists a partial change and merges with the current cache', () => {
  const filePath = tempSettingsPath();
  initSettingsStore(filePath);
  const updated = updateSettings({ popupHotkey: 'Alt+Q' });
  assert.equal(updated.popupHotkey, 'Alt+Q');
  assert.equal(updated.continuousMemoryHotkey, DEFAULT_SETTINGS.continuousMemoryHotkey);
  assert.equal(getSettings().popupHotkey, 'Alt+Q');
  assert.equal(JSON.parse(fs.readFileSync(filePath, 'utf-8')).popupHotkey, 'Alt+Q');
});

test('updateSettings clamps continuousMemoryBufferMinutes to the 5-10 range', () => {
  const filePath = tempSettingsPath();
  initSettingsStore(filePath);
  assert.equal(updateSettings({ continuousMemoryBufferMinutes: 2 }).continuousMemoryBufferMinutes, 5);
  assert.equal(updateSettings({ continuousMemoryBufferMinutes: 99 }).continuousMemoryBufferMinutes, 10);
});
