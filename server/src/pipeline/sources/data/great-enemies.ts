import type { ArticlePage } from '../types.js';

// "Great Enemies" — open-world field bosses with their own health bar and
// map presence, distinct from Evergaol occupants and legacy dungeon/
// remembrance bosses. Base game only. Original writing — see the header
// comment in original-content.ts for the sourcing policy.
export const GREAT_ENEMY_PAGES: ArticlePage[] = [
  {
    title: 'Flying Dragon Agheel',
    url: 'questbot://guide/flying-dragon-agheel',
    sections: [
      {
        heading: 'Location',
        text: 'Flying Dragon Agheel is found at Agheel Lake in central-southern Limgrave, south of the main road to Stormveil Castle. It patrols the lake and swoops down at players who approach.',
      },
      {
        heading: 'Notes',
        text: 'This is one of the first full dragon fights available and is a meaningful step up in difficulty from Limgrave\'s early enemies — most players are better off leveling a bit and returning rather than fighting it immediately on arrival. Its fire breath covers a wide frontal cone, and fighting from the side or behind is much safer than head-on.',
      },
    ],
  },
  {
    title: 'Flying Dragon Greyll',
    url: 'questbot://guide/flying-dragon-greyll',
    sections: [
      {
        heading: 'Location',
        text: 'Found at the Bellum Highway area between Liurnia of the Lakes and the Altus Plateau, guarding the base of the Grand Lift of Dectus.',
      },
    ],
  },
  {
    title: 'Glintstone Dragon Adula',
    url: 'questbot://guide/glintstone-dragon-adula',
    sections: [
      {
        heading: 'Location',
        text: 'Found at the Moonfolk Ruins in Liurnia of the Lakes, in the water to the west of Raya Lucaria Academy.',
      },
    ],
  },
  {
    title: 'Tree Sentinel (Limgrave)',
    url: 'questbot://guide/tree-sentinel-limgrave',
    sections: [
      {
        heading: 'Location',
        text: 'A mounted golden knight found very near the game\'s starting area in Limgrave, close to the First Step Site of Grace. Notorious as an extremely tough fight if attempted at the start of the game — most guides recommend avoiding or heavily kiting it early on.',
      },
    ],
  },
  {
    title: 'Ulcerated Tree Spirit',
    url: 'questbot://guide/ulcerated-tree-spirit',
    sections: [
      {
        heading: 'Locations',
        text: 'Multiple Ulcerated Tree Spirits appear across the game, including one in the Weeping Peninsula near Castle Morne, one in Caelid, and others in later regions. They are large, tentacle-limbed tree-like enemies that erupt from the ground with a distinctive scream before engaging.',
      },
    ],
  },
  {
    title: 'Crucible Knight (open world)',
    url: 'questbot://guide/crucible-knight-open-world',
    sections: [
      {
        heading: 'Locations',
        text: 'Crucible Knights (armored knights who can transform partway through the fight to sprout wings or a tail) appear both as open-world Great Enemies and inside some Evergaols. Notable open-world encounters include one guarding an Evergaol near northern Limgrave and others scattered through Altus Plateau and Leyndell.',
      },
    ],
  },
  {
    title: 'Death Rite Bird',
    url: 'questbot://guide/death-rite-bird',
    sections: [
      {
        heading: 'Locations',
        text: 'Large skeletal bird enemies found at night in several regions, including Caelid, Altus Plateau, and Mountaintops of the Giants. They inflict a heavy blood-loss debuff and are considerably weaker if fought at night versus during the day for some encounters — approach cautiously and consider engaging when other threats aren\'t also active nearby.',
      },
    ],
  },
  {
    title: 'Battlemage Hugues / roaming spellcasters',
    url: 'questbot://guide/roaming-spellcasters',
    sections: [
      {
        heading: 'Note',
        text: 'Several open-world "named" enemies act as mini-bosses without being full Great Enemies, including invaders like Battlemage Hugues near the Bridge of Sacrifice in Limgrave — worth being aware of as a mid-tier threat distinct from the larger Great Enemies on this list.',
      },
    ],
  },
  {
    title: 'Fallingstar Beast',
    url: 'questbot://guide/fallingstar-beast',
    sections: [
      {
        heading: 'Locations',
        text: 'Fallingstar Beasts are crystalline, meteor-associated enemies found in a few locations including Caelid and the Mountaintops of the Giants area. They deal heavy magic and physical damage with sweeping claw attacks.',
      },
    ],
  },
  {
    title: 'Onyx Lord',
    url: 'questbot://guide/onyx-lord',
    sections: [
      {
        heading: 'Locations',
        text: 'Onyx Lords are stone-armored, sorcery-focused enemies typically found guarding treasure in caves and ruins in the later game regions, including the Mountaintops of the Giants and Consecrated Snowfield.',
      },
    ],
  },
  {
    title: 'Godskin Apostle / Godskin Noble (open world)',
    url: 'questbot://guide/godskin-open-world',
    sections: [
      {
        heading: 'Locations',
        text: 'Individual Godskin enemies (Apostle and Noble variants) appear as open-world and dungeon bosses in several places, including Mt. Gelmir near Volcano Manor and other later-game locations, ahead of the combined Godskin Duo fight found elsewhere.',
      },
    ],
  },
  {
    title: 'Onyx dragons and other late-game dragons',
    url: 'questbot://guide/late-game-dragons',
    sections: [
      {
        heading: 'Locations',
        text: 'Additional dragon-type Great Enemies appear in the Mountaintops of the Giants and Crumbling Farum Azula, generally tougher than the earlier Limgrave/Liurnia dragons and worth saving for a higher character level.',
      },
    ],
  },
];
