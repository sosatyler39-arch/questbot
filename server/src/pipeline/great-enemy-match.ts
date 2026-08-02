import { tileToWorld } from './msb-coordinates.js';
import { applyAffineTransform, type AffineTransform } from './affine-fit.js';

export interface RawCandidate {
  mapTileId: string;
  partName: string;
  localX: number;
  localY: number;
  localZ: number;
}

export interface PinCandidates {
  pinName: string;
  creatureName: string;
  chrIds: number[];
  candidates: RawCandidate[];
}

export interface LocationInput {
  name: string;
  category: string;
  regionId: string;
  fx: number;
  fy: number;
}

export interface GreatEnemyAnchor {
  name: string;
  category: string;
  regionId: string;
  existingFx: number;
  existingFy: number;
  worldX: number;
  worldZ: number;
  matchConfidence: 'clean' | 'tiebreak';
}

// Chosen from real data: Dragonlord Placidusax's single (correct) candidate lands at distance
// 0.212, while Magma Wyrm Makar's single (wrong-region -- its true placement is simply missing
// from the extracted candidates) lands at 0.274. 0.25 sits between the two.
const DEFAULT_MAX_MATCH_DISTANCE = 0.25;

/**
 * Picks, for each pin, whichever raw MSB candidate is most plausibly its real placement.
 *
 * A chr ID frequently has multiple placements across the game (the same creature model reused
 * as a plain mob elsewhere, or a legacy-dungeon copy of an overworld fight), so candidates can't
 * just be taken as-is. Two heuristics narrow this down:
 *  1. Overworld ("m60_"-prefixed) tiles are preferred over legacy-dungeon tiles when both exist,
 *     since every target creature here is primarily an open-field encounter (the few that are
 *     legitimately dungeon-hosted, e.g. Dragonlord Placidusax, simply have no m60 candidate at
 *     all and fall through to using whatever candidates do exist).
 *  2. Among the remaining candidates, the one whose world position -- converted through the
 *     pin's own region's already-fitted affine transform -- lands closest to the pin's existing
 *     (hand-placed, imprecise) schematic fx/fy is chosen.
 *
 * `maxMatchDistance` is a safety net: if even the best candidate's transformed position is too
 * far from the existing pin (e.g. because a chr ID is shared with a creature in a *different*
 * region, and that other region's real placement never made it into the candidate list at all),
 * the pin is reported unresolved rather than silently accepting a wrong-region match.
 */
export function matchGreatEnemies(
  pinCandidates: PinCandidates[],
  locationsByName: Map<string, LocationInput>,
  regionTransforms: Map<string, AffineTransform>,
  maxMatchDistance = DEFAULT_MAX_MATCH_DISTANCE,
): { anchors: GreatEnemyAnchor[]; unresolved: string[] } {
  const anchors: GreatEnemyAnchor[] = [];
  const unresolved: string[] = [];

  for (const pin of pinCandidates) {
    const location = locationsByName.get(pin.pinName);
    if (!location) {
      throw new Error(`No location entry found for pin "${pin.pinName}"`);
    }

    if (pin.candidates.length === 0) {
      unresolved.push(pin.pinName);
      continue;
    }

    const overworldCandidates = pin.candidates.filter((c) => c.mapTileId.startsWith('m60_'));
    const considered = overworldCandidates.length > 0 ? overworldCandidates : pin.candidates;

    const transform = regionTransforms.get(location.regionId);
    if (!transform) {
      throw new Error(`No affine transform available for region "${location.regionId}"`);
    }

    let chosen = considered[0];
    let bestDistance = Infinity;
    for (const candidate of considered) {
      const { worldX, worldZ } = tileToWorld(candidate.mapTileId, candidate.localX, candidate.localZ);
      const { fx, fy } = applyAffineTransform(transform, worldX, worldZ);
      const distance = Math.hypot(fx - location.fx, fy - location.fy);
      if (distance < bestDistance) {
        bestDistance = distance;
        chosen = candidate;
      }
    }

    if (bestDistance > maxMatchDistance) {
      unresolved.push(pin.pinName);
      continue;
    }

    const { worldX, worldZ } = tileToWorld(chosen.mapTileId, chosen.localX, chosen.localZ);
    anchors.push({
      name: pin.pinName,
      category: location.category,
      regionId: location.regionId,
      existingFx: location.fx,
      existingFy: location.fy,
      worldX,
      worldZ,
      matchConfidence: considered.length === 1 ? 'clean' : 'tiebreak',
    });
  }

  return { anchors, unresolved };
}
