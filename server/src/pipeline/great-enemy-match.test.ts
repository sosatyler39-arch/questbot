import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileToWorld } from './msb-coordinates.js';
import {
  buildRegionTileSets,
  matchGreatEnemies,
  type PinCandidates,
  type LocationInput,
} from './great-enemy-match.js';
import type { AffineTransform } from './affine-fit.js';

test('buildRegionTileSets groups tiles by region using name-matched anchors', () => {
  const graces = [
    { graceName: 'Church of Elleh', mapTileId: 'm60_42_36_00' },
    { graceName: 'Stranded Graveyard', mapTileId: 'm60_41_37_00' },
    { graceName: 'Unrelated Grace', mapTileId: 'm60_99_99_00' },
  ];
  const anchors = [
    { name: 'Church of Elleh', regionId: 'limgrave' },
    { name: 'Stranded Graveyard', regionId: 'limgrave' },
  ];

  const result = buildRegionTileSets(graces, anchors);

  assert.equal(result.size, 1);
  assert.deepEqual([...result.get('limgrave')!].sort(), ['m60_41_37_00', 'm60_42_36_00']);
});

test('matchGreatEnemies resolves a pin with exactly one in-region candidate as clean', () => {
  const pins: PinCandidates[] = [
    {
      pinName: 'Decaying Ekzykes (site)',
      creatureName: 'Decaying Ekzykes',
      chrIds: [4501],
      candidates: [
        { mapTileId: 'm60_48_37_00', partName: 'c4501_9000', localX: -48.086, localY: 114.951, localZ: -42.666 },
      ],
    },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Decaying Ekzykes (site)', { name: 'Decaying Ekzykes (site)', category: 'great-enemy', regionId: 'caelid', fx: 0.503, fy: 1.492 }],
  ]);
  const regionTileSets = new Map([['caelid', new Set(['m60_48_37_00'])]]);
  const regionTransforms = new Map<string, AffineTransform>();

  const { anchors, unresolved } = matchGreatEnemies(pins, locationsByName, regionTileSets, regionTransforms);

  assert.equal(unresolved.length, 0);
  assert.equal(anchors.length, 1);
  assert.equal(anchors[0].matchConfidence, 'clean');
  const expected = tileToWorld('m60_48_37_00', -48.086, -42.666);
  assert.equal(anchors[0].worldX, expected.worldX);
  assert.equal(anchors[0].worldZ, expected.worldZ);
});

test('matchGreatEnemies filters out-of-region candidates and stays clean when one remains', () => {
  const pins: PinCandidates[] = [
    {
      pinName: 'Tree Sentinel (Limgrave)',
      creatureName: 'Tree Sentinel',
      chrIds: [3251],
      candidates: [
        { mapTileId: 'm60_41_51_00', partName: 'c3251_9000', localX: 91.089, localY: 851.27, localZ: -31.347 },
        { mapTileId: 'm60_42_36_00', partName: 'c3251_9000', localX: -12.138, localY: 88.955, localZ: 46.773 },
      ],
    },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Tree Sentinel (Limgrave)', { name: 'Tree Sentinel (Limgrave)', category: 'great-enemy', regionId: 'limgrave', fx: 0.756, fy: 0.598 }],
  ]);
  const regionTileSets = new Map([['limgrave', new Set(['m60_42_36_00'])]]);
  const regionTransforms = new Map<string, AffineTransform>();

  const { anchors } = matchGreatEnemies(pins, locationsByName, regionTileSets, regionTransforms);

  assert.equal(anchors.length, 1);
  assert.equal(anchors[0].matchConfidence, 'clean');
  const expected = tileToWorld('m60_42_36_00', -12.138, 46.773);
  assert.equal(anchors[0].worldX, expected.worldX);
});

test('matchGreatEnemies tiebreaks multiple in-region candidates by distance to the existing pin', () => {
  const transform: AffineTransform = { a: 0.001, b: 0, c: 0.5, d: 0, e: 0.001, f: 0.5 };
  const pins: PinCandidates[] = [
    {
      pinName: 'Glintstone Dragon Smarag (site)',
      creatureName: 'Glintstone Dragon Smarag',
      chrIds: [4502],
      candidates: [
        { mapTileId: 'm60_00_00_00', partName: 'c4502_9000', localX: 100, localY: 0, localZ: 100 },
        { mapTileId: 'm60_00_00_00', partName: 'c4502_9001', localX: -100, localY: 0, localZ: -100 },
      ],
    },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Glintstone Dragon Smarag (site)', { name: 'Glintstone Dragon Smarag (site)', category: 'great-enemy', regionId: 'liurnia', fx: 0.59, fy: 0.59 }],
  ]);
  const regionTileSets = new Map([['liurnia', new Set(['m60_00_00_00'])]]);
  const regionTransforms = new Map([['liurnia', transform]]);

  const { anchors } = matchGreatEnemies(pins, locationsByName, regionTileSets, regionTransforms);

  assert.equal(anchors.length, 1);
  assert.equal(anchors[0].matchConfidence, 'tiebreak');
  const expected = tileToWorld('m60_00_00_00', 100, 100);
  assert.equal(anchors[0].worldX, expected.worldX);
  assert.equal(anchors[0].worldZ, expected.worldZ);
});

test('matchGreatEnemies reports a pin as unresolved when no candidate matches its region tiles', () => {
  const pins: PinCandidates[] = [
    {
      pinName: 'Fire Giant (site)',
      creatureName: 'Fire Giant',
      chrIds: [4760],
      candidates: [
        { mapTileId: 'm60_99_99_00', partName: 'c4760_9000', localX: 0, localY: 0, localZ: 0 },
      ],
    },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Fire Giant (site)', { name: 'Fire Giant (site)', category: 'great-enemy', regionId: 'mountaintops', fx: 0.595, fy: 1.605 }],
  ]);
  const regionTileSets = new Map([['mountaintops', new Set(['m60_50_56_00'])]]);
  const regionTransforms = new Map<string, AffineTransform>();

  const { anchors, unresolved } = matchGreatEnemies(pins, locationsByName, regionTileSets, regionTransforms);

  assert.equal(anchors.length, 0);
  assert.deepEqual(unresolved, ['Fire Giant (site)']);
});
