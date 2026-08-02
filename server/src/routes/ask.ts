import type { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import type { AskRequest, AskResponse } from '../../../shared/types.js';
import { extractGameContext } from '../vision.js';
import { pgvectorRetriever } from '../retrieval.js';
import { synthesize, liveSearchFallback } from '../synthesis.js';
import { getUser, CONFIDENCE_THRESHOLD } from '../tiers.js';
import { extractItemName, getItemLocation } from '../pipeline/location-store.js';
import { categoryFromWikiUrl } from '../pipeline/wiki-url.js';
import { locationCategoryForWikiCategory } from '../pipeline/sources/data/item-locations/categorized.js';
import { extractPageTitle, getEnemyStats } from '../pipeline/enemy-stats-store.js';

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

    const { userId, tier } = await getUser(req);
    const answerId = randomUUID();

    // Continuous memory (multi-frame context) is paid-only (brief §5/§7).
    // Server-side enforcement point: a free-tier client can still buffer
    // and send extra frames locally, but only the newest is ever used.
    const allowedScreenshots = tier === 'paid' ? screenshots : screenshots?.slice(0, 1);
    const ctx = await extractGameContext(allowedScreenshots);
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

    let locationSummary: string | undefined;
    let locations: string[] | undefined;
    if (top.source.kind === 'article') {
      const itemName = extractItemName(top.source.title);
      const wikiCategory = categoryFromWikiUrl(top.source.url);
      const locationCategory = wikiCategory ? locationCategoryForWikiCategory(wikiCategory) : null;
      const loc = itemName && locationCategory ? await getItemLocation(itemName, locationCategory) : null;
      if (loc) {
        locationSummary = loc.summary;
        if (loc.locationNames.length > 0) locations = loc.locationNames;
      }
    }

    let enemySummary: string | undefined;
    if (top.source.kind === 'article') {
      const bossName = extractPageTitle(top.source.title);
      const stats = bossName ? await getEnemyStats(bossName) : null;
      if (stats) {
        const negations = Object.entries(stats.statBlock)
          .filter(([key]) => key.startsWith('Damage Negation'))
          .map(([key, value]) => `${key.replace('Damage Negation ', '')} ${value}%`)
          .join(', ');
        enemySummary = negations ? `Damage negations — ${negations}.` : undefined;
      }
    }

    return {
      answerId,
      answer: await synthesize(question, ctx, top, locationSummary, enemySummary),
      confidence: top.score,
      source: top.source,
      locations,
    };
  });
}
