import type { FastifyInstance } from 'fastify';
import type { FeedbackRequest } from '../../../shared/types.js';
import { getUser } from '../tiers.js';

// ponytail: in-memory log; moves to the feedback table (db/schema.sql) when
// Postgres is wired in at step 4.
export const feedbackLog: (FeedbackRequest & { userId: string; at: string })[] = [];

export default async function feedbackRoutes(app: FastifyInstance) {
  app.post<{ Body: FeedbackRequest }>('/feedback', async (req, reply) => {
    const { answerId, helpful } = req.body ?? ({} as FeedbackRequest);
    if (!answerId || typeof helpful !== 'boolean') {
      return reply.code(400).send({ ok: false });
    }
    const { userId } = getUser(req);
    feedbackLog.push({ answerId, helpful, userId, at: new Date().toISOString() });
    req.log.info({ answerId, helpful, userId }, 'feedback');
    return { ok: true };
  });
}
