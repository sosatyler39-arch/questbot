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
