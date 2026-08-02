# World-Space Coordinate Unification — Design

## Context

This is Stage 2 of the real-coordinate location pipeline (see
`docs/superpowers/specs/2026-08-02-location-coordinates-pipeline-design.md` for the full
4-stage decomposition). Stage 1 produced `tools/msb-extractor/output/sites-of-grace.json` — 314
real Sites of Grace, each with a tile ID (`m60_42_36_00`-style) and a local position within that
tile. This stage converts those tile-local positions into one unified world-space coordinate
system, so later stages can compare positions across different tiles directly.

Unlike Stage 1, this is pure arithmetic over JSON that's already on disk — no game files, no
`SoulsFormatsNEXT`, no C#. It moves back to TypeScript, matching every other data-transform step
in this project.

## The verified formula

Confirmed directly against the Souls Modding wiki's Map Overview reference (not assumed):
Elden Ring's overworld is a 41×41 grid of "small" tiles, each covering exactly 256×256 in-game
units, with each tile's own local coordinate origin `(0,0,0)` at that tile's center. Adjacent
small-tile centers are exactly 256 units apart. For a tile named `m{areaNo}_{gridX}_{gridZ}_00`,
grid X maps to the game's world X-axis (east-west) and grid Z maps to world Z-axis (north-south).
All 314 entries in Stage 1's output are small tiles (`_00` suffix) — Sites of Grace always
resolve to the finest tile resolution — so this one formula covers every entry with no
medium/large-tile handling needed:

```
worldX = gridXNo * 256 + localX
worldZ = gridZNo * 256 + localZ
```

Verified by hand against two real, adjacent entries from Stage 1's actual output — Church of
Elleh (`m60_42_36_00`, localX=-40.734, localZ=79.338) → world (10711.266, 9295.338), and The
First Step (same tile, localX=-12.83, localZ=-54.5) → world (10739.17, 9161.5). Both land close
together in world-space, matching their known real in-game adjacency.

## Architecture

- **`server/src/pipeline/msb-coordinates.ts`** — a small, permanent, pure function:
  `tileToWorld(mapTileId: string, localX: number, localZ: number): { worldX: number; worldZ: number }`.
  Parses the `gridX`/`gridZ` indices out of a tile ID like `m60_42_36_00` via a regex, applies
  the formula above. Permanent rather than disposable — Stage 3/4 and any future location
  category extracted through this same pipeline will reuse this exact conversion, unlike Stage
  1's one-off extraction script.
- **`server/src/pipeline/msb-coordinates.test.ts`** — TDD against the two real verified values
  above, matching this project's established pattern of testing against real extracted data
  rather than invented fixtures.
- **`server/scripts/convert-sites-of-grace-to-world-coordinates.ts`** (disposable, deleted after
  running) — reads `tools/msb-extractor/output/sites-of-grace.json`, calls `tileToWorld` on each
  entry, writes `tools/msb-extractor/output/sites-of-grace-world.json` as an array of
  `{ graceName, bonfireEntityId, worldX, worldZ }`.

## Error handling

`tileToWorld` throws if the tile ID doesn't match the expected `m{areaNo}_{gridX}_{gridZ}_{res}`
pattern, or if `{res}` isn't `00` (medium/large tiles aren't handled — per the verified formula
section, no current input needs them, and silently mishandling one would produce a wrong-but-
plausible coordinate rather than a loud failure).

## Testing

Unit tests against the two real verified values (Church of Elleh, The First Step) — this stage
is pure logic, unlike Stage 1's real-file extraction, so it gets proper TDD rather than a
smoke-check-only approach. A test for the error case (malformed tile ID, non-`00` resolution)
is included too, since that's a real code path with defined behavior, not just a defensive
guess.

Manual verification after running the conversion script: confirm the full 314-entry output
count matches Stage 1's, and spot-check that Church of Elleh and The First Step's converted
world coordinates are close together (as computed above). Note: the "41×41 grid" figure from
the wiki reference appears to predate the Shadow of the Erdtree DLC's map expansion — real data
already includes `gridXNo=42`, outside a 0–40 range — so no fixed grid-size bound is asserted
here; the adjacency check above is the real correctness signal, not a coordinate-range check.
