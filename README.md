# Questbot

In-game Elden Ring overlay assistant. See [CLAUDE.md](CLAUDE.md) for the full product brief.

**Status: ready for a full in-game playtest.** Vision and answer synthesis call the real Gemini API (`gemini-3.1-flash-lite`, free tier). `retrieval.ts` is wired to real pgvector search — the full 274-chunk / 143-page corpus is embedded and loaded (A3, see below). Content is **original guide writing, not scraped from anyone** — see [Content pipeline](#content-pipeline) below for why. Identity + billing (Discord OAuth + Stripe) is wired end-to-end and server-enforced (see [Client architecture](#client-architecture) / FEATURE_ADDENDUM §A1) — client-claimed tier headers are no longer trusted. The client is a **plain Electron app with no Overwolf dependency**, with a full tab set: **Ask / Map / Speedrun / Library / Shape Editor**, plus the opt-in continuous memory buffer (§5) gated behind an explicit onboarding consent step (§B5).

**A3 (full end-to-end verification), done live against the real DB + real Gemini API:**
- `syncGame('elden-ring')` ran to completion — 274 chunks across 143 pages, embedded and stored in pgvector. (First attempt hit the free-tier embed quota mid-run; `embeddings.ts`/`sync.ts` now embed sequentially with retry-on-429 instead of crashing — see commit history.)
- Real `/ask` requests against real content: confident matches return correct synthesized answers with source cards (e.g. "How do I beat Malenia?" → 0.72 confidence, real source snippet).
- **`CONFIDENCE_THRESHOLD` was recalibrated from 0.35 to 0.6** after finding the real embedding model has a non-trivial cosine-similarity floor — even off-topic queries ("what is the capital of France") scored ~0.46-0.55 against this corpus, well above the old 0.35 threshold, meaning the low-confidence path never actually fired. Measured relevant-query scores cluster 0.65-0.80; irrelevant cluster 0.46-0.55; 0.6 sits in the gap. See `server/src/tiers.ts`.
- Free/paid tier gating confirmed live with a real minted session token and a real `tier='paid'` DB row: free tier gets the honest no-match message, genuinely-authenticated paid tier gets the live-search fallback — a spoofed `x-user-tier` header without a valid session now does nothing (A1's point).
- Full server test suite: 24/24 passing, 1 skip (Stripe webhook signature path, needs a live webhook secret).

## Layout

- `client/` — overlay app, plain Electron (no Overwolf dependency — see below)
  - `src/main/` — main process: window creation, global hotkey, screenshot capture (CommonJS)
  - `src/renderer/` — popup UI (ESM, loaded via `<script type="module">`), tabbed into Ask (`popup.ts`) and Map (`map.ts`)
  - `src/renderer/map/` — map data + rendering: `regions.ts` (original schematic region shapes), `locations.ts` (named-location dataset), `render.ts` (SVG build, pan/zoom, search, layer toggle)
- `server/` — Fastify backend, `POST /ask` + `POST /feedback`
- `server/src/pipeline/` — content pipeline: chunking, embeddings, pgvector storage, sync orchestration
- `shared/types.ts` — server↔client wire contract. The client's renderer can't import it directly (see `client/src/renderer/types.ts`'s comment) — kept in sync by hand.

## Run

```
npm install
export GEMINI_API_KEY=...   # free key, no billing account: aistudio.google.com/apikey
export DATABASE_URL=...     # Postgres with pgvector — see "Local database" below
export YOUTUBE_API_KEY=...  # only needed for real video discovery

# Identity + billing (FEATURE_ADDENDUM §A1 — all optional in dev; without
# them every request is treated as anonymous/free, and auth/billing routes
# 500 on use rather than at startup):
export SESSION_SECRET=...          # HMAC key for backend-issued session tokens (any long random string)
export DISCORD_CLIENT_ID=...       # Discord application OAuth2 credentials
export DISCORD_CLIENT_SECRET=...   # (discord.com/developers — register redirect: $PUBLIC_BACKEND_URL/auth/discord/callback)
export PUBLIC_BACKEND_URL=...      # e.g. http://localhost:8787 in dev
export STRIPE_SECRET_KEY=...       # Stripe API key (test mode in dev)
export STRIPE_WEBHOOK_SECRET=...   # from `stripe listen` in dev, or the dashboard webhook config
export STRIPE_PRICE_ID=...         # subscription Price ID — price point stays env-configured, not hardcoded (brief §7)

npm run dev        # server on http://localhost:8787
npm test           # end-to-end + pipeline checks; live-service cases skip without credentials
npm run typecheck  # server + client (two tsconfigs: main process + renderer)
```

Dev-DB note: if your local database predates the identity work, re-apply
`server/db/schema.sql` — the `users` table was migrated off `overwolf_id` to
Discord-keyed identity (`discord_id`, `stripe_customer_id`, `tier`).

**To actually populate the database with content** (needed before `/ask` can return real answers — without this, every question falls through to the low-confidence path):

```ts
import { syncGame } from './server/src/pipeline/sync.js';
await syncGame('elden-ring');
```

This embeds every section of `server/src/pipeline/sources/original-content.ts` via Gemini and stores it in pgvector. Needs both `GEMINI_API_KEY` and `DATABASE_URL` set. Only needs to be re-run when the content changes.

### Local database

No admin rights or Docker needed — a portable, no-install PostgreSQL + officially-compiled pgvector is the approach used here:

1. Download the "binaries" zip (not the installer) from EnterpriseDB — e.g. `postgresql-17.6-1-windows-x64-binaries.zip` — and extract it.
2. `initdb.exe -D <data-dir> -U questbot --auth=trust` (trust auth is fine for local dev only).
3. `pg_ctl.exe -D <data-dir> -l pg.log -o "-p 5433" start`
4. Compile pgvector from the [official source](https://github.com/pgvector/pgvector) with `nmake` (needs VS C++ Build Tools — `vcvarsall.bat x64`, then `set PGROOT=<extracted-pg-dir>`, then `nmake /F Makefile.win` + `nmake /F Makefile.win install`). Do **not** use unofficial precompiled pgvector binaries from random repos — untrusted native code in a database process is real risk; compiling the official source takes a few minutes and avoids that entirely.
5. `createdb.exe -p 5433 -U questbot questbot`, then `psql.exe -p 5433 -U questbot -d questbot -c "CREATE EXTENSION vector;"` and apply `server/db/schema.sql`.
6. `DATABASE_URL=postgresql://questbot@localhost:5433/questbot`

This was done once already in this environment's scratch space during development (not part of the repo — a real dev/prod setup should use a proper persistent data directory, or a hosted Postgres+pgvector provider like Neon or Supabase).

Client: `npm run build -w client` compiles to `client/dist/`; `npm run start -w client` builds and launches via Electron directly — no Overwolf install needed. Verified in this environment: clean typecheck, clean build, launches without crashing, the popup actually renders (transparent background, always-on-top, correct styling — confirmed via real screenshots), the 30s auto-dismiss timer fires correctly through the full main→IPC→renderer chain, and the `Ctrl+Q` global hotkey genuinely toggles show/hide (verified with synthetic OS-level keypresses via `SendKeys`, not just code review — this exercises the real `globalShortcut` registration, the same mechanism a physical keypress would hit). **Not verified:** rendering on top of an actual Elden Ring window — no game running in this environment, and `desktopCapturer`'s window-matching depends on the exact game window title (`GAME_WINDOW_TITLE` in `main/index.ts`, currently assumed to be `"ELDEN RING"` — unconfirmed).

## Client architecture

Built on **plain Electron** — no Overwolf, no `ow-native`, no `ow-electron`. This went through two other architectures first (`ow-native`, then `ow-electron`) before landing here; see the memory notes for the full history if picking this back up. Short version: Elden Ring is DirectX 12-only, and Overwolf's DX12-capable screenshot API (`IOverwolfOverlayApi.takeScreenshot()`) only exists in `ow-electron`, which means injecting into Elden Ring's process — a real Easy Anti-Cheat (EAC) risk that Overwolf mitigates only through an established vendor-allowlist relationship a new indie project doesn't have. Overwolf's monetization policy (blocks third-party billing like Stripe) was a second, independent reason to drop it.

**The approach instead: a non-injecting overlay.** A separate always-on-top, transparent `BrowserWindow` that never touches Elden Ring's process at all — not process injection, so it isn't in the category EAC is built to detect. Screenshot capture uses `desktopCapturer` targeting the Elden Ring window by title (`main/index.ts`), the same OS-level window-capture mechanism OBS uses as its own documented anti-cheat-safe fallback ("Window Capture" instead of the injecting "Game Capture"). The hotkey uses `globalShortcut`, also OS-level, no injection.

**The real tradeoff:** non-injecting topmost windows only reliably render over a game in **borderless windowed** mode, not true exclusive fullscreen — a Windows desktop-compositor limitation, not something fixable without touching the game's render pipeline (which is exactly the injection risk this avoids). Players in exclusive fullscreen won't see the popup. Elden Ring already has independent, documented fullscreen quirks, so this isn't a novel constraint.

Also worth knowing if Overwolf's app store is ever revisited as a promotion channel: their app-name policy prohibits the word "bot" (ad-partner filtering) — `package.json`'s `productName` is `"Questbot"` regardless, kept as-is pending a branding decision.

### Continuous memory (§5)

Opt-in rolling buffer, built in `client/src/main/continuous-memory.ts`. `Ctrl+Shift+Q` toggles it. While on: samples a screenshot every 5s, keeps the last 10 minutes, and shows a small pulsing red dot in the screen's top-right corner — visible independent of the popup, since buffering continues even while the popup is closed (the brief is explicit that silent buffering is a trust problem). Verified live: the dot appears on toggle-on and disappears cleanly on toggle-off. When a question is asked with this mode on, `captureForQuestion()` sends the latest frame plus up to 3 more spread across the buffered window (not just the most recent few seconds) — matching the brief's "latest + up to ~3 sampled recent frames." **Paywall enforcement is now server-side** (FEATURE_ADDENDUM §A1): the local toggle stays open to everyone (buffering is local-only and free by design), but `/ask` only *uses* multi-frame context for verified paid-tier sessions — free/anonymous requests have all but the newest frame discarded server-side (`server/src/routes/ask.ts`), so a modified client can't spoof its way into the paid feature.

## Interactive map

Second overlay tab, next to Ask. V1 scope per the brief: name every named location and let the player pan/zoom around — nothing per-pin is interactive yet.

- **Map is original, not traced.** `client/src/renderer/map/regions.ts` hand-designs simplified, deliberately blocky region shapes based on general knowledge of the game's relative geography (Liurnia north of Limgrave, Caelid east, etc.) — not copied or traced from Fextralife's interactive map or any in-game/fan-made map image. Same sourcing policy as the article content (see [Content pipeline](#content-pipeline)).
- **~230 named locations** in `client/src/renderer/map/locations.ts` — legacy dungeons, minor dungeons (catacombs/caves/tunnels/hero's graves), evergaols, churches, towns/forts/ruins, named open-world landmarks, and field-boss ("Great Enemy") sites, across all surface regions plus a separate underground layer (Siofra River, Ainsel River, Nokron, Nokstella, Deeproot Depths, Lake of Rot, Mohgwyn Palace). Sourced from a background research pass cross-referencing `eldenring.wiki.gg` (explicitly not Fextralife/Fandom) and general gaming-press coverage for boss siting, merged with an initial hand-built seed set.
- **Known gaps, called out rather than papered over:** a handful of locations have solid names but only approximate/uncertain relative placement (a few Altus Plateau ruins, some Caelid catacombs) — flagged inline in the research pass this was built from. A couple of names that looked like likely duplicates or mislabeled sub-locations (e.g. "Academy Crystal Cave" as distinct from Raya Lucaria Crystal Tunnel, "Gael Tunnel" as a standalone dungeon) were deliberately left off rather than guessed onto the map.
- **Interaction:** search box filters by name and centers/zooms the map on a match; click-drag pans (CSS transform, no mapping library); mouse wheel zooms; a toggle switches between the surface map and the underground layer.
- Verified live in this environment: popup opens via `Ctrl+Q`, Map tab renders regions + labeled pins, search-to-center works (tested against "Stormveil Castle"), and the surface/underground toggle works. Window is now `900x650` and resizable (was `480x360`) to fit the map.

## Before running against the real game

- Elden Ring's window title is assumed to be exactly `"ELDEN RING"` (`GAME_WINDOW_TITLE` in `client/src/main/index.ts`) — **unverified**, confirm against the actual running game window.
- No app icon yet.
- Borderless windowed mode required for the overlay to render (see above) — not yet surfaced to the player as a setup requirement anywhere in the UI.

## Content pipeline

**Article content is original writing, not scraped from anyone.** `server/src/pipeline/sources/original-content.ts` aggregates ~147 pages across `server/src/pipeline/sources/data/*.ts` — every dungeon + its boss, every Great Enemy (field boss) + location, every evergaol, every church, notable chests (incl. trap chests), key item locations, full questlines, all starting classes (stats + equipment) and keepsakes, core stats (soft caps/breakpoints), and general mechanics (HP/FP/stamina/equip load/poise, damage types, status effects) — each broken into sections, written from general knowledge of the game and user-supplied first-party data rather than adapted from Fextralife, Fandom, wiki.gg, or any other existing wiki. Facts about a game (boss names, locations, mechanics) aren't copyrightable expression; this is our own wording throughout. Breadth is substantial but **not claimed as 100% exhaustive** — gaps get filled as they're found, not guessed around. This replaced two earlier candidate sources that didn't work out:

- **Fextralife** — Valnet Inc.'s Terms of Use explicitly prohibit scraping/crawling and using content to power an AI system. See [server/src/pipeline/sources/articles.ts](server/src/pipeline/sources/articles.ts) (kept as a stubbed, unimplemented pluggable source — not deleted, in case a licensing deal ever happens).
- **Fandom's Elden Ring wiki** — actually CC-BY-SA licensed (verified directly against the page's own footer), which would have permitted commercial use with attribution + share-alike. Not used because the user preferred original content instead.

- **YouTube (video transcripts)** — still blocked. [server/src/pipeline/sources/youtube.ts](server/src/pipeline/sources/youtube.ts): video *discovery* (`listRecentVideos`) is real and works against the official Data API. Transcript *text* is unimplemented — Google's YouTube API Developer Policies prohibit obtaining scraped YouTube data, which covers the unofficial `timedtext`-based libraries most third-party transcript tools use. The official path (`captions.download`) needs OAuth granted by each video's own channel owner.

What's real, tested, and wired end-to-end: chunking (`chunking.ts`), embeddings via `gemini-embedding-001` with required re-normalization for the truncated 1536-dim output (`embeddings.ts`), pgvector storage (`store.ts`), the sync orchestration (`sync.ts`), and `retrieval.ts`'s `pgvectorRetriever` — actually wired into `/ask` now, not the mock.

**Talismans (155 items, 14 category pages)** were added the same way as the rest of the corpus — original phrasing, but with exact percentages/values supplied directly by the user rather than from model recall (same rule as `stats.ts`), since a wrong number is worse than no number for a build-advice tool.

**Incantations (129 items, 14 category pages, `data/incantations.ts`)** were added the same way — original phrasing, exact FP cost (including the continuous/per-second drain on channeled spells), memory slot cost, INT/FAI/ARC requirements, Stamina cost, and damage/buff/healing/utility classification all supplied directly by the user.

**Sorceries (84 items, 11 category pages, `data/sorceries.ts`)** were added the same way — original phrasing, exact FP cost, memory slot cost, INT/FAI/ARC requirements, and Stamina cost supplied directly by the user. Synced and retrieval-verified live: "What does Comet Azur do?" top match is `Glintstone sorceries — Comet Azur` at 0.662; "How much stamina does Terra Magica cost?" top match is the correct chunk at 0.730; "What are the requirements for Rennala's Full Moon?" top match is the correct chunk at 0.787.

**Known gap — corpus-wide re-embed, was blocked on quota, now catching up.** While verifying talisman retrieval, found that `embedAndStore` (`sync.ts`) only ever embedded `chunk.content`, never `chunk.title` — so a short generic effect string like "Shortens spell casting time." never mentions the item's own name anywhere in what actually gets embedded, and a query like "what does the Radagon Icon do?" can't find its own chunk by name. Fixed to embed `title: content` together (stored/displayed content is unchanged). The free-tier **daily** embed quota (1000/day) was hit twice since — once mid corpus-wide re-embed (280/429 chunks fixed, 149 left on the old formula) and once on a targeted incantations-only sync attempt (failed immediately on the first `embedContent` call with a `PerDay` error). The quota has since reset — a full `syncGame('elden-ring')` re-run is in progress to close out both the remaining 149 old-formula chunks and the previously-unsynced incantations corpus in a single pass; see commit history for the final chunk count once it completes.

## Blocking prerequisites before beta (from the brief)

- YouTube transcript access (creator partnerships, or an accepted-risk decision) — see above.
- EAC compatibility verification — re-opened as a live risk by FEATURE_ADDENDUM §A2 (the Overwolf→Electron move means no vendor-allowlist standing). See [docs/EAC-RISK-ASSESSMENT.md](docs/EAC-RISK-ASSESSMENT.md) for the current analysis and what still requires a real in-game test.
- ~~Real payment/tier enforcement~~ — **closed by FEATURE_ADDENDUM §A1**: Discord OAuth identity + Stripe subscription tier, enforced server-side in `tiers.ts`/`ask.ts` (client-claimed headers are no longer trusted). Needs the env vars above configured in any real deployment.

## Backlog

- **Overwolf monetization/promotion**: https://dev.overwolf.com/ow-native/getting-started/project-roadmap — flagged by the user as the likely answer to how Questbot could monetize (Overwolf requires their own ads/subscriptions for apps distributed through them, not third-party billing like Stripe) and as a possible place to promote Questbot to players later. Not acted on yet — the client currently has no Overwolf dependency at all, so this is a distribution/business decision to make deliberately, not a technical requirement.
- **Go-to-market**: plan is to get this to a working, shareable state and have small-to-large Elden Ring content creators try it before investing further in scale/store distribution/formal monetization.
