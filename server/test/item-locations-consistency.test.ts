import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { TALISMAN_LOCATIONS } from '../src/pipeline/sources/data/item-locations/talismans-locations.js';
import { INCANTATION_LOCATIONS } from '../src/pipeline/sources/data/item-locations/incantations-locations.js';
import { SORCERY_LOCATIONS } from '../src/pipeline/sources/data/item-locations/sorceries-locations.js';
import { CONSUMABLE_LOCATIONS } from '../src/pipeline/sources/data/item-locations/consumables-locations.js';
import { ASH_OF_WAR_LOCATIONS } from '../src/pipeline/sources/data/item-locations/ashes-of-war-locations.js';
import { CRYSTAL_TEAR_LOCATIONS } from '../src/pipeline/sources/data/item-locations/crystal-tears-locations.js';
import { WHETSTONE_AND_GREAT_RUNE_LOCATIONS } from '../src/pipeline/sources/data/item-locations/whetstones-great-runes-locations.js';
import { WEAPON_LOCATIONS } from '../src/pipeline/sources/data/item-locations/weapons-locations.js';
import { ARMOR_LOCATIONS } from '../src/pipeline/sources/data/item-locations/armor-locations.js';
import type { ItemLocationEntry } from '../src/pipeline/sources/types.js';

// One entry per *_LOCATIONS export — add new categories here as they're authored.
const ALL_FILES: Record<string, ItemLocationEntry[]> = {
  'talismans-locations.ts': TALISMAN_LOCATIONS,
  'incantations-locations.ts': INCANTATION_LOCATIONS,
  'sorceries-locations.ts': SORCERY_LOCATIONS,
  'consumables-locations.ts': CONSUMABLE_LOCATIONS,
  'ashes-of-war-locations.ts': ASH_OF_WAR_LOCATIONS,
  'crystal-tears-locations.ts': CRYSTAL_TEAR_LOCATIONS,
  'whetstones-great-runes-locations.ts': WHETSTONE_AND_GREAT_RUNE_LOCATIONS,
  'weapons-locations.ts': WEAPON_LOCATIONS,
  'armor-locations.ts': ARMOR_LOCATIONS,
};

// item_locations.item_name is a primary key (location-store.ts), so a name
// reused across two files silently overwrites one entry's data with the
// other's on sync. This codebase's established convention (see README's
// "Item location index" section) is to tolerate and document known
// collisions rather than force a schema change — a future composite key
// (name + source category) would fix the class properly. This test's job
// is narrower: catch any *new, undocumented* collision the moment it's
// introduced, the way "Beast Claw" (an incantation/weapon collision) was
// caught only by a whole-branch review, not by any automated check.
const KNOWN_COLLISIONS = new Set([
  'Glintstone Pebble',
  'Glintblade Phalanx',
  'Carian Greatsword',
  "Thops's Barrier",
  'Carian Retaliation',
  'Golden Vow',
  'Beast Claw',
]);

test('no new item_name collisions beyond the documented, known ones', () => {
  const seenIn = new Map<string, string>();
  const newCollisions: string[] = [];

  for (const [file, entries] of Object.entries(ALL_FILES)) {
    for (const entry of entries) {
      const existing = seenIn.get(entry.itemName);
      if (existing && existing !== file && !KNOWN_COLLISIONS.has(entry.itemName)) {
        newCollisions.push(`"${entry.itemName}" appears in both ${existing} and ${file} (not in KNOWN_COLLISIONS)`);
      } else {
        seenIn.set(entry.itemName, file);
      }
    }
  }

  assert.deepEqual(newCollisions, []);
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
  for (const [file, entries] of Object.entries(ALL_FILES)) {
    for (const entry of entries) {
      for (const locationName of entry.locationNames) {
        if (!realNames.has(locationName)) {
          invalid.push(`${file}: "${entry.itemName}" references unknown location "${locationName}"`);
        }
      }
    }
  }

  assert.deepEqual(invalid, []);
});
