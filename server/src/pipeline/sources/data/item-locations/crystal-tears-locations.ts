import type { ItemLocationEntry } from '../../types.js';

// Crystal Tear locations. Authored from general game knowledge, original
// phrasing, never scraped — same policy as talismans-locations.ts. Most
// Crystal Tears are individual world pickups at one specific spot rather
// than a diffuse source; pins are given where a specific dungeon/landmark
// is recalled with confidence, and honest region-level summaries otherwise.
// locationNames only ever reference real MapLocation.name values (base
// game only).
export const CRYSTAL_TEAR_LOCATIONS: ItemLocationEntry[] = [
  // ---- HP Crystal Tears ----
  {
    itemName: 'Crimson Crystal Tear',
    locationNames: [],
    summary: 'Found scattered throughout the open world, in small dedicated alcoves.',
  },
  {
    itemName: 'Crimsonspill Crystal Tear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Crimsonburst Crystal Tear',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Crimsonburst Dried Tear',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Crimson-Sapping Cracked Tear',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Bloodsucking Cracked Tear',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Crimson Bubbletear',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Crimsonwhorl Bubbletear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- FP Crystal Tears ----
  {
    itemName: 'Cerulean Crystal Tear',
    locationNames: [],
    summary: 'Found scattered throughout the open world, in small dedicated alcoves.',
  },
  {
    itemName: 'Cerulean-Sapping Cracked Tear',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Cerulean Hidden Tear',
    locationNames: [],
    summary: 'Found in the underground Nokstella, Eternal City area.',
  },

  // ---- Stamina Crystal Tears ----
  {
    itemName: 'Greenspill Crystal Tear',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Greenburst Crystal Tear',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Viridian Hidden Tear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- Stat-boosting Crystal Tears ----
  {
    itemName: 'Strength-knot Crystal Tear',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Dexterity-knot Crystal Tear',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Intelligence-knot Crystal Tear',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy.',
  },
  {
    itemName: 'Faith-knot Crystal Tear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- Defensive Crystal Tears ----
  {
    itemName: 'Opaline Hardtear',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },
  {
    itemName: 'Speckled Hardtear',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Leaden Hardtear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Twiggy Cracked Tear',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Winged Crystal Tear',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Windy Crystal Tear',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Opaline Bubbletear',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Oil-Soaked Tear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- Offensive Crystal Tears ----
  {
    itemName: 'Stonebarb Cracked Tear',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Spiked Cracked Tear',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Thorny Cracked Tear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Ruptured Crystal Tear',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },

  // ---- Offensive elemental-damage Crystal Tears ----
  {
    itemName: 'Deflecting Hardtear',
    locationNames: [],
    summary: "Given by the Roundtable Hold's blacksmith Hewg or found early in the game as a guard-counter-related item.",
  },
  {
    itemName: 'Magic-Shrouding Cracked Tear',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy.',
  },
  {
    itemName: 'Flame-Shrouding Cracked Tear',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },
  {
    itemName: 'Lightning-Shrouding Cracked Tear',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Holy-Shrouding Cracked Tear',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Glovewort Crystal Tear',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- Boss-fight Crystal Tears ----
  {
    itemName: 'Purifying Crystal Tear',
    locationNames: ['Mohgwyn Palace'],
    summary: 'Dropped by Mohg, Lord of Blood, at Mohgwyn Palace.',
  },
];
