// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // middlewareMode: 'edge' makes src/middleware.ts run for every request,
  // including prerendered static pages — the default only covers
  // on-demand-rendered routes, which would leave the whole static site
  // (Map, Wiki, Calculator, home) ungated. Confirmed via Astro's own docs,
  // not assumed — the naive root-level Vercel Routing Middleware approach
  // tried first silently did nothing under this adapter.
  adapter: vercel({ middlewareMode: 'edge' }),
});
