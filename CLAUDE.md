# Questbot (WIP) — Build Brief for Claude Code

## Kickoff instruction

You are building **Questbot**, a PC gaming overlay with a built-in AI assistant. Read the full brief below — it's a locked V1 product spec, not a brainstorm. Before writing extensive code:

1. Propose a repository structure that cleanly separates the **overlay client** (Overwolf app) from the **backend service** (API + retrieval + DB access). Confirm it with me.
2. Scaffold both halves with the core "ask a question, get an answer" flow working end-to-end using **mocked retrieval data** first — don't wire real Fextralife/YouTube indexing until the flow itself works.
3. Only after the mocked flow works, build out the real content pipeline (indexing) and swap the mock for it.
4. Flag anything in this brief that seems technically inconsistent or underspecified rather than guessing silently — ask.

---

## 1. Product summary

Questbot is an in-game overlay assistant for **Elden Ring**. A player hits a hotkey, types a question about how to progress, and Questbot answers using content pulled from the Fextralife wiki and a curated set of YouTube guide creators — surfaced without the player leaving the game.

**Core differentiator:** Questbot decides whether the best answer is written or spoken/shown in a video, and responds accordingly:
- If the answer lives in an article → show a snippet + link.
- If the answer lives in a video → **deep-link to the exact timestamp** that answers the question (like Google's "key moments"), not a general video link. Never re-host or clip video content — copyright risk.

---

## 2. Architecture

- **Client:** Overwolf overlay app. Built on the Overwolf SDK (handles overlay-on-fullscreen rendering, hotkey capture, click-through) rather than custom DirectX/Vulkan hooking.
- **Backend service:** Sits between the client and the AI provider. Owns all API keys — **the client must never hold or call the AI provider directly.** Handles retrieval, calls the LLM, meters usage per user.
- **Database:** Postgres with the `pgvector` extension for semantic search. No separate vector DB service needed at this scale.
- **AI:** A hosted vision-capable LLM accessed via API, used for two distinct jobs — (a) reading game-state context from a screenshot, (b) synthesizing the final answer from retrieved content. Not a locally trained/self-hosted model.

---

## 3. Core user flow

1. Player hits a hotkey → a popup chat box appears (not a persistent sidebar — it auto-dismisses after a period of inactivity).
2. Player types a question.
3. Client captures a screenshot **on-demand, only at this moment** (default behavior — see §5 for the opt-in continuous mode) and sends it + the question to the backend.
4. Backend runs the screenshot through the vision model to extract game-state context (location, dialogue, quest info if visible).
5. Backend embeds the question and searches the pgvector index (pre-embedded Fextralife chunks + YouTube transcript chunks) for the closest semantic matches.
6. If match confidence is high → synthesize a short answer + source card (article snippet+link, or video embed jumped to the matched timestamp).
7. If match confidence is low:
   - **Free tier:** tell the user plainly Questbot couldn't find a confident answer, with an upgrade prompt. Do not guess.
   - **Paid tier:** fall back to a live search for this one question instead of answering from a weak match.
8. Every answer shows a thumbs up / thumbs down control; log the result for quality tracking.

---

## 4. Content pipeline (build after the mocked flow works)

- **Sources:** Fextralife wiki (Elden Ring) as primary text source; a curated shortlist of Elden Ring YouTube guide creators for video (curated list, not open-ended YouTube search).
- **Indexing:** Wiki pages chunked by section/heading. YouTube transcripts chunked into short timestamped segments (~30–60s). All chunks embedded and stored in pgvector.
- **Refresh cadence:** A scheduled sync job (nightly or weekly) checks for new/updated wiki pages and new videos from the curated creator list, and re-embeds anything changed. Do not index live per-question — that's what the fallback path is for.
- **Before indexing anything from Fextralife:** their terms of service need to be checked for whether this indexing approach is permitted. Treat this as a blocking prerequisite for the real pipeline, not a nice-to-have.

---

## 5. Feature: opt-in continuous memory (paid)

Beyond the on-demand default, players can opt into a "continuous memory" setting:
- Maintains a **rolling local buffer of the last 5–10 minutes** of screenshots, sampled every few seconds (not every frame — this is not a video recording).
- Buffer stays **local until a question is asked** — nothing is sent off-device just because it was captured.
- A **persistent visual indicator** (e.g. a small recording dot in the overlay) must be shown whenever this mode is active. Non-negotiable — silent buffering of screen content is a trust problem.
- This feature is **paywalled** (see §7).

---

## 6. Safety constraints — do not violate these

- **No game-memory reading, ever.** Game-state context comes only from analyzing screenshots via the vision model. Reading process memory risks anti-cheat bans (Elden Ring runs EAC for online/co-op) and is out of scope entirely, not just for V1.
- **No API keys in the client.** All calls to the AI provider go through the backend.
- **No re-hosting or clipping video.** Deep-link to timestamps only.
- Before beta launch, the Overwolf-based overlay's compatibility with EAC needs to be explicitly verified for Elden Ring's online/co-op segments — don't assume it's fine.

---

## 7. Monetization / tiering

| Tier | Included |
|---|---|
| Free | On-demand screenshot capture, typed Q&A, answers from the pre-indexed corpus only |
| Paid | Everything in Free, plus continuous memory (§5) and live-search fallback on low-confidence answers |

Logic: both paid features are the ones that cost meaningfully more to run per use — build the gating around that, not arbitrarily. Exact price point is not yet decided (deferred to post-beta usage data) — leave this configurable, don't hardcode a number.

---

## 8. Explicit non-goals for V1 — do not build these yet

- Music platform integration (Spotify/Apple Music/etc.) — deferred to post-V1.
- Support for multiplayer/competitive titles beyond Elden Ring's limited co-op.
- Voice input or output — typed only for V1.
- Any game beyond Elden Ring. (A Palworld version is a real post-beta candidate, but it requires different capabilities — see §9 — and is not part of this build.)

---

## 9. Context only — not part of this build

For background, not action items: a second-game candidate under consideration post-beta is **Palworld**, which would require actual breeding-computation logic (not just wiki retrieval, since Palworld's breeding-outcome questions are computed questions) and broader-than-wiki sourcing (Reddit/Discord). **Path of Exile 2** was considered and set aside — it's still in early access with a shifting balance/meta, and its developer (Grinding Gear Games) has a documented history of banning players for third-party overlay tools, which is a real policy risk. Neither should influence the Elden Ring V1 architecture, but don't design anything in a way that makes a second-game expansion structurally impossible later (e.g., keep the game-specific content source config out of hardcoded logic where reasonably easy).

---

## 10. Suggested build order

1. Repo scaffold: client app + backend service + DB schema, proposed and confirmed with me first.
2. Backend: `/ask` endpoint accepting `{question, screenshot?}`, returning a mocked answer — prove the request/response shape before wiring real retrieval.
3. Wire the backend to a real hosted LLM API for synthesis, still against mocked/sample retrieval content.
4. Build the Fextralife + YouTube content pipeline (pending ToS check) and pgvector storage; swap the mock retrieval for the real index.
5. Implement the hybrid fallback (confidence threshold → live search) and the free/paid gating around it.
6. Build the Overwolf client: hotkey summon, popup UI with auto-dismiss, typed input, thumbs up/down, source-card rendering (article snippet vs. timestamped video embed).
7. Add the opt-in continuous memory buffer (§5), paywalled, with the visible recording indicator.
8. Verify EAC compatibility and Fextralife ToS before calling this beta-ready.
