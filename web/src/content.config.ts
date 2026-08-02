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

const enemyCycle = z.object({
  cycle: z.string(),
  row: z.record(z.string(), z.string()),
});

const enemyDrop = z.object({
  item: z.string(),
  quantity: z.number(),
  baseChancePercent: z.number(),
  discoveryScaling: z.boolean(),
});

const enemies = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/enemies' }),
  schema: z.object({
    npcId: z.string(),
    name: z.string().min(1),
    location: z.string(),
    cycles: z.array(enemyCycle).min(1),
    drops: z.array(enemyDrop),
  }),
});

export const collections = { wiki, enemies };
