import type { ItemLocationEntry } from '../../types.js';

// Talisman locations. Authored from general game knowledge, original
// phrasing, never scraped — same policy as chests.ts/key-items.ts/dungeon
// pages. locationNames only ever reference real MapLocation.name values
// (client/src/renderer/map/locations.ts, base game only — the map does not
// yet cover Shadow of the Erdtree content); every Shadow of the Erdtree
// talisman is noted as such and left without a pin for that reason, not
// because it lacks a real-world location.
export const TALISMAN_LOCATIONS: ItemLocationEntry[] = [
  // ---- Damage negation talismans ----
  {
    itemName: 'Dragoncrest Shield Talisman',
    locationNames: ['Stormfoot Catacombs'],
    summary: "Found in Stormfoot Catacombs in Limgrave, past the catacomb's boss.",
  },
  {
    itemName: 'Dragoncrest Shield Talisman +1',
    locationNames: ['Volcano Manor'],
    summary: 'Found in a chest inside Volcano Manor, in Mt. Gelmir.',
  },
  {
    itemName: 'Dragoncrest Shield Talisman +2',
    locationNames: [],
    summary: 'Found deep in Crumbling Farum Azula, among the falling ruins.',
  },
  {
    itemName: 'Dragoncrest Greatshield Talisman',
    locationNames: ['Fort Faroth'],
    summary: 'Found in a chest at the top of Fort Faroth in Caelid, guarded by giant bats.',
  },
  {
    itemName: 'Spelldrake Talisman',
    locationNames: ['Raya Lucaria Crystal Tunnel'],
    summary: 'Found in the Raya Lucaria Crystal Tunnel in Liurnia of the Lakes.',
  },
  {
    itemName: 'Spelldrake Talisman +1',
    locationNames: ['Sellia Crystal Tunnel'],
    summary: 'Found in the Sellia Crystal Tunnel in Caelid.',
  },
  {
    itemName: 'Spelldrake Talisman +2',
    locationNames: [],
    summary: 'Found later in the game, in Crumbling Farum Azula.',
  },
  {
    itemName: 'Spelldrake Talisman +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Flamedrake Talisman',
    locationNames: ['Groveside Cave'],
    summary: 'Found in Groveside Cave in Limgrave.',
  },
  {
    itemName: 'Flamedrake Talisman +1',
    locationNames: [],
    summary: 'Found later in the game, in a cave near Mt. Gelmir.',
  },
  {
    itemName: 'Flamedrake Talisman +2',
    locationNames: [],
    summary: 'Found deep in Crumbling Farum Azula.',
  },
  {
    itemName: 'Flamedrake Talisman +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Boltdrake Talisman',
    locationNames: [],
    summary: 'Found in Liurnia of the Lakes, in one of the crystal-cave-type dungeons near the academy.',
  },
  {
    itemName: 'Boltdrake Talisman +1',
    locationNames: [],
    summary: 'Found later in the game, in the Mountaintops of the Giants.',
  },
  {
    itemName: 'Boltdrake Talisman +2',
    locationNames: [],
    summary: 'Found deep in Crumbling Farum Azula.',
  },
  {
    itemName: 'Boltdrake Talisman +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Haligdrake Talisman',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Haligdrake Talisman +1',
    locationNames: [],
    summary: 'Found later in the game, in the Mountaintops of the Giants.',
  },
  {
    itemName: 'Haligdrake Talisman +2',
    locationNames: [],
    summary: 'Found deep in Crumbling Farum Azula.',
  },
  {
    itemName: 'Golden Braid',
    locationNames: [],
    summary: 'Shadow of the Erdtree content — the +3 equivalent of the Haligdrake line, found in the Land of Shadow, not covered by this map yet.',
  },
  {
    itemName: 'Pearldrake Talisman',
    locationNames: [],
    summary: 'Found early in the game, somewhere in Limgrave or Weeping Peninsula.',
  },
  {
    itemName: 'Pearldrake Talisman +1',
    locationNames: [],
    summary: 'Found in Liurnia of the Lakes or the Altus Plateau.',
  },
  {
    itemName: 'Pearldrake Talisman +2',
    locationNames: [],
    summary: 'Found later in the game, around the Mountaintops of the Giants or Consecrated Snowfield.',
  },
  {
    itemName: 'Pearldrake Talisman +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Stat-boosting charms ----
  {
    itemName: 'Immunizing Horn Charm',
    locationNames: [],
    summary: 'Found as a reward for progressing a merchant/Volcano Manor-adjacent path fairly early in the game.',
  },
  {
    itemName: 'Immunizing Horn Charm +1',
    locationNames: [],
    summary: 'Found later in the game as an upgraded drop; not tied to a single early-game location.',
  },
  {
    itemName: 'Immunizing Horn Charm +2',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Stalwart Horn Charm',
    locationNames: [],
    summary: 'Found in the open world in the mid-game, in one of the eastern regions such as Caelid.',
  },
  {
    itemName: 'Stalwart Horn Charm +1',
    locationNames: [],
    summary: 'Found later in the game; not tied to a single early-game location.',
  },
  {
    itemName: 'Stalwart Horn Charm +2',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Clarifying Horn Charm',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Clarifying Horn Charm +1',
    locationNames: [],
    summary: 'Found later in the game; not tied to a single early-game location.',
  },
  {
    itemName: 'Clarifying Horn Charm +2',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Mottled Necklace',
    locationNames: ['Siofra River Well'],
    summary: 'Found down in the Siofra River area, reached via the Siofra River Well.',
  },
  {
    itemName: 'Mottled Necklace +1',
    locationNames: [],
    summary: 'Found later in the game; not tied to a single early-game location.',
  },
  {
    itemName: 'Mottled Necklace +2',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Prince of Death's Pustule",
    locationNames: [],
    summary: 'Found in an underground area related to the Deathbed Companions/Fia questline.',
  },
  {
    itemName: "Prince of Death's Cyst",
    locationNames: [],
    summary: "Reward for completing Fia's Deathbed Companions questline.",
  },

  // ---- Status and resistance talismans ----
  {
    itemName: 'Ailment Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Weapon-type talismans ----
  {
    itemName: 'Dagger Talisman',
    locationNames: ['Murkwater Cave'],
    summary: 'Found near Murkwater Cave in Limgrave.',
  },
  {
    itemName: 'Curved Sword Talisman',
    locationNames: [],
    summary: 'Found on a corpse in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Twinblade Talisman',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Axe Talisman',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Hammer Talisman',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Spear Talisman',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },
  {
    itemName: 'Lance Talisman',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region, near open horseback terrain.',
  },
  {
    itemName: 'Claw Talisman',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Two-Handed Sword Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Guarding, movement, and ranged talismans ----
  {
    itemName: 'Greatshield Talisman',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Pearl Shield Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Retaliatory Crossed-Tree Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Lacerating Crossed-Tree Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Arrow's Sting Talisman",
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: "Arrow's Reach Talisman",
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: "Arrow's Soaring Sting Talisman",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Sharpshot Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Magic, skill, and FP talismans ----
  {
    itemName: 'Graven-School Talisman',
    locationNames: ['Raya Lucaria Academy'],
    summary: 'Found in or around Raya Lucaria Academy in Liurnia of the Lakes.',
  },
  {
    itemName: 'Graven-Mass Talisman',
    locationNames: [],
    summary: 'Found later in the game, in the Altus Plateau or Mountaintops region.',
  },
  {
    itemName: "Faithful's Canvas Talisman",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Flock's Canvas Talisman",
    locationNames: [],
    summary: 'Found later in the game, in the Altus Plateau or Mountaintops region.',
  },
  {
    itemName: 'Primal Glintstone Blade',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region, associated with the Cuckoo Church area.',
  },
  {
    itemName: 'Moon of Nokstella',
    locationNames: ['Nokstella, Eternal City'],
    summary: 'Found in Nokstella, Eternal City, in the underground Ainsel River region.',
  },
  {
    itemName: "Old Lord's Talisman",
    locationNames: [],
    summary: 'Found in the underground Siofra River / Nokron area.',
  },
  {
    itemName: 'Radagon Icon',
    locationNames: ['Volcano Manor'],
    summary: 'Found in Volcano Manor, in Mt. Gelmir.',
  },
  {
    itemName: 'Beloved Stardust',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Roar Medallion',
    locationNames: [],
    summary: 'Found in the Caelid region, associated with dragon-type enemies.',
  },
  {
    itemName: 'Companion Jar',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Perfumer's Talisman",
    locationNames: [],
    summary: 'Found in the Altus Plateau area, associated with the perfumer NPCs there.',
  },
  {
    itemName: 'Carian Filigreed Crest',
    locationNames: ['Caria Manor'],
    summary: 'Found in or around Caria Manor in Liurnia of the Lakes.',
  },
  {
    itemName: 'Warrior Jar Shard',
    locationNames: [],
    summary: 'Found in the Altus Plateau area, associated with the Warrior Jar enemies there.',
  },
  {
    itemName: 'Shard of Alexander',
    locationNames: [],
    summary: "Reward from Alexander the Warrior Jar's questline, found across several regions as it progresses.",
  },
  {
    itemName: 'Godfrey Icon',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },

  // ---- Combat-style and situational talismans ----
  {
    itemName: "Rellana's Cameo",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Shattered Stone Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Smithing Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Enraged Divine Beast Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Talisman of the Dread',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Bull-Goat's Talisman",
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Blue Dancer Charm',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Verdigris Discus',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Magic Scorpion Charm',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Fire Scorpion Charm',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Lightning Scorpion Charm',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Sacred Scorpion Charm',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },

  // ---- Crucible talismans ----
  {
    itemName: 'Crucible Scale Talisman',
    locationNames: [],
    summary: 'Found on a corpse in the Weeping Peninsula.',
  },
  {
    itemName: 'Crucible Feather Talisman',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Crucible Knot Talisman',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Fine Crucible Feather Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Talisman of All Crucibles',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- HP-threshold and successive-hit talismans ----
  {
    itemName: 'Red-Feathered Branchsword',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Blue-Feathered Branchsword',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Ritual Sword Talisman',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Ritual Shield Talisman',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Assassin's Crimson Dagger",
    locationNames: [],
    summary: 'Found in the Altus Plateau area, associated with the Volcano Manor assassination questline.',
  },
  {
    itemName: "Assassin's Cerulean Dagger",
    locationNames: [],
    summary: 'Found via the Volcano Manor assassination questline.',
  },
  {
    itemName: 'Winged Sword Insignia',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Rotten Winged Sword Insignia',
    locationNames: [],
    summary: 'Found in the Caelid region, an upgraded variant tied to scarlet rot content there.',
  },
  {
    itemName: "Millicent's Prosthesis",
    locationNames: [],
    summary: "Reward from Millicent's questline.",
  },
  {
    itemName: 'Godskin Swaddling Cloth',
    locationNames: [],
    summary: 'Dropped by one of the Godskin Apostle/Noble bosses.',
  },

  // ---- Status-proximity and kill-triggered talismans ----
  {
    itemName: "Kindred of Rot's Exultation",
    locationNames: [],
    summary: 'Found in the Caelid region, tied to scarlet rot content.',
  },
  {
    itemName: "Lord of Blood's Exultation",
    locationNames: ['Mohgwyn Palace'],
    summary: 'Found at Mohgwyn Palace.',
  },
  {
    itemName: "Aged One's Exultation",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "St. Trina's Smile",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Blade of Mercy',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Taker's Cameo",
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: "Ancestral Spirit's Horn",
    locationNames: [],
    summary: 'Found in the underground Siofra River / Ainsel River area.',
  },
  {
    itemName: 'Crusade Insignia',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Dried Bouquet',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },

  // ---- Item and utility talismans ----
  {
    itemName: 'Gold Scarab',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Silver Scarab',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Crepus's Vial",
    locationNames: ['Stormhill Shack'],
    summary: 'Found near Stormhill Shack in Limgrave.',
  },
  {
    itemName: 'Concealing Veil',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Longtail Cat Talisman',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Furled Finger's Trick-Mirror",
    locationNames: [],
    summary: 'Purchasable from the Roundtable Hold twin maiden husks after progressing far enough into the game.',
  },
  {
    itemName: "Host's Trick-Mirror",
    locationNames: [],
    summary: 'Purchasable from the Roundtable Hold twin maiden husks after progressing far enough into the game.',
  },
  {
    itemName: "Shabriri's Woe",
    locationNames: [],
    summary: "Received as an item from the questgiver Shabriri (the eyeball NPC) somewhere in Limgrave or Liurnia, not tied to a fixed dungeon.",
  },
  {
    itemName: "Daedicar's Woe",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Sacrificial Twig',
    locationNames: ['Church of Elleh'],
    summary: 'Found near the Church of Elleh in Limgrave, very early in the game.',
  },
  {
    itemName: 'Entwining Umbilical Cord',
    locationNames: [],
    summary: 'Not obtainable through normal play in the shipped game — no in-world location exists for it.',
  },

  // ---- HP, FP, Stamina, and Equip Load talismans ----
  {
    itemName: 'Crimson Amber Medallion',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Crimson Amber Medallion +1',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Crimson Amber Medallion +2',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Crimson Amber Medallion +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Crimson Seed Talisman',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Crimson Seed Talisman +1',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Blessed Dew Talisman',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Cerulean Amber Medallion',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Cerulean Amber Medallion +1',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Cerulean Amber Medallion +2',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Cerulean Amber Medallion +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Cerulean Seed Talisman',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Cerulean Seed Talisman +1',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Blessed Blue Dew Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Talisman of Lord's Bestowal",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Viridian Amber Medallion',
    locationNames: [],
    summary: 'Found in the Limgrave region.',
  },
  {
    itemName: 'Viridian Amber Medallion +1',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Viridian Amber Medallion +2',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Viridian Amber Medallion +3',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Green Turtle Talisman',
    locationNames: ['Siofra River Well'],
    summary: 'Found down in the Siofra River area, reached via the Siofra River Well.',
  },
  {
    itemName: 'Two-Headed Turtle Talisman',
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: 'Arsenal Charm',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Arsenal Charm +1',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: "Great-Jar's Arsenal",
    locationNames: [],
    summary: "Reward from Great Jar's quest content in the late game.",
  },

  // ---- Multi-stat seals ----
  {
    itemName: "Erdtree's Favor",
    locationNames: ['Church of Elleh'],
    summary: 'Found in the Weeping Peninsula, or an equivalent copy near the Church of Elleh in Limgrave.',
  },
  {
    itemName: "Erdtree's Favor +1",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Erdtree's Favor +2",
    locationNames: [],
    summary: 'Shadow of the Erdtree content, found in the Land of Shadow — not covered by this map yet.',
  },
  {
    itemName: "Radagon's Scarseal",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Radagon's Soreseal",
    locationNames: ['Fort Faroth'],
    summary: 'Found in a hidden room in Fort Faroth, Caelid, reached by destroying a cracked section of wall.',
  },
  {
    itemName: "Marika's Scarseal",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Marika's Soreseal",
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },

  // ---- Heirloom talismans ----
  {
    itemName: 'Starscourge Heirloom',
    locationNames: [],
    summary: 'Reward for defeating Starscourge Radahn.',
  },
  {
    itemName: 'Prosthesis-Wearer Heirloom',
    locationNames: [],
    summary: "Reward tied to Millicent's questline.",
  },
  {
    itemName: 'Stargazer Heirloom',
    locationNames: ['Caria Manor'],
    summary: 'Reward tied to progressing early Liurnia/Caria Manor content.',
  },
  {
    itemName: 'Two Fingers Heirloom',
    locationNames: [],
    summary: 'Reward tied to the Two Fingers/Roundtable Hold storyline.',
  },
  {
    itemName: 'Outer God Heirloom',
    locationNames: [],
    summary: 'Reward tied to late-game Outer God/Frenzied Flame-adjacent content.',
  },
];
