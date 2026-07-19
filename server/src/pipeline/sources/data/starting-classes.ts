import type { ArticlePage } from '../types.js';

// Starting classes and their base stats/equipment — exact figures supplied
// directly by the user (not scraped, not our own uncertain recall). This
// replaces an earlier version of this file that only described stat
// *leans* because precise numbers weren't confidently known at the time.
export const STARTING_CLASS_PAGES: ArticlePage[] = [
  {
    title: 'Starting classes overview',
    url: 'questbot://guide/starting-classes-overview',
    sections: [
      {
        heading: 'Overview',
        text: 'Elden Ring has twelve starting classes, chosen at character creation. The choice only affects the starting stat distribution, starting level, and starting equipment — it does not lock the character into any playstyle, since every stat can be leveled freely afterward and equipment can be freely changed.',
      },
      {
        heading: 'The classes',
        text: 'Hero, Bandit, Astrologer, Warrior, Prisoner, Confessor, Wretch, Vagabond, Prophet, Samurai, Heavy Knight, and Idus Knight.',
      },
    ],
  },
  {
    title: 'Hero (starting class)',
    url: 'questbot://guide/class-hero',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 7. Vigor 14, Mind 9, Endurance 12, Strength 16, Dexterity 9, Intelligence 7, Faith 8, Arcane 11. Total stat points: 86.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Battle Axe, Large Leather Shield. Armor: Champion Headband, Champion Pauldron, Champion Bracers, Champion Gaiters.',
      },
    ],
  },
  {
    title: 'Bandit (starting class)',
    url: 'questbot://guide/class-bandit',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 5. Vigor 10, Mind 11, Endurance 10, Strength 9, Dexterity 13, Intelligence 9, Faith 8, Arcane 14. Total stat points: 84.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Great Knife, Shortbow, Bone Arrow (Fletched) x30, Buckler. Armor: Bandit Mask, Bandit Garb, Bandit Manchettes, Bandit Boots.',
      },
    ],
  },
  {
    title: 'Astrologer (starting class)',
    url: 'questbot://guide/class-astrologer',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 6. Vigor 9, Mind 15, Endurance 9, Strength 8, Dexterity 12, Intelligence 16, Faith 7, Arcane 9. Total stat points: 85.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Glintstone Pebble, Glintstone Arc, Short Sword, Astrologer\'s Staff, Scripture Wooden Shield. Armor: Astrologer Hood, Astrologer Robe, Astrologer Gloves, Astrologer Trousers.',
      },
    ],
  },
  {
    title: 'Warrior (starting class)',
    url: 'questbot://guide/class-warrior',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 8. Vigor 11, Mind 12, Endurance 11, Strength 10, Dexterity 16, Intelligence 10, Faith 8, Arcane 9. Total stat points: 87.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Scimitar x2, Riveted Wooden Shield. Armor: Blue Cloth Cowl, Blue Cloth Vest, Warrior Gauntlets, Warrior Greaves.',
      },
    ],
  },
  {
    title: 'Prisoner (starting class)',
    url: 'questbot://guide/class-prisoner',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 9. Vigor 11, Mind 12, Endurance 11, Strength 11, Dexterity 14, Intelligence 14, Faith 6, Arcane 9. Total stat points: 88.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Magic Glintblade, Estoc, Glintstone Staff, Rift Shield. Armor: Prisoner Iron Mask, Prisoner Clothing, Prisoner Trousers.',
      },
    ],
  },
  {
    title: 'Confessor (starting class)',
    url: 'questbot://guide/class-confessor',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 10. Vigor 10, Mind 13, Endurance 10, Strength 12, Dexterity 12, Intelligence 9, Faith 14, Arcane 9. Total stat points: 89.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Urgent Heal, Assassin\'s Approach, Broadsword, Finger Seal, Blue Crest Heater Shield. Armor: Confessor Hood, Confessor Armor, Confessor Gloves, Confessor Boots.',
      },
    ],
  },
  {
    title: 'Wretch (starting class)',
    url: 'questbot://guide/class-wretch',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 1. Vigor 10, Mind 10, Endurance 10, Strength 10, Dexterity 10, Intelligence 10, Faith 10, Arcane 10. Total stat points: 80 — the lowest starting level and total of any class, with every stat equal.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Club. Armor: none.',
      },
    ],
  },
  {
    title: 'Vagabond (starting class)',
    url: 'questbot://guide/class-vagabond',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 9. Vigor 15, Mind 10, Endurance 11, Strength 14, Dexterity 13, Intelligence 9, Faith 9, Arcane 7. Total stat points: 88.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Longsword, Halberd, Heater Shield. Armor: Vagabond Knight Helm, Vagabond Knight Armor, Vagabond Knight Gauntlets, Vagabond Knight Greaves.',
      },
    ],
  },
  {
    title: 'Prophet (starting class)',
    url: 'questbot://guide/class-prophet',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 7. Vigor 10, Mind 14, Endurance 8, Strength 11, Dexterity 10, Intelligence 7, Faith 16, Arcane 10. Total stat points: 86.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Heal, Catch Flame, Short Spear, Finger Seal, Rickety Shield. Armor: Prophet Blindfold, Prophet Robe, Prophet Trousers.',
      },
    ],
  },
  {
    title: 'Samurai (starting class)',
    url: 'questbot://guide/class-samurai',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 9. Vigor 12, Mind 11, Endurance 13, Strength 12, Dexterity 15, Intelligence 9, Faith 8, Arcane 8. Total stat points: 88.',
      },
      {
        heading: 'Starting equipment',
        text: 'Weapons/items: Uchigatana, Longbow, Arrow x20, Fire Arrow x10, Red Thorn Roundshield. Armor: Land of Reeds Helm, Land of Reeds Armor, Land of Reeds Gauntlets, Land of Reeds Greaves.',
      },
    ],
  },
  {
    title: 'Heavy Knight (starting class)',
    url: 'questbot://guide/class-heavy-knight',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 10. Vigor 14, Mind 8, Endurance 17, Strength 15, Dexterity 11, Intelligence 7, Faith 8, Arcane 9. Total stat points: 89 — the highest starting Endurance of any class.',
      },
      {
        heading: 'Starting equipment',
        text: 'Not yet recorded — flagged as pending rather than guessed.',
      },
    ],
  },
  {
    title: 'Idus Knight (starting class)',
    url: 'questbot://guide/class-idus-knight',
    sections: [
      {
        heading: 'Stats',
        text: 'Level 7. Vigor 10, Mind 12, Endurance 11, Strength 13, Dexterity 15, Intelligence 8, Faith 11, Arcane 6. Total stat points: 86.',
      },
    ],
  },
];
