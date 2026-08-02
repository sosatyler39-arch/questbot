import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeWeapon, type RawWeapon, type RegulationData } from './decode-weapon.js';
import { AttackPowerType } from './attackPowerTypes.js';

const testData: RegulationData = {
  calcCorrectGraphs: {
    '0': [
      { maxVal: 1, maxGrowVal: 5, adjPt: 1 },
      { maxVal: 150, maxGrowVal: 5, adjPt: 1 },
    ],
    '1': [
      { maxVal: 1, maxGrowVal: 0, adjPt: 1 },
      { maxVal: 150, maxGrowVal: 1, adjPt: 1 },
    ],
  },
  attackElementCorrects: {
    '10000': { [AttackPowerType.PHYSICAL]: { str: true } },
  },
  reinforceTypes: {
    '100': [
      { attack: { '0': 1 }, attributeScaling: { str: 1 } },
      { attack: { '0': 1.1 }, attributeScaling: { str: 1.05 } },
    ],
  },
  scalingTiers: [],
  weapons: [],
};

const testRawWeapon: RawWeapon = {
  name: 'Test Dagger',
  weaponName: 'Test Dagger',
  affinityId: 0,
  weaponType: 1,
  requirements: { str: 5 },
  attack: [[AttackPowerType.PHYSICAL, 100]],
  attributeScaling: [['str', 0.5]],
  reinforceTypeId: 100,
  attackElementCorrectId: 10000,
  calcCorrectGraphIds: { [AttackPowerType.PHYSICAL]: 1 },
};

test('decodeWeapon expands reinforceTypeId into per-upgrade-level attack/attributeScaling', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  // Floating-point multiplication (100 * 1.1) doesn't land on an exact
  // decimal, so compare with a tolerance rather than strict equality.
  assert.equal(weapon.attack[0][AttackPowerType.PHYSICAL], 100);
  assert.ok(Math.abs(weapon.attack[1][AttackPowerType.PHYSICAL]! - 110) < 1e-9);
  assert.equal(weapon.attributeScaling[0].str, 0.5);
  assert.ok(Math.abs(weapon.attributeScaling[1].str! - 0.525) < 1e-9);
});

test('decodeWeapon resolves calcCorrectGraphIds into evaluated lookup arrays', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  assert.equal(weapon.calcCorrectGraphs[AttackPowerType.PHYSICAL].length, 149);
  assert.equal(weapon.calcCorrectGraphs[AttackPowerType.PHYSICAL][1], 0);
});

test('decodeWeapon passes attackElementCorrect through directly', () => {
  const weapon = decodeWeapon(testRawWeapon, testData);
  assert.deepEqual(weapon.attackElementCorrect, { [AttackPowerType.PHYSICAL]: { str: true } });
});

test('decodeWeapon throws on an unknown reinforceTypeId rather than silently producing wrong data', () => {
  const badWeapon = { ...testRawWeapon, reinforceTypeId: 999 };
  assert.throws(() => decodeWeapon(badWeapon, testData), /Unknown reinforceTypeId/);
});

test('decodeWeapon defaults a damage type missing from calcCorrectGraphIds to graph "0"', () => {
  // Real regulation data omits a type's entry from calcCorrectGraphIds when it uses the
  // standard graph (id 0) — e.g. every standard-affinity melee weapon's physical scaling.
  const weaponWithNoOverride: RawWeapon = { ...testRawWeapon, calcCorrectGraphIds: {} };
  const weapon = decodeWeapon(weaponWithNoOverride, testData);
  assert.equal(weapon.calcCorrectGraphs[AttackPowerType.PHYSICAL][1], 5);
});
