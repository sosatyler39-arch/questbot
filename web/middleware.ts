import { next } from '@vercel/functions';
import { decideSiteLockdown } from './src/lib/site-lock.js';

// Edge is the platform default, but node:crypto (used inside site-lock.ts
// via the reused session-token.ts) isn't available there — confirmed via
// Vercel's own docs, not assumed. /login and static assets are excluded so
// the login page can render its own styling before the visitor is
// authenticated; everything else, including /api/*, goes through the gate.
export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!_astro|favicon.ico|login).*)'],
};

export default function middleware(request: Request): Response {
  const url = new URL(request.url);
  const decision = decideSiteLockdown({
    pathname: url.pathname,
    cookieHeader: request.headers.get('cookie'),
    sitePasswordHeader: request.headers.get('x-site-password'),
    sessionSecret: process.env.SESSION_SECRET ?? '',
    sitePassword: process.env.SITE_PASSWORD ?? '',
  });

  if (decision.kind === 'allow') return next();
  if (decision.kind === 'redirect') {
    return new Response(null, { status: 302, headers: { Location: decision.location } });
  }
  return new Response(JSON.stringify({ error: 'unauthorized' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  });
}
