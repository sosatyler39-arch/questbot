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
