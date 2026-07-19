import type { ArticlePage } from '../types.js';

// Notable chests: ones containing unique/rare items (talismans, weapons,
// key items), and "trap" chests that teleport the player elsewhere instead
// of containing loot. Not every generic loot chest in the game — there are
// hundreds of small ones with unremarkable consumables, which isn't useful
// data to index. Original writing — see the header comment in
// original-content.ts for the sourcing policy.
//
// Confidence note: trap-chest locations/destinations are solid. A few
// specific talisman-to-chest pairings below are lower-confidence — several
// combat-stat talismans (including some "heirloom" talismans tied to
// specific demigods) are more commonly obtained as NPC/quest rewards than
// from a fixed chest, so don't treat every entry here as equally certain.
export const CHEST_PAGES: ArticlePage[] = [
  {
    title: 'Trap chests overview',
    url: 'questbot://guide/trap-chests-overview',
    sections: [
      {
        heading: 'What they are',
        text: 'A small number of chests in the game are not loot containers at all — opening them teleports the player to an unrelated location, usually an underground or otherwise hard-to-reach area. These are a known, deliberate design feature rather than a bug, and some players use them intentionally as shortcuts.',
      },
    ],
  },
  {
    title: 'Dragon-Burnt Ruins trap chest',
    url: 'questbot://guide/dragon-burnt-ruins-trap-chest',
    sections: [
      {
        heading: 'Destination',
        text: 'The chest in Dragon-Burnt Ruins (Limgrave) teleports the player to Deathtouched Catacombs. See the Dragon-Burnt Ruins and Deathtouched Catacombs entries for details on what\'s there.',
      },
    ],
  },
  {
    title: 'Volcano Manor trap chest',
    url: 'questbot://guide/volcano-manor-trap-chest',
    sections: [
      {
        heading: 'Destination',
        text: 'A chest within Volcano Manor (Mt. Gelmir) teleports the player down into a holding-cell-style area beneath the manor, distinct from the main path — used narratively as how some visitors to the manor are "dealt with."',
      },
    ],
  },
  {
    title: 'Radagon\'s Soreseal',
    url: 'questbot://guide/radagons-soreseal',
    sections: [
      {
        heading: 'What it does',
        text: 'A talisman that significantly raises four core stats (Strength, Dexterity, Intelligence, Faith) at the cost of increased damage taken — popular for early-to-mid-game builds that can tolerate the tradeoff.',
      },
      {
        heading: 'Where to find it',
        text: 'Found in Fringefolk Hero\'s Grave, a dungeon accessible from the Chapel of Anticipation area at the very start of the game (requires returning there later, since the path in is initially blocked, or reaching it via an alternate route once available).',
      },
    ],
  },
  {
    title: 'Marika\'s Soreseal',
    url: 'questbot://guide/marikas-soreseal',
    sections: [
      {
        heading: 'What it does',
        text: 'Similar in concept to Radagon\'s Soreseal — raises multiple core stats at the cost of increased damage taken.',
      },
      {
        heading: 'Where to find it',
        text: 'Found in Crumbling Farum Azula, in the late-game area accessible after the Fire Giant.',
      },
    ],
  },
  {
    title: 'Dragoncrest Greatshield Talisman locations',
    url: 'questbot://guide/dragoncrest-greatshield-talismans',
    sections: [
      {
        heading: 'What they do',
        text: 'A family of talismans that reduce physical damage taken, in increasing strength (base, +1, +2 versions).',
      },
      {
        heading: 'Where to find them',
        text: 'Copies are found across multiple regions in chests and as enemy/dungeon rewards, including in early Limgrave-area dungeons for the base version and in tougher late-game dungeons for the upgraded versions.',
      },
    ],
  },
  {
    title: 'Starscourge Heirloom',
    url: 'questbot://guide/starscourge-heirloom',
    sections: [
      {
        heading: 'What it does',
        text: 'A talisman that boosts the wearer\'s Strength and Dexterity, associated thematically with Starscourge Radahn.',
      },
      {
        heading: 'Where to find it',
        text: 'Obtained in the Caelid/Redmane Castle area associated with Radahn\'s Festival — check the festival grounds and nearby structures around Redmane Castle if searching for it directly, as exact placement is easy to walk past amid the festival crowd of NPCs.',
      },
    ],
  },
  {
    title: 'Regenerative Material talismans and stat-heirloom talismans (general)',
    url: 'questbot://guide/heirloom-talismans-general',
    sections: [
      {
        heading: 'Overview',
        text: 'Several "heirloom" talismans exist (Starscourge Heirloom, Two Fingers Heirloom, Godfrey Icon, and others), each boosting a specific stat pair or ability. Most are found in specific chests tied to that talisman\'s thematic region rather than sold by merchants, so they\'re typically one-time finds worth planning a route around if a specific build needs one.',
      },
    ],
  },
];
