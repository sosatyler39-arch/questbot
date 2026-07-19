import type { ArticlePage } from '../types.js';

// Status effects (poison, rot, bleed, frostbite, sleep, madness, death
// blight). Exact content supplied directly by the user, not scraped or
// from our own recall — only light typo cleanup applied, no facts changed.
export const STATUS_EFFECT_PAGES: ArticlePage[] = [
  {
    title: 'Status effects',
    url: 'questbot://guide/status-effects',
    sections: [
      {
        heading: 'Overview',
        text: 'The status effects in Elden Ring are: poison, scarlet rot, blood loss (bleed), frostbite, sleep, madness, and death blight.',
      },
      {
        heading: 'Poison',
        text: 'Deals damage over time (DOT) slowly; damage and buildup vary based on the type and/or source of poison inflicted.',
      },
      {
        heading: 'Deadly Poison',
        text: 'A special, stronger version of poison. When poison is already active and Deadly Poison is applied on top of it, it causes a massive burst of damage but then completely removes the poison status from the target.',
      },
      {
        heading: 'Scarlet Rot',
        text: 'Deals more damage over time than poison, and at a faster rate, at the cost of a shorter duration. Damage and buildup vary based on the source of rot inflicted.',
      },
      {
        heading: 'Blood Loss (Bleed)',
        text: 'Builds up as you land hits on an enemy, then inflicts instant damage based on the target\'s max HP once buildup exceeds the enemy\'s robustness. Buildup varies based on the source of bleed inflicted, and bleed can build up faster the more Arcane the attacking character has.',
      },
      {
        heading: 'Frostbite (Frost)',
        text: 'Builds up as you land hits on an enemy. Once the meter fills, it deals damage and lowers the target\'s defenses by 20%. Buildup varies based on the source of frost inflicted, and frost can build up faster the more Intelligence the attacking character has.',
      },
      {
        heading: 'Sleep',
        text: 'Puts the target to sleep. Some enemies stay asleep until attacked, while others shake their head and wake up on their own. Buildup varies based on the type and/or source of sleep inflicted. A sleeping target is available to be critically attacked.',
      },
      {
        heading: 'Eternal Sleep',
        text: 'A special case of sleep that puts the target into an everlasting sleep — the enemy falls asleep permanently and does not wake up even when attacked. Enemies under Eternal Sleep cannot be critically attacked. Some bosses affected by Eternal Sleep instead fall asleep for roughly 5-10 seconds, or shake their head and get back up rather than staying asleep permanently.',
      },
      {
        heading: 'Madness',
        text: 'Builds up depending on the source inflicted. Enemies afflicted by Madness take damage, are inflicted with increased damage, and lose FP.',
      },
      {
        heading: 'Death Blight',
        text: 'Builds up depending on the source inflicted. Enemies in Elden Ring cannot be inflicted with Death Blight unless they are a fellow Tarnished.',
      },
    ],
  },
];
