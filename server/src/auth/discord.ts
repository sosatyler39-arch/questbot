// Endpoints verified live against docs.discord.com/developers/topics/oauth2
// (2026-07-20) — authorize URL, token URL, and required params for the
// Authorization Code Grant flow, plus the `identify` scope for /users/@me.
const DISCORD_API = 'https://discord.com/api/v10';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

export function discordAuthorizeUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: requireEnv('DISCORD_CLIENT_ID'),
    scope: 'identify',
    redirect_uri: redirectUri,
    state,
  });
  return `https://discord.com/oauth2/authorize?${params}`;
}

export async function exchangeDiscordCode(code: string, redirectUri: string): Promise<{ id: string; username: string }> {
  const tokenRes = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: requireEnv('DISCORD_CLIENT_ID'),
      client_secret: requireEnv('DISCORD_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!tokenRes.ok) throw new Error(`Discord token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const userRes = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { authorization: `Bearer ${access_token}` },
  });
  if (!userRes.ok) throw new Error(`Discord user fetch failed: ${userRes.status}`);
  const user = (await userRes.json()) as { id: string; username: string };
  return { id: user.id, username: user.username };
}
