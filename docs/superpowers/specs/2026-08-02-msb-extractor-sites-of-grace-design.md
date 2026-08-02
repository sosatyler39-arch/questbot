# MSB Extractor: Sites of Grace — Design

## Context

This is Stage 1 of the real-coordinate location pipeline (see
`docs/superpowers/specs/2026-08-02-location-coordinates-pipeline-design.md` for the full
4-stage decomposition and the research that ruled out every pre-made coordinate dataset). Stage
1's job: produce a real, verified coordinate dataset for one category — Sites of Grace — proving
the extraction actually works before expanding to the harder categories or building the
calibration math in later stages.

## What a Site of Grace actually is, verified against real source

Confirmed directly against `soulsmods/SoulsFormatsNEXT`'s source (not assumed):

- Internally, a Site of Grace is a **`RetryPoint`** event — Dark Souls' internal "bonfire"
  terminology, carried over into Elden Ring's engine. It lives in each map tile's `EventParam`
  (`SoulsFormats/Formats/MSB/MSBE/EventParam.cs`).
- `RetryPoint.EntityID` (inherited `uint` field) matches the "Bonfire Entity ID" used by
  **`BonfireWarpParam`**, a param table inside `regulation.bin` that holds every grace's
  **display name** and warp-related flags. This is an exact join key — no fuzzy name matching
  needed for this category.
- `RetryPoint.RetryRegionName` points to a `Region` defined in the same MSB file
  (`PointParam.cs`), whose `Position` field holds the actual local X/Y/Z transform.
- Graces inside legacy-dungeon interiors (not on the overworld tile grid) will have a
  `RetryRegionName` that doesn't resolve within any overworld tile's own region list — these are
  skipped, consistent with the overview pipeline's existing scope boundary (legacy-dungeon
  interiors were never going to be placeable on the overworld schematic).

## Why one C#/.NET tool, not Python + C#

Checked directly rather than assumed: `soulstruct`, the standard Python library for
FromSoftware file formats, has **zero** Elden Ring MSB support (confirmed against its own
README's supported-games list — DS1/DS2/BB/DS3 only). `SoulsFormatsNEXT` is the only verified
option with real `MSBE` support, and it *also* has a `PARAM` format reader
(`SoulsFormats/Formats/PARAM/`) capable of reading `regulation.bin`. One tool reads both data
sources — no Python involved in this stage.

## Architecture

- **New directory: `tools/msb-extractor/`** — outside the npm workspaces list (a separate,
  standalone toolchain; this repo has no other `tools/` directory yet, but it's the
  conventional home for a project-local dev tool that isn't part of the shipped product).
- **`tools/msb-extractor/vendor/SoulsFormatsNEXT`** — a git submodule pointing at
  `soulsmods/SoulsFormatsNEXT` (GPL-3.0). Referenced via a `ProjectReference` in the extractor's
  `.csproj`. Run locally only, against the user's own game files — never distributed as part of
  the shipped web/client product, so GPL's copyleft obligations don't extend to this project (the
  same footing as this project's existing use of erdb).
- **`tools/msb-extractor/Program.cs`** (a single-file console app is appropriate here — this is
  a narrow, one-shot extraction tool, not a growing codebase):
  1. Read `regulation.bin` from the confirmed game path
     (`C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game\regulation.bin`) using
     `SoulsFormatsNEXT`'s own regulation-reading utility, which selects the correct decryption
     key internally given the game (Elden Ring's regulation key is public and published across
     the modding community — not a secret or an exploit, just the interoperability constant
     needed to read a file format on a game you own — but the implementer should use the
     library's own game-aware helper rather than hardcoding the key by hand, to avoid
     transcribing it wrong). Parse `BonfireWarpParam` into a `Dictionary<uint, string>` of
     `{ bonfireEntityId → graceName }`.
  2. Enumerate every `.msb.dcx` under `map\mapstudio\` (confirmed present, 1,347 files).
  3. For each tile, parse its `EventParam.RetryPoints`, keep only those whose `EntityID` is a
     key in the grace-name dictionary from step 1, resolve each one's `RetryRegionName` against
     that same tile's region list, and read the matched region's `Position`.
  4. Derive `mapTileId` from the MSB's own filename (e.g. `m60_43_36_00`).
  5. Write every match to `tools/msb-extractor/output/sites-of-grace.json` as an array of:
     ```json
     { "graceName": "string", "bonfireEntityId": 0, "mapTileId": "string", "localX": 0.0, "localY": 0.0, "localZ": 0.0 }
     ```
  6. Log (to stdout, not into the output file) any `bonfireEntityId` from step 1 that was never
     matched to a region in step 3 — expected for interior/legacy-dungeon graces, but worth
     seeing the count to sanity-check nothing on the overworld got missed.

## Error handling

Fail loudly and stop, don't produce partial/silent-wrong output, if: `regulation.bin` or
`map\mapstudio\` aren't found at the expected path, decryption fails (wrong key or unexpected
format — signals the game version has changed in a way that needs re-verifying, the same lesson
from erdb's own DCX failure earlier in this project), or `BonfireWarpParam` yields zero entries
(signals the param table's schema/ID changed, not that there are no graces).

## Testing

This is real game-file parsing, not pure logic with fixture-able inputs — there's no meaningful
unit test to write here (mirroring how the corpus content-ingestion scripts in earlier
sub-projects weren't unit tested either, just run for real and verified against the output).
Verification is a real-data smoke check: after running the tool, cross-check 2-3 well-known
graces (e.g. "The First Step," "Church of Elleh") against a public grace-location reference,
confirming the resolved `mapTileId` matches the expected region of the map and that the total
grace count found is in the right ballpark for Elden Ring + Shadow of the Erdtree (order of
~250, not an exact target — this stage doesn't need to hit a precise number, just prove the
extraction mechanism works end to end).

## Out of scope for this stage

- No world-space unification (Stage 2), no matching against existing `MAP_LOCATIONS` (Stage 3),
  no map wiring (Stage 4) — this stage's deliverable is exactly one file,
  `tools/msb-extractor/output/sites-of-grace.json`, and nothing else changes.
- No other location categories yet (bosses, dungeon entrances, landmarks) — those don't have the
  same clean `EntityID` join key this stage relies on, and are explicitly deferred pending what
  this stage's real output looks like, per the overview spec.
