const TILE_SIZE = 256;

// Elden Ring overworld tile IDs: "m{areaNo}_{gridX}_{gridZ}_{resolution}", e.g. "m60_42_36_00".
// Verified against the Souls Modding wiki's Map Overview reference during design: small tiles
// (resolution "00") are exactly 256 game units apart, with each tile's own local coordinate
// origin (0,0,0) at that tile's center. Grid X maps to the game's world X-axis, grid Z to the
// world Z-axis. Medium/large tiles ("01"/"02") aren't handled - no current input needs them.
const TILE_ID_PATTERN = /^m\d+_(\d+)_(\d+)_(\d+)$/;

export function tileToWorld(
  mapTileId: string,
  localX: number,
  localZ: number,
): { worldX: number; worldZ: number } {
  const match = TILE_ID_PATTERN.exec(mapTileId);
  if (!match) {
    throw new Error(`Malformed tile ID "${mapTileId}"`);
  }

  const [, gridXStr, gridZStr, resolution] = match;
  if (resolution !== '00') {
    throw new Error(`Unsupported tile resolution "${resolution}" in tile ID "${mapTileId}" (only small tiles, resolution "00", are supported)`);
  }

  const gridX = Number(gridXStr);
  const gridZ = Number(gridZStr);

  return {
    worldX: gridX * TILE_SIZE + localX,
    worldZ: gridZ * TILE_SIZE + localZ,
  };
}
