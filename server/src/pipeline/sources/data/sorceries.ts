import type { ArticlePage } from '../types.js';

// Sorceries. Exact FP/Stamina/stat-requirement/slot values supplied
// directly by the user, not scraped or from our own recall — same
// precision-sourcing rule as stats.ts, talismans.ts, and incantations.ts.
// "FP X(Y)" means X FP to cast plus Y FP/sec while the spell is actively
// channeled (barrages, beams, sustained fields).
const PLACEHOLDER = (slug: string) => `questbot://guide/sorcery/${slug}`;

export const SORCERY_PAGES: ArticlePage[] = [
  {
    title: 'Carian sorceries',
    url: PLACEHOLDER('carian'),
    sections: [
      {
        heading: "Adula's Moonblade",
        text: "A sweeping slash followed by a cold blade projectile. Costs 22 FP, takes 1 memory slot, requires 32 Intelligence, and costs 22 Stamina.",
      },
      {
        heading: 'Carian Greatsword',
        text: 'Performs a sweeping slash using a magical greatsword. Costs 12 FP, takes 1 memory slot, requires 24 Intelligence, and costs 22 Stamina.',
      },
      {
        heading: 'Carian Phalanx',
        text: 'Forms a defensive arch of numerous magic glintblades. Costs 24 FP, takes 1 memory slot, requires 34 Intelligence, and costs 16 Stamina.',
      },
      {
        heading: 'Carian Piercer',
        text: 'Impales foes with a magical greatsword. Costs 17 FP, takes 1 memory slot, requires 27 Intelligence, and costs 25 Stamina.',
      },
      {
        heading: 'Carian Retaliation',
        text: "Dispels an enemy's spell and retaliates with glintblades. Costs 8 FP, takes 1 memory slot, requires 17 Intelligence, and costs 15 Stamina.",
      },
      {
        heading: 'Carian Slicer',
        text: 'Performs a swift sweeping slash using a magical sword. Costs 4 FP, takes 1 memory slot, requires 14 Intelligence, and costs 12 Stamina.',
      },
      {
        heading: 'Glintblade Phalanx',
        text: 'Forms a defensive arch of magic glintblades. Costs 18 FP, takes 1 memory slot, requires 22 Intelligence, and costs 12 Stamina.',
      },
      {
        heading: 'Glintblade Trio',
        text: 'Creates a sigil that forms three projectile glintblades after a delay. Costs 19 FP, takes 1 memory slot, requires 28 Intelligence, and costs 22 Stamina.',
      },
      {
        heading: 'Greatblade Phalanx',
        text: 'Forms a defensive arch of larger magic glintblades. Costs 30 FP, takes 1 memory slot, requires 29 Intelligence, and costs 20 Stamina.',
      },
      {
        heading: "Loretta's Greatbow",
        text: 'Fires a great arrow from a magic greatbow. Costs 24 FP, takes 1 memory slot, requires 26 Intelligence, and costs 30 Stamina.',
      },
      {
        heading: "Loretta's Mastery",
        text: 'Fires four great arrows from a magic greatbow at once. Costs 39 FP, takes 1 memory slot, requires 46 Intelligence, and costs 33 Stamina.',
      },
      {
        heading: 'Lucidity',
        text: 'Alleviates sleep and madness buildup. Costs 10 FP, takes 1 memory slot, requires 17 Intelligence, and costs 10 Stamina.',
      },
      {
        heading: 'Magic Downpour',
        text: 'Summons a magic mass that sprays projectiles over an area. Costs 18 FP, takes 1 memory slot, requires 15 Intelligence, and costs 17 Stamina.',
      },
      {
        heading: 'Magic Glintblade',
        text: 'Creates a sigil that forms a projectile glintblade after a delay. Costs 12 FP, takes 1 memory slot, requires 14 Intelligence, and costs 22 Stamina.',
      },
      {
        heading: "Miriam's Vanishing",
        text: 'Conceals the caster in a glintstone haze. Costs 9 FP, takes 1 memory slot, requires 26 Intelligence, and costs 10 Stamina.',
      },
      {
        heading: "Ranni's Dark Moon",
        text: 'Incarnates a cold, dark moon and launches it at foes. Costs 57 FP, takes 2 memory slots, requires 68 Intelligence, and costs 32 Stamina.',
      },
      {
        heading: "Rellana's Twin Moons",
        text: 'Incarnates twin moons and repeatedly strikes the ground with them. Costs 47 FP, takes 2 memory slots, requires 72 Intelligence, and costs 32 Stamina.',
      },
      {
        heading: "Rennala's Full Moon",
        text: 'Incarnates a full moon and launches it at foes. Costs 47 FP, takes 2 memory slots, requires 70 Intelligence, and costs 32 Stamina.',
      },
    ],
  },
  {
    title: 'Glintstone sorceries',
    url: PLACEHOLDER('glintstone'),
    sections: [
      {
        heading: 'Cannon of Haima',
        text: 'Lobs an explosive magic projectile in an arc. Costs 38 FP, takes 1 memory slot, requires 25 Intelligence, and costs 42 Stamina.',
      },
      {
        heading: 'Comet',
        text: 'Fires a great magic comet. Costs 24 FP, takes 1 memory slot, requires 52 Intelligence, and costs 35 Stamina.',
      },
      {
        heading: 'Comet Azur',
        text: 'Fires a tremendous comet within a sustained starry torrent. Costs 40 FP to cast plus 10 FP/sec while channeled, takes 3 memory slots, requires 60 Intelligence, and costs 34 Stamina.',
      },
      {
        heading: 'Crystal Barrage',
        text: 'Fires a volley of glintstone crystal shards. Costs 14 FP to cast plus 2 FP/sec while channeled, takes 1 memory slot, requires 23 Intelligence, and costs 26 Stamina.',
      },
      {
        heading: 'Crystal Burst',
        text: 'Fires a burst of glintstone crystal shards. Costs 14 FP, takes 1 memory slot, requires 18 Intelligence, and costs 9 Stamina.',
      },
      {
        heading: 'Founding Rain of Stars',
        text: 'Releases a downpour of star rain over a duration. Costs 27 FP, takes 2 memory slots, requires 52 Intelligence, and costs 37 Stamina.',
      },
      {
        heading: 'Gavel of Haima',
        text: 'Attacks using a magic greathammer. Costs 22 FP, takes 1 memory slot, requires 25 Intelligence, and costs 46 Stamina.',
      },
      {
        heading: 'Glintstone Arc',
        text: 'Launches a horizontally-widening magic arc. Costs 9 FP, takes 1 memory slot, requires 13 Intelligence, and costs 18 Stamina.',
      },
      {
        heading: 'Glintstone Cometshard',
        text: 'Fires a magic comet with a trailing tail. Costs 17 FP, takes 1 memory slot, requires 36 Intelligence, and costs 30 Stamina.',
      },
      {
        heading: 'Glintstone Pebble',
        text: 'Fires magic projectiles from glintstone. Costs 7 FP, takes 1 memory slot, requires 10 Intelligence, and costs 20 Stamina.',
      },
      {
        heading: 'Glintstone Stars',
        text: 'Fires guided magic shooting stars. Costs 12 FP, takes 1 memory slot, requires 12 Intelligence, and costs 21 Stamina.',
      },
      {
        heading: 'Great Glintstone Shard',
        text: 'Fires larger magic projectiles from glintstone. Costs 12 FP, takes 1 memory slot, requires 16 Intelligence, and costs 26 Stamina.',
      },
      {
        heading: 'Rock Blaster',
        text: 'Thrusts a staff into the ground to emit a massive shockwave. Costs 22 FP to cast plus 4 FP/sec while channeled, takes 1 memory slot, requires 21 Intelligence, and costs 35 Stamina.',
      },
      {
        heading: "Scholar's Armament",
        text: "Enchants the caster's right-hand armament with magic damage. Costs 25 FP, takes 1 memory slot, requires 12 Intelligence, and costs 10 Stamina.",
      },
      {
        heading: "Scholar's Shield",
        text: "Enhances the left-hand shield's damage negation. Costs 30 FP, takes 1 memory slot, requires 12 Intelligence, and costs 10 Stamina.",
      },
      {
        heading: 'Shard Spiral',
        text: 'Fires twin spiraling projectiles. Costs 14 FP, takes 1 memory slot, requires 27 Intelligence, and costs 28 Stamina.',
      },
      {
        heading: 'Shatter Earth',
        text: 'Thrusts a staff into the ground to emit a shockwave. Costs 10 FP, takes 1 memory slot, requires 15 Intelligence, and costs 22 Stamina.',
      },
      {
        heading: 'Star Shower',
        text: 'Fires six shooting stars that pursue foes. Costs 23 FP, takes 1 memory slot, requires 24 Intelligence, and costs 26 Stamina.',
      },
      {
        heading: 'Starlight',
        text: 'Creates starlight to illuminate the surroundings. Costs 9 FP, takes 1 memory slot, requires 15 Intelligence, and costs 5 Stamina.',
      },
      {
        heading: 'Stars of Ruin',
        text: 'Fires twelve dark shooting stars that pursue foes. Costs 32 FP, takes 1 memory slot, requires 43 Intelligence, and costs 33 Stamina.',
      },
      {
        heading: 'Swift Glintstone Shard',
        text: 'Swiftly fires magic projectiles from glintstone. Costs 5 FP, takes 1 memory slot, requires 12 Intelligence, and costs 9 Stamina.',
      },
      {
        heading: 'Terra Magica',
        text: 'Raises the magic strength of those standing within its sigil. Costs 20 FP, takes 1 memory slot, requires 20 Intelligence, and costs 12 Stamina.',
      },
      {
        heading: "Thops's Barrier",
        text: 'Erects a magic forcefield that deflects spells. Costs 7 FP, takes 1 memory slot, requires 18 Intelligence, and costs 10 Stamina.',
      },
    ],
  },
  {
    title: 'Gravity sorceries',
    url: PLACEHOLDER('gravity'),
    sections: [
      {
        heading: 'Blades of Stone',
        text: 'Summons rock blades from the earth. Costs 18 FP, takes 2 memory slots, requires 48 Intelligence, and costs 29 Stamina.',
      },
      {
        heading: 'Collapsing Stars',
        text: 'Pulls foes toward the caster with a volley of gravity projectiles. Costs 18 FP, takes 1 memory slot, requires 36 Intelligence, and costs 27 Stamina.',
      },
      {
        heading: 'Gravitational Missile',
        text: 'Fires a bolt of gravity that pulls in enemies. Costs 18 FP, takes 1 memory slot, requires 36 Intelligence, and costs 29 Stamina.',
      },
      {
        heading: 'Gravity Well',
        text: 'Pulls foes toward the caster with a gravity projectile. Costs 12 FP, takes 1 memory slot, requires 17 Intelligence, and costs 20 Stamina.',
      },
      {
        heading: 'Meteorite',
        text: 'Calls small meteors down from the sky. Costs 30 FP to cast plus 10 FP/sec while channeled, takes 1 memory slot, requires 30 Intelligence, and costs 35 Stamina.',
      },
      {
        heading: 'Meteorite of Astel',
        text: 'Calls a hail of small meteorites down from the void. Costs 60 FP to cast plus 12 FP/sec while channeled, takes 2 memory slots, requires 55 Intelligence, and costs 40 Stamina.',
      },
      {
        heading: 'Rock Sling',
        text: 'Summons rocks from the earth and sends them flying. Costs 18 FP, takes 1 memory slot, requires 18 Intelligence, and costs 29 Stamina.',
      },
    ],
  },
  {
    title: 'Death sorceries',
    url: PLACEHOLDER('death'),
    sections: [
      {
        heading: 'Ancient Death Rancor',
        text: 'Summons a horde of vengeful spirits that chase down foes. Costs 21 FP, takes 1 memory slot, requires 34 Intelligence and 24 Faith, and costs 27 Stamina.',
      },
      {
        heading: 'Explosive Ghostflame',
        text: 'Causes a ghostflame explosion that burns a wide area. Costs 29 FP, takes 1 memory slot, requires 42 Intelligence and 30 Faith, and costs 45 Stamina.',
      },
      {
        heading: "Fia's Mist",
        text: 'Releases a mist of death in front of the caster. Costs 25 FP, takes 1 memory slot, requires 23 Intelligence and 18 Faith, and costs 13 Stamina.',
      },
      {
        heading: 'Mass of Putrescence',
        text: 'Flings a great mass of putrescence. Costs 41 FP, takes 1 memory slot, requires 28 Intelligence and 22 Faith, and costs 42 Stamina.',
      },
      {
        heading: 'Rancorcall',
        text: 'Summons vengeful spirits that chase down foes. Costs 12 FP, takes 1 memory slot, requires 16 Intelligence and 14 Faith, and costs 21 Stamina.',
      },
      {
        heading: 'Rings of Spectral Light',
        text: 'Creates rings of spectral light that fire in unison. Costs 14 FP, takes 1 memory slot, requires 24 Intelligence and 18 Faith, and costs 21 Stamina.',
      },
      {
        heading: "Tibia's Summons",
        text: 'Summons Those Who Live in Death. Costs 17 FP, takes 1 memory slot, requires 28 Intelligence and 20 Faith, and costs 27 Stamina.',
      },
      {
        heading: 'Vortex of Putrescence',
        text: 'Launches a whirl of putrescent jets. Costs 29 FP, takes 2 memory slots, requires 32 Intelligence and 26 Faith, and costs 45 Stamina.',
      },
    ],
  },
  {
    title: 'Night sorceries',
    url: PLACEHOLDER('night'),
    sections: [
      {
        heading: 'Ambush Shard',
        text: 'Strikes from behind with a projectile fired from a distance. Costs 13 FP, takes 1 memory slot, requires 23 Intelligence, and costs 15 Stamina.',
      },
      {
        heading: 'Eternal Darkness',
        text: 'Creates a dark space that draws in spells. Costs 25 FP, takes 1 memory slot, requires 35 Intelligence, and costs 15 Stamina.',
      },
      {
        heading: 'Night Comet',
        text: 'Fires a semi-invisible magic comet. Costs 21 FP, takes 1 memory slot, requires 38 Intelligence, and costs 30 Stamina.',
      },
      {
        heading: "Night Maiden's Mist",
        text: 'Releases a life-sapping silver mist in front of the caster. Costs 20 FP, takes 1 memory slot, requires 14 Intelligence, and costs 20 Stamina.',
      },
      {
        heading: 'Night Shard',
        text: 'Swiftly fires a semi-invisible magic projectile. Costs 7 FP, takes 1 memory slot, requires 18 Intelligence, and costs 9 Stamina.',
      },
      {
        heading: 'Unseen Blade',
        text: "Makes the caster's right-hand armament completely invisible. Costs 13 FP, takes 1 memory slot, requires 12 Intelligence, and costs 10 Stamina.",
      },
      {
        heading: 'Unseen Form',
        text: 'Makes the caster semi-invisible. Costs 20 FP, takes 1 memory slot, requires 16 Intelligence, and costs 10 Stamina.',
      },
    ],
  },
  {
    title: 'Thorn sorceries',
    url: PLACEHOLDER('thorn'),
    sections: [
      {
        heading: 'Briars of Punishment',
        text: 'Wounds the caster to unleash a trail of bloodthorns. Costs 9 FP, takes 1 memory slot, requires 21 Faith (no Intelligence), and costs 22 Stamina.',
      },
      {
        heading: 'Briars of Sin',
        text: "Summons thorns from a whorl of the caster's own blood. Costs 6 FP, takes 1 memory slot, requires 24 Faith (no Intelligence), and costs 26 Stamina.",
      },
      {
        heading: 'Impenetrable Thorns',
        text: "Summons the Scadutree's impenetrable thorns from the earth. Costs 15 FP, takes 1 memory slot, requires 24 Faith (no Intelligence), and costs 22 Stamina.",
      },
      {
        heading: 'Mantle of Thorns',
        text: "Covers the caster with the Scadutree's impenetrable thorns. Costs 9 FP, takes 1 memory slot, requires 20 Faith (no Intelligence), and costs 22 Stamina.",
      },
    ],
  },
  {
    title: 'Finger sorceries',
    url: PLACEHOLDER('finger'),
    sections: [
      {
        heading: 'Cherishing Fingers',
        text: 'Surrounds the caster with a mesh of hefty fingers. Costs 20 FP, takes 1 memory slot, requires 36 Intelligence, and costs 20 Stamina.',
      },
      {
        heading: 'Fleeting Microcosm',
        text: 'Conjures a microcosm that pulses with a single wave before disappearing in a burst. Costs 26 FP, takes 1 memory slot, requires 42 Intelligence, and costs 35 Stamina.',
      },
      {
        heading: 'Glintstone Nail',
        text: 'Fires a shattering magic nail. Costs 10 FP, takes 1 memory slot, requires 18 Intelligence, and costs 21 Stamina.',
      },
      {
        heading: 'Glintstone Nails',
        text: 'Fires multiple shattering magic nails. Costs 23 FP, takes 1 memory slot, requires 32 Intelligence, and costs 26 Stamina.',
      },
    ],
  },
  {
    title: 'Crystalian sorceries',
    url: PLACEHOLDER('crystalian'),
    sections: [
      {
        heading: 'Crystal Release',
        text: 'Scours an area with a violent rain of crystal shards. Costs 34 FP, takes 1 memory slot, requires 41 Intelligence, and costs 26 Stamina.',
      },
      {
        heading: 'Crystal Torrent',
        text: 'Creates a crystal mass that fires a stream of crystal shards. Costs 20 FP to cast plus 5 FP/sec while channeled, takes 1 memory slot, requires 47 Intelligence, and costs 30 Stamina.',
      },
      {
        heading: 'Shattering Crystal',
        text: 'Creates a crystal mass that shatters in a forward burst. Costs 21 FP, takes 1 memory slot, requires 38 Intelligence, and costs 35 Stamina.',
      },
    ],
  },
  {
    title: 'Cold sorceries',
    url: PLACEHOLDER('cold'),
    sections: [
      {
        heading: 'Freezing Mist',
        text: 'Releases cold mist in front of the caster. Costs 20 FP, takes 1 memory slot, requires 21 Intelligence, and costs 13 Stamina.',
      },
      {
        heading: 'Frozen Armament',
        text: "Enchants the caster's right-hand armament with frost. Costs 20 FP, takes 1 memory slot, requires 15 Intelligence, and costs 10 Stamina.",
      },
      {
        heading: 'Glintstone Icecrag',
        text: 'Fires a mass of cold magic from glintstone. Costs 12 FP, takes 1 memory slot, requires 15 Intelligence, and costs 26 Stamina.',
      },
      {
        heading: 'Zamor Ice Storm',
        text: 'Thrusts a staff into the ground to create a freezing tornado. Costs 17 FP, takes 1 memory slot, requires 36 Intelligence, and costs 27 Stamina.',
      },
    ],
  },
  {
    title: 'Magma sorceries',
    url: PLACEHOLDER('magma'),
    sections: [
      {
        heading: "Gelmir's Fury",
        text: 'Covers an area with a surge of magma from the earth. Costs 16 FP to cast plus 3 FP/sec while channeled, takes 1 memory slot, requires 28 Intelligence and 15 Faith, and costs 38 Stamina.',
      },
      {
        heading: 'Magma Shot',
        text: 'Fires a lump of magma that explodes on contact. Costs 16 FP, takes 1 memory slot, requires 19 Intelligence and 10 Faith, and costs 21 Stamina.',
      },
      {
        heading: 'Roiling Magma',
        text: 'Fires a lump of magma that explodes after a delay. Costs 28 FP, takes 1 memory slot, requires 21 Intelligence and 12 Faith, and costs 27 Stamina.',
      },
      {
        heading: "Rykard's Rancor",
        text: 'Releases searing spirits that repeatedly explode after a delay. Costs 23 FP, takes 2 memory slots, requires 40 Intelligence and 18 Faith, and costs 36 Stamina.',
      },
    ],
  },
  {
    title: 'Oracle sorceries',
    url: PLACEHOLDER('oracle'),
    sections: [
      {
        heading: 'Great Oracular Bubble',
        text: 'Launches a large magic bubble. Costs 16 FP, takes 1 memory slot, requires 25 Intelligence and 18 Arcane, and costs 27 Stamina.',
      },
      {
        heading: 'Oracle Bubbles',
        text: 'Launches several small magic bubbles. Costs 12 FP, takes 1 memory slot, requires 19 Intelligence and 15 Arcane, and costs 18 Stamina.',
      },
    ],
  },
];
