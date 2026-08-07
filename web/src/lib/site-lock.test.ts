import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decideSiteLockdown, signSiteSessionToken, COOKIE_NAME } from './site-lock.js';

const SESSION_SECRET = 'test-session-secret';
const SITE_PASSWORD = 'Topcat12';

test('a page request with no cookie redirects to /login with the original path preserved', () => {
  const decision = decideSiteLockdown({
    pathname: '/elden-ring/map',
    cookieHeader: null,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'redirect', location: '/login?next=%2Felden-ring%2Fmap' });
});

test('a page request with a valid session cookie is allowed', () => {
  const token = signSiteSessionToken(SESSION_SECRET);
  const decision = decideSiteLockdown({
    pathname: '/elden-ring/map',
    cookieHeader: `${COOKIE_NAME}=${token}`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});

test('a page request with a cookie signed by the wrong secret is treated as unauthenticated', () => {
  const token = signSiteSessionToken('a-different-secret');
  const decision = decideSiteLockdown({
    pathname: '/',
    cookieHeader: `${COOKIE_NAME}=${token}`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.equal(decision.kind, 'redirect');
});

test('an /api/* request with no cookie and no header is unauthorized, not redirected', () => {
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: null,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'unauthorized' });
});

test('an /api/* request with a correct X-Site-Password header is allowed', () => {
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: null,
    sitePasswordHeader: SITE_PASSWORD,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});

test('an /api/* request with an incorrect X-Site-Password header is unauthorized', () => {
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: null,
    sitePasswordHeader: 'wrong-password',
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'unauthorized' });
});

test('an /api/* request with a valid cookie (no password header) is allowed', () => {
  const token = signSiteSessionToken(SESSION_SECRET);
  const decision = decideSiteLockdown({
    pathname: '/api/ask',
    cookieHeader: `${COOKIE_NAME}=${token}`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});

test('cookieHeader with multiple cookies still finds the right one', () => {
  const token = signSiteSessionToken(SESSION_SECRET);
  const decision = decideSiteLockdown({
    pathname: '/',
    cookieHeader: `other_cookie=abc; ${COOKIE_NAME}=${token}; another=xyz`,
    sitePasswordHeader: null,
    sessionSecret: SESSION_SECRET,
    sitePassword: SITE_PASSWORD,
  });
  assert.deepEqual(decision, { kind: 'allow' });
});
