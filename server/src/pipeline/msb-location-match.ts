export interface GraceInput {
  graceName: string;
  worldX: number;
  worldZ: number;
}

export interface LocationInput {
  name: string;
  category: string;
  regionId: string;
  fx: number;
  fy: number;
}

export interface CalibrationAnchor {
  name: string;
  category: string;
  regionId: string;
  existingFx: number;
  existingFy: number;
  worldX: number;
  worldZ: number;
}

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function matchGracesToLocations(
  graces: GraceInput[],
  locations: LocationInput[],
): CalibrationAnchor[] {
  const gracesByNormName = new Map<string, GraceInput[]>();
  for (const g of graces) {
    const key = normalize(g.graceName);
    const list = gracesByNormName.get(key) ?? [];
    list.push(g);
    gracesByNormName.set(key, list);
  }

  const locationsByNormName = new Map<string, LocationInput[]>();
  for (const loc of locations) {
    const key = normalize(loc.name);
    const list = locationsByNormName.get(key) ?? [];
    list.push(loc);
    locationsByNormName.set(key, list);
  }

  const anchors: CalibrationAnchor[] = [];
  for (const [key, matchingGraces] of gracesByNormName) {
    if (matchingGraces.length !== 1) continue; // ambiguous grace name - excluded
    const matchingLocations = locationsByNormName.get(key);
    if (!matchingLocations || matchingLocations.length !== 1) continue; // no match, or ambiguous location name

    const grace = matchingGraces[0];
    const location = matchingLocations[0];
    anchors.push({
      name: location.name,
      category: location.category,
      regionId: location.regionId,
      existingFx: location.fx,
      existingFy: location.fy,
      worldX: grace.worldX,
      worldZ: grace.worldZ,
    });
  }

  return anchors;
}
