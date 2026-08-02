import type { Attribute } from './attributes.js';
import type { AttackPowerType } from './attackPowerTypes.js';
import type { Weapon, AttackElementCorrect } from './weapon.js';
import { evaluateCalcCorrectGraph, type CalcCorrectGraph } from './scaling-curve.js';

export interface RawReinforceLevel {
  attack: Record<string, number>;
  attributeScaling: Record<string, number>;
}

export interface RawWeapon {
  name: string;
  weaponName: string;
  url?: string;
  affinityId: number;
  weaponType: number;
  requirements: Partial<Record<Attribute, number>>;
  attack: [AttackPowerType, number][];
  attributeScaling: [Attribute, number][];
  reinforceTypeId: number;
  attackElementCorrectId: number;
  calcCorrectGraphIds: Partial<Record<AttackPowerType, number>>;
  paired?: boolean;
  sorceryTool?: boolean;
  incantationTool?: boolean;
  dlc?: boolean;
}

export interface RegulationData {
  calcCorrectGraphs: Record<string, CalcCorrectGraph>;
  attackElementCorrects: Record<string, AttackElementCorrect>;
  reinforceTypes: Record<string, RawReinforceLevel[]>;
  scalingTiers: [number, string][];
  weapons: RawWeapon[];
}

export function decodeWeapon(raw: RawWeapon, data: RegulationData): Weapon {
  const reinforceLevels = data.reinforceTypes[raw.reinforceTypeId];
  if (!reinforceLevels) {
    throw new Error(`Unknown reinforceTypeId ${raw.reinforceTypeId} on "${raw.name}"`);
  }

  const attack = reinforceLevels.map((level) =>
    Object.fromEntries(raw.attack.map(([type, base]) => [type, base * (level.attack[type] ?? 1)])),
  );

  const attributeScaling = reinforceLevels.map((level) =>
    Object.fromEntries(
      raw.attributeScaling.map(([attr, base]) => [attr, base * (level.attributeScaling[attr] ?? 1)]),
    ),
  );

  // The live regulation data omits a damage type's entry from calcCorrectGraphIds when it
  // uses the standard graph (id 0) — e.g. every standard-affinity melee weapon's physical
  // scaling. So every type the weapon actually deals damage in needs a graph, defaulting to
  // graph 0 when calcCorrectGraphIds doesn't override it.
  const damageTypes = new Set([
    ...raw.attack.map(([type]) => String(type)),
    ...Object.keys(raw.calcCorrectGraphIds),
  ]);
  const calcCorrectGraphs = Object.fromEntries(
    [...damageTypes].map((type) => {
      const graphId = raw.calcCorrectGraphIds[type as unknown as AttackPowerType] ?? 0;
      const graph = data.calcCorrectGraphs[graphId];
      if (!graph) {
        throw new Error(`Unknown calcCorrectGraph ${graphId} on "${raw.name}"`);
      }
      return [type, evaluateCalcCorrectGraph(graph)];
    }),
  ) as Record<AttackPowerType, number[]>;

  const attackElementCorrect = data.attackElementCorrects[raw.attackElementCorrectId];
  if (!attackElementCorrect) {
    throw new Error(`Unknown attackElementCorrectId ${raw.attackElementCorrectId} on "${raw.name}"`);
  }

  return {
    name: raw.name,
    weaponName: raw.weaponName,
    url: raw.url ?? null,
    affinityId: raw.affinityId,
    weaponType: raw.weaponType as Weapon['weaponType'],
    requirements: raw.requirements,
    attributeScaling,
    attack,
    attackElementCorrect,
    calcCorrectGraphs,
    paired: raw.paired,
    sorceryTool: raw.sorceryTool,
    incantationTool: raw.incantationTool,
    scalingTiers: data.scalingTiers,
    dlc: raw.dlc ?? false,
  };
}
