export const prerender = false;

import type { APIRoute } from 'astro';
import { buildServer } from '@questbot/server';
import type { FastifyInstance } from 'fastify';

let appPromise: Promise<FastifyInstance> | null = null;

async function getApp(): Promise<FastifyInstance> {
  if (!appPromise) {
    appPromise = buildServer().then(async (app) => {
      await app.ready();
      return app;
    });
  }
  return appPromise;
}

// Fastify already speaks plain Node http; forwarding means handing it the
// same raw request/response objects Vercel's Node runtime gives this route,
// and letting Fastify's own router (registered in server/src/index.ts)
// decide what to do with the path — this file doesn't re-implement routing.
//
// This route only ever matches requests under /api/*, but every Fastify
// route (server/src/routes/*.ts) is registered at the bare path — `/ask`,
// `/auth/discord/start`, etc, with no /api prefix at all. Strip it before
// forwarding, or every request 404s inside Fastify despite matching here.
export const ALL: APIRoute = async ({ request }) => {
  const app = await getApp();
  const url = new URL(request.url);
  const forwardedPath = url.pathname.replace(/^\/api/, '') || '/';
  const body = request.body ? Buffer.from(await request.arrayBuffer()) : undefined;

  const response = await app.inject({
    method: request.method as any,
    url: forwardedPath + url.search,
    headers: Object.fromEntries(request.headers),
    payload: body,
  });

  return new Response(new Uint8Array(response.rawPayload), {
    status: response.statusCode,
    headers: response.headers as HeadersInit,
  });
};
