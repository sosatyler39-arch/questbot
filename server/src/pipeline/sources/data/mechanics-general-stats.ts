import type { ArticlePage } from '../types.js';

// General character stats (HP/FP/Stamina/Equip Load/Poise/Discovery) and
// the basic ways to attack. Exact content supplied directly by the user,
// not scraped or from our own recall — only light typo cleanup applied,
// no facts changed.
export const GENERAL_STATS_PAGES: ArticlePage[] = [
  {
    title: 'General stats',
    url: 'questbot://guide/general-stats',
    sections: [
      {
        heading: 'HP (Hit Points)',
        text: 'The amount of damage a player can take before dying. Maximum HP increases by leveling the Vigor stat. Once HP gets low, healing is done with a Crimson Flask; other healing methods come from talismans and incantations. HP resets to maximum every time you rest at a Site of Grace.',
      },
      {
        heading: 'FP (Focus Points)',
        text: 'How the player casts Ashes of War, spells, and incantations. FP is raised by leveling the Mind stat and replenished with a Cerulean Flask. Other methods of gaining FP come from talismans. FP resets to maximum every time you rest at a Site of Grace.',
      },
      {
        heading: 'Stamina',
        text: 'Required to complete almost every action in Elden Ring. Stamina replenishes automatically. Out-of-combat actions don\'t cost stamina, but in combat the only actions that don\'t cost stamina are walking and a few specific other actions. Stamina is raised by increasing the Endurance stat.',
      },
      {
        heading: 'Equip Load',
        text: 'The set amount of weight the player can carry before reaching certain tiers, calculated only from equipped armor, weapons, and talismans. The tiers in order are Light, Medium, Heavy, and Overloaded. Light-weight dodges have the most invincibility frames, Heavy dodges have the least, and while Overloaded you cannot dodge roll or run. Certain talismans and Crystal Tears can reduce effective weight. Maximum Equip Load is increased by leveling the Endurance stat.',
      },
      {
        heading: 'Poise',
        text: 'The stat that determines how much punishment a character can take before staggering ("crumbling") to enemy attacks. Poise can only be increased through what armor is worn, not through leveling a core stat.',
      },
      {
        heading: 'Discovery',
        text: 'The stat that determines the chance of receiving percentage-based item drops. Increased by the Arcane stat, and also by certain talismans, armor, and items.',
      },
    ],
  },
  {
    title: 'Ways to attack',
    url: 'questbot://guide/ways-to-attack',
    sections: [
      {
        heading: 'Weapon and casting attacks',
        text: 'With any weapon equipped, the player has light attacks, heavy attacks, rolling attacks, and Ashes of War. Staves are used to cast spells (sorceries); seals are used to cast incantations.',
      },
      {
        heading: 'Guard Counter and Riposte',
        text: 'While blocking with a weapon or shield, getting hit during that blocking animation lets you perform a Guard Counter — an attack that deals increased damage and posture damage when it lands. After an enemy\'s posture bar is maxed out, they enter a staggered animation during which you can perform a Riposte — an attack dealing large, unavoidable damage. Consumables that deal damage (throwing pots, throwing knives, etc.) are also a valid way to attack.',
      },
    ],
  },
];
