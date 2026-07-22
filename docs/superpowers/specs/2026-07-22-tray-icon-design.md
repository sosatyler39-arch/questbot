# System Tray Icon — Design

## Context

First of the four work items requested this session (visible overlay indicator,
DB backup, Weapons/Armor content, Gemini provider decision) — see this
session's brainstorm log for how these were decomposed. The other three are
either already done (backup, Gemini paid-tier switch) or queued next
(Weapons/Armor).

The player's original ask was "make an indicator so people know when the
overlay is open," assuming it would show in the taskbar. It doesn't, and
that's deliberate: `client/src/main/index.ts`'s popup window is created with
`skipTaskbar: true`, `frame: false`, `transparent: true` — a fleeting,
hotkey-summoned overlay, not a persistent taskbar app (same reasoning as
Discord/Steam overlays). Clarified with the player: what's actually missing
is any indication **QuestBot is running in the background at all** — there's
no taskbar entry and no system tray icon, so when the popup is hidden there's
currently zero way to tell the app is alive and the hotkey is armed. The
"popup itself has a visual treatment while open" interpretation was
explicitly not chosen (it's not a real problem — the popup is already
visibly on screen when summoned).

## Icon asset

No image-generation library is available in this project (checked: no
`sharp`, `canvas`, `pngjs`, or similar in `node_modules`). Electron's
`nativeImage.createFromBitmap()` was considered and rejected — its pixel
byte order is officially documented as "platform-dependent" with no further
specifics, too unreliable to hand-code against.

Instead: a one-time generator script (not part of the runtime app) hand-
assembles a minimal valid PNG using Node's built-in `zlib.deflateSync` for
the compressed image data, plus manually-computed CRC32 chunk checksums —
the PNG spec itself is public and stable, unlike Electron's raw-bitmap
format. The script draws a simple 16×16 gold ring (an original shape,
`#c9a24b` on a transparent background, matching the app's existing color
palette) — not a reproduction of any Elden Ring game asset. The generated
file is committed as a real asset at `client/assets/tray-icon.png`, so the
runtime code is just `nativeImage.createFromPath(...)`, not a regeneration
on every launch. The generator script itself is disposable — run once,
delete after, same convention as this session's other one-off scripts.

## Tray behavior

- `Tray` instance created once in `app.whenReady()`, alongside the existing
  hotkey registration — lives for the app's full lifetime, never destroyed
  until the app quits.
- Tooltip text: `Questbot — press ${currentPopupHotkey} to summon`, reading
  from the same `currentPopupHotkey` value already tracked in
  `main/index.ts` (the Settings panel shows the bare hotkey string alone;
  this tooltip wraps it in a short sentence, not an exact format match).
  Updated whenever the hotkey is rebound, same trigger point that already
  updates `currentPopupHotkey` today.
- Left-click: calls the existing `togglePopup()` — identical behavior to
  the hotkey itself, no new show/hide logic to write.
- Right-click context menu (`Menu.buildFromTemplate`): two items,
  "Show/Hide Questbot" (same `togglePopup()` call) and "Quit Questbot"
  (`app.quit()`).

## Non-goals

- **No dynamic icon state** — the icon doesn't change appearance when the
  popup opens/closes. The player explicitly chose "show it's running in the
  background" over "show the popup is currently open" when asked; a static
  icon fully answers the chosen question. Revisit only if asked for later.
- **No macOS/dock handling** — this project targets Windows only (per the
  brief and this whole session's environment); no `app.dock` considerations.
- **No new npm dependency** — the whole point of the hand-rolled PNG
  approach is avoiding one for a single 16×16 static image.

## Fixed alongside this: quitting the app

Found during design, not a separate ask: there is currently **no way to
quit QuestBot at all** short of Task Manager. The popup is only ever
`hide()`-den (`togglePopup()`), never `close()`-d, so `window-all-closed`
(the handler that currently calls `app.quit()`) never fires in normal use.
A tray icon without a quit option would leave this real gap in place, so
"Quit Questbot" is included as part of this same design rather than
deferred.
