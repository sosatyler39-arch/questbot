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
