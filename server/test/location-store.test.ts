import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upsertItemLocations, getItemLocation } from '../src/pipeline/location-store.js';

const skip = !process.env.DATABASE_URL;

test('upsert + lookup roundtrip, case-insensitive', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([
    { itemName, category: 'weapon', locationNames: ['Church of Elleh'], summary: 'Test fixture summary.' },
  ]);
  const result = await getItemLocation(itemName.toUpperCase(), 'weapon');
  assert.deepEqual(result, { locationNames: ['Church of Elleh'], summary: 'Test fixture summary.' });
});

test('upsert overwrites an existing row for the same item name + category', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([{ itemName, category: 'weapon', locationNames: [], summary: 'First.' }]);
  await upsertItemLocations([{ itemName, category: 'weapon', locationNames: ['Limgrave'], summary: 'Second.' }]);
  const result = await getItemLocation(itemName, 'weapon');
  assert.deepEqual(result, { locationNames: ['Limgrave'], summary: 'Second.' });
});

test('same item name under a different category is a distinct row', { skip }, async () => {
  const itemName = `Test Fixture Item ${Date.now()}`;
  await upsertItemLocations([{ itemName, category: 'weapon', locationNames: ['Limgrave'], summary: 'Weapon version.' }]);
  await upsertItemLocations([{ itemName, category: 'incantation', locationNames: ['Caelid'], summary: 'Incantation version.' }]);
  assert.deepEqual(await getItemLocation(itemName, 'weapon'), { locationNames: ['Limgrave'], summary: 'Weapon version.' });
  assert.deepEqual(await getItemLocation(itemName, 'incantation'), { locationNames: ['Caelid'], summary: 'Incantation version.' });
});

test('unknown item returns null', { skip }, async () => {
  assert.equal(await getItemLocation(`no-such-item-${Date.now()}`, 'weapon'), null);
});
