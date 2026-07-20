import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upsertDiscordUser, getUserTier, setStripeCustomer, setTierByStripeCustomer } from '../src/auth/users.js';

const skip = !process.env.DATABASE_URL;

test('upsert, tier lookup, and stripe-linked tier update', { skip }, async () => {
  const id = `test-${Date.now()}`;
  await upsertDiscordUser(id, 'tester#0001');
  assert.equal(await getUserTier(id), 'free');

  await setStripeCustomer(id, `cus_${id}`);
  await setTierByStripeCustomer(`cus_${id}`, 'paid');
  assert.equal(await getUserTier(id), 'paid');
});

test('unknown user defaults to free tier', { skip }, async () => {
  assert.equal(await getUserTier('no-such-user'), 'free');
});
