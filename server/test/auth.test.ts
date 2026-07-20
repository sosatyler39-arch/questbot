import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildServer } from '../src/index.js';

process.env.SESSION_SECRET ??= 'test-secret';

test('/auth/me rejects a missing or garbage token', async (t) => {
  const app = await buildServer();
  t.after(() => app.close());

  const noAuth = await app.inject({ method: 'GET', url: '/auth/me' });
  assert.equal(noAuth.statusCode, 401);

  const badAuth = await app.inject({ method: 'GET', url: '/auth/me', headers: { authorization: 'Bearer garbage' } });
  assert.equal(badAuth.statusCode, 401);
});

test('/auth/discord/start redirects to Discord with state carrying the callback port', async (t) => {
  process.env.DISCORD_CLIENT_ID = 'test-client-id';
  const app = await buildServer();
  t.after(() => app.close());

  const res = await app.inject({ method: 'GET', url: '/auth/discord/start?port=54321' });
  assert.equal(res.statusCode, 302);
  const location = res.headers.location as string;
  assert.match(location, /^https:\/\/discord\.com\/oauth2\/authorize\?/);
  assert.match(location, /client_id=test-client-id/);
});
