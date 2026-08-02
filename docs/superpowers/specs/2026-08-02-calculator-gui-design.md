# Weapon AR Calculator GUI — Design

## Context

The previous sub-project ported the real, MIT-licensed weapon attack-rating calculator into
`server/src/calculator/` — pure logic only, no GUI, no API endpoint, verified correct against
the live `eldenring.tclark.io` calculator. This is the "make it look nice" half of the original
instruction: give that logic a user-facing interface on the public web site.

**Scope: single-weapon lookup**, not a full ranked table of every weapon. Pick a weapon +
affinity + upgrade level, enter your five attributes, see that weapon's attack rating. Finding
"the best weapon for my build" across all ~480 weapons is a materially bigger feature
(sortable/filterable table UI) that's explicitly out of scope for this pass.

## Architecture

The web site (`web/`) is a fully static Astro site (`output: static` by default, deployed to
Vercel as static files) and is its own npm workspace, independent of `server`/`client`/`shared`.
It has no backend of its own, so the calculation has to run **client-side in the browser** —
there's no server to call. This mirrors the project's existing pattern: `web/src/map/*` is
itself a full copy of the Electron client's map code, ported into `web/` rather than shared
across workspaces (there's no cross-workspace build set up for it, and these are small, pure,
self-contained files).

- **`web/src/calculator/`** — a copy of the six pure files from `server/src/calculator/`
  (`attributes.ts`, `attackPowerTypes.ts`, `weaponTypes.ts`, `weapon.ts`, `calculator.ts`,
  `scaling-curve.ts`) plus a new `decode-weapon.ts` (the `decodeWeapon` half of
  `load-weapons.ts` — no `loadWeapons()`/`fetch()`, since the web copy reads its data from the
  vendored JSON below, not a live fetch). These are copied, not re-exported from `server`, per
  the precedent above.
- **`web/src/content/weapon-regulation-data.json`** — a vendored, one-time snapshot of the raw
  regulation data, trimmed to exactly what `RegulationData` needs (`calcCorrectGraphs` as their
  original 5-breakpoint form, `attackElementCorrects`, `reinforceTypes`, `scalingTiers`,
  `weapons`). Produced by a disposable ingestion script, same pattern as the enemy-stats/
  frame-data sub-projects: fetch once from the live source, write a committed static file, no
  runtime dependency on the third-party site in production. The live site itself ships this same
  ~1MB raw file directly to browsers today, so vendoring an equivalent copy is not a size
  regression against the thing we're matching.
- **`web/src/pages/elden-ring/calculator.astro`** — the page. At build time, Astro's frontmatter
  reads the vendored JSON (plain Node `import`/`fs`, same as any other build-time data in this
  site) to populate the weapon `<select>` with one entry per distinct `weaponName`,
  alphabetically sorted, flat (no category grouping — a native `<select>` with ~200 entries is
  usable as-is via browser type-ahead; grouping by weapon type is extra UI complexity this
  single-weapon lookup doesn't need). The full vendored JSON is also
  emitted as a `<script type="application/json">` block embedded in the page (not a separate
  fetch — the page needs the data immediately on load to compute anything, and ~1MB inline is
  the same payload either way without adding a round trip).
- **`web/src/calculator/ui.ts`** — the interactive glue, loaded as a client-side
  `<script type="module">` on the calculator page. Reads the embedded JSON once, then on any
  input change: filters to the selected weapon's available affinities, calls `decodeWeapon()` for
  the selected weapon+affinity, calls `getWeaponAttack()` with the current attributes/level/
  two-handing state, and renders the result. Pure DOM manipulation, no framework — matches
  `map/render.ts` and `enemies/search.ts`, the only precedent for client-side interactivity in
  this codebase.
- **`SubTabs.astro`** gains a fourth tab, `'calculator'`; `WikiLayout.astro`'s `active` prop union
  grows to include it.

## UI

- **Weapon** — `<select>`, one entry per distinct `weaponName` (not per affinity variant).
- **Affinity** — `<select>`, repopulated whenever the weapon changes, listing only the affinities
  that weapon actually has data for (most weapons: Standard/Heavy/Keen/Quality/.../Occult; a few
  — catalysts, seals, some uniques — only have one).
- **Upgrade level** — number input, 0–25 for regular weapons, 0–10 for somber (the reference
  site's own `+25/+10` distinction lives in `scalingTiers`/`reinforceTypeId`; the input's max is
  set from the selected weapon's own reinforcement table length, not hardcoded).
- **Strength / Dexterity / Intelligence / Faith / Arcane** — five number inputs, default 10 each.
- **Two-handing** — checkbox.
- **Output** — attack power for each damage type the weapon actually deals (only shown if
  nonzero — most weapons show Physical only), status buildup per type if any (Bleed/Poison/etc.),
  and a warning line naming any attribute whose requirement isn't met (mirroring
  `ineffectiveAttributes` from `getWeaponAttack()`'s result).

## Data flow

1. Build time: ingestion script (disposable, deleted after running once) fetches
   `https://eldenring.tclark.io/regulation-vanilla-v1.14.js`, writes the trimmed
   `web/src/content/weapon-regulation-data.json`.
2. Build time: `calculator.astro` reads that JSON to build the weapon `<select>` options and
   embeds the full JSON in the page.
3. Runtime (browser): `ui.ts` parses the embedded JSON once on page load. Every input change
   re-runs `decodeWeapon()` (cheap — one weapon's worth of interpolation) and `getWeaponAttack()`
   synchronously and updates the DOM. No network calls after the initial page load.

## Error handling

`decodeWeapon()` already throws loudly on an unresolvable `reinforceTypeId`/
`attackElementCorrectId`/`calcCorrectGraphId` reference (built into the ported loader). `ui.ts`
doesn't need its own defensive handling for that case — a thrown error here means the vendored
data is internally inconsistent, which is a bug to fix, not a user-facing condition to degrade
gracefully around.

## Testing

The calculation logic is already tested in `server/src/calculator/*.test.ts` and independently
verified against the live site — not re-tested here. What's new and needs its own tests:

- `decode-weapon.ts` in `web/src/calculator/` — same tests as `server`'s `load-weapons.test.ts`
  minus the `loadWeapons()`/`fetch()` half (that function isn't copied into `web/`).
- `ui.ts`'s pure logic split out into testable functions where practical (e.g. "given a weapon
  name and the vendored data, return its available affinities") — DOM-wiring itself is verified
  manually in the browser per this project's UI convention (no jsdom/testing-library in this
  codebase), not unit tested.

Manual verification: load the page, pick a weapon+affinity+level+stats already checked against
the live site during the previous sub-project (Uchigatana +25, 15 STR/40 DEX), confirm the GUI
shows the same 438 physical AR.
