# Great Enemy Position Extraction — Design Spec

**Stage:** 5th stage of the real-coordinate location pipeline (follows Sites of Grace extraction → world-space unification → location matching → per-region calibration).

## Goal

Extract real in-game positions for the `great-enemy` category (open-field "Great Enemies" — dragons, giants, wyrms, etc. tracked in the game's own Great Enemies codex) so they can be calibrated the same way Sites of Grace were, instead of remaining hand-placed schematic guesses.

Scope: **19 of the 24 `great-enemy` entries** in `web/src/map/locations.ts` — the ones on `layer: 'surface'`. The other 5 (Mimic Tear, Regal Ancestor Spirit, Valiant Gargoyles, Astel, Lichdragon Fortissax) are `layer: 'underground'`, which is out of calibration scope regardless of extraction success, per the same rule already applied in Stage 4 (underground regions aren't calibrated against the surface schematic). Evergaols remain explicitly deferred to a later effort, per prior direction.

## Why this needs a different technique than Sites of Grace

Sites of Grace had `BonfireWarpParam`, a single param table directly joining name + position via `bonfireEntityId`. No equivalent table exists for enemies. Research this session established:

- `NpcParam` (per-enemy stats/behavior table) has a `nameId` field documented as "the primary field for linking to FMG text file" for an NPC's display name — but empirically, **no living `NpcParam` row for any of our 24 target creatures actually sets `nameId` to the value that resolves to its real display name** in `NpcName.fmg`. This holds for ordinary humanoid NPCs (verified working end-to-end via "Rennala, Queen of the Full Moon") but not for these unique/boss-tier creatures — their display banners are evidently wired through a separate, per-placement mechanism (likely event-script driven) that isn't reachable through static param data alone.
- This rules out a direct "read the position off the row that has this name" approach.

## Validated approach: chr-ID decoding + MSB scan

Despite the above, a reliable first-party path was found and empirically verified against real game data (no third-party dataset used):

1. **Resolve each boss's real display name** by searching `NpcName.fmg` (found inside `item.msgbnd.dcx`, alongside `PlaceName.fmg` — same bundle, same convention as Stage 1's grace names) for **exact-equality** matches against the boss's known name. (Exact match, not substring — a substring/`Contains` search incorrectly matches "Tree Sentinel" inside "Draconic Tree Sentinel"; verified this causes real false positives.)
2. **Decode the chr (character model) ID embedded in the matched `nameId`.** FromSoftware's internal convention for these unique creatures' name-text IDs is `nameId = 90_{chrId:D4}_{suffix:D3}` — verified against the game's own data by decoding it three independent ways: Godrick the Grafted (`nameId=904750000` → chr 4750, cross-checked against Stormveil's real MSB data where the highest-HP Enemy part in the boss's own arena is literally `c4750_9000`), and against 19 of our 24 real target creatures (e.g. Fire Giant `904760000`→chr 4760, Astel `904620001`→chr 4620, Tibia Mariner `904950600`→chr 4950). Formula: `chrId = (nameId % 10_000_000) / 1000`.
3. **Scan every overworld/dungeon MSB file** (`map/mapstudio/*.msb.dcx`, 1347 files) for `Enemy` parts whose internal `Name` matches `c{chrId}_*`, collecting `{mapTileId, position}` for every match. Confirmed this reliably finds real placements for the large majority of targets (single clean match for e.g. Decaying Ekzykes, Great Wyrm Theodorix, Dragonlord Placidusax).

## Known complications and how they're handled

- **A chr model is often reused** as a plain (non-boss) enemy elsewhere in the game, or the same boss fight exists in both a legacy-dungeon copy and the intended overworld encounter, so a chr ID frequently yields multiple placements (observed range: 1 to 19 across real targets tested). **Disambiguation:** for each target's already-known `regionId` in `locations.ts`, look up which map tile(s) that region's own Sites of Grace already resolved to (from `tools/msb-extractor/output/sites-of-grace.json`, which retains `mapTileId` per grace). Keep only candidate placements whose map file matches the region's known tile set (or, for regions with their own dedicated legacy MSB rather than `m60_` overworld tiles — e.g. Farum Azula, whose graces resolve to `m13_*` — match against that file instead). Verified this cleanly isolates the correct placement for every multi-candidate case spot-checked (Tree Sentinel, Flying Dragon Agheel, Erdtree Avatar, Dragonlord Placidusax).
- **Two known pairs of creatures share the same chr ID** (Glintstone Dragon Smarag/Adula both use chr 4502; Magma Wyrm/Magma Wyrm Makar both use chr 4910). Exact-name matching (not substring) already keeps their respective candidate lists separate at the name-resolution step; region/tile filtering (above) then assigns the correct physical placement to each even when both draw from the same underlying chr-ID candidate pool.
- **Resolution-variant duplicates** (the same physical placement appearing under both `_00` and `_10` tile-resolution suffixes, as seen for Tibia Mariner) are deduplicated by keeping only `resolution == "00"` (small-tile) entries, matching the rule already established in Stage 2.
- **Elder Dragon Greyoll and Flying Dragon Greyoll have no matching entry anywhere in `NpcName.fmg`** — their display name must resolve through a different message file. This is a real open item: implementation will search the remaining `msg/engus` FMG files (`EventTextForMap.fmg` is the next candidate, since Greyoll is fought via a scripted map event rather than a standard encounter) using the same systematic-scan technique that found `PlaceName.fmg` and `NpcName.fmg`. If no FMG match can be found at all, fall back to a fully first-party heuristic: our own extracted data already shows every other dragon in this game clustered into a sequential chr-ID family (Flying Dragon Agheel=4500, Decaying Ekzykes=4501, Glintstone Dragon Smarag/Adula=4502, Borealis=4503), so search MSB `Enemy` parts in Caelid (Greyoll's known region) for the next few IDs in that sequence (4504, 4505, ...), and accept a match only if its position is plausible against the existing schematic pin and its HP/stats (via `NpcParam`) are consistent with a Great Enemy. No third-party dataset is consulted at any point.

## Pipeline reuse

Everything downstream of "extracted world-space positions" is already built and unmodified:

- Position conversion: Stage 2's `tileToWorld()` (`server/src/pipeline/msb-coordinates.ts`) — reused as-is for overworld-tile results.
- Matching to existing schematic locations: Stage 3's `matchGracesToLocations()` shape doesn't directly apply (it matches by exact name across two lists), but the *output shape* (`CalibrationAnchor`) is exactly what's needed here too — great-enemy extraction produces `CalibrationAnchor[]` directly (name/category/regionId/existingFx/existingFy/worldX/worldZ) rather than going through a separate matching step, since each target is already resolved 1:1 by construction (chr-ID + region-tile filtering either finds exactly one placement or the extraction is inconclusive and the entry is skipped with a logged reason).
- Calibration: Stage 4's `fitAffineTransform()` / `applyAffineTransform()` (`server/src/pipeline/affine-fit.ts`) — the new anchors get merged into the existing 117-anchor calibration set (grouped by `regionId`, same as before) and a fresh per-region calibration pass re-fits and re-applies to `locations.ts` in both `web/` and `client/`.

## New code

- `tools/msb-extractor/Program.cs` (or a new dedicated entry point in the same project) — implements the nameId→chrId decode, `NpcName.fmg`/`EventTextForMap.fmg` name resolution, and the full-corpus MSB `Enemy` part scan with region/tile-based disambiguation. Outputs `tools/msb-extractor/output/great-enemies.json`: `{ name, chrId, mapTileId, localX, localY, localZ, matchConfidence }[]`, where `matchConfidence` records whether the match was a clean single-candidate resolution or required tie-breaking, so ambiguous entries can be manually spot-checked before merging into calibration.
- A small TypeScript conversion step (following Stage 2's precedent) to turn `great-enemies.json` into `CalibrationAnchor[]` entries (attaching each target's existing `fx`/`fy`/`category`/`regionId` from `locations.ts`), merged with the existing `calibration-anchors.json`.
- Re-run of the existing (disposable, Stage-4-style) calibration-application script against the merged anchor set.

## Verification

- For every one of the 19 surface targets, print the resolved `{mapTileId, position, matchConfidence}` and manually cross-check a sample of at least 5 (including the 2 known-hard cases: Greyoll pair, plus one of the shared-chr-ID pairs) against in-game/wiki knowledge of roughly where that creature is fought, before trusting the batch.
- After calibration is applied, run the same point-in-polygon region-shape check used in Stage 4 for all newly-calibrated great-enemy pins.
- Load the live map and visually confirm a handful of recalibrated great-enemy pins land in sensible spots.
