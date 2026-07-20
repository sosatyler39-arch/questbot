import type { FastifyRequest } from 'fastify';
import type { Tier } from '../../shared/types.js';
import { verifySessionToken } from './auth/session-token.js';
import { getUserTier } from './auth/users.js';

// Below this retrieval score: free tier gets an honest "no confident answer",
// paid tier gets the live-search fallback. Measured against the real
// gemini-embedding-001 model + live corpus (A3 verification), not guessed:
// cosine similarity has a non-trivial baseline floor for this model — even
// unrelated queries ("what is the capital of France") score ~0.46-0.55
// against an Elden Ring corpus, while genuinely on-topic questions score
// ~0.65-0.80. 0.35 sat below both clusters, so nothing ever hit the
// low-confidence path. 0.60 sits in the measured gap between them.
export const CONFIDENCE_THRESHOLD = 0.6;

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
