import fs from 'node:fs';

// Persisted player preferences — hotkeys and the continuous-memory buffer
// duration. Hand-rolled JSON file instead of a library (electron-store):
// the shape is a handful of primitive fields, well within plain fs
// read/write, and it avoids electron-store's newer ESM-only majors
// fighting this project's CJS main-process build. See
// docs/superpowers/specs/2026-07-19-settings-panel-design.md.
export interface QuestbotSettings {
  popupHotkey: string;
  continuousMemoryHotkey: string;
  continuousMemoryBufferMinutes: number;
  sessionToken?: string;
}

export type HotkeyAction = 'popup' | 'continuousMemory';

export const DEFAULT_SETTINGS: QuestbotSettings = {
  popupHotkey: 'Control+Q',
  continuousMemoryHotkey: 'Control+Shift+Q',
  continuousMemoryBufferMinutes: 10,
};

const MIN_BUFFER_MINUTES = 5;
const MAX_BUFFER_MINUTES = 10;

function clampBufferMinutes(minutes: number): number {
  return Math.min(MAX_BUFFER_MINUTES, Math.max(MIN_BUFFER_MINUTES, minutes));
}

// Merges parsed JSON with defaults field-by-field so a partially-corrupt or
// older-shape file (missing a field added later) still yields a fully
// valid QuestbotSettings instead of throwing or losing the other fields.
function normalize(raw: unknown): QuestbotSettings {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Partial<QuestbotSettings>;
  return {
    popupHotkey: typeof obj.popupHotkey === 'string' ? obj.popupHotkey : DEFAULT_SETTINGS.popupHotkey,
    continuousMemoryHotkey:
      typeof obj.continuousMemoryHotkey === 'string' ? obj.continuousMemoryHotkey : DEFAULT_SETTINGS.continuousMemoryHotkey,
    continuousMemoryBufferMinutes:
      typeof obj.continuousMemoryBufferMinutes === 'number'
        ? clampBufferMinutes(obj.continuousMemoryBufferMinutes)
        : DEFAULT_SETTINGS.continuousMemoryBufferMinutes,
    sessionToken: typeof obj.sessionToken === 'string' ? obj.sessionToken : undefined,
  };
}

function readFromDisk(filePath: string): QuestbotSettings {
  try {
    return normalize(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function writeToDisk(filePath: string, settings: QuestbotSettings): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    // Best-effort persistence (see spec "Error handling") — the in-memory
    // cache still reflects the change for this session even if the write
    // fails (disk full, permissions). Logged so a real failure is visible
    // in the app's console output instead of silently vanishing.
    console.error('Failed to write settings.json:', err);
  }
}

let cache: QuestbotSettings = DEFAULT_SETTINGS;
let cacheFilePath: string | undefined;

// Called once at startup, before any hotkeys are registered. Loads the file
// if present, else seeds it with defaults so the file exists for next
// launch. A corrupt file is overwritten with valid defaults.
export function initSettingsStore(filePath: string): QuestbotSettings {
  cacheFilePath = filePath;
  cache = fs.existsSync(filePath) ? readFromDisk(filePath) : { ...DEFAULT_SETTINGS };
  writeToDisk(filePath, cache);
  return cache;
}

export function getSettings(): QuestbotSettings {
  return cache;
}

export function updateSettings(partial: Partial<QuestbotSettings>): QuestbotSettings {
  cache = normalize({ ...cache, ...partial });
  if (cacheFilePath) writeToDisk(cacheFilePath, cache);
  return cache;
}
