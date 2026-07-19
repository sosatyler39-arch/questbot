import type { ArticlePage } from '../types.js';

// Minor dungeons (catacombs, caves, tunnels) in Limgrave and the Weeping
// Peninsula, each with their boss and notable rewards where known. These
// are smaller than the legacy dungeons (Stormveil Castle etc., covered
// separately) but each has its own dedicated boss. Original writing — see
// the header comment in original-content.ts for the sourcing policy.
export const LIMGRAVE_DUNGEON_PAGES: ArticlePage[] = [
  {
    title: 'Dragon-Burnt Ruins and the trapped chest',
    url: 'questbot://guide/dragon-burnt-ruins',
    sections: [
      {
        heading: 'Location',
        text: 'Dragon-Burnt Ruins is a small scorched ruin in central Limgrave, south of the main road, recognizable by its burned, blackened structure.',
      },
      {
        heading: 'The trapped chest',
        text: 'The ruins contain a chest that is actually a trap ("Mimic" style teleporter chest, not the Mimic Tear enemy) — opening it teleports the player down to Deathtouched Catacombs, an underground catacomb dungeon elsewhere. This is a known, intentional shortcut/trick some players use deliberately to reach Deathtouched Catacombs early, rather than a hazard to avoid entirely.',
      },
    ],
  },
  {
    title: 'Deathtouched Catacombs',
    url: 'questbot://guide/deathtouched-catacombs',
    sections: [
      {
        heading: 'Location and access',
        text: 'Reached either directly (a hidden entrance in Limgrave) or via the trapped chest in Dragon-Burnt Ruins, which teleports the player straight into it.',
      },
      {
        heading: 'Contents',
        text: 'Notable for a single strong enemy guarding a reward far above the area\'s apparent difficulty — clearing it rewards the Black Knife Tiche Spirit Ash, a well-regarded early-to-mid-game summon. Because of the reward-to-risk ratio, many guides recommend visiting this fairly early.',
      },
    ],
  },
  {
    title: 'Stormfoot Catacombs',
    url: 'questbot://guide/stormfoot-catacombs',
    sections: [
      {
        heading: 'Location and boss',
        text: 'Located in Limgrave, southwest of the Gatefront area leading to Stormveil Castle. The boss is an Erdtree Burial Watchdog, a large armored dog-type enemy — one of the more common early catacomb boss types encountered in several catacombs across the game.',
      },
    ],
  },
  {
    title: 'Murkwater Catacombs',
    url: 'questbot://guide/murkwater-catacombs',
    sections: [
      {
        heading: 'Location and boss',
        text: 'Located near Murkwater Cave in Limgrave (where Patches is first encountered). The boss is a Grave Warden Duelist, a fast dual-blade-wielding skeletal enemy.',
      },
    ],
  },
  {
    title: 'Coastal Cave',
    url: 'questbot://guide/coastal-cave',
    sections: [
      {
        heading: 'Location and boss',
        text: 'Located on the coastline of Limgrave, south of the Church of Elleh, accessible along the beach. Contains an Ulcerated Tree Spirit-type boss at the end.',
      },
    ],
  },
  {
    title: 'Groveside Cave',
    url: 'questbot://guide/groveside-cave',
    sections: [
      {
        heading: 'Location and notes',
        text: 'A short, straightforward early cave in Limgrave near the Third Church of Marika — commonly recommended as a good very-early dungeon for new players since it\'s short and rewards a usable early weapon.',
      },
    ],
  },
  {
    title: 'Highroad Cave',
    url: 'questbot://guide/highroad-cave',
    sections: [
      {
        heading: 'Location',
        text: 'Located along the road in Limgrave between the starting area and Liurnia, on the path many players take when first heading toward the Altus/Liurnia direction.',
      },
    ],
  },
  {
    title: 'Impaler\'s Catacombs',
    url: 'questbot://guide/impalers-catacombs',
    sections: [
      {
        heading: 'Location and boss',
        text: 'Located on the Weeping Peninsula, south of Castle Morne. The boss is a Cemetery Shade, a stealthy, cloaked ghost-type enemy that can turn invisible.',
      },
    ],
  },
  {
    title: 'Tombsward Catacombs',
    url: 'questbot://guide/tombsward-catacombs',
    sections: [
      {
        heading: 'Location and boss',
        text: 'Located on the Weeping Peninsula. The boss is an Erdtree Burial Watchdog, the same large armored-dog boss type found in Stormfoot Catacombs.',
      },
    ],
  },
  {
    title: 'Earthbore Cave',
    url: 'questbot://guide/earthbore-cave',
    sections: [
      {
        heading: 'Location and boss',
        text: 'Located on the Weeping Peninsula. Notable for giant crayfish/crustacean-type enemies throughout, culminating in a boss of the same enemy type at larger scale.',
      },
    ],
  },
  {
    title: 'Tombsward Cave',
    url: 'questbot://guide/tombsward-cave',
    sections: [
      {
        heading: 'Location',
        text: 'A separate cave from Tombsward Catacombs, also on the Weeping Peninsula, containing standard early enemies and loot rather than a unique named boss.',
      },
    ],
  },
];
