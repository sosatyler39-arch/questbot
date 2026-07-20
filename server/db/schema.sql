-- Questbot schema. Applied against a local Postgres+pgvector instance —
-- see README "Local database" for setup.
CREATE EXTENSION IF NOT EXISTS vector;

-- Keyed on Discord user ID (OAuth2 identify scope). Stripe webhooks update tier.
CREATE TABLE users (
  discord_id         TEXT PRIMARY KEY,
  discord_username   TEXT NOT NULL,
  tier               TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'paid')),
  stripe_customer_id TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pre-embedded content: original-writing article sections + (future) video
-- transcript segments.
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
  discord_id  TEXT,
  helpful     BOOLEAN NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-user metering (LLM calls cost money; paid features cost more).
CREATE TABLE usage (
  id          BIGSERIAL PRIMARY KEY,
  discord_id  TEXT NOT NULL,
  kind        TEXT NOT NULL, -- 'ask' | 'live_search' | ...
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
