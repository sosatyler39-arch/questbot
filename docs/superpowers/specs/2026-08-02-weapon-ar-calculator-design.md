# Weapon Attack Rating Calculator — Design

## Context

This is sub-project #4 (final) of the spreadsheet-incorporation effort (see sub-project #1's
spec for the full decomposition). It absorbed everything reclassified as "calculator input" or
"calculator tool" during #3's brainstorming: Motion Values, Scaling Data, and the "ER Poise
Calculator" sheet.

Direct code review during brainstorming found that of everything in scope, only the **weapon
attack rating (AR) calculator** has real, portable, MIT-licensed source code behind it
(`ThomasJClark/elden-ring-weapon-calculator`, already this project's trusted source for
`weapons.ts`'s base stats). Motion Values, the Poise Calculator, and Build Planner either have
no backing source code (spreadsheet-only) or point to other people's separate hosted tools —
none of those are things to "port," they'd need to be built from scratch, which is real,
separate work for a future pass. **This sub-project's scope is the AR calculator only.**

## What's being ported, verified directly against the real source

Four files from `src/calculator/` (MIT-licensed) — read in full during brainstorming, not
assumed:

- **`attributes.ts`** (4 lines) — `Attribute` type (`str`/`dex`/`int`/`fai`/`arc`) and
  `Attributes` record type.
- **`attackPowerTypes.ts`** (~25 lines) — the `AttackPowerType` enum (5 damage types + 7 status
  types) and grouping constants.
- **`weapon.ts`** (~75 lines) — the `Weapon` interface: name/type/requirements, per-upgrade-level
  `attributeScaling`/`attack` arrays, `attackElementCorrect` (which attributes scale which damage
  types), `calcCorrectGraphs` (a precomputed 0-148 lookup array per damage type — see below),
  `paired`/`sorceryTool`/`incantationTool` flags, `scalingTiers`.
- **`calculator.ts`** (~110 lines) — `getWeaponAttack()`, the actual AR formula: adjusts
  attributes for two-handing, checks attribute requirements (applying an "ineffective" penalty
  if unmet), and sums `baseAttackPower × (1 + scaling)` per damage/status type, where `scaling`
  comes from indexing `calcCorrectGraphs[type][attributeValue] × attributeScaling`.

These get ported into `server/src/calculator/` as close to verbatim as this project's module
conventions allow (ESM `.js`-extension imports per this project's existing TypeScript setup,
no other changes to the logic itself).

## The data problem, and how it's solved

`calculator.ts` expects `Weapon.calcCorrectGraphs` as a **ready-to-index array** (one lookup
value per attribute point, 1 through 148). The raw data source
(`https://eldenring.tclark.io/regulation-vanilla-v1.14.js`, confirmed DLC-current, already used
for `weapons.ts`) stores these as **5 compact breakpoints** per curve
(`{maxVal, maxGrowVal, adjPt}`) — the same shape `buildData.ts`'s `parseCalcCorrectGraph`
produces, confirmed by reading that function verbatim. Turning breakpoints into the full lookup
array requires an interpolation step, `evaluateCalcCorrectGraph()` — also read verbatim from
`regulationData.ts` during brainstorming (~25 lines, ported as-is, same MIT license):
for each of the 5 breakpoint segments, walks the attribute range between the previous and
current breakpoint, computing an eased interpolation ratio (`ratio ** adjPt` for positive
`adjPt`, `1 - (1-ratio) ** -adjPt` for negative) between the two `maxGrowVal` endpoints.

The raw JSON's `weapons` array stores each weapon compactly (`calcCorrectGraphIds` — references
into a shared table — and `attackElementCorrectId`/`reinforceTypeId` — references resolved
against shared `attackElementCorrects`/`reinforceTypes` tables) rather than the fully-expanded
per-weapon shape `calculator.ts` consumes directly. A new loader module,
`server/src/calculator/load-weapons.ts`, does this expansion: for each raw weapon entry, resolve
its `calcCorrectGraphIds` through `evaluateCalcCorrectGraph()`, resolve its
`attackElementCorrectId` by direct lookup in the shared table, and build the per-upgrade-level
`attack`/`attributeScaling` arrays by applying each `reinforceTypes` entry's percentage
multipliers to the base (unupgraded) values. This loader is original code (there's no single
"decode" function to port verbatim — the real app builds this incrementally across several
files) but is a direct, well-defined inverse of `buildData.ts`'s `parseWeapon()`/
`parseCalcCorrectGraph()`, which were read in full to make sure the reverse mapping is correct
field-for-field.

## Architecture

- `server/src/calculator/attributes.ts`, `attackPowerTypes.ts`, `weapon.ts`, `calculator.ts` —
  ported logic, minimal adaptation (import syntax only).
- `server/src/calculator/scaling-curve.ts` — `evaluateCalcCorrectGraph()`, ported.
- `server/src/calculator/load-weapons.ts` — new loader: fetches the raw regulation JSON,
  decodes it into `Weapon[]`.
- No API endpoint, no GUI — per the brief, this is a self-contained module a future GUI phase
  calls directly. A tiny disposable smoke-test script (not part of the permanent module) proves
  it end-to-end against one well-known weapon before this is considered done.

## Error handling

If the raw JSON's shape ever changes (a version bump upstream), the loader should fail loudly
on a missing expected field rather than silently producing wrong numbers — accessing a required
field via destructuring (which throws on `undefined` access into further properties) rather
than defensive optional-chaining that would swallow a real data problem.

## Testing

TDD for the ported interpolation function and the loader's per-weapon expansion logic, using
small hand-built fixtures (not the full 480-weapon dataset) — mirroring this session's
established pattern. A separate, real end-to-end check: compute the Uchigatana's physical AR at
a known stat spread and compare against the live calculator site's own displayed number for the
same weapon/stats, as an independent correctness check beyond unit tests of the ported pieces
in isolation.
