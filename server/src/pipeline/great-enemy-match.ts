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

export interface GraceForTileSet {
  graceName: string;
  mapTileId: string;
}

export interface AnchorForTileSet {
  name: string;
  regionId: string;
}

/**
 * For each region, the set of map tiles its own (already-extracted) Sites of Grace resolved to.
 * Used to disambiguate which of several chr-ID candidates for a great enemy actually belongs to
 * a given region.
 */
export function buildRegionTileSets(
  graces: GraceForTileSet[],
  anchors: AnchorForTileSet[],
): Map<string, Set<string>> {
  const regionIdByName = new Map(anchors.map((a) => [a.name, a.regionId]));
  const result = new Map<string, Set<string>>();

  for (const grace of graces) {
    const regionId = regionIdByName.get(grace.graceName);
    if (!regionId) continue;

    let tiles = result.get(regionId);
    if (!tiles) {
      tiles = new Set<string>();
      result.set(regionId, tiles);
    }
    tiles.add(grace.mapTileId);
  }

  return result;
}

export function matchGreatEnemies(
  pinCandidates: PinCandidates[],
  locationsByName: Map<string, LocationInput>,
  regionTileSets: Map<string, Set<string>>,
  regionTransforms: Map<string, AffineTransform>,
): { anchors: GreatEnemyAnchor[]; unresolved: string[] } {
  const anchors: GreatEnemyAnchor[] = [];
  const unresolved: string[] = [];

  for (const pin of pinCandidates) {
    const location = locationsByName.get(pin.pinName);
    if (!location) {
      throw new Error(`No location entry found for pin "${pin.pinName}"`);
    }

    const allowedTiles = regionTileSets.get(location.regionId) ?? new Set<string>();
    const filtered = pin.candidates.filter((c) => allowedTiles.has(c.mapTileId));

    if (filtered.length === 0) {
      unresolved.push(pin.pinName);
      continue;
    }

    let chosen = filtered[0];
    let confidence: 'clean' | 'tiebreak' = 'clean';

    if (filtered.length > 1) {
      confidence = 'tiebreak';
      const transform = regionTransforms.get(location.regionId);
      if (!transform) {
        throw new Error(`No affine transform available for region "${location.regionId}"`);
      }

      let bestDistance = Infinity;
      for (const candidate of filtered) {
        const { worldX, worldZ } = tileToWorld(candidate.mapTileId, candidate.localX, candidate.localZ);
        const { fx, fy } = applyAffineTransform(transform, worldX, worldZ);
        const distance = Math.hypot(fx - location.fx, fy - location.fy);
        if (distance < bestDistance) {
          bestDistance = distance;
          chosen = candidate;
        }
      }
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
      matchConfidence: confidence,
    });
  }

  return { anchors, unresolved };
}
