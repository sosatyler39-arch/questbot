# Map Legend: 22-Category Colors, Icons, and Reorganization

## Goal

Replace the schematic map's current 7-category color key + 2-checkbox
(Locations/Bosses) filter with a single 22-category legend that is itself
the filter: every category gets its own toggle, unique color, and icon.
Applies to the web Map tab, the Electron client's Map tab, and the
Electron client's Speedrun tab (the only place this system exists outside
the web app).

## The 22 categories

Armor, Ashes of War, Bosses, Consumables, Flask Upgrades, Key, Locations,
Maps, Materials, NPC, NPC Invader, Remembrance, Shields, Site of Grace,
Spells, Spirit Ashes, Spiritsprings, Summoning Pool, Talismans, Upgrade
Materials, Waygates, Weapons — as given, no additions.

19 of these have no map data yet (no coordinates exist anywhere in the
codebase for individual armor pieces, spells, etc.) and start as empty,
toggleable legend entries. Populating them with real pins is future work,
out of scope here.

## Data model: rewrite `category` directly, don't add a translation layer

`MapLocation.category` currently holds one of 7 values
(`legacy-dungeon`, `minor-dungeon`, `evergaol`, `church`, `landmark`,
`town-or-fort`, `great-enemy`) across 247 entries in
`web/src/map/locations.ts` and its mirror in
`client/src/renderer/map/locations.ts`. None of the 7 map 1:1 onto the new
22 — they collapse into 3: `bosses`, `site-of-grace`, `locations` (plus one
single pin that belongs under `waygates`, see below).

Rather than keeping the old 7-value field and layering a new
category→legend-group mapping on top (which would mean maintaining two
parallel category systems indefinitely), **the `category` field itself is
rewritten** to hold one of the 22 new values directly. `MapLocation.category`
becomes a union of all 22 slugs. `roles.ts` (`Role`, `ROLE_FOR_CATEGORY`) is
deleted entirely — nothing needs the old 2-bucket role system once every
consumer can filter/color on the real category directly.

### Classification of the existing 247 pins

Computed by cross-referencing every pin's name against
`tools/msb-extractor/output/sites-of-grace.json` — 314 real Site of Grace
names extracted directly from the game's own `BonfireWarpParam` data (not a
guess or a web search):

- **34 → `bosses`** — every existing `evergaol` and `great-enemy` pin,
  unchanged in membership.
- **129 → `site-of-grace`** — pins whose name exactly matches a real grace
  name (126 direct matches, e.g. "Church of Elleh", "Jarburg", "Volcano
  Manor"), plus 3 hand-verified paraphrase matches: `Dominula, Windmill
  Village` (grace is named "Windmill Village"), and both underground
  well-landing pins `Siofra River Well (descent)` / `Ainsel River Well
  (descent)` (graces are "Siofra River Well Depths" / "Ainsel River Well
  Depths"). Legacy dungeon *entrance* pins (Stormveil Castle, Redmane
  Castle, Castle Sol, Castle Morne, Raya Lucaria Academy, Shaded Castle,
  Mohgwyn Palace, Elphael) are deliberately **not** reclassified as
  `site-of-grace` even where a similarly-named grace exists nearby/inside —
  they represent the dungeon as a whole (one pin per dungeon is the
  existing convention), not a specific rest point. Volcano Manor, Nokron,
  and Nokstella are the exception: their entrance grace shares the exact
  dungeon name, so they legitimately match.
- **1 → `waygates`** — `Renna's Rise (waygate)` (confirmed real, distinct
  from "Ranni's Rise", user-supplied correction).
- **83 → `locations`** — everything else: ruins, towers, legacy dungeon
  markers, lookout towers, colosseums, etc.

This is a one-time data rewrite of the `category` field on the affected
lines in both `locations.ts` files — no other field changes, no lines
added or removed.

## UI: grouped legend replaces the old checkbox row + color key

The old `#filter-locations`/`#filter-bosses` checkboxes (above the map) and
the old 7-item color-key strip (`#map-legend`, below the map) are both
removed. In their place, `#map-legend` becomes the single home for
filtering: 22 checkboxes, each showing its color+icon dot and label,
organized into 6 clusters so it doesn't read as one undifferentiated wall
of checkboxes:

- **World** — Locations, Bosses, Site of Grace, Waygates, Spiritsprings,
  Summoning Pool
- **Equipment** — Weapons, Armor, Shields, Talismans, Ashes of War
- **Consumables & Materials** — Consumables, Materials, Upgrade Materials,
  Flask Upgrades, Key
- **Magic & Summons** — Spells, Spirit Ashes
- **NPCs** — NPC, NPC Invader, Remembrance
- **Reference** — Maps

Every category defaults to checked/visible on load (matching today's
default-everything-visible behavior). This same structure is duplicated for
the Electron client's Speedrun tab, which gets its own equivalent legend
element (it currently has no legend at all, just the 2 checkboxes) in place
of `#speedrun-filter-locations`/`#speedrun-filter-bosses`.

### Filtering mechanism

Each pin's SVG group gets `data-category="<slug>"` instead of today's
`class="role-location"`/`"role-boss"`. A single `Set<Category>` of
currently-hidden categories, updated on any checkbox change, drives one
`querySelectorAll('[data-category]')` pass that sets `display` per element
— replacing the current 2-class/2-CSS-rule (`hide-locations`/`hide-bosses`)
approach, which doesn't scale cleanly to 22 independent toggles.

## Colors and icons

Every category gets a unique color **and** a small icon glyph — testing a
color-only legend surfaced too many near-duplicate hues once spread across
22 categories, and pairing each with a distinct icon fixes that
independently of how close two colors land. Colors start from the literal
7 rainbow hues (red→orange→yellow→green→blue→indigo→violet) and spread the
remaining 15 across whatever hue-wheel room is left, proportional to gap
size (not just piled into the single biggest gap), with lightness/
saturation varied so hue-adjacent neighbors still read as different
swatches. Two categories (Armor, Maps) and two others flagged as too
similar (Upgrade Materials, NPC) were deliberately pulled off the hue wheel
onto desaturated natural-material tones (bronze/leather brown, parchment
tan, stone/ore brown-gray, slate blue-gray) instead of forcing them into a
crowded hue slot.

| Category | Color | Icon |
|---|---|---|
| Locations | `#5980cf` | 📍 |
| Bosses | `#bd2828` | 💀 |
| Site of Grace | `#d3c269` | ✨ |
| Waygates | `#31c4a2` | 🌀 |
| Spiritsprings | `#4dcb88` | ⛲ |
| Summoning Pool | `#3945c6` | 🤝 |
| Weapons | `#bd7328` | ⚔️ |
| Armor | `#855532` | 🧥 |
| Shields | `#3f81a6` | 🛡️ |
| Talismans | `#33c2cc` | 🧿 |
| Ashes of War | `#da5a2f` | 🔥 |
| Consumables | `#37be4e` | 🧪 |
| Materials | `#9fb143` | 🪵 |
| Upgrade Materials | `#755538` | ⚒️ |
| Flask Upgrades | `#ce3bba` | ⚗️ |
| Key | `#e6b34c` | 🔑 |
| Spells | `#6e31c4` | 📖 |
| Spirit Ashes | `#bb72ca` | 👻 |
| NPC | `#7c90ab` | 🗣️ |
| NPC Invader | `#5c297a` | 👹 |
| Remembrance | `#44358d` | 🏺 |
| Maps | `#c7bca8` | 🗺️ |

`CATEGORY_COLOR` (already exported from `render.ts` today, reused by the
Shape Editor) and a new `CATEGORY_ICON` map both grow to all 22 keys.
Existing pin dots stay plain colored circles (unchanged rendering); the
icon shows in the legend entries. Whether pins on the map itself also grow
an icon overlay, versus staying plain dots with icons only in the legend,
is a UI-polish call left to implementation — the color is what pins carry
today and is the load-bearing part of this design.

## Shape Editor: category picker for custom pins

`shape-editor.ts` (both copies) currently hardcodes new custom pins to
`category: 'landmark'` — a value that no longer exists — with no way to
change it afterward. Each custom pin's row in the pin list gets a
`<select>` of all 22 categories (colored dot preview per option), defaulting
new pins to `locations`. This is the only way to ever assign a pin to one
of the 19 currently-empty categories.

## Out of scope

- Populating any of the 19 empty categories with real pin data.
- Any change to how pins are positioned, added, or the affine-calibration
  pipeline.
- Whether map pins themselves gain visible icon overlays (left as an
  implementation-time call, see above).
