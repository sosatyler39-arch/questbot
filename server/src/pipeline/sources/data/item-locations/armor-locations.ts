import type { ItemLocationEntry } from '../../types.js';

// Base-game and Shadow of the Erdtree armor locations. Authored from general
// game knowledge, original phrasing, never scraped — same policy as
// weapons-locations.ts. armor.ts's source data carries no DLC flag, so DLC
// classification here is based on general knowledge of which sets are
// Shadow of the Erdtree-exclusive (Land of Shadow NPCs/bosses/enemies),
// not on any tag in armor.ts. locationNames only ever reference real
// MapLocation.name values; DLC pieces (Land of Shadow isn't covered by the
// map yet) and pieces without a fixed map location (drops, merchants,
// starting-class gear, cosmetic rewards) use an empty array.
export const ARMOR_LOCATIONS: ItemLocationEntry[] = [
  {
    itemName: "Iron Helmet",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Kaiden Helm",
    locationNames: [],
    summary: "Dropped by Kaiden Sellswords, mercenary enemies found across the Lands Between.",
  },
  {
    itemName: "Drake Knight Helm",
    locationNames: [],
    summary: "Dropped by Draconic Knights encountered across the Lands Between.",
  },
  {
    itemName: "Drake Knight Helm (Altered)",
    locationNames: [],
    summary: "Dropped by Draconic Knights encountered across the Lands Between.",
  },
  {
    itemName: "Scaled Helm",
    locationNames: [],
    summary: "A common scaled armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Perfumer Hood",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Traveler's Hat",
    locationNames: [],
    summary: "A common traveler's outfit found as loot and sold by merchants.",
  },
  {
    itemName: "Alberich's Pointed Hat",
    locationNames: [],
    summary: "A pointed-hood sorcerer's outfit found as loot in the Liurnia region.",
  },
  {
    itemName: "Alberich's Pointed Hat (Altered)",
    locationNames: [],
    summary: "A pointed-hood sorcerer's outfit found as loot in the Liurnia region.",
  },
  {
    itemName: "Spellblade's Pointed Hat",
    locationNames: [],
    summary: "A scholar-mage's outfit found as loot in Liurnia.",
  },
  {
    itemName: "Bull-Goat Helm",
    locationNames: ["Volcano Manor"],
    summary: "Found within Volcano Manor in Mt. Gelmir.",
  },
  {
    itemName: "Iron Kasa",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Guilty Hood",
    locationNames: [],
    summary: "Worn by imprisoned or condemned NPCs.",
  },
  {
    itemName: "Black Wolf Mask",
    locationNames: [],
    summary: "Dropped by masked wolf-themed bandit enemies.",
  },
  {
    itemName: "Black Knife Hood",
    locationNames: ["Black Knife Catacombs"],
    summary: "Dropped by Black Knife Assassins, also found within Black Knife Catacombs in Liurnia.",
  },
  {
    itemName: "Exile Hood",
    locationNames: [],
    summary: "Dropped by Exile Soldiers, common enemies found across the Lands Between.",
  },
  {
    itemName: "Banished Knight Helm",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Banished Knight Helm (Altered)",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Briar Helm",
    locationNames: [],
    summary: "Dropped by a thorn-covered wandering warrior NPC encountered in the overworld.",
  },
  {
    itemName: "Page Hood",
    locationNames: [],
    summary: "Worn by page-type NPCs found at the Roundtable Hold.",
  },
  {
    itemName: "Night's Cavalry Helm",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Night's Cavalry Helm (Altered)",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Blue Silver Mail Hood",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers loyal to the Golden Order.",
  },
  {
    itemName: "Nomadic Merchant's Chapeau",
    locationNames: [],
    summary: "Sold by or associated with Nomadic Merchants found along the roads of the Lands Between.",
  },
  {
    itemName: "Malformed Dragon Helm",
    locationNames: [],
    summary: "Dropped by Malformed Dragon-type enemies encountered in Caelid and Farum Azula.",
  },
  {
    itemName: "Tree Sentinel Helm",
    locationNames: [],
    summary: "Dropped by Tree Sentinel-aligned knight enemies.",
  },
  {
    itemName: "Royal Knight Helm",
    locationNames: [],
    summary: "Dropped by Royal Knights encountered across the Lands Between.",
  },
  {
    itemName: "Nox Monk Hood",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Nox Monk Hood (Altered)",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Nox Swordstress Crown",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Dropped by Nox Swordstresses found within Nokstella, Eternal City.",
  },
  {
    itemName: "Night Maiden Twin Crown",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Worn by Night Maiden attendants found within Nokstella, Eternal City.",
  },
  {
    itemName: "Nox Swordstress Crown (Altered)",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Dropped by Nox Swordstresses found within Nokstella, Eternal City.",
  },
  {
    itemName: "Great Horned Headband",
    locationNames: [],
    summary: "A horned headpiece found as loot.",
  },
  {
    itemName: "Shining Horned Headband",
    locationNames: [],
    summary: "A horned headpiece found as loot.",
  },
  {
    itemName: "Duelist Helm",
    locationNames: [],
    summary: "Associated with Colosseum duelist-type fighters.",
  },
  {
    itemName: "Sanguine Noble Hood",
    locationNames: ["Mohgwyn Palace"],
    summary: "Worn by blood-aligned nobles found near Mohgwyn Palace.",
  },
  {
    itemName: "Guardian Mask",
    locationNames: [],
    summary: "Dropped by Guardian-type enemies found in the Siofra River and beyond.",
  },
  {
    itemName: "Cleanrot Helm",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Cleanrot Helm (Altered)",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Fire Monk Hood",
    locationNames: [],
    summary: "Dropped by fire monk enemies found in Liurnia and the Altus Plateau.",
  },
  {
    itemName: "Blackflame Monk Hood",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Blackflame Monks, fire monk enemies encountered around Volcano Manor and the Altus Plateau.",
  },
  {
    itemName: "Fire Prelate Helm",
    locationNames: [],
    summary: "Dropped by Fire Prelates, large fire-wielding enemies encountered at several sites.",
  },
  {
    itemName: "Aristocrat Headband",
    locationNames: [],
    summary: "Dropped by aristocrat-type enemies found in and around Leyndell, Royal Capital.",
  },
  {
    itemName: "Aristocrat Hat",
    locationNames: [],
    summary: "Dropped by aristocrat-type enemies found in and around Leyndell, Royal Capital.",
  },
  {
    itemName: "Old Aristocrat Cowl",
    locationNames: [],
    summary: "Dropped by aged aristocrat-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Vulgar Militia Helm",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Vulgar Militia enemies found around Volcano Manor.",
  },
  {
    itemName: "Sage Hood",
    locationNames: [],
    summary: "A hooded scholar's outfit found as loot.",
  },
  {
    itemName: "Pumpkin Helm",
    locationNames: [],
    summary: "A cosmetic pumpkin-shaped helm found as loot.",
  },
  {
    itemName: "Elden Lord Crown",
    locationNames: [],
    summary: "Reward armor associated with achieving the Elden Lord ending.",
  },
  {
    itemName: "Radahn's Redmane Helm",
    locationNames: ["Redmane Castle"],
    summary: "Remembrance armor forged from defeating Starscourge Radahn at Redmane Castle.",
  },
  {
    itemName: "Queen's Crescent Crown",
    locationNames: [],
    summary: "Associated with a queen-type NPC or boss encountered late in the game.",
  },
  {
    itemName: "Godskin Apostle Hood",
    locationNames: [],
    summary: "Dropped by Godskin Apostles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Godskin Noble Hood",
    locationNames: [],
    summary: "Dropped by Godskin Nobles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Depraved Perfumer Headscarf",
    locationNames: [],
    summary: "Dropped by Depraved Perfumers, aggressive enemy variants of the Perfumer type.",
  },
  {
    itemName: "Crucible Axe Helm",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by the Crucible Knight Ordovis variant found near Volcano Manor.",
  },
  {
    itemName: "Crucible Tree Helm",
    locationNames: [],
    summary: "Dropped by a Crucible Knight Duelist variant encountered in the Altus Plateau region.",
  },
  {
    itemName: "Lusat's Glintstone Crown",
    locationNames: ["Sealed Tunnel"],
    summary: "Dropped by Primeval Sorcerer Lusat, found deep within the Sealed Tunnel in the Altus Plateau.",
  },
  {
    itemName: "Azur's Glintstone Crown",
    locationNames: ["Hermit Village"],
    summary: "Dropped by Primeval Sorcerer Azur, found near Hermit Village in Mt. Gelmir.",
  },
  {
    itemName: "All-Knowing Helm",
    locationNames: [],
    summary: "Worn by an imprisoned scholarly NPC; part of the All-Knowing set found as loot.",
  },
  {
    itemName: "Twinned Helm",
    locationNames: [],
    summary: "Worn by Twin Maiden Husks-adjacent scholar NPCs.",
  },
  {
    itemName: "Prophet Blindfold",
    locationNames: [],
    summary: "Starting armor for the Prophet class.",
  },
  {
    itemName: "Astrologer Hood",
    locationNames: [],
    summary: "Starting armor for the Astrologer class.",
  },
  {
    itemName: "Lionel's Helm",
    locationNames: [],
    summary: "Dropped by Lionel, an invading NPC knight encountered as a duel-type invasion.",
  },
  {
    itemName: "Hoslow's Helm",
    locationNames: [],
    summary: "Dropped by Hoslow, Knight of Blood, an invading NPC boss.",
  },
  {
    itemName: "Diallos's Mask",
    locationNames: [],
    summary: "Associated with the NPC merchant Diallos.",
  },
  {
    itemName: "Vagabond Knight Helm",
    locationNames: [],
    summary: "Starting armor for the Vagabond class.",
  },
  {
    itemName: "Blue Cloth Cowl",
    locationNames: [],
    summary: "A common traveler's outfit found as loot.",
  },
  {
    itemName: "White Mask",
    locationNames: [],
    summary: "A cosmetic mask found as loot.",
  },
  {
    itemName: "Royal Remains Helm",
    locationNames: [],
    summary: "Dropped by Royal Remains-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Beast Champion Helm",
    locationNames: [],
    summary: "Dropped by beast-champion enemies encountered in the Mt. Gelmir region.",
  },
  {
    itemName: "Champion Headband",
    locationNames: [],
    summary: "Associated with the Colosseum arenas' champion fighters.",
  },
  {
    itemName: "Crimson Hood",
    locationNames: [],
    summary: "Found as loot, associated with red-cloaked wandering NPCs.",
  },
  {
    itemName: "Navy Hood",
    locationNames: [],
    summary: "A common dyed hood found as loot.",
  },
  {
    itemName: "Maliketh's Helm",
    locationNames: [],
    summary: "Remembrance armor forged from defeating Maliketh, the Black Blade, in Crumbling Farum Azula.",
  },
  {
    itemName: "Malenia's Winged Helm",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Remembrance armor forged from defeating Malenia, Blade of Miquella, within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Veteran's Helm",
    locationNames: [],
    summary: "Dropped by veteran soldier-type enemies found across the Lands Between.",
  },
  {
    itemName: "Bloodhound Knight Helm",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Bloodhound Knight Darriwil in Stormveil Castle.",
  },
  {
    itemName: "Festive Hood",
    locationNames: [],
    summary: "A festival costume found as loot.",
  },
  {
    itemName: "Festive Hood (Altered)",
    locationNames: [],
    summary: "A festival costume found as loot.",
  },
  {
    itemName: "Blue Festive Hood",
    locationNames: [],
    summary: "A festival costume variant found as loot.",
  },
  {
    itemName: "Commoner's Headband",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Commoner's Headband (Altered)",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Envoy Crown",
    locationNames: ["Leyndell Catacombs"],
    summary: "Found within Leyndell Catacombs beneath the Royal Capital, alongside the Envoy's Horn weapons.",
  },
  {
    itemName: "Twinsage Glintstone Crown",
    locationNames: [],
    summary: "A glintstone sorcerer's crown found as loot.",
  },
  {
    itemName: "Olivinus Glintstone Crown",
    locationNames: [],
    summary: "A glintstone sorcerer's crown found as loot.",
  },
  {
    itemName: "Lazuli Glintstone Crown",
    locationNames: [],
    summary: "A blue-glintstone sorcerer's crown found as loot in Liurnia.",
  },
  {
    itemName: "Karolos Glintstone Crown",
    locationNames: [],
    summary: "A glintstone sorcerer's crown found as loot.",
  },
  {
    itemName: "Witch's Glintstone Crown",
    locationNames: [],
    summary: "A glintstone sorcerer's crown found as loot.",
  },
  {
    itemName: "Marionette Soldier Helm",
    locationNames: [],
    summary: "Dropped by Marionette Soldiers, puppet-type enemies encountered at several sites.",
  },
  {
    itemName: "Marionette Soldier Birdhelm",
    locationNames: [],
    summary: "Dropped by Marionette Soldiers, puppet-type enemies encountered at several sites.",
  },
  {
    itemName: "Raging Wolf Helm",
    locationNames: [],
    summary: "Worn by wolf-warrior-type enemies encountered across the Lands Between.",
  },
  {
    itemName: "Land of Reeds Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Okina Mask",
    locationNames: [],
    summary: "Dropped by Bloody Finger Okina, an invading NPC encountered in Limgrave and Mt. Gelmir.",
  },
  {
    itemName: "Confessor Hood",
    locationNames: [],
    summary: "Starting armor for the Confessor class.",
  },
  {
    itemName: "Confessor Hood (Altered)",
    locationNames: [],
    summary: "Starting armor for the Confessor class.",
  },
  {
    itemName: "Prisoner Iron Mask",
    locationNames: [],
    summary: "Starting armor for the Prisoner class.",
  },
  {
    itemName: "Blackguard's Iron Mask",
    locationNames: [],
    summary: "Dropped by a Bloody Finger-aligned invader NPC.",
  },
  {
    itemName: "Traveling Maiden Hood",
    locationNames: [],
    summary: "Worn by Traveling Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Finger Maiden Fillet",
    locationNames: [],
    summary: "Worn by Finger Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Preceptor's Big Hat",
    locationNames: [],
    summary: "Worn by a Preceptor-type scholarly NPC.",
  },
  {
    itemName: "Mask of Confidence",
    locationNames: [],
    summary: "A cosmetic disguise mask found as loot.",
  },
  {
    itemName: "Skeletal Mask",
    locationNames: [],
    summary: "A bone-themed cosmetic mask found as loot.",
  },
  {
    itemName: "Eccentric's Hood",
    locationNames: [],
    summary: "Worn by an eccentric wandering NPC encountered in the overworld.",
  },
  {
    itemName: "Eccentric's Hood (Altered)",
    locationNames: [],
    summary: "Worn by an eccentric wandering NPC encountered in the overworld.",
  },
  {
    itemName: "Fingerprint Helm",
    locationNames: ["Volcano Manor"],
    summary: "Associated with the Fingerprint Grape Louis and other Volcano Manor operatives.",
  },
  {
    itemName: "Consort's Mask",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with Radahn, Consort of Miquella, not covered by this map yet.",
  },
  {
    itemName: "Ruler's Mask",
    locationNames: [],
    summary: "Associated with a ruler-type NPC encountered late in the game.",
  },
  {
    itemName: "Marais Mask",
    locationNames: [],
    summary: "Dropped by Marais Executioners, hooded enemies found on the Limgrave coast and in Caelid.",
  },
  {
    itemName: "Bloodsoaked Mask",
    locationNames: [],
    summary: "Dropped by Bloody Finger-aligned invader enemies encountered across the Lands Between.",
  },
  {
    itemName: "Omen Helm",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Dropped by Omen-type enemies, found near Leyndell and the Subterranean Shunning-Grounds.",
  },
  {
    itemName: "Carian Knight Helm",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Hierodas Glintstone Crown",
    locationNames: [],
    summary: "A glintstone sorcerer's crown found as loot.",
  },
  {
    itemName: "Haima Glintstone Crown",
    locationNames: [],
    summary: "A glintstone sorcerer's crown found as loot.",
  },
  {
    itemName: "Snow Witch Hat",
    locationNames: [],
    summary: "Found in the Consecrated Snowfield region, tied to frost witch enemies.",
  },
  {
    itemName: "Juvenile Scholar Cap",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Worn by juvenile scholar NPCs of Raya Lucaria Academy.",
  },
  {
    itemName: "Radiant Gold Mask",
    locationNames: [],
    summary: "A gilded cosmetic mask found as loot.",
  },
  {
    itemName: "Albinauric Mask",
    locationNames: ["Village of the Albinaurics"],
    summary: "Found around the Village of the Albinaurics in Liurnia.",
  },
  {
    itemName: "Zamor Mask",
    locationNames: ["Zamor Ruins"],
    summary: "Found around Zamor Ruins in the Mountaintops of the Giants.",
  },
  {
    itemName: "Imp Head (Cat)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Imp Head (Fanged)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Imp Head (Long-Tongued)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Imp Head (Corpse)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Imp Head (Wolf)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Imp Head (Elder)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Silver Tear Mask",
    locationNames: [],
    summary: "A cosmetic mask found as loot.",
  },
  {
    itemName: "Chain Coif",
    locationNames: [],
    summary: "A common light chain armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Greathelm",
    locationNames: [],
    summary: "A common heavy helm found as loot and sold by merchants.",
  },
  {
    itemName: "Octopus Head",
    locationNames: [],
    summary: "A cosmetic octopus-themed helm found as loot.",
  },
  {
    itemName: "Jar",
    locationNames: [],
    summary: "A jar-shaped cosmetic helm tied to the Iron Virgin enemy type.",
  },
  {
    itemName: "Mushroom Head",
    locationNames: [],
    summary: "A cosmetic mushroom costume found as loot.",
  },
  {
    itemName: "Nox Mirrorhelm",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Iji's Mirrorhelm",
    locationNames: ["Hermit Village"],
    summary: "Associated with Iji, the smith NPC found at Hermit Village in Mt. Gelmir.",
  },
  {
    itemName: "Black Hood",
    locationNames: [],
    summary: "A common stealth-oriented hood found as loot.",
  },
  {
    itemName: "Bandit Mask",
    locationNames: [],
    summary: "Starting armor for the Bandit class.",
  },
  {
    itemName: "Knight Helm",
    locationNames: [],
    summary: "Dropped by knight-type enemies found across the Lands Between.",
  },
  {
    itemName: "Greathood",
    locationNames: [],
    summary: "A common hood found as loot.",
  },
  {
    itemName: "Godrick Soldier Helm",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick's foot soldiers within Stormveil Castle.",
  },
  {
    itemName: "Raya Lucarian Helm",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Dropped by scholars and soldiers within Raya Lucaria Academy.",
  },
  {
    itemName: "Leyndell Soldier Helm",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers encountered in the Royal Capital region.",
  },
  {
    itemName: "Radahn Soldier Helm",
    locationNames: ["Redmane Castle"],
    summary: "Dropped by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Haligtree Helm",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Gelmir Knight Helm",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Gelmir Knights encountered around Mt. Gelmir and Volcano Manor.",
  },
  {
    itemName: "Godrick Knight Helm",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick Knights within Stormveil Castle.",
  },
  {
    itemName: "Cuckoo Knight Helm",
    locationNames: [],
    summary: "Dropped by Cuckoo Knights, encountered around Liurnia's Raya Lucaria area.",
  },
  {
    itemName: "Leyndell Knight Helm",
    locationNames: [],
    summary: "Dropped by Leyndell Knights encountered in the Royal Capital region.",
  },
  {
    itemName: "Redmane Knight Helm",
    locationNames: ["Redmane Castle"],
    summary: "Worn by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Haligtree Knight Helm",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Haligtree Knights within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Foot Soldier Cap",
    locationNames: [],
    summary: "A common set worn by rank-and-file foot soldiers across the Lands Between.",
  },
  {
    itemName: "Foot Soldier Helmet",
    locationNames: [],
    summary: "A common set worn by rank-and-file foot soldiers across the Lands Between.",
  },
  {
    itemName: "Gilded Foot Soldier Cap",
    locationNames: [],
    summary: "A gilded variant of the Foot Soldier set found as loot.",
  },
  {
    itemName: "Foot Soldier Helm",
    locationNames: [],
    summary: "A common set worn by rank-and-file foot soldiers across the Lands Between.",
  },
  {
    itemName: "Sacred Crown Helm",
    locationNames: [],
    summary: "A ceremonial crown associated with the Golden Order faithful.",
  },
  {
    itemName: "Omensmirk Mask",
    locationNames: [],
    summary: "A grinning cosmetic mask found as loot.",
  },
  {
    itemName: "Ash-of-War Scarab",
    locationNames: [],
    summary: "A cosmetic reward scarab, not tied to a specific overworld location.",
  },
  {
    itemName: "Incantation Scarab",
    locationNames: [],
    summary: "A cosmetic reward scarab, not tied to a specific overworld location.",
  },
  {
    itemName: "Glintstone Scarab",
    locationNames: [],
    summary: "A cosmetic reward scarab, not tied to a specific overworld location.",
  },
  {
    itemName: "Crimson Tear Scarab",
    locationNames: [],
    summary: "Reward from Boc the Seamster's tailoring questline, based at the Roundtable Hold.",
  },
  {
    itemName: "Cerulean Tear Scarab",
    locationNames: [],
    summary: "Reward from Boc the Seamster's tailoring questline, based at the Roundtable Hold.",
  },
  {
    itemName: "Fia's Hood",
    locationNames: [],
    summary: "Obtained from Fia, the Deathbed Companion, as part of her questline at the Roundtable Hold.",
  },
  {
    itemName: "Highwayman Hood",
    locationNames: [],
    summary: "Dropped by highwayman-type bandit enemies.",
  },
  {
    itemName: "High Page Hood",
    locationNames: [],
    summary: "Worn by a page-type NPC found at the Roundtable Hold.",
  },
  {
    itemName: "Rotten Duelist Helm",
    locationNames: [],
    summary: "Dropped by a rot-aligned duelist enemy near the Lake of Rot.",
  },
  {
    itemName: "Mushroom Crown",
    locationNames: [],
    summary: "A cosmetic mushroom costume found as loot.",
  },
  {
    itemName: "Black Dumpling",
    locationNames: [],
    summary: "A whimsical cosmetic head item found as loot.",
  },
  {
    itemName: "Dane's Hat",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with the NPC Dane in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gaius's Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by Commander Gaius in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Oathseeker Knight Helm",
    locationNames: [],
    summary: "Dropped by Oathseeker Knights, armored enemies found across the Lands Between.",
  },
  {
    itemName: "Verdigris Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a rot-aligned knight set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Pelt of Ralva",
    locationNames: [],
    summary: "Dropped by Ralva, a wolf-associated enemy or NPC.",
  },
  {
    itemName: "Fang Helm",
    locationNames: [],
    summary: "A beast-fang-adorned helm found as loot.",
  },
  {
    itemName: "Thiollier's Mask",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Thiollier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "High Priest Hat",
    locationNames: [],
    summary: "Worn by high priest NPCs of the Golden Order.",
  },
  {
    itemName: "Caterpillar Mask",
    locationNames: [],
    summary: "A caterpillar-costume mask found as loot in the Lands Between.",
  },
  {
    itemName: "Dancer's Hood",
    locationNames: [],
    summary: "Worn by a performer-type NPC or enemy encountered in the Lands Between.",
  },
  {
    itemName: "Helm of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Night-aligned helm found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Igon's Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Igon in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Igon's Helm (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Igon in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Wise Man's Mask",
    locationNames: [],
    summary: "A cosmetic mask found as loot.",
  },
  {
    itemName: "Freyja's Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Freyja in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Helm of Solitude",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Solitude-aligned helm found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Black Knight Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Black Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rakshasa Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Rakshasa enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Death Mask Helm",
    locationNames: [],
    summary: "Found as loot, worn by death-aligned enemies.",
  },
  {
    itemName: "Winged Serpent Helm",
    locationNames: [],
    summary: "A cosmetic serpent-winged helm found as loot.",
  },
  {
    itemName: "Salza's Hood",
    locationNames: [],
    summary: "Associated with the sorcerer NPC Salza.",
  },
  {
    itemName: "Leather Headband",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Leather Crown",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Death Knight Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Death Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Curseblade Mask",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Curseblade-type enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer's Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Messmer the Impaler in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer's Helm (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Messmer the Impaler in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gravebird Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Gravebird enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Common Soldier Helm",
    locationNames: [],
    summary: "Dropped by common rank-and-file soldier enemies.",
  },
  {
    itemName: "Horned Warrior Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Horned Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Beast Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with the Divine Beast Dancing Lion fight in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Bird Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with the Divine Beast Dancing Lion fight in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rellana's Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Rellana, Twin Moon Knight, in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Young Lion's Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Young Lion's Guard enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Circlet of Light",
    locationNames: [],
    summary: "A radiant cosmetic circlet found as loot.",
  },
  {
    itemName: "Shadow Militiaman Helm",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Shadow Militiamen in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Beast Head",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with the Divine Beast Dancing Lion fight in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "St. Trina's Blossom",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with St. Trina, found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Crucible Hammer-Helm",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Crucible Knights, found around Volcano Manor and Mt. Gelmir.",
  },
  {
    itemName: "Greatjar",
    locationNames: [],
    summary: "A jar-shaped cosmetic helm found as loot, tied to the Iron Virgin enemy type.",
  },
  {
    itemName: "Imp Head (Lion)",
    locationNames: [],
    summary: "A common cosmetic mask dropped by Imp enemies guarding treasure chests.",
  },
  {
    itemName: "Scale Armor",
    locationNames: [],
    summary: "A common scaled armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Kaiden Armor",
    locationNames: [],
    summary: "Dropped by Kaiden Sellswords, mercenary enemies found across the Lands Between.",
  },
  {
    itemName: "Drake Knight Armor",
    locationNames: [],
    summary: "Dropped by Draconic Knights encountered across the Lands Between.",
  },
  {
    itemName: "Drake Knight Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Draconic Knights encountered across the Lands Between.",
  },
  {
    itemName: "Scaled Armor",
    locationNames: [],
    summary: "A common scaled armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Scaled Armor (Altered)",
    locationNames: [],
    summary: "A common scaled armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Perfumer Robe",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Perfumer Robe (Altered)",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Perfumer's Traveling Garb",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Perfumer's Traveling Garb (Altered)",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Alberich's Robe",
    locationNames: [],
    summary: "A pointed-hood sorcerer's outfit found as loot in the Liurnia region.",
  },
  {
    itemName: "Alberich's Robe (Altered)",
    locationNames: [],
    summary: "A pointed-hood sorcerer's outfit found as loot in the Liurnia region.",
  },
  {
    itemName: "Spellblade's Traveling Attire",
    locationNames: [],
    summary: "A scholar-mage's outfit found as loot in Liurnia.",
  },
  {
    itemName: "Spellblade's Traveling Attire (Altered)",
    locationNames: [],
    summary: "A scholar-mage's outfit found as loot in Liurnia.",
  },
  {
    itemName: "Bull-Goat Armor",
    locationNames: ["Volcano Manor"],
    summary: "Found within Volcano Manor in Mt. Gelmir.",
  },
  {
    itemName: "Ronin's Armor",
    locationNames: [],
    summary: "Dropped by katana-wielding Ronin enemies encountered across the Lands Between.",
  },
  {
    itemName: "Ronin's Armor (Altered)",
    locationNames: [],
    summary: "Dropped by katana-wielding Ronin enemies encountered across the Lands Between.",
  },
  {
    itemName: "Cloth Garb",
    locationNames: [],
    summary: "A common cloth outfit found as loot in the early game.",
  },
  {
    itemName: "Blaidd's Armor",
    locationNames: ["Moonlight Altar"],
    summary: "Obtainable from Blaidd's corpse after Ranni's questline concludes, near the Moonlight Altar.",
  },
  {
    itemName: "Blaidd's Armor (Altered)",
    locationNames: ["Moonlight Altar"],
    summary: "Obtainable from Blaidd's corpse after Ranni's questline concludes, near the Moonlight Altar.",
  },
  {
    itemName: "Black Knife Armor",
    locationNames: ["Black Knife Catacombs"],
    summary: "Dropped by Black Knife Assassins, also found within Black Knife Catacombs in Liurnia.",
  },
  {
    itemName: "Black Knife Armor (Altered)",
    locationNames: ["Black Knife Catacombs"],
    summary: "Dropped by Black Knife Assassins, also found within Black Knife Catacombs in Liurnia.",
  },
  {
    itemName: "Exile Armor",
    locationNames: [],
    summary: "Dropped by Exile Soldiers, common enemies found across the Lands Between.",
  },
  {
    itemName: "Banished Knight Armor",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Banished Knight Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Briar Armor",
    locationNames: [],
    summary: "Dropped by a thorn-covered wandering warrior NPC encountered in the overworld.",
  },
  {
    itemName: "Briar Armor (Altered)",
    locationNames: [],
    summary: "Dropped by a thorn-covered wandering warrior NPC encountered in the overworld.",
  },
  {
    itemName: "Page Garb",
    locationNames: [],
    summary: "Worn by page-type NPCs found at the Roundtable Hold.",
  },
  {
    itemName: "Page Garb (Altered)",
    locationNames: [],
    summary: "Worn by page-type NPCs found at the Roundtable Hold.",
  },
  {
    itemName: "Night's Cavalry Armor",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Night's Cavalry Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Blue Silver Mail Armor",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers loyal to the Golden Order.",
  },
  {
    itemName: "Blue Silver Mail Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers loyal to the Golden Order.",
  },
  {
    itemName: "Nomadic Merchant's Finery",
    locationNames: [],
    summary: "Sold by or associated with Nomadic Merchants found along the roads of the Lands Between.",
  },
  {
    itemName: "Nomadic Merchant's Finery (Altered)",
    locationNames: [],
    summary: "Sold by or associated with Nomadic Merchants found along the roads of the Lands Between.",
  },
  {
    itemName: "Malformed Dragon Armor",
    locationNames: [],
    summary: "Dropped by Malformed Dragon-type enemies encountered in Caelid and Farum Azula.",
  },
  {
    itemName: "Tree Sentinel Armor",
    locationNames: [],
    summary: "Dropped by Tree Sentinel-aligned knight enemies.",
  },
  {
    itemName: "Tree Sentinel Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Tree Sentinel-aligned knight enemies.",
  },
  {
    itemName: "Royal Knight Armor",
    locationNames: [],
    summary: "Dropped by Royal Knights encountered across the Lands Between.",
  },
  {
    itemName: "Royal Knight Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Royal Knights encountered across the Lands Between.",
  },
  {
    itemName: "Nox Monk Armor",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Nox Monk Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Nox Swordstress Armor",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Dropped by Nox Swordstresses found within Nokstella, Eternal City.",
  },
  {
    itemName: "Night Maiden Armor",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Worn by Night Maiden attendants found within Nokstella, Eternal City.",
  },
  {
    itemName: "Nox Swordstress Armor (Altered)",
    locationNames: ["Nokstella, Eternal City"],
    summary: "Dropped by Nox Swordstresses found within Nokstella, Eternal City.",
  },
  {
    itemName: "Fur Raiment",
    locationNames: [],
    summary: "A hide-and-fur outfit worn by tribal or shaman-type enemies.",
  },
  {
    itemName: "Shaman Furs",
    locationNames: [],
    summary: "Worn by shaman-type enemies found in remote village settings.",
  },
  {
    itemName: "Gravekeeper Cloak",
    locationNames: [],
    summary: "Worn by Gravekeepers, catacomb-guarding enemies found across the Lands Between.",
  },
  {
    itemName: "Gravekeeper Cloak (Altered)",
    locationNames: [],
    summary: "Worn by Gravekeepers, catacomb-guarding enemies found across the Lands Between.",
  },
  {
    itemName: "Sanguine Noble Robe",
    locationNames: ["Mohgwyn Palace"],
    summary: "Worn by blood-aligned nobles found near Mohgwyn Palace.",
  },
  {
    itemName: "Guardian Garb (Full Bloom)",
    locationNames: [],
    summary: "A transformed variant of the Guardian Garb; appearance changes after specific late-game events.",
  },
  {
    itemName: "Guardian Garb",
    locationNames: [],
    summary: "Dropped by Guardian-type enemies found in the Siofra River and beyond.",
  },
  {
    itemName: "Cleanrot Armor",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Cleanrot Armor (Altered)",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Fire Monk Armor",
    locationNames: [],
    summary: "Dropped by fire monk enemies found in Liurnia and the Altus Plateau.",
  },
  {
    itemName: "Blackflame Monk Armor",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Blackflame Monks, fire monk enemies encountered around Volcano Manor and the Altus Plateau.",
  },
  {
    itemName: "Fire Prelate Armor",
    locationNames: [],
    summary: "Dropped by Fire Prelates, large fire-wielding enemies encountered at several sites.",
  },
  {
    itemName: "Fire Prelate Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Fire Prelates, large fire-wielding enemies encountered at several sites.",
  },
  {
    itemName: "Aristocrat Garb",
    locationNames: [],
    summary: "Dropped by aristocrat-type enemies found in and around Leyndell, Royal Capital.",
  },
  {
    itemName: "Aristocrat Garb (Altered)",
    locationNames: [],
    summary: "Dropped by aristocrat-type enemies found in and around Leyndell, Royal Capital.",
  },
  {
    itemName: "Aristocrat Coat",
    locationNames: [],
    summary: "Dropped by aristocrat-type enemies found in and around Leyndell, Royal Capital.",
  },
  {
    itemName: "Old Aristocrat Gown",
    locationNames: [],
    summary: "Dropped by aged aristocrat-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Vulgar Militia Armor",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Vulgar Militia enemies found around Volcano Manor.",
  },
  {
    itemName: "Sage Robe",
    locationNames: [],
    summary: "A hooded scholar's outfit found as loot.",
  },
  {
    itemName: "Elden Lord Armor",
    locationNames: [],
    summary: "Reward armor associated with achieving the Elden Lord ending.",
  },
  {
    itemName: "Elden Lord Armor (Altered)",
    locationNames: [],
    summary: "Reward armor associated with achieving the Elden Lord ending.",
  },
  {
    itemName: "Radahn's Lion Armor",
    locationNames: ["Redmane Castle"],
    summary: "Remembrance armor forged from defeating Starscourge Radahn at Redmane Castle.",
  },
  {
    itemName: "Radahn's Lion Armor (Altered)",
    locationNames: ["Redmane Castle"],
    summary: "Remembrance armor forged from defeating Starscourge Radahn at Redmane Castle.",
  },
  {
    itemName: "Lord of Blood's Robe",
    locationNames: ["Mohgwyn Palace"],
    summary: "Associated with Mohg, Lord of Blood, found near Mohgwyn Palace.",
  },
  {
    itemName: "Lord of Blood's Robe (Altered)",
    locationNames: ["Mohgwyn Palace"],
    summary: "Associated with Mohg, Lord of Blood, found near Mohgwyn Palace.",
  },
  {
    itemName: "Queen's Robe",
    locationNames: [],
    summary: "Associated with a queen-type NPC or boss encountered late in the game.",
  },
  {
    itemName: "Godskin Apostle Robe",
    locationNames: [],
    summary: "Dropped by Godskin Apostles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Godskin Noble Robe",
    locationNames: [],
    summary: "Dropped by Godskin Nobles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Depraved Perfumer Robe",
    locationNames: [],
    summary: "Dropped by Depraved Perfumers, aggressive enemy variants of the Perfumer type.",
  },
  {
    itemName: "Depraved Perfumer Robe (Altered)",
    locationNames: [],
    summary: "Dropped by Depraved Perfumers, aggressive enemy variants of the Perfumer type.",
  },
  {
    itemName: "Crucible Axe Armor",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by the Crucible Knight Ordovis variant found near Volcano Manor.",
  },
  {
    itemName: "Crucible Tree Armor",
    locationNames: [],
    summary: "Dropped by a Crucible Knight Duelist variant encountered in the Altus Plateau region.",
  },
  {
    itemName: "Crucible Axe Armor (Altered)",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by the Crucible Knight Ordovis variant found near Volcano Manor.",
  },
  {
    itemName: "Crucible Tree Armor (Altered)",
    locationNames: [],
    summary: "Dropped by a Crucible Knight Duelist variant encountered in the Altus Plateau region.",
  },
  {
    itemName: "Lusat's Robe",
    locationNames: ["Sealed Tunnel"],
    summary: "Dropped by Primeval Sorcerer Lusat, found deep within the Sealed Tunnel in the Altus Plateau.",
  },
  {
    itemName: "Azur's Glintstone Robe",
    locationNames: ["Hermit Village"],
    summary: "Dropped by Primeval Sorcerer Azur, found near Hermit Village in Mt. Gelmir.",
  },
  {
    itemName: "All-Knowing Armor",
    locationNames: [],
    summary: "Worn by an imprisoned scholarly NPC; part of the All-Knowing set found as loot.",
  },
  {
    itemName: "All-Knowing Armor (Altered)",
    locationNames: [],
    summary: "Worn by an imprisoned scholarly NPC; part of the All-Knowing set found as loot.",
  },
  {
    itemName: "Twinned Armor",
    locationNames: [],
    summary: "Worn by Twin Maiden Husks-adjacent scholar NPCs.",
  },
  {
    itemName: "Twinned Armor (Altered)",
    locationNames: [],
    summary: "Worn by Twin Maiden Husks-adjacent scholar NPCs.",
  },
  {
    itemName: "Corhyn's Robe",
    locationNames: ["Erdtree-Gazing Hill"],
    summary: "Obtained from Brother Corhyn, an NPC first met at the Erdtree-Gazing Hill in the Altus Plateau.",
  },
  {
    itemName: "Prophet Robe (Altered)",
    locationNames: [],
    summary: "Starting armor for the Prophet class.",
  },
  {
    itemName: "Prophet Robe",
    locationNames: [],
    summary: "Starting armor for the Prophet class.",
  },
  {
    itemName: "Astrologer Robe",
    locationNames: [],
    summary: "Starting armor for the Astrologer class.",
  },
  {
    itemName: "Astrologer Robe (Altered)",
    locationNames: [],
    summary: "Starting armor for the Astrologer class.",
  },
  {
    itemName: "Lionel's Armor",
    locationNames: [],
    summary: "Dropped by Lionel, an invading NPC knight encountered as a duel-type invasion.",
  },
  {
    itemName: "Lionel's Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Lionel, an invading NPC knight encountered as a duel-type invasion.",
  },
  {
    itemName: "Hoslow's Armor",
    locationNames: [],
    summary: "Dropped by Hoslow, Knight of Blood, an invading NPC boss.",
  },
  {
    itemName: "Hoslow's Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Hoslow, Knight of Blood, an invading NPC boss.",
  },
  {
    itemName: "Vagabond Knight Armor",
    locationNames: [],
    summary: "Starting armor for the Vagabond class.",
  },
  {
    itemName: "Vagabond Knight Armor (Altered)",
    locationNames: [],
    summary: "Starting armor for the Vagabond class.",
  },
  {
    itemName: "Blue Cloth Vest",
    locationNames: [],
    summary: "A common traveler's outfit found as loot.",
  },
  {
    itemName: "War Surgeon Gown",
    locationNames: [],
    summary: "Worn by War Surgeon-type NPCs or enemies.",
  },
  {
    itemName: "War Surgeon Gown (Altered)",
    locationNames: [],
    summary: "Worn by War Surgeon-type NPCs or enemies.",
  },
  {
    itemName: "Royal Remains Armor",
    locationNames: [],
    summary: "Dropped by Royal Remains-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Beast Champion Armor",
    locationNames: [],
    summary: "Dropped by beast-champion enemies encountered in the Mt. Gelmir region.",
  },
  {
    itemName: "Beast Champion Armor (Altered)",
    locationNames: [],
    summary: "Dropped by beast-champion enemies encountered in the Mt. Gelmir region.",
  },
  {
    itemName: "Champion Pauldron",
    locationNames: [],
    summary: "Associated with the Colosseum arenas' champion fighters.",
  },
  {
    itemName: "Noble's Traveling Garb",
    locationNames: [],
    summary: "A noble traveler's outfit found as loot.",
  },
  {
    itemName: "Maliketh's Armor",
    locationNames: [],
    summary: "Remembrance armor forged from defeating Maliketh, the Black Blade, in Crumbling Farum Azula.",
  },
  {
    itemName: "Maliketh's Armor (Altered)",
    locationNames: [],
    summary: "Remembrance armor forged from defeating Maliketh, the Black Blade, in Crumbling Farum Azula.",
  },
  {
    itemName: "Malenia's Armor",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Remembrance armor forged from defeating Malenia, Blade of Miquella, within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Malenia's Armor (Altered)",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Remembrance armor forged from defeating Malenia, Blade of Miquella, within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Veteran's Armor",
    locationNames: [],
    summary: "Dropped by veteran soldier-type enemies found across the Lands Between.",
  },
  {
    itemName: "Veteran's Armor (Altered)",
    locationNames: [],
    summary: "Dropped by veteran soldier-type enemies found across the Lands Between.",
  },
  {
    itemName: "Bloodhound Knight Armor",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Bloodhound Knight Darriwil in Stormveil Castle.",
  },
  {
    itemName: "Bloodhound Knight Armor (Altered)",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Bloodhound Knight Darriwil in Stormveil Castle.",
  },
  {
    itemName: "Festive Garb",
    locationNames: [],
    summary: "A festival costume found as loot.",
  },
  {
    itemName: "Festive Garb (Altered)",
    locationNames: [],
    summary: "A festival costume found as loot.",
  },
  {
    itemName: "Blue Festive Garb",
    locationNames: [],
    summary: "A festival costume variant found as loot.",
  },
  {
    itemName: "Commoner's Garb",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Commoner's Garb (Altered)",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Commoner's Simple Garb",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Commoner's Simple Garb (Altered)",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Raya Lucarian Robe",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Dropped by scholars and soldiers within Raya Lucaria Academy.",
  },
  {
    itemName: "Marionette Soldier Armor",
    locationNames: [],
    summary: "Dropped by Marionette Soldiers, puppet-type enemies encountered at several sites.",
  },
  {
    itemName: "Raging Wolf Armor",
    locationNames: [],
    summary: "Worn by wolf-warrior-type enemies encountered across the Lands Between.",
  },
  {
    itemName: "Raging Wolf Armor (Altered)",
    locationNames: [],
    summary: "Worn by wolf-warrior-type enemies encountered across the Lands Between.",
  },
  {
    itemName: "Land of Reeds Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Land of Reeds Armor (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "White Reed Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Confessor Armor",
    locationNames: [],
    summary: "Starting armor for the Confessor class.",
  },
  {
    itemName: "Confessor Armor (Altered)",
    locationNames: [],
    summary: "Starting armor for the Confessor class.",
  },
  {
    itemName: "Prisoner Clothing",
    locationNames: [],
    summary: "Starting armor for the Prisoner class.",
  },
  {
    itemName: "Traveling Maiden Robe",
    locationNames: [],
    summary: "Worn by Traveling Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Traveling Maiden Robe (Altered)",
    locationNames: [],
    summary: "Worn by Traveling Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Finger Maiden Robe",
    locationNames: [],
    summary: "Worn by Finger Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Finger Maiden Robe (Altered)",
    locationNames: [],
    summary: "Worn by Finger Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Preceptor's Long Gown",
    locationNames: [],
    summary: "Worn by a Preceptor-type scholarly NPC.",
  },
  {
    itemName: "Preceptor's Long Gown (Altered)",
    locationNames: [],
    summary: "Worn by a Preceptor-type scholarly NPC.",
  },
  {
    itemName: "Raptor's Black Feathers",
    locationNames: [],
    summary: "A feathered garment associated with raptor-type enemies in the Mountaintops of the Giants.",
  },
  {
    itemName: "Bandit Garb",
    locationNames: [],
    summary: "Starting armor for the Bandit class.",
  },
  {
    itemName: "Eccentric's Armor",
    locationNames: [],
    summary: "Worn by an eccentric wandering NPC encountered in the overworld.",
  },
  {
    itemName: "Fingerprint Armor",
    locationNames: ["Volcano Manor"],
    summary: "Associated with the Fingerprint Grape Louis and other Volcano Manor operatives.",
  },
  {
    itemName: "Fingerprint Armor (Altered)",
    locationNames: ["Volcano Manor"],
    summary: "Associated with the Fingerprint Grape Louis and other Volcano Manor operatives.",
  },
  {
    itemName: "Consort's Robe",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with Radahn, Consort of Miquella, not covered by this map yet.",
  },
  {
    itemName: "Ruler's Robe",
    locationNames: [],
    summary: "Associated with a ruler-type NPC encountered late in the game.",
  },
  {
    itemName: "Upper-Class Robe",
    locationNames: [],
    summary: "Worn by upper-class capital citizens in Leyndell.",
  },
  {
    itemName: "Marais Robe",
    locationNames: [],
    summary: "Dropped by Marais Executioners, hooded enemies found on the Limgrave coast and in Caelid.",
  },
  {
    itemName: "Official's Attire",
    locationNames: [],
    summary: "Worn by capital officials found in Leyndell.",
  },
  {
    itemName: "Omen Armor",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Dropped by Omen-type enemies, found near Leyndell and the Subterranean Shunning-Grounds.",
  },
  {
    itemName: "Carian Knight Armor",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Carian Knight Armor (Altered)",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Errant Sorcerer Robe",
    locationNames: [],
    summary: "Dropped by Errant Sorcerers, wandering spellcaster enemies.",
  },
  {
    itemName: "Errant Sorcerer Robe (Altered)",
    locationNames: [],
    summary: "Dropped by Errant Sorcerers, wandering spellcaster enemies.",
  },
  {
    itemName: "Battlemage Robe",
    locationNames: [],
    summary: "Dropped by Battlemage-type enemies encountered around Raya Lucaria Academy.",
  },
  {
    itemName: "Snow Witch Robe",
    locationNames: [],
    summary: "Found in the Consecrated Snowfield region, tied to frost witch enemies.",
  },
  {
    itemName: "Snow Witch Robe (Altered)",
    locationNames: [],
    summary: "Found in the Consecrated Snowfield region, tied to frost witch enemies.",
  },
  {
    itemName: "Traveler's Clothes",
    locationNames: [],
    summary: "A common traveler's outfit found as loot and sold by merchants.",
  },
  {
    itemName: "Juvenile Scholar Robe",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Worn by juvenile scholar NPCs of Raya Lucaria Academy.",
  },
  {
    itemName: "Goldmask's Rags",
    locationNames: [],
    summary: "Associated with Goldmask, the NPC scholar of the Golden Order.",
  },
  {
    itemName: "Fell Omen Cloak",
    locationNames: [],
    summary: "Associated with Fell Omen-type enemies, the Omen King's kin.",
  },
  {
    itemName: "Dirty Chainmail",
    locationNames: [],
    summary: "A worn, dirty chainmail set found as loot.",
  },
  {
    itemName: "Zamor Armor",
    locationNames: ["Zamor Ruins"],
    summary: "Found around Zamor Ruins in the Mountaintops of the Giants.",
  },
  {
    itemName: "Chain Armor",
    locationNames: [],
    summary: "A common light chain armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Eye Surcoat",
    locationNames: [],
    summary: "Worn by cult-aligned enemies bearing an eye emblem.",
  },
  {
    itemName: "Tree Surcoat",
    locationNames: [],
    summary: "Worn by Erdtree-faithful soldiers.",
  },
  {
    itemName: "Mushroom Body",
    locationNames: [],
    summary: "A cosmetic mushroom costume found as loot.",
  },
  {
    itemName: "Leather Armor",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Knight Armor",
    locationNames: [],
    summary: "Dropped by knight-type enemies found across the Lands Between.",
  },
  {
    itemName: "Tree-and-Beast Surcoat",
    locationNames: [],
    summary: "Worn by soldiers bearing a tree-and-beast emblem.",
  },
  {
    itemName: "Cuckoo Surcoat",
    locationNames: [],
    summary: "Dropped by Cuckoo Knights, encountered around Liurnia's Raya Lucaria area.",
  },
  {
    itemName: "Erdtree Surcoat",
    locationNames: [],
    summary: "Worn by Erdtree-faithful soldiers found around Leyndell.",
  },
  {
    itemName: "Redmane Surcoat",
    locationNames: ["Redmane Castle"],
    summary: "Worn by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Mausoleum Surcoat",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Haligtree Crest Surcoat",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Gelmir Knight Armor",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Gelmir Knights encountered around Mt. Gelmir and Volcano Manor.",
  },
  {
    itemName: "Gelmir Knight Armor (Altered)",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Gelmir Knights encountered around Mt. Gelmir and Volcano Manor.",
  },
  {
    itemName: "Godrick Knight Armor",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick Knights within Stormveil Castle.",
  },
  {
    itemName: "Godrick Knight Armor (Altered)",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick Knights within Stormveil Castle.",
  },
  {
    itemName: "Cuckoo Knight Armor",
    locationNames: [],
    summary: "Dropped by Cuckoo Knights, encountered around Liurnia's Raya Lucaria area.",
  },
  {
    itemName: "Cuckoo Knight Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Cuckoo Knights, encountered around Liurnia's Raya Lucaria area.",
  },
  {
    itemName: "Leyndell Knight Armor",
    locationNames: [],
    summary: "Dropped by Leyndell Knights encountered in the Royal Capital region.",
  },
  {
    itemName: "Leyndell Knight Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Leyndell Knights encountered in the Royal Capital region.",
  },
  {
    itemName: "Redmane Knight Armor",
    locationNames: ["Redmane Castle"],
    summary: "Worn by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Redmane Knight Armor (Altered)",
    locationNames: ["Redmane Castle"],
    summary: "Worn by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Mausoleum Knight Armor",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Mausoleum Knight Armor (Altered)",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Haligtree Knight Armor",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Haligtree Knights within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Haligtree Knight Armor (Altered)",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Haligtree Knights within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Chain-Draped Tabard",
    locationNames: [],
    summary: "Found as loot, worn by common soldier-type enemies.",
  },
  {
    itemName: "Foot Soldier Tabard",
    locationNames: [],
    summary: "A common set worn by rank-and-file foot soldiers across the Lands Between.",
  },
  {
    itemName: "Leather-Draped Tabard",
    locationNames: [],
    summary: "Worn by soldier-type enemies found across the Lands Between.",
  },
  {
    itemName: "Scarlet Tabard",
    locationNames: [],
    summary: "Worn by blood-aligned soldier enemies.",
  },
  {
    itemName: "Bloodsoaked Tabard",
    locationNames: [],
    summary: "Dropped by Bloody Finger-aligned invader enemies encountered across the Lands Between.",
  },
  {
    itemName: "Ivory-Draped Tabard",
    locationNames: [],
    summary: "Worn by soldier-type enemies found in Leyndell.",
  },
  {
    itemName: "Omenkiller Robe",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by the Omenkiller boss, fought near Dominula, Windmill Village.",
  },
  {
    itemName: "Deathbed Dress",
    locationNames: [],
    summary: "Associated with the Deathbed Dream questline tied to Fia.",
  },
  {
    itemName: "Fia's Robe",
    locationNames: [],
    summary: "Obtained from Fia, the Deathbed Companion, as part of her questline at the Roundtable Hold.",
  },
  {
    itemName: "Fia's Robe (Altered)",
    locationNames: [],
    summary: "Obtained from Fia, the Deathbed Companion, as part of her questline at the Roundtable Hold.",
  },
  {
    itemName: "Highwayman Cloth Armor",
    locationNames: [],
    summary: "Dropped by highwayman-type bandit enemies.",
  },
  {
    itemName: "High Page Clothes",
    locationNames: [],
    summary: "Worn by a page-type NPC found at the Roundtable Hold.",
  },
  {
    itemName: "High Page Clothes (Altered)",
    locationNames: [],
    summary: "Worn by a page-type NPC found at the Roundtable Hold.",
  },
  {
    itemName: "Rotten Gravekeeper Cloak",
    locationNames: [],
    summary: "Dropped by a rot-aligned Gravekeeper enemy near the Lake of Rot.",
  },
  {
    itemName: "Rotten Gravekeeper Cloak (Altered)",
    locationNames: [],
    summary: "Dropped by a rot-aligned Gravekeeper enemy near the Lake of Rot.",
  },
  {
    itemName: "Lazuli Robe",
    locationNames: [],
    summary: "A blue-glintstone sorcerer's outfit found as loot in Liurnia.",
  },
  {
    itemName: "Dryleaf Robe",
    locationNames: ["Warmaster's Shack"],
    summary: "Associated with Dryleaf Dane, the swordsman NPC found at the Warmaster's Shack in Limgrave.",
  },
  {
    itemName: "Dryleaf Robe (Altered)",
    locationNames: ["Warmaster's Shack"],
    summary: "Associated with Dryleaf Dane, the swordsman NPC found at the Warmaster's Shack in Limgrave.",
  },
  {
    itemName: "Gaius's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by Commander Gaius in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Leda's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Leda in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Oathseeker Knight Armor",
    locationNames: [],
    summary: "Dropped by Oathseeker Knights, armored enemies found across the Lands Between.",
  },
  {
    itemName: "Verdigris Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a rot-aligned knight set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Iron Rivet Armor",
    locationNames: [],
    summary: "A riveted iron armor set found as loot.",
  },
  {
    itemName: "Thiollier's Garb",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Thiollier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Thiollier's Garb (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Thiollier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "High Priest Robe",
    locationNames: [],
    summary: "Worn by high priest NPCs of the Golden Order.",
  },
  {
    itemName: "Finger Robe",
    locationNames: [],
    summary: "Worn by Fingercreeper-aligned cultist enemies.",
  },
  {
    itemName: "Braided Cord Robe",
    locationNames: [],
    summary: "A simple woven outfit worn by hermit or ascetic NPCs.",
  },
  {
    itemName: "Dancer's Dress",
    locationNames: [],
    summary: "Worn by a performer-type NPC or enemy encountered in the Lands Between.",
  },
  {
    itemName: "Dancer's Dress (Altered)",
    locationNames: [],
    summary: "Worn by a performer-type NPC or enemy encountered in the Lands Between.",
  },
  {
    itemName: "Armor of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Night-aligned armor set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Igon's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Igon in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Igon's Armor (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Igon in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ansbach's Attire",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Ansbach in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ansbach's Attire (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Ansbach in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Freyja's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Freyja in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Freyja's Armor (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Freyja in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Armor of Solitude",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Solitude-aligned armor set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Armor of Solitude (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a Solitude-aligned armor set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier Armor (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Black Knight Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Black Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rakshasa Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Rakshasa enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight Armor (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gloried Attire",
    locationNames: [],
    summary: "A ceremonial outfit found as loot.",
  },
  {
    itemName: "Highland Attire",
    locationNames: [],
    summary: "Found in the Mountaintops of the Giants region.",
  },
  {
    itemName: "Death Knight Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Death Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ascetic's Loincloth",
    locationNames: [],
    summary: "A minimal loincloth-and-wrap set worn by ascetic hermit-type NPCs; found as loot.",
  },
  {
    itemName: "Messmer's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Messmer the Impaler in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gravebird's Blackquill Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Gravebird elite enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gravebird Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Gravebird enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Common Soldier Cloth Armor",
    locationNames: [],
    summary: "Dropped by common rank-and-file soldier enemies.",
  },
  {
    itemName: "Horned Warrior Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Horned Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Beast Warrior Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Divine Beast Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Bird Warrior Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Divine Bird Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rellana's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Rellana, Twin Moon Knight, in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Young Lion's Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Young Lion's Guard enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Young Lion's Armor (Altered)",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Young Lion's Guard enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shadow Militiaman Armor",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Shadow Militiamen in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Iron Gauntlets",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Kaiden Gauntlets",
    locationNames: [],
    summary: "Dropped by Kaiden Sellswords, mercenary enemies found across the Lands Between.",
  },
  {
    itemName: "Drake Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Draconic Knights encountered across the Lands Between.",
  },
  {
    itemName: "Scaled Gauntlets",
    locationNames: [],
    summary: "A common scaled armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Perfumer Gloves",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Traveler's Gloves",
    locationNames: [],
    summary: "A common traveler's outfit found as loot and sold by merchants.",
  },
  {
    itemName: "Alberich's Bracers",
    locationNames: [],
    summary: "A pointed-hood sorcerer's outfit found as loot in the Liurnia region.",
  },
  {
    itemName: "Spellblade's Gloves",
    locationNames: [],
    summary: "A scholar-mage's outfit found as loot in Liurnia.",
  },
  {
    itemName: "Bull-Goat Gauntlets",
    locationNames: ["Volcano Manor"],
    summary: "Found within Volcano Manor in Mt. Gelmir.",
  },
  {
    itemName: "Ronin's Gauntlets",
    locationNames: [],
    summary: "Dropped by katana-wielding Ronin enemies encountered across the Lands Between.",
  },
  {
    itemName: "Blaidd's Gauntlets",
    locationNames: ["Moonlight Altar"],
    summary: "Obtainable from Blaidd's corpse after Ranni's questline concludes, near the Moonlight Altar.",
  },
  {
    itemName: "Black Knife Gauntlets",
    locationNames: ["Black Knife Catacombs"],
    summary: "Dropped by Black Knife Assassins, also found within Black Knife Catacombs in Liurnia.",
  },
  {
    itemName: "Exile Gauntlets",
    locationNames: [],
    summary: "Dropped by Exile Soldiers, common enemies found across the Lands Between.",
  },
  {
    itemName: "Banished Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Briar Gauntlets",
    locationNames: [],
    summary: "Dropped by a thorn-covered wandering warrior NPC encountered in the overworld.",
  },
  {
    itemName: "Night's Cavalry Gauntlets",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Blue Silver Bracelets",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers loyal to the Golden Order.",
  },
  {
    itemName: "Malformed Dragon Gauntlets",
    locationNames: [],
    summary: "Dropped by Malformed Dragon-type enemies encountered in Caelid and Farum Azula.",
  },
  {
    itemName: "Tree Sentinel Gauntlets",
    locationNames: [],
    summary: "Dropped by Tree Sentinel-aligned knight enemies.",
  },
  {
    itemName: "Royal Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Royal Knights encountered across the Lands Between.",
  },
  {
    itemName: "Nox Bracelets",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Guardian Bracers",
    locationNames: [],
    summary: "Dropped by Guardian-type enemies found in the Siofra River and beyond.",
  },
  {
    itemName: "Cleanrot Gauntlets",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Fire Monk Gauntlets",
    locationNames: [],
    summary: "Dropped by fire monk enemies found in Liurnia and the Altus Plateau.",
  },
  {
    itemName: "Blackflame Monk Gauntlets",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Blackflame Monks, fire monk enemies encountered around Volcano Manor and the Altus Plateau.",
  },
  {
    itemName: "Fire Prelate Gauntlets",
    locationNames: [],
    summary: "Dropped by Fire Prelates, large fire-wielding enemies encountered at several sites.",
  },
  {
    itemName: "Vulgar Militia Gauntlets",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Vulgar Militia enemies found around Volcano Manor.",
  },
  {
    itemName: "Elden Lord Bracers",
    locationNames: [],
    summary: "Reward armor associated with achieving the Elden Lord ending.",
  },
  {
    itemName: "Radahn's Gauntlets",
    locationNames: ["Redmane Castle"],
    summary: "Remembrance armor forged from defeating Starscourge Radahn at Redmane Castle.",
  },
  {
    itemName: "Queen's Bracelets",
    locationNames: [],
    summary: "Associated with a queen-type NPC or boss encountered late in the game.",
  },
  {
    itemName: "Godskin Apostle Bracelets",
    locationNames: [],
    summary: "Dropped by Godskin Apostles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Godskin Noble Bracelets",
    locationNames: [],
    summary: "Dropped by Godskin Nobles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Depraved Perfumer Gloves",
    locationNames: [],
    summary: "Dropped by Depraved Perfumers, aggressive enemy variants of the Perfumer type.",
  },
  {
    itemName: "Crucible Gauntlets",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Crucible Knights, found around Volcano Manor and Mt. Gelmir.",
  },
  {
    itemName: "Lusat's Manchettes",
    locationNames: ["Sealed Tunnel"],
    summary: "Dropped by Primeval Sorcerer Lusat, found deep within the Sealed Tunnel in the Altus Plateau.",
  },
  {
    itemName: "Azur's Manchettes",
    locationNames: ["Hermit Village"],
    summary: "Dropped by Primeval Sorcerer Azur, found near Hermit Village in Mt. Gelmir.",
  },
  {
    itemName: "All-Knowing Gauntlets",
    locationNames: [],
    summary: "Worn by an imprisoned scholarly NPC; part of the All-Knowing set found as loot.",
  },
  {
    itemName: "Twinned Gauntlets",
    locationNames: [],
    summary: "Worn by Twin Maiden Husks-adjacent scholar NPCs.",
  },
  {
    itemName: "Astrologer Gloves",
    locationNames: [],
    summary: "Starting armor for the Astrologer class.",
  },
  {
    itemName: "Lionel's Gauntlets",
    locationNames: [],
    summary: "Dropped by Lionel, an invading NPC knight encountered as a duel-type invasion.",
  },
  {
    itemName: "Hoslow's Gauntlets",
    locationNames: [],
    summary: "Dropped by Hoslow, Knight of Blood, an invading NPC boss.",
  },
  {
    itemName: "Vagabond Knight Gauntlets",
    locationNames: [],
    summary: "Starting armor for the Vagabond class.",
  },
  {
    itemName: "Warrior Gauntlets",
    locationNames: [],
    summary: "A common warrior's armor set found as loot.",
  },
  {
    itemName: "War Surgeon Gloves",
    locationNames: [],
    summary: "Worn by War Surgeon-type NPCs or enemies.",
  },
  {
    itemName: "Royal Remains Gauntlets",
    locationNames: [],
    summary: "Dropped by Royal Remains-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Beast Champion Gauntlets",
    locationNames: [],
    summary: "Dropped by beast-champion enemies encountered in the Mt. Gelmir region.",
  },
  {
    itemName: "Champion Bracers",
    locationNames: [],
    summary: "Associated with the Colosseum arenas' champion fighters.",
  },
  {
    itemName: "Noble's Gloves",
    locationNames: [],
    summary: "A noble traveler's outfit found as loot.",
  },
  {
    itemName: "Maliketh's Gauntlets",
    locationNames: [],
    summary: "Remembrance armor forged from defeating Maliketh, the Black Blade, in Crumbling Farum Azula.",
  },
  {
    itemName: "Malenia's Gauntlet",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Remembrance armor forged from defeating Malenia, Blade of Miquella, within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Veteran's Gauntlets",
    locationNames: [],
    summary: "Dropped by veteran soldier-type enemies found across the Lands Between.",
  },
  {
    itemName: "Bloodhound Knight Gauntlets",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Bloodhound Knight Darriwil in Stormveil Castle.",
  },
  {
    itemName: "Sorcerer Manchettes",
    locationNames: [],
    summary: "Worn by sorcerer-type enemies found in Liurnia.",
  },
  {
    itemName: "Raging Wolf Gauntlets",
    locationNames: [],
    summary: "Worn by wolf-warrior-type enemies encountered across the Lands Between.",
  },
  {
    itemName: "Land of Reeds Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "White Reed Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Confessor Gloves",
    locationNames: [],
    summary: "Starting armor for the Confessor class.",
  },
  {
    itemName: "Traveling Maiden Gloves",
    locationNames: [],
    summary: "Worn by Traveling Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Preceptor's Gloves",
    locationNames: [],
    summary: "Worn by a Preceptor-type scholarly NPC.",
  },
  {
    itemName: "Bandit Manchettes",
    locationNames: [],
    summary: "Starting armor for the Bandit class.",
  },
  {
    itemName: "Eccentric's Manchettes",
    locationNames: [],
    summary: "Worn by an eccentric wandering NPC encountered in the overworld.",
  },
  {
    itemName: "Fingerprint Gauntlets",
    locationNames: ["Volcano Manor"],
    summary: "Associated with the Fingerprint Grape Louis and other Volcano Manor operatives.",
  },
  {
    itemName: "Bloodsoaked Manchettes",
    locationNames: [],
    summary: "Dropped by Bloody Finger-aligned invader enemies encountered across the Lands Between.",
  },
  {
    itemName: "Omen Gauntlets",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Dropped by Omen-type enemies, found near Leyndell and the Subterranean Shunning-Grounds.",
  },
  {
    itemName: "Carian Knight Gauntlets",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Errant Sorcerer Manchettes",
    locationNames: [],
    summary: "Dropped by Errant Sorcerers, wandering spellcaster enemies.",
  },
  {
    itemName: "Battlemage Manchettes",
    locationNames: [],
    summary: "Dropped by Battlemage-type enemies encountered around Raya Lucaria Academy.",
  },
  {
    itemName: "Traveler's Manchettes",
    locationNames: [],
    summary: "A common traveler's outfit found as loot and sold by merchants.",
  },
  {
    itemName: "Gold Bracelets",
    locationNames: [],
    summary: "A gilded accessory set found as loot.",
  },
  {
    itemName: "Zamor Bracelets",
    locationNames: ["Zamor Ruins"],
    summary: "Found around Zamor Ruins in the Mountaintops of the Giants.",
  },
  {
    itemName: "Chain Gauntlets",
    locationNames: [],
    summary: "A common light chain armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Mushroom Arms",
    locationNames: [],
    summary: "A cosmetic mushroom costume found as loot.",
  },
  {
    itemName: "Leather Gloves",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by knight-type enemies found across the Lands Between.",
  },
  {
    itemName: "Godrick Soldier Gauntlets",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick's foot soldiers within Stormveil Castle.",
  },
  {
    itemName: "Raya Lucarian Gauntlets",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Dropped by scholars and soldiers within Raya Lucaria Academy.",
  },
  {
    itemName: "Leyndell Soldier Gauntlets",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers encountered in the Royal Capital region.",
  },
  {
    itemName: "Radahn Soldier Gauntlets",
    locationNames: ["Redmane Castle"],
    summary: "Dropped by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Mausoleum Gauntlets",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Haligtree Gauntlets",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Gelmir Knight Gauntlets",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Gelmir Knights encountered around Mt. Gelmir and Volcano Manor.",
  },
  {
    itemName: "Godrick Knight Gauntlets",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick Knights within Stormveil Castle.",
  },
  {
    itemName: "Cuckoo Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Cuckoo Knights, encountered around Liurnia's Raya Lucaria area.",
  },
  {
    itemName: "Leyndell Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Leyndell Knights encountered in the Royal Capital region.",
  },
  {
    itemName: "Redmane Knight Gauntlets",
    locationNames: ["Redmane Castle"],
    summary: "Worn by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Mausoleum Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Haligtree Knight Gauntlets",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Haligtree Knights within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Foot Soldier Gauntlets",
    locationNames: [],
    summary: "A common set worn by rank-and-file foot soldiers across the Lands Between.",
  },
  {
    itemName: "Omenkiller Long Gloves",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by the Omenkiller boss, fought near Dominula, Windmill Village.",
  },
  {
    itemName: "Highwayman Gauntlets",
    locationNames: [],
    summary: "Dropped by highwayman-type bandit enemies.",
  },
  {
    itemName: "Dryleaf Arm Wraps",
    locationNames: ["Warmaster's Shack"],
    summary: "Associated with Dryleaf Dane, the swordsman NPC found at the Warmaster's Shack in Limgrave.",
  },
  {
    itemName: "Gaius's Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by Commander Gaius in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Oathseeker Knight Gauntlets",
    locationNames: [],
    summary: "Dropped by Oathseeker Knights, armored enemies found across the Lands Between.",
  },
  {
    itemName: "Verdigris Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a rot-aligned knight set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Iron Rivet Gauntlets",
    locationNames: [],
    summary: "A riveted iron armor set found as loot.",
  },
  {
    itemName: "Thiollier's Gloves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Thiollier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "High Priest Gloves",
    locationNames: [],
    summary: "Worn by high priest NPCs of the Golden Order.",
  },
  {
    itemName: "Braided Arm Wraps",
    locationNames: [],
    summary: "A simple woven outfit worn by hermit or ascetic NPCs.",
  },
  {
    itemName: "Dancer's Bracer",
    locationNames: [],
    summary: "Worn by a performer-type NPC or enemy encountered in the Lands Between.",
  },
  {
    itemName: "Gauntlets of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — Night-aligned gauntlets found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Igon's Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Igon in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ansbach's Manchettes",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Ansbach in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Freyja's Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Freyja in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gauntlets of Solitude",
    locationNames: [],
    summary: "Shadow of the Erdtree content — Solitude-aligned gauntlets found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Black Knight Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Black Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rakshasa Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Rakshasa enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Leather Arm Wraps",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Death Knight Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Death Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ascetic's Wrist Guards",
    locationNames: [],
    summary: "A minimal loincloth-and-wrap set worn by ascetic hermit-type NPCs; found as loot.",
  },
  {
    itemName: "Messmer's Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Messmer the Impaler in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gravebird Bracelets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Gravebird enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Common Soldier Gauntlets",
    locationNames: [],
    summary: "Dropped by common rank-and-file soldier enemies.",
  },
  {
    itemName: "Horned Warrior Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Horned Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Bird Warrior Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Divine Bird Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rellana's Gloves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Rellana, Twin Moon Knight, in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Young Lion's Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Young Lion's Guard enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shadow Militiaman Gauntlets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Shadow Militiamen in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Leather Trousers",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Kaiden Trousers",
    locationNames: [],
    summary: "Dropped by Kaiden Sellswords, mercenary enemies found across the Lands Between.",
  },
  {
    itemName: "Drake Knight Greaves",
    locationNames: [],
    summary: "Dropped by Draconic Knights encountered across the Lands Between.",
  },
  {
    itemName: "Scaled Greaves",
    locationNames: [],
    summary: "A common scaled armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Perfumer Sarong",
    locationNames: [],
    summary: "Dropped by Perfumers, poison-throwing enemies found in Mt. Gelmir.",
  },
  {
    itemName: "Traveler's Slops",
    locationNames: [],
    summary: "A common traveler's outfit found as loot and sold by merchants.",
  },
  {
    itemName: "Alberich's Trousers",
    locationNames: [],
    summary: "A pointed-hood sorcerer's outfit found as loot in the Liurnia region.",
  },
  {
    itemName: "Spellblade's Trousers",
    locationNames: [],
    summary: "A scholar-mage's outfit found as loot in Liurnia.",
  },
  {
    itemName: "Bull-Goat Greaves",
    locationNames: ["Volcano Manor"],
    summary: "Found within Volcano Manor in Mt. Gelmir.",
  },
  {
    itemName: "Ronin's Greaves",
    locationNames: [],
    summary: "Dropped by katana-wielding Ronin enemies encountered across the Lands Between.",
  },
  {
    itemName: "Cloth Trousers",
    locationNames: [],
    summary: "A common cloth outfit found as loot in the early game.",
  },
  {
    itemName: "Blaidd's Greaves",
    locationNames: ["Moonlight Altar"],
    summary: "Obtainable from Blaidd's corpse after Ranni's questline concludes, near the Moonlight Altar.",
  },
  {
    itemName: "Black Knife Greaves",
    locationNames: ["Black Knife Catacombs"],
    summary: "Dropped by Black Knife Assassins, also found within Black Knife Catacombs in Liurnia.",
  },
  {
    itemName: "Exile Greaves",
    locationNames: [],
    summary: "Dropped by Exile Soldiers, common enemies found across the Lands Between.",
  },
  {
    itemName: "Banished Knight Greaves",
    locationNames: [],
    summary: "Dropped by Banished Knights, common enemies found across Limgrave and Liurnia.",
  },
  {
    itemName: "Briar Greaves",
    locationNames: [],
    summary: "Dropped by a thorn-covered wandering warrior NPC encountered in the overworld.",
  },
  {
    itemName: "Page Trousers",
    locationNames: [],
    summary: "Worn by page-type NPCs found at the Roundtable Hold.",
  },
  {
    itemName: "Night's Cavalry Greaves",
    locationNames: [],
    summary: "Dropped by Night's Cavalry, spectral rider enemies encountered at night.",
  },
  {
    itemName: "Blue Silver Mail Skirt",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers loyal to the Golden Order.",
  },
  {
    itemName: "Nomadic Merchant's Trousers",
    locationNames: [],
    summary: "Sold by or associated with Nomadic Merchants found along the roads of the Lands Between.",
  },
  {
    itemName: "Malformed Dragon Greaves",
    locationNames: [],
    summary: "Dropped by Malformed Dragon-type enemies encountered in Caelid and Farum Azula.",
  },
  {
    itemName: "Tree Sentinel Greaves",
    locationNames: [],
    summary: "Dropped by Tree Sentinel-aligned knight enemies.",
  },
  {
    itemName: "Royal Knight Greaves",
    locationNames: [],
    summary: "Dropped by Royal Knights encountered across the Lands Between.",
  },
  {
    itemName: "Nox Greaves",
    locationNames: [],
    summary: "Dropped by Nox enemies found in the Ainsel River and Nokstella regions.",
  },
  {
    itemName: "Fur Leggings",
    locationNames: [],
    summary: "A hide-and-fur outfit worn by tribal or shaman-type enemies.",
  },
  {
    itemName: "Shaman Leggings",
    locationNames: [],
    summary: "Worn by shaman-type enemies found in remote village settings.",
  },
  {
    itemName: "Duelist Greaves",
    locationNames: [],
    summary: "Associated with Colosseum duelist-type fighters.",
  },
  {
    itemName: "Sanguine Noble Waistcloth",
    locationNames: ["Mohgwyn Palace"],
    summary: "Worn by blood-aligned nobles found near Mohgwyn Palace.",
  },
  {
    itemName: "Guardian Greaves",
    locationNames: [],
    summary: "Dropped by Guardian-type enemies found in the Siofra River and beyond.",
  },
  {
    itemName: "Cleanrot Greaves",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Cleanrot Knights found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Fire Monk Greaves",
    locationNames: [],
    summary: "Dropped by fire monk enemies found in Liurnia and the Altus Plateau.",
  },
  {
    itemName: "Blackflame Monk Greaves",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Blackflame Monks, fire monk enemies encountered around Volcano Manor and the Altus Plateau.",
  },
  {
    itemName: "Fire Prelate Greaves",
    locationNames: [],
    summary: "Dropped by Fire Prelates, large fire-wielding enemies encountered at several sites.",
  },
  {
    itemName: "Aristocrat Boots",
    locationNames: [],
    summary: "Dropped by aristocrat-type enemies found in and around Leyndell, Royal Capital.",
  },
  {
    itemName: "Old Aristocrat Shoes",
    locationNames: [],
    summary: "Dropped by aged aristocrat-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Vulgar Militia Greaves",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Vulgar Militia enemies found around Volcano Manor.",
  },
  {
    itemName: "Sage Trousers",
    locationNames: [],
    summary: "A hooded scholar's outfit found as loot.",
  },
  {
    itemName: "Elden Lord Greaves",
    locationNames: [],
    summary: "Reward armor associated with achieving the Elden Lord ending.",
  },
  {
    itemName: "Radahn's Greaves",
    locationNames: ["Redmane Castle"],
    summary: "Remembrance armor forged from defeating Starscourge Radahn at Redmane Castle.",
  },
  {
    itemName: "Queen's Leggings",
    locationNames: [],
    summary: "Associated with a queen-type NPC or boss encountered late in the game.",
  },
  {
    itemName: "Godskin Apostle Trousers",
    locationNames: [],
    summary: "Dropped by Godskin Apostles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Godskin Noble Trousers",
    locationNames: [],
    summary: "Dropped by Godskin Nobles, encountered at several sites across the Lands Between.",
  },
  {
    itemName: "Depraved Perfumer Trousers",
    locationNames: [],
    summary: "Dropped by Depraved Perfumers, aggressive enemy variants of the Perfumer type.",
  },
  {
    itemName: "Crucible Greaves",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Crucible Knights, found around Volcano Manor and Mt. Gelmir.",
  },
  {
    itemName: "Old Sorcerer's Legwraps",
    locationNames: [],
    summary: "Worn by an elderly sorcerer NPC or enemy.",
  },
  {
    itemName: "All-Knowing Greaves",
    locationNames: [],
    summary: "Worn by an imprisoned scholarly NPC; part of the All-Knowing set found as loot.",
  },
  {
    itemName: "Twinned Greaves",
    locationNames: [],
    summary: "Worn by Twin Maiden Husks-adjacent scholar NPCs.",
  },
  {
    itemName: "Prophet Trousers",
    locationNames: [],
    summary: "Starting armor for the Prophet class.",
  },
  {
    itemName: "Astrologer Trousers",
    locationNames: [],
    summary: "Starting armor for the Astrologer class.",
  },
  {
    itemName: "Lionel's Greaves",
    locationNames: [],
    summary: "Dropped by Lionel, an invading NPC knight encountered as a duel-type invasion.",
  },
  {
    itemName: "Hoslow's Greaves",
    locationNames: [],
    summary: "Dropped by Hoslow, Knight of Blood, an invading NPC boss.",
  },
  {
    itemName: "Vagabond Knight Greaves",
    locationNames: [],
    summary: "Starting armor for the Vagabond class.",
  },
  {
    itemName: "Warrior Greaves",
    locationNames: [],
    summary: "A common warrior's armor set found as loot.",
  },
  {
    itemName: "War Surgeon Trousers",
    locationNames: [],
    summary: "Worn by War Surgeon-type NPCs or enemies.",
  },
  {
    itemName: "Royal Remains Greaves",
    locationNames: [],
    summary: "Dropped by Royal Remains-type enemies found in and around Leyndell.",
  },
  {
    itemName: "Beast Champion Greaves",
    locationNames: [],
    summary: "Dropped by beast-champion enemies encountered in the Mt. Gelmir region.",
  },
  {
    itemName: "Champion Gaiters",
    locationNames: [],
    summary: "Associated with the Colosseum arenas' champion fighters.",
  },
  {
    itemName: "Noble's Trousers",
    locationNames: [],
    summary: "A noble traveler's outfit found as loot.",
  },
  {
    itemName: "Maliketh's Greaves",
    locationNames: [],
    summary: "Remembrance armor forged from defeating Maliketh, the Black Blade, in Crumbling Farum Azula.",
  },
  {
    itemName: "Malenia's Greaves",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Remembrance armor forged from defeating Malenia, Blade of Miquella, within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Veteran's Greaves",
    locationNames: [],
    summary: "Dropped by veteran soldier-type enemies found across the Lands Between.",
  },
  {
    itemName: "Bloodhound Knight Greaves",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Bloodhound Knight Darriwil in Stormveil Castle.",
  },
  {
    itemName: "Commoner's Shoes",
    locationNames: [],
    summary: "A plain commoner's outfit found as loot in town ruins.",
  },
  {
    itemName: "Sorcerer Leggings",
    locationNames: [],
    summary: "Worn by sorcerer-type enemies found in Liurnia.",
  },
  {
    itemName: "Raging Wolf Greaves",
    locationNames: [],
    summary: "Worn by wolf-warrior-type enemies encountered across the Lands Between.",
  },
  {
    itemName: "Land of Reeds Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "White Reed Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — tied to the Land of Reeds flashback sequence in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Confessor Boots",
    locationNames: [],
    summary: "Starting armor for the Confessor class.",
  },
  {
    itemName: "Prisoner Trousers",
    locationNames: [],
    summary: "Starting armor for the Prisoner class.",
  },
  {
    itemName: "Traveling Maiden Boots",
    locationNames: [],
    summary: "Worn by Traveling Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Finger Maiden Shoes",
    locationNames: [],
    summary: "Worn by Finger Maiden attendants encountered across the Lands Between.",
  },
  {
    itemName: "Preceptor's Trousers",
    locationNames: [],
    summary: "Worn by a Preceptor-type scholarly NPC.",
  },
  {
    itemName: "Bandit Boots",
    locationNames: [],
    summary: "Starting armor for the Bandit class.",
  },
  {
    itemName: "Eccentric's Breeches",
    locationNames: [],
    summary: "Worn by an eccentric wandering NPC encountered in the overworld.",
  },
  {
    itemName: "Fingerprint Greaves",
    locationNames: ["Volcano Manor"],
    summary: "Associated with the Fingerprint Grape Louis and other Volcano Manor operatives.",
  },
  {
    itemName: "Consort's Trousers",
    locationNames: [],
    summary: "Shadow of the Erdtree content — associated with Radahn, Consort of Miquella, not covered by this map yet.",
  },
  {
    itemName: "Omen Greaves",
    locationNames: ["Subterranean Shunning-Grounds"],
    summary: "Dropped by Omen-type enemies, found near Leyndell and the Subterranean Shunning-Grounds.",
  },
  {
    itemName: "Carian Knight Greaves",
    locationNames: ["Caria Manor"],
    summary: "Dropped by Carian Knights, commonly encountered around Caria Manor.",
  },
  {
    itemName: "Errant Sorcerer Boots",
    locationNames: [],
    summary: "Dropped by Errant Sorcerers, wandering spellcaster enemies.",
  },
  {
    itemName: "Battlemage Legwraps",
    locationNames: [],
    summary: "Dropped by Battlemage-type enemies encountered around Raya Lucaria Academy.",
  },
  {
    itemName: "Snow Witch Skirt",
    locationNames: [],
    summary: "Found in the Consecrated Snowfield region, tied to frost witch enemies.",
  },
  {
    itemName: "Traveler's Boots",
    locationNames: [],
    summary: "A common traveler's outfit found as loot and sold by merchants.",
  },
  {
    itemName: "Gold Waistwrap",
    locationNames: [],
    summary: "A gilded accessory set found as loot.",
  },
  {
    itemName: "Zamor Legwraps",
    locationNames: ["Zamor Ruins"],
    summary: "Found around Zamor Ruins in the Mountaintops of the Giants.",
  },
  {
    itemName: "Chain Leggings",
    locationNames: [],
    summary: "A common light chain armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Mushroom Legs",
    locationNames: [],
    summary: "A cosmetic mushroom costume found as loot.",
  },
  {
    itemName: "Leather Boots",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Knight Greaves",
    locationNames: [],
    summary: "Dropped by knight-type enemies found across the Lands Between.",
  },
  {
    itemName: "Godrick Soldier Greaves",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick's foot soldiers within Stormveil Castle.",
  },
  {
    itemName: "Raya Lucarian Greaves",
    locationNames: ["Raya Lucaria Academy"],
    summary: "Dropped by scholars and soldiers within Raya Lucaria Academy.",
  },
  {
    itemName: "Leyndell Soldier Greaves",
    locationNames: [],
    summary: "Dropped by Leyndell soldiers encountered in the Royal Capital region.",
  },
  {
    itemName: "Radahn Soldier Greaves",
    locationNames: ["Redmane Castle"],
    summary: "Dropped by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Mausoleum Greaves",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Haligtree Greaves",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Found within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Gelmir Knight Greaves",
    locationNames: ["Volcano Manor"],
    summary: "Dropped by Gelmir Knights encountered around Mt. Gelmir and Volcano Manor.",
  },
  {
    itemName: "Godrick Knight Greaves",
    locationNames: ["Stormveil Castle"],
    summary: "Dropped by Godrick Knights within Stormveil Castle.",
  },
  {
    itemName: "Cuckoo Knight Greaves",
    locationNames: [],
    summary: "Dropped by Cuckoo Knights, encountered around Liurnia's Raya Lucaria area.",
  },
  {
    itemName: "Leyndell Knight Greaves",
    locationNames: [],
    summary: "Dropped by Leyndell Knights encountered in the Royal Capital region.",
  },
  {
    itemName: "Redmane Knight Greaves",
    locationNames: ["Redmane Castle"],
    summary: "Worn by Radahn's soldiers found around Redmane Castle in Caelid.",
  },
  {
    itemName: "Mausoleum Knight Greaves",
    locationNames: [],
    summary: "Dropped by Mausoleum Knights and found near wandering mausoleums.",
  },
  {
    itemName: "Haligtree Knight Greaves",
    locationNames: ["Elphael, Brace of the Haligtree"],
    summary: "Dropped by Haligtree Knights within Elphael, Brace of the Haligtree.",
  },
  {
    itemName: "Foot Soldier Greaves",
    locationNames: [],
    summary: "A common set worn by rank-and-file foot soldiers across the Lands Between.",
  },
  {
    itemName: "Omenkiller Boots",
    locationNames: ["Dominula, Windmill Village"],
    summary: "Dropped by the Omenkiller boss, fought near Dominula, Windmill Village.",
  },
  {
    itemName: "Rotten Duelist Greaves",
    locationNames: [],
    summary: "Dropped by a rot-aligned duelist enemy near the Lake of Rot.",
  },
  {
    itemName: "Dryleaf Cuissardes",
    locationNames: ["Warmaster's Shack"],
    summary: "Associated with Dryleaf Dane, the swordsman NPC found at the Warmaster's Shack in Limgrave.",
  },
  {
    itemName: "Gaius's Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by Commander Gaius in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Oathseeker Knight Greaves",
    locationNames: [],
    summary: "Dropped by Oathseeker Knights, armored enemies found across the Lands Between.",
  },
  {
    itemName: "Verdigris Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — a rot-aligned knight set found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Iron Rivet Greaves",
    locationNames: [],
    summary: "A riveted iron armor set found as loot.",
  },
  {
    itemName: "Thiollier's Trousers",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Thiollier in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "High Priest Undergarments",
    locationNames: [],
    summary: "Worn by high priest NPCs of the Golden Order.",
  },
  {
    itemName: "Soiled Loincloth",
    locationNames: [],
    summary: "A tattered loincloth found as loot in the early game.",
  },
  {
    itemName: "Dancer's Trousers",
    locationNames: [],
    summary: "Worn by a performer-type NPC or enemy encountered in the Lands Between.",
  },
  {
    itemName: "Greaves of Night",
    locationNames: [],
    summary: "Shadow of the Erdtree content — Night-aligned greaves found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Igon's Loincloth",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Igon in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ansbach's Boots",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Ansbach in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Freyja's Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — worn by the NPC Freyja in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Greaves of Solitude",
    locationNames: [],
    summary: "Shadow of the Erdtree content — Solitude-aligned greaves found in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Messmer Soldier Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Messmer's soldiers in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Black Knight Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Black Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rakshasa Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by a Rakshasa enemy in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Fire Knight Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Fire Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Leather Leg Wraps",
    locationNames: [],
    summary: "A common early armor set found as loot and sold by merchants.",
  },
  {
    itemName: "Death Knight Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Death Knights encountered in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Ascetic's Ankle Guards",
    locationNames: [],
    summary: "A minimal loincloth-and-wrap set worn by ascetic hermit-type NPCs; found as loot.",
  },
  {
    itemName: "Messmer's Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Messmer the Impaler in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Gravebird Anklets",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Gravebird enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Common Soldier Greaves",
    locationNames: [],
    summary: "Dropped by common rank-and-file soldier enemies.",
  },
  {
    itemName: "Horned Warrior Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Horned Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Divine Bird Warrior Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Divine Bird Warriors in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Rellana's Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — remembrance armor forged from defeating Rellana, Twin Moon Knight, in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Young Lion's Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Young Lion's Guard enemies in the Land of Shadow, not covered by this map yet.",
  },
  {
    itemName: "Shadow Militiaman Greaves",
    locationNames: [],
    summary: "Shadow of the Erdtree content — dropped by Shadow Militiamen in the Land of Shadow, not covered by this map yet.",
  },
];
