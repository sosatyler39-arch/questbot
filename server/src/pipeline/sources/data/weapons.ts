import type { ArticlePage } from '../types.js';

// Base-game and Shadow of the Erdtree weapons. Every attack/requirement/
// scaling number comes directly from regulation-vanilla-v1.14.js
// (github.com/ThomasJClark/elden-ring-weapon-calculator, MIT licensed),
// data extracted from the game's own regulation files — not scraped, not
// from model recall. One entry per weapon as found in the world: the
// Standard/uninfused form, or for weapons with a fixed built-in affinity
// (e.g. Bloodhound's Fang), their only form. DLC weapons are tagged
// "Shadow of the Erdtree." per the convention in talismans.ts.
export const WEAPON_PAGES: ArticlePage[] = [
  {
    "title": "Dagger",
    "url": "questbot://guide/weapon/dagger",
    "sections": [
      {
        "heading": "Dagger",
        "text": "74 physical attack. Requires Str 5, Dex 9. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Black Knife",
        "text": "66 physical attack, 65 holy attack. Requires Str 8, Dex 12, Fai 18. Str scaling E, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Parrying Dagger",
        "text": "75 physical attack. Requires Str 5, Dex 14. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Miséricorde",
        "text": "92 physical attack. Requires Str 7, Dex 12. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Reduvia",
        "text": "79 physical attack. Requires Str 5, Dex 13, Arc 13. Str scaling E, Dex scaling D, Arc scaling D."
      },
      {
        "heading": "Crystal Knife",
        "text": "82 physical attack, 53 magic attack. Requires Str 8, Dex 12, Int 9. Str scaling D, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Celebrant's Sickle",
        "text": "79 physical attack. Requires Str 6, Dex 11. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Glintstone Kris",
        "text": "57 physical attack, 68 magic attack. Requires Str 5, Dex 12, Int 16. Str scaling E, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Scorpion's Stinger",
        "text": "79 physical attack. Requires Str 6, Dex 12. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Great Knife",
        "text": "75 physical attack. Requires Str 6, Dex 12. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Wakizashi",
        "text": "94 physical attack. Requires Str 9, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Cinquedea",
        "text": "98 physical attack. Requires Str 10, Dex 10. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Ivory Sickle",
        "text": "60 physical attack, 60 magic attack. Requires Str 6, Dex 11, Int 13. Str scaling E, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Bloodstained Dagger",
        "text": "81 physical attack. Requires Str 9, Dex 12. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Erdsteel Dagger",
        "text": "67 physical attack. Requires Str 7, Dex 12, Fai 14. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Blade of Calling",
        "text": "71 physical attack, 43 holy attack. Requires Str 6, Dex 13, Fai 15. Str scaling D, Dex scaling D, Fai scaling C."
      },
      {
        "heading": "Main-gauche",
        "text": "79 physical attack. Requires Str 7, Dex 15. Str scaling D, Dex scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Fire Knight's Shortsword",
        "text": "75 physical attack, 22 fire attack. Requires Str 8, Dex 13, Fai 12. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Straight Sword",
    "url": "questbot://guide/weapon/straight-sword",
    "sections": [
      {
        "heading": "Longsword",
        "text": "110 physical attack. Requires Str 10, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Short Sword",
        "text": "102 physical attack. Requires Str 8, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Broadsword",
        "text": "117 physical attack. Requires Str 10, Dex 10. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Lordsworn's Straight Sword",
        "text": "115 physical attack. Requires Str 10, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Weathered Straight Sword",
        "text": "103 physical attack. Requires Str 7, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Ornamental Straight Sword",
        "text": "101 physical attack. Requires Str 10, Dex 14. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Golden Epitaph",
        "text": "85 physical attack, 85 holy attack. Requires Str 12, Dex 10, Fai 14. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Coded Sword",
        "text": "85 holy attack. Requires Fai 20. Fai scaling B."
      },
      {
        "heading": "Sword of Night and Flame",
        "text": "87 physical attack, 56 magic attack, 56 fire attack. Requires Str 12, Dex 12, Int 24, Fai 24. Str scaling E, Dex scaling E, Int scaling D, Fai scaling D."
      },
      {
        "heading": "Crystal Sword",
        "text": "106 physical attack, 68 magic attack. Requires Str 13, Dex 10, Int 15. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Carian Knight's Sword",
        "text": "88 physical attack, 88 magic attack. Requires Str 10, Dex 10, Int 18. Str scaling D, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Sword of St. Trina",
        "text": "107 physical attack, 32 magic attack. Requires Str 10, Dex 12, Int 14. Str scaling D, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Miquellan Knight's Sword",
        "text": "105 physical attack, 68 holy attack. Requires Str 11, Dex 11, Fai 16. Str scaling D, Dex scaling D, Fai scaling E."
      },
      {
        "heading": "Cane Sword",
        "text": "96 physical attack. Requires Str 8, Dex 11. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Regalia of Eochaid",
        "text": "89 physical attack, 57 magic attack. Requires Str 12, Dex 18, Arc 15. Str scaling E, Dex scaling D, Arc scaling D."
      },
      {
        "heading": "Noble's Slender Sword",
        "text": "101 physical attack. Requires Str 8, Dex 11. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Warhawk's Talon",
        "text": "101 physical attack. Requires Str 10, Dex 16. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Lazuli Glintstone Sword",
        "text": "79 physical attack, 94 magic attack. Requires Str 8, Dex 9, Int 13. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Rotten Crystal Sword",
        "text": "102 physical attack, 66 magic attack. Requires Str 13, Dex 10, Int 15. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Velvet Sword of St. Trina",
        "text": "95 physical attack, 61 magic attack. Requires Str 10, Dex 12, Int 14. Str scaling E, Dex scaling D, Int scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Stone-Sheathed Sword",
        "text": "89 physical attack. Requires Str 16, Dex 8. Str scaling C, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Sword of Light",
        "text": "93 physical attack, 93 holy attack. Requires Str 14, Dex 11, Fai 24. Str scaling D, Dex scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Sword of Darkness",
        "text": "93 physical attack, 93 holy attack. Requires Str 14, Dex 11, Fai 24. Str scaling D, Dex scaling E, Fai scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Greatsword",
    "url": "questbot://guide/weapon/greatsword",
    "sections": [
      {
        "heading": "Inseparable Sword",
        "text": "98 physical attack, 98 holy attack. Requires Str 18, Dex 18, Fai 20. Str scaling D, Dex scaling D, Fai scaling C."
      },
      {
        "heading": "Bastard Sword",
        "text": "138 physical attack. Requires Str 16, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Forked Greatsword",
        "text": "124 physical attack. Requires Str 14, Dex 16. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Iron Greatsword",
        "text": "149 physical attack. Requires Str 18, Dex 10. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Lordsworn's Greatsword",
        "text": "136 physical attack. Requires Str 16, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Knight's Greatsword",
        "text": "141 physical attack. Requires Str 16, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Flamberge",
        "text": "129 physical attack. Requires Str 15, Dex 14. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Ordovis's Greatsword",
        "text": "107 physical attack, 69 holy attack. Requires Str 25, Dex 13, Fai 15. Str scaling C, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Alabaster Lord's Sword",
        "text": "128 physical attack, 38 magic attack. Requires Str 16, Dex 12, Int 18. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Banished Knight's Greatsword",
        "text": "142 physical attack. Requires Str 17, Dex 9. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Dark Moon Greatsword",
        "text": "82 physical attack, 98 magic attack. Requires Str 16, Dex 11, Int 38. Str scaling D, Dex scaling D, Int scaling C."
      },
      {
        "heading": "Sacred Relic Sword",
        "text": "118 physical attack, 76 holy attack. Requires Str 14, Dex 24, Fai 22. Str scaling E, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Helphen's Steeple",
        "text": "101 physical attack, 101 magic attack. Requires Str 19, Dex 10, Int 22. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Blasphemous Blade",
        "text": "121 physical attack, 78 fire attack. Requires Str 22, Dex 15, Fai 21. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Marais Executioner's Sword",
        "text": "94 physical attack, 61 magic attack. Requires Str 24, Dex 14, Arc 23. Str scaling C, Dex scaling E, Arc scaling D."
      },
      {
        "heading": "Sword of Milos",
        "text": "141 physical attack. Requires Str 15, Dex 19. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Golden Order Greatsword",
        "text": "86 physical attack, 103 holy attack. Requires Str 16, Dex 21, Fai 28. Str scaling E, Dex scaling D, Fai scaling C."
      },
      {
        "heading": "Claymore",
        "text": "138 physical attack. Requires Str 16, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Gargoyle's Greatsword",
        "text": "133 physical attack. Requires Str 18, Dex 10. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Death's Poker",
        "text": "123 physical attack, 36 magic attack. Requires Str 15, Dex 17, Int 11. Str scaling D, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Gargoyle's Blackblade",
        "text": "102 physical attack, 122 holy attack. Requires Str 18, Dex 10, Fai 22. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Greatsword of Damnation",
        "text": "123 physical attack, 79 holy attack. Requires Str 20, Dex 15, Fai 20. Str scaling D, Dex scaling E, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Lizard Greatsword",
        "text": "140 physical attack. Requires Str 12, Dex 14. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Greatsword of Solitude",
        "text": "120 physical attack. Requires Str 27, Dex 13. Str scaling B, Dex scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Colossal Sword",
    "url": "questbot://guide/weapon/colossal-sword",
    "sections": [
      {
        "heading": "Greatsword",
        "text": "164 physical attack. Requires Str 31, Dex 12. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Watchdog's Greatsword",
        "text": "142 physical attack. Requires Str 30, Dex 10. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Maliketh's Black Blade",
        "text": "127 physical attack, 82 holy attack. Requires Str 34, Dex 12, Fai 20. Str scaling C, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Troll's Golden Sword",
        "text": "155 physical attack. Requires Str 29, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Zweihander",
        "text": "141 physical attack. Requires Str 19, Dex 11. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Starscourge Greatsword",
        "text": "129 physical attack, 83 magic attack. Requires Str 38, Dex 12, Int 15. Str scaling D, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Royal Greatsword",
        "text": "112 physical attack, 134 magic attack. Requires Str 26, Dex 18, Int 22. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Godslayer's Greatsword",
        "text": "119 physical attack, 77 fire attack. Requires Str 20, Dex 22, Fai 20. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Ruins Greatsword",
        "text": "124 physical attack, 37 magic attack. Requires Str 50, Int 16. Str scaling B, Int scaling E."
      },
      {
        "heading": "Grafted Blade Greatsword",
        "text": "162 physical attack. Requires Str 40, Dex 14. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Troll Knight's Sword",
        "text": "124 physical attack, 80 magic attack. Requires Str 20, Dex 14, Int 18. Str scaling D, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Ancient Meteoric Ore Greatsword",
        "text": "154 physical attack, 46 magic attack. Requires Str 35, Dex 10, Arc 19. Str scaling D, Dex scaling E, Arc scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Fire Knight's Greatsword",
        "text": "147 physical attack, 44 fire attack. Requires Str 22, Dex 18, Fai 12. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Greatsword of Radahn (Lord)",
        "text": "127 physical attack, 82 magic attack. Requires Str 32, Dex 24, Int 15. Str scaling D, Dex scaling D, Int scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Moonrithyll's Knight Sword",
        "text": "124 physical attack, 80 magic attack. Requires Str 20, Dex 14, Int 18. Str scaling D, Dex scaling D, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Greatsword of Radahn (Light)",
        "text": "127 physical attack, 82 magic attack. Requires Str 32, Dex 24, Int 15. Str scaling D, Dex scaling D, Int scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Curved Sword",
    "url": "questbot://guide/weapon/curved-sword",
    "sections": [
      {
        "heading": "Nox Flowing Sword",
        "text": "112 physical attack. Requires Str 8, Dex 15. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Falchion",
        "text": "109 physical attack. Requires Str 9, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Beastman's Curved Sword",
        "text": "113 physical attack. Requires Str 13, Dex 11. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Shotel",
        "text": "96 physical attack. Requires Str 9, Dex 19. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Shamshir",
        "text": "108 physical attack. Requires Str 7, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Bandit's Curved Sword",
        "text": "118 physical attack. Requires Str 11, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Magma Blade",
        "text": "96 physical attack, 62 fire attack. Requires Str 9, Dex 15, Fai 16. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Flowing Curved Sword",
        "text": "109 physical attack. Requires Str 9, Dex 17. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Wing of Astel",
        "text": "65 physical attack, 78 magic attack. Requires Str 7, Dex 17, Int 20. Str scaling E, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Scavenger's Curved Sword",
        "text": "105 physical attack. Requires Str 9, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Eclipse Shotel",
        "text": "77 physical attack, 77 holy attack. Requires Str 10, Dex 25, Fai 30. Str scaling E, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Serpent-God's Curved Sword",
        "text": "113 physical attack. Requires Str 13, Dex 9. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Mantis Blade",
        "text": "112 physical attack. Requires Str 10, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Scimitar",
        "text": "106 physical attack. Requires Str 7, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Grossmesser",
        "text": "115 physical attack. Requires Str 14, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Spirit Sword",
        "text": "92 physical attack, 59 magic attack. Requires Str 8, Dex 16, Int 16. Str scaling E, Dex scaling D, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Falx",
        "text": "107 physical attack. Requires Str 12, Dex 15. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Dancing Blade of Ranah",
        "text": "88 physical attack. Requires Str 9, Dex 20. Dex scaling B. Shadow of the Erdtree."
      },
      {
        "heading": "Horned Warrior's Sword",
        "text": "108 physical attack. Requires Str 11, Dex 14, Fai 14. Str scaling D, Dex scaling D, Fai scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Curved Greatsword",
    "url": "questbot://guide/weapon/curved-greatsword",
    "sections": [
      {
        "heading": "Onyx Lord's Greatsword",
        "text": "118 physical attack, 76 magic attack. Requires Str 20, Dex 16, Int 16. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Dismounter",
        "text": "138 physical attack. Requires Str 19, Dex 16. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Bloodhound's Fang",
        "text": "141 physical attack. Requires Str 18, Dex 17. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Magma Wyrm's Scalesword",
        "text": "114 physical attack, 74 fire attack. Requires Str 24, Dex 15, Fai 18. Str scaling C, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Zamor Curved Sword",
        "text": "130 physical attack. Requires Str 16, Dex 18. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Omen Cleaver",
        "text": "142 physical attack. Requires Str 19, Dex 16. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Monk's Flameblade",
        "text": "134 physical attack. Requires Str 18, Dex 18. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Beastman's Cleaver",
        "text": "143 physical attack. Requires Str 25, Dex 14. Str scaling C."
      },
      {
        "heading": "Morgott's Cursed Sword",
        "text": "120 physical attack. Requires Str 14, Dex 35, Arc 17. Str scaling E, Dex scaling C, Arc scaling D."
      },
      {
        "heading": "Freyja's Greatsword",
        "text": "146 physical attack. Requires Str 25, Dex 14. Str scaling C, Dex scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Horned Warrior's Greatsword",
        "text": "130 physical attack. Requires Str 19, Dex 16, Fai 13. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Katana",
    "url": "questbot://guide/weapon/katana",
    "sections": [
      {
        "heading": "Star-Lined Sword",
        "text": "82 physical attack, 82 magic attack. Requires Str 10, Dex 23, Int 21. Str scaling E, Dex scaling C, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Uchigatana",
        "text": "115 physical attack. Requires Str 11, Dex 15. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Nagakiba",
        "text": "115 physical attack. Requires Str 18, Dex 22. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Hand of Malenia",
        "text": "117 physical attack. Requires Str 16, Dex 48. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Meteoric Ore Blade",
        "text": "112 physical attack, 72 magic attack. Requires Str 15, Dex 14, Int 18. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Rivers of Blood",
        "text": "76 physical attack, 76 fire attack. Requires Str 12, Dex 18, Arc 20. Str scaling E, Dex scaling D, Arc scaling D."
      },
      {
        "heading": "Moonveil",
        "text": "73 physical attack, 87 magic attack. Requires Str 12, Dex 18, Int 23. Str scaling E, Dex scaling D, Int scaling C."
      },
      {
        "heading": "Dragonscale Blade",
        "text": "110 physical attack. Requires Str 12, Dex 20. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Serpentbone Blade",
        "text": "120 physical attack. Requires Str 11, Dex 22. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Sword of Night",
        "text": "110 physical attack, 33 magic attack. Requires Str 11, Dex 20. Dex scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Twinblade",
    "url": "questbot://guide/weapon/twinblade",
    "sections": [
      {
        "heading": "Twinblade",
        "text": "119 physical attack. Requires Str 10, Dex 18. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Godskin Peeler",
        "text": "121 physical attack. Requires Str 17, Dex 22. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Twinned Knight Swords",
        "text": "122 physical attack. Requires Str 16, Dex 18. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Eleonora's Poleblade",
        "text": "72 physical attack, 72 fire attack. Requires Str 12, Dex 21, Arc 19. Str scaling E, Dex scaling D, Arc scaling D."
      },
      {
        "heading": "Gargoyle's Twinblade",
        "text": "123 physical attack. Requires Str 18, Dex 15. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Gargoyle's Black Blades",
        "text": "81 physical attack, 97 holy attack. Requires Str 18, Dex 15, Fai 22. Str scaling C, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Euporia",
        "text": "84 physical attack, 100 holy attack. Requires Str 16, Dex 16, Fai 24. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Black Steel Twinblade",
        "text": "112 physical attack, 33 holy attack. Requires Str 18, Dex 15, Fai 13. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Thrusting Sword",
    "url": "questbot://guide/weapon/thrusting-sword",
    "sections": [
      {
        "heading": "Carian Sorcery Sword",
        "text": "69 physical attack, 69 magic attack. Requires Str 10, Dex 19, Int 16. Str scaling E, Dex scaling D, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Estoc",
        "text": "107 physical attack. Requires Str 11, Dex 13. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Cleanrot Knight's Sword",
        "text": "109 physical attack. Requires Str 11, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Rapier",
        "text": "96 physical attack. Requires Str 7, Dex 12. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Rogier's Rapier",
        "text": "93 physical attack. Requires Str 8, Dex 17. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Antspur Rapier",
        "text": "98 physical attack. Requires Str 10, Dex 20. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Frozen Needle",
        "text": "99 physical attack. Requires Str 11, Dex 18. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Noble's Estoc",
        "text": "104 physical attack. Requires Str 9, Dex 10. Str scaling D, Dex scaling D."
      }
    ]
  },
  {
    "title": "Heavy Thrusting Sword",
    "url": "questbot://guide/weapon/heavy-thrusting-sword",
    "sections": [
      {
        "heading": "Sword Lance",
        "text": "132 physical attack. Requires Str 21, Dex 11. Str scaling C, Dex scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Bloody Helice",
        "text": "121 physical attack. Requires Str 16, Dex 19, Arc 17. Str scaling E, Dex scaling D, Arc scaling D."
      },
      {
        "heading": "Godskin Stitcher",
        "text": "127 physical attack. Requires Str 14, Dex 17. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Great Épée",
        "text": "124 physical attack. Requires Str 15, Dex 16. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Dragon King's Cragblade",
        "text": "92 physical attack, 59 lightning attack. Requires Str 18, Dex 37. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Queelign's Greatsword",
        "text": "122 physical attack, 36 fire attack. Requires Str 14, Dex 18, Fai 12. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Axe",
    "url": "questbot://guide/weapon/axe",
    "sections": [
      {
        "heading": "Battle Axe",
        "text": "128 physical attack. Requires Str 12, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Forked Hatchet",
        "text": "113 physical attack. Requires Str 9, Dex 14. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Hand Axe",
        "text": "117 physical attack. Requires Str 9, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Jawbone Axe",
        "text": "130 physical attack. Requires Str 14, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Iron Cleaver",
        "text": "125 physical attack. Requires Str 15, Dex 7. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Ripple Blade",
        "text": "75 physical attack. Requires Str 11, Dex 11, Arc 20. Arc scaling A."
      },
      {
        "heading": "Celebrant's Cleaver",
        "text": "125 physical attack. Requires Str 12, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Icerind Hatchet",
        "text": "115 physical attack. Requires Str 11, Dex 16. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Highland Axe",
        "text": "128 physical attack. Requires Str 12, Dex 9. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Sacrificial Axe",
        "text": "133 physical attack. Requires Str 16, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Rosus' Axe",
        "text": "112 physical attack, 72 magic attack. Requires Str 18, Dex 10, Int 18. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Stormhawk Axe",
        "text": "136 physical attack. Requires Str 19, Dex 15. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Smithscript Axe",
        "text": "131 physical attack. Requires Str 13, Dex 10, Int 11, Fai 11. Str scaling D, Dex scaling D, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Death Knight's Twin Axes",
        "text": "101 physical attack, 65 lightning attack. Requires Str 14, Dex 12, Fai 16. Str scaling D, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Messmer Soldier's Axe",
        "text": "133 physical attack. Requires Str 14, Dex 10. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Forked-Tongue Hatchet",
        "text": "125 physical attack. Requires Str 10, Dex 13. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Warped Axe",
        "text": "124 physical attack. Requires Str 24, Dex 8. Str scaling C."
      }
    ]
  },
  {
    "title": "Greataxe",
    "url": "questbot://guide/weapon/greataxe",
    "sections": [
      {
        "heading": "Putrescence Cleaver",
        "text": "141 physical attack, 42 magic attack. Requires Str 28, Dex 10, Arc 15. Str scaling D, Dex scaling E, Arc scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Greataxe",
        "text": "151 physical attack. Requires Str 30, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Great Omenkiller Cleaver",
        "text": "142 physical attack. Requires Str 23, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Crescent Moon Axe",
        "text": "146 physical attack. Requires Str 25, Dex 15. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Axe of Godrick",
        "text": "142 physical attack. Requires Str 34, Dex 22. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Longhaft Axe",
        "text": "146 physical attack. Requires Str 24, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Rusted Anchor",
        "text": "147 physical attack. Requires Str 26, Dex 9. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Executioner's Greataxe",
        "text": "150 physical attack. Requires Str 34, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Winged Greathorn",
        "text": "130 physical attack. Requires Str 30, Dex 20. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Butchering Knife",
        "text": "134 physical attack. Requires Str 16, Dex 20. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Gargoyle's Great Axe",
        "text": "123 physical attack. Requires Str 24, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Gargoyle's Black Axe",
        "text": "100 physical attack, 120 holy attack. Requires Str 24, Dex 8, Fai 22. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Death Knight's Longhaft Axe",
        "text": "113 physical attack, 73 lightning attack. Requires Str 23, Dex 10, Fai 18. Str scaling D, Dex scaling E, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Bonny Butchering Knife",
        "text": "134 physical attack. Requires Str 16, Dex 20. Str scaling C, Dex scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Hammer",
    "url": "questbot://guide/weapon/hammer",
    "sections": [
      {
        "heading": "Mace",
        "text": "115 physical attack. Requires Str 12, Dex 7. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Club",
        "text": "103 physical attack. Requires Str 10. Str scaling C."
      },
      {
        "heading": "Curved Club",
        "text": "114 physical attack. Requires Str 11, Dex 7. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Warpick",
        "text": "108 physical attack. Requires Str 11, Dex 9. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Morning Star",
        "text": "118 physical attack. Requires Str 12, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Varré's Bouquet",
        "text": "46 physical attack. Requires Str 8, Dex 16, Arc 24. Str scaling E, Dex scaling D, Arc scaling C."
      },
      {
        "heading": "Spiked Club",
        "text": "114 physical attack. Requires Str 12, Dex 7. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Hammer",
        "text": "124 physical attack. Requires Str 14, Dex 7. Str scaling C, Dex scaling D."
      },
      {
        "heading": "Monk's Flamemace",
        "text": "126 physical attack. Requires Str 13, Dex 13. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Envoy's Horn",
        "text": "96 physical attack, 62 holy attack. Requires Str 10, Dex 12, Fai 16. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Scepter of the All-Knowing",
        "text": "99 physical attack, 64 magic attack. Requires Str 12, Dex 18, Int 21. Str scaling E, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Nox Flowing Hammer",
        "text": "122 physical attack. Requires Str 17, Dex 7. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Ringed Finger",
        "text": "121 physical attack. Requires Str 15, Dex 9. Str scaling C, Dex scaling D."
      },
      {
        "heading": "Stone Club",
        "text": "122 physical attack. Requires Str 16, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Marika's Hammer",
        "text": "101 physical attack, 65 holy attack. Requires Str 20, Dex 12, Fai 19. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Flowerstone Gavel",
        "text": "121 physical attack. Requires Str 14, Dex 8, Arc 15. Str scaling D, Dex scaling D, Arc scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Great Hammer",
    "url": "questbot://guide/weapon/great-hammer",
    "sections": [
      {
        "heading": "Large Club",
        "text": "131 physical attack. Requires Str 22. Str scaling C."
      },
      {
        "heading": "Greathorn Hammer",
        "text": "134 physical attack. Requires Str 22, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Battle Hammer",
        "text": "131 physical attack. Requires Str 26, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Great Mace",
        "text": "134 physical attack. Requires Str 28. Str scaling C."
      },
      {
        "heading": "Curved Great Club",
        "text": "145 physical attack. Requires Str 24, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Celebrant's Skull",
        "text": "138 physical attack. Requires Str 18, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Pickaxe",
        "text": "144 physical attack. Requires Str 22, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Beastclaw Greathammer",
        "text": "116 physical attack, 75 holy attack. Requires Str 20, Dex 10, Fai 18. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Envoy's Long Horn",
        "text": "120 physical attack, 78 holy attack. Requires Str 23, Dex 11, Fai 18. Str scaling D, Dex scaling D, Fai scaling C."
      },
      {
        "heading": "Cranial Vessel Candlestand",
        "text": "98 physical attack, 98 fire attack. Requires Str 26, Dex 8, Fai 22. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Great Stars",
        "text": "135 physical attack. Requires Str 22, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Brick Hammer",
        "text": "122 physical attack. Requires Str 31. Str scaling B."
      },
      {
        "heading": "Devourer's Scepter",
        "text": "112 physical attack, 69 fire attack. Requires Str 24, Dex 20, Fai 25. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Rotten Battle Hammer",
        "text": "126 physical attack. Requires Str 26, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Smithscript Greathammer",
        "text": "141 physical attack. Requires Str 20, Dex 10, Int 11, Fai 11. Str scaling D, Dex scaling E, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Black Steel Greathammer",
        "text": "140 physical attack, 42 holy attack. Requires Str 25, Dex 11, Fai 17. Str scaling C, Dex scaling E, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Flail",
    "url": "questbot://guide/weapon/flail",
    "sections": [
      {
        "heading": "Nightrider Flail",
        "text": "115 physical attack. Requires Str 10, Dex 24. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Flail",
        "text": "112 physical attack. Requires Str 10, Dex 18. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Family Heads",
        "text": "90 physical attack, 58 magic attack. Requires Str 8, Dex 18, Int 16. Str scaling E, Dex scaling C, Int scaling E."
      },
      {
        "heading": "Bastard's Stars",
        "text": "68 physical attack, 81 magic attack. Requires Str 8, Dex 22, Int 22. Str scaling E, Dex scaling D, Int scaling C."
      },
      {
        "heading": "Chainlink Flail",
        "text": "112 physical attack. Requires Str 18, Dex 12. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Serpent Flail",
        "text": "77 physical attack, 92 fire attack. Requires Str 10, Dex 24, Fai 21. Str scaling E, Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Spear",
    "url": "questbot://guide/weapon/spear",
    "sections": [
      {
        "heading": "Short Spear",
        "text": "112 physical attack. Requires Str 10, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Spear",
        "text": "114 physical attack. Requires Str 12, Dex 15. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Crystal Spear",
        "text": "110 physical attack, 33 magic attack. Requires Str 10, Dex 16, Int 16. Str scaling E, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Clayman's Harpoon",
        "text": "99 physical attack, 64 magic attack. Requires Str 12, Dex 10, Int 12. Str scaling D, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Cleanrot Spear",
        "text": "102 physical attack, 66 holy attack. Requires Str 16, Dex 16, Fai 14. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Partisan",
        "text": "123 physical attack. Requires Str 15, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Celebrant's Rib-Rake",
        "text": "109 physical attack. Requires Str 8, Dex 14. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Pike",
        "text": "115 physical attack. Requires Str 20, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Torchpole",
        "text": "104 physical attack, 31 fire attack. Requires Str 14, Dex 15. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Bolt of Gransax",
        "text": "98 physical attack, 63 lightning attack. Requires Str 20, Dex 40. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Cross-Naginata",
        "text": "122 physical attack. Requires Str 16, Dex 20. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Death Ritual Spear",
        "text": "99 physical attack, 64 magic attack. Requires Str 14, Dex 20, Int 18. Str scaling E, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Inquisitor's Girandole",
        "text": "102 physical attack, 66 fire attack. Requires Str 18, Dex 15, Fai 16. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Spiked Spear",
        "text": "120 physical attack. Requires Str 14, Dex 16. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Iron Spear",
        "text": "114 physical attack. Requires Str 13, Dex 11. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Rotten Crystal Spear",
        "text": "104 physical attack, 31 magic attack. Requires Str 10, Dex 16, Int 16. Str scaling E, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Smithscript Spear",
        "text": "107 physical attack. Requires Str 9, Dex 12, Int 11, Fai 11. Str scaling D, Dex scaling D, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Swift Spear",
        "text": "99 physical attack. Requires Str 10, Dex 26. Dex scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Bloodfiend's Fork",
        "text": "103 physical attack. Requires Str 14, Dex 8, Arc 13. Str scaling D, Dex scaling E, Arc scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Great Spear",
    "url": "questbot://guide/weapon/great-spear",
    "sections": [
      {
        "heading": "Bloodfiend's Sacred Spear",
        "text": "115 physical attack. Requires Str 22, Dex 12, Arc 13. Str scaling E, Dex scaling E, Arc scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Mohgwyn's Sacred Spear",
        "text": "96 physical attack, 62 fire attack. Requires Str 24, Dex 14, Arc 27. Str scaling D, Dex scaling E, Arc scaling D."
      },
      {
        "heading": "Siluria's Tree",
        "text": "90 physical attack, 90 holy attack. Requires Str 27, Dex 13, Fai 20. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Serpent-Hunter",
        "text": "111 physical attack. No stat requirements. Str scaling B, Dex scaling E."
      },
      {
        "heading": "Vyke's War Spear",
        "text": "103 physical attack, 66 fire attack. Requires Str 16, Dex 20, Fai 18. Str scaling E, Dex scaling C, Fai scaling D."
      },
      {
        "heading": "Lance",
        "text": "123 physical attack. Requires Str 20, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Treespear",
        "text": "122 physical attack, 79 holy attack. Requires Str 15, Dex 22, Fai 18. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Spear of the Impaler",
        "text": "85 physical attack, 102 fire attack. Requires Str 14, Dex 35, Fai 18. Str scaling E, Dex scaling C, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Messmer Soldier's Spear",
        "text": "122 physical attack. Requires Str 19, Dex 16. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Barbed Staff-Spear",
        "text": "86 physical attack, 86 holy attack. Requires Str 14, Dex 18, Fai 22. Str scaling E, Dex scaling E, Fai scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Halberd",
    "url": "questbot://guide/weapon/halberd",
    "sections": [
      {
        "heading": "Halberd",
        "text": "125 physical attack. Requires Str 14, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Pest's Glaive",
        "text": "120 physical attack. Requires Str 13, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Lucerne",
        "text": "121 physical attack. Requires Str 15, Dex 12. Str scaling D, Dex scaling C."
      },
      {
        "heading": "Banished Knight's Halberd",
        "text": "125 physical attack. Requires Str 14, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Commander's Standard",
        "text": "138 physical attack. Requires Str 24, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Nightrider Glaive",
        "text": "129 physical attack. Requires Str 26, Dex 10. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Ripple Crescent Halberd",
        "text": "86 physical attack. Requires Str 12, Dex 12, Arc 20. Arc scaling B."
      },
      {
        "heading": "Vulgar Militia Saw",
        "text": "126 physical attack. Requires Str 15, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Golden Halberd",
        "text": "134 physical attack, 87 holy attack. Requires Str 30, Dex 14, Fai 12. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Glaive",
        "text": "132 physical attack. Requires Str 18, Dex 15. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Loretta's War Sickle",
        "text": "110 physical attack, 71 magic attack. Requires Str 20, Dex 15, Int 20. Str scaling D, Dex scaling D, Int scaling D."
      },
      {
        "heading": "Guardian's Swordspear",
        "text": "139 physical attack. Requires Str 17, Dex 16. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Vulgar Militia Shotel",
        "text": "121 physical attack. Requires Str 14, Dex 16. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Dragon Halberd",
        "text": "135 physical attack. Requires Str 22, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Gargoyle's Halberd",
        "text": "131 physical attack. Requires Str 26, Dex 10. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Gargoyle's Black Halberd",
        "text": "103 physical attack, 123 holy attack. Requires Str 26, Dex 10, Fai 22. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Spirit Glaive",
        "text": "121 physical attack, 36 magic attack. Requires Str 14, Dex 17, Int 16. Str scaling D, Dex scaling D, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Poleblade of the Bud",
        "text": "131 physical attack. Requires Str 14, Dex 22, Arc 20. Str scaling E, Dex scaling D, Arc scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Reaper",
    "url": "questbot://guide/weapon/reaper",
    "sections": [
      {
        "heading": "Scythe",
        "text": "125 physical attack. Requires Str 14, Dex 14. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Grave Scythe",
        "text": "144 physical attack. Requires Str 17, Dex 13. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Halo Scythe",
        "text": "118 physical attack, 76 holy attack. Requires Str 13, Dex 16, Fai 15. Str scaling D, Dex scaling D, Fai scaling E."
      },
      {
        "heading": "Winged Scythe",
        "text": "87 physical attack, 104 holy attack. Requires Str 16, Dex 16, Fai 24. Str scaling E, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Obsidian Lamina",
        "text": "120 physical attack. Requires Str 12, Dex 25, Arc 17. Str scaling E, Dex scaling C, Arc scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Fist",
    "url": "questbot://guide/weapon/fist",
    "sections": [
      {
        "heading": "Unarmed",
        "text": "20 physical attack. No stat requirements. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Caestus",
        "text": "90 physical attack. Requires Str 8, Dex 8. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Spiked Caestus",
        "text": "91 physical attack. Requires Str 8, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Grafted Dragon",
        "text": "89 physical attack, 57 fire attack. Requires Str 20, Dex 14, Fai 16. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Iron Ball",
        "text": "101 physical attack. Requires Str 11, Dex 8. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Star Fist",
        "text": "105 physical attack. Requires Str 12, Dex 8. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Katar",
        "text": "97 physical attack. Requires Str 8, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Clinging Bone",
        "text": "80 physical attack, 24 magic attack. Requires Str 8, Dex 22, Arc 16. Str scaling E, Dex scaling C, Arc scaling D."
      },
      {
        "heading": "Veteran's Prosthesis",
        "text": "83 physical attack, 53 lightning attack. Requires Str 15, Dex 12. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Cipher Pata",
        "text": "85 holy attack. Requires Fai 30. Fai scaling C."
      },
      {
        "heading": "Thiollier's Hidden Needle",
        "text": "70 physical attack, 45 magic attack. Requires Str 10, Dex 22, Int 15. Str scaling E, Dex scaling C, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Pata",
        "text": "104 physical attack. Requires Str 11, Dex 15. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Poisoned Hand",
        "text": "76 physical attack. Requires Str 8, Dex 8, Arc 28. Str scaling E, Arc scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Madding Hand",
        "text": "53 physical attack, 63 fire attack. Requires Str 8, Dex 8, Int 13, Fai 20. Str scaling D, Dex scaling E, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Golem Fist",
        "text": "110 physical attack. Requires Str 24, Dex 8, Int 11, Fai 11. Str scaling C, Dex scaling E, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Claw",
    "url": "questbot://guide/weapon/claw",
    "sections": [
      {
        "heading": "Hookclaws",
        "text": "93 physical attack. Requires Str 8, Dex 14. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Venomous Fang",
        "text": "97 physical attack. Requires Str 9, Dex 9. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Bloodhound Claws",
        "text": "99 physical attack. Requires Str 10, Dex 15. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Raptor Talons",
        "text": "86 physical attack. Requires Str 6, Dex 14. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Claws of Night",
        "text": "79 physical attack, 51 magic attack. Requires Str 8, Dex 20. Dex scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Whip",
    "url": "questbot://guide/weapon/whip",
    "sections": [
      {
        "heading": "Whip",
        "text": "103 physical attack. Requires Str 8, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Thorned Whip",
        "text": "105 physical attack. Requires Str 8, Dex 16. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Magma Whip Candlestick",
        "text": "74 physical attack, 74 fire attack. Requires Str 8, Dex 16, Fai 18. Str scaling E, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Hoslow's Petal Whip",
        "text": "113 physical attack. Requires Str 10, Dex 20. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Giant's Red Braid",
        "text": "84 physical attack, 54 fire attack. Requires Str 18, Dex 12, Fai 21. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Urumi",
        "text": "101 physical attack. Requires Str 10, Dex 19. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Tooth Whip",
        "text": "109 physical attack. Requires Str 10, Dex 24. Str scaling E, Dex scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Colossal Weapon",
    "url": "questbot://guide/weapon/colossal-weapon",
    "sections": [
      {
        "heading": "Anvil Hammer",
        "text": "131 physical attack, 85 fire attack. Requires Str 39, Dex 10, Int 11, Fai 20. Str scaling C, Dex scaling E, Int scaling E, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Bloodfiend's Arm",
        "text": "147 physical attack. Requires Str 28, Dex 11, Arc 16. Str scaling D, Dex scaling E, Arc scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Prelate's Inferno Crozier",
        "text": "156 physical attack. Requires Str 45, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Watchdog's Staff",
        "text": "165 physical attack. Requires Str 34, Dex 10. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Great Club",
        "text": "154 physical attack, 46 holy attack. Requires Str 35. Str scaling C, Fai scaling E."
      },
      {
        "heading": "Envoy's Greathorn",
        "text": "121 physical attack, 78 holy attack. Requires Str 28, Dex 12, Fai 24. Str scaling D, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Duelist Greataxe",
        "text": "170 physical attack. Requires Str 30, Dex 10. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Axe of Godfrey",
        "text": "165 physical attack. Requires Str 42, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Dragon Greatclaw",
        "text": "120 physical attack, 78 lightning attack. Requires Str 30, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Staff of the Avatar",
        "text": "113 physical attack, 73 holy attack. Requires Str 34, Dex 8, Fai 24. Str scaling C, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Fallingstar Beast Jaw",
        "text": "131 physical attack, 85 magic attack. Requires Str 34, Dex 12, Int 20. Str scaling D, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Ghiza's Wheel",
        "text": "156 physical attack. Requires Str 28, Dex 18. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Giant-Crusher",
        "text": "155 physical attack. Requires Str 60. Str scaling C."
      },
      {
        "heading": "Golem's Halberd",
        "text": "158 physical attack. Requires Str 36, Dex 14. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Troll's Hammer",
        "text": "153 physical attack, 45 fire attack. Requires Str 28, Dex 8, Fai 10. Str scaling C, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Rotten Staff",
        "text": "165 physical attack. Requires Str 34, Dex 8. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Rotten Greataxe",
        "text": "162 physical attack. Requires Str 30, Dex 10. Str scaling E, Dex scaling C."
      },
      {
        "heading": "Devonia's Hammer",
        "text": "147 physical attack, 44 holy attack. Requires Str 30, Dex 13, Fai 19. Str scaling C, Dex scaling E, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Shadow Sunflower Blossom",
        "text": "114 physical attack, 114 holy attack. Requires Str 24, Dex 8, Fai 25. Str scaling D, Dex scaling E, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Gazing Finger",
        "text": "133 physical attack, 86 magic attack. Requires Str 20, Dex 8, Int 20, Fai 14. Str scaling C, Int scaling D, Fai scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Light Bow",
    "url": "questbot://guide/weapon/light-bow",
    "sections": [
      {
        "heading": "Shortbow",
        "text": "65 physical attack. Requires Str 8, Dex 10. Str scaling E, Dex scaling E."
      },
      {
        "heading": "Misbegotten Shortbow",
        "text": "68 physical attack. Requires Str 16, Dex 8. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Red Branch Shortbow",
        "text": "65 physical attack. Requires Str 8, Dex 16. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Harp Bow",
        "text": "62 physical attack. Requires Str 9, Dex 9. Str scaling E, Dex scaling E."
      },
      {
        "heading": "Composite Bow",
        "text": "65 physical attack. Requires Str 15, Dex 15. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Bone Bow",
        "text": "66 physical attack. Requires Str 8, Dex 11. Str scaling E, Dex scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Bow",
    "url": "questbot://guide/weapon/bow",
    "sections": [
      {
        "heading": "Longbow",
        "text": "80 physical attack. Requires Str 9, Dex 14. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Albinauric Bow",
        "text": "82 physical attack. Requires Str 7, Dex 18. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Horn Bow",
        "text": "65 physical attack, 30 magic attack. Requires Str 10, Dex 14, Int 12. Str scaling E, Dex scaling D, Int scaling E."
      },
      {
        "heading": "Erdtree Bow",
        "text": "40 physical attack, 50 holy attack. Requires Str 8, Dex 12, Fai 14. Str scaling E, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Serpent Bow",
        "text": "75 physical attack. Requires Str 8, Dex 15, Arc 11. Str scaling E, Dex scaling D, Arc scaling D."
      },
      {
        "heading": "Pulley Bow",
        "text": "77 physical attack. Requires Str 11, Dex 11. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Black Bow",
        "text": "70 physical attack. Requires Str 9, Dex 20. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Ansbach's Longbow",
        "text": "74 physical attack. Requires Str 9, Dex 43. Str scaling E, Dex scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Greatbow",
    "url": "questbot://guide/weapon/greatbow",
    "sections": [
      {
        "heading": "Lion Greatbow",
        "text": "120 physical attack. Requires Str 22, Dex 18. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Golem Greatbow",
        "text": "130 physical attack. Requires Str 24, Dex 18. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Erdtree Greatbow",
        "text": "60 physical attack, 65 holy attack. Requires Str 20, Dex 14, Fai 14. Str scaling E, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Greatbow",
        "text": "125 physical attack. Requires Str 20, Dex 20. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Igon's Greatbow",
        "text": "120 physical attack. Requires Str 23, Dex 16. Str scaling D, Dex scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Crossbow",
    "url": "questbot://guide/weapon/crossbow",
    "sections": [
      {
        "heading": "Soldier's Crossbow",
        "text": "60 physical attack. Requires Str 10, Dex 8."
      },
      {
        "heading": "Light Crossbow",
        "text": "65 physical attack. Requires Str 12, Dex 8."
      },
      {
        "heading": "Heavy Crossbow",
        "text": "72 physical attack. Requires Str 14, Dex 10."
      },
      {
        "heading": "Pulley Crossbow",
        "text": "65 physical attack. Requires Str 16, Dex 16."
      },
      {
        "heading": "Full Moon Crossbow",
        "text": "50 physical attack, 50 magic attack. Requires Str 10, Dex 10, Int 14."
      },
      {
        "heading": "Arbalest",
        "text": "77 physical attack. Requires Str 18, Dex 12."
      },
      {
        "heading": "Crepus's Black-Key Crossbow",
        "text": "68 physical attack. Requires Str 14, Dex 16."
      },
      {
        "heading": "Repeating Crossbow",
        "text": "74 physical attack. Requires Str 13, Dex 15. Shadow of the Erdtree."
      },
      {
        "heading": "Spread Crossbow",
        "text": "68 physical attack. Requires Str 11, Dex 17. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Ballista",
    "url": "questbot://guide/weapon/ballista",
    "sections": [
      {
        "heading": "Hand Ballista",
        "text": "150 physical attack. Requires Str 30, Dex 14."
      },
      {
        "heading": "Jar Cannon",
        "text": "192 physical attack. Requires Str 34, Dex 12."
      },
      {
        "heading": "Rabbath's Cannon",
        "text": "135 physical attack, 135 magic attack. Requires Str 28, Dex 16. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Glintstone Staff",
    "url": "questbot://guide/weapon/glintstone-staff",
    "sections": [
      {
        "heading": "Glintstone Staff",
        "text": "25 physical attack. Requires Str 6, Int 10. Str scaling E, Int scaling C."
      },
      {
        "heading": "Crystal Staff",
        "text": "31 physical attack. Requires Str 8, Int 48. Str scaling D, Int scaling B."
      },
      {
        "heading": "Gelmir Glintstone Staff",
        "text": "29 physical attack. Requires Str 6, Int 14, Fai 14. Str scaling E, Int scaling D, Fai scaling D."
      },
      {
        "heading": "Demi-Human Queen's Staff",
        "text": "31 physical attack. Requires Str 6, Int 10. Str scaling D, Int scaling C."
      },
      {
        "heading": "Carian Regal Scepter",
        "text": "24 physical attack. Requires Str 8, Dex 10, Int 60. Str scaling E, Dex scaling E, Int scaling B."
      },
      {
        "heading": "Digger's Staff",
        "text": "38 physical attack. Requires Str 8, Int 12. Str scaling D, Int scaling C."
      },
      {
        "heading": "Astrologer's Staff",
        "text": "25 physical attack. Requires Str 7, Int 16. Str scaling E, Int scaling C."
      },
      {
        "heading": "Carian Glintblade Staff",
        "text": "22 physical attack. Requires Str 6, Dex 12, Int 22. Str scaling E, Dex scaling E, Int scaling C."
      },
      {
        "heading": "Prince of Death's Staff",
        "text": "25 physical attack. Requires Str 6, Int 18, Fai 18. Str scaling E, Int scaling D, Fai scaling D."
      },
      {
        "heading": "Albinauric Staff",
        "text": "17 physical attack. Requires Str 6, Int 10, Arc 12. Str scaling E, Int scaling D, Arc scaling C."
      },
      {
        "heading": "Academy Glintstone Staff",
        "text": "25 physical attack. Requires Str 6, Int 28. Str scaling E, Int scaling B."
      },
      {
        "heading": "Carian Glintstone Staff",
        "text": "25 physical attack. Requires Str 6, Dex 8, Int 24. Str scaling E, Int scaling C."
      },
      {
        "heading": "Azur's Glintstone Staff",
        "text": "24 physical attack. Requires Str 10, Int 52. Str scaling D, Int scaling B."
      },
      {
        "heading": "Lusat's Glintstone Staff",
        "text": "24 physical attack. Requires Str 10, Int 52. Str scaling D, Int scaling B."
      },
      {
        "heading": "Meteorite Staff",
        "text": "39 physical attack. Requires Str 6, Int 18. Str scaling D, Int scaling S."
      },
      {
        "heading": "Staff of the Guilty",
        "text": "38 physical attack. Requires Str 8, Fai 12. Str scaling D, Fai scaling C."
      },
      {
        "heading": "Rotten Crystal Staff",
        "text": "42 physical attack. Requires Str 8, Int 48. Str scaling D, Int scaling B."
      },
      {
        "heading": "Staff of Loss",
        "text": "22 physical attack. Requires Str 6, Dex 12, Int 14. Str scaling E, Dex scaling E, Int scaling C."
      },
      {
        "heading": "Staff of the Great Beyond",
        "text": "27 physical attack. Requires Str 7, Int 25, Fai 25. Str scaling E, Int scaling D, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Maternal Staff",
        "text": "26 physical attack. Requires Str 7, Int 21, Arc 21. Str scaling E, Int scaling D, Arc scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Sacred Seal",
    "url": "questbot://guide/weapon/sacred-seal",
    "sections": [
      {
        "heading": "Finger Seal",
        "text": "25 physical attack. Requires Str 4, Fai 10. Str scaling E, Fai scaling C."
      },
      {
        "heading": "Godslayer's Seal",
        "text": "25 physical attack. Requires Str 4, Fai 27. Str scaling E, Fai scaling C."
      },
      {
        "heading": "Giant's Seal",
        "text": "25 physical attack. Requires Str 4, Fai 14. Str scaling E, Fai scaling C."
      },
      {
        "heading": "Gravel Stone Seal",
        "text": "25 physical attack. Requires Str 4, Fai 18. Str scaling E, Fai scaling C."
      },
      {
        "heading": "Clawmark Seal",
        "text": "31 physical attack. Requires Str 4, Fai 10. Str scaling D, Fai scaling D."
      },
      {
        "heading": "Golden Order Seal",
        "text": "24 physical attack. Requires Int 17, Fai 17. Int scaling D, Fai scaling D."
      },
      {
        "heading": "Erdtree Seal",
        "text": "25 physical attack, 15 holy attack. Requires Fai 40. Fai scaling C."
      },
      {
        "heading": "Dragon Communion Seal",
        "text": "25 physical attack. Requires Fai 10, Arc 10. Fai scaling D, Arc scaling C."
      },
      {
        "heading": "Frenzied Flame Seal",
        "text": "25 physical attack. No stat requirements. Str scaling E, Dex scaling E, Int scaling E, Fai scaling D."
      },
      {
        "heading": "Dryleaf Seal",
        "text": "25 physical attack. Requires Str 8, Fai 27. Str scaling E, Fai scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Fire Knight's Seal",
        "text": "25 physical attack. Requires Str 8, Fai 23. Str scaling E, Fai scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Spiraltree Seal",
        "text": "25 physical attack. Requires Str 8, Fai 17. Str scaling E, Fai scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Small Shield",
    "url": "questbot://guide/weapon/small-shield",
    "sections": [
      {
        "heading": "Shield of Night",
        "text": "65 physical attack, 42 magic attack. Requires Str 8, Dex 15. Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Buckler",
        "text": "68 physical attack. Requires Str 8, Dex 13. Str scaling E, Dex scaling D."
      },
      {
        "heading": "Perfumer's Shield",
        "text": "67 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Man-Serpent's Shield",
        "text": "70 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Rickety Shield",
        "text": "70 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Pillory Shield",
        "text": "71 physical attack. Requires Str 10. Str scaling E."
      },
      {
        "heading": "Red Thorn Roundshield",
        "text": "70 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Scripture Wooden Shield",
        "text": "70 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Riveted Wooden Shield",
        "text": "72 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Blue-White Wooden Shield",
        "text": "72 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Rift Shield",
        "text": "70 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Iron Roundshield",
        "text": "74 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Gilded Iron Shield",
        "text": "74 physical attack. Requires Str 8. Str scaling E."
      },
      {
        "heading": "Ice Crest Shield",
        "text": "74 physical attack. Requires Str 9. Str scaling E."
      },
      {
        "heading": "Smoldering Shield",
        "text": "58 physical attack, 37 fire attack. Requires Str 10, Dex 9, Fai 12. Str scaling E, Fai scaling D."
      },
      {
        "heading": "Spiralhorn Shield",
        "text": "75 physical attack. Requires Str 8, Dex 10. Str scaling E."
      },
      {
        "heading": "Coil Shield",
        "text": "77 physical attack. Requires Str 10, Dex 10. Str scaling E."
      },
      {
        "heading": "Smithscript Shield",
        "text": "72 physical attack. Requires Str 10, Dex 15, Int 11, Fai 11. Str scaling D, Dex scaling E, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Shield of the Guilty",
        "text": "75 physical attack. Requires Str 8. Str scaling D."
      }
    ]
  },
  {
    "title": "Medium Shield",
    "url": "questbot://guide/weapon/medium-shield",
    "sections": [
      {
        "heading": "Beastman's Jar-Shield",
        "text": "71 physical attack. Requires Str 10. Str scaling E."
      },
      {
        "heading": "Kite Shield",
        "text": "78 physical attack. Requires Str 12. Str scaling D."
      },
      {
        "heading": "Marred Leather Shield",
        "text": "75 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Marred Wooden Shield",
        "text": "76 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Banished Knight's Shield",
        "text": "81 physical attack. Requires Str 14. Str scaling D."
      },
      {
        "heading": "Albinauric Shield",
        "text": "78 physical attack. Requires Str 11. Str scaling D."
      },
      {
        "heading": "Sun Realm Shield",
        "text": "74 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Silver Mirrorshield",
        "text": "59 physical attack, 38 magic attack. Requires Str 12, Dex 10, Int 10. Str scaling D, Int scaling D."
      },
      {
        "heading": "Round Shield",
        "text": "76 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Scorpion Kite Shield",
        "text": "78 physical attack. Requires Str 12. Str scaling D."
      },
      {
        "heading": "Twinbird Kite Shield",
        "text": "78 physical attack. Requires Str 12. Str scaling D."
      },
      {
        "heading": "Blue-Gold Kite Shield",
        "text": "80 physical attack. Requires Str 12. Str scaling D."
      },
      {
        "heading": "Brass Shield",
        "text": "84 physical attack. Requires Str 16. Str scaling D."
      },
      {
        "heading": "Great Turtle Shell",
        "text": "81 physical attack. Requires Str 14. Str scaling D."
      },
      {
        "heading": "Carian Knight's Shield",
        "text": "63 physical attack, 40 magic attack. Requires Str 10, Dex 10, Int 15. Str scaling D, Int scaling D."
      },
      {
        "heading": "Large Leather Shield",
        "text": "75 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Horse Crest Wooden Shield",
        "text": "76 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Candletree Wooden Shield",
        "text": "76 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Flame Crest Wooden Shield",
        "text": "76 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Hawk Crest Wooden Shield",
        "text": "76 physical attack. Requires Str 8. Str scaling D."
      },
      {
        "heading": "Beast Crest Heater Shield",
        "text": "77 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Red Crest Heater Shield",
        "text": "77 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Blue Crest Heater Shield",
        "text": "77 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Eclipse Crest Heater Shield",
        "text": "77 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Inverted Hawk Heater Shield",
        "text": "77 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Heater Shield",
        "text": "77 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Black Leather Shield",
        "text": "75 physical attack. Requires Str 10. Str scaling D."
      },
      {
        "heading": "Messmer Soldier Shield",
        "text": "80 physical attack. Requires Str 10. Str scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Wolf Crest Shield",
        "text": "82 physical attack. Requires Str 12. Str scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Serpent Crest Shield",
        "text": "82 physical attack. Requires Str 12. Str scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Golden Lion Shield",
        "text": "81 physical attack. Requires Str 11. Str scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Greatshield",
    "url": "questbot://guide/weapon/greatshield",
    "sections": [
      {
        "heading": "Dragon Towershield",
        "text": "115 physical attack. Requires Str 30. Str scaling D."
      },
      {
        "heading": "Distinguished Greatshield",
        "text": "112 physical attack. Requires Str 32. Str scaling D."
      },
      {
        "heading": "Crucible Hornshield",
        "text": "123 physical attack. Requires Str 26. Str scaling D."
      },
      {
        "heading": "Dragonclaw Shield",
        "text": "99 physical attack, 64 lightning attack. Requires Str 28, Dex 12. Str scaling D, Dex scaling E."
      },
      {
        "heading": "Briar Greatshield",
        "text": "98 physical attack. Requires Str 21. Str scaling D."
      },
      {
        "heading": "Erdtree Greatshield",
        "text": "100 physical attack, 65 holy attack. Requires Str 30, Fai 12. Str scaling D, Fai scaling D."
      },
      {
        "heading": "Golden Beast Crest Shield",
        "text": "104 physical attack. Requires Str 24. Str scaling D."
      },
      {
        "heading": "Jellyfish Shield",
        "text": "103 physical attack. Requires Str 20, Dex 14. Str scaling D."
      },
      {
        "heading": "Fingerprint Stone Shield",
        "text": "139 physical attack. Requires Str 48. Str scaling D."
      },
      {
        "heading": "Icon Shield",
        "text": "111 physical attack. Requires Str 22. Str scaling D."
      },
      {
        "heading": "One-Eyed Shield",
        "text": "146 physical attack. Requires Str 36. Str scaling D."
      },
      {
        "heading": "Visage Shield",
        "text": "155 physical attack. Requires Str 44. Str scaling D."
      },
      {
        "heading": "Spiked Palisade Shield",
        "text": "116 physical attack. Requires Str 20. Str scaling D."
      },
      {
        "heading": "Manor Towershield",
        "text": "111 physical attack. Requires Str 30. Str scaling D."
      },
      {
        "heading": "Crossed-Tree Towershield",
        "text": "111 physical attack. Requires Str 30. Str scaling D."
      },
      {
        "heading": "Inverted Hawk Towershield",
        "text": "111 physical attack. Requires Str 30. Str scaling D."
      },
      {
        "heading": "Ant's Skull Plate",
        "text": "114 physical attack. Requires Str 28. Str scaling D."
      },
      {
        "heading": "Redmane Greatshield",
        "text": "108 physical attack. Requires Str 30. Str scaling D."
      },
      {
        "heading": "Eclipse Crest Greatshield",
        "text": "110 physical attack. Requires Str 32. Str scaling D."
      },
      {
        "heading": "Cuckoo Greatshield",
        "text": "110 physical attack. Requires Str 32. Str scaling D."
      },
      {
        "heading": "Golden Greatshield",
        "text": "113 physical attack. Requires Str 34. Str scaling D."
      },
      {
        "heading": "Gilded Greatshield",
        "text": "115 physical attack. Requires Str 36. Str scaling D."
      },
      {
        "heading": "Haligtree Crest Greatshield",
        "text": "116 physical attack. Requires Str 36. Str scaling D."
      },
      {
        "heading": "Wooden Greatshield",
        "text": "95 physical attack. Requires Str 14. Str scaling D."
      },
      {
        "heading": "Lordsworn's Shield",
        "text": "99 physical attack. Requires Str 16. Str scaling D."
      },
      {
        "heading": "Black Steel Greatshield",
        "text": "119 physical attack. Requires Str 35. Str scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Verdigris Greatshield",
        "text": "162 physical attack. Requires Str 49. Str scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Torch",
    "url": "questbot://guide/weapon/torch",
    "sections": [
      {
        "heading": "Torch",
        "text": "54 physical attack, 97 fire attack. Requires Str 5, Dex 5. Str scaling D, Dex scaling D."
      },
      {
        "heading": "Steel-Wire Torch",
        "text": "61 physical attack, 109 fire attack. Requires Str 10, Dex 8. Str scaling D, Dex scaling C."
      },
      {
        "heading": "St. Trina's Torch",
        "text": "51 physical attack, 91 fire attack. Requires Str 10, Dex 10, Fai 14. Str scaling E, Dex scaling D, Fai scaling D."
      },
      {
        "heading": "Ghostflame Torch",
        "text": "50 physical attack, 90 magic attack. Requires Str 10, Dex 10, Int 14. Str scaling E, Dex scaling E, Int scaling D."
      },
      {
        "heading": "Beast-Repellent Torch",
        "text": "58 physical attack, 104 fire attack. Requires Str 12, Dex 8. Str scaling C, Dex scaling E."
      },
      {
        "heading": "Sentry's Torch",
        "text": "56 physical attack, 100 holy attack. Requires Str 15, Dex 8, Fai 15. Str scaling D, Dex scaling E, Fai scaling D."
      },
      {
        "heading": "Nanaya's Torch",
        "text": "55 physical attack, 99 fire attack. Requires Str 10, Dex 10, Int 14, Fai 16. Str scaling E, Dex scaling E, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Lamenting Visage",
        "text": "71 physical attack. Requires Str 9. Str scaling B. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Hand-to-Hand Arts",
    "url": "questbot://guide/weapon/hand-to-hand-arts",
    "sections": [
      {
        "heading": "Dryleaf Arts",
        "text": "86 physical attack. Requires Str 8, Dex 8. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Dane's Footwork",
        "text": "86 physical attack. Requires Str 8, Dex 8. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Perfume Bottle",
    "url": "questbot://guide/weapon/perfume-bottle",
    "sections": [
      {
        "heading": "Firespark Perfume Bottle",
        "text": "110 fire attack. Requires Str 3, Dex 14. Dex scaling C. Shadow of the Erdtree."
      },
      {
        "heading": "Chilling Perfume Bottle",
        "text": "105 magic attack. Requires Str 3, Dex 13, Int 13. Dex scaling D, Int scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Frenzyflame Perfume Bottle",
        "text": "105 fire attack. Requires Str 3, Dex 10, Int 12, Fai 12. Str scaling E, Dex scaling D, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Lightning Perfume Bottle",
        "text": "110 lightning attack. Requires Str 3, Dex 16, Fai 14. Dex scaling D, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Deadly Poison Perfume Bottle",
        "text": "92 physical attack. Requires Str 3, Dex 13, Arc 18. Dex scaling D, Arc scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Thrusting Shield",
    "url": "questbot://guide/weapon/thrusting-shield",
    "sections": [
      {
        "heading": "Dueling Shield",
        "text": "125 physical attack. Requires Str 15, Dex 14. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Carian Thrusting Shield",
        "text": "122 physical attack, 36 magic attack. Requires Str 17, Dex 13, Int 15. Str scaling D, Dex scaling D, Int scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Throwing Blade",
    "url": "questbot://guide/weapon/throwing-blade",
    "sections": [
      {
        "heading": "Smithscript Dagger",
        "text": "62 physical attack. Requires Str 5, Dex 11, Int 11, Fai 11. Str scaling E, Dex scaling C, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Backhand Blade",
    "url": "questbot://guide/weapon/backhand-blade",
    "sections": [
      {
        "heading": "Backhand Blade",
        "text": "105 physical attack. Requires Str 10, Dex 13. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Smithscript Cirque",
        "text": "100 physical attack. Requires Str 9, Dex 14, Int 11, Fai 11. Str scaling D, Dex scaling D, Int scaling E, Fai scaling E. Shadow of the Erdtree."
      },
      {
        "heading": "Curseblade's Cirque",
        "text": "108 physical attack. Requires Str 9, Dex 22. Str scaling E, Dex scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Light Greatsword",
    "url": "questbot://guide/weapon/light-greatsword",
    "sections": [
      {
        "heading": "Milady",
        "text": "116 physical attack. Requires Str 12, Dex 17. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Leda's Sword",
        "text": "101 physical attack, 65 holy attack. Requires Str 11, Dex 22, Fai 19. Str scaling E, Dex scaling C, Fai scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Rellana's Twin Blades",
        "text": "103 physical attack, 66 magic attack, 66 fire attack. Requires Str 13, Dex 16, Int 16, Fai 16. Str scaling D, Dex scaling D, Int scaling D, Fai scaling D. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Great Katana",
    "url": "questbot://guide/weapon/great-katana",
    "sections": [
      {
        "heading": "Great Katana",
        "text": "145 physical attack. Requires Str 14, Dex 18. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Dragon-Hunter's Great Katana",
        "text": "152 physical attack. Requires Str 15, Dex 20. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Rakshasa's Great Katana",
        "text": "155 physical attack. Requires Str 12, Dex 27. Str scaling E, Dex scaling C. Shadow of the Erdtree."
      }
    ]
  },
  {
    "title": "Beast Claw",
    "url": "questbot://guide/weapon/beast-claw",
    "sections": [
      {
        "heading": "Beast Claw",
        "text": "98 physical attack. Requires Str 13, Dex 11. Str scaling D, Dex scaling D. Shadow of the Erdtree."
      },
      {
        "heading": "Red Bear's Claw",
        "text": "104 physical attack. Requires Str 20, Dex 10. Str scaling C, Dex scaling E. Shadow of the Erdtree."
      }
    ]
  }
];
