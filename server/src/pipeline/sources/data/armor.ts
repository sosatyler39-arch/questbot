import type { ArticlePage } from '../types.js';

// Base-game and Shadow of the Erdtree armor. Every defense/resistance/weight
// number comes directly from armor-data.js
// (github.com/jerpdoesgames/EldenRingArmorOptimizer, GPL-3.0 licensed),
// credited there to third-party data-mining ("TarnishedSpreadsheet") of the
// game's own files — not scraped, not from model recall. This source has no
// explicit DLC flag (unlike weapons.ts's source), so DLC-only sets (e.g.
// Gaius's set, Divine Beast set) are NOT separately tagged here — every
// piece from this source is included without distinction. One entry per
// armor piece, grouped into pages by equip slot (Head/Body/Arms/Legs).
export const ARMOR_PAGES: ArticlePage[] = [
  {
    "title": "Head",
    "url": "questbot://guide/armor/head",
    "sections": [
      {
        "heading": "Iron Helmet",
        "text": "4.4% physical, 3.1% strike, 4% slash, 4.2% pierce, 2.5% magic, 3.1% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 12, Robustness 18, Focus 8, Vitality 8, Poise 6. Weight 3.8."
      },
      {
        "heading": "Kaiden Helm",
        "text": "4.4% physical, 3.4% strike, 4.4% slash, 4.4% pierce, 3.1% magic, 3.4% fire, 2.8% lightning, 3.1% holy damage negation. Immunity 12, Robustness 22, Focus 9, Vitality 9, Poise 7. Weight 4."
      },
      {
        "heading": "Drake Knight Helm",
        "text": "4% physical, 3.4% strike, 4.2% slash, 4% pierce, 3.6% magic, 4% fire, 3.1% lightning, 3.6% holy damage negation. Immunity 11, Robustness 20, Focus 9, Vitality 9, Poise 6. Weight 4."
      },
      {
        "heading": "Drake Knight Helm (Altered)",
        "text": "3.6% physical, 2.9% strike, 3.8% slash, 3.6% pierce, 3.2% magic, 3.6% fire, 2.6% lightning, 3.2% holy damage negation. Immunity 9, Robustness 16, Focus 7, Vitality 7, Poise 6. Weight 3.6."
      },
      {
        "heading": "Scaled Helm",
        "text": "5.8% physical, 5% strike, 6.1% slash, 5.8% pierce, 4.8% magic, 5% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 24, Robustness 35, Focus 16, Vitality 16, Poise 11. Weight 6.8."
      },
      {
        "heading": "Perfumer Hood",
        "text": "1.4% physical, 2.1% strike, 1.8% slash, 1.4% pierce, 4.6% magic, 4.2% fire, 4.4% lightning, 4.6% holy damage negation. Immunity 26, Robustness 8, Focus 27, Vitality 29, Poise 3. Weight 1.7."
      },
      {
        "heading": "Traveler's Hat",
        "text": "1.8% physical, 1.8% strike, 1.4% slash, 0.9% pierce, 4.6% magic, 4.6% fire, 4.4% lightning, 4.6% holy damage negation. Immunity 23, Robustness 9, Focus 29, Vitality 27, Poise 3. Weight 1.7."
      },
      {
        "heading": "Alberich's Pointed Hat",
        "text": "1.8% physical, 1.4% strike, 1.8% slash, 1.8% pierce, 4.6% magic, 4.2% fire, 4.4% lightning, 4.6% holy damage negation. Immunity 16, Robustness 10, Focus 29, Vitality 31, Poise 2. Weight 1.7."
      },
      {
        "heading": "Alberich's Pointed Hat (Altered)",
        "text": "0.9% physical, 0.2% strike, 0.9% slash, 0.9% pierce, 4.4% magic, 3.8% fire, 4% lightning, 4.4% holy damage negation. Immunity 12, Robustness 7, Focus 23, Vitality 24, Poise 1. Weight 1."
      },
      {
        "heading": "Spellblade's Pointed Hat",
        "text": "1.3% physical, 0.8% strike, 1.3% slash, 1.3% pierce, 4.5% magic, 3.9% fire, 4.1% lightning, 4.5% holy damage negation. Immunity 15, Robustness 8, Focus 25, Vitality 27, Poise 2. Weight 1.5."
      },
      {
        "heading": "Bull-Goat Helm",
        "text": "7.5% physical, 7.4% strike, 6.7% slash, 6.7% pierce, 4.7% magic, 4.8% fire, 5.3% lightning, 4.6% holy damage negation. Immunity 31, Robustness 35, Focus 20, Vitality 23, Poise 15. Weight 11.3."
      },
      {
        "heading": "Iron Kasa",
        "text": "3.6% physical, 3.6% strike, 4.2% slash, 3.6% pierce, 4% magic, 4.2% fire, 4.4% lightning, 4% holy damage negation. Immunity 30, Robustness 23, Focus 24, Vitality 24, Poise 6. Weight 3.8."
      },
      {
        "heading": "Guilty Hood",
        "text": "0.9% physical, 1.4% strike, 1.8% slash, 0.2% pierce, 4.4% magic, 4% fire, 4.5% lightning, 4.6% holy damage negation. Immunity 15, Robustness 9, Focus 27, Vitality 31, Poise 2. Weight 1.4."
      },
      {
        "heading": "Black Wolf Mask",
        "text": "5.2% physical, 4.6% strike, 5.2% slash, 5.5% pierce, 4% magic, 4.5% fire, 3.6% lightning, 4.2% holy damage negation. Immunity 16, Robustness 33, Focus 11, Vitality 11, Poise 9. Weight 5.9."
      },
      {
        "heading": "Black Knife Hood",
        "text": "3.8% physical, 3.6% strike, 4.2% slash, 4.2% pierce, 2.8% magic, 3.1% fire, 2.1% lightning, 3.8% holy damage negation. Immunity 11, Robustness 18, Focus 9, Vitality 9, Poise 6. Weight 3.8."
      },
      {
        "heading": "Exile Hood",
        "text": "4.4% physical, 3.4% strike, 4.6% slash, 4.4% pierce, 2.8% magic, 3.8% fire, 2.3% lightning, 3.4% holy damage negation. Immunity 12, Robustness 23, Focus 9, Vitality 8, Poise 6. Weight 4."
      },
      {
        "heading": "Banished Knight Helm",
        "text": "6.8% physical, 5.4% strike, 7% slash, 6.3% pierce, 4.8% magic, 4.8% fire, 4.6% lightning, 4.7% holy damage negation. Immunity 26, Robustness 35, Focus 16, Vitality 18, Poise 11. Weight 7.5."
      },
      {
        "heading": "Banished Knight Helm (Altered)",
        "text": "6.7% physical, 5.2% strike, 6.8% slash, 6.1% pierce, 4.7% magic, 4.7% fire, 4.6% lightning, 4.6% holy damage negation. Immunity 21, Robustness 30, Focus 13, Vitality 14, Poise 11. Weight 7.1."
      },
      {
        "heading": "Briar Helm",
        "text": "4.6% physical, 4% strike, 4.8% slash, 4.4% pierce, 3.8% magic, 4.4% fire, 3.1% lightning, 3.8% holy damage negation. Immunity 15, Robustness 31, Focus 10, Vitality 10, Poise 9. Weight 5.1."
      },
      {
        "heading": "Page Hood",
        "text": "1.8% physical, 1.4% strike, 0.9% slash, 0.9% pierce, 4.4% magic, 4.2% fire, 4.5% lightning, 4.5% holy damage negation. Immunity 15, Robustness 8, Focus 29, Vitality 29, Poise 2. Weight 1.4."
      },
      {
        "heading": "Night's Cavalry Helm",
        "text": "5% physical, 4.6% strike, 5% slash, 4.8% pierce, 3.8% magic, 4.5% fire, 3.8% lightning, 4.5% holy damage negation. Immunity 16, Robustness 24, Focus 10, Vitality 10, Poise 8. Weight 5.5."
      },
      {
        "heading": "Night's Cavalry Helm (Altered)",
        "text": "4.8% physical, 4.4% strike, 4.8% slash, 4.4% pierce, 3.6% magic, 4.4% fire, 3.6% lightning, 4.4% holy damage negation. Immunity 13, Robustness 21, Focus 9, Vitality 9, Poise 8. Weight 5.1."
      },
      {
        "heading": "Blue Silver Mail Hood",
        "text": "4.2% physical, 3.1% strike, 4.4% slash, 3.8% pierce, 3.6% magic, 3.4% fire, 2.5% lightning, 2.5% holy damage negation. Immunity 10, Robustness 24, Focus 5, Vitality 5, Poise 6. Weight 3.8."
      },
      {
        "heading": "Nomadic Merchant's Chapeau",
        "text": "2.8% physical, 3.1% strike, 2.5% slash, 2.3% pierce, 3.4% magic, 3.4% fire, 3.4% lightning, 3.1% holy damage negation. Immunity 24, Robustness 14, Focus 31, Vitality 20, Poise 4. Weight 3."
      },
      {
        "heading": "Malformed Dragon Helm",
        "text": "6.1% physical, 5.4% strike, 6.3% slash, 6.1% pierce, 4.6% magic, 4.6% fire, 4.9% lightning, 4.6% holy damage negation. Immunity 24, Robustness 33, Focus 16, Vitality 16, Poise 10. Weight 6.8."
      },
      {
        "heading": "Tree Sentinel Helm",
        "text": "6.8% physical, 5.4% strike, 6.8% slash, 6.3% pierce, 4.6% magic, 6.2% fire, 4.5% lightning, 5% holy damage negation. Immunity 29, Robustness 39, Focus 18, Vitality 20, Poise 12. Weight 8.1."
      },
      {
        "heading": "Royal Knight Helm",
        "text": "5.8% physical, 5.2% strike, 6.3% slash, 6.1% pierce, 5% magic, 4.7% fire, 4.4% lightning, 4.6% holy damage negation. Immunity 22, Robustness 29, Focus 15, Vitality 15, Poise 9. Weight 6.6."
      },
      {
        "heading": "Nox Monk Hood",
        "text": "2.8% physical, 3.1% strike, 2.8% slash, 2.5% pierce, 4% magic, 3.8% fire, 3.8% lightning, 3.1% holy damage negation. Immunity 24, Robustness 15, Focus 18, Vitality 18, Poise 4. Weight 3."
      },
      {
        "heading": "Nox Monk Hood (Altered)",
        "text": "2.5% physical, 2.8% strike, 2.5% slash, 2.3% pierce, 3.8% magic, 3.6% fire, 3.6% lightning, 2.8% holy damage negation. Immunity 21, Robustness 12, Focus 14, Vitality 14, Poise 3. Weight 2.7."
      },
      {
        "heading": "Nox Swordstress Crown",
        "text": "2.8% physical, 3.4% strike, 2.8% slash, 3.1% pierce, 4.4% magic, 3.6% fire, 4.2% lightning, 3.8% holy damage negation. Immunity 24, Robustness 15, Focus 22, Vitality 22, Poise 5. Weight 3.3."
      },
      {
        "heading": "Night Maiden Twin Crown",
        "text": "2.5% physical, 3.1% strike, 2.5% slash, 3.4% pierce, 4.2% magic, 3.8% fire, 4% lightning, 4.2% holy damage negation. Immunity 26, Robustness 15, Focus 22, Vitality 22, Poise 5. Weight 3.3."
      },
      {
        "heading": "Nox Swordstress Crown (Altered)",
        "text": "2.3% physical, 2.8% strike, 2.3% slash, 2.5% pierce, 4% magic, 3.1% fire, 3.8% lightning, 3.4% holy damage negation. Immunity 21, Robustness 11, Focus 17, Vitality 17, Poise 2. Weight 2.7."
      },
      {
        "heading": "Great Horned Headband",
        "text": "2.8% physical, 3.1% strike, 2.8% slash, 2.8% pierce, 3.1% magic, 3.4% fire, 3.8% lightning, 3.4% holy damage negation. Immunity 33, Robustness 23, Focus 27, Vitality 22, Poise 4. Weight 3.3."
      },
      {
        "heading": "Shining Horned Headband",
        "text": "2.5% physical, 2.8% strike, 2.5% slash, 3.6% pierce, 3.6% magic, 3.4% fire, 3.6% lightning, 3.1% holy damage negation. Immunity 33, Robustness 23, Focus 27, Vitality 20, Poise 4. Weight 3.3."
      },
      {
        "heading": "Duelist Helm",
        "text": "5.8% physical, 5.2% strike, 6.1% slash, 6.1% pierce, 4% magic, 4.5% fire, 3.6% lightning, 4.2% holy damage negation. Immunity 24, Robustness 24, Focus 11, Vitality 12, Poise 10. Weight 6.2."
      },
      {
        "heading": "Sanguine Noble Hood",
        "text": "1.4% physical, 0.9% strike, 0.9% slash, 0.9% pierce, 4.6% magic, 3.8% fire, 4.5% lightning, 4.6% holy damage negation. Immunity 18, Robustness 5, Focus 29, Vitality 27, Poise 2. Weight 1.4."
      },
      {
        "heading": "Guardian Mask",
        "text": "3.8% physical, 3.6% strike, 3.6% slash, 3.4% pierce, 4.2% magic, 4% fire, 4.2% lightning, 4.2% holy damage negation. Immunity 33, Robustness 22, Focus 26, Vitality 24, Poise 5. Weight 3.8."
      },
      {
        "heading": "Cleanrot Helm",
        "text": "5.2% physical, 4.8% strike, 5.8% slash, 6.3% pierce, 4.5% magic, 4.6% fire, 4% lightning, 4.8% holy damage negation. Immunity 27, Robustness 29, Focus 12, Vitality 14, Poise 9. Weight 6.4."
      },
      {
        "heading": "Cleanrot Helm (Altered)",
        "text": "4.6% physical, 4.2% strike, 5% slash, 5.5% pierce, 4% magic, 4.2% fire, 3.4% lightning, 4.6% holy damage negation. Immunity 21, Robustness 21, Focus 9, Vitality 10, Poise 7. Weight 5.5."
      },
      {
        "heading": "Fire Monk Hood",
        "text": "4.6% physical, 3.8% strike, 4.2% slash, 4% pierce, 3.1% magic, 4.5% fire, 2.5% lightning, 2.5% holy damage negation. Immunity 11, Robustness 20, Focus 9, Vitality 9, Poise 6. Weight 4."
      },
      {
        "heading": "Blackflame Monk Hood",
        "text": "4.4% physical, 3.4% strike, 4.6% slash, 4.2% pierce, 2.8% magic, 4.4% fire, 2.1% lightning, 2.8% holy damage negation. Immunity 11, Robustness 20, Focus 5, Vitality 11, Poise 7. Weight 4."
      },
      {
        "heading": "Fire Prelate Helm",
        "text": "7% physical, 6.1% strike, 6.7% slash, 6.7% pierce, 4.8% magic, 7.2% fire, 4.6% lightning, 4.7% holy damage negation. Immunity 29, Robustness 27, Focus 39, Vitality 22, Poise 14. Weight 10.6."
      },
      {
        "heading": "Aristocrat Headband",
        "text": "1.9% physical, 1.9% strike, 1.9% slash, 1.6% pierce, 4% magic, 3.6% fire, 3.8% lightning, 4% holy damage negation. Immunity 15, Robustness 10, Focus 25, Vitality 22, Poise 2. Weight 1.2."
      },
      {
        "heading": "Aristocrat Hat",
        "text": "3.1% physical, 3.1% strike, 2.8% slash, 3.1% pierce, 3.8% magic, 4% fire, 3.8% lightning, 3.1% holy damage negation. Immunity 22, Robustness 14, Focus 18, Vitality 20, Poise 4. Weight 3."
      },
      {
        "heading": "Old Aristocrat Cowl",
        "text": "2.5% physical, 2.5% strike, 2.3% slash, 2.5% pierce, 3.4% magic, 3.6% fire, 3.4% lightning, 2.5% holy damage negation. Immunity 18, Robustness 11, Focus 15, Vitality 16, Poise 3. Weight 2.2."
      },
      {
        "heading": "Vulgar Militia Helm",
        "text": "3.4% physical, 3.8% strike, 3.6% slash, 3.1% pierce, 3.8% magic, 3.8% fire, 4% lightning, 3.8% holy damage negation. Immunity 31, Robustness 16, Focus 23, Vitality 23, Poise 6. Weight 3.6."
      },
      {
        "heading": "Sage Hood",
        "text": "2.3% physical, 2.1% strike, 2.1% slash, 1.4% pierce, 4.8% magic, 4.5% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 16, Robustness 10, Focus 31, Vitality 33, Poise 3. Weight 2.2."
      },
      {
        "heading": "Pumpkin Helm",
        "text": "7% physical, 5.9% strike, 6.7% slash, 6.7% pierce, 4.6% magic, 4.7% fire, 5.2% lightning, 4.5% holy damage negation. Immunity 27, Robustness 42, Focus 44, Vitality 18, Poise 11. Weight 12.3."
      },
      {
        "heading": "Elden Lord Crown",
        "text": "3.8% physical, 3.4% strike, 3.6% slash, 4% pierce, 2.5% magic, 3.6% fire, 2.1% lightning, 2.3% holy damage negation. Immunity 11, Robustness 20, Focus 0, Vitality 5, Poise 5. Weight 3.6."
      },
      {
        "heading": "Radahn's Redmane Helm",
        "text": "6.8% physical, 5.4% strike, 6.7% slash, 6.3% pierce, 4.8% magic, 5% fire, 4.5% lightning, 4.8% holy damage negation. Immunity 26, Robustness 42, Focus 18, Vitality 16, Poise 11. Weight 7.5."
      },
      {
        "heading": "Queen's Crescent Crown",
        "text": "2.1% physical, 1.8% strike, 1.8% slash, 1.4% pierce, 4.9% magic, 4.5% fire, 4.6% lightning, 4.7% holy damage negation. Immunity 18, Robustness 11, Focus 31, Vitality 35, Poise 3. Weight 2.2."
      },
      {
        "heading": "Godskin Apostle Hood",
        "text": "2.3% physical, 2.1% strike, 2.1% slash, 1.4% pierce, 4.6% magic, 4.4% fire, 4.5% lightning, 5% holy damage negation. Immunity 20, Robustness 10, Focus 33, Vitality 31, Poise 3. Weight 2.2."
      },
      {
        "heading": "Godskin Noble Hood",
        "text": "1.4% physical, 2.8% strike, 1.8% slash, 1.4% pierce, 4.5% magic, 4% fire, 4.2% lightning, 4.8% holy damage negation. Immunity 16, Robustness 10, Focus 27, Vitality 29, Poise 3. Weight 1.7."
      },
      {
        "heading": "Depraved Perfumer Headscarf",
        "text": "2% physical, 2% strike, 1.7% slash, 1.3% pierce, 4.6% magic, 4.5% fire, 4.4% lightning, 4.5% holy damage negation. Immunity 28, Robustness 10, Focus 25, Vitality 34, Poise 3. Weight 2.1."
      },
      {
        "heading": "Crucible Axe Helm",
        "text": "6.3% physical, 5% strike, 6.1% slash, 6.1% pierce, 4.6% magic, 4.6% fire, 4% lightning, 4.8% holy damage negation. Immunity 22, Robustness 31, Focus 15, Vitality 15, Poise 11. Weight 6.6."
      },
      {
        "heading": "Crucible Tree Helm",
        "text": "6.5% physical, 5% strike, 6.3% slash, 5.6% pierce, 4.6% magic, 4.2% fire, 4% lightning, 5.2% holy damage negation. Immunity 22, Robustness 31, Focus 15, Vitality 15, Poise 11. Weight 6.6."
      },
      {
        "heading": "Lusat's Glintstone Crown",
        "text": "3.1% physical, 2.3% strike, 3.1% slash, 2.3% pierce, 5.5% magic, 4.6% fire, 4.8% lightning, 4.9% holy damage negation. Immunity 23, Robustness 11, Focus 39, Vitality 44, Poise 4. Weight 3.6."
      },
      {
        "heading": "Azur's Glintstone Crown",
        "text": "2.8% physical, 2.3% strike, 2.5% slash, 2.5% pierce, 5.8% magic, 4.6% fire, 4.7% lightning, 5% holy damage negation. Immunity 23, Robustness 14, Focus 44, Vitality 39, Poise 4. Weight 3.6."
      },
      {
        "heading": "All-Knowing Helm",
        "text": "4.6% physical, 4.2% strike, 4.8% slash, 4.2% pierce, 4.4% magic, 3.4% fire, 3.6% lightning, 3.1% holy damage negation. Immunity 12, Robustness 20, Focus 9, Vitality 9, Poise 7. Weight 4.6."
      },
      {
        "heading": "Twinned Helm",
        "text": "4.8% physical, 4.4% strike, 5.2% slash, 4.2% pierce, 4% magic, 4% fire, 3.1% lightning, 3.6% holy damage negation. Immunity 14, Robustness 23, Focus 9, Vitality 23, Poise 7. Weight 5.1."
      },
      {
        "heading": "Prophet Blindfold",
        "text": "0.2% physical, 0.9% strike, 0.9% slash, 0.2% pierce, 4.5% magic, 4.2% fire, 4% lightning, 4.5% holy damage negation. Immunity 14, Robustness 5, Focus 27, Vitality 27, Poise 1. Weight 1."
      },
      {
        "heading": "Astrologer Hood",
        "text": "1.8% physical, 1.4% strike, 1.4% slash, 1.4% pierce, 4.6% magic, 4.5% fire, 4.6% lightning, 4.5% holy damage negation. Immunity 18, Robustness 9, Focus 31, Vitality 27, Poise 3. Weight 1.7."
      },
      {
        "heading": "Lionel's Helm",
        "text": "6.3% physical, 5.9% strike, 7% slash, 7.2% pierce, 4.8% magic, 5.3% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 27, Robustness 42, Focus 18, Vitality 22, Poise 13. Weight 9.1."
      },
      {
        "heading": "Hoslow's Helm",
        "text": "5.2% physical, 4.4% strike, 5% slash, 4.8% pierce, 4% magic, 4.4% fire, 3.8% lightning, 3.8% holy damage negation. Immunity 18, Robustness 27, Focus 11, Vitality 11, Poise 8. Weight 5.5."
      },
      {
        "heading": "Diallos's Mask",
        "text": "4.8% physical, 3.8% strike, 4.6% slash, 4.4% pierce, 3.6% magic, 3.6% fire, 2.5% lightning, 3.4% holy damage negation. Immunity 15, Robustness 23, Focus 10, Vitality 10, Poise 7. Weight 4.6."
      },
      {
        "heading": "Vagabond Knight Helm",
        "text": "4.6% physical, 3.6% strike, 4.2% slash, 4% pierce, 3.1% magic, 3.6% fire, 2.8% lightning, 2.8% holy damage negation. Immunity 14, Robustness 23, Focus 9, Vitality 9, Poise 7. Weight 4."
      },
      {
        "heading": "Blue Cloth Cowl",
        "text": "2.8% physical, 2.8% strike, 2.3% slash, 2.3% pierce, 3.1% magic, 3.4% fire, 3.8% lightning, 2.8% holy damage negation. Immunity 24, Robustness 15, Focus 18, Vitality 18, Poise 4. Weight 2.7."
      },
      {
        "heading": "White Mask",
        "text": "2.7% physical, 3% strike, 3.3% slash, 2.7% pierce, 3.5% magic, 3.7% fire, 3.9% lightning, 3.7% holy damage negation. Immunity 23, Robustness 18, Focus 21, Vitality 22, Poise 5. Weight 3.2."
      },
      {
        "heading": "Royal Remains Helm",
        "text": "4.2% physical, 4% strike, 4.6% slash, 4.2% pierce, 3.4% magic, 3.6% fire, 2.8% lightning, 3.1% holy damage negation. Immunity 15, Robustness 24, Focus 10, Vitality 5, Poise 7. Weight 4.6."
      },
      {
        "heading": "Beast Champion Helm",
        "text": "6.3% physical, 5.9% strike, 6.8% slash, 6.7% pierce, 4.6% magic, 4.9% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 24, Robustness 39, Focus 18, Vitality 16, Poise 11. Weight 7.5."
      },
      {
        "heading": "Champion Headband",
        "text": "2.3% physical, 3.1% strike, 2.5% slash, 2.8% pierce, 2.8% magic, 3.4% fire, 3.6% lightning, 3.4% holy damage negation. Immunity 22, Robustness 14, Focus 18, Vitality 16, Poise 5. Weight 2.7."
      },
      {
        "heading": "Crimson Hood",
        "text": "1.4% physical, 1.8% strike, 1.4% slash, 1.8% pierce, 4.6% magic, 4.6% fire, 4.5% lightning, 4.6% holy damage negation. Immunity 16, Robustness 9, Focus 27, Vitality 29, Poise 3. Weight 1.7."
      },
      {
        "heading": "Navy Hood",
        "text": "1.4% physical, 2.1% strike, 1.8% slash, 0.9% pierce, 4.6% magic, 4.7% fire, 4.4% lightning, 4.5% holy damage negation. Immunity 20, Robustness 10, Focus 29, Vitality 27, Poise 3. Weight 1.7."
      },
      {
        "heading": "Maliketh's Helm",
        "text": "4.8% physical, 4.2% strike, 5% slash, 4.8% pierce, 3.8% magic, 4% fire, 3.4% lightning, 4.6% holy damage negation. Immunity 15, Robustness 24, Focus 10, Vitality 22, Poise 8. Weight 5.5."
      },
      {
        "heading": "Malenia's Winged Helm",
        "text": "4.4% physical, 3.4% strike, 4.6% slash, 4% pierce, 2.8% magic, 3.4% fire, 2.3% lightning, 3.8% holy damage negation. Immunity 22, Robustness 18, Focus 8, Vitality 8, Poise 6. Weight 4."
      },
      {
        "heading": "Veteran's Helm",
        "text": "6.8% physical, 6.1% strike, 6.8% slash, 6.3% pierce, 4.8% magic, 5% fire, 4.6% lightning, 4.7% holy damage negation. Immunity 27, Robustness 39, Focus 20, Vitality 20, Poise 12. Weight 8.1."
      },
      {
        "heading": "Bloodhound Knight Helm",
        "text": "4.4% physical, 4% strike, 5% slash, 4.8% pierce, 3.4% magic, 3.6% fire, 2.5% lightning, 3.6% holy damage negation. Immunity 14, Robustness 22, Focus 10, Vitality 10, Poise 6. Weight 4.6."
      },
      {
        "heading": "Festive Hood",
        "text": "1.4% physical, 1.8% strike, 2.1% slash, 1.8% pierce, 4.5% magic, 4.2% fire, 4.4% lightning, 4.6% holy damage negation. Immunity 18, Robustness 9, Focus 29, Vitality 29, Poise 2. Weight 1.7."
      },
      {
        "heading": "Festive Hood (Altered)",
        "text": "0.2% physical, 0.9% strike, 1.4% slash, 0.9% pierce, 4.2% magic, 3.8% fire, 4% lightning, 4.5% holy damage negation. Immunity 13, Robustness 4, Focus 23, Vitality 23, Poise 1. Weight 1."
      },
      {
        "heading": "Blue Festive Hood",
        "text": "1.4% physical, 1.4% strike, 2.1% slash, 1.8% pierce, 4.5% magic, 4% fire, 4.5% lightning, 4.9% holy damage negation. Immunity 20, Robustness 9, Focus 31, Vitality 27, Poise 2. Weight 1.7."
      },
      {
        "heading": "Commoner's Headband",
        "text": "0.9% physical, 1.8% strike, 1.8% slash, 1.4% pierce, 4.4% magic, 4% fire, 4.2% lightning, 4.4% holy damage negation. Immunity 15, Robustness 10, Focus 27, Vitality 29, Poise 2. Weight 1.4."
      },
      {
        "heading": "Commoner's Headband (Altered)",
        "text": "0.1% physical, 1.1% strike, 1.1% slash, 0.6% pierce, 3.9% magic, 3.5% fire, 3.7% lightning, 3.9% holy damage negation. Immunity 12, Robustness 8, Focus 23, Vitality 24, Poise 1. Weight 0.7."
      },
      {
        "heading": "Envoy Crown",
        "text": "2.8% physical, 3.1% strike, 3.1% slash, 2.8% pierce, 5.3% magic, 4.7% fire, 4.9% lightning, 5.5% holy damage negation. Immunity 27, Robustness 15, Focus 46, Vitality 46, Poise 4. Weight 3.8."
      },
      {
        "heading": "Twinsage Glintstone Crown",
        "text": "4.4% physical, 3.1% strike, 5.2% slash, 4.8% pierce, 4.4% magic, 4.5% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 16, Robustness 26, Focus 10, Vitality 10, Poise 6. Weight 5.1."
      },
      {
        "heading": "Olivinus Glintstone Crown",
        "text": "4.4% physical, 3.1% strike, 5.2% slash, 4.8% pierce, 4.4% magic, 4.5% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 16, Robustness 26, Focus 10, Vitality 10, Poise 6. Weight 5.1."
      },
      {
        "heading": "Lazuli Glintstone Crown",
        "text": "4.4% physical, 3.1% strike, 5.2% slash, 4.8% pierce, 4.4% magic, 4.5% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 16, Robustness 26, Focus 10, Vitality 10, Poise 6. Weight 5.1."
      },
      {
        "heading": "Karolos Glintstone Crown",
        "text": "4.4% physical, 3.1% strike, 5.2% slash, 4.8% pierce, 4.4% magic, 4.5% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 16, Robustness 26, Focus 10, Vitality 10, Poise 6. Weight 5.1."
      },
      {
        "heading": "Witch's Glintstone Crown",
        "text": "4.4% physical, 3.1% strike, 5.2% slash, 4.8% pierce, 4.4% magic, 4.5% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 16, Robustness 26, Focus 10, Vitality 10, Poise 6. Weight 5.1."
      },
      {
        "heading": "Marionette Soldier Helm",
        "text": "4.4% physical, 3.1% strike, 4% slash, 3.8% pierce, 3.1% magic, 3.1% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 10, Robustness 22, Focus 9, Vitality 8, Poise 6. Weight 3.8."
      },
      {
        "heading": "Marionette Soldier Birdhelm",
        "text": "4.4% physical, 3.1% strike, 4% slash, 3.8% pierce, 3.1% magic, 3.1% fire, 2.5% lightning, 2.5% holy damage negation. Immunity 11, Robustness 18, Focus 8, Vitality 9, Poise 6. Weight 3.8."
      },
      {
        "heading": "Raging Wolf Helm",
        "text": "4.7% physical, 4.1% strike, 4.7% slash, 4.5% pierce, 3.5% magic, 3.9% fire, 2.4% lightning, 3.3% holy damage negation. Immunity 14, Robustness 23, Focus 8, Vitality 8, Poise 7. Weight 4.4."
      },
      {
        "heading": "Land of Reeds Helm",
        "text": "3.1% physical, 3.4% strike, 4.8% slash, 3.4% pierce, 3.6% magic, 4% fire, 4.2% lightning, 3.8% holy damage negation. Immunity 26, Robustness 22, Focus 0, Vitality 23, Poise 5. Weight 3.6."
      },
      {
        "heading": "Okina Mask",
        "text": "3.4% physical, 3.6% strike, 4% slash, 3.1% pierce, 3.8% magic, 3.8% fire, 4.2% lightning, 3.6% holy damage negation. Immunity 29, Robustness 18, Focus 23, Vitality 22, Poise 6. Weight 3.6."
      },
      {
        "heading": "Confessor Hood",
        "text": "2.8% physical, 3.6% strike, 2.8% slash, 3.1% pierce, 3.8% magic, 3.8% fire, 4.2% lightning, 3.4% holy damage negation. Immunity 26, Robustness 20, Focus 20, Vitality 22, Poise 5. Weight 3.3."
      },
      {
        "heading": "Confessor Hood (Altered)",
        "text": "2.3% physical, 3.1% strike, 2.3% slash, 2.5% pierce, 3.4% magic, 3.4% fire, 3.8% lightning, 2.8% holy damage negation. Immunity 21, Robustness 14, Focus 14, Vitality 16, Poise 3. Weight 2.7."
      },
      {
        "heading": "Prisoner Iron Mask",
        "text": "6.8% physical, 5.9% strike, 7% slash, 6.8% pierce, 4.6% magic, 4.9% fire, 4.5% lightning, 4.8% holy damage negation. Immunity 29, Robustness 44, Focus 35, Vitality 20, Poise 12. Weight 8.6."
      },
      {
        "heading": "Blackguard's Iron Mask",
        "text": "5.8% physical, 4.4% strike, 6.1% slash, 5.5% pierce, 4.2% magic, 4.4% fire, 4% lightning, 4.5% holy damage negation. Immunity 22, Robustness 31, Focus 12, Vitality 12, Poise 9. Weight 6.2."
      },
      {
        "heading": "Traveling Maiden Hood",
        "text": "1.4% physical, 1.8% strike, 1.8% slash, 0.9% pierce, 4.6% magic, 4.5% fire, 4.6% lightning, 4.6% holy damage negation. Immunity 18, Robustness 10, Focus 29, Vitality 31, Poise 3. Weight 1.6."
      },
      {
        "heading": "Finger Maiden Fillet",
        "text": "2.1% physical, 1.8% strike, 1.8% slash, 1.4% pierce, 4.8% magic, 4.6% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 18, Robustness 10, Focus 31, Vitality 31, Poise 4. Weight 2.2."
      },
      {
        "heading": "Preceptor's Big Hat",
        "text": "2.5% physical, 2.8% strike, 2.5% slash, 2.5% pierce, 5.5% magic, 4.9% fire, 4.8% lightning, 4.8% holy damage negation. Immunity 26, Robustness 12, Focus 44, Vitality 42, Poise 5. Weight 3.6."
      },
      {
        "heading": "Mask of Confidence",
        "text": "2.3% physical, 2.5% strike, 2.3% slash, 2.3% pierce, 5.3% magic, 4.8% fire, 4.7% lightning, 4.7% holy damage negation. Immunity 24, Robustness 11, Focus 39, Vitality 35, Poise 5. Weight 3.3."
      },
      {
        "heading": "Skeletal Mask",
        "text": "2.5% physical, 2.8% strike, 3.1% slash, 3.1% pierce, 3.4% magic, 3.4% fire, 3.6% lightning, 3.1% holy damage negation. Immunity 23, Robustness 14, Focus 24, Vitality 24, Poise 4. Weight 3."
      },
      {
        "heading": "Eccentric's Hood",
        "text": "4.4% physical, 3.4% strike, 4.2% slash, 4.4% pierce, 3.4% magic, 3.6% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 14, Robustness 24, Focus 9, Vitality 8, Poise 6. Weight 4."
      },
      {
        "heading": "Eccentric's Hood (Altered)",
        "text": "4.4% physical, 3.4% strike, 4.2% slash, 4.4% pierce, 3.4% magic, 3.6% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 12, Robustness 21, Focus 8, Vitality 7, Poise 6. Weight 4."
      },
      {
        "heading": "Fingerprint Helm",
        "text": "4.8% physical, 4.2% strike, 4.2% slash, 4.2% pierce, 3.4% magic, 4.5% fire, 2.3% lightning, 3.4% holy damage negation. Immunity 14, Robustness 26, Focus 5, Vitality 10, Poise 8. Weight 4.6."
      },
      {
        "heading": "Consort's Mask",
        "text": "2.8% physical, 2.8% strike, 2.5% slash, 2.5% pierce, 5% magic, 4.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 24, Robustness 14, Focus 39, Vitality 35, Poise 5. Weight 3.6."
      },
      {
        "heading": "Ruler's Mask",
        "text": "1.8% physical, 2.3% strike, 2.3% slash, 1.4% pierce, 4.6% magic, 4.4% fire, 4.6% lightning, 4.7% holy damage negation. Immunity 20, Robustness 10, Focus 33, Vitality 33, Poise 3. Weight 2.2."
      },
      {
        "heading": "Marais Mask",
        "text": "2.1% physical, 2.3% strike, 1.8% slash, 1.4% pierce, 4.6% magic, 4.5% fire, 4.5% lightning, 4.6% holy damage negation. Immunity 20, Robustness 14, Focus 35, Vitality 33, Poise 4. Weight 2.2."
      },
      {
        "heading": "Bloodsoaked Mask",
        "text": "1.8% physical, 1.8% strike, 1.8% slash, 2.1% pierce, 4.6% magic, 4.4% fire, 4.5% lightning, 4.6% holy damage negation. Immunity 18, Robustness 10, Focus 30, Vitality 31, Poise 3. Weight 2.2."
      },
      {
        "heading": "Omen Helm",
        "text": "6.7% physical, 5.4% strike, 6.8% slash, 6.8% pierce, 4.6% magic, 5.2% fire, 5.3% lightning, 4.9% holy damage negation. Immunity 29, Robustness 27, Focus 24, Vitality 33, Poise 14. Weight 9.9."
      },
      {
        "heading": "Carian Knight Helm",
        "text": "4.2% physical, 3.8% strike, 4.4% slash, 4.2% pierce, 4.4% magic, 4.2% fire, 3.4% lightning, 4.2% holy damage negation. Immunity 12, Robustness 20, Focus 9, Vitality 10, Poise 6. Weight 4.6."
      },
      {
        "heading": "Hierodas Glintstone Crown",
        "text": "2.3% physical, 2.3% strike, 2.8% slash, 2.3% pierce, 4.9% magic, 4.7% fire, 4.6% lightning, 4.9% holy damage negation. Immunity 20, Robustness 11, Focus 39, Vitality 42, Poise 4. Weight 3."
      },
      {
        "heading": "Haima Glintstone Crown",
        "text": "2.3% physical, 2.5% strike, 2.1% slash, 2.3% pierce, 4.8% magic, 4.5% fire, 4.6% lightning, 4.6% holy damage negation. Immunity 22, Robustness 11, Focus 33, Vitality 39, Poise 4. Weight 2.7."
      },
      {
        "heading": "Snow Witch Hat",
        "text": "1.8% physical, 2.1% strike, 2.1% slash, 1.4% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.6% holy damage negation. Immunity 16, Robustness 14, Focus 31, Vitality 31, Poise 3. Weight 2.2."
      },
      {
        "heading": "Juvenile Scholar Cap",
        "text": "1.4% physical, 1.8% strike, 1.8% slash, 1.4% pierce, 4.5% magic, 4% fire, 4.2% lightning, 4.4% holy damage negation. Immunity 15, Robustness 10, Focus 26, Vitality 29, Poise 2. Weight 1.4."
      },
      {
        "heading": "Radiant Gold Mask",
        "text": "2.3% physical, 2.1% strike, 2.1% slash, 1.4% pierce, 4.6% magic, 4.5% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 22, Robustness 9, Focus 33, Vitality 33, Poise 3. Weight 2.2."
      },
      {
        "heading": "Albinauric Mask",
        "text": "4% physical, 3.1% strike, 4% slash, 3.8% pierce, 2.5% magic, 3.1% fire, 2.1% lightning, 2.5% holy damage negation. Immunity 12, Robustness 23, Focus 10, Vitality 10, Poise 5. Weight 3.8."
      },
      {
        "heading": "Zamor Mask",
        "text": "4.2% physical, 3.4% strike, 4.4% slash, 3.8% pierce, 3.1% magic, 3.1% fire, 2.1% lightning, 2.8% holy damage negation. Immunity 9, Robustness 27, Focus 5, Vitality 8, Poise 6. Weight 3.8."
      },
      {
        "heading": "Imp Head (Cat)",
        "text": "5.8% physical, 5.2% strike, 5.8% slash, 6.1% pierce, 5% magic, 5.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 35, Robustness 35, Focus 20, Vitality 20, Poise 10. Weight 8.1."
      },
      {
        "heading": "Imp Head (Fanged)",
        "text": "5.8% physical, 5.2% strike, 5.8% slash, 6.1% pierce, 5% magic, 5.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 35, Robustness 35, Focus 20, Vitality 20, Poise 10. Weight 8.1."
      },
      {
        "heading": "Imp Head (Long-Tongued)",
        "text": "5.8% physical, 5.2% strike, 5.8% slash, 6.1% pierce, 5% magic, 5.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 35, Robustness 35, Focus 20, Vitality 20, Poise 10. Weight 8.1."
      },
      {
        "heading": "Imp Head (Corpse)",
        "text": "5.8% physical, 5.2% strike, 5.8% slash, 6.1% pierce, 5% magic, 5.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 35, Robustness 35, Focus 20, Vitality 20, Poise 10. Weight 8.1."
      },
      {
        "heading": "Imp Head (Wolf)",
        "text": "5.8% physical, 5.2% strike, 5.8% slash, 6.1% pierce, 5% magic, 5.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 35, Robustness 35, Focus 20, Vitality 20, Poise 10. Weight 8.1."
      },
      {
        "heading": "Imp Head (Elder)",
        "text": "5.8% physical, 5.2% strike, 5.8% slash, 6.1% pierce, 5% magic, 5.8% fire, 4.8% lightning, 5% holy damage negation. Immunity 35, Robustness 35, Focus 20, Vitality 20, Poise 10. Weight 8.1."
      },
      {
        "heading": "Silver Tear Mask",
        "text": "4.2% physical, 3.6% strike, 3.8% slash, 3.1% pierce, 5.5% magic, 5.2% fire, 5% lightning, 5.3% holy damage negation. Immunity 26, Robustness 20, Focus 44, Vitality 44, Poise 6. Weight 4.6."
      },
      {
        "heading": "Chain Coif",
        "text": "4.2% physical, 3.1% strike, 4.6% slash, 4.2% pierce, 2.5% magic, 3.8% fire, 2.1% lightning, 2.8% holy damage negation. Immunity 11, Robustness 18, Focus 5, Vitality 8, Poise 6. Weight 3.8."
      },
      {
        "heading": "Greathelm",
        "text": "5.5% physical, 4.2% strike, 5.8% slash, 5.2% pierce, 4.2% magic, 4.6% fire, 3.8% lightning, 4.2% holy damage negation. Immunity 16, Robustness 29, Focus 11, Vitality 11, Poise 9. Weight 5.9."
      },
      {
        "heading": "Octopus Head",
        "text": "3.4% physical, 5.4% strike, 2.8% slash, 2.8% pierce, 4% magic, 3.6% fire, 4% lightning, 3.8% holy damage negation. Immunity 31, Robustness 14, Focus 23, Vitality 23, Poise 5. Weight 3.6."
      },
      {
        "heading": "Jar",
        "text": "6.8% physical, 3.4% strike, 7% slash, 6.8% pierce, 4.7% magic, 4.9% fire, 4.6% lightning, 4.7% holy damage negation. Immunity 24, Robustness 33, Focus 16, Vitality 15, Poise 10. Weight 6.8."
      },
      {
        "heading": "Mushroom Head",
        "text": "2.1% physical, 2.5% strike, 0.9% slash, 1.8% pierce, 4.7% magic, 1.8% fire, 4.6% lightning, 4.6% holy damage negation. Immunity 44, Robustness 10, Focus 39, Vitality 33, Poise 2. Weight 2.2."
      },
      {
        "heading": "Nox Mirrorhelm",
        "text": "4% physical, 3.4% strike, 5.5% slash, 5% pierce, 6.7% magic, 5.3% fire, 4.2% lightning, 5.3% holy damage negation. Immunity 29, Robustness 33, Focus 26, Vitality 42, Poise 6. Weight 7.5."
      },
      {
        "heading": "Iji's Mirrorhelm",
        "text": "3.8% physical, 3.8% strike, 5.2% slash, 5.2% pierce, 6.2% magic, 4.6% fire, 4.8% lightning, 5.8% holy damage negation. Immunity 22, Robustness 42, Focus 26, Vitality 39, Poise 7. Weight 7.5."
      },
      {
        "heading": "Black Hood",
        "text": "2.8% physical, 3.1% strike, 3.1% slash, 3.1% pierce, 3.1% magic, 3.4% fire, 3.6% lightning, 3.1% holy damage negation. Immunity 33, Robustness 16, Focus 16, Vitality 18, Poise 4. Weight 3."
      },
      {
        "heading": "Bandit Mask",
        "text": "2.8% physical, 3.1% strike, 3.1% slash, 3.1% pierce, 3.1% magic, 3.4% fire, 3.6% lightning, 3.1% holy damage negation. Immunity 30, Robustness 14, Focus 14, Vitality 16, Poise 4. Weight 3."
      },
      {
        "heading": "Knight Helm",
        "text": "4.4% physical, 4.2% strike, 4.8% slash, 4.8% pierce, 3.8% magic, 3.8% fire, 3.4% lightning, 3.1% holy damage negation. Immunity 12, Robustness 22, Focus 8, Vitality 8, Poise 8. Weight 4.6."
      },
      {
        "heading": "Greathood",
        "text": "3.8% physical, 3.6% strike, 3.8% slash, 3.6% pierce, 5.5% magic, 5% fire, 5.5% lightning, 6.2% holy damage negation. Immunity 33, Robustness 20, Focus 47, Vitality 47, Poise 5. Weight 5.1."
      },
      {
        "heading": "Godrick Soldier Helm",
        "text": "4.4% physical, 3.6% strike, 4.4% slash, 4.2% pierce, 3.1% magic, 3.6% fire, 2.5% lightning, 3.1% holy damage negation. Immunity 12, Robustness 22, Focus 9, Vitality 9, Poise 7. Weight 4."
      },
      {
        "heading": "Raya Lucarian Helm",
        "text": "4.4% physical, 3.4% strike, 4.6% slash, 4.4% pierce, 3.4% magic, 3.6% fire, 2.3% lightning, 2.8% holy damage negation. Immunity 12, Robustness 22, Focus 9, Vitality 9, Poise 7. Weight 4."
      },
      {
        "heading": "Leyndell Soldier Helm",
        "text": "4.4% physical, 3.8% strike, 4.2% slash, 4.4% pierce, 2.8% magic, 3.4% fire, 2.8% lightning, 3.1% holy damage negation. Immunity 12, Robustness 22, Focus 9, Vitality 9, Poise 7. Weight 4."
      },
      {
        "heading": "Radahn Soldier Helm",
        "text": "4.6% physical, 3.4% strike, 4.2% slash, 4% pierce, 3.1% magic, 3.8% fire, 2.5% lightning, 3.1% holy damage negation. Immunity 12, Robustness 20, Focus 9, Vitality 10, Poise 7. Weight 4."
      },
      {
        "heading": "Haligtree Helm",
        "text": "4.4% physical, 3.8% strike, 4.2% slash, 4.4% pierce, 2.8% magic, 3.4% fire, 2.5% lightning, 3.4% holy damage negation. Immunity 12, Robustness 22, Focus 9, Vitality 10, Poise 6. Weight 4."
      },
      {
        "heading": "Gelmir Knight Helm",
        "text": "4.8% physical, 4% strike, 5% slash, 4.8% pierce, 3.8% magic, 4.4% fire, 3.6% lightning, 3.8% holy damage negation. Immunity 15, Robustness 23, Focus 10, Vitality 10, Poise 8. Weight 5.1."
      },
      {
        "heading": "Godrick Knight Helm",
        "text": "4.8% physical, 4.2% strike, 5% slash, 4.6% pierce, 3.8% magic, 4.2% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 15, Robustness 24, Focus 10, Vitality 10, Poise 8. Weight 5.1."
      },
      {
        "heading": "Cuckoo Knight Helm",
        "text": "4.8% physical, 4% strike, 5.2% slash, 4.8% pierce, 4.4% magic, 4.2% fire, 3.1% lightning, 3.6% holy damage negation. Immunity 14, Robustness 24, Focus 10, Vitality 10, Poise 8. Weight 5.1."
      },
      {
        "heading": "Leyndell Knight Helm",
        "text": "4.8% physical, 4.4% strike, 4.8% slash, 4.8% pierce, 3.6% magic, 4% fire, 3.6% lightning, 3.8% holy damage negation. Immunity 15, Robustness 24, Focus 10, Vitality 10, Poise 8. Weight 5.1."
      },
      {
        "heading": "Redmane Knight Helm",
        "text": "5% physical, 4% strike, 4.8% slash, 4.4% pierce, 3.8% magic, 4.4% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 15, Robustness 23, Focus 10, Vitality 11, Poise 8. Weight 5.1."
      },
      {
        "heading": "Haligtree Knight Helm",
        "text": "4.8% physical, 4.4% strike, 4.8% slash, 4.8% pierce, 3.6% magic, 4% fire, 3.4% lightning, 4% holy damage negation. Immunity 15, Robustness 24, Focus 10, Vitality 11, Poise 7. Weight 5.1."
      },
      {
        "heading": "Foot Soldier Cap",
        "text": "3.4% physical, 3.6% strike, 3.4% slash, 3.4% pierce, 3.8% magic, 4% fire, 4.2% lightning, 3.8% holy damage negation. Immunity 27, Robustness 18, Focus 23, Vitality 23, Poise 6. Weight 3.6."
      },
      {
        "heading": "Foot Soldier Helmet",
        "text": "3.4% physical, 3.4% strike, 3.6% slash, 3.6% pierce, 4% magic, 4% fire, 4% lightning, 3.6% holy damage negation. Immunity 27, Robustness 18, Focus 23, Vitality 23, Poise 6. Weight 3.6."
      },
      {
        "heading": "Gilded Foot Soldier Cap",
        "text": "3.4% physical, 3.8% strike, 3.1% slash, 3.6% pierce, 3.6% magic, 3.8% fire, 4.4% lightning, 3.8% holy damage negation. Immunity 27, Robustness 18, Focus 23, Vitality 23, Poise 6. Weight 3.6."
      },
      {
        "heading": "Foot Soldier Helm",
        "text": "3.6% physical, 3.4% strike, 3.1% slash, 3.1% pierce, 3.8% magic, 4.2% fire, 4.2% lightning, 3.8% holy damage negation. Immunity 27, Robustness 18, Focus 23, Vitality 23, Poise 6. Weight 3.6."
      },
      {
        "heading": "Sacred Crown Helm",
        "text": "3.4% physical, 3.8% strike, 3.1% slash, 3.6% pierce, 3.6% magic, 3.8% fire, 4.2% lightning, 4% holy damage negation. Immunity 27, Robustness 18, Focus 23, Vitality 24, Poise 5. Weight 3.6."
      },
      {
        "heading": "Omensmirk Mask",
        "text": "3.1% physical, 2.8% strike, 2.5% slash, 2.5% pierce, 3.1% magic, 3.4% fire, 4% lightning, 3.6% holy damage negation. Immunity 29, Robustness 12, Focus 20, Vitality 20, Poise 6. Weight 3."
      },
      {
        "heading": "Ash-of-War Scarab",
        "text": "3.8% physical, 4% strike, 3.8% slash, 3.8% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.5% holy damage negation. Immunity 42, Robustness 22, Focus 27, Vitality 26, Poise 6. Weight 5.1."
      },
      {
        "heading": "Incantation Scarab",
        "text": "3.8% physical, 4% strike, 3.8% slash, 3.8% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.5% holy damage negation. Immunity 42, Robustness 22, Focus 27, Vitality 26, Poise 6. Weight 5.1."
      },
      {
        "heading": "Glintstone Scarab",
        "text": "3.8% physical, 4% strike, 3.8% slash, 3.8% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.5% holy damage negation. Immunity 42, Robustness 22, Focus 27, Vitality 26, Poise 6. Weight 5.1."
      },
      {
        "heading": "Crimson Tear Scarab",
        "text": "3.8% physical, 4% strike, 3.8% slash, 3.8% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.5% holy damage negation. Immunity 42, Robustness 22, Focus 27, Vitality 26, Poise 6. Weight 5.1."
      },
      {
        "heading": "Cerulean Tear Scarab",
        "text": "3.8% physical, 4% strike, 3.8% slash, 3.8% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.5% holy damage negation. Immunity 42, Robustness 22, Focus 27, Vitality 26, Poise 6. Weight 5.1."
      },
      {
        "heading": "Fia's Hood",
        "text": "1.4% physical, 1.8% strike, 1.4% slash, 1.4% pierce, 4.4% magic, 4.2% fire, 4.4% lightning, 4.6% holy damage negation. Immunity 18, Robustness 8, Focus 29, Vitality 45, Poise 2. Weight 1.7."
      },
      {
        "heading": "Highwayman Hood",
        "text": "2.8% physical, 3.6% strike, 2.8% slash, 3.1% pierce, 3.8% magic, 3.8% fire, 4% lightning, 3.6% holy damage negation. Immunity 24, Robustness 15, Focus 22, Vitality 22, Poise 4. Weight 3.3."
      },
      {
        "heading": "High Page Hood",
        "text": "0.9% physical, 1.8% strike, 0.9% slash, 0.9% pierce, 4.6% magic, 4.2% fire, 4.4% lightning, 4.5% holy damage negation. Immunity 15, Robustness 8, Focus 27, Vitality 27, Poise 2. Weight 1.4."
      },
      {
        "heading": "Rotten Duelist Helm",
        "text": "5.5% physical, 4.6% strike, 5.8% slash, 5.5% pierce, 4.5% magic, 4.6% fire, 4.4% lightning, 4.5% holy damage negation. Immunity 31, Robustness 31, Focus 14, Vitality 14, Poise 9. Weight 6.4."
      },
      {
        "heading": "Mushroom Crown",
        "text": "5.8% physical, 5.9% strike, 6.8% slash, 7% pierce, 4.8% magic, 3.1% fire, 4.6% lightning, 4.8% holy damage negation. Immunity 46, Robustness 45, Focus 18, Vitality 22, Poise 10. Weight 9.1."
      },
      {
        "heading": "Black Dumpling",
        "text": "2.8% physical, 3.1% strike, 2.8% slash, 2.8% pierce, 3.1% magic, 3.4% fire, 3.6% lightning, 3.1% holy damage negation. Immunity 24, Robustness 15, Focus 0, Vitality 20, Poise 4. Weight 2.7."
      },
      {
        "heading": "Dane's Hat",
        "text": "1.8% physical, 2.3% strike, 1.4% slash, 1.4% pierce, 5% magic, 4.2% fire, 4.5% lightning, 5% holy damage negation. Immunity 16, Robustness 11, Focus 33, Vitality 31, Poise 3. Weight 2.2."
      },
      {
        "heading": "Gaius's Helm",
        "text": "6.1% physical, 5.6% strike, 7.2% slash, 7% pierce, 5% magic, 4.9% fire, 4.9% lightning, 4.9% holy damage negation. Immunity 29, Robustness 35, Focus 23, Vitality 23, Poise 12. Weight 8.6."
      },
      {
        "heading": "Oathseeker Knight Helm",
        "text": "4.4% physical, 3.8% strike, 4.2% slash, 4% pierce, 3.6% magic, 3.4% fire, 2.3% lightning, 3.4% holy damage negation. Immunity 12, Robustness 21, Focus 10, Vitality 9, Poise 7. Weight 4.4."
      },
      {
        "heading": "Verdigris Helm",
        "text": "7.5% physical, 6.4% strike, 7.2% slash, 6.8% pierce, 4.8% magic, 4.7% fire, 5.2% lightning, 4.7% holy damage negation. Immunity 39, Robustness 46, Focus 15, Vitality 22, Poise 15. Weight 11.1."
      },
      {
        "heading": "Pelt of Ralva",
        "text": "3.1% physical, 3.4% strike, 3.1% slash, 3.1% pierce, 4.2% magic, 4% fire, 4.5% lightning, 4% holy damage negation. Immunity 27, Robustness 23, Focus 22, Vitality 22, Poise 5. Weight 3.6."
      },
      {
        "heading": "Fang Helm",
        "text": "2.3% physical, 2.5% strike, 2.3% slash, 2.3% pierce, 3.6% magic, 3.4% fire, 4% lightning, 3.4% holy damage negation. Immunity 23, Robustness 18, Focus 16, Vitality 16, Poise 4. Weight 2.7."
      },
      {
        "heading": "Thiollier's Mask",
        "text": "4.4% physical, 3.4% strike, 4% slash, 3.8% pierce, 2.3% magic, 3.1% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 15, Robustness 16, Focus 11, Vitality 0, Poise 6. Weight 3.8."
      },
      {
        "heading": "High Priest Hat",
        "text": "1.8% physical, 2.1% strike, 1.4% slash, 0.9% pierce, 4.6% magic, 4.5% fire, 4.4% lightning, 4.5% holy damage negation. Immunity 18, Robustness 10, Focus 27, Vitality 33, Poise 3. Weight 1.7."
      },
      {
        "heading": "Caterpillar Mask",
        "text": "1.8% physical, 1.4% strike, 1.4% slash, 0.9% pierce, 4.5% magic, 3.8% fire, 4.2% lightning, 4.6% holy damage negation. Immunity 16, Robustness 9, Focus 45, Vitality 25, Poise 2. Weight 1.4."
      },
      {
        "heading": "Dancer's Hood",
        "text": "0.9% physical, 0.2% strike, 1.8% slash, 0.2% pierce, 4.4% magic, 4.4% fire, 4% lightning, 4.2% holy damage negation. Immunity 15, Robustness 10, Focus 24, Vitality 26, Poise 1. Weight 1."
      },
      {
        "heading": "Helm of Night",
        "text": "2.5% physical, 2.5% strike, 2.8% slash, 2.8% pierce, 4.4% magic, 3.4% fire, 3.4% lightning, 4.5% holy damage negation. Immunity 23, Robustness 14, Focus 20, Vitality 20, Poise 4. Weight 3."
      },
      {
        "heading": "Igon's Helm",
        "text": "3.1% physical, 3.4% strike, 3.1% slash, 3.1% pierce, 3.6% magic, 3.8% fire, 4% lightning, 3.6% holy damage negation. Immunity 26, Robustness 16, Focus 22, Vitality 22, Poise 5. Weight 3.3."
      },
      {
        "heading": "Igon's Helm (Altered)",
        "text": "2.8% physical, 3.1% strike, 2.8% slash, 2.8% pierce, 3.4% magic, 3.6% fire, 3.8% lightning, 3.4% holy damage negation. Immunity 24, Robustness 15, Focus 20, Vitality 20, Poise 5. Weight 3."
      },
      {
        "heading": "Wise Man's Mask",
        "text": "4.2% physical, 3.6% strike, 4.4% slash, 4% pierce, 3.1% magic, 4% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 11, Robustness 24, Focus 9, Vitality 10, Poise 7. Weight 4."
      },
      {
        "heading": "Freyja's Helm",
        "text": "5.5% physical, 4.2% strike, 4.8% slash, 4.8% pierce, 4% magic, 4.2% fire, 3.8% lightning, 4.2% holy damage negation. Immunity 13, Robustness 28, Focus 9, Vitality 12, Poise 8. Weight 5.8."
      },
      {
        "heading": "Helm of Solitude",
        "text": "6.8% physical, 6.4% strike, 6.7% slash, 6.3% pierce, 4.7% magic, 5.2% fire, 4.8% lightning, 4.9% holy damage negation. Immunity 26, Robustness 27, Focus 42, Vitality 22, Poise 14. Weight 10.3."
      },
      {
        "heading": "Messmer Soldier Helm",
        "text": "4.4% physical, 3.6% strike, 4.4% slash, 4.2% pierce, 3.1% magic, 3.6% fire, 2.5% lightning, 3.1% holy damage negation. Immunity 12, Robustness 22, Focus 9, Vitality 9, Poise 7. Weight 4."
      },
      {
        "heading": "Black Knight Helm",
        "text": "5.2% physical, 4.4% strike, 5.2% slash, 5.8% pierce, 4.4% magic, 4.6% fire, 3.8% lightning, 4% holy damage negation. Immunity 16, Robustness 26, Focus 10, Vitality 9, Poise 9. Weight 5.9."
      },
      {
        "heading": "Rakshasa Helm",
        "text": "4.6% physical, 4.2% strike, 5% slash, 4.8% pierce, 4% magic, 4.4% fire, 3.8% lightning, 4% holy damage negation. Immunity 15, Robustness 26, Focus 12, Vitality 12, Poise 9. Weight 5.5."
      },
      {
        "heading": "Fire Knight Helm",
        "text": "4.6% physical, 3.6% strike, 4.2% slash, 3.8% pierce, 3.4% magic, 4.2% fire, 2.5% lightning, 3.1% holy damage negation. Immunity 12, Robustness 20, Focus 9, Vitality 10, Poise 6. Weight 4."
      },
      {
        "heading": "Death Mask Helm",
        "text": "4.3% physical, 3.3% strike, 3.9% slash, 3.5% pierce, 3% magic, 3.9% fire, 2.2% lightning, 2.7% holy damage negation. Immunity 10, Robustness 16, Focus 7, Vitality 9, Poise 6. Weight 3.4."
      },
      {
        "heading": "Winged Serpent Helm",
        "text": "4.8% physical, 4% strike, 4.4% slash, 4% pierce, 3.8% magic, 4.4% fire, 2.8% lightning, 3.4% holy damage negation. Immunity 14, Robustness 22, Focus 10, Vitality 11, Poise 7. Weight 4.6."
      },
      {
        "heading": "Salza's Hood",
        "text": "4.4% physical, 3.6% strike, 4.4% slash, 3.8% pierce, 3.1% magic, 4% fire, 2.8% lightning, 3.1% holy damage negation. Immunity 12, Robustness 20, Focus 9, Vitality 10, Poise 6. Weight 3.8."
      },
      {
        "heading": "Leather Headband",
        "text": "1.4% physical, 2.1% strike, 1.8% slash, 1.4% pierce, 1.8% magic, 2.3% fire, 2.8% lightning, 2.3% holy damage negation. Immunity 16, Robustness 10, Focus 12, Vitality 11, Poise 2. Weight 1."
      },
      {
        "heading": "Leather Crown",
        "text": "3.1% physical, 3.6% strike, 3.4% slash, 3.1% pierce, 3.4% magic, 3.8% fire, 4.2% lightning, 3.8% holy damage negation. Immunity 26, Robustness 15, Focus 22, Vitality 20, Poise 5. Weight 3.3."
      },
      {
        "heading": "Death Knight Helm",
        "text": "4.4% physical, 3.8% strike, 4.4% slash, 4.4% pierce, 3.4% magic, 3.4% fire, 4.4% lightning, 2.8% holy damage negation. Immunity 12, Robustness 20, Focus 8, Vitality 20, Poise 7. Weight 4.6."
      },
      {
        "heading": "Curseblade Mask",
        "text": "2.5% physical, 0.9% strike, 2.3% slash, 2.1% pierce, 4.6% magic, 4.6% fire, 4.6% lightning, 4.9% holy damage negation. Immunity 22, Robustness 11, Focus 0, Vitality 33, Poise 4. Weight 2.2."
      },
      {
        "heading": "Messmer's Helm",
        "text": "3.4% physical, 3.4% strike, 3.1% slash, 3.8% pierce, 3.6% magic, 4.4% fire, 4.2% lightning, 3.6% holy damage negation. Immunity 26, Robustness 18, Focus 24, Vitality 26, Poise 5. Weight 3.6."
      },
      {
        "heading": "Messmer's Helm (Altered)",
        "text": "3.1% physical, 3.1% strike, 2.8% slash, 3.6% pierce, 3.4% magic, 4.2% fire, 4% lightning, 3.4% holy damage negation. Immunity 24, Robustness 16, Focus 23, Vitality 24, Poise 5. Weight 3.3."
      },
      {
        "heading": "Gravebird Helm",
        "text": "3.4% physical, 3.6% strike, 3.6% slash, 3.1% pierce, 4% magic, 3.8% fire, 4.2% lightning, 4.2% holy damage negation. Immunity 24, Robustness 14, Focus 21, Vitality 20, Poise 6. Weight 3.6."
      },
      {
        "heading": "Common Soldier Helm",
        "text": "4.4% physical, 3.4% strike, 4.2% slash, 4.2% pierce, 2.5% magic, 3.1% fire, 2.1% lightning, 2.8% holy damage negation. Immunity 11, Robustness 20, Focus 8, Vitality 8, Poise 6. Weight 3.8."
      },
      {
        "heading": "Horned Warrior Helm",
        "text": "4.8% physical, 4.4% strike, 4.6% slash, 4% pierce, 3.6% magic, 3.6% fire, 3.1% lightning, 3.1% holy damage negation. Immunity 13, Robustness 25, Focus 0, Vitality 9, Poise 7. Weight 4.6."
      },
      {
        "heading": "Divine Beast Helm",
        "text": "4.8% physical, 4.4% strike, 4.8% slash, 4.4% pierce, 3.8% magic, 4% fire, 3.6% lightning, 3.8% holy damage negation. Immunity 14, Robustness 23, Focus 0, Vitality 11, Poise 8. Weight 5.1."
      },
      {
        "heading": "Divine Bird Helm",
        "text": "4.8% physical, 4.4% strike, 4.4% slash, 4.2% pierce, 3.8% magic, 3.6% fire, 2.8% lightning, 3.1% holy damage negation. Immunity 14, Robustness 22, Focus 0, Vitality 9, Poise 8. Weight 4.6."
      },
      {
        "heading": "Rellana's Helm",
        "text": "4.8% physical, 4.2% strike, 5% slash, 4.6% pierce, 4.5% magic, 4.2% fire, 3.4% lightning, 3.8% holy damage negation. Immunity 15, Robustness 24, Focus 10, Vitality 10, Poise 8. Weight 5.1."
      },
      {
        "heading": "Young Lion's Helm",
        "text": "6.1% physical, 5.2% strike, 6.1% slash, 6.1% pierce, 4.4% magic, 4.6% fire, 4% lightning, 4.6% holy damage negation. Immunity 22, Robustness 31, Focus 11, Vitality 15, Poise 10. Weight 6.4."
      },
      {
        "heading": "Circlet of Light",
        "text": "2.8% physical, 3.1% strike, 2.5% slash, 2.8% pierce, 2.8% magic, 3.1% fire, 3.4% lightning, 3.4% holy damage negation. Immunity 23, Robustness 14, Focus 15, Vitality 20, Poise 5. Weight 1."
      },
      {
        "heading": "Shadow Militiaman Helm",
        "text": "2.5% physical, 3.1% strike, 2.8% slash, 2.8% pierce, 3.6% magic, 3.8% fire, 3.8% lightning, 3.1% holy damage negation. Immunity 33, Robustness 14, Focus 18, Vitality 18, Poise 4. Weight 3."
      },
      {
        "heading": "Divine Beast Head",
        "text": "7% physical, 5.9% strike, 6.7% slash, 6.8% pierce, 4.9% magic, 7.2% fire, 4.6% lightning, 4.9% holy damage negation. Immunity 29, Robustness 26, Focus 0, Vitality 24, Poise 13. Weight 10.6."
      },
      {
        "heading": "St. Trina's Blossom",
        "text": "0.9% physical, 0.9% strike, 1.4% slash, -0.8% pierce, 4.4% magic, 3.8% fire, 4.4% lightning, 4.4% holy damage negation. Immunity 12, Robustness 4, Focus 24, Vitality 24, Poise 2. Weight 1."
      },
      {
        "heading": "Crucible Hammer-Helm",
        "text": "6.8% physical, 6.1% strike, 6.8% slash, 6.7% pierce, 4.7% magic, 4.9% fire, 4.5% lightning, 4.6% holy damage negation. Immunity 26, Robustness 33, Focus 18, Vitality 18, Poise 11. Weight 7.5."
      },
      {
        "heading": "Greatjar",
        "text": "8% physical, 6.9% strike, 7.7% slash, 7.7% pierce, 5.3% magic, 5.2% fire, 5.5% lightning, 5.1% holy damage negation. Immunity 32, Robustness 34, Focus 22, Vitality 21, Poise 14. Weight 12.3."
      },
      {
        "heading": "Imp Head (Lion)",
        "text": "7% physical, 5.9% strike, 7% slash, 7% pierce, 4.6% magic, 5.2% fire, 4.6% lightning, 4.6% holy damage negation. Immunity 26, Robustness 44, Focus 18, Vitality 18, Poise 13. Weight 8.1."
      }
    ]
  },
  {
    "title": "Body",
    "url": "questbot://guide/armor/body",
    "sections": [
      {
        "heading": "Scale Armor",
        "text": "11.9% physical, 10.2% strike, 12.4% slash, 10.9% pierce, 7.1% magic, 10.9% fire, 6.7% lightning, 8% holy damage negation. Immunity 25, Robustness 46, Focus 11, Vitality 21, Poise 18. Weight 8.8."
      },
      {
        "heading": "Kaiden Armor",
        "text": "11.9% physical, 8.8% strike, 11.9% slash, 11.9% pierce, 8% magic, 8.8% fire, 7.1% lightning, 8% holy damage negation. Immunity 25, Robustness 55, Focus 11, Vitality 11, Poise 18. Weight 8.8."
      },
      {
        "heading": "Drake Knight Armor",
        "text": "11.4% physical, 9.5% strike, 11.9% slash, 11.4% pierce, 10.2% magic, 11.4% fire, 8.8% lightning, 10.2% holy damage negation. Immunity 25, Robustness 46, Focus 21, Vitality 21, Poise 19. Weight 9.2."
      },
      {
        "heading": "Drake Knight Armor (Altered)",
        "text": "11.2% physical, 8.6% strike, 11.2% slash, 10.7% pierce, 8% magic, 9.5% fire, 6.7% lightning, 8% holy damage negation. Immunity 21, Robustness 34, Focus 10, Vitality 10, Poise 16. Weight 8.3."
      },
      {
        "heading": "Scaled Armor",
        "text": "16% physical, 13.9% strike, 16.8% slash, 16% pierce, 13.5% magic, 14.1% fire, 13% lightning, 13.5% holy damage negation. Immunity 57, Robustness 83, Focus 38, Vitality 38, Poise 33. Weight 16."
      },
      {
        "heading": "Scaled Armor (Altered)",
        "text": "15.3% physical, 13.4% strike, 16% slash, 15.3% pierce, 12.8% magic, 13.3% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 45, Robustness 64, Focus 29, Vitality 29, Poise 30. Weight 15."
      },
      {
        "heading": "Perfumer Robe",
        "text": "5.3% physical, 6.7% strike, 6.1% slash, 5.3% pierce, 13% magic, 12.4% fire, 12.6% lightning, 13% holy damage negation. Immunity 63, Robustness 21, Focus 71, Vitality 76, Poise 10. Weight 5.1."
      },
      {
        "heading": "Perfumer Robe (Altered)",
        "text": "4.2% physical, 6.1% strike, 5.3% slash, 4.2% pierce, 12.8% magic, 11.9% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 54, Robustness 18, Focus 63, Vitality 67, Poise 8. Weight 4.1."
      },
      {
        "heading": "Perfumer's Traveling Garb",
        "text": "6.1% physical, 6.1% strike, 5.3% slash, 4.2% pierce, 13% magic, 13% fire, 12.6% lightning, 13% holy damage negation. Immunity 57, Robustness 23, Focus 76, Vitality 71, Poise 10. Weight 5.1."
      },
      {
        "heading": "Perfumer's Traveling Garb (Altered)",
        "text": "5.3% physical, 5.3% strike, 4.2% slash, 2.7% pierce, 12.8% magic, 12.8% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 55, Robustness 21, Focus 67, Vitality 63, Poise 8. Weight 4.1."
      },
      {
        "heading": "Alberich's Robe",
        "text": "5.3% physical, 4.2% strike, 5.3% slash, 5.3% pierce, 12.8% magic, 11.9% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 38, Robustness 23, Focus 67, Vitality 71, Poise 7. Weight 4.1."
      },
      {
        "heading": "Alberich's Robe (Altered)",
        "text": "4.2% physical, 2.7% strike, 4.2% slash, 4.2% pierce, 12.6% magic, 11.4% fire, 11.9% lightning, 12.6% holy damage negation. Immunity 32, Robustness 19, Focus 57, Vitality 61, Poise 5. Weight 3.2."
      },
      {
        "heading": "Spellblade's Traveling Attire",
        "text": "4.1% physical, 2.6% strike, 4.1% slash, 4.1% pierce, 12.7% magic, 11.3% fire, 11.8% lightning, 12.7% holy damage negation. Immunity 35, Robustness 17, Focus 59, Vitality 63, Poise 7. Weight 3.3."
      },
      {
        "heading": "Spellblade's Traveling Attire (Altered)",
        "text": "2.6% physical, 0.5% strike, 2.6% slash, 2.6% pierce, 12.6% magic, 10.9% fire, 11.4% lightning, 12.6% holy damage negation. Immunity 32, Robustness 10, Focus 54, Vitality 57, Poise 5. Weight 2.5."
      },
      {
        "heading": "Bull-Goat Armor",
        "text": "20.4% physical, 20.2% strike, 18.3% slash, 18.3% pierce, 13.3% magic, 13.5% fire, 14.9% lightning, 12.8% holy damage negation. Immunity 71, Robustness 83, Focus 46, Vitality 55, Poise 47. Weight 26.5."
      },
      {
        "heading": "Ronin's Armor",
        "text": "10.5% physical, 10.5% strike, 11.2% slash, 10.5% pierce, 11.9% magic, 12.4% fire, 13.4% lightning, 11.9% holy damage negation. Immunity 66, Robustness 48, Focus 52, Vitality 57, Poise 16. Weight 8.5."
      },
      {
        "heading": "Ronin's Armor (Altered)",
        "text": "8.8% physical, 8.8% strike, 9.5% slash, 8.8% pierce, 10.2% magic, 10.9% fire, 11.9% lightning, 10.2% holy damage negation. Immunity 54, Robustness 38, Focus 42, Vitality 45, Poise 15. Weight 7.6."
      },
      {
        "heading": "Cloth Garb",
        "text": "5.3% physical, 4.2% strike, 2.7% slash, 4.2% pierce, 12.8% magic, 12.4% fire, 11.9% lightning, 12.4% holy damage negation. Immunity 42, Robustness 23, Focus 60, Vitality 60, Poise 5. Weight 3.2."
      },
      {
        "heading": "Blaidd's Armor",
        "text": "14.6% physical, 12.9% strike, 14.6% slash, 15.3% pierce, 11.4% magic, 12.6% fire, 10.2% lightning, 11.9% holy damage negation. Immunity 38, Robustness 76, Focus 25, Vitality 25, Poise 28. Weight 13.7."
      },
      {
        "heading": "Blaidd's Armor (Altered)",
        "text": "14% physical, 12.4% strike, 14% slash, 14.6% pierce, 10.9% magic, 12.4% fire, 9.5% lightning, 11.4% holy damage negation. Immunity 32, Robustness 57, Focus 22, Vitality 21, Poise 27. Weight 12.5."
      },
      {
        "heading": "Black Knife Armor",
        "text": "11.4% physical, 10.9% strike, 12.4% slash, 12.4% pierce, 8.8% magic, 9.5% fire, 6.7% lightning, 11.4% holy damage negation. Immunity 28, Robustness 46, Focus 23, Vitality 23, Poise 19. Weight 9.2."
      },
      {
        "heading": "Black Knife Armor (Altered)",
        "text": "11.3% physical, 10.8% strike, 12.3% slash, 12.3% pierce, 8.7% magic, 9.4% fire, 6.6% lightning, 11.3% holy damage negation. Immunity 25, Robustness 42, Focus 21, Vitality 21, Poise 19. Weight 9."
      },
      {
        "heading": "Exile Armor",
        "text": "12.4% physical, 9.5% strike, 12.9% slash, 12.4% pierce, 8% magic, 10.9% fire, 6.7% lightning, 9.5% holy damage negation. Immunity 28, Robustness 55, Focus 21, Vitality 18, Poise 19. Weight 9.2."
      },
      {
        "heading": "Banished Knight Armor",
        "text": "18.7% physical, 15% strike, 19.2% slash, 17.5% pierce, 13.5% magic, 13.5% fire, 13% lightning, 13.3% holy damage negation. Immunity 60, Robustness 83, Focus 38, Vitality 42, Poise 34. Weight 17.5."
      },
      {
        "heading": "Banished Knight Armor (Altered)",
        "text": "18.3% physical, 14.4% strike, 18.7% slash, 16.8% pierce, 13.3% magic, 13.3% fire, 12.8% lightning, 13% holy damage negation. Immunity 52, Robustness 69, Focus 32, Vitality 34, Poise 33. Weight 16.5."
      },
      {
        "heading": "Briar Armor",
        "text": "12.9% physical, 11.4% strike, 13.5% slash, 12.4% pierce, 10.9% magic, 12.4% fire, 8.8% lightning, 10.9% holy damage negation. Immunity 35, Robustness 71, Focus 24, Vitality 24, Poise 21. Weight 11.8."
      },
      {
        "heading": "Briar Armor (Altered)",
        "text": "12.4% physical, 10.9% strike, 12.4% slash, 11.9% pierce, 10.2% magic, 11.4% fire, 7.1% lightning, 9.5% holy damage negation. Immunity 29, Robustness 61, Focus 21, Vitality 21, Poise 19. Weight 10.7."
      },
      {
        "heading": "Page Garb",
        "text": "6.7% physical, 6.1% strike, 5.3% slash, 5.3% pierce, 12.8% magic, 12.6% fire, 13% lightning, 13% holy damage negation. Immunity 42, Robustness 23, Focus 83, Vitality 83, Poise 10. Weight 5.1."
      },
      {
        "heading": "Page Garb (Altered)",
        "text": "6.3% physical, 5.5% strike, 4.4% slash, 4.4% pierce, 12.8% magic, 12.6% fire, 13% lightning, 13% holy damage negation. Immunity 34, Robustness 19, Focus 64, Vitality 64, Poise 8. Weight 4.5."
      },
      {
        "heading": "Night's Cavalry Armor",
        "text": "14% physical, 12.9% strike, 14% slash, 13.5% pierce, 10.9% magic, 12.6% fire, 10.9% lightning, 12.6% holy damage negation. Immunity 38, Robustness 57, Focus 24, Vitality 24, Poise 25. Weight 12.8."
      },
      {
        "heading": "Night's Cavalry Armor (Altered)",
        "text": "13.5% physical, 12.4% strike, 13.5% slash, 12.4% pierce, 10.2% magic, 12.4% fire, 10.2% lightning, 12.4% holy damage negation. Immunity 32, Robustness 50, Focus 21, Vitality 21, Poise 24. Weight 11.8."
      },
      {
        "heading": "Blue Silver Mail Armor",
        "text": "12.4% physical, 9.5% strike, 12.9% slash, 11.4% pierce, 10.9% magic, 10.2% fire, 8% lightning, 8% holy damage negation. Immunity 25, Robustness 60, Focus 18, Vitality 18, Poise 19. Weight 9.2."
      },
      {
        "heading": "Blue Silver Mail Armor (Altered)",
        "text": "12.1% physical, 9% strike, 12.6% slash, 11.1% pierce, 10.4% magic, 9.7% fire, 7.3% lightning, 7.3% holy damage negation. Immunity 21, Robustness 52, Focus 10, Vitality 10, Poise 17. Weight 8.5."
      },
      {
        "heading": "Nomadic Merchant's Finery",
        "text": "8% physical, 8.8% strike, 7.1% slash, 6.7% pierce, 9.5% magic, 9.5% fire, 9.5% lightning, 8.8% holy damage negation. Immunity 57, Robustness 32, Focus 71, Vitality 46, Poise 13. Weight 7.2."
      },
      {
        "heading": "Nomadic Merchant's Finery (Altered)",
        "text": "7% physical, 7.9% strike, 6.6% slash, 6% pierce, 8.7% magic, 8.7% fire, 8.7% lightning, 7.9% holy damage negation. Immunity 50, Robustness 25, Focus 61, Vitality 38, Poise 12. Weight 6.1."
      },
      {
        "heading": "Malformed Dragon Armor",
        "text": "16.8% physical, 15% strike, 17.5% slash, 16.8% pierce, 13% magic, 13% fire, 13.8% lightning, 13% holy damage negation. Immunity 57, Robustness 76, Focus 38, Vitality 38, Poise 31. Weight 16."
      },
      {
        "heading": "Tree Sentinel Armor",
        "text": "18.7% physical, 15% strike, 18.7% slash, 17.5% pierce, 13% magic, 17.1% fire, 12.6% lightning, 14.1% holy damage negation. Immunity 67, Robustness 90, Focus 42, Vitality 46, Poise 39. Weight 18.9."
      },
      {
        "heading": "Tree Sentinel Armor (Altered)",
        "text": "18.5% physical, 14.8% strike, 18.5% slash, 17.3% pierce, 12.6% magic, 16.4% fire, 12.4% lightning, 14% holy damage negation. Immunity 57, Robustness 75, Focus 34, Vitality 38, Poise 35. Weight 18.1."
      },
      {
        "heading": "Royal Knight Armor",
        "text": "16% physical, 14.4% strike, 17.5% slash, 16.8% pierce, 14.1% magic, 13.3% fire, 12.4% lightning, 13% holy damage negation. Immunity 50, Robustness 67, Focus 35, Vitality 35, Poise 24. Weight 15.5."
      },
      {
        "heading": "Royal Knight Armor (Altered)",
        "text": "15.8% physical, 14.2% strike, 17.3% slash, 16.6% pierce, 13.9% magic, 13.1% fire, 12.2% lightning, 12.8% holy damage negation. Immunity 45, Robustness 61, Focus 32, Vitality 32, Poise 28. Weight 15."
      },
      {
        "heading": "Nox Monk Armor",
        "text": "9.3% physical, 10% strike, 9.3% slash, 8.6% pierce, 12.2% magic, 11.7% fire, 11.7% lightning, 10% holy damage negation. Immunity 63, Robustness 42, Focus 50, Vitality 50, Poise 16. Weight 8.1."
      },
      {
        "heading": "Nox Monk Armor (Altered)",
        "text": "8.6% physical, 9.3% strike, 8.6% slash, 7.8% pierce, 11.7% magic, 11.2% fire, 11.2% lightning, 9.3% holy damage negation. Immunity 54, Robustness 34, Focus 42, Vitality 42, Poise 15. Weight 7.4."
      },
      {
        "heading": "Nox Swordstress Armor",
        "text": "8.8% physical, 10.2% strike, 8.8% slash, 9.5% pierce, 12.6% magic, 10.9% fire, 12.4% lightning, 11.4% holy damage negation. Immunity 60, Robustness 38, Focus 55, Vitality 55, Poise 17. Weight 8.3."
      },
      {
        "heading": "Night Maiden Armor",
        "text": "8% physical, 9.5% strike, 8% slash, 10.2% pierce, 12.4% magic, 11.4% fire, 11.9% lightning, 12.4% holy damage negation. Immunity 63, Robustness 38, Focus 55, Vitality 55, Poise 16. Weight 8.3."
      },
      {
        "heading": "Nox Swordstress Armor (Altered)",
        "text": "8% physical, 9.5% strike, 8% slash, 8.8% pierce, 12.4% magic, 10.2% fire, 11.9% lightning, 10.9% holy damage negation. Immunity 56, Robustness 34, Focus 49, Vitality 49, Poise 16. Weight 7.5."
      },
      {
        "heading": "Fur Raiment",
        "text": "6.1% physical, 6.7% strike, 6.1% slash, 6.1% pierce, 6.7% magic, 7.1% fire, 8.8% lightning, 7.1% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 38, Poise 8. Weight 5.1."
      },
      {
        "heading": "Shaman Furs",
        "text": "5.3% physical, 6.1% strike, 5.3% slash, 8% pierce, 8% magic, 7.1% fire, 8% lightning, 6.7% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 35, Poise 10. Weight 5.1."
      },
      {
        "heading": "Gravekeeper Cloak",
        "text": "7.1% physical, 8.8% strike, 7.1% slash, 7.1% pierce, 8% magic, 9.5% fire, 10.2% lightning, 8.8% holy damage negation. Immunity 63, Robustness 25, Focus 42, Vitality 42, Poise 12. Weight 6.3."
      },
      {
        "heading": "Gravekeeper Cloak (Altered)",
        "text": "6.7% physical, 8% strike, 6.7% slash, 6.7% pierce, 7.1% magic, 8.8% fire, 9.5% lightning, 8% holy damage negation. Immunity 54, Robustness 22, Focus 34, Vitality 34, Poise 8. Weight 5.1."
      },
      {
        "heading": "Sanguine Noble Robe",
        "text": "6.1% physical, 5.3% strike, 5.3% slash, 5.3% pierce, 13.3% magic, 11.9% fire, 13% lightning, 13.5% holy damage negation. Immunity 50, Robustness 21, Focus 83, Vitality 76, Poise 10. Weight 5.1."
      },
      {
        "heading": "Guardian Garb (Full Bloom)",
        "text": "10.2% physical, 10.2% strike, 9.5% slash, 9.5% pierce, 11.9% magic, -2.3% fire, 11.9% lightning, 11.4% holy damage negation. Immunity 71, Robustness 46, Focus 57, Vitality 55, Poise 15. Weight 8.8."
      },
      {
        "heading": "Guardian Garb",
        "text": "9.5% physical, 9.5% strike, 8.8% slash, 8% pierce, 10.9% magic, 10.2% fire, 10.9% lightning, 10.9% holy damage negation. Immunity 61, Robustness 38, Focus 50, Vitality 42, Poise 15. Weight 7.7."
      },
      {
        "heading": "Cleanrot Armor",
        "text": "14.6% physical, 13.4% strike, 16% slash, 17.5% pierce, 12.6% magic, 12.8% fire, 11.4% lightning, 13.5% holy damage negation. Immunity 63, Robustness 67, Focus 28, Vitality 32, Poise 27. Weight 15."
      },
      {
        "heading": "Cleanrot Armor (Altered)",
        "text": "13.5% physical, 12.4% strike, 14.6% slash, 16% pierce, 11.9% magic, 12.4% fire, 10.2% lightning, 13% holy damage negation. Immunity 52, Robustness 54, Focus 22, Vitality 22, Poise 24. Weight 13.7."
      },
      {
        "heading": "Fire Monk Armor",
        "text": "14% physical, 12.4% strike, 13.5% slash, 12.4% pierce, 10.9% magic, 13.3% fire, 9.5% lightning, 9.5% holy damage negation. Immunity 32, Robustness 55, Focus 24, Vitality 24, Poise 22. Weight 11.8."
      },
      {
        "heading": "Blackflame Monk Armor",
        "text": "13.5% physical, 11.4% strike, 14.6% slash, 12.9% pierce, 10.2% magic, 13% fire, 8% lightning, 10.2% holy damage negation. Immunity 32, Robustness 55, Focus 21, Vitality 32, Poise 24. Weight 11.8."
      },
      {
        "heading": "Fire Prelate Armor",
        "text": "19.2% physical, 17% strike, 18.3% slash, 18.3% pierce, 13.5% magic, 19.8% fire, 13% lightning, 13.3% holy damage negation. Immunity 67, Robustness 63, Focus 90, Vitality 50, Poise 45. Weight 24.7."
      },
      {
        "heading": "Fire Prelate Armor (Altered)",
        "text": "18.7% physical, 16.3% strike, 17.5% slash, 17.5% pierce, 13.3% magic, 18.3% fire, 12.8% lightning, 13% holy damage negation. Immunity 57, Robustness 54, Focus 75, Vitality 42, Poise 43. Weight 23.6."
      },
      {
        "heading": "Aristocrat Garb",
        "text": "7.8% physical, 8.6% strike, 7.8% slash, 7.8% pierce, 6.5% magic, 6.9% fire, 7.8% lightning, 6.5% holy damage negation. Immunity 47, Robustness 33, Focus 36, Vitality 30, Poise 12. Weight 4.9."
      },
      {
        "heading": "Aristocrat Garb (Altered)",
        "text": "7.1% physical, 8% strike, 7.1% slash, 7.1% pierce, 6.1% magic, 6.7% fire, 7.1% lightning, 6.1% holy damage negation. Immunity 42, Robustness 29, Focus 32, Vitality 25, Poise 10. Weight 4.1."
      },
      {
        "heading": "Aristocrat Coat",
        "text": "8.8% physical, 8.8% strike, 8% slash, 8.8% pierce, 10.9% magic, 11.4% fire, 10.9% lightning, 8.8% holy damage negation. Immunity 50, Robustness 32, Focus 42, Vitality 46, Poise 13. Weight 7.1."
      },
      {
        "heading": "Old Aristocrat Gown",
        "text": "7.1% physical, 7.1% strike, 6.7% slash, 7.1% pierce, 9.5% magic, 10.2% fire, 9.5% lightning, 7.1% holy damage negation. Immunity 42, Robustness 25, Focus 35, Vitality 38, Poise 10. Weight 5.1."
      },
      {
        "heading": "Vulgar Militia Armor",
        "text": "8.8% physical, 10.2% strike, 9.5% slash, 8% pierce, 10.2% magic, 10.2% fire, 10.9% lightning, 10.2% holy damage negation. Immunity 67, Robustness 35, Focus 50, Vitality 50, Poise 16. Weight 7.7."
      },
      {
        "heading": "Sage Robe",
        "text": "6.7% physical, 6.1% strike, 6.1% slash, 4.2% pierce, 13.5% magic, 12.6% fire, 13% lightning, 13.5% holy damage negation. Immunity 38, Robustness 23, Focus 71, Vitality 76, Poise 8. Weight 5.1."
      },
      {
        "heading": "Elden Lord Armor",
        "text": "11.9% physical, 10.9% strike, 11.4% slash, 12.4% pierce, 8.8% magic, 11.4% fire, 7.1% lightning, 8% holy damage negation. Immunity 32, Robustness 55, Focus 18, Vitality 21, Poise 19. Weight 9.2."
      },
      {
        "heading": "Elden Lord Armor (Altered)",
        "text": "11.1% physical, 9.9% strike, 10.6% slash, 11.6% pierce, 7.7% magic, 10.6% fire, 6.4% lightning, 6.8% holy damage negation. Immunity 22, Robustness 45, Focus 10, Vitality 16, Poise 17. Weight 8.4."
      },
      {
        "heading": "Radahn's Lion Armor",
        "text": "18.7% physical, 15% strike, 18.3% slash, 17.5% pierce, 13.5% magic, 14.1% fire, 12.6% lightning, 13.5% holy damage negation. Immunity 60, Robustness 99, Focus 42, Vitality 38, Poise 34. Weight 17.5."
      },
      {
        "heading": "Radahn's Lion Armor (Altered)",
        "text": "18.5% physical, 14.6% strike, 17.7% slash, 17% pierce, 13.3% magic, 14% fire, 12.4% lightning, 13.3% holy damage negation. Immunity 52, Robustness 82, Focus 34, Vitality 32, Poise 33. Weight 16.4."
      },
      {
        "heading": "Lord of Blood's Robe",
        "text": "9.3% physical, 10% strike, 8.6% slash, 8.6% pierce, 10% magic, 12.2% fire, 12.2% lightning, 13.3% holy damage negation. Immunity 63, Robustness 23, Focus 55, Vitality 55, Poise 17. Weight 8.1."
      },
      {
        "heading": "Lord of Blood's Robe (Altered)",
        "text": "8.9% physical, 9.6% strike, 8.1% slash, 8.1% pierce, 9.6% magic, 12% fire, 12% lightning, 13.4% holy damage negation. Immunity 57, Robustness 19, Focus 47, Vitality 47, Poise 16. Weight 7.3."
      },
      {
        "heading": "Queen's Robe",
        "text": "6.1% physical, 5.3% strike, 5.3% slash, 4.2% pierce, 13.8% magic, 12.6% fire, 12.8% lightning, 13.3% holy damage negation. Immunity 42, Robustness 25, Focus 71, Vitality 83, Poise 8. Weight 5.1."
      },
      {
        "heading": "Godskin Apostle Robe",
        "text": "6.1% physical, 5.3% strike, 5.3% slash, 2.7% pierce, 12.6% magic, 11.9% fire, 12.4% lightning, 13.8% holy damage negation. Immunity 42, Robustness 21, Focus 67, Vitality 63, Poise 8. Weight 4.1."
      },
      {
        "heading": "Godskin Noble Robe",
        "text": "6.1% physical, 9.5% strike, 6.7% slash, 6.1% pierce, 13% magic, 12.4% fire, 12.6% lightning, 14.1% holy damage negation. Immunity 46, Robustness 25, Focus 76, Vitality 83, Poise 12. Weight 6.3."
      },
      {
        "heading": "Depraved Perfumer Robe",
        "text": "6% physical, 6% strike, 5.2% slash, 4.1% pierce, 13.2% magic, 12.7% fire, 12.5% lightning, 12.7% holy damage negation. Immunity 65, Robustness 22, Focus 55, Vitality 80, Poise 8. Weight 5."
      },
      {
        "heading": "Depraved Perfumer Robe (Altered)",
        "text": "5.3% physical, 5.2% strike, 4.1% slash, 2.6% pierce, 13% magic, 12.6% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 63, Robustness 18, Focus 48, Vitality 63, Poise 7. Weight 4."
      },
      {
        "heading": "Crucible Axe Armor",
        "text": "17.5% physical, 13.9% strike, 16.8% slash, 16.8% pierce, 13% magic, 12.8% fire, 11.4% lightning, 13.5% holy damage negation. Immunity 50, Robustness 71, Focus 35, Vitality 35, Poise 33. Weight 15.5."
      },
      {
        "heading": "Crucible Tree Armor",
        "text": "17.7% physical, 13.9% strike, 17.5% slash, 15.8% pierce, 13% magic, 11.9% fire, 11.4% lightning, 14.5% holy damage negation. Immunity 50, Robustness 71, Focus 35, Vitality 35, Poise 33. Weight 15.5."
      },
      {
        "heading": "Crucible Axe Armor (Altered)",
        "text": "16.8% physical, 13.4% strike, 16% slash, 16% pierce, 12.8% magic, 12.6% fire, 10.9% lightning, 13.3% holy damage negation. Immunity 42, Robustness 61, Focus 29, Vitality 29, Poise 31. Weight 14.9."
      },
      {
        "heading": "Crucible Tree Armor (Altered)",
        "text": "17% physical, 13.4% strike, 16% slash, 15.6% pierce, 12.8% magic, 11.4% fire, 10.9% lightning, 14.1% holy damage negation. Immunity 42, Robustness 61, Focus 29, Vitality 29, Poise 31. Weight 14.9."
      },
      {
        "heading": "Lusat's Robe",
        "text": "8% physical, 6.1% strike, 8% slash, 6.1% pierce, 15.4% magic, 12.8% fire, 13.3% lightning, 13.5% holy damage negation. Immunity 50, Robustness 25, Focus 83, Vitality 99, Poise 12. Weight 7.1."
      },
      {
        "heading": "Azur's Glintstone Robe",
        "text": "7.1% physical, 6.1% strike, 6.7% slash, 6.7% pierce, 15.4% magic, 12.8% fire, 13% lightning, 13.8% holy damage negation. Immunity 50, Robustness 28, Focus 99, Vitality 83, Poise 12. Weight 7.1."
      },
      {
        "heading": "All-Knowing Armor",
        "text": "12.9% physical, 11.9% strike, 13.5% slash, 11.9% pierce, 12.4% magic, 9.5% fire, 10.2% lightning, 8.8% holy damage negation. Immunity 28, Robustness 46, Focus 21, Vitality 21, Poise 22. Weight 10.7."
      },
      {
        "heading": "All-Knowing Armor (Altered)",
        "text": "12.4% physical, 10.9% strike, 12.9% slash, 11.4% pierce, 11.4% magic, 8.8% fire, 9.5% lightning, 8% holy damage negation. Immunity 22, Robustness 38, Focus 16, Vitality 16, Poise 21. Weight 9.3."
      },
      {
        "heading": "Twinned Armor",
        "text": "14.6% physical, 13.4% strike, 16% slash, 13.5% pierce, 12.4% magic, 12.4% fire, 10.2% lightning, 11.4% holy damage negation. Immunity 38, Robustness 60, Focus 24, Vitality 60, Poise 25. Weight 13.7."
      },
      {
        "heading": "Twinned Armor (Altered)",
        "text": "14% physical, 12.9% strike, 15.3% slash, 12.9% pierce, 11.9% magic, 11.9% fire, 9.5% lightning, 10.9% holy damage negation. Immunity 32, Robustness 52, Focus 21, Vitality 52, Poise 24. Weight 12.8."
      },
      {
        "heading": "Corhyn's Robe",
        "text": "6.1% physical, 6.7% strike, 6.7% slash, 6.1% pierce, 13.3% magic, 12.8% fire, 12.8% lightning, 13.5% holy damage negation. Immunity 46, Robustness 24, Focus 107, Vitality 76, Poise 10. Weight 6.3."
      },
      {
        "heading": "Prophet Robe (Altered)",
        "text": "6.1% physical, 6.1% strike, 5.3% slash, 6.1% pierce, 13.3% magic, 12.4% fire, 12.8% lightning, 12.8% holy damage negation. Immunity 38, Robustness 22, Focus 69, Vitality 75, Poise 10. Weight 5.1."
      },
      {
        "heading": "Prophet Robe",
        "text": "6.7% physical, 6.7% strike, 6.1% slash, 6.7% pierce, 13.5% magic, 12.6% fire, 13% lightning, 13% holy damage negation. Immunity 46, Robustness 25, Focus 83, Vitality 90, Poise 12. Weight 6.3."
      },
      {
        "heading": "Astrologer Robe",
        "text": "6.7% physical, 6.1% strike, 6.1% slash, 6.1% pierce, 13.5% magic, 13% fire, 13.3% lightning, 13% holy damage negation. Immunity 50, Robustness 24, Focus 90, Vitality 76, Poise 12. Weight 6.3."
      },
      {
        "heading": "Astrologer Robe (Altered)",
        "text": "6.1% physical, 5.3% strike, 5.3% slash, 5.3% pierce, 13.3% magic, 12.8% fire, 13% lightning, 12.8% holy damage negation. Immunity 42, Robustness 21, Focus 75, Vitality 64, Poise 10. Weight 5.3."
      },
      {
        "heading": "Lionel's Armor",
        "text": "17.5% physical, 16.3% strike, 19.2% slash, 19.7% pierce, 13.5% magic, 14.9% fire, 13% lightning, 13.5% holy damage negation. Immunity 63, Robustness 99, Focus 42, Vitality 50, Poise 40. Weight 21.2."
      },
      {
        "heading": "Lionel's Armor (Altered)",
        "text": "17.1% physical, 15.9% strike, 18.8% slash, 19.3% pierce, 13.1% magic, 14.5% fire, 12.6% lightning, 13.1% holy damage negation. Immunity 57, Robustness 90, Focus 38, Vitality 45, Poise 38. Weight 20.2."
      },
      {
        "heading": "Hoslow's Armor",
        "text": "14% physical, 11.9% strike, 13.5% slash, 12.4% pierce, 10.9% magic, 11.9% fire, 10.2% lightning, 10.2% holy damage negation. Immunity 38, Robustness 60, Focus 24, Vitality 24, Poise 22. Weight 11.8."
      },
      {
        "heading": "Hoslow's Armor (Altered)",
        "text": "13.6% physical, 11.5% strike, 12.5% slash, 12% pierce, 10.3% magic, 11% fire, 8.9% lightning, 8.9% holy damage negation. Immunity 32, Robustness 52, Focus 21, Vitality 21, Poise 21. Weight 10.8."
      },
      {
        "heading": "Vagabond Knight Armor",
        "text": "13.5% physical, 11.4% strike, 12.4% slash, 11.9% pierce, 10.2% magic, 10.9% fire, 8.8% lightning, 8.8% holy damage negation. Immunity 35, Robustness 57, Focus 23, Vitality 23, Poise 22. Weight 10.6."
      },
      {
        "heading": "Vagabond Knight Armor (Altered)",
        "text": "13.2% physical, 10.5% strike, 12.2% slash, 11.7% pierce, 9.1% magic, 10.5% fire, 8.3% lightning, 8.3% holy damage negation. Immunity 29, Robustness 50, Focus 19, Vitality 19, Poise 21. Weight 9.6."
      },
      {
        "heading": "Blue Cloth Vest",
        "text": "9.5% physical, 9.5% strike, 8% slash, 8% pierce, 10.2% magic, 10.9% fire, 11.9% lightning, 9.5% holy damage negation. Immunity 63, Robustness 42, Focus 50, Vitality 50, Poise 16. Weight 7.7."
      },
      {
        "heading": "War Surgeon Gown",
        "text": "7% physical, 7.9% strike, 8.7% slash, 7% pierce, 9.4% magic, 10.1% fire, 10.8% lightning, 10.1% holy damage negation. Immunity 53, Robustness 37, Focus 44, Vitality 48, Poise 13. Weight 6.9."
      },
      {
        "heading": "War Surgeon Gown (Altered)",
        "text": "6.6% physical, 7% strike, 7.9% slash, 6.6% pierce, 8.7% magic, 9.4% fire, 10.1% lightning, 9.4% holy damage negation. Immunity 45, Robustness 32, Focus 38, Vitality 42, Poise 12. Weight 6.1."
      },
      {
        "heading": "Royal Remains Armor",
        "text": "11.9% physical, 11.4% strike, 12.9% slash, 11.9% pierce, 9.5% magic, 10.2% fire, 8% lightning, 8.8% holy damage negation. Immunity 35, Robustness 57, Focus 24, Vitality 11, Poise 21. Weight 10.6."
      },
      {
        "heading": "Beast Champion Armor",
        "text": "17.5% physical, 16.3% strike, 18.7% slash, 18.3% pierce, 13% magic, 13.8% fire, 12.8% lightning, 13.5% holy damage negation. Immunity 57, Robustness 90, Focus 42, Vitality 38, Poise 34. Weight 17.5."
      },
      {
        "heading": "Beast Champion Armor (Altered)",
        "text": "17.2% physical, 15.9% strike, 18.5% slash, 18.2% pierce, 12.9% magic, 13.7% fire, 12.7% lightning, 13.4% holy damage negation. Immunity 50, Robustness 75, Focus 34, Vitality 32, Poise 34. Weight 16.4."
      },
      {
        "heading": "Champion Pauldron",
        "text": "6.1% physical, 8% strike, 6.7% slash, 7.1% pierce, 7.1% magic, 8.8% fire, 9.5% lightning, 8.8% holy damage negation. Immunity 46, Robustness 28, Focus 38, Vitality 35, Poise 10. Weight 5.1."
      },
      {
        "heading": "Noble's Traveling Garb",
        "text": "6.1% physical, 6.7% strike, 6.1% slash, 6.7% pierce, 13.3% magic, 13.5% fire, 13% lightning, 13.3% holy damage negation. Immunity 46, Robustness 24, Focus 76, Vitality 83, Poise 10. Weight 6.3."
      },
      {
        "heading": "Maliketh's Armor",
        "text": "13.5% physical, 11.9% strike, 14% slash, 13.5% pierce, 10.9% magic, 11.4% fire, 9.5% lightning, 12.8% holy damage negation. Immunity 35, Robustness 57, Focus 24, Vitality 50, Poise 24. Weight 12.8."
      },
      {
        "heading": "Maliketh's Armor (Altered)",
        "text": "12.9% physical, 11.4% strike, 13.5% slash, 12.4% pierce, 10.2% magic, 10.9% fire, 8.8% lightning, 12.6% holy damage negation. Immunity 29, Robustness 50, Focus 21, Vitality 42, Poise 22. Weight 11.8."
      },
      {
        "heading": "Malenia's Armor",
        "text": "10.9% physical, 7.1% strike, 11.4% slash, 9.5% pierce, 6.1% magic, 7.1% fire, 4.2% lightning, 7.1% holy damage negation. Immunity 38, Robustness 32, Focus 11, Vitality 11, Poise 16. Weight 7.7."
      },
      {
        "heading": "Malenia's Armor (Altered)",
        "text": "10% physical, 6.5% strike, 10.7% slash, 8.6% pierce, 5.1% magic, 6.5% fire, 2.5% lightning, 6.5% holy damage negation. Immunity 29, Robustness 25, Focus 0, Vitality 0, Poise 13. Weight 6.8."
      },
      {
        "heading": "Veteran's Armor",
        "text": "18.7% physical, 17% strike, 18.7% slash, 17.5% pierce, 13.5% magic, 14.1% fire, 12.8% lightning, 13.3% holy damage negation. Immunity 63, Robustness 90, Focus 46, Vitality 46, Poise 38. Weight 18.9."
      },
      {
        "heading": "Veteran's Armor (Altered)",
        "text": "18.1% physical, 16.8% strike, 18.5% slash, 17.3% pierce, 13.1% magic, 13.6% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 54, Robustness 75, Focus 38, Vitality 38, Poise 35. Weight 17.2."
      },
      {
        "heading": "Bloodhound Knight Armor",
        "text": "12.4% physical, 11.4% strike, 14% slash, 13.5% pierce, 9.5% magic, 10.2% fire, 7.1% lightning, 10.2% holy damage negation. Immunity 32, Robustness 50, Focus 23, Vitality 23, Poise 19. Weight 10.6."
      },
      {
        "heading": "Bloodhound Knight Armor (Altered)",
        "text": "12.1% physical, 11.1% strike, 13.7% slash, 13.2% pierce, 9.2% magic, 9.9% fire, 6.8% lightning, 9.9% holy damage negation. Immunity 29, Robustness 45, Focus 21, Vitality 21, Poise 19. Weight 9.6."
      },
      {
        "heading": "Festive Garb",
        "text": "4.2% physical, 5.3% strike, 6.1% slash, 5.3% pierce, 12.6% magic, 11.9% fire, 12.4% lightning, 13% holy damage negation. Immunity 42, Robustness 21, Focus 67, Vitality 67, Poise 7. Weight 4.1."
      },
      {
        "heading": "Festive Garb (Altered)",
        "text": "2.7% physical, 4.2% strike, 5.3% slash, 4.2% pierce, 12.4% magic, 11.4% fire, 11.9% lightning, 12.8% holy damage negation. Immunity 34, Robustness 16, Focus 57, Vitality 57, Poise 7. Weight 3.2."
      },
      {
        "heading": "Blue Festive Garb",
        "text": "4.2% physical, 4.2% strike, 6.1% slash, 5.3% pierce, 12.6% magic, 11.4% fire, 12.6% lightning, 13.8% holy damage negation. Immunity 46, Robustness 21, Focus 71, Vitality 63, Poise 7. Weight 4.1."
      },
      {
        "heading": "Commoner's Garb",
        "text": "5.3% physical, 6.7% strike, 6.7% slash, 6.1% pierce, 12.8% magic, 12.4% fire, 12.6% lightning, 12.8% holy damage negation. Immunity 42, Robustness 25, Focus 76, Vitality 83, Poise 8. Weight 5.1."
      },
      {
        "heading": "Commoner's Garb (Altered)",
        "text": "4.2% physical, 6.1% strike, 6.1% slash, 5.3% pierce, 12.6% magic, 11.9% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 34, Robustness 21, Focus 61, Vitality 64, Poise 7. Weight 4.1."
      },
      {
        "heading": "Commoner's Simple Garb",
        "text": "4.2% physical, 6.7% strike, 6.7% slash, 6.1% pierce, 13% magic, 12.6% fire, 12.6% lightning, 12.8% holy damage negation. Immunity 46, Robustness 24, Focus 76, Vitality 83, Poise 8. Weight 5.1."
      },
      {
        "heading": "Commoner's Simple Garb (Altered)",
        "text": "3.2% physical, 6.1% strike, 6.1% slash, 5.3% pierce, 12.8% magic, 12.4% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 38, Robustness 21, Focus 61, Vitality 64, Poise 7. Weight 4.1."
      },
      {
        "heading": "Raya Lucarian Robe",
        "text": "5.3% physical, 6.1% strike, 6.1% slash, 2.7% pierce, 13.5% magic, 12.6% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 42, Robustness 18, Focus 67, Vitality 63, Poise 7. Weight 4.1."
      },
      {
        "heading": "Marionette Soldier Armor",
        "text": "11.9% physical, 8.8% strike, 13.5% slash, 8.8% pierce, 8.8% magic, 8.8% fire, 6.7% lightning, 8.8% holy damage negation. Immunity 24, Robustness 50, Focus 21, Vitality 18, Poise 18. Weight 8.8."
      },
      {
        "heading": "Raging Wolf Armor",
        "text": "13.2% physical, 11.6% strike, 13.2% slash, 12.6% pierce, 9.9% magic, 11.1% fire, 6.8% lightning, 9.2% holy damage negation. Immunity 31, Robustness 55, Focus 17, Vitality 17, Poise 21. Weight 10.1."
      },
      {
        "heading": "Raging Wolf Armor (Altered)",
        "text": "12.8% physical, 10.8% strike, 12.8% slash, 12.3% pierce, 8.7% magic, 10.8% fire, 6.6% lightning, 8.7% holy damage negation. Immunity 25, Robustness 50, Focus 10, Vitality 10, Poise 19. Weight 9."
      },
      {
        "heading": "Land of Reeds Armor",
        "text": "8.8% physical, 9.5% strike, 11.9% slash, 9.5% pierce, 10.2% magic, 11.4% fire, 11.9% lightning, 10.9% holy damage negation. Immunity 60, Robustness 50, Focus 50, Vitality 55, Poise 16. Weight 8.3."
      },
      {
        "heading": "Land of Reeds Armor (Altered)",
        "text": "8% physical, 8.8% strike, 11.4% slash, 8.8% pierce, 9.5% magic, 10.9% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 52, Robustness 42, Focus 42, Vitality 45, Poise 15. Weight 7.8."
      },
      {
        "heading": "White Reed Armor",
        "text": "9.5% physical, 10.2% strike, 11.4% slash, 8.8% pierce, 10.9% magic, 10.9% fire, 11.9% lightning, 10.2% holy damage negation. Immunity 67, Robustness 42, Focus 55, Vitality 50, Poise 17. Weight 8.3."
      },
      {
        "heading": "Confessor Armor",
        "text": "8.8% physical, 10.9% strike, 8.8% slash, 9.5% pierce, 11.4% magic, 11.4% fire, 12.4% lightning, 10.2% holy damage negation. Immunity 63, Robustness 50, Focus 50, Vitality 55, Poise 16. Weight 8.3."
      },
      {
        "heading": "Confessor Armor (Altered)",
        "text": "7.6% physical, 9.8% strike, 7.6% slash, 8.4% pierce, 10.5% magic, 10.5% fire, 11.5% lightning, 9.1% holy damage negation. Immunity 54, Robustness 42, Focus 42, Vitality 45, Poise 15. Weight 7.3."
      },
      {
        "heading": "Prisoner Clothing",
        "text": "4.2% physical, 5.3% strike, 5.3% slash, 4.2% pierce, 11.9% magic, 11.4% fire, 11.4% lightning, 12.6% holy damage negation. Immunity 42, Robustness 23, Focus 63, Vitality 63, Poise 5. Weight 3.2."
      },
      {
        "heading": "Traveling Maiden Robe",
        "text": "5.4% physical, 6.2% strike, 6.2% slash, 4.3% pierce, 13.4% magic, 12.9% fire, 13.1% lightning, 13.4% holy damage negation. Immunity 46, Robustness 24, Focus 76, Vitality 83, Poise 10. Weight 4.9."
      },
      {
        "heading": "Traveling Maiden Robe (Altered)",
        "text": "4.3% physical, 5.4% strike, 5.4% slash, 2.8% pierce, 13.1% magic, 12.7% fire, 12.9% lightning, 13.1% holy damage negation. Immunity 38, Robustness 21, Focus 61, Vitality 64, Poise 8. Weight 4.3."
      },
      {
        "heading": "Finger Maiden Robe",
        "text": "5.8% physical, 4.7% strike, 4.7% slash, 3.2% pierce, 13.8% magic, 13.1% fire, 13.3% lightning, 13.8% holy damage negation. Immunity 38, Robustness 21, Focus 63, Vitality 63, Poise 10. Weight 4.6."
      },
      {
        "heading": "Finger Maiden Robe (Altered)",
        "text": "4.2% physical, 2.7% strike, 2.7% slash, 0.6% pierce, 13% magic, 12.4% fire, 12.6% lightning, 13.5% holy damage negation. Immunity 32, Robustness 16, Focus 54, Vitality 54, Poise 8. Weight 3.7."
      },
      {
        "heading": "Preceptor's Long Gown",
        "text": "6.1% physical, 6.7% strike, 6.1% slash, 6.1% pierce, 14.5% magic, 13.3% fire, 12.8% lightning, 12.8% holy damage negation. Immunity 50, Robustness 24, Focus 83, Vitality 76, Poise 12. Weight 6.3."
      },
      {
        "heading": "Preceptor's Long Gown (Altered)",
        "text": "4.2% physical, 4.2% strike, 2.7% slash, 4.2% pierce, 12.8% magic, 12.4% fire, 11.9% lightning, 12.4% holy damage negation. Immunity 38, Robustness 16, Focus 57, Vitality 57, Poise 7. Weight 3.2."
      },
      {
        "heading": "Raptor's Black Feathers",
        "text": "8% physical, 8.8% strike, 9.5% slash, 9.5% pierce, 10.2% magic, 10.2% fire, 10.9% lightning, 9.5% holy damage negation. Immunity 57, Robustness 35, Focus 60, Vitality 60, Poise 15. Weight 7.7."
      },
      {
        "heading": "Bandit Garb",
        "text": "8% physical, 8.8% strike, 9.5% slash, 9.5% pierce, 10.2% magic, 10.2% fire, 10.9% lightning, 9.5% holy damage negation. Immunity 52, Robustness 32, Focus 54, Vitality 54, Poise 15. Weight 7.7."
      },
      {
        "heading": "Eccentric's Armor",
        "text": "12.9% physical, 10.9% strike, 12.4% slash, 12.9% pierce, 10.9% magic, 10.9% fire, 7.1% lightning, 9.5% holy damage negation. Immunity 35, Robustness 60, Focus 23, Vitality 21, Poise 21. Weight 10.6."
      },
      {
        "heading": "Fingerprint Armor",
        "text": "13.5% physical, 11.9% strike, 11.9% slash, 11.9% pierce, 9.5% magic, 12.6% fire, 6.7% lightning, 9.5% holy damage negation. Immunity 32, Robustness 60, Focus 11, Vitality 23, Poise 24. Weight 10.6."
      },
      {
        "heading": "Fingerprint Armor (Altered)",
        "text": "13.1% physical, 11.5% strike, 11.5% slash, 11.5% pierce, 9.1% magic, 12.2% fire, 6.3% lightning, 9.1% holy damage negation. Immunity 29, Robustness 54, Focus 10, Vitality 21, Poise 24. Weight 10."
      },
      {
        "heading": "Consort's Robe",
        "text": "5.3% physical, 4.2% strike, 4.2% slash, 5.3% pierce, 13% magic, 12.4% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 46, Robustness 25, Focus 67, Vitality 63, Poise 7. Weight 4.1."
      },
      {
        "heading": "Ruler's Robe",
        "text": "5.3% physical, 6.7% strike, 6.7% slash, 4.2% pierce, 13% magic, 12.4% fire, 12.8% lightning, 13.3% holy damage negation. Immunity 46, Robustness 24, Focus 76, Vitality 76, Poise 10. Weight 5.1."
      },
      {
        "heading": "Upper-Class Robe",
        "text": "4.2% physical, 6.1% strike, 6.1% slash, 2.7% pierce, 12.8% magic, 11.9% fire, 12.6% lightning, 13% holy damage negation. Immunity 38, Robustness 21, Focus 61, Vitality 61, Poise 8. Weight 4.1."
      },
      {
        "heading": "Marais Robe",
        "text": "5.3% physical, 6.1% strike, 4.2% slash, 2.7% pierce, 12.6% magic, 12.4% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 42, Robustness 28, Focus 71, Vitality 67, Poise 8. Weight 4.1."
      },
      {
        "heading": "Official's Attire",
        "text": "4.2% physical, 4.2% strike, 4.2% slash, 5.3% pierce, 12.8% magic, 11.9% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 38, Robustness 22, Focus 61, Vitality 64, Poise 8. Weight 4.1."
      },
      {
        "heading": "Omen Armor",
        "text": "18.3% physical, 15% strike, 18.7% slash, 18.7% pierce, 13% magic, 14.5% fire, 14.9% lightning, 13.8% holy damage negation. Immunity 67, Robustness 63, Focus 57, Vitality 76, Poise 43. Weight 23.1."
      },
      {
        "heading": "Carian Knight Armor",
        "text": "11.8% physical, 10.8% strike, 12.3% slash, 11.8% pierce, 12.3% magic, 11.8% fire, 9.4% lightning, 11.8% holy damage negation. Immunity 28, Robustness 46, Focus 21, Vitality 23, Poise 19. Weight 10.4."
      },
      {
        "heading": "Carian Knight Armor (Altered)",
        "text": "11.7% physical, 9.8% strike, 12.2% slash, 11.7% pierce, 11.7% magic, 11.7% fire, 9.1% lightning, 11.7% holy damage negation. Immunity 22, Robustness 38, Focus 16, Vitality 19, Poise 18. Weight 9.7."
      },
      {
        "heading": "Errant Sorcerer Robe",
        "text": "4.2% physical, 4.2% strike, 6.1% slash, 4.2% pierce, 13% magic, 12.6% fire, 12.4% lightning, 13% holy damage negation. Immunity 35, Robustness 23, Focus 67, Vitality 71, Poise 8. Weight 4.1."
      },
      {
        "heading": "Errant Sorcerer Robe (Altered)",
        "text": "2.7% physical, 2.7% strike, 5.3% slash, 2.7% pierce, 12.8% magic, 12.4% fire, 11.9% lightning, 12.8% holy damage negation. Immunity 31, Robustness 20, Focus 62, Vitality 66, Poise 7. Weight 3.2."
      },
      {
        "heading": "Battlemage Robe",
        "text": "5.3% physical, 6.1% strike, 4.2% slash, 5.3% pierce, 13% magic, 11.9% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 42, Robustness 23, Focus 63, Vitality 71, Poise 10. Weight 4.1."
      },
      {
        "heading": "Snow Witch Robe",
        "text": "5.7% physical, 6.5% strike, 6.5% slash, 4.6% pierce, 13.4% magic, 13.4% fire, 13.2% lightning, 13.4% holy damage negation. Immunity 38, Robustness 32, Focus 71, Vitality 71, Poise 8. Weight 5.5."
      },
      {
        "heading": "Snow Witch Robe (Altered)",
        "text": "4.6% physical, 5.7% strike, 5.7% slash, 3.1% pierce, 13.2% magic, 13.2% fire, 13% lightning, 13.2% holy damage negation. Immunity 32, Robustness 25, Focus 57, Vitality 57, Poise 7. Weight 4.6."
      },
      {
        "heading": "Traveler's Clothes",
        "text": "6.1% physical, 5.3% strike, 4.2% slash, 2.7% pierce, 13.3% magic, 12.6% fire, 12.8% lightning, 12.4% holy damage negation. Immunity 35, Robustness 24, Focus 67, Vitality 67, Poise 8. Weight 4.1."
      },
      {
        "heading": "Juvenile Scholar Robe",
        "text": "5.3% physical, 6.1% strike, 6.1% slash, 5.3% pierce, 12.8% magic, 11.9% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 38, Robustness 25, Focus 63, Vitality 71, Poise 7. Weight 4.1."
      },
      {
        "heading": "Goldmask's Rags",
        "text": "4.2% physical, 2.7% strike, 2.7% slash, 0.6% pierce, 11.9% magic, 11.4% fire, 11.9% lightning, 12.8% holy damage negation. Immunity 38, Robustness 11, Focus 60, Vitality 60, Poise 5. Weight 2.4."
      },
      {
        "heading": "Fell Omen Cloak",
        "text": "6.1% physical, 6.7% strike, 6.7% slash, 6.1% pierce, 13% magic, 12.4% fire, 12.6% lightning, 12.8% holy damage negation. Immunity 42, Robustness 25, Focus 71, Vitality 83, Poise 8. Weight 5.1."
      },
      {
        "heading": "Dirty Chainmail",
        "text": "11.4% physical, 8.8% strike, 11.9% slash, 11.4% pierce, 8% magic, 8.8% fire, 6.1% lightning, 8% holy damage negation. Immunity 25, Robustness 50, Focus 21, Vitality 21, Poise 18. Weight 8.8."
      },
      {
        "heading": "Zamor Armor",
        "text": "11.9% physical, 9.5% strike, 12.4% slash, 10.9% pierce, 8.8% magic, 8.8% fire, 6.1% lightning, 8% holy damage negation. Immunity 21, Robustness 63, Focus 11, Vitality 18, Poise 18. Weight 8.8."
      },
      {
        "heading": "Chain Armor",
        "text": "11.9% physical, 8.8% strike, 12.9% slash, 11.9% pierce, 7.1% magic, 10.9% fire, 6.1% lightning, 8% holy damage negation. Immunity 25, Robustness 42, Focus 11, Vitality 18, Poise 17. Weight 8.8."
      },
      {
        "heading": "Eye Surcoat",
        "text": "12.9% physical, 8.8% strike, 12.9% slash, 11.9% pierce, 8.8% magic, 10.9% fire, 7.1% lightning, 8.8% holy damage negation. Immunity 25, Robustness 55, Focus 21, Vitality 18, Poise 21. Weight 9.2."
      },
      {
        "heading": "Tree Surcoat",
        "text": "12.9% physical, 8.8% strike, 12.9% slash, 11.9% pierce, 8.8% magic, 10.9% fire, 7.1% lightning, 8.8% holy damage negation. Immunity 25, Robustness 55, Focus 21, Vitality 18, Poise 21. Weight 9.2."
      },
      {
        "heading": "Mushroom Body",
        "text": "6.1% physical, 7.1% strike, 2.7% slash, 5.3% pierce, 13.3% magic, 5.3% fire, 12.8% lightning, 13% holy damage negation. Immunity 102, Robustness 24, Focus 90, Vitality 76, Poise 5. Weight 5.1."
      },
      {
        "heading": "Leather Armor",
        "text": "8% physical, 9.5% strike, 8% slash, 8.8% pierce, 9.5% magic, 9.5% fire, 10.2% lightning, 10.2% holy damage negation. Immunity 60, Robustness 35, Focus 42, Vitality 50, Poise 12. Weight 7.1."
      },
      {
        "heading": "Knight Armor",
        "text": "12.4% physical, 11.9% strike, 13.5% slash, 13.5% pierce, 10.9% magic, 10.9% fire, 9.5% lightning, 8.8% holy damage negation. Immunity 28, Robustness 50, Focus 18, Vitality 18, Poise 24. Weight 10.6."
      },
      {
        "heading": "Tree-and-Beast Surcoat",
        "text": "12.9% physical, 11.4% strike, 12.9% slash, 12.4% pierce, 10.2% magic, 10.9% fire, 8% lightning, 9.5% holy damage negation. Immunity 32, Robustness 55, Focus 23, Vitality 23, Poise 22. Weight 10.6."
      },
      {
        "heading": "Cuckoo Surcoat",
        "text": "12.9% physical, 10.9% strike, 13.5% slash, 12.9% pierce, 11.9% magic, 10.9% fire, 7.1% lightning, 8.8% holy damage negation. Immunity 28, Robustness 55, Focus 23, Vitality 23, Poise 22. Weight 10.6."
      },
      {
        "heading": "Erdtree Surcoat",
        "text": "12.9% physical, 11.9% strike, 12.4% slash, 12.9% pierce, 9.5% magic, 10.2% fire, 8.8% lightning, 9.5% holy damage negation. Immunity 32, Robustness 55, Focus 23, Vitality 23, Poise 22. Weight 10.6."
      },
      {
        "heading": "Redmane Surcoat",
        "text": "13.5% physical, 10.9% strike, 12.4% slash, 11.9% pierce, 10.2% magic, 11.4% fire, 8% lightning, 9.5% holy damage negation. Immunity 32, Robustness 50, Focus 23, Vitality 24, Poise 22. Weight 10.6."
      },
      {
        "heading": "Mausoleum Surcoat",
        "text": "12.9% physical, 10.9% strike, 13.5% slash, 12.4% pierce, 10.2% magic, 10.2% fire, 8.8% lightning, 10.2% holy damage negation. Immunity 32, Robustness 50, Focus 23, Vitality 21, Poise 24. Weight 10.6."
      },
      {
        "heading": "Haligtree Crest Surcoat",
        "text": "12.9% physical, 11.9% strike, 12.4% slash, 12.9% pierce, 9.5% magic, 10.2% fire, 8% lightning, 10.2% holy damage negation. Immunity 32, Robustness 55, Focus 23, Vitality 24, Poise 21. Weight 10.6."
      },
      {
        "heading": "Gelmir Knight Armor",
        "text": "13.5% physical, 11.4% strike, 14% slash, 13.5% pierce, 10.9% magic, 12.4% fire, 10.2% lightning, 10.9% holy damage negation. Immunity 35, Robustness 55, Focus 24, Vitality 23, Poise 24. Weight 11.8."
      },
      {
        "heading": "Gelmir Knight Armor (Altered)",
        "text": "13.1% physical, 11% strike, 13.6% slash, 13.1% pierce, 10.5% magic, 12% fire, 9.8% lightning, 10.5% holy damage negation. Immunity 32, Robustness 50, Focus 21, Vitality 21, Poise 24. Weight 10.8."
      },
      {
        "heading": "Godrick Knight Armor",
        "text": "13.5% physical, 11.9% strike, 14% slash, 12.9% pierce, 10.9% magic, 11.9% fire, 9.5% lightning, 10.9% holy damage negation. Immunity 35, Robustness 57, Focus 24, Vitality 24, Poise 24. Weight 11.8."
      },
      {
        "heading": "Godrick Knight Armor (Altered)",
        "text": "13.1% physical, 11.5% strike, 13.6% slash, 12.5% pierce, 10.5% magic, 11.5% fire, 9.1% lightning, 10.5% holy damage negation. Immunity 32, Robustness 52, Focus 21, Vitality 21, Poise 24. Weight 10.8."
      },
      {
        "heading": "Cuckoo Knight Armor",
        "text": "13.5% physical, 11.4% strike, 14.6% slash, 13.5% pierce, 12.4% magic, 11.9% fire, 8.8% lightning, 10.2% holy damage negation. Immunity 32, Robustness 57, Focus 24, Vitality 24, Poise 24. Weight 11.8."
      },
      {
        "heading": "Cuckoo Knight Armor (Altered)",
        "text": "13.1% physical, 11% strike, 14.2% slash, 13.1% pierce, 12% magic, 11.5% fire, 8.4% lightning, 9.8% holy damage negation. Immunity 29, Robustness 52, Focus 21, Vitality 21, Poise 24. Weight 10.8."
      },
      {
        "heading": "Leyndell Knight Armor",
        "text": "13.5% physical, 12.4% strike, 13.5% slash, 13.5% pierce, 10.2% magic, 11.4% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 35, Robustness 55, Focus 24, Vitality 24, Poise 24. Weight 11.8."
      },
      {
        "heading": "Leyndell Knight Armor (Altered)",
        "text": "13.1% physical, 12% strike, 13.1% slash, 13.1% pierce, 9.8% magic, 11% fire, 11% lightning, 9.8% holy damage negation. Immunity 32, Robustness 50, Focus 21, Vitality 21, Poise 24. Weight 10.8."
      },
      {
        "heading": "Redmane Knight Armor",
        "text": "13.5% physical, 11.4% strike, 13.5% slash, 12.4% pierce, 10.9% magic, 12.8% fire, 9.5% lightning, 10.9% holy damage negation. Immunity 35, Robustness 55, Focus 24, Vitality 25, Poise 24. Weight 11.8."
      },
      {
        "heading": "Redmane Knight Armor (Altered)",
        "text": "13.1% physical, 11% strike, 13.1% slash, 12% pierce, 10.5% magic, 12.4% fire, 9.1% lightning, 10.5% holy damage negation. Immunity 32, Robustness 50, Focus 21, Vitality 22, Poise 24. Weight 10.8."
      },
      {
        "heading": "Mausoleum Knight Armor",
        "text": "13.5% physical, 11.4% strike, 14.6% slash, 12.9% pierce, 10.9% magic, 11.4% fire, 10.2% lightning, 11.4% holy damage negation. Immunity 35, Robustness 55, Focus 24, Vitality 23, Poise 25. Weight 11.8."
      },
      {
        "heading": "Mausoleum Knight Armor (Altered)",
        "text": "13.1% physical, 11% strike, 14.2% slash, 12.5% pierce, 10.5% magic, 11% fire, 9.8% lightning, 11% holy damage negation. Immunity 32, Robustness 50, Focus 21, Vitality 21, Poise 25. Weight 10.8."
      },
      {
        "heading": "Haligtree Knight Armor",
        "text": "13.5% physical, 12.4% strike, 13.5% slash, 13.5% pierce, 10.2% magic, 11.4% fire, 9.5% lightning, 11.4% holy damage negation. Immunity 35, Robustness 57, Focus 24, Vitality 25, Poise 22. Weight 11.8."
      },
      {
        "heading": "Haligtree Knight Armor (Altered)",
        "text": "13.1% physical, 12% strike, 13.1% slash, 13.1% pierce, 9.8% magic, 11% fire, 9.1% lightning, 11% holy damage negation. Immunity 32, Robustness 52, Focus 21, Vitality 22, Poise 22. Weight 10.8."
      },
      {
        "heading": "Chain-Draped Tabard",
        "text": "9.5% physical, 10.2% strike, 9.5% slash, 9.5% pierce, 10.9% magic, 11.4% fire, 11.9% lightning, 10.9% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 55, Poise 17. Weight 8.3."
      },
      {
        "heading": "Foot Soldier Tabard",
        "text": "9.5% physical, 9.5% strike, 10.2% slash, 10.2% pierce, 11.4% magic, 11.4% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 55, Poise 17. Weight 8.3."
      },
      {
        "heading": "Leather-Draped Tabard",
        "text": "9.5% physical, 10.9% strike, 8.8% slash, 10.2% pierce, 10.2% magic, 10.9% fire, 12.4% lightning, 10.9% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 55, Poise 17. Weight 8.3."
      },
      {
        "heading": "Scarlet Tabard",
        "text": "10.2% physical, 9.5% strike, 8.8% slash, 8.8% pierce, 10.9% magic, 11.9% fire, 11.9% lightning, 10.9% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 55, Poise 17. Weight 8.3."
      },
      {
        "heading": "Bloodsoaked Tabard",
        "text": "9.5% physical, 9.5% strike, 10.2% slash, 9.5% pierce, 10.9% magic, 10.9% fire, 12.4% lightning, 11.4% holy damage negation. Immunity 63, Robustness 38, Focus 55, Vitality 50, Poise 18. Weight 8.3."
      },
      {
        "heading": "Ivory-Draped Tabard",
        "text": "9.5% physical, 10.9% strike, 8.8% slash, 10.2% pierce, 10.2% magic, 10.9% fire, 11.9% lightning, 11.4% holy damage negation. Immunity 63, Robustness 42, Focus 55, Vitality 57, Poise 16. Weight 8.3."
      },
      {
        "heading": "Omenkiller Robe",
        "text": "8.8% physical, 8% strike, 7.1% slash, 7.1% pierce, 8.8% magic, 9.5% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 67, Robustness 28, Focus 46, Vitality 46, Poise 16. Weight 7.1."
      },
      {
        "heading": "Deathbed Dress",
        "text": "0.6% physical, 2.7% strike, 0.6% slash, 0.6% pierce, 11.9% magic, 11.4% fire, 11.9% lightning, 12.4% holy damage negation. Immunity 38, Robustness 11, Focus 63, Vitality 107, Poise 5. Weight 3.2."
      },
      {
        "heading": "Fia's Robe",
        "text": "5.3% physical, 6.1% strike, 5.3% slash, 5.3% pierce, 12.6% magic, 12.4% fire, 12.6% lightning, 13% holy damage negation. Immunity 46, Robustness 21, Focus 76, Vitality 108, Poise 8. Weight 5.1."
      },
      {
        "heading": "Fia's Robe (Altered)",
        "text": "2.7% physical, 4.2% strike, 2.7% slash, 2.7% pierce, 11.9% magic, 11.4% fire, 11.9% lightning, 12.6% holy damage negation. Immunity 34, Robustness 10, Focus 57, Vitality 93, Poise 5. Weight 3.2."
      },
      {
        "heading": "Highwayman Cloth Armor",
        "text": "8% physical, 10.2% strike, 8% slash, 8.8% pierce, 10.9% magic, 10.9% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 57, Robustness 35, Focus 50, Vitality 50, Poise 16. Weight 7.7."
      },
      {
        "heading": "High Page Clothes",
        "text": "5.5% physical, 6.9% strike, 5.5% slash, 5.5% pierce, 13.5% magic, 12.8% fire, 13% lightning, 13.2% holy damage negation. Immunity 42, Robustness 23, Focus 76, Vitality 76, Poise 10. Weight 5.3."
      },
      {
        "heading": "High Page Clothes (Altered)",
        "text": "4.4% physical, 6.3% strike, 4.4% slash, 4.4% pierce, 13.2% magic, 12.6% fire, 12.8% lightning, 13% holy damage negation. Immunity 34, Robustness 19, Focus 61, Vitality 61, Poise 8. Weight 4.3."
      },
      {
        "heading": "Rotten Gravekeeper Cloak",
        "text": "6.7% physical, 6.7% strike, 6.7% slash, 6.7% pierce, 8.8% magic, 8.8% fire, 10.9% lightning, 8.8% holy damage negation. Immunity 76, Robustness 32, Focus 42, Vitality 42, Poise 12. Weight 6.3."
      },
      {
        "heading": "Rotten Gravekeeper Cloak (Altered)",
        "text": "6.1% physical, 6.1% strike, 6.1% slash, 6.1% pierce, 8% magic, 8% fire, 10.2% lightning, 8% holy damage negation. Immunity 64, Robustness 25, Focus 34, Vitality 34, Poise 8. Weight 5.1."
      },
      {
        "heading": "Lazuli Robe",
        "text": "6.1% physical, 5.3% strike, 4.2% slash, 2.7% pierce, 13.8% magic, 11.9% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 42, Robustness 21, Focus 67, Vitality 67, Poise 8. Weight 4.1."
      },
      {
        "heading": "Dryleaf Robe",
        "text": "5.3% physical, 6.7% strike, 4.2% slash, 4.2% pierce, 14.1% magic, 11.9% fire, 12.6% lightning, 14.1% holy damage negation. Immunity 38, Robustness 25, Focus 76, Vitality 71, Poise 10. Weight 5.1."
      },
      {
        "heading": "Dryleaf Robe (Altered)",
        "text": "4.2% physical, 6.1% strike, 2.7% slash, 2.7% pierce, 13.8% magic, 11.4% fire, 12.4% lightning, 13.8% holy damage negation. Immunity 35, Robustness 24, Focus 67, Vitality 63, Poise 8. Weight 4.1."
      },
      {
        "heading": "Gaius's Armor",
        "text": "16.8% physical, 15.7% strike, 19.7% slash, 19.2% pierce, 14.1% magic, 13.8% fire, 13.8% lightning, 13.8% holy damage negation. Immunity 67, Robustness 83, Focus 55, Vitality 55, Poise 38. Weight 20.1."
      },
      {
        "heading": "Leda's Armor",
        "text": "12.7% physical, 11.2% strike, 12.2% slash, 11.7% pierce, 10.9% magic, 10.2% fire, 7.1% lightning, 10.2% holy damage negation. Immunity 29, Robustness 52, Focus 22, Vitality 21, Poise 21. Weight 10.6."
      },
      {
        "heading": "Oathseeker Knight Armor",
        "text": "12.2% physical, 10% strike, 11.7% slash, 11.2% pierce, 9.5% magic, 9.5% fire, 6.7% lightning, 9.5% holy damage negation. Immunity 25, Robustness 50, Focus 21, Vitality 21, Poise 19. Weight 9.2."
      },
      {
        "heading": "Verdigris Armor",
        "text": "20.4% physical, 17.7% strike, 19.7% slash, 18.7% pierce, 13.5% magic, 13.3% fire, 14.5% lightning, 13.3% holy damage negation. Immunity 82, Robustness 97, Focus 32, Vitality 45, Poise 47. Weight 25.9."
      },
      {
        "heading": "Iron Rivet Armor",
        "text": "7.1% physical, 8% strike, 7.1% slash, 7.1% pierce, 10.9% magic, 10.2% fire, 11.9% lightning, 10.2% holy damage negation. Immunity 57, Robustness 46, Focus 42, Vitality 42, Poise 13. Weight 7.1."
      },
      {
        "heading": "Thiollier's Garb",
        "text": "8.8% physical, 8.8% strike, 7.1% slash, 7.1% pierce, 8% magic, 9.5% fire, 10.9% lightning, 10.2% holy damage negation. Immunity 71, Robustness 28, Focus 63, Vitality 38, Poise 13. Weight 7.1."
      },
      {
        "heading": "Thiollier's Garb (Altered)",
        "text": "8% physical, 8% strike, 6.7% slash, 6.7% pierce, 7.1% magic, 8.8% fire, 10.2% lightning, 9.5% holy damage negation. Immunity 67, Robustness 25, Focus 60, Vitality 35, Poise 12. Weight 6.3."
      },
      {
        "heading": "High Priest Robe",
        "text": "5.2% physical, 6% strike, 4.1% slash, 2.6% pierce, 12.8% magic, 12.6% fire, 12.4% lightning, 12.6% holy damage negation. Immunity 38, Robustness 21, Focus 57, Vitality 69, Poise 10. Weight 4.2."
      },
      {
        "heading": "Finger Robe",
        "text": "6% physical, 6.6% strike, 5.2% slash, 4.1% pierce, 13% magic, 12.8% fire, 12.6% lightning, 12.8% holy damage negation. Immunity 42, Robustness 21, Focus 64, Vitality 82, Poise 12. Weight 5.1."
      },
      {
        "heading": "Braided Cord Robe",
        "text": "6.3% physical, 5.2% strike, 5.2% slash, 3.7% pierce, 13.6% magic, 11.9% fire, 12.9% lightning, 14% holy damage negation. Immunity 38, Robustness 20, Focus 104, Vitality 59, Poise 5. Weight 3.4."
      },
      {
        "heading": "Dancer's Dress",
        "text": "4.2% physical, 2.7% strike, 6.1% slash, 2.7% pierce, 12.6% magic, 12.6% fire, 11.9% lightning, 12.4% holy damage negation. Immunity 34, Robustness 21, Focus 54, Vitality 57, Poise 5. Weight 3.2."
      },
      {
        "heading": "Dancer's Dress (Altered)",
        "text": "2.7% physical, 0.6% strike, 5.3% slash, 0.6% pierce, 12.4% magic, 12.4% fire, 11.4% lightning, 11.9% holy damage negation. Immunity 32, Robustness 21, Focus 52, Vitality 54, Poise 3. Weight 2.4."
      },
      {
        "heading": "Armor of Night",
        "text": "7.1% physical, 7.1% strike, 8% slash, 8% pierce, 12.4% magic, 9.5% fire, 9.5% lightning, 12.6% holy damage negation. Immunity 55, Robustness 32, Focus 46, Vitality 46, Poise 12. Weight 7.1."
      },
      {
        "heading": "Igon's Armor",
        "text": "9.5% physical, 10.2% strike, 9.5% slash, 9.5% pierce, 10.9% magic, 11.4% fire, 11.9% lightning, 10.9% holy damage negation. Immunity 57, Robustness 38, Focus 50, Vitality 50, Poise 17. Weight 8."
      },
      {
        "heading": "Igon's Armor (Altered)",
        "text": "8.8% physical, 9.5% strike, 8.8% slash, 8.8% pierce, 10.2% magic, 10.9% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 54, Robustness 34, Focus 45, Vitality 45, Poise 16. Weight 7.7."
      },
      {
        "heading": "Ansbach's Attire",
        "text": "5.3% physical, 6.1% strike, 6.1% slash, 4.2% pierce, 13% magic, 13% fire, 12.6% lightning, 13% holy damage negation. Immunity 38, Robustness 25, Focus 76, Vitality 90, Poise 12. Weight 5.1."
      },
      {
        "heading": "Ansbach's Attire (Altered)",
        "text": "4.2% physical, 5.3% strike, 5.3% slash, 2.7% pierce, 12.8% magic, 12.8% fire, 12.4% lightning, 12.8% holy damage negation. Immunity 35, Robustness 25, Focus 67, Vitality 76, Poise 10. Weight 4.1."
      },
      {
        "heading": "Freyja's Armor",
        "text": "13.5% physical, 9.5% strike, 11.4% slash, 11.4% pierce, 8.8% magic, 9.5% fire, 8% lightning, 9.5% holy damage negation. Immunity 22, Robustness 54, Focus 10, Vitality 22, Poise 19. Weight 9.7."
      },
      {
        "heading": "Freyja's Armor (Altered)",
        "text": "12.9% physical, 8.8% strike, 10.9% slash, 10.9% pierce, 8% magic, 8.8% fire, 7.1% lightning, 8.8% holy damage negation. Immunity 21, Robustness 52, Focus 0, Vitality 21, Poise 17. Weight 9.3."
      },
      {
        "heading": "Armor of Solitude",
        "text": "18.7% physical, 17.7% strike, 18.3% slash, 17.5% pierce, 13.3% magic, 14.5% fire, 13.5% lightning, 13.8% holy damage negation. Immunity 60, Robustness 63, Focus 99, Vitality 50, Poise 45. Weight 24."
      },
      {
        "heading": "Armor of Solitude (Altered)",
        "text": "18.3% physical, 17% strike, 17.5% slash, 16.8% pierce, 13% magic, 14.1% fire, 13.3% lightning, 13.5% holy damage negation. Immunity 57, Robustness 60, Focus 90, Vitality 46, Poise 43. Weight 23.2."
      },
      {
        "heading": "Messmer Soldier Armor",
        "text": "12.1% physical, 9.7% strike, 12.1% slash, 11.6% pierce, 8.2% magic, 9.7% fire, 6.9% lightning, 8.2% holy damage negation. Immunity 22, Robustness 42, Focus 16, Vitality 16, Poise 18. Weight 9.2."
      },
      {
        "heading": "Messmer Soldier Armor (Altered)",
        "text": "12.1% physical, 9.7% strike, 12.1% slash, 11.6% pierce, 8.2% magic, 9.7% fire, 6.9% lightning, 8.2% holy damage negation. Immunity 22, Robustness 42, Focus 16, Vitality 16, Poise 18. Weight 8.1."
      },
      {
        "heading": "Black Knight Armor",
        "text": "14.6% physical, 12.4% strike, 14.6% slash, 16% pierce, 12.4% magic, 13% fire, 10.9% lightning, 11.4% holy damage negation. Immunity 38, Robustness 61, Focus 22, Vitality 21, Poise 28. Weight 13.7."
      },
      {
        "heading": "Rakshasa Armor",
        "text": "12.9% physical, 11.9% strike, 14% slash, 13.5% pierce, 11.4% magic, 12.4% fire, 10.9% lightning, 11.4% holy damage negation. Immunity 35, Robustness 60, Focus 28, Vitality 28, Poise 27. Weight 12.8."
      },
      {
        "heading": "Fire Knight Armor",
        "text": "12.9% physical, 10.2% strike, 11.9% slash, 10.9% pierce, 9.5% magic, 11.9% fire, 7.1% lightning, 8.8% holy damage negation. Immunity 28, Robustness 46, Focus 21, Vitality 24, Poise 19. Weight 9.3."
      },
      {
        "heading": "Fire Knight Armor (Altered)",
        "text": "11.9% physical, 9.5% strike, 11.9% slash, 10.2% pierce, 8% magic, 10.9% fire, 7.1% lightning, 8% holy damage negation. Immunity 25, Robustness 42, Focus 18, Vitality 23, Poise 17. Weight 8.4."
      },
      {
        "heading": "Gloried Attire",
        "text": "8% physical, 9.5% strike, 8.8% slash, 8% pierce, 8.8% magic, 10.2% fire, 11.4% lightning, 10.2% holy damage negation. Immunity 57, Robustness 32, Focus 46, Vitality 42, Poise 13. Weight 7.1."
      },
      {
        "heading": "Highland Attire",
        "text": "7.1% physical, 8.8% strike, 8% slash, 7.1% pierce, 8% magic, 9.5% fire, 10.9% lightning, 9.5% holy damage negation. Immunity 55, Robustness 28, Focus 42, Vitality 38, Poise 13. Weight 6.3."
      },
      {
        "heading": "Death Knight Armor",
        "text": "12.6% physical, 10.7% strike, 12.2% slash, 12.2% pierce, 9.3% magic, 9.7% fire, 12.4% lightning, 8.2% holy damage negation. Immunity 25, Robustness 42, Focus 16, Vitality 42, Poise 22. Weight 11.2."
      },
      {
        "heading": "Ascetic's Loincloth",
        "text": "6.1% physical, 0.6% strike, 5.3% slash, 2.7% pierce, 12.6% magic, 12.6% fire, 12.4% lightning, 13.3% holy damage negation. Immunity 42, Robustness 23, Focus 28, Vitality 63, Poise 10. Weight 3.2."
      },
      {
        "heading": "Messmer's Armor",
        "text": "9.3% physical, 9.3% strike, 8.6% slash, 10.7% pierce, 10% magic, 12.2% fire, 11.7% lightning, 10% holy damage negation. Immunity 54, Robustness 38, Focus 52, Vitality 54, Poise 16. Weight 7.8."
      },
      {
        "heading": "Gravebird's Blackquill Armor",
        "text": "8.6% physical, 9.3% strike, 9.3% slash, 7.8% pierce, 10.7% magic, 10% fire, 11.2% lightning, 11.2% holy damage negation. Immunity 54, Robustness 32, Focus 45, Vitality 42, Poise 16. Weight 7.4."
      },
      {
        "heading": "Gravebird Armor",
        "text": "6.9% physical, 7.8% strike, 7.8% slash, 6.5% pierce, 9.3% magic, 8.6% fire, 10% lightning, 10% holy damage negation. Immunity 50, Robustness 25, Focus 38, Vitality 34, Poise 13. Weight 6."
      },
      {
        "heading": "Common Soldier Cloth Armor",
        "text": "12.4% physical, 9.5% strike, 11.9% slash, 11.9% pierce, 7.1% magic, 8.8% fire, 6.1% lightning, 8% holy damage negation. Immunity 25, Robustness 46, Focus 18, Vitality 18, Poise 19. Weight 8.8."
      },
      {
        "heading": "Horned Warrior Armor",
        "text": "13.5% physical, 12.4% strike, 12.9% slash, 11.4% pierce, 10.2% magic, 10.2% fire, 8.8% lightning, 8.8% holy damage negation. Immunity 31, Robustness 59, Focus 18, Vitality 23, Poise 22. Weight 10.4."
      },
      {
        "heading": "Divine Beast Warrior Armor",
        "text": "12.9% physical, 11.9% strike, 12.4% slash, 11.9% pierce, 10.2% magic, 10.2% fire, 8.8% lightning, 9.5% holy damage negation. Immunity 31, Robustness 54, Focus 18, Vitality 24, Poise 22. Weight 10.4."
      },
      {
        "heading": "Divine Bird Warrior Armor",
        "text": "14% physical, 12.9% strike, 13.5% slash, 12.4% pierce, 11.4% magic, 11.4% fire, 9.5% lightning, 10.2% holy damage negation. Immunity 37, Robustness 56, Focus 23, Vitality 23, Poise 25. Weight 11.6."
      },
      {
        "heading": "Rellana's Armor",
        "text": "13.5% physical, 11.9% strike, 14% slash, 12.9% pierce, 12.6% magic, 11.9% fire, 9.5% lightning, 10.9% holy damage negation. Immunity 35, Robustness 57, Focus 24, Vitality 24, Poise 24. Weight 11.8."
      },
      {
        "heading": "Young Lion's Armor",
        "text": "16.8% physical, 14.4% strike, 16.8% slash, 16.8% pierce, 12.4% magic, 12.8% fire, 11.4% lightning, 12.8% holy damage negation. Immunity 45, Robustness 64, Focus 22, Vitality 32, Poise 31. Weight 15."
      },
      {
        "heading": "Young Lion's Armor (Altered)",
        "text": "15.3% physical, 13.4% strike, 15.3% slash, 15.3% pierce, 11.4% magic, 12.4% fire, 10.2% lightning, 12.4% holy damage negation. Immunity 38, Robustness 57, Focus 21, Vitality 25, Poise 28. Weight 13.7."
      },
      {
        "heading": "Shadow Militiaman Armor",
        "text": "7.1% physical, 8.8% strike, 8% slash, 8% pierce, 10.2% magic, 10.9% fire, 10.9% lightning, 8.8% holy damage negation. Immunity 69, Robustness 29, Focus 38, Vitality 38, Poise 13. Weight 7.1."
      }
    ]
  },
  {
    "title": "Arms",
    "url": "questbot://guide/armor/arms",
    "sections": [
      {
        "heading": "Iron Gauntlets",
        "text": "2.8% physical, 2.3% strike, 2.9% slash, 2.9% pierce, 2.1% magic, 2.3% fire, 1.5% lightning, 1.9% holy damage negation. Immunity 8, Robustness 15, Focus 6, Vitality 4, Poise 4. Weight 2.9."
      },
      {
        "heading": "Kaiden Gauntlets",
        "text": "2.9% physical, 2.1% strike, 2.9% slash, 2.9% pierce, 1.9% magic, 2.1% fire, 1.7% lightning, 1.9% holy damage negation. Immunity 8, Robustness 15, Focus 6, Vitality 6, Poise 4. Weight 2.9."
      },
      {
        "heading": "Drake Knight Gauntlets",
        "text": "2.8% physical, 2.3% strike, 2.9% slash, 2.8% pierce, 2.5% magic, 2.8% fire, 2.1% lightning, 2.5% holy damage negation. Immunity 8, Robustness 15, Focus 7, Vitality 7, Poise 4. Weight 3.1."
      },
      {
        "heading": "Scaled Gauntlets",
        "text": "4% physical, 3.4% strike, 4.2% slash, 4% pierce, 3.3% magic, 3.5% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 19, Robustness 28, Focus 13, Vitality 13, Poise 7. Weight 5.3."
      },
      {
        "heading": "Perfumer Gloves",
        "text": "1% physical, 1.5% strike, 1.3% slash, 1% pierce, 3.2% magic, 2.9% fire, 3.1% lightning, 3.2% holy damage negation. Immunity 20, Robustness 6, Focus 21, Vitality 22, Poise 2. Weight 1.4."
      },
      {
        "heading": "Traveler's Gloves",
        "text": "1.3% physical, 1.3% strike, 1% slash, 0.6% pierce, 3.2% magic, 3.2% fire, 3.1% lightning, 3.2% holy damage negation. Immunity 18, Robustness 7, Focus 22, Vitality 21, Poise 2. Weight 1.4."
      },
      {
        "heading": "Alberich's Bracers",
        "text": "1.3% physical, 1% strike, 1.3% slash, 1.3% pierce, 3.2% magic, 2.9% fire, 3.1% lightning, 3.2% holy damage negation. Immunity 13, Robustness 8, Focus 22, Vitality 24, Poise 1. Weight 1.4."
      },
      {
        "heading": "Spellblade's Gloves",
        "text": "0.9% physical, 0.5% strike, 0.9% slash, 0.9% pierce, 3.1% magic, 2.7% fire, 2.8% lightning, 3.1% holy damage negation. Immunity 11, Robustness 6, Focus 19, Vitality 20, Poise 1. Weight 1.2."
      },
      {
        "heading": "Bull-Goat Gauntlets",
        "text": "5.2% physical, 5.2% strike, 4.6% slash, 4.6% pierce, 3.3% magic, 3.3% fire, 3.7% lightning, 3.2% holy damage negation. Immunity 24, Robustness 28, Focus 15, Vitality 18, Poise 10. Weight 8.8."
      },
      {
        "heading": "Ronin's Gauntlets",
        "text": "2.7% physical, 2.7% strike, 2.8% slash, 2.7% pierce, 2.9% magic, 3.1% fire, 3.2% lightning, 2.9% holy damage negation. Immunity 25, Robustness 19, Focus 20, Vitality 21, Poise 4. Weight 3.1."
      },
      {
        "heading": "Blaidd's Gauntlets",
        "text": "3.6% physical, 3.2% strike, 3.6% slash, 3.8% pierce, 2.8% magic, 3.2% fire, 2.7% lightning, 2.9% holy damage negation. Immunity 13, Robustness 21, Focus 8, Vitality 8, Poise 6. Weight 4.6."
      },
      {
        "heading": "Black Knife Gauntlets",
        "text": "2.8% physical, 2.7% strike, 3.1% slash, 3.1% pierce, 2.1% magic, 2.3% fire, 1.6% lightning, 2.8% holy damage negation. Immunity 9, Robustness 15, Focus 8, Vitality 8, Poise 4. Weight 3.1."
      },
      {
        "heading": "Exile Gauntlets",
        "text": "2.9% physical, 2.1% strike, 3.1% slash, 2.9% pierce, 1.7% magic, 2.5% fire, 1.5% lightning, 2.1% holy damage negation. Immunity 8, Robustness 17, Focus 6, Vitality 4, Poise 4. Weight 2.9."
      },
      {
        "heading": "Banished Knight Gauntlets",
        "text": "4.7% physical, 3.7% strike, 4.9% slash, 4.4% pierce, 3.3% magic, 3.3% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 20, Robustness 28, Focus 13, Vitality 14, Poise 7. Weight 5.8."
      },
      {
        "heading": "Briar Gauntlets",
        "text": "3.2% physical, 2.8% strike, 3.3% slash, 3.1% pierce, 2.7% magic, 3.1% fire, 2.1% lightning, 2.7% holy damage negation. Immunity 12, Robustness 24, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Night's Cavalry Gauntlets",
        "text": "3.5% physical, 3.2% strike, 3.5% slash, 3.3% pierce, 2.7% magic, 3.1% fire, 2.7% lightning, 3.1% holy damage negation. Immunity 13, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 4.3."
      },
      {
        "heading": "Blue Silver Bracelets",
        "text": "2.3% physical, 1.5% strike, 2.5% slash, 1.9% pierce, 1.9% magic, 1.6% fire, 1% lightning, 1% holy damage negation. Immunity 4, Robustness 14, Focus 4, Vitality 4, Poise 3. Weight 2.1."
      },
      {
        "heading": "Malformed Dragon Gauntlets",
        "text": "4.2% physical, 3.7% strike, 4.4% slash, 4.2% pierce, 3.2% magic, 3.2% fire, 3.4% lightning, 3.2% holy damage negation. Immunity 19, Robustness 25, Focus 13, Vitality 13, Poise 7. Weight 5.3."
      },
      {
        "heading": "Tree Sentinel Gauntlets",
        "text": "4.7% physical, 3.7% strike, 4.7% slash, 4.4% pierce, 3.2% magic, 4.3% fire, 3.1% lightning, 3.5% holy damage negation. Immunity 22, Robustness 30, Focus 14, Vitality 15, Poise 8. Weight 6.3."
      },
      {
        "heading": "Royal Knight Gauntlets",
        "text": "4% physical, 3.6% strike, 4.4% slash, 4.2% pierce, 3.5% magic, 3.3% fire, 3.1% lightning, 3.2% holy damage negation. Immunity 17, Robustness 22, Focus 12, Vitality 12, Poise 6. Weight 5.2."
      },
      {
        "heading": "Nox Bracelets",
        "text": "2.1% physical, 2.3% strike, 2.1% slash, 1.9% pierce, 2.9% magic, 2.8% fire, 2.8% lightning, 2.3% holy damage negation. Immunity 20, Robustness 13, Focus 15, Vitality 15, Poise 3. Weight 2.6."
      },
      {
        "heading": "Guardian Bracers",
        "text": "2.7% physical, 2.5% strike, 2.5% slash, 2.3% pierce, 2.9% magic, 2.8% fire, 2.9% lightning, 2.9% holy damage negation. Immunity 25, Robustness 17, Focus 20, Vitality 19, Poise 3. Weight 2.9."
      },
      {
        "heading": "Cleanrot Gauntlets",
        "text": "3.6% physical, 3.3% strike, 4% slash, 4.4% pierce, 3.1% magic, 3.2% fire, 2.8% lightning, 3.3% holy damage negation. Immunity 21, Robustness 22, Focus 9, Vitality 11, Poise 6. Weight 5."
      },
      {
        "heading": "Fire Monk Gauntlets",
        "text": "3.5% physical, 3.1% strike, 3.3% slash, 3.1% pierce, 2.7% magic, 3.3% fire, 2.3% lightning, 2.3% holy damage negation. Immunity 11, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Blackflame Monk Gauntlets",
        "text": "3.3% physical, 2.8% strike, 3.6% slash, 3.2% pierce, 2.5% magic, 3.2% fire, 1.9% lightning, 2.5% holy damage negation. Immunity 11, Robustness 18, Focus 7, Vitality 11, Poise 5. Weight 3.9."
      },
      {
        "heading": "Fire Prelate Gauntlets",
        "text": "4.9% physical, 4.3% strike, 4.6% slash, 4.6% pierce, 3.3% magic, 5% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 22, Robustness 21, Focus 30, Vitality 17, Poise 10. Weight 8.2."
      },
      {
        "heading": "Vulgar Militia Gauntlets",
        "text": "1.7% physical, 2.1% strike, 1.9% slash, 1.6% pierce, 2.1% magic, 2.1% fire, 2.3% lightning, 2.1% holy damage negation. Immunity 20, Robustness 9, Focus 14, Vitality 14, Poise 3. Weight 2.1."
      },
      {
        "heading": "Elden Lord Bracers",
        "text": "2.9% physical, 2.7% strike, 2.8% slash, 3.1% pierce, 2.1% magic, 2.8% fire, 1.7% lightning, 1.9% holy damage negation. Immunity 11, Robustness 18, Focus 6, Vitality 7, Poise 4. Weight 3.1."
      },
      {
        "heading": "Radahn's Gauntlets",
        "text": "4.7% physical, 3.7% strike, 4.6% slash, 4.4% pierce, 3.3% magic, 3.5% fire, 3.1% lightning, 3.3% holy damage negation. Immunity 20, Robustness 33, Focus 14, Vitality 13, Poise 7. Weight 5.8."
      },
      {
        "heading": "Queen's Bracelets",
        "text": "1.5% physical, 1.3% strike, 1.3% slash, 1% pierce, 3.4% magic, 3.1% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 14, Robustness 8, Focus 24, Vitality 28, Poise 2. Weight 1.7."
      },
      {
        "heading": "Godskin Apostle Bracelets",
        "text": "1.7% physical, 1.6% strike, 1.6% slash, 1.3% pierce, 3.2% magic, 3.1% fire, 3.2% lightning, 3.6% holy damage negation. Immunity 17, Robustness 8, Focus 28, Vitality 25, Poise 3. Weight 2.1."
      },
      {
        "heading": "Godskin Noble Bracelets",
        "text": "1.3% physical, 2.1% strike, 1.5% slash, 1.3% pierce, 3.2% magic, 2.9% fire, 3.1% lightning, 3.4% holy damage negation. Immunity 14, Robustness 8, Focus 24, Vitality 25, Poise 3. Weight 1.7."
      },
      {
        "heading": "Depraved Perfumer Gloves",
        "text": "1.5% physical, 1.5% strike, 1.4% slash, 1.2% pierce, 3.2% magic, 3.1% fire, 3.1% lightning, 3.1% holy damage negation. Immunity 23, Robustness 8, Focus 20, Vitality 28, Poise 2. Weight 2."
      },
      {
        "heading": "Crucible Gauntlets",
        "text": "4.4% physical, 3.4% strike, 4.2% slash, 4.2% pierce, 3.2% magic, 3.2% fire, 2.8% lightning, 3.3% holy damage negation. Immunity 17, Robustness 24, Focus 12, Vitality 12, Poise 7. Weight 5.2."
      },
      {
        "heading": "Lusat's Manchettes",
        "text": "1.3% physical, 0.1% strike, 1.3% slash, 0.1% pierce, 3.4% magic, 2.8% fire, 3.1% lightning, 3.1% holy damage negation. Immunity 12, Robustness 6, Focus 20, Vitality 22, Poise 1. Weight 1.1."
      },
      {
        "heading": "Azur's Manchettes",
        "text": "1% physical, 0.1% strike, 0.6% slash, 0.6% pierce, 3.4% magic, 2.8% fire, 2.9% lightning, 3.2% holy damage negation. Immunity 12, Robustness 8, Focus 22, Vitality 20, Poise 1. Weight 1.1."
      },
      {
        "heading": "All-Knowing Gauntlets",
        "text": "3.2% physical, 2.9% strike, 3.3% slash, 2.9% pierce, 3.1% magic, 2.3% fire, 2.5% lightning, 2.1% holy damage negation. Immunity 9, Robustness 15, Focus 7, Vitality 7, Poise 5. Weight 3.5."
      },
      {
        "heading": "Twinned Gauntlets",
        "text": "3.3% physical, 3.1% strike, 3.6% slash, 2.9% pierce, 2.8% magic, 2.8% fire, 2.1% lightning, 2.5% holy damage negation. Immunity 11, Robustness 18, Focus 7, Vitality 18, Poise 5. Weight 3.9."
      },
      {
        "heading": "Astrologer Gloves",
        "text": "1.3% physical, 1% strike, 1% slash, 1% pierce, 3.2% magic, 3.1% fire, 3.2% lightning, 3.1% holy damage negation. Immunity 14, Robustness 7, Focus 24, Vitality 21, Poise 2. Weight 1.4."
      },
      {
        "heading": "Lionel's Gauntlets",
        "text": "4.4% physical, 4.1% strike, 4.9% slash, 5% pierce, 3.3% magic, 3.7% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 21, Robustness 33, Focus 14, Vitality 17, Poise 9. Weight 7.1."
      },
      {
        "heading": "Hoslow's Gauntlets",
        "text": "3.5% physical, 2.9% strike, 3.3% slash, 3.1% pierce, 2.7% magic, 2.9% fire, 2.5% lightning, 2.5% holy damage negation. Immunity 13, Robustness 20, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Vagabond Knight Gauntlets",
        "text": "3.3% physical, 2.8% strike, 3.1% slash, 2.9% pierce, 2.5% magic, 2.7% fire, 2.1% lightning, 2.1% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Warrior Gauntlets",
        "text": "2.3% physical, 2.3% strike, 1.9% slash, 1.9% pierce, 2.5% magic, 2.7% fire, 2.9% lightning, 2.3% holy damage negation. Immunity 21, Robustness 14, Focus 17, Vitality 17, Poise 3. Weight 2.6."
      },
      {
        "heading": "War Surgeon Gloves",
        "text": "1.6% physical, 1.8% strike, 2% slash, 1.6% pierce, 2.2% magic, 2.4% fire, 2.6% lightning, 2.4% holy damage negation. Immunity 18, Robustness 13, Focus 15, Vitality 17, Poise 3. Weight 2.3."
      },
      {
        "heading": "Royal Remains Gauntlets",
        "text": "2.9% physical, 2.8% strike, 3.2% slash, 2.9% pierce, 2.3% magic, 2.5% fire, 1.9% lightning, 2.1% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 4, Poise 4. Weight 3.5."
      },
      {
        "heading": "Beast Champion Gauntlets",
        "text": "4.4% physical, 4.1% strike, 4.7% slash, 4.6% pierce, 3.2% magic, 3.4% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 19, Robustness 30, Focus 14, Vitality 13, Poise 7. Weight 5.8."
      },
      {
        "heading": "Champion Bracers",
        "text": "1.6% physical, 2.1% strike, 1.7% slash, 1.9% pierce, 1.9% magic, 2.3% fire, 2.5% lightning, 2.3% holy damage negation. Immunity 17, Robustness 11, Focus 14, Vitality 13, Poise 3. Weight 2.1."
      },
      {
        "heading": "Noble's Gloves",
        "text": "1.5% physical, 1.6% strike, 1.5% slash, 1.6% pierce, 3.3% magic, 3.3% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 15, Robustness 8, Focus 25, Vitality 28, Poise 2. Weight 2.1."
      },
      {
        "heading": "Maliketh's Gauntlets",
        "text": "3.3% physical, 2.9% strike, 3.5% slash, 3.3% pierce, 2.7% magic, 2.8% fire, 2.3% lightning, 3.2% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 17, Poise 5. Weight 4.3."
      },
      {
        "heading": "Malenia's Gauntlet",
        "text": "3.1% physical, 2.3% strike, 3.2% slash, 2.8% pierce, 1.9% magic, 2.3% fire, 1.6% lightning, 2.7% holy damage negation. Immunity 17, Robustness 14, Focus 6, Vitality 6, Poise 4. Weight 3.1."
      },
      {
        "heading": "Veteran's Gauntlets",
        "text": "4.7% physical, 4.3% strike, 4.7% slash, 4.4% pierce, 3.3% magic, 3.5% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 21, Robustness 30, Focus 15, Vitality 15, Poise 8. Weight 6.3."
      },
      {
        "heading": "Bloodhound Knight Gauntlets",
        "text": "3.1% physical, 2.8% strike, 3.5% slash, 3.3% pierce, 2.3% magic, 2.5% fire, 1.7% lightning, 2.5% holy damage negation. Immunity 11, Robustness 17, Focus 8, Vitality 8, Poise 4. Weight 3.5."
      },
      {
        "heading": "Sorcerer Manchettes",
        "text": "1% physical, 1.3% strike, 1.3% slash, 0.1% pierce, 3.2% magic, 3.1% fire, 2.9% lightning, 3.1% holy damage negation. Immunity 13, Robustness 4, Focus 21, Vitality 20, Poise 1. Weight 1.1."
      },
      {
        "heading": "Raging Wolf Gauntlets",
        "text": "3.2% physical, 2.8% strike, 3.2% slash, 3.1% pierce, 2.4% magic, 2.7% fire, 1.6% lightning, 2.2% holy damage negation. Immunity 11, Robustness 19, Focus 6, Vitality 6, Poise 4. Weight 3.4."
      },
      {
        "heading": "Land of Reeds Gauntlets",
        "text": "2.1% physical, 2.3% strike, 2.9% slash, 2.3% pierce, 2.5% magic, 2.8% fire, 2.9% lightning, 2.7% holy damage negation. Immunity 20, Robustness 17, Focus 17, Vitality 18, Poise 3. Weight 2.8."
      },
      {
        "heading": "White Reed Gauntlets",
        "text": "2.3% physical, 2.5% strike, 2.8% slash, 2.1% pierce, 2.7% magic, 2.7% fire, 2.9% lightning, 2.5% holy damage negation. Immunity 22, Robustness 14, Focus 18, Vitality 17, Poise 4. Weight 2.8."
      },
      {
        "heading": "Confessor Gloves",
        "text": "2.1% physical, 2.7% strike, 2.1% slash, 2.3% pierce, 2.8% magic, 2.8% fire, 3.1% lightning, 2.5% holy damage negation. Immunity 21, Robustness 17, Focus 17, Vitality 18, Poise 3. Weight 2.8."
      },
      {
        "heading": "Traveling Maiden Gloves",
        "text": "1.3% physical, 1.5% strike, 1.5% slash, 1% pierce, 3.3% magic, 3.2% fire, 3.2% lightning, 3.3% holy damage negation. Immunity 15, Robustness 8, Focus 25, Vitality 28, Poise 2. Weight 1.6."
      },
      {
        "heading": "Preceptor's Gloves",
        "text": "1.5% physical, 1.6% strike, 1.5% slash, 1.5% pierce, 3.6% magic, 3.3% fire, 3.2% lightning, 3.2% holy damage negation. Immunity 17, Robustness 8, Focus 28, Vitality 25, Poise 3. Weight 2.1."
      },
      {
        "heading": "Bandit Manchettes",
        "text": "1.5% physical, 1.6% strike, 1.7% slash, 1.7% pierce, 1.9% magic, 1.9% fire, 2.1% lightning, 1.7% holy damage negation. Immunity 15, Robustness 8, Focus 17, Vitality 17, Poise 2. Weight 1.7."
      },
      {
        "heading": "Eccentric's Manchettes",
        "text": "2.9% physical, 2.1% strike, 2.8% slash, 2.9% pierce, 2.1% magic, 2.3% fire, 1.5% lightning, 1.9% holy damage negation. Immunity 8, Robustness 18, Focus 6, Vitality 4, Poise 4. Weight 2.9."
      },
      {
        "heading": "Fingerprint Gauntlets",
        "text": "3.3% physical, 2.9% strike, 2.9% slash, 2.9% pierce, 2.3% magic, 3.1% fire, 1.6% lightning, 2.3% holy damage negation. Immunity 11, Robustness 20, Focus 4, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Bloodsoaked Manchettes",
        "text": "1.3% physical, 1.5% strike, 1% slash, 0.6% pierce, 3.1% magic, 3.1% fire, 3.1% lightning, 3.1% holy damage negation. Immunity 14, Robustness 9, Focus 24, Vitality 22, Poise 2. Weight 1.4."
      },
      {
        "heading": "Omen Gauntlets",
        "text": "4.6% physical, 3.7% strike, 4.7% slash, 4.7% pierce, 3.2% magic, 3.6% fire, 3.7% lightning, 3.4% holy damage negation. Immunity 22, Robustness 21, Focus 19, Vitality 25, Poise 9. Weight 7.7."
      },
      {
        "heading": "Carian Knight Gauntlets",
        "text": "2.9% physical, 2.7% strike, 3.1% slash, 2.9% pierce, 3.1% magic, 2.9% fire, 2.3% lightning, 2.9% holy damage negation. Immunity 9, Robustness 15, Focus 7, Vitality 8, Poise 4. Weight 3.5."
      },
      {
        "heading": "Errant Sorcerer Manchettes",
        "text": "0.6% physical, 0.6% strike, 1.3% slash, 0.6% pierce, 3.2% magic, 3.1% fire, 2.9% lightning, 3.2% holy damage negation. Immunity 11, Robustness 7, Focus 21, Vitality 22, Poise 1. Weight 1.1."
      },
      {
        "heading": "Battlemage Manchettes",
        "text": "1% physical, 1.3% strike, 0.6% slash, 1% pierce, 3.2% magic, 2.8% fire, 2.9% lightning, 3.1% holy damage negation. Immunity 13, Robustness 7, Focus 20, Vitality 22, Poise 2. Weight 1.1."
      },
      {
        "heading": "Traveler's Manchettes",
        "text": "1.6% physical, 1.5% strike, 1.3% slash, 1% pierce, 3.3% magic, 3.2% fire, 3.2% lightning, 3.1% holy damage negation. Immunity 13, Robustness 8, Focus 25, Vitality 25, Poise 2. Weight 1.7."
      },
      {
        "heading": "Gold Bracelets",
        "text": "1% physical, 0.6% strike, 0.6% slash, 0.1% pierce, 2.9% magic, 2.8% fire, 2.9% lightning, 3.2% holy damage negation. Immunity 13, Robustness 4, Focus 20, Vitality 20, Poise 1. Weight 0.8."
      },
      {
        "heading": "Zamor Bracelets",
        "text": "2.8% physical, 2.1% strike, 2.9% slash, 2.5% pierce, 1.9% magic, 1.9% fire, 1.3% lightning, 1.7% holy damage negation. Immunity 6, Robustness 20, Focus 0, Vitality 4, Poise 4. Weight 2.8."
      },
      {
        "heading": "Chain Gauntlets",
        "text": "2.9% physical, 2.1% strike, 3.2% slash, 2.9% pierce, 1.7% magic, 2.7% fire, 1.5% lightning, 1.9% holy damage negation. Immunity 8, Robustness 14, Focus 4, Vitality 6, Poise 4. Weight 2.9."
      },
      {
        "heading": "Mushroom Arms",
        "text": "1.5% physical, 1.7% strike, 0.6% slash, 1.3% pierce, 3.3% magic, 1.3% fire, 3.2% lightning, 3.2% holy damage negation. Immunity 34, Robustness 8, Focus 30, Vitality 25, Poise 1. Weight 1.7."
      },
      {
        "heading": "Leather Gloves",
        "text": "1.9% physical, 2.3% strike, 1.9% slash, 2.1% pierce, 2.3% magic, 2.3% fire, 2.5% lightning, 2.5% holy damage negation. Immunity 20, Robustness 12, Focus 14, Vitality 17, Poise 3. Weight 2.4."
      },
      {
        "heading": "Knight Gauntlets",
        "text": "3.1% physical, 2.9% strike, 3.3% slash, 3.3% pierce, 2.7% magic, 2.7% fire, 2.3% lightning, 2.1% holy damage negation. Immunity 9, Robustness 17, Focus 6, Vitality 6, Poise 5. Weight 3.5."
      },
      {
        "heading": "Godrick Soldier Gauntlets",
        "text": "3.2% physical, 2.8% strike, 3.2% slash, 3.1% pierce, 2.5% magic, 2.7% fire, 1.9% lightning, 2.3% holy damage negation. Immunity 11, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Raya Lucarian Gauntlets",
        "text": "3.2% physical, 2.7% strike, 3.3% slash, 3.2% pierce, 2.7% magic, 2.7% fire, 1.7% lightning, 2.1% holy damage negation. Immunity 11, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Leyndell Soldier Gauntlets",
        "text": "3.2% physical, 2.9% strike, 3.1% slash, 3.2% pierce, 2.3% magic, 2.5% fire, 2.1% lightning, 2.3% holy damage negation. Immunity 11, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Radahn Soldier Gauntlets",
        "text": "3.3% physical, 2.7% strike, 3.1% slash, 2.9% pierce, 2.5% magic, 2.8% fire, 1.9% lightning, 2.3% holy damage negation. Immunity 11, Robustness 17, Focus 8, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Mausoleum Gauntlets",
        "text": "3.2% physical, 2.7% strike, 3.3% slash, 3.1% pierce, 2.5% magic, 2.5% fire, 2.1% lightning, 2.5% holy damage negation. Immunity 11, Robustness 17, Focus 8, Vitality 7, Poise 5. Weight 3.5."
      },
      {
        "heading": "Haligtree Gauntlets",
        "text": "3.2% physical, 2.9% strike, 3.1% slash, 3.2% pierce, 2.3% magic, 2.5% fire, 1.9% lightning, 2.5% holy damage negation. Immunity 11, Robustness 18, Focus 8, Vitality 8, Poise 4. Weight 3.5."
      },
      {
        "heading": "Gelmir Knight Gauntlets",
        "text": "3.3% physical, 2.8% strike, 3.5% slash, 3.3% pierce, 2.7% magic, 3.1% fire, 2.5% lightning, 2.7% holy damage negation. Immunity 12, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Godrick Knight Gauntlets",
        "text": "3.3% physical, 2.9% strike, 3.5% slash, 3.2% pierce, 2.7% magic, 2.9% fire, 2.3% lightning, 2.7% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Cuckoo Knight Gauntlets",
        "text": "3.3% physical, 2.8% strike, 3.6% slash, 3.3% pierce, 3.1% magic, 2.9% fire, 2.1% lightning, 2.5% holy damage negation. Immunity 11, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Leyndell Knight Gauntlets",
        "text": "3.3% physical, 3.1% strike, 3.3% slash, 3.3% pierce, 2.5% magic, 2.8% fire, 2.5% lightning, 2.7% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Redmane Knight Gauntlets",
        "text": "3.5% physical, 2.8% strike, 3.3% slash, 3.1% pierce, 2.7% magic, 3.1% fire, 2.3% lightning, 2.7% holy damage negation. Immunity 12, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Mausoleum Knight Gauntlets",
        "text": "3.3% physical, 2.8% strike, 3.6% slash, 3.2% pierce, 2.7% magic, 2.8% fire, 2.5% lightning, 2.8% holy damage negation. Immunity 12, Robustness 18, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Haligtree Knight Gauntlets",
        "text": "3.3% physical, 3.1% strike, 3.3% slash, 3.3% pierce, 2.5% magic, 2.8% fire, 2.3% lightning, 2.8% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Foot Soldier Gauntlets",
        "text": "2.1% physical, 2.3% strike, 2.1% slash, 2.1% pierce, 2.5% magic, 2.7% fire, 2.8% lightning, 2.5% holy damage negation. Immunity 20, Robustness 13, Focus 17, Vitality 17, Poise 3. Weight 2.6."
      },
      {
        "heading": "Omenkiller Long Gloves",
        "text": "2.1% physical, 1.9% strike, 1.7% slash, 1.7% pierce, 2.1% magic, 2.3% fire, 2.8% lightning, 2.5% holy damage negation. Immunity 22, Robustness 9, Focus 15, Vitality 15, Poise 3. Weight 2.4."
      },
      {
        "heading": "Highwayman Gauntlets",
        "text": "1.9% physical, 2.5% strike, 1.9% slash, 2.1% pierce, 2.7% magic, 2.7% fire, 2.8% lightning, 2.5% holy damage negation. Immunity 19, Robustness 12, Focus 17, Vitality 17, Poise 3. Weight 2.6."
      },
      {
        "heading": "Dryleaf Arm Wraps",
        "text": "1.3% physical, 1.6% strike, 1% slash, 1% pierce, 3.5% magic, 2.9% fire, 3.1% lightning, 3.5% holy damage negation. Immunity 13, Robustness 8, Focus 25, Vitality 24, Poise 2. Weight 1.7."
      },
      {
        "heading": "Gaius's Gauntlets",
        "text": "4.2% physical, 3.9% strike, 5% slash, 4.9% pierce, 3.5% magic, 3.4% fire, 3.4% lightning, 3.4% holy damage negation. Immunity 22, Robustness 28, Focus 18, Vitality 18, Poise 8. Weight 6.7."
      },
      {
        "heading": "Oathseeker Knight Gauntlets",
        "text": "3.2% physical, 2.8% strike, 3.1% slash, 2.9% pierce, 2.7% magic, 2.5% fire, 1.7% lightning, 2.5% holy damage negation. Immunity 11, Robustness 19, Focus 8, Vitality 8, Poise 4. Weight 3.5."
      },
      {
        "heading": "Verdigris Gauntlets",
        "text": "5.2% physical, 4.5% strike, 5% slash, 4.7% pierce, 3.3% magic, 3.3% fire, 3.6% lightning, 3.3% holy damage negation. Immunity 30, Robustness 36, Focus 12, Vitality 17, Poise 10. Weight 8.6."
      },
      {
        "heading": "Iron Rivet Gauntlets",
        "text": "2.8% physical, 2.1% strike, 2.8% slash, 2.7% pierce, 2.3% magic, 2.3% fire, 1.9% lightning, 2.1% holy damage negation. Immunity 8, Robustness 19, Focus 4, Vitality 4, Poise 4. Weight 2.9."
      },
      {
        "heading": "Thiollier's Gloves",
        "text": "2.1% physical, 2.1% strike, 1.7% slash, 1.7% pierce, 1.9% magic, 2.3% fire, 2.7% lightning, 2.5% holy damage negation. Immunity 24, Robustness 9, Focus 21, Vitality 13, Poise 3. Weight 2.4."
      },
      {
        "heading": "High Priest Gloves",
        "text": "1.3% physical, 1.5% strike, 1% slash, 0.6% pierce, 3.2% magic, 3.1% fire, 3.1% lightning, 3.1% holy damage negation. Immunity 14, Robustness 8, Focus 21, Vitality 25, Poise 2. Weight 1.4."
      },
      {
        "heading": "Braided Arm Wraps",
        "text": "1% physical, 0.6% strike, 0.6% slash, 0.1% pierce, 3.1% magic, 2.5% fire, 2.8% lightning, 3.2% holy damage negation. Immunity 12, Robustness 5, Focus 34, Vitality 19, Poise 1. Weight 0.8."
      },
      {
        "heading": "Dancer's Bracer",
        "text": "1.3% physical, 1% strike, 1.6% slash, 1% pierce, 3.2% magic, 3.2% fire, 3.1% lightning, 3.1% holy damage negation. Immunity 14, Robustness 8, Focus 21, Vitality 22, Poise 1. Weight 1.4."
      },
      {
        "heading": "Gauntlets of Night",
        "text": "1.7% physical, 1.7% strike, 1.9% slash, 1.9% pierce, 3.1% magic, 2.3% fire, 2.3% lightning, 3.1% holy damage negation. Immunity 18, Robustness 11, Focus 15, Vitality 15, Poise 3. Weight 2.4."
      },
      {
        "heading": "Igon's Gauntlets",
        "text": "2.3% physical, 2.5% strike, 2.3% slash, 2.3% pierce, 2.7% magic, 2.8% fire, 2.9% lightning, 2.7% holy damage negation. Immunity 21, Robustness 14, Focus 18, Vitality 18, Poise 4. Weight 2.8."
      },
      {
        "heading": "Ansbach's Manchettes",
        "text": "1.3% physical, 1.5% strike, 1.5% slash, 1% pierce, 3.2% magic, 3.2% fire, 3.1% lightning, 3.2% holy damage negation. Immunity 13, Robustness 8, Focus 25, Vitality 30, Poise 3. Weight 1.7."
      },
      {
        "heading": "Freyja's Gauntlets",
        "text": "3.3% physical, 2.3% strike, 2.8% slash, 2.8% pierce, 2.1% magic, 2.3% fire, 1.9% lightning, 2.3% holy damage negation. Immunity 8, Robustness 20, Focus 4, Vitality 8, Poise 4. Weight 3.1."
      },
      {
        "heading": "Gauntlets of Solitude",
        "text": "4.7% physical, 4.5% strike, 4.6% slash, 4.4% pierce, 3.3% magic, 3.6% fire, 3.3% lightning, 3.4% holy damage negation. Immunity 20, Robustness 21, Focus 33, Vitality 17, Poise 10. Weight 8."
      },
      {
        "heading": "Messmer Soldier Gauntlets",
        "text": "2.9% physical, 2.3% strike, 2.9% slash, 2.8% pierce, 1.9% magic, 2.3% fire, 1.6% lightning, 1.9% holy damage negation. Immunity 8, Robustness 15, Focus 6, Vitality 6, Poise 4. Weight 2.9."
      },
      {
        "heading": "Black Knight Gauntlets",
        "text": "3.6% physical, 3.1% strike, 3.6% slash, 4% pierce, 3.1% magic, 3.2% fire, 2.7% lightning, 2.8% holy damage negation. Immunity 14, Robustness 22, Focus 8, Vitality 8, Poise 6. Weight 4.6."
      },
      {
        "heading": "Rakshasa Gauntlets",
        "text": "3.2% physical, 2.9% strike, 3.5% slash, 3.3% pierce, 2.8% magic, 3.1% fire, 2.7% lightning, 2.8% holy damage negation. Immunity 12, Robustness 20, Focus 9, Vitality 9, Poise 6. Weight 4.3."
      },
      {
        "heading": "Fire Knight Gauntlets",
        "text": "3.2% physical, 2.5% strike, 2.9% slash, 2.7% pierce, 2.3% magic, 2.9% fire, 1.7% lightning, 2.1% holy damage negation. Immunity 9, Robustness 15, Focus 7, Vitality 8, Poise 4. Weight 3.1."
      },
      {
        "heading": "Leather Arm Wraps",
        "text": "1.9% physical, 2.3% strike, 2.1% slash, 1.9% pierce, 2.1% magic, 2.5% fire, 2.8% lightning, 2.5% holy damage negation. Immunity 19, Robustness 11, Focus 15, Vitality 14, Poise 3. Weight 2.4."
      },
      {
        "heading": "Death Knight Gauntlets",
        "text": "3.1% physical, 2.7% strike, 3.1% slash, 3.1% pierce, 2.3% magic, 2.3% fire, 3.1% lightning, 1.9% holy damage negation. Immunity 9, Robustness 15, Focus 6, Vitality 15, Poise 5. Weight 3.5."
      },
      {
        "heading": "Ascetic's Wrist Guards",
        "text": "1.5% physical, 0.1% strike, 1.3% slash, 0.6% pierce, 3.1% magic, 3.1% fire, 3.1% lightning, 3.3% holy damage negation. Immunity 14, Robustness 8, Focus 9, Vitality 21, Poise 2. Weight 1.1."
      },
      {
        "heading": "Messmer's Gauntlets",
        "text": "2.3% physical, 2.3% strike, 2.1% slash, 2.7% pierce, 2.5% magic, 3.1% fire, 2.9% lightning, 2.5% holy damage negation. Immunity 20, Robustness 14, Focus 19, Vitality 20, Poise 3. Weight 2.8."
      },
      {
        "heading": "Gravebird Bracelets",
        "text": "1.6% physical, 1.7% strike, 1.7% slash, 1.5% pierce, 2.1% magic, 1.9% fire, 2.3% lightning, 2.3% holy damage negation. Immunity 17, Robustness 8, Focus 13, Vitality 12, Poise 3. Weight 1.7."
      },
      {
        "heading": "Common Soldier Gauntlets",
        "text": "3.1% physical, 2.3% strike, 2.9% slash, 2.9% pierce, 1.7% magic, 2.1% fire, 1.5% lightning, 1.9% holy damage negation. Immunity 8, Robustness 15, Focus 6, Vitality 6, Poise 4. Weight 2.9."
      },
      {
        "heading": "Horned Warrior Gauntlets",
        "text": "3.3% physical, 3.1% strike, 3.2% slash, 2.8% pierce, 2.5% magic, 2.5% fire, 2.1% lightning, 2.1% holy damage negation. Immunity 11, Robustness 20, Focus 6, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Divine Bird Warrior Gauntlets",
        "text": "3.3% physical, 3.1% strike, 3.1% slash, 2.9% pierce, 2.7% magic, 2.5% fire, 1.9% lightning, 2.1% holy damage negation. Immunity 12, Robustness 18, Focus 7, Vitality 8, Poise 5. Weight 3.5."
      },
      {
        "heading": "Rellana's Gloves",
        "text": "3.3% physical, 2.9% strike, 3.5% slash, 3.2% pierce, 3.1% magic, 2.9% fire, 2.3% lightning, 2.7% holy damage negation. Immunity 12, Robustness 19, Focus 8, Vitality 8, Poise 5. Weight 3.9."
      },
      {
        "heading": "Young Lion's Gauntlets",
        "text": "4.2% physical, 3.6% strike, 4.2% slash, 4.2% pierce, 3.1% magic, 3.2% fire, 2.8% lightning, 3.2% holy damage negation. Immunity 17, Robustness 24, Focus 8, Vitality 12, Poise 7. Weight 5."
      },
      {
        "heading": "Shadow Militiaman Gauntlets",
        "text": "1.7% physical, 2.1% strike, 1.9% slash, 1.9% pierce, 2.5% magic, 2.7% fire, 2.7% lightning, 2.1% holy damage negation. Immunity 25, Robustness 11, Focus 14, Vitality 14, Poise 3. Weight 2.4."
      }
    ]
  },
  {
    "title": "Legs",
    "url": "questbot://guide/armor/legs",
    "sections": [
      {
        "heading": "Leather Trousers",
        "text": "6.5% physical, 5.4% strike, 6.8% slash, 6.8% pierce, 5% magic, 5.4% fire, 3.4% lightning, 4.5% holy damage negation. Immunity 16, Robustness 29, Focus 11, Vitality 7, Poise 11. Weight 5.5."
      },
      {
        "heading": "Kaiden Trousers",
        "text": "6.5% physical, 4.5% strike, 6.5% slash, 6.5% pierce, 4% magic, 4.5% fire, 3.8% lightning, 4% holy damage negation. Immunity 15, Robustness 26, Focus 7, Vitality 7, Poise 10. Weight 5.1."
      },
      {
        "heading": "Drake Knight Greaves",
        "text": "6.5% physical, 5.4% strike, 6.8% slash, 6.5% pierce, 5.8% magic, 6.5% fire, 5% lightning, 5.8% holy damage negation. Immunity 16, Robustness 29, Focus 13, Vitality 13, Poise 11. Weight 5.7."
      },
      {
        "heading": "Scaled Greaves",
        "text": "9.2% physical, 8% strike, 9.6% slash, 9.2% pierce, 7.7% magic, 8.1% fire, 7.4% lightning, 7.7% holy damage negation. Immunity 35, Robustness 51, Focus 24, Vitality 24, Poise 20. Weight 9.9."
      },
      {
        "heading": "Perfumer Sarong",
        "text": "2.3% physical, 3.4% strike, 3% slash, 2.3% pierce, 7.3% magic, 6.8% fire, 7.1% lightning, 7.3% holy damage negation. Immunity 37, Robustness 11, Focus 39, Vitality 41, Poise 4. Weight 2.5."
      },
      {
        "heading": "Traveler's Slops",
        "text": "3% physical, 3% strike, 2.3% slash, 1.5% pierce, 7.3% magic, 7.3% fire, 7.1% lightning, 7.3% holy damage negation. Immunity 34, Robustness 13, Focus 41, Vitality 39, Poise 5. Weight 2.5."
      },
      {
        "heading": "Alberich's Trousers",
        "text": "3% physical, 2.3% strike, 3% slash, 3% pierce, 7.3% magic, 6.8% fire, 7.2% lightning, 7.3% holy damage negation. Immunity 26, Robustness 14, Focus 41, Vitality 44, Poise 5. Weight 2.5."
      },
      {
        "heading": "Spellblade's Trousers",
        "text": "2.9% physical, 2.2% strike, 2.9% slash, 2.9% pierce, 7.3% magic, 6.7% fire, 7% lightning, 7.3% holy damage negation. Immunity 25, Robustness 13, Focus 38, Vitality 41, Poise 5. Weight 2.6."
      },
      {
        "heading": "Bull-Goat Greaves",
        "text": "11.9% physical, 11.8% strike, 10.6% slash, 10.6% pierce, 7.6% magic, 7.7% fire, 8.5% lightning, 7.3% holy damage negation. Immunity 44, Robustness 51, Focus 29, Vitality 34, Poise 28. Weight 16.4."
      },
      {
        "heading": "Ronin's Greaves",
        "text": "6.2% physical, 6.2% strike, 6.5% slash, 6.2% pierce, 6.8% magic, 7.1% fire, 7.3% lightning, 6.8% holy damage negation. Immunity 46, Robustness 35, Focus 36, Vitality 38, Poise 11. Weight 5.7."
      },
      {
        "heading": "Cloth Trousers",
        "text": "3% physical, 2.3% strike, 1.5% slash, 2.3% pierce, 7.3% magic, 7.1% fire, 6.8% lightning, 7.1% holy damage negation. Immunity 26, Robustness 14, Focus 37, Vitality 37, Poise 3. Weight 2."
      },
      {
        "heading": "Blaidd's Greaves",
        "text": "8.4% physical, 7.3% strike, 8.4% slash, 8.8% pierce, 6.5% magic, 7.3% fire, 6.2% lightning, 6.8% holy damage negation. Immunity 24, Robustness 39, Focus 16, Vitality 16, Poise 17. Weight 8.5."
      },
      {
        "heading": "Black Knife Greaves",
        "text": "6.5% physical, 6.2% strike, 7.1% slash, 7.1% pierce, 5% magic, 5.4% fire, 3.8% lightning, 6.5% holy damage negation. Immunity 17, Robustness 29, Focus 14, Vitality 14, Poise 11. Weight 5.7."
      },
      {
        "heading": "Exile Greaves",
        "text": "7.1% physical, 5.4% strike, 7.4% slash, 7.1% pierce, 4.5% magic, 6.2% fire, 3.8% lightning, 5.4% holy damage negation. Immunity 17, Robustness 34, Focus 13, Vitality 11, Poise 11. Weight 5.7."
      },
      {
        "heading": "Banished Knight Greaves",
        "text": "10.8% physical, 8.6% strike, 11.1% slash, 10.1% pierce, 7.7% magic, 7.7% fire, 7.4% lightning, 7.6% holy damage negation. Immunity 37, Robustness 51, Focus 24, Vitality 26, Poise 20. Weight 10.8."
      },
      {
        "heading": "Briar Greaves",
        "text": "7.4% physical, 6.5% strike, 7.7% slash, 7.1% pierce, 6.2% magic, 7.1% fire, 5% lightning, 6.2% holy damage negation. Immunity 22, Robustness 44, Focus 15, Vitality 15, Poise 12. Weight 7.3."
      },
      {
        "heading": "Page Trousers",
        "text": "3.4% physical, 3% strike, 2.3% slash, 2.3% pierce, 7.2% magic, 7.1% fire, 7.3% lightning, 7.3% holy damage negation. Immunity 24, Robustness 13, Focus 44, Vitality 44, Poise 5. Weight 2.5."
      },
      {
        "heading": "Night's Cavalry Greaves",
        "text": "8% physical, 7.3% strike, 8% slash, 7.7% pierce, 6.2% magic, 7.2% fire, 6.2% lightning, 7.2% holy damage negation. Immunity 24, Robustness 35, Focus 15, Vitality 15, Poise 15. Weight 7.9."
      },
      {
        "heading": "Blue Silver Mail Skirt",
        "text": "6.8% physical, 5% strike, 7.1% slash, 6.2% pierce, 5.8% magic, 5.4% fire, 4% lightning, 4% holy damage negation. Immunity 15, Robustness 35, Focus 7, Vitality 7, Poise 10. Weight 5.5."
      },
      {
        "heading": "Nomadic Merchant's Trousers",
        "text": "4.5% physical, 5% strike, 4% slash, 3.8% pierce, 5.4% magic, 5.4% fire, 5.4% lightning, 5% holy damage negation. Immunity 35, Robustness 20, Focus 44, Vitality 29, Poise 8. Weight 4.4."
      },
      {
        "heading": "Malformed Dragon Greaves",
        "text": "9.6% physical, 8.6% strike, 10.1% slash, 9.6% pierce, 7.4% magic, 7.4% fire, 7.9% lightning, 7.4% holy damage negation. Immunity 35, Robustness 47, Focus 24, Vitality 24, Poise 19. Weight 9.9."
      },
      {
        "heading": "Tree Sentinel Greaves",
        "text": "10.8% physical, 8.6% strike, 10.8% slash, 10.1% pierce, 7.4% magic, 9.9% fire, 7.2% lightning, 8.1% holy damage negation. Immunity 41, Robustness 56, Focus 26, Vitality 29, Poise 23. Weight 11.7."
      },
      {
        "heading": "Royal Knight Greaves",
        "text": "9.2% physical, 8.3% strike, 10.1% slash, 9.6% pierce, 8.1% magic, 7.6% fire, 7.1% lightning, 7.4% holy damage negation. Immunity 31, Robustness 41, Focus 22, Vitality 22, Poise 14. Weight 9.6."
      },
      {
        "heading": "Nox Greaves",
        "text": "5.4% physical, 5.8% strike, 5.4% slash, 5% pierce, 7.1% magic, 6.8% fire, 6.8% lightning, 5.8% holy damage negation. Immunity 39, Robustness 26, Focus 31, Vitality 31, Poise 10. Weight 5.1."
      },
      {
        "heading": "Fur Leggings",
        "text": "3.4% physical, 3.8% strike, 3.4% slash, 3.4% pierce, 3.8% magic, 4% fire, 5% lightning, 4% holy damage negation. Immunity 39, Robustness 26, Focus 34, Vitality 24, Poise 5. Weight 3.1."
      },
      {
        "heading": "Shaman Leggings",
        "text": "3% physical, 3.4% strike, 3% slash, 4.5% pierce, 4.5% magic, 4% fire, 4.5% lightning, 3.8% holy damage negation. Immunity 39, Robustness 26, Focus 34, Vitality 22, Poise 4. Weight 3.1."
      },
      {
        "heading": "Duelist Greaves",
        "text": "8% physical, 7.1% strike, 8% slash, 7.4% pierce, 5.8% magic, 6.8% fire, 5.4% lightning, 6.2% holy damage negation. Immunity 29, Robustness 31, Focus 15, Vitality 15, Poise 14. Weight 7.3."
      },
      {
        "heading": "Sanguine Noble Waistcloth",
        "text": "3% physical, 2.3% strike, 2.3% slash, 2.3% pierce, 7.4% magic, 6.5% fire, 7.3% lightning, 7.6% holy damage negation. Immunity 29, Robustness 11, Focus 44, Vitality 41, Poise 5. Weight 2.5."
      },
      {
        "heading": "Guardian Greaves",
        "text": "6.2% physical, 5.8% strike, 5.8% slash, 5.4% pierce, 6.8% magic, 6.5% fire, 6.8% lightning, 6.8% holy damage negation. Immunity 47, Robustness 31, Focus 37, Vitality 35, Poise 9. Weight 5.5."
      },
      {
        "heading": "Cleanrot Greaves",
        "text": "8.4% physical, 7.6% strike, 9.2% slash, 10.1% pierce, 7.2% magic, 7.3% fire, 6.5% lightning, 7.7% holy damage negation. Immunity 39, Robustness 41, Focus 17, Vitality 20, Poise 16. Weight 9.3."
      },
      {
        "heading": "Fire Monk Greaves",
        "text": "8% physical, 7.1% strike, 7.7% slash, 7.1% pierce, 6.2% magic, 7.6% fire, 5.4% lightning, 5.4% holy damage negation. Immunity 20, Robustness 34, Focus 15, Vitality 15, Poise 13. Weight 7.3."
      },
      {
        "heading": "Blackflame Monk Greaves",
        "text": "7.7% physical, 6.5% strike, 8.4% slash, 7.4% pierce, 5.8% magic, 7.4% fire, 4.5% lightning, 5.8% holy damage negation. Immunity 20, Robustness 34, Focus 13, Vitality 20, Poise 14. Weight 7.3."
      },
      {
        "heading": "Fire Prelate Greaves",
        "text": "11.1% physical, 9.8% strike, 10.6% slash, 10.6% pierce, 7.7% magic, 11.5% fire, 7.4% lightning, 7.6% holy damage negation. Immunity 41, Robustness 39, Focus 56, Vitality 31, Poise 27. Weight 15.3."
      },
      {
        "heading": "Aristocrat Boots",
        "text": "4.3% physical, 4.8% strike, 4.3% slash, 4.3% pierce, 3.6% magic, 3.8% fire, 4.3% lightning, 3.6% holy damage negation. Immunity 29, Robustness 21, Focus 23, Vitality 19, Poise 7. Weight 2.9."
      },
      {
        "heading": "Old Aristocrat Shoes",
        "text": "3.4% physical, 3.4% strike, 3% slash, 3.4% pierce, 4.5% magic, 5% fire, 4.5% lightning, 3.4% holy damage negation. Immunity 22, Robustness 15, Focus 17, Vitality 20, Poise 2. Weight 2."
      },
      {
        "heading": "Vulgar Militia Greaves",
        "text": "5.4% physical, 6.2% strike, 5.8% slash, 5% pierce, 6.2% magic, 6.2% fire, 6.5% lightning, 6.2% holy damage negation. Immunity 44, Robustness 24, Focus 34, Vitality 34, Poise 10. Weight 5.1."
      },
      {
        "heading": "Sage Trousers",
        "text": "3.4% physical, 3% strike, 3% slash, 1.5% pierce, 7.6% magic, 7.1% fire, 7.3% lightning, 7.6% holy damage negation. Immunity 22, Robustness 13, Focus 39, Vitality 41, Poise 4. Weight 2.5."
      },
      {
        "heading": "Elden Lord Greaves",
        "text": "6.5% physical, 5.8% strike, 6.2% slash, 6.8% pierce, 4.5% magic, 6.2% fire, 3.8% lightning, 4% holy damage negation. Immunity 16, Robustness 31, Focus 7, Vitality 11, Poise 10. Weight 5.5."
      },
      {
        "heading": "Radahn's Greaves",
        "text": "10.8% physical, 8.6% strike, 10.6% slash, 10.1% pierce, 7.7% magic, 8.1% fire, 7.2% lightning, 7.7% holy damage negation. Immunity 37, Robustness 61, Focus 26, Vitality 24, Poise 20. Weight 10.8."
      },
      {
        "heading": "Queen's Leggings",
        "text": "2.3% physical, 1.5% strike, 1.5% slash, 0.3% pierce, 7.6% magic, 6.8% fire, 7.1% lightning, 7.3% holy damage negation. Immunity 22, Robustness 14, Focus 37, Vitality 41, Poise 3. Weight 2."
      },
      {
        "heading": "Godskin Apostle Trousers",
        "text": "3.4% physical, 3% strike, 3% slash, 1.5% pierce, 7.2% magic, 6.8% fire, 7.1% lightning, 7.9% holy damage negation. Immunity 26, Robustness 13, Focus 41, Vitality 39, Poise 5. Weight 2.5."
      },
      {
        "heading": "Godskin Noble Trousers",
        "text": "2.3% physical, 4.5% strike, 3% slash, 2.3% pierce, 7.2% magic, 6.5% fire, 6.8% lightning, 7.7% holy damage negation. Immunity 24, Robustness 14, Focus 39, Vitality 41, Poise 6. Weight 2.5."
      },
      {
        "heading": "Depraved Perfumer Trousers",
        "text": "3.9% physical, 3.9% strike, 3.7% slash, 3.3% pierce, 7.8% magic, 7.5% fire, 7.3% lightning, 7.5% holy damage negation. Immunity 46, Robustness 15, Focus 40, Vitality 58, Poise 7. Weight 4.3."
      },
      {
        "heading": "Crucible Greaves",
        "text": "10.1% physical, 8% strike, 9.6% slash, 9.6% pierce, 7.4% magic, 7.3% fire, 6.5% lightning, 7.7% holy damage negation. Immunity 31, Robustness 44, Focus 22, Vitality 22, Poise 20. Weight 9.6."
      },
      {
        "heading": "Old Sorcerer's Legwraps",
        "text": "3.4% physical, 1.5% strike, 3.4% slash, 1.5% pierce, 8.1% magic, 6.8% fire, 7.2% lightning, 7.3% holy damage negation. Immunity 24, Robustness 13, Focus 39, Vitality 44, Poise 4. Weight 2.5."
      },
      {
        "heading": "All-Knowing Greaves",
        "text": "7.4% physical, 6.8% strike, 7.7% slash, 6.8% pierce, 7.1% magic, 5.4% fire, 5.8% lightning, 5% holy damage negation. Immunity 17, Robustness 29, Focus 13, Vitality 13, Poise 13. Weight 6.6."
      },
      {
        "heading": "Twinned Greaves",
        "text": "7.7% physical, 7.1% strike, 8.4% slash, 6.8% pierce, 6.5% magic, 6.5% fire, 5% lightning, 5.8% holy damage negation. Immunity 20, Robustness 34, Focus 13, Vitality 34, Poise 13. Weight 7.3."
      },
      {
        "heading": "Prophet Trousers",
        "text": "3% physical, 3.4% strike, 3.4% slash, 3% pierce, 7.6% magic, 7.3% fire, 7.2% lightning, 7.6% holy damage negation. Immunity 26, Robustness 14, Focus 47, Vitality 51, Poise 3. Weight 3.1."
      },
      {
        "heading": "Astrologer Trousers",
        "text": "3.8% physical, 3.4% strike, 3.4% slash, 3.4% pierce, 7.7% magic, 7.4% fire, 7.6% lightning, 7.4% holy damage negation. Immunity 31, Robustness 15, Focus 56, Vitality 47, Poise 7. Weight 3.9."
      },
      {
        "heading": "Lionel's Greaves",
        "text": "10.1% physical, 9.4% strike, 11.1% slash, 11.4% pierce, 7.7% magic, 8.5% fire, 7.4% lightning, 7.7% holy damage negation. Immunity 39, Robustness 61, Focus 26, Vitality 31, Poise 24. Weight 13.1."
      },
      {
        "heading": "Hoslow's Greaves",
        "text": "8% physical, 6.8% strike, 7.7% slash, 7.1% pierce, 6.2% magic, 6.8% fire, 5.8% lightning, 5.8% holy damage negation. Immunity 24, Robustness 37, Focus 15, Vitality 15, Poise 13. Weight 7.3."
      },
      {
        "heading": "Vagabond Knight Greaves",
        "text": "7.4% physical, 5.8% strike, 6.8% slash, 6.5% pierce, 5% magic, 5.8% fire, 4.5% lightning, 4.5% holy damage negation. Immunity 20, Robustness 34, Focus 13, Vitality 13, Poise 12. Weight 5.7."
      },
      {
        "heading": "Warrior Greaves",
        "text": "5.4% physical, 5.4% strike, 4.5% slash, 4.5% pierce, 5.8% magic, 6.2% fire, 6.8% lightning, 5.4% holy damage negation. Immunity 39, Robustness 26, Focus 31, Vitality 31, Poise 10. Weight 4.8."
      },
      {
        "heading": "War Surgeon Trousers",
        "text": "3.9% physical, 4.4% strike, 4.9% slash, 3.9% pierce, 5.3% magic, 5.7% fire, 6.1% lightning, 5.7% holy damage negation. Immunity 33, Robustness 23, Focus 28, Vitality 31, Poise 8. Weight 4.2."
      },
      {
        "heading": "Royal Remains Greaves",
        "text": "6.8% physical, 6.5% strike, 7.4% slash, 6.8% pierce, 5.4% magic, 5.8% fire, 4.5% lightning, 5% holy damage negation. Immunity 22, Robustness 35, Focus 15, Vitality 7, Poise 12. Weight 6.6."
      },
      {
        "heading": "Beast Champion Greaves",
        "text": "10.1% physical, 9.4% strike, 10.8% slash, 10.6% pierce, 7.4% magic, 7.9% fire, 7.3% lightning, 7.7% holy damage negation. Immunity 35, Robustness 56, Focus 26, Vitality 24, Poise 20. Weight 10.8."
      },
      {
        "heading": "Champion Gaiters",
        "text": "3.8% physical, 5% strike, 4% slash, 4.5% pierce, 4.5% magic, 5.4% fire, 5.8% lightning, 5.4% holy damage negation. Immunity 31, Robustness 20, Focus 26, Vitality 24, Poise 4. Weight 3.9."
      },
      {
        "heading": "Noble's Trousers",
        "text": "3.4% physical, 3.8% strike, 3.4% slash, 3.8% pierce, 7.6% magic, 7.7% fire, 7.4% lightning, 7.6% holy damage negation. Immunity 29, Robustness 15, Focus 47, Vitality 51, Poise 6. Weight 3.9."
      },
      {
        "heading": "Maliketh's Greaves",
        "text": "7.7% physical, 6.8% strike, 8% slash, 7.7% pierce, 6.2% magic, 6.5% fire, 5.4% lightning, 7.3% holy damage negation. Immunity 22, Robustness 35, Focus 15, Vitality 31, Poise 14. Weight 7.9."
      },
      {
        "heading": "Malenia's Greaves",
        "text": "7.1% physical, 5.4% strike, 7.4% slash, 6.5% pierce, 4.5% magic, 5.4% fire, 3.8% lightning, 6.2% holy damage negation. Immunity 31, Robustness 26, Focus 11, Vitality 11, Poise 11. Weight 5.7."
      },
      {
        "heading": "Veteran's Greaves",
        "text": "10.8% physical, 9.8% strike, 10.8% slash, 10.1% pierce, 7.7% magic, 8.1% fire, 7.3% lightning, 7.6% holy damage negation. Immunity 39, Robustness 56, Focus 29, Vitality 29, Poise 22. Weight 11.7."
      },
      {
        "heading": "Bloodhound Knight Greaves",
        "text": "7.1% physical, 6.5% strike, 8% slash, 7.7% pierce, 5.4% magic, 5.8% fire, 4% lightning, 5.8% holy damage negation. Immunity 20, Robustness 31, Focus 14, Vitality 14, Poise 11. Weight 6.6."
      },
      {
        "heading": "Commoner's Shoes",
        "text": "1.5% physical, 3% strike, 3% slash, 2.3% pierce, 7.1% magic, 6.5% fire, 6.8% lightning, 7.1% holy damage negation. Immunity 22, Robustness 14, Focus 39, Vitality 41, Poise 3. Weight 2."
      },
      {
        "heading": "Sorcerer Leggings",
        "text": "2.3% physical, 3% strike, 3% slash, 0.3% pierce, 7.3% magic, 7.1% fire, 6.8% lightning, 7.2% holy damage negation. Immunity 24, Robustness 7, Focus 39, Vitality 37, Poise 3. Weight 2."
      },
      {
        "heading": "Raging Wolf Greaves",
        "text": "7.5% physical, 6.6% strike, 7.5% slash, 7.2% pierce, 5.6% magic, 6.3% fire, 3.8% lightning, 5.2% holy damage negation. Immunity 19, Robustness 34, Focus 11, Vitality 11, Poise 12. Weight 6.3."
      },
      {
        "heading": "Land of Reeds Greaves",
        "text": "5% physical, 5.4% strike, 6.8% slash, 5.4% pierce, 5.8% magic, 6.5% fire, 6.8% lightning, 6.2% holy damage negation. Immunity 37, Robustness 31, Focus 31, Vitality 34, Poise 10. Weight 5.1."
      },
      {
        "heading": "White Reed Greaves",
        "text": "5.4% physical, 5.8% strike, 6.5% slash, 5% pierce, 6.2% magic, 6.2% fire, 6.8% lightning, 5.8% holy damage negation. Immunity 41, Robustness 26, Focus 34, Vitality 31, Poise 10. Weight 5.1."
      },
      {
        "heading": "Confessor Boots",
        "text": "4.5% physical, 5.8% strike, 4.5% slash, 5% pierce, 6.2% magic, 6.2% fire, 6.8% lightning, 5.4% holy damage negation. Immunity 37, Robustness 29, Focus 29, Vitality 31, Poise 9. Weight 4.8."
      },
      {
        "heading": "Prisoner Trousers",
        "text": "2.3% physical, 3% strike, 3% slash, 2.3% pierce, 6.8% magic, 6.5% fire, 6.5% lightning, 7.2% holy damage negation. Immunity 26, Robustness 14, Focus 39, Vitality 39, Poise 4. Weight 2."
      },
      {
        "heading": "Traveling Maiden Boots",
        "text": "3.1% physical, 3.5% strike, 3.5% slash, 2.4% pierce, 7.7% magic, 7.4% fire, 7.5% lightning, 7.7% holy damage negation. Immunity 29, Robustness 15, Focus 47, Vitality 51, Poise 6. Weight 2.9."
      },
      {
        "heading": "Finger Maiden Shoes",
        "text": "3% physical, 2.3% strike, 2.3% slash, 1.5% pierce, 7.6% magic, 7.2% fire, 7.3% lightning, 7.6% holy damage negation. Immunity 24, Robustness 13, Focus 39, Vitality 39, Poise 4. Weight 2.5."
      },
      {
        "heading": "Preceptor's Trousers",
        "text": "3.4% physical, 3.8% strike, 3.4% slash, 3.4% pierce, 8.3% magic, 7.6% fire, 7.3% lightning, 7.3% holy damage negation. Immunity 31, Robustness 15, Focus 51, Vitality 47, Poise 7. Weight 3.9."
      },
      {
        "heading": "Bandit Boots",
        "text": "4% physical, 4.5% strike, 5% slash, 5% pierce, 5.4% magic, 5.4% fire, 5.8% lightning, 5% holy damage negation. Immunity 34, Robustness 20, Focus 35, Vitality 35, Poise 8. Weight 4.4."
      },
      {
        "heading": "Eccentric's Breeches",
        "text": "6.5% physical, 4.5% strike, 6.2% slash, 6.5% pierce, 4.5% magic, 5% fire, 3% lightning, 4% holy damage negation. Immunity 15, Robustness 31, Focus 7, Vitality 7, Poise 10. Weight 5.1."
      },
      {
        "heading": "Fingerprint Greaves",
        "text": "7.7% physical, 6.8% strike, 6.8% slash, 6.8% pierce, 5.4% magic, 7.2% fire, 3.8% lightning, 5.4% holy damage negation. Immunity 20, Robustness 37, Focus 7, Vitality 14, Poise 14. Weight 6.6."
      },
      {
        "heading": "Consort's Trousers",
        "text": "3% physical, 2.3% strike, 2.3% slash, 3% pierce, 7.4% magic, 7.1% fire, 7.1% lightning, 7.3% holy damage negation. Immunity 29, Robustness 15, Focus 41, Vitality 39, Poise 4. Weight 2.5."
      },
      {
        "heading": "Omen Greaves",
        "text": "10.6% physical, 8.6% strike, 10.8% slash, 10.8% pierce, 7.4% magic, 8.3% fire, 8.5% lightning, 7.9% holy damage negation. Immunity 41, Robustness 39, Focus 35, Vitality 47, Poise 25. Weight 14.3."
      },
      {
        "heading": "Carian Knight Greaves",
        "text": "6.8% physical, 6.2% strike, 7.1% slash, 6.8% pierce, 7.1% magic, 6.8% fire, 5.4% lightning, 6.8% holy damage negation. Immunity 17, Robustness 29, Focus 13, Vitality 14, Poise 11. Weight 6.6."
      },
      {
        "heading": "Errant Sorcerer Boots",
        "text": "3% physical, 3% strike, 3.8% slash, 3% pierce, 7.6% magic, 7.3% fire, 7.2% lightning, 7.6% holy damage negation. Immunity 24, Robustness 15, Focus 47, Vitality 51, Poise 5. Weight 3.1."
      },
      {
        "heading": "Battlemage Legwraps",
        "text": "3% physical, 3.4% strike, 2.3% slash, 3% pierce, 7.4% magic, 6.8% fire, 7.1% lightning, 7.2% holy damage negation. Immunity 26, Robustness 14, Focus 39, Vitality 44, Poise 6. Weight 2.5."
      },
      {
        "heading": "Snow Witch Skirt",
        "text": "3% physical, 3.4% strike, 3.4% slash, 2.3% pierce, 7.4% magic, 7.4% fire, 7.3% lightning, 7.4% holy damage negation. Immunity 24, Robustness 20, Focus 44, Vitality 44, Poise 5. Weight 3.1."
      },
      {
        "heading": "Traveler's Boots",
        "text": "3.8% physical, 3.4% strike, 3% slash, 2.3% pierce, 7.7% magic, 7.3% fire, 7.4% lightning, 7.2% holy damage negation. Immunity 24, Robustness 15, Focus 47, Vitality 47, Poise 6. Weight 3.1."
      },
      {
        "heading": "Gold Waistwrap",
        "text": "4% physical, 3.8% strike, 3.8% slash, 3% pierce, 7.6% magic, 7.4% fire, 7.6% lightning, 8.1% holy damage negation. Immunity 35, Robustness 15, Focus 56, Vitality 56, Poise 7. Weight 4.4."
      },
      {
        "heading": "Zamor Legwraps",
        "text": "6.5% physical, 5% strike, 6.8% slash, 5.8% pierce, 4.5% magic, 4.5% fire, 3% lightning, 4% holy damage negation. Immunity 11, Robustness 37, Focus 0, Vitality 7, Poise 10. Weight 5.1."
      },
      {
        "heading": "Chain Leggings",
        "text": "6.8% physical, 5% strike, 7.4% slash, 6.8% pierce, 4% magic, 6.2% fire, 3.4% lightning, 4.5% holy damage negation. Immunity 16, Robustness 26, Focus 7, Vitality 11, Poise 10. Weight 5.5."
      },
      {
        "heading": "Mushroom Legs",
        "text": "3.4% physical, 4% strike, 1.5% slash, 3% pierce, 7.6% magic, 3% fire, 7.3% lightning, 7.4% holy damage negation. Immunity 63, Robustness 15, Focus 56, Vitality 47, Poise 3. Weight 3.1."
      },
      {
        "heading": "Leather Boots",
        "text": "4.5% physical, 5.4% strike, 4.5% slash, 5% pierce, 5.4% magic, 5.4% fire, 5.8% lightning, 5.8% holy damage negation. Immunity 37, Robustness 22, Focus 26, Vitality 31, Poise 7. Weight 4.4."
      },
      {
        "heading": "Knight Greaves",
        "text": "7.1% physical, 6.8% strike, 7.7% slash, 7.7% pierce, 6.2% magic, 6.2% fire, 5.4% lightning, 5% holy damage negation. Immunity 17, Robustness 31, Focus 11, Vitality 11, Poise 14. Weight 6.6."
      },
      {
        "heading": "Godrick Soldier Greaves",
        "text": "7.4% physical, 6.5% strike, 7.4% slash, 7.1% pierce, 5.8% magic, 6.2% fire, 4.5% lightning, 5.4% holy damage negation. Immunity 20, Robustness 34, Focus 14, Vitality 14, Poise 13. Weight 6.6."
      },
      {
        "heading": "Raya Lucarian Greaves",
        "text": "7.4% physical, 6.2% strike, 7.7% slash, 7.4% pierce, 6.2% magic, 6.2% fire, 4% lightning, 5% holy damage negation. Immunity 20, Robustness 34, Focus 14, Vitality 14, Poise 13. Weight 6.6."
      },
      {
        "heading": "Leyndell Soldier Greaves",
        "text": "7.4% physical, 6.8% strike, 7.1% slash, 7.4% pierce, 5.4% magic, 5.8% fire, 5% lightning, 5.4% holy damage negation. Immunity 20, Robustness 34, Focus 14, Vitality 14, Poise 13. Weight 6.6."
      },
      {
        "heading": "Radahn Soldier Greaves",
        "text": "7.7% physical, 6.2% strike, 7.1% slash, 6.8% pierce, 5.8% magic, 6.5% fire, 4.5% lightning, 5.4% holy damage negation. Immunity 20, Robustness 31, Focus 14, Vitality 15, Poise 13. Weight 6.6."
      },
      {
        "heading": "Mausoleum Greaves",
        "text": "7.4% physical, 6.2% strike, 7.7% slash, 7.1% pierce, 5.8% magic, 5.8% fire, 5% lightning, 5.8% holy damage negation. Immunity 20, Robustness 31, Focus 14, Vitality 13, Poise 14. Weight 6.6."
      },
      {
        "heading": "Haligtree Greaves",
        "text": "7.4% physical, 6.8% strike, 7.1% slash, 7.4% pierce, 5.4% magic, 5.8% fire, 4.5% lightning, 5.8% holy damage negation. Immunity 20, Robustness 34, Focus 14, Vitality 15, Poise 12. Weight 6.6."
      },
      {
        "heading": "Gelmir Knight Greaves",
        "text": "7.7% physical, 6.5% strike, 8% slash, 7.7% pierce, 6.2% magic, 7.1% fire, 5.8% lightning, 6.2% holy damage negation. Immunity 22, Robustness 34, Focus 15, Vitality 14, Poise 14. Weight 7.3."
      },
      {
        "heading": "Godrick Knight Greaves",
        "text": "7.7% physical, 6.8% strike, 8% slash, 7.4% pierce, 6.2% magic, 6.8% fire, 5.4% lightning, 6.2% holy damage negation. Immunity 22, Robustness 35, Focus 15, Vitality 15, Poise 14. Weight 7.3."
      },
      {
        "heading": "Cuckoo Knight Greaves",
        "text": "7.7% physical, 6.5% strike, 8.4% slash, 7.7% pierce, 7.1% magic, 6.8% fire, 5% lightning, 5.8% holy damage negation. Immunity 20, Robustness 35, Focus 15, Vitality 15, Poise 14. Weight 7.3."
      },
      {
        "heading": "Leyndell Knight Greaves",
        "text": "7.7% physical, 7.1% strike, 7.7% slash, 7.7% pierce, 5.8% magic, 6.5% fire, 5.8% lightning, 6.2% holy damage negation. Immunity 22, Robustness 35, Focus 15, Vitality 15, Poise 14. Weight 7.3."
      },
      {
        "heading": "Redmane Knight Greaves",
        "text": "7.7% physical, 6.5% strike, 7.7% slash, 7.1% pierce, 6.2% magic, 7.3% fire, 5.4% lightning, 6.2% holy damage negation. Immunity 22, Robustness 34, Focus 15, Vitality 15, Poise 14. Weight 7.3."
      },
      {
        "heading": "Mausoleum Knight Greaves",
        "text": "7.7% physical, 6.5% strike, 8.4% slash, 7.4% pierce, 6.2% magic, 6.5% fire, 5.8% lightning, 6.5% holy damage negation. Immunity 22, Robustness 34, Focus 15, Vitality 14, Poise 15. Weight 7.3."
      },
      {
        "heading": "Haligtree Knight Greaves",
        "text": "7.7% physical, 7.1% strike, 7.7% slash, 7.7% pierce, 5.8% magic, 6.5% fire, 5.4% lightning, 6.5% holy damage negation. Immunity 22, Robustness 35, Focus 15, Vitality 15, Poise 13. Weight 7.3."
      },
      {
        "heading": "Foot Soldier Greaves",
        "text": "5.4% physical, 5.8% strike, 5.4% slash, 5.4% pierce, 6.2% magic, 6.5% fire, 6.8% lightning, 6.2% holy damage negation. Immunity 39, Robustness 26, Focus 34, Vitality 34, Poise 10. Weight 5.1."
      },
      {
        "heading": "Omenkiller Boots",
        "text": "5% physical, 4.5% strike, 4% slash, 4% pierce, 5% magic, 5.4% fire, 6.5% lightning, 5.8% holy damage negation. Immunity 41, Robustness 17, Focus 29, Vitality 29, Poise 9. Weight 4.4."
      },
      {
        "heading": "Rotten Duelist Greaves",
        "text": "7.4% physical, 6.2% strike, 7.7% slash, 7.1% pierce, 6.2% magic, 6.5% fire, 5.8% lightning, 6.2% holy damage negation. Immunity 35, Robustness 35, Focus 15, Vitality 15, Poise 13. Weight 7.3."
      },
      {
        "heading": "Dryleaf Cuissardes",
        "text": "3% physical, 3.8% strike, 2.3% slash, 2.3% pierce, 8.1% magic, 6.8% fire, 7.2% lightning, 8.1% holy damage negation. Immunity 24, Robustness 15, Focus 47, Vitality 44, Poise 6. Weight 3.1."
      },
      {
        "heading": "Gaius's Greaves",
        "text": "7.4% physical, 7.1% strike, 9.2% slash, 8.8% pierce, 7.2% magic, 7.1% fire, 7.1% lightning, 7.1% holy damage negation. Immunity 29, Robustness 35, Focus 20, Vitality 20, Poise 17. Weight 8.9."
      },
      {
        "heading": "Oathseeker Knight Greaves",
        "text": "7.4% physical, 6.5% strike, 7.1% slash, 6.8% pierce, 6.2% magic, 5.8% fire, 4% lightning, 5.8% holy damage negation. Immunity 20, Robustness 35, Focus 15, Vitality 15, Poise 12. Weight 6.6."
      },
      {
        "heading": "Verdigris Greaves",
        "text": "11.9% physical, 10.2% strike, 11.4% slash, 10.8% pierce, 7.7% magic, 7.6% fire, 8.3% lightning, 7.6% holy damage negation. Immunity 56, Robustness 66, Focus 22, Vitality 31, Poise 28. Weight 16."
      },
      {
        "heading": "Iron Rivet Greaves",
        "text": "6.8% physical, 5.4% strike, 6.8% slash, 6.5% pierce, 5.8% magic, 5.8% fire, 5% lightning, 5.4% holy damage negation. Immunity 17, Robustness 37, Focus 11, Vitality 11, Poise 11. Weight 5.7."
      },
      {
        "heading": "Thiollier's Trousers",
        "text": "5% physical, 5% strike, 4% slash, 4% pierce, 4.5% magic, 5.4% fire, 6.2% lightning, 5.8% holy damage negation. Immunity 44, Robustness 17, Focus 39, Vitality 24, Poise 8. Weight 4.4."
      },
      {
        "heading": "High Priest Undergarments",
        "text": "3% physical, 3.4% strike, 2.3% slash, 1.5% pierce, 7.3% magic, 7.2% fire, 7.1% lightning, 7.2% holy damage negation. Immunity 26, Robustness 14, Focus 39, Vitality 47, Poise 6. Weight 2.5."
      },
      {
        "heading": "Soiled Loincloth",
        "text": "2.3% physical, 1.5% strike, 1.5% slash, 0.3% pierce, 7.1% magic, 5.8% fire, 6.5% lightning, 7.3% holy damage negation. Immunity 22, Robustness 8, Focus 62, Vitality 35, Poise 2. Weight 1.5."
      },
      {
        "heading": "Dancer's Trousers",
        "text": "2.3% physical, 1.5% strike, 3.4% slash, 1.5% pierce, 7.2% magic, 7.2% fire, 6.8% lightning, 7.1% holy damage negation. Immunity 24, Robustness 15, Focus 37, Vitality 39, Poise 3. Weight 2."
      },
      {
        "heading": "Greaves of Night",
        "text": "4% physical, 4% strike, 4.5% slash, 4.5% pierce, 7.1% magic, 5.4% fire, 5.4% lightning, 7.2% holy damage negation. Immunity 34, Robustness 20, Focus 29, Vitality 29, Poise 7. Weight 4.4."
      },
      {
        "heading": "Igon's Loincloth",
        "text": "4% physical, 4.5% strike, 4% slash, 4% pierce, 5% magic, 5.4% fire, 5.8% lightning, 5% holy damage negation. Immunity 34, Robustness 20, Focus 26, Vitality 26, Poise 8. Weight 3.9."
      },
      {
        "heading": "Ansbach's Boots",
        "text": "3% physical, 3.4% strike, 3.4% slash, 2.3% pierce, 7.4% magic, 7.4% fire, 7.2% lightning, 7.4% holy damage negation. Immunity 24, Robustness 16, Focus 47, Vitality 56, Poise 7. Weight 3.1."
      },
      {
        "heading": "Freyja's Greaves",
        "text": "7.7% physical, 5.4% strike, 6.5% slash, 6.5% pierce, 5% magic, 5.4% fire, 4.5% lightning, 5.4% holy damage negation. Immunity 16, Robustness 37, Focus 7, Vitality 15, Poise 11. Weight 5.7."
      },
      {
        "heading": "Greaves of Solitude",
        "text": "10.8% physical, 10.2% strike, 10.6% slash, 10.1% pierce, 7.6% magic, 8.3% fire, 7.7% lightning, 7.9% holy damage negation. Immunity 37, Robustness 39, Focus 61, Vitality 31, Poise 27. Weight 14.8."
      },
      {
        "heading": "Messmer Soldier Greaves",
        "text": "6.8% physical, 5.4% strike, 6.8% slash, 6.5% pierce, 4.5% magic, 5.4% fire, 3.8% lightning, 4.5% holy damage negation. Immunity 15, Robustness 29, Focus 11, Vitality 11, Poise 11. Weight 5.5."
      },
      {
        "heading": "Black Knight Greaves",
        "text": "8.4% physical, 7.1% strike, 8.4% slash, 9.2% pierce, 7.1% magic, 7.4% fire, 6.2% lightning, 6.5% holy damage negation. Immunity 26, Robustness 41, Focus 15, Vitality 15, Poise 17. Weight 8.5."
      },
      {
        "heading": "Rakshasa Greaves",
        "text": "7.4% physical, 6.8% strike, 8% slash, 7.7% pierce, 6.5% magic, 7.1% fire, 6.2% lightning, 6.5% holy damage negation. Immunity 22, Robustness 37, Focus 17, Vitality 17, Poise 16. Weight 7.9."
      },
      {
        "heading": "Fire Knight Greaves",
        "text": "7.4% physical, 5.8% strike, 6.8% slash, 6.2% pierce, 5.4% magic, 6.8% fire, 4% lightning, 5% holy damage negation. Immunity 17, Robustness 29, Focus 13, Vitality 15, Poise 11. Weight 5.7."
      },
      {
        "heading": "Leather Leg Wraps",
        "text": "4.5% physical, 5.4% strike, 5% slash, 4.5% pierce, 5% magic, 5.8% fire, 6.5% lightning, 5.8% holy damage negation. Immunity 35, Robustness 20, Focus 29, Vitality 26, Poise 8. Weight 4.4."
      },
      {
        "heading": "Death Knight Greaves",
        "text": "7.1% physical, 6.2% strike, 7.1% slash, 7.1% pierce, 5.4% magic, 5.4% fire, 7.1% lightning, 4.5% holy damage negation. Immunity 17, Robustness 29, Focus 11, Vitality 29, Poise 13. Weight 6.6."
      },
      {
        "heading": "Ascetic's Ankle Guards",
        "text": "3.4% physical, 0.3% strike, 3% slash, 1.5% pierce, 7.2% magic, 7.2% fire, 7.1% lightning, 7.6% holy damage negation. Immunity 26, Robustness 14, Focus 17, Vitality 39, Poise 6. Weight 2."
      },
      {
        "heading": "Messmer's Greaves",
        "text": "5.4% physical, 5.4% strike, 5% slash, 6.2% pierce, 5.8% magic, 7.1% fire, 6.8% lightning, 5.8% holy damage negation. Immunity 37, Robustness 26, Focus 35, Vitality 37, Poise 10. Weight 5.1."
      },
      {
        "heading": "Gravebird Anklets",
        "text": "3% physical, 3.4% strike, 3.4% slash, 2.3% pierce, 4% magic, 3.8% fire, 4.5% lightning, 4.5% holy damage negation. Immunity 26, Robustness 15, Focus 20, Vitality 17, Poise 5. Weight 2."
      },
      {
        "heading": "Common Soldier Greaves",
        "text": "7.1% physical, 5.4% strike, 6.8% slash, 6.8% pierce, 4% magic, 5% fire, 3.4% lightning, 4.5% holy damage negation. Immunity 15, Robustness 29, Focus 11, Vitality 11, Poise 11. Weight 5.5."
      },
      {
        "heading": "Horned Warrior Greaves",
        "text": "7.7% physical, 7.1% strike, 7.4% slash, 6.5% pierce, 5.8% magic, 5.8% fire, 5% lightning, 5% holy damage negation. Immunity 20, Robustness 37, Focus 11, Vitality 15, Poise 13. Weight 6.6."
      },
      {
        "heading": "Divine Bird Warrior Greaves",
        "text": "8% physical, 7.3% strike, 7.7% slash, 7.1% pierce, 6.5% magic, 6.5% fire, 5.4% lightning, 5.8% holy damage negation. Immunity 24, Robustness 35, Focus 14, Vitality 15, Poise 15. Weight 7.3."
      },
      {
        "heading": "Rellana's Greaves",
        "text": "7.7% physical, 6.8% strike, 8% slash, 7.4% pierce, 7.2% magic, 6.8% fire, 5.4% lightning, 6.2% holy damage negation. Immunity 22, Robustness 35, Focus 15, Vitality 15, Poise 14. Weight 7.3."
      },
      {
        "heading": "Young Lion's Greaves",
        "text": "9.6% physical, 8.3% strike, 9.6% slash, 9.6% pierce, 7.1% magic, 7.3% fire, 6.5% lightning, 7.3% holy damage negation. Immunity 31, Robustness 44, Focus 16, Vitality 22, Poise 19. Weight 9.3."
      },
      {
        "heading": "Shadow Militiaman Greaves",
        "text": "4% physical, 5% strike, 4.5% slash, 4.5% pierce, 5.8% magic, 6.2% fire, 6.2% lightning, 5% holy damage negation. Immunity 47, Robustness 20, Focus 26, Vitality 26, Poise 8. Weight 4.4."
      }
    ]
  }
];
