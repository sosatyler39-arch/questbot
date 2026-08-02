import { decodeWeapon, type RegulationData } from './decode-weapon.js';
import getWeaponAttack, { type WeaponAttackResult } from './calculator.js';
import type { Attributes } from './attributes.js';
import { AttackPowerType, allDamageTypes, allStatusTypes } from './attackPowerTypes.js';
import { affinitiesForWeapon, affinityLabel } from './weapon-index.js';

const DAMAGE_LABELS: Record<number, string> = {
  [AttackPowerType.PHYSICAL]: 'Physical',
  [AttackPowerType.MAGIC]: 'Magic',
  [AttackPowerType.FIRE]: 'Fire',
  [AttackPowerType.LIGHTNING]: 'Lightning',
  [AttackPowerType.HOLY]: 'Holy',
  [AttackPowerType.POISON]: 'Poison',
  [AttackPowerType.SCARLET_ROT]: 'Scarlet Rot',
  [AttackPowerType.BLEED]: 'Bleed',
  [AttackPowerType.FROST]: 'Frost',
  [AttackPowerType.SLEEP]: 'Sleep',
  [AttackPowerType.MADNESS]: 'Madness',
  [AttackPowerType.DEATH_BLIGHT]: 'Death Blight',
};

export function initCalculator(): void {
  const weaponSelect = document.getElementById('calc-weapon') as HTMLSelectElement | null;
  const affinitySelect = document.getElementById('calc-affinity') as HTMLSelectElement | null;
  const levelInput = document.getElementById('calc-level') as HTMLInputElement | null;
  const strInput = document.getElementById('calc-str') as HTMLInputElement | null;
  const dexInput = document.getElementById('calc-dex') as HTMLInputElement | null;
  const intInput = document.getElementById('calc-int') as HTMLInputElement | null;
  const faiInput = document.getElementById('calc-fai') as HTMLInputElement | null;
  const arcInput = document.getElementById('calc-arc') as HTMLInputElement | null;
  const twoHandingInput = document.getElementById('calc-two-handing') as HTMLInputElement | null;
  const output = document.getElementById('calc-output');
  if (
    !weaponSelect ||
    !affinitySelect ||
    !levelInput ||
    !strInput ||
    !dexInput ||
    !intInput ||
    !faiInput ||
    !arcInput ||
    !twoHandingInput ||
    !output
  ) {
    return;
  }

  let data: RegulationData | null = null;

  function populateAffinities(): void {
    if (!data) return;
    const variants = affinitiesForWeapon(weaponSelect!.value, data.weapons);
    affinitySelect!.innerHTML = '';
    for (const variant of variants) {
      const option = document.createElement('option');
      option.value = String(variant.affinityId);
      option.textContent = affinityLabel(variant);
      affinitySelect!.appendChild(option);
    }
  }

  function renderResult(result: WeaponAttackResult): void {
    const rows = [...allDamageTypes, ...allStatusTypes]
      .filter((type) => result.attackPower[type] !== undefined)
      .map(
        (type) =>
          `<div class="calc-row"><span>${DAMAGE_LABELS[type]}</span><span>${Math.floor(
            result.attackPower[type]!,
          )}</span></div>`,
      )
      .join('');

    const warning = result.ineffectiveAttributes.length
      ? `<div class="calc-warning">Attribute requirement not met: ${result.ineffectiveAttributes
          .join(', ')
          .toUpperCase()} (scaling reduced)</div>`
      : '';

    output!.innerHTML = `<h2>Attack Power</h2>${rows}${warning}`;
  }

  function recompute(): void {
    if (!data) return;
    const affinityId = Number(affinitySelect!.value);
    const raw = data.weapons.find(
      (w) => w.weaponName === weaponSelect!.value && w.affinityId === affinityId,
    );
    if (!raw) return;

    const weapon = decodeWeapon(raw, data);
    const maxLevel = weapon.attack.length - 1;
    levelInput!.max = String(maxLevel);
    const level = Math.max(0, Math.min(Number(levelInput!.value) || 0, maxLevel));

    const attributes: Attributes = {
      str: Number(strInput!.value) || 0,
      dex: Number(dexInput!.value) || 0,
      int: Number(intInput!.value) || 0,
      fai: Number(faiInput!.value) || 0,
      arc: Number(arcInput!.value) || 0,
    };

    const result = getWeaponAttack({
      weapon,
      attributes,
      twoHanding: twoHandingInput!.checked,
      upgradeLevel: level,
    });

    renderResult(result);
  }

  for (const input of [levelInput, strInput, dexInput, intInput, faiInput, arcInput, twoHandingInput]) {
    input.addEventListener('input', recompute);
  }
  weaponSelect.addEventListener('change', () => {
    populateAffinities();
    recompute();
  });
  affinitySelect.addEventListener('change', recompute);

  fetch('/elden-ring/calculator-data.json')
    .then((r) => r.json())
    .then((loaded: RegulationData) => {
      data = loaded;
      populateAffinities();
      recompute();
    });
}
