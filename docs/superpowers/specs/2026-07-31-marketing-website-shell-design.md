# Marketing Website Shell — Design

## Context

While testing the live overlay, the player noticed answers referencing multiple items only
ever return one source link, and that the link's `questbot://guide/...` scheme goes nowhere —
it was always a placeholder, since the guide content only ever lived in the backend's Postgres
corpus, never as real, linkable web pages. That observation led to the real idea: a public
website for Questbot, with a download link and (eventually) real pages the source links could
point to.

That website is really three separable pieces:
1. **Site shell + download** — nav, a game-tab structure, and a working download link.
2. **Wiki** — turning the ~2166-item content corpus into real, browsable, linkable web pages.
3. **Web map** — a browser-viewable version of the interactive map currently only built into
   the Electron client.

Each is substantial enough to deserve its own spec → plan → build cycle. **This spec covers
#1, plus #3** — the web map turned out to be small enough to fold in once actually
investigated (see "Web map port" below): the map code
(`client/src/renderer/map/{regions,locations,render,geometry,roles}.ts`) has **zero**
Electron/IPC dependencies (`window.questbot`, `ipcRenderer` — none found), its one cross-file
dependency (favorites, from `library.ts`/`library-logic.ts`) persists via plain `localStorage`,
and `map.css` has no dependency on variables defined elsewhere. Its bootstrap entry point is
already a two-line file (`client/src/renderer/map.ts`: `import { initMap } from
'./map/render.js'; initMap();`). **The wiki remains deferred** — it's a genuinely different
kind of work (rendering ~2166 DB-backed content items as pages, not porting a
self-contained, already-portable module) and still gets its own future spec.

## Scope

**In scope:**
- A new Astro-based static website, deployed to Vercel.
- Site structure: header with game tabs (Elden Ring active; other slots shown disabled,
  "coming soon"), a Download button, and — when Elden Ring is selected — a second-level
  sub-tab row (Wiki | Map).
- **Map sub-tab: a real, working port of the existing interactive map** — regions, named
  locations, pan/zoom, search, and the favorites-star feature (a separate, browser-local
  `localStorage` list, unrelated to and unsynced with the Electron app's own favorites).
- **Wiki sub-tab: still a "Coming soon" placeholder** — deferred, see Context above.
- Producing a real, working packaged Windows installer for the Electron client (via the
  existing, never-yet-run `electron-builder` script) and publishing it as a GitHub Release
  asset in this repo.
- Wiring the Download button to that release asset's URL.

**Out of scope (deferred to future specs):**
- Real wiki content pages.
- Any game tab besides Elden Ring.
- A custom domain (Vercel's free `*.vercel.app` subdomain for now — adding a custom domain
  later is a simple settings change, no rework needed).
- Code-signing the installer (see Non-goals below).

## Architecture

A new `web/` workspace, added to this monorepo's root `package.json` `workspaces` array
alongside `server` and `client`. Astro, configured for static output, deployed to Vercel with
automatic deploys from this repo (exact trigger branch/config decided at plan time).

No backend or API for this phase — the site is pure static HTML/CSS/TS, with the map running
as client-side JS once loaded (Astro ships zero JS by default for the shell itself; the map
"island" is the one exception, loaded only on the Map sub-tab). This means no shared *runtime*
code with `server` — the map's TS source files are copied into `web/`, not imported live across
workspaces, so client-only changes don't silently break the website or vice versa (see "Web map
port" below for exactly which files and why copying, not a shared package, is the right call
here).

The installer binary is explicitly **not** part of the website's own build or repo tree size —
it's published separately as a GitHub Release asset (GitHub Releases has no meaningful size
limit for this and is built for versioned binary distribution), and the Download button is a
plain link to that asset's URL. This keeps the website deploy fast and avoids putting a
100+MB file through Vercel's static hosting.

## Components

- **Header**: "Questbot" wordmark, game-tab row (Elden Ring clickable/active; other slots
  rendered disabled with a "coming soon" label — exact future games not decided, just reserve
  the visual slot), Download button fixed in the header regardless of active tab.
- **Elden Ring tab**: selecting it reveals a second-level sub-tab row underneath the header —
  **Wiki** | **Map**. Wiki renders a simple "Coming soon" placeholder. Map renders the real,
  working ported map (see "Web map port" below).
- **Footer**: minimal — a link back to this GitHub repo is enough for now, nothing else needed
  at this scope.
- **Visual style**: dark + gold (`#c9a24b`), matching the existing tray icon (the only piece of
  visual identity that currently exists for this project) — dark parchment/obsidian palette,
  gold accent for active states and the Download button.

## Web map port

Verified before committing to this: `client/src/renderer/map/{regions,locations,render,
geometry,roles}.ts` have zero Electron/IPC dependencies (grepped for `window.questbot` and
`ipcRenderer` — no matches). The one cross-directory import (`render.ts` pulling
`isLocationFavorite`/`loadFavorites`/`toggleFavoriteStored` from `library.ts`/
`library-logic.ts`) resolves to plain `localStorage`, which works identically in any browser.
`map.css` has no dependency on CSS variables defined elsewhere. The bootstrap entry point is
already minimal: `client/src/renderer/map.ts` is just `import { initMap } from
'./map/render.js'; initMap();`.

**Approach:** copy (not symlink or shared-package-import) these files into `web/`:
`map/{regions,locations,render,geometry,roles}.ts`, `map.css`, and the relevant slice of
`library.ts`/`library-logic.ts` needed for favorites (or a trimmed-down equivalent, since the
website doesn't need Library-tab-specific code, only the favorites storage functions). Copying
rather than sharing a package keeps this phase simple — the website's map doesn't need to track
the Electron client's map byte-for-byte forever, and monorepo package-linking is unnecessary
complexity for a first version.

**Explicitly not ported:** the "Show on map" cross-tab integration (`focusLocationByName`
called from `popup.ts`/`library.ts` when a source card names a location) — that's specific to
the Electron app's own Ask/Library/Map tab structure and has no equivalent on a standalone
website page. The Speedrun tab and its route-building code are also not part of this port
(never mentioned in scope, no reason to include it).

## Packaging and release pipeline

This is new work this phase, not just website code — without it, the Download button has
nothing real to point to:

1. Run `client/package.json`'s existing `"package": "npm run build && electron-builder
   --publish=never"` script and verify it actually produces a working Windows installer (this
   has never been run/tested in this project before now).
2. Install and smoke-test the resulting installer on a real machine — confirm it installs
   cleanly and the app launches.
3. Publish the installer as a tagged GitHub Release in this repo (e.g. `v0.1.0`).
4. Point the website's Download button at that release asset's URL.

## Error handling

Minimal, given the static-site scope. The one real failure mode: if the GitHub Release or its
asset doesn't exist yet, or the URL is wrong, the Download button leads nowhere useful.
Mitigated by sequencing — the release must be published and its asset URL verified working
*before* the website's Download button is wired to it and deployed, not the other way around.

## Testing

No automated test framework is warranted for the site shell itself (static content, no business
logic). The ported map already has no test suite in the Electron client either (verified live
in-app instead, per this project's established pattern for the map feature) — same approach
here. Verification is:
- Local Astro build succeeds.
- Vercel preview deploy succeeds and renders correctly.
- Manual click-through: game tabs, sub-tabs, and the Download button.
- **Map sub-tab, tested live in a real deployed browser (not just Electron's embedded
  Chromium)**: regions and named locations render, pan/drag works, mouse-wheel zoom works,
  search-to-center works, the surface/underground toggle works, and the favorites star
  persists across a page reload (confirming `localStorage` works standalone, outside Electron).
- The Download link is explicitly tested to confirm it downloads a real, working installer,
  not just that the URL resolves.

## Non-goals

- **Code signing.** The installer will be unsigned (no code-signing certificate), so Windows
  SmartScreen will very likely show an "Unknown Publisher" warning on first run. This is common
  for indie/unsigned installers and isn't blocking, but is worth surfacing on the download page
  itself (a short note like "Windows may warn this is from an unknown publisher — that's
  expected for now") rather than letting a player think something's wrong.
- **A custom domain.** Deferred, not because it's hard, but because it's not needed to validate
  the site yet — the free Vercel subdomain is a normal, temporary starting point.
- **Wiki content.** Gets its own future spec/plan/build cycle — this phase only reserves its
  UI slot as a placeholder (the web map, by contrast, is real and working in this phase).
- **The "Show on map" cross-tab feature and the Speedrun tab.** Not part of the web map port
  (see "Web map port" above) — no equivalent context exists on a standalone website page.
- **Support for additional games.** The header reserves visual space for future game tabs, but
  no second game's content or logic is built here.
