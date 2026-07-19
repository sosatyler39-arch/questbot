// Wire contract between client and server. Types only — no runtime code.

export type Tier = 'free' | 'paid';

export interface AskRequest {
  question: string;
  // base64 JPEG frames, newest first. On-demand mode sends 1; continuous
  // memory (paid, step 7) sends latest + up to 3 sampled buffer frames.
  // ponytail: no near-duplicate frame dedupe yet — when the buffer lands,
  // filter consecutive near-identical frames here before sending.
  screenshots?: string[];
}

export type SourceCard =
  | { kind: 'article'; title: string; snippet: string; url: string }
  | { kind: 'video'; title: string; videoId: string; startSeconds: number; url: string };

export interface AskResponse {
  answerId: string;
  answer: string;
  confidence: number; // 0..1
  source?: SourceCard;
  lowConfidence?: boolean; // free tier, no confident match: show upgrade prompt, no guess
}

export interface FeedbackRequest {
  answerId: string;
  helpful: boolean;
}
