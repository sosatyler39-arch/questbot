# Item Location Index — Design

## Context

Two problems surfaced while building out the item corpus (Talismans,
Incantations, Sorceries, Consumables, Ashes of War, Crystal Tears,
Whetstones, Great Runes — ~708 items total, see `README.md`):

1. **Weapons/Armor authoring throughput** — those corpora are large and each
   item needs an exact numeric stat block sourced from the user (per the
   `stats.ts` precedent: never scraped, never from model recall). This is a
   real problem, but it's independent of problem 2 and is deliberately
   **out of scope for this spec** — it gets its own future design.

2. **Missing location data** — none of the ~708 items already in the corpus
   have any "where do I find this" information. This spec addresses problem
   2 only. Once built, Weapons/Armor inherit the same mechanism for free
   when problem 1 is eventually solved.

Item *locations* are not precision-sensitive the way stat numbers are —
they're facts about the game world, not numbers that could break a build if
slightly off. The existing dungeon/chest/key-item pages
(`server/src/pipeline/sources/data/{dungeons-*,chests,key-items}.ts`) already
establish the precedent of authoring this kind of content from general game
knowledge, original phrasing, no scraping. This spec extends that same
policy to item locations — no user-supplied data needed for this pass.

## Data model

A new Postgres table, deliberately **separate from the existing
`chunks`/pgvector pipeline** — no chunking, no embedding, so this feature
costs zero embedding quota and isn't subject to the daily-quota problems hit
repeatedly while building the item corpus:

```sql
CREATE TABLE item_locations (
  item_name TEXT PRIMARY KEY,       -- must exactly match the item's heading
                                     -- in the corpus (e.g. "Radagon Icon")
  location_names TEXT[] NOT NULL,   -- 0+ names matching MapLocation.name in
                                     -- client/src/renderer/map/locations.ts
                                     -- ([] for vendor/crafting-only items)
  summary TEXT NOT NULL             -- e.g. "Sold by the Nomadic Merchant in
                                     -- Stormveil Castle" or "Dropped by
                                     -- Bloodhound Knight Floh"
);
```

**Coupling to the client's map data is intentionally loose**: `item_name` and
`location_names` are plain strings, matched by convention against the
client's `MapLocation.name` values — no shared package, no type-level
coupling. If a name drifts or doesn't match, the client-side lookup (see
below) just fails gracefully to a no-op; it does not error.

Authored the same way as the rest of the corpus: one small TS data file per
existing item category, mirroring the naming/shape of files like
`talismans.ts`:

```ts
export interface ItemLocationEntry {
  itemName: string;
  locationNames: string[];
  summary: string;
}
export const TALISMAN_LOCATIONS: ItemLocationEntry[] = [ /* ... */ ];
```

A plain upsert script (no `chunkArticle`/`embedText` involved) syncs these
into `item_locations`.

## Retrieval integration

No new intent-detection or NLP is needed — this piggybacks on the existing
pgvector retrieval that already runs for every `/ask`:

1. Vector search finds the top matching chunk as it does today (e.g. title
   `"Magic, skill, and FP talismans — Radagon Icon"`).
2. Only if that match clears the existing `CONFIDENCE_THRESHOLD` (0.6) —
   i.e., only enrich answers already confident enough to show — extract the
   item name from the chunk title (the substring after `" — "`).
3. Look up that name in `item_locations` (exact, case-insensitive match).
   Most non-item chunks (bosses, dungeons, mechanics pages) simply won't
   have a row — a harmless no-op, not an error path.
4. If found, fold `summary` into the LLM's synthesis context so the written
   answer can naturally mention where to get the item, and attach
   `location_names` to the `/ask` response as structured metadata alongside
   the existing source card.

`/ask`'s response type gains one new optional field: `locations?: string[]`.
Nothing else about the answer-synthesis flow changes.

## Client UX — "Show on map"

Grounded in what already exists in `client/src/renderer/`:

- `tabs.ts` currently does inline DOM class-toggling with no exported
  function. Add one export, `switchToTab(tabId: string)`, refactoring the
  existing click-handler to call it — no behavior change for the existing
  tab buttons.
- `map/render.ts` already has a private `centerOn(loc: MapLocation)` used by
  the map's own search box. Add a thin exported wrapper,
  `focusLocationByName(name: string): boolean`, that looks the name up in
  `MAP_LOCATIONS` and calls `centerOn` if found, returning whether it
  succeeded.
- In the Ask panel's answer rendering (`popup.ts`), when the `/ask` response
  includes `locations: string[]`, render one small "Show on map: `<name>`"
  button per name. On click: `switchToTab('map')`, then
  `focusLocationByName(name)`.

If a location name doesn't resolve to any `MapLocation.name` (drift, typo,
or a real location not yet on the map), `focusLocationByName` returns
`false` and the button is a no-op rather than a crash — the safety valve for
the loose string-coupling accepted above.

No new state management or cross-tab event bus — three small, surgical
additions to files that already do almost this exact job.

## Rollout plan

Targets only the item corpora that currently lack location data:

| Category | Items |
|---|---|
| Talismans | 155 |
| Incantations | 129 |
| Sorceries | 84 |
| Consumables | 196 |
| Ashes of War | 92 |
| Crystal Tears | 37 |
| Whetstones | 6 |
| Great Runes | 9 |
| **Total** | **708** |

Each category is independent of the others, so at implementation-plan time
this is a good candidate for the same category-by-category workflow already
used to build the item corpora itself, and possibly parallelizable across
subagents since e.g. "author Talisman locations" and "author Incantation
locations" don't depend on each other. The exact execution strategy
(sequential vs. parallel subagents) is left to the implementation plan, not
decided here.

## Non-goals

- **Weapons/Armor authoring throughput** — the separate problem set aside at
  the start of this brainstorm. Gets its own future design; inherits this
  mechanism for free once built.
- **New map cartography** — reuses the existing approximate `fx`/`fy`
  positions in `MAP_LOCATIONS` as-is; no new precision work.
- **Exhaustive drop-source enumeration** — every item still gets a fully
  researched, non-empty `summary` describing how it's actually obtained; no
  item is skipped or left blank. What's scoped out is *pinning a single map
  point* for items whose real source is diffuse (e.g. "dropped by various
  basic enemies," "sold by a merchant who relocates"). Those get an honest
  summary and an empty `location_names`, rather than a pin that overstates
  precision the item doesn't actually have.
- **Reverse lookup on the Map tab** ("click a pin, see what's found here")
  — a reasonable future idea, but out of scope; the entry point for this
  feature is asking the bot, not browsing the map.
