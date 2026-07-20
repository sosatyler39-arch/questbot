const buttons = document.querySelectorAll<HTMLButtonElement>('.tab-button');
const panels = document.querySelectorAll<HTMLElement>('.panel');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    buttons.forEach((b) => b.classList.toggle('active', b === btn));
    panels.forEach((p) => p.classList.toggle('active', p.id === `${target}-panel`));
    // Settings hides every .panel via #questbot.settings-open — switching
    // tabs while it's open would otherwise look inert until Settings is
    // separately closed.
    document.getElementById('questbot')?.classList.remove('settings-open');
  });
});
