# Map Legend: 22-Category Colors, Icons, and Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the schematic map's 7-category color key + 2-checkbox filter with a single 22-category legend that is itself the filter — every category gets a unique color, a unique icon, and its own toggle — across the web Map tab, the Electron client's Map tab, and the Electron client's Speedrun tab.

**Architecture:** The 247 existing pins' `category` field is rewritten in place from the old 7-value scheme to 3 of the new 22 values (`bosses`, `site-of-grace`, `locations`, plus one `waygates`) using a one-off script driven by real Site of Grace data already extracted from the game files. A new shared module (`legend.ts`, mirrored web+client) owns the 22 colors/icons/labels and a `buildLegend()` DOM builder reused by both the Map tab and the Speedrun tab. `roles.ts` (`Role`/`ROLE_FOR_CATEGORY`) is deleted — every consumer filters/colors on the real category directly via a `data-category` attribute (Map tab) or a `Set<Category>` checked at pin-build time (Speedrun tab, which already rebuilds on filter change).

**Tech Stack:** TypeScript, Astro (web), Electron (client), `node:test` for the existing logic test suites, vanilla DOM/SVG (no framework).

## Global Constraints

- `category` field is rewritten directly on all 247 existing pins — no parallel translation-table layer is added, per the approved spec.
- Colors, icons, cluster grouping, and category slugs are exactly as specified in `docs/superpowers/specs/2026-08-05-map-legend-categories-design.md` — do not improvise different values.
- `roles.ts` (`Role`, `ROLE_FOR_CATEGORY`) is deleted entirely from both `web/src/map/` and `client/src/renderer/map/` once nothing references it.
- Every file that exists in both `web/src/map/` and `client/src/renderer/map/` must be kept in sync — mirror every edit to both copies and verify with `Compare-Object` (PowerShell) that they're byte-identical except for the pre-existing, known import-path differences (e.g. `favorites.js`/`favorites-logic.js` in web vs. `../library.js`/`../library-logic.js` in client).
- New custom pins created via the Shape Editor default to `category: 'locations'` (not the old `'landmark'`, which no longer exists).

---

### Task 1: Rewrite `MapLocation.category` — data migration + type expansion

**Files:**
- Modify: `web/src/map/locations.ts`
- Modify: `client/src/renderer/map/locations.ts`
- Create (scratch, not committed): a one-off Node script under your scratchpad directory

**Interfaces:**
- Produces: `export type Category = MapLocation['category'];` (in `locations.ts`, both copies) — the type every later task imports.
- Produces: `MapLocation.category` now a union of exactly these 22 string literals: `'armor' | 'ashes-of-war' | 'bosses' | 'consumables' | 'flask-upgrades' | 'key' | 'locations' | 'maps' | 'materials' | 'npc' | 'npc-invader' | 'remembrance' | 'shields' | 'site-of-grace' | 'spells' | 'spirit-ashes' | 'spiritsprings' | 'summoning-pool' | 'talismans' | 'upgrade-materials' | 'waygates' | 'weapons'`.

- [ ] **Step 1: Update the `MapLocation` interface in both files**

In both `web/src/map/locations.ts` and `client/src/renderer/map/locations.ts`, replace:

```ts
export interface MapLocation {
  name: string;
  category:
    | 'legacy-dungeon'
    | 'minor-dungeon'
    | 'evergaol'
    | 'church'
    | 'landmark'
    | 'town-or-fort'
    | 'great-enemy';
  regionId: string;
  layer: 'surface' | 'underground';
  fx: number;
  fy: number;
}
```

with:

```ts
export interface MapLocation {
  name: string;
  category:
    | 'armor'
    | 'ashes-of-war'
    | 'bosses'
    | 'consumables'
    | 'flask-upgrades'
    | 'key'
    | 'locations'
    | 'maps'
    | 'materials'
    | 'npc'
    | 'npc-invader'
    | 'remembrance'
    | 'shields'
    | 'site-of-grace'
    | 'spells'
    | 'spirit-ashes'
    | 'spiritsprings'
    | 'summoning-pool'
    | 'talismans'
    | 'upgrade-materials'
    | 'waygates'
    | 'weapons';
  regionId: string;
  layer: 'surface' | 'underground';
  fx: number;
  fy: number;
}

export type Category = MapLocation['category'];
```

- [ ] **Step 2: Write the migration script**

Create `migrate-categories.mjs` in your scratchpad directory (this script is disposable — it is never committed to the repo):

```js
import fs from 'node:fs';

const graces = JSON.parse(
  fs.readFileSync('C:/Users/migue/Claude Code/QuestBot/tools/msb-extractor/output/sites-of-grace.json', 'utf8'),
);
const graceNames = new Set(graces.map((g) => g.graceName));

// Hand-verified in the design brainstorm: these don't exact-match a grace
// name but are confirmed the same physical spot (comma-prefix / "Depths"
// paraphrase). Renna's Rise is a real, distinct location per Ranni's Rise
// (user-confirmed) and belongs under Waygates, not Locations.
const MANUAL_SITE_OF_GRACE = new Set([
  'Dominula, Windmill Village',
  'Siofra River Well (descent)',
  'Ainsel River Well (descent)',
]);
const MANUAL_WAYGATE = new Set(["Renna's Rise (waygate)"]);

function baseName(name) {
  return name.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function classify(name, oldCategory) {
  if (oldCategory === 'evergaol' || oldCategory === 'great-enemy') return 'bosses';
  if (MANUAL_WAYGATE.has(name)) return 'waygates';
  if (MANUAL_SITE_OF_GRACE.has(name)) return 'site-of-grace';
  const base = baseName(name);
  if (graceNames.has(name) || graceNames.has(base)) return 'site-of-grace';
  return 'locations';
}

function migrate(path) {
  const src = fs.readFileSync(path, 'utf8');
  const entryRe = /\{\s*name:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,\s*category:\s*'([a-z-]+)'/g;
  const counts = { bosses: 0, 'site-of-grace': 0, waygates: 0, locations: 0 };
  let total = 0;

  const out = src.replace(entryRe, (match, single, double, oldCategory) => {
    const raw = (single ?? double).replace(/\\'/g, "'");
    const newCategory = classify(raw, oldCategory);
    counts[newCategory]++;
    total++;
    return match.replace(`category: '${oldCategory}'`, `category: '${newCategory}'`);
  });

  if (total !== 247) throw new Error(`${path}: expected 247 entries, matched ${total}`);
  if (counts.bosses !== 34) throw new Error(`${path}: expected 34 bosses, got ${counts.bosses}`);
  if (counts['site-of-grace'] !== 129) throw new Error(`${path}: expected 129 site-of-grace, got ${counts['site-of-grace']}`);
  if (counts.waygates !== 1) throw new Error(`${path}: expected 1 waygates, got ${counts.waygates}`);
  if (counts.locations !== 83) throw new Error(`${path}: expected 83 locations, got ${counts.locations}`);

  fs.writeFileSync(path, out);
  console.log(path, counts);
}

migrate('C:/Users/migue/Claude Code/QuestBot/web/src/map/locations.ts');
migrate('C:/Users/migue/Claude Code/QuestBot/client/src/renderer/map/locations.ts');
```

- [ ] **Step 3: Run the script for real**

Run (PowerShell — the Bash tool is unreliable in this environment, prefer PowerShell for shell commands):

```powershell
node "<scratchpad>/migrate-categories.mjs"
```

Expected: both `migrate(...)` calls print their `counts` object and neither throws. If either throws, the mismatch means either the interface edit from Step 1 wasn't applied yet (regex still needs the old category values to exist unchanged — run Step 1 first) or one of the two `locations.ts` files has drifted from 247 entries; investigate before re-running.

- [ ] **Step 4: Verify the diff is data-only**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" diff --stat web/src/map/locations.ts client/src/renderer/map/locations.ts
```

Expected: only these two files changed, each with the interface edit plus up to 247 changed lines (one per pin whose category value actually changed — old and new happen to be spelled the same for zero categories here, so expect close to 247 changed lines, not fewer). Spot-check a few names with `git diff`: `Church of Elleh` → `site-of-grace`, `Stormhill Evergaol` → `bosses`, `Stormveil Castle` → `locations`, `Renna's Rise (waygate)` → `waygates`.

- [ ] **Step 5: Commit**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" add web/src/map/locations.ts client/src/renderer/map/locations.ts
git -C "C:\Users\migue\Claude Code\QuestBot" commit -m "Rewrite MapLocation.category to the new 22-category scheme"
```

---

### Task 2: Shared legend module (web)

**Files:**
- Create: `web/src/map/legend.ts`

**Interfaces:**
- Consumes: `Category` from `web/src/map/locations.ts` (Task 1).
- Produces: `CATEGORY_COLOR: Record<Category, string>`, `CATEGORY_ICON: Record<Category, string>`, `CATEGORY_LABEL: Record<Category, string>`, `LEGEND_CLUSTERS: { label: string; categories: Category[] }[]`, `buildLegend(container: HTMLElement, onToggle: (category: Category, hidden: boolean) => void): void` — all consumed by Tasks 3, 4, 5, 6.

- [ ] **Step 1: Write `web/src/map/legend.ts`**

```ts
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
```

- [ ] **Step 2: Typecheck**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\web"; npm run typecheck
```

Expected: passes (this file has no consumers yet, so it can't break anything, but it must compile standalone).

- [ ] **Step 3: Commit**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" add web/src/map/legend.ts
git -C "C:\Users\migue\Claude Code\QuestBot" commit -m "Add shared 22-category color/icon/legend module (web)"
```

---

### Task 3: Rewire the web Map tab — delete `roles.ts`, use `legend.ts`, new filter mechanism

**Files:**
- Delete: `web/src/map/roles.ts`
- Modify: `web/src/map/render.ts`
- Modify: `web/src/pages/elden-ring/map.astro`
- Modify: `web/public/map.css`

**Interfaces:**
- Consumes: `CATEGORY_COLOR`, `buildLegend` from `web/src/map/legend.ts` (Task 2); `Category` from `web/src/map/locations.ts` (Task 1).
- Produces: pins carry `data-category="<slug>"` (replaces the old `role-location`/`role-boss` class) — consumed by Task 4's Shape Editor color lookups stay the same import, but nothing else in this plan reads `data-category` besides `applyFilters` itself.

- [ ] **Step 1: Delete `web/src/map/roles.ts`**

```powershell
Remove-Item "C:\Users\migue\Claude Code\QuestBot\web\src\map\roles.ts"
```

- [ ] **Step 2: Update imports in `render.ts`**

Replace:

```ts
import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './regions.js';
import { MAP_LOCATIONS, type MapLocation } from './locations.js';
import { clamp, seeded, catmullRomPath, polygonCentroid, minZoomScale, clampedLabelFontSize } from './geometry.js';
import { isLocationFavorite } from './favorites-logic.js';
import { loadFavorites, toggleFavoriteStored } from './favorites.js';
import { ROLE_FOR_CATEGORY, type Category } from './roles.js';
```

with:

```ts
import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './regions.js';
import { MAP_LOCATIONS, type MapLocation, type Category } from './locations.js';
import { clamp, seeded, catmullRomPath, polygonCentroid, minZoomScale, clampedLabelFontSize } from './geometry.js';
import { isLocationFavorite } from './favorites-logic.js';
import { loadFavorites, toggleFavoriteStored } from './favorites.js';
import { CATEGORY_COLOR, buildLegend } from './legend.js';
```

- [ ] **Step 3: Remove the old local `CATEGORY_COLOR`/`CATEGORY_LABEL` constants**

Delete this whole block (now provided by `legend.ts` instead):

```ts
// One visually distinct hue per category (legend + pins share this map).
// Exported so the Shape Editor's own pin overlay (see shape-editor.ts) uses
// identical colors instead of a second hand-kept copy.
export const CATEGORY_COLOR: Record<Category, string> = {
  'legacy-dungeon': '#c23b32',
  'great-enemy': '#e0752f',
  'minor-dungeon': '#c9a24b',
  church: '#e8d16b',
  landmark: '#5b9bd5',
  'town-or-fort': '#4fae7a',
  evergaol: '#8f5ee0',
};

const CATEGORY_LABEL: Record<Category, string> = {
  'legacy-dungeon': 'Legacy dungeon',
  'minor-dungeon': 'Minor dungeon',
  evergaol: 'Evergaol',
  church: 'Church',
  landmark: 'Landmark',
  'town-or-fort': 'Town / fort / ruins',
  'great-enemy': 'Great Enemy',
};
```

- [ ] **Step 4: Add the hidden-categories module state**

Near the other module state (`let layer: Layer = 'surface';` etc.), add:

```ts
let hiddenCategories = new Set<Category>();
```

- [ ] **Step 5: Remove the old filter checkbox DOM refs**

Delete:

```ts
const filterLocations = document.getElementById('filter-locations') as HTMLInputElement;
const filterBosses = document.getElementById('filter-bosses') as HTMLInputElement;
```

(keep `const legend = document.getElementById('map-legend')!;`)

- [ ] **Step 6: Update `addPin` to tag pins with `data-category` instead of a role class**

Replace:

```ts
  group.setAttribute('class', `pin-group role-${ROLE_FOR_CATEGORY[loc.category]}`);
```

with:

```ts
  group.setAttribute('class', 'pin-group');
  group.setAttribute('data-category', loc.category);
```

- [ ] **Step 7: Rewrite `applyFilters`**

Replace:

```ts
function applyFilters(): void {
  wrap.classList.toggle('hide-locations', !filterLocations.checked);
  wrap.classList.toggle('hide-bosses', !filterBosses.checked);
}
```

with:

```ts
function applyFilters(): void {
  wrap.querySelectorAll<SVGElement>('[data-category]').forEach((el) => {
    const category = el.getAttribute('data-category') as Category;
    el.style.display = hiddenCategories.has(category) ? 'none' : '';
  });
}
```

- [ ] **Step 8: Remove `initFilters`, rewrite `initLegend`**

Delete:

```ts
function initFilters(): void {
  filterLocations.addEventListener('change', applyFilters);
  filterBosses.addEventListener('change', applyFilters);
}
```

Replace:

```ts
function initLegend(): void {
  for (const category of Object.keys(CATEGORY_LABEL) as Category[]) {
    const item = document.createElement('span');
    const dot = document.createElement('i');
    dot.style.background = CATEGORY_COLOR[category];
    item.append(dot, document.createTextNode(CATEGORY_LABEL[category]));
    legend.appendChild(item);
  }
}
```

with:

```ts
function initLegend(): void {
  buildLegend(legend, (category, hidden) => {
    if (hidden) hiddenCategories.add(category);
    else hiddenCategories.delete(category);
    applyFilters();
  });
}
```

- [ ] **Step 9: Update `initMap`**

Replace:

```ts
export function initMap(): void {
  renderLayer();
  initPanZoom();
  initSearch();
  initLayerToggle();
  initFilters();
  initLegend();
```

with:

```ts
export function initMap(): void {
  renderLayer();
  initPanZoom();
  initSearch();
  initLayerToggle();
  initLegend();
```

(the rest of the function body — the `window.addEventListener('blur', ...)` block — is unchanged)

- [ ] **Step 10: Update `map.astro`**

In `web/src/pages/elden-ring/map.astro`, replace:

```astro
        <div id="map-toolbar">
          <input id="map-search" type="text" placeholder="Search locations…" autocomplete="off" />
          <div id="map-search-results"></div>
          <label id="filter-locations-label"><input id="filter-locations" type="checkbox" checked /> Locations</label>
          <label id="filter-bosses-label" title="Currently: Evergaols + open-world Great Enemies.">
            <input id="filter-bosses" type="checkbox" checked /> Bosses
          </label>
          <button id="map-layer-toggle" type="button">Surface</button>
        </div>
```

with:

```astro
        <div id="map-toolbar">
          <input id="map-search" type="text" placeholder="Search locations…" autocomplete="off" />
          <div id="map-search-results"></div>
          <button id="map-layer-toggle" type="button">Surface</button>
        </div>
```

- [ ] **Step 11: Update `web/public/map.css`**

Remove:

```css
#filter-locations-label,
#filter-bosses-label,
#speedrun-filter-locations-label,
#speedrun-filter-bosses-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #e8e2d5;
  white-space: nowrap;
  cursor: pointer;
}
```

and:

```css
#map-canvas-wrap.hide-locations .role-location {
  display: none;
}

#map-canvas-wrap.hide-bosses .role-boss {
  display: none;
}
```

Replace the old legend rules:

```css
#map-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 3px 14px;
  font-size: 10.5px;
  color: #b8ab90;
  padding: 0 2px;
}

#map-legend span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

#map-legend i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}
```

with:

```css
#map-legend,
#speedrun-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11px;
  color: #b8ab90;
  padding: 4px 2px;
}

.legend-cluster {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.legend-cluster-label {
  font-weight: 600;
  color: #cfc3a6;
  white-space: nowrap;
  min-width: 118px;
}

.legend-cluster-row {
  display: flex;
  flex-wrap: wrap;
  gap: 3px 12px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.legend-item input[type='checkbox'] {
  margin: 0;
  cursor: pointer;
}

.legend-item-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  line-height: 1;
}
```

(`#speedrun-legend` doesn't exist in web's markup — including its selector here is harmless and keeps `map.css` textually aligned with the client copy, which does use it, per Task 6)

- [ ] **Step 12: Typecheck, then verify live**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\web"; npm run typecheck
```

Start the dev server (`astro dev --background` per this workspace's CLAUDE.md) and open the Map tab in the Browser pane. Verify:
- The legend below the map shows 6 labeled clusters with 22 checkboxes total, each with its own color dot + icon.
- Locations, Bosses, Site of Grace, and Waygates categories show real pins (83, 34, 129, and 1 respectively); the other 18 categories show zero pins (expected — no data yet).
- Unchecking "Bosses" hides every boss pin; re-checking brings them back. Same for at least one other populated category.
- The old 2-checkbox row above the map is gone.

- [ ] **Step 13: Commit**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" add -A web/src/map/roles.ts web/src/map/render.ts web/src/pages/elden-ring/map.astro web/public/map.css
git -C "C:\Users\migue\Claude Code\QuestBot" commit -m "Rewire web Map tab onto the 22-category legend, delete roles.ts"
```

---

### Task 4: Shape Editor category picker (web)

**Files:**
- Modify: `web/src/map/shape-editor.ts`

**Interfaces:**
- Consumes: `CATEGORY_COLOR` from `web/src/map/legend.ts` (Task 2); `Category` from `web/src/map/locations.ts` (Task 1).

- [ ] **Step 1: Update imports**

Replace:

```ts
import { CATEGORY_COLOR } from './render.js';
import type { Category } from './roles.js';
```

with:

```ts
import { CATEGORY_COLOR } from './legend.js';
import type { Category } from './locations.js';
```

- [ ] **Step 2: Change the default category for new custom pins**

Find the pin-creation code (`const pin: CustomPin = { ... category: 'landmark', ... }`) and change `category: 'landmark',` to `category: 'locations',`.

- [ ] **Step 3: Add a category `<select>` to each custom pin's row**

In `renderPinList()`, after the block that builds `name` (the rename `<input>` for custom pins / plain `<span>` for real locations) and before the `pos` element is built, add:

```ts
    let categorySelect: HTMLSelectElement | null = null;
    if (isCustomPin(loc)) {
      categorySelect = document.createElement('select');
      categorySelect.className = 'shapes-pin-row-category';
      for (const category of Object.keys(CATEGORY_COLOR) as Category[]) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        option.selected = category === loc.category;
        categorySelect.appendChild(option);
      }
      categorySelect.addEventListener('mousedown', (e) => e.stopPropagation());
      categorySelect.addEventListener('click', (e) => e.stopPropagation());
      categorySelect.addEventListener('change', () => {
        loc.category = categorySelect!.value as Category;
        persist();
        renderExportOutput();
        rebuildSvg();
        renderPinList();
      });
    }
```

Then change:

```ts
    row.append(dot, name, pos);
```

to:

```ts
    row.append(dot, name, pos);
    if (categorySelect) row.appendChild(categorySelect);
```

- [ ] **Step 4: Add CSS for the new dropdown**

In `client/src/renderer/map.css` and `web/public/map.css`, add (alongside the existing `.shapes-pin-row-name-input` rule):

```css
.shapes-pin-row-category {
  background: rgba(0, 0, 0, 0.35);
  color: inherit;
  border: 1px solid transparent;
  border-radius: 3px;
  font: inherit;
  font-size: 10px;
  padding: 1px 2px;
}

.shapes-pin-row-category:focus {
  border-color: #c9a24b;
  outline: none;
}
```

- [ ] **Step 5: Typecheck, then verify live**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\web"; npm run typecheck
```

In the Browser pane's Shape Editor (Pin mode), create a custom pin, confirm its row shows a category dropdown defaulted to "locations", change it to e.g. "weapons", and confirm the pin's dot on the map immediately recolors to the Weapons color.

- [ ] **Step 6: Commit**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" add web/src/map/shape-editor.ts web/public/map.css client/src/renderer/map.css
git -C "C:\Users\migue\Claude Code\QuestBot" commit -m "Add category picker to Shape Editor custom pins"
```

(the `client/src/renderer/map.css` half of this commit is the CSS-only mirror; Task 5 mirrors the rest of `shape-editor.ts`)

---

### Task 5: Mirror Tasks 2–4 to the Electron client's Map tab

**Files:**
- Create: `client/src/renderer/map/legend.ts` (byte-identical to `web/src/map/legend.ts`)
- Delete: `client/src/renderer/map/roles.ts`
- Modify: `client/src/renderer/map/render.ts`
- Modify: `client/src/renderer/map/shape-editor.ts`
- Modify: `client/src/renderer/popup.html`

**Interfaces:**
- Same as Tasks 2–4, just in the `client/src/renderer/map/` copies.

- [ ] **Step 1: Copy `legend.ts`**

```powershell
Copy-Item "C:\Users\migue\Claude Code\QuestBot\web\src\map\legend.ts" "C:\Users\migue\Claude Code\QuestBot\client\src\renderer\map\legend.ts"
```

- [ ] **Step 2: Delete `roles.ts`**

```powershell
Remove-Item "C:\Users\migue\Claude Code\QuestBot\client\src\renderer\map\roles.ts"
```

- [ ] **Step 3: Apply the same `render.ts` edits as Task 3, Steps 2–9**

Identical to the web edits, except the import block keeps this workspace's own favorites-equivalent lines. Replace:

```ts
import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './regions.js';
import { MAP_LOCATIONS, type MapLocation } from './locations.js';
import { clamp, seeded, catmullRomPath, polygonCentroid, minZoomScale, clampedLabelFontSize } from './geometry.js';
import { isLocationFavorite } from '../library-logic.js';
import { loadFavorites, toggleFavoriteStored } from '../library.js';
import { ROLE_FOR_CATEGORY, type Category } from './roles.js';
```

with:

```ts
import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './regions.js';
import { MAP_LOCATIONS, type MapLocation, type Category } from './locations.js';
import { clamp, seeded, catmullRomPath, polygonCentroid, minZoomScale, clampedLabelFontSize } from './geometry.js';
import { isLocationFavorite } from '../library-logic.js';
import { loadFavorites, toggleFavoriteStored } from '../library.js';
import { CATEGORY_COLOR, buildLegend } from './legend.js';
```

Then apply Task 3's Steps 3 through 9 verbatim (removing the old `CATEGORY_COLOR`/`CATEGORY_LABEL` consts, adding `hiddenCategories`, removing the filter checkbox refs, updating `addPin`/`applyFilters`/`initFilters`+`initLegend`/`initMap` exactly as in Task 3).

- [ ] **Step 4: Apply the same `shape-editor.ts` edits as Task 4, Steps 1–3**

Identical to the web edits (this file's imports were confirmed byte-identical to web's before this plan).

- [ ] **Step 5: Update `popup.html`'s Map tab section**

Replace:

```html
    <div id="map-toolbar">
      <input id="map-search" type="text" placeholder="Search locations…" autocomplete="off" />
      <div id="map-search-results"></div>
      <label id="filter-locations-label"><input id="filter-locations" type="checkbox" checked /> Locations</label>
      <label id="filter-bosses-label" title="Currently: Evergaols + open-world Great Enemies. Bosses inside dungeons are a planned addition.">
        <input id="filter-bosses" type="checkbox" checked /> Bosses
      </label>
      <button id="map-layer-toggle" type="button">Surface</button>
    </div>
```

with:

```html
    <div id="map-toolbar">
      <input id="map-search" type="text" placeholder="Search locations…" autocomplete="off" />
      <div id="map-search-results"></div>
      <button id="map-layer-toggle" type="button">Surface</button>
    </div>
```

- [ ] **Step 6: Verify the two workspaces' map files are in sync**

```powershell
Compare-Object (Get-Content "C:\Users\migue\Claude Code\QuestBot\web\src\map\legend.ts") (Get-Content "C:\Users\migue\Claude Code\QuestBot\client\src\renderer\map\legend.ts")
Compare-Object (Get-Content "C:\Users\migue\Claude Code\QuestBot\web\src\map\shape-editor.ts") (Get-Content "C:\Users\migue\Claude Code\QuestBot\client\src\renderer\map\shape-editor.ts")
```

Expected: no output (byte-identical) for both. Don't run this comparison on `render.ts` — it has the known, pre-existing favorites/library import difference.

- [ ] **Step 7: Typecheck**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\client"; npm run typecheck
```

- [ ] **Step 8: Commit**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" add -A client/src/renderer/map/legend.ts client/src/renderer/map/roles.ts client/src/renderer/map/render.ts client/src/renderer/map/shape-editor.ts client/src/renderer/popup.html
git -C "C:\Users\migue\Claude Code\QuestBot" commit -m "Mirror the 22-category legend and Shape Editor picker to the Electron client"
```

---

### Task 6: Speedrun tab (client only)

**Files:**
- Modify: `client/src/renderer/speedrun.ts`
- Modify: `client/src/renderer/popup.html`

**Interfaces:**
- Consumes: `buildLegend` from `./map/legend.js` (Task 5); `Category`, `MapLocation` from `./map/locations.js`.

- [ ] **Step 1: Update imports**

Replace:

```ts
import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './map/regions.js';
import { MAP_LOCATIONS, type MapLocation } from './map/locations.js';
import { catmullRomPath, minZoomScale, clampedLabelFontSize } from './map/geometry.js';
import { ROLE_FOR_CATEGORY } from './map/roles.js';
import { toggleStop, removeStopAt, serializeRoute, deserializeRoute } from './speedrun-logic.js';
import { makeChecklist } from './checklist-logic.js';
import { saveChecklist, renderSavedChecklists } from './checklists.js';
```

with:

```ts
import { SURFACE_REGIONS, UNDERGROUND_REGIONS, type Region } from './map/regions.js';
import { MAP_LOCATIONS, type MapLocation, type Category } from './map/locations.js';
import { catmullRomPath, minZoomScale, clampedLabelFontSize } from './map/geometry.js';
import { buildLegend } from './map/legend.js';
import { toggleStop, removeStopAt, serializeRoute, deserializeRoute } from './speedrun-logic.js';
import { makeChecklist } from './checklist-logic.js';
import { saveChecklist, renderSavedChecklists } from './checklists.js';
```

- [ ] **Step 2: Replace the filter DOM refs and add hidden-categories state**

Replace:

```ts
const filterLocations = document.getElementById('speedrun-filter-locations') as HTMLInputElement;
const filterBosses = document.getElementById('speedrun-filter-bosses') as HTMLInputElement;
```

with:

```ts
const legendEl = document.getElementById('speedrun-legend')!;
const hiddenCategories = new Set<Category>();
```

- [ ] **Step 3: Rewrite `filterAllows`**

Replace:

```ts
// Same two-group filter as the Map tab (locations vs. bosses) — a route stop
// that's currently filtered out stays in the saved route, it just isn't
// shown as a clickable pin until the filter is switched back on.
function filterAllows(loc: MapLocation): boolean {
  return ROLE_FOR_CATEGORY[loc.category] === 'boss' ? filterBosses.checked : filterLocations.checked;
}
```

with:

```ts
// Same per-category filter as the Map tab — a route stop that's currently
// filtered out stays in the saved route, it just isn't shown as a clickable
// pin until its category is switched back on.
function filterAllows(loc: MapLocation): boolean {
  return !hiddenCategories.has(loc.category);
}
```

- [ ] **Step 4: Replace the filter checkbox listeners with the legend**

Replace:

```ts
filterLocations.addEventListener('change', renderLayer);
filterBosses.addEventListener('change', renderLayer);
```

with:

```ts
buildLegend(legendEl, (category, hidden) => {
  if (hidden) hiddenCategories.add(category);
  else hiddenCategories.delete(category);
  renderLayer();
});
```

(leave this call where the old listeners were, right before `clearButton.addEventListener(...)`)

- [ ] **Step 5: Update `popup.html`'s Speedrun tab section**

Replace:

```html
  <div id="speedrun-panel" class="panel">
    <div id="speedrun-toolbar">
      <p id="speedrun-hint">Click pins in the order you want to visit them. The route saves itself and comes back next time.</p>
      <label id="speedrun-filter-locations-label"><input id="speedrun-filter-locations" type="checkbox" checked /> Locations</label>
      <label id="speedrun-filter-bosses-label"><input id="speedrun-filter-bosses" type="checkbox" checked /> Bosses</label>
      <button id="speedrun-layer-toggle" type="button">Surface</button>
      <button id="speedrun-clear" type="button" disabled>Clear route</button>
      <button id="speedrun-make-checklist" type="button" disabled>Generate checklist</button>
    </div>
    <div id="speedrun-body">
      <div id="speedrun-viewport">
        <div id="speedrun-canvas-wrap"></div>
      </div>
      <div id="speedrun-side">
        <ol id="speedrun-route"></ol>
        <div id="speedrun-checklists"></div>
      </div>
    </div>
  </div>
```

with:

```html
  <div id="speedrun-panel" class="panel">
    <div id="speedrun-toolbar">
      <p id="speedrun-hint">Click pins in the order you want to visit them. The route saves itself and comes back next time.</p>
      <button id="speedrun-layer-toggle" type="button">Surface</button>
      <button id="speedrun-clear" type="button" disabled>Clear route</button>
      <button id="speedrun-make-checklist" type="button" disabled>Generate checklist</button>
    </div>
    <div id="speedrun-body">
      <div id="speedrun-viewport">
        <div id="speedrun-canvas-wrap"></div>
      </div>
      <div id="speedrun-side">
        <ol id="speedrun-route"></ol>
        <div id="speedrun-checklists"></div>
      </div>
    </div>
    <div id="speedrun-legend"></div>
  </div>
```

- [ ] **Step 6: Typecheck**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\client"; npm run typecheck
```

- [ ] **Step 7: Commit**

```powershell
git -C "C:\Users\migue\Claude Code\QuestBot" add client/src/renderer/speedrun.ts client/src/renderer/popup.html
git -C "C:\Users\migue\Claude Code\QuestBot" commit -m "Give the Speedrun tab its own 22-category legend, drop roles.ts dependency"
```

---

### Task 7: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Confirm `roles.ts` is gone from both workspaces**

```powershell
Get-ChildItem -Recurse -Filter "roles.ts" "C:\Users\migue\Claude Code\QuestBot\web","C:\Users\migue\Claude Code\QuestBot\client"
```

Expected: no results.

- [ ] **Step 2: Typecheck both workspaces**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\web"; npm run typecheck
cd "C:\Users\migue\Claude Code\QuestBot\client"; npm run typecheck
```

Expected: both pass with zero errors (this is the first point every file in both workspaces compiles together against the finished `Category` type).

- [ ] **Step 3: Run both test suites**

```powershell
cd "C:\Users\migue\Claude Code\QuestBot\web"; npm test
cd "C:\Users\migue\Claude Code\QuestBot\client"; npm test
```

Expected: all existing tests still pass, including `client/test/speedrun-logic.test.ts` (unaffected — it only tests `toggleStop`/`removeStopAt`/route serialization, none of which changed).

- [ ] **Step 4: Live browser walkthrough (web)**

With the dev server running, in the Map tab:
- Toggle at least one category off/on in each of the 6 clusters and confirm the corresponding pins (where they exist) hide/show.
- Confirm the Waygates cluster's single pin (Renna's Rise) shows up correctly and is not sitting under Locations.
- Open the Shape Editor in Pin mode, create a pin, change its category via the new dropdown through a few different values, confirm the dot recolors each time and the change survives a page reload (persisted via `localStorage`).

- [ ] **Step 5: Commit any fixups**

If Step 2–4 surfaced anything, fix it and commit with a clear message describing what was wrong (not "fix bug").
