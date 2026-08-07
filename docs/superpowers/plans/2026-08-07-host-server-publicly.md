# Host server/ Publicly (Stage 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `server/`'s Fastify backend and its Postgres+pgvector database off "runs only on the developer's own machine" onto a real, always-on, publicly reachable deployment, so both the site lockdown (Stage 2) and the wiki editor (Stage 3) have something real to build against.

**Architecture:** The database moves from a portable local Postgres instance to Neon (free-tier, serverless, pgvector-capable). The Fastify app itself doesn't move to a new host — it deploys as a Vercel Serverless Function inside the *existing* `web/` Vercel project, via a single Astro catch-all API route that forwards every request to the already-existing `buildServer()` Fastify instance. No new hosting account beyond Neon; everything else piggybacks on infrastructure already in use.

**Tech Stack:** Astro (`@astrojs/vercel` adapter), Fastify (unchanged, wrapped not rewritten), Neon Postgres, npm workspaces (already configured — `web`/`server`/`client` are workspace siblings under the root `questbot` package).

## Global Constraints

- Never fabricate or guess credential values (`GEMINI_API_KEY`, Discord client secret, Stripe keys, the Neon connection string) — every task that needs one stops and asks rather than inventing a placeholder.
- Never create third-party accounts on the user's behalf (Neon, Discord Developer Portal) — those are explicitly the user's own steps; this plan hands them exact instructions at the point they're needed rather than attempting them directly.
- Keep `web/`'s existing pages statically prerendered — only the new API route becomes server-rendered (`prerender = false`); this is not a full static-to-SSR conversion of the whole site.
- Don't touch `client/` (the Electron overlay) in this plan — it still points at `http://localhost:8787` for local dev; repointing it at the new public URL is out of scope here (that's a `client/` change for whenever a real playtest happens, not part of hosting the backend).

---

### Task 1: Wire `web/` to depend on `@questbot/server` as a workspace package

**Files:**
- Modify: `web/package.json`

**Interfaces:**
- Produces: `web/`'s code can `import { buildServer } from '@questbot/server'` (or a relative path into the sibling workspace — resolved in Task 2 once the actual import is written) after `npm install` re-links the workspace.

- [ ] **Step 1: Add the workspace dependency**

Edit `web/package.json`'s `dependencies` block to add:

```json
"@questbot/server": "*"
```

- [ ] **Step 2: Re-run install from the repo root so npm links the workspace**

Run: `npm install` (from `C:\Users\migue\Claude Code\QuestBot`, the repo root — npm workspaces only re-link when install runs at the root, not inside `web/`)

Expected: no errors; `web/node_modules/@questbot/server` exists as a symlink into `../server`.

- [ ] **Step 3: Verify the link resolves**

Run (PowerShell): `Test-Path "web\node_modules\@questbot\server"`
Expected: `True`

- [ ] **Step 4: Commit**

```bash
git add web/package.json package-lock.json
git commit -m "Add @questbot/server as a workspace dependency of web/"
```

---

### Task 2: Add the Vercel adapter and a catch-all API route that forwards to Fastify

**Files:**
- Modify: `web/package.json` (add `@astrojs/vercel` dependency)
- Modify: `web/astro.config.mjs`
- Create: `web/src/pages/api/[...path].ts`

**Interfaces:**
- Consumes: `buildServer` exported from `server/src/index.ts` (already exists, returns `Promise<FastifyInstance>` — see `server/src/index.ts:9`, unchanged by this plan).
- Produces: any request to `web`'s deployed origin under `/api/ask`, `/api/feedback`, `/api/auth/*`, `/api/billing/*`, or `/api/checklist*` reaches the real Fastify routes (with the `/api` prefix stripped before forwarding, since Fastify's own routes are registered without it) — server-rendered on demand, not prerendered.

- [ ] **Step 1: Install the Vercel adapter**

Run: `npm install @astrojs/vercel -w web`

- [ ] **Step 2: Configure the adapter in `astro.config.mjs`**

Before (`web/astro.config.mjs`):
```js
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});
```

After:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
});
```

Astro's docs (`https://docs.astro.build/en/guides/routing/`, per `web/CLAUDE.md`'s own pointer to consult this before adding dynamic routes) confirm that with an adapter configured, individual pages/routes can opt out of prerendering via `export const prerender = false;` while the rest of the site stays static — check the current adapter's exact config shape against its docs before assuming the above is complete, since adapter APIs do change between versions.

- [ ] **Step 3: Write the catch-all API route**

Create `web/src/pages/api/[...path].ts`:

```ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { buildServer } from '@questbot/server';
import type { FastifyInstance } from 'fastify';

let appPromise: Promise<FastifyInstance> | null = null;

async function getApp(): Promise<FastifyInstance> {
  if (!appPromise) appPromise = buildServer().then(async (app) => {
    await app.ready();
    return app;
  });
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

  return new Response(response.rawPayload, {
    status: response.statusCode,
    headers: response.headers as HeadersInit,
  });
};
```

This uses Fastify's built-in `inject()` (normally a testing utility, but it's exactly a "hand me a request, give me back a response" function with no real socket needed — appropriate for a serverless request/response cycle where there's no persistent listening socket) rather than the raw-socket `emit('request', ...)` approach, since Astro's `APIRoute` works with the standard `Request`/`Response` Fetch API objects, not Node's raw `IncomingMessage`/`ServerResponse`.

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck -w web`
Expected: clean (no errors) — `export const ALL` is the confirmed current Astro convention for a catch-all-method endpoint (verified against `https://docs.astro.build/en/guides/endpoints/` directly, not assumed), so a typecheck failure here means something else is wrong (e.g. the `@questbot/server` import not resolving) rather than a wrong export name.

- [ ] **Step 5: Commit**

```bash
git add web/package.json web/astro.config.mjs web/src/pages/api/[...path].ts package-lock.json
git commit -m "Add Vercel-deployable API route forwarding to the Fastify backend"
```

---

### Task 3: Local end-to-end verification against the existing local database

Before touching Neon or Vercel's real deployment, prove the forwarding route itself works, using the local Postgres instance already running (started earlier this session at `postgresql://questbot@localhost:5433/questbot`).

**Files:** none (verification only)

- [ ] **Step 1: Start the Astro dev server with the local DB and a real Gemini key**

The Gemini key is required for this verification (the `/ask` route calls the real embedding/synthesis pipeline) — stop and ask the user for `GEMINI_API_KEY` here if it isn't already available in the environment; don't skip this check or fake a response.

Run (PowerShell):
```powershell
$env:DATABASE_URL = "postgresql://questbot@localhost:5433/questbot"
$env:GEMINI_API_KEY = "<user-supplied>"
npm run dev -w web
```

- [ ] **Step 2: Send a real request through the forwarded route**

Run: `curl.exe -X POST http://localhost:4321/api/ask -H "Content-Type: application/json" -d '{\"question\":\"How do I beat Malenia?\"}'`

Expected: a real synthesized answer with a source card, same shape as the README's documented A3 verification (`0.72 confidence` example) — not a 404, not a connection-refused, not a raw Fastify "route not found" body.

- [ ] **Step 3: If it fails, diagnose before moving on**

A 404 means the catch-all route isn't matching — check the adapter's routing docs. A connection error to Postgres means `DATABASE_URL` isn't reaching the Fastify instance inside the Astro route — Fastify's `buildServer()` doesn't take a connection string as a parameter (it reads `process.env.DATABASE_URL` via `server/src/db.ts:5`), so confirm the Astro dev process actually has that env var set, not just the shell it was launched from.

---

### Task 4: User creates a Neon project

**This step cannot be performed by the assistant** — creating an account on a third-party service is explicitly the user's own action, not something to automate around.

- [ ] **Step 1 (user):** Go to `https://neon.tech`, sign up (free tier), create a new project named `questbot`.
- [ ] **Step 2 (user):** In the new project, run `CREATE EXTENSION vector;` via Neon's SQL editor (Neon supports pgvector natively, but the extension still needs enabling per-database, same as the local setup did in `server/db/schema.sql:3`).
- [ ] **Step 3 (user):** Copy the connection string Neon provides (starts `postgresql://...`) and provide it back — this becomes the new `DATABASE_URL`. Stop and wait for this before continuing to Task 5.

---

### Task 5: Migrate the local database's real data into Neon

**Files:** none — this is a one-time operational migration run directly via `pg_dump`/`psql`, not application code. Unlike this project's other disposable scripts (e.g. `server/scripts/apply-calibration.ts`), there's no data transformation logic here worth wrapping in a script — it's a straight dump-and-load between two Postgres instances, so the commands below are run directly rather than committed as a file that would just be a thin wrapper around the same two CLI calls.

**Interfaces:**
- Consumes: the local DB at `postgresql://questbot@localhost:5433/questbot` (already running, schema already current per this session's earlier prep work — `chunks.page_key` and `enemy_stats` were both already added).
- Consumes: the Neon connection string from Task 4.

- [ ] **Step 1: Apply the schema to the new Neon database first**

Run (PowerShell, using the Neon connection string from Task 4):
```powershell
$psql = "C:\Users\migue\AppData\Local\Temp\claude\C--Users-migue-Claude-Code-QuestBot\7c738dee-c012-4ef2-8644-1a8ee3e8d280\scratchpad\pgbin\pgsql\bin\psql.exe"
& $psql "<neon-connection-string>" -f "server\db\schema.sql"
```

Expected: all six tables (`users`, `chunks`, `feedback`, `usage`, `item_locations`, `enemy_stats`) created cleanly on a fresh database — `schema.sql`'s `CREATE TABLE` statements aren't `IF NOT EXISTS`-guarded, which is fine here since Neon starts empty (unlike the local DB, which had drifted and needed non-destructive `ALTER`s instead).

- [ ] **Step 2: Dump the local database's data-only content**

Run (PowerShell):
```powershell
$pgdump = "C:\Users\migue\AppData\Local\Temp\claude\C--Users-migue-Claude-Code-QuestBot\7c738dee-c012-4ef2-8644-1a8ee3e8d280\scratchpad\pgbin\pgsql\bin\pg_dump.exe"
& $pgdump -p 5433 -U questbot -d questbot --data-only --column-inserts -t chunks -t item_locations -t users -t feedback -t usage -t enemy_stats -f "C:\Users\migue\AppData\Local\Temp\claude\C--Users-migue-Claude-Code-QuestBot\7c738dee-c012-4ef2-8644-1a8ee3e8d280\scratchpad\questbot-data-dump.sql"
```

`--column-inserts` (not the default COPY format) is deliberate here even though it's slower — it survives the `chunks.page_key` column existing on the local DB but being populated with `NULL` for pre-migration rows (see this session's earlier finding: the column was added via `ALTER TABLE ... ADD COLUMN` without a backfill), producing plain `INSERT`s that carry whatever `NULL`s exist rather than a COPY stream that assumes column alignment.

- [ ] **Step 3: Load the dump into Neon**

Run:
```powershell
& $psql "<neon-connection-string>" -f "C:\Users\migue\AppData\Local\Temp\claude\C--Users-migue-Claude-Code-QuestBot\7c738dee-c012-4ef2-8644-1a8ee3e8d280\scratchpad\questbot-data-dump.sql"
```

- [ ] **Step 4: Verify row counts match on both sides**

Run against both the local DB and Neon:
```powershell
& $psql -p 5433 -U questbot -d questbot -c "SELECT 'chunks', count(*) FROM chunks UNION ALL SELECT 'item_locations', count(*) FROM item_locations UNION ALL SELECT 'users', count(*) FROM users;"
& $psql "<neon-connection-string>" -c "SELECT 'chunks', count(*) FROM chunks UNION ALL SELECT 'item_locations', count(*) FROM item_locations UNION ALL SELECT 'users', count(*) FROM users;"
```

Expected: identical counts on both sides (2166 chunks, 1887 item_locations, 6 users, per this session's earlier check — confirm the live numbers match rather than assuming these exact figures still hold).

- [ ] **Step 5: Confirm nothing from this migration leaked into the repo**

The dump file contains real user data (Discord IDs, etc.) and must never be committed. Run: `git status --short` — it should show no changes at all from this task (the dump lives entirely in the scratchpad, outside the repo). If anything unexpected shows up, investigate before proceeding rather than committing it.

---

### Task 6: Configure secrets on the Vercel project and redeploy

**Files:** none (Vercel project configuration only)

- [ ] **Step 1: Confirm which secrets are already known vs. need to be asked for**

From this session's environment check, none of these exist locally: `GEMINI_API_KEY`, `DATABASE_URL`, `SESSION_SECRET`, `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`. Stop and ask the user for each one that isn't already sitting in a password manager or notes from earlier in this project — do not invent placeholder values and do not skip setting any of them silently, since a missing one will make specific routes 500 at runtime rather than fail at deploy time (per `server/src/routes/auth.ts`'s `requireEnv()` pattern, which throws per-request, not at startup).

- [ ] **Step 2: Set each one on the Vercel project**

Run per secret (repeat for each):
```powershell
npx vercel env add GEMINI_API_KEY production
```
(the CLI will prompt for the value interactively — paste it there, not on the command line, so it doesn't land in shell history)

Repeat for: `DATABASE_URL` (the Neon connection string from Task 4), `SESSION_SECRET`, `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `PUBLIC_BACKEND_URL` (set this to the real deployed URL, e.g. `https://questbot-web.vercel.app` — confirm the exact production URL first via `npx vercel ls`), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`.

- [ ] **Step 3: User updates the Discord OAuth app's redirect URI**

**This step cannot be performed by the assistant** — it requires logging into the Discord Developer Portal, which is the user's own account.

- [ ] **User:** in the Discord Developer Portal, under the existing Questbot application's OAuth2 settings, update (or add) the redirect URI to `<PUBLIC_BACKEND_URL>/auth/discord/callback` using the real value set in Step 2.

- [ ] **Step 4: Redeploy**

Run: `git push origin master` (Vercel's existing GitHub auto-deploy, already confirmed working earlier in this project, picks this up)

---

### Task 7: Real end-to-end verification against the live deployment

**Files:** none (verification only)

- [ ] **Step 1: Poll for deployment readiness**

```powershell
$sha = git rev-parse HEAD
npx vercel ls --meta githubCommitSha=$sha
# then poll `npx vercel inspect <url>` until status is Ready, same pattern used throughout this project
```

- [ ] **Step 2: Send a real request against the live URL**

```powershell
curl.exe -X POST https://questbot-web.vercel.app/api/ask -H "Content-Type: application/json" -d '{\"question\":\"How do I beat Malenia?\"}'
```

Expected: a real synthesized answer with a source card, matching the local verification from Task 3 — this is the actual proof this stage is done, not just "the deploy succeeded without erroring."

- [ ] **Step 3: Verify the Discord login round-trip works against the live URL**

Manually visit `https://questbot-web.vercel.app/api/auth/discord/start?port=1` in a browser (the `port` param only matters for the Electron client's real loopback flow — any placeholder value is fine for this check) and confirm it redirects into Discord's real consent screen rather than erroring, then confirm Discord redirects back to the real `PUBLIC_BACKEND_URL` (not `localhost`) after consenting.

- [ ] **Step 4: Report status**

Summarize what was verified (both `/ask` and the Discord OAuth redirect against the real live URL) — this is the deliverable for Stage 1; Stage 2 (site lockdown) and Stage 3 (the wiki editor) each get their own spec + plan once this is confirmed working.
