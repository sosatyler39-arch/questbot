import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { CATEGORIZED_LOCATIONS } from '../src/pipeline/sources/data/item-locations/categorized.js';

// item_locations' real primary key is (item_name, category) — see
// schema.sql — precisely because the game itself reuses names across
// categories (an incantation and its matching Ash of War both named
// "Golden Vow"; "Beast Claw" naming both an incantation and an unrelated
// weapon). A composite-key collision would mean two *different* items
// authored under the very same category share a name, which should never
// happen and would silently overwrite one with the other on sync — this
// test's job is to catch that the moment it's introduced, the way "Beast
// Claw" was previously caught only by a whole-branch review.
test('no two CATEGORIZED_LOCATIONS entries share the same (item_name, category)', () => {
  const seen = new Set<string>();
  const collisions: string[] = [];

  for (const entry of CATEGORIZED_LOCATIONS) {
    const key = `${entry.category}::${entry.itemName}`;
    if (seen.has(key)) {
      collisions.push(`"${entry.itemName}" appears twice under category "${entry.category}"`);
    } else {
      seen.add(key);
    }
  }

  assert.deepEqual(collisions, []);
});

// locationNames may only reference real MapLocation.name values — an
// invented name would silently break the "Show on map" feature.
test('every locationNames entry references a real MapLocation.name', () => {
  const locationsPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../client/src/renderer/map/locations.ts',
  );
  const source = readFileSync(locationsPath, 'utf-8');
  const realNames = new Set(
    [...source.matchAll(/name:\s*(['"])((?:\\.|(?!\1).)*)\1/g)].map((m) =>
      m[2].replace(/\\(['"])/g, '$1'),
    ),
  );
  assert.ok(realNames.size > 100, `expected many real location names, found ${realNames.size} — parsing likely broke`);

  const invalid: string[] = [];
  for (const entry of CATEGORIZED_LOCATIONS) {
    for (const locationName of entry.locationNames) {
      if (!realNames.has(locationName)) {
        invalid.push(`${entry.category}: "${entry.itemName}" references unknown location "${locationName}"`);
      }
    }
  }

  assert.deepEqual(invalid, []);
});
