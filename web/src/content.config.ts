import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const CATEGORIES = [
  'general',
  'starting-class',
  'keepsake',
  'stat',
  'mechanic',
  'damage-type',
  'status-effect',
  'evergaol',
  'church',
  'great-enemy',
  'key-item',
  'dungeon-limgrave',
  'dungeon-liurnia-caelid',
  'dungeon-late-game',
  'chest',
  'questline',
  'talisman',
  'incantation',
  'sorcery',
  'consumable',
  'crystal-tear',
  'whetstone',
  'great-rune',
  'ash-of-war',
  'weapon',
  'armor',
] as const;

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/wiki' }),
  schema: z.object({
    name: z.string().min(1),
    text: z.string().min(1),
    category: z.enum(CATEGORIES),
    pageTitle: z.string().min(1),
    pageSlug: z.string().min(1),
    itemSlug: z.string().min(1),
  }),
});

export const collections = { wiki };
