import { BrowserWindow, desktopCapturer, screen } from 'electron';
import path from 'node:path';

// §5 of the brief: opt-in rolling local buffer, last 5-10 minutes, sampled
// every few seconds (not every frame). Buffer never leaves the device until
// a question is asked. Paywall enforcement is deferred (no billing decision
// yet — see project memory) — the toggle is open to everyone for now.
const SAMPLE_INTERVAL_MS = 5_000;
const BUFFER_DURATION_MS = 10 * 60 * 1000;
const MAX_FRAMES_SENT = 4; // latest + up to 3 sampled, per the brief

interface BufferedFrame {
  capturedAt: number;
  image: string;
}

let buffer: BufferedFrame[] = [];
let sampleTimer: ReturnType<typeof setInterval> | undefined;
let indicator: BrowserWindow | undefined;
let captureFn: () => Promise<string | null> = async () => null;

export function setScreenshotCapturer(fn: () => Promise<string | null>): void {
  captureFn = fn;
}

export function isContinuousMemoryEnabled(): boolean {
  return sampleTimer !== undefined;
}

export function toggleContinuousMemory(): void {
  if (isContinuousMemoryEnabled()) {
    stopContinuousMemory();
  } else {
    startContinuousMemory();
  }
}

function startContinuousMemory(): void {
  buffer = [];
  sampleTimer = setInterval(async () => {
    const image = await captureFn();
    if (!image) return;
    const now = Date.now();
    buffer.push({ capturedAt: now, image });
    buffer = buffer.filter((f) => now - f.capturedAt <= BUFFER_DURATION_MS);
  }, SAMPLE_INTERVAL_MS);
  showIndicator();
}

function stopContinuousMemory(): void {
  clearInterval(sampleTimer);
  sampleTimer = undefined;
  buffer = [];
  hideIndicator();
}

// Latest fresh capture + up to 3 sampled buffer frames (brief §5), spread
// across the buffered window rather than the last few seconds — the point
// is context from the last 5-10 minutes, not a near-duplicate of "latest".
// Falls back to a single on-demand shot when continuous memory is off.
export async function captureForQuestion(): Promise<string[]> {
  if (!isContinuousMemoryEnabled()) {
    const shot = await captureFn();
    return shot ? [shot] : [];
  }
  const latest = await captureFn();
  const sampleCount = Math.min(MAX_FRAMES_SENT - 1, buffer.length);
  const sampled = Array.from({ length: sampleCount }, (_, i) => {
    const idx = Math.floor(((i + 1) / (sampleCount + 1)) * buffer.length);
    return buffer[Math.min(idx, buffer.length - 1)].image;
  });
  return [latest, ...sampled].filter((img): img is string => img !== null);
}

// Non-negotiable per the brief: silent buffering is a trust problem. A tiny
// always-on-top, click-through dot that's visible independent of the popup,
// since buffering continues even while the popup is closed.
function showIndicator(): void {
  if (indicator) return;
  const display = screen.getPrimaryDisplay();
  indicator = new BrowserWindow({
    width: 16,
    height: 16,
    x: display.workArea.x + display.workArea.width - 32,
    y: display.workArea.y + 16,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    resizable: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false },
  });
  indicator.setIgnoreMouseEvents(true);
  indicator.setAlwaysOnTop(true, 'screen-saver');
  indicator.loadFile(path.join(__dirname, '../renderer/recording-indicator.html'));
  indicator.show();
}

function hideIndicator(): void {
  indicator?.close();
  indicator = undefined;
}

export function shutdownContinuousMemory(): void {
  if (sampleTimer) clearInterval(sampleTimer);
  hideIndicator();
}
