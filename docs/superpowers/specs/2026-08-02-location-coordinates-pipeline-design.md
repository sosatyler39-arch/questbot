# Real-Coordinate Location Pipeline — Design

## Context

The web map (`web/src/map/`) is an original, hand-molded schematic — not traced or copied from
any real map image, and not proportionally accurate to the game world. Region shapes were
hand-molded vertex-by-vertex in a custom Shape Editor tool and deliberately stretched to close
visual gaps between neighbors, so there is no single consistent transform from real in-game
coordinates to this schematic's `fx`/`fy` fraction space. All ~280 `MAP_LOCATIONS` entries today
are placed by "general knowledge of relative geography," explicitly documented as approximate.

The user wants real in-game coordinates driving pin placement instead of hand-guessed positions.
No such coordinate data exists anywhere in this codebase or in any cleanly-licensed public
dataset (checked during brainstorming: erdb only extracts item/weapon/armor stat params and a
raw map *image*, no coordinates; several community APIs/datasets either lack coordinates
entirely or lack any license, which rules them out as data sources — see the brainstorming
conversation for the full list checked). The only clean path is extracting real coordinates
directly from the user's own legally-owned copy of the game, the same precedent already
established by this project's use of erdb for item stats.

**This is a 4-stage pipeline, each stage strictly dependent on the previous one's output.** Each
stage is its own sub-project with its own spec + plan, written when that stage is reached — this
document is the architecture overview that ties them together, matching this project's existing
pattern for multi-stage efforts (see the weapon-AR-calculator work's own sub-project
decomposition for precedent).

## Confirmed preconditions (verified during brainstorming, not assumed)

- The game is already UXM-unpacked at `C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game`
  (left over from this project's earlier erdb work). `map\mapstudio\` is present and populated
  (1,347 files, including `.msb.dcx` tiles like `m10_00_00_00.msb.dcx`) — no re-unpacking needed.
- `soulsmods/SoulsFormatsNEXT` (GPL-3.0, actively maintained, the shared backend for DSMapStudio
  and WitchyBND) has a dedicated `MSBE` class — confirmed directly against its source tree, not
  its (stale) docs — for Elden Ring's MSB format. GPL governs *its own* source code; running it
  locally to extract coordinates from a game you own, then committing the coordinates you
  yourself derived, doesn't inherit GPL onto this project (same principle as compiler output not
  being licensed under the compiler's license) — no different from this project's existing,
  unquestioned use of erdb.
- Elden Ring's overworld uses a documented 41×41 tile grid, southwest origin, named
  `m60_X_Y_RES` (`RES` = `02` big / `01` medium / `00` small tile, each subdividing into 4 of the
  next size down; a small tile covers ~256×256 in-game units, doubling per resolution step up).
  Each map file's own local coordinate origin `(0,0,0)` is that tile's center.
- Legacy dungeons and Evergaols live on entirely separate, non-grid map IDs (e.g. `m10_*` for
  Stormveil Castle) — confirmed via the Souls Modding wiki. Their interiors were never going to
  be placeable on the overworld map anyway; only their overworld entrance/portal marker has a
  real grid position. This matches how the map already treats underground zones today (shown as
  their own separate layer rather than pinned to misleading surface coordinates) — no new
  conceptual work needed, the existing category/layer model already anticipates this.

## The 4 stages

### Stage 1: MSB extraction tool

A new C#/.NET console app, built against `SoulsFormatsNEXT`, run locally against the confirmed
unpacked game path above. Walks the overworld tiles' `.msb.dcx` files and dumps every relevant
marker to a raw JSON file: `{ internalId, mapTileId, localX, localY, localZ, entryType }`.

This is a new toolchain for this project (everything else is Python or TypeScript) — the .NET
SDK and project scaffolding are part of this stage's own setup, not assumed to exist.

### Stage 2: World-space unification

Pure math, no new tooling. Converts each `(mapTileId, localX, localZ)` into one unified
`(worldX, worldZ)` using the tile grid formula above. Output: a flat list of
`{ internalId, worldX, worldZ }`.

### Stage 3: Match extracted points to existing named locations

Cross-references Stage 2's output against the ~280 existing `MAP_LOCATIONS` entries. **This is
the stage with real, currently-unresolved risk**, found during brainstorming rather than assumed
away: raw MSB entries are usually internal engine IDs, not display names. Sites of Grace carry a
clean, well-documented, extractable display-name reference and should match automatically.
Bosses, dungeon/evergaol entrances, and landmarks may not resolve as cleanly and could need
manual cross-referencing rather than an automated join — this won't be known for certain until
Stage 1's real output is in hand. This stage's own spec (written when Stages 1–2 are done) will
scope how much of the "everything currently on the map" target is achievable automatically vs.
needs manual matching, based on what Stage 1 actually produces.

### Stage 4: Per-region calibration + map wiring

For each of the 11 existing `SURFACE_REGIONS`, fits a coordinate transform from real
`(worldX, worldZ)` to that region's existing `fx`/`fy` box, using a small number of
already-well-placed pins in that region as calibration anchors. Applies that transform to every
matched location from Stage 3, producing updated `fx`/`fy` values that replace the hand-guessed
ones in `locations.ts` (and its `client/` counterpart). Verified visually against the live map
after wiring.

## Out of scope

- Legacy-dungeon interiors and Evergaol arenas stay unpinned on the overworld map, same as
  today — they have no real overworld position to extract in the first place.
- Underground zones (Nokron, Ainsel River, etc.) are unaffected — they're already deliberately
  not spatially mapped to the surface schematic, and nothing about this pipeline changes that.
- No commitment yet to how much of the "everything on the map" scope Stage 3 actually delivers
  automatically — that's an open question this pipeline is specifically designed to answer
  before more work is sunk into it, not something promised upfront.

## Sequencing

Stage 1 is next: its own brainstorm → spec → plan → implementation cycle, scoped narrowly enough
to prove the extraction actually works (starting with Sites of Grace, the one category with a
clean name-resolution path) before committing to the harder categories or to Stage 2+.
