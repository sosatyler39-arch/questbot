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
  // How long the popup stays open after the last input before auto-dismiss
  // (§3.1). 0 is the "never" sentinel — the popup then only closes via the
  // popup hotkey or dismiss(), never on a timer.
  autoDismissSeconds: number;
  sessionToken?: string;
  // §B5: continuous memory is not enable-able until the player has seen
  // and acknowledged the buffering explanation — the brief's "no silent
  // buffering" rule made into an actual gate, enforced in main (index.ts)
  // so the hotkey path can't bypass it either.
  continuousMemoryConsent: boolean;
  onboardingSeen: boolean;
}

export type HotkeyAction = 'popup' | 'continuousMemory';

export const DEFAULT_SETTINGS: QuestbotSettings = {
  popupHotkey: 'Control+Q',
  continuousMemoryHotkey: 'Control+Shift+Q',
  continuousMemoryBufferMinutes: 10,
  autoDismissSeconds: 30,
  continuousMemoryConsent: false,
  onboardingSeen: false,
};

const MIN_BUFFER_MINUTES = 5;
const MAX_BUFFER_MINUTES = 10;

function clampBufferMinutes(minutes: number): number {
  return Math.min(MAX_BUFFER_MINUTES, Math.max(MIN_BUFFER_MINUTES, minutes));
}

// Discrete choices only (a select, not a range) — 0 means "never".
export const AUTO_DISMISS_SECONDS_OPTIONS = [15, 30, 60, 300, 0] as const;

function normalizeAutoDismissSeconds(seconds: unknown): number {
  return typeof seconds === 'number' && (AUTO_DISMISS_SECONDS_OPTIONS as readonly number[]).includes(seconds)
    ? seconds
    : DEFAULT_SETTINGS.autoDismissSeconds;
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
    autoDismissSeconds: normalizeAutoDismissSeconds(obj.autoDismissSeconds),
    sessionToken: typeof obj.sessionToken === 'string' ? obj.sessionToken : undefined,
    continuousMemoryConsent: obj.continuousMemoryConsent === true,
    onboardingSeen: obj.onboardingSeen === true,
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
