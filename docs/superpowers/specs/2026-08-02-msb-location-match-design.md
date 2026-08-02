# Matching Sites of Grace to Existing Locations — Design

## Context

This is Stage 3 of the real-coordinate location pipeline (see
`docs/superpowers/specs/2026-08-02-location-coordinates-pipeline-design.md` for the full
4-stage decomposition). Stage 2 produced 314 Sites of Grace with real, unified world-space
coordinates. This stage cross-references them against the ~247 existing named entries in
`web/src/map/locations.ts` to produce calibration anchors — pairs where the same real-world
entity has both a known real coordinate (from grace data) and a known existing schematic
position (`fx`/`fy`) — which Stage 4 will use to fit a per-region coordinate transform.

## Research done before designing

Ran a real match (not assumed) between all 314 grace names and all 247 `MAP_LOCATIONS` names,
normalized for case/punctuation: **127 graces exactly match an existing location name**, spread
across all 11 surface regions (3–21 matches per region — `liurnia` highest at 21, `haligtree`
lowest at 3). Underground regions (`nokron`, `ainsel-river`, `siofra-river`, etc.) have few or
zero matches, but that's expected and doesn't block anything — underground zones are already
out of scope for real-coordinate calibration per the overview spec (they're shown as a separate,
non-metric layer, not calibrated against the surface schematic).

**Found a real duplicate-name problem, not a bug:** 7 grace names (14 rows) match more than one
grace. Inspected the actual coordinates: `Elden Throne`/`Erdtree Sanctuary`/`East Capital
Rampart`/`Queen's Bedchamber`/`Divine Bridge` each appear twice with matching Z coordinates but
X coordinates offset by a near-constant ~1280 units — these are Leyndell's pre-and-post
story-burn physical map instances (a known FromSoftware engine pattern: story-state variants of
an area are duplicated as separate physical layouts, offset far apart in world space, with the
correct one loaded based on story flags). `Isolated Merchant's Shack`/`Artist's Shack` are a
different case — genuinely different vendor NPCs at different real locations that happen to
share a generic name. In both cases, the current map has only **one** pin per name, with no way
to know which physical instance that pin represents — so there's no safe way to pick "the right"
coordinate for either duplicate case.

## Architecture

- **`server/src/pipeline/msb-location-match.ts`** — pure function:

  ```typescript
  interface CalibrationAnchor {
    name: string;
    category: string;
    regionId: string;
    existingFx: number;
    existingFy: number;
    worldX: number;
    worldZ: number;
  }

  function matchGracesToLocations(
    graces: { graceName: string; worldX: number; worldZ: number }[],
    locations: { name: string; category: string; regionId: string; fx: number; fy: number }[],
  ): CalibrationAnchor[]
  ```

  Normalizes both name lists (lowercase, strip non-alphanumerics) for matching. Any normalized
  grace name that maps to more than one grace is excluded entirely from the output — not
  averaged, not arbitrarily picked — since there's no principled way to choose between two real,
  physically-different locations sharing one existing pin. Any normalized name matching more
  than one *location* entry (shouldn't happen given `locations.ts`'s existing per-name
  uniqueness, but checked rather than assumed) is excluded the same way.

- **`server/src/pipeline/msb-location-match.test.ts`** — TDD against small hand-built fixtures
  (a handful of locations/graces, including one deliberately-duplicated grace name to verify the
  exclusion behavior) — this logic doesn't need the full 314-row real dataset to verify
  correctly, unlike Stage 1's real-file extraction.

- **`server/scripts/generate-calibration-anchors.ts`** (disposable, deleted after running) —
  reads `tools/msb-extractor/output/sites-of-grace-world.json` (Stage 2's output) and
  `web/src/map/locations.ts`'s `MAP_LOCATIONS` array directly (importable — it's already a
  plain TypeScript module export, not a data file needing custom parsing), calls
  `matchGracesToLocations()`, writes `tools/msb-extractor/output/calibration-anchors.json`.

## Error handling

If the real anchor count comes back materially different from the 127 (or ~120 after excluding
duplicates) found during this design's research, that signals either `locations.ts` changed
since this research or a bug in the matching logic — not something to silently accept. The
verification step checks the count explicitly.

## Testing

Unit tests for `matchGracesToLocations()` against hand-built fixtures: a clean unambiguous
match, a grace name with no matching location (excluded, not an error), a location name matched
by two different graces (excluded per the duplicate-handling rule above), and a check that the
output anchor's `existingFx`/`existingFy` come from the location and `worldX`/`worldZ` come from
the grace (not swapped or conflated).

Manual verification after running the script: confirm the real anchor count is **117** (127 raw
matches minus 14 rows from 7 excluded ambiguous names — computed for real during this design,
not assumed), confirm all 11 surface regions are represented (`liurnia` 21, `limgrave` 17,
`caelid` 16, `mt-gelmir`/`altus-plateau`/`mountaintops` 9 each, `weeping-peninsula`/
`consecrated-snowfield` 7 each, `leyndell`/`farum-azula` 5 each, `haligtree` 3), and spot-check
that Church of Elleh's anchor entry has `worldX`/`worldZ` matching Stage 2's already-verified
values (10711.266, 9295.338) and `existingFx`/`existingFy` matching its current hand-placed
position in `locations.ts` (0.793, 0.691).
