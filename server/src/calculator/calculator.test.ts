import { test } from 'node:test';
import assert from 'node:assert/strict';
import getWeaponAttack from './calculator.js';
import { AttackPowerType } from './attackPowerTypes.js';
import { WeaponType } from './weaponTypes.js';
import type { Weapon } from './weapon.js';

// A flat scaling curve (0.01 per attribute point) makes the expected math
// easy to verify by hand: at attribute value N, the curve contributes
// exactly N * 0.01 to totalScaling.
function flatGraph(rate: number): number[] {
  return Array.from({ length: 149 }, (_, i) => i * rate);
}

function makeTestWeapon(overrides: Partial<Weapon> = {}): Weapon {
  return {
    name: 'Test Dagger',
    weaponName: 'Test Dagger',
    url: null,
    affinityId: 0,
    weaponType: WeaponType.DAGGER,
    requirements: { str: 10 },
    attributeScaling: [{ str: 1 }],
    attack: [{ [AttackPowerType.PHYSICAL]: 100 }],
    attackElementCorrect: { [AttackPowerType.PHYSICAL]: { str: true } },
    calcCorrectGraphs: { [AttackPowerType.PHYSICAL]: flatGraph(0.01) } as Record<
      AttackPowerType,
      number[]
    >,
    scalingTiers: [],
    dlc: false,
    ...overrides,
  };
}

test('getWeaponAttack applies scaling when attribute requirements are met', () => {
  const weapon = makeTestWeapon();
  const result = getWeaponAttack({
    weapon,
    attributes: { str: 40, dex: 0, int: 0, fai: 0, arc: 0 },
    upgradeLevel: 0,
  });
  // totalScaling = 1 + flatGraph(0.01)[40] * 1 = 1 + 0.4 = 1.4
  // attackPower = 100 * 1.4 = 140
  assert.equal(result.attackPower[AttackPowerType.PHYSICAL], 140);
  assert.deepEqual(result.ineffectiveAttributes, []);
});

test('getWeaponAttack applies the ineffective-attribute penalty when requirements are unmet', () => {
  const weapon = makeTestWeapon();
  const result = getWeaponAttack({
    weapon,
    attributes: { str: 5, dex: 0, int: 0, fai: 0, arc: 0 },
    upgradeLevel: 0,
  });
  // requirement str:10 not met by str:5 -> penalty path: totalScaling = 1 - 0.4 = 0.6
  // attackPower = 100 * 0.6 = 60
  assert.equal(result.attackPower[AttackPowerType.PHYSICAL], 60);
  assert.deepEqual(result.ineffectiveAttributes, ['str']);
});
