// Builds real links into the deployed wiki (web/src/pages/elden-ring/wiki/)
// for use as chunk.url / SourceCard.url, replacing the questbot://guide/...
// placeholder. slugify/pageSlugFromUrl mirror the one-time conversion script
// that generated the wiki's own content collection (now deleted, per this
// project's disposable-script convention) — same logic, so a category/page
// pairing here always resolves to a URL that really exists on the site.
const WIKI_BASE = 'https://questbot-web.vercel.app/elden-ring/wiki';

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

export function wikiUrlFor(category: string, pageUrl: string, heading: string): string {
  const pageSlug = pageSlugFromUrl(pageUrl);
  const itemSlug = slugify(heading);
  return `${WIKI_BASE}/${category}/${pageSlug}/${itemSlug}`;
}
