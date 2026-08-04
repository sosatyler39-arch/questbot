# Shape Editor Mode Split — Design

## Context

The Shape Editor currently runs region-shape molding and pin placement/creation
simultaneously on the same canvas. Region outlines (`fill-opacity: 0.3`, covering nearly
the whole visible map at most zoom levels) each carry their own `mousedown` handler for
dragging/adding vertices, and pin dots carry their own `mousedown` handler for
repositioning. When "New Pin" mode is armed and the user clicks empty-looking map space,
the click almost always lands on a region's `<path>` first (shapes are visually thin
outlines but their filled interior absorbs clicks across the whole region), so it's
captured by the shape-drag/add-vertex handler instead of the pin-creation handler. The
reported bug ("clicking a space on the map after selecting 'New Pin' still places a
map-edge pin") is this: the click edited/moved a region shape, not the intended new pin.

Separately, all edits (shape points, label positions, pin position overrides, new pins)
currently live in in-memory module state only. The only way to get them anywhere durable
is copying one of three separate "Copy X adjustments" export panels and hand-pasting into
`locations.ts`/`regions.ts`. There is no page-refresh or tab-close protection, and the
three separate panels are visual clutter the user wants gone.

**Scope:** this is a Shape Editor–only change. It does not touch the Map tab, the
Speedrun tab, or any other consumer of `locations.ts`/`regions.ts`. It does not add a
backend or any mechanism to write directly to the source files — the destination for
exported changes is still a human hand-pasting a snippet into `locations.ts`/`regions.ts`,
exactly as today.

## Architecture

### Mutually exclusive modes

A single module-level variable, `type EditorMode = 'shape' | 'pin'`, replaces the current
"everything always active" setup. Default on load: `'shape'`.

One toggle button (`#shapes-mode-toggle`) replaces today's separate "New Pin" toggle. Its
label always names the mode you'd switch **to**:

- In shape mode, the button reads **"Pin adjustment"**.
- In pin mode, the button reads **"Shape adjustment"**.

Clicking it flips `mode` and calls `renderLayer()` to rebuild the SVG under the new mode's
rules (below), plus toggles the pin sidebar's visibility.

### What's interactive in each mode

| Element | Shape mode | Pin mode |
|---|---|---|
| Region outline (`<path>`), vertices, resize handles, region label | Fully interactive (drag body, drag/add/remove vertices, drag label, resize via bbox handles) | Rendered for spatial context, but **no `mousedown` listeners attached at all** — not just visually disabled, structurally inert, so clicks pass straight through |
| Location pins | Not rendered at all | Fully interactive: click-drag an existing dot to reposition it; click empty canvas space to open the new-pin form |
| Pin sidebar (list/search/prev-next) | Hidden | Shown |
| Reference image loader/opacity toolbar | Shown | Shown (unchanged — useful as a molding aid in either mode) |

This is the actual bug fix: because shapes have no attached listeners in pin mode, a click
in pin mode can only ever hit a pin dot (drag) or bare background (create) — there is no
third handler left to accidentally win the click.

New-pin creation has no separate arm/disarm step. Being in pin mode is sufficient: the
existing viewport-level mousedown/mouseup click-vs-drag distinction (already used for
panning) is extended so that a plain click (not a pan-drag) on empty canvas, while in pin
mode, calls the existing `handleCreatePinClick()` region-detection + form-opening flow
unchanged. A plain click that lands on a pin dot instead triggers that dot's own
`mousedown` handler first (`stopPropagation()`, as today), so it drags rather than opening
the new-pin form.

### Persistence

Every mutating action — shape vertex drag end, shape body drag end, label drag end, pin
drag end, new pin created, new pin deleted, reset — writes the complete working state to
`localStorage` immediately, at the same call sites that currently call the
`render*ExportOutput()` functions. On module load, that stored state (if present and
parseable) seeds `shapeOverrides`, `labelOverrides`, `touchedRegions`, `touchedLabels`,
`pinOverrides`, and `customPins`/`nextCustomPinId` before the first render; if missing or
unparseable, all five start empty exactly as they do today.

```ts
interface PersistedState {
  shapeOverrides: Record<string, [number, number][]>;
  labelOverrides: Record<string, [number, number]>;
  touchedRegions: string[];
  touchedLabels: string[];
  pinOverrides: [string, { fx: number; fy: number }][];
  customPins: CustomPin[];
  nextCustomPinId: number;
}
```

One `persist()` helper serializes all seven fields to a single `localStorage` key
(`questbot-shape-editor-state`) and is called from every mutation site described above.
There is no debouncing concern: all current mutation sites already only persist on
drag-**end** (`mouseup`), not on every `mousemove`, so writes are infrequent by
construction.

"Reset all" clears every in-memory structure (as it does today) **and** removes the
`localStorage` key, so a reset is a true clean slate. This is also the documented way to
clear stale local state after you've pasted an export into the real source files — without
it, a new pin you already committed to `locations.ts` would keep reappearing from
`localStorage` on top of the newly-authored entry.

### Combined export

The three separate export panels/functions (`renderExportOutput` for shapes/labels,
`renderPinExportOutput` for pin adjustments, `renderNewPinExportOutput` for new pins) are
replaced by one `renderExportOutput()` that concatenates all three sections into one
string, each under a plain header comment, e.g.:

```
// --- Region/label adjustments (regions.ts) ---
  // 'limgrave': shapePoints: [
  //   [0.120, 0.340],
  //   ...
  // ],

// --- Pin position adjustments (locations.ts) ---
  // 'Church of Elleh': fx: 0.860, fy: 0.740

// --- New pins (locations.ts) ---
  { name: 'Test Custom Pin', category: 'landmark', regionId: 'altus-plateau', layer: 'surface', fx: 0.354, fy: 0.806 },
```

A section is omitted entirely if it has no content (matching today's per-panel
empty-state behavior, just consolidated). This function is called after every mutation
(same call sites as `persist()`) so the textarea is always current with no separate
"generate" step, and one "Copy" button copies the whole thing.

## UI

**Toolbar (`#shapes-toolbar`)**: drop `#shapes-new-pin-toggle`; add `#shapes-mode-toggle`
next to the existing `#shapes-reset`/`#shapes-layer-toggle`. The hint text
(`#shapes-hint`) is rewritten to describe both modes briefly instead of always describing
both tool sets at once.

**Export panel**: `#shapes-edit-panel`, `#shapes-pin-edit-panel`, and
`#shapes-new-pin-edit-panel` are all deleted and replaced by one `#shapes-export-panel`
(one `<textarea readonly>` + one "Copy changes" button).

**New-pin form** (`#shapes-new-pin-form` and its fields): markup unchanged, still shown/
hidden by `showNewPinForm()`/`hideNewPinForm()` — only the trigger changes (viewport click
in pin mode, no arm step) and it's now unreachable while in shape mode by construction.

**Pin sidebar** (`#shapes-pin-side`): gains a `hidden` toggle driven by mode; unchanged
otherwise.

## Data flow

1. Module load: read `localStorage['questbot-shape-editor-state']`; parse and seed state,
   or start empty on any failure/absence.
2. `renderLayer()` branches on `mode` to decide what `buildSvg()` renders and whether
   listeners get attached to shapes vs. pins.
3. Any mutation → update the relevant in-memory structure → `persist()` →
   `renderExportOutput()` → (if applicable) re-render the affected DOM piece, same as
   today.
4. Mode toggle → flip `mode` → `renderLayer()` (rebuilds SVG under new mode's rules) →
   toggle sidebar visibility. No persistence needed for the mode itself — always defaults
   back to `'shape'` on fresh load, which is harmless since it's just a view/interactivity
   flag, not data.

## Error handling

`localStorage` reads/writes are wrapped in `try/catch`: a parse failure on load is treated
identically to "no saved state" (start empty, don't throw and block the editor from
loading); a write failure (quota exceeded, private-browsing restrictions) is silently
swallowed — the in-memory session still works exactly as before, it just won't survive a
refresh. This mirrors how `referenceObjectUrl` handling already treats browser-API
absence/failure as non-fatal elsewhere in this file. No user-facing error message for
either case — this is an internal convenience mechanism, not a feature with its own
failure UX.

## Testing

No unit tests exist for `shape-editor.ts` today (it's DOM-wiring, same "manual browser
verification" convention as `render.ts`/`ui.ts` elsewhere in this codebase) and this change
doesn't introduce new pure/testable logic beyond what's already there — `persist()`/
`restore()` are thin JSON (de)serialization wrappers around existing state shapes.

Manual verification in the browser (both `web` dev server and, as far as static/typecheck
parity can confirm, the Electron client):

1. Toggle to pin mode; confirm region shapes render but are unclickable (no drag/no
   add-vertex) and pins are visible/draggable.
2. Click empty canvas in pin mode → new-pin form opens (not a shape edit). Create a pin.
3. Toggle to shape mode → pins disappear, shapes are interactive again, drag a vertex.
4. Toggle back to pin mode → the pin created in step 2 is still there; the shape edit from
   step 3 wasn't lost (still reflected in the export panel).
5. Refresh the page → both the pin and the shape edit survive (localStorage restore).
6. Click "Copy changes" → confirm the combined textarea has the right sections.
7. Click "Reset all" → confirm both in-memory state and `localStorage` are cleared, and a
   refresh after reset stays empty.
