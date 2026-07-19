import type { ArticlePage } from '../types.js';

// The eight core character stats and their mechanical effects, including
// soft-cap and breakpoint values. Exact figures supplied directly by the
// user, not scraped or from our own recall.
export const STAT_PAGES: ArticlePage[] = [
  {
    title: 'Character stats',
    url: 'questbot://guide/character-stats',
    sections: [
      {
        heading: 'Vigor',
        text: 'Governs HP. Increases Fire Resistance and Immunity. HP scaling is strongest until 40. Soft caps: 40 / 60.',
      },
      {
        heading: 'Mind',
        text: 'Governs FP. Increases Focus. FP scaling is strongest until 50. Soft caps: 50 / 60.',
      },
      {
        heading: 'Endurance',
        text: 'Governs Stamina. Increases Robustness. Determines Equip Load. Stamina soft caps: 15 / 30 / 50. Equip Load soft caps: 25 / 60.',
      },
      {
        heading: 'Strength',
        text: 'Required for heavy weapons. Increases physical weapon damage for Strength-scaling weapons. Two-handing a weapon effectively increases Strength by 50%. Weapon damage breakpoints: 16, 18, 20, 30, 45, 50, 60, 80. Casting breakpoints: 30 / 45.',
      },
      {
        heading: 'Dexterity',
        text: 'Required for advanced weapons. Increases Dexterity weapon damage. Reduces spell casting time. Reduces fall damage. Makes you harder to knock off your horse. Weapon damage breakpoints: 16, 18, 20, 30, 45, 50, 60, 80. Casting breakpoints: 30 / 45.',
      },
      {
        heading: 'Intelligence',
        text: 'Required for Sorceries. Increases Sorcery damage. Increases Magic Resistance. Increases Intelligence weapon scaling. Weapon damage breakpoints: 20, 30, 45, 50, 60, 80. Casting breakpoints: 30, 45, 60, 80 (depends on catalyst).',
      },
      {
        heading: 'Faith',
        text: 'Required for Incantations. Increases Incantation damage. Increases Faith weapon scaling. Weapon damage breakpoints: 20, 30, 45, 50, 60, 80. Casting breakpoints: 30, 45, 60, 80 (depends on catalyst).',
      },
      {
        heading: 'Arcane',
        text: 'Increases Holy Defense and Death Resistance. Increases Item Discovery. Increases Arcane weapon scaling. Improves Poison, Blood, Sleep, and Madness buildup. Weapon damage breakpoints: 18, 20, 30, 45, 60, 80. Casting breakpoints: 30 / 45. Status buildup breakpoints: 40 / 45 / 60.',
      },
    ],
  },
];
