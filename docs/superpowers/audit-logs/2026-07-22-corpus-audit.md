# Corpus audit: incantations.ts + sorceries.ts vs. EldenRingSpellComparer data

**Scope note:** The original plan for this audit covered 7 categories (Talismans,
Incantations, Sorceries, Consumables, Ashes of War, Crystal Tears, Whetstones) against ERDB.
ERDB's `source` command failed against a current, DLC-patched game install (`Unknown DCX
format` — the tool hasn't been updated since July 2023) and no replacement data source was
found for Talismans, Consumables, Crystal Tears, Whetstones, or Ashes of War. Those five
categories are deferred, not audited here.

A working replacement data source was found for exactly two categories — Incantations and
Sorceries — via `Spells/data/spells.js` from
[jerpdoesgames/EldenRingSpellComparer](https://github.com/jerpdoesgames/EldenRingSpellComparer)
(GPL-3.0), data-mined from the game's own files. That data is **base-game only** (no Shadow
of the Erdtree content), so any spell this project's corpus has that's DLC-only, or that
doesn't otherwise name-match, naturally falls out as "unmatched" below — no DLC-detection
logic was needed or used.

Checked fields: FP cost (base + per-second while channeled), memory slot count, Intelligence /
Faith / Arcane requirements, and Stamina cost — i.e. every number this project's existing prose
states. Attack-rating numbers exist in the source data but aren't stated in the existing prose,
so they weren't added (out of scope — see `task-7-report.md`).

Method: exact name match after lowercasing/trimming (no upgrade-tier suffix stripping needed —
incantation/sorcery names don't carry "+1"/"+2" suffixes the way weapon names do). Corrections
touch only the mismatched number (and, for memory-slot corrections, the "slot"/"slots"
pluralization directly tied to that number) — no other wording was changed.

## incantations.ts

129 checked - 18 corrected - 29 unmatched - 82 unchanged

### Corrected (18)

| Heading | Field | Old → New |
|---|---|---|
| Dragonclaw | Stamina | 50 → 35 |
| Dragonmaw | Stamina | 72 → 50 |
| Greyoll's Roar | Stamina | 80 → 72 |
| Ancient Dragons' Lightning Spear | Stamina | 41 → 29 |
| Fortissax's Lightning Spear | Stamina | 52 → 42 |
| Frozen Lightning Spear | Stamina | 45 → 39 |
| Lansseax's Glaive | Stamina | 55 → 45 |
| Lightning Strike | Stamina | 37 → 32 |
| Aspects of the Crucible: Horns | Stamina | 49 → 42 |
| Aspects of the Crucible: Tail | Stamina | 42 → 38 |
| Black Blade | Stamina | 44 → 51 |
| Noble Presence | Stamina | 28 → 35 |
| Scouring Black Flame | Stamina | 36 → 29 |
| Flame, Fall Upon Them | Stamina | 40 → 10 |
| Giantsflame Take Thee | Stamina | 43 → 34 |
| Inescapable Frenzy | FP | 22 → 32 |
| Pest Threads | Stamina | 35 → 29 |
| Scarlet Aeonia | Stamina | 50 → 66 |

All corrected incantations were Stamina-cost mismatches except Inescapable Frenzy, which was an FP-cost mismatch.

### Unmatched (29 — no data to check against; left untouched)

Bayle's Flame Lightning, Bayle's Tyranny, Ghostflame Breath, Dragonbolt of Florissax,
Electrocharge, Knight's Lightning Spear, Aspects of the Crucible: Bloom, Aspects of the
Crucible: Thorns, Heal from Afar, Land of Shadow, Minor Erdtree, Wrath from Afar, Furious
Blade of Ansbach, Flame, of the Fell God, Fire Serpent, Messmer's Orb, Rain of Fire, Midra's
Flame of Frenzy, Pest-Thread Spears, Rotten Butterflies, Divine Beast Tornado, Divine Bird
Feathers, Giant Golden Arc, Golden Arcs, Roar of Rugalea, Spira, Watchful Spirit, Light of
Miquella, Multilayered Ring of Light

Most of these are recognizably Shadow of the Erdtree additions (Bayle, Messmer, Midra,
Rugalea, Miquella content), which is exactly what "base-game-only data" naturally excludes —
consistent with the brief's expectation, no DLC-detection judgment call was needed.

## sorceries.ts

84 checked - 8 corrected - 15 unmatched - 61 unchanged

### Corrected (8)

| Heading | Field | Old → New |
|---|---|---|
| Comet | Stamina | 31 → 35 |
| Founding Rain of Stars | Stamina | 31 → 37 |
| Gavel of Haima | Stamina | 38 → 46 |
| Glintstone Cometshard | Stamina | 28 → 30 |
| Rock Blaster | FP/sec while channeled | 5 → 4 |
| Stars of Ruin | Stamina | 29 → 33 |
| Thops's Barrier | FP/sec while channeled | 7 → 0 |
| Shattering Crystal | Stamina | 30 → 35 |

**Concern on Thops's Barrier:** the source data says this spell has no per-second channel cost
(`fpCostExtra: 0`), but the authored text's framing — "Costs 7 FP to cast **plus 0 FP/sec
while channeled**" — now reads oddly since the phrase implies a channel cost that no longer
exists. Fixing only the number (per this task's rule against rewriting surrounding prose)
leaves that phrasing slightly stale; a follow-up human pass to drop the "plus 0 FP/sec while
channeled" clause entirely would be a wording change, not a number correction, so it was left
for manual review rather than auto-applied.

### Unmatched (15 — no data to check against; left untouched)

Glintblade Trio, Miriam's Vanishing, Rellana's Twin Moons, Terra Magica, Blades of Stone,
Gravitational Missile, Mass of Putrescence, Rings of Spectral Light, Vortex of Putrescence,
Impenetrable Thorns, Mantle of Thorns, Cherishing Fingers, Fleeting Microcosm, Glintstone
Nail, Glintstone Nails

As with incantations.ts, most of these read as DLC additions (Rellana, Thorn sorceries tied to
the Scadutree/Shadow Keep, Miquella-adjacent content); a few (e.g. Terra Magica, Glintblade
Trio) are base-game spells that simply didn't have an exact name match in this data source —
left unmatched rather than guessed at, per the task's instruction.

## Totals

- **Checked:** 213 (129 incantations + 84 sorceries)
- **Corrected:** 26 (18 incantations + 8 sorceries)
- **Unmatched:** 44 (29 incantations + 15 sorceries)
- **Unchanged (already correct):** 143 (82 incantations + 61 sorceries)

Deferred (not audited this pass, no working data source found): Talismans, Consumables, Ashes
of War, Crystal Tears, Whetstones.
