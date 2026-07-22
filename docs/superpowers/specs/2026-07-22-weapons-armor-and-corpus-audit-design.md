# Weapons/Armor Corpus + Full Item-Data Audit — Design

## Context

Last of the four work items from this session's original brainstorm (overlay
indicator, DB backup, Gemini provider, Weapons/Armor content) — the other
three are done. The prior item-location-index spec explicitly deferred
"Weapons/Armor authoring throughput" as its own future problem, since those
corpora need exact numeric stat blocks (AR/scaling/requirements for weapons,
defense/resistances/weight for armor) at a much larger scale (~300+ weapons,
~300+ armor pieces) than anything authored so far (largest existing category:
Consumables, 196 items) — the project's policy has always been that these
numbers are **supplied directly, never scraped, never from model recall**
(same rule as `stats.ts`/`talismans.ts`).

Chosen resolution: **ERDB** (`EldenRingDatabase/erdb`, MIT-licensed) extracts
item data directly from Elden Ring's own game files (`regulation.bin`, via
Yabber/ERExporter) — not copied from any wiki's writing, a legitimately
different category from the Fextralife/Fandom scraping this project has
already rejected. Verified live during brainstorming:
- MIT license, actively-ish maintained (latest release v0.4.0, July 2023).
- **Does not cover Shadow of the Erdtree** (DLC needs game version 1.12+;
  ERDB's data tops out at 1.10.0) — base game only. DLC weapons/armor are
  explicitly deferred to a future pass once a DLC-covering source exists.
- Requires unpacking the local Elden Ring install (via WitchyBND) and running
  `erdb source --game-dir ...` + `erdb generate <tables> --out ...` — both
  read-only against the install, output to a separate folder.
- Real blocker found and being resolved at plan time: `erdb`'s `htmlmin`
  dependency imports the `cgi` stdlib module, removed in Python 3.13+ (this
  machine runs 3.14.6) — fix is a `legacy-cgi` backport package in an
  isolated venv, or a dedicated older-Python venv if that doesn't hold.
- Table coverage confirmed via the repo's own source tree
  (`src/erdb/table/`): `armaments`, `armor`, `ashes_of_war`, `spells`,
  `talismans`, `tools` — this covers not just Weapons/Armor but every
  existing item corpus's underlying data too (see Audit section below).

**Mid-brainstorm scope addition:** with ERDB confirmed to cover the existing
item categories as well, the user asked to also **audit everything already
authored** (Talismans, Incantations, Sorceries, Consumables, Ashes of War,
Crystal Tears, Whetstones, Great Runes — ~708 items) against ERDB: keep
correct entries untouched, replace incorrect numbers, add genuinely new
fields ERDB surfaces that aren't currently captured. Explicitly **out of
scope for the audit**: the "general information" pages (dungeons, churches,
chests, key items, questlines, mechanics-*, starting-classes, great-enemies,
evergaols) — none of these are ERDB-sourced item stat data, and the
`*-locations.ts` files (location data was never precision-sensitive and
isn't derived from ERDB either way).

## Scope

**In scope:**
1. Full base-game Weapons corpus (`weapons.ts`) — one section per weapon,
   AR per damage type + scaling letters + stat requirements + weight +
   innate skill, sourced from ERDB's `armaments` table.
2. Full base-game Armor corpus (`armor.ts`) — one section per piece,
   physical/magic/fire/lightning/holy defense + resistances (poise,
   robustness, immunity, focus, vitality) + weight, sourced from ERDB's
   `armor` table.
3. Weapons/Armor location data (`weapons-locations.ts`, `armor-locations.ts`)
   — authored the same way as the other 8 categories' location files:
   general game knowledge, original phrasing, no scraping, not
   ERDB-derived (locations aren't in ERDB's data at all — it's stat params,
   not open-world placement).
4. **Audit pass** over the 8 existing item-content files (not their
   `-locations.ts` counterparts) against ERDB's `talismans`, `spells`
   (incantations + sorceries), `tools` (consumables, crystal tears,
   whetstones), and `ashes_of_war` tables:
   - Base-game entries: cross-check every existing exact number against
     ERDB's corresponding field. Match → leave untouched. Mismatch →
     replace with ERDB's value. ERDB has a relevant field not currently
     captured → add it.
   - `[SOTE]`-tagged (DLC) entries: **not verifiable** against ERDB (predates
     the DLC) — explicitly skipped, left untouched, logged as unverified
     rather than silently passed.
   - Great Runes are boss/location pairings, not numeric stats — ERDB has no
     bearing on them; excluded from the audit entirely (already correct by
     construction, not a numbers problem).
   - Item-name matching between ERDB's internal names and this project's
     authored headings (e.g. "+1"/"+2" upgrade tiers, punctuation) needs
     normalization, not assumed to be an exact string match — a mismatch on
     name lookup is logged as unmatched, never silently treated as
     "correct" or dropped.
5. An audit log (written to the repo, not just console output) recording
   every item checked and the outcome: unchanged / corrected (old value →
   new value) / new-field-added / unverified (DLC).
6. Wiring: audited/corrected content + the two new corpora flow through the
   existing `syncGame` pipeline and `upsertItemLocations`, same mechanism
   already built for every prior category.
7. Live verification: same pattern as every previous category in this
   project — real `/ask` queries against the real DB, confidence scores
   reported.

**Out of scope (this pass):**
- Shadow of the Erdtree weapons, armor, or any DLC corrections to existing
  categories — ERDB can't verify DLC content; deferred until a DLC-covering
  source is found.
- The "general information" pages (dungeons, churches, chests, key items,
  questlines, mechanics-*, starting-classes, great-enemies, evergaols) —
  not item stat data, not touched by the audit.
- Re-authoring or restructuring the `*-locations.ts` files for the 8
  existing categories — those are unaffected by this audit.

## Pipeline

1. **Extraction (one-time, disposable tooling):** Fix the `erdb` Python
   3.14 compatibility issue (venv + `legacy-cgi`, or a dedicated older-Python
   venv as fallback). Unpack the local Elden Ring install with WitchyBND.
   Run `erdb source --game-dir ...` then
   `erdb generate armaments armor talismans spells tools ashes_of_war --out ...`
   to produce raw JSON for every table needed by both the new corpora and
   the audit.
2. **Weapons/Armor authoring (disposable conversion script):** Map ERDB's
   `armaments`/`armor` JSON into `weapons.ts`/`armor.ts`, following
   `talismans.ts`'s existing `ArticlePage[]` shape and precision
   conventions (exact numbers, one section per item/piece).
3. **Weapons/Armor locations (authored directly, no script):**
   `weapons-locations.ts`/`armor-locations.ts`, `ItemLocationEntry[]`,
   following the exact pattern of `talismans-locations.ts` etc.
4. **Audit (disposable script):** For each of the 8 existing categories,
   parse the corresponding ERDB table, match items by name against the
   existing authored file, diff every numeric/effect field, apply
   corrections/additions in place, skip and log `[SOTE]` entries and Great
   Runes. Writes the audit log alongside the changes.
5. **Wire + sync:** confirm `sync.ts` picks up `weapons.ts`/`armor.ts` and
   `upsertItemLocations` picks up the two new location files; re-run
   `syncGame('elden-ring')`.
6. **Verify live:** real `/ask` queries for a sample of new and
   audit-corrected items, confidence scores recorded, same as every prior
   category's README entry.

## Testing

- Typecheck after each new/modified `.ts` source file, same convention as
  every prior category.
- The audit script's diff logic gets a small unit test (real ERDB sample
  data in, known existing entry in, assert the right outcome: unchanged /
  corrected / new-field / skipped-DLC).
- Live retrieval spot-checks post-sync, same pattern as every prior
  category's README verification.
