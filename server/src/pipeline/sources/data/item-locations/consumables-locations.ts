import type { ItemLocationEntry } from '../../types.js';

// Consumable locations. Authored from general game knowledge, original
// phrasing, never scraped — same policy as talismans-locations.ts. Most
// throwing pots/knives/greases/boluses are genuinely diffuse (sold by
// various merchants throughout the game, or common enemy drops) — that's
// an honest description of how this category actually works, not a
// shortcut. locationNames only ever reference real MapLocation.name
// values (base game only).
export const CONSUMABLE_LOCATIONS: ItemLocationEntry[] = [
  // ---- Throwing pots ----
  {
    itemName: 'Hefty Fire Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game, including the Perfumer merchants.',
  },
  {
    itemName: 'Hefty Rock Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Lightning Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Fetid Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Fly Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Freezing Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Poison Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Oil Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Volcano Pot',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Hefty Frenzied Flame Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Rancor Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Magic Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Rot Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Furnace Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Hefty Red Lightning Pot',
    locationNames: [],
    summary: 'Sold by merchants later in the game, tied to dragon-cult content.',
  },
  {
    itemName: 'Red Lightning Pot',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area, tied to dragon-cult content.',
  },
  {
    itemName: 'Frenzied Flame Pot',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region, near the Frenzied Flame Village.',
  },
  {
    itemName: 'Eternal Sleep Pot',
    locationNames: [],
    summary: 'Found late in the game, tied to sleep-themed enemies.',
  },
  {
    itemName: 'Roped Frenzied Flame Pot',
    locationNames: [],
    summary: 'Found near the Frenzied Flame Village in the Mountaintops of the Giants.',
  },
  {
    itemName: 'Fire Pot',
    locationNames: [],
    summary: 'One of the most common consumables, sold by nearly every merchant in the game.',
  },
  {
    itemName: 'Oil Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Redmane Fire Pot',
    locationNames: ['Redmane Castle'],
    summary: "Sold by soldiers or found near Redmane Castle in Caelid, tied to Radahn's Festival.",
  },
  {
    itemName: 'Giantsflame Fire Pot',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Magic Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Academy Magic Pot',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy.',
  },
  {
    itemName: 'Lightning Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Ancient Dragonbolt Pot',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Holy Water Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game, associated with the Erdtree faith.',
  },
  {
    itemName: 'Sacred Order Pot',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Poison Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Fetid Pot',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Rot Pot',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Swarm Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Freezing Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Sleep Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Volcano Pot',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Rancor Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Cursed-Blood Pot',
    locationNames: ['Mohgwyn Palace'],
    summary: 'Found in the Mohgwyn Palace area, tied to Mohg and blood-oath content.',
  },
  {
    itemName: 'Alluring Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Beastlure Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Albinauric Pot',
    locationNames: ['Village of the Albinaurics'],
    summary: 'Found in or near the Village of the Albinaurics.',
  },
  {
    itemName: 'Roped Fire Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Oil Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Magic Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Lightning Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Holy Water Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Poison Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Fetid Pot',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Roped Fly Pot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Roped Volcano Pot',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },

  // ---- Throwing knives ----
  {
    itemName: 'Bone Dart',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Poisonbone Dart',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Crystal Dart',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region, near crystal-cave-type dungeons.',
  },
  {
    itemName: 'Throwing Dagger',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Kukri',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Fan Daggers',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },

  // ---- Throwing stones ----
  {
    itemName: 'Ruin Fragment',
    locationNames: [],
    summary: 'Found commonly throughout the open world, especially around ruins.',
  },
  {
    itemName: 'Poisoned Stone',
    locationNames: [],
    summary: 'Found commonly throughout the open world.',
  },
  {
    itemName: 'Poisoned Stone Clump',
    locationNames: [],
    summary: 'Found commonly throughout the open world.',
  },
  {
    itemName: 'Explosive Stone',
    locationNames: [],
    summary: 'Found commonly throughout the open world.',
  },
  {
    itemName: 'Explosive Stone Clump',
    locationNames: [],
    summary: 'Found commonly throughout the open world.',
  },
  {
    itemName: 'Glintstone Scrap',
    locationNames: [],
    summary: 'Found commonly in Liurnia of the Lakes.',
  },
  {
    itemName: 'Large Glintstone Scrap',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Cuckoo Glintstone',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Gravity Stone Chunk',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Gravity Stone Fan',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },

  // ---- Other throwables ----
  {
    itemName: 'Innard Meat',
    locationNames: [],
    summary: 'Found commonly throughout the open world.',
  },
  {
    itemName: 'Dragon Communion Harpoon',
    locationNames: ['Church of Dragon Communion'],
    summary: 'Sold at a Dragon Communion altar such as the Church of Dragon Communion.',
  },

  // ---- Greases ----
  {
    itemName: 'Messmerfire Grease',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Dragonbolt Grease',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Royal Magic Grease',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy.',
  },
  {
    itemName: 'Golden Grease',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Eternal Sleep Grease',
    locationNames: [],
    summary: 'Found late in the game, tied to sleep-themed enemies.',
  },
  {
    itemName: 'Dragon Communion Grease',
    locationNames: ['Church of Dragon Communion'],
    summary: 'Sold at a Dragon Communion altar such as the Church of Dragon Communion.',
  },
  {
    itemName: 'Fire Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Magic Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Lightning Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Holy Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Poison Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Rot Grease',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Blood Grease',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Freezing Grease',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Soporific Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Dragonwound Grease',
    locationNames: ['Church of Dragon Communion'],
    summary: 'Sold at a Dragon Communion altar such as the Church of Dragon Communion.',
  },
  {
    itemName: 'Shield Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },

  // ---- Drawstring greases ----
  {
    itemName: 'Drawstring Messmerfire Grease',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Drawstring Dragonbolt Grease',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Drawstring Royal Magic Grease',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Drawstring Golden Grease',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Drawstring Eternal Sleep Grease',
    locationNames: [],
    summary: 'Found late in the game, tied to sleep-themed enemies.',
  },
  {
    itemName: 'Drawstring Fire Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Drawstring Magic Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Drawstring Lightning Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Drawstring Holy Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Drawstring Poison Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Drawstring Rot Grease',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Drawstring Blood Grease',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Drawstring Soporific Grease',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },

  // ---- Perfume arts ----
  {
    itemName: 'Spark Aromatic',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Uplifting Aromatic',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Poison Spraymist',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Acid Spraymist',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Bloodboil Aromatic',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },
  {
    itemName: 'Ironjar Aromatic',
    locationNames: ['Volcano Manor'],
    summary: 'Sold by the Perfumer merchant in Volcano Manor.',
  },

  // ---- Damage negation consumables ----
  {
    itemName: 'Spellproof Pickled Liver',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area, tied to Kalé the Prawn merchant.',
  },
  {
    itemName: 'Fireproof Pickled Liver',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Lightningproof Pickled Liver',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Holyproof Pickled Liver',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Opaline Pickled Liver',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area.',
  },
  {
    itemName: 'Spellproof Dried Liver',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Fireproof Dried Liver',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Lightningproof Dried Liver',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Holyproof Dried Liver',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Boiled Prawn',
    locationNames: ['Stormhill Shack'],
    summary: 'Sold by Kalé, the wandering merchant found near Stormhill Shack early in the game.',
  },
  {
    itemName: 'Boiled Crab',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Soft Cotton',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },

  // ---- Resistance consumables ----
  {
    itemName: 'Immunizing Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Invigorating Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Clarifying Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Dappled Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Immunizing White Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Invigorating White Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Clarifying White Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Dappled White Cured Meat',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },

  // ---- Medicine ----
  {
    itemName: 'Neutralizing Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Preserving Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Stanching Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Thawfrost Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Stimulating Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Clarifying Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Rejuvenating Boluses',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },

  // ---- Healing items ----
  {
    itemName: 'Blessing of Marika',
    locationNames: [],
    summary: 'A rare item found only in a handful of specific spots across the open world.',
  },
  {
    itemName: 'Flask of Crimson Tears',
    locationNames: [],
    summary: 'Given automatically at the very start of the game — not tied to a single world location.',
  },
  {
    itemName: 'Raw Meat Dumpling',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Warming Stone',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Frenzyflame Stone',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants, near the Frenzied Flame Village.',
  },
  {
    itemName: 'Rowa Raisin',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Sweet Raisin',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Frozen Raisin',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },

  // ---- Quest consumables ----
  {
    itemName: 'Iris of Grace',
    locationNames: [],
    summary: 'Received via specific NPC questlines rather than a fixed world location.',
  },
  {
    itemName: 'Iris of Occultation',
    locationNames: [],
    summary: 'Received via specific NPC questlines rather than a fixed world location.',
  },

  // ---- Currency consumables ----
  {
    itemName: 'Starlight Shards',
    locationNames: [],
    summary: 'Found scattered throughout the open world.',
  },

  // ---- Worthless rubbish ----
  {
    itemName: 'Glassshard',
    locationNames: [],
    summary: 'A worthless junk item picked up incidentally; not tied to a meaningful location.',
  },

  // ---- Runes ----
  {
    itemName: 'Lands Between Rune',
    locationNames: [],
    summary: 'A special rune item found or awarded at specific milestones rather than a single location.',
  },
  {
    itemName: 'Golden Rune [1]',
    locationNames: [],
    summary: 'Sold by merchants throughout the Lands Between and commonly dropped by enemies — no single source.',
  },
  {
    itemName: 'Golden Rune [2]',
    locationNames: [],
    summary: 'Commonly dropped by enemies and found throughout the open world — no single source.',
  },
  {
    itemName: 'Golden Rune [3]',
    locationNames: [],
    summary: 'Commonly dropped by enemies and found throughout the open world — no single source.',
  },
  {
    itemName: 'Golden Rune [4]',
    locationNames: [],
    summary: 'Commonly dropped by enemies and found throughout the open world — no single source.',
  },
  {
    itemName: 'Golden Rune [5]',
    locationNames: [],
    summary: 'Commonly dropped by enemies and found throughout the open world — no single source.',
  },
  {
    itemName: 'Golden Rune [6]',
    locationNames: [],
    summary: 'Commonly found throughout the mid-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [7]',
    locationNames: [],
    summary: 'Commonly found throughout the mid-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [8]',
    locationNames: [],
    summary: 'Commonly found throughout the mid-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [9]',
    locationNames: [],
    summary: 'Commonly found throughout the mid-to-late-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [10]',
    locationNames: [],
    summary: 'Commonly found throughout the late-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [11]',
    locationNames: [],
    summary: 'Commonly found throughout the late-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [12]',
    locationNames: [],
    summary: 'Commonly found throughout the late-game open world — no single source.',
  },
  {
    itemName: 'Golden Rune [13]',
    locationNames: [],
    summary: 'Found in the late-game open world, including the Mountaintops of the Giants — no single source.',
  },
  {
    itemName: "Numen's Rune",
    locationNames: [],
    summary: 'Found in the late-game open world — no single source.',
  },
  {
    itemName: "Hero's Rune [1]",
    locationNames: [],
    summary: 'Found in the endgame areas — no single source.',
  },
  {
    itemName: "Hero's Rune [2]",
    locationNames: [],
    summary: 'Found in the endgame areas — no single source.',
  },
  {
    itemName: "Hero's Rune [3]",
    locationNames: [],
    summary: 'Found in the endgame areas — no single source.',
  },
  {
    itemName: "Hero's Rune [4]",
    locationNames: [],
    summary: 'Found in the endgame areas — no single source.',
  },
  {
    itemName: "Hero's Rune [5]",
    locationNames: [],
    summary: 'Found in the endgame areas — no single source.',
  },
  {
    itemName: "Lord's Rune",
    locationNames: [],
    summary: 'A rare endgame item, awarded from specific major boss encounters rather than a single location.',
  },

  // ---- General consumables ----
  {
    itemName: 'Soap',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Spirit Raisin',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Lulling Branch',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Dragon Communion Flesh',
    locationNames: ['Church of Dragon Communion'],
    summary: 'Sold at a Dragon Communion altar such as the Church of Dragon Communion.',
  },
  {
    itemName: 'Dragonscale Flesh',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area, tied to dragon-cult content.',
  },
  {
    itemName: 'Fingerprint Nostrum',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Well-Pickled Turtle Neck',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Scorpion Stew',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Gourmet Scorpion Stew',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Scorpion Stew (2)',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Sacred Bloody Flesh',
    locationNames: ['Mohgwyn Palace'],
    summary: 'Found in the Mohgwyn Palace area.',
  },
  {
    itemName: 'Silver Horn Tender',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Golden Horn Tender',
    locationNames: [],
    summary: 'Sold by merchants later in the game.',
  },
  {
    itemName: 'Polterstone',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Surging Frenzied Flame',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants, near the Frenzied Flame Village.',
  },
  {
    itemName: 'Fire Coil',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Glinting Nail',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Ancient Dragon's Blessing",
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area, tied to dragon-cult content.',
  },
  {
    itemName: "Thiollier's Concoction",
    locationNames: [],
    summary: "Given by Thiollier during his questline, tied to Volcano Manor and Rot content.",
  },
  {
    itemName: "Marika's Rune",
    locationNames: [],
    summary: 'A rare high-value rune item, awarded from a specific late-game/endgame reward rather than a single location.',
  },
  {
    itemName: 'Flask of Cerulean Tears',
    locationNames: [],
    summary: 'Given automatically at the very start of the game — not tied to a single world location.',
  },
  {
    itemName: 'Flask of Wondrous Physick',
    locationNames: [],
    summary: 'Unlocked automatically the first time the player meets Melina at a Site of Grace — not tied to a specific location.',
  },
  {
    itemName: 'Rune Arc',
    locationNames: [],
    summary: 'Sold by merchants throughout the game and commonly dropped by enemies.',
  },
  {
    itemName: 'Pickled Turtle Neck',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Exalted Flesh',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Gold-Pickled Fowl Foot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Silver-Pickled Fowl Foot',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Bewitching Branch',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Baldachin's Blessing",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Radiant Baldachin's Blessing",
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Rainbow Stone',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
  {
    itemName: 'Glowstone',
    locationNames: [],
    summary: 'Sold by merchants throughout the game.',
  },
];
