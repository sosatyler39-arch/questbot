# Questbot — Feature Addendum: Checklists, Speedrun Routing, Retention Features & Open-Item Resolutions

This is an addendum to the original `CLAUDE.md` build brief. Read that first for full context (architecture, safety constraints, tiering). This document covers: three flagged open items that need resolving now, plus five new features to add to the backlog.

---

## Part A — Resolving the flagged open items

### A1. Billing/paywall enforcement — now unblocked, but with a new dependency

The original brief's auth recommendation (Overwolf-native user identity + Stripe) assumed the app was staying on the Overwolf SDK. **Since the project has since moved from Overwolf to plain Electron, that recommendation no longer holds — there is no Overwolf account system to lean on anymore.** This needs a real replacement decision, not a carry-over:

- **Recommended:** Discord OAuth as the primary sign-in method, paired with Stripe for billing (Discord ID as the external customer reference). Reasoning: near-total overlap between "plays Elden Ring" and "has a Discord account," and it avoids building/maintaining a password-based auth system.
- Once identity is decided, the continuous-memory toggle and live-search fallback must actually check `tier` server-side before being enabled — right now both are reportedly open to everyone, which is a real gap, not just an unfinished nice-to-have. Close this before beta, not after.

### A2. EAC compatibility verification — still required, and now higher-risk

This was already a required pre-beta check under Overwolf. **The Overwolf→Electron move likely makes this a bigger risk, not a neutral one:** Overwolf apps benefit from Overwolf's existing relationships with publishers around anti-cheat allowlisting; a bespoke Electron overlay doing global hotkey capture and screen reading has no such standing relationship and may draw more scrutiny from EAC, not less. Treat this as a re-opened risk needing fresh verification against the current Electron build, not a check that was already half-done under the old architecture.

### A3. End-to-end verification pass against the live DB

Keep as a required gate before calling anything "done" — standard practice, no change from what's already tracked.

---

## Part B — New features

### B1. Quest Checklist generation

When a player's question implies a multi-step answer (a questline, a multi-stage boss strategy, a multi-part puzzle), Questbot should detect that and offer to generate a checklist — a sequence of discrete, checkable steps — instead of just a prose answer. Build this as a **shared checklist-generation service**, not a one-off feature: it's also the engine behind the Speedrun tab's route checklist (B2). Checklist state (checked/unchecked) should persist locally within the overlay so a player can close and reopen without losing progress.

### B2. Speedrun tab

A dedicated overlay tab containing an interactive copy of the game map. The player selects locations and items in the order they want to visit/collect them, building a custom route. The route:
- Can be **saved and reloaded** — reopening the overlay later restores the saved route on the map.
- Can generate a **checklist** from the route (via the B1 engine) so the player checks off each stop as completed, instead of re-checking the map every time to confirm they didn't miss a step.

Flag before building: this requires an actual interactive-map data source. Check whether Fextralife (or another already-vetted source) has a usable interactive map and what its licensing looks like — this is a separate content/ToS question from the wiki-text indexing already pending, not covered by that earlier check.

### B3. Favorites / Bookmarks

Let a player save a specific answer or map location for quick recall later — e.g., bookmark a boss strategy or a location pin — accessible from a dedicated list without re-asking the question or re-navigating the map.

### B4. Answer History

A scrollable log of past questions and answers, at minimum for the current session. Cross-session history is a stretch goal, and is contingent on A1 (identity) — you can't durably key history to a user without a real account to attach it to.

### B5. Onboarding / First-run flow

A guided first-launch walkthrough covering the hotkey to summon the popup and how on-demand screenshot capture works. Critically, this is also where **informed consent for continuous memory lives** — per the original brief's "no silent buffering" rule, this isn't just tutorial polish, it's the actual consent mechanism. Continuous memory should not be enable-able until the player has seen and acknowledged this explanation, not just have it available as a skippable tutorial step.

---

## Suggested order for this addendum

1. A1 (identity + real tier enforcement) — unblocks correctly gating everything else being built.
2. A2 (EAC re-verification under Electron) — a go/no-go risk, resolve early rather than after more features are built on top.
3. B1 (checklist engine) before B2, since B2 depends on it.
4. B3 and B4 are additive and low-risk — can be built in parallel with B2 once B1 lands.
5. B5 last, once continuous memory (already built) has something real to gate consent around.
6. A3 (full e2e pass) as the final gate before beta.
