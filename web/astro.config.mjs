// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // output: 'server' — verified directly against the generated
  // .vercel/output/config.json (not assumed): Vercel's Build Output API
  // runs a "handle": "filesystem" rule before anything else, so a request
  // matching a prerendered static file is served straight from the
  // filesystem and middleware never runs, regardless of middlewareMode.
  // The only reliable way to gate literally every page is to have no
  // static output to shortcut around — every page is on-demand-rendered by
  // default now (a page can still opt back into prerender: true if that's
  // ever wanted, just none currently need it).
  output: 'server',
  adapter: vercel(),
});
