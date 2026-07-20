import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCallbackToken } from '../src/main/auth.js';

test('parseCallbackToken extracts token from a loopback callback URL', () => {
  assert.equal(parseCallbackToken('/callback?token=abc.def'), 'abc.def');
  assert.equal(parseCallbackToken('/callback?token=abc%2Edef'), 'abc.def');
  assert.equal(parseCallbackToken('/other'), undefined);
  assert.equal(parseCallbackToken('/callback'), undefined);
});
