import type { FastifyInstance } from 'fastify';
import Stripe from 'stripe';
import { verifySessionToken } from '../auth/session-token.js';
import { setStripeCustomer, setTierByStripeCustomer } from '../auth/users.js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function stripeClient(): Stripe {
  return new Stripe(requireEnv('STRIPE_SECRET_KEY'));
}

export default async function billingRoutes(app: FastifyInstance) {
  app.post('/billing/checkout', async (req, reply) => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
    const verified = token ? verifySessionToken(token, requireEnv('SESSION_SECRET')) : null;
    if (!verified) return reply.code(401).send({ error: 'unauthorized' });

    const backendUrl = requireEnv('PUBLIC_BACKEND_URL');
    const session = await stripeClient().checkout.sessions.create({
      mode: 'subscription',
      // Price is env-configured, not hardcoded (brief §7 — exact price
      // point deferred to post-beta usage data).
      line_items: [{ price: requireEnv('STRIPE_PRICE_ID'), quantity: 1 }],
      client_reference_id: verified.discordId,
      success_url: `${backendUrl}/billing/success`,
      cancel_url: `${backendUrl}/billing/cancelled`,
    });
    return reply.redirect(session.url!);
  });

  // Raw body needed for signature verification — see index.ts's
  // addContentTypeParser, which stashes the raw bytes as req.rawBody
  // alongside Fastify's normal JSON parsing.
  app.post('/billing/webhook', async (req, reply) => {
    const sig = req.headers['stripe-signature'];
    if (!sig || typeof sig !== 'string') return reply.code(400).send({ error: 'missing signature' });

    const rawBody = (req as unknown as { rawBody?: string }).rawBody;
    let event: Stripe.Event;
    try {
      event = stripeClient().webhooks.constructEvent(rawBody ?? '', sig, requireEnv('STRIPE_WEBHOOK_SECRET'));
    } catch (err) {
      req.log.warn({ err }, 'stripe webhook signature verification failed');
      return reply.code(400).send({ error: 'invalid signature' });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.client_reference_id && session.customer) {
        await setStripeCustomer(session.client_reference_id, session.customer as string);
        await setTierByStripeCustomer(session.customer as string, 'paid');
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;
      await setTierByStripeCustomer(sub.customer as string, 'free');
    }
    return reply.send({ received: true });
  });
}
