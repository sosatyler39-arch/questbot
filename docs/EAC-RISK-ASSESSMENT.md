# EAC compatibility risk assessment (FEATURE_ADDENDUM §A2)

Date: 2026-07-20. Re-opened by the addendum after the Overwolf→Electron move:
Overwolf apps ride on Overwolf's vendor-allowlist relationships with
anti-cheat companies; a bespoke Electron overlay has no such standing, so
this assessment starts from zero rather than assuming the old check carried
over.

## What Questbot actually does, mechanically

| Behavior | Mechanism | Touches game process? |
|---|---|---|
| Overlay rendering | Separate always-on-top transparent `BrowserWindow` | No — composited by Windows, like any other window above the game |
| Screenshot capture | Electron `desktopCapturer` window capture (OS compositor) | No — same mechanism as OBS "Window Capture" |
| Hotkeys | Electron `globalShortcut` (OS-level hotkey registration) | No — receives the keypress from the OS, does not read game input |
| Game-state context | Vision model over the captured screenshot, server-side | No — explicit brief §6 constraint: no game-memory reading, ever |

Nothing injects, hooks, patches, reads, or writes the Elden Ring process.
There is no DLL in the game's address space and no handle opened on it
beyond what the OS compositor itself uses for window capture.

## What the sources say

- **EAC's detection surface is the game process and its memory.** Elden
  Ring's EULA describes EAC as monitoring hardware, analyzing game binaries,
  and scanning game memory ([ResetEra summary of the Steam EULA](https://www.resetera.com/threads/elden-ring-will-use-easy-anti-cheat-eac-third-party-software-to-curb-cheating-on-pc-according-its-recently-published-eula-on-its-steam-page.546251/)).
- **The injection/no-injection line is the one that matters in practice.**
  OBS's own guidance for EAC-protected games is that *Game Capture* (which
  injects a hook DLL) gets blocked by EAC, and the documented safe fallback
  is *Window Capture*, "which doesn't require hooking and doesn't need to
  inject into the process, so there are no anti-cheat issues"
  ([OBS forum guidance](https://obsproject.com/forum/threads/black-screen-game-capture-easyanticheat.113475/),
  [capture-method comparison](https://obs-versions.com/blog/obs-screen-recording-vs-game-capture)).
  Questbot's capture path is the Window Capture equivalent.
- **Documented Elden Ring ban causes are process/save tampering, not
  external windows.** Community-documented bans trace to: mods/DLLs placed
  in the game folder (a Seamless Co-op misinstall — the mod itself disables
  EAC precisely because it hooks the game:
  [Steam discussion](https://steamcommunity.com/app/1245620/discussions/0/4511002214534881824/),
  [Seamless Co-op FAQ](https://ersc-docs.github.io/faq/)), debug/cheat
  tools that attach to the process
  ([Elden Ring Debug Tool README warns bans](https://github.com/Nordgaren/Elden-Ring-Debug-Tool)),
  and FromSoftware's own **server-side** detection of impossible items/stats
  — which operates on game-state data and is indifferent to what windows
  are open on the player's desktop.
- No case was found of a ban attributed to a non-injecting external window,
  screen-capture software, or an OS-level global hotkey. Streamers run
  OBS window-capture over EAC-protected games routinely.

## Assessment

**Risk of EAC action against Questbot's current architecture: low.** The
app sits entirely outside EAC's documented and observed detection surface.
The architecture decision that moved us off `ow-electron` (which *does*
inject for DX12 capture) was made precisely to get on the right side of
this line, and the sources bear that reasoning out.

**Residual risks, honestly stated:**

1. **No allowlist standing.** Low risk is not zero risk; EAC could in
   principle flag heuristically. Nothing found suggests it does so for
   non-injecting windows, but absence of evidence is the ceiling of what
   desk research can establish.
2. **False-positive adjacency.** If a player also runs injecting tools, a
   ban would be attributed ambiguously. Docs/onboarding should be explicit
   that Questbot never touches the game process, so support conversations
   start from the right place.
3. **ToS vs. detection.** This assessment covers detection/ban mechanics.
   FromSoftware's EULA language about third-party programs is broad, as
   most EULAs are; enforcement observed in the wild targets the categories
   above. A conservative reading is a business-risk judgment call, noted
   here rather than hand-waved.

## What still requires a live test (cannot be verified in this environment)

- Overlay actually renders above Elden Ring in borderless windowed mode on
  a machine running the real game with EAC active.
- `desktopCapturer` finds the real game window (title assumed
  `"ELDEN RING"` — unverified against the actual window).
- A sustained online/co-op session with Questbot running produces no EAC
  kick/flag. This is the true go/no-go and needs a real machine, the real
  game, and a throwaway-tolerant account. **Beta gate: do this before
  inviting anyone external.**
