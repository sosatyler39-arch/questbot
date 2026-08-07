// HMAC via the Web Crypto API (crypto.subtle) rather than node:crypto — this
// runs as Astro middleware (see web/src/middleware.ts), which the Vercel
// adapter executes on the Edge runtime to intercept prerendered static pages
// too (confirmed via Astro's own docs: middlewareMode: 'edge' is required
// for middleware to see static assets, not just on-demand routes), and Edge
// has no node:crypto. Web Crypto works identically there and in the plain
// Node.js-rendered /login page, so one implementation covers both.
const SITE_SESSION_SUBJECT = 'site-lock';

export const COOKIE_NAME = 'qb_site_session';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

interface SessionPayload {
  subject: string;
  exp: number;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(b64url: string): Uint8Array<ArrayBuffer> {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function signSiteSessionToken(secret: string, expiresAt = Date.now() + THIRTY_DAYS_MS): Promise<string> {
  const payload: SessionPayload = { subject: SITE_SESSION_SUBJECT, exp: expiresAt };
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return `${body}.${bytesToBase64Url(new Uint8Array(sig))}`;
}

async function verifySiteSessionToken(token: string, secret: string): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [body, sig] = parts;
  const key = await importKey(secret);
  const valid = await crypto.subtle.verify('HMAC', key, base64UrlToBytes(sig), new TextEncoder().encode(body));
  if (!valid) return false;
  try {
    const payload: SessionPayload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(body)));
    return typeof payload.exp === 'number' && Date.now() <= payload.exp;
  } catch {
    return false;
  }
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

async function hasValidSession(cookieHeader: string | null, secret: string): Promise<boolean> {
  const token = parseCookie(cookieHeader, COOKIE_NAME);
  return token !== undefined && (await verifySiteSessionToken(token, secret));
}

export type LockdownDecision =
  | { kind: 'allow' }
  | { kind: 'redirect'; location: string }
  | { kind: 'unauthorized' };

export async function decideSiteLockdown(params: {
  pathname: string;
  cookieHeader: string | null;
  sitePasswordHeader: string | null;
  sessionSecret: string;
  sitePassword: string;
}): Promise<LockdownDecision> {
  const { pathname, cookieHeader, sitePasswordHeader, sessionSecret, sitePassword } = params;
  const authenticated = await hasValidSession(cookieHeader, sessionSecret);

  if (pathname.startsWith('/api/')) {
    const passwordOk = sitePasswordHeader !== null && sitePasswordHeader === sitePassword;
    return authenticated || passwordOk ? { kind: 'allow' } : { kind: 'unauthorized' };
  }

  return authenticated ? { kind: 'allow' } : { kind: 'redirect', location: `/login?next=${encodeURIComponent(pathname)}` };
}
