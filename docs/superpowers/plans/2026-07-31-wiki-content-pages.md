# Wiki Content Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the ~2166-section Elden Ring content corpus (currently only living in `server`'s Postgres DB) into real, browsable, linkable pages under `/elden-ring/wiki` on the marketing website.

**Architecture:** A disposable Node script reads each of the 26 named `*_PAGES` arrays that make up `server`'s corpus (not the flattened `ALL_PAGES` re-export, which loses which array a page came from), tags every section with its source category, and writes one JSON file per section into `web/src/content/wiki/{category}/{pageSlug}/{itemSlug}.json`. An Astro Content Collection (`web/src/content.config.ts`) loads and schema-validates those files. Four Astro page templates implement the three browse levels (`/wiki` → `/wiki/{category}` → `/wiki/{category}/{page}`) plus the leaf content page (`/wiki/{category}/{page}/{item}`), each via `getStaticPaths()` over `getCollection('wiki')`. Everything resolves at build time — no runtime queries, no client JS.

**Tech Stack:** Astro 7.1.6 Content Collections (`astro:content`, `astro/loaders` `glob()`, `astro/zod`), `tsx` to run the one-time conversion script, `node:test` + `node:assert/strict` for the script's unit test.

## Global Constraints

- Content is duplicated into `web/` as a one-time copy. No ongoing sync mechanism with `server/` — future corpus changes must be hand-applied to `web/`'s copy separately.
- Astro Content Collections, not plain TypeScript data + custom routes.
- One page per individual item/section (~2166 pages), not one page per existing page-grouping.
- Category index pages provide the only navigation (no site-wide search in this pass).
- The wiki ships zero client-side JavaScript — everything is static HTML generated at build time.
- The one-time conversion script (`server/scripts/convert-wiki-content.ts` and its test) is disposable: write it, run it once against real data, delete both files, per this project's established one-off-script convention.
- Actually rewriting the `questbot://guide/...` placeholder URLs in `server/`'s source files is explicitly out of scope for this plan.

---

## File Structure

**Create:**
- `server/scripts/convert-wiki-content.ts` — disposable one-time conversion script (deleted at the end of Task 1)
- `server/scripts/convert-wiki-content.test.ts` — disposable unit test for the script (deleted at the end of Task 1)
- `web/src/content/wiki/{category}/{pageSlug}/{itemSlug}.json` — ~2166 generated data files, committed to the repo (output of Task 1, permanent)
- `web/src/content.config.ts` — Content Collection schema + loader definition
- `web/src/wiki/format.ts` — tiny `humanize(slug)` display-formatting helper shared by the 4 page templates
- `web/src/components/WikiLayout.astro` — shared `<Header>` + `<SubTabs active="wiki">` + `<title>` shell for the 4 wiki page templates
- `web/src/pages/elden-ring/wiki/index.astro` — top-level category index
- `web/src/pages/elden-ring/wiki/[category]/index.astro` — lists page-groupings within a category
- `web/src/pages/elden-ring/wiki/[category]/[page]/index.astro` — lists items within a page-grouping
- `web/src/pages/elden-ring/wiki/[category]/[page]/[item].astro` — the actual content page

**Delete:**
- `web/src/pages/elden-ring/wiki.astro` — the "Coming soon" placeholder, replaced by the directory above (Task 4)

---

### Task 1: One-time conversion script

**Files:**
- Create: `server/scripts/convert-wiki-content.ts`
- Create: `server/scripts/convert-wiki-content.test.ts`
- Reads: `server/src/pipeline/sources/original-content.ts` (for `ORIGINAL_PAGES`), `server/src/pipeline/sources/data/*.ts` (25 more `*_PAGES` exports), `server/src/pipeline/sources/types.ts` (for the `ArticlePage`/`ArticleSection` types)
- Writes (when run for real): `web/src/content/wiki/**/*.json`

**Interfaces:**
- Produces (consumed only by this task's own test, then deleted): `slugify(value: string): string`, `pageSlugFromUrl(url: string): string`, `buildWikiEntries(sources: CategorySource[]): Map<string, WikiEntry>`, and the types `CategorySource { category: string; pages: ArticlePage[] }` and `WikiEntry { name: string; text: string; category: string; pageTitle: string; pageSlug: string; itemSlug: string }`.
- Produces (consumed by Task 2's schema and every page template): JSON files shaped exactly like `WikiEntry` above, one per `{category}/{pageSlug}/{itemSlug}` triple.

Every one of `server`'s 26 source arrays and the category slug it maps to:

| Array | Import path | category |
|---|---|---|
| `ORIGINAL_PAGES` | `../src/pipeline/sources/original-content.js` | `general` |
| `STARTING_CLASS_PAGES` | `../src/pipeline/sources/data/starting-classes.js` | `starting-class` |
| `KEEPSAKE_PAGES` | `../src/pipeline/sources/data/keepsakes.js` | `keepsake` |
| `STAT_PAGES` | `../src/pipeline/sources/data/stats.js` | `stat` |
| `GENERAL_STATS_PAGES` | `../src/pipeline/sources/data/mechanics-general-stats.js` | `mechanic` |
| `DAMAGE_TYPE_PAGES` | `../src/pipeline/sources/data/mechanics-damage-types.js` | `damage-type` |
| `STATUS_EFFECT_PAGES` | `../src/pipeline/sources/data/mechanics-status-effects.js` | `status-effect` |
| `EVERGAOL_PAGES` | `../src/pipeline/sources/data/evergaols.js` | `evergaol` |
| `CHURCH_PAGES` | `../src/pipeline/sources/data/churches.js` | `church` |
| `GREAT_ENEMY_PAGES` | `../src/pipeline/sources/data/great-enemies.js` | `great-enemy` |
| `KEY_ITEM_PAGES` | `../src/pipeline/sources/data/key-items.js` | `key-item` |
| `LIMGRAVE_DUNGEON_PAGES` | `../src/pipeline/sources/data/dungeons-limgrave.js` | `dungeon-limgrave` |
| `LIURNIA_CAELID_DUNGEON_PAGES` | `../src/pipeline/sources/data/dungeons-liurnia-caelid.js` | `dungeon-liurnia-caelid` |
| `LATE_GAME_DUNGEON_PAGES` | `../src/pipeline/sources/data/dungeons-late-game.js` | `dungeon-late-game` |
| `CHEST_PAGES` | `../src/pipeline/sources/data/chests.js` | `chest` |
| `QUESTLINE_PAGES` | `../src/pipeline/sources/data/questlines.js` | `questline` |
| `TALISMAN_PAGES` | `../src/pipeline/sources/data/talismans.js` | `talisman` |
| `INCANTATION_PAGES` | `../src/pipeline/sources/data/incantations.js` | `incantation` |
| `SORCERY_PAGES` | `../src/pipeline/sources/data/sorceries.js` | `sorcery` |
| `CONSUMABLE_PAGES` | `../src/pipeline/sources/data/consumables.js` | `consumable` |
| `CRYSTAL_TEAR_PAGES` | `../src/pipeline/sources/data/crystal-tears.js` | `crystal-tear` |
| `WHETSTONE_PAGES` | `../src/pipeline/sources/data/whetstones.js` | `whetstone` |
| `GREAT_RUNE_PAGES` | `../src/pipeline/sources/data/great-runes.js` | `great-rune` |
| `ASH_OF_WAR_PAGES` | `../src/pipeline/sources/data/ashes-of-war.js` | `ash-of-war` |
| `WEAPON_PAGES` | `../src/pipeline/sources/data/weapons.js` | `weapon` |
| `ARMOR_PAGES` | `../src/pipeline/sources/data/armor.js` | `armor` |

(This is 26 categories, not the 24 mentioned in the design spec's prose — the spec's number was an approximation; the code above is the precise, authoritative count and mapping.)

Note on `pageSlug`: `original-content.ts`'s own `ORIGINAL_PAGES` uses 1-segment placeholder URLs (`questbot://guide/{slug}`), while every other source file uses 2-segment URLs (`questbot://guide/{category}/{slug}`). Taking the URL's *last* path segment gives the right slug in both cases with no special-casing — that's what `pageSlugFromUrl` below does.

- [ ] **Step 1: Write the failing test**

```typescript
// server/scripts/convert-wiki-content.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildWikiEntries, pageSlugFromUrl, slugify, type CategorySource } from './convert-wiki-content.js';

test('slugify lowercases, strips apostrophes, and hyphenates', () => {
  assert.equal(slugify('Golden Vow'), 'golden-vow');
  assert.equal(slugify("Ranni's questline (start)"), 'rannis-questline-start');
});

test('pageSlugFromUrl takes the last path segment regardless of scheme depth', () => {
  assert.equal(pageSlugFromUrl('questbot://guide/weapon/katana'), 'katana');
  assert.equal(pageSlugFromUrl('questbot://guide/margit-the-fell-omen'), 'margit-the-fell-omen');
});

test('buildWikiEntries produces one entry per section, keyed by category/pageSlug/itemSlug', () => {
  const sources: CategorySource[] = [
    {
      category: 'weapon',
      pages: [
        {
          title: 'Katana',
          url: 'questbot://guide/weapon/katana',
          sections: [
            { heading: 'Uchigatana', text: 'A katana found early in Limgrave.' },
            { heading: 'Rivers of Blood', text: 'A bleed-focused katana.' },
          ],
        },
      ],
    },
  ];
  const entries = buildWikiEntries(sources);
  assert.equal(entries.size, 2);
  assert.deepEqual(entries.get('weapon/katana/uchigatana'), {
    name: 'Uchigatana',
    text: 'A katana found early in Limgrave.',
    category: 'weapon',
    pageTitle: 'Katana',
    pageSlug: 'katana',
    itemSlug: 'uchigatana',
  });
});

test('buildWikiEntries throws on a duplicate category/pageSlug/itemSlug triple', () => {
  const sources: CategorySource[] = [
    {
      category: 'weapon',
      pages: [
        {
          title: 'Katana',
          url: 'questbot://guide/weapon/katana',
          sections: [{ heading: 'Uchigatana', text: 'First entry.' }],
        },
        {
          title: 'Katana Duplicate',
          url: 'questbot://guide/weapon/katana',
          sections: [{ heading: 'Uchigatana', text: 'Colliding entry.' }],
        },
      ],
    },
  ];
  assert.throws(() => buildWikiEntries(sources), /Duplicate wiki URL/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test server/scripts/convert-wiki-content.test.ts`
Expected: FAIL — `convert-wiki-content.ts` doesn't exist yet.

- [ ] **Step 3: Write the script**

```typescript
// server/scripts/convert-wiki-content.ts
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ArticlePage } from '../src/pipeline/sources/types.js';
import { ORIGINAL_PAGES } from '../src/pipeline/sources/original-content.js';
import { STARTING_CLASS_PAGES } from '../src/pipeline/sources/data/starting-classes.js';
import { KEEPSAKE_PAGES } from '../src/pipeline/sources/data/keepsakes.js';
import { STAT_PAGES } from '../src/pipeline/sources/data/stats.js';
import { GENERAL_STATS_PAGES } from '../src/pipeline/sources/data/mechanics-general-stats.js';
import { DAMAGE_TYPE_PAGES } from '../src/pipeline/sources/data/mechanics-damage-types.js';
import { STATUS_EFFECT_PAGES } from '../src/pipeline/sources/data/mechanics-status-effects.js';
import { EVERGAOL_PAGES } from '../src/pipeline/sources/data/evergaols.js';
import { CHURCH_PAGES } from '../src/pipeline/sources/data/churches.js';
import { GREAT_ENEMY_PAGES } from '../src/pipeline/sources/data/great-enemies.js';
import { KEY_ITEM_PAGES } from '../src/pipeline/sources/data/key-items.js';
import { LIMGRAVE_DUNGEON_PAGES } from '../src/pipeline/sources/data/dungeons-limgrave.js';
import { LIURNIA_CAELID_DUNGEON_PAGES } from '../src/pipeline/sources/data/dungeons-liurnia-caelid.js';
import { LATE_GAME_DUNGEON_PAGES } from '../src/pipeline/sources/data/dungeons-late-game.js';
import { CHEST_PAGES } from '../src/pipeline/sources/data/chests.js';
import { QUESTLINE_PAGES } from '../src/pipeline/sources/data/questlines.js';
import { TALISMAN_PAGES } from '../src/pipeline/sources/data/talismans.js';
import { INCANTATION_PAGES } from '../src/pipeline/sources/data/incantations.js';
import { SORCERY_PAGES } from '../src/pipeline/sources/data/sorceries.js';
import { CONSUMABLE_PAGES } from '../src/pipeline/sources/data/consumables.js';
import { CRYSTAL_TEAR_PAGES } from '../src/pipeline/sources/data/crystal-tears.js';
import { WHETSTONE_PAGES } from '../src/pipeline/sources/data/whetstones.js';
import { GREAT_RUNE_PAGES } from '../src/pipeline/sources/data/great-runes.js';
import { ASH_OF_WAR_PAGES } from '../src/pipeline/sources/data/ashes-of-war.js';
import { WEAPON_PAGES } from '../src/pipeline/sources/data/weapons.js';
import { ARMOR_PAGES } from '../src/pipeline/sources/data/armor.js';

export interface CategorySource {
  category: string;
  pages: ArticlePage[];
}

export const CATEGORY_SOURCES: CategorySource[] = [
  { category: 'general', pages: ORIGINAL_PAGES },
  { category: 'starting-class', pages: STARTING_CLASS_PAGES },
  { category: 'keepsake', pages: KEEPSAKE_PAGES },
  { category: 'stat', pages: STAT_PAGES },
  { category: 'mechanic', pages: GENERAL_STATS_PAGES },
  { category: 'damage-type', pages: DAMAGE_TYPE_PAGES },
  { category: 'status-effect', pages: STATUS_EFFECT_PAGES },
  { category: 'evergaol', pages: EVERGAOL_PAGES },
  { category: 'church', pages: CHURCH_PAGES },
  { category: 'great-enemy', pages: GREAT_ENEMY_PAGES },
  { category: 'key-item', pages: KEY_ITEM_PAGES },
  { category: 'dungeon-limgrave', pages: LIMGRAVE_DUNGEON_PAGES },
  { category: 'dungeon-liurnia-caelid', pages: LIURNIA_CAELID_DUNGEON_PAGES },
  { category: 'dungeon-late-game', pages: LATE_GAME_DUNGEON_PAGES },
  { category: 'chest', pages: CHEST_PAGES },
  { category: 'questline', pages: QUESTLINE_PAGES },
  { category: 'talisman', pages: TALISMAN_PAGES },
  { category: 'incantation', pages: INCANTATION_PAGES },
  { category: 'sorcery', pages: SORCERY_PAGES },
  { category: 'consumable', pages: CONSUMABLE_PAGES },
  { category: 'crystal-tear', pages: CRYSTAL_TEAR_PAGES },
  { category: 'whetstone', pages: WHETSTONE_PAGES },
  { category: 'great-rune', pages: GREAT_RUNE_PAGES },
  { category: 'ash-of-war', pages: ASH_OF_WAR_PAGES },
  { category: 'weapon', pages: WEAPON_PAGES },
  { category: 'armor', pages: ARMOR_PAGES },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function pageSlugFromUrl(url: string): string {
  const segments = url.split('/').filter(Boolean);
  return segments[segments.length - 1];
}

export interface WikiEntry {
  name: string;
  text: string;
  category: string;
  pageTitle: string;
  pageSlug: string;
  itemSlug: string;
}

export function buildWikiEntries(sources: CategorySource[]): Map<string, WikiEntry> {
  const entries = new Map<string, WikiEntry>();
  for (const { category, pages } of sources) {
    for (const page of pages) {
      const pageSlug = pageSlugFromUrl(page.url);
      for (const section of page.sections) {
        const itemSlug = slugify(section.heading);
        const key = `${category}/${pageSlug}/${itemSlug}`;
        if (entries.has(key)) {
          throw new Error(
            `Duplicate wiki URL: ${key} (page "${page.title}", section "${section.heading}")`
          );
        }
        entries.set(key, {
          name: section.heading,
          text: section.text,
          category,
          pageTitle: page.title,
          pageSlug,
          itemSlug,
        });
      }
    }
  }
  return entries;
}

async function main() {
  const entries = buildWikiEntries(CATEGORY_SOURCES);
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = resolve(here, '../../web/src/content/wiki');
  await rm(outDir, { recursive: true, force: true });
  for (const entry of entries.values()) {
    const filePath = join(outDir, entry.category, entry.pageSlug, `${entry.itemSlug}.json`);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(entry, null, 2) + '\n', 'utf8');
  }
  console.log(`Wrote ${entries.size} wiki entries to ${outDir}`);
}

if (basename(process.argv[1] ?? '') === basename(fileURLToPath(import.meta.url))) {
  main();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test server/scripts/convert-wiki-content.test.ts`
Expected: PASS, all 4 tests green.

- [ ] **Step 5: Run the script for real**

Run: `npx tsx server/scripts/convert-wiki-content.ts`
Expected: Prints `Wrote <N> wiki entries to .../web/src/content/wiki` with no thrown collision error. Confirm `web/src/content/wiki/` now contains one JSON subfolder per category (26 of them) and spot-check one generated file, e.g. `web/src/content/wiki/weapon/katana/uchigatana.json`, contains the expected `{ name, text, category, pageTitle, pageSlug, itemSlug }` shape. Record the printed count `<N>` — Task 8 checks the final build's page count against it.

- [ ] **Step 6: Delete the disposable script and test**

```bash
git rm server/scripts/convert-wiki-content.ts server/scripts/convert-wiki-content.test.ts
```

(If `server/scripts/` is now empty, it's fine to leave it absent — nothing else references the directory.)

- [ ] **Step 7: Commit**

```bash
git add web/src/content/wiki
git commit -m "Generate wiki content collection data from the server corpus"
```

---

### Task 2: Content Collection schema

**Files:**
- Create: `web/src/content.config.ts`

**Interfaces:**
- Consumes: the JSON shape written by Task 1 — `{ name: string; text: string; category: string; pageTitle: string; pageSlug: string; itemSlug: string }`.
- Produces: a `wiki` collection consumable via `getCollection('wiki')` / `getEntry('wiki', id)`, where each entry's `.data` matches the schema below.

- [ ] **Step 1: Write the schema**

```typescript
// web/src/content.config.ts
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
```

- [ ] **Step 2: Verify the collection loads and validates**

Run: `npx astro sync` (from `web/`)
Expected: Completes with no schema errors, and generates/updates `.astro/types.d.ts` with a `wiki` collection type. If it fails, the error names the offending file and field — fix Task 1's output (do not loosen the schema) and re-run.

- [ ] **Step 3: Commit**

```bash
git add web/src/content.config.ts
git commit -m "Add Astro Content Collection schema for the wiki"
```

---

### Task 3: Display-formatting helper

**Files:**
- Create: `web/src/wiki/format.ts`

**Interfaces:**
- Produces: `humanize(slug: string): string` — consumed by Tasks 4–7's page templates to turn a category/page slug like `great-rune` into a display label like `Great Rune`.

- [ ] **Step 1: Write the helper**

```typescript
// web/src/wiki/format.ts
export function humanize(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

(No dedicated test — this is a one-line transform with no branching, covered indirectly by Task 8's build/visual verification.)

- [ ] **Step 2: Commit**

```bash
git add web/src/wiki/format.ts
git commit -m "Add humanize() slug-formatting helper for the wiki"
```

---

### Task 4: Shared wiki layout + top-level category index

**Files:**
- Create: `web/src/components/WikiLayout.astro`
- Create: `web/src/pages/elden-ring/wiki/index.astro`
- Delete: `web/src/pages/elden-ring/wiki.astro`

**Interfaces:**
- Consumes: `humanize` from `../../wiki/format` (Task 3); `getCollection` from `astro:content` (Task 2's `wiki` collection).
- Produces: `WikiLayout.astro`, a `{ title: string }`-prop component wrapping `<Header>` + `<SubTabs active="wiki">` + a `<slot />`, reused by Tasks 5–7.

- [ ] **Step 1: Delete the placeholder route**

```bash
git rm web/src/pages/elden-ring/wiki.astro
```

- [ ] **Step 2: Write the shared layout**

```astro
---
// web/src/components/WikiLayout.astro
import Header from './Header.astro';
import SubTabs from './SubTabs.astro';
import '../styles/theme.css';

interface Props {
  title: string;
}
const { title } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Questbot — {title}</title>
  </head>
  <body>
    <Header />
    <SubTabs active="wiki" />
    <main>
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 3: Write the top-level index page**

```astro
---
// web/src/pages/elden-ring/wiki/index.astro
import WikiLayout from '../../../components/WikiLayout.astro';
import { getCollection } from 'astro:content';
import { humanize } from '../../../wiki/format';

const entries = await getCollection('wiki');
const categories = [...new Set(entries.map((e) => e.data.category))].sort();
---
<WikiLayout title="Elden Ring Wiki">
  <div class="wiki-index">
    <h1>Wiki</h1>
    <ul class="wiki-list">
      {categories.map((category) => (
        <li><a href={`/elden-ring/wiki/${category}`}>{humanize(category)}</a></li>
      ))}
    </ul>
  </div>
</WikiLayout>
<style>
  .wiki-index {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .wiki-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
  .wiki-list a {
    display: block;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--text);
  }
  .wiki-list a:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
```

- [ ] **Step 4: Verify it builds and renders**

Run: `npx astro dev --background` (from `web/`, if not already running), then navigate to `http://localhost:4321/elden-ring/wiki`.
Expected: Page loads, shows a grid of 26 category links (e.g. "Weapon", "Great Rune", "Dungeon Limgrave"), styled consistently with the Map sub-tab.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/WikiLayout.astro web/src/pages/elden-ring/wiki/index.astro
git commit -m "Replace wiki placeholder with a real top-level category index"
```

---

### Task 5: Category page (lists page-groupings)

**Files:**
- Create: `web/src/pages/elden-ring/wiki/[category]/index.astro`

**Interfaces:**
- Consumes: `WikiLayout` (Task 4), `humanize` (Task 3), `getCollection('wiki')` (Task 2).

- [ ] **Step 1: Write the page**

```astro
---
// web/src/pages/elden-ring/wiki/[category]/index.astro
import WikiLayout from '../../../../components/WikiLayout.astro';
import { getCollection } from 'astro:content';
import { humanize } from '../../../../wiki/format';

export async function getStaticPaths() {
  const entries = await getCollection('wiki');
  const categories = [...new Set(entries.map((e) => e.data.category))];
  return categories.map((category) => ({ params: { category } }));
}

const { category } = Astro.params as { category: string };
const entries = await getCollection('wiki', (e) => e.data.category === category);
const pages = [...new Map(entries.map((e) => [e.data.pageSlug, e.data.pageTitle])).entries()];
---
<WikiLayout title={humanize(category)}>
  <div class="wiki-index">
    <p><a href="/elden-ring/wiki">&larr; Wiki</a></p>
    <h1>{humanize(category)}</h1>
    <ul class="wiki-list">
      {pages.map(([pageSlug, pageTitle]) => (
        <li><a href={`/elden-ring/wiki/${category}/${pageSlug}`}>{pageTitle}</a></li>
      ))}
    </ul>
  </div>
</WikiLayout>
<style>
  .wiki-index {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .wiki-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
  .wiki-list a {
    display: block;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--text);
  }
  .wiki-list a:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
```

- [ ] **Step 2: Verify it builds and renders**

Navigate to `http://localhost:4321/elden-ring/wiki/weapon`.
Expected: Page loads, lists all weapon-type page-groupings (e.g. "Katana", "Greatsword"), each linking to `/elden-ring/wiki/weapon/{slug}`. Also check a small category, e.g. `http://localhost:4321/elden-ring/wiki/great-rune` — should still render correctly with just one grouping listed.

- [ ] **Step 3: Commit**

```bash
git add "web/src/pages/elden-ring/wiki/[category]/index.astro"
git commit -m "Add wiki category page listing its page-groupings"
```

---

### Task 6: Page-listing route (lists items within a page-grouping)

**Files:**
- Create: `web/src/pages/elden-ring/wiki/[category]/[page]/index.astro`

**Interfaces:**
- Consumes: `WikiLayout` (Task 4), `humanize` (Task 3), `getCollection('wiki')` (Task 2).

- [ ] **Step 1: Write the page**

```astro
---
// web/src/pages/elden-ring/wiki/[category]/[page]/index.astro
import WikiLayout from '../../../../../components/WikiLayout.astro';
import { getCollection } from 'astro:content';
import { humanize } from '../../../../../wiki/format';

export async function getStaticPaths() {
  const entries = await getCollection('wiki');
  const seen = new Map<string, { category: string; page: string }>();
  for (const entry of entries) {
    const key = `${entry.data.category}/${entry.data.pageSlug}`;
    seen.set(key, { category: entry.data.category, page: entry.data.pageSlug });
  }
  return [...seen.values()].map(({ category, page }) => ({ params: { category, page } }));
}

const { category, page } = Astro.params as { category: string; page: string };
const entries = await getCollection(
  'wiki',
  (e) => e.data.category === category && e.data.pageSlug === page
);
const pageTitle = entries[0]?.data.pageTitle ?? humanize(page);
---
<WikiLayout title={pageTitle}>
  <div class="wiki-index">
    <p><a href={`/elden-ring/wiki/${category}`}>&larr; {humanize(category)}</a></p>
    <h1>{pageTitle}</h1>
    <ul class="wiki-list">
      {entries.map((entry) => (
        <li>
          <a href={`/elden-ring/wiki/${category}/${page}/${entry.data.itemSlug}`}>
            {entry.data.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
</WikiLayout>
<style>
  .wiki-index {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .wiki-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
  .wiki-list a {
    display: block;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--text);
  }
  .wiki-list a:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
```

- [ ] **Step 2: Verify it builds and renders**

Navigate to `http://localhost:4321/elden-ring/wiki/weapon/katana`.
Expected: Page loads, lists every katana (e.g. "Uchigatana", "Rivers of Blood"), each linking to `/elden-ring/wiki/weapon/katana/{item-slug}`.

- [ ] **Step 3: Commit**

```bash
git add "web/src/pages/elden-ring/wiki/[category]/[page]/index.astro"
git commit -m "Add wiki page-listing route showing items within a grouping"
```

---

### Task 7: Item content page

**Files:**
- Create: `web/src/pages/elden-ring/wiki/[category]/[page]/[item].astro`

**Interfaces:**
- Consumes: `WikiLayout` (Task 4), `getCollection` and `CollectionEntry` from `astro:content` (Task 2).

- [ ] **Step 1: Write the page**

```astro
---
// web/src/pages/elden-ring/wiki/[category]/[page]/[item].astro
import WikiLayout from '../../../../../components/WikiLayout.astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('wiki');
  return entries.map((entry) => ({
    params: {
      category: entry.data.category,
      page: entry.data.pageSlug,
      item: entry.data.itemSlug,
    },
    props: { entry },
  }));
}

interface Props {
  entry: CollectionEntry<'wiki'>;
}

const { entry } = Astro.props;
const { category, page } = Astro.params as { category: string; page: string };
---
<WikiLayout title={entry.data.name}>
  <div class="wiki-item">
    <p><a href={`/elden-ring/wiki/${category}/${page}`}>&larr; {entry.data.pageTitle}</a></p>
    <h1>{entry.data.name}</h1>
    <p class="wiki-item-text">{entry.data.text}</p>
  </div>
</WikiLayout>
<style>
  .wiki-item {
    padding: 40px;
    max-width: 700px;
    margin: 0 auto;
  }
  .wiki-item-text {
    line-height: 1.6;
    white-space: pre-wrap;
  }
</style>
```

- [ ] **Step 2: Verify it builds and renders**

Navigate to `http://localhost:4321/elden-ring/wiki/weapon/katana/uchigatana`.
Expected: Page loads, shows "Uchigatana" as the heading and its guide text as the body, with a working "&larr; Katana" link back to the page-listing route.

- [ ] **Step 3: Commit**

```bash
git add "web/src/pages/elden-ring/wiki/[category]/[page]/[item].astro"
git commit -m "Add wiki item content page"
```

---

### Task 8: Full build verification + live spot-check

**Files:** None created or modified — verification only.

- [ ] **Step 1: Stop the dev server and run a full production build**

This project's shell is PowerShell (the Bash tool has been unreliable throughout this project — use PowerShell for every command in this task).

```powershell
npx astro dev stop
npx astro build
```

(Run from `web/`.) Expected: Build completes with no schema or collision errors.

- [ ] **Step 2: Confirm the generated page count matches Task 1's entry count**

Count the generated item pages under `web/dist/elden-ring/wiki/` (each item page builds to `.../[category]/[page]/[item]/index.html`, 4 directory levels below `wiki/`):

```powershell
(Get-ChildItem -Path dist/elden-ring/wiki -Recurse -Filter index.html | Where-Object { ($_.FullName.Substring((Resolve-Path dist/elden-ring/wiki).Path.Length) -split '[\\/]' | Where-Object { $_ -ne '' }).Count -eq 4 }).Count
```

(Run from `web/`.) Expected: Matches the `<N>` printed by Task 1, Step 5. (Verified during actual execution: 2166, exact match.)

- [ ] **Step 3: Live spot-check after deploying**

Push to the repo's default branch — Vercel's GitHub integration auto-builds and deploys `web/` on push, same as every prior phase of this site (no `vercel.json`; Vercel auto-detects the Astro workspace). Once the deploy finishes, navigate all three URL levels for one item from a large category and one from a small category on `https://questbot-web.vercel.app`:
- `/elden-ring/wiki` → `/elden-ring/wiki/weapon` → `/elden-ring/wiki/weapon/katana` → `/elden-ring/wiki/weapon/katana/uchigatana`
- `/elden-ring/wiki` → `/elden-ring/wiki/great-rune` → `/elden-ring/wiki/great-rune/{its-one-page-slug}` → an item within it

Confirm content renders correctly and every level's back-link leads to the right parent.

- [ ] **Step 4: Commit if anything needed fixing**

If Steps 1–3 required any code changes, commit them now with a message describing the fix. If everything passed as-is, there's nothing to commit for this task.
