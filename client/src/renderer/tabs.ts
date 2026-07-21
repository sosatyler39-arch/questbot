const buttons = document.querySelectorAll<HTMLButtonElement>('.tab-button');
const panels = document.querySelectorAll<HTMLElement>('.panel');

export function switchToTab(tabId: string): void {
  buttons.forEach((b) => b.classList.toggle('active', b.dataset.tab === tabId));
  panels.forEach((p) => p.classList.toggle('active', p.id === `${tabId}-panel`));
  // Settings hides every .panel via #questbot.settings-open — switching
  // tabs while it's open would otherwise look inert until Settings is
  // separately closed.
  document.getElementById('questbot')?.classList.remove('settings-open');
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    if (target) switchToTab(target);
  });
});
