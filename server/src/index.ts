import Fastify from 'fastify';
import cors from '@fastify/cors';
import askRoutes from './routes/ask.js';
import feedbackRoutes from './routes/feedback.js';
import authRoutes from './routes/auth.js';
import billingRoutes from './routes/billing.js';
import checklistRoutes from './routes/checklist.js';

export async function buildServer() {
  // 25MB body limit: base64 screenshot frames ride in the JSON body.
  const app = Fastify({ logger: true, bodyLimit: 25 * 1024 * 1024 });
  await app.register(cors, { origin: true });

  // Captures the raw JSON body alongside the parsed one — the Stripe
  // webhook route needs the exact raw bytes for signature verification
  // (Fastify's default parser only exposes the parsed object).
  app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    (req as unknown as { rawBody: string }).rawBody = body as string;
    try {
      done(null, (body as string).length ? JSON.parse(body as string) : {});
    } catch (err) {
      done(err as Error, undefined);
    }
  });

  await app.register(askRoutes);
  await app.register(feedbackRoutes);
  await app.register(authRoutes);
  await app.register(billingRoutes);
  await app.register(checklistRoutes);
  return app;
}
