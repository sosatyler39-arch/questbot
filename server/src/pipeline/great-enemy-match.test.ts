import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileToWorld } from './msb-coordinates.js';
import { matchGreatEnemies, type PinCandidates, type LocationInput } from './great-enemy-match.js';
import type { AffineTransform } from './affine-fit.js';

const IDENTITY_SCALE_TRANSFORM: AffineTransform = { a: 0.001, b: 0, c: 0.5, d: 0, e: 0.001, f: 0.5 };

test('matchGreatEnemies resolves a pin with exactly one candidate as clean', () => {
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
  // A constant transform that maps any world position straight onto the existing pin's fx/fy,
  // so the single candidate always passes the distance check regardless of its raw position.
  const transform: AffineTransform = { a: 0, b: 0, c: 0.503, d: 0, e: 0, f: 1.492 };
  const regionTransforms = new Map([['caelid', transform]]);

  const { anchors, unresolved } = matchGreatEnemies(pins, locationsByName, regionTransforms);

  assert.equal(unresolved.length, 0);
  assert.equal(anchors.length, 1);
  assert.equal(anchors[0].matchConfidence, 'clean');
  const expected = tileToWorld('m60_48_37_00', -48.086, -42.666);
  assert.equal(anchors[0].worldX, expected.worldX);
  assert.equal(anchors[0].worldZ, expected.worldZ);
});

test('matchGreatEnemies prefers an overworld candidate over a legacy-tile candidate even when the legacy one numerically fits better', () => {
  // Legacy candidate lands exactly on the existing pin (distance 0); the overworld candidate is
  // slightly off but still well within tolerance. The overworld one must still win.
  const pins: PinCandidates[] = [
    {
      pinName: 'Some Boss (site)',
      creatureName: 'Some Boss',
      chrIds: [1234],
      candidates: [
        { mapTileId: 'm10_00_00_00', partName: 'c1234_9000', localX: 100, localY: 0, localZ: 100 },
        { mapTileId: 'm60_00_00_00', partName: 'c1234_9001', localX: 90, localY: 0, localZ: 90 },
      ],
    },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Some Boss (site)', { name: 'Some Boss (site)', category: 'great-enemy', regionId: 'testregion', fx: 0.6, fy: 0.6 }],
  ]);
  const regionTransforms = new Map([['testregion', IDENTITY_SCALE_TRANSFORM]]);

  const { anchors } = matchGreatEnemies(pins, locationsByName, regionTransforms);

  assert.equal(anchors.length, 1);
  // Only one candidate survives the overworld-preference filter, so there's nothing left to
  // tiebreak -- 'clean' correctly reflects that, even though a legacy candidate was also present.
  assert.equal(anchors[0].matchConfidence, 'clean');
  const expected = tileToWorld('m60_00_00_00', 90, 90);
  assert.equal(anchors[0].worldX, expected.worldX);
  assert.equal(anchors[0].worldZ, expected.worldZ);
});

test('matchGreatEnemies tiebreaks multiple overworld candidates by distance to the existing pin', () => {
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
  const regionTransforms = new Map([['liurnia', IDENTITY_SCALE_TRANSFORM]]);

  const { anchors } = matchGreatEnemies(pins, locationsByName, regionTransforms);

  assert.equal(anchors.length, 1);
  assert.equal(anchors[0].matchConfidence, 'tiebreak');
  const expected = tileToWorld('m60_00_00_00', 100, 100);
  assert.equal(anchors[0].worldX, expected.worldX);
  assert.equal(anchors[0].worldZ, expected.worldZ);
});

test('matchGreatEnemies reports a pin as unresolved when it has no candidates at all', () => {
  const pins: PinCandidates[] = [
    { pinName: 'Fire Giant (site)', creatureName: 'Fire Giant', chrIds: [4760], candidates: [] },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Fire Giant (site)', { name: 'Fire Giant (site)', category: 'great-enemy', regionId: 'mountaintops', fx: 0.595, fy: 1.605 }],
  ]);
  const regionTransforms = new Map([['mountaintops', IDENTITY_SCALE_TRANSFORM]]);

  const { anchors, unresolved } = matchGreatEnemies(pins, locationsByName, regionTransforms);

  assert.equal(anchors.length, 0);
  assert.deepEqual(unresolved, ['Fire Giant (site)']);
});

test('matchGreatEnemies reports a pin as unresolved when the best candidate is too far from the existing pin', () => {
  // Simulates a chr-ID collision where the only candidates found actually belong to a different
  // region's creature -- the transformed position ends up far from where the pin was drawn.
  const pins: PinCandidates[] = [
    {
      pinName: 'Magma Wyrm Makar (site)',
      creatureName: 'Magma Wyrm Makar',
      chrIds: [4910],
      candidates: [
        { mapTileId: 'm60_00_00_00', partName: 'c4910_9000', localX: 100, localY: 0, localZ: 100 },
      ],
    },
  ];
  const locationsByName = new Map<string, LocationInput>([
    ['Magma Wyrm Makar (site)', { name: 'Magma Wyrm Makar (site)', category: 'great-enemy', regionId: 'liurnia', fx: 0.075, fy: 0.739 }],
  ]);
  // worldX=100,worldZ=100 -> fx=0.6, fy=0.6 via IDENTITY_SCALE_TRANSFORM -- far from (0.075, 0.739).
  const regionTransforms = new Map([['liurnia', IDENTITY_SCALE_TRANSFORM]]);

  const { anchors, unresolved } = matchGreatEnemies(pins, locationsByName, regionTransforms);

  assert.equal(anchors.length, 0);
  assert.deepEqual(unresolved, ['Magma Wyrm Makar (site)']);
});
