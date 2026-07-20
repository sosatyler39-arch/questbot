# A1: Discord OAuth + Stripe Identity/Tier Enforcement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the trust-the-client `x-user-id`/`x-user-tier` headers with real Discord-account identity and a Stripe-backed subscription tier, enforced server-side, so continuous memory and live-search fallback are actually gated instead of "open to everyone" (FEATURE_ADDENDUM.md §A1).

**Architecture:** Backend issues its own short-lived signed session token (HMAC over JSON, stdlib `node:crypto` — no `jsonwebtoken` dependency needed for a single-service HS256-shaped token) after a Discord OAuth2 authorization-code exchange. The Electron client never talks to Discord or Stripe directly — it opens the system browser to a backend-hosted `/auth/discord/start` URL and receives the session token back via a short-lived loopback HTTP server it spins up itself (RFC 8252 native-app pattern), avoiding custom-protocol-handler registration. Stripe Checkout (subscription mode) + a webhook endpoint keep `users.tier` current. `tiers.ts#getUser` verifies the session token and reads tier from Postgres instead of trusting request headers.

**Tech Stack:** Fastify (existing), `node:crypto` HMAC session tokens (no new dependency), `stripe` npm package (official SDK — webhook signature verification is a security path, not a hand-roll candidate), Node's global `fetch` for Discord's REST API (no HTTP client dependency needed), `node:http` for the client's loopback callback server, Electron's `shell.openExternal`.

## Global Constraints

- No API keys in the client (brief §6) — Discord client secret and Stripe secret key live only in the backend process env.
- Tier gating must be enforced server-side, not client-trusted (FEATURE_ADDENDUM §A1).
- Price point stays configurable, not hardcoded (brief §7) — Stripe Price ID via env var.
- Don't reintroduce Overwolf identity — plain Electron, no Overwolf dependency (memory: project-questbot-client-architecture).
- Follow existing patterns: hand-rolled persistence over new deps where stdlib suffices (memory: settings-store.ts precedent), `tsx --test` for tests, live-service test cases skip without credentials (existing `ask.test.ts` pattern).

---

### Task 1: Session token (stdlib HMAC, no JWT library)

**Files:**
- Create: `server/src/auth/session-token.ts`
- Test: `server/test/session-token.test.ts`

**Interfaces:**
- Produces: `signSessionToken(discordId: string, secret: string): string`, `verifySessionToken(token: string, secret: string): { discordId: string } | null`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signSessionToken, verifySessionToken } from '../src/auth/session-token.js';

test('session token round-trips and rejects tampering', () => {
  const token = signSessionToken('discord-123', 'test-secret');
  const payload = verifySessionToken(token, 'test-secret');
  assert.equal(payload?.discordId, 'discord-123');

  assert.equal(verifySessionToken(token, 'wrong-secret'), null);
  assert.equal(verifySessionToken(token + 'x', 'test-secret'), null);
  assert.equal(verifySessionToken('not-a-token', 'test-secret'), null);
});

test('session token rejects an expired payload', () => {
  const token = signSessionToken('discord-123', 'test-secret', Date.now() - 1000);
  assert.equal(verifySessionToken(token, 'test-secret'), null);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd server && npx tsx --test test/session-token.test.ts`
Expected: FAIL — `session-token.js` not found.

- [ ] **Step 3: Write minimal implementation**

```ts
import { createHmac, timingSafeEqual } from 'node:crypto';

// Hand-rolled instead of `jsonwebtoken`: this is a single-service session
// token (backend signs, backend verifies), so full JWT/JOSE compliance
// buys nothing — HMAC over a JSON payload is a few lines with node:crypto.
interface SessionPayload {
  discordId: string;
  exp: number; // epoch ms
}

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function signSessionToken(discordId: string, secret: string, expiresAt = Date.now() + THIRTY_DAYS_MS): string {
  const payload: SessionPayload = { discordId, exp: expiresAt };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string, secret: string): { discordId: string } | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expectedSig = createHmac('sha256', secret).update(body).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
  } catch {
    return null;
  }
  if (typeof payload.discordId !== 'string' || typeof payload.exp !== 'number') return null;
  if (Date.now() > payload.exp) return null;
  return { discordId: payload.discordId };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd server && npx tsx --test test/session-token.test.ts`
Expected: PASS (both tests)

- [ ] **Step 5: Commit**

```bash
git add server/src/auth/session-token.ts server/test/session-token.test.ts
git commit -m "feat(auth): add stdlib HMAC session tokens"
```

---

### Task 2: Users table migration off `overwolf_id`

**Files:**
- Modify: `server/db/schema.sql`

**Interfaces:**
- Produces: `users` table with `discord_id TEXT PRIMARY KEY`, `discord_username TEXT NOT NULL`, `tier TEXT`, `stripe_customer_id TEXT`, `created_at`. `feedback.overwolf_id` renamed to `feedback.discord_id`. `usage.overwolf_id` renamed to `usage.discord_id`.

- [ ] **Step 1: Edit schema.sql**

```sql
-- Questbot schema. Applied against a local Postgres+pgvector instance —
-- see README "Local database" for setup.
CREATE EXTENSION IF NOT EXISTS vector;

-- Keyed on Discord user ID (OAuth2 identify scope). Stripe webhooks update tier.
CREATE TABLE users (
  discord_id       TEXT PRIMARY KEY,
  discord_username TEXT NOT NULL,
  tier               TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'paid')),
  stripe_customer_id TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pre-embedded content: original-writing article sections + (future) video
-- transcript segments.
CREATE TABLE chunks (
  id            BIGSERIAL PRIMARY KEY,
  source_type   TEXT NOT NULL CHECK (source_type IN ('article', 'video')),
  title         TEXT NOT NULL,
  url           TEXT NOT NULL,
  content       TEXT NOT NULL,
  video_id      TEXT,     -- video chunks only
  start_seconds INT,      -- video chunks only
  embedding     vector(1536),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (source_type <> 'video' OR (video_id IS NOT NULL AND start_seconds IS NOT NULL))
);
CREATE INDEX chunks_embedding_idx ON chunks USING hnsw (embedding vector_cosine_ops);

-- Thumbs up/down per answer, for quality tracking.
CREATE TABLE feedback (
  id          BIGSERIAL PRIMARY KEY,
  answer_id   UUID NOT NULL,
  discord_id  TEXT,
  helpful     BOOLEAN NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-user metering (LLM calls cost money; paid features cost more).
CREATE TABLE usage (
  id          BIGSERIAL PRIMARY KEY,
  discord_id  TEXT NOT NULL,
  kind        TEXT NOT NULL, -- 'ask' | 'live_search' | ...
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- [ ] **Step 2: No automated test** — schema-only change, exercised by Task 3's integration test against `DATABASE_URL` when available (skips otherwise, matching existing `ask.test.ts` convention). Note in README that an existing dev DB needs `DROP TABLE users, feedback, usage CASCADE;` then re-apply, since there's no production data yet (pre-beta).

- [ ] **Step 3: Commit**

```bash
git add server/db/schema.sql
git commit -m "feat(auth): migrate users table from overwolf_id to discord_id"
```

---

### Task 3: User store (DB-backed upsert/lookup)

**Files:**
- Create: `server/src/auth/users.ts`
- Test: `server/test/users.test.ts`

**Interfaces:**
- Consumes: `pool` from `server/src/db.ts`
- Produces: `upsertDiscordUser(discordId: string, username: string): Promise<{ tier: Tier }>`, `getUserTier(discordId: string): Promise<Tier>` (returns `'free'` if the user doesn't exist), `setStripeCustomer(discordId: string, stripeCustomerId: string): Promise<void>`, `setTierByStripeCustomer(stripeCustomerId: string, tier: Tier): Promise<void>`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upsertDiscordUser, getUserTier, setStripeCustomer, setTierByStripeCustomer } from '../src/auth/users.js';

const skip = !process.env.DATABASE_URL;

test('upsert, tier lookup, and stripe-linked tier update', { skip }, async () => {
  const id = `test-${Date.now()}`;
  await upsertDiscordUser(id, 'tester#0001');
  assert.equal(await getUserTier(id), 'free');

  await setStripeCustomer(id, `cus_${id}`);
  await setTierByStripeCustomer(`cus_${id}`, 'paid');
  assert.equal(await getUserTier(id), 'paid');
});

test('unknown user defaults to free tier', { skip }, async () => {
  assert.equal(await getUserTier('no-such-user'), 'free');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd server && npx tsx --test test/users.test.ts`
Expected: FAIL (skips if no `DATABASE_URL`; otherwise FAIL — module not found)

- [ ] **Step 3: Write minimal implementation**

```ts
import { pool } from '../db.js';
import type { Tier } from '../../../shared/types.js';

export async function upsertDiscordUser(discordId: string, username: string): Promise<{ tier: Tier }> {
  const { rows } = await pool.query<{ tier: Tier }>(
    `INSERT INTO users (discord_id, discord_username)
     VALUES ($1, $2)
     ON CONFLICT (discord_id) DO UPDATE SET discord_username = EXCLUDED.discord_username
     RETURNING tier`,
    [discordId, username],
  );
  return { tier: rows[0].tier };
}

export async function getUserTier(discordId: string): Promise<Tier> {
  const { rows } = await pool.query<{ tier: Tier }>('SELECT tier FROM users WHERE discord_id = $1', [discordId]);
  return rows[0]?.tier ?? 'free';
}

export async function setStripeCustomer(discordId: string, stripeCustomerId: string): Promise<void> {
  await pool.query('UPDATE users SET stripe_customer_id = $1 WHERE discord_id = $2', [stripeCustomerId, discordId]);
}

export async function setTierByStripeCustomer(stripeCustomerId: string, tier: Tier): Promise<void> {
  await pool.query('UPDATE users SET tier = $1 WHERE stripe_customer_id = $2', [tier, stripeCustomerId]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd server && npx tsx --test test/users.test.ts`
Expected: PASS if `DATABASE_URL` set (schema from Task 2 applied), else SKIP (2 skipped, 0 failed)

- [ ] **Step 5: Commit**

```bash
git add server/src/auth/users.ts server/test/users.test.ts
git commit -m "feat(auth): add Discord-keyed user store"
```

---

### Task 4: Discord OAuth2 exchange helper

**Files:**
- Create: `server/src/auth/discord.ts`

**Interfaces:**
- Produces: `discordAuthorizeUrl(redirectUri: string, state: string): string`, `exchangeDiscordCode(code: string, redirectUri: string): Promise<{ id: string; username: string }>`

- [ ] **Step 1: Write the implementation directly** (thin wrapper around two documented REST calls — verified against docs.discord.com/developers/topics/oauth2 in this session; not worth a mocked-fetch unit test, exercised live by Task 5's route test)

```ts
const DISCORD_API = 'https://discord.com/api/v10';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

export function discordAuthorizeUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: requireEnv('DISCORD_CLIENT_ID'),
    scope: 'identify',
    redirect_uri: redirectUri,
    state,
  });
  return `https://discord.com/oauth2/authorize?${params}`;
}

export async function exchangeDiscordCode(code: string, redirectUri: string): Promise<{ id: string; username: string }> {
  const tokenRes = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: requireEnv('DISCORD_CLIENT_ID'),
      client_secret: requireEnv('DISCORD_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!tokenRes.ok) throw new Error(`Discord token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const userRes = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { authorization: `Bearer ${access_token}` },
  });
  if (!userRes.ok) throw new Error(`Discord user fetch failed: ${userRes.status}`);
  const user = (await userRes.json()) as { id: string; username: string };
  return { id: user.id, username: user.username };
}
```

- [ ] **Step 2: Commit**

```bash
git add server/src/auth/discord.ts
git commit -m "feat(auth): add Discord OAuth2 authorization-code exchange"
```

---

### Task 5: Auth routes (`/auth/discord/start`, `/auth/discord/callback`, `/auth/me`)

**Files:**
- Create: `server/src/routes/auth.ts`
- Modify: `server/src/index.ts` (register the new route)
- Test: `server/test/auth.test.ts`

**Interfaces:**
- Consumes: `discordAuthorizeUrl`, `exchangeDiscordCode` (Task 4), `upsertDiscordUser` (Task 3), `signSessionToken`, `verifySessionToken` (Task 1)
- Produces: `GET /auth/discord/start?port=<n>` (302 to Discord), `GET /auth/discord/callback?code&state` (302 to `http://127.0.0.1:<port>/callback?token=<session-token>`), `GET /auth/me` (reads `Authorization: Bearer <token>`, returns `{ discordId, tier }` or 401)

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildServer } from '../src/index.js';

test('/auth/me rejects a missing or garbage token', async (t) => {
  const app = await buildServer();
  t.after(() => app.close());

  const noAuth = await app.inject({ method: 'GET', url: '/auth/me' });
  assert.equal(noAuth.statusCode, 401);

  const badAuth = await app.inject({ method: 'GET', url: '/auth/me', headers: { authorization: 'Bearer garbage' } });
  assert.equal(badAuth.statusCode, 401);
});

test('/auth/discord/start redirects to Discord with state carrying the callback port', async (t) => {
  process.env.DISCORD_CLIENT_ID = 'test-client-id';
  const app = await buildServer();
  t.after(() => app.close());

  const res = await app.inject({ method: 'GET', url: '/auth/discord/start?port=54321' });
  assert.equal(res.statusCode, 302);
  const location = res.headers.location as string;
  assert.match(location, /^https:\/\/discord\.com\/oauth2\/authorize\?/);
  assert.match(location, /client_id=test-client-id/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd server && npx tsx --test test/auth.test.ts`
Expected: FAIL — route not found (404 instead of 401/302)

- [ ] **Step 3: Write minimal implementation**

```ts
// server/src/routes/auth.ts
import type { FastifyInstance } from 'fastify';
import { randomBytes } from 'node:crypto';
import { discordAuthorizeUrl, exchangeDiscordCode } from '../auth/discord.js';
import { upsertDiscordUser, getUserTier } from '../auth/users.js';
import { signSessionToken, verifySessionToken } from '../auth/session-token.js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function backendCallbackUrl(req: { protocol: string; hostname: string }): string {
  // Fixed backend redirect_uri registered with Discord; the ephemeral
  // client loopback port travels in `state`, not in redirect_uri itself —
  // avoids needing to pre-register a wildcard/dynamic URI with Discord.
  const base = process.env.PUBLIC_BACKEND_URL ?? `${req.protocol}://${req.hostname}:8787`;
  return `${base}/auth/discord/callback`;
}

export default async function authRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { port: string } }>('/auth/discord/start', async (req, reply) => {
    const port = Number(req.query.port);
    if (!Number.isInteger(port) || port <= 0) return reply.code(400).send({ error: 'invalid port' });

    // state = <csrf-nonce>.<client-port>, signed so the callback can trust
    // the embedded port without a server-side session store.
    const nonce = randomBytes(16).toString('base64url');
    const state = signSessionToken(`port:${port}:${nonce}`, requireEnv('SESSION_SECRET'), Date.now() + 5 * 60 * 1000);
    return reply.redirect(discordAuthorizeUrl(backendCallbackUrl(req), state));
  });

  app.get<{ Querystring: { code: string; state: string } }>('/auth/discord/callback', async (req, reply) => {
    const { code, state } = req.query;
    const verified = verifySessionToken(state, requireEnv('SESSION_SECRET'));
    const match = verified && /^port:(\d+):/.exec(verified.discordId);
    if (!code || !match) return reply.code(400).send({ error: 'invalid or expired state' });
    const clientPort = Number(match[1]);

    const discordUser = await exchangeDiscordCode(code, backendCallbackUrl(req));
    await upsertDiscordUser(discordUser.id, discordUser.username);
    const token = signSessionToken(discordUser.id, requireEnv('SESSION_SECRET'));
    return reply.redirect(`http://127.0.0.1:${clientPort}/callback?token=${encodeURIComponent(token)}`);
  });

  app.get('/auth/me', async (req, reply) => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
    const verified = token && verifySessionToken(token, requireEnv('SESSION_SECRET'));
    if (!verified) return reply.code(401).send({ error: 'unauthorized' });
    const tier = await getUserTier(verified.discordId);
    return { discordId: verified.discordId, tier };
  });
}
```

- [ ] **Step 4: Wire into server/src/index.ts**

```ts
import authRoutes from './routes/auth.js';
// ...
await app.register(authRoutes);
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd server && SESSION_SECRET=test-secret npx tsx --test test/auth.test.ts`
Expected: PASS (both tests)

- [ ] **Step 6: Commit**

```bash
git add server/src/routes/auth.ts server/src/index.ts server/test/auth.test.ts
git commit -m "feat(auth): add Discord OAuth start/callback/me routes"
```

---

### Task 6: `tiers.ts` verifies the session token instead of trusting headers; `ask.ts` truncates screenshots for free tier

**Files:**
- Modify: `server/src/tiers.ts`
- Modify: `server/src/routes/ask.ts`
- Test: `server/test/ask.test.ts` (extend)

**Interfaces:**
- Produces: `getUser(req): Promise<{ userId: string; tier: Tier }>` (now async — reads DB tier via a verified token; anonymous/invalid token = `'anonymous'` + `'free'`, same permissive-for-unauthenticated behavior as before, but no client-claimed tier is ever trusted)

- [ ] **Step 1: Write the failing test (extends existing ask.test.ts)**

```ts
// add to server/test/ask.test.ts, inside the existing test('mocked end-to-end ask flow', ...)
await t.test('client-claimed x-user-tier header is ignored (no real session)', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/ask',
    payload: { question: 'zzz completely unrelated gibberish qqq' },
    headers: { 'x-user-tier': 'paid' }, // no Authorization bearer token behind this claim
  });
  const body = res.json();
  // Without a verified session, tier must fall back to free — the old
  // header-trust path must no longer grant paid behavior.
  assert.equal(body.lowConfidence, true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd server && npx tsx --test test/ask.test.ts`
Expected: FAIL — current `getUser` still trusts `x-user-tier` header, so `lowConfidence` would be undefined/false

- [ ] **Step 3: Update tiers.ts**

```ts
import type { FastifyRequest } from 'fastify';
import type { Tier } from '../../shared/types.js';
import { verifySessionToken } from './auth/session-token.js';
import { getUserTier } from './auth/users.js';

export const CONFIDENCE_THRESHOLD = 0.35;

// Real identity: verifies the backend-issued session token (see
// routes/auth.ts). No client-claimed header is ever trusted for tier —
// closes the gap FEATURE_ADDENDUM.md §A1 flagged. No/invalid token still
// works, as 'anonymous'/'free' — same as an unauthenticated player before
// this change, just no longer able to self-declare 'paid'.
export async function getUser(req: FastifyRequest): Promise<{ userId: string; tier: Tier }> {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
  const secret = process.env.SESSION_SECRET;
  const verified = token && secret ? verifySessionToken(token, secret) : null;
  if (!verified) return { userId: 'anonymous', tier: 'free' };
  const tier = await getUserTier(verified.discordId);
  return { userId: verified.discordId, tier };
}
```

- [ ] **Step 4: Update ask.ts call site (now async) and truncate screenshots for free tier**

```ts
// server/src/routes/ask.ts — inside the handler, replace:
//   const { userId, tier } = getUser(req);
// with:
    const { userId, tier } = await getUser(req);

    // Continuous memory (multi-frame context) is paid-only (brief §5/§7).
    // Server-side enforcement point: a free-tier client can still buffer
    // and send extra frames locally, but only the newest is ever used.
    const allowedScreenshots = tier === 'paid' ? screenshots : screenshots?.slice(0, 1);
```

  and change `extractGameContext(screenshots)` to `extractGameContext(allowedScreenshots)`.

- [ ] **Step 5: Update feedback.ts call site (also now async)**

```ts
// server/src/routes/feedback.ts — replace:
//   const { userId } = getUser(req);
// with:
    const { userId } = await getUser(req);
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd server && npx tsx --test test/ask.test.ts`
Expected: PASS (new test + all previously-passing tests still pass; live-retrieval-dependent tests still skip without credentials)

- [ ] **Step 7: Commit**

```bash
git add server/src/tiers.ts server/src/routes/ask.ts server/src/routes/feedback.ts server/test/ask.test.ts
git commit -m "feat(auth): enforce tier server-side via verified session token"
```

---

### Task 7: Stripe checkout + webhook

**Files:**
- Create: `server/src/routes/billing.ts`
- Modify: `server/src/index.ts` (register route; webhook needs the raw body, registered before the JSON body parser touches that route)
- Modify: `server/package.json` (add `stripe` dependency)
- Test: `server/test/billing.test.ts`

**Interfaces:**
- Consumes: `setStripeCustomer`, `setTierByStripeCustomer` (Task 3), `verifySessionToken` (Task 1)
- Produces: `POST /billing/checkout` (authenticated, 302 to Stripe Checkout), `POST /billing/webhook` (Stripe calls this)

- [ ] **Step 1: Install dependency**

```bash
cd server && npm install stripe
```

- [ ] **Step 2: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildServer } from '../src/index.js';

test('/billing/checkout requires a real session', async (t) => {
  const app = await buildServer();
  t.after(() => app.close());
  const res = await app.inject({ method: 'POST', url: '/billing/checkout' });
  assert.equal(res.statusCode, 401);
});

test('/billing/webhook rejects a bad signature', { skip: !process.env.STRIPE_SECRET_KEY }, async (t) => {
  const app = await buildServer();
  t.after(() => app.close());
  const res = await app.inject({
    method: 'POST',
    url: '/billing/webhook',
    headers: { 'stripe-signature': 'bad', 'content-type': 'application/json' },
    payload: JSON.stringify({ type: 'checkout.session.completed' }),
  });
  assert.equal(res.statusCode, 400);
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd server && npx tsx --test test/billing.test.ts`
Expected: FAIL — route not found (404 instead of 401/400)

- [ ] **Step 4: Write minimal implementation**

```ts
// server/src/routes/billing.ts
import type { FastifyInstance } from 'fastify';
import Stripe from 'stripe';
import { verifySessionToken } from '../auth/session-token.js';
import { setStripeCustomer, setTierByStripeCustomer } from '../auth/users.js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function stripeClient(): Stripe {
  return new Stripe(requireEnv('STRIPE_SECRET_KEY'));
}

export default async function billingRoutes(app: FastifyInstance) {
  app.post('/billing/checkout', async (req, reply) => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
    const verified = token && verifySessionToken(token, requireEnv('SESSION_SECRET'));
    if (!verified) return reply.code(401).send({ error: 'unauthorized' });

    const session = await stripeClient().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: requireEnv('STRIPE_PRICE_ID'), quantity: 1 }],
      client_reference_id: verified.discordId,
      success_url: `${requireEnv('PUBLIC_BACKEND_URL')}/billing/success`,
      cancel_url: `${requireEnv('PUBLIC_BACKEND_URL')}/billing/cancelled`,
    });
    return reply.redirect(session.url!);
  });

  // Raw body needed for signature verification — Fastify's default JSON
  // parser would otherwise consume/reshape the body first.
  app.post(
    '/billing/webhook',
    { config: { rawBody: true } },
    async (req, reply) => {
      const sig = req.headers['stripe-signature'];
      if (!sig || typeof sig !== 'string') return reply.code(400).send({ error: 'missing signature' });

      let event: Stripe.Event;
      try {
        event = stripeClient().webhooks.constructEvent(
          req.rawBody as string,
          sig,
          requireEnv('STRIPE_WEBHOOK_SECRET'),
        );
      } catch (err) {
        req.log.warn({ err }, 'stripe webhook signature verification failed');
        return reply.code(400).send({ error: 'invalid signature' });
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.client_reference_id && session.customer) {
          await setStripeCustomer(session.client_reference_id, session.customer as string);
          await setTierByStripeCustomer(session.customer as string, 'paid');
        }
      } else if (event.type === 'customer.subscription.deleted') {
        const sub = event.data.object as Stripe.Subscription;
        await setTierByStripeCustomer(sub.customer as string, 'free');
      }
      return reply.send({ received: true });
    },
  );
}
```

- [ ] **Step 5: Register the route and enable raw-body capture in index.ts**

```ts
// server/src/index.ts
import billingRoutes from './routes/billing.js';
// ...
app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  (req as any).rawBody = body;
  try {
    done(null, body.length ? JSON.parse(body as string) : {});
  } catch (err) {
    done(err as Error, undefined);
  }
});
// ...
await app.register(billingRoutes);
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd server && SESSION_SECRET=test-secret npx tsx --test test/billing.test.ts`
Expected: PASS (checkout test always runs; webhook test skips without `STRIPE_SECRET_KEY`)

- [ ] **Step 7: Commit**

```bash
git add server/src/routes/billing.ts server/src/index.ts server/package.json server/package-lock.json server/test/billing.test.ts
git commit -m "feat(billing): add Stripe checkout + webhook, tier updates on subscription events"
```

---

### Task 8: Client sign-in flow (loopback callback server + Settings panel UI)

**Files:**
- Create: `client/src/main/auth.ts`
- Modify: `client/src/main/index.ts` (register `sign-in`/`sign-out`/`get-auth-state` IPC handlers)
- Modify: `client/src/main/preload.ts` (expose `signIn`, `signOut`, `getAuthState`)
- Modify: `client/src/renderer/api.ts` (send `Authorization: Bearer <token>` instead of `x-user-id`/spoofed tier)
- Modify: `client/src/renderer/settings.ts`, `client/src/renderer/popup.html` (sign-in/upgrade UI in the Settings panel)
- Test: `client/test/auth.test.ts`

**Interfaces:**
- Consumes: `signSessionToken`/token shape is opaque to the client (just a string it stores and forwards)
- Produces: `startDiscordSignIn(backendUrl: string): Promise<string>` (resolves with the session token once the loopback callback fires), `getStoredToken(): string | undefined`, `clearStoredToken(): void`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCallbackToken } from '../src/main/auth.js';

test('parseCallbackToken extracts token from a loopback callback URL', () => {
  assert.equal(parseCallbackToken('/callback?token=abc.def'), 'abc.def');
  assert.equal(parseCallbackToken('/callback?token=abc%2Edef'), 'abc.def');
  assert.equal(parseCallbackToken('/other'), undefined);
  assert.equal(parseCallbackToken('/callback'), undefined);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd client && npx tsx --test test/auth.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// client/src/main/auth.ts
import { createServer } from 'node:http';
import { shell } from 'electron';
import fs from 'node:fs';
import { getSettings, updateSettings } from './settings-store.js';

export function parseCallbackToken(urlPath: string): string | undefined {
  const url = new URL(urlPath, 'http://127.0.0.1');
  if (url.pathname !== '/callback') return undefined;
  const token = url.searchParams.get('token');
  return token ?? undefined;
}

// Opens the system browser to the backend's Discord OAuth start URL, and
// spins up a one-shot loopback HTTP server to receive the session token
// back (RFC 8252 native-app redirect pattern) — no custom protocol handler
// registration needed, no token ever passes through Discord's own redirect
// directly to the client (backend mediates the exchange; brief §6, "no API
// keys in the client" extends naturally to no OAuth client secret either).
export function startDiscordSignIn(backendUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const token = req.url ? parseCallbackToken(req.url) : undefined;
      res.setHeader('content-type', 'text/html');
      res.end(token ? '<p>Signed in — you can close this tab.</p>' : '<p>Sign-in failed.</p>');
      server.close();
      if (token) resolve(token);
      else reject(new Error('no token in callback'));
    });
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : undefined;
      if (!port) {
        server.close();
        reject(new Error('failed to bind loopback server'));
        return;
      }
      void shell.openExternal(`${backendUrl}/auth/discord/start?port=${port}`);
    });
    server.on('error', reject);
  });
}

export function getStoredToken(): string | undefined {
  return getSettings().sessionToken;
}

export function storeToken(token: string): void {
  updateSettings({ sessionToken: token });
}

export function clearStoredToken(): void {
  updateSettings({ sessionToken: undefined });
}
```

- [ ] **Step 4: Add `sessionToken` to `QuestbotSettings`**

```ts
// client/src/main/settings-store.ts — add to the interface and DEFAULT_SETTINGS/normalize:
export interface QuestbotSettings {
  popupHotkey: string;
  continuousMemoryHotkey: string;
  continuousMemoryBufferMinutes: number;
  sessionToken?: string;
}
// DEFAULT_SETTINGS gets no sessionToken key (stays undefined by default).
// normalize() adds: sessionToken: typeof obj.sessionToken === 'string' ? obj.sessionToken : undefined,
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd client && npx tsx --test test/auth.test.ts`
Expected: PASS

- [ ] **Step 6: Wire IPC (index.ts + preload.ts)**

```ts
// client/src/main/index.ts — add:
import { startDiscordSignIn, getStoredToken, storeToken, clearStoredToken } from './auth.js';
// ...inside app.whenReady().then(...):
  ipcMain.handle('sign-in', async () => {
    const token = await startDiscordSignIn(BACKEND_URL);
    storeToken(token);
    return true;
  });
  ipcMain.handle('sign-out', () => {
    clearStoredToken();
  });
  ipcMain.handle('get-auth-token', () => getStoredToken());
```

Note: `BACKEND_URL` should be hoisted to a shared constant (currently duplicated as a literal in `client/src/renderer/api.ts`) — add `const BACKEND_URL = 'http://localhost:8787';` near the top of `index.ts` alongside the existing `GAME_WINDOW_TITLE` constant.

```ts
// client/src/main/preload.ts — add to the exposeInMainWorld object:
  signIn: (): Promise<boolean> => ipcRenderer.invoke('sign-in'),
  signOut: (): Promise<void> => ipcRenderer.invoke('sign-out'),
  getAuthToken: (): Promise<string | undefined> => ipcRenderer.invoke('get-auth-token'),
```

- [ ] **Step 7: Use the token in api.ts, add sign-in UI to Settings**

```ts
// client/src/renderer/api.ts — replace getUserId()/its call sites:
async function authHeader(): Promise<Record<string, string>> {
  const token = await window.questbot.getAuthToken();
  return token ? { authorization: `Bearer ${token}` } : {};
}

export async function ask(question: string, screenshots: string[]): Promise<AskResponse> {
  const body: AskRequest = { question, screenshots: screenshots.length ? screenshots : undefined };
  const res = await fetch(`${BACKEND_URL}/ask`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(await authHeader()) },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ask failed: ${res.status}`);
  return res.json();
}
// sendFeedback gets the same ...(await authHeader()) treatment, x-user-id header dropped.
```

```html
<!-- client/src/renderer/popup.html — new settings-section, after "Continuous memory" -->
<div class="settings-section">
  <h3>Account</h3>
  <div class="settings-row">
    <span id="account-status" class="settings-label">Not signed in</span>
    <button id="account-sign-in" type="button">Sign in with Discord</button>
    <button id="account-sign-out" type="button" hidden>Sign out</button>
  </div>
  <div class="settings-row">
    <button id="account-upgrade" type="button" hidden>Upgrade to paid</button>
  </div>
</div>
```

```ts
// client/src/renderer/settings.ts — add near the other element lookups and openSettings():
const accountStatus = document.getElementById('account-status')!;
const accountSignIn = document.getElementById('account-sign-in') as HTMLButtonElement;
const accountSignOut = document.getElementById('account-sign-out') as HTMLButtonElement;

async function refreshAccountStatus(): Promise<void> {
  const token = await window.questbot.getAuthToken();
  accountStatus.textContent = token ? 'Signed in' : 'Not signed in';
  accountSignIn.hidden = !!token;
  accountSignOut.hidden = !token;
}

accountSignIn.addEventListener('click', async () => {
  accountStatus.textContent = 'Waiting for browser sign-in…';
  await window.questbot.signIn();
  await refreshAccountStatus();
});
accountSignOut.addEventListener('click', async () => {
  await window.questbot.signOut();
  await refreshAccountStatus();
});
// call `void refreshAccountStatus();` inside openSettings()
```

- [ ] **Step 8: Update `client/src/renderer/questbot.d.ts`** with the three new `window.questbot` methods (`signIn(): Promise<boolean>`, `signOut(): Promise<void>`, `getAuthToken(): Promise<string | undefined>`).

- [ ] **Step 9: Typecheck**

Run: `npm run typecheck -w client`
Expected: clean (no errors)

- [ ] **Step 10: Commit**

```bash
git add client/src/main/auth.ts client/src/main/index.ts client/src/main/preload.ts client/src/main/settings-store.ts client/src/renderer/api.ts client/src/renderer/settings.ts client/src/renderer/popup.html client/src/renderer/questbot.d.ts client/test/auth.test.ts
git commit -m "feat(auth): add client-side Discord sign-in flow and Settings UI"
```

---

### Task 9: README updates

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document new env vars** (`SESSION_SECRET`, `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `PUBLIC_BACKEND_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`) in the "Run" section, matching the existing `GEMINI_API_KEY`/`DATABASE_URL` style. Note the dev-DB migration note from Task 2. Move the "Real payment/tier enforcement — still deferred" line out of "Blocking prerequisites before beta" since A1 now closes it.
- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document Discord OAuth + Stripe env vars and setup"
```

---

## Self-review notes

- **Coverage:** identity replacement (Tasks 1, 3, 4, 5, 6, 8), tier enforcement closing the "open to everyone" gap for both continuous memory (Task 6's screenshot truncation) and live-search fallback (Task 6, already gated by `tier` — now a *real* tier), billing (Task 7), config-not-hardcoded price (Task 7's `STRIPE_PRICE_ID` env var), no client API keys (Discord secret + Stripe secret stay server-side; client only ever sees the backend's own session token).
- **Deferred, called out rather than silently dropped:** persisting `usage`/`feedback` rows against the new `discord_id` column isn't wired into route handlers yet (they still log in-memory / don't insert) — pre-existing gap, not introduced here, left as-is since A1's scope is identity + tier, not analytics.
