import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, pageSlugFromUrl, wikiUrlFor } from '../src/pipeline/wiki-url.js';

test('slugify lowercases, strips apostrophes, and hyphenates', () => {
  assert.equal(slugify('Golden Vow'), 'golden-vow');
  assert.equal(slugify("Ranni's questline (start)"), 'rannis-questline-start');
});

test('pageSlugFromUrl takes the last path segment regardless of scheme depth', () => {
  assert.equal(pageSlugFromUrl('questbot://guide/weapon/katana'), 'katana');
  assert.equal(pageSlugFromUrl('questbot://guide/margit-the-fell-omen'), 'margit-the-fell-omen');
});

test('wikiUrlFor builds the real 3-level wiki URL for a 2-segment placeholder', () => {
  assert.equal(
    wikiUrlFor('weapon', 'questbot://guide/weapon/katana', 'Uchigatana'),
    'https://questbot-web.vercel.app/elden-ring/wiki/weapon/katana/uchigatana',
  );
});

test('wikiUrlFor builds the real 3-level wiki URL for a 1-segment placeholder', () => {
  assert.equal(
    wikiUrlFor('general', 'questbot://guide/margit-the-fell-omen', 'Strategy'),
    'https://questbot-web.vercel.app/elden-ring/wiki/general/margit-the-fell-omen/strategy',
  );
});
