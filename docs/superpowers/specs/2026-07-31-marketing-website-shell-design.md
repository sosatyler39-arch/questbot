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
only #1**, chosen first since it's the smallest and gets something real and live fastest. Wiki
and web map are explicitly out of scope here and will each get their own brainstorm later.

## Scope

**In scope:**
- A new Astro-based static website, deployed to Vercel.
- Site structure: header with game tabs (Elden Ring active; other slots shown disabled,
  "coming soon"), a Download button, and — when Elden Ring is selected — a second-level
  sub-tab row (Wiki | Map), each showing a "Coming soon" placeholder for now.
- Producing a real, working packaged Windows installer for the Electron client (via the
  existing, never-yet-run `electron-builder` script) and publishing it as a GitHub Release
  asset in this repo.
- Wiring the Download button to that release asset's URL.

**Out of scope (deferred to future specs):**
- Real wiki content pages.
- The web map.
- Any game tab besides Elden Ring.
- A custom domain (Vercel's free `*.vercel.app` subdomain for now — adding a custom domain
  later is a simple settings change, no rework needed).
- Code-signing the installer (see Non-goals below).

## Architecture

A new `web/` workspace, added to this monorepo's root `package.json` `workspaces` array
alongside `server` and `client`. Astro, configured for static output, deployed to Vercel with
automatic deploys from this repo (exact trigger branch/config decided at plan time).

No backend or API for this phase — the site is pure static HTML/CSS with minimal vanilla
JS for tab-switching state (no framework runtime needed client-side; Astro ships zero JS by
default and this doesn't need more). This also means no shared code with `server`/`client` yet
in this phase — that only becomes relevant once the wiki (phase 2) needs to read the same
content, or the map (phase 3) needs to reuse `client/src/renderer/map/*`.

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
  **Wiki** | **Map**. Both render a simple "Coming soon" placeholder in this phase.
- **Footer**: minimal — a link back to this GitHub repo is enough for now, nothing else needed
  at this scope.
- **Visual style**: dark + gold (`#c9a24b`), matching the existing tray icon (the only piece of
  visual identity that currently exists for this project) — dark parchment/obsidian palette,
  gold accent for active states and the Download button.

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

No automated test framework is warranted at this scope (a static content site with no business
logic). Verification is:
- Local Astro build succeeds.
- Vercel preview deploy succeeds and renders correctly.
- Manual click-through: game tabs, sub-tabs, and the Download button.
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
- **Wiki and web map content.** Both get their own future spec/plan/build cycle. This phase
  only reserves their UI slots as placeholders.
- **Support for additional games.** The header reserves visual space for future game tabs, but
  no second game's content or logic is built here.
