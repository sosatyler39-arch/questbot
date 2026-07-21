import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upsertItemLocations, getItemLocation } from '../src/pipeline/location-store.js';

const skip = !process.env.DATABASE_URL;

test('upsert + lookup roundtrip, case-insensitive', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([
    { itemName, locationNames: ['Church of Elleh'], summary: 'Test fixture summary.' },
  ]);
  const result = await getItemLocation(itemName.toUpperCase());
  assert.deepEqual(result, { locationNames: ['Church of Elleh'], summary: 'Test fixture summary.' });
});

test('upsert overwrites an existing row for the same item name', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([{ itemName, locationNames: [], summary: 'First.' }]);
  await upsertItemLocations([{ itemName, locationNames: ['Limgrave'], summary: 'Second.' }]);
  const result = await getItemLocation(itemName);
  assert.deepEqual(result, { locationNames: ['Limgrave'], summary: 'Second.' });
});

test('unknown item returns null', { skip }, async () => {
  assert.equal(await getItemLocation(`no-such-item-${Date.now()}`), null);
});
