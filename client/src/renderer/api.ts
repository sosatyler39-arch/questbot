import type { AskRequest, AskResponse, FeedbackRequest } from './types.js';

// Local dev backend. Becomes a real config value at deploy time.
const BACKEND_URL = 'http://localhost:8787';

// Placeholder identity for the mock phase — real Overwolf-account-based
// identity + Stripe tier lookup is step 5 (paywall gating), not this.
function getUserId(): string {
  let id = localStorage.getItem('questbot_user_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('questbot_user_id', id);
  }
  return id;
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
    headers: { 'content-type': 'application/json', 'x-user-id': getUserId() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ask failed: ${res.status}`);
  return res.json();
}

export async function sendFeedback(answerId: string, helpful: boolean): Promise<void> {
  const body: FeedbackRequest = { answerId, helpful };
  await fetch(`${BACKEND_URL}/feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-user-id': getUserId() },
    body: JSON.stringify(body),
  });
}
