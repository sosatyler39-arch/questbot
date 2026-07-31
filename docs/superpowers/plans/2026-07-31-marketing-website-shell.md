# Marketing Website Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a live marketing website for Questbot — a dark/gold-themed site shell with an Elden Ring tab, a working ported map sub-tab, a "coming soon" wiki sub-tab, and a Download button wired to a real, published Windows installer.

**Architecture:** A new `web/` Astro workspace (static output, deployed to Vercel) added alongside `server`/`client` in this monorepo. The site shell is plain HTML/CSS with minimal vanilla JS for tab state. The map is a direct, adapted port of `client/src/renderer/map/*` (verified to have zero Electron/IPC dependencies) into `web/src/map/`. The installer is built via the existing, never-yet-run `electron-builder` script and published as a GitHub Release asset — the website never hosts the large binary itself.

**Tech Stack:** Astro (static site generator), vanilla TypeScript for the ported map and tab-switching, Vercel for hosting, GitHub Releases for the installer binary, `electron-builder` (already a client devDependency) for packaging.

## Global Constraints

- Dark + gold visual theme (`#c9a24b` accent), matching the existing tray icon — the only piece of visual identity that currently exists for this project.
- Layout: top-level game-tab row (Elden Ring active; other slots disabled/"coming soon"); selecting Elden Ring reveals a Wiki | Map sub-tab row underneath.
- Wiki sub-tab is a "Coming soon" placeholder this phase. Map sub-tab is real and working.
- The installer is unsigned — no code-signing certificate. Windows SmartScreen will likely warn "Unknown Publisher" on first run; this must be surfaced near the Download button, not hidden.
- No custom domain this phase — Vercel's free `*.vercel.app` subdomain.
- No backend/API for the website — pure static site plus the map's client-side JS.
- The map port is a copy, not a shared package — `web/` gets its own copies of the relevant files, not a live cross-workspace import.
- The "Show on map" cross-tab feature, the Speedrun tab, and the shape-editor (edit-mode) tooling are explicitly not ported.

---

## Task 1: Scaffold the Astro workspace

**Files:**
- Create: `web/` (new Astro project, scaffolded via `npm create astro@latest`)
- Modify: `package.json:4` (root) — add `"web"` to the `workspaces` array

**Interfaces:**
- Produces: a working `web` npm workspace with `npm run dev -w web` and `npm run build -w web` scripts, following Astro's standard project layout (`web/src/pages/`, `web/src/layouts/`, `web/astro.config.mjs`).

- [ ] **Step 1: Scaffold the Astro project**

From the repo root:

```bash
npm create astro@latest web -- --template minimal --typescript strict --no-install --no-git --yes
```

If this exact flag set has changed (Astro's CLI evolves), run `npm create astro@latest -- --help` first to check current flag names — the goal is: a minimal template, strict TypeScript, no auto-install (the monorepo root will install), no nested git repo (already inside this repo).

- [ ] **Step 2: Add the new workspace to the root package.json**

In `package.json` (repo root), find:

```json
  "workspaces": ["server", "client"],
```

Replace with:

```json
  "workspaces": ["server", "client", "web"],
```

- [ ] **Step 3: Install and verify**

From the repo root:

```bash
npm install
npm run dev -w web
```

Expected: Astro's dev server starts (typically `http://localhost:4321`), and the scaffolded minimal-template placeholder page loads without errors. Stop the dev server after confirming.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json web/
git commit -m "Scaffold web workspace (Astro, static site)"
```

---

## Task 2: Site shell — header, game tabs, dark/gold theme

**Files:**
- Create: `web/src/styles/theme.css`
- Create: `web/src/components/Header.astro`
- Modify: `web/src/pages/index.astro`

**Interfaces:**
- Produces: a `<Header />` component rendering the wordmark, game-tab row, and a Download button (href set to `#` for now — wired to a real URL in Task 7).
- Produces: CSS custom properties (`--bg`, `--bg-panel`, `--text`, `--accent`, `--border`) in `theme.css`, consumed by every component built in this and later tasks.

- [ ] **Step 1: Write the theme stylesheet**

Create `web/src/styles/theme.css`:

```css
:root {
  --bg: #15130f;
  --bg-panel: #1f1c15;
  --text: #d8cfae;
  --text-dim: #8a8168;
  --accent: #c9a24b;
  --border: #3a331f;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Georgia, 'Times New Roman', serif;
  min-height: 100vh;
}

a {
  color: var(--accent);
}

button {
  font-family: inherit;
  cursor: pointer;
}
```

- [ ] **Step 2: Write the header component**

Create `web/src/components/Header.astro`:

```astro
---
---
<header class="site-header">
  <span class="wordmark">Questbot</span>
  <nav class="game-tabs">
    <a href="/elden-ring" class="game-tab active">Elden Ring</a>
    <span class="game-tab disabled" title="Coming soon">Game 2</span>
    <span class="game-tab disabled" title="Coming soon">Game 3</span>
  </nav>
  <a href="#" class="download-button" id="download-button">Download</a>
</header>

<style>
  .site-header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 12px 20px;
    background: var(--bg-panel);
    border-bottom: 1px solid var(--border);
  }

  .wordmark {
    font-size: 1.3em;
    font-weight: bold;
    color: var(--accent);
  }

  .game-tabs {
    display: flex;
    gap: 16px;
    flex: 1;
  }

  .game-tab {
    padding: 6px 2px;
    text-decoration: none;
    color: var(--text);
    border-bottom: 2px solid transparent;
  }

  .game-tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .game-tab.disabled {
    color: var(--text-dim);
    cursor: default;
  }

  .download-button {
    padding: 8px 18px;
    background: var(--accent);
    color: var(--bg);
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
  }
</style>
```

- [ ] **Step 3: Wire the header into the homepage**

Replace the full contents of `web/src/pages/index.astro` with:

```astro
---
import Header from '../components/Header.astro';
import '../styles/theme.css';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Questbot</title>
  </head>
  <body>
    <Header />
    <main>
      <p style="padding: 40px; text-align: center; color: var(--text-dim);">
        Select a game above to get started.
      </p>
    </main>
  </body>
</html>
```

- [ ] **Step 4: Verify**

```bash
npm run dev -w web
```

Expected: the header renders with the "Questbot" wordmark, "Elden Ring" as an active gold-underlined tab, two disabled "Game 2"/"Game 3" slots, and a gold "Download" button. Dark background throughout.

- [ ] **Step 5: Commit**

```bash
git add web/src/styles/theme.css web/src/components/Header.astro web/src/pages/index.astro
git commit -m "Add site shell: header, game tabs, dark/gold theme"
```

---

## Task 3: Elden Ring page — Wiki/Map sub-tabs

**Files:**
- Create: `web/src/pages/elden-ring.astro`
- Create: `web/src/components/SubTabs.astro`

**Interfaces:**
- Consumes: `Header` from `../components/Header.astro` (Task 2), `theme.css` (Task 2).
- Produces: a page at `/elden-ring` with a Wiki | Map sub-tab row; Wiki shows a "Coming soon" placeholder; Map shows a placeholder container (`<div id="map-root">`) that Task 4/5 will populate with the real ported map.

- [ ] **Step 1: Write the sub-tabs component**

Create `web/src/components/SubTabs.astro`:

```astro
---
interface Props {
  active: 'wiki' | 'map';
}
const { active } = Astro.props;
---
<nav class="sub-tabs">
  <a href="/elden-ring?tab=wiki" class:list={['sub-tab', { active: active === 'wiki' }]}>Wiki</a>
  <a href="/elden-ring?tab=map" class:list={['sub-tab', { active: active === 'map' }]}>Map</a>
</nav>

<style>
  .sub-tabs {
    display: flex;
    gap: 8px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--border);
  }

  .sub-tab {
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--text-dim);
  }

  .sub-tab.active {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
```

- [ ] **Step 2: Write the Elden Ring page**

Create `web/src/pages/elden-ring.astro`:

```astro
---
import Header from '../components/Header.astro';
import SubTabs from '../components/SubTabs.astro';
import '../styles/theme.css';

const tab = Astro.url.searchParams.get('tab') === 'map' ? 'map' : 'wiki';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Questbot — Elden Ring</title>
  </head>
  <body>
    <Header />
    <SubTabs active={tab} />
    <main>
      {tab === 'wiki' && (
        <p style="padding: 40px; text-align: center; color: var(--text-dim);">
          Wiki coming soon.
        </p>
      )}
      {tab === 'map' && <div id="map-root"></div>}
    </main>
  </body>
</html>
```

- [ ] **Step 3: Verify**

```bash
npm run dev -w web
```

Visit `/elden-ring` (defaults to Wiki, shows "Wiki coming soon") and `/elden-ring?tab=map` (shows an empty page — the map itself is built in Task 4/5). Confirm clicking between Wiki/Map sub-tabs navigates correctly and highlights the active one in gold.

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/elden-ring.astro web/src/components/SubTabs.astro
git commit -m "Add Elden Ring page with Wiki/Map sub-tabs"
```

---

## Task 4: Port the map code into web/

**Files:**
- Create: `web/src/map/regions.ts` (copied from `client/src/renderer/map/regions.ts`, unmodified)
- Create: `web/src/map/locations.ts` (copied from `client/src/renderer/map/locations.ts`, unmodified)
- Create: `web/src/map/geometry.ts` (copied from `client/src/renderer/map/geometry.ts`, unmodified)
- Create: `web/src/map/roles.ts` (copied from `client/src/renderer/map/roles.ts`, unmodified)
- Create: `web/src/map/render.ts` (adapted copy of `client/src/renderer/map/render.ts` — see Step 3)
- Create: `web/src/map/favorites-logic.ts` (trimmed copy of `client/src/renderer/library-logic.ts`)
- Create: `web/src/map/favorites.ts` (trimmed copy of `client/src/renderer/library.ts`)
- Create: `web/src/styles/map.css` (copied from `client/src/renderer/map.css`, unmodified)

**Interfaces:**
- Produces: `initMap(): void` (exported from `web/src/map/render.ts`), which — given the correct DOM structure exists (Task 5) — renders the map and wires up pan/zoom/search/layer-toggle/filters/legend/favorites/hover behavior.
- Consumes: nothing from earlier tasks in this file set; Task 5 consumes `initMap` from here.

- [ ] **Step 1: Copy the four dependency-free files verbatim**

```bash
mkdir -p web/src/map
cp client/src/renderer/map/regions.ts web/src/map/regions.ts
cp client/src/renderer/map/locations.ts web/src/map/locations.ts
cp client/src/renderer/map/geometry.ts web/src/map/geometry.ts
cp client/src/renderer/map/roles.ts web/src/map/roles.ts
cp client/src/renderer/map.css web/src/styles/map.css
```

These four `.ts` files have zero Electron/IPC dependencies (verified during design) and need no changes.

- [ ] **Step 2: Write the trimmed favorites files**

The client's `library.ts`/`library-logic.ts` handle both answer-favoriting and location-favoriting, with DOM rendering side effects the website doesn't need. The map only ever needs location-favoriting. Create `web/src/map/favorites-logic.ts`:

```ts
// Trimmed copy of client/src/renderer/library-logic.ts's location-favoriting
// slice only — the website has no Ask tab, so answer-favoriting and
// history don't apply here. Pure logic, DOM-free, same as the original.

export interface FavoriteLocation {
  kind: 'location';
  name: string;
  createdAt: number;
}

export type Favorite = FavoriteLocation;

function favoriteKey(fav: Favorite): string {
  return `location:${fav.name}`;
}

// Toggle semantics: adding an already-favorited item removes it. Newest
// first, since the list would render top-down if a favorites list UI is
// ever added to the website.
export function toggleFavorite(favorites: Favorite[], fav: Favorite): Favorite[] {
  const key = favoriteKey(fav);
  const without = favorites.filter((f) => favoriteKey(f) !== key);
  return without.length === favorites.length ? [fav, ...favorites] : without;
}

export function isLocationFavorite(favorites: Favorite[], name: string): boolean {
  return favorites.some((f) => f.name === name);
}
```

Create `web/src/map/favorites.ts`:

```ts
// Trimmed copy of client/src/renderer/library.ts's storage wrapper — the
// original also calls renderLibrary() after every toggle, which is
// specific to the Electron app's Library tab and doesn't exist here.
import { type Favorite, toggleFavorite } from './favorites-logic.js';

const FAVORITES_KEY = 'questbot_favorites';

export function loadFavorites(): Favorite[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as Favorite[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteStored(fav: Favorite): Favorite[] {
  const updated = toggleFavorite(loadFavorites(), fav);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
```

- [ ] **Step 3: Copy and adapt render.ts**

```bash
cp client/src/renderer/map/render.ts web/src/map/render.ts
```

Then make exactly these three edits to `web/src/map/render.ts`:

**Edit 1** — change the favorites imports (originally pointing at the client's Ask-tab-coupled `library.ts`/`library-logic.ts`) to the trimmed local versions:

Find:
```ts
import { isLocationFavorite } from '../library-logic.js';
import { loadFavorites, toggleFavoriteStored } from '../library.js';
```

Replace with:
```ts
import { isLocationFavorite } from './favorites-logic.js';
import { loadFavorites, toggleFavoriteStored } from './favorites.js';
```

**Edit 2** — remove the four module-level DOM lookups for shape-editor-only elements (these use non-null assertions and would throw immediately on module load, since the website's map page has no shape-editor UI — that tool is for building the map's own location data, not for site visitors):

Find:
```ts
const editToggle = document.getElementById('map-edit-toggle') as HTMLButtonElement;
const editPanel = document.getElementById('map-edit-panel')!;
const editOutput = document.getElementById('map-edit-output') as HTMLTextAreaElement;
const editCopy = document.getElementById('map-edit-copy') as HTMLButtonElement;
```

Delete these four lines entirely.

**Edit 3** — the `initEditMode()` function wires up the (now-removed) edit-mode buttons, but also contains a genuinely useful, edit-mode-independent safety net (clearing stray pin-hover clones if focus leaves the window). Split those apart:

Find:
```ts
function initEditMode(): void {
  editToggle.addEventListener('click', () => {
    editMode = !editMode;
    editToggle.classList.toggle('active', editMode);
    editPanel.hidden = !editMode;
    wrap.classList.toggle('edit-mode', editMode);
  });
  editCopy.addEventListener('click', () => {
    void navigator.clipboard?.writeText(editOutput.value);
  });
  // Safety net: if focus leaves the window mid-hover (e.g. alt-tab), any
  // stray hover clones would otherwise linger until the next layer render.
  window.addEventListener('blur', () => {
    document.getElementById('front-layer')?.replaceChildren();
  });
}
```

Replace with:
```ts
// Shape-editor UI (edit-mode toggle, position-copy panel) is a dev tool
// for building this map's own location data — not present on the public
// website, so its DOM-dependent handlers aren't wired here. `editMode`
// itself stays declared (defaults to false, never toggled) so the
// existing `if (editMode)` guards elsewhere in this file keep working
// unchanged.
function initHoverSafetyNet(): void {
  // Safety net: if focus leaves the window mid-hover (e.g. alt-tab), any
  // stray hover clones would otherwise linger until the next layer render.
  window.addEventListener('blur', () => {
    document.getElementById('front-layer')?.replaceChildren();
  });
}
```

Then find the `initMap()` function:
```ts
export function initMap(): void {
  renderLayer();
  initPanZoom();
  initSearch();
  initLayerToggle();
  initFilters();
  initLegend();
  initEditMode();
}
```

Replace the `initEditMode();` line with `initHoverSafetyNet();`:
```ts
export function initMap(): void {
  renderLayer();
  initPanZoom();
  initSearch();
  initLayerToggle();
  initFilters();
  initLegend();
  initHoverSafetyNet();
}
```

- [ ] **Step 4: Typecheck**

```bash
cd web && npx astro check
```

Expected: clean, no type errors. (If `astro check` isn't set up yet, run `npx tsc --noEmit -p .` from `web/` instead — either confirms the ported/adapted TypeScript compiles.)

- [ ] **Step 5: Commit**

```bash
git add web/src/map/ web/src/styles/map.css
git commit -m "Port map code into web/ (dropping shape-editor dev tooling)"
```

---

## Task 5: Wire the map into the Map sub-tab

**Files:**
- Modify: `web/src/pages/elden-ring.astro`

**Interfaces:**
- Consumes: `initMap` from `../map/render.js` (Task 4), `map.css` (Task 4).
- Produces: a fully interactive map rendered inside `#map-root` when the Map sub-tab is active.

- [ ] **Step 1: Add the map's DOM structure and bootstrap script**

The ported `render.ts` expects a specific set of element IDs to exist (`map-search`, `map-search-results`, `filter-locations`, `filter-bosses`, `map-layer-toggle`, `map-viewport` > `map-canvas-wrap`, `map-legend`) — this is the same structure `client/src/renderer/popup.html` uses, minus the shape-editor elements dropped in Task 4.

Replace the `{tab === 'map' && <div id="map-root"></div>}` line in `web/src/pages/elden-ring.astro` with:

```astro
      {tab === 'map' && (
        <div id="map-root">
          <div id="map-toolbar">
            <input id="map-search" type="text" placeholder="Search locations…" autocomplete="off" />
            <div id="map-search-results"></div>
            <label id="filter-locations-label"><input id="filter-locations" type="checkbox" checked /> Locations</label>
            <label id="filter-bosses-label" title="Currently: Evergaols + open-world Great Enemies.">
              <input id="filter-bosses" type="checkbox" checked /> Bosses
            </label>
            <button id="map-layer-toggle" type="button">Surface</button>
          </div>
          <div id="map-viewport">
            <div id="map-canvas-wrap"></div>
          </div>
          <div id="map-legend"></div>
        </div>
      )}
```

And add the map's stylesheet plus its bootstrap script to the page's frontmatter/head. Full updated `web/src/pages/elden-ring.astro`:

```astro
---
import Header from '../components/Header.astro';
import SubTabs from '../components/SubTabs.astro';
import '../styles/theme.css';

const tab = Astro.url.searchParams.get('tab') === 'map' ? 'map' : 'wiki';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Questbot — Elden Ring</title>
    {tab === 'map' && <link rel="stylesheet" href="/map.css" />}
  </head>
  <body>
    <Header />
    <SubTabs active={tab} />
    <main>
      {tab === 'wiki' && (
        <p style="padding: 40px; text-align: center; color: var(--text-dim);">
          Wiki coming soon.
        </p>
      )}
      {tab === 'map' && (
        <div id="map-root">
          <div id="map-toolbar">
            <input id="map-search" type="text" placeholder="Search locations…" autocomplete="off" />
            <div id="map-search-results"></div>
            <label id="filter-locations-label"><input id="filter-locations" type="checkbox" checked /> Locations</label>
            <label id="filter-bosses-label" title="Currently: Evergaols + open-world Great Enemies.">
              <input id="filter-bosses" type="checkbox" checked /> Bosses
            </label>
            <button id="map-layer-toggle" type="button">Surface</button>
          </div>
          <div id="map-viewport">
            <div id="map-canvas-wrap"></div>
          </div>
          <div id="map-legend"></div>
        </div>
      )}
    </main>
    {tab === 'map' && (
      <script>
        import { initMap } from '../map/render.js';
        initMap();
      </script>
    )}
  </body>
</html>
```

Note: `web/src/styles/map.css` needs to be reachable at the public URL `/map.css` referenced above — copy it into `web/public/map.css` as well (Astro serves `public/` files at the site root unchanged):

```bash
cp web/src/styles/map.css web/public/map.css
```

- [ ] **Step 2: Verify locally**

```bash
npm run dev -w web
```

Visit `/elden-ring?tab=map`. Expected: the map renders (surface regions, named location pins), pan by dragging works, mouse-wheel zoom works, typing in the search box shows matching results and clicking one centers the map, the Locations/Bosses filter checkboxes toggle pin visibility, the Surface/Underground layer toggle switches layers, hovering a pin enlarges/bolds it, and clicking a pin's star (favorite) toggles it — reload the page and confirm the favorited state persists (via `localStorage`).

- [ ] **Step 3: Typecheck**

```bash
cd web && npx astro check
```

Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/elden-ring.astro web/public/map.css
git commit -m "Wire the ported map into the Map sub-tab"
```

---

## Task 6: Package and publish the Windows installer

**Files:**
- None created/modified — this task runs existing tooling and publishes its output.

**Interfaces:**
- Produces: a tagged GitHub Release in this repo with a Windows installer `.exe` asset attached, whose download URL Task 7 consumes.

- [ ] **Step 1: Run the existing packaging script**

```bash
npm run package -w client
```

This runs `client/package.json`'s `"package": "npm run build && electron-builder --publish=never"` script — never actually executed in this project before now. Expected: after the build completes, `electron-builder` produces an installer under `client/dist_electron/` or `client/release/` (exact output directory depends on `electron-builder`'s default config — check the command's own output log for the exact path it prints).

If this fails, read the error carefully before troubleshooting — `electron-builder` has real prerequisites (e.g. it may need `client/package.json`'s `build` config section fleshed out with an `appId`/`productName`/target if not already present). Check `client/package.json` for an existing `"build"` key first; if minimal or missing, that's the fix, not a code change elsewhere.

- [ ] **Step 2: Smoke-test the installer**

Run the produced `.exe` on a real Windows machine. Confirm: it installs without error, creates a Start Menu / desktop shortcut (per whatever electron-builder's default NSIS config produces), and the installed app launches and shows the popup on the configured hotkey.

- [ ] **Step 3: Publish as a GitHub Release**

```bash
gh release create v0.1.0 <path-to-installer.exe> --title "Questbot v0.1.0" --notes "First public build."
```

Expected: `gh` prints the release URL. Note the exact asset download URL — `gh release view v0.1.0 --json assets` shows each asset's `url` field — Task 7 needs this exact URL.

- [ ] **Step 4: No commit needed**

Nothing in the repo changes in this task — the installer and release live on GitHub, not in this branch's tree.

---

## Task 7: Wire the Download button and deploy

**Files:**
- Modify: `web/src/components/Header.astro`

**Interfaces:**
- Consumes: the GitHub Release asset URL from Task 6.

- [ ] **Step 1: Wire the real download URL**

In `web/src/components/Header.astro`, find:

```astro
  <a href="#" class="download-button" id="download-button">Download</a>
```

Replace `href="#"` with the exact asset URL from Task 6, Step 3 (e.g.
`https://github.com/<org>/<repo>/releases/download/v0.1.0/Questbot-Setup-0.1.0.exe` — substitute the real filename `gh release view` printed).

- [ ] **Step 2: Add the SmartScreen warning note**

Directly below the `<Header />` usage in `web/src/pages/index.astro` and `web/src/pages/elden-ring.astro`, nothing is required structurally, but add a short note near the Download button itself. In `Header.astro`, right after the download link, add:

```astro
  <span class="download-note" title="This installer isn't code-signed yet — Windows may show an Unknown Publisher warning. Click 'More info' → 'Run anyway' to proceed.">ⓘ</span>
```

And in the `<style>` block:

```css
  .download-note {
    color: var(--text-dim);
    cursor: help;
    font-size: 0.85em;
  }
```

- [ ] **Step 3: Verify the full flow locally**

```bash
npm run dev -w web
```

Click the Download button — confirm it navigates to the real GitHub Release asset URL and the browser begins downloading the actual installer file (not a 404).

- [ ] **Step 4: Deploy to Vercel**

Follow the `deploy-to-vercel` skill/tooling available in this environment to connect this repo's `web/` directory as a Vercel project and deploy it. Confirm the resulting `*.vercel.app` URL loads the homepage, the Elden Ring page, both sub-tabs, and that the Download button still points to the correct GitHub Release asset from the deployed site (not a broken relative path).

- [ ] **Step 5: Commit**

```bash
git add web/src/components/Header.astro
git commit -m "Wire Download button to the published installer, add SmartScreen note"
```

---

## Final check

After Task 7, do a full click-through on the live Vercel URL: homepage loads, Elden Ring tab is reachable, Wiki shows "Coming soon," Map is fully interactive (pan/zoom/search/filter/layer-toggle/favorites-persist-on-reload), and the Download button downloads a real, working installer. Update `README.md` with a short "Website" section documenting the live URL, following the same documentation style used for every other feature in this project (what's real, what's verified, what's deferred).
