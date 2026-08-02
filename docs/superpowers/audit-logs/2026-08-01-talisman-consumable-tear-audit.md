# Corpus audit: talismans.ts, consumables.ts, crystal-tears.ts vs. "ER - Miscellaneous Data"

**Scope note:** This closes the last of the five categories README's "Corpus audit against
ERDB" section named as unaudited after ERDB turned out to be too old to parse the DLC-patched
game (`docs/superpowers/audit-logs/2026-07-22-corpus-audit.md`). Incantations and Sorceries
were closed by that earlier audit; Talismans, Consumables, and Crystal Tears are closed here.
Whetstones remain unaudited — the replacement source has no dedicated tab for them.

**Source:** the "ER - Miscellaneous Data" Google Sheet (App Ver. 1.16.1), provided by the user
and confirmed free/uncopyrighted, data-mined directly from the game's own files (community
Discord datamining effort, not a wiki). Tabs used: `Effects - Talismans`,
`Effects - Wonderous Physick`, `Effects - Consumables`. DLC-current — Shadow of the Erdtree
talismans (e.g. Perfumer's Talisman, the Scorpion Charms) are present.

**Method:** exact name match (lowercased/trimmed) between each sheet tab and the corresponding
corpus file's section headings, via the sheet's public CSV export endpoint. PvP-specific
values in the sheet were ignored throughout — this corpus is PvE guide content only. Three
talisman names matched only after manually accounting for the sheet omitting the word
"Talisman" from three entries (Retaliatory/Lacerating Crossed-Tree, Enraged Divine Beast) —
all three were verified correct as originally written, no changes needed. One crystal tear
("Crimson Crystal Tear") sits in the sheet's own header row due to an apparent merged-cell
quirk in the source spreadsheet; its value was recovered manually and verified correct as
written, no change needed.

## talismans.ts

155 checked (154 sheet rows + 3 name-variant matches recovered manually + Entwining Umbilical
Cord unmatched) - 5 corrected - 5 enriched - 144 unchanged - 1 unmatched

### Corrected (5)

| Heading | Old → New |
|---|---|
| Cerulean Amber Medallion +3 | Raises maximum FP by 12.5% → by 13% |
| Roar Medallion | Enhances roar **and breath**-type attacks by 15% → roar-type by 15%, breath-type by 10% |
| Companion Jar | Raises potency of thrown items by 20% (blanket) → Cracked/Ritual Pot by 20%, Hefty Cracked Pot by 10% |
| Crucible Knot Talisman | Reduces damage/stagger from headshots by 33% → Nullifies headshot bonus damage and stagger entirely |
| Dried Bouquet | Raises attack power by 15% → by 20% |

### Enriched — added a missing exact value (5)

| Heading | Change |
|---|---|
| Hammer Talisman | Added "by 40%" to the stamina/guard-damage effect |
| Greatshield Talisman | Restated precisely: reduces incoming stamina damage while guarding by 20% |
| Radagon Icon | Added "(equivalent to +30 virtual Dexterity)" |
| Beloved Stardust | Added "(equivalent to +99 virtual Dexterity)" |
| Blue Dancer Charm | Added "up to 15%" |

### Unmatched (1)

- **Entwining Umbilical Cord** — no corresponding row in the sheet's Talismans tab; left
  as-is, not guessed at.

## crystal-tears.ts

37 checked - 1 corrected - 29 enriched - 7 unchanged (verified correct)

### Corrected (1)

| Heading | Old → New |
|---|---|
| Ruptured Crystal Tear | "Lasts 3 seconds" → "explode after roughly 2.9 seconds" |

### Enriched — added a missing exact value (29)

Every HP/FP/Stamina/stat-boosting tear, every damage-type Shrouding tear, and most
Hardtears/Bubbletears/Cracked Tears gained an exact percentage, flat value, or mechanic detail
the corpus previously stated only qualitatively (e.g. "Temporarily boosts maximum HP" →
"Temporarily boosts maximum HP by 10%"). Full list: Crimsonspill Crystal Tear, Crimsonburst
Crystal Tear, Crimsonburst Dried Tear, Crimson-Sapping Cracked Tear, Bloodsucking Cracked
Tear, Crimson Bubbletear, Crimsonwhorl Bubbletear, Greenspill Crystal Tear, Greenburst
Crystal Tear, Strength-knot Crystal Tear, Dexterity-knot Crystal Tear, Intelligence-knot
Crystal Tear, Faith-knot Crystal Tear, Opaline Hardtear, Speckled Hardtear, Leaden Hardtear,
Windy Crystal Tear, Opaline Bubbletear, Oil-Soaked Tear, Stonebarb Cracked Tear, Spiked
Cracked Tear, Thorny Cracked Tear, Deflecting Hardtear (the guard-counter tier system was
previously undocumented entirely), Magic/Flame/Lightning/Holy-Shrouding Cracked Tear (4),
Glovewort Crystal Tear, Purifying Crystal Tear (clarified the specific boss mechanic).

### Unchanged — verified correct as written (7)

Crimson Crystal Tear, Cerulean Crystal Tear, Cerulean Hidden Tear, Viridian Hidden Tear,
Twiggy Cracked Tear, Winged Crystal Tear (the sheet's `MaxEquipLoad * 4.5` formula wasn't
confidently interpretable into a plain-English number, so left as-is rather than guessing),
Cerulean-Sapping Cracked Tear.

## consumables.ts

8 in-scope checked (of the sheet's 9 rows — the 9th, "Phantom Great Rune", lives in
`great-runes.ts`, out of this file's scope) - 0 corrected - 8 enriched - 0 unmatched

### Enriched — added a missing exact value (8)

| Heading | Change |
|---|---|
| Albinauric Pot | Restated precisely: prevents Crimson/Cerulean Flask use for a duration |
| Oil Pot | Added "reducing their fire damage negation by 50%" |
| Roped Oil Pot | Added "reducing their fire damage negation by 50%" |
| Hefty Oil Pot | Added "reducing their fire damage negation by 65%" |
| Uplifting Aromatic | Added "physical attack power by 10%" and "negates 90% of the next hit" |
| Acid Spraymist | Added "reducing affected enemies' damage dealt by 15%" |
| Bloodboil Aromatic | Added "physical damage by 30%... max stamina by 20%... reducing all damage negations by 25%" |
| Ironjar Aromatic | Added "physical damage negation by 40% (reducing lightning by 60%)... all resistances by 45" |

## Not applied to the live database

Same as the wiki-URL and item_locations work earlier in this project's history — no Postgres
instance is running in this environment, and a full re-embed costs real Gemini API usage.
Applying these corrections to the live corpus requires a manual `syncGame('elden-ring')`
re-run once a database is available.
