import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchGracesToLocations, type GraceInput, type LocationInput } from './msb-location-match.js';

const churchOfElleh: LocationInput = {
  name: 'Church of Elleh',
  category: 'church',
  regionId: 'limgrave',
  fx: 0.793,
  fy: 0.691,
};

test('matchGracesToLocations pairs a grace with its matching location by normalized name', () => {
  const grace: GraceInput = { graceName: 'Church of Elleh', worldX: 10711.266, worldZ: 9295.338 };
  const result = matchGracesToLocations([grace], [churchOfElleh]);
  assert.deepEqual(result, [
    {
      name: 'Church of Elleh',
      category: 'church',
      regionId: 'limgrave',
      existingFx: 0.793,
      existingFy: 0.691,
      worldX: 10711.266,
      worldZ: 9295.338,
    },
  ]);
});

test('matchGracesToLocations matches names case/punctuation-insensitively', () => {
  const grace: GraceInput = { graceName: 'church of elleh!', worldX: 1, worldZ: 2 };
  const result = matchGracesToLocations([grace], [churchOfElleh]);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Church of Elleh');
});

test('matchGracesToLocations excludes a grace with no matching location (not an error)', () => {
  const grace: GraceInput = { graceName: 'Castleward Tunnel', worldX: 1, worldZ: 2 };
  const result = matchGracesToLocations([grace], [churchOfElleh]);
  assert.deepEqual(result, []);
});

test('matchGracesToLocations excludes an ambiguous grace name matched by more than one grace', () => {
  const eldenThrone: LocationInput = {
    name: 'Elden Throne',
    category: 'landmark',
    regionId: 'leyndell',
    fx: 0.925,
    fy: 1.939,
  };
  const preBurn: GraceInput = { graceName: 'Elden Throne', worldX: 37.25, worldZ: -416.03 };
  const postBurn: GraceInput = { graceName: 'Elden Throne', worldX: 1317.18, worldZ: -415.93 };
  const result = matchGracesToLocations([preBurn, postBurn], [eldenThrone]);
  assert.deepEqual(result, []);
});

test('matchGracesToLocations excludes an ambiguous location name matched by more than one location', () => {
  const dupeA: LocationInput = { name: 'Church of Elleh', category: 'church', regionId: 'limgrave', fx: 0.1, fy: 0.1 };
  const dupeB: LocationInput = { name: 'church of elleh', category: 'church', regionId: 'limgrave', fx: 0.2, fy: 0.2 };
  const grace: GraceInput = { graceName: 'Church of Elleh', worldX: 1, worldZ: 2 };
  const result = matchGracesToLocations([grace], [dupeA, dupeB]);
  assert.deepEqual(result, []);
});
