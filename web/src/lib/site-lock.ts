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
