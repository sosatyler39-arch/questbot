import {
  type Checklist,
  toggleStep,
  upsertChecklist,
  removeChecklist,
} from './checklist-logic.js';

// Shared checklist store + renderer (FEATURE_ADDENDUM §B1). Used by the Ask
// tab (answer checklists) and the Speedrun tab (route checklists, §B2).
// localStorage so checked state survives popup close/reopen — the addendum's
// explicit persistence requirement. Thin shell: all real logic lives in
// checklist-logic.ts where it's unit-tested.

const STORAGE_KEY = 'questbot_checklists';

export function loadChecklists(): Checklist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Checklist[]) : [];
  } catch {
    return [];
  }
}

function persist(lists: Checklist[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

export function saveChecklist(list: Checklist): void {
  persist(upsertChecklist(loadChecklists(), list));
}

export function deleteChecklist(id: string): void {
  persist(removeChecklist(loadChecklists(), id));
}

// Renders one checklist card. onChange fires after any mutation so callers
// can re-render their surrounding list if they need to.
export function renderChecklistCard(list: Checklist, onChange?: () => void): HTMLElement {
  const card = document.createElement('div');
  card.className = 'checklist-card';

  const header = document.createElement('div');
  header.className = 'checklist-header';
  const title = document.createElement('strong');
  const doneCount = list.steps.filter((s) => s.done).length;
  title.textContent = `${list.title} (${doneCount}/${list.steps.length})`;
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.textContent = '✕';
  remove.title = 'Delete checklist';
  remove.addEventListener('click', () => {
    deleteChecklist(list.id);
    card.remove();
    onChange?.();
  });
  header.append(title, remove);
  card.append(header);

  const ol = document.createElement('ol');
  list.steps.forEach((step, i) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = step.done;
    box.addEventListener('change', () => {
      const updated = toggleStep(list, i);
      saveChecklist(updated);
      label.classList.toggle('done', box.checked);
      const nowDone = updated.steps.filter((s) => s.done).length;
      title.textContent = `${updated.title} (${nowDone}/${updated.steps.length})`;
      // Keep rendering against the updated snapshot for subsequent toggles.
      list = updated;
      onChange?.();
    });
    const text = document.createElement('span');
    text.textContent = step.text;
    label.classList.toggle('done', step.done);
    label.append(box, text);
    li.append(label);
    ol.append(li);
  });
  card.append(ol);
  return card;
}

// Renders every saved checklist from `source` into `container`.
export function renderSavedChecklists(container: HTMLElement, source: Checklist['source']): void {
  container.replaceChildren();
  for (const list of loadChecklists().filter((l) => l.source === source)) {
    container.append(renderChecklistCard(list));
  }
}
