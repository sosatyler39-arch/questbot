import type { ArticlePage } from '../types.js';

// Crystal Tears (Flask of Wondrous Physick mixture components). Item
// groupings and exact durations supplied directly by the user, not scraped
// or from our own recall — same precision-sourcing rule as stats.ts,
// talismans.ts, incantations.ts, sorceries.ts, and consumables.ts.
// "Dur: N/A" means the effect is instantaneous rather than timed.
const PLACEHOLDER = (slug: string) => `questbot://guide/crystal-tear/${slug}`;

export const CRYSTAL_TEAR_PAGES: ArticlePage[] = [
  {
    title: 'HP Crystal Tears',
    url: PLACEHOLDER('hp'),
    sections: [
      { heading: 'Crimson Crystal Tear', text: 'Instantly restores half of the total HP bar. Effect is instantaneous, not timed.' },
      { heading: 'Crimsonspill Crystal Tear', text: 'Temporarily boosts maximum HP. Lasts 180 seconds.' },
      { heading: 'Crimsonburst Crystal Tear', text: 'Steadily restores HP for a time. Lasts 180 seconds.' },
      { heading: 'Crimsonburst Dried Tear', text: 'Steadily restores HP of nearby allies for a time. Lasts 180 seconds.' },
      { heading: 'Crimson-Sapping Cracked Tear', text: "Grants the caster's attacks an HP-restoring effect on hit. Lasts 45 seconds." },
      { heading: 'Bloodsucking Cracked Tear', text: 'Enhances attack power at the cost of steadily draining HP. Lasts 180 seconds.' },
      { heading: 'Crimson Bubbletear', text: 'Restores HP automatically when the caster is near death. Lasts 180 seconds.' },
      { heading: 'Crimsonwhorl Bubbletear', text: 'Converts damage received into HP recovery. Lasts 15 seconds.' },
    ],
  },
  {
    title: 'FP Crystal Tears',
    url: PLACEHOLDER('fp'),
    sections: [
      { heading: 'Cerulean Crystal Tear', text: 'Instantly restores half of the total FP bar. Effect is instantaneous, not timed.' },
      { heading: 'Cerulean-Sapping Cracked Tear', text: "Grants the caster's attacks an FP-restoring effect on hit. Lasts 45 seconds." },
      { heading: 'Cerulean Hidden Tear', text: 'Eliminates all FP consumption entirely. Lasts 15 seconds.' },
    ],
  },
  {
    title: 'Stamina Crystal Tears',
    url: PLACEHOLDER('stamina'),
    sections: [
      { heading: 'Greenspill Crystal Tear', text: 'Temporarily boosts maximum Stamina. Lasts 180 seconds.' },
      { heading: 'Greenburst Crystal Tear', text: 'Temporarily boosts Stamina recovery speed. Lasts 180 seconds.' },
      { heading: 'Viridian Hidden Tear', text: 'Eliminates all Stamina consumption entirely. Lasts 15 seconds.' },
    ],
  },
  {
    title: 'Stat-boosting Crystal Tears',
    url: PLACEHOLDER('stats'),
    sections: [
      { heading: 'Strength-knot Crystal Tear', text: 'Temporarily boosts Strength. Lasts 180 seconds.' },
      { heading: 'Dexterity-knot Crystal Tear', text: 'Temporarily boosts Dexterity. Lasts 180 seconds.' },
      { heading: 'Intelligence-knot Crystal Tear', text: 'Temporarily boosts Intelligence. Lasts 180 seconds.' },
      { heading: 'Faith-knot Crystal Tear', text: 'Temporarily boosts Faith. Lasts 180 seconds.' },
    ],
  },
  {
    title: 'Defensive Crystal Tears',
    url: PLACEHOLDER('defensive'),
    sections: [
      { heading: 'Opaline Hardtear', text: 'Temporarily boosts all damage negations at once. Lasts 180 seconds.' },
      { heading: 'Speckled Hardtear', text: 'Boosts status resistance and heals active status ailments. Lasts 180 seconds.' },
      { heading: 'Leaden Hardtear', text: 'Temporarily boosts Poise. Lasts 10 seconds.' },
      { heading: 'Twiggy Cracked Tear', text: "Briefly stops rune loss on death; takes precedence over an equipped Sacrificial Twig while active. Lasts 180 seconds." },
      { heading: 'Winged Crystal Tear', text: 'Temporarily reduces Equip Load. Lasts 180 seconds.' },
      { heading: 'Windy Crystal Tear', text: 'Enhances dodge rolls for a time. Lasts 180 seconds.' },
      { heading: 'Opaline Bubbletear', text: 'Significantly negates the next single instance of damage taken. Lasts 180 seconds.' },
      { heading: 'Oil-Soaked Tear', text: 'Coats nearby enemies with oil. Lasts 30 seconds.' },
    ],
  },
  {
    title: 'Offensive Crystal Tears',
    url: PLACEHOLDER('offensive'),
    sections: [
      { heading: 'Stonebarb Cracked Tear', text: "Makes the caster's attacks more likely to break an enemy's stance. Lasts 30 seconds." },
      { heading: 'Spiked Cracked Tear', text: 'Enhances charged attacks for a time. Lasts 180 seconds.' },
      { heading: 'Thorny Cracked Tear', text: 'Makes consecutive attacks in a string grow progressively stronger. Lasts 180 seconds.' },
      { heading: 'Ruptured Crystal Tear', text: 'Causes the mixed concoction to explode. Lasts 3 seconds.' },
    ],
  },
  {
    title: 'Offensive elemental-damage Crystal Tears',
    url: PLACEHOLDER('offensive-elemental'),
    sections: [
      { heading: 'Deflecting Hardtear', text: 'Enhances spontaneous guard (the guard counter mechanic). Lasts 300 seconds.' },
      { heading: 'Magic-Shrouding Cracked Tear', text: 'Temporarily boosts magic damage. Lasts 180 seconds.' },
      { heading: 'Flame-Shrouding Cracked Tear', text: 'Temporarily boosts fire damage. Lasts 180 seconds.' },
      { heading: 'Lightning-Shrouding Cracked Tear', text: 'Temporarily boosts lightning damage. Lasts 180 seconds.' },
      { heading: 'Holy-Shrouding Cracked Tear', text: 'Temporarily boosts holy damage. Lasts 180 seconds.' },
      { heading: 'Glovewort Crystal Tear', text: "Enhances the attacks of the caster's summoned spirit. Lasts 180 seconds." },
    ],
  },
  {
    title: 'Boss-fight Crystal Tears',
    url: PLACEHOLDER('boss-fight'),
    sections: [
      { heading: 'Purifying Crystal Tear', text: "Purifies the Lord of Blood's curse. Effect is instantaneous, not timed." },
    ],
  },
];
