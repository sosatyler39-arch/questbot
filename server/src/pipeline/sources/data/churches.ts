import type { ArticlePage } from '../types.js';

// Church locations across the base game map. Original writing — see the
// header comment in original-content.ts for the sourcing policy.
export const CHURCH_PAGES: ArticlePage[] = [
  {
    title: 'Church of Elleh',
    url: 'questbot://guide/church-of-elleh',
    sections: [
      {
        heading: 'Location',
        text: 'One of the very first landmarks new players encounter, located just south of the starting Site of Grace in Limgrave (The First Step), visible at night lit by a bonfire-like glow. A merchant sets up here early in the game.',
      },
    ],
  },
  {
    title: 'Third Church of Marika',
    url: 'questbot://guide/third-church-of-marika',
    sections: [
      {
        heading: 'Location and blessing',
        text: 'Located in central Limgrave. This church holds a Sacred Tear, used to upgrade the potency of Flask charges (see Flask upgrades).',
      },
    ],
  },
  {
    title: 'Bridge of Sacrifice',
    url: 'questbot://guide/bridge-of-sacrifice',
    sections: [
      {
        heading: 'Location',
        text: 'A small chapel/church landmark on the road between Limgrave and Liurnia, near the Bridge of Sacrifice Site of Grace, on the path leading toward Liurnia.',
      },
    ],
  },
  {
    title: 'Church of Vows',
    url: 'questbot://guide/church-of-vows',
    sections: [
      {
        heading: 'Location and blessing',
        text: 'Located in eastern Liurnia of the Lakes. Holds a Sacred Tear for flask upgrades, and is also notable for an NPC merchant (Brother Corhyn) found here early, relevant to the Goldmask/Corhyn questline.',
      },
    ],
  },
  {
    title: 'Church of Inhibition',
    url: 'questbot://guide/church-of-inhibition',
    sections: [
      {
        heading: 'Location',
        text: 'Located in Liurnia of the Lakes, south of Raya Lucaria Academy near the town of Liurnia. A relatively minor waypoint compared to the Church of Vows.',
      },
    ],
  },
  {
    title: 'Kingsrealm Ruins church site',
    url: 'questbot://guide/kingsrealm-ruins',
    sections: [
      {
        heading: 'Location',
        text: 'A ruined chapel-adjacent site in Liurnia of the Lakes; more of a ruin than an active church, but functions as a similar type of landmark for exploration purposes.',
      },
    ],
  },
  {
    title: 'Chapel of Anticipation',
    url: 'questbot://guide/chapel-of-anticipation',
    sections: [
      {
        heading: 'Location',
        text: 'The very first area of the game, before the player is transported to the Lands Between proper — a small chapel where the Tarnished starts, guarded by a knight (Grafted Scion) that acts as a preview/tutorial boss.',
      },
    ],
  },
  {
    title: 'Second Church of Marika',
    url: 'questbot://guide/second-church-of-marika',
    sections: [
      {
        heading: 'Location and blessing',
        text: 'Located in Altus Plateau. Holds a Sacred Tear for flask upgrades.',
      },
    ],
  },
  {
    title: 'Erdtree-Gazing Hill church site',
    url: 'questbot://guide/erdtree-gazing-hill',
    sections: [
      {
        heading: 'Location',
        text: 'A notable overlook/landmark in Altus Plateau with a clear view of the Erdtree — often grouped with nearby church-style points of interest along the plateau.',
      },
    ],
  },
  {
    title: 'Consecrated Snowfield church sites',
    url: 'questbot://guide/consecrated-snowfield-churches',
    sections: [
      {
        heading: 'Location',
        text: 'The Consecrated Snowfield, reached from the Mountaintops of the Giants, contains additional small chapel-like structures relevant to that region\'s exploration and its connection to the Haligtree.',
      },
    ],
  },
  {
    title: 'Isolated Merchant\'s Shack church-adjacent sites',
    url: 'questbot://guide/isolated-merchant-shacks',
    sections: [
      {
        heading: 'Note',
        text: 'Several regions have "Isolated Merchant\'s Shack" locations rather than formal churches — these aren\'t churches themselves but are commonly grouped with them in players\' mental map of "notable small buildings to check." They host traveling merchants rather than Sacred Tears.',
      },
    ],
  },
];
