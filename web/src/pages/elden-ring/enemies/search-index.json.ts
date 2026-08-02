import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const entries = await getCollection('enemies');
  const index = entries.map((e) => ({ name: e.data.name, url: `/elden-ring/enemies/${e.data.npcId}` }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
