# Site Lockdown (Stage 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lock the entire `questbot-web.vercel.app` deployment — every page and every `/api/*` route — behind a single shared password (`Topcat12`), and update the Electron client so it keeps working against the now-locked backend.

**Architecture:** A Vercel Routing Middleware (`web/middleware.ts`, `runtime: 'nodejs'`) runs before every request except `/login` and static assets. It reuses the existing HMAC session-token code (`server/src/auth/session-token.ts`) for signed cookies — the same mechanism already used for Discord sessions, just with a fixed non-Discord payload. Pages redirect to `/login` when unauthenticated; `/api/*` routes accept either the cookie or an `X-Site-Password` header (for the Electron client, which can't fill out a browser form) and return 401 JSON instead of redirecting.

**Tech Stack:** `@vercel/functions` (the `next()` pass-through helper), Vercel Routing Middleware, Astro server-rendered page (`Astro.cookies`), Electron IPC (existing settings-store pattern).

## Global Constraints

- The password is `Topcat12` (user-supplied) — set as the `SITE_PASSWORD` Vercel secret, never hardcoded in source.
- `/api/*` is gated too — this is a deliberate, confirmed choice, not an oversight (see spec's "Confirmed decisions").
- Reuse `server/src/auth/session-token.ts`'s `signSessionToken`/`verifySessionToken` — do not write a second crypto implementation.
- 30-day cookie expiry — matches the existing Discord session convention (`session-token.ts`'s own default).
- No logout button, no rate-limiting on `/login` — explicitly out of scope per the spec.

---

### Task 1: Expose `session-token.ts` as a second entry point from `server/`

**Files:**
- Modify: `server/package.json`

**Interfaces:**
- Produces: `@questbot/server/auth/session-token` resolves to `server/src/auth/session-token.ts`, importable from `web/` (already workspace-linked to `@questbot/server` since Stage 1).

- [ ] **Step 1: Add the second export path**

In `server/package.json`, change:
```json
"exports": {
  ".": "./src/index.ts"
},
```
to:
```json
"exports": {
  ".": "./src/index.ts",
  "./auth/session-token": "./src/auth/session-token.ts"
},
```

- [ ] **Step 2: Verify it resolves from web/**

Run (PowerShell, from repo root):
```powershell
cd web
node --input-type=module -e "import('@questbot/server/auth/session-token').then(m => console.log(typeof m.signSessionToken, typeof m.verifySessionToken))"
```
Expected: `function function`

- [ ] **Step 3: Commit**

```bash
git add server/package.json
git commit -m "Expose session-token.ts as a second entry point of @questbot/server"
```

---

### Task 2: Site-lockdown decision logic, with tests

The actual gate/redirect/401 decision, written as a plain function so it's testable without any Vercel runtime — `web/middleware.ts` (Task 3) becomes a thin wrapper around this.

**Files:**
- Create: `web/src/lib/site-lock.ts`
- Test: `web/src/lib/site-lock.test.ts`

**Interfaces:**
- Consumes: `verifySessionToken(token: string, secret: string): { discordId: string } | null` and `signSessionToken(discordId: string, secret: string, expiresAt?: number): string`, both from `@questbot/server/auth/session-token` (Task 1).
- Produces: `COOKIE_NAME: string`, `decideSiteLockdown(params): LockdownDecision`, `signSiteSessionToken(secret: string): string` — all consumed by `web/middleware.ts` (Task 3) and `web/src/pages/login.astro` (Task 4).

- [ ] **Step 1: Write the failing tests**

Create `web/src/lib/site-lock.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decideSiteLockdown, signSiteSessionToken, COOKIE_NAME } from './site-lock.js';

const SESSION_SECRET = 'test-session-secret';
const SITE_PASSWORD = 'Topcat12';

test('a page request with no cookie redirects to /login with the original path preserved', () => {
  const decision = decideSiteLockdown({
    pathname: '/elden-ring/map',
    cookieHeader: null,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'redirect', location: '/login?next=%2Felden-ring%2Fmap' });
});

test('a page request with a valid session cookie is allowed', () => {
  const token = signSiteSessionToken(SESSION_SECRET);
  const decision = decideSiteLockdown({
    pathname: '/elden-ring/map',
    cookieHeader: `${COOKIE_NAME}=${token}`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});

test('a page request with a cookie signed by the wrong secret is treated as unauthenticated', () => {
  const token = signSiteSessionToken('a-different-secret');
  const decision = decideSiteLockdown({
    pathname: '/',
    cookieHeader: `${COOKIE_NAME}=${token}`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.equal(decision.kind, 'redirect');
});

test('an /api/* request with no cookie and no header is unauthorized, not redirected', () => {
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: null,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'unauthorized' });
});

test('an /api/* request with a correct X-Site-Password header is allowed', () => {
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: null,
    sitePasswordHeader: SITE_PASSWORD,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});

test('an /api/* request with an incorrect X-Site-Password header is unauthorized', () => {
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: null,
    sitePasswordHeader: 'wrong-password',
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'unauthorized' });
});

test('an /api/* request with a valid cookie (no password header) is allowed', () => {
  const token = signSiteSessionToken(SESSION_SECRET);
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: `${COOKIE_NAME}=${token}`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});

test('cookieHeader with multiple cookies still finds the right one', () => {
  const token = signSiteSessionToken(SESSION_SECRET);
  const decision = decideSiteLockdown({
    pathname: '/',
    cookieHeader: `other_cookie=abc; ${COOKIE_NAME}=${token}; another=xyz`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd web && npx tsx --test src/lib/site-lock.test.ts`
Expected: FAIL — `site-lock.ts` doesn't exist yet.

- [ ] **Step 3: Write the implementation**

Create `web/src/lib/site-lock.ts`:

```ts
import { signSessionToken, verifySessionToken } from '@questbot/server/auth/session-token';

// The cookie stores a signed token from the exact same HMAC scheme already
// used for Discord sessions (server/src/auth/session-token.ts) — reused as-is
// rather than writing a second crypto implementation. The token's "discordId"
// field is unused here (this gate has no per-user identity, just "did they
// enter the site password"); a fixed sentinel fills that slot.
const SITE_SESSION_SUBJECT = 'site-lock';

export const COOKIE_NAME = 'qb_site_session';

export function signSiteSessionToken(secret: string): string {
  return signSessionToken(SITE_SESSION_SUBJECT, secret);
}

function parseCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return undefined;
}

function hasValidSession(cookieHeader: string | null, secret: string): boolean {
  const token = parseCookie(cookieHeader, COOKIE_NAME);
  return token !== undefined && verifySessionToken(token, secret) !== null;
}

export type LockdownDecision =
  | { kind: 'allow' }
  | { kind: 'redirect'; location: string }
  | { kind: 'unauthorized' };

export function decideSiteLockdown(params: {
  pathname: string;
  cookieHeader: string | null;
  sitePasswordHeader: string | null;
  sessionSecret: string;
  sitePassword: string;
}): LockdownDecision {
  const { pathname, cookieHeader, sitePasswordHeader, sessionSecret, sitePassword } = params;
  const authenticated = hasValidSession(cookieHeader, sessionSecret);

  if (pathname.startsWith('/api/')) {
    const passwordOk = sitePasswordHeader !== null && sitePasswordHeader === sitePassword;
    return authenticated || passwordOk ? { kind: 'allow' } : { kind: 'unauthorized' };
  }

  return authenticated ? { kind: 'allow' } : { kind: 'redirect', location: `/login?next=${encodeURIComponent(pathname)}` };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd web && npx tsx --test src/lib/site-lock.test.ts`
Expected: `pass 8`

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w web`
Expected: clean

- [ ] **Step 6: Commit**

```bash
git add web/src/lib/site-lock.ts web/src/lib/site-lock.test.ts
git commit -m "Add site-lockdown decision logic with tests"
```

---

### Task 3: Vercel Routing Middleware wiring

**Files:**
- Create: `web/middleware.ts`
- Modify: `web/package.json` (add `@vercel/functions` dependency)

**Interfaces:**
- Consumes: `decideSiteLockdown` from `web/src/lib/site-lock.ts` (Task 2).

- [ ] **Step 1: Install `@vercel/functions`**

Run: `npm install @vercel/functions -w web`

- [ ] **Step 2: Write the middleware**

Create `web/middleware.ts` (at `web/`'s root, next to `package.json` — Vercel Routing Middleware is only picked up from the project root, confirmed against Vercel's own docs):

```ts
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
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck -w web`
Expected: clean. If `middleware.ts` at the project root isn't picked up by `tsc` (it's outside `src/`), check `web/tsconfig.json`'s `include` — it currently reads `["".astro/types.d.ts", "**/*"]`, and `**/*` from the tsconfig's own directory (`web/`) already covers a root-level file, so this should just work; if it doesn't, add `"middleware.ts"` explicitly to `include` rather than guessing further.

- [ ] **Step 4: Commit**

```bash
git add web/middleware.ts web/package.json package-lock.json
git commit -m "Add Vercel Routing Middleware gating every route behind the site password"
```

---

### Task 4: Login page

**Files:**
- Create: `web/src/pages/login.astro`

**Interfaces:**
- Consumes: `signSiteSessionToken`, `COOKIE_NAME` from `web/src/lib/site-lock.ts` (Task 2).

- [ ] **Step 1: Write the page**

Create `web/src/pages/login.astro`:

```astro
---
export const prerender = false;
import '../styles/theme.css';
import { signSiteSessionToken, COOKIE_NAME } from '../lib/site-lock.js';

let error = false;

if (Astro.request.method === 'POST') {
  const form = await Astro.request.formData();
  const password = form.get('password');
  const sitePassword = process.env.SITE_PASSWORD ?? '';

  if (typeof password === 'string' && password === sitePassword) {
    const token = signSiteSessionToken(process.env.SESSION_SECRET ?? '');
    Astro.cookies.set(COOKIE_NAME, token, {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    const next = new URL(Astro.request.url).searchParams.get('next') || '/';
    return Astro.redirect(next, 302);
  }
  error = true;
}
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Questbot — Sign in</title>
  </head>
  <body class="login-body">
    <form method="POST" class="login-form">
      <h1>Questbot</h1>
      <input type="password" name="password" placeholder="Password" autofocus required />
      {error && <p class="login-error">Wrong password.</p>}
      <button type="submit">Enter</button>
    </form>
    <style>
      .login-body {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        background: var(--bg, #0c0f14);
        color: var(--text, #e8e2d4);
        font-family: system-ui, sans-serif;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 260px;
      }
      .login-form input {
        padding: 10px 12px;
        font: inherit;
        border-radius: 4px;
        border: 1px solid #4a4234;
        background: rgba(0, 0, 0, 0.3);
        color: inherit;
      }
      .login-form button {
        padding: 10px 12px;
        font: inherit;
        border-radius: 4px;
        border: 1px solid #c9a24b;
        background: transparent;
        color: #c9a24b;
        cursor: pointer;
      }
      .login-error {
        color: #e85c5c;
        margin: 0;
      }
    </style>
  </body>
</html>
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck -w web`
Expected: clean

- [ ] **Step 3: Commit**

```bash
git add web/src/pages/login.astro
git commit -m "Add the site lockdown's login page"
```

---

### Task 5: Deploy and verify the lockdown for real

**Files:** none (deployment + verification only)

- [ ] **Step 1: Set the SITE_PASSWORD secret**

Write the password to a BOM-free ASCII file first — this session already hit a real bug where PowerShell's default `-Encoding utf8` silently prepends a UTF-8 BOM that corrupts secrets (see Stage 1's `DATABASE_URL`/`DISCORD_CLIENT_ID` incident) — never pipe a secret value directly with `|` again.

```powershell
"Topcat12" | Out-File -FilePath "$scratch\site-password.txt" -NoNewline -Encoding ascii
cd web
cmd /c "npx vercel env add SITE_PASSWORD production < $scratch\site-password.txt"
```

- [ ] **Step 2: Push and wait for deployment**

```bash
git push origin master
```
Poll with `npx vercel inspect https://questbot-web.vercel.app` until status is `● Ready`, same pattern used throughout this project.

- [ ] **Step 3: Verify an unauthenticated page request redirects to /login**

```powershell
curl.exe -s -i https://questbot-web.vercel.app/ | Select-String "HTTP|Location"
```
Expected: `302` with `Location: /login?next=%2F`

- [ ] **Step 4: Verify an unauthenticated /api/* request gets 401 JSON, not a redirect**

```powershell
curl.exe -s -i -X POST https://questbot-web.vercel.app/api/ask -H "Content-Type: application/json" --data-binary "@$scratch\ask-test-body.json" | Select-String "HTTP"
```
Expected: `401`, JSON body `{"error":"unauthorized"}`

- [ ] **Step 5: Verify the login flow actually works and grants access**

```powershell
curl.exe -s -i -c "$scratch\cookies.txt" -X POST https://questbot-web.vercel.app/login -d "password=Topcat12"
curl.exe -s -i -b "$scratch\cookies.txt" https://questbot-web.vercel.app/ | Select-String "HTTP"
```
Expected: first call sets a cookie and redirects (302 to `/`); second call (with that cookie) returns `200`, not another redirect to `/login`.

- [ ] **Step 6: Verify the X-Site-Password header unlocks /api/* directly (the Electron client's path)**

```powershell
curl.exe -s -X POST https://questbot-web.vercel.app/api/ask -H "Content-Type: application/json" -H "X-Site-Password: Topcat12" --data-binary "@$scratch\ask-test-body.json"
```
Expected: a real synthesized answer (same shape as Stage 1's verified `/ask` response), not a 401.

- [ ] **Step 7: Verify a wrong password is rejected**

```powershell
curl.exe -s -X POST https://questbot-web.vercel.app/api/ask -H "Content-Type: application/json" -H "X-Site-Password: wrong" --data-binary "@$scratch\ask-test-body.json"
```
Expected: `401`

---

### Task 6: Electron client — settings for the site password

**Files:**
- Modify: `client/src/main/settings-store.ts`
- Test: `client/test/settings-store.test.ts`

**Interfaces:**
- Produces: `QuestbotSettings.sitePassword?: string`, consumed by Task 7 (IPC) and Task 9 (`api.ts`).

- [ ] **Step 1: Write the failing test**

Add to `client/test/settings-store.test.ts`:

```ts
test('updateSettings persists sitePassword', () => {
  const filePath = tempSettingsPath();
  initSettingsStore(filePath);
  const updated = updateSettings({ sitePassword: 'Topcat12' });
  assert.equal(updated.sitePassword, 'Topcat12');
  assert.equal(JSON.parse(fs.readFileSync(filePath, 'utf-8')).sitePassword, 'Topcat12');
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -w client`
Expected: FAIL — `sitePassword` isn't a recognized field yet (TypeScript error at minimum, since `QuestbotSettings` doesn't declare it).

- [ ] **Step 3: Add the field**

In `client/src/main/settings-store.ts`, add to the `QuestbotSettings` interface (after `sessionToken?: string;`):
```ts
  sitePassword?: string;
```

In `normalize()`, add (after the `sessionToken` line):
```ts
    sitePassword: typeof obj.sitePassword === 'string' ? obj.sitePassword : undefined,
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -w client`
Expected: all tests pass, including the new one.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck -w client`
Expected: clean

- [ ] **Step 6: Commit**

```bash
git add client/src/main/settings-store.ts client/test/settings-store.test.ts
git commit -m "Add sitePassword field to client settings"
```

---

### Task 7: Electron client — IPC wiring

**Files:**
- Modify: `client/src/main/preload.ts`
- Modify: `client/src/main/index.ts`
- Modify: `client/src/renderer/questbot.d.ts`

**Interfaces:**
- Consumes: `QuestbotSettings.sitePassword` (Task 6), `updateSettings` from `settings-store.ts` (already imported in `index.ts`).
- Produces: `window.questbot.setSitePassword(password: string): Promise<QuestbotSettings>`, consumed by Task 8 (renderer wiring).

- [ ] **Step 1: Add the main-process IPC handler**

In `client/src/main/index.ts`, add near the other `updateSettings`-backed handlers (next to `set-auto-dismiss-seconds`):
```ts
  ipcMain.handle('set-site-password', (_event, password: string) => updateSettings({ sitePassword: password }));
```

- [ ] **Step 2: Expose it via preload**

In `client/src/main/preload.ts`, add to the `contextBridge.exposeInMainWorld('questbot', { ... })` object:
```ts
  setSitePassword: (password: string): Promise<QuestbotSettings> => ipcRenderer.invoke('set-site-password', password),
```

- [ ] **Step 3: Add the renderer type**

In `client/src/renderer/questbot.d.ts`, add `sitePassword?: string;` to the local `QuestbotSettings` interface mirror, and add to the `questbot` interface:
```ts
    setSitePassword(password: string): Promise<QuestbotSettings>;
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck -w client`
Expected: clean

- [ ] **Step 5: Commit**

```bash
git add client/src/main/index.ts client/src/main/preload.ts client/src/renderer/questbot.d.ts
git commit -m "Wire sitePassword setting through IPC"
```

---

### Task 8: Electron client — Settings UI

**Files:**
- Modify: `client/src/renderer/popup.html`
- Modify: `client/src/renderer/settings.ts`

**Interfaces:**
- Consumes: `window.questbot.setSitePassword` (Task 7), `currentSettings.sitePassword` (Task 6).

- [ ] **Step 1: Add the markup**

In `client/src/renderer/popup.html`, add a new `settings-section` between the existing "Account" section and "App info" section:
```html
    <div class="settings-section">
      <h3>Backend access</h3>
      <div class="settings-row">
        <label for="site-password-input" class="settings-label">Site password</label>
        <input id="site-password-input" type="password" autocomplete="off" />
      </div>
    </div>
```

- [ ] **Step 2: Wire it up**

In `client/src/renderer/settings.ts`, add near the other element lookups (after `accountUpgrade`):
```ts
const sitePasswordInput = document.getElementById('site-password-input') as HTMLInputElement;
```

In `openSettings()`, add after the `autoDismissSelect.value = ...` line:
```ts
  sitePasswordInput.value = currentSettings.sitePassword ?? '';
```

After the `autoDismissSelect.addEventListener('change', ...)` block, add:
```ts
sitePasswordInput.addEventListener('change', async () => {
  const updated = await window.questbot.setSitePassword(sitePasswordInput.value);
  if (currentSettings) currentSettings.sitePassword = updated.sitePassword;
});
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck -w client`
Expected: clean. `currentSettings`'s inline type (declared at the top of `settings.ts`) doesn't currently include `sitePassword` — add it to that type literal too:
```ts
let currentSettings:
  | { popupHotkey: string; continuousMemoryHotkey: string; continuousMemoryBufferMinutes: number; autoDismissSeconds: number; sitePassword?: string }
  | undefined;
```

- [ ] **Step 4: Commit**

```bash
git add client/src/renderer/popup.html client/src/renderer/settings.ts
git commit -m "Add site password field to the Settings panel"
```

---

### Task 9: Electron client — send the password, point at the real backend

**Files:**
- Modify: `client/src/renderer/api.ts`

**Interfaces:**
- Consumes: `window.questbot.getSettings()` (existing), `sitePassword` field (Task 6).

- [ ] **Step 1: Point BACKEND_URL at the real deployment**

In `client/src/renderer/api.ts`, change:
```ts
const BACKEND_URL = 'http://localhost:8787';
```
to:
```ts
const BACKEND_URL = 'https://questbot-web.vercel.app/api';
```

- [ ] **Step 2: Add a site-password header helper**

Add near `authHeader()`:
```ts
async function sitePasswordHeader(): Promise<Record<string, string>> {
  const settings = await window.questbot.getSettings();
  return settings.sitePassword ? { 'x-site-password': settings.sitePassword } : {};
}
```

- [ ] **Step 3: Merge it into every backend request**

In each of `ask()`, `sendFeedback()`, `generateChecklist()`, and `fetchAccount()`, change the headers object to also spread `await sitePasswordHeader()`. For example, `ask()`'s fetch call becomes:
```ts
  const res = await fetch(`${BACKEND_URL}/ask`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(await authHeader()), ...(await sitePasswordHeader()) },
    body: JSON.stringify(body),
  });
```
Apply the same `...(await sitePasswordHeader())` addition to the header objects in `sendFeedback()`, `generateChecklist()`, and `fetchAccount()` (the latter currently builds `headers` as a separate `const` before the fetch call — merge it there: `const headers = { ...(await authHeader()), ...(await sitePasswordHeader()) };`).

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck -w client`
Expected: clean

- [ ] **Step 5: Commit**

```bash
git add client/src/renderer/api.ts
git commit -m "Point the client at the real deployed backend and send the site password"
```

---

### Task 10: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Full test suite**

Run: `npm test` (from repo root — runs server, client, and web workspaces)
Expected: all pass, including the new `site-lock.test.ts` and `settings-store.test.ts` cases.

- [ ] **Step 2: Full typecheck**

Run: `npm run typecheck` (from repo root)
Expected: clean across all three workspaces.

- [ ] **Step 3: Build and launch the Electron client**

Run: `npm run build -w client && npm run start -w client`
Open Settings, enter `Topcat12` in the new "Site password" field, tab away to trigger the save. Ask a real question in the Ask tab and confirm a real answer comes back (proves the header reaches the now-locked live backend) — this is the actual end-to-end proof for this stage, not just "it typechecks."

- [ ] **Step 4: Report status**

Summarize what was verified: middleware redirects unauthenticated page requests, 401s unauthenticated API requests, the login form grants a working session, the `X-Site-Password` header unlocks the API directly, and the real Electron client successfully gets a real answer through the locked-down backend.
