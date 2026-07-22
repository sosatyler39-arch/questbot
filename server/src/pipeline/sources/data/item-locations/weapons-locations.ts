import type { ItemLocationEntry } from '../../types.js';

// Base-game and Shadow of the Erdtree weapon locations. Authored from
// general game knowledge, original phrasing, never scraped — same policy
// as whetstones-great-runes-locations.ts. locationNames only ever
// reference real MapLocation.name values (base game only — Shadow of the
// Erdtree's Land of Shadow isn't covered by the map yet, so DLC weapons
// always use an empty array).
export const WEAPON_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: "Dagger",
    locationNames: [],
    summary: "A common early weapon — starting equipment for several classes, and sold by Twin Maiden Husks in the Roundtable Hold and other merchants.",
  },
  {
    itemName: "Black Knife",
    locationNames: ["Black Knife Catacombs"],
    summary: "Dropped by Black Knife Assassins, and also found in a chest inside Black Knife Catacombs in Liurnia.",
  },
  {
    itemName: "Parrying Dagger",
    locationNames: [],
    summary: "Sold by Patches once he sets up shop, and found as a common item in chests around the Lands Between.",
  },
  {
    itemName: "Miséricorde",
    locationNames: ["Stormveil Castle"],
    summary: "Found on a corpse inside Stormveil Castle.",
  },
  {
    itemName: "Reduvia",
    locationNames: ["Bridge of Sacrifice"],
    summary: "Dropped by the invading NPC Bloody Finger Nerijus, fought near the Bridge of Sacrifice in Limgrave.",
  },
  {
    itemName: "Crystal Knife",
    locationNames: ["Raya Lucaria Crystal Tunnel"],
    summary: "Found within Raya Lucaria Crystal Tunnel in Liurnia.",
  },
  {
    itemName: "Celebrant's Sickle",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by Celebrants, the masked enemies found around Dominula, Windmill Village.",
  },
  {
    itemName: "Glintstone Kris",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Found within Raya Lucaria Academy in Liurnia.",
  },
  {
    itemName: "Scorpion's Stinger",
    locationNames: [],
    summary: "Dropped by giant scorpion enemies found across Caelid and the Dragonbarrow.",
  },
  {
    itemName: "Great Knife",
    locationNames: [],
    summary: "A common early item found on a corpse in the Limgrave region.",
  },
  {
    itemName: "Wakizashi",
    locationNames: [],
    summary: "Found on a corpse along the coast in the Limgrave region.",
  },
  {
    itemName: "Cinquedea",
    locationNames: ["Volcano Manor"],
    summary: "Found within Volcano Manor in Mt. Gelmir.",
  },
  {
    itemName: "Ivory Sickle",
    locationNames: [],
    summary: "Sold by a Nomadic Merchant found along the roads of Liurnia.",
  },
  {
    itemName: "Bloodstained Dagger",
    locationNames: [],
    summary: "A common drop from bandit and Bloody Finger-type enemies encountered across the Lands Between.",
  },
  {
    itemName: "Erdsteel Dagger",
    locationNames: [],
    summary: "Sold by the Twin Maiden Husks merchants in the Roundtable Hold.",
  },
  {
    itemName: "Blade of Calling",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Main-gauche",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight's Shortsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Longsword",
    locationNames: [],
    summary: "A common straight sword found early on and sold by several merchants.",
  },
  {
    itemName: "Short Sword",
    locationNames: [],
    summary: "A common straight sword found as loot and sold by merchants.",
  },
  {
    itemName: "Broadsword",
    locationNames: [],
    summary: "A basic starting-tier straight sword sold by general merchants.",
  },
  {
    itemName: "Lordsworn's Straight Sword",
    locationNames: [],
    summary: "Starting weapon for the Confessor class, also carried by common Lordsworn soldiers.",
  },
  {
    itemName: "Weathered Straight Sword",
    locationNames: [],
    summary: "Starting weapon for the Wretch class.",
  },
  {
    itemName: "Ornamental Straight Sword",
    locationNames: [],
    summary: "Found early in the Roundtable Hold, the player's home base.",
  },
  {
    itemName: "Golden Epitaph",
    locationNames: [],
    summary: "Found deep within the Deeproot Depths beneath Nokron.",
  },
  {
    itemName: "Coded Sword",
    locationNames: ["Volcano Manor"],
    summary: "Sold by Patches once he relocates to Volcano Manor.",
  },
  {
    itemName: "Sword of Night and Flame",
    locationNames: ["Caria Manor"],
    summary: "Found in a chest within Caria Manor in Liurnia.",
  },
  {
    itemName: "Crystal Sword",
    locationNames: [],
    summary: "Found in a crystal-lined cave in the Liurnia region.",
  },
  {
    itemName: "Carian Knight's Sword",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Sword of St. Trina",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Miquellan Knight's Sword",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree, Miquella's sealed dwelling.",
  },
  {
    itemName: "Cane Sword",
    locationNames: ["Volcano Manor"],
    summary: "Found in the Mt. Gelmir region, near Volcano Manor.",
  },
  {
    itemName: "Regalia of Eochaid",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Noble's Slender Sword",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Warhawk's Talon",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Lazuli Glintstone Sword",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region, near the academy.",
  },
  {
    itemName: "Rotten Crystal Sword",
    locationNames: [],
    summary: "Found near the Lake of Rot beneath Liurnia.",
  },
  {
    itemName: "Velvet Sword of St. Trina",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Stone-Sheathed Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found among the Ancient Ruins of Rauh, not covered by this map yet.",
  },
  {
    itemName: "Sword of Light",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Miquella-aligned weapon found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Sword of Darkness",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a counterpart weapon found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Inseparable Sword",
    locationNames: [],
    summary: "Dropped by a pair of wandering NPC swordsmen encountered together in the overworld.",
  },
  {
    itemName: "Bastard Sword",
    locationNames: [],
    summary: "A common greatsword found as loot and sold by merchants.",
  },
  {
    itemName: "Forked Greatsword",
    locationNames: [],
    summary: "Found as loot in the early game regions.",
  },
  {
    itemName: "Iron Greatsword",
    locationNames: [],
    summary: "A common greatsword carried by soldier-type enemies.",
  },
  {
    itemName: "Lordsworn's Greatsword",
    locationNames: [],
    summary: "Carried by common Lordsworn soldiers.",
  },
  {
    itemName: "Knight's Greatsword",
    locationNames: [],
    summary: "Dropped by knight-type enemies found across the Lands Between.",
  },
  {
    itemName: "Flamberge",
    locationNames: [],
    summary: "Found as loot in the Liurnia or Altus Plateau region.",
  },
  {
    itemName: "Ordovis's Greatsword",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Alabaster Lord's Sword",
    locationNames: [],
    summary: "Dropped by an Alabaster Lord, a phantom-like NPC encountered in the capital outskirts.",
  },
  {
    itemName: "Banished Knight's Greatsword",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Dark Moon Greatsword",
    locationNames: ["Moonlight Altar"],
    summary: "Reward for completing Ranni the Witch's questline, given at the Moonlight Altar.",
  },
  {
    itemName: "Sacred Relic Sword",
    locationNames: [],
    summary: "Reward for completing a late-game quest chain tied to the Deathbed Dream and Fia.",
  },
  {
    itemName: "Helphen's Steeple",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Blasphemous Blade",
    locationNames: ["Volcano Manor"],
    summary: "Remembrance weapon forged from defeating Rykard, Lord of Blasphemy, at Volcano Manor.",
  },
  {
    itemName: "Marais Executioner's Sword",
    locationNames: [],
    summary: "Dropped by Marais Executioners, hooded enemies found on Limgrave's western coast and in Caelid.",
  },
  {
    itemName: "Sword of Milos",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Golden Order Greatsword",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Claymore",
    locationNames: [],
    summary: "A common greatsword sold by merchants and found as loot.",
  },
  {
    itemName: "Gargoyle's Greatsword",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "Remembrance weapon forged from defeating the Valiant Gargoyles boss fight.",
  },
  {
    itemName: "Death's Poker",
    locationNames: [],
    summary: "Dropped by Deathbirds, crow-like enemies found at dusk across the Lands Between.",
  },
  {
    itemName: "Gargoyle's Blackblade",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "The alternate remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Greatsword of Damnation",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Lizard Greatsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Bloodfiend-type enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Greatsword of Solitude",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Greatsword",
    locationNames: [],
    summary: "A basic colossal sword found as loot in the early game.",
  },
  {
    itemName: "Watchdog's Greatsword",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Maliketh's Black Blade",
    locationNames: [],
    summary: "Remembrance weapon forged from defeating Maliketh, the Black Blade, in Crumbling Farum Azula.",
  },
  {
    itemName: "Troll's Golden Sword",
    locationNames: [],
    summary: "Dropped by Stonedigger Trolls found across the Lands Between.",
  },
  {
    itemName: "Zweihander",
    locationNames: [],
    summary: "A common colossal sword found as loot and sold by merchants.",
  },
  {
    itemName: "Starscourge Greatsword",
    locationNames: ["Redmane Castle"],
    summary: "Remembrance weapon forged from defeating Starscourge Radahn at Redmane Castle.",
  },
  {
    itemName: "Royal Greatsword",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Godslayer's Greatsword",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Ruins Greatsword",
    locationNames: [],
    summary: "Found as loot among ruins in Limgrave and Liurnia.",
  },
  {
    itemName: "Grafted Blade Greatsword",
    locationNames: ["Stormveil Castle"],
    summary: "Remembrance weapon forged from defeating Godrick the Grafted at Stormveil Castle.",
  },
  {
    itemName: "Troll Knight's Sword",
    locationNames: [],
    summary: "Dropped by Troll Knights, giant sword-wielding trolls found across the overworld.",
  },
  {
    itemName: "Ancient Meteoric Ore Greatsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight's Greatsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Greatsword of Radahn (Lord)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance weapon forged from defeating Radahn, Consort of Miquella, not covered by this map yet.",
  },
  {
    itemName: "Moonrithyll's Knight Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Greatsword of Radahn (Light)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — the alternate form of Radahn's remembrance greatsword, not covered by this map yet.",
  },
  {
    itemName: "Nox Flowing Sword",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Falchion",
    locationNames: [],
    summary: "A common curved sword sold by merchants and found as loot.",
  },
  {
    itemName: "Beastman's Curved Sword",
    locationNames: [],
    summary: "Dropped by Beastmen of Farum Azula and similar enemies.",
  },
  {
    itemName: "Shotel",
    locationNames: [],
    summary: "Found as loot in the early game regions.",
  },
  {
    itemName: "Shamshir",
    locationNames: [],
    summary: "Found as loot, commonly carried by bandit-type enemies.",
  },
  {
    itemName: "Bandit's Curved Sword",
    locationNames: [],
    summary: "Starting weapon for the Bandit class.",
  },
  {
    itemName: "Magma Blade",
    locationNames: ["Volcano Manor"],
    summary: "Found in the Mt. Gelmir region, near Volcano Manor.",
  },
  {
    itemName: "Flowing Curved Sword",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Wing of Astel",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Found within Nokstella, Eternal City, the sunken ruins beneath Liurnia.",
  },
  {
    itemName: "Scavenger's Curved Sword",
    locationNames: [],
    summary: "Dropped by Scavenger-type enemies found in Limgrave and Liurnia.",
  },
  {
    itemName: "Eclipse Shotel",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Serpent-God's Curved Sword",
    locationNames: [],
    summary: "Found within the sunken ruins beneath Liurnia, around Nokron and Nokstella.",
  },
  {
    itemName: "Mantis Blade",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Scimitar",
    locationNames: [],
    summary: "A common curved sword found as loot and sold by merchants.",
  },
  {
    itemName: "Grossmesser",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Spirit Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Falx",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Dancing Blade of Ranah",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a boss encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Horned Warrior's Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Horned Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Onyx Lord's Greatsword",
    locationNames: [],
    summary: "Dropped by an Onyx Lord, a large armored enemy found guarding groups of soldiers.",
  },
  {
    itemName: "Dismounter",
    locationNames: [],
    summary: "Found in the Altus Plateau region; especially effective against mounted enemies.",
  },
  {
    itemName: "Bloodhound's Fang",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Bloodhound Knight Darriwil in Stormveil Castle.",
  },
  {
    itemName: "Magma Wyrm's Scalesword",
    locationNames: [],
    summary: "Dropped by the Magma Wyrm boss fought in Mt. Gelmir.",
  },
  {
    itemName: "Zamor Curved Sword",
    locationNames: ["Zamor Ruins"],
    summary: "Found around Zamor Ruins in the Mountaintops of the Giants.",
  },
  {
    itemName: "Omen Cleaver",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Found within the Subterranean Shunning-Grounds beneath Leyndell.",
  },
  {
    itemName: "Monk's Flameblade",
    locationNames: [],
    summary: "Dropped by fire monk enemies found in Liurnia and the Altus Plateau.",
  },
  {
    itemName: "Beastman's Cleaver",
    locationNames: [],
    summary: "Dropped by Beastmen of Farum Azula.",
  },
  {
    itemName: "Morgott's Cursed Sword",
    locationNames: [],
    summary: "Dropped by Morgott, the Omen King, in Leyndell, Royal Capital.",
  },
  {
    itemName: "Freyja's Greatsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Horned Warrior's Greatsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Horned Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Star-Lined Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Uchigatana",
    locationNames: [],
    summary: "Dropped by Bloody Finger Hunter Yura, an NPC found in Limgrave and later at other locations across the game.",
  },
  {
    itemName: "Nagakiba",
    locationNames: [],
    summary: "Dropped by Bloody Finger Hunter Yura, alongside the Uchigatana, or found separately as loot.",
  },
  {
    itemName: "Hand of Malenia",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Remembrance weapon forged from defeating Malenia, Blade of Miquella, within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Meteoric Ore Blade",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Rivers of Blood",
    locationNames: [],
    summary: "Dropped by Bloody Finger Okina, an invading NPC found in Limgrave and Mt. Gelmir.",
  },
  {
    itemName: "Moonveil",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Found guarded by a boss within Raya Lucaria Academy.",
  },
  {
    itemName: "Dragonscale Blade",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Serpentbone Blade",
    locationNames: [],
    summary: "Dropped by serpent-themed enemies found around Nokstella and the Lake of Rot.",
  },
  {
    itemName: "Sword of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Twinblade",
    locationNames: [],
    summary: "A common twinblade found as loot and sold by merchants.",
  },
  {
    itemName: "Godskin Peeler",
    locationNames: [],
    summary: "Dropped by Godskin Apostles and Godskin Nobles, enemies fought at several sites.",
  },
  {
    itemName: "Twinned Knight Swords",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Eleonora's Poleblade",
    locationNames: [],
    summary: "Dropped by Eleonora, a hidden NPC boss encountered at the Roundtable Hold.",
  },
  {
    itemName: "Gargoyle's Twinblade",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "Remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Gargoyle's Black Blades",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "The alternate remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Euporia",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Black Steel Twinblade",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Black Steel soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Carian Sorcery Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Estoc",
    locationNames: [],
    summary: "A common thrusting sword found as loot and sold by merchants.",
  },
  {
    itemName: "Cleanrot Knight's Sword",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Rapier",
    locationNames: [],
    summary: "Starting weapon for the Astrologer class.",
  },
  {
    itemName: "Rogier's Rapier",
    locationNames: [],
    summary: "Given by Sorcerer Rogier, an NPC met in the Roundtable Hold, as a quest reward.",
  },
  {
    itemName: "Antspur Rapier",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Frozen Needle",
    locationNames: [],
    summary: "Dropped by a frost-aligned enemy found in the Consecrated Snowfield region.",
  },
  {
    itemName: "Noble's Estoc",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Sword Lance",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Bloody Helice",
    locationNames: [],
    summary: "Found as loot in the Caelid region.",
  },
  {
    itemName: "Godskin Stitcher",
    locationNames: [],
    summary: "Dropped by Godskin Apostles and Godskin Nobles, enemies fought at several sites.",
  },
  {
    itemName: "Great Épée",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Dragon King's Cragblade",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Queelign's Greatsword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Ansbach's companion Queelign, not covered by this map yet.",
  },
  {
    itemName: "Battle Axe",
    locationNames: [],
    summary: "A common axe found as loot and sold by merchants.",
  },
  {
    itemName: "Forked Hatchet",
    locationNames: [],
    summary: "Starting weapon for the Vagabond and other classes.",
  },
  {
    itemName: "Hand Axe",
    locationNames: [],
    summary: "A common early axe found as loot.",
  },
  {
    itemName: "Jawbone Axe",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Iron Cleaver",
    locationNames: [],
    summary: "Dropped by butcher-type enemies found across the Lands Between.",
  },
  {
    itemName: "Ripple Blade",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Celebrant's Cleaver",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by Celebrants, the masked enemies found around Dominula, Windmill Village.",
  },
  {
    itemName: "Icerind Hatchet",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region, tied to frost-aligned enemies.",
  },
  {
    itemName: "Highland Axe",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Sacrificial Axe",
    locationNames: [],
    summary: "Dropped by sacrificial cult enemies found around Liurnia.",
  },
  {
    itemName: "Rosus' Axe",
    locationNames: [],
    summary: "Found in the Mt. Gelmir region.",
  },
  {
    itemName: "Stormhawk Axe",
    locationNames: [],
    summary: "Found in the Limgrave region, associated with Stormhawk enemies.",
  },
  {
    itemName: "Smithscript Axe",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Smithscript soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Death Knight's Twin Axes",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Death Knight in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier's Axe",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Forked-Tongue Hatchet",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Warped Axe",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Putrescence Cleaver",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Greataxe",
    locationNames: [],
    summary: "A common greataxe found as loot and sold by merchants.",
  },
  {
    itemName: "Great Omenkiller Cleaver",
    locationNames: ["Village of the Albinaurics"],
    summary: "Dropped by the Omenkiller boss fought near the Village of the Albinaurics.",
  },
  {
    itemName: "Crescent Moon Axe",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Axe of Godrick",
    locationNames: ["Stormveil Castle"],
    summary: "Remembrance weapon forged from defeating Godrick the Grafted at Stormveil Castle.",
  },
  {
    itemName: "Longhaft Axe",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier-type enemies.",
  },
  {
    itemName: "Rusted Anchor",
    locationNames: [],
    summary: "Found near the coast in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Executioner's Greataxe",
    locationNames: [],
    summary: "Dropped by executioner-type enemies found across the Lands Between.",
  },
  {
    itemName: "Winged Greathorn",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Butchering Knife",
    locationNames: [],
    summary: "Dropped by butcher-type enemies found across the Lands Between.",
  },
  {
    itemName: "Gargoyle's Great Axe",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "Remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Gargoyle's Black Axe",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "The alternate remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Death Knight's Longhaft Axe",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Death Knight in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Bonny Butchering Knife",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Mace",
    locationNames: [],
    summary: "A common hammer found as loot and sold by merchants.",
  },
  {
    itemName: "Club",
    locationNames: [],
    summary: "Starting weapon for the Prisoner and other classes.",
  },
  {
    itemName: "Curved Club",
    locationNames: [],
    summary: "Found as loot in the early game regions.",
  },
  {
    itemName: "Warpick",
    locationNames: [],
    summary: "A common hammer-type weapon found as loot.",
  },
  {
    itemName: "Morning Star",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Varré's Bouquet",
    locationNames: ["Chapel of Anticipation"],
    summary: "Given by Varré, an NPC first met at the Chapel of Anticipation, as a quest reward.",
  },
  {
    itemName: "Spiked Club",
    locationNames: [],
    summary: "Dropped by ogre-type enemies found across the Lands Between.",
  },
  {
    itemName: "Hammer",
    locationNames: [],
    summary: "A common hammer sold by merchants.",
  },
  {
    itemName: "Monk's Flamemace",
    locationNames: [],
    summary: "Dropped by fire monk enemies found in Liurnia and the Altus Plateau.",
  },
  {
    itemName: "Envoy's Horn",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Scepter of the All-Knowing",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region, tied to a scholarly NPC.",
  },
  {
    itemName: "Nox Flowing Hammer",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Ringed Finger",
    locationNames: [],
    summary: "Dropped by Fingercreeper-type enemies found across the Lands Between.",
  },
  {
    itemName: "Stone Club",
    locationNames: [],
    summary: "Dropped by stone-skinned troll or ogre enemies.",
  },
  {
    itemName: "Marika's Hammer",
    locationNames: ["Elden Throne"],
    summary: "Found near the Elden Throne in Leyndell, Royal Capital.",
  },
  {
    itemName: "Flowerstone Gavel",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Large Club",
    locationNames: [],
    summary: "A common great hammer found as loot, carried by ogre-type enemies.",
  },
  {
    itemName: "Greathorn Hammer",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Battle Hammer",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier-type enemies.",
  },
  {
    itemName: "Great Mace",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Curved Great Club",
    locationNames: [],
    summary: "Dropped by giant enemies found in the Mountaintops of the Giants.",
  },
  {
    itemName: "Celebrant's Skull",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by Celebrants, the masked enemies found around Dominula, Windmill Village.",
  },
  {
    itemName: "Pickaxe",
    locationNames: [],
    summary: "Found as loot, commonly carried by miner-type enemies.",
  },
  {
    itemName: "Beastclaw Greathammer",
    locationNames: [],
    summary: "Dropped by Runebear enemies found across the Lands Between.",
  },
  {
    itemName: "Envoy's Long Horn",
    locationNames: ["Leyndell Catacombs"],
    summary: "Found within Leyndell Catacombs beneath the Royal Capital.",
  },
  {
    itemName: "Cranial Vessel Candlestand",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Found within the Subterranean Shunning-Grounds beneath Leyndell.",
  },
  {
    itemName: "Great Stars",
    locationNames: [],
    summary: "Dropped by ogre-type enemies found in the Mountaintops of the Giants.",
  },
  {
    itemName: "Brick Hammer",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Devourer's Scepter",
    locationNames: [],
    summary: "Dropped by an Ulcerated Tree Spirit encountered at several sites.",
  },
  {
    itemName: "Rotten Battle Hammer",
    locationNames: [],
    summary: "Found near the Lake of Rot beneath Liurnia.",
  },
  {
    itemName: "Smithscript Greathammer",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Smithscript soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Black Steel Greathammer",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Black Steel soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Nightrider Flail",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Flail",
    locationNames: [],
    summary: "A common flail found as loot and sold by merchants.",
  },
  {
    itemName: "Family Heads",
    locationNames: [],
    summary: "Found in the Caelid region, tied to the Bell Bearing Hunter enemies.",
  },
  {
    itemName: "Bastard's Stars",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Chainlink Flail",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Serpent Flail",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a serpent-themed enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Short Spear",
    locationNames: [],
    summary: "A common spear found as loot and sold by merchants.",
  },
  {
    itemName: "Spear",
    locationNames: [],
    summary: "Starting weapon for the Vagabond and other classes.",
  },
  {
    itemName: "Crystal Spear",
    locationNames: [],
    summary: "Found in a crystal-lined cave in the Liurnia region.",
  },
  {
    itemName: "Clayman's Harpoon",
    locationNames: [],
    summary: "Dropped by Clayman enemies found around the Lake of Rot in Liurnia.",
  },
  {
    itemName: "Cleanrot Spear",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Partisan",
    locationNames: [],
    summary: "A common spear found as loot and sold by merchants.",
  },
  {
    itemName: "Celebrant's Rib-Rake",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by Celebrants, the masked enemies found around Dominula, Windmill Village.",
  },
  {
    itemName: "Pike",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier-type enemies.",
  },
  {
    itemName: "Torchpole",
    locationNames: [],
    summary: "Found as loot, commonly carried by torch-wielding enemies.",
  },
  {
    itemName: "Bolt of Gransax",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region, tied to Dragonlord Placidusax.",
  },
  {
    itemName: "Cross-Naginata",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Death Ritual Spear",
    locationNames: [],
    summary: "Dropped by death-aligned enemies found across the Lands Between.",
  },
  {
    itemName: "Inquisitor's Girandole",
    locationNames: [],
    summary: "Dropped by an Inquisitor encountered in the Leyndell capital outskirts.",
  },
  {
    itemName: "Spiked Spear",
    locationNames: [],
    summary: "A common spear found as loot in the early game.",
  },
  {
    itemName: "Iron Spear",
    locationNames: [],
    summary: "A common spear found as loot and sold by merchants.",
  },
  {
    itemName: "Rotten Crystal Spear",
    locationNames: [],
    summary: "Found near the Lake of Rot beneath Liurnia.",
  },
  {
    itemName: "Smithscript Spear",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Smithscript soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Swift Spear",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Bloodfiend's Fork",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Bloodfiend enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Bloodfiend's Sacred Spear",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Bloodfiend enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Mohgwyn's Sacred Spear",
    locationNames: ["Mohgwyn Palace"],
    summary: "Remembrance weapon forged from defeating Mohg, Lord of Blood, at Mohgwyn Palace.",
  },
  {
    itemName: "Siluria's Tree",
    locationNames: [],
    summary: "Found in the Consecrated Snowfield region.",
  },
  {
    itemName: "Serpent-Hunter",
    locationNames: [],
    summary: "Given by Igon, an NPC encountered in the Mountaintops of the Giants, tied to a dragon boss fight.",
  },
  {
    itemName: "Vyke's War Spear",
    locationNames: [],
    summary: "Dropped by an invading Vyke's Drift phantom, encountered on the Weeping Peninsula coast.",
  },
  {
    itemName: "Lance",
    locationNames: [],
    summary: "Found as loot, commonly used by mounted soldier enemies.",
  },
  {
    itemName: "Treespear",
    locationNames: [],
    summary: "Found in the Altus Plateau region, near the Erdtree.",
  },
  {
    itemName: "Spear of the Impaler",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier's Spear",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Barbed Staff-Spear",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Halberd",
    locationNames: [],
    summary: "A common halberd found as loot and sold by merchants.",
  },
  {
    itemName: "Pest's Glaive",
    locationNames: [],
    summary: "Dropped by giant insect enemies found across the Lands Between.",
  },
  {
    itemName: "Lucerne",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier-type enemies.",
  },
  {
    itemName: "Banished Knight's Halberd",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Commander's Standard",
    locationNames: [],
    summary: "Dropped by a Commander-type enemy leading a soldier group.",
  },
  {
    itemName: "Nightrider Glaive",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Ripple Crescent Halberd",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Vulgar Militia Saw",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Vulgar Militia enemies found around Volcano Manor.",
  },
  {
    itemName: "Golden Halberd",
    locationNames: ["Leyndell Catacombs"],
    summary: "Found within Leyndell Catacombs beneath the Royal Capital.",
  },
  {
    itemName: "Glaive",
    locationNames: [],
    summary: "A common halberd found as loot and sold by merchants.",
  },
  {
    itemName: "Loretta's War Sickle",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Loretta, Knight of the Haligtree, fought in Caria Manor.",
  },
  {
    itemName: "Guardian's Swordspear",
    locationNames: [],
    summary: "Dropped by Guardian-type enemies found in the Siofra River and beyond.",
  },
  {
    itemName: "Vulgar Militia Shotel",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Vulgar Militia enemies found around Volcano Manor.",
  },
  {
    itemName: "Dragon Halberd",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Gargoyle's Halberd",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "Remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Gargoyle's Black Halberd",
    locationNames: ["Valiant Gargoyles (site)"],
    summary: "The alternate remembrance weapon forged from defeating the Valiant Gargoyles.",
  },
  {
    itemName: "Spirit Glaive",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Poleblade of the Bud",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Miquella-aligned enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Scythe",
    locationNames: [],
    summary: "Found as loot, commonly carried by farmer-type enemies.",
  },
  {
    itemName: "Grave Scythe",
    locationNames: [],
    summary: "Found near catacombs and graveyards across the Lands Between.",
  },
  {
    itemName: "Halo Scythe",
    locationNames: [],
    summary: "Dropped by an invading NPC encountered near a church.",
  },
  {
    itemName: "Winged Scythe",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Obsidian Lamina",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Unarmed",
    locationNames: [],
    summary: "Always available — no weapon required.",
  },
  {
    itemName: "Caestus",
    locationNames: [],
    summary: "Starting weapon for the Confessor and other classes.",
  },
  {
    itemName: "Spiked Caestus",
    locationNames: [],
    summary: "Found as loot in the early game regions.",
  },
  {
    itemName: "Grafted Dragon",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Iron Ball",
    locationNames: [],
    summary: "Dropped by ogre-type enemies found across the Lands Between.",
  },
  {
    itemName: "Star Fist",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Katar",
    locationNames: [],
    summary: "Found as loot, commonly carried by assassin-type enemies.",
  },
  {
    itemName: "Clinging Bone",
    locationNames: [],
    summary: "Dropped by imp-type enemies found across the Lands Between.",
  },
  {
    itemName: "Veteran's Prosthesis",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Cipher Pata",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Thiollier's Hidden Needle",
    locationNames: [],
    summary: "Shadow of the Erdtree content — given by Thiollier, an NPC met in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Pata",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Poisoned Hand",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Madding Hand",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Frenzied Flame, found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Golem Fist",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Golem enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Hookclaws",
    locationNames: [],
    summary: "Dropped by Ulcerated Tree Spirits or found as loot in early caves.",
  },
  {
    itemName: "Venomous Fang",
    locationNames: [],
    summary: "Dropped by poison-aligned enemies found in Caelid.",
  },
  {
    itemName: "Bloodhound Claws",
    locationNames: [],
    summary: "Found in the Limgrave region.",
  },
  {
    itemName: "Raptor Talons",
    locationNames: [],
    summary: "Dropped by bird-like enemies found in the Mountaintops of the Giants.",
  },
  {
    itemName: "Claws of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Whip",
    locationNames: [],
    summary: "A common whip found as loot and sold by merchants.",
  },
  {
    itemName: "Thorned Whip",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Magma Whip Candlestick",
    locationNames: ["Volcano Manor"],
    summary: "Found in the Mt. Gelmir region, near Volcano Manor.",
  },
  {
    itemName: "Hoslow's Petal Whip",
    locationNames: [],
    summary: "Dropped by Hoslow, Knight of Blood, an invading NPC boss.",
  },
  {
    itemName: "Giant's Red Braid",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Urumi",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Tooth Whip",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Anvil Hammer",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Bloodfiend's Arm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Bloodfiend enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Prelate's Inferno Crozier",
    locationNames: [],
    summary: "Dropped by a Fire Prelate, a large fire-wielding enemy encountered at several sites.",
  },
  {
    itemName: "Watchdog's Staff",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Great Club",
    locationNames: [],
    summary: "Dropped by ogre-type enemies found across the Lands Between.",
  },
  {
    itemName: "Envoy's Greathorn",
    locationNames: ["Leyndell Catacombs"],
    summary: "Found within Leyndell Catacombs beneath the Royal Capital.",
  },
  {
    itemName: "Duelist Greataxe",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Axe of Godfrey",
    locationNames: ["Elden Throne"],
    summary: "Remembrance weapon forged from defeating Godfrey, First Elden Lord, at the Elden Throne.",
  },
  {
    itemName: "Dragon Greatclaw",
    locationNames: [],
    summary: "Dropped by a dragon-type boss encountered in the Mountaintops of the Giants.",
  },
  {
    itemName: "Staff of the Avatar",
    locationNames: [],
    summary: "Dropped by an Erdtree Avatar, a tree-shaped boss enemy encountered at several sites.",
  },
  {
    itemName: "Fallingstar Beast Jaw",
    locationNames: [],
    summary: "Dropped by a Fallingstar Beast, a meteor-summoning enemy encountered at several sites.",
  },
  {
    itemName: "Ghiza's Wheel",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Giant-Crusher",
    locationNames: [],
    summary: "A heavy colossal weapon found as loot in the early game.",
  },
  {
    itemName: "Golem's Halberd",
    locationNames: [],
    summary: "Dropped by a Battlefield Golem, a large enemy found across the Lands Between.",
  },
  {
    itemName: "Troll's Hammer",
    locationNames: [],
    summary: "Dropped by Stonedigger Trolls found across the Lands Between.",
  },
  {
    itemName: "Rotten Staff",
    locationNames: [],
    summary: "Found near the Lake of Rot beneath Liurnia.",
  },
  {
    itemName: "Rotten Greataxe",
    locationNames: [],
    summary: "Found near the Lake of Rot beneath Liurnia.",
  },
  {
    itemName: "Devonia's Hammer",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shadow Sunflower Blossom",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gazing Finger",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Fingercreeper-type enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shortbow",
    locationNames: [],
    summary: "Starting weapon for the Samurai and other classes, sold by merchants.",
  },
  {
    itemName: "Misbegotten Shortbow",
    locationNames: [],
    summary: "Dropped by Misbegotten enemies found in Caelid.",
  },
  {
    itemName: "Red Branch Shortbow",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Harp Bow",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Composite Bow",
    locationNames: [],
    summary: "Found as loot, commonly used by soldier archers.",
  },
  {
    itemName: "Bone Bow",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Longbow",
    locationNames: [],
    summary: "A common bow found as loot and sold by merchants.",
  },
  {
    itemName: "Albinauric Bow",
    locationNames: ["Village of the Albinaurics"],
    summary: "Found around the Village of the Albinaurics in Liurnia.",
  },
  {
    itemName: "Horn Bow",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Erdtree Bow",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Serpent Bow",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Pulley Bow",
    locationNames: [],
    summary: "Found as loot, commonly used by soldier archers.",
  },
  {
    itemName: "Black Bow",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Ansbach's Longbow",
    locationNames: [],
    summary: "Shadow of the Erdtree content — given by Ansbach, an NPC met in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Lion Greatbow",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Golem Greatbow",
    locationNames: [],
    summary: "Dropped by Golem Archer enemies found across the Lands Between.",
  },
  {
    itemName: "Erdtree Greatbow",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Greatbow",
    locationNames: [],
    summary: "A common greatbow found as loot in the early game.",
  },
  {
    itemName: "Igon's Greatbow",
    locationNames: [],
    summary: "Shadow of the Erdtree content — given by Igon, an NPC met in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Soldier's Crossbow",
    locationNames: [],
    summary: "A common crossbow found as loot and sold by merchants.",
  },
  {
    itemName: "Light Crossbow",
    locationNames: [],
    summary: "Sold by merchants and found as loot in the early game.",
  },
  {
    itemName: "Heavy Crossbow",
    locationNames: [],
    summary: "Found as loot, commonly used by soldier enemies.",
  },
  {
    itemName: "Pulley Crossbow",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Full Moon Crossbow",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Arbalest",
    locationNames: [],
    summary: "Found as loot, commonly used by soldier enemies.",
  },
  {
    itemName: "Crepus's Black-Key Crossbow",
    locationNames: ["Volcano Manor"],
    summary: "Given by an NPC tied to the Volcano Manor questline.",
  },
  {
    itemName: "Repeating Crossbow",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Spread Crossbow",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Hand Ballista",
    locationNames: [],
    summary: "Found as loot, commonly used by soldier enemies.",
  },
  {
    itemName: "Jar Cannon",
    locationNames: [],
    summary: "Dropped by an Iron Virgin or Jar-type enemy found across the Lands Between.",
  },
  {
    itemName: "Rabbath's Cannon",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Glintstone Staff",
    locationNames: [],
    summary: "Starting weapon for the Astrologer class, sold by merchants.",
  },
  {
    itemName: "Crystal Staff",
    locationNames: [],
    summary: "Found in a crystal-lined cave in the Liurnia region.",
  },
  {
    itemName: "Gelmir Glintstone Staff",
    locationNames: ["Volcano Manor"],
    summary: "Found in the Mt. Gelmir region, near Volcano Manor.",
  },
  {
    itemName: "Demi-Human Queen's Staff",
    locationNames: [],
    summary: "Dropped by a Demi-Human Queen, a mounted spellcaster enemy.",
  },
  {
    itemName: "Carian Regal Scepter",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Reward for defeating Rennala, Queen of the Full Moon, at Raya Lucaria Academy.",
  },
  {
    itemName: "Digger's Staff",
    locationNames: ["Siofra River Well"],
    summary: "Found in the Siofra River region beneath Limgrave.",
  },
  {
    itemName: "Astrologer's Staff",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Carian Glintblade Staff",
    locationNames: ["Caria Manor"],
    summary: "Found in or around Caria Manor in Liurnia.",
  },
  {
    itemName: "Prince of Death's Staff",
    locationNames: ["Prince of Death's Throne"],
    summary: "Found in the Deeproot Depths beneath Nokron.",
  },
  {
    itemName: "Albinauric Staff",
    locationNames: ["Village of the Albinaurics"],
    summary: "Found around the Village of the Albinaurics in Liurnia.",
  },
  {
    itemName: "Academy Glintstone Staff",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Found within Raya Lucaria Academy.",
  },
  {
    itemName: "Carian Glintstone Staff",
    locationNames: ["Caria Manor"],
    summary: "Found in or around Caria Manor in Liurnia.",
  },
  {
    itemName: "Azur's Glintstone Staff",
    locationNames: [],
    summary: "Given by the sorcerer Primeval Sorcerer Azur, found meditating in the Mt. Gelmir region.",
  },
  {
    itemName: "Lusat's Glintstone Staff",
    locationNames: [],
    summary: "Given by the sorcerer Primeval Sorcerer Lusat, found meditating in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Meteorite Staff",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Staff of the Guilty",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Rotten Crystal Staff",
    locationNames: [],
    summary: "Found near the Lake of Rot beneath Liurnia.",
  },
  {
    itemName: "Staff of Loss",
    locationNames: [],
    summary: "Dropped by an insane sorcerer-type enemy found in Caelid or Liurnia.",
  },
  {
    itemName: "Staff of the Great Beyond",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Maternal Staff",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Miquella-aligned staff found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Finger Seal",
    locationNames: [],
    summary: "Starting weapon for the Prophet class, sold by merchants.",
  },
  {
    itemName: "Godslayer's Seal",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Giant's Seal",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region, tied to the Fire Giant.",
  },
  {
    itemName: "Gravel Stone Seal",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Clawmark Seal",
    locationNames: [],
    summary: "Found near Caelid's beast-type enemies.",
  },
  {
    itemName: "Golden Order Seal",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Erdtree Seal",
    locationNames: [],
    summary: "Found in the Altus Plateau region, near the Erdtree.",
  },
  {
    itemName: "Dragon Communion Seal",
    locationNames: ["Church of Dragon Communion"],
    summary: "Sold at the Church of Dragon Communion in Limgrave.",
  },
  {
    itemName: "Frenzied Flame Seal",
    locationNames: [],
    summary: "Tied to the Three Fingers and the Frenzied Flame ending questline.",
  },
  {
    itemName: "Dryleaf Seal",
    locationNames: [],
    summary: "Shadow of the Erdtree content — given by the Dryleaf Hero, an NPC met in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight's Seal",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Fire Knight in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Spiraltree Seal",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shield of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Buckler",
    locationNames: [],
    summary: "A common small shield sold by merchants and found as loot.",
  },
  {
    itemName: "Perfumer's Shield",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Perfumer-type enemies found in and around Volcano Manor.",
  },
  {
    itemName: "Man-Serpent's Shield",
    locationNames: [],
    summary: "Dropped by Man-Serpent enemies found near Nokstella and Volcano Manor.",
  },
  {
    itemName: "Rickety Shield",
    locationNames: [],
    summary: "A common early small shield found as loot.",
  },
  {
    itemName: "Pillory Shield",
    locationNames: [],
    summary: "Found in the Weeping Peninsula region.",
  },
  {
    itemName: "Red Thorn Roundshield",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Scripture Wooden Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Riveted Wooden Shield",
    locationNames: [],
    summary: "A common small shield found as loot and sold by merchants.",
  },
  {
    itemName: "Blue-White Wooden Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Rift Shield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Iron Roundshield",
    locationNames: [],
    summary: "A common small shield sold by merchants and found as loot.",
  },
  {
    itemName: "Gilded Iron Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Ice Crest Shield",
    locationNames: [],
    summary: "Found in the Consecrated Snowfield region.",
  },
  {
    itemName: "Smoldering Shield",
    locationNames: ["Volcano Manor"],
    summary: "Found in the Mt. Gelmir region, near Volcano Manor.",
  },
  {
    itemName: "Spiralhorn Shield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Coil Shield",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Smithscript Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Smithscript soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shield of the Guilty",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Beastman's Jar-Shield",
    locationNames: [],
    summary: "Dropped by Beastmen of Farum Azula.",
  },
  {
    itemName: "Kite Shield",
    locationNames: [],
    summary: "A common medium shield sold by merchants and found as loot.",
  },
  {
    itemName: "Marred Leather Shield",
    locationNames: [],
    summary: "Starting shield for several classes.",
  },
  {
    itemName: "Marred Wooden Shield",
    locationNames: [],
    summary: "A common early medium shield found as loot.",
  },
  {
    itemName: "Banished Knight's Shield",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Albinauric Shield",
    locationNames: ["Village of the Albinaurics"],
    summary: "Found around the Village of the Albinaurics in Liurnia.",
  },
  {
    itemName: "Sun Realm Shield",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Silver Mirrorshield",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Round Shield",
    locationNames: [],
    summary: "A common medium shield found as loot and sold by merchants.",
  },
  {
    itemName: "Scorpion Kite Shield",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Twinbird Kite Shield",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Blue-Gold Kite Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Brass Shield",
    locationNames: [],
    summary: "A common medium shield sold by merchants.",
  },
  {
    itemName: "Great Turtle Shell",
    locationNames: [],
    summary: "Dropped by giant turtle enemies found across the Lands Between.",
  },
  {
    itemName: "Carian Knight's Shield",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Large Leather Shield",
    locationNames: [],
    summary: "A common medium shield found as loot.",
  },
  {
    itemName: "Horse Crest Wooden Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by mounted soldier enemies.",
  },
  {
    itemName: "Candletree Wooden Shield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Flame Crest Wooden Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Hawk Crest Wooden Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Beast Crest Heater Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Red Crest Heater Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Blue Crest Heater Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Eclipse Crest Heater Shield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Inverted Hawk Heater Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Heater Shield",
    locationNames: [],
    summary: "A common medium shield sold by merchants and found as loot.",
  },
  {
    itemName: "Black Leather Shield",
    locationNames: [],
    summary: "A common medium shield found as loot.",
  },
  {
    itemName: "Messmer Soldier Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Wolf Crest Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Serpent Crest Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Golden Lion Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Dragon Towershield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Distinguished Greatshield",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Crucible Hornshield",
    locationNames: [],
    summary: "Dropped by a Crucible Knight, an armored elite enemy encountered at several sites.",
  },
  {
    itemName: "Dragonclaw Shield",
    locationNames: [],
    summary: "Found in the Caelid or Limgrave region, tied to dragon enemies.",
  },
  {
    itemName: "Briar Greatshield",
    locationNames: [],
    summary: "Dropped near thorny, briar-covered enemies found across the Lands Between.",
  },
  {
    itemName: "Erdtree Greatshield",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region, near the Erdtree.",
  },
  {
    itemName: "Golden Beast Crest Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Jellyfish Shield",
    locationNames: [],
    summary: "Dropped by giant jellyfish enemies found in the Lake of Rot and Liurnia.",
  },
  {
    itemName: "Fingerprint Stone Shield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region, tied to Fingerprint-marked enemies.",
  },
  {
    itemName: "Icon Shield",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "One-Eyed Shield",
    locationNames: [],
    summary: "Dropped by a Cyclops enemy found across the Lands Between.",
  },
  {
    itemName: "Visage Shield",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Found within the Subterranean Shunning-Grounds beneath Leyndell.",
  },
  {
    itemName: "Spiked Palisade Shield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Manor Towershield",
    locationNames: ["Caria Manor"],
    summary: "Found in or around Caria Manor in Liurnia.",
  },
  {
    itemName: "Crossed-Tree Towershield",
    locationNames: [],
    summary: "Found in the Altus Plateau region.",
  },
  {
    itemName: "Inverted Hawk Towershield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Ant's Skull Plate",
    locationNames: [],
    summary: "Dropped by giant ant enemies found in the Lake of Rot and Caelid regions.",
  },
  {
    itemName: "Redmane Greatshield",
    locationNames: ["Redmane Castle"],
    summary: "Found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Eclipse Crest Greatshield",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Cuckoo Greatshield",
    locationNames: [],
    summary: "Found in the Liurnia of the Lakes region.",
  },
  {
    itemName: "Golden Greatshield",
    locationNames: [],
    summary: "Found in the Leyndell, Royal Capital region.",
  },
  {
    itemName: "Gilded Greatshield",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "Haligtree Crest Greatshield",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Wooden Greatshield",
    locationNames: [],
    summary: "A common greatshield found as loot in the early game.",
  },
  {
    itemName: "Lordsworn's Shield",
    locationNames: [],
    summary: "Carried by common Lordsworn soldiers.",
  },
  {
    itemName: "Black Steel Greatshield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Black Steel soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Verdigris Greatshield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Torch",
    locationNames: [],
    summary: "A common torch sold by merchants and found as loot.",
  },
  {
    itemName: "Steel-Wire Torch",
    locationNames: [],
    summary: "Found as loot, commonly carried by soldier enemies.",
  },
  {
    itemName: "St. Trina's Torch",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Ghostflame Torch",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Beast-Repellent Torch",
    locationNames: [],
    summary: "Found in the Caelid region.",
  },
  {
    itemName: "Sentry's Torch",
    locationNames: [],
    summary: "Found as loot, commonly carried by sentry-type enemies.",
  },
  {
    itemName: "Nanaya's Torch",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Lamenting Visage",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Dryleaf Arts",
    locationNames: [],
    summary: "Shadow of the Erdtree content — given by the Dryleaf Hero, an NPC met in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Dane's Footwork",
    locationNames: [],
    summary: "Shadow of the Erdtree content — given by Dane, an NPC met in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Firespark Perfume Bottle",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Chilling Perfume Bottle",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Frenzyflame Perfume Bottle",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Lightning Perfume Bottle",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Deadly Poison Perfume Bottle",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Dueling Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Carian Thrusting Shield",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Smithscript Dagger",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Smithscript soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Backhand Blade",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Smithscript Cirque",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Smithscript soldier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Curseblade's Cirque",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Milady",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Leda's Sword",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Leda, an NPC encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rellana's Twin Blades",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance weapon forged from defeating Rellana, Twin Moon Knight, not covered by this map yet.",
  },
  {
    itemName: "Great Katana",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Dragon-Hunter's Great Katana",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rakshasa's Great Katana",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Rakshasa enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Beast Claw",
    locationNames: [],
    summary: "Shadow of the Erdtree content — found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Red Bear's Claw",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Red Bear, an enemy encountered in the Land of Shadow, not covered by this map yet.",
  },
];
