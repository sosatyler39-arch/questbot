import type { ItemLocationEntry } from '../../types.js';

// Ashes of War locations. Authored from general game knowledge, original
// phrasing, never scraped — same policy as talismans-locations.ts.
// Several Ashes of War are purchasable from Smithing Master Hewg at the
// Roundtable Hold once unlocked elsewhere — the Hold itself isn't a point
// on this open-world map, so those get an honest diffuse summary rather
// than a fabricated pin. locationNames only ever reference real
// MapLocation.name values (base game only).
export const ASH_OF_WAR_LOCATIONS: ItemLocationEntry[] = [
  // ---- Heavy affinity ----
  {
    itemName: "Troll's Roar",
    locationNames: [],
    summary: 'Dropped by Trolls, common enemies found in several open-world regions such as Liurnia and the Mountaintops of the Giants.',
  },
  {
    itemName: 'Endure',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Ground Slam',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Earthshaker',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: "Hoarah Loux's Earthshaker",
    locationNames: [],
    summary: 'Reward for defeating Hoarah Loux, Warrior in the Leyndell throne room.',
  },
  {
    itemName: 'War Cry',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Barbaric Roar',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: "Braggart's Roar",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Stamp (Upward Cut)',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Stamp (Sweep)',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Wild Strikes',
    locationNames: ['Stormveil Castle'],
    summary: 'Found within Stormveil Castle.',
  },
  {
    itemName: "Lion's Claw",
    locationNames: ['Redmane Castle'],
    summary: "Sold by the Redmane soldiers near Redmane Castle in Caelid during Radahn's Festival.",
  },
  {
    itemName: 'Cragblade',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Kick',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },

  // ---- Keen affinity ----
  {
    itemName: 'Quickstep',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: "Bloodhound's Step",
    locationNames: [],
    summary: 'Dropped by Bloodhound Knight Floh, found in Limgrave.',
  },
  {
    itemName: 'Raptor of the Mists',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Beast's Roar",
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Spinning Slash',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Impaling Thrust',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Piercing Fang',
    locationNames: [],
    summary: "Given by Yura, the Bloody Finger Hunter, after helping him through his questline in Limgrave and Caelid.",
  },
  {
    itemName: 'Repeating Thrust',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Double Slash',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Sword Dance',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Unsheathe',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },

  // ---- Quality affinity ----
  {
    itemName: "Royal Knight's Resolve",
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Storm Blade',
    locationNames: ['Stormveil Castle'],
    summary: 'Found within Stormveil Castle.',
  },
  {
    itemName: 'Storm Assault',
    locationNames: ['Stormveil Castle'],
    summary: 'Found within Stormveil Castle.',
  },
  {
    itemName: 'Stormcaller',
    locationNames: ['Stormveil Castle'],
    summary: 'Found within Stormveil Castle.',
  },
  {
    itemName: 'Storm Stomp',
    locationNames: ['Stormveil Castle'],
    summary: 'Found within Stormveil Castle.',
  },
  {
    itemName: 'Vacuum Slice',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Phantom Slash',
    locationNames: [],
    summary: "Dropped by the Night's Cavalry, a rare mounted enemy that appears at night in several regions.",
  },
  {
    itemName: 'Determination',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Square Off',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Charge Forth',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Spinning Strikes',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Giant Hunt',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },

  // ---- Magic affinity ----
  {
    itemName: 'Glintstone Pebble',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Glintblade Phalanx',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Carian Greatsword',
    locationNames: ['Caria Manor'],
    summary: 'Found in or around Caria Manor.',
  },
  {
    itemName: 'Carian Grandeur',
    locationNames: [],
    summary: "Reward for defeating Alecto, Black Knife Ringleader, in the underground Ainsel River area.",
  },
  {
    itemName: 'Spinning Weapon',
    locationNames: ['Caria Manor'],
    summary: 'Found in or around Caria Manor.',
  },
  {
    itemName: "Loretta's Slash",
    locationNames: ['Caria Manor'],
    summary: 'Reward for defeating Royal Knight Loretta at Caria Manor.',
  },
  {
    itemName: 'Gravitas',
    locationNames: [],
    summary: 'Found in the underground Nokron, Eternal City area.',
  },
  {
    itemName: 'Waves of Darkness',
    locationNames: [],
    summary: 'Found in the underground Deeproot Depths area.',
  },
  {
    itemName: "Thops's Barrier",
    locationNames: [],
    summary: "Given by Thops, an early sorcerer NPC encountered in Liurnia of the Lakes.",
  },
  {
    itemName: 'Carian Retaliation',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },

  // ---- Fire affinity ----
  {
    itemName: 'Eruption',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir region.',
  },
  {
    itemName: 'Flaming Strike',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Flame of the Redmanes',
    locationNames: ['Redmane Castle'],
    summary: "Sold by the Redmane soldiers near Redmane Castle in Caelid during Radahn's Festival.",
  },

  // ---- Flame Art affinity ----
  {
    itemName: "Prelate's Charge",
    locationNames: [],
    summary: 'Dropped by Fire Prelates, enemies found in the Mountaintops of the Giants and Volcano Manor.',
  },
  {
    itemName: 'Black Flame Tornado',
    locationNames: ['Volcano Manor'],
    summary: 'Found within Volcano Manor.',
  },

  // ---- Lightning affinity ----
  {
    itemName: 'Thunderbolt',
    locationNames: [],
    summary: 'Found in the underground Siofra River/Nokron area, tied to dragon-cult content.',
  },
  {
    itemName: 'Lightning Slash',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Lightning Ram',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },

  // ---- Sacred affinity ----
  {
    itemName: 'Holy Ground',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Sacred Ring of Light',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Sacred Order',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area, tied to Golden Order fundamentalist knights.',
  },
  {
    itemName: 'Shared Order',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Golden Land',
    locationNames: [],
    summary: 'Found in the Altus Plateau area, near a Minor Erdtree.',
  },
  {
    itemName: 'Golden Slam',
    locationNames: [],
    summary: 'Found near a Minor Erdtree in the Altus Plateau or Weeping Peninsula.',
  },
  {
    itemName: 'Golden Vow',
    locationNames: [],
    summary: 'Found in the Mt. Gelmir/Volcano Manor area, tied to a Golden Order knight enemy.',
  },
  {
    itemName: 'Golden Parry',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Vow of the Indomitable',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Sacred Blade',
    locationNames: [],
    summary: 'Found in the Leyndell, Royal Capital area.',
  },
  {
    itemName: 'Prayerful Strike',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },

  // ---- Poison affinity ----
  {
    itemName: 'Poisonous Mist',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Poison Moth Flight',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },

  // ---- Blood affinity ----
  {
    itemName: 'Blood Blade',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: 'Bloody Slash',
    locationNames: ['Mohgwyn Palace'],
    summary: "Learned from Mohg, Lord of Blood's Blood Oath at Mohgwyn Palace.",
  },
  {
    itemName: 'Blood Tax',
    locationNames: ['Mohgwyn Palace'],
    summary: "Learned from Mohg, Lord of Blood's Blood Oath at Mohgwyn Palace.",
  },
  {
    itemName: 'Seppuku',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },

  // ---- Cold affinity ----
  {
    itemName: 'Chilling Mist',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Hoarfrost Stomp',
    locationNames: [],
    summary: 'Found in the Consecrated Snowfield region.',
  },
  {
    itemName: 'Ice Spear',
    locationNames: ['Caria Manor'],
    summary: "Given by one of Ranni's followers, tied to Caria Manor and Ranni's questline.",
  },

  // ---- Occult affinity ----
  {
    itemName: 'Spectral Lance',
    locationNames: [],
    summary: "Dropped by a headless Mausoleum Knight, found guarding certain minor tombs across the open world.",
  },
  {
    itemName: 'Lifesteal Fist',
    locationNames: [],
    summary: 'Found in the Caelid region.',
  },
  {
    itemName: "White Shadow's Lure",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: "Assassin's Gambit",
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },

  // ---- Standard affinity ----
  {
    itemName: 'Shield Bash',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Shield Crash',
    locationNames: [],
    summary: 'Found in the Weeping Peninsula.',
  },
  {
    itemName: 'Barricade Shield',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'No Skill',
    locationNames: [],
    summary: 'Not an obtainable item — the default skill state for shields and torches with no skill of their own.',
  },
  {
    itemName: 'Mighty Shot',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Through and Through',
    locationNames: [],
    summary: 'Found in the Mountaintops of the Giants region.',
  },
  {
    itemName: 'Barrage',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Sky Shot',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Enchanted Shot',
    locationNames: [],
    summary: 'Found in the Altus Plateau area.',
  },
  {
    itemName: 'Rain of Arrows',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },
  {
    itemName: 'Parry',
    locationNames: [],
    summary: 'Purchasable from Smithing Master Hewg at the Roundtable Hold from the start of the game.',
  },
  {
    itemName: 'Storm Wall',
    locationNames: [],
    summary: 'Found in the Liurnia of the Lakes region.',
  },

  // ---- Duplication items ----
  {
    itemName: 'Lost Ashes of War',
    locationNames: [],
    summary: 'Found scattered throughout the open world, especially in the Altus Plateau and later regions.',
  },
];
