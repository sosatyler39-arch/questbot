import type { ArticlePage } from '../types.js';

// Talismans (accessories). Exact percentages/values supplied directly by
// the user, not scraped or from our own recall — same precision-sourcing
// rule as stats.ts, since a wrong number here is worse than no number.
// "(Shadow of the Erdtree)" marks DLC-exclusive talismans, per the user's
// [SOTE] tags.
const PLACEHOLDER = (slug: string) => `questbot://guide/talisman/${slug}`;

export const TALISMAN_PAGES: ArticlePage[] = [
  {
    title: 'Damage negation talismans',
    url: PLACEHOLDER('damage-negation'),
    sections: [
      { heading: 'Dragoncrest Shield Talisman', text: 'Raises physical damage negation by 10%.' },
      { heading: 'Dragoncrest Shield Talisman +1', text: 'Raises physical damage negation by 13%.' },
      { heading: 'Dragoncrest Shield Talisman +2', text: 'Raises physical damage negation by 17%.' },
      { heading: 'Dragoncrest Greatshield Talisman', text: 'Raises physical damage negation by 20%.' },
      { heading: 'Spelldrake Talisman', text: 'Raises magic damage negation by 13%.' },
      { heading: 'Spelldrake Talisman +1', text: 'Raises magic damage negation by 17%.' },
      { heading: 'Spelldrake Talisman +2', text: 'Raises magic damage negation by 20%.' },
      { heading: 'Spelldrake Talisman +3', text: 'Raises magic damage negation by 22%. Shadow of the Erdtree.' },
      { heading: 'Flamedrake Talisman', text: 'Raises fire damage negation by 13%.' },
      { heading: 'Flamedrake Talisman +1', text: 'Raises fire damage negation by 17%.' },
      { heading: 'Flamedrake Talisman +2', text: 'Raises fire damage negation by 20%.' },
      { heading: 'Flamedrake Talisman +3', text: 'Raises fire damage negation by 22%. Shadow of the Erdtree.' },
      { heading: 'Boltdrake Talisman', text: 'Raises lightning damage negation by 13%.' },
      { heading: 'Boltdrake Talisman +1', text: 'Raises lightning damage negation by 17%.' },
      { heading: 'Boltdrake Talisman +2', text: 'Raises lightning damage negation by 20%.' },
      { heading: 'Boltdrake Talisman +3', text: 'Raises lightning damage negation by 22%. Shadow of the Erdtree.' },
      { heading: 'Haligdrake Talisman', text: 'Raises holy damage negation by 13%.' },
      { heading: 'Haligdrake Talisman +1', text: 'Raises holy damage negation by 17%.' },
      { heading: 'Haligdrake Talisman +2', text: 'Raises holy damage negation by 20%.' },
      { heading: 'Golden Braid', text: 'Raises holy damage negation by 22%, the +3 equivalent of the Haligdrake line. Shadow of the Erdtree.' },
      { heading: 'Pearldrake Talisman', text: 'Raises elemental (magic, fire, lightning, holy) damage negation by 5%.' },
      { heading: 'Pearldrake Talisman +1', text: 'Raises elemental damage negation by 7%.' },
      { heading: 'Pearldrake Talisman +2', text: 'Raises elemental damage negation by 9%.' },
      { heading: 'Pearldrake Talisman +3', text: 'Raises elemental damage negation by 11%. Shadow of the Erdtree.' },
    ],
  },
  {
    title: 'Stat-boosting charms',
    url: PLACEHOLDER('stat-boosting-charms'),
    sections: [
      { heading: 'Immunizing Horn Charm', text: 'Raises Immunity by 90.' },
      { heading: 'Immunizing Horn Charm +1', text: 'Raises Immunity by 140.' },
      { heading: 'Immunizing Horn Charm +2', text: 'Raises Immunity by 180. Shadow of the Erdtree.' },
      { heading: 'Stalwart Horn Charm', text: 'Greatly raises Robustness by 90.' },
      { heading: 'Stalwart Horn Charm +1', text: 'Greatly raises Robustness by 140.' },
      { heading: 'Stalwart Horn Charm +2', text: 'Greatly raises Robustness by 180. Shadow of the Erdtree.' },
      { heading: 'Clarifying Horn Charm', text: 'Raises Focus by 140.' },
      { heading: 'Clarifying Horn Charm +1', text: 'Raises Focus by 190.' },
      { heading: 'Clarifying Horn Charm +2', text: 'Raises Focus by 230. Shadow of the Erdtree.' },
      { heading: 'Mottled Necklace', text: 'Raises Immunity, Robustness, and Focus by 40 each.' },
      { heading: 'Mottled Necklace +1', text: 'Raises Immunity, Robustness, and Focus by 60 each.' },
      { heading: 'Mottled Necklace +2', text: 'Raises Immunity, Robustness, and Focus by 100 each. Shadow of the Erdtree.' },
      { heading: "Prince of Death's Pustule", text: 'Raises Vitality by 90.' },
      { heading: "Prince of Death's Cyst", text: 'Greatly raises Vitality by 140.' },
    ],
  },
  {
    title: 'Status and resistance talismans',
    url: PLACEHOLDER('status-resistance'),
    sections: [
      {
        heading: 'Ailment Talisman',
        text: 'Boosts resistance stats by roughly 350 for a short time after a status effect (poison, bleed, frostbite, etc.) is applied to the wearer. Shadow of the Erdtree.',
      },
    ],
  },
  {
    title: 'Weapon-type talismans',
    url: PLACEHOLDER('weapon-type'),
    sections: [
      { heading: 'Dagger Talisman', text: 'Enhances critical damage by 17%, for use with backstabs and riposte-style attacks.' },
      { heading: 'Curved Sword Talisman', text: 'Enhances guard counter damage by 20%.' },
      { heading: 'Twinblade Talisman', text: 'Enhances the final hit of chain attacks by 45%.' },
      { heading: 'Axe Talisman', text: 'Enhances charged attacks by 10%.' },
      { heading: 'Hammer Talisman', text: 'Enhances attacks that reduce a blocking enemy’s stamina/guard by 40%.' },
      { heading: 'Spear Talisman', text: 'Enhances counterattacks unique to piercing weapons by 15%.' },
      { heading: 'Lance Talisman', text: 'Enhances attacks made while mounted on horseback by 15%.' },
      { heading: 'Claw Talisman', text: 'Enhances jump attacks by 15%.' },
      { heading: 'Two-Handed Sword Talisman', text: 'Enhances attacks made while two-handing a weapon by 15%. Shadow of the Erdtree.' },
    ],
  },
  {
    title: 'Guarding, movement, and ranged talismans',
    url: PLACEHOLDER('guarding-movement-ranged'),
    sections: [
      { heading: 'Greatshield Talisman', text: 'Reduces incoming stamina damage while guarding by 20%.' },
      {
        heading: 'Pearl Shield Talisman',
        text: 'Boosts all non-physical damage negation by 20% specifically while actively guarding. Shadow of the Erdtree.',
      },
      {
        heading: 'Retaliatory Crossed-Tree Talisman',
        text: 'Enhances attacks executed immediately after rolling or backstepping by 17%. Shadow of the Erdtree.',
      },
      {
        heading: 'Lacerating Crossed-Tree Talisman',
        text: 'Enhances dash attacks by 15% against enemies (PvE) and 7.5% against other players (PvP). Shadow of the Erdtree.',
      },
      { heading: "Arrow's Sting Talisman", text: 'Raises the attack power of arrows and bolts by 10%.' },
      { heading: "Arrow's Reach Talisman", text: 'Increases a bow’s effective range by 65%.' },
      {
        heading: "Arrow's Soaring Sting Talisman",
        text: 'Increases bow effective range by 50% and raises the attack power of arrows and bolts by 8%. Shadow of the Erdtree.',
      },
      {
        heading: 'Sharpshot Talisman',
        text: 'Boosts the attack power of precision-aimed shots (fully-drawn/zoomed shots) by 12%. Shadow of the Erdtree.',
      },
    ],
  },
  {
    title: 'Magic, skill, and FP talismans',
    url: PLACEHOLDER('magic-skills-fp'),
    sections: [
      { heading: 'Graven-School Talisman', text: 'Raises the potency of Sorceries by 4%.' },
      { heading: 'Graven-Mass Talisman', text: 'Greatly raises the potency of Sorceries by 8%.' },
      { heading: "Faithful's Canvas Talisman", text: 'Raises the potency of Incantations by 4%.' },
      { heading: "Flock's Canvas Talisman", text: 'Greatly raises the potency of Incantations by 8%.' },
      {
        heading: 'Primal Glintstone Blade',
        text: 'Spells consume 25% less FP, but the wearer’s maximum HP is reduced by 15% as a tradeoff.',
      },
      { heading: 'Moon of Nokstella', text: 'Increases the number of Memory Slots available for equipping spells by 2.' },
      { heading: "Old Lord's Talisman", text: 'Extends the duration of buff/effect spells by 30%.' },
      { heading: 'Radagon Icon', text: 'Shortens spell casting time, equivalent to +30 virtual Dexterity.' },
      {
        heading: 'Beloved Stardust',
        text: 'Shortens spell casting time to the greatest degree of any talisman (equivalent to +99 virtual Dexterity), but increases damage taken by 30% as a tradeoff. Shadow of the Erdtree.',
      },
      { heading: 'Roar Medallion', text: 'Enhances roar-type attacks by 15% and breath-type attacks by 10%.' },
      { heading: 'Companion Jar', text: 'Raises the potency of thrown Cracked Pots/Ritual Pots by 20%, and Hefty Cracked Pots by 10%.' },
      { heading: "Perfumer's Talisman", text: 'Raises the potency of Perfume items by 20%.' },
      { heading: 'Carian Filigreed Crest', text: 'Lowers the FP consumed by weapon Skills by 25%.' },
      { heading: 'Warrior Jar Shard', text: 'Boosts the attack power of weapon Skills by 10%.' },
      { heading: 'Shard of Alexander', text: 'Greatly boosts the attack power of weapon Skills by 15%.' },
      {
        heading: 'Godfrey Icon',
        text: 'Enhances charged spells and charged weapon Skills (skills held down before release) by 15%.',
      },
    ],
  },
  {
    title: 'Combat-style and situational talismans',
    url: PLACEHOLDER('combat-style-situational'),
    sections: [
      {
        heading: "Rellana's Cameo",
        text: 'Enhances attacks by 45% after the wearer maintains the same combat stance for 1 second. Shadow of the Erdtree.',
      },
      { heading: 'Shattered Stone Talisman', text: 'Raises the potency of kicking and stomping skills by 10%. Shadow of the Erdtree.' },
      { heading: 'Smithing Talisman', text: 'Enhances weapon-throwing attacks by 10%. Shadow of the Erdtree.' },
      { heading: 'Enraged Divine Beast Talisman', text: 'Raises the damage of storm-based attacks by 10%. Shadow of the Erdtree.' },
      { heading: 'Talisman of the Dread', text: 'Raises the potency of magma-based attacks by 15%. Shadow of the Erdtree.' },
      { heading: "Bull-Goat's Talisman", text: 'Raises Poise by 33%.' },
      { heading: 'Blue Dancer Charm', text: 'Raises physical attack power by up to 15%, more effective the lower the wearer’s current Equip Load is.' },
      {
        heading: 'Verdigris Discus',
        text: 'Reduces damage taken by 10% while carrying heavy equip load, and by 20% while overloaded. Shadow of the Erdtree.',
      },
      { heading: 'Magic Scorpion Charm', text: 'Raises magic damage dealt by 12%, but increases physical damage taken by 10%.' },
      { heading: 'Fire Scorpion Charm', text: 'Raises fire damage dealt by 12%, but increases physical damage taken by 10%.' },
      { heading: 'Lightning Scorpion Charm', text: 'Raises lightning damage dealt by 12%, but increases physical damage taken by 10%.' },
      { heading: 'Sacred Scorpion Charm', text: 'Raises holy damage dealt by 12%, but increases physical damage taken by 10%.' },
    ],
  },
  {
    title: 'Crucible talismans',
    url: PLACEHOLDER('crucible'),
    sections: [
      { heading: 'Crucible Scale Talisman', text: 'Reduces critical damage taken by 30%.' },
      {
        heading: 'Crucible Feather Talisman',
        text: 'Improves dodge rolling with roughly 6 additional invincibility frames, but increases damage taken by 30% as a tradeoff.',
      },
      { heading: 'Crucible Knot Talisman', text: 'Nullifies bonus headshot damage entirely and prevents the headshot stagger animation.' },
      {
        heading: 'Fine Crucible Feather Talisman',
        text: 'Improves backstep distance/speed, but increases damage taken by 15% as a tradeoff. Shadow of the Erdtree.',
      },
      {
        heading: 'Talisman of All Crucibles',
        text: 'Grants the combined effects of all other Crucible talismans at once, but increases damage taken by 45% as a tradeoff. Shadow of the Erdtree.',
      },
    ],
  },
  {
    title: 'HP-threshold and successive-hit talismans',
    url: PLACEHOLDER('hp-threshold-successive-hit'),
    sections: [
      { heading: 'Red-Feathered Branchsword', text: 'Raises attack power by 20% while the wearer’s HP is below 20%.' },
      { heading: 'Blue-Feathered Branchsword', text: 'Reduces damage taken by 50% while the wearer’s HP is below 20%.' },
      { heading: 'Ritual Sword Talisman', text: 'Raises attack power by 10% while the wearer’s HP is at maximum.' },
      { heading: 'Ritual Shield Talisman', text: 'Reduces damage taken by 30% while the wearer’s HP is at maximum.' },
      { heading: "Assassin's Crimson Dagger", text: 'Landing a critical hit restores 10% of maximum HP plus a flat 85 HP.' },
      { heading: "Assassin's Cerulean Dagger", text: 'Landing a critical hit restores 15 FP.' },
      {
        heading: 'Winged Sword Insignia',
        text: 'Raises attack power with each successive attack in a combo, stacking roughly 3% then 5% then 10%.',
      },
      {
        heading: 'Rotten Winged Sword Insignia',
        text: 'Greatly raises attack power with each successive attack in a combo, stacking roughly 6% then 8% then 13%.',
      },
      {
        heading: "Millicent's Prosthesis",
        text: 'Boosts Dexterity by 5, and raises attack power with successive attacks, stacking roughly 4% then 6% then 11%.',
      },
      { heading: 'Godskin Swaddling Cloth', text: 'Successive attacks restore 3% of maximum HP plus a flat 30 HP.' },
    ],
  },
  {
    title: 'Status-proximity and kill-triggered talismans',
    url: PLACEHOLDER('status-proximity-kill-triggered'),
    sections: [
      { heading: "Kindred of Rot's Exultation", text: 'Poison or Scarlet Rot buildup in the vicinity increases attack power by 20%.' },
      { heading: "Lord of Blood's Exultation", text: 'Blood loss (bleed) in the vicinity increases attack power by 20%.' },
      { heading: "Aged One's Exultation", text: 'Madness buildup in the vicinity increases attack power by 20%. Shadow of the Erdtree.' },
      { heading: "St. Trina's Smile", text: 'Sleep buildup in the vicinity increases attack power by 20%. Shadow of the Erdtree.' },
      { heading: 'Blade of Mercy', text: 'Raises attack power by 20% for 20 seconds after landing a critical hit. Shadow of the Erdtree.' },
      { heading: "Taker's Cameo", text: 'Restores 3% of maximum HP plus a flat 30 HP upon defeating an enemy.' },
      { heading: "Ancestral Spirit's Horn", text: 'Restores 3 FP upon defeating an enemy.' },
      {
        heading: 'Crusade Insignia',
        text: 'Raises attack power by 15% for 20 seconds after defeating an enemy. Shadow of the Erdtree.',
      },
      {
        heading: 'Dried Bouquet',
        text: 'Raises attack power by 20% for 30 seconds after a summoned Spirit Ash dies. Shadow of the Erdtree.',
      },
    ],
  },
  {
    title: 'Item and utility talismans',
    url: PLACEHOLDER('item-utility'),
    sections: [
      { heading: 'Gold Scarab', text: 'Increases Runes obtained from defeated enemies by 20%.' },
      { heading: 'Silver Scarab', text: 'Raises Item Discovery by 75.' },
      { heading: "Crepus's Vial", text: 'Eliminates the sound made by the wearer’s footsteps while moving.' },
      { heading: 'Concealing Veil', text: 'Conceals the wearer more effectively while crouching away from enemies.' },
      { heading: 'Longtail Cat Talisman', text: 'Renders the wearer immune to fall damage from survivable falls.' },
      { heading: "Furled Finger's Trick-Mirror", text: 'Makes the wearer appear as a Host of Fingers to other players.' },
      { heading: "Host's Trick-Mirror", text: 'Makes the wearer appear as a cooperator to other players.' },
      { heading: "Shabriri's Woe", text: 'Constantly attracts the aggression of nearby enemies to the wearer.' },
      { heading: "Daedicar's Woe", text: 'Increases damage taken by 100%.' },
      {
        heading: 'Sacrificial Twig',
        text: 'Prevents lost Runes from being dropped on death, but the twig itself is consumed/lost in the exchange.',
      },
      {
        heading: 'Entwining Umbilical Cord',
        text: 'Changes the demeanor of the wearer’s actions; not obtainable in the shipped game.',
      },
    ],
  },
  {
    title: 'HP, FP, Stamina, and Equip Load talismans',
    url: PLACEHOLDER('hp-fp-stamina-equip-load'),
    sections: [
      { heading: 'Crimson Amber Medallion', text: 'Raises maximum HP by 6%.' },
      { heading: 'Crimson Amber Medallion +1', text: 'Raises maximum HP by 7%.' },
      { heading: 'Crimson Amber Medallion +2', text: 'Raises maximum HP by 8%.' },
      { heading: 'Crimson Amber Medallion +3', text: 'Raises maximum HP by 10%. Shadow of the Erdtree.' },
      { heading: 'Crimson Seed Talisman', text: 'Boosts HP restored per use of the Flask of Crimson Tears by 20%.' },
      {
        heading: 'Crimson Seed Talisman +1',
        text: 'Boosts HP restored per use of the Flask of Crimson Tears by 30%. Shadow of the Erdtree.',
      },
      { heading: 'Blessed Dew Talisman', text: 'Slowly restores HP over time, at roughly 2 HP per second.' },
      { heading: 'Cerulean Amber Medallion', text: 'Raises maximum FP by 7%.' },
      { heading: 'Cerulean Amber Medallion +1', text: 'Raises maximum FP by 9%.' },
      { heading: 'Cerulean Amber Medallion +2', text: 'Raises maximum FP by 11%.' },
      { heading: 'Cerulean Amber Medallion +3', text: 'Raises maximum FP by 13%. Shadow of the Erdtree.' },
      { heading: 'Cerulean Seed Talisman', text: 'Boosts FP restored per use of the Flask of Cerulean Tears by 20%.' },
      {
        heading: 'Cerulean Seed Talisman +1',
        text: 'Boosts FP restored per use of the Flask of Cerulean Tears by 30%. Shadow of the Erdtree.',
      },
      {
        heading: 'Blessed Blue Dew Talisman',
        text: 'Slowly restores FP over time, at roughly 0.5 FP per second. Shadow of the Erdtree.',
      },
      {
        heading: "Talisman of Lord's Bestowal",
        text: 'Increases Poise by 54% for a period after drinking from a Flask of Tears. Shadow of the Erdtree.',
      },
      { heading: 'Viridian Amber Medallion', text: 'Raises maximum Stamina by 11%.' },
      { heading: 'Viridian Amber Medallion +1', text: 'Raises maximum Stamina by 13%.' },
      { heading: 'Viridian Amber Medallion +2', text: 'Raises maximum Stamina by 15%.' },
      { heading: 'Viridian Amber Medallion +3', text: 'Raises maximum Stamina by 17%. Shadow of the Erdtree.' },
      { heading: 'Green Turtle Talisman', text: 'Raises Stamina recovery speed by roughly 8 per second, about 17.7% faster.' },
      {
        heading: 'Two-Headed Turtle Talisman',
        text: 'Greatly raises Stamina recovery speed, roughly 22.5% faster. Shadow of the Erdtree.',
      },
      { heading: 'Arsenal Charm', text: 'Raises maximum Equip Load by 15%.' },
      { heading: 'Arsenal Charm +1', text: 'Raises maximum Equip Load by 17%.' },
      { heading: "Great-Jar's Arsenal", text: 'Vastly raises maximum Equip Load by 19%.' },
    ],
  },
  {
    title: 'Multi-stat seals',
    url: PLACEHOLDER('multi-stat-seals'),
    sections: [
      {
        heading: "Erdtree's Favor",
        text: 'Raises maximum HP by 3%, maximum Stamina by 7%, and maximum Equip Load by 5%.',
      },
      {
        heading: "Erdtree's Favor +1",
        text: 'Raises maximum HP by 3.5%, maximum Stamina by 8.5%, and maximum Equip Load by 6.5%.',
      },
      {
        heading: "Erdtree's Favor +2",
        text: 'Raises maximum HP by 4%, maximum Stamina by 10%, and maximum Equip Load by 8%.',
      },
      {
        heading: "Radagon's Scarseal",
        text: 'Raises Vigor, Endurance, Strength, and Dexterity by 3 each, but increases all damage taken by 10% as a tradeoff.',
      },
      {
        heading: "Radagon's Soreseal",
        text: 'Greatly raises Vigor, Endurance, Strength, and Dexterity by 5 each, but increases all damage taken by 15% as a tradeoff.',
      },
      {
        heading: "Marika's Scarseal",
        text: 'Raises Mind, Intelligence, Faith, and Arcane by 3 each, but increases all damage taken by 10% as a tradeoff.',
      },
      {
        heading: "Marika's Soreseal",
        text: 'Greatly raises Mind, Intelligence, Faith, and Arcane by 5 each, but increases all damage taken by 15% as a tradeoff.',
      },
    ],
  },
  {
    title: 'Heirloom talismans',
    url: PLACEHOLDER('heirlooms'),
    sections: [
      { heading: 'Starscourge Heirloom', text: 'Raises Strength by 5.' },
      { heading: 'Prosthesis-Wearer Heirloom', text: 'Raises Dexterity by 5.' },
      { heading: 'Stargazer Heirloom', text: 'Raises Intelligence by 5.' },
      { heading: 'Two Fingers Heirloom', text: 'Raises Faith by 5.' },
      { heading: 'Outer God Heirloom', text: 'Raises Arcane by 5.' },
    ],
  },
];
