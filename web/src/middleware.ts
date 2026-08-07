import { defineMiddleware } from 'astro:middleware';
import { decideSiteLockdown } from './lib/site-lock.js';

// Astro's own middleware, not a raw Vercel Routing Middleware file — the
// Vercel adapter's middlewareMode: 'edge' (see astro.config.mjs) is what
// makes this actually run for every request, including prerendered static
// pages, not just on-demand routes (confirmed via Astro's own docs).
// /login and static assets pass straight through so the login page itself
// can render before the visitor is authenticated.
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname === '/login' || pathname.startsWith('/_astro/') || pathname === '/favicon.ico') {
    return next();
  }

  const decision = await decideSiteLockdown({
    pathname,
    cookieHeader: context.request.headers.get('cookie'),
    sitePasswordHeader: context.request.headers.get('x-site-password'),
    sessionSecret: process.env.SESSION_SECRET ?? '',
    sitePassword: process.env.SITE_PASSWORD ?? '',
  });

  if (decision.kind === 'allow') return next();
  if (decision.kind === 'redirect') return context.redirect(decision.location, 302);
  return new Response(JSON.stringify({ error: 'unauthorized' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  });
});
