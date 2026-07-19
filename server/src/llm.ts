import { GoogleGenAI } from '@google/genai';

// Free-tier Gemini (aistudio.google.com/apikey) — no billing account required.
// Backend owns the key; the client never sees it (§2/§6 of the brief).
export const genai = new GoogleGenAI({});

// gemini-2.5-flash/-lite: 404, deprecated for new accounts.
// gemini-3.5-flash / gemini-3-flash-preview: consistently 503 (over capacity
// on the free tier — these are the newest preview models). gemini-flash-latest
// worked intermittently. gemini-3.1-flash-lite was the reliable one in testing.
export const MODEL = 'gemini-3.1-flash-lite';
