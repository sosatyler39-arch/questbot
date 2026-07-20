import type { FastifyInstance } from 'fastify';
import { randomBytes } from 'node:crypto';
import { discordAuthorizeUrl, exchangeDiscordCode } from '../auth/discord.js';
import { upsertDiscordUser, getUserTier } from '../auth/users.js';
import { signSessionToken, verifySessionToken } from '../auth/session-token.js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function backendCallbackUrl(req: { protocol: string; hostname: string }): string {
  // Fixed backend redirect_uri registered with Discord; the ephemeral
  // client loopback port travels in `state`, not in redirect_uri itself —
  // avoids needing to pre-register a wildcard/dynamic URI with Discord.
  const base = process.env.PUBLIC_BACKEND_URL ?? `${req.protocol}://${req.hostname}:8787`;
  return `${base}/auth/discord/callback`;
}

export default async function authRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { port: string } }>('/auth/discord/start', async (req, reply) => {
    const port = Number(req.query.port);
    if (!Number.isInteger(port) || port <= 0) return reply.code(400).send({ error: 'invalid port' });

    // state = "port:<client-port>:<csrf-nonce>", signed so the callback can
    // trust the embedded port without a server-side session store.
    const nonce = randomBytes(16).toString('base64url');
    const state = signSessionToken(`port:${port}:${nonce}`, requireEnv('SESSION_SECRET'), Date.now() + 5 * 60 * 1000);
    return reply.redirect(discordAuthorizeUrl(backendCallbackUrl(req), state));
  });

  app.get<{ Querystring: { code: string; state: string } }>('/auth/discord/callback', async (req, reply) => {
    const { code, state } = req.query;
    const verified = state ? verifySessionToken(state, requireEnv('SESSION_SECRET')) : null;
    const match = verified && /^port:(\d+):/.exec(verified.discordId);
    if (!code || !match) return reply.code(400).send({ error: 'invalid or expired state' });
    const clientPort = Number(match[1]);

    const discordUser = await exchangeDiscordCode(code, backendCallbackUrl(req));
    await upsertDiscordUser(discordUser.id, discordUser.username);
    const token = signSessionToken(discordUser.id, requireEnv('SESSION_SECRET'));
    return reply.redirect(`http://127.0.0.1:${clientPort}/callback?token=${encodeURIComponent(token)}`);
  });

  app.get('/auth/me', async (req, reply) => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
    const verified = token ? verifySessionToken(token, requireEnv('SESSION_SECRET')) : null;
    if (!verified) return reply.code(401).send({ error: 'unauthorized' });
    const tier = await getUserTier(verified.discordId);
    return { discordId: verified.discordId, tier };
  });
}
