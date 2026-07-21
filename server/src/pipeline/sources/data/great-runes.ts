import type { ArticlePage } from '../types.js';

// Great Runes. Effects, boss/location/Divine Tower pairings supplied
// directly by the user, not scraped or from our own recall — same
// precision-sourcing rule as the rest of the corpus.
const PLACEHOLDER = (slug: string) => `questbot://guide/great-rune/${slug}`;

export const GREAT_RUNE_PAGES: ArticlePage[] = [
  {
    title: 'Great Runes',
    url: PLACEHOLDER('great-runes'),
    sections: [
      {
        heading: "Miquella's Great Rune",
        text: "Retains naught but the power to resist charms. Dropped by the Scadutree Avatar at Scadutree Base. Has no associated Divine Tower.",
      },
      {
        heading: "Godrick's Great Rune",
        text: 'Raises all attributes by +5 once activated. Dropped by Godrick the Grafted at Stormveil Castle in Limgrave. Restored at the Divine Tower of Limgrave.',
      },
      {
        heading: "Rykard's Great Rune",
        text: 'Restores HP upon defeating enemies once activated. Dropped by Rykard, Lord of Blasphemy at Volcano Manor in Mt. Gelmir. Restored at the Divine Tower of West Altus.',
      },
      {
        heading: "Radahn's Great Rune",
        text: 'Raises maximum HP, FP, and Stamina by 15% once activated. Dropped by Starscourge Radahn at Redmane Castle in Caelid. Restored at the Divine Tower of Caelid.',
      },
      {
        heading: "Morgott's Great Rune",
        text: 'Raises maximum HP by 25% once activated. Dropped by Morgott, the Omen King at Leyndell, Royal Capital. Restored at the Divine Tower of East Altus.',
      },
      {
        heading: "Mohg's Great Rune",
        text: 'Grants a blessing of blood to phantoms once activated. Dropped by Mohg, Lord of Blood at Mohgwyn Palace. Restored at the Divine Tower of East Altus.',
      },
      {
        heading: "Malenia's Great Rune",
        text: 'Attacks recover HP for a short time after taking damage once activated. Dropped by Malenia, Blade of Miquella at Miquella\'s Haligtree in Elphael. Restored at the Isolated Divine Tower.',
      },
      {
        heading: 'Great Rune of the Unborn',
        text: 'Has no active passive effect, but unlocks the ability to respec the character. Dropped by Rennala, Queen of the Full Moon at Raya Lucaria Academy in Liurnia of the Lakes. Has no associated Divine Tower.',
      },
      {
        heading: 'Phantom Great Rune',
        text: 'Gives a blessing of blood to enemies encountered while invading another world. Not tied to any boss, location, or Divine Tower.',
      },
    ],
  },
];
