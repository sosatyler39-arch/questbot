import type { ItemLocationEntry } from '../../types.js';

// Whetstone and Great Rune locations. Authored from general game
// knowledge, original phrasing, never scraped — same policy as
// talismans-locations.ts. Great Rune boss/location pairings are already
// given in great-runes.ts's own authored text; several of those location
// names are already exact MapLocation.name matches, reused directly here
// rather than re-researched. locationNames only ever reference real
// MapLocation.name values (base game only).
export const WHETSTONE_AND_GREAT_RUNE_LOCATIONS: ItemLocationEntry[] = [
  // ---- Whetstones and whetblades ----
  {
    itemName: 'Whetstone Knife',
    locationNames: ['Church of Elleh'],
    summary: 'Given by Kalé, the wandering blacksmith found at the Church of Elleh early in Limgrave.',
  },
  {
    itemName: 'Iron Whetblade',
    locationNames: [],
    summary: 'Found in the Limgrave region.',
  },
  {
    itemName: 'Glintstone Whetblade',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy.',
  },
  {
    itemName: 'Red-Hot Whetblade',
    locationNames: ['Volcano Manor'],
    summary: 'Found in the Mt. Gelmir region, near Volcano Manor.',
  },
  {
    itemName: 'Sanctified Whetblade',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Black Whetblade',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },

  // ---- Great Runes ----
  {
    itemName: "Miquella's Great Rune",
    locationNames: [],
    summary: 'Shadow of the Erdtree content — dropped by the Scadutree Avatar at Scadutree Base in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: "Godrick's Great Rune",
    locationNames: ['Stormveil Castle'],
    summary: 'Dropped by Godrick the Grafted at Stormveil Castle in Limgrave.',
  },
  {
    itemName: "Rykard's Great Rune",
    locationNames: ['Volcano Manor'],
    summary: 'Dropped by Rykard, Lord of Blasphemy, at Volcano Manor in Mt. Gelmir.',
  },
  {
    itemName: "Radahn's Great Rune",
    locationNames: ['Redmane Castle'],
    summary: 'Dropped by Starscourge Radahn at Redmane Castle in Caelid.',
  },
  {
    itemName: "Morgott's Great Rune",
    locationNames: [],
    summary: 'Dropped by Morgott, the Omen King, at Leyndell, Royal Capital.',
  },
  {
    itemName: "Mohg's Great Rune",
    locationNames: ['Mohgwyn Palace'],
    summary: 'Dropped by Mohg, Lord of Blood, at Mohgwyn Palace.',
  },
  {
    itemName: "Malenia's Great Rune",
    locationNames: ['Elphael, Brace of the Haligtree'],
    summary: "Dropped by Malenia, Blade of Miquella, at Miquella's Haligtree in Elphael.",
  },
  {
    itemName: 'Great Rune of the Unborn',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Dropped by Rennala, Queen of the Full Moon, at Raya Lucaria Academy in Liurnia of the Lakes.',
  },
  {
    itemName: 'Phantom Great Rune',
    locationNames: [],
    summary: 'Not tied to any boss, location, or Divine Tower — obtained through the invasion mechanic itself.',
  },
];
