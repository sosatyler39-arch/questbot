# Wiki Editor and Site Lockdown — Design

## Context

The user wants to go through the wiki's content and correct anything wrong, and asked for three
things bundled together: (1) edit any wiki entry directly, (2) move entries between wiki
categories, (3) create/destroy wiki categories. During brainstorming this grew in scope in two
ways the user explicitly confirmed:

- Editing should be **live** — writes go straight to a database and show up immediately, not the
  Shape-Editor-style "edit locally, export, apply back to a TypeScript source file" pattern used
  everywhere else in this project so far. This is a deliberate, confirmed departure from that
  pattern, not an oversight.
- An edit should also **re-embed** the corrected content, so the in-game assistant's `/ask`
  answers stay in sync with what the wiki says. Today those two surfaces (the static wiki pages
  and the `chunks` pgvector table `/ask` retrieves from) are both compiled from the same
  TypeScript source files but through two independent pipelines, so a live-editable wiki that
  doesn't also re-embed would let the two silently drift apart.
- Separately, the user wants the **entire public website locked down to just themselves**,
  permanently for now (not just the wiki editor route) — Map, Enemies, Calculator, the Download
  page, everything.

**This is a 3-stage effort, each stage strictly dependent on the previous one's output**, same
pattern as this project's existing multi-stage work (see the real-coordinate location pipeline's
own design doc for precedent). Each stage gets its own spec + plan, written when that stage is
reached. This document is Stage 1's detailed design plus the overview tying all three together.

## Confirmed decisions (from brainstorming)

- "Sub tabs" the user wants to create/destroy = the wiki's own item categories (Talismans,
  Weapons, Armor, etc.), **not** the site-wide Wiki/Map/Enemies/Calculator/Shape Editor nav.
- Editing writes live to a database; no round-trip through git-tracked source files.
- An edit re-embeds the corrected content so `/ask` reflects it immediately, not just the
  browsable wiki page.
- The whole `web/` site gets locked down to the user only, indefinitely (not just while doing
  this correction pass).
- The user is on Vercel's free Hobby plan — Vercel's built-in Password Protection is a Pro-only
  feature and isn't available, so the lockdown needs to be built into the app itself.
- The wiki editor's save/edit/re-embed logic reuses the existing `server/` Fastify backend
  (which already owns `sync.ts`, `embeddings.ts`, `store.ts`, and all database access) rather than
  duplicating a second copy of that logic inside the `web/` Astro site. This means `server/` —
  which has never been deployed anywhere, only ever run locally for dev — needs to actually go
  live for the first time.
- Hosting choice: free tier throughout, consistent with how every other piece of infrastructure
  in this project has been kept free until forced otherwise (portable local Postgres, Gemini free
  tier until quota forced an upgrade, Vercel's free subdomain).

## The 3 stages

### Stage 1: Host `server/` publicly for the first time (this stage — detailed below)

The backend and its database both need to move off "runs only in a local dev environment" to
"real, always-on, publicly reachable" before either of the other two stages has anything to build
against.

**Database — move to Neon.** Neon is free-tier Postgres with pgvector support built in,
serverless (scales to zero at rest, so an idle wiki-correction project costs nothing), and was
already named as a candidate option in this project's own README. The existing local Postgres
instance (2166 embedded chunks, 1887 item-location rows, users, feedback, usage) gets migrated
over via a real `pg_dump`/`pg_restore` (or equivalent), not re-synced from scratch — re-embedding
2166 chunks from zero would cost real Gemini API usage for no reason when the data already exists
and just needs to move.

**Backend — deploy as Vercel Serverless Functions.** Rather than opening a new account with a
third-party host (Render, Fly.io, Railway), `server/`'s Fastify app deploys onto the same Vercel
account/project structure already used for `web/` — same CLI, same secrets UI, same account the
user already knows how to inspect (`vercel ls`, `vercel inspect`, etc., used repeatedly earlier in
this project). Fastify doesn't run natively as a Vercel serverless function; the implementation
plan needs to work out the adapter/handler shape (e.g. wrapping the existing Fastify app instance
for the Vercel Node runtime) — left to the plan rather than resolved here.

**Secrets that need to exist in the new hosted environment** (all already documented in the
README's "Run" section for local dev, now needed for real): `GEMINI_API_KEY`, `DATABASE_URL` (the
new Neon connection string), `SESSION_SECRET`, `DISCORD_CLIENT_ID`/`DISCORD_CLIENT_SECRET`,
`PUBLIC_BACKEND_URL` (the new public backend URL, once known), `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`. The Discord OAuth app's registered redirect URI
(`$PUBLIC_BACKEND_URL/auth/discord/callback`) needs updating to match the new public URL.

**Verification for this stage:** the deployed backend answers a real `/ask` request end-to-end
against the migrated Neon database (same kind of live verification this project has done for
every other piece of real infrastructure — not just "it deployed without erroring").

### Stage 2: Lock the whole site down to just the user

Not detailed yet — written up as its own spec when Stage 1 is done and verified. Known
requirements going in: a Vercel Edge Middleware in front of every route (works regardless of the
site's static output, no Astro SSR conversion needed) that checks for a valid session and
redirects to a login page otherwise; a single shared password (not a full Discord-account-specific
login, since that's meaningfully more to build for a personal-use gate) checked against a secret,
setting a signed cookie on success. Applies to the entire site, not just the future wiki editor
route.

### Stage 3: The wiki editor itself

Not detailed yet — written up as its own spec when Stage 2 is done. Known requirements going in:
edit any wiki entry live (writes to the database, visible immediately); move an entry between
categories; create and destroy categories; every save also re-embeds the affected content so
`/ask` answers stay in sync, not just the browsable wiki page. Runs behind Stage 2's lockdown, so
no separate access-control work needed at this layer — anyone who reaches it already passed the
site-wide gate.

## Out of scope for now

- No public/multi-user editing model — this is a single-operator correction tool, not a
  collaborative wiki.
- No change to how the map or the Electron client's local content works — this only affects the
  `web/` site and the `server/` backend it will now call.
- No decision yet on ever reopening the site to the public — the user said permanent "for now,"
  not never; revisit if that changes.
