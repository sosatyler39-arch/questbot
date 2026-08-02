import type { RawWeapon } from './decode-weapon.js';

export function distinctWeaponNames(weapons: RawWeapon[]): string[] {
  return [...new Set(weapons.map((w) => w.weaponName))].sort((a, b) => a.localeCompare(b));
}

export function affinitiesForWeapon(weaponName: string, weapons: RawWeapon[]): RawWeapon[] {
  return weapons
    .filter((w) => w.weaponName === weaponName)
    .sort((a, b) => a.affinityId - b.affinityId);
}

export function affinityLabel(weapon: RawWeapon): string {
  if (weapon.affinityId <= 0) return 'Standard';
  return weapon.name.slice(0, weapon.name.length - weapon.weaponName.length - 1);
}
