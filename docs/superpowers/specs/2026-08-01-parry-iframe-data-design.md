# Parry & i-Frame Reference Data — Design

## Context

This is sub-project #3 of the 4-part spreadsheet-incorporation effort (see sub-project #1's
spec for the full decomposition). It was originally scoped as "dense mechanics reference data"
covering four sheets, but direct inspection during brainstorming found three of them are
calculator *inputs*, not standalone reference content:

- **Motion Values** — 480 weapons × 70+ named-attack columns of raw multipliers (e.g. "1h R1
  1: 100"). Meaningless to a player without the AR-computation formula applied to them.
- **Scaling Data** — raw scaling-curve breakpoints (`maxVal`/`maxGrowVal`/`adjPt`), not the
  letter grades (`weapons.ts` already has those) — also calculator input, not display data.
- **"Hyper armor/Poise calculator"** — turned out to literally be a calculator spreadsheet
  (input cells + formulas, 2 tabs: `Poise Calculator`, `Changelog`), not reference data at all.

All three move to sub-project #4 (calculator-logic porting), where their actual computational
role belongs. **This sub-project is now scoped down to just the Parry and i-Frame Data
sheet's two tabs** — genuinely standalone, human-readable reference data that's useful on its
own without any calculator math (e.g. "this weapon skill grants 6 invincibility frames").

## Scope

Both tabs of the "Parry and I-frame Data" sheet, verified directly:

- **`Parry Frames`** (~14 real rows): parry tools (Golden Parry, Carian Retaliation, Buckler,
  various shields/daggers) with Startup, Parry Frames, and Recovery-to-{Roll/Crouch, Ash of
  War, Right Hand Attack, Left Hand Attack, Block, Quick Item Use, Item Use, Walk} columns.
- **`iFrames`** (~24 real rows): roll types (Light/Medium/Heavy Roll) and specific i-frame-
  granting items/skills (e.g. Bloody Helice) with Startup, i-Frames, and the same 8
  Recovery-to-{...} columns as Parry Frames.

Both tabs carry the sheet's own explicit note: **"DATA COLLECTED AT 30FPS! Double the values
for terms of 60fps."** — shown verbatim on the page rather than silently converting, since
the raw sheet values are the source of truth and doubling them introduces a transformation
that could itself be wrong.

## Architecture

Given the small size (under 50 total rows across both tabs), this doesn't need the Content
Collection + search machinery built for the wiki/enemies sections. A single static Astro page,
`web/src/pages/elden-ring/frame-data.astro`, renders two tables from one small generated JSON
file (`web/src/content/frame-data.json` — a plain static asset, not a Content Collection,
since there's exactly one file and no per-item routing). The page reuses `WikiLayout` (already
generic, not wiki-specific) with `active` left at its default, since this doesn't warrant its
own `SubTabs` entry — instead, it's linked from the wiki's existing `mechanic` category page
(`/elden-ring/wiki/mechanic`) as a "See also" reference, since Parry/i-Frame data is
thematically part of the same "combat mechanics" grouping as the existing General Stats/Ways
to Attack pages there, without forcing tabular frame data into that category's prose format.

**Not wired into `/ask`** — same reasoning as the rest of this sub-project's original scope:
this is quick-reference lookup data for build-crafting, not something that fits naturally into
a synthesized conversational answer.

## Error handling

A disposable ingestion script (write, run once, delete) fetches both tabs via the same CSV
export + parser pattern already proven twice this session. If either tab's row count changes
unexpectedly on a re-run (not expected, since this is a one-time import, but worth guarding),
the script just reports the row count it found — there's no cross-tab alignment to verify here
(unlike the enemy stats sheet, these two tabs are independent, not row-aligned).

## Testing

No dedicated test suite — this mirrors the wiki/enemies precedent of "plain generated data,
no per-file tests," verified instead by:
- The ingestion script prints the row count found in each tab.
- `astro build` succeeds and produces the page.
- Live spot-check: the page renders both tables with headers matching the sheet, and the
  30fps note is visible.
