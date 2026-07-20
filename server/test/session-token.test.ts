import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signSessionToken, verifySessionToken } from '../src/auth/session-token.js';

test('session token round-trips and rejects tampering', () => {
  const token = signSessionToken('discord-123', 'test-secret');
  const payload = verifySessionToken(token, 'test-secret');
  assert.equal(payload?.discordId, 'discord-123');

  assert.equal(verifySessionToken(token, 'wrong-secret'), null);
  assert.equal(verifySessionToken(token + 'x', 'test-secret'), null);
  assert.equal(verifySessionToken('not-a-token', 'test-secret'), null);
});

test('session token rejects an expired payload', () => {
  const token = signSessionToken('discord-123', 'test-secret', Date.now() - 1000);
  assert.equal(verifySessionToken(token, 'test-secret'), null);
});
