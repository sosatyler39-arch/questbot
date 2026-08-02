import type { ArticlePage } from '../types.js';

// Crystal Tears (Flask of Wondrous Physick mixture components). Item
// groupings and exact durations supplied directly by the user, not scraped
// or from our own recall — same precision-sourcing rule as stats.ts,
// talismans.ts, incantations.ts, sorceries.ts, and consumables.ts.
// "Dur: N/A" means the effect is instantaneous rather than timed. Exact
// percentages/values added or verified via the "ER - Miscellaneous Data"
// sheet audit (2026-08-01) — see docs/superpowers/audit-logs/.
const PLACEHOLDER = (slug: string) => `questbot://guide/crystal-tear/${slug}`;

export const CRYSTAL_TEAR_PAGES: ArticlePage[] = [
  {
    title: 'HP Crystal Tears',
    url: PLACEHOLDER('hp'),
    sections: [
      { heading: 'Crimson Crystal Tear', text: 'Instantly restores half of the total HP bar. Effect is instantaneous, not timed.' },
      { heading: 'Crimsonspill Crystal Tear', text: 'Temporarily boosts maximum HP by 10%. Lasts 180 seconds.' },
      { heading: 'Crimsonburst Crystal Tear', text: 'Steadily restores HP for a time, at 7 HP per second. Lasts 180 seconds.' },
      { heading: 'Crimsonburst Dried Tear', text: 'Steadily restores HP of nearby allies (within 7m) for a time, at 7 HP per second. Lasts 180 seconds.' },
      { heading: 'Crimson-Sapping Cracked Tear', text: "Grants the caster's attacks an HP-restoring effect on hit, restoring roughly 0.8% of maximum HP per hit. Lasts 45 seconds." },
      { heading: 'Bloodsucking Cracked Tear', text: 'Enhances attack power by 20% at the cost of steadily draining HP (roughly 0.2% of maximum HP plus a flat 20 HP per second). Lasts 180 seconds.' },
      { heading: 'Crimson Bubbletear', text: 'Restores 30% of maximum HP automatically when the caster drops below 21% of maximum HP. Lasts 180 seconds.' },
      { heading: 'Crimsonwhorl Bubbletear', text: 'Converts damage received into HP recovery, restoring roughly 5% of maximum HP each time the caster is hit. Lasts 15 seconds.' },
    ],
  },
  {
    title: 'FP Crystal Tears',
    url: PLACEHOLDER('fp'),
    sections: [
      { heading: 'Cerulean Crystal Tear', text: 'Instantly restores half of the total FP bar. Effect is instantaneous, not timed.' },
      { heading: 'Cerulean-Sapping Cracked Tear', text: "Grants the caster's attacks an FP-restoring effect on hit, restoring 5 FP per hit. Lasts 45 seconds." },
      { heading: 'Cerulean Hidden Tear', text: 'Eliminates all FP consumption entirely. Lasts 15 seconds.' },
    ],
  },
  {
    title: 'Stamina Crystal Tears',
    url: PLACEHOLDER('stamina'),
    sections: [
      { heading: 'Greenspill Crystal Tear', text: 'Temporarily boosts maximum Stamina by 15%. Lasts 180 seconds.' },
      { heading: 'Greenburst Crystal Tear', text: 'Temporarily boosts Stamina recovery speed by 15 per second. Lasts 180 seconds.' },
      { heading: 'Viridian Hidden Tear', text: 'Eliminates all Stamina consumption entirely. Lasts 15 seconds.' },
    ],
  },
  {
    title: 'Stat-boosting Crystal Tears',
    url: PLACEHOLDER('stats'),
    sections: [
      { heading: 'Strength-knot Crystal Tear', text: 'Temporarily boosts Strength by 10. Lasts 180 seconds.' },
      { heading: 'Dexterity-knot Crystal Tear', text: 'Temporarily boosts Dexterity by 10. Lasts 180 seconds.' },
      { heading: 'Intelligence-knot Crystal Tear', text: 'Temporarily boosts Intelligence by 10. Lasts 180 seconds.' },
      { heading: 'Faith-knot Crystal Tear', text: 'Temporarily boosts Faith by 10. Lasts 180 seconds.' },
    ],
  },
  {
    title: 'Defensive Crystal Tears',
    url: PLACEHOLDER('defensive'),
    sections: [
      { heading: 'Opaline Hardtear', text: 'Temporarily boosts all damage negations at once by 15%. Lasts 180 seconds.' },
      { heading: 'Speckled Hardtear', text: 'Boosts status resistances by 90 and heals active status ailments (resets their buildup to 0). Lasts 180 seconds.' },
      { heading: 'Leaden Hardtear', text: 'Temporarily boosts Poise, preventing stagger from Damage Levels 1, 2, 3, 5, and 8. Lasts 10 seconds.' },
      { heading: 'Twiggy Cracked Tear', text: "Briefly stops rune loss on death; takes precedence over an equipped Sacrificial Twig while active. Lasts 180 seconds." },
      { heading: 'Winged Crystal Tear', text: 'Temporarily reduces effective Equip Load. Lasts 180 seconds.' },
      { heading: 'Windy Crystal Tear', text: 'Enhances dodge rolls for a time, adding roughly 6 additional invincibility frames, but reducing all damage negations by 15% as a tradeoff (does not stack with the Crucible Feather Talisman). Lasts 180 seconds.' },
      { heading: 'Opaline Bubbletear', text: 'Significantly negates (by 90%) the next single instance of damage taken. Lasts 180 seconds.' },
      { heading: 'Oil-Soaked Tear', text: 'Coats nearby enemies (within 1m) and the user with oil, reducing fire damage negation by 20%. Lasts 30 seconds.' },
    ],
  },
  {
    title: 'Offensive Crystal Tears',
    url: PLACEHOLDER('offensive'),
    sections: [
      { heading: 'Stonebarb Cracked Tear', text: "Makes the caster's attacks more likely to break an enemy's stance, boosting both poise damage and stamina damage by 30%. Lasts 30 seconds." },
      { heading: 'Spiked Cracked Tear', text: 'Enhances charged R2 attacks by 15% for a time. Lasts 180 seconds.' },
      { heading: 'Thorny Cracked Tear', text: 'Makes consecutive attacks in a string grow progressively stronger, stacking roughly 9% then 13% then 20%. Lasts 180 seconds.' },
      { heading: 'Ruptured Crystal Tear', text: 'Causes the mixed concoction to explode after roughly 2.9 seconds.' },
    ],
  },
  {
    title: 'Offensive elemental-damage Crystal Tears',
    url: PLACEHOLDER('offensive-elemental'),
    sections: [
      { heading: 'Deflecting Hardtear', text: 'Enhances spontaneous guard (the guard counter mechanic) for 300 seconds: while active, guarding boosts physical guard negation by 100%, elemental guard negation by 75%, and reduces incoming stamina damage by 65%, all for a brief 6-frame (30fps) window per guard. A successful deflect within that window buffs subsequent guard counters in escalating tiers (roughly +20% to +80% damage across four tiers).' },
      { heading: 'Magic-Shrouding Cracked Tear', text: 'Temporarily boosts magic damage by 20%. Lasts 180 seconds.' },
      { heading: 'Flame-Shrouding Cracked Tear', text: 'Temporarily boosts fire damage by 20%. Lasts 180 seconds.' },
      { heading: 'Lightning-Shrouding Cracked Tear', text: 'Temporarily boosts lightning damage by 20%. Lasts 180 seconds.' },
      { heading: 'Holy-Shrouding Cracked Tear', text: 'Temporarily boosts holy damage by 20%. Lasts 180 seconds.' },
      { heading: 'Glovewort Crystal Tear', text: "Enhances the attacks of the caster's summoned spirit by 7.5%. Lasts 180 seconds." },
    ],
  },
  {
    title: 'Boss-fight Crystal Tears',
    url: PLACEHOLDER('boss-fight'),
    sections: [
      { heading: 'Purifying Crystal Tear', text: "Purifies the Lord of Blood's curse, preventing blood loss during Mohg's phase 2 transition. Effect is instantaneous, not timed." },
    ],
  },
];
