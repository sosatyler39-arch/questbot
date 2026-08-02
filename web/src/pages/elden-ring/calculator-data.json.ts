import type { APIRoute } from 'astro';
import regulationData from '../../content/weapon-regulation-data.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(regulationData), {
    headers: { 'Content-Type': 'application/json' },
  });
};
