import { acceleratorFromEvent, isDuplicateHotkey } from './settings-logic.js';
import { fetchAccount } from './api.js';
import { showConsentCard } from './onboarding.js';
import { setAutoDismissSeconds } from './popup.js';

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
const autoDismissSelect = document.getElementById('auto-dismiss-select') as HTMLSelectElement;
const appVersionEl = document.getElementById('app-version')!;
const accountStatus = document.getElementById('account-status')!;
const accountSignIn = document.getElementById('account-sign-in') as HTMLButtonElement;
const accountSignOut = document.getElementById('account-sign-out') as HTMLButtonElement;
const accountUpgrade = document.getElementById('account-upgrade') as HTMLButtonElement;

let currentSettings:
  | { popupHotkey: string; continuousMemoryHotkey: string; continuousMemoryBufferMinutes: number; autoDismissSeconds: number }
  | undefined;
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

// Sign-in state drives three controls at once, so all transitions go
// through this one refresher. Tier comes from the backend (/auth/me), not
// from anything client-stored — the token alone doesn't know the tier.
async function refreshAccountStatus(): Promise<void> {
  const token = await window.questbot.getAuthToken();
  if (!token) {
    accountStatus.textContent = 'Not signed in';
    accountSignIn.hidden = false;
    accountSignOut.hidden = true;
    accountUpgrade.hidden = true;
    return;
  }
  accountSignIn.hidden = true;
  accountSignOut.hidden = false;
  const account = await fetchAccount();
  accountStatus.textContent = account ? `Signed in — ${account.tier} tier` : 'Signed in';
  accountUpgrade.hidden = !account || account.tier !== 'free';
}

async function openSettings(): Promise<void> {
  questbotEl.classList.add('settings-open');
  currentSettings = await window.questbot.getSettings();
  popupHotkeyDisplay.textContent = currentSettings.popupHotkey;
  continuousMemoryHotkeyDisplay.textContent = currentSettings.continuousMemoryHotkey;
  bufferMinutesInput.value = String(currentSettings.continuousMemoryBufferMinutes);
  bufferMinutesValue.textContent = String(currentSettings.continuousMemoryBufferMinutes);
  autoDismissSelect.value = String(currentSettings.autoDismissSeconds);
  const neverOption = autoDismissSelect.querySelector<HTMLOptionElement>('option[value="0"]')!;
  neverOption.textContent = `Never (close with ${currentSettings.popupHotkey})`;
  hotkeyError.hidden = true;
  updateContinuousMemoryToggleLabel(await window.questbot.getContinuousMemoryState());
  void refreshAccountStatus();
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
  // §B5: main refuses to start the buffer without persisted consent — if
  // the player hasn't consented yet, route them to the consent card
  // instead of showing a toggle that silently does nothing.
  const settings = await window.questbot.getSettings();
  if (!settings.continuousMemoryConsent) {
    showConsentCard();
    return;
  }
  updateContinuousMemoryToggleLabel(await window.questbot.toggleContinuousMemory());
});

bufferMinutesInput.addEventListener('change', async () => {
  const minutes = Number(bufferMinutesInput.value);
  bufferMinutesValue.textContent = String(minutes);
  const updated = await window.questbot.setBufferMinutes(minutes);
  if (currentSettings) currentSettings.continuousMemoryBufferMinutes = updated.continuousMemoryBufferMinutes;
});

autoDismissSelect.addEventListener('change', async () => {
  const seconds = Number(autoDismissSelect.value);
  const updated = await window.questbot.setAutoDismissSeconds(seconds);
  if (currentSettings) currentSettings.autoDismissSeconds = updated.autoDismissSeconds;
  setAutoDismissSeconds(updated.autoDismissSeconds); // applies live, same session
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

accountSignIn.addEventListener('click', async () => {
  accountStatus.textContent = 'Waiting for browser sign-in…';
  try {
    await window.questbot.signIn();
  } catch {
    // Browser closed / callback never arrived — refresh below shows the
    // real (still signed-out) state instead of leaving "Waiting…" stuck.
  }
  await refreshAccountStatus();
});

accountSignOut.addEventListener('click', async () => {
  await window.questbot.signOut();
  await refreshAccountStatus();
});

accountUpgrade.addEventListener('click', async () => {
  accountUpgrade.disabled = true;
  try {
    await window.questbot.startUpgrade();
  } finally {
    accountUpgrade.disabled = false;
  }
  // Tier flips only after Stripe's webhook lands; the player re-opens
  // Settings (or we refresh here, likely still showing free) — no polling.
  await refreshAccountStatus();
});

void window.questbot.getAppVersion().then((version) => {
  appVersionEl.textContent = `Questbot v${version}`;
});
