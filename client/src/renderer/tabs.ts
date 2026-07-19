const buttons = document.querySelectorAll<HTMLButtonElement>('.tab-button');
const panels = document.querySelectorAll<HTMLElement>('.panel');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    buttons.forEach((b) => b.classList.toggle('active', b === btn));
    panels.forEach((p) => p.classList.toggle('active', p.id === `${target}-panel`));
  });
});
