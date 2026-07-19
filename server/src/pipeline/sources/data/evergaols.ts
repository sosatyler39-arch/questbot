import type { ArticlePage } from '../types.js';

// Evergaols: circular prison-arenas marked on the map with a distinct icon.
// Most require a Stonesword Key to enter and grant a talisman or other
// reward for clearing the boss inside. Base game only (no Shadow of the
// Erdtree DLC content). Original writing from general game knowledge — see
// the header comment in original-content.ts for the sourcing policy.
//
// Confidence note: locations are solid; a few boss/reward pairings for the
// less-traveled evergaols are lower-confidence best effort — worth a spot
// check against your own game knowledge before fully trusting the rarer ones.
export const EVERGAOL_PAGES: ArticlePage[] = [
  {
    title: 'Evergaols overview',
    url: 'questbot://guide/evergaols-overview',
    sections: [
      {
        heading: 'What they are',
        text: 'Evergaols are circular, prison-like arenas found across the open world, visually distinct from other landmarks and marked with their own map icon once discovered. Most require a Stonesword Key to unlock (used at the crystalline lock outside), and defeating the boss inside grants a reward — commonly a talisman, sometimes a weapon, spell, or Ash of War.',
      },
    ],
  },
  {
    title: 'Stormhill Evergaol',
    url: 'questbot://guide/stormhill-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Found in Limgrave on the road up toward Stormveil Castle, near the Stormhill Shack and the Warmaster\'s Shack area. Contains a mounted knight boss. Requires a Stonesword Key to open.',
      },
    ],
  },
  {
    title: 'Deathtouched Catacombs area Evergaol (Northern Limgrave)',
    url: 'questbot://guide/limgrave-cliffside-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'An Evergaol near the Warmaster\'s Shack / Mistwood area in northern Limgrave containing a Crucible Knight. Requires a Stonesword Key.',
      },
    ],
  },
  {
    title: 'Weeping Peninsula Evergaol',
    url: 'questbot://guide/weeping-peninsula-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Located on the Weeping Peninsula, south of Castle Morne, near the Impaler\'s Catacombs area. Contains a boss-tier enemy behind a Stonesword Key lock, rewarding a talisman on completion.',
      },
    ],
  },
  {
    title: 'Liurnia Highway South Evergaol',
    url: 'questbot://guide/liurnia-highway-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Found along the Liurnia Highway South area of Liurnia of the Lakes. Requires a Stonesword Key; contains a knight-class boss and grants a talisman reward.',
      },
    ],
  },
  {
    title: 'Academy Crystal Cave Evergaol',
    url: 'questbot://guide/academy-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Located in the Raya Lucaria Academy area of Liurnia, this Evergaol contains a spellcaster or beast-type boss depending on the exact site — check in-game before committing a Stonesword Key if the specific occupant matters for your build.',
      },
    ],
  },
  {
    title: 'Altus Plateau Evergaol',
    url: 'questbot://guide/altus-plateau-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Found on the Altus Plateau, in the open fields between the Grand Lift of Dectus and the Shaded Castle. Requires a Stonesword Key.',
      },
    ],
  },
  {
    title: 'Caelid Evergaols',
    url: 'questbot://guide/caelid-evergaols',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Caelid has more than one Evergaol, including one near Fort Faroth in the northwest and another closer to Redmane Castle. Both require Stonesword Keys and contain boss-tier enemies appropriate to Caelid\'s generally higher difficulty.',
      },
    ],
  },
  {
    title: 'Mt. Gelmir Evergaol',
    url: 'questbot://guide/mt-gelmir-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Located on Mt. Gelmir, in the volcanic terrain near Volcano Manor. Requires a Stonesword Key.',
      },
    ],
  },
  {
    title: 'Mountaintops of the Giants Evergaol',
    url: 'questbot://guide/mountaintops-evergaol',
    sections: [
      {
        heading: 'Location and contents',
        text: 'Found in the Mountaintops of the Giants region, in the snow fields near the Church of Repose. Requires a Stonesword Key.',
      },
    ],
  },
];
