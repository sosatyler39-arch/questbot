-- Questbot schema. Not wired yet — applied at step 4 (real content pipeline).
CREATE EXTENSION IF NOT EXISTS vector;

-- Keyed on Overwolf user ID; no bespoke auth. Stripe webhooks update tier.
CREATE TABLE users (
  overwolf_id        TEXT PRIMARY KEY,
  tier               TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'paid')),
  stripe_customer_id TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pre-embedded content: Fextralife sections + YouTube transcript segments.
CREATE TABLE chunks (
  id            BIGSERIAL PRIMARY KEY,
  source_type   TEXT NOT NULL CHECK (source_type IN ('article', 'video')),
  title         TEXT NOT NULL,
  url           TEXT NOT NULL,
  content       TEXT NOT NULL,
  video_id      TEXT,     -- video chunks only
  start_seconds INT,      -- video chunks only
  embedding     vector(1536),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (source_type <> 'video' OR (video_id IS NOT NULL AND start_seconds IS NOT NULL))
);
CREATE INDEX chunks_embedding_idx ON chunks USING hnsw (embedding vector_cosine_ops);

-- Thumbs up/down per answer, for quality tracking.
CREATE TABLE feedback (
  id          BIGSERIAL PRIMARY KEY,
  answer_id   UUID NOT NULL,
  overwolf_id TEXT,
  helpful     BOOLEAN NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-user metering (LLM calls cost money; paid features cost more).
CREATE TABLE usage (
  id          BIGSERIAL PRIMARY KEY,
  overwolf_id TEXT NOT NULL,
  kind        TEXT NOT NULL, -- 'ask' | 'live_search' | ...
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
