import type { ArticlePage } from '../types.js';

// Damage types and scaling. Exact content supplied directly by the user,
// not scraped or from our own recall — only light typo cleanup applied,
// no facts changed.
export const DAMAGE_TYPE_PAGES: ArticlePage[] = [
  {
    title: 'Damage types and scaling',
    url: 'questbot://guide/damage-types',
    sections: [
      {
        heading: 'Overview',
        text: 'There are eight damage types in Elden Ring: Standard, Strike, Pierce, Slash, Magic, Fire, Lightning, and Holy. Most enemies are weak to at least one or two of these damage types.',
      },
      {
        heading: 'Physical damage',
        text: 'Standard, Strike, Pierce, and Slash all fall under the Physical Damage category, and can have increased damage by upgrading Strength and/or Dexterity.',
      },
      {
        heading: 'Elemental damage',
        text: 'Magic, Fire, Lightning, and Holy all fall under the Elemental Damage category, each increased by its respective stat: Magic damage is increased by the Intelligence stat, Fire damage is increased by the Strength stat, Lightning damage is increased by the Dexterity stat, and Holy damage is increased by the Faith stat.',
      },
    ],
  },
];
