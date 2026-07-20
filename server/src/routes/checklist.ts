import type { FastifyInstance } from 'fastify';
import { generateChecklistSteps } from '../checklist.js';

// FEATURE_ADDENDUM §B1. Not tier-gated: checklist generation rides on an
// answer the player already received, so the marginal cost is one cheap
// text-only LLM call — not in the "costs meaningfully more per use"
// category the brief (§7) reserves for paid gating.
export default async function checklistRoutes(app: FastifyInstance) {
  app.post<{ Body: { question?: string; answer?: string } }>('/checklist', async (req, reply) => {
    const { question, answer } = req.body ?? {};
    if (!answer?.trim()) {
      return reply.code(400).send({ error: 'answer is required' });
    }
    const steps = await generateChecklistSteps(question, answer);
    return { title: question?.trim() || 'Checklist', steps };
  });
}
