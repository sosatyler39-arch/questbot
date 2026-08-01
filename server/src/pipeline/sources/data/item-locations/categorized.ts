import type { CategorizedItemLocationEntry, ItemLocationEntry } from '../../types.js';
import { TALISMAN_LOCATIONS } from './talismans-locations.js';
import { INCANTATION_LOCATIONS } from './incantations-locations.js';
import { SORCERY_LOCATIONS } from './sorceries-locations.js';
import { CONSUMABLE_LOCATIONS } from './consumables-locations.js';
import { ASH_OF_WAR_LOCATIONS } from './ashes-of-war-locations.js';
import { CRYSTAL_TEAR_LOCATIONS } from './crystal-tears-locations.js';
import { WHETSTONE_AND_GREAT_RUNE_LOCATIONS } from './whetstones-great-runes-locations.js';
import { WEAPON_LOCATIONS } from './weapons-locations.js';
import { ARMOR_LOCATIONS } from './armor-locations.js';

function tag(category: string, entries: ItemLocationEntry[]): CategorizedItemLocationEntry[] {
  return entries.map((entry) => ({ ...entry, category }));
}

// Category tags for item_locations' composite key (item_name, category) —
// see location-store.ts. These mirror the wiki's own category slugs
// (original-content.ts's CATEGORIZED_PAGES) with one deliberate exception:
// whetstones and great runes are authored together in one source file, so
// they share a single 'whetstone-great-rune' tag here rather than being
// split into the wiki's two separate categories. ask.ts's
// wikiCategoryToLocationCategory() maps both wiki categories onto this same
// tag when looking a location back up.
export const CATEGORIZED_LOCATIONS: CategorizedItemLocationEntry[] = [
  ...tag('talisman', TALISMAN_LOCATIONS),
  ...tag('incantation', INCANTATION_LOCATIONS),
  ...tag('sorcery', SORCERY_LOCATIONS),
  ...tag('consumable', CONSUMABLE_LOCATIONS),
  ...tag('ash-of-war', ASH_OF_WAR_LOCATIONS),
  ...tag('crystal-tear', CRYSTAL_TEAR_LOCATIONS),
  ...tag('whetstone-great-rune', WHETSTONE_AND_GREAT_RUNE_LOCATIONS),
  ...tag('weapon', WEAPON_LOCATIONS),
  ...tag('armor', ARMOR_LOCATIONS),
];

// Maps a wiki category (26-way split, see original-content.ts) onto the
// coarser category tag item_locations actually uses (9-way, above). Returns
// null for wiki categories that never had location data authored (general,
// dungeon-*, church, questline, etc.) so ask.ts can skip the lookup
// entirely instead of querying for something that can never match.
const WIKI_TO_LOCATION_CATEGORY: Record<string, string> = {
  talisman: 'talisman',
  incantation: 'incantation',
  sorcery: 'sorcery',
  consumable: 'consumable',
  'ash-of-war': 'ash-of-war',
  'crystal-tear': 'crystal-tear',
  whetstone: 'whetstone-great-rune',
  'great-rune': 'whetstone-great-rune',
  weapon: 'weapon',
  armor: 'armor',
};

export function locationCategoryForWikiCategory(wikiCategory: string): string | null {
  return WIKI_TO_LOCATION_CATEGORY[wikiCategory] ?? null;
}
