import Fastify from 'fastify';
import cors from '@fastify/cors';
import askRoutes from './routes/ask.js';
import feedbackRoutes from './routes/feedback.js';

export async function buildServer() {
  // 25MB body limit: base64 screenshot frames ride in the JSON body.
  const app = Fastify({ logger: true, bodyLimit: 25 * 1024 * 1024 });
  await app.register(cors, { origin: true });
  await app.register(askRoutes);
  await app.register(feedbackRoutes);
  return app;
}
