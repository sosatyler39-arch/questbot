// Mirrors ../../../shared/types.ts. Duplicated (not imported) because the
// renderer is a separately-emitted build target (tsconfig.renderer.json) —
// importing the shared .ts source across that boundary forces it into this
// program's rootDir, which breaks flat output. Keep in sync manually; it's
// a small, slow-moving wire contract.
export type SourceCard =
  | { kind: 'article'; title: string; snippet: string; url: string }
  | { kind: 'video'; title: string; videoId: string; startSeconds: number; url: string };

export interface AskResponse {
  answerId: string;
  answer: string;
  confidence: number;
  source?: SourceCard;
  lowConfidence?: boolean;
}

export interface AskRequest {
  question: string;
  screenshots?: string[];
}

export interface FeedbackRequest {
  answerId: string;
  helpful: boolean;
}
