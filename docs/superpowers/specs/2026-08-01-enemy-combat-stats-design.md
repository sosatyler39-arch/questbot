# Enemy/Boss Combat Stats — Design

## Context

This is sub-project #2 of the 4-part effort to fold community spreadsheets into Questbot (see
sub-project #1's spec, `2026-08-01-talisman-consumable-tear-audit-design.md`, for the full
decomposition). Unlike #1, which corrected/enriched existing prose, this introduces a genuinely
new kind of content: the existing corpus has zero numeric enemy stats today — every boss/enemy
entry (`great-enemies.ts`, `evergaols.ts`, dungeon boss sections) is narrative prose only
(Location/Strategy/Rewards), no stat tables.

## Data sources

Two sheets were provided; only one is used as the primary source, for reasons below.

**Primary: "ER - PvE Health/Defense/DmgNeg/Resistances/Drops/Flags"** (App Ver. 1.13 —
DLC-current). Verified directly: 9 relevant tabs — `NG`, `NG+`, `NG+2` through `NG+7` (8 stat
tabs), plus `Item Drops`. All 9 tabs are **row-aligned**: exactly 3,342 rows each, same enemy
placements in the same order, joined by a stable `ID` column present in every tab. Confirmed
by spot-checking `NG+7`'s header (identical 58-column structure to `NG`, just the location
column renamed) and `Item Drops`' first row (same `ID` "38001940" as `NG`'s first row). This
is every individual enemy *placement* in the game, not deduplicated by type — e.g. "Cleanrot
Knight (Sickle) [Boss]" appears once per location it's placed.

**Not used directly: "Additional info on PVE enemy stats"** (an "Elden Ring NPC Data Sheet",
App Version **1.05** — base-game only, predates Shadow of the Erdtree entirely). Its
`Boss_Data` tab has richer curated fields for ~158 named encounters (Region, Nearest Grace,
Only-Spawns-at-Night, multi-phase breakdowns) that the primary sheet's flatter per-placement
rows don't have as cleanly. But: it's older/less current, and its wide multi-phase-per-row
layout doesn't align with the primary sheet's schema. Given the primary sheet already covers
every enemy (including phase-transition bosses, tagged `[Boss]`) across all 8 NG cycles with
per-row location context, merging the two adds real complexity for limited gain. **Deferred,
not silently dropped** — a future pass could enrich the ~158 boss encounters with the second
sheet's Region/Grace/Night-only fields specifically.

**Also deferred from the primary sheet:** the `Flags/Other`, `dlcGameClearSpEffect`,
`MultiPlayCorrection`, and `ResistanceCorrectParam` tabs — these read as internal correction
factors the sheet's own formulas use internally, not final per-enemy display data.

## Scope

Every column from the primary sheet's `NG` through `NG+7` tabs, plus `Item Drops` — the user's
explicit choice of "everything, all NG cycles" over the smaller named-bosses-only option.
Concretely, per enemy placement, per NG cycle: Health, Defense (8 damage types), Damage
Negation (8 damage types), Resistances (7 status effects), Incoming Status Damage Multipliers
(4 statuses + HP Burn), Poise (base/incoming-multiplier/effective/regen-delay), per-body-part
damage multipliers (up to 8 parts + weak part + parts damage type), and item drops (up to 12
drop slots, each with base chance and discovery-scaling flag).

**Deduplication rule** (matching the user's literal instruction — "if the name and stats are
the exact same, skip it"): for each enemy (`ID`), walk NG → NG+7 in order and keep a row only
when its full stat block differs from the immediately preceding *stored* cycle for that same
enemy. An enemy whose stats never change after NG keeps exactly one row; an enemy that scales
differently at NG+3 and again at NG+6 gets three rows (NG, NG+3, NG+6), not eight.

## Architecture

**Why this can't become embedded prose chunks:** at this scale (thousands of enemy placements
× up to 8 cycles), embedding every row would mean real Gemini API cost for content that's
mostly irrelevant to semantic search — a player asking "how do I beat X" doesn't benefit from
20+ raw resistance percentages competing for relevance against actual guide prose. This is
structured reference data, not embedded content — the same category as `item_locations`
(separate Postgres table, no embedding, looked up by exact name after retrieval already
identifies which chunk is relevant).

**Storage — two outputs from one ingestion pass, mirroring the wiki's precedent** (static
content in `web/`, duplicated rather than live-imported from `server/`, per that spec's own
explicit "independence over sync cost" decision):

1. **A new `enemy_stats` table** (`server/db/schema.sql`), for `/ask`'s use:
   ```sql
   CREATE TABLE enemy_stats (
     id                       BIGSERIAL PRIMARY KEY,
     npc_id                   TEXT NOT NULL,
     name                     TEXT NOT NULL,
     ng_cycle                 TEXT NOT NULL, -- 'NG', 'NG+', ..., 'NG+7'
     location                 TEXT,
     health                   INT,
     defense                  JSONB NOT NULL, -- {phys, strike, slash, pierce, magic, fire, ltng, holy}
     damage_negation          JSONB NOT NULL, -- same 8 keys, percentages
     resistances              JSONB NOT NULL, -- {poison, scarlet_rot, bleed, frost, sleep, madness, deathblight}
     status_multipliers       JSONB NOT NULL, -- {bleed, frost, sleep, madness, hp_burn}
     poise                    JSONB NOT NULL, -- {base, incoming_mult, effective, regen_delay}
     part_damage_multipliers  JSONB NOT NULL, -- {parts: number[8], weakPart, partsDamageType}
     item_drops               JSONB NOT NULL, -- [{item, baseChancePercent, discoveryScaling}]
     UNIQUE (npc_id, ng_cycle)
   );
   CREATE INDEX enemy_stats_name_idx ON enemy_stats (lower(name));
   ```
   JSONB groups the ~50 raw columns into 7 logical fields rather than a 50+-column table —
   a deliberate deviation from `item_locations`' flat shape, justified by this dataset's much
   wider, naturally-grouped column count. Only the subset of enemies that already have prose
   in `great-enemies.ts`/`evergaols.ts`/dungeon files get wired into `/ask`: same mechanism as
   `item_locations` (extract the top chunk's name, look up in `enemy_stats` by
   `lower(name)`), folding one key resistance/weakness callout into synthesis — not a full
   stat dump. This is a small, surgical addition to `ask.ts`, not the bulk of this sub-project.

2. **Static JSON content for the website**, one file per unique `npc_id` (grouped across its
   NG-cycle rows), at `web/src/content/enemies/{npc_id}.json`, consumed by a new Astro Content
   Collection. New routes: `/elden-ring/enemies` (index with the same client-side search
   pattern as the wiki's `search.ts`/`search-index.json.ts`, searching by name) and
   `/elden-ring/enemies/{npc_id}` (detail page: a small per-cycle table showing only the
   cycles where something actually changed, plus item drops). This is genuinely new content
   the site didn't have before — unlike the wiki, there's no existing prose to link against.

**Live database note:** same as every other DB-touching piece of work this session — no
Postgres instance is running here, so the `enemy_stats` table and its population are
code-complete and tested but not applied live. The **website half is not blocked by this** and
gets actually built and deployed, matching how the wiki phase shipped its website half while
deferring the DB-facing half.

## Error handling

Row alignment across all 9 tabs is verified once at the start of ingestion (same `ID` at the
same row index in every tab) — if any tab's row count or ID-at-index doesn't match `NG`'s, the
script fails loudly rather than silently misaligning data. Any row with a missing/malformed
`ID` or `Name` is skipped and reported, not guessed at.

## Testing

A disposable script (write, run once, delete — this project's convention), TDD'd the same way
as sub-project #1's audit script: unit tests for the CSV parsing (already proven), the
per-enemy change-detection dedup logic (given a fixture with 3 synthetic cycles where only one
changes, confirms exactly 2 rows survive), and the JSON grouping-for-website logic. Real
verification beyond the unit tests:
- The script prints real counts (raw rows processed, deduped rows kept, unique enemies) —
  no number is asserted in the plan ahead of running it for real, since the true dedup ratio
  is only knowable by actually running it.
- `npm run typecheck -w server` and a full `astro build` both pass.
- Live spot-check on the deployed site: navigate to a well-known boss (e.g. Margit) and
  confirm its stats render, confirm search finds it, and confirm at least one enemy that
  scales across NG cycles shows multiple rows in its detail page.
