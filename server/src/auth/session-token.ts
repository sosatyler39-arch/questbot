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
