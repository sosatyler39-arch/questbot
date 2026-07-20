// First-run walkthrough + continuous-memory consent (FEATURE_ADDENDUM §B5).
// The consent card is not tutorial polish: main/index.ts refuses to start
// the buffer until `continuousMemoryConsent` is persisted true, and this
// overlay is the only place that sets it. The card is re-reachable later
// (settings.ts calls showConsentCard() when an unconsented toggle is
// attempted), so skipping onboarding doesn't strand the feature.

const overlay = document.getElementById('onboarding')!;
const steps = Array.from(document.querySelectorAll<HTMLElement>('.onboarding-step'));
const nextButton = document.getElementById('onboarding-next') as HTMLButtonElement;
const consentButton = document.getElementById('onboarding-consent') as HTMLButtonElement;
const skipConsentButton = document.getElementById('onboarding-skip-consent') as HTMLButtonElement;
const hotkeyEl = document.getElementById('onboarding-hotkey')!;

let step = 0;

function showStep(index: number): void {
  step = index;
  steps.forEach((el) => {
    el.hidden = Number(el.dataset.step) !== index;
  });
  // The consent card carries its own two buttons; Next drives the rest.
  nextButton.hidden = index >= steps.length - 1;
}

function openOverlay(atStep: number): void {
  overlay.hidden = false;
  showStep(atStep);
}

async function closeOverlay(): Promise<void> {
  overlay.hidden = true;
  await window.questbot.setOnboardingSeen();
}

nextButton.addEventListener('click', () => showStep(step + 1));

consentButton.addEventListener('click', async () => {
  await window.questbot.grantContinuousMemoryConsent();
  await closeOverlay();
});

skipConsentButton.addEventListener('click', () => {
  void closeOverlay();
});

// Re-entry point for settings.ts: jump straight to the consent card.
export function showConsentCard(): void {
  openOverlay(steps.length - 1);
}

// First launch only — afterwards the overlay stays out of the way unless
// the consent card is explicitly re-opened.
void window.questbot.getSettings().then((settings) => {
  hotkeyEl.textContent = settings.popupHotkey.replace(/Control/g, 'Ctrl');
  if (!settings.onboardingSeen) openOverlay(0);
});
