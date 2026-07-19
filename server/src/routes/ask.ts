import type { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import type { AskRequest, AskResponse } from '../../../shared/types.js';
import { extractGameContext } from '../vision.js';
import { pgvectorRetriever } from '../retrieval.js';
import { synthesize, liveSearchFallback } from '../synthesis.js';
import { getUser, CONFIDENCE_THRESHOLD } from '../tiers.js';

export default async function askRoutes(app: FastifyInstance) {
  app.post<{ Body: AskRequest; Reply: AskResponse }>('/ask', async (req, reply) => {
    const { question, screenshots } = req.body ?? ({} as AskRequest);
    if (!question?.trim()) {
      return reply.code(400).send({
        answerId: randomUUID(),
        answer: 'Question is required.',
        confidence: 0,
      });
    }

    const { userId, tier } = getUser(req);
    const answerId = randomUUID();
    const ctx = await extractGameContext(screenshots);
    const matches = await pgvectorRetriever.search(question, ctx);
    const top = matches[0];

    req.log.info({ userId, tier, answerId, confidence: top?.score ?? 0 }, 'ask');

    if (!top || top.score < CONFIDENCE_THRESHOLD) {
      if (tier === 'free') {
        return {
          answerId,
          answer:
            "Questbot couldn't find a confident answer to that in its guides. " +
            'Paid members get a live search fallback for questions like this.',
          confidence: top?.score ?? 0,
          lowConfidence: true,
        };
      }
      return {
        answerId,
        answer: await liveSearchFallback(question),
        confidence: top?.score ?? 0,
      };
    }

    return {
      answerId,
      answer: await synthesize(question, ctx, top),
      confidence: top.score,
      source: top.source,
    };
  });
}
