import type { ArticlePage } from '../types.js';

// Starting keepsakes — chosen at character creation alongside the starting
// class. Exact list and effects supplied directly by the user, not scraped
// or from our own recall.
export const KEEPSAKE_PAGES: ArticlePage[] = [
  {
    title: 'Starting keepsakes',
    url: 'questbot://guide/keepsakes',
    sections: [
      {
        heading: 'Overview',
        text: 'Keepsakes are a small starting item chosen alongside the character class at the start of a run. There are ten options, including choosing none at all.',
      },
      {
        heading: 'None',
        text: 'No keepsake — the player starts with nothing from this selection.',
      },
      {
        heading: 'Crimson Amber Medallion',
        text: 'Increases maximum HP by 6% while equipped.',
      },
      {
        heading: 'Lands Between Rune',
        text: 'A consumable that grants 3,000 Runes when used.',
      },
      {
        heading: 'Golden Seed',
        text: 'Grants an additional Sacred Flask charge.',
      },
      {
        heading: 'Fanged Imp Ashes',
        text: 'A Spirit Ash that summons two Fanged Imps to fight for you.',
      },
      {
        heading: 'Cracked Pot',
        text: 'Used to craft Throwing Pots.',
      },
      {
        heading: 'Stonesword Key',
        text: 'Unlocks areas sealed by Imp Statues.',
      },
      {
        heading: "Bewitching Branch",
        text: 'Turns a targeted enemy into a temporary ally for 3 minutes.',
      },
      {
        heading: 'Boiled Prawn',
        text: 'A consumable that boosts physical damage negation for 1 minute.',
      },
      {
        heading: "Shabriri's Woe",
        text: 'Constantly attracts enemy aggression while equipped.',
      },
    ],
  },
];
