import type { ItemLocationEntry } from '../../types.js';

// Sorcery locations. Authored from general game knowledge, original
// phrasing, never scraped — same policy as talismans-locations.ts and
// incantations-locations.ts. locationNames only ever reference real
// MapLocation.name values (base game only).
export const SORCERY_LOCATIONS: ItemLocationEntry[] = [
  // ---- Carian sorceries ----
  {
    itemName: "Adula's Moonblade",
    locationNames: [],
    summary: 'Dropped by the Glintstone Dragon Adula in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Carian Greatsword',
    locationNames: ['Caria Manor'],
    summary: 'Found in or around Caria Manor in Liurnia of the Lakes.',
  },
  {
    itemName: 'Carian Phalanx',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Carian Piercer',
    locationNames: ['Caria Manor'],
    summary: 'Found in or around Caria Manor.',
  },
  {
    itemName: 'Carian Retaliation',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Carian Slicer',
    locationNames: [],
    summary: "The Astrologer class's starting sorcery, otherwise sold early by Sorcerer Rogier.",
  },
  {
    itemName: 'Glintblade Phalanx',
    locationNames: [],
    summary: "A starting sorcery for the Prisoner class, otherwise sold early by Sorcerer Rogier.",
  },
  {
    itemName: 'Glintblade Trio',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy.',
  },
  {
    itemName: 'Greatblade Phalanx',
    locationNames: [],
    summary: 'Purchasable from Sorceress Sellen once she reaches Liurnia.',
  },
  {
    itemName: "Loretta's Greatbow",
    locationNames: ['Caria Manor'],
    summary: 'Found within Caria Manor.',
  },
  {
    itemName: "Loretta's Mastery",
    locationNames: ['Ordina, Liturgical Town'],
    summary: "Reward for progressing through Ordina, Liturgical Town, on the path to Miquella's Haligtree.",
  },
  {
    itemName: 'Lucidity',
    locationNames: [],
    summary: 'Purchasable from Sorcerer Rogier or found early in the game.',
  },
  {
    itemName: 'Magic Downpour',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Magic Glintblade',
    locationNames: [],
    summary: "A starting sorcery for the Prisoner class, otherwise sold early by Sorcerer Rogier.",
  },
  {
    itemName: "Miriam's Vanishing",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Ranni's Dark Moon",
    locationNames: [],
    summary: "Reward for completing Ranni the Witch's questline.",
  },
  {
    itemName: "Rellana's Twin Moons",
    locationNames: [],
    summary: 'Shadow of the Erdtree content — dropped by Rellana, Twin Moon Knight, in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: "Rennala's Full Moon",
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Reward for defeating Rennala, Queen of the Full Moon, at Raya Lucaria Academy.',
  },

  // ---- Glintstone sorceries ----
  {
    itemName: 'Cannon of Haima',
    locationNames: [],
    summary: 'Found in the Altus Plateau area, tied to the Haima Study Hall.',
  },
  {
    itemName: 'Comet',
    locationNames: [],
    summary: 'Purchasable from Sorceress Sellen after a certain point in her questline.',
  },
  {
    itemName: 'Comet Azur',
    locationNames: [],
    summary: "Final reward for completing Sorceress Sellen's questline.",
  },
  {
    itemName: 'Crystal Barrage',
    locationNames: [],
    summary: 'Purchasable from Sorceress Sellen once she reaches Liurnia.',
  },
  {
    itemName: 'Crystal Burst',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Founding Rain of Stars',
    locationNames: [],
    summary: 'Found in the underground Nokstella area, tied to Lunar-Estate content.',
  },
  {
    itemName: 'Gavel of Haima',
    locationNames: [],
    summary: 'Found in the Altus Plateau area, tied to the Haima Study Hall.',
  },
  {
    itemName: 'Glintstone Arc',
    locationNames: [],
    summary: "A starting sorcery for the Astrologer class, otherwise sold early by Sorcerer Rogier.",
  },
  {
    itemName: 'Glintstone Cometshard',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Glintstone Pebble',
    locationNames: [],
    summary: "The Astrologer class's starting sorcery, also taught early by Sorcerer Rogier in Liurnia of the Lakes.",
  },
  {
    itemName: 'Glintstone Stars',
    locationNames: [],
    summary: 'Purchasable from Sorcerer Rogier.',
  },
  {
    itemName: 'Great Glintstone Shard',
    locationNames: [],
    summary: 'Purchasable from Sorcerer Rogier or Sorceress Sellen.',
  },
  {
    itemName: 'Rock Blaster',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Scholar's Armament",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Scholar's Shield",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Shard Spiral',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Shatter Earth',
    locationNames: [],
    summary: "A starting sorcery for the Astrologer class, otherwise found early in the game.",
  },
  {
    itemName: 'Star Shower',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Starlight',
    locationNames: [],
    summary: 'Purchasable from Sorcerer Rogier or Sorceress Sellen.',
  },
  {
    itemName: 'Stars of Ruin',
    locationNames: [],
    summary: 'Found in the underground Nokstella/Ainsel River area.',
  },
  {
    itemName: 'Swift Glintstone Shard',
    locationNames: [],
    summary: "A starting sorcery for the Astrologer class, otherwise sold early by Sorcerer Rogier.",
  },
  {
    itemName: 'Terra Magica',
    locationNames: [],
    summary: 'Purchasable from Sorceress Sellen once she reaches Liurnia.',
  },
  {
    itemName: "Thops's Barrier",
    locationNames: [],
    summary: "Reward tied to Thops, an early sorcerer NPC encountered in Liurnia of the Lakes.",
  },

  // ---- Gravity sorceries ----
  {
    itemName: 'Blades of Stone',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Collapsing Stars',
    locationNames: [],
    summary: "Reward tied to Preceptor Seluvis's questline.",
  },
  {
    itemName: 'Gravitational Missile',
    locationNames: [],
    summary: 'Found in the underground Nokron, Eternal City area.',
  },
  {
    itemName: 'Gravity Well',
    locationNames: ['Nokron, Eternal City'],
    summary: 'Found in Nokron, Eternal City.',
  },
  {
    itemName: 'Meteorite',
    locationNames: [],
    summary: 'Purchasable from Sorceress Sellen after a certain point in her questline.',
  },
  {
    itemName: 'Meteorite of Astel',
    locationNames: [],
    summary: "Reward tied to Preceptor Seluvis's questline and Ranni's storyline.",
  },
  {
    itemName: 'Rock Sling',
    locationNames: [],
    summary: "A starting sorcery for the Prisoner class, otherwise found early in the game.",
  },

  // ---- Death sorceries ----
  {
    itemName: 'Ancient Death Rancor',
    locationNames: [],
    summary: "Reward tied to Fia's Deathbed Companions questline.",
  },
  {
    itemName: 'Explosive Ghostflame',
    locationNames: [],
    summary: 'Found in the underground Ainsel River/Nokstella area.',
  },
  {
    itemName: "Fia's Mist",
    locationNames: [],
    summary: "Given by Fia, Deathbed Companion, in the Roundtable Hold.",
  },
  {
    itemName: 'Mass of Putrescence',
    locationNames: [],
    summary: 'Found in the underground Deeproot Depths area.',
  },
  {
    itemName: 'Rancorcall',
    locationNames: [],
    summary: "Reward tied to Fia's Deathbed Companions questline.",
  },
  {
    itemName: 'Rings of Spectral Light',
    locationNames: [],
    summary: 'Found in the underground Ainsel River area.',
  },
  {
    itemName: "Tibia's Summons",
    locationNames: [],
    summary: 'Dropped by the Tibia Mariner, a wandering enemy that appears in coastal areas such as Limgrave.',
  },
  {
    itemName: 'Vortex of Putrescence',
    locationNames: [],
    summary: 'Found in the underground Deeproot Depths area.',
  },

  // ---- Night sorceries ----
  {
    itemName: 'Ambush Shard',
    locationNames: [],
    summary: 'Found in the Caelid region, tied to Sellia, Town of Sorcery.',
  },
  {
    itemName: 'Eternal Darkness',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Night Comet',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: "Night Maiden's Mist",
    locationNames: [],
    summary: 'Found in the Caelid region, tied to Sellia, Town of Sorcery.',
  },
  {
    itemName: 'Night Shard',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Unseen Blade',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Unseen Form',
    locationNames: [],
    summary: 'Found in the Caelid region, tied to Sellia, Town of Sorcery.',
  },

  // ---- Thorn sorceries ----
  {
    itemName: 'Briars of Punishment',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Briars of Sin',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Impenetrable Thorns',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Mantle of Thorns',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Finger sorceries ----
  {
    itemName: 'Cherishing Fingers',
    locationNames: [],
    summary: 'Found in the underground Nokstella, Eternal City area.',
  },
  {
    itemName: 'Fleeting Microcosm',
    locationNames: [],
    summary: 'Found in the underground Nokstella, Eternal City area.',
  },
  {
    itemName: 'Glintstone Nail',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Glintstone Nails',
    locationNames: [],
    summary: 'Found in the underground Nokstella area.',
  },

  // ---- Crystalian sorceries ----
  {
    itemName: 'Crystal Release',
    locationNames: [],
    summary: 'Dropped by a Crystalian enemy, commonly found in crystal-cave-type dungeons such as the Raya Lucaria Crystal Tunnel.',
  },
  {
    itemName: 'Crystal Torrent',
    locationNames: [],
    summary: 'Dropped by a Crystalian enemy in a crystal-cave-type dungeon.',
  },
  {
    itemName: 'Shattering Crystal',
    locationNames: [],
    summary: 'Dropped by a Crystalian enemy in a crystal-cave-type dungeon.',
  },

  // ---- Cold sorceries ----
  {
    itemName: 'Freezing Mist',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Frozen Armament',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Glintstone Icecrag',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Zamor Ice Storm',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region, tied to the Zamor Ruins.',
  },

  // ---- Magma sorceries ----
  {
    itemName: "Gelmir's Fury",
    locationNames: ['Volcano Manor'],
    summary: 'Found in Volcano Manor, in Mt. Gelmir.',
  },
  {
    itemName: 'Magma Shot',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },
  {
    itemName: 'Roiling Magma',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },
  {
    itemName: "Rykard's Rancor",
    locationNames: ['Volcano Manor'],
    summary: 'Reward for defeating Rykard, Lord of Blasphemy, in Volcano Manor.',
  },

  // ---- Oracle sorceries ----
  {
    itemName: 'Great Oracular Bubble',
    locationNames: [],
    summary: "Reward tied to Ranni the Witch's questline.",
  },
  {
    itemName: 'Oracle Bubbles',
    locationNames: [],
    summary: "Reward tied to Ranni the Witch's questline.",
  },
];
