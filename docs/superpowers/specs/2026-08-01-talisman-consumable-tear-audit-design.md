# Talisman / Consumable / Crystal Tear Corpus Audit — Design

## Context

This is sub-project #1 of a larger effort to fold several community-maintained Elden Ring
spreadsheets into Questbot (see the brainstorming discussion in this session for the full
4-part decomposition: this audit, a new enemy/boss stats category, dense mechanics reference
data, and calculator-logic porting — each gets its own spec/plan).

It also directly closes part of an existing, documented gap: README's "Corpus audit against
ERDB" section states Talismans, Consumables, Crystal Tears, and Whetstones were left
**unaudited** after ERDB turned out to be too old to parse the DLC-patched game
(`docs/superpowers/audit-logs/2026-07-22-corpus-audit.md`). A replacement source has now been
found: the "ER - Miscellaneous Data" Google Sheet (user-provided, confirmed free/uncopyrighted,
data-mined, DLC-current — App Ver. 1.16.1), which the user separately confirmed is fine to use.

## Scope

**In scope:**
- **Talismans** (`server/src/pipeline/sources/data/talismans.ts`, 155 entries): full audit
  against the sheet's "Effects - Talismans" tab (154 real data rows, once the header row is
  excluded — close to, but not an exact 1:1 match with, the corpus's 155; the name-matching
  process below surfaces whichever single item doesn't line up rather than assuming parity).
  This corpus already states exact percentages, so this is a verify-and-correct pass, the same
  shape as the existing Incantations/Sorceries audit.
- **Crystal Tears** (`server/src/pipeline/sources/data/crystal-tears.ts`, ~37 entries): audit
  + enrich against the sheet's "Effects - Wonderous Physick" tab (37 real data rows, closely
  matching the corpus count). Most existing entries are qualitative ("Temporarily boosts
  maximum HP") with no number — where the sheet gives an exact value (e.g. `⌊MaxHP * 1.1⌋`,
  i.e. +10%), it gets added; where the corpus already has a number, it gets verified.
- **Consumables** (`server/src/pipeline/sources/data/consumables.ts`, 196 entries): enrich
  only. The sheet's "Effects - Consumables" tab is a small, non-exhaustive list (9 real data
  rows — throwing pots and combat aromatics with non-obvious formulas: Albinauric Pot, Oil Pot,
  Roped Oil Pot, Hefty Oil Pot, Uplifting Aromatic, Acid Spraymist, Bloodboil Aromatic, Ironjar
  Aromatic, Phantom Great Rune), not a full catalog. Of these, "Phantom Great Rune" actually
  lives in `great-runes.ts`, not `consumables.ts` — out of this pass's file scope, so it will
  correctly fall out as "unmatched" (see Error handling) rather than being misapplied. The
  remaining 8 matching `consumables.ts` entries get exact numbers added; the other ~188
  consumables are untouched.

**Out of scope (explicitly deferred, not silently dropped):**
- Whetstones — the sheet has no dedicated tab for these; still unaudited after this pass.
- Re-syncing the live database with any corrected text. No Postgres instance is running in
  this environment, and a full re-embed costs real Gemini API usage — left as a manual
  follow-up, same as the wiki-URL and item_locations work earlier in this session.
- PvP-specific values. The sheet lists separate PvP-altered numbers for several effects (e.g.
  "1.08x in PvP") — this project's corpus is PvE guide content only, per the brief, so only
  the PvE-column values are used.
- Upgrade-tier data the corpus doesn't already track structurally (none expected — talismans
  are already broken into separate `+1`/`+2`/`+3` sections per tier in the existing corpus).

## Data source access

The sheet is Google-Sheets-hosted and shared as "anyone with the link can view." Its rendered
UI is a heavy JS app that doesn't expose cell text to simple scraping, but the underlying gviz
CSV export endpoint works cleanly for a link-shared sheet with no authentication:

```
https://docs.google.com/spreadsheets/d/1rfYfa5kcyoCuKgnS23dc8J8lLLTqWXsWtq9qG4TxT50/gviz/tq?tqx=out:csv&sheet=<URL-encoded tab name>
```

This was already verified working during brainstorming (pulled the Talismans tab: 154 real data
rows, correct headers, real DLC entries present). The three tabs needed are
`Effects - Talismans`, `Effects - Wonderous Physick`, and `Effects - Consumables`.

One parsing wrinkle found during verification: naive newline-splitting breaks because some
cells contain embedded literal newlines (RFC 4180 quoted multi-line fields). The audit script
must use a real CSV parser (e.g. Node's own quote-aware split, or a small hand-rolled RFC 4180
parser — no new dependency needed for three small tabs), not a `.split('\n')`.

## Process

A disposable script (write, run once, delete — this project's established convention),
following the same shape as the Incantations/Sorceries audit:

1. Fetch and parse all three CSV tabs.
2. For each corpus file, match existing `ArticleSection` entries to sheet rows by exact name
   (lowercased/trimmed) — talisman names carry `+1`/`+2`/`+3` suffixes on both sides already,
   so no suffix-stripping is needed (same as the existing audit's finding for
   incantations/sorceries).
3. For Talismans: where the sheet's exact effect value disagrees with the corpus's stated
   percentage/number, flag it as a correction.
4. For Crystal Tears and Consumables: where the corpus entry has no number and the sheet
   provides one, flag it as an enrichment; where both have numbers, verify and flag mismatches
   as corrections same as Talismans.
5. Print a full report (matched/corrected/enriched/unmatched counts + a table of every
   change), matching the existing audit log's format.
6. Apply the flagged corrections/enrichments directly to the three `.ts` source files —
   changing only the specific number/clause that changed, not rewording unrelated text (same
   rule as the existing audit).
7. Delete the disposable script; keep the generated audit log.

## Error handling

Name-matching is the main failure surface. Any sheet row that doesn't exact-match a corpus
entry (or vice versa) is reported as "unmatched" in the log, not guessed at or silently
skipped — consistent with the existing audit's handling of DLC-only/unmatched spells. No
automatic corrections are applied where a match is ambiguous (e.g. more than one corpus entry
matching one sheet row); those are listed for manual review instead of picked automatically.

## Testing

No dedicated test suite — `talismans.ts`/`consumables.ts`/`crystal-tears.ts` are plain data
arrays with no existing tests of their own (matching the established pattern for this
project's other content-only files). Verification is:
- `npm run typecheck -w server` passes after edits (catches any malformed entries).
- The printed audit report itself is the primary evidence — every change is listed with
  old→new values, reviewable before/after applying.
- A written audit log at `docs/superpowers/audit-logs/2026-08-01-talisman-consumable-tear-audit.md`,
  same format as the existing one, is the permanent record.
