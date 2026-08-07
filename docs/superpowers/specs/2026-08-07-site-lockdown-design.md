# Site Lockdown (Stage 2) — Design

## Context

This is Stage 2 of the 3-stage effort started in
[2026-08-07-wiki-editor-and-site-lockdown-design.md](2026-08-07-wiki-editor-and-site-lockdown-design.md). Stage 1
(hosting `server/` publicly via a Vercel-deployed forwarding route + Neon database) is done and verified. This stage
locks the entire live site down to the user only, permanently for now.

## Confirmed decisions (from brainstorming)

- The lockdown covers **everything**, including the `/api/*` backend routes deployed in Stage 1 — not just the
  browsable pages. This was raised explicitly as a real, immediate cost (it breaks the user's own Elden Ring overlay
  app's ability to reach `/ask`) and confirmed as intentional.
- Because of that, the **Electron client also gets updated** in this stage so it keeps working — it needs a way to
  authenticate against the same lockdown, since it's not a browser and can't fill out a login form.
- The password is a single shared secret (`Topcat12`, user-supplied) — not a per-person or Discord-account-specific
  login. Anyone with the password gets in; this is a personal-use gate, not a real multi-user auth system.
- Free Vercel (Hobby) plan — Vercel's built-in Password Protection isn't available, so this is built into the app.

## Mechanism

**`web/middleware.ts`** — a Vercel Routing Middleware file (confirmed via Vercel's own docs, not assumed: this is a
platform-level feature that runs before any request reaches the app, works with any framework including Astro, and
supports an explicit `runtime: 'nodejs'` config — the default is `edge`, which lacks `node:crypto`). Setting
`runtime: 'nodejs'` means the exact same signed-cookie code already built for Discord sessions
(`server/src/auth/session-token.ts`'s `signSessionToken`/`verifySessionToken`, HMAC-SHA256 over a JSON payload) can
be reused directly via an import, rather than writing a second, Edge-compatible crypto implementation.

`server/package.json`'s `exports` field needs a second entry point (alongside the existing `"."` → `buildServer`) so
`session-token.ts` is importable from `web/` without dragging in Fastify/DB-dependent code:

```json
"exports": {
  ".": "./src/index.ts",
  "./auth/session-token": "./src/auth/session-token.ts"
}
```

**Routing behavior**, one `SITE_PASSWORD` secret shared by both checks below:

- **Excluded from the gate entirely** (via the middleware's `matcher` config): `/login` (the page itself, GET and
  its own POST handler) and static asset paths (Astro's bundled JS/CSS, favicon) — otherwise the login page
  couldn't render its own styling/scripts before the visitor is authenticated.
- **Every other page request**: middleware checks for a valid signed cookie (via `verifySessionToken`). Missing or
  invalid → `302` redirect to `/login`.
- **Every `/api/*` request**: middleware checks for *either* a valid signed cookie *or* a matching `X-Site-Password`
  header compared directly against `SITE_PASSWORD`. Missing/invalid → `401` JSON response (not a redirect — this is
  an API, a browser-style redirect makes no sense for the Electron client or any other API caller).

**`web/src/pages/login.astro`** — a plain password form. Its own `POST` handler compares the submitted password
against `SITE_PASSWORD`; on match, calls `signSessionToken` (30-day expiry, same convention as the existing Discord
session cookies) and sets it via `Set-Cookie`, then redirects back to wherever the visitor was originally headed
(carried as a `?next=` query param set by the middleware's redirect).

**Electron client**: a new Settings field for the site password (stored alongside existing settings, e.g. via the
same mechanism as `settings-store.ts`), sent as `X-Site-Password` on every request the client makes to the backend.

## Out of scope for this stage

- No logout button — not requested; revisit if the user wants one later.
- No rate-limiting or brute-force protection on `/login` — this is a personal-use gate on a low-traffic site, not a
  security-hardened auth system. Flagged here rather than silently added or silently skipped.
- No change to the Discord OAuth session mechanism itself — this is a separate, parallel gate in front of the whole
  site; Discord login (for the in-game assistant's own tier/identity system) still works exactly as it does today,
  just now reachable only after the site password is satisfied.
