# Settings Panel — Design

## Context

This is the first of four planned player-facing UX features beyond the locked
V1 brief (`CLAUDE.md`), in this order: **Settings** → Favorites → History →
Onboarding. Settings comes first because the other three will want a place
to hang controls, and because two pieces of behavior are already hardcoded
and worth making configurable:

- The popup-summon hotkey (`Control+Q`) and continuous-memory toggle hotkey
  (`Control+Shift+Q`), registered in `client/src/main/index.ts`.
- The continuous-memory buffer duration (`BUFFER_DURATION_MS`, currently a
  fixed 10 minutes) and the buffer's on/off state, in
  `client/src/main/continuous-memory.ts`.

Not in scope for this spec: an account/tier section. The client doesn't
currently send `x-user-tier` at all (every request is treated as free tier
per `server/src/tiers.ts`), and there's no real billing system to back a
tier display — a placeholder would be more confusing than useful. This gets
revisited once billing is designed.

## Entry point

A gear icon in the popup chrome (not a tab in the existing Ask / Map / Shape
Editor bar) opens the Settings view, reusing the show/hide panel mechanism
already used for tab switching.

## Architecture

**New main-process module** — `client/src/main/settings-store.ts`:
- Owns a hand-rolled JSON file at `app.getPath('userData')/settings.json`.
- Loads synchronously at startup (before `globalShortcut.register` calls),
  writing out defaults if the file is missing or fails to parse.
- Exposes `getSettings()` / `updateSettings(partial)`, backed by an
  in-memory cache so reads never hit disk.
- No new dependency — the persisted shape is a handful of primitive fields,
  well within what direct `fs` read/write can handle. Pulling in
  `electron-store` was considered and rejected: newer major versions are
  ESM-only, which fights this project's CJS main-process build.

**IPC surface** (preload → main), added to the existing
`contextBridge.exposeInMainWorld('questbot', ...)` object:
- `getSettings()` — returns the current persisted settings.
- `setHotkey(action: 'popup' | 'continuousMemory', accelerator: string)` —
  attempts to rebind, returns `{ ok: true } | { ok: false, reason: string }`.
- `setBufferMinutes(minutes: number)` — updates the live buffer duration and
  persists it.
- `toggleContinuousMemory()` — reuses the existing toggle used by the
  hotkey; also callable from the Settings UI.
- `getContinuousMemoryState()` — returns whether the buffer is currently
  running, so the Settings UI can reflect it when opened.

**New renderer module** — `client/src/renderer/settings.ts`, plus a
`#settings-panel` section in `popup.html` and matching styles. Follows the
same structural pattern as the existing tab panels.

## Data model

```ts
interface QuestbotSettings {
  popupHotkey: string;                    // Electron accelerator, default 'Control+Q'
  continuousMemoryHotkey: string;         // default 'Control+Shift+Q'
  continuousMemoryBufferMinutes: number;  // 5–10, default 10
}
```

The continuous-memory on/off state is deliberately **not** persisted here —
it stays the same pure runtime state it is today (started/stopped via
hotkey or, now, via a Settings button). Persisting a "default on at launch"
flag was considered and dropped as unrequested scope (YAGNI) — nothing in
this feature calls for the buffer to auto-start.

`BUFFER_DURATION_MS` in `continuous-memory.ts` changes from a fixed
constant to a mutable value seeded from settings at startup. Because the
buffer-trim filter (`now - f.capturedAt <= BUFFER_DURATION_MS`) already
re-evaluates on every sample tick, changing this value takes effect
immediately — no restart required.

## Data flow

1. **Startup**: main process loads `settings.json` (writing defaults if
   absent/corrupt) *before* registering hotkeys, so `globalShortcut.register`
   uses the persisted accelerator strings instead of literals.
2. **Rebind a hotkey**: user clicks "Record" next to a hotkey row → renderer
   listens for the next keydown combo, requiring at least one modifier key
   → sends the captured accelerator to main via `setHotkey`. Pressing
   `Escape` alone cancels recording and leaves the existing hotkey
   untouched (no IPC call made).
   - Main first checks it doesn't match Questbot's *other* hotkey (reject
     client-side, no need to touch `globalShortcut` for this case).
   - Main unregisters the old accelerator, attempts to register the new one.
     `globalShortcut.register` returns `false` (does not throw) on an
     OS-level conflict — on failure, main re-registers the old accelerator
     as a safe fallback and returns `{ ok: false, reason: 'conflict' }`.
   - On success, the new accelerator is persisted immediately and returned
     as `{ ok: true }`.
   - Renderer shows an inline error and reverts the displayed hotkey on
     `ok: false`; on success, updates the displayed hotkey and clears any
     error state.
3. **Adjust buffer duration**: a slider (5–10 minutes, integer steps). On
   change, renderer calls `setBufferMinutes`; main updates the in-memory
   duration and persists it.
4. **Toggle continuous memory**: Settings panel queries
   `getContinuousMemoryState()` each time it's opened (not live-subscribed —
   if the state changes elsewhere, e.g. via hotkey, while Settings happens
   to be open, the displayed toggle can go stale until next open/close).
   This is a deliberate scope simplification; a live-subscribed toggle
   would need a push channel from main to renderer that nothing else in
   this app currently uses.
5. **App info**: static display of `app.getVersion()` and a short note
   about the borderless-window-only limitation (already documented in
   `client/src/main/index.ts`). No backend health-check/connectivity
   polling — considered and cut as unrequested scope.

## Error handling

- **Corrupt or missing settings file**: never blocks startup. Falls back to
  hardcoded defaults in memory and attempts to overwrite the file with a
  clean, valid one.
- **Settings file write failure** (disk full, permissions): caught and
  logged. The in-memory value still updates for the current session
  (best-effort), so the UI doesn't appear broken, but the change may not
  survive a restart. Not worth blocking the UI over.
- **Hotkey conflicts**: handled as described in Data Flow step 2 — always
  leaves a working hotkey registered, never silently drops both.

## Testing

- `npm run typecheck` and `npm run build` in the `client` workspace, as with
  every prior change to this codebase.
- Manual verification in the actual Electron app (this feature is
  main-process + native `globalShortcut` behavior, which can't be exercised
  through the browser-artifact testing trick used for the Map feature).
  Each verification step should be a single self-contained script
  (summon → interact → observe) to avoid the previously-encountered issue
  where the popup's 30-second auto-dismiss races multi-call automation:
  - Rebind each hotkey successfully; confirm the new combo summons/toggles
    as expected and the old one no longer does.
  - Attempt to rebind one hotkey to match the other; confirm client-side
    rejection with no change to either registration.
  - Simulate/force an OS-level conflict (e.g. bind to a combo already
    reserved) and confirm graceful fallback to the previous accelerator.
  - Move the buffer duration slider and confirm (via the buffer's own
    trimming behavior) that the new duration takes effect without an app
    restart.
  - Restart the app and confirm both rebound hotkeys and the buffer
    duration persisted from `settings.json`.
