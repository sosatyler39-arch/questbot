import type { FastifyRequest } from 'fastify';
import type { Tier } from '../../shared/types.js';

// Below this retrieval score: free tier gets an honest "no confident answer",
// paid tier gets the live-search fallback.
export const CONFIDENCE_THRESHOLD = 0.35;

// Mock identity. Step 5 replaces this with real lookup: Overwolf user ID →
// users table, tier column kept current by Stripe webhooks. Until then the
// client sends x-user-id / x-user-tier headers.
export function getUser(req: FastifyRequest): { userId: string; tier: Tier } {
  const userId = (req.headers['x-user-id'] as string) || 'anonymous';
  const tier: Tier = req.headers['x-user-tier'] === 'paid' ? 'paid' : 'free';
  return { userId, tier };
}
