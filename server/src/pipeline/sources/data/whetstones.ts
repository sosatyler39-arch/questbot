import type { ArticlePage } from '../types.js';

// Whetblades/whetstones (weapon Ash of War + affinity unlock items). Item
// groupings supplied directly by the user, not scraped or from our own
// recall — same precision-sourcing rule as the rest of the corpus.
const PLACEHOLDER = (slug: string) => `questbot://guide/whetstone/${slug}`;

export const WHETSTONE_PAGES: ArticlePage[] = [
  {
    title: 'Whetstones and whetblades',
    url: PLACEHOLDER('whetstones'),
    sections: [
      { heading: 'Whetstone Knife', text: "Unlocks the ability to use Ashes of War to grant weapon skills and affinities to armaments." },
      { heading: 'Iron Whetblade', text: 'Unlocks the Heavy, Keen, and Quality affinity upgrades.' },
      { heading: 'Glintstone Whetblade', text: 'Unlocks the Magic and Cold affinity upgrades.' },
      { heading: 'Red-Hot Whetblade', text: 'Unlocks the Fire and Flame Art affinity upgrades.' },
      { heading: 'Sanctified Whetblade', text: 'Unlocks the Lightning and Sacred affinity upgrades.' },
      { heading: 'Black Whetblade', text: 'Unlocks the Poison, Blood, and Occult affinity upgrades.' },
    ],
  },
];
