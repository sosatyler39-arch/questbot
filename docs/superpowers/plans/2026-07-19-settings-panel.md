# Settings Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Settings panel to the Questbot popup letting players rebind the two global hotkeys, adjust/toggle the continuous-memory buffer, and see app version info — the first of four planned player-facing UX features beyond the locked V1 brief.

**Architecture:** A hand-rolled JSON settings file (`settings.json` in Electron's userData dir) owned by a new main-process module, loaded before hotkeys are registered at startup. A small IPC surface exposes get/set operations to the renderer. Hotkey-capture and duplicate-detection logic lives in a pure, DOM-free renderer module so it's unit-testable; the buffer duration's clamping logic lives in a pure, Electron-free main-process module for the same reason.

**Tech Stack:** TypeScript, Electron 43 (main/preload/renderer), `node:test` + `node:assert/strict` via `tsx --test` (matches the pattern already used in `server/test`), no new runtime dependencies.

## Global Constraints

- No new dependency for settings persistence — hand-rolled JSON file, not `electron-store` (spec: newer majors are ESM-only, fights this project's CJS main-process build).
- Persisted fields are exactly `popupHotkey`, `continuousMemoryHotkey`, `continuousMemoryBufferMinutes` (5–10, default 10) — no account/tier field, no "continuous memory default-on" flag (spec explicitly cuts both as out of scope / YAGNI).
- Continuous-memory on/off stays pure runtime state, never persisted.
- Settings entry point is a gear icon, not a new tab.
- Corrupt/missing settings file must never block app startup; a settings-file write failure must never crash or block the UI.
- A hotkey rebind must never leave Questbot with zero working hotkeys for that action — always roll back to the previous accelerator on conflict.
- Account/tier display is explicitly out of scope for this feature.

---

## Task 1: Test tooling + `buffer-duration.ts`

**Files:**
- Create: `client/tsconfig.test.json`
- Create: `client/test/buffer-duration.test.ts`
- Create: `client/src/main/buffer-duration.ts`
- Modify: `client/package.json`
- Modify: `package.json` (root)

**Interfaces:**
- Produces: `setBufferDurationMinutes(minutes: number): void`, `getBufferDurationMs(): number` — exported from `client/src/main/buffer-duration.ts`, consumed by Task 2 (`continuous-memory.ts`) and Task 5 (`main/index.ts`).

This module is deliberately Electron-free (no `import ... from 'electron'`) so it can run under plain `tsx --test` — `continuous-memory.ts` imports Electron's `BrowserWindow`/`desktopCapturer`/`screen`, which aren't resolvable outside the actual Electron runtime, so the clamping logic needs to live somewhere that doesn't drag that import in.

- [ ] **Step 1: Add the test-only tsconfig, wire up test scripts, write the failing test**

Create `client/tsconfig.test.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM"],
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["test", "src"]
}
```

This is separate from `tsconfig.json` (main, commonjs) and `tsconfig.renderer.json` (renderer, ES2022/bundler) because the new `client/test/` directory will contain tests that import from both `src/main` and `src/renderer`, and neither existing config's `include` covers `test/`. `server/tsconfig.json` already includes its own `test` directory directly (single config there); client can't do that cleanly because it already has two incompatible module targets, so this is a third, type-check-only config.

Modify `client/package.json` — replace the `scripts` and `devDependencies` blocks:

```json
  "scripts": {
    "build": "tsc -p tsconfig.json && tsc -p tsconfig.renderer.json && node scripts/copy-renderer-assets.js",
    "start": "npm run build && electron .",
    "typecheck": "tsc -p tsconfig.json --noEmit && tsc -p tsconfig.renderer.json --noEmit && tsc -p tsconfig.test.json --noEmit",
    "test": "tsx --test test/*.test.ts",
    "package": "npm run build && electron-builder --publish=never"
  },
  "devDependencies": {
    "electron": "^43.1.1",
    "electron-builder": "^26.15.3",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0"
  },
```

Modify `package.json` (root) — change the `test` script:

```json
    "test": "npm test -w server && npm test -w client",
```

Create the `client/test/` directory and write `client/test/buffer-duration.test.ts`:

```ts
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
```

- [ ] **Step 2: Install `tsx` and run the test to verify it fails**

Run (from repo root): `npm install`

Run (from `client/`): `npm test`

Expected: FAIL — `Cannot find module '../src/main/buffer-duration.js'` (module doesn't exist yet).

- [ ] **Step 3: Write the minimal implementation**

Create `client/src/main/buffer-duration.ts`:

```ts
// Continuous-memory buffer duration, kept as its own tiny Electron-free
// module so it (and its clamping logic) can be unit-tested directly — see
// docs/superpowers/specs/2026-07-19-settings-panel-design.md. Owns only the
// live value; continuous-memory.ts is the Electron-aware consumer.
const MIN_BUFFER_MINUTES = 5;
const MAX_BUFFER_MINUTES = 10;
const DEFAULT_BUFFER_MINUTES = 10;

let bufferDurationMs = DEFAULT_BUFFER_MINUTES * 60 * 1000;

export function setBufferDurationMinutes(minutes: number): void {
  const clamped = Math.min(MAX_BUFFER_MINUTES, Math.max(MIN_BUFFER_MINUTES, minutes));
  bufferDurationMs = clamped * 60 * 1000;
}

export function getBufferDurationMs(): number {
  return bufferDurationMs;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run (from `client/`): `npm test`

Expected: PASS — 3 tests, 0 failures.

Run (from `client/`): `npm run typecheck`

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add client/tsconfig.test.json client/test/buffer-duration.test.ts client/src/main/buffer-duration.ts client/package.json package.json package-lock.json
git commit -m "Add client test tooling and buffer-duration module"
```

---

## Task 2: Wire `buffer-duration.ts` into `continuous-memory.ts`

**Files:**
- Modify: `client/src/main/continuous-memory.ts`

**Interfaces:**
- Consumes: `getBufferDurationMs(): number` from `client/src/main/buffer-duration.ts` (Task 1).
- Produces: no new exports — `continuous-memory.ts`'s existing exports (`setScreenshotCapturer`, `isContinuousMemoryEnabled`, `toggleContinuousMemory`, `captureForQuestion`, `shutdownContinuousMemory`) are unchanged and still consumed by Task 5.

- [ ] **Step 1: Replace the fixed buffer-duration constant with the live value**

In `client/src/main/continuous-memory.ts`, change the import line:

```ts
import { BrowserWindow, desktopCapturer, screen } from 'electron';
import path from 'node:path';
```

to:

```ts
import { BrowserWindow, desktopCapturer, screen } from 'electron';
import path from 'node:path';
import { getBufferDurationMs } from './buffer-duration.js';
```

Change:

```ts
// §5 of the brief: opt-in rolling local buffer, last 5-10 minutes, sampled
// every few seconds (not every frame). Buffer never leaves the device until
// a question is asked. Paywall enforcement is deferred (no billing decision
// yet — see project memory) — the toggle is open to everyone for now.
const SAMPLE_INTERVAL_MS = 5_000;
const BUFFER_DURATION_MS = 10 * 60 * 1000;
const MAX_FRAMES_SENT = 4; // latest + up to 3 sampled, per the brief
```

to:

```ts
// §5 of the brief: opt-in rolling local buffer, last 5-10 minutes (now
// player-configurable via Settings — see buffer-duration.ts), sampled every
// few seconds (not every frame). Buffer never leaves the device until a
// question is asked. Paywall enforcement is deferred (no billing decision
// yet — see project memory) — the toggle is open to everyone for now.
const SAMPLE_INTERVAL_MS = 5_000;
const MAX_FRAMES_SENT = 4; // latest + up to 3 sampled, per the brief
```

Change the trim filter inside `startContinuousMemory`:

```ts
    buffer.push({ capturedAt: now, image });
    buffer = buffer.filter((f) => now - f.capturedAt <= BUFFER_DURATION_MS);
```

to:

```ts
    buffer.push({ capturedAt: now, image });
    buffer = buffer.filter((f) => now - f.capturedAt <= getBufferDurationMs());
```

- [ ] **Step 2: Verify with typecheck**

Run (from `client/`): `npm run typecheck`

Expected: no errors. (This module can't be run under `node:test` — it imports the real `electron` package, which only resolves inside the Electron runtime. Its behavior is covered by Task 11's manual verification.)

- [ ] **Step 3: Commit**

```bash
git add client/src/main/continuous-memory.ts
git commit -m "Use the configurable buffer duration in continuous-memory.ts"
```

---

## Task 3: `settings-store.ts`

**Files:**
- Create: `client/src/main/settings-store.ts`
- Create: `client/test/settings-store.test.ts`

**Interfaces:**
- Produces: `QuestbotSettings` interface, `HotkeyAction` type (`'popup' | 'continuousMemory'`), `DEFAULT_SETTINGS` constant, `initSettingsStore(filePath: string): QuestbotSettings`, `getSettings(): QuestbotSettings`, `updateSettings(partial: Partial<QuestbotSettings>): QuestbotSettings` — all consumed by Task 5 (`main/index.ts`) and Task 6 (`preload.ts`, type-only).

- [ ] **Step 1: Write the failing tests**

Create `client/test/settings-store.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run (from `client/`): `npm test`

Expected: FAIL — `Cannot find module '../src/main/settings-store.js'`.

- [ ] **Step 3: Write the minimal implementation**

Create `client/src/main/settings-store.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run (from `client/`): `npm test`

Expected: PASS — 9 tests total (3 from Task 1 + 6 here), 0 failures.

Run (from `client/`): `npm run typecheck`

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add client/src/main/settings-store.ts client/test/settings-store.test.ts
git commit -m "Add settings-store.ts for persisted player preferences"
```

---

## Task 4: `settings-logic.ts`

**Files:**
- Create: `client/src/renderer/settings-logic.ts`
- Create: `client/test/settings-logic.test.ts`

**Interfaces:**
- Produces: `acceleratorFromEvent(e: { ctrlKey: boolean; shiftKey: boolean; altKey: boolean; metaKey: boolean; key: string }): string | null`, `isDuplicateHotkey(candidate: string, other: string): boolean` — both consumed by Task 10 (`settings.ts`).

- [ ] **Step 1: Write the failing tests**

Create `client/test/settings-logic.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run (from `client/`): `npm test`

Expected: FAIL — `Cannot find module '../src/renderer/settings-logic.js'`.

- [ ] **Step 3: Write the minimal implementation**

Create `client/src/renderer/settings-logic.ts`:

```ts
// Pure hotkey-capture/validation logic, kept separate from settings.ts's
// DOM wiring so it's unit-testable without a DOM environment. See
// docs/superpowers/specs/2026-07-19-settings-panel-design.md.

const MODIFIER_KEYS = new Set(['Control', 'Shift', 'Alt', 'Meta']);

interface KeyCombo {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  key: string;
}

// Electron accelerator string from a captured key combo, or null if the
// combo doesn't qualify (a bare modifier with nothing else yet, or no
// modifier held at all — hotkeys must include at least one modifier so
// they don't collide with normal typing elsewhere in-game).
export function acceleratorFromEvent(e: KeyCombo): string | null {
  if (MODIFIER_KEYS.has(e.key)) return null; // waiting for a non-modifier key
  const hasModifier = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
  if (!hasModifier) return null;

  const parts: string[] = [];
  if (e.ctrlKey) parts.push('Control');
  if (e.altKey) parts.push('Alt');
  if (e.shiftKey) parts.push('Shift');
  if (e.metaKey) parts.push('Meta');
  parts.push(normalizeKeyName(e.key));
  return parts.join('+');
}

function normalizeKeyName(key: string): string {
  // Single characters ('q', 'Q') become the upper-case Electron key name
  // ('Q'). Multi-character keys (e.g. 'F1', 'ArrowUp') already match
  // Electron's accelerator key names for the common cases this UI allows.
  return key.length === 1 ? key.toUpperCase() : key;
}

// True if `candidate` would collide with `other` — used so the renderer can
// reject a duplicate hotkey immediately, without a round-trip to main.
export function isDuplicateHotkey(candidate: string, other: string): boolean {
  return candidate.toLowerCase() === other.toLowerCase();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run (from `client/`): `npm test`

Expected: PASS — 13 tests total, 0 failures.

Run (from `client/`): `npm run typecheck`

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add client/src/renderer/settings-logic.ts client/test/settings-logic.test.ts
git commit -m "Add settings-logic.ts for hotkey capture/validation"
```

---

## Task 5: Wire settings into `main/index.ts`

**Files:**
- Modify: `client/src/main/index.ts`

**Interfaces:**
- Consumes: `initSettingsStore`, `getSettings`, `updateSettings`, `DEFAULT_SETTINGS`, `HotkeyAction` from `settings-store.ts` (Task 3); `setBufferDurationMinutes` from `buffer-duration.ts` (Task 1); `isContinuousMemoryEnabled`, `toggleContinuousMemory` (already exported by `continuous-memory.ts`, unchanged).
- Produces: five new IPC channels — `get-settings`, `get-app-version`, `get-continuous-memory-state`, `toggle-continuous-memory`, `set-hotkey`, `set-buffer-minutes` — consumed by Task 6 (`preload.ts`).

This task has no automated test of its own: it's Electron main-process wiring (`app`, `globalShortcut`, `ipcMain`) that can't run under `node:test` outside the real Electron runtime. It's verified by `typecheck`/`build` here and by the full manual walkthrough in Task 11.

- [ ] **Step 1: Replace `client/src/main/index.ts` in full**

```ts
import { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } from 'electron';
import path from 'node:path';
import {
  setScreenshotCapturer,
  toggleContinuousMemory,
  captureForQuestion,
  shutdownContinuousMemory,
  isContinuousMemoryEnabled,
} from './continuous-memory.js';
import { setBufferDurationMinutes } from './buffer-duration.js';
import { DEFAULT_SETTINGS, initSettingsStore, getSettings, updateSettings, type HotkeyAction } from './settings-store.js';

// Non-injecting overlay: a separate always-on-top desktop window, not code
// injected into the game process. Deliberate choice over an Overwolf/DX-hook
// approach — see README "Client architecture" for why. Real limitation that
// comes with it: reliably renders on top of the game only in borderless
// windowed mode, not true exclusive fullscreen (a desktop-compositor
// limitation, not something fixable without touching the game's own render
// pipeline — which is exactly the injection risk this avoids).
const GAME_WINDOW_TITLE = 'ELDEN RING';

let popup: BrowserWindow | undefined;
let currentPopupHotkey: string = DEFAULT_SETTINGS.popupHotkey;
let currentContinuousMemoryHotkey: string = DEFAULT_SETTINGS.continuousMemoryHotkey;

function createPopup(): BrowserWindow {
  const win = new BrowserWindow({
    width: 950,
    height: 700,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.setAlwaysOnTop(true, 'screen-saver'); // stays above fullscreen/borderless game windows
  win.loadFile(path.join(__dirname, '../renderer/popup.html'));
  return win;
}

function togglePopup(): void {
  if (!popup) popup = createPopup();
  if (popup.isVisible()) {
    popup.hide();
  } else {
    popup.show();
    popup.focus();
  }
}

// Captures the game's window contents directly (not the whole screen) —
// this also means our own popup, which sits in front, never ends up in
// the captured image. Non-injecting: uses the OS compositor's own window
// capture, the same mechanism OBS's anti-cheat-safe "Window Capture"
// source uses, not a DirectX render-pipeline hook.
async function captureGameScreenshot(): Promise<string | null> {
  const sources = await desktopCapturer.getSources({
    types: ['window'],
    thumbnailSize: { width: 1920, height: 1080 },
  });
  const gameWindow = sources.find((s) => s.name === GAME_WINDOW_TITLE);
  if (!gameWindow) return null;
  return gameWindow.thumbnail.toJPEG(90).toString('base64');
}

// Rebinds one of Questbot's two global hotkeys. `globalShortcut.register`
// returns false (doesn't throw) on an OS-level conflict — on failure, the
// previous accelerator is re-registered so a rebind attempt never leaves
// Questbot with no working hotkey for that action.
function rebindHotkey(action: HotkeyAction, accelerator: string): { ok: boolean; reason?: string } {
  const isPopup = action === 'popup';
  const previous = isPopup ? currentPopupHotkey : currentContinuousMemoryHotkey;
  const handler = isPopup ? togglePopup : toggleContinuousMemory;

  globalShortcut.unregister(previous);
  const registered = globalShortcut.register(accelerator, handler);
  if (!registered) {
    globalShortcut.register(previous, handler);
    return { ok: false, reason: 'conflict' };
  }

  if (isPopup) currentPopupHotkey = accelerator;
  else currentContinuousMemoryHotkey = accelerator;
  updateSettings(isPopup ? { popupHotkey: accelerator } : { continuousMemoryHotkey: accelerator });
  return { ok: true };
}

app.whenReady().then(() => {
  const settingsFilePath = path.join(app.getPath('userData'), 'settings.json');
  const settings = initSettingsStore(settingsFilePath);
  setBufferDurationMinutes(settings.continuousMemoryBufferMinutes);
  currentPopupHotkey = settings.popupHotkey;
  currentContinuousMemoryHotkey = settings.continuousMemoryHotkey;

  setScreenshotCapturer(captureGameScreenshot);

  globalShortcut.register(currentPopupHotkey, togglePopup);
  // Opt-in continuous memory toggle (§5). Paywall enforcement deferred (no
  // billing decision yet) — open to everyone during dev/playtest.
  globalShortcut.register(currentContinuousMemoryHotkey, toggleContinuousMemory);

  ipcMain.handle('dismiss-popup', () => {
    popup?.hide();
  });

  // Single on-demand shot by default, or latest + sampled buffer frames
  // when continuous memory is active — see continuous-memory.ts.
  ipcMain.handle('capture-screenshot', (): Promise<string[]> => captureForQuestion());

  ipcMain.handle('get-settings', () => getSettings());
  ipcMain.handle('get-app-version', () => app.getVersion());
  ipcMain.handle('get-continuous-memory-state', () => isContinuousMemoryEnabled());

  ipcMain.handle('toggle-continuous-memory', () => {
    toggleContinuousMemory();
    return isContinuousMemoryEnabled();
  });

  ipcMain.handle('set-hotkey', (_event, action: HotkeyAction, accelerator: string) => rebindHotkey(action, accelerator));

  ipcMain.handle('set-buffer-minutes', (_event, minutes: number) => {
    const updated = updateSettings({ continuousMemoryBufferMinutes: minutes });
    setBufferDurationMinutes(updated.continuousMemoryBufferMinutes);
    return updated;
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  shutdownContinuousMemory();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

- [ ] **Step 2: Verify with typecheck**

Run (from `client/`): `npm run typecheck`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/main/index.ts
git commit -m "Load settings at startup and expose settings IPC handlers"
```

---

## Task 6: `preload.ts` IPC exposure

**Files:**
- Modify: `client/src/main/preload.ts`

**Interfaces:**
- Consumes: `QuestbotSettings`, `HotkeyAction` (type-only) from `settings-store.ts` (Task 3); the six IPC channel names from Task 5.
- Produces: `window.questbot.getSettings`, `.getAppVersion`, `.setHotkey`, `.setBufferMinutes`, `.toggleContinuousMemory`, `.getContinuousMemoryState` — consumed by Task 10 (`settings.ts`) via the `questbot.d.ts` declarations from Task 7.

- [ ] **Step 1: Replace `client/src/main/preload.ts` in full**

```ts
import { contextBridge, ipcRenderer } from 'electron';
import type { QuestbotSettings, HotkeyAction } from './settings-store.js';

contextBridge.exposeInMainWorld('questbot', {
  captureScreenshot: (): Promise<string[]> => ipcRenderer.invoke('capture-screenshot'),
  dismiss: (): Promise<void> => ipcRenderer.invoke('dismiss-popup'),
  getSettings: (): Promise<QuestbotSettings> => ipcRenderer.invoke('get-settings'),
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('get-app-version'),
  setHotkey: (action: HotkeyAction, accelerator: string): Promise<{ ok: boolean; reason?: string }> =>
    ipcRenderer.invoke('set-hotkey', action, accelerator),
  setBufferMinutes: (minutes: number): Promise<QuestbotSettings> => ipcRenderer.invoke('set-buffer-minutes', minutes),
  toggleContinuousMemory: (): Promise<boolean> => ipcRenderer.invoke('toggle-continuous-memory'),
  getContinuousMemoryState: (): Promise<boolean> => ipcRenderer.invoke('get-continuous-memory-state'),
});
```

- [ ] **Step 2: Verify with typecheck**

Run (from `client/`): `npm run typecheck`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/main/preload.ts
git commit -m "Expose settings IPC methods on window.questbot"
```

---

## Task 7: `questbot.d.ts` renderer types

**Files:**
- Modify: `client/src/renderer/questbot.d.ts`

**Interfaces:**
- Produces: renderer-visible `QuestbotSettings`, `HotkeyAction`, `HotkeyResult` types and the extended `Window.questbot` interface — consumed by Task 10 (`settings.ts`).

This duplicates (rather than imports) the shapes already defined in `client/src/main/settings-store.ts`, for the same reason `client/src/renderer/types.ts` duplicates the shared wire types: the renderer is a separately-emitted build target (`tsconfig.renderer.json`) and can't reach across into `src/main` without breaking its flat output.

- [ ] **Step 1: Replace `client/src/renderer/questbot.d.ts` in full**

```ts
// Mirrors client/src/main/settings-store.ts's QuestbotSettings/HotkeyAction.
// Duplicated (not imported) for the same reason as ./types.ts — the
// renderer is a separately-emitted build target and can't reach across
// into src/main without breaking its flat output.
interface QuestbotSettings {
  popupHotkey: string;
  continuousMemoryHotkey: string;
  continuousMemoryBufferMinutes: number;
}

type HotkeyAction = 'popup' | 'continuousMemory';

interface HotkeyResult {
  ok: boolean;
  reason?: string;
}

interface Window {
  questbot: {
    captureScreenshot(): Promise<string[]>;
    dismiss(): Promise<void>;
    getSettings(): Promise<QuestbotSettings>;
    getAppVersion(): Promise<string>;
    setHotkey(action: HotkeyAction, accelerator: string): Promise<HotkeyResult>;
    setBufferMinutes(minutes: number): Promise<QuestbotSettings>;
    toggleContinuousMemory(): Promise<boolean>;
    getContinuousMemoryState(): Promise<boolean>;
  };
}
```

- [ ] **Step 2: Verify with typecheck**

Run (from `client/`): `npm run typecheck`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/renderer/questbot.d.ts
git commit -m "Extend renderer window.questbot types for Settings"
```

---

## Task 8: `popup.html` markup

**Files:**
- Modify: `client/src/renderer/popup.html`

**Interfaces:**
- Produces: DOM elements consumed by Task 10 (`settings.ts`) — `#settings-toggle`, `#settings-close`, `#popup-hotkey-display`, `#continuous-memory-hotkey-display`, `#popup-hotkey-record`, `#continuous-memory-hotkey-record`, `#hotkey-error`, `#continuous-memory-toggle`, `#buffer-minutes`, `#buffer-minutes-value`, `#app-version`; and consumed by Task 9 (CSS) — `#chrome-bar`, `#settings-panel`, `.settings-section`, `.settings-row`, `.settings-label`, `.hotkey-display`, `.settings-error`, `#settings-header`, `#app-limitation-note`.

- [ ] **Step 1: Wrap the tab bar and add the gear icon**

Change:

```html
<div id="questbot">
  <div id="tabs">
    <button class="tab-button active" data-tab="ask">Ask</button>
    <button class="tab-button" data-tab="map">Map</button>
    <button class="tab-button" data-tab="shapes">Shape Editor</button>
  </div>
```

to:

```html
<div id="questbot">
  <div id="chrome-bar">
    <div id="tabs">
      <button class="tab-button active" data-tab="ask">Ask</button>
      <button class="tab-button" data-tab="map">Map</button>
      <button class="tab-button" data-tab="shapes">Shape Editor</button>
    </div>
    <button id="settings-toggle" type="button" title="Settings">⚙️</button>
  </div>

  <div id="settings-panel">
    <div id="settings-header">
      <h2>Settings</h2>
      <button id="settings-close" type="button" title="Close">✕</button>
    </div>

    <div class="settings-section">
      <h3>Hotkeys</h3>
      <div class="settings-row">
        <span class="settings-label">Summon popup</span>
        <span id="popup-hotkey-display" class="hotkey-display"></span>
        <button id="popup-hotkey-record" type="button">Record</button>
      </div>
      <div class="settings-row">
        <span class="settings-label">Toggle continuous memory</span>
        <span id="continuous-memory-hotkey-display" class="hotkey-display"></span>
        <button id="continuous-memory-hotkey-record" type="button">Record</button>
      </div>
      <p id="hotkey-error" class="settings-error" hidden></p>
    </div>

    <div class="settings-section">
      <h3>Continuous memory</h3>
      <div class="settings-row">
        <span class="settings-label">Status</span>
        <button id="continuous-memory-toggle" type="button"></button>
      </div>
      <div class="settings-row">
        <label for="buffer-minutes" class="settings-label">Buffer length: <span id="buffer-minutes-value"></span> min</label>
        <input id="buffer-minutes" type="range" min="5" max="10" step="1" />
      </div>
    </div>

    <div class="settings-section">
      <h3>App info</h3>
      <p id="app-version"></p>
      <p id="app-limitation-note">Renders reliably over borderless windowed mode; true exclusive fullscreen isn't supported (a desktop-compositor limitation).</p>
    </div>
  </div>
```

(The rest of `#questbot` — `#ask-panel`, `#map-panel`, `#shapes-panel` — is unchanged.)

- [ ] **Step 2: Add the new script tag**

Change:

```html
<script type="module" src="./popup.js"></script>
<script type="module" src="./map.js"></script>
<script type="module" src="./shapes.js"></script>
<script type="module" src="./tabs.js"></script>
```

to:

```html
<script type="module" src="./popup.js"></script>
<script type="module" src="./map.js"></script>
<script type="module" src="./shapes.js"></script>
<script type="module" src="./tabs.js"></script>
<script type="module" src="./settings.js"></script>
```

- [ ] **Step 3: Commit**

```bash
git add client/src/renderer/popup.html
git commit -m "Add Settings panel markup and gear-icon entry point"
```

(No automated check for this step — `popup.html` has no build-time validation in this project; Task 10's typecheck will catch any ID that `settings.ts` expects but this markup doesn't provide, since `document.getElementById(...)!` would compile fine either way but the app would throw at runtime, caught by Task 11's manual walkthrough.)

---

## Task 9: CSS

**Files:**
- Modify: `client/src/renderer/map.css`
- Modify: `client/src/renderer/popup.css`

**Interfaces:**
- Consumes: element IDs/classes from Task 8.
- Produces: nothing consumed by later tasks (leaf styling).

- [ ] **Step 1: Add chrome-bar and panel-switching rules to `map.css`**

In `client/src/renderer/map.css`, after the existing `.tab-button.active { ... }` block and before `.panel { ... }`, insert:

```css
#chrome-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

#settings-toggle {
  background: none;
  border: 1px solid #4a4234;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
}

#settings-toggle:hover {
  border-color: #c9a24b;
}
```

After the existing `.panel.active { display: flex; }` block and before `#map-panel { ... }`, insert:

```css
#settings-panel {
  display: none;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

#questbot.settings-open .panel {
  display: none;
}

#questbot.settings-open #settings-panel {
  display: flex;
}
```

- [ ] **Step 2: Add settings-content styles to `popup.css`**

At the end of `client/src/renderer/popup.css`, append:

```css
#settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#settings-header h2 {
  margin: 0;
  font-size: 15px;
}

#settings-close {
  background: none;
  border: 1px solid #4a4234;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 8px;
}

.settings-section {
  border: 1px solid #4a4234;
  border-radius: 6px;
  padding: 10px;
}

.settings-section h3 {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #b8ab90;
}

.settings-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 6px;
}

.settings-row:last-child {
  margin-bottom: 0;
}

.settings-label {
  flex: 1;
}

.hotkey-display {
  font-family: monospace;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #6b5d3f;
  border-radius: 4px;
  padding: 2px 8px;
}

.settings-row button {
  background: none;
  border: 1px solid #4a4234;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 10px;
}

#continuous-memory-toggle.active {
  border-color: #c9a24b;
  background: rgba(201, 162, 75, 0.15);
}

.settings-error {
  color: #c9724b;
  font-size: 12px;
  margin: 6px 0 0;
}

#buffer-minutes {
  accent-color: #c9a24b;
}

#app-version {
  margin: 0 0 4px;
  font-size: 12px;
}

#app-limitation-note {
  margin: 0;
  font-size: 11px;
  color: #7a705c;
}
```

- [ ] **Step 3: Commit**

```bash
git add client/src/renderer/map.css client/src/renderer/popup.css
git commit -m "Style the Settings panel and gear-icon entry point"
```

---

## Task 10: `settings.ts` renderer wiring

**Files:**
- Create: `client/src/renderer/settings.ts`

**Interfaces:**
- Consumes: `acceleratorFromEvent`, `isDuplicateHotkey` from `settings-logic.ts` (Task 4); `window.questbot.*` from `questbot.d.ts`/`preload.ts` (Tasks 6–7); DOM IDs from `popup.html` (Task 8).
- Produces: nothing consumed by later tasks — this is the final orchestration layer.

- [ ] **Step 1: Create `client/src/renderer/settings.ts`**

```ts
import { acceleratorFromEvent, isDuplicateHotkey } from './settings-logic.js';

type HotkeyAction = 'popup' | 'continuousMemory';

const questbotEl = document.getElementById('questbot')!;
const settingsToggle = document.getElementById('settings-toggle') as HTMLButtonElement;
const settingsClose = document.getElementById('settings-close') as HTMLButtonElement;
const popupHotkeyDisplay = document.getElementById('popup-hotkey-display')!;
const continuousMemoryHotkeyDisplay = document.getElementById('continuous-memory-hotkey-display')!;
const popupHotkeyRecord = document.getElementById('popup-hotkey-record') as HTMLButtonElement;
const continuousMemoryHotkeyRecord = document.getElementById('continuous-memory-hotkey-record') as HTMLButtonElement;
const hotkeyError = document.getElementById('hotkey-error')!;
const continuousMemoryToggle = document.getElementById('continuous-memory-toggle') as HTMLButtonElement;
const bufferMinutesInput = document.getElementById('buffer-minutes') as HTMLInputElement;
const bufferMinutesValue = document.getElementById('buffer-minutes-value')!;
const appVersionEl = document.getElementById('app-version')!;

let currentSettings: { popupHotkey: string; continuousMemoryHotkey: string; continuousMemoryBufferMinutes: number } | undefined;
let recordingAction: HotkeyAction | null = null;

function updateContinuousMemoryToggleLabel(running: boolean): void {
  continuousMemoryToggle.textContent = running ? 'On — click to turn off' : 'Off — click to turn on';
  continuousMemoryToggle.classList.toggle('active', running);
}

function cancelRecording(): void {
  recordingAction = null;
  popupHotkeyRecord.textContent = 'Record';
  continuousMemoryHotkeyRecord.textContent = 'Record';
}

async function openSettings(): Promise<void> {
  questbotEl.classList.add('settings-open');
  currentSettings = await window.questbot.getSettings();
  popupHotkeyDisplay.textContent = currentSettings.popupHotkey;
  continuousMemoryHotkeyDisplay.textContent = currentSettings.continuousMemoryHotkey;
  bufferMinutesInput.value = String(currentSettings.continuousMemoryBufferMinutes);
  bufferMinutesValue.textContent = String(currentSettings.continuousMemoryBufferMinutes);
  hotkeyError.hidden = true;
  updateContinuousMemoryToggleLabel(await window.questbot.getContinuousMemoryState());
}

function closeSettings(): void {
  questbotEl.classList.remove('settings-open');
  cancelRecording();
}

settingsToggle.addEventListener('click', () => {
  if (questbotEl.classList.contains('settings-open')) closeSettings();
  else void openSettings();
});
settingsClose.addEventListener('click', closeSettings);

continuousMemoryToggle.addEventListener('click', async () => {
  updateContinuousMemoryToggleLabel(await window.questbot.toggleContinuousMemory());
});

bufferMinutesInput.addEventListener('change', async () => {
  const minutes = Number(bufferMinutesInput.value);
  bufferMinutesValue.textContent = String(minutes);
  const updated = await window.questbot.setBufferMinutes(minutes);
  if (currentSettings) currentSettings.continuousMemoryBufferMinutes = updated.continuousMemoryBufferMinutes;
});

function startRecording(action: HotkeyAction, button: HTMLButtonElement): void {
  recordingAction = action;
  button.textContent = 'Press keys… (Esc to cancel)';
  hotkeyError.hidden = true;
}

popupHotkeyRecord.addEventListener('click', () => startRecording('popup', popupHotkeyRecord));
continuousMemoryHotkeyRecord.addEventListener('click', () => startRecording('continuousMemory', continuousMemoryHotkeyRecord));

document.addEventListener('keydown', async (e) => {
  if (!recordingAction || !currentSettings) return;
  e.preventDefault();

  if (e.key === 'Escape') {
    cancelRecording();
    return;
  }

  const accelerator = acceleratorFromEvent(e);
  if (!accelerator) return; // still waiting on a non-modifier key

  const action = recordingAction;
  const otherHotkey = action === 'popup' ? currentSettings.continuousMemoryHotkey : currentSettings.popupHotkey;
  if (isDuplicateHotkey(accelerator, otherHotkey)) {
    hotkeyError.textContent = `That combo is already used by the ${action === 'popup' ? 'continuous-memory toggle' : 'popup'} hotkey.`;
    hotkeyError.hidden = false;
    cancelRecording();
    return;
  }

  cancelRecording();
  const result = await window.questbot.setHotkey(action, accelerator);
  if (!result.ok) {
    hotkeyError.textContent = 'That combo is already used by another app or Windows itself.';
    hotkeyError.hidden = false;
    return;
  }

  hotkeyError.hidden = true;
  if (action === 'popup') {
    currentSettings.popupHotkey = accelerator;
    popupHotkeyDisplay.textContent = accelerator;
  } else {
    currentSettings.continuousMemoryHotkey = accelerator;
    continuousMemoryHotkeyDisplay.textContent = accelerator;
  }
});

void window.questbot.getAppVersion().then((version) => {
  appVersionEl.textContent = `Questbot v${version}`;
});
```

- [ ] **Step 2: Verify with typecheck and build**

Run (from `client/`): `npm run typecheck`

Expected: no errors.

Run (from `client/`): `npm run build`

Expected: no errors; `dist/renderer/settings.js` is emitted.

- [ ] **Step 3: Run the full test suite one more time**

Run (from `client/`): `npm test`

Expected: PASS — 13 tests total, 0 failures (unchanged from Task 4 — this task adds no new automated tests, per the existing project convention that DOM-orchestration files like `popup.ts`/`map.ts`/`tabs.ts`/`shapes.ts` aren't unit-tested; their logic-bearing pieces are extracted into tested pure modules instead, which is what Tasks 1–4 did).

- [ ] **Step 4: Commit**

```bash
git add client/src/renderer/settings.ts
git commit -m "Wire up the Settings panel: hotkey rebinding, buffer control, app info"
```

---

## Task 11: Manual Electron verification

**Files:** none (verification only).

**Interfaces:** none.

This is the closing task from the spec's Testing section — main-process + native `globalShortcut` behavior can't be exercised through `node:test` or the browser-artifact trick used for the Map feature. Each step below is self-contained (build → interact → observe) to avoid the previously-encountered issue where the popup's 30-second auto-dismiss races multi-call automation.

- [ ] **Step 1: Build and launch**

Run (from `client/`): `npm run build`

Expected: no errors.

Run (from `client/`): `npm start`

Expected: Electron launches with no console errors. Press `Control+Q` — the popup appears. Press `Control+Q` again — it hides.

- [ ] **Step 2: Open Settings and confirm default state**

With the popup open, click the gear icon (⚙️) in the top-right of the chrome bar.

Expected: the Settings panel replaces the active tab's content. "Summon popup" shows `Control+Q`; "Toggle continuous memory" shows `Control+Shift+Q`; the buffer slider is at `10`; the continuous-memory status button reads "Off — click to turn on"; the App info section shows a version string matching `client/package.json`'s `"version": "0.1.0"`.

- [ ] **Step 3: Rebind the popup hotkey successfully**

Click "Record" next to "Summon popup", then press `Alt+Shift+Q`.

Expected: the display updates to `Alt+Shift+Q`, no error shown. Close the popup (click the gear again, or switch tabs then hide via the old `Control+Q` — it should no longer work). Press `Alt+Shift+Q` — the popup toggles. Press `Control+Q` — nothing happens (old hotkey no longer registered).

- [ ] **Step 4: Reject a duplicate hotkey**

Reopen Settings. Click "Record" next to "Toggle continuous memory", then press `Alt+Shift+Q` (the popup hotkey from Step 3).

Expected: an inline error appears ("That combo is already used by the popup hotkey."), the continuous-memory hotkey display is unchanged (`Control+Shift+Q`), and pressing `Control+Shift+Q` afterward still toggles continuous memory normally.

- [ ] **Step 5: Confirm OS-level conflict rollback**

Click "Record" next to "Toggle continuous memory" again, then press a combo already reserved by Windows itself (e.g. `Control+Alt+Delete` is unregistrable — pick any combo your OS blocks, or temporarily bind another running application to a combo like `Control+Shift+F1` and attempt to reuse it here).

Expected: an inline error appears ("That combo is already used by another app or Windows itself."), and `Control+Shift+Q` still works afterward (rolled back, not left unbound).

- [ ] **Step 6: Confirm the buffer duration takes effect live**

In Settings, drag the buffer-length slider to `5`. Click the continuous-memory status button to turn it on (or use its hotkey). Wait roughly 5–6 minutes with the game window focused, then ask a question in the Ask tab.

Expected: no crash; the request completes. (Precisely confirming the trim boundary requires either waiting the full window or temporarily lowering `SAMPLE_INTERVAL_MS`/reading `getBufferDurationMs()` via a debugger — the key pass/fail signal here is that the app doesn't error and the slider's value round-trips, per Step 7.)

- [ ] **Step 7: Confirm persistence across restart**

With the popup hotkey rebound to `Alt+Shift+Q` and the buffer slider at `5` (from Steps 3 and 6), fully quit the app (not just hide the popup) and run `npm start` again.

Expected: `Alt+Shift+Q` (not `Control+Q`) summons the popup. Opening Settings shows the buffer slider still at `5` and "Toggle continuous memory" still showing `Control+Shift+Q` (unchanged, since Step 5's attempted rebind failed and rolled back). Inspect `%APPDATA%/Questbot/settings.json` (Windows userData path) directly and confirm its contents match what's displayed.

- [ ] **Step 8: Record the outcome**

If every expectation above held, the feature is complete — no further action needed. If any step didn't match, note which one and revisit the corresponding task above before considering this plan done.
