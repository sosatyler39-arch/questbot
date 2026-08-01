# Wiki Content Pages — Design

## Context

The marketing website's Elden Ring tab has a Map sub-tab (real, working — see
[2026-07-31-marketing-website-shell-design.md](2026-07-31-marketing-website-shell-design.md))
and a Wiki sub-tab that's still a "Coming soon" placeholder. This spec covers building the real
wiki.

This traces back to the original motivating observation: the Electron client's `/ask` answers
show source links using a `questbot://guide/...` placeholder URL scheme that goes nowhere — it
was always a placeholder, since the ~2166-item / 268-page content corpus only ever lived in the
backend's Postgres database, read by the server for retrieval, never rendered as real web pages.
The wiki is meant to give those links somewhere real to eventually point to.

**Explicitly out of scope for this pass** (both deliberately deferred, not silently dropped):
- Actually updating the `questbot://guide/...` placeholder URLs in `server/`'s source files to
  point at the new real wiki URLs. That's a separate, `server`-side change touching the live
  `/ask` response format — its own follow-up once the wiki itself exists to point at.
- Site-wide search across the wiki. Category-index browsing covers "browsable" for this pass;
  search can be added later, the same way the map's search wasn't needed before the map itself
  existed.

## Scope decisions from brainstorming

- **Content is duplicated into `web/`, not imported live from `server/`** at Astro build time,
  even though a live cross-workspace import was technically possible (Astro's build step runs
  in Node, the same environment as `server`) and would have avoided duplication entirely. The
  explicit choice here was independence between the two workspaces over avoiding sync cost.
- **No ongoing sync mechanism.** The duplication is a one-time copy for this build. Future
  content changes in `server/` (new categories, corrections) will need to be hand-applied to
  `web/`'s copy separately — an accepted, explicit tradeoff, not an oversight.
- **Astro Content Collections**, not plain TypeScript data + custom dynamic routes. Chosen
  despite the larger one-time conversion effort (~2166 items into a new format), for
  idiomatic-Astro type-checked schemas and built-in `getCollection()`/`getEntry()` APIs.
- **One page per individual item/section (2166 pages), not one page per existing
  category-grouping (268 pages with anchors).** Every weapon, armor piece, dungeon, spell, etc.
  gets its own fully separate page and URL — closer to a traditional wiki (one page per topic)
  than the current chunk-per-anchor model.
- **Category index pages for navigation** (not a single flat list + search): a three-level
  browse structure, described below.

## Content pipeline (one-time)

A disposable script (following this project's established one-off-script convention: write, run
once against real data, delete) imports `server/src/pipeline/sources/original-content.js`'s
`ALL_PAGES` export and walks every `ArticlePage`'s every `ArticleSection`. For each section, it
writes one Content Collection entry into `web/src/content/wiki/` with:

- `name` — the section heading (e.g. `"Uchigatana"`)
- `text` — the section body (the actual guide content)
- `category` — which of the 24 source categories this came from (e.g. `"weapon"`,
  `"incantation"`, `"dungeon"`), derived from which `*_PAGES` array (e.g. `WEAPON_PAGES`) the
  page came from
- `pageTitle` — the original page grouping this section belonged to (e.g. `"Katana"`)
- `pageSlug` — the existing page's own `url` field's *last* path segment, not a freshly-computed
  slug of `pageTitle`. Verified this works uniformly across the whole corpus despite one real
  inconsistency: most category files (e.g. `talismans.ts`) use a 2-segment placeholder scheme,
  `questbot://guide/{category}/{slug}` (e.g. `guide/weapon/katana`), but `original-content.ts`'s
  own `ORIGINAL_PAGES` (the earliest-authored dungeons/bosses/mechanics content) uses a simpler
  1-segment scheme, `questbot://guide/{slug}` — taking the last segment either way gives the
  right `pageSlug` regardless of which scheme a given page happens to use, with no special-casing
  needed
- `itemSlug` — a URL-safe slug of `name`

A `web/src/content.config.ts` Zod schema validates every entry against this shape at build time.

**Collision checking, done explicitly, not assumed:** with 2166 auto-generated slugs, a
collision (two different items landing on the same `category/pageSlug/itemSlug` triple) would
silently overwrite one page with another. The conversion script builds the full set of resulting
URLs first, checks for duplicates, and fails loudly (refusing to write anything) if any exist,
rather than writing over a collision silently. Note this project's existing item-collision
precedent (documented in the main `README.md`'s "Item location index" section) — same-named
items across categories (e.g. an incantation and an unrelated ash of war both named "Golden
Vow") are expected to exist, but the 3-level path structure here already disambiguates them by
construction (they live under different `category`/`pageSlug` prefixes), so this should surface
zero real collisions in practice — the check exists to catch a bug in the slugging logic itself,
not because collisions are otherwise expected.

## URL structure (3 levels)

- `/elden-ring/wiki` — top-level index: links to all 24 categories present in the data
- `/elden-ring/wiki/{category}` — e.g. `/elden-ring/wiki/weapon`: lists that category's original
  page-groupings (for weapons, the 42 weapon types; for a category that only ever had one
  `ArticlePage` to begin with, this level still exists structurally but has only one entry to
  list, rather than special-casing it away)
- `/elden-ring/wiki/{category}/{page}` — e.g. `/elden-ring/wiki/weapon/katana`: lists the
  individual items within that grouping
- `/elden-ring/wiki/{category}/{page}/{item}` — e.g. `/elden-ring/wiki/weapon/katana/uchigatana`:
  the actual content page, rendering `name` and `text`

This reuses the grouping already present in the source data — no reshaping of the content's
organization, just giving every existing chunk a real, individually-addressable destination.

## Architecture

Astro's `getStaticPaths()` is implemented three times, one per non-leaf/leaf route level below
`/elden-ring/wiki`:
- The category-list page calls `getCollection('wiki')` once and reduces it to the distinct set
  of `category` values present.
- Each category page calls `getCollection('wiki')`, filters by `category`, and reduces to the
  distinct set of `pageSlug` values within it.
- Each page-listing page filters further by `category` + `pageSlug` to list its items.
- Each item page is `getStaticPaths()` over the full collection, one path per entry, rendering
  that entry's `name` + `text` directly.

All of this happens at build time — no runtime queries, no client-side JS needed for the wiki
itself (consistent with the rest of the site shell, which ships zero JS by default outside the
Map sub-tab's island).

## Error handling

The Zod schema is the primary safety net: if the one-time conversion script ever produces a
malformed entry (missing `name`, empty `text`, a `category` that doesn't match anything
expected), Astro's build fails loudly at build time rather than shipping a broken or blank page
to production. The explicit slug-collision check (above) is a second, targeted safety net for
the one failure mode a schema alone can't catch — two different valid entries landing on the
same URL.

## Testing

No automated test framework for the page templates themselves — this matches the established
pattern for this site's static content (verified by building and spot-checking, same as the
site shell and the map port). The one-time conversion script gets a narrow, real test: given a
small, hand-written fixture shaped like `ALL_PAGES` (a couple of pages, a couple of sections
each, including one deliberately-colliding pair to confirm the collision check actually fires),
confirms the right entries are produced with the right slugs, and confirms the collision check
correctly rejects the deliberate collision case.

Verification beyond that unit test:
- A full local Astro build completes without error, confirming all ~2166 pages generate
  (`astro build` with no schema/collision failures is itself a strong signal, but also spot
  check the actual output file count matches the expected entry count).
- Live spot-check after deploying: navigate the three URL levels for at least one item from a
  large category (a weapon) and one from a small category (e.g. a Great Rune), confirming
  content renders correctly and every level's links lead to the right next level.
