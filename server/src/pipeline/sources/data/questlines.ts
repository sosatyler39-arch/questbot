import type { ArticlePage } from '../types.js';

// NPC questlines beyond Ranni and Volcano Manor (already covered in
// original-content.ts). Each is summarized at a "how to start and what to
// expect" level rather than a full step-by-step walkthrough, since these
// questlines are long, easy to accidentally lock yourself out of by
// progressing the main story too far, and best played close to blind.
// Original writing — see the header comment in original-content.ts for the
// sourcing policy.
export const QUESTLINE_PAGES: ArticlePage[] = [
  {
    title: 'Fia, the Deathbed Companion (questline start)',
    url: 'questbot://guide/fia-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Fia is found early at Roundtable Hold, offering a hug that grants a temporary death-resistance blessing at the cost of a "cursed" status. Her questline is one of the largest in the game and intersects with several other NPC questlines, including D, Hunter of the Dead, and Iron Fist Alexander.',
      },
      {
        heading: 'How to start',
        text: 'Simply speaking with Fia at Roundtable Hold and accepting her offer begins the relationship; the questline develops mostly through returning to speak with her after story progress and through items delivered to her from elsewhere in the world.',
      },
    ],
  },
  {
    title: "Millicent's questline (start)",
    url: 'questbot://guide/millicents-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Millicent\'s questline deals with the Scarlet Rot affecting her and is closely tied to Gowry, an NPC found in a shack in Caelid, and to a unique Prosthesis-Wearer\'s Heirloom item.',
      },
      {
        heading: 'How to start',
        text: 'The questline typically begins by finding Gowry\'s Shack in Caelid and speaking with Gowry, then finding Millicent herself nearby (in the Church of the Plague area) and helping her, which sends the player looking for the needle-and-item combination Gowry describes.',
      },
    ],
  },
  {
    title: 'Nepheli Loux\'s questline (start)',
    url: 'questbot://guide/nepheli-loux-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Nepheli Loux is found at Roundtable Hold and is connected to Iron Fist Alexander and to Kenneth Haight\'s storyline regarding Limgrave\'s Castle Morne.',
      },
      {
        heading: 'How to start',
        text: 'Speaking with her at Roundtable Hold and later helping Kenneth Haight retake Castle Morne on the Weeping Peninsula are the main early steps.',
      },
    ],
  },
  {
    title: 'Iron Fist Alexander\'s questline (start)',
    url: 'questbot://guide/alexander-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Alexander is a large, friendly jar warrior encountered as a stuck pot in the ground multiple times across the world — digging him out and talking to him starts and continues a light-hearted but substantial questline that spans nearly every major region.',
      },
      {
        heading: 'How to start',
        text: 'His first appearance, stuck in the ground, is in Limgrave along one of the main roads; interacting with him to free him begins the relationship, and he\'ll periodically reappear stuck elsewhere as the player explores new regions.',
      },
    ],
  },
  {
    title: "Patches' questline (start)",
    url: 'questbot://guide/patches-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Patches is a recurring trickster NPC (a returning character from prior FromSoftware games) first encountered in Murkwater Cave in Limgrave, where he ambushes the player. He later relocates to Warmaster\'s Shack and becomes a merchant selling Stonesword Keys and other items.',
      },
      {
        heading: 'How to start',
        text: 'Surviving his ambush in Murkwater Cave (or defeating him) and later finding him at Warmaster\'s Shack progresses the relationship; he\'s also involved in an optional side path connected to Volcano Manor.',
      },
    ],
  },
  {
    title: "Blaidd's questline (start)",
    url: 'questbot://guide/blaidd-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Blaidd, the Half-Wolf is closely tied to Ranni\'s questline and is first encountered roaming Limgrave and Mistwood before appearing more directly as Ranni\'s quest progresses.',
      },
      {
        heading: 'How to start',
        text: 'Blaidd can be spoken to early in Limgrave near the Mistwood area; his questline develops mainly as a byproduct of progressing Ranni\'s questline rather than through separate independent steps.',
      },
    ],
  },
  {
    title: "Sellen's questline (start)",
    url: 'questbot://guide/sellen-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Sellen is a sorcery instructor found in Liurnia of the Lakes (in the Waypoint Ruins cellar) and is the primary sorcery-focused merchant NPC questline, intersecting with rival sorcerer NPCs Sellen wants dealt with, including Jerren, Thops, Selen (herself), and others.',
      },
      {
        heading: 'How to start',
        text: 'Found by locating the Waypoint Ruins in Liurnia and descending into the cellar beneath. She offers sorcery training and later tasks the player with confronting rival students of Karolos.',
      },
    ],
  },
  {
    title: "Dung Eater's questline (start)",
    url: 'questbot://guide/dung-eater-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'The Dung Eater is a morally dark, optional questline centered on an imprisoned NPC and leads to one of the game\'s alternate endings if fully completed. It involves collecting Seedbed Curses from various late-game locations.',
      },
      {
        heading: 'How to start',
        text: 'First encountered imprisoned in the Roundtable Hold basement, reachable after obtaining a specific key found in the capital or nearby areas; talking to him there begins the relationship.',
      },
    ],
  },
  {
    title: 'Kenneth Haight and the retaking of Castle Morne (start)',
    url: 'questbot://guide/kenneth-haight-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Kenneth Haight is found early on the Weeping Peninsula and wants help reclaiming Castle Morne from the enemies occupying it, tying into Nepheli Loux\'s own questline.',
      },
      {
        heading: 'How to start',
        text: 'Found near the Weeping Peninsula, south of the main Limgrave area — speaking with him and later defeating the boss of Castle Morne (Leonine Misbegotten) while he\'s alive to witness it progresses the questline.',
      },
    ],
  },
  {
    title: "Yura's questline (start)",
    url: 'questbot://guide/yura-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Yura is a bloody-finger hunter NPC found in Limgrave who helps deal with the invader Bloody Finger Nerijus and continues a short but distinct questline about bounty-hunting invaders.',
      },
      {
        heading: 'How to start',
        text: 'Found resting near a Site of Grace in Limgrave (Deep Siofra Well vicinity is a common early sighting); speaking with him and assisting against Nerijus starts the thread.',
      },
    ],
  },
  {
    title: "Hyetta's questline (start)",
    url: 'questbot://guide/hyetta-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Hyetta is a blind traveler first found in Liurnia of the Lakes who asks the player to collect Bewitching Branches / seek the Lord of Frenzied Flame — her questline is closely tied to the Three Fingers and the Frenzied Flame ending path.',
      },
      {
        heading: 'How to start',
        text: 'Found sitting by the roadside in Liurnia of the Lakes; speaking to her begins the relationship, and giving her Shabriri Grapes (an item found around the world) progresses it further.',
      },
    ],
  },
  {
    title: 'Brother Corhyn and Goldmask\'s questline (start)',
    url: 'questbot://guide/corhyn-goldmask-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Brother Corhyn, first found at the Church of Vows in Liurnia, is searching for a lost associate named Goldmask and for canon-related scripture — this questline runs through much of the mid-to-late game and intersects with the Fingerslayer Blade key item.',
      },
      {
        heading: 'How to start',
        text: 'Speaking with Corhyn at the Church of Vows and continuing to check in with him as the story advances (he relocates over time, including eventually to Leyndell) develops the questline.',
      },
    ],
  },
  {
    title: "Roderika's questline (start)",
    url: 'questbot://guide/roderika-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Roderika is found early at the Stormhill Site of Grace outside Stormveil Castle, depressed and ready to give up. Helping her leads to her becoming the Spirit Ash upgrade attendant at Roundtable Hold.',
      },
      {
        heading: 'How to start',
        text: 'Speaking with her at the Stormhill area (before or after Margit) and encouraging her starts the questline; she later relocates to Roundtable Hold to offer Spirit Ash leveling services.',
      },
    ],
  },
  {
    title: "Diallos' questline (start)",
    url: 'questbot://guide/diallos-questline-start',
    sections: [
      {
        heading: 'Overview',
        text: 'Diallos is found in Liurnia searching for a servant who stole a family heirloom (Binoculars) — a shorter questline that intersects with a merchant NPC (Nomadic Merchant) holding the stolen item.',
      },
      {
        heading: 'How to start',
        text: 'Found near the Village of the Albinaurics area in Liurnia; speaking with him starts the search.',
      },
    ],
  },
];
