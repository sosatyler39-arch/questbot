import type { ArticlePage, TextSource } from './types.js';
import { EVERGAOL_PAGES } from './data/evergaols.js';
import { CHURCH_PAGES } from './data/churches.js';
import { GREAT_ENEMY_PAGES } from './data/great-enemies.js';
import { KEY_ITEM_PAGES } from './data/key-items.js';
import { LIMGRAVE_DUNGEON_PAGES } from './data/dungeons-limgrave.js';
import { LIURNIA_CAELID_DUNGEON_PAGES } from './data/dungeons-liurnia-caelid.js';
import { LATE_GAME_DUNGEON_PAGES } from './data/dungeons-late-game.js';
import { CHEST_PAGES } from './data/chests.js';
import { QUESTLINE_PAGES } from './data/questlines.js';
import { STARTING_CLASS_PAGES } from './data/starting-classes.js';
import { KEEPSAKE_PAGES } from './data/keepsakes.js';
import { STAT_PAGES } from './data/stats.js';
import { GENERAL_STATS_PAGES } from './data/mechanics-general-stats.js';
import { DAMAGE_TYPE_PAGES } from './data/mechanics-damage-types.js';
import { STATUS_EFFECT_PAGES } from './data/mechanics-status-effects.js';
import { TALISMAN_PAGES } from './data/talismans.js';
import { INCANTATION_PAGES } from './data/incantations.js';

// Original guide content, written from general knowledge of the game — not
// copied or adapted from Fextralife, Fandom, wiki.gg, or any other existing
// wiki. Facts about a game (boss names, locations, item effects) aren't
// anyone's copyrighted expression; this is our own wording throughout.
//
// `url` values are internal placeholders (no real Questbot content site
// exists yet) — SourceCard.url expects a real link, so these intentionally
// use a custom scheme rather than pointing at an unrelated real page.
const PLACEHOLDER = (slug: string) => `questbot://guide/${slug}`;

export const ORIGINAL_PAGES: ArticlePage[] = [
  {
    title: 'Margit, the Fell Omen',
    url: PLACEHOLDER('margit-the-fell-omen'),
    sections: [
      {
        heading: 'Overview',
        text: 'Margit, the Fell Omen guards the entrance to Stormveil Castle in Limgrave and is the game\'s first major boss wall. He wields a curved sword and a massive hammer, fights at close-to-medium range, and can summon three spectral hammers that slam down in a line — a strong signal to run to the side rather than back away.',
      },
      {
        heading: 'Location',
        text: 'Margit is fought at the fog gate directly outside the main entrance to Stormveil Castle, reached by following the main road north from the Gatefront Site of Grace in Limgrave.',
      },
      {
        heading: 'Strategy',
        text: 'Margit is vulnerable to bleed and to being staggered — jump attacks and heavy poise-damage weapons stagger him for a critical hit. Margit\'s Shackle, sold by Patches once he\'s found in Murkwater Cave, briefly stuns Margit twice per fight and is one of the most effective early-game consumables against him. Summoning Sorcerer Rogier or another Spirit Ash at the fog gate splits his aggro and meaningfully lowers the difficulty. Leveling up and upgrading a weapon at a Smithing Table before this fight is worth doing if the fight feels unfair — Margit is intentionally a difficulty gate.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Margit grants a large rune reward and opens the path into Stormveil Castle proper.',
      },
      {
        heading: 'Is he mandatory?',
        text: 'No — Margit and Stormveil Castle are the intended critical path out of Limgrave, but not the only one. Liurnia of the Lakes can be reached directly via the Bridge of Sacrifice without ever entering Stormveil Castle or fighting Margit, so a player can skip this fight entirely and come back later, or never fight him at all if they route around Stormveil for the rest of the game. Godrick\'s Great Rune (which requires beating Margit first) is one of several Great Runes that can satisfy the requirement to enter Leyndell later — the game doesn\'t require this specific one.',
      },
    ],
  },
  {
    title: 'Godrick the Grafted',
    url: PLACEHOLDER('godrick-the-grafted'),
    sections: [
      {
        heading: 'Overview',
        text: 'Godrick the Grafted is the demigod boss at the top of Stormveil Castle. His first phase uses a huge sword-arm with wide sweeping attacks; in his second phase he grafts a dragon\'s head onto his arm and gains fire breath attacks alongside his melee combos.',
      },
      {
        heading: 'Location',
        text: 'Godrick is fought at the top of Stormveil Castle, accessed after fighting through the castle interior or by using the side path through the castle\'s lower rampart to skip most of the enemies.',
      },
      {
        heading: 'Strategy',
        text: 'Godrick has a long wind-up on most of his sweeping attacks, which gives room to punish with a heavy hit or two. His grab attack is a one-shot risk at low levels — watch for the reaching animation and roll away rather than through it. Fire resistance and a Spirit Ash summon both help significantly in his second phase, where the added fire breath covers a large area in front of him.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Godrick grants the Godrick\'s Great Rune and Remembrance of the Grafted, which can be traded at the Roundtable Hold for either the Axe of Godrick or the Grafted Dragon incantation.',
      },
    ],
  },
  {
    title: 'Rennala, Queen of the Full Moon',
    url: PLACEHOLDER('rennala-queen-of-the-full-moon'),
    sections: [
      {
        heading: 'Overview',
        text: 'Rennala is the demigod boss of Raya Lucaria Academy. The fight has two distinct stages: a first stage against a giant puppet host that must be staggered by dealing enough damage, followed by a very different second stage against Rennala herself, who casts large sweeping glintstone spells and periodically summons illusory versions of other bosses.',
      },
      {
        heading: 'Location',
        text: 'Rennala is found at the top of Raya Lucaria Academy in Liurnia of the Lakes, reached after finding a way past the academy\'s magic-sealed main gate (the Academy Glintstone Key, found in a cave, opens it — there is also an alternate route through the Church of the Cuckoo).',
      },
      {
        heading: 'Strategy',
        text: 'In the first stage, focus all damage on the puppet host itself, not the swirling glintstone orbs it summons — enough damage staggers it and ends the stage immediately, so a heavy-hitting weapon or spell shortens this part a lot. In the second stage, Rennala\'s big AoE spells are heavily telegraphed with a long charge-up; close the distance and attack during the wind-up, then get clear before the spell resolves. Melee builds generally want to stay aggressive and in her face rather than trying to dodge everything from range.',
      },
      {
        heading: 'Rewards and respeccing',
        text: 'Defeating Rennala grants the Great Rune of the Unborn and, importantly, permanently unlocks her as a full character respec service afterward — talking to her at Raya Lucaria lets you rebuild your stat allocation using Larval Tears found throughout the world.',
      },
    ],
  },
  {
    title: 'Starscourge Radahn',
    url: PLACEHOLDER('starscourge-radahn'),
    sections: [
      {
        heading: 'Overview',
        text: 'Starscourge Radahn is an optional demigod fought on horseback in an open festival arena in Caelid. He combines gravity magic, massive leaping slam attacks, and a devastating gravity-arrow volley, and is generally considered one of the hardest fights available in the early-to-mid game if attempted at a low level.',
      },
      {
        heading: 'Location',
        text: 'Radahn is fought at the Wailing Dunes on the Redmane Castle field in Caelid, and the fight only becomes available after progressing Radahn\'s Festival, which starts by speaking with Gideon Ofnir or by reading messages/talking to certain NPCs pointing toward Redmane Castle.',
      },
      {
        heading: 'Strategy',
        text: 'This fight allows a very large number of summons — up to eight other NPC and player-summoned allies — and using them is not optional for most builds; the extra bodies split Radahn\'s attention and dramatically reduce how often any one summon (including the player) gets targeted. Torrent (the spectral steed) is required for this fight to keep up with Radahn\'s mobility. His gravity-pull arrow volley is one of the few attacks that can one-shot from full health at low levels — the safest response is to stay close to him rather than at range, since the volley is a ranged-punish attack.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Radahn grants a Great Rune and Remembrance of the Starscourge, and also progresses Ranni\'s questline and the wider story by ending the festival and causing a meteor to strike Caelid.',
      },
    ],
  },
  {
    title: 'Morgott, the Omen King',
    url: PLACEHOLDER('morgott-the-omen-king'),
    sections: [
      {
        heading: 'Overview',
        text: 'Morgott, the Omen King guards the throne room of Leyndell, Royal Capital, and is a required boss to progress the main story. He fights similarly to Margit (an earlier illusion of the same character) but is faster, hits harder, and adds curse-based attacks and a longer combo string in his moveset.',
      },
      {
        heading: 'Location',
        text: 'Morgott is fought at the base of the Erdtree inside Leyndell, Royal Capital, after navigating through the capital city.',
      },
      {
        heading: 'Strategy',
        text: 'As with Margit, Morgott is susceptible to bleed and to stagger from heavy poise-damage attacks. His curse-spear throw and curse sword combo both deal significant damage over time on hit, so blocking with high poise or dodging cleanly is worth prioritizing over trading hits. A Spirit Ash summon helps split his aggro the same way it does against Margit.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Morgott grants the Great Rune of the Omen King, Remembrance of the Omen King, and opens the path to descend beneath Leyndell toward the Capital Outskirts and eventually the Mountaintops of the Giants.',
      },
    ],
  },
  {
    title: 'Rykard, Lord of Blasphemy',
    url: PLACEHOLDER('rykard-lord-of-blasphemy'),
    sections: [
      {
        heading: 'Overview',
        text: 'Rykard is a demigod boss fought inside Volcano Manor, appearing as a giant serpent form. Unusually, direct melee or spell damage barely affects him — the fight is built around a specific item, the Serpent-Hunter greatsword, found just before the boss room.',
      },
      {
        heading: 'Location',
        text: 'Rykard is fought at the bottom of Volcano Manor in Mt. Gelmir, reached by progressing the Volcano Manor questline (starting with Tanith or Varre) or by finding the manor\'s entrance directly and fighting through it.',
      },
      {
        heading: 'Strategy',
        text: 'Pick up the Serpent-Hunter greatsword in the room immediately before the fog gate — it is required, since regular weapons deal negligible damage to Rykard\'s serpent body. Use the Serpent-Hunter\'s weapon skill, Storm Blade, at range to deal heavy chip damage, then approach and land melee hits with the sword itself when he\'s close. Most of Rykard\'s attacks are large, slow, and telegraphed, so the fight rewards patience over aggression.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Rykard grants the Great Rune of the Lord of Blasphemy and Remembrance of the Blasphemous, and progresses the Volcano Manor and Tanith questlines.',
      },
    ],
  },
  {
    title: 'Malenia, Blade of Miquella',
    url: PLACEHOLDER('malenia-blade-of-miquella'),
    sections: [
      {
        heading: 'Overview',
        text: 'Malenia is an optional late-game boss and widely considered one of the hardest fights in the game. Her signature attack, Waterfowl Dance, is a fast multi-hit dash combo that can be devastating if not handled correctly. She also inflicts scarlet rot buildup and heals herself on landed hits.',
      },
      {
        heading: 'Location',
        text: 'Malenia is fought at the bottom of Miquella\'s Haligtree, a late-game optional area reached via Ordina, Liturgical Town in the Consecrated Snowfield — which itself requires solving an environmental puzzle (following spectral guidance at night) to unlock the path down.',
      },
      {
        heading: 'Strategy',
        text: 'Waterfowl Dance is the single biggest thing to learn: the safest response for most builds is to run directly away as soon as it begins, since the final hits cover a wide area around her — trying to dodge through it is high-risk unless the timing is well practiced. Because she heals on hit, minimizing how often she lands attacks matters more in this fight than in most others. Scarlet rot resistance or curing it quickly is important in her second phase, where she gains a rot-infused moveset. A tanky Spirit Ash summon (Mimic Tear or similar) is commonly used to draw her aggro during Waterfowl Dance specifically.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Malenia grants Remembrance of the Rot Goddess, exchangeable for the Hand of Malenia katana or the Scarlet Aeonia incantation.',
      },
    ],
  },
  {
    title: 'Fire Giant',
    url: PLACEHOLDER('fire-giant'),
    sections: [
      {
        heading: 'Overview',
        text: 'The Fire Giant is a massive boss fought in the Mountaintops of the Giants. Its huge size means most of its lower body and legs are the only practical melee target for most of the fight; it also throws large area-of-effect fire attacks.',
      },
      {
        heading: 'Location',
        text: 'The Fire Giant is fought at the Forge of the Giants area in the Mountaintops of the Giants, on the path toward Crumbling Farum Azula.',
      },
      {
        heading: 'Strategy',
        text: 'Focus attacks on the legs during the first phase — the giant\'s upper body and head are out of normal melee range until later in the fight. Torrent is very useful for covering distance quickly and dodging the wide fire AoEs. Once the giant kneels partway through the fight, its head becomes a viable target for finishing the encounter faster.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating the Fire Giant grants a large rune reward and Remembrance of the Fire Giant, and clears the way toward Crumbling Farum Azula.',
      },
    ],
  },
  {
    title: 'Maliketh, the Black Blade',
    url: PLACEHOLDER('maliketh-the-black-blade'),
    sections: [
      {
        heading: 'Overview',
        text: 'Maliketh is a required story boss fought in Crumbling Farum Azula. The fight has two phases: a fast, aggressive swordsman phase followed by a much larger wolf-like beast form (Beast Clergyman) with sweeping claw attacks and void-based magic.',
      },
      {
        heading: 'Location',
        text: 'Maliketh is fought within Crumbling Farum Azula, reached after the Fire Giant and after finding a way onto the falling ruins that make up the area.',
      },
      {
        heading: 'Strategy',
        text: 'The first phase (Maliketh\'s sword form) is fast and punishes greedy attacks — this phase rewards patient, single-hit punishes over long combo strings. His destined death attacks (a black afterimage effect) inflict a debuff that prevents healing for a short time, so it\'s worth playing safer right after getting hit by one rather than trading further. The second phase, Beast Clergyman, hits much harder per attack but is generally slower, so a Spirit Ash summon and steady, cautious positioning work well.',
      },
      {
        heading: 'Rewards',
        text: 'Defeating Maliketh grants the Rune of Death (required for the ending sequence) and Remembrance of the Black Blade, and opens the route toward Leyndell\'s post-capital-fall state and the endgame areas.',
      },
    ],
  },
  {
    title: 'Limgrave',
    url: PLACEHOLDER('limgrave'),
    sections: [
      {
        heading: 'Overview',
        text: 'Limgrave is the starting region of the game and the most open-ended early area — most of it is accessible from the very beginning, with a difficulty curve that rewards exploring before heading to Stormveil Castle.',
      },
      {
        heading: 'Points of interest',
        text: 'Key landmarks include the Church of Elleh (an early Site of Grace and merchant), the Gatefront area leading to Stormveil Castle, Murkwater Cave (where Patches can be found), the Third Church of Marika, and Weeping Peninsula to the south, which holds Castle Morne and is a good early detour for extra levels and gear before Stormveil.',
      },
      {
        heading: 'Progression tips',
        text: 'New players are generally better served exploring Limgrave and Weeping Peninsula fully — including picking up Torrent (the spectral steed, granted automatically fairly early via a cutscene) — before challenging Margit and Stormveil Castle, since the region has a meaningful amount of optional leveling and equipment available.',
      },
    ],
  },
  {
    title: 'Stormveil Castle',
    url: PLACEHOLDER('stormveil-castle'),
    sections: [
      {
        heading: 'Overview',
        text: 'Stormveil Castle is the first major legacy dungeon, home to Godrick the Grafted. It is guarded at its main entrance by Margit, the Fell Omen.',
      },
      {
        heading: 'Navigation',
        text: 'There are two main approaches: fighting through the heavily-guarded main gate and courtyard (which includes a ballista that can one-shot from range), or taking a side path — accessible by speaking to Gatekeeper Gostoc at the main gate Site of Grace and choosing the option to be let in the side way — which skips most of the courtyard\'s ranged threats.',
      },
      {
        heading: 'Notable rooms',
        text: 'The castle contains multiple optional item rooms and a captured merchant (the Nomadic Merchant held in a cage) who can be freed for later trading. The path to Godrick winds upward through the castle interior and ends at the top of the structure.',
      },
    ],
  },
  {
    title: 'Liurnia of the Lakes',
    url: PLACEHOLDER('liurnia-of-the-lakes'),
    sections: [
      {
        heading: 'Overview',
        text: 'Liurnia of the Lakes is the second major region, a wide flooded lake area accessed from Limgrave via the Altus route or through Stormveil Castle\'s far side. It is notably more focused on sorcery and academy-related content than Limgrave.',
      },
      {
        heading: 'Points of interest',
        text: 'Raya Lucaria Academy (home to Rennala) dominates the region, along with the Road of Iniquity, Caria Manor (Ranni\'s starting location), the Church of Vows, and several notable NPCs including Sorcerer Rogier and Preceptor Seluvis.',
      },
      {
        heading: 'Progression tips',
        text: 'Caria Manor, reached from northern Liurnia, is the starting point of Ranni the Witch\'s questline — an important early branch of the main story with its own boss, Royal Knight Loretta, guarding the manor.',
      },
    ],
  },
  {
    title: 'Caelid',
    url: PLACEHOLDER('caelid'),
    sections: [
      {
        heading: 'Overview',
        text: 'Caelid is a heavily scarred, dangerous region east of Limgrave, notable for widespread scarlet rot, aggressive enemies, and being significantly higher difficulty than a player is likely to be ready for if they wander in directly from Limgrave at a low level.',
      },
      {
        heading: 'Points of interest',
        text: 'Key landmarks include Redmane Castle and the Wailing Dunes (site of Radahn\'s Festival), the Gowry\'s Shack area (relevant to Millicent\'s questline and to poison/scarlet rot builds), Sellia, Town of Sorcery, and Fort Faroth.',
      },
      {
        heading: 'Progression tips',
        text: 'Most players are better off visiting Caelid after clearing Stormveil Castle and gaining some levels — the region is intentionally much harder than Limgrave. It\'s also where the Bloodhound\'s Fang and several other strong early weapons can be found for players willing to risk it.',
      },
    ],
  },
  {
    title: 'Leyndell, Royal Capital',
    url: PLACEHOLDER('leyndell-royal-capital'),
    sections: [
      {
        heading: 'Overview',
        text: 'Leyndell, Royal Capital is a major legacy dungeon and the political/religious heart of the Lands Between, home to the Erdtree and Morgott, the Omen King.',
      },
      {
        heading: 'Access',
        text: 'Leyndell is reached from the Altus Plateau, typically after obtaining an Elden Ring-related item or after progressing enough of the main story to be directed there — Altus Plateau itself is reached via the Grand Lift of Dectus (which needs two halves of a specific key item) or via a hidden route through Volcano Manor.',
      },
      {
        heading: 'Notable content',
        text: 'The capital is large and vertical, with numerous optional side paths, merchants, and a notable questline involving the Fingerslayer Blade and Brother Corhyn/Goldmask. Morgott is fought at the base of the Erdtree at the heart of the city.',
      },
    ],
  },
  {
    title: 'Altus Plateau',
    url: PLACEHOLDER('altus-plateau'),
    sections: [
      {
        heading: 'Overview',
        text: 'Altus Plateau is a large mid-game region that serves as a hub connecting Liurnia, Mt. Gelmir, and Leyndell. It represents a significant jump in enemy difficulty from Limgrave and Liurnia.',
      },
      {
        heading: 'Points of interest',
        text: 'Key landmarks include the Shaded Castle, the Writheblood Ruins, and Mt. Gelmir to the west, which contains Volcano Manor and Rykard\'s boss fight.',
      },
      {
        heading: 'Access',
        text: 'The main route up is the Grand Lift of Dectus, which requires both halves of the Dectus Medallion (found in Fort Haight and Fort Faroth); an alternate, earlier route exists through Volcano Manor for players who find it first.',
      },
    ],
  },
  {
    title: 'Mountaintops of the Giants',
    url: PLACEHOLDER('mountaintops-of-the-giants'),
    sections: [
      {
        heading: 'Overview',
        text: 'The Mountaintops of the Giants is a late-game snow region reached after Leyndell, home to the Fire Giant and the path toward Crumbling Farum Azula.',
      },
      {
        heading: 'Points of interest',
        text: 'Key landmarks include the Forge of the Giants (Fire Giant\'s arena), the Church of Repose, and Castle Sol — which houses an optional boss, Commander Niall, and connects to the Consecrated Snowfield.',
      },
      {
        heading: 'Progression tips',
        text: 'This region is reached via the Grand Lifts near Leyndell after the capital has fallen in the story. It marks the transition into the game\'s endgame areas.',
      },
    ],
  },
  {
    title: 'Sites of Grace and fast travel',
    url: PLACEHOLDER('sites-of-grace'),
    sections: [
      {
        heading: 'Overview',
        text: 'Sites of Grace are the game\'s checkpoint system — resting at one restores health, flasks, and most consumables, respawns most regular enemies, and allows leveling up (once Melina has been met) or fast-traveling to any other discovered Site of Grace.',
      },
      {
        heading: 'Usage',
        text: 'Fast travel can be used almost anywhere outdoors, but is disabled in most boss arenas, legacy dungeon interiors mid-encounter, and a few specific story moments. Following the golden guidance lights that emanate from a Site of Grace points toward the next major story objective, though it isn\'t required to follow them.',
      },
    ],
  },
  {
    title: 'Flask upgrades',
    url: PLACEHOLDER('flask-upgrades'),
    sections: [
      {
        heading: 'Overview',
        text: 'The Flask of Crimson Tears (HP) and Flask of Cerulean Tears (FP) are the core healing and mana resources, refilled at Sites of Grace. Two separate upgrade paths improve them: Golden Seeds increase the total number of flask charges available, and Sacred Tears increase how much each flask charge restores.',
      },
      {
        heading: 'Where to upgrade',
        text: 'Golden Seeds are turned in at Golden Seed–marked trees (Erdtree saplings) found throughout the world, and are consumed to add more charges. Sacred Tears are turned in at specific Churches (such as the Third Church of Marika in Limgrave) to increase flask potency.',
      },
      {
        heading: 'Progression tips',
        text: 'Both upgrade types are worth prioritizing early — a handful of Golden Seeds and even a single Sacred Tear make a significant difference in survivability well before the flask upgrades feel "optional."',
      },
    ],
  },
  {
    title: 'Spirit Ashes and Spirit Calling Bell',
    url: PLACEHOLDER('spirit-ashes'),
    sections: [
      {
        heading: 'Overview',
        text: 'Spirit Ashes summon an AI-controlled ally to help in most (though not all) boss fights and open-world encounters. The Spirit Calling Bell, required to use them, is given automatically early in the game after a short questline involving a knight named Renna/Melina.',
      },
      {
        heading: 'Usage',
        text: 'Spirit Ashes have their own FP cost to summon and can be leveled up separately using Grave Gloveworts (for basic ashes) or Ghost Gloveworts (for stronger, "greater" spirit ashes) at Roundtable Hold. Popular general-purpose summons include the Mimic Tear (which copies the player\'s own build and equipment) and Latenna the Albinauric for ranged-focused builds.',
      },
      {
        heading: 'Progression tips',
        text: 'Using a Spirit Ash summon in a difficult fight is not "cheating" — the game is balanced around them being available, and they meaningfully help by splitting boss aggro so the player takes less sustained damage.',
      },
    ],
  },
  {
    title: 'Great Runes',
    url: PLACEHOLDER('great-runes'),
    sections: [
      {
        heading: 'Overview',
        text: 'Great Runes are dropped by demigod bosses (Godrick, Rennala, Radahn, Morgott, Rykard, Mohg, Malenia) and provide a powerful passive stat buff when active — but they must first be restored at a Divine Tower before they can be used.',
      },
      {
        heading: 'Activation',
        text: 'After defeating a demigod, the corresponding Divine Tower (a specific tower tied to that region) must be visited to unlock the Great Rune. Once unlocked, the rune is equipped in the Prayer Room menu and then activated using a Rune Arc consumable, which lasts until death.',
      },
    ],
  },
  {
    title: 'Respeccing your character',
    url: PLACEHOLDER('respeccing'),
    sections: [
      {
        heading: 'Overview',
        text: 'Elden Ring allows full stat redistribution (a "respec") using a consumable called a Larval Tear, at Rennala\'s Great Library room in Raya Lucaria Academy — but only after Rennala herself has been defeated as a boss.',
      },
      {
        heading: 'Usage',
        text: 'Each respec consumes one Larval Tear, and total character level and total item/spell requirements aren\'t affected — only where existing stat points are allocated changes. Larval Tears are a limited but replenishable resource found from certain enemy drops and purchasable in small quantities from specific merchants.',
      },
    ],
  },
  {
    title: "Ranni's questline (start)",
    url: PLACEHOLDER('rannis-questline-start'),
    sections: [
      {
        heading: 'Overview',
        text: 'Ranni the Witch\'s questline is one of the most significant optional storylines in the game, leading to an alternate ending. It begins in Liurnia of the Lakes.',
      },
      {
        heading: 'How to start',
        text: 'The questline begins at Ranni\'s Rise, a tower in northern Liurnia reached through Caria Manor, after defeating Royal Knight Loretta (the boss guarding the manor). Speaking with Ranni inside the tower kicks off the questline.',
      },
      {
        heading: 'Early steps',
        text: 'Early on, the quest sends the player to speak with Sorcerer Rogier at the Raya Lucaria area and later to seek out an entity called the Nokron, Eternal City area, which is only reachable after defeating Starscourge Radahn (his death causes a meteor to strike Caelid, opening a path down). The questline continues through several more named NPCs including Blaidd and Seluvis, and is long enough that following in-game item descriptions and NPC dialogue closely is the most reliable way to avoid missing a step.',
      },
    ],
  },
  {
    title: "Volcano Manor and Tanith's questline (start)",
    url: PLACEHOLDER('volcano-manor-start'),
    sections: [
      {
        heading: 'Overview',
        text: 'Volcano Manor is both a location (home to Rykard, Lord of Blasphemy) and the starting point of a questline involving assassinating other notable NPCs across the world on behalf of Tanith and the Volcano Manor faction.',
      },
      {
        heading: 'How to start',
        text: 'Volcano Manor can be found directly in Mt. Gelmir, or an invitation can be received earlier by finding and reading a specific summon sign as a bloody finger in Limgrave, or via Patches. Speaking with Tanith inside the manor begins the questline of hunting specific targets.',
      },
    ],
  },
  {
    title: 'Weapon Ashes of War and Infusions',
    url: PLACEHOLDER('ashes-of-war'),
    sections: [
      {
        heading: 'Overview',
        text: 'Ashes of War let a player change both a weapon\'s skill (its special move, triggered with the weapon skill button) and, on most weapons, its damage-scaling infusion (such as Heavy, Keen, or elemental infusions like Fire or Magic).',
      },
      {
        heading: 'Usage',
        text: 'Ashes of War are applied at a Site of Grace, and most weapons can hold any Ash of War (a small number of unique or "innate" weapons cannot be changed). Infusions change which stats the weapon scales with — for example, a Keen infusion shifts scaling toward Dexterity, while a Heavy infusion shifts it toward Strength.',
      },
    ],
  },
];

export const ALL_PAGES: ArticlePage[] = [
  ...ORIGINAL_PAGES,
  ...STARTING_CLASS_PAGES,
  ...KEEPSAKE_PAGES,
  ...STAT_PAGES,
  ...GENERAL_STATS_PAGES,
  ...DAMAGE_TYPE_PAGES,
  ...STATUS_EFFECT_PAGES,
  ...EVERGAOL_PAGES,
  ...CHURCH_PAGES,
  ...GREAT_ENEMY_PAGES,
  ...KEY_ITEM_PAGES,
  ...LIMGRAVE_DUNGEON_PAGES,
  ...LIURNIA_CAELID_DUNGEON_PAGES,
  ...LATE_GAME_DUNGEON_PAGES,
  ...CHEST_PAGES,
  ...QUESTLINE_PAGES,
  ...TALISMAN_PAGES,
  ...INCANTATION_PAGES,
];

export const originalContentSource: TextSource = {
  async fetchPages(): Promise<ArticlePage[]> {
    return ALL_PAGES;
  },
};
