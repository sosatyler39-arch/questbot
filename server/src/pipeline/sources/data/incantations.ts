import type { ArticlePage } from '../types.js';

// Incantations. Exact FP/Stamina/stat-requirement/slot values supplied
// directly by the user, not scraped or from our own recall — same
// precision-sourcing rule as stats.ts and talismans.ts, since a wrong
// number here is worse than no number. "FP X(Y)" in the source data means
// X FP to cast plus Y FP/sec while the spell is actively channeled
// (breath attacks, beams, etc.) — written out below, not abbreviated.
const PLACEHOLDER = (slug: string) => `questbot://guide/incantation/${slug}`;

export const INCANTATION_PAGES: ArticlePage[] = [
  {
    title: 'Dragon Communion incantations',
    url: PLACEHOLDER('dragon-communion'),
    sections: [
      {
        heading: "Agheel's Flame",
        text: "Spews Agheel's flame breath from above. Costs 36 FP to cast plus 6 FP/sec while channeled, takes 1 memory slot, requires 23 Faith and 15 Arcane, and costs 60 Stamina. A Damage incantation.",
      },
      {
        heading: 'Bayle\'s Flame Lightning',
        text: "Channels the dread dragon Bayle to strike with a flame-lightning-infused talon bone. Costs 43 FP, takes 2 memory slots, requires 53 Arcane (no Faith), and costs 35 Stamina. A Damage incantation.",
      },
      {
        heading: "Bayle's Tyranny",
        text: 'Channels Bayle to roar out a heatwave blast. Costs 46 FP, takes 2 memory slots, requires 49 Arcane (no Faith), and costs 72 Stamina. A Damage incantation.',
      },
      {
        heading: "Borealis's Mist",
        text: "Spews Borealis's icy breath from above. Costs 48 FP to cast plus 6 FP/sec while channeled, takes 1 memory slot, requires 23 Faith and 15 Arcane, and costs 60 Stamina. A Damage incantation.",
      },
      {
        heading: 'Dragonclaw',
        text: 'Channels a dragon to rend foes with dragon claws. Costs 24 FP, takes 1 memory slot, requires 17 Faith and 13 Arcane, and costs 35 Stamina. A Damage incantation.',
      },
      {
        heading: 'Dragonfire',
        text: 'Channels a dragon to spew flame breath. Costs 28 FP to cast plus 4 FP/sec while channeled, takes 1 memory slot, requires 15 Faith and 12 Arcane, and costs 40 Stamina. A Damage incantation.',
      },
      {
        heading: 'Dragonice',
        text: 'Channels a dragon to spew icy breath. Costs 36 FP to cast plus 4 FP/sec while channeled, takes 1 memory slot, requires 15 Faith and 12 Arcane, and costs 48 Stamina. A Damage incantation.',
      },
      {
        heading: 'Dragonmaw',
        text: 'Channels a dragon to bite foes directly in front of the caster. Costs 34 FP, takes 1 memory slot, requires 24 Faith and 16 Arcane, and costs 50 Stamina. A Damage incantation.',
      },
      {
        heading: "Ekzykes's Decay",
        text: "Spews Ekzykes's scarlet rot breath from above. Costs 48 FP to cast plus 6 FP/sec while channeled, takes 1 memory slot, requires 23 Faith and 15 Arcane, and costs 60 Stamina. A Damage incantation.",
      },
      {
        heading: 'Ghostflame Breath',
        text: 'Channels a dragon to spew ghostflame breath. Costs 36 FP, takes 1 memory slot, requires 23 Faith and 15 Arcane, and costs 60 Stamina. A Damage incantation.',
      },
      {
        heading: 'Glintstone Breath',
        text: 'Channels a dragon to spew magic breath. Costs 28 FP to cast plus 4 FP/sec while channeled, takes 1 memory slot, requires 15 Faith and 12 Arcane, and costs 40 Stamina. A Damage incantation.',
      },
      {
        heading: "Greyoll's Roar",
        text: 'Emits the roar of Elder Dragon Greyoll. Costs 50 FP, takes 2 memory slots, requires 28 Faith and 17 Arcane, and costs 72 Stamina. A Damage incantation.',
      },
      {
        heading: 'Magma Breath',
        text: 'Channels a wyrm to spew magma breath. Costs 30 FP, takes 1 memory slot, requires 14 Faith and 10 Arcane, and costs 40 Stamina. A Damage incantation.',
      },
      {
        heading: "Placidusax's Ruin",
        text: "Spews Dragonlord Placidusax's golden breath. Costs 62 FP, takes 3 memory slots, requires 36 Faith (no Arcane), and costs 75 Stamina. A Damage incantation.",
      },
      {
        heading: 'Rotten Breath',
        text: 'Channels a dragon to spew scarlet rot breath. Costs 36 FP to cast plus 4 FP/sec while channeled, takes 1 memory slot, requires 15 Faith and 12 Arcane, and costs 48 Stamina. A Damage incantation.',
      },
      {
        heading: "Smarag's Glintstone Breath",
        text: "Spews Glintstone Dragon Smarag's magic breath from above. Costs 36 FP to cast plus 6 FP/sec while channeled, takes 1 memory slot, requires 23 Faith and 15 Arcane, and costs 60 Stamina. A Damage incantation.",
      },
      {
        heading: "Theodorix's Magma",
        text: "Spews Theodorix's magma breath from above. Costs 45 FP, takes 1 memory slot, requires 21 Faith and 14 Arcane, and costs 60 Stamina. A Damage incantation.",
      },
    ],
  },
  {
    title: 'Dragon Cult incantations',
    url: PLACEHOLDER('dragon-cult'),
    sections: [
      {
        heading: "Ancient Dragons' Lightning Spear",
        text: 'Stabs with a red lightning spear from above. Costs 25 FP, takes 1 memory slot, requires 32 Faith, and costs 29 Stamina. A Damage incantation.',
      },
      {
        heading: "Ancient Dragons' Lightning Strike",
        text: 'Summons red lightning that spreads outward from its point of impact. Costs 36 FP, takes 1 memory slot, requires 26 Faith, and costs 31 Stamina. A Damage incantation.',
      },
      {
        heading: 'Death Lightning',
        text: 'Strikes the surroundings with a storm of death lightning. Costs 28 FP, takes 2 memory slots, requires 47 Faith, and costs 32 Stamina. A Damage incantation.',
      },
      {
        heading: 'Dragonbolt Blessing',
        text: "Bolsters the caster's body with lightning. Costs 20 FP, takes 1 memory slot, requires 21 Faith, and costs 20 Stamina. A Buff incantation.",
      },
      {
        heading: 'Dragonbolt of Florissax',
        text: 'Calls down red lightning to bolster the caster and nearby allies. Costs 35 FP, takes 1 memory slot, requires 52 Faith, and costs 20 Stamina. A Buff incantation.',
      },
      {
        heading: 'Electrify Armament',
        text: "Enchants the caster's right-hand armament with lightning damage. Costs 27 FP, takes 1 memory slot, requires 15 Faith, and costs 10 Stamina. A Buff incantation.",
      },
      {
        heading: 'Electrocharge',
        text: "Calls down lightning to charge the caster's body with electricity. Costs 26 FP, takes 1 memory slot, requires 30 Faith, and costs 28 Stamina. A Damage incantation.",
      },
      {
        heading: "Fortissax's Lightning Spear",
        text: 'Stabs from above with two red lightning spears in tandem. Costs 35 FP, takes 1 memory slot, requires 46 Faith, and costs 42 Stamina. A Damage incantation.',
      },
      {
        heading: 'Frozen Lightning Spear',
        text: 'Stabs with an ice lightning spear from above. Costs 29 FP, takes 1 memory slot, requires 34 Faith, and costs 39 Stamina. A Damage incantation.',
      },
      {
        heading: 'Honed Bolt',
        text: 'Strikes the target with a lightning bolt from above. Costs 12 FP, takes 1 memory slot, requires 24 Faith, and costs 29 Stamina. A Damage incantation.',
      },
      {
        heading: "Knight's Lightning Spear",
        text: 'Hurls a lightning spear while firing additional spears from ancient dragon crests. Costs 29 FP, takes 1 memory slot, requires 36 Faith, and costs 31 Stamina. A Damage incantation.',
      },
      {
        heading: "Lansseax's Glaive",
        text: 'Sweeps from above with a red lightning glaive. Costs 22 FP, takes 1 memory slot, requires 40 Faith, and costs 45 Stamina. A Damage incantation.',
      },
      {
        heading: 'Lightning Spear',
        text: 'Hurls a lightning spear in front of the caster. Costs 18 FP, takes 1 memory slot, requires 17 Faith, and costs 28 Stamina. A Damage incantation.',
      },
      {
        heading: 'Lightning Strike',
        text: 'Summons a lightning bolt that spreads out from its point of impact. Costs 19 FP, takes 1 memory slot, requires 28 Faith, and costs 32 Stamina. A Damage incantation.',
      },
      {
        heading: "Vyke's Dragonbolt",
        text: "Bolsters the caster's right-hand armament and body with red lightning. Costs 35 FP, takes 1 memory slot, requires 23 Faith, and costs 20 Stamina. A Buff incantation.",
      },
    ],
  },
  {
    title: 'Erdtree incantations',
    url: PLACEHOLDER('erdtree'),
    sections: [
      {
        heading: 'Aspects of the Crucible: Bloom',
        text: "Creates a miranda flower on the caster's chest to summon a rain of light. Costs 23 FP, takes 1 memory slot, requires 27 Faith, and costs 20 Stamina. A Damage incantation.",
      },
      {
        heading: 'Aspects of the Crucible: Breath',
        text: 'Creates a throat pouch to spew fire while walking. Costs 28 FP to cast plus 4 FP/sec while channeled, takes 1 memory slot, requires 27 Faith, and costs 40 Stamina. A Damage incantation.',
      },
      {
        heading: 'Aspects of the Crucible: Horns',
        text: 'Creates a shoulder horn to gore foes from a low stance. Costs 18 FP, takes 1 memory slot, requires 27 Faith, and costs 42 Stamina. A Damage incantation.',
      },
      {
        heading: 'Aspects of the Crucible: Tail',
        text: 'Creates a supple tail to sweep the area in front of the caster. Costs 20 FP, takes 1 memory slot, requires 27 Faith, and costs 38 Stamina. A Damage incantation.',
      },
      {
        heading: 'Aspects of the Crucible: Thorns',
        text: "Creates a mass of bristling thorns on the caster's back to scour the surrounding area. Costs 14 FP, takes 1 memory slot, requires 27 Faith, and costs 29 Stamina. A Damage incantation.",
      },
      {
        heading: 'Barrier of Gold',
        text: 'Greatly increases magic damage negation for the caster and nearby allies. Costs 30 FP, takes 1 memory slot, requires 24 Faith, and costs 13 Stamina. A Buff incantation.',
      },
      {
        heading: 'Black Blade',
        text: 'A black blade spinning slash that emits a wave of light. Costs 26 FP, takes 2 memory slots, requires 46 Faith, and costs 51 Stamina. A Damage incantation.',
      },
      {
        heading: 'Blessing of the Erdtree',
        text: 'Grants a greater blessing to the caster and nearby allies. Costs 60 FP, takes 1 memory slot, requires 38 Faith, and costs 50 Stamina. A Buff incantation.',
      },
      {
        heading: "Blessing's Boon",
        text: 'Grants a blessing to the caster and nearby allies. Costs 30 FP, takes 1 memory slot, requires 24 Faith, and costs 30 Stamina. A Buff incantation.',
      },
      {
        heading: 'Elden Stars',
        text: 'Creates a stream of golden shooting stars that assail the area. Costs 41 FP, takes 2 memory slots, requires 50 Faith, and costs 48 Stamina. A Damage incantation.',
      },
      {
        heading: 'Erdtree Heal',
        text: 'Vastly heals HP for the caster and nearby allies. Costs 65 FP, takes 1 memory slot, requires 42 Faith, and costs 50 Stamina. A Healing incantation.',
      },
      {
        heading: 'Golden Lightning Fortification',
        text: 'Greatly increases lightning damage negation for the caster and allies. Costs 30 FP, takes 1 memory slot, requires 24 Faith, and costs 20 Stamina. A Buff incantation.',
      },
      {
        heading: 'Golden Vow',
        text: 'Increases attack power and defense for the caster and allies. Costs 47 FP, takes 1 memory slot, requires 25 Faith, and costs 50 Stamina. A Buff incantation.',
      },
      {
        heading: 'Heal from Afar',
        text: 'Greatly heals HP for distant allies the spell reaches. Costs 45 FP, takes 1 memory slot, requires 18 Faith, and costs 40 Stamina. A Healing incantation.',
      },
      {
        heading: 'Land of Shadow',
        text: 'Fires a hail of golden projectiles toward foes. Costs 40 FP, takes 1 memory slot, requires 58 Faith, and costs 48 Stamina. A Damage incantation.',
      },
      {
        heading: 'Minor Erdtree',
        text: 'Continuously heals allies within its area. Costs 30 FP, takes 2 memory slots, requires 70 Faith, and costs 30 Stamina. A Healing incantation.',
      },
      {
        heading: 'Protection of the Erdtree',
        text: 'Increases affinity (elemental) damage negation for the caster and allies. Costs 30 FP, takes 1 memory slot, requires 35 Faith, and costs 50 Stamina. A Buff incantation.',
      },
      {
        heading: 'Wrath from Afar',
        text: 'Fires a golden shockwave that knocks back foes. Costs 18 FP, takes 1 memory slot, requires 34 Faith, and costs 24 Stamina. A Damage incantation.',
      },
      {
        heading: 'Wrath of Gold',
        text: 'Produces a golden shockwave that knocks back foes. Costs 40 FP, takes 1 memory slot, requires 32 Faith, and costs 44 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Two Fingers incantations',
    url: PLACEHOLDER('two-fingers'),
    sections: [
      {
        heading: "Assassin's Approach",
        text: "Silences the caster's footsteps and reduces fall damage and fall sound. Costs 15 FP, takes 1 memory slot, requires 10 Faith, and costs 13 Stamina. A Buff incantation.",
      },
      {
        heading: 'Cure Poison',
        text: 'Cures the poison ailment and reduces poison buildup. Costs 7 FP, takes 1 memory slot, requires 10 Faith, and costs 10 Stamina. A Healing incantation.',
      },
      {
        heading: 'Darkness',
        text: 'Creates an area of darkness that conceals the caster. Costs 24 FP, takes 1 memory slot, requires 18 Faith, and costs 24 Stamina. A Buff incantation.',
      },
      {
        heading: 'Divine Fortification',
        text: 'Increases holy damage negation. Costs 20 FP, takes 1 memory slot, requires 10 Faith, and costs 13 Stamina. A Buff incantation.',
      },
      {
        heading: 'Flame Fortification',
        text: 'Increases fire damage negation. Costs 20 FP, takes 1 memory slot, requires 10 Faith, and costs 13 Stamina. A Buff incantation.',
      },
      {
        heading: 'Great Heal',
        text: 'Greatly heals HP for the caster and nearby allies. Costs 45 FP, takes 1 memory slot, requires 15 Faith, and costs 40 Stamina. A Healing incantation.',
      },
      {
        heading: 'Heal',
        text: 'Heals HP for the caster and nearby allies. Costs 32 FP, takes 1 memory slot, requires 12 Faith, and costs 35 Stamina. A Healing incantation.',
      },
      {
        heading: 'Lightning Fortification',
        text: 'Increases lightning damage negation. Costs 20 FP, takes 1 memory slot, requires 10 Faith, and costs 13 Stamina. A Buff incantation.',
      },
      {
        heading: "Lord's Aid",
        text: 'Alleviates poison, blood loss, and sleep buildup for the caster and allies. Costs 12 FP, takes 1 memory slot, requires 12 Faith, and costs 10 Stamina. A Healing incantation.',
      },
      {
        heading: "Lord's Divine Fortification",
        text: 'Greatly increases holy damage negation, including for allies. Costs 30 FP, takes 1 memory slot, requires 27 Faith, and costs 20 Stamina. A Buff incantation.',
      },
      {
        heading: "Lord's Heal",
        text: 'Massively heals HP for the caster and nearby allies. Costs 55 FP, takes 1 memory slot, requires 20 Faith, and costs 45 Stamina. A Healing incantation.',
      },
      {
        heading: 'Magic Fortification',
        text: 'Increases magic damage negation. Costs 20 FP, takes 1 memory slot, requires 10 Faith, and costs 13 Stamina. A Buff incantation.',
      },
      {
        heading: 'Rejection',
        text: 'Produces a shockwave that pushes away nearby foes. Costs 9 FP, takes 1 memory slot, requires 12 Faith, and costs 24 Stamina. A Utility incantation.',
      },
      {
        heading: 'Shadow Bait',
        text: 'Creates a shadow that lures the aggression of human-build foes. Costs 15 FP, takes 1 memory slot, requires 13 Faith, and costs 14 Stamina. A Utility incantation.',
      },
      {
        heading: 'Urgent Heal',
        text: 'Heals a small amount of HP. Costs 16 FP, takes 1 memory slot, requires 8 Faith, and costs 30 Stamina. A Healing incantation.',
      },
    ],
  },
  {
    title: 'Bestial incantations',
    url: PLACEHOLDER('bestial'),
    sections: [
      {
        heading: 'Beast Claw',
        text: 'Creates claws that tear through the land. Costs 10 FP, takes 1 memory slot, requires 8 Faith, and costs 27 Stamina. A Damage incantation.',
      },
      {
        heading: 'Bestial Constitution',
        text: 'Alleviates blood loss and frostbite buildup. Costs 10 FP, takes 1 memory slot, requires 9 Faith, and costs 10 Stamina. A Healing incantation.',
      },
      {
        heading: 'Bestial Sling',
        text: 'Swiftly flings numerous sharp rock shards. Costs 7 FP, takes 1 memory slot, requires 10 Faith, and costs 19 Stamina. A Damage incantation.',
      },
      {
        heading: 'Bestial Vitality',
        text: 'Heals HP over a period of time. Costs 18 FP, takes 1 memory slot, requires 12 Faith, and costs 10 Stamina. A Buff incantation.',
      },
      {
        heading: "Gurranq's Beast Claw",
        text: 'Creates beast claws to rend the surroundings with shockwaves. Costs 21 FP, takes 1 memory slot, requires 15 Faith, and costs 42 Stamina. A Damage incantation.',
      },
      {
        heading: 'Stone of Gurranq',
        text: 'Hurls a boulder in front of the caster. Costs 15 FP, takes 1 memory slot, requires 13 Faith, and costs 37 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Black Flame incantations',
    url: PLACEHOLDER('black-flame'),
    sections: [
      {
        heading: 'Black Flame',
        text: 'Throws a ball of raging black fire. Costs 18 FP, takes 1 memory slot, requires 20 Faith, and costs 25 Stamina. A Damage incantation.',
      },
      {
        heading: 'Black Flame Blade',
        text: "Enchants the caster's right-hand armament with black flame. Costs 15 FP, takes 1 memory slot, requires 17 Faith, and costs 10 Stamina. A Buff incantation.",
      },
      {
        heading: 'Black Flame Ritual',
        text: 'Summons a circle of black flame pillars around the caster. Costs 30 FP, takes 1 memory slot, requires 42 Faith, and costs 39 Stamina. A Damage incantation.',
      },
      {
        heading: "Black Flame's Protection",
        text: 'Increases physical damage negation. Costs 30 FP, takes 1 memory slot, requires 30 Faith, and costs 13 Stamina. A Buff incantation.',
      },
      {
        heading: 'Noble Presence',
        text: 'Thrusts out the belly with gusto to unleash a repelling shockwave. Costs 20 FP, takes 1 memory slot, requires 26 Faith, and costs 35 Stamina. A Damage incantation.',
      },
      {
        heading: 'Scouring Black Flame',
        text: 'Sweeps the area in front of the caster with black flame. Costs 21 FP, takes 1 memory slot, requires 28 Faith, and costs 29 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Blood Oath incantations',
    url: PLACEHOLDER('blood-oath'),
    sections: [
      {
        heading: 'Bloodboon',
        text: 'Scatters bloodflame in front of the caster to set the area aflame. Costs 13 FP, takes 1 memory slot, requires 14 Faith and 17 Arcane, and costs 34 Stamina. A Damage incantation.',
      },
      {
        heading: 'Bloodflame Blade',
        text: "Enchants the caster's right-hand armament with bloodflame. Costs 20 FP, takes 1 memory slot, requires 12 Faith and 10 Arcane, and costs 10 Stamina. A Buff incantation.",
      },
      {
        heading: 'Bloodflame Talons',
        text: 'Creates bloodflame lacerations that then explode. Costs 12 FP, takes 1 memory slot, requires 13 Faith and 15 Arcane, and costs 21 Stamina. A Buff incantation.',
      },
      {
        heading: 'Furious Blade of Ansbach',
        text: 'Cleaves through enemies with a bloodflame blade summoned from the side of the hand. Costs 18 FP, takes 1 memory slot, requires 19 Faith and 27 Arcane, and costs 21 Stamina. A Damage incantation.',
      },
      {
        heading: 'Swarm of Flies',
        text: 'Releases a swarm of bloodflies in front of the caster. Costs 14 FP, takes 1 memory slot, requires 11 Faith and 16 Arcane, and costs 24 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: "Giants' Flame incantations",
    url: PLACEHOLDER('giants-flame'),
    sections: [
      {
        heading: 'Burn, O Flame!',
        text: 'Raises a series of flame pillars around the caster. Costs 26 FP, takes 1 memory slot, requires 27 Faith, and costs 36 Stamina. A Damage incantation.',
      },
      {
        heading: 'Catch Flame',
        text: 'Momentarily sparks flame from the hand. Costs 10 FP, takes 1 memory slot, requires 8 Faith, and costs 17 Stamina. A Damage incantation.',
      },
      {
        heading: "Fire's Deadly Sin",
        text: 'Sets the area and the caster ablaze with raging flames. Costs 26 FP, takes 1 memory slot, requires 19 Faith, and costs 28 Stamina. A Damage incantation.',
      },
      {
        heading: 'Flame Sling',
        text: 'Throws balls of raging fire. Costs 11 FP, takes 1 memory slot, requires 10 Faith, and costs 22 Stamina. A Damage incantation.',
      },
      {
        heading: 'Flame, of the Fell God',
        text: 'Summons a raging fireball that explodes and sets the area ablaze. Costs 34 FP, takes 2 memory slots, requires 41 Faith, and costs 42 Stamina. A Damage incantation.',
      },
      {
        heading: 'Flame, Cleanse Me',
        text: 'Alleviates buildup and cures both poison and scarlet rot. Costs 14 FP, takes 1 memory slot, requires 12 Faith, and costs 10 Stamina. A Healing incantation.',
      },
      {
        heading: 'Flame, Fall Upon Them',
        text: 'Hurls several balls of fire at once. Costs 16 FP, takes 1 memory slot, requires 28 Faith, and costs 10 Stamina. A Damage incantation.',
      },
      {
        heading: 'Flame, Grant Me Strength',
        text: 'Raises physical and fire-affinity attack power. Costs 28 FP, takes 1 memory slot, requires 15 Faith, and costs 16 Stamina. A Buff incantation.',
      },
      {
        heading: 'Flame, Protect Me',
        text: 'Greatly increases fire damage negation. Costs 30 FP, takes 1 memory slot, requires 24 Faith, and costs 20 Stamina. A Buff incantation.',
      },
      {
        heading: 'Giantsflame Take Thee',
        text: 'Hurls a massive ball of raging fire. Costs 30 FP, takes 2 memory slots, requires 30 Faith, and costs 34 Stamina. A Damage incantation.',
      },
      {
        heading: 'O, Flame!',
        text: 'Momentarily sparks a roaring flame from the hand. Costs 16 FP, takes 1 memory slot, requires 16 Faith, and costs 24 Stamina. A Damage incantation.',
      },
      {
        heading: 'Surge, O Flame!',
        text: 'Incinerates the area in front of the caster with a stream of fire. Costs 1 FP to cast plus 1 FP/sec while channeled, takes 1 memory slot, requires 9 Faith, and costs 2 Stamina. A Damage incantation.',
      },
      {
        heading: 'Whirl, O Flame!',
        text: 'Sweeps the area in front of the caster with a stream of fire. Costs 19 FP, takes 1 memory slot, requires 13 Faith, and costs 26 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: "Messmer's Flame incantations",
    url: PLACEHOLDER('messmers-flame'),
    sections: [
      {
        heading: 'Fire Serpent',
        text: 'Launches a threaded, serpentine flame. Costs 11 FP, takes 1 memory slot, requires 16 Faith, and costs 22 Stamina. A Damage incantation.',
      },
      {
        heading: "Messmer's Orb",
        text: "Shapes Messmer's flame into a giant orb that soars toward the target. Costs 31 FP, takes 2 memory slots, requires 60 Faith, and costs 43 Stamina. A Damage incantation.",
      },
      {
        heading: 'Rain of Fire',
        text: 'Rains fire over a short duration. Costs 27 FP, takes 1 memory slot, requires 52 Faith, and costs 31 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Frenzied Flame incantations',
    url: PLACEHOLDER('frenzied-flame'),
    sections: [
      {
        heading: 'Frenzied Burst',
        text: 'Emits a concentrated blast of the frenzy flame\'s yellow fire from the eyes. Costs 24 FP, takes 1 memory slot, requires 22 Faith, and costs 33 Stamina. A Damage incantation.',
      },
      {
        heading: 'Howl of Shabriri',
        text: 'A shriek that builds up madness in nearby foes. Costs 21 FP, takes 1 memory slot, requires 33 Faith, and costs 38 Stamina. A Damage incantation.',
      },
      {
        heading: 'Inescapable Frenzy',
        text: 'Latches onto foes to spread madness. Costs 32 FP, takes 1 memory slot, requires 21 Faith, and costs 31 Stamina. A Damage incantation.',
      },
      {
        heading: "Midra's Flame of Frenzy",
        text: "Summons the Lord of Frenzied Flame's head to spew frenzied flame. Costs 22 FP, takes 2 memory slots, requires 41 Faith, and costs 20 Stamina. A Damage incantation.",
      },
      {
        heading: 'The Flame of Frenzy',
        text: 'Emits a burst of the frenzy flame\'s yellow fire from the eyes. Costs 16 FP, takes 1 memory slot, requires 16 Faith, and costs 30 Stamina. A Damage incantation.',
      },
      {
        heading: 'Unendurable Frenzy',
        text: 'Emits a violent burst of the frenzy flame\'s yellow fire from the eyes. Costs 22 FP to cast plus 6 FP/sec while channeled, takes 1 memory slot, requires 31 Faith, and costs 40 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Servants of Rot incantations',
    url: PLACEHOLDER('servants-of-rot'),
    sections: [
      {
        heading: 'Pest Threads',
        text: 'Launches countless sticky threads in front of the caster. Costs 19 FP, takes 1 memory slot, requires 11 Faith, and costs 29 Stamina. A Damage incantation.',
      },
      {
        heading: 'Pest-Thread Spears',
        text: 'Secretes sticky threads and twists them into two forward-flying spears. Costs 28 FP, takes 1 memory slot, requires 26 Faith, and costs 29 Stamina. A Damage incantation.',
      },
      {
        heading: 'Poison Armament',
        text: "Enchants the caster's right-hand armament with poison. Costs 15 FP, takes 1 memory slot, requires 10 Faith, and costs 10 Stamina. A Buff incantation.",
      },
      {
        heading: 'Poison Mist',
        text: 'Releases poison mist in front of the caster. Costs 18 FP, takes 1 memory slot, requires 12 Faith, and costs 10 Stamina. A Damage incantation.',
      },
      {
        heading: 'Rotten Butterflies',
        text: 'Summons countless butterflies that scatter rot. Costs 48 FP, takes 1 memory slot, requires 33 Faith, and costs 50 Stamina. A Damage incantation.',
      },
      {
        heading: 'Scarlet Aeonia',
        text: 'Creates a giant flower that explodes with scarlet rot. Costs 48 FP, takes 3 memory slots, requires 35 Faith, and costs 66 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Spiral Tower incantations',
    url: PLACEHOLDER('spiral-tower'),
    sections: [
      {
        heading: 'Divine Beast Tornado',
        text: 'Summons a storm that launches a tornado forward. Costs 24 FP, takes 1 memory slot, requires 28 Faith, and costs 20 Stamina. A Damage incantation.',
      },
      {
        heading: 'Divine Bird Feathers',
        text: 'Spreads the arms like wings and releases a flurry of feathers. Costs 3 FP, takes 1 memory slot, requires 24 Faith, and costs 3 Stamina. A Damage incantation.',
      },
      {
        heading: 'Giant Golden Arc',
        text: 'Releases a giant golden arc with a swing of the arm. Costs 24 FP, takes 1 memory slot, requires 34 Faith, and costs 20 Stamina. A Damage incantation.',
      },
      {
        heading: 'Golden Arcs',
        text: 'Releases a procession of golden arcs with a swing of the arm. Costs 12 FP, takes 1 memory slot, requires 22 Faith, and costs 20 Stamina. A Damage incantation.',
      },
      {
        heading: 'Roar of Rugalea',
        text: 'Channels the great red bear to emit a furious roar. Costs 17 FP, takes 1 memory slot, requires 14 Faith, and costs 35 Stamina. A Damage incantation.',
      },
      {
        heading: 'Spira',
        text: "Summons a spiral of light that erupts at the enemy's feet. Costs 10 FP, takes 2 memory slots, requires 48 Faith, and costs 14 Stamina. A Damage incantation.",
      },
      {
        heading: 'Watchful Spirit',
        text: "Summons a guardian spirit above the caster's head. Costs 12 FP, takes 1 memory slot, requires 26 Faith, and costs 20 Stamina. A Damage incantation.",
      },
    ],
  },
  {
    title: 'Miquellan incantations',
    url: PLACEHOLDER('miquellan'),
    sections: [
      {
        heading: 'Light of Miquella',
        text: 'Annihilates foes with a pillar of light. Costs 48 FP, takes 2 memory slots, requires 72 Faith, and costs 60 Stamina. A Damage incantation.',
      },
      {
        heading: 'Multilayered Ring of Light',
        text: 'Fires a multilayered golden ring of light that continuously inflicts damage. Costs 23 FP, takes 1 memory slot, requires 36 Faith, and costs 28 Stamina. A Damage incantation.',
      },
    ],
  },
  {
    title: 'Golden Order incantations',
    url: PLACEHOLDER('golden-order'),
    sections: [
      {
        heading: 'Discus of Light',
        text: 'Fires a ring of light in front of the caster. Costs 3 FP, takes 1 memory slot, requires 13 Intelligence and 13 Faith, and costs 20 Stamina. A Damage incantation — one of the few incantations that scales with both Intelligence and Faith.',
      },
      {
        heading: 'Immutable Shield',
        text: "Increases the left-hand shield's affinity and ailment resistance. Costs 15 FP, takes 1 memory slot, requires 19 Intelligence and 19 Faith, and costs 10 Stamina. A Buff incantation.",
      },
      {
        heading: 'Law of Causality',
        text: 'Retaliates automatically after the caster receives a number of blows. Costs 22 FP, takes 1 memory slot, requires 29 Intelligence (no Faith), and costs 20 Stamina. A Buff incantation.',
      },
      {
        heading: 'Law of Regression',
        text: 'Heals all ailments and dispels all special effects on the caster. Costs 55 FP, takes 1 memory slot, requires 37 Intelligence (no Faith), and costs 50 Stamina. A Healing incantation.',
      },
      {
        heading: 'Litany of Proper Death',
        text: 'Creates an image of Order that deals holy damage. Costs 17 FP, takes 1 memory slot, requires 17 Intelligence and 17 Faith, and costs 28 Stamina. A Damage incantation.',
      },
      {
        heading: 'Order Healing',
        text: 'Alleviates death blight buildup. Costs 15 FP, takes 1 memory slot, requires 11 Intelligence and 11 Faith, and costs 10 Stamina. A Healing incantation.',
      },
      {
        heading: "Order's Blade",
        text: "Enchants the caster's right-hand armament with holy damage. Costs 22 FP, takes 1 memory slot, requires 13 Intelligence and 13 Faith, and costs 10 Stamina. A Buff incantation.",
      },
      {
        heading: "Radagon's Rings of Light",
        text: 'Creates a golden ring of light that attacks a wide area. Costs 21 FP, takes 1 memory slot, requires 31 Intelligence and 31 Faith, and costs 37 Stamina. A Damage incantation.',
      },
      {
        heading: 'Triple Rings of Light',
        text: 'Fires three rings of light in front of the caster. Costs 23 FP, takes 1 memory slot, requires 23 Intelligence and 23 Faith, and costs 28 Stamina. A Damage incantation.',
      },
    ],
  },
];
