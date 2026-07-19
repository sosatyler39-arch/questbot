import { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } from 'electron';
import path from 'node:path';
import {
  setScreenshotCapturer,
  toggleContinuousMemory,
  captureForQuestion,
  shutdownContinuousMemory,
} from './continuous-memory.js';

// Non-injecting overlay: a separate always-on-top desktop window, not code
// injected into the game process. Deliberate choice over an Overwolf/DX-hook
// approach — see README "Client architecture" for why. Real limitation that
// comes with it: reliably renders on top of the game only in borderless
// windowed mode, not true exclusive fullscreen (a desktop-compositor
// limitation, not something fixable without touching the game's own render
// pipeline — which is exactly the injection risk this avoids).
const GAME_WINDOW_TITLE = 'ELDEN RING';

let popup: BrowserWindow | undefined;

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

app.whenReady().then(() => {
  setScreenshotCapturer(captureGameScreenshot);

  globalShortcut.register('Control+Q', togglePopup);
  // Opt-in continuous memory toggle (§5). Paywall enforcement deferred (no
  // billing decision yet) — open to everyone during dev/playtest.
  globalShortcut.register('Control+Shift+Q', toggleContinuousMemory);

  ipcMain.handle('dismiss-popup', () => {
    popup?.hide();
  });

  // Single on-demand shot by default, or latest + sampled buffer frames
  // when continuous memory is active — see continuous-memory.ts.
  ipcMain.handle('capture-screenshot', (): Promise<string[]> => captureForQuestion());
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  shutdownContinuousMemory();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
