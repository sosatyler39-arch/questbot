import type { FastifyRequest } from 'fastify';
import type { Tier } from '../../shared/types.js';
import { verifySessionToken } from './auth/session-token.js';
import { getUserTier } from './auth/users.js';

// Below this retrieval score: free tier gets an honest "no confident answer",
// paid tier gets the live-search fallback.
export const CONFIDENCE_THRESHOLD = 0.35;

// Real identity: verifies the backend-issued session token (see
// routes/auth.ts). No client-claimed header is ever trusted for tier —
// closes the gap FEATURE_ADDENDUM.md §A1 flagged ("both reportedly open to
// everyone"). No/invalid token still works, as 'anonymous'/'free' — same as
// an unauthenticated player before this change, just no longer able to
// self-declare 'paid' via a header.
export async function getUser(req: FastifyRequest): Promise<{ userId: string; tier: Tier }> {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
  const secret = process.env.SESSION_SECRET;
  const verified = token && secret ? verifySessionToken(token, secret) : null;
  if (!verified) return { userId: 'anonymous', tier: 'free' };
  const tier = await getUserTier(verified.discordId);
  return { userId: verified.discordId, tier };
}
