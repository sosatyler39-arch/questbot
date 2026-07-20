import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildServer } from '../src/index.js';

process.env.SESSION_SECRET ??= 'test-secret';

test('/billing/checkout requires a real session', async (t) => {
  const app = await buildServer();
  t.after(() => app.close());
  const res = await app.inject({ method: 'POST', url: '/billing/checkout' });
  assert.equal(res.statusCode, 401);
});

test('/billing/webhook rejects a bad signature', { skip: !process.env.STRIPE_SECRET_KEY }, async (t) => {
  const app = await buildServer();
  t.after(() => app.close());
  const res = await app.inject({
    method: 'POST',
    url: '/billing/webhook',
    headers: { 'stripe-signature': 'bad', 'content-type': 'application/json' },
    payload: JSON.stringify({ type: 'checkout.session.completed' }),
  });
  assert.equal(res.statusCode, 400);
});
