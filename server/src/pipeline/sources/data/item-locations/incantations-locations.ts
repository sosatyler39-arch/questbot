import type { ItemLocationEntry } from '../../types.js';

// Incantation locations. Authored from general game knowledge, original
// phrasing, never scraped — same policy as talismans-locations.ts.
// locationNames only ever reference real MapLocation.name values (base
// game only — the map does not yet cover Shadow of the Erdtree content).
export const INCANTATION_LOCATIONS: ItemLocationEntry[] = [
  // ---- Dragon Communion incantations ----
  {
    itemName: "Agheel's Flame",
    locationNames: ['Church of Dragon Communion'],
    summary: 'Learned by defeating Flying Dragon Agheel in Agheel Lake, Limgrave, and offering its heart at a Dragon Communion altar such as the Church of Dragon Communion.',
  },
  {
    itemName: "Bayle's Flame Lightning",
    locationNames: [],
    summary: 'Shadow of the Erdtree content — learned from Bayle the Dread in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: "Bayle's Tyranny",
    locationNames: [],
    summary: 'Shadow of the Erdtree content — learned from Bayle the Dread in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: "Borealis's Mist",
    locationNames: ['Church of Dragon Communion'],
    summary: 'Learned by defeating Borealis the Freezing Fog and offering its heart at a Dragon Communion altar such as the Church of Dragon Communion.',
  },
  {
    itemName: 'Dragonclaw',
    locationNames: ['Church of Dragon Communion'],
    summary: 'One of the basic incantations taught at a Dragon Communion altar (such as the Church of Dragon Communion in Limgrave) in exchange for any dragon heart.',
  },
  {
    itemName: 'Dragonfire',
    locationNames: ['Church of Dragon Communion'],
    summary: 'One of the basic incantations taught at a Dragon Communion altar in exchange for any dragon heart.',
  },
  {
    itemName: 'Dragonice',
    locationNames: ['Church of Dragon Communion'],
    summary: 'One of the basic incantations taught at a Dragon Communion altar in exchange for any dragon heart.',
  },
  {
    itemName: 'Dragonmaw',
    locationNames: ['Church of Dragon Communion'],
    summary: 'One of the basic incantations taught at a Dragon Communion altar in exchange for any dragon heart.',
  },
  {
    itemName: "Ekzykes's Decay",
    locationNames: ['Church of Dragon Communion'],
    summary: 'Learned by defeating the Decaying Ekzykes and offering its heart at a Dragon Communion altar.',
  },
  {
    itemName: 'Ghostflame Breath',
    locationNames: [],
    summary: 'Learned by defeating a specific ghostflame-touched dragon in the underground Ainsel River/Nokstella region and offering its heart at a Dragon Communion altar.',
  },
  {
    itemName: 'Glintstone Breath',
    locationNames: ['Church of Dragon Communion'],
    summary: 'One of the basic incantations taught at a Dragon Communion altar in exchange for any dragon heart.',
  },
  {
    itemName: "Greyoll's Roar",
    locationNames: [],
    summary: 'Learned by giving the Elder Dragon Greyoll\'s heart at a Dragon Communion altar, after dealing with Greyoll near the Divine Tower of Caelid.',
  },
  {
    itemName: 'Magma Breath',
    locationNames: ['Church of Dragon Communion'],
    summary: 'One of the basic incantations taught at a Dragon Communion altar in exchange for any dragon heart.',
  },
  {
    itemName: "Placidusax's Ruin",
    locationNames: [],
    summary: "Reward for trading the Remembrance of the Dragonlord — dropped by Dragonlord Placidusax in Crumbling Farum Azula — with either Enia at the Roundtable Hold or the Two Fingers.",
  },
  {
    itemName: 'Rotten Breath',
    locationNames: ['Church of Dragon Communion'],
    summary: 'Learned at a Dragon Communion altar, tied to a rot-afflicted dragon encountered in Caelid.',
  },
  {
    itemName: "Smarag's Glintstone Breath",
    locationNames: ['Church of Dragon Communion'],
    summary: 'Learned by defeating the Glintstone Dragon Smarag and offering its heart at a Dragon Communion altar.',
  },
  {
    itemName: "Theodorix's Magma",
    locationNames: ['Church of Dragon Communion'],
    summary: 'Learned by defeating the Great Wyrm Theodorix and offering its heart at a Dragon Communion altar.',
  },

  // ---- Dragon Cult incantations ----
  {
    itemName: "Ancient Dragons' Lightning Spear",
    locationNames: [],
    summary: 'Found in the underground Siofra River / Nokron area, tied to the Night\'s Cavalry and ancient dragon-worshipping enemies there.',
  },
  {
    itemName: "Ancient Dragons' Lightning Strike",
    locationNames: [],
    summary: 'Found in the underground Siofra River / Nokron area.',
  },
  {
    itemName: 'Death Lightning',
    locationNames: [],
    summary: 'Dropped by a specific Divine Beast/Fortissax-adjacent enemy in the underground Deeproot Depths area.',
  },
  {
    itemName: 'Dragonbolt Blessing',
    locationNames: [],
    summary: 'Found in the underground Siofra River area.',
  },
  {
    itemName: 'Dragonbolt of Florissax',
    locationNames: [],
    summary: 'Found in the underground Deeproot Depths area.',
  },
  {
    itemName: 'Electrify Armament',
    locationNames: [],
    summary: 'Found in Limgrave, tied to early dragon-cult enemies near Fort Haight or the Third Church of Marika.',
  },
  {
    itemName: 'Electrocharge',
    locationNames: [],
    summary: 'Found in the underground Siofra River area.',
  },
  {
    itemName: "Fortissax's Lightning Spear",
    locationNames: [],
    summary: 'Reward tied to defeating Lichdragon Fortissax in the underground Deeproot Depths.',
  },
  {
    itemName: 'Frozen Lightning Spear',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Honed Bolt',
    locationNames: [],
    summary: 'Found in Limgrave, near early dragon-cult enemy camps.',
  },
  {
    itemName: "Knight's Lightning Spear",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Lansseax's Glaive",
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Lightning Spear',
    locationNames: [],
    summary: 'Found in Limgrave, an early incantation tied to dragon-cult enemies.',
  },
  {
    itemName: 'Lightning Strike',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Vyke's Dragonbolt",
    locationNames: [],
    summary: "Reward tied to Vyke's Wall of Champions questline content in the Mountaintops of the Giants.",
  },

  // ---- Erdtree incantations ----
  {
    itemName: 'Aspects of the Crucible: Bloom',
    locationNames: [],
    summary: 'Found deep in an underground Crucible Knight-related area, tied to the Haligtree lineage.',
  },
  {
    itemName: 'Aspects of the Crucible: Breath',
    locationNames: [],
    summary: 'Found deep in an underground Crucible Knight-related area.',
  },
  {
    itemName: 'Aspects of the Crucible: Horns',
    locationNames: [],
    summary: 'Found deep in an underground Crucible Knight-related area.',
  },
  {
    itemName: 'Aspects of the Crucible: Tail',
    locationNames: [],
    summary: 'Found deep in an underground Crucible Knight-related area.',
  },
  {
    itemName: 'Aspects of the Crucible: Thorns',
    locationNames: [],
    summary: 'Found deep in an underground Crucible Knight-related area.',
  },
  {
    itemName: 'Barrier of Gold',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Black Blade',
    locationNames: [],
    summary: "Reward from Maliketh, the Black Blade's remembrance, tied to Crumbling Farum Azula.",
  },
  {
    itemName: 'Blessing of the Erdtree',
    locationNames: ['Leyndell Catacombs'],
    summary: 'Found within Leyndell, Royal Capital.',
  },
  {
    itemName: "Blessing's Boon",
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Elden Stars',
    locationNames: [],
    summary: "Reward for progressing Goldmask's questline in Leyndell, Royal Capital.",
  },
  {
    itemName: 'Erdtree Heal',
    locationNames: [],
    summary: 'Found within Leyndell, Royal Capital.',
  },
  {
    itemName: 'Golden Lightning Fortification',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Golden Vow',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir/Volcano Manor area, tied to a Golden Order knight enemy.',
  },
  {
    itemName: 'Heal from Afar',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Land of Shadow',
    locationNames: [],
    summary: 'Found in the Altus Plateau area, despite its name predating the DLC of the same title.',
  },
  {
    itemName: 'Minor Erdtree',
    locationNames: [],
    summary: 'Found near one of the Minor Erdtree sites in the Altus Plateau or Weeping Peninsula.',
  },
  {
    itemName: 'Protection of the Erdtree',
    locationNames: [],
    summary: 'Found within Leyndell, Royal Capital.',
  },
  {
    itemName: 'Wrath from Afar',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Wrath of Gold',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- Two Fingers incantations ----
  {
    itemName: "Assassin's Approach",
    locationNames: ['Stormhill Shack'],
    summary: 'Purchasable early from Brother Corhyn or found near Stormhill Shack in Limgrave.',
  },
  {
    itemName: 'Cure Poison',
    locationNames: [],
    summary: 'One of the earliest Two Fingers incantations, purchasable from Brother Corhyn.',
  },
  {
    itemName: 'Darkness',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy in Liurnia of the Lakes.',
  },
  {
    itemName: 'Divine Fortification',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: 'Flame Fortification',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: 'Great Heal',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: 'Heal',
    locationNames: [],
    summary: 'A starting incantation for the Prophet and Confessor classes.',
  },
  {
    itemName: 'Lightning Fortification',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: "Lord's Aid",
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: "Lord's Divine Fortification",
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn in the mid-to-late game.',
  },
  {
    itemName: "Lord's Heal",
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn in the mid-to-late game.',
  },
  {
    itemName: 'Magic Fortification',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: 'Rejection',
    locationNames: [],
    summary: 'A starting incantation for the Prophet class, otherwise purchasable early from Brother Corhyn.',
  },
  {
    itemName: 'Shadow Bait',
    locationNames: [],
    summary: 'Purchasable early from Brother Corhyn.',
  },
  {
    itemName: 'Urgent Heal',
    locationNames: [],
    summary: 'A starting incantation for the Confessor class.',
  },

  // ---- Bestial incantations ----
  {
    itemName: 'Beast Claw',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula, tied to bestial cult enemies.',
  },
  {
    itemName: 'Bestial Constitution',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Bestial Sling',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Bestial Vitality',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: "Gurranq's Beast Claw",
    locationNames: ['Bestial Sanctum'],
    summary: 'Given by Gurranq, Beast Clergyman at the Bestial Sanctum in Dragonbarrow, in exchange for Deathroot.',
  },
  {
    itemName: 'Stone of Gurranq',
    locationNames: ['Bestial Sanctum'],
    summary: 'Given by Gurranq, Beast Clergyman at the Bestial Sanctum, in exchange for Deathroot.',
  },

  // ---- Black Flame incantations ----
  {
    itemName: 'Black Flame',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn once he progresses to Volcano Manor content, or found in Volcano Manor itself.',
  },
  {
    itemName: 'Black Flame Blade',
    locationNames: ['Volcano Manor'],
    summary: 'Found within Volcano Manor.',
  },
  {
    itemName: 'Black Flame Ritual',
    locationNames: ['Volcano Manor'],
    summary: 'Found within Volcano Manor.',
  },
  {
    itemName: "Black Flame's Protection",
    locationNames: ['Volcano Manor'],
    summary: 'Found within Volcano Manor.',
  },
  {
    itemName: 'Noble Presence',
    locationNames: ['Volcano Manor'],
    summary: 'Found within Volcano Manor.',
  },
  {
    itemName: 'Scouring Black Flame',
    locationNames: ['Volcano Manor'],
    summary: 'Found within Volcano Manor.',
  },

  // ---- Blood Oath incantations ----
  {
    itemName: 'Bloodboon',
    locationNames: ['Mohgwyn Palace'],
    summary: "Learned from Mohg, Lord of Blood's Blood Oath at Mohgwyn Palace.",
  },
  {
    itemName: 'Bloodflame Blade',
    locationNames: [],
    summary: "Given by the Bloody Finger Hunter Yura, or found tied to blood-oath related content in Caelid.",
  },
  {
    itemName: 'Bloodflame Talons',
    locationNames: [],
    summary: 'Found in the Caelid region, tied to blood-oath enemies there.',
  },
  {
    itemName: 'Furious Blade of Ansbach',
    locationNames: [],
    summary: 'Shadow of the Erdtree content — given by Ansbach in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: 'Swarm of Flies',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },

  // ---- Giants' Flame incantations ----
  {
    itemName: 'Burn, O Flame!',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Catch Flame',
    locationNames: [],
    summary: 'A starting incantation for the Prophet class, otherwise purchasable early from Brother Corhyn.',
  },
  {
    itemName: "Fire's Deadly Sin",
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Flame Sling',
    locationNames: [],
    summary: 'Purchasable early from Brother Corhyn.',
  },
  {
    itemName: 'Flame, of the Fell God',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Flame, Cleanse Me',
    locationNames: [],
    summary: 'Purchasable early from Brother Corhyn.',
  },
  {
    itemName: 'Flame, Fall Upon Them',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Flame, Grant Me Strength',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: 'Flame, Protect Me',
    locationNames: [],
    summary: 'Purchasable from Brother Corhyn, wherever he is currently found.',
  },
  {
    itemName: 'Giantsflame Take Thee',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'O, Flame!',
    locationNames: [],
    summary: 'A starting incantation for the Prophet class, otherwise found early in the game.',
  },
  {
    itemName: 'Surge, O Flame!',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Whirl, O Flame!',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },

  // ---- Messmer's Flame incantations ----
  {
    itemName: 'Fire Serpent',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Messmer's Orb",
    locationNames: [],
    summary: 'Shadow of the Erdtree content — a reward tied to Messmer, the Impaler in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: 'Rain of Fire',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Frenzied Flame incantations ----
  {
    itemName: 'Frenzied Burst',
    locationNames: [],
    summary: 'Found in the Frenzied Flame Village in the Mountaintops of the Giants, tied to the Three Fingers.',
  },
  {
    itemName: 'Howl of Shabriri',
    locationNames: [],
    summary: 'Found deep within the Subterranean Shunning-Grounds, tied to the Frenzied Flame ending path.',
  },
  {
    itemName: 'Inescapable Frenzy',
    locationNames: [],
    summary: 'Found deep within the Subterranean Shunning-Grounds.',
  },
  {
    itemName: "Midra's Flame of Frenzy",
    locationNames: [],
    summary: 'Shadow of the Erdtree content — tied to Midra, Lord of Frenzied Flame in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: 'The Flame of Frenzy',
    locationNames: [],
    summary: 'Given by the Three Fingers upon committing to the Frenzied Flame path, deep within the Subterranean Shunning-Grounds.',
  },
  {
    itemName: 'Unendurable Frenzy',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Servants of Rot incantations ----
  {
    itemName: 'Pest Threads',
    locationNames: [],
    summary: 'Found in the Caelid region, tied to scarlet rot cult enemies.',
  },
  {
    itemName: 'Pest-Thread Spears',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Poison Armament',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Poison Mist',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Rotten Butterflies',
    locationNames: [],
    summary: 'Found deep in the Lake of Rot, an underground area beneath Nokstella.',
  },
  {
    itemName: 'Scarlet Aeonia',
    locationNames: [],
    summary: 'Reward for trading the Remembrance of the Rot Goddess, dropped by Malenia, Blade of Miquella, at Miquella\'s Haligtree.',
  },

  // ---- Spiral Tower incantations ----
  {
    itemName: 'Divine Beast Tornado',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Divine Bird Feathers',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Giant Golden Arc',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Golden Arcs',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Roar of Rugalea',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region, tied to a great red bear enemy there.',
  },
  {
    itemName: 'Spira',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Watchful Spirit',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },

  // ---- Miquellan incantations ----
  {
    itemName: 'Light of Miquella',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Multilayered Ring of Light',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Golden Order incantations ----
  {
    itemName: 'Discus of Light',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Immutable Shield',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Law of Causality',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Law of Regression',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Litany of Proper Death',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Order Healing',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Order's Blade",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Radagon's Rings of Light",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Triple Rings of Light',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
];
