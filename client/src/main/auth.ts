import { createServer } from 'node:http';
import { shell } from 'electron';
import { getSettings, updateSettings } from './settings-store.js';

export function parseCallbackToken(urlPath: string): string | undefined {
  const url = new URL(urlPath, 'http://127.0.0.1');
  if (url.pathname !== '/callback') return undefined;
  const token = url.searchParams.get('token');
  return token ?? undefined;
}

// Opens the system browser to the backend's Discord OAuth start URL, and
// spins up a one-shot loopback HTTP server to receive the session token
// back (RFC 8252 native-app redirect pattern) — no custom protocol handler
// registration needed, and the Discord OAuth client secret never touches
// the client process at all (brief §6, "no API keys in the client" —
// the backend mediates the whole exchange).
export function startDiscordSignIn(backendUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const token = req.url ? parseCallbackToken(req.url) : undefined;
      res.setHeader('content-type', 'text/html');
      res.end(token ? '<p>Signed in — you can close this tab.</p>' : '<p>Sign-in failed.</p>');
      server.close();
      if (token) resolve(token);
      else reject(new Error('no token in callback'));
    });
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : undefined;
      if (!port) {
        server.close();
        reject(new Error('failed to bind loopback server'));
        return;
      }
      void shell.openExternal(`${backendUrl}/auth/discord/start?port=${port}`);
    });
    server.on('error', reject);
  });
}

export function getStoredToken(): string | undefined {
  return getSettings().sessionToken;
}

export function storeToken(token: string): void {
  updateSettings({ sessionToken: token });
}

export function clearStoredToken(): void {
  updateSettings({ sessionToken: undefined });
}
