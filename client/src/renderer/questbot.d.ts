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
