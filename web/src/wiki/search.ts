interface WikiSearchEntry {
  name: string;
  pageTitle: string;
  url: string;
}

const MAX_RESULTS = 8;

export function initWikiSearch(): void {
  const input = document.getElementById('wiki-search') as HTMLInputElement | null;
  const results = document.getElementById('wiki-search-results');
  if (!input || !results) return;

  let entries: Promise<WikiSearchEntry[]> | null = null;
  const loadEntries = () =>
    (entries ??= fetch('/elden-ring/wiki/search-index.json').then((r) => r.json() as Promise<WikiSearchEntry[]>));

  input.addEventListener('input', async () => {
    const query = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!query) return;
    const all = await loadEntries();
    const matches = all.filter((e) => e.name.toLowerCase().includes(query)).slice(0, MAX_RESULTS);
    for (const match of matches) {
      const link = document.createElement('a');
      link.className = 'wiki-search-result';
      link.href = match.url;
      const name = document.createElement('span');
      name.textContent = match.name;
      const page = document.createElement('span');
      page.className = 'wiki-search-result-page';
      page.textContent = match.pageTitle;
      link.append(name, page);
      results.appendChild(link);
    }
  });
}
