import type { ArticlePage } from '../types.js';

// Ashes of War. Weapon-type compatibility and effect descriptions supplied
// directly by the user, not scraped or from our own recall — same
// precision-sourcing rule as the rest of the corpus. Original phrasing
// throughout; compatibility restrictions are called out explicitly since
// they're as load-bearing as the effect itself for a build-advice tool.
const PLACEHOLDER = (slug: string) => `questbot://guide/ash-of-war/${slug}`;

export const ASH_OF_WAR_PAGES: ArticlePage[] = [
  {
    title: 'Heavy affinity Ashes of War',
    url: PLACEHOLDER('heavy'),
    sections: [
      { heading: "Troll's Roar", text: 'Usable on large and colossal swords, axes, and hammers. Generates a powerful shockwave, then slams the weapon down.' },
      { heading: 'Endure', text: 'Usable on all melee armaments. Assumes an anchored stance that briefly boosts poise and reduces damage taken while braced against incoming attacks.' },
      { heading: 'Ground Slam', text: 'Usable on all melee armaments. Jumps high into the air and crashes down ahead, sending a powerful shockwave outward in all directions.' },
      { heading: 'Earthshaker', text: "Usable on greataxes, warhammers, and colossal weapons. Thrusts the armament into the ground, gathers strength, then unleashes an earth-shaking shockwave; a follow-up strong attack sweeps the armament in a wide strike." },
      { heading: "Hoarah Loux's Earthshaker", text: 'Usable on all melee armaments. Slams both hands onto the ground to violently shake the earth and unleash a shockwave, with an additional input slamming the ground again.' },
      { heading: 'War Cry', text: 'Usable on all melee armaments except daggers, thrusting swords, and whips. Rallies the spirit to increase attack power; while active, strong attacks become charging attacks.' },
      { heading: 'Barbaric Roar', text: 'Usable on all melee armaments except daggers, thrusting swords, and whips. Increases attack power and turns strong attacks into savage combo attacks.' },
      { heading: "Braggart's Roar", text: "Usable on all melee armaments except daggers, thrusting swords, and whips. A boastful roar that raises attack power, defense, and stamina recovery speed." },
      { heading: 'Stamp (Upward Cut)', text: 'Usable on swords, axes, and hammers, excepting small and medium swords. Braces the armament in a low stance that prevents recoil from most enemy attacks; a follow-up strong attack delivers an upward strike.' },
      { heading: 'Stamp (Sweep)', text: 'Usable on swords, axes, and hammers, excepting small and medium swords. Braces the armament in a low stance that prevents recoil from most enemy attacks; a follow-up strong attack delivers a sweeping strike.' },
      { heading: 'Wild Strikes', text: 'Usable on axes and hammers. Swings the armament with wild abandon; holding the input continues the swinging, which can be followed up with a normal or strong attack.' },
      { heading: "Lion's Claw", text: "Usable on swords, axes, and hammers, excepting small armaments and thrusting swords. Skill of the Redmanes who fought alongside General Radahn — a forward somersault that strikes foes with the armament." },
      { heading: 'Cragblade', text: 'Usable on all melee armaments except whips. Reinforces the weapon with earth.' },
      { heading: 'Kick', text: "Usable on all melee armaments. Pushes an enemy back with a high kick; effective against guarding enemies and can break a foe's stance." },
    ],
  },
  {
    title: 'Keen affinity Ashes of War',
    url: PLACEHOLDER('keen'),
    sections: [
      { heading: 'Quickstep', text: 'Usable on all melee armaments. A quickstep maneuver favored by the crafty and fleet of foot, allowing the user to circle around a lock-on target.' },
      { heading: "Bloodhound's Step", text: 'Usable on all melee armaments. Grants temporary invisibility while dodging at high speed, moving faster and farther than a regular quickstep — can also circle around lock-on targets.' },
      { heading: 'Raptor of the Mists', text: 'Usable on all melee armaments. Ducks into a low stance and momentarily vanishes; if an enemy attack connects, avian wings allow a quick escape into the air.' },
      { heading: "Beast's Roar", text: 'Usable on all melee armaments. Unleashes a beastly roar that rends the air as a forward-traveling projectile.' },
      { heading: 'Spinning Slash', text: 'Usable on swords, axes, and polearms, excepting colossal weapons. Slashes foes while the body spins, with an additional input allowing a follow-up attack.' },
      { heading: 'Impaling Thrust', text: "Usable on all thrust-capable armaments except colossal weapons. Builds power, then lunges forward with a strong thrust capable of piercing an enemy's guard." },
      { heading: 'Piercing Fang', text: 'Usable on all medium and large thrust-capable armaments. Used by Yura, the Bloody Finger Hunter — starts with the blade held horizontally for an unblockable powerful thrust.' },
      { heading: 'Repeating Thrust', text: 'Usable on all thrust-capable armaments except colossal weapons. Twists to build power, then unleashes a flurry of thrusts; slow to build up but very powerful.' },
      { heading: 'Double Slash', text: 'Usable on slash-capable swords and polearms, excepting colossal weapons. A crossing slash attack from a low stance, with repeated inputs allowing up to two follow-up attacks.' },
      { heading: 'Sword Dance', text: 'Usable on slash-capable swords, axes, and polearms, excepting colossal weapons and great spears. Quickly closes in with a series of spinning upward slashes, finished with a downward slash on an additional input.' },
      { heading: 'Unsheathe', text: 'Usable on katanas only. Sheathes the blade at the hip in a composed stance, then a normal or strong attack delivers a swift slash.' },
    ],
  },
  {
    title: 'Quality affinity Ashes of War',
    url: PLACEHOLDER('quality'),
    sections: [
      { heading: "Royal Knight's Resolve", text: "Usable on all melee armaments. Holds the flat of the armament to the face and pledges resolve, greatly powering up the next attack." },
      { heading: 'Storm Blade', text: 'Usable on all slash-capable melee armaments. Wraps the armament in a stormy blade that can be fired in rapid succession.' },
      { heading: 'Storm Assault', text: 'Usable on thrust-capable polearms, heavy thrusting swords, and twinblades. Leaps forward through surrounding storm winds and thrusts the armament downward, producing more storm winds at the point of impact.' },
      { heading: 'Stormcaller', text: 'Usable on slash-capable swords, axes, hammers, and polearms, excepting small and colossal weapons. Spins the armament to create surrounding storm winds, with repeated inputs allowing up to two follow-up attacks.' },
      { heading: 'Storm Stomp', text: 'Usable on all melee armaments. Stomps hard on the ground to kick up a momentary storm.' },
      { heading: 'Vacuum Slice', text: 'Usable on swords and axes, excepting small and colossal axes. Holds the armament aloft, surrounding it with a shearing vacuum, then launches it forward as a blade-like projectile.' },
      { heading: 'Phantom Slash', text: "Usable on polearms and twinblades only, excepting great spears. Summons an apparition of the Night's Cavalry's former instructor, guiding a joint lunging upward swing, with an additional input allowing a follow-up attack." },
      { heading: 'Determination', text: 'Usable on all melee armaments. Holds the flat of the armament to the face and pledges resolve, powering up the next attack.' },
      { heading: 'Square Off', text: "Usable on straight swords only. Starts with the sword held level; a normal attack slashes upward through an enemy's guard, or a strong attack performs a running thrust." },
      { heading: 'Charge Forth', text: 'Usable on thrust-capable polearms, heavy thrusting swords, and twinblades. Quickly charges forward with the armament at the hip, carrying momentum into a thrust; holding the input covers a greater distance.' },
      { heading: 'Spinning Strikes', text: 'Usable on polearms, excepting great spears. Continuous spinning attacks that can be held to continue, followed up with a normal or strong attack, and nullify projectiles such as arrows while spinning.' },
      { heading: 'Giant Hunt', text: 'Usable on large and colossal thrust-capable weapons, spears, and twinblades. Steps forward from a low stance, carrying momentum into a sudden upward thrust — developed for confronting gigantic foes.' },
    ],
  },
  {
    title: 'Magic affinity Ashes of War',
    url: PLACEHOLDER('magic'),
    sections: [
      { heading: 'Glintstone Pebble', text: 'Usable on thrust-capable swords and polearms, excepting colossal weapons. Employs the glintstone sorcery of the same name; a follow-up strong attack chains into a lunging thrust while still imbued with glintstone.' },
      { heading: 'Glintblade Phalanx', text: 'Usable on thrust-capable swords and polearms, excepting colossal weapons. Creates glintstone blades overhead that automatically attack enemies who get close enough.' },
      { heading: 'Carian Greatsword', text: 'Usable on swords, excepting colossal weapons. Transforms the blade into a magical greatsword and swings it down; can be charged to increase its power.' },
      { heading: 'Carian Grandeur', text: 'Usable on swords, excepting colossal weapons. Transforms the blade into a magical greatsword and swings it down; can be charged up to two levels for greater power.' },
      { heading: 'Spinning Weapon', text: 'Usable on small and medium swords, axes, hammers, polearms, and staves, excepting great spears. A defensive skill employed by Carian princesses — lifts the armament into the air, spinning it violently to strike anything it touches repeatedly.' },
      { heading: "Loretta's Slash", text: "Usable on polearms and twinblades. Skill of Loretta the Royal Knight — leaps forward imbuing the blade with glintstone, then descends into an accelerating sweeping slash." },
      { heading: 'Gravitas', text: 'Usable on all melee armaments except small ones. Pierces the ground with the armament, damaging foes as a surge of gravity draws them in.' },
      { heading: 'Waves of Darkness', text: 'Usable on greataxes, warhammers, colossal weapons, and — despite its own description — great spears. Plunges the armament into the ground to release three waves of darkness.' },
      { heading: "Thops's Barrier", text: 'Usable on small and medium shields only. Erects a magical forcefield while swinging the shield to deflect sorceries and incantations; can also be used as a regular parry.' },
      { heading: 'Carian Retaliation', text: 'Usable on small and medium shields only. Dispels incoming sorceries and incantations, transforming the magic into retaliatory glintblades.' },
    ],
  },
  {
    title: 'Fire affinity Ashes of War',
    url: PLACEHOLDER('fire'),
    sections: [
      { heading: 'Eruption', text: 'Usable on greatswords, greataxes, great hammers, heavy thrusting swords, and colossal weapons. Slamming the armament into the ground spawns roiling lava, which also spouts up on release.' },
      { heading: 'Flaming Strike', text: 'Usable on all melee armaments except colossal weapons and whips. Emits flame in a wide frontward arc; a follow-up strong attack performs a lunging sweeping strike that also coats the armament in fire.' },
      { heading: 'Flame of the Redmanes', text: 'Usable on all melee armaments. Skill of the Redmanes who fought alongside General Radahn — produces a powerful burst of flames in a wide frontward arc.' },
    ],
  },
  {
    title: 'Flame Art affinity Ashes of War',
    url: PLACEHOLDER('flame-art'),
    sections: [
      { heading: "Prelate's Charge", text: 'Usable on large and colossal axes and hammers. Slams the armament into the ground to create a surge of flames, then charges in; holding the input continues the charge.' },
      { heading: 'Black Flame Tornado', text: 'Usable on polearms and twinblades. Spins the armament overhead, then plunges it into the ground to summon a raging vortex of black flames; holding the input creates an initial flame tornado while spinning.' },
    ],
  },
  {
    title: 'Lightning affinity Ashes of War',
    url: PLACEHOLDER('lightning'),
    sections: [
      { heading: 'Thunderbolt', text: 'Usable on all melee armaments. Raises the armament aloft to call down a bolt of lightning, which can be fired in rapid succession.' },
      { heading: 'Lightning Slash', text: 'Usable on swords, axes, and hammers. Calls down a bolt of lightning into the armament, then swings it down to create an explosive shock; retains the lightning enchantment for a while.' },
      { heading: 'Lightning Ram', text: 'Usable on all melee armaments. Inspired by tumbling rams — lets out a bleat, then tumbles forward clad in lightning, with tumbles repeatable in rapid succession.' },
    ],
  },
  {
    title: 'Sacred affinity Ashes of War',
    url: PLACEHOLDER('sacred'),
    sections: [
      { heading: 'Holy Ground', text: 'Usable on shields only. Raises the shield to create an Erdtree-consecrated area that continuously restores HP and boosts defense for the caster and allies standing inside it.' },
      { heading: 'Sacred Ring of Light', text: 'Usable on polearms only, excepting great spears. Gathers a sacred ring of light and fires it forward; can be fired in rapid succession.' },
      { heading: 'Sacred Order', text: 'Usable on all melee armaments. Skill of the Golden Order fundamentalist knights — a salute that grants the armament holy essence, highly effective against Those Who Live in Death.' },
      { heading: 'Shared Order', text: 'Usable on all melee armaments. Skill of the Golden Order fundamentalist knights — grants the armament and nearby allies holy essence, highly effective against Those Who Live in Death.' },
      { heading: 'Golden Land', text: "Usable on greataxes, warhammers, and colossal weapons. Thrusts the armament into the ground, gathers strength, then unleashes a blast of sacred energy that coalesces into golden darts; a follow-up strong attack delivers a sweeping strike." },
      { heading: 'Golden Slam', text: 'Usable on all melee armaments. Skill of the avatars who protect Minor Erdtrees — jumps high into the air and crashes down ahead, sending golden shockwaves outward in all directions.' },
      { heading: 'Golden Vow', text: "Usable on all melee armaments. Skill passed down among the knights of the capital — raises the armament aloft and pledges to honor the Erdtree, granting the caster and nearby allies increased attack power and defense." },
      { heading: 'Golden Parry', text: 'Usable on small and medium shields only. Performs an Erdtree incantation and swings the shield to deflect enemy attacks and break their stance, effective even at a slight distance.' },
      { heading: 'Vow of the Indomitable', text: 'Usable on shields only. Skill of the ancient warriors of the Erdtree — holds the shield aloft to imbue the caster with golden power, granting momentary invincibility.' },
      { heading: 'Sacred Blade', text: 'Usable on melee armaments except whips, fists, and claws. Grants the armament holy essence on attacks and fires off a golden blade projectile; retains holy essence for a while.' },
      { heading: 'Prayerful Strike', text: 'Usable on axes and hammers. Raises the armament aloft in prayer, then slams it into the ground — a successful hit restores HP to the caster and nearby allies.' },
    ],
  },
  {
    title: 'Poison affinity Ashes of War',
    url: PLACEHOLDER('poison'),
    sections: [
      { heading: 'Poisonous Mist', text: 'Usable on all melee armaments except whips, fists, and claws. Coats the armament in poison; slashing spreads toxic mist forward, and the armament retains its poison for a while.' },
      { heading: 'Poison Moth Flight', text: 'Usable on small and medium swords, excepting twinblades. Slashes with a poison-infused blade; a follow-up strike lands significant extra damage on an already-poisoned foe.' },
    ],
  },
  {
    title: 'Blood affinity Ashes of War',
    url: PLACEHOLDER('blood'),
    sections: [
      { heading: 'Blood Blade', text: 'Usable on small and medium swords only. Wounds the caster to coat the armament with blood, then unleashes an airborne blood blade that causes hemorrhaging; can be fired in rapid succession.' },
      { heading: 'Bloody Slash', text: "Usable on swords, excepting colossal weapons. Blood Oath skill granted by the Lord of Blood — from a low stance, coats the blade in the caster's own blood to unleash a rending blood slash in a wide arc." },
      { heading: 'Blood Tax', text: "Usable on all thrust-capable armaments except colossal weapons. Blood Oath skill granted by the Lord of Blood — twists to build power, then unleashes a flurry of thrusts that rob the target of both blood and HP." },
      { heading: 'Seppuku', text: 'Usable on thrust-capable swords and polearms, excepting small and colossal weapons. Plunges the blade into the stomach to stain it with blood, increasing attack power and improving the ability to inflict blood loss.' },
    ],
  },
  {
    title: 'Cold affinity Ashes of War',
    url: PLACEHOLDER('cold'),
    sections: [
      { heading: 'Chilling Mist', text: 'Usable on all melee armaments except whips, fists, and claws. Coats the armament in frost, then slashes to spread frigid mist forward; the armament retains its frost for a while.' },
      { heading: 'Hoarfrost Stomp', text: 'Usable on all melee armaments. Stomps hard to spread a trail of freezing mist along the ground, applying the frost status effect.' },
      { heading: 'Ice Spear', text: 'Usable on thrust-capable polearms and twinblades. Skill of the warriors who served Lunar Princess Ranni — spins the armament to release cold magic, then channels it into a piercing spear of ice.' },
    ],
  },
  {
    title: 'Occult affinity Ashes of War',
    url: PLACEHOLDER('occult'),
    sections: [
      { heading: 'Spectral Lance', text: 'Usable on polearms only, excepting reapers. Skill of the headless Mausoleum Knights — hurls a phantasmic spear at foes.' },
      { heading: 'Lifesteal Fist', text: 'Usable on fists and claws. A slow, controlled punch with an energy-infused fist that renders foes unconscious and steals their HP; only effective against foes of human build.' },
      { heading: "White Shadow's Lure", text: 'Usable on all melee armaments. A brief, silent prayer that creates a white shadow, luring foes of human build who are not yet in combat and drawing their aggression; also effective on demi-humans even mid-combat.' },
      { heading: "Assassin's Gambit", text: 'Usable on small and medium straight swords and thrusting swords. Masks the caster\'s presence at the cost of a self-inflicted wound, granting near-invisibility and silenced footsteps.' },
    ],
  },
  {
    title: 'Standard affinity Ashes of War',
    url: PLACEHOLDER('standard'),
    sections: [
      { heading: 'Shield Bash', text: 'Usable on shields only. Braces behind the shield, then uses bodyweight to ram foes while maintaining the guarding stance; weaker enemies are shoved back and can be staggered.' },
      { heading: 'Shield Crash', text: 'Usable on shields only. Two-hands the shield and charges forward while maintaining guard; weaker enemies are shoved back and can be staggered, and holding the input extends the charge.' },
      { heading: 'Barricade Shield', text: 'Usable on shields only. Focuses energy into the shield, temporarily hardening it to deflect greater blows.' },
      { heading: 'No Skill', text: "Usable on shields and torches. This armament has no skill of its own — if the armament in the other hand has a skill, that skill is used instead." },
      { heading: 'Mighty Shot', text: "Usable on light bows and longbows. Archery skill from an oblique stance — readies the bow, then pulls the bowstring to its limit to enhance the shot's power, penetrating an enemy's guard." },
      { heading: 'Through and Through', text: 'Usable on greatbows only. Powerful archery skill from an oblique stance — readies the greatbow, then twists the bowstring to fire a mighty greatarrow capable of penetrating through enemies.' },
      { heading: 'Barrage', text: 'Usable on light bows only. Archery skill with the bow held horizontally — readies the bow, then fires a rapid succession of shots faster than the eye can see.' },
      { heading: 'Sky Shot', text: 'Usable on light bows and longbows. Archery skill from a low stance — readies the bow, then fires an arrow high into the air, arcing down to strike the enemy from above.' },
      { heading: 'Enchanted Shot', text: 'Usable on light bows and longbows. Gathers spiritual essence within the arrow, letting it fly faster than a regular shot and change trajectory to follow the target.' },
      { heading: 'Rain of Arrows', text: 'Usable on all bows. Archery skill from a low stance — readies the bow, then fires a burst of arrows into the sky to shower the enemy with projectiles.' },
      { heading: 'Parry', text: "Usable on daggers, curved swords, thrusting swords, fists, claws, and small/medium shields. Timed against a foe's melee attack to deflect it and break their stance, opening them up for a critical hit." },
      { heading: 'Storm Wall', text: 'Usable on small and medium shields only. Swings the shield to create a wall of storm winds in front of the caster, deflecting arrows and other physical projectiles; can also be used as a regular parry.' },
    ],
  },
  {
    title: 'Duplication items',
    url: PLACEHOLDER('duplication'),
    sections: [
      { heading: 'Lost Ashes of War', text: "An empty Ash of War, devoid of any memory of battle. Unable to apply any affinity in its current state, but Smithing Master Hewg of the Roundtable Hold can use it to recreate other Ashes of War, letting the copy pass into becoming the genuine article." },
    ],
  },
];
