interface EnemySearchEntry {
  name: string;
  url: string;
}

const MAX_RESULTS = 8;

export function initEnemySearch(): void {
  const input = document.getElementById('enemy-search') as HTMLInputElement | null;
  const results = document.getElementById('enemy-search-results');
  if (!input || !results) return;

  let entries: Promise<EnemySearchEntry[]> | null = null;
  const loadEntries = () =>
    (entries ??= fetch('/elden-ring/enemies/search-index.json').then((r) => r.json() as Promise<EnemySearchEntry[]>));

  input.addEventListener('input', async () => {
    const query = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!query) return;
    const all = await loadEntries();
    const matches = all.filter((e) => e.name.toLowerCase().includes(query)).slice(0, MAX_RESULTS);
    for (const match of matches) {
      const link = document.createElement('a');
      link.className = 'enemy-search-result';
      link.href = match.url;
      link.textContent = match.name;
      results.appendChild(link);
    }
  });
}
