import type { MapLocation } from './locations.js';

// Shared by render.ts (Map tab) and speedrun.ts (Speedrun tab) so both
// filter pins into the same two groups.
export type Category = MapLocation['category'];
export type Role = 'location' | 'boss';

// Grouping for the two filter checkboxes. Evergaol + Great Enemy are the
// only boss-type pins we place today; legacy/minor dungeon *bosses* (the
// thing inside the dungeon) aren't in the dataset yet — planned addition,
// at which point they'll join the 'boss' role too.
export const ROLE_FOR_CATEGORY: Record<Category, Role> = {
  'legacy-dungeon': 'location',
  'minor-dungeon': 'location',
  church: 'location',
  landmark: 'location',
  'town-or-fort': 'location',
  evergaol: 'boss',
  'great-enemy': 'boss',
};
