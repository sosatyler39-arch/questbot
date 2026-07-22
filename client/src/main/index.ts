import { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer, shell, Tray, Menu, nativeImage } from 'electron';
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
import { startDiscordSignIn, getStoredToken, storeToken, clearStoredToken } from './auth.js';

// Non-injecting overlay: a separate always-on-top desktop window, not code
// injected into the game process. Deliberate choice over an Overwolf/DX-hook
// approach — see README "Client architecture" for why. Real limitation that
// comes with it: reliably renders on top of the game only in borderless
// windowed mode, not true exclusive fullscreen (a desktop-compositor
// limitation, not something fixable without touching the game's own render
// pipeline — which is exactly the injection risk this avoids).
const GAME_WINDOW_TITLE = 'ELDEN RING';
// Local dev backend; also duplicated in renderer/api.ts (separate build
// target). Becomes a real config value at deploy time.
const BACKEND_URL = 'http://localhost:8787';

let popup: BrowserWindow | undefined;
let currentPopupHotkey: string = DEFAULT_SETTINGS.popupHotkey;
let currentContinuousMemoryHotkey: string = DEFAULT_SETTINGS.continuousMemoryHotkey;
let trayIcon: Tray | undefined;

// "Questbot — press Control+Q to summon" — reflects whatever the current
// popup hotkey actually is, kept in sync by rebindHotkey() below.
function updateTrayTooltip(): void {
  trayIcon?.setToolTip(`Questbot — press ${currentPopupHotkey} to summon`);
}

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

// §B5 consent gate: continuous memory can never start — from the hotkey OR
// the Settings UI, both of which route through here — until the player has
// explicitly acknowledged the buffering explanation in onboarding. The
// brief's "no silent buffering" rule as an enforced gate, not a tutorial.
function guardedToggleContinuousMemory(): void {
  if (!getSettings().continuousMemoryConsent) return;
  toggleContinuousMemory();
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
  const other = isPopup ? currentContinuousMemoryHotkey : currentPopupHotkey;
  const handler = isPopup ? togglePopup : guardedToggleContinuousMemory;

  // Reject up front if this would collide with Questbot's other hotkey —
  // globalShortcut.register doesn't return false for an accelerator this
  // same process already owns, it just silently reassigns the callback,
  // which would leave the other action's hotkey dead with no signal.
  if (accelerator.toLowerCase() === other.toLowerCase()) {
    return { ok: false, reason: 'duplicate' };
  }

  globalShortcut.unregister(previous);
  let registered: boolean;
  try {
    registered = globalShortcut.register(accelerator, handler);
  } catch {
    // Malformed accelerator string — register() can throw synchronously
    // instead of returning false. Treat exactly like a registration
    // failure so the rollback below still runs.
    registered = false;
  }
  if (!registered) {
    globalShortcut.register(previous, handler);
    return { ok: false, reason: 'conflict' };
  }

  if (isPopup) {
    currentPopupHotkey = accelerator;
    updateTrayTooltip();
  } else {
    currentContinuousMemoryHotkey = accelerator;
  }
  updateSettings(isPopup ? { popupHotkey: accelerator } : { continuousMemoryHotkey: accelerator });
  return { ok: true };
}

app.whenReady().then(() => {
  const settingsFilePath = path.join(app.getPath('userData'), 'settings.json');
  const settings = initSettingsStore(settingsFilePath);
  setBufferDurationMinutes(settings.continuousMemoryBufferMinutes);
  currentPopupHotkey = settings.popupHotkey;
  currentContinuousMemoryHotkey = settings.continuousMemoryHotkey;

  // Defensive guard against an externally-inconsistent settings file (hand-
  // edited, or written by something other than rebindHotkey, which already
  // prevents this via its own duplicate check): if both hotkeys somehow
  // match, fall the continuous-memory one back to its default so startup
  // never silently drops the popup hotkey.
  if (currentContinuousMemoryHotkey.toLowerCase() === currentPopupHotkey.toLowerCase()) {
    currentContinuousMemoryHotkey = DEFAULT_SETTINGS.continuousMemoryHotkey;
    updateSettings({ continuousMemoryHotkey: currentContinuousMemoryHotkey });
  }

  setScreenshotCapturer(captureGameScreenshot);

  globalShortcut.register(currentPopupHotkey, togglePopup);
  // Opt-in continuous memory toggle (§5). Paywall enforcement deferred (no
  // billing decision yet) — open to everyone during dev/playtest.
  globalShortcut.register(currentContinuousMemoryHotkey, guardedToggleContinuousMemory);

  // System tray icon: the popup itself is deliberately skipTaskbar (a
  // fleeting overlay, not a persistent taskbar app — see createPopup()),
  // which means there was previously no way at all to tell Questbot is
  // running when the popup is hidden, or to quit it short of Task Manager.
  trayIcon = new Tray(nativeImage.createFromPath(path.join(__dirname, '../assets/tray-icon.png')));
  updateTrayTooltip();
  trayIcon.on('click', togglePopup);
  trayIcon.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Show/Hide Questbot', click: togglePopup },
      { label: 'Quit Questbot', click: () => app.quit() },
    ]),
  );

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
    guardedToggleContinuousMemory();
    return isContinuousMemoryEnabled();
  });

  ipcMain.handle('grant-continuous-memory-consent', () => updateSettings({ continuousMemoryConsent: true }));
  ipcMain.handle('set-onboarding-seen', () => updateSettings({ onboardingSeen: true }));

  ipcMain.handle('set-hotkey', (_event, action: HotkeyAction, accelerator: string) => rebindHotkey(action, accelerator));

  ipcMain.handle('set-buffer-minutes', (_event, minutes: number) => {
    const updated = updateSettings({ continuousMemoryBufferMinutes: minutes });
    setBufferDurationMinutes(updated.continuousMemoryBufferMinutes);
    return updated;
  });

  ipcMain.handle('set-auto-dismiss-seconds', (_event, seconds: number) => updateSettings({ autoDismissSeconds: seconds }));

  ipcMain.handle('sign-in', async () => {
    const token = await startDiscordSignIn(BACKEND_URL);
    storeToken(token);
    return true;
  });
  ipcMain.handle('sign-out', () => {
    clearStoredToken();
  });
  ipcMain.handle('get-auth-token', () => getStoredToken());

  // /billing/checkout requires the Bearer token and answers with a 302 to
  // Stripe Checkout — a plain browser navigation can't send the header, so
  // main fetches the redirect target itself and opens it externally.
  ipcMain.handle('start-upgrade', async () => {
    const token = getStoredToken();
    if (!token) return false;
    const res = await fetch(`${BACKEND_URL}/billing/checkout`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      redirect: 'manual',
    });
    const url = res.headers.get('location');
    if (!url) return false;
    void shell.openExternal(url);
    return true;
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  shutdownContinuousMemory();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
