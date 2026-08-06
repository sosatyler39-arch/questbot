// Named locations, positioned relative to their region's bounding box
// (fx/fy are 0-1 fractions within the region — see regions.ts). Positions
// are approximate, based on general knowledge of relative in-region
// geography plus a research pass cross-referencing eldenring.wiki.gg
// (explicitly not Fextralife/Fandom) and general gaming-press coverage for
// field-boss siting. V1 scope: naming and rough placement only, nothing
// interactive per-pin yet. A handful of names the research pass flagged as
// low-confidence or likely duplicates (e.g. "Academy Crystal Cave" as a
// distinct dungeon, "Gael Tunnel" as standalone) were left out rather than
// guessed onto the map.
export interface MapLocation {
  name: string;
  category:
    | 'armor'
    | 'ashes-of-war'
    | 'bosses'
    | 'consumables'
    | 'flask-upgrades'
    | 'key'
    | 'locations'
    | 'maps'
    | 'materials'
    | 'npc'
    | 'npc-invader'
    | 'remembrance'
    | 'shields'
    | 'site-of-grace'
    | 'spells'
    | 'spirit-ashes'
    | 'spiritsprings'
    | 'summoning-pool'
    | 'talismans'
    | 'upgrade-materials'
    | 'waygates'
    | 'weapons';
  regionId: string;
  layer: 'surface' | 'underground';
  fx: number;
  fy: number;
}

export type Category = MapLocation['category'];

export const MAP_LOCATIONS: MapLocation[] = [
  // ================= LIMGRAVE =================
  { name: 'Chapel of Anticipation', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.924, fy: 0.565 },
  { name: 'Stranded Graveyard', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.886, fy: 0.969 },
  { name: 'Stormveil Castle', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.751, fy: 0.741 },
  { name: 'Stormgate', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.866, fy: 0.788 },
  { name: 'Divine Tower of Limgrave', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.036, fy: 0.469 },
  { name: "Fringefolk Hero's Grave", category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.862, fy: 0.989 },
  { name: 'Stormhill Evergaol', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.836, fy: 0.821 },
  { name: 'Stormhill Shack', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.825, fy: 0.730 },
  { name: 'Tree Sentinel (Limgrave)', category: 'bosses', regionId: 'limgrave', layer: 'surface', fx: 0.764, fy: 0.666 },
  { name: 'Highroad Cave', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.973, fy: 0.583 },
  { name: 'Deathtouched Catacombs', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.916, fy: 0.608 },
  { name: 'Third Church of Marika', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.159, fy: 0.693 },
  { name: 'Tibia Mariner (Limgrave site)', category: 'bosses', regionId: 'limgrave', layer: 'surface', fx: 1.110, fy: 0.696 },
  { name: 'Summonwater Village', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.090, fy: 0.608 },
  { name: 'Fort Haight', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.185, fy: 0.962 },
  { name: 'Church of Elleh', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.842, fy: 0.929 },
  { name: "Warmaster's Shack", category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.880, fy: 0.693 },
  { name: 'Stormfoot Catacombs', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.791, fy: 0.868 },
  { name: 'Gatefront Ruins', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.893, fy: 0.807 },
  { name: 'Waypoint Ruins', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.038, fy: 0.928 },
  { name: 'Coastal Cave', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.790, fy: 0.963 },
  { name: 'Groveside Cave', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.844, fy: 0.871 },
  { name: 'Mistwood Ruins', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.078, fy: 0.905 },
  { name: 'Siofra River Well', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.149, fy: 0.820 },
  { name: 'Murkwater Catacombs', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.971, fy: 0.678 },
  { name: 'Murkwater Cave', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.973, fy: 0.812 },
  { name: 'Church of Dragon Communion', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.758, fy: 1.104 },
  { name: 'Agheel Lake', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.949, fy: 0.937 },
  { name: 'Flying Dragon Agheel (site)', category: 'bosses', regionId: 'limgrave', layer: 'surface', fx: 1.085, fy: 0.688 },
  { name: 'Dragon-Burnt Ruins', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.935, fy: 0.970 },
  { name: 'Forlorn Hound Evergaol', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.027, fy: 1.122 },
  { name: 'Bridge of Sacrifice', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.069, fy: 1.171 },
  { name: 'Seaside Ruins', category: 'site-of-grace', regionId: 'limgrave', layer: 'surface', fx: 0.950, fy: 1.060 },
  { name: 'Limgrave Tunnels', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.913, fy: 0.877 },
  { name: 'Limgrave Colosseum', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 0.836, fy: 0.562 },

  // ================= WEEPING PENINSULA =================
  { name: 'Isolated Merchant\'s Shack (Weeping Peninsula)', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.099, fy: 0.643 },
  { name: 'Wandering Mausoleum (Weeping Peninsula)', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.177, fy: 0.615 },
  { name: 'Weeping Evergaol', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.167, fy: 0.458 },
  { name: 'Church of Pilgrimage', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.291, fy: 0.272 },
  { name: 'Minor Erdtree (Weeping Peninsula)', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.320, fy: 0.560 },
  { name: 'Erdtree Avatar (Weeping Peninsula site)', category: 'bosses', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.272126491735049, fy: 0.6260545045919365 },
  { name: 'Tombsward Ruins', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.204, fy: 0.429 },
  { name: 'Tombsward Cave', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.172, fy: 0.504 },
  { name: 'Tombsward Catacombs', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.303, fy: 0.490 },
  { name: 'Oridys\'s Rise', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.571, fy: 0.558 },
  { name: 'Forest Lookout Tower', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.484, fy: 0.419 },
  { name: 'Demi-Human Forest Ruins', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.381, fy: 0.423 },
  { name: 'Earthbore Cave', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.440, fy: 0.378 },
  { name: 'Ailing Village', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.427, fy: 0.518 },
  { name: 'Fourth Church of Marika', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.133, fy: 0.457 },
  { name: 'Tower of Return', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.217, fy: 0.688 },
  { name: 'Witchbane Ruins', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.126, fy: 0.521 },
  { name: 'Impaler\'s Catacombs', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.580, fy: 0.415 },
  { name: 'Callu Baptismal Church', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.429, fy: 0.565 },
  { name: 'Morne Tunnel', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.372, fy: 0.562 },
  { name: 'Castle Morne', category: 'locations', regionId: 'weeping-peninsula', layer: 'surface', fx: 1.372, fy: 0.894 },

  // ================= LIURNIA OF THE LAKES =================
  { name: 'Rose Church', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.199, fy: 1.119 },
  { name: 'Temple Quarter', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.158, fy: 1.014 },
  { name: 'Kingsrealm Ruins', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.159, fy: 0.474 },
  { name: 'Church of Irith', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.521, fy: 1.691 },
  { name: 'Three Sisters', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.159, fy: 0.220 },
  { name: "Ranni's Rise", category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.128, fy: 0.245 },
  { name: 'Caria Manor', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.230, fy: 0.262 },
  { name: 'Royal Grave Evergaol', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.338, fy: 0.267 },
  { name: 'Ravine-Veiled Village', category: 'site-of-grace', regionId: 'liurnia', layer: 'surface', fx: 0.382, fy: 0.277 },
  { name: 'Frenzied Flame Village', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.446, fy: 0.568 },
  { name: 'Cliffbottom Catacombs', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.571, fy: 1.438 },
  { name: 'Purified Ruins', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.502, fy: 1.390 },
  { name: 'Laskyar Ruins', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.441, fy: 1.441 },
  { name: 'Divine Tower of Liurnia', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.672, fy: 1.002 },
  { name: 'Grand Lift of Dectus', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.475, fy: 0.280 },
  { name: 'Ruin-Strewn Precipice', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.402, fy: 0.241 },
  { name: 'Magma Wyrm Makar (site)', category: 'bosses', regionId: 'liurnia', layer: 'surface', fx: 0.45, fy: 0.85 },
  { name: 'Bellum Church', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.299, fy: 0.467 },
  { name: 'Glintstone Dragon Smarag (site)', category: 'bosses', regionId: 'liurnia', layer: 'surface', fx: 0.31369569165134, fy: 0.7591012149186763 },
  { name: 'Raya Lucaria Academy', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.198, fy: 0.895 },
  { name: 'Academy Gate Town', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.347, fy: 1.040 },
  { name: 'Raya Lucaria Crystal Tunnel', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.343, fy: 0.720 },
  { name: 'Church of Vows', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.368, fy: 0.793 },
  { name: 'The Four Belfries', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.096, fy: 0.714 },
  { name: "Cuckoo's Evergaol", category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.055, fy: 0.947 },
  { name: 'Highway Lookout Tower (Liurnia)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.501, fy: 1.263 },
  { name: 'Church of Inhibition', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.403, fy: 0.417 },
  { name: "Road's End Catacombs", category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.060, fy: 1.222 },
  { name: 'Ainsel River Well', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.491, fy: 0.759 },
  { name: 'Bellum Highway', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.416, fy: 1.039 },
  { name: 'Stillwater Cave', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.527, fy: 1.590 },
  { name: 'Village of the Albinaurics', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.154, fy: 1.396 },
  { name: 'Jarburg', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.556, fy: 1.104 },
  { name: 'Black Knife Catacombs', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.514, fy: 0.485 },
  { name: "Malefactor's Evergaol", category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.454, fy: 1.517 },
  { name: "Ringleader's Evergaol", category: 'bosses', regionId: 'liurnia', layer: 'surface', fx: 0.118, fy: 1.501 },
  { name: 'Cathedral of Manus Celes', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.208, fy: 1.344 },
  { name: 'Glintstone Dragon Adula (site)', category: 'bosses', regionId: 'liurnia', layer: 'surface', fx: 0.13, fy: 1.356 },
  { name: 'Moonfolk Ruins', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.130, fy: 1.350 },
  { name: 'Lunar Estate Ruins', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.213, fy: 1.419 },
  { name: 'Uld Palace Ruins', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.421, fy: 1.038 },
  { name: 'Lakeside Crystal Cave', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.340, fy: 1.456 },

  // ================= CAELID =================
  { name: 'Fort Faroth', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.607, fy: 1.474 },
  { name: 'Elder Dragon Greyoll (site)', category: 'bosses', regionId: 'caelid', layer: 'surface', fx: 0.217, fy: 1.24 },
  { name: 'Flying Dragon Greyoll (post-quest site)', category: 'bosses', regionId: 'caelid', layer: 'surface', fx: 0.325, fy: 1.256 },
  { name: 'Bestial Sanctum', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.616, fy: 1.082 },
  { name: 'Cathedral of Dragon Communion', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.365, fy: 1.800 },
  { name: 'Caelem Ruins', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.285, fy: 1.493 },
  { name: "Lenne's Rise", category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.744, fy: 1.329 },
  { name: 'Dragonbarrow Cave', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.634, fy: 1.358 },
  { name: 'Deep Siofra Well', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.396, fy: 1.427 },
  { name: 'Minor Erdtree Catacombs', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.223, fy: 1.370 },
  { name: 'Abandoned Cave', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.370, fy: 1.499 },
  { name: 'Caelid Catacombs', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.420, fy: 1.831 },
  { name: 'Caelid Waypoint Ruins', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.245, fy: 1.672 },
  { name: 'Smoldering Church', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.103, fy: 1.414 },
  { name: 'Caelid Colosseum', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.232, fy: 1.215 },
  { name: 'Decaying Ekzykes (site)', category: 'bosses', regionId: 'caelid', layer: 'surface', fx: 0.445898602769701, fy: 1.370192130328455 },
  { name: 'Forsaken Ruins', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.229, fy: 1.530 },
  { name: 'Redmane Castle', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.664, fy: 1.885 },
  { name: 'Wailing Dunes', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.778, fy: 1.594 },
  { name: 'Caelid Evergaol (Sellia)', category: 'bosses', regionId: 'caelid', layer: 'surface', fx: 0.217, fy: 1.536 },
  { name: 'Gaol Cave', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.231, fy: 1.623 },
  { name: 'Fort Gael', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.189, fy: 1.636 },
  { name: 'Sellia Crystal Tunnel', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.445, fy: 1.475 },
  { name: 'Sellia Hideaway', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.584, fy: 1.516 },
  { name: 'Sellia Gateway', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.513, fy: 1.653 },
  { name: 'Sellia, Town of Sorcery', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.493, fy: 1.578 },
  { name: "Gowry's Shack", category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.528, fy: 1.610 },
  { name: 'Church of the Plague', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.549, fy: 1.581 },
  { name: 'Swamp Lookout Tower', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.468, fy: 1.628 },
  { name: 'Street of Sages Ruins', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.365, fy: 1.596 },
  { name: 'War-Dead Catacombs', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.718, fy: 1.411 },
  { name: 'Shack of the Rotting', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.207, fy: 1.494 },
  { name: 'Divine Tower of Caelid', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.466, fy: 1.328 },

  // ================= ALTUS PLATEAU / MT. GELMIR =================
  { name: 'Grand Lift of Dectus (Altus side)', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.267, fy: 0.952 },
  { name: 'Divine Tower of East Altus', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.3968502412685574, fy: 1.0474454427738846 },
  { name: 'Shaded Castle', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.452, fy: 0.646 },
  { name: 'Second Church of Marika', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.415, fy: 0.923 },
  { name: 'Mirage Rise', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.339, fy: 0.868 },
  { name: 'Old Altus Tunnel', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.5764959822393929, fy: 0.9053858585464925 },
  { name: 'Wyndham Ruins', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.49, fy: 0.979 },
  { name: 'Wyndham Catacombs', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.6842392227083183, fy: 1.0079814910263516 },
  { name: 'Minor Erdtree (Altus Plateau)', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.49, fy: 1.09 },
  { name: 'Minor Erdtree Church', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.4326898470576277, fy: 0.9283510584989746 },
  { name: 'Woodfolk Ruins', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.565, fy: 0.979 },
  { name: 'Golden Lineage Evergaol', category: 'bosses', regionId: 'altus-plateau', layer: 'surface', fx: 0.565, fy: 0.923 },
  { name: 'Fallingstar Beast (site)', category: 'bosses', regionId: 'altus-plateau', layer: 'surface', fx: 0.6440821194072563, fy: 0.8945813878538474 },
  { name: 'Erdtree-Gazing Hill', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.5691116718390051, fy: 0.9092531449012495 },
  { name: "Sainted Hero's Grave", category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.635642703085407, fy: 1.0146557011061936 },
  { name: 'Lux Ruins', category: 'locations', regionId: 'altus-plateau', layer: 'surface', fx: 0.754, fy: 1.035 },
  { name: 'Auriza Side Tomb', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.5042049424864294, fy: 1.0298968541746072 },
  { name: "Auriza Hero's Grave", category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.5901751116025682, fy: 1.0188607387763362 },
  { name: "Giant-Conquering Hero's Grave (Altus side)", category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.603, fy: 0.591 },
  { name: 'Sealed Tunnel', category: 'site-of-grace', regionId: 'altus-plateau', layer: 'surface', fx: 0.4325081583054171, fy: 0.9275883223420411 },
  { name: 'Volcano Manor', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 1.0404525851202244, fy: 0.6930860422014969 },
  { name: 'Fort Laiedd', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 1.111, fy: 0.9 },
  { name: 'Stormcaller Church', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 1.002, fy: 0.826 },
  { name: 'Ninth Mt. Gelmir Campsite', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 1.1263562261087618, fy: 0.8355932543085982 },
  { name: 'Magma Wyrm (site)', category: 'bosses', regionId: 'mt-gelmir', layer: 'surface', fx: 1.128711297183266, fy: 0.832259140399706 },
  { name: 'Seethewater Terminus', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 1.129102759783938, fy: 0.8338571654799968 },
  { name: 'Seethewater Cave', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 0.9850137431066561, fy: 0.6905418264524208 },
  { name: 'Perfumer\'s Grotto', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 0.880123410495134, fy: 0.6808595947502842 },
  { name: 'Perfumer\'s Ruins', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 0.914, fy: 0.643 },
  { name: "Sage's Cave", category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 0.8669220207207724, fy: 0.679017274329058 },
  { name: 'Hermit Village', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 0.819, fy: 0.606 },
  { name: 'Writheblood Ruins', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 0.856, fy: 0.533 },
  { name: 'Subterranean Inquisition Chamber', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 1.034, fy: 0.692 },
  { name: 'Gelmir Hero\'s Grave', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 0.9592129699794882, fy: 0.687219280462389 },
  { name: 'Altus Tunnel', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 1.002, fy: 0.691 },
  { name: 'Dominula, Windmill Village', category: 'site-of-grace', regionId: 'mt-gelmir', layer: 'surface', fx: 0.884, fy: 0.525 },
  { name: 'Godskin Apostle (Dominula site)', category: 'bosses', regionId: 'mt-gelmir', layer: 'surface', fx: 0.889, fy: 0.511 },
  { name: 'West Windmill Pasture', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 0.886, fy: 0.519 },
  { name: 'East Windmill Pasture', category: 'locations', regionId: 'mt-gelmir', layer: 'surface', fx: 0.901, fy: 0.482 },

  // ================= LEYNDELL, ROYAL CAPITAL =================
  { name: 'Draconic Tree Sentinel (site)', category: 'bosses', regionId: 'leyndell', layer: 'surface', fx: 0.882, fy: 0.884 },
  { name: 'West Capital Rampart', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.7344872001478178, fy: 1.5333299828029907 },
  { name: 'East Capital Rampart', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 1.29, fy: 1.154 },
  { name: 'Fortified Manor', category: 'locations', regionId: 'leyndell', layer: 'surface', fx: 0.56, fy: 1.44 },
  { name: 'Lower Capital Church', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.8549105449702914, fy: 1.3468677438837051 },
  { name: 'Avenue Balcony', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.9021354043982253, fy: 1.3204534784375557 },
  { name: 'Divine Bridge', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.864, fy: 1.582 },
  { name: 'Royal Colosseum', category: 'locations', regionId: 'leyndell', layer: 'surface', fx: 1.168, fy: 1.44 },
  { name: 'Erdtree Sanctuary', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.925, fy: 1.011 },
  { name: "Queen's Bedchamber", category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.986, fy: 0.94 },
  { name: 'Elden Throne', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.925, fy: 1.939 },
  { name: 'Subterranean Shunning-Grounds', category: 'locations', regionId: 'leyndell', layer: 'surface', fx: 0.742, fy: 2.01 },
  { name: 'Leyndell Catacombs', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.6209583560069845, fy: 1.8173240939454098 },
  { name: 'Cathedral of the Forsaken', category: 'site-of-grace', regionId: 'leyndell', layer: 'surface', fx: 0.6885084944766309, fy: 1.9980247009302579 },

  // ================= MOUNTAINTOPS OF THE GIANTS / CONSECRATED SNOWFIELD =================
  { name: 'Grand Lift of Rold', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.6380293695205468, fy: 0.9057096373247673 },
  { name: 'Forbidden Lands', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.5900594683449452, fy: 0.8349880681984818 },
  { name: 'First Church of Marika', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.6704725980902428, fy: 1.2206178151373435 },
  { name: 'Stargazer\'s Ruins', category: 'locations', regionId: 'mountaintops', layer: 'surface', fx: 0.632, fy: 0.925 },
  { name: "Giant-Conquering Hero's Grave", category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.6721217446897563, fy: 0.8928369646785346 },
  { name: 'Giants\' Mountaintop Catacombs', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.6570078633546901, fy: 0.9596996603597534 },
  { name: 'Zamor Ruins', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.6732368122104433, fy: 0.8739218416069614 },
  { name: 'Borealis the Freezing Fog (site)', category: 'bosses', regionId: 'mountaintops', layer: 'surface', fx: 0.577, fy: 1.157 },
  { name: 'Full-Grown Fallingstar Beast (site)', category: 'bosses', regionId: 'mountaintops', layer: 'surface', fx: 0.65, fy: 1.05 },
  { name: 'Guardians\' Garrison', category: 'locations', regionId: 'mountaintops', layer: 'surface', fx: 0.855, fy: 0.86 },
  { name: 'Church of the Eclipse', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.8497421627024029, fy: 0.7350845010432947 },
  { name: 'Castle Sol', category: 'locations', regionId: 'mountaintops', layer: 'surface', fx: 0.855, fy: 0.598 },
  { name: 'Church of Repose', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.6036975012054098, fy: 1.0962706332163707 },
  { name: 'Flame Peak', category: 'locations', regionId: 'mountaintops', layer: 'surface', fx: 0.558, fy: 1.514 },
  { name: 'Forge of the Giants', category: 'site-of-grace', regionId: 'mountaintops', layer: 'surface', fx: 0.5426324798804958, fy: 1.4308708784413586 },
  { name: 'Fire Giant (site)', category: 'bosses', regionId: 'mountaintops', layer: 'surface', fx: 0.552, fy: 1.41 },
  { name: 'Heretical Rise', category: 'locations', regionId: 'mountaintops', layer: 'surface', fx: 0.744, fy: 1.448 },
  { name: 'Lord Contender\'s Evergaol', category: 'bosses', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.411, fy: 2.111 },
  { name: 'Great Wyrm Theodorix (site)', category: 'bosses', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.535, fy: 1.986 },
  { name: 'Consecrated Snowfield Catacombs', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.24181164888191253, fy: 2.266530665410956 },
  { name: 'Yelough Anix Tunnel', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.260257733269314, fy: 2.285855587649681 },
  { name: 'Yelough Anix Ruins', category: 'locations', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.214, fy: 2.049 },
  { name: 'Cave of the Forlorn', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.26023141729296584, fy: 2.3114825958748 },
  { name: 'Spiritcaller Cave', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.22794260358905039, fy: 2.2511270472719356 },
  { name: 'Albinauric Rise', category: 'locations', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.134, fy: 2.111 },
  { name: 'Apostate Derelict', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.27436490416507214, fy: 2.2992078993131937 },
  { name: 'Hidden Path to the Haligtree', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.20216229550520776, fy: 2.2508063555757354 },
  { name: 'Ordina, Liturgical Town', category: 'site-of-grace', regionId: 'consecrated-snowfield', layer: 'surface', fx: 0.26322939729648803, fy: 2.28798984890406 },

  // ================= HALIGTREE =================
  // Previously missing from this dataset entirely — added after the user
  // flagged the omission. Malenia's arena is inside Elphael (a legacy
  // dungeon boss, not open-world), so it isn't pinned separately yet —
  // same "dungeon-interior bosses" gap noted for the Bosses filter above.
  { name: 'Elphael, Brace of the Haligtree', category: 'locations', regionId: 'haligtree', layer: 'surface', fx: 1.908, fy: 0.707 },
  { name: 'Haligtree Town', category: 'site-of-grace', regionId: 'haligtree', layer: 'surface', fx: 1.8079999999980854, fy: 0.5900000000017966 },
  { name: 'Haligtree Roots', category: 'site-of-grace', regionId: 'haligtree', layer: 'surface', fx: 1.967999999996785, fy: 0.8359999999984282 },
  { name: 'Prayer Room', category: 'site-of-grace', regionId: 'haligtree', layer: 'surface', fx: 1.8979999999970176, fy: 0.9119999999992534 },

  // ================= CRUMBLING FARUM AZULA =================
  { name: 'Crumbling Beast Grave', category: 'site-of-grace', regionId: 'farum-azula', layer: 'surface', fx: 0.857447664284606, fy: 2.4387840612696694 },
  { name: 'Tempest-Facing Balcony', category: 'site-of-grace', regionId: 'farum-azula', layer: 'surface', fx: 0.9073821461483023, fy: 2.4563981153416212 },
  { name: 'Dragon Temple', category: 'site-of-grace', regionId: 'farum-azula', layer: 'surface', fx: 0.9752964945555338, fy: 2.4630524571372816 },
  { name: 'Dragon Temple Rooftop', category: 'site-of-grace', regionId: 'farum-azula', layer: 'surface', fx: 1.099939329424335, fy: 2.4671884400406348 },
  { name: 'Beside the Great Bridge', category: 'site-of-grace', regionId: 'farum-azula', layer: 'surface', fx: 1.0375134557765844, fy: 2.461558308648975 },
  { name: "Dragonlord Placidusax's Arena", category: 'bosses', regionId: 'farum-azula', layer: 'surface', fx: 0.9414209098106299, fy: 2.4540186175617835 },

  // ================= UNDERGROUND: SIOFRA RIVER =================
  { name: 'Nokron, Eternal City', category: 'site-of-grace', regionId: 'nokron', layer: 'underground', fx: 0.5, fy: 0.4 },
  { name: 'Ancestral Woods', category: 'site-of-grace', regionId: 'nokron', layer: 'underground', fx: 0.3, fy: 0.6 },
  { name: "Night's Sacred Ground", category: 'site-of-grace', regionId: 'nokron', layer: 'underground', fx: 0.4, fy: 0.7 },
  { name: 'Mimic Tear (site)', category: 'bosses', regionId: 'nokron', layer: 'underground', fx: 0.42, fy: 0.72 },
  { name: 'Siofra River Well (descent)', category: 'site-of-grace', regionId: 'siofra-river', layer: 'underground', fx: 0.2, fy: 0.15 },
  { name: 'Deep Siofra Well (descent)', category: 'site-of-grace', regionId: 'siofra-river', layer: 'underground', fx: 0.8, fy: 0.15 },
  { name: 'Hallowhorn Grounds (South)', category: 'locations', regionId: 'siofra-river', layer: 'underground', fx: 0.4, fy: 0.5 },
  { name: 'Hallowhorn Grounds (North)', category: 'locations', regionId: 'siofra-river', layer: 'underground', fx: 0.45, fy: 0.3 },
  { name: 'Regal Ancestor Spirit (site)', category: 'bosses', regionId: 'siofra-river', layer: 'underground', fx: 0.46, fy: 0.28 },
  { name: 'Siofra Aqueduct', category: 'locations', regionId: 'siofra-river', layer: 'underground', fx: 0.6, fy: 0.4 },
  { name: 'Valiant Gargoyles (site)', category: 'bosses', regionId: 'siofra-river', layer: 'underground', fx: 0.62, fy: 0.42 },

  // ================= UNDERGROUND: AINSEL RIVER / NOKSTELLA =================
  { name: 'Ainsel River Well (descent)', category: 'site-of-grace', regionId: 'ainsel-river', layer: 'underground', fx: 0.15, fy: 0.2 },
  { name: 'Ainsel River Main', category: 'site-of-grace', regionId: 'ainsel-river', layer: 'underground', fx: 0.4, fy: 0.4 },
  { name: 'Uhl Palace Ruins', category: 'locations', regionId: 'ainsel-river', layer: 'underground', fx: 0.7, fy: 0.35 },
  { name: 'Nokstella, Eternal City', category: 'site-of-grace', regionId: 'nokstella', layer: 'underground', fx: 0.5, fy: 0.5 },
  { name: 'Renna\'s Rise (waygate)', category: 'waygates', regionId: 'nokstella', layer: 'underground', fx: 0.3, fy: 0.3 },
  { name: 'Moonlight Altar', category: 'site-of-grace', regionId: 'ainsel-river', layer: 'underground', fx: 0.85, fy: 0.55 },

  // ================= UNDERGROUND: LAKE OF ROT =================
  { name: 'Grand Cloister', category: 'site-of-grace', regionId: 'lake-of-rot', layer: 'underground', fx: 0.4, fy: 0.4 },
  { name: 'Astel, Naturalborn of the Void (lair)', category: 'bosses', regionId: 'lake-of-rot', layer: 'underground', fx: 0.6, fy: 0.6 },

  // ================= UNDERGROUND: DEEPROOT DEPTHS =================
  { name: 'The Nameless Eternal City', category: 'site-of-grace', regionId: 'deeproot-depths', layer: 'underground', fx: 0.3, fy: 0.5 },
  { name: 'Wandering Mausoleum (Deeproot)', category: 'locations', regionId: 'deeproot-depths', layer: 'underground', fx: 0.2, fy: 0.25 },
  { name: "Prince of Death's Throne", category: 'site-of-grace', regionId: 'deeproot-depths', layer: 'underground', fx: 0.5, fy: 0.15 },
  { name: 'Lichdragon Fortissax (site)', category: 'bosses', regionId: 'deeproot-depths', layer: 'underground', fx: 0.5, fy: 0.13 },

  // ================= UNDERGROUND: MOHGWYN PALACE =================
  { name: 'Mohgwyn Palace', category: 'locations', regionId: 'mohgwyn-palace', layer: 'underground', fx: 0.55, fy: 0.45 },
  { name: 'Dynasty Mausoleum', category: 'locations', regionId: 'mohgwyn-palace', layer: 'underground', fx: 0.25, fy: 0.4 },

  // ================= NEW PINS (Shape Editor export, 2026-08-06) =================
  { name: 'Artist\'s Shack (Limgrave)', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.021, fy: 0.770 },
  { name: 'Minor Erdtree (Mistwood)', category: 'locations', regionId: 'limgrave', layer: 'surface', fx: 1.135, fy: 0.861 },
  { name: 'Minor Erdtree (Caelid)', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.192, fy: 1.355 },
  { name: 'Gael Tunnel', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.174, fy: 1.539 },
  { name: 'Sellia Evergaol', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.411, fy: 1.515 },
  { name: 'Minor Erdtree (Dragonbarrow)', category: 'locations', regionId: 'caelid', layer: 'surface', fx: 0.651, fy: 1.394 },
  { name: 'Boilprawn Shack', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.359, fy: 1.269 },
  { name: 'Slumbering Wolf\'s Shack', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.346, fy: 1.503 },
  { name: 'Chelona\'s Rise', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.072, fy: 1.549 },
  { name: 'Deep Ainsel Well', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.146, fy: 1.466 },
  { name: 'Ringleader\'s Evergaol (custom)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.055, fy: 1.301 },
  { name: 'Carian Study Hall', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.534, fy: 1.043 },
  { name: 'Artist\'s Shack (Liurnia of the Lakes)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.483, fy: 0.986 },
  { name: 'Minor Erdtree (Liurnia Northeast)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.463, fy: 0.594 },
  { name: 'Walking Mausoleum (Liurnia of the lakes)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.418, fy: 0.633 },
  { name: 'Walking Mausoleum (Liurnia of the lakes east)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.387, fy: 0.591 },
  { name: 'Converted Fringe Tower', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.534, fy: 0.529 },
  { name: 'Frenzy-Flaming Tower', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.465, fy: 0.452 },
  { name: 'Testu\'s Rise', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.190, fy: 0.628 },
  { name: 'Academy Crystal Cave', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.152, fy: 0.903 },
  { name: 'Minor Erdtree (Liurnia Southwest)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.070, fy: 1.154 },
  { name: 'Revenger\'s Shack', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.065, fy: 1.037 },
  { name: 'Converted Tower', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.112, fy: 1.245 },
  { name: 'Walking Mausoleum (Liurnia of the central lakes)', category: 'locations', regionId: 'liurnia', layer: 'surface', fx: 0.300, fy: 0.734 },
];
