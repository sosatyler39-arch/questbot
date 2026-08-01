import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Built once at Astro build time (this whole site is static output) into a
// single small JSON file the wiki index page's search box fetches once and
// filters client-side — same pattern as the existing map search
// (web/src/map/render.ts's initSearch), just over wiki entries instead of
// MapLocation, and cheaper than a real search service for ~2166 short rows.
export const GET: APIRoute = async () => {
  const entries = await getCollection('wiki');
  const index = entries.map((e) => ({
    name: e.data.name,
    pageTitle: e.data.pageTitle,
    url: `/elden-ring/wiki/${e.data.category}/${e.data.pageSlug}/${e.data.itemSlug}`,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
