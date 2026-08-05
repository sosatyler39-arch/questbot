import type { Category } from './locations.js';

// One visually distinct hue + icon per category, shared by the Map tab
// (render.ts), the Speedrun tab (speedrun.ts, client only), and the Shape
// Editor's own pin overlay (shape-editor.ts) — a single source so all three
// always agree on what a category looks like.
export const CATEGORY_COLOR: Record<Category, string> = {
  bosses: '#bd2828',
  'ashes-of-war': '#da5a2f',
  weapons: '#bd7328',
  key: '#e6b34c',
  'site-of-grace': '#d3c269',
  materials: '#9fb143',
  'upgrade-materials': '#755538',
  npc: '#7c90ab',
  consumables: '#37be4e',
  spiritsprings: '#4dcb88',
  waygates: '#31c4a2',
  talismans: '#33c2cc',
  shields: '#3f81a6',
  locations: '#5980cf',
  'summoning-pool': '#3945c6',
  remembrance: '#44358d',
  spells: '#6e31c4',
  'npc-invader': '#5c297a',
  'spirit-ashes': '#bb72ca',
  'flask-upgrades': '#ce3bba',
  armor: '#855532',
  maps: '#c7bca8',
};

export const CATEGORY_ICON: Record<Category, string> = {
  locations: '📍',
  bosses: '💀',
  'site-of-grace': '✨',
  waygates: '🌀',
  spiritsprings: '⛲',
  'summoning-pool': '🤝',
  weapons: '⚔️',
  armor: '🧥',
  shields: '🛡️',
  talismans: '🧿',
  'ashes-of-war': '🔥',
  consumables: '🧪',
  materials: '🪵',
  'upgrade-materials': '⚒️',
  'flask-upgrades': '⚗️',
  key: '🔑',
  spells: '📖',
  'spirit-ashes': '👻',
  npc: '🗣️',
  'npc-invader': '👹',
  remembrance: '🏺',
  maps: '🗺️',
};

export const CATEGORY_LABEL: Record<Category, string> = {
  locations: 'Locations',
  bosses: 'Bosses',
  'site-of-grace': 'Site of Grace',
  waygates: 'Waygates',
  spiritsprings: 'Spiritsprings',
  'summoning-pool': 'Summoning Pool',
  weapons: 'Weapons',
  armor: 'Armor',
  shields: 'Shields',
  talismans: 'Talismans',
  'ashes-of-war': 'Ashes of War',
  consumables: 'Consumables',
  materials: 'Materials',
  'upgrade-materials': 'Upgrade Materials',
  'flask-upgrades': 'Flask Upgrades',
  key: 'Key',
  spells: 'Spells',
  'spirit-ashes': 'Spirit Ashes',
  npc: 'NPC',
  'npc-invader': 'NPC Invader',
  remembrance: 'Remembrance',
  maps: 'Maps',
};

export const LEGEND_CLUSTERS: { label: string; categories: Category[] }[] = [
  { label: 'World', categories: ['locations', 'bosses', 'site-of-grace', 'waygates', 'spiritsprings', 'summoning-pool'] },
  { label: 'Equipment', categories: ['weapons', 'armor', 'shields', 'talismans', 'ashes-of-war'] },
  { label: 'Consumables & Materials', categories: ['consumables', 'materials', 'upgrade-materials', 'flask-upgrades', 'key'] },
  { label: 'Magic & Summons', categories: ['spells', 'spirit-ashes'] },
  { label: 'NPCs', categories: ['npc', 'npc-invader', 'remembrance'] },
  { label: 'Reference', categories: ['maps'] },
];

// Builds the clustered checkbox legend into `container` (cleared first) and
// wires every checkbox to `onToggle`, called with the category and whether
// it's now hidden. All 22 categories default to visible/checked.
export function buildLegend(container: HTMLElement, onToggle: (category: Category, hidden: boolean) => void): void {
  container.replaceChildren();
  for (const cluster of LEGEND_CLUSTERS) {
    const section = document.createElement('div');
    section.className = 'legend-cluster';

    const heading = document.createElement('div');
    heading.className = 'legend-cluster-label';
    heading.textContent = cluster.label;
    section.appendChild(heading);

    const row = document.createElement('div');
    row.className = 'legend-cluster-row';
    for (const category of cluster.categories) {
      const item = document.createElement('label');
      item.className = 'legend-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;
      checkbox.addEventListener('change', () => onToggle(category, !checkbox.checked));

      const dot = document.createElement('i');
      dot.className = 'legend-item-dot';
      dot.style.background = CATEGORY_COLOR[category];
      dot.textContent = CATEGORY_ICON[category];

      item.append(checkbox, dot, document.createTextNode(CATEGORY_LABEL[category]));
      row.appendChild(item);
    }
    section.appendChild(row);
    container.appendChild(section);
  }
}
