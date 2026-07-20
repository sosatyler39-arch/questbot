import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildServer } from '../src/index.js';
import { signSessionToken } from '../src/auth/session-token.js';
import { upsertDiscordUser, setStripeCustomer, setTierByStripeCustomer } from '../src/auth/users.js';

process.env.SESSION_SECRET ??= 'test-secret';

// Minimal valid 1x1 JPEG (real magic bytes) — the vision API rejects placeholder
// non-image base64, unlike the earlier mock which never validated the bytes.
const FAKE_JPEG_B64 =
  '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

// Builds a real, verifiable session token for a paid test user — the old
// `x-user-tier: paid` header is no longer trusted (see tiers.ts), so tests
// that need paid-tier behavior go through the real DB-backed path instead.
async function paidUserToken(): Promise<string> {
  const id = `test-paid-${Date.now()}`;
  await upsertDiscordUser(id, 'paid-tester');
  await setStripeCustomer(id, `cus_${id}`);
  await setTierByStripeCustomer(`cus_${id}`, 'paid');
  return signSessionToken(id, process.env.SESSION_SECRET!);
}

test('mocked end-to-end ask flow', async (t) => {
  const app = await buildServer();
  t.after(() => app.close());

  // Retrieval is real now (pgvectorRetriever): embedding needs GEMINI_API_KEY,
  // search needs a reachable DATABASE_URL with the corpus already synced
  // (see pipeline/sync.ts). Every path through /ask hits both, so all four
  // cases below are gated the same way.
  const liveRetrieval = !process.env.GEMINI_API_KEY || !process.env.DATABASE_URL;

  await t.test('confident match returns answer + source card', { skip: liveRetrieval }, async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/ask',
      payload: { question: 'How do I beat Margit the Fell Omen?' },
    });
    assert.equal(res.statusCode, 200);
    const body = res.json();
    assert.ok(body.confidence >= 0.35, `confidence ${body.confidence}`);
    assert.ok(body.source, 'expected a source card');
    assert.ok(!body.lowConfidence);
    assert.ok(body.answer.length > 0);
  });

  // Vision call in isolation: a real screenshot round-trips through Gemini
  // without erroring.
  await t.test('screenshot is accepted and does not error', { skip: liveRetrieval }, async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/ask',
      payload: { question: 'Where am I?', screenshots: [FAKE_JPEG_B64] },
    });
    assert.equal(res.statusCode, 200);
  });

  await t.test('low confidence, free tier: honest no-answer + upgrade prompt', { skip: liveRetrieval }, async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/ask',
      payload: { question: 'zzz completely unrelated gibberish qqq' },
    });
    const body = res.json();
    assert.equal(body.lowConfidence, true);
    assert.equal(body.source, undefined);
    assert.match(body.answer, /couldn't find a confident answer/);
  });

  await t.test('low confidence, paid tier: live-search fallback path', { skip: liveRetrieval }, async () => {
    const token = await paidUserToken();
    const res = await app.inject({
      method: 'POST',
      url: '/ask',
      payload: { question: 'zzz completely unrelated gibberish qqq' },
      headers: { authorization: `Bearer ${token}` },
    });
    const body = res.json();
    assert.ok(!body.lowConfidence);
    assert.match(body.answer, /live search/);
  });

  await t.test('client-claimed x-user-tier header is ignored (no real session)', { skip: liveRetrieval }, async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/ask',
      payload: { question: 'zzz completely unrelated gibberish qqq' },
      headers: { 'x-user-tier': 'paid' }, // no Authorization bearer token behind this claim
    });
    const body = res.json();
    // Without a verified session, tier must fall back to free — the old
    // header-trust path must no longer grant paid behavior.
    assert.equal(body.lowConfidence, true);
  });

  await t.test('missing question is a 400', async () => {
    const res = await app.inject({ method: 'POST', url: '/ask', payload: {} });
    assert.equal(res.statusCode, 400);
  });

  await t.test('feedback roundtrip', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/feedback',
      payload: { answerId: 'abc', helpful: true },
    });
    assert.equal(res.statusCode, 200);
    assert.equal(res.json().ok, true);
  });
});
