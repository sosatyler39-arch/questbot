import { test } from 'node:test';
import assert from 'node:assert/strict';
import { distinctWeaponNames, affinitiesForWeapon, affinityLabel } from './weapon-index.js';
import type { RawWeapon } from './decode-weapon.js';

function makeWeapon(overrides: Partial<RawWeapon>): RawWeapon {
  return {
    name: 'Dagger',
    weaponName: 'Dagger',
    affinityId: 0,
    weaponType: 1,
    requirements: {},
    attack: [],
    attributeScaling: [],
    reinforceTypeId: 100,
    attackElementCorrectId: 10000,
    calcCorrectGraphIds: {},
    ...overrides,
  };
}

test('distinctWeaponNames returns one sorted entry per weaponName, dropping affinity duplicates', () => {
  const weapons = [
    makeWeapon({ name: 'Heavy Dagger', weaponName: 'Dagger', affinityId: 1 }),
    makeWeapon({ name: 'Dagger', weaponName: 'Dagger', affinityId: 0 }),
    makeWeapon({ name: 'Longsword', weaponName: 'Longsword', affinityId: 0 }),
  ];
  assert.deepEqual(distinctWeaponNames(weapons), ['Dagger', 'Longsword']);
});

test("affinitiesForWeapon returns only that weapon's variants, sorted by affinityId", () => {
  const dagger0 = makeWeapon({ name: 'Dagger', weaponName: 'Dagger', affinityId: 0 });
  const dagger1 = makeWeapon({ name: 'Heavy Dagger', weaponName: 'Dagger', affinityId: 1 });
  const longsword = makeWeapon({ name: 'Longsword', weaponName: 'Longsword', affinityId: 0 });
  const result = affinitiesForWeapon('Dagger', [longsword, dagger1, dagger0]);
  assert.deepEqual(result, [dagger0, dagger1]);
});

test('affinityLabel returns "Standard" for affinityId 0 and -1', () => {
  assert.equal(
    affinityLabel(makeWeapon({ name: 'Dagger', weaponName: 'Dagger', affinityId: 0 })),
    'Standard',
  );
  assert.equal(
    affinityLabel(
      makeWeapon({ name: 'Glintstone Staff', weaponName: 'Glintstone Staff', affinityId: -1 }),
    ),
    'Standard',
  );
});

test('affinityLabel strips the trailing weaponName to get the affinity prefix', () => {
  assert.equal(
    affinityLabel(makeWeapon({ name: 'Heavy Dagger', weaponName: 'Dagger', affinityId: 1 })),
    'Heavy',
  );
  assert.equal(
    affinityLabel(makeWeapon({ name: 'Flame Art Dagger', weaponName: 'Dagger', affinityId: 5 })),
    'Flame Art',
  );
});
