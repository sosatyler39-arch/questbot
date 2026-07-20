import type { AskRequest, AskResponse, FeedbackRequest } from './types.js';

// Local dev backend. Becomes a real config value at deploy time.
const BACKEND_URL = 'http://localhost:8787';

// Real identity (FEATURE_ADDENDUM §A1): the backend-issued session token,
// stored by the main process after Discord sign-in. Unauthenticated players
// send no header at all and are treated as anonymous/free server-side —
// no client-claimed x-user-id/x-user-tier headers anymore.
async function authHeader(): Promise<Record<string, string>> {
  const token = await window.questbot.getAuthToken();
  return token ? { authorization: `Bearer ${token}` } : {};
}

// On-demand capture by default (§3), or latest + sampled continuous-memory
// frames (§5) when that mode is on — the main process decides which.
// Routed through the main process via preload since screenshot capture is a
// main-process-only API. Returns base64 JPEG strings (no data-URL prefix),
// empty array on failure / outside the overlay.
export async function captureScreenshot(): Promise<string[]> {
  return window.questbot.captureScreenshot();
}

export async function ask(question: string, screenshots: string[]): Promise<AskResponse> {
  const body: AskRequest = { question, screenshots: screenshots.length ? screenshots : undefined };
  const res = await fetch(`${BACKEND_URL}/ask`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(await authHeader()) },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ask failed: ${res.status}`);
  return res.json();
}

export async function sendFeedback(answerId: string, helpful: boolean): Promise<void> {
  const body: FeedbackRequest = { answerId, helpful };
  await fetch(`${BACKEND_URL}/feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(await authHeader()) },
    body: JSON.stringify(body),
  });
}

// FEATURE_ADDENDUM §B1: server-side step extraction for an answer the
// player already received.
export async function generateChecklist(
  question: string | undefined,
  answer: string,
): Promise<{ title: string; steps: string[] }> {
  const res = await fetch(`${BACKEND_URL}/checklist`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(await authHeader()) },
    body: JSON.stringify({ question, answer }),
  });
  if (!res.ok) throw new Error(`checklist failed: ${res.status}`);
  return res.json();
}

// Current account state, or null when signed out / backend unreachable /
// token expired. Callers treat null as "not signed in" — the Settings
// panel's account section is the only consumer today.
export async function fetchAccount(): Promise<{ discordId: string; tier: 'free' | 'paid' } | null> {
  const headers = await authHeader();
  if (!headers.authorization) return null;
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, { headers });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
