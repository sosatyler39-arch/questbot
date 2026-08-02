import type { Attribute } from "./attributes.js";
import type { AttackPowerType } from "./attackPowerTypes.js";
import type { WeaponType } from "./weaponTypes.js";

export type AttackElementCorrect = Partial<
  Record<AttackPowerType, Partial<Record<Attribute, number | true>>>
>;

export interface Weapon {
  name: string;
  weaponName: string;
  variant?: string;
  url: string | null;
  affinityId: number;
  weaponType: WeaponType;
  requirements: Partial<Record<Attribute, number>>;
  attributeScaling: Partial<Record<Attribute, number>>[];
  attack: Partial<Record<AttackPowerType, number>>[];
  attackElementCorrect: AttackElementCorrect;
  calcCorrectGraphs: Record<AttackPowerType, number[]>;
  paired?: boolean;
  sorceryTool?: boolean;
  incantationTool?: boolean;
  scalingTiers: [number, string][];
  dlc: boolean;
}
