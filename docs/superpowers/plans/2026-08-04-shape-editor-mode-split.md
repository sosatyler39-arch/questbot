# Shape Editor Mode Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the Shape Editor's always-both-tools-active canvas into two mutually
exclusive modes (shape adjustment / pin adjustment), fixing the bug where a click meant to
create a new pin instead edits a region shape, and replace the manual-copy-panel export
workflow with immediate localStorage persistence plus one consolidated export panel.

**Architecture:** A single `mode: 'shape' | 'pin'` variable gates both which SVG elements
get interactive listeners and what the canvas renders. Region shapes always render (for
spatial context) but their mousedown handlers early-return in pin mode instead of calling
`e.stopPropagation()`, so clicks pass through to the viewport's existing click-vs-drag
tracking untouched. Pins only render at all in pin mode. Every mutating action writes the
full working state to `localStorage` immediately; one combined export panel replaces the
three existing per-category ones.

**Tech Stack:** Plain TypeScript + DOM APIs (no framework), compiled per-workspace via
`tsc`; Astro for the public site's page shell; hand-written CSS. No new dependencies.

## Global Constraints

- This app maintains two byte-identical (except import paths) copies of the Shape Editor
  logic: `client/src/renderer/map/shape-editor.ts` and `web/src/map/shape-editor.ts`.
  **Every code step in this plan applies identically to both files.** Where a step shows
  one code block, apply that exact same change to both paths.
- Likewise, markup changes apply identically to both `client/src/renderer/popup.html`
  (inside its `#shapes-panel`) and `web/src/pages/elden-ring/shape-editor.astro` (inside
  its `#shapes-root`), and CSS changes apply identically to both
  `client/src/renderer/map.css` and `web/public/map.css`.
- No automated tests exist for this file today (DOM-wiring, manual-browser-verification
  convention used throughout this codebase for `render.ts`/`ui.ts`/etc.) — this plan does
  not introduce any. Verification is manual, using the project's Browser-pane tooling
  against the `web` dev server (`astro dev --background`, per `web/CLAUDE.md`).
- After each task: run `npm run typecheck` in **both** `client/` and `web/` (both must
  pass — the two copies share no build step, so each workspace's own `tsc` is the only
  thing that will catch a copy/paste mismatch between the two files).
- Design spec: `docs/superpowers/specs/2026-08-04-shape-editor-mode-split-design.md`.

---

### Task 1: Mode toggle + mode-gated rendering (fixes the reported bug)

**Files:**
- Modify: `client/src/renderer/map/shape-editor.ts` and `web/src/map/shape-editor.ts`
  (identical diffs)
- Modify: `client/src/renderer/popup.html:182-188` and
  `web/src/pages/elden-ring/shape-editor.astro:16-22` (identical diffs)
- Modify: `client/src/renderer/map.css` and `web/public/map.css` (identical diffs)

**Interfaces:**
- Produces: `type EditorMode = 'shape' | 'pin'`, module-level `let mode: EditorMode`,
  `function setMode(next: EditorMode): void`, `function initModeToggle(): void` — Task 2
  and Task 3 read `mode` but don't change it.
- Consumes: existing `buildSvg()`, `addRegion()`, `renderLayer()`, `initPanZoom()`,
  `handleCreatePinClick()`, `hideNewPinForm()`, `renderPinList()` — all pre-existing,
  unchanged in signature.

- [ ] **Step 1: Remove the old arm/disarm toggle state and add mode state**

  In both `shape-editor.ts` files, find this line (currently around line 27, right after
  `type Layer = 'surface' | 'underground';`):

  ```ts
  type Layer = 'surface' | 'underground';
  ```

  Add a new type right after it:

  ```ts
  type Layer = 'surface' | 'underground';
  type EditorMode = 'shape' | 'pin';
  ```

  Then find this line (currently around line 74):

  ```ts
  let layer: Layer = 'surface';
  ```

  Add the mode variable right after it:

  ```ts
  let layer: Layer = 'surface';
  let mode: EditorMode = 'shape';
  ```

  Then find and delete this line (currently around line 129):

  ```ts
  let creatingPin = false;
  ```

  (Keep the line right after it, `let pendingPinPos: { regionId: string; fx: number; fy: number } | null = null;` — that one stays, the new-pin form still needs it.)

- [ ] **Step 2: Rename the DOM refs for the old toggle button, add a sidebar ref**

  Find this line (currently around line 157):

  ```ts
  const newPinToggle = document.getElementById('shapes-new-pin-toggle') as HTMLButtonElement;
  ```

  Replace it with:

  ```ts
  const modeToggle = document.getElementById('shapes-mode-toggle') as HTMLButtonElement;
  const pinSide = document.getElementById('shapes-pin-side')!;
  ```

- [ ] **Step 3: Guard every shape-editing entry point so it's inert in pin mode**

  In `addRegion()`, there are five places where a `mousedown` or `dblclick` handler starts
  by calling `e.stopPropagation()`. Each one needs a mode check **before** that call, so
  that in pin mode the handler returns immediately without stopping propagation — letting
  the click bubble up to the viewport's own click-tracking instead of being captured here.
  This is the actual fix for the reported bug (today, a region shape's fill covers almost
  the entire visible map, so a click meant for "create a new pin" is captured by one of
  these handlers instead of ever reaching the viewport).

  a) Inside `refreshHandles()`, the vertex-drag handler (currently around line 274):

  ```ts
  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation(); // don't also start a viewport pan
    const startClientX = e.clientX;
  ```

  becomes:

  ```ts
  handle.addEventListener('mousedown', (e) => {
    if (mode !== 'shape') return;
    e.stopPropagation(); // don't also start a viewport pan
    const startClientX = e.clientX;
  ```

  b) Immediately below it, the vertex-delete handler (currently around line 303):

  ```ts
  handle.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    if (points.length <= MIN_POINTS) return;
  ```

  becomes:

  ```ts
  handle.addEventListener('dblclick', (e) => {
    if (mode !== 'shape') return;
    e.stopPropagation();
    if (points.length <= MIN_POINTS) return;
  ```

  c) `startResize()` (currently around line 365):

  ```ts
  function startResize(pos: HandlePos, e: MouseEvent): void {
    e.stopPropagation();
    const bboxStart = computeBBox(region, points);
  ```

  becomes:

  ```ts
  function startResize(pos: HandlePos, e: MouseEvent): void {
    if (mode !== 'shape') return;
    e.stopPropagation();
    const bboxStart = computeBBox(region, points);
  ```

  d) The shape body's own mousedown (currently around line 471):

  ```ts
  shape.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    let lastClientX = e.clientX;
  ```

  becomes:

  ```ts
  shape.addEventListener('mousedown', (e) => {
    if (mode !== 'shape') return;
    e.stopPropagation();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    let lastClientX = e.clientX;
  ```

  e) The region label's mousedown (currently around line 517):

  ```ts
  label.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startFx = labelPos[0];
  ```

  becomes:

  ```ts
  label.addEventListener('mousedown', (e) => {
    if (mode !== 'shape') return;
    e.stopPropagation();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startFx = labelPos[0];
  ```

- [ ] **Step 4: Only render pins in pin mode**

  Find `buildSvg()` (currently around line 666):

  ```ts
  function buildSvg(): SVGSVGElement {
    const { width, height } = viewboxFor(layer);
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));

    for (const region of regionsFor(layer)) addRegion(svg, region);

    pinDotByName.clear();
    for (const loc of allPinsForLayer(layer)) addPin(svg, loc);
    refreshSelectedPinOverlay(svg);

    return svg;
  }
  ```

  Replace the pin block so it only runs in pin mode:

  ```ts
  function buildSvg(): SVGSVGElement {
    const { width, height } = viewboxFor(layer);
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));

    for (const region of regionsFor(layer)) addRegion(svg, region);

    pinDotByName.clear();
    if (mode === 'pin') {
      for (const loc of allPinsForLayer(layer)) addPin(svg, loc);
      refreshSelectedPinOverlay(svg);
    }

    return svg;
  }
  ```

- [ ] **Step 5: Make new-pin creation always-on in pin mode (no arm/disarm step)**

  Find `initPanZoom()`'s mouseup listener (currently around line 719):

  ```ts
  window.addEventListener('mouseup', (e) => {
    if (dragging && creatingPin && Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) <= DRAG_THRESHOLD) {
      handleCreatePinClick(e);
    }
    dragging = false;
    viewport.classList.remove('dragging');
  });
  ```

  Replace `creatingPin` with the mode check:

  ```ts
  window.addEventListener('mouseup', (e) => {
    if (dragging && mode === 'pin' && Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) <= DRAG_THRESHOLD) {
      handleCreatePinClick(e);
    }
    dragging = false;
    viewport.classList.remove('dragging');
  });
  ```

- [ ] **Step 6: Remove the old toggle's click handler from `initPinCreation()`**

  Find and delete this block from `initPinCreation()` (currently around line 1082):

  ```ts
  newPinToggle.addEventListener('click', () => {
    creatingPin = !creatingPin;
    newPinToggle.classList.toggle('active', creatingPin);
    newPinToggle.textContent = creatingPin ? 'Click map to place…' : 'New Pin';
    if (!creatingPin) hideNewPinForm();
  });

  ```

  (Delete the whole block, including the blank line after it. The rest of
  `initPinCreation()` — category population, `newPinConfirm`/`newPinCancel`/
  `newPinExportCopy` handlers — stays untouched for this task.)

- [ ] **Step 7: Remove the dead `creatingPin`/`newPinToggle` lines from the reset handler**

  Find `initExport()`'s reset handler (currently around line 782):

  ```ts
  resetButton.addEventListener('click', () => {
    for (const key of Object.keys(shapeOverrides)) delete shapeOverrides[key];
    for (const key of Object.keys(labelOverrides)) delete labelOverrides[key];
    touchedRegions.clear();
    touchedLabels.clear();
    pinOverrides.clear();
    customPins.length = 0;
    creatingPin = false;
    newPinToggle.classList.remove('active');
    newPinToggle.textContent = 'New Pin';
    hideNewPinForm();
    renderExportOutput();
    renderPinExportOutput();
    renderNewPinExportOutput();
    renderLayer();
    renderPinList();
  });
  ```

  Remove the three dead lines:

  ```ts
  resetButton.addEventListener('click', () => {
    for (const key of Object.keys(shapeOverrides)) delete shapeOverrides[key];
    for (const key of Object.keys(labelOverrides)) delete labelOverrides[key];
    touchedRegions.clear();
    touchedLabels.clear();
    pinOverrides.clear();
    customPins.length = 0;
    hideNewPinForm();
    renderExportOutput();
    renderPinExportOutput();
    renderNewPinExportOutput();
    renderLayer();
    renderPinList();
  });
  ```

- [ ] **Step 8: Add `setMode()` and `initModeToggle()`, wire into `initShapeEditor()`**

  Add these two new functions right before `export function initShapeEditor()`:

  ```ts
  function setMode(next: EditorMode): void {
    mode = next;
    modeToggle.textContent = mode === 'shape' ? 'Pin adjustment' : 'Shape adjustment';
    pinSide.hidden = mode === 'shape';
    hideNewPinForm();
    renderLayer();
    if (mode === 'pin') renderPinList();
  }

  function initModeToggle(): void {
    modeToggle.textContent = 'Pin adjustment';
    pinSide.hidden = true;
    modeToggle.addEventListener('click', () => {
      setMode(mode === 'shape' ? 'pin' : 'shape');
    });
  }
  ```

  Then update `initShapeEditor()` (currently):

  ```ts
  export function initShapeEditor(): void {
    renderLayer();
    initPanZoom();
    initLayerToggle();
    initExport();
    initReferenceImage();
    initPinTools();
    initPinCreation();
  }
  ```

  to call `initModeToggle()` first, before the initial render:

  ```ts
  export function initShapeEditor(): void {
    initModeToggle();
    renderLayer();
    initPanZoom();
    initLayerToggle();
    initExport();
    initReferenceImage();
    initPinTools();
    initPinCreation();
  }
  ```

- [ ] **Step 9: Update the toolbar markup in both HTML/Astro files**

  In `client/src/renderer/popup.html`, find (currently lines 183-188):

  ```html
    <div id="shapes-toolbar">
      <p id="shapes-hint">Shapes: drag a dot to move it, click the outline to add one, double-click a dot to remove it. Pins: drag a colored dot to reposition that location.</p>
      <button id="shapes-new-pin-toggle" type="button">New Pin</button>
      <button id="shapes-reset" type="button">Reset all</button>
      <button id="shapes-layer-toggle" type="button">Surface</button>
    </div>
  ```

  Replace with:

  ```html
    <div id="shapes-toolbar">
      <p id="shapes-hint">Shape mode: drag a dot to move it, click the outline to add one, double-click a dot to remove it. Pin mode: drag a colored dot to reposition it, click empty space to create a new one.</p>
      <button id="shapes-mode-toggle" type="button">Pin adjustment</button>
      <button id="shapes-reset" type="button">Reset all</button>
      <button id="shapes-layer-toggle" type="button">Surface</button>
    </div>
  ```

  Apply the identical replacement in `web/src/pages/elden-ring/shape-editor.astro`
  (currently lines 17-22 — same text, just indented two spaces deeper).

- [ ] **Step 10: Update CSS — rename the toggle selector, drop the armed-state rule**

  In `client/src/renderer/map.css`, find (currently lines 263-282):

  ```css
  #shapes-reset,
  #shapes-layer-toggle,
  #shapes-new-pin-toggle,
  #shapes-edit-copy,
  #shapes-ref-load,
  #shapes-ref-clear {
    background: none;
    border: 1px solid #4a4234;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 10px;
    white-space: nowrap;
  }

  #shapes-new-pin-toggle.active {
    background: rgba(201, 162, 75, 0.15);
    border-color: #c9a24b;
  }
  ```

  Replace with (rename the id in the shared list, delete the armed-state rule entirely —
  there's no more "armed" concept, the button's text alone communicates the mode):

  ```css
  #shapes-reset,
  #shapes-layer-toggle,
  #shapes-mode-toggle,
  #shapes-edit-copy,
  #shapes-ref-load,
  #shapes-ref-clear {
    background: none;
    border: 1px solid #4a4234;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 10px;
    white-space: nowrap;
  }
  ```

  Apply the identical change to `web/public/map.css`.

- [ ] **Step 11: Typecheck both workspaces**

  Run:

  ```bash
  cd client && npm run typecheck
  cd ../web && npm run typecheck
  ```

  Expected: both exit 0. If either fails, it's almost certainly a leftover reference to
  `creatingPin` or `newPinToggle` you missed in one of the two files — search for both
  identifiers in the failing file and remove/rename them per the steps above.

- [ ] **Step 12: Manual browser verification**

  Start the web dev server in the background (`astro dev --background` per
  `web/CLAUDE.md`), open the Shape Editor page, and verify:

  1. On load, the toggle button reads "Pin adjustment", the pin sidebar is hidden, and
     only region shapes are visible (no pins).
  2. Click the toggle → it now reads "Shape adjustment", the pin sidebar appears, and pins
     are visible.
  3. **This is the bug fix**: while in this pin mode, click on empty-looking canvas space
     (an area covered by a region's semi-transparent fill but with no pin dot under the
     cursor) — the new-pin form should open. It must NOT move/edit any region shape.
  4. While still in pin mode, try clicking and dragging a region's outline/vertex handle —
     nothing should happen (no vertex move, no console errors).
  5. Click the toggle again → back to "Pin adjustment", pins disappear, sidebar hides.
  6. In this shape mode, drag a region vertex — it should move normally, exactly as before
     this change.
  7. Toggle back to pin mode — drag an existing pin dot — it should still reposition
     normally.

  Report any of these that fail before moving to Task 2.

- [ ] **Step 13: Commit**

  ```bash
  git add client/src/renderer/map/shape-editor.ts web/src/map/shape-editor.ts client/src/renderer/popup.html web/src/pages/elden-ring/shape-editor.astro client/src/renderer/map.css web/public/map.css
  git commit -m "Split Shape Editor into exclusive shape/pin modes, fixing pin-creation click bug"
  ```

---

### Task 2: Immediate localStorage persistence

**Files:**
- Modify: `client/src/renderer/map/shape-editor.ts` and `web/src/map/shape-editor.ts`
  (identical diffs)

**Interfaces:**
- Consumes: `shapeOverrides`, `labelOverrides`, `touchedRegions`, `touchedLabels`,
  `pinOverrides`, `customPins`, `nextCustomPinId`, `CustomPin` — all pre-existing from
  before Task 1, unchanged.
- Produces: `function persist(): void`, `function restore(): void` — called from every
  mutation site in this task and from `initShapeEditor()`; Task 3 doesn't need to touch
  either function.

- [ ] **Step 1: Add the persisted-state shape, `persist()`, and `restore()`**

  Add this block right after the `findPinByName()` function (currently ends around line
  138) and before the DOM refs block:

  ```ts
  const STORAGE_KEY = 'questbot-shape-editor-state';

  interface PersistedState {
    shapeOverrides: Record<string, [number, number][]>;
    labelOverrides: Record<string, [number, number]>;
    touchedRegions: string[];
    touchedLabels: string[];
    pinOverrides: [string, { fx: number; fy: number }][];
    customPins: CustomPin[];
    nextCustomPinId: number;
  }

  function persist(): void {
    try {
      const state: PersistedState = {
        shapeOverrides,
        labelOverrides,
        touchedRegions: [...touchedRegions],
        touchedLabels: [...touchedLabels],
        pinOverrides: [...pinOverrides.entries()],
        customPins,
        nextCustomPinId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage unavailable/full — the in-memory session still works,
      // it just won't survive a refresh. Not a user-facing error.
    }
  }

  function restore(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const state = JSON.parse(raw) as PersistedState;
      for (const [id, points] of Object.entries(state.shapeOverrides ?? {})) shapeOverrides[id] = points;
      for (const [id, pos] of Object.entries(state.labelOverrides ?? {})) labelOverrides[id] = pos;
      for (const id of state.touchedRegions ?? []) touchedRegions.add(id);
      for (const id of state.touchedLabels ?? []) touchedLabels.add(id);
      for (const [name, pos] of state.pinOverrides ?? []) pinOverrides.set(name, pos);
      customPins.push(...(state.customPins ?? []));
      nextCustomPinId = state.nextCustomPinId ?? 1;
    } catch {
      // Malformed/foreign data — treat exactly like "nothing saved yet".
    }
  }
  ```

- [ ] **Step 2: Call `restore()` first thing in `initShapeEditor()`**

  Update `initShapeEditor()` (from Task 1's Step 8):

  ```ts
  export function initShapeEditor(): void {
    initModeToggle();
    renderLayer();
    initPanZoom();
    initLayerToggle();
    initExport();
    initReferenceImage();
    initPinTools();
    initPinCreation();
  }
  ```

  to call `restore()` before anything else:

  ```ts
  export function initShapeEditor(): void {
    restore();
    initModeToggle();
    renderLayer();
    initPanZoom();
    initLayerToggle();
    initExport();
    initReferenceImage();
    initPinTools();
    initPinCreation();
  }
  ```

- [ ] **Step 3: Add a `persist();` call at every mutation site**

  Add `persist();` immediately before each of the following existing calls (these are the
  six shape/label mutation sites inside `addRegion()`, still calling the not-yet-renamed
  `renderExportOutput()` at this point — Task 3 will change what that function does, not
  these call sites):

  In the vertex-drag `onUp` (inside `refreshHandles()`'s mousedown handler):

  ```ts
        const onUp = () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
          renderExportOutput();
        };
  ```

  becomes:

  ```ts
        const onUp = () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
          persist();
          renderExportOutput();
        };
  ```

  This exact 3-line `renderExportOutput();` pattern (preceded by the same
  `window.removeEventListener` pair) appears **four more times** in the file: at the end of
  the vertex `dblclick` handler, at the end of `startResize()`'s `onUp`, and at the end of
  the label-drag `onUp`. Apply the same one-line insertion (`persist();` right before
  `renderExportOutput();`) at each.

  There is a sixth, slightly different call site — `addPointAt()` — where the sequence is:

  ```ts
    points.splice(bestIndex + 1, 0, newPoint);
    touchedRegions.add(region.id);
    redrawShape();
    refreshHandles();
    refreshBBox();
    renderExportOutput();
  }
  ```

  Add `persist();` before that same `renderExportOutput();` call:

  ```ts
    points.splice(bestIndex + 1, 0, newPoint);
    touchedRegions.add(region.id);
    redrawShape();
    refreshHandles();
    refreshBBox();
    persist();
    renderExportOutput();
  }
  ```

  And the shape-body drag's `onUp` has an `if/else`:

  ```ts
      if (moved) {
        renderExportOutput();
      } else {
        addPointAt(startClientX, startClientY);
      }
  ```

  `addPointAt()` already persists internally now (per the change above), so only the
  `moved` branch needs it:

  ```ts
      if (moved) {
        persist();
        renderExportOutput();
      } else {
        addPointAt(startClientX, startClientY);
      }
  ```

- [ ] **Step 4: Add `persist();` to the pin-drag, delete, and create-pin sites**

  In `addPin()`'s drag `onUp`:

  ```ts
      if (isCustomPin(loc)) {
        loc.fx = fx;
        loc.fy = fy;
        renderNewPinExportOutput();
      } else {
        pinOverrides.set(loc.name, { fx, fy });
        renderPinExportOutput();
      }
      refreshPinListRow(loc.name);
  ```

  becomes:

  ```ts
      if (isCustomPin(loc)) {
        loc.fx = fx;
        loc.fy = fy;
        renderNewPinExportOutput();
      } else {
        pinOverrides.set(loc.name, { fx, fy });
        renderPinExportOutput();
      }
      persist();
      refreshPinListRow(loc.name);
  ```

  In `deleteCustomPin()`:

  ```ts
    customPins.splice(idx, 1);
    if (wasSelected) {
      selectedPinIndex = -1;
      updatePinCurrentReadout();
    }
    renderLayer();
    renderPinList();
    renderNewPinExportOutput();
  }
  ```

  becomes:

  ```ts
    customPins.splice(idx, 1);
    if (wasSelected) {
      selectedPinIndex = -1;
      updatePinCurrentReadout();
    }
    persist();
    renderLayer();
    renderPinList();
    renderNewPinExportOutput();
  }
  ```

  In `initPinCreation()`'s `newPinConfirm` handler:

  ```ts
    customPins.push(pin);
    hideNewPinForm();
    renderLayer();
    renderPinList();
    renderNewPinExportOutput();
    selectPinByName(pin.name);
  ```

  becomes:

  ```ts
    customPins.push(pin);
    persist();
    hideNewPinForm();
    renderLayer();
    renderPinList();
    renderNewPinExportOutput();
    selectPinByName(pin.name);
  ```

- [ ] **Step 5: Clear `localStorage` in the reset handler**

  Find `initExport()`'s reset handler (as left by Task 1):

  ```ts
  resetButton.addEventListener('click', () => {
    for (const key of Object.keys(shapeOverrides)) delete shapeOverrides[key];
    for (const key of Object.keys(labelOverrides)) delete labelOverrides[key];
    touchedRegions.clear();
    touchedLabels.clear();
    pinOverrides.clear();
    customPins.length = 0;
    hideNewPinForm();
    renderExportOutput();
    renderPinExportOutput();
    renderNewPinExportOutput();
    renderLayer();
    renderPinList();
  });
  ```

  Add a `localStorage.removeItem` call right after clearing the in-memory state:

  ```ts
  resetButton.addEventListener('click', () => {
    for (const key of Object.keys(shapeOverrides)) delete shapeOverrides[key];
    for (const key of Object.keys(labelOverrides)) delete labelOverrides[key];
    touchedRegions.clear();
    touchedLabels.clear();
    pinOverrides.clear();
    customPins.length = 0;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    hideNewPinForm();
    renderExportOutput();
    renderPinExportOutput();
    renderNewPinExportOutput();
    renderLayer();
    renderPinList();
  });
  ```

- [ ] **Step 6: Typecheck both workspaces**

  ```bash
  cd client && npm run typecheck
  cd ../web && npm run typecheck
  ```

  Expected: both exit 0.

- [ ] **Step 7: Manual browser verification**

  1. In pin mode, create a new pin (name it something recognizable, e.g. "Persistence
     Test"). Refresh the page. Switch to pin mode again — the pin should still be there
     (confirms `customPins` survived via `restore()`).
  2. In shape mode, drag a region vertex noticeably. Refresh the page — the vertex should
     still be in its dragged position (confirms `shapeOverrides` survived).
  3. Click "Reset all". Refresh the page again — both the pin and the shape edit from
     steps 1–2 should be gone (confirms the reset actually cleared `localStorage`, not just
     in-memory state).

- [ ] **Step 8: Commit**

  ```bash
  git add client/src/renderer/map/shape-editor.ts web/src/map/shape-editor.ts
  git commit -m "Persist Shape Editor edits to localStorage immediately"
  ```

---

### Task 3: Consolidate the three export panels into one

**Files:**
- Modify: `client/src/renderer/map/shape-editor.ts` and `web/src/map/shape-editor.ts`
  (identical diffs)
- Modify: `client/src/renderer/popup.html:203-214` and
  `web/src/pages/elden-ring/shape-editor.astro:37-48` (identical diffs)
- Modify: `client/src/renderer/map.css` and `web/public/map.css` (identical diffs)

**Interfaces:**
- Consumes: `touchedRegions`, `touchedLabels`, `shapeOverrides`, `labelOverrides`,
  `pinOverrides`, `customPins` — all pre-existing, unchanged.
- Produces: one `function renderExportOutput(): void` (replacing all three previous
  export-rendering functions of that role); `exportOutput`/`exportCopy` now point at the
  new combined panel's elements. Nothing downstream of this task depends on the deleted
  `renderPinExportOutput`/`renderNewPinExportOutput` names or the deleted
  `pinExportOutput`/`pinExportCopy`/`newPinExportOutput`/`newPinExportCopy` DOM refs.

- [ ] **Step 1: Replace the three export-rendering functions with one combined function**

  Delete the existing `renderExportOutput()` (the shape/label one, currently around line
  760):

  ```ts
  function renderExportOutput(): void {
    if (touchedRegions.size === 0 && touchedLabels.size === 0) {
      exportOutput.value = '';
      return;
    }
    const lines: string[] = [];
    for (const id of touchedRegions) {
      lines.push(`  // '${id}': shapePoints: [`);
      for (const [fx, fy] of shapeOverrides[id]) lines.push(`  //   [${fx.toFixed(3)}, ${fy.toFixed(3)}],`);
      lines.push('  // ],');
    }
    for (const id of touchedLabels) {
      const [fx, fy] = labelOverrides[id];
      lines.push(`  // '${id}': labelPos: [${fx.toFixed(3)}, ${fy.toFixed(3)}],`);
    }
    exportOutput.value = lines.join('\n');
  }
  ```

  and the existing `renderPinExportOutput()` (currently around line 834):

  ```ts
  function renderPinExportOutput(): void {
    if (pinOverrides.size === 0) {
      pinExportOutput.value = '';
      return;
    }
    const lines = [...pinOverrides.entries()].map(
      ([name, pos]) => `  // '${name}': fx: ${pos.fx.toFixed(3)}, fy: ${pos.fy.toFixed(3)}`,
    );
    pinExportOutput.value = lines.join('\n');
  }
  ```

  and the existing `renderNewPinExportOutput()` (currently around line 1032):

  ```ts
  function renderNewPinExportOutput(): void {
    if (customPins.length === 0) {
      newPinExportOutput.value = '';
      return;
    }
    const lines = customPins.map(
      (p) =>
        `  { name: '${p.name.replace(/'/g, "\\'")}', category: '${p.category}', regionId: '${p.regionId}', layer: '${p.layer}', fx: ${p.fx.toFixed(3)}, fy: ${p.fy.toFixed(3)} },`,
    );
    newPinExportOutput.value = lines.join('\n');
  }
  ```

  Replace **all three** with this single function, placed where the first one
  (`renderExportOutput`) used to be:

  ```ts
  function renderExportOutput(): void {
    const lines: string[] = [];
    if (touchedRegions.size > 0 || touchedLabels.size > 0) {
      lines.push('// --- Region/label adjustments (regions.ts) ---');
      for (const id of touchedRegions) {
        lines.push(`  // '${id}': shapePoints: [`);
        for (const [fx, fy] of shapeOverrides[id]) lines.push(`  //   [${fx.toFixed(3)}, ${fy.toFixed(3)}],`);
        lines.push('  // ],');
      }
      for (const id of touchedLabels) {
        const [fx, fy] = labelOverrides[id];
        lines.push(`  // '${id}': labelPos: [${fx.toFixed(3)}, ${fy.toFixed(3)}],`);
      }
    }
    if (pinOverrides.size > 0) {
      if (lines.length > 0) lines.push('');
      lines.push('// --- Pin position adjustments (locations.ts) ---');
      for (const [name, pos] of pinOverrides.entries()) {
        lines.push(`  // '${name}': fx: ${pos.fx.toFixed(3)}, fy: ${pos.fy.toFixed(3)}`);
      }
    }
    if (customPins.length > 0) {
      if (lines.length > 0) lines.push('');
      lines.push('// --- New pins (locations.ts) ---');
      for (const p of customPins) {
        lines.push(
          `  { name: '${p.name.replace(/'/g, "\\'")}', category: '${p.category}', regionId: '${p.regionId}', layer: '${p.layer}', fx: ${p.fx.toFixed(3)}, fy: ${p.fy.toFixed(3)} },`,
        );
      }
    }
    exportOutput.value = lines.join('\n');
  }
  ```

- [ ] **Step 2: Repoint the `exportOutput`/`exportCopy` refs, delete the other four refs**

  Find these DOM ref declarations (currently around lines 143-144 and 150-151, 164-165):

  ```ts
  const exportOutput = document.getElementById('shapes-edit-output') as HTMLTextAreaElement;
  const exportCopy = document.getElementById('shapes-edit-copy') as HTMLButtonElement;
  ```

  Change the element ids they target:

  ```ts
  const exportOutput = document.getElementById('shapes-export-output') as HTMLTextAreaElement;
  const exportCopy = document.getElementById('shapes-export-copy') as HTMLButtonElement;
  ```

  Then delete these four now-unused ref declarations entirely:

  ```ts
  const pinExportOutput = document.getElementById('shapes-pin-edit-output') as HTMLTextAreaElement;
  const pinExportCopy = document.getElementById('shapes-pin-edit-copy') as HTMLButtonElement;
  ```

  and:

  ```ts
  const newPinExportOutput = document.getElementById('shapes-new-pin-edit-output') as HTMLTextAreaElement;
  const newPinExportCopy = document.getElementById('shapes-new-pin-edit-copy') as HTMLButtonElement;
  ```

- [ ] **Step 3: Update every call site that referenced the two deleted functions**

  Three call sites currently call `renderPinExportOutput()` or `renderNewPinExportOutput()`
  by name — change each to call `renderExportOutput()` instead (the single combined
  function from Step 1 covers all three categories now, so any call site just needs "please
  re-render the export panel").

  In `addPin()`'s drag `onUp` (as left by Task 2):

  ```ts
      if (isCustomPin(loc)) {
        loc.fx = fx;
        loc.fy = fy;
        renderNewPinExportOutput();
      } else {
        pinOverrides.set(loc.name, { fx, fy });
        renderPinExportOutput();
      }
      persist();
      refreshPinListRow(loc.name);
  ```

  becomes:

  ```ts
      if (isCustomPin(loc)) {
        loc.fx = fx;
        loc.fy = fy;
      } else {
        pinOverrides.set(loc.name, { fx, fy });
      }
      renderExportOutput();
      persist();
      refreshPinListRow(loc.name);
  ```

  In `deleteCustomPin()`:

  ```ts
    persist();
    renderLayer();
    renderPinList();
    renderNewPinExportOutput();
  }
  ```

  becomes:

  ```ts
    persist();
    renderLayer();
    renderPinList();
    renderExportOutput();
  }
  ```

  In `initPinCreation()`'s `newPinConfirm` handler:

  ```ts
    customPins.push(pin);
    persist();
    hideNewPinForm();
    renderLayer();
    renderPinList();
    renderNewPinExportOutput();
    selectPinByName(pin.name);
  ```

  becomes:

  ```ts
    customPins.push(pin);
    persist();
    hideNewPinForm();
    renderLayer();
    renderPinList();
    renderExportOutput();
    selectPinByName(pin.name);
  ```

- [ ] **Step 4: Simplify the reset handler and `initPinTools()`/`initPinCreation()`**

  Find `initExport()`'s reset handler (as left by Task 2):

  ```ts
    hideNewPinForm();
    renderExportOutput();
    renderPinExportOutput();
    renderNewPinExportOutput();
    renderLayer();
    renderPinList();
  });
  ```

  Remove the two now-nonexistent function calls:

  ```ts
    hideNewPinForm();
    renderExportOutput();
    renderLayer();
    renderPinList();
  });
  ```

  In `initPinTools()`, find and delete this block:

  ```ts
    pinExportCopy.addEventListener('click', () => {
      void navigator.clipboard?.writeText(pinExportOutput.value);
    });
  ```

  (Leave the rest of `initPinTools()` — `pinSearch`, `pinPrev`, `pinNext`, the final
  `renderPinList();` — untouched.)

  In `initPinCreation()`, find and delete this block:

  ```ts
    newPinExportCopy.addEventListener('click', () => {
      void navigator.clipboard?.writeText(newPinExportOutput.value);
    });
  ```

  (Leave the category population loop and the `newPinConfirm`/`newPinCancel` handlers
  untouched.)

- [ ] **Step 5: Replace the three export panels with one in both markup files**

  In `client/src/renderer/popup.html`, find (currently lines 203-214):

  ```html
    <div id="shapes-edit-panel">
      <textarea id="shapes-edit-output" readonly rows="2" placeholder="No shape changes yet."></textarea>
      <button id="shapes-edit-copy" type="button">Copy shape adjustments</button>
    </div>
    <div id="shapes-pin-edit-panel">
      <textarea id="shapes-pin-edit-output" readonly rows="2" placeholder="No pin changes yet."></textarea>
      <button id="shapes-pin-edit-copy" type="button">Copy pin adjustments</button>
    </div>
    <div id="shapes-new-pin-edit-panel">
      <textarea id="shapes-new-pin-edit-output" readonly rows="2" placeholder="No new pins yet."></textarea>
      <button id="shapes-new-pin-edit-copy" type="button">Copy new pins</button>
    </div>
  ```

  Replace with one panel:

  ```html
    <div id="shapes-export-panel">
      <textarea id="shapes-export-output" readonly rows="3" placeholder="No changes yet."></textarea>
      <button id="shapes-export-copy" type="button">Copy changes</button>
    </div>
  ```

  Apply the identical replacement in `web/src/pages/elden-ring/shape-editor.astro`
  (currently lines 37-48 — same content, indented two spaces deeper).

- [ ] **Step 6: Update CSS — remove the three old panel rule blocks, add one**

  In `client/src/renderer/map.css`, delete these three existing rule blocks:

  ```css
  #shapes-edit-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid #4a4234;
    border-radius: 6px;
    padding: 6px 10px;
  }

  #shapes-edit-output {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    color: #e8e2d5;
    border: 1px solid #6b5d3f;
    border-radius: 4px;
    font-family: monospace;
    font-size: 10.5px;
    padding: 4px 6px;
    resize: none;
  }
  ```

  ```css
  #shapes-pin-edit-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid #4a4234;
    border-radius: 6px;
    padding: 6px 10px;
  }

  #shapes-pin-edit-output {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    color: #e8e2d5;
    border: 1px solid #6b5d3f;
    border-radius: 4px;
    font-family: monospace;
    font-size: 10.5px;
    padding: 4px 6px;
    resize: none;
  }

  #shapes-pin-edit-copy {
    background: none;
    border: 1px solid #4a4234;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 10px;
    white-space: nowrap;
  }
  ```

  ```css
  #shapes-new-pin-edit-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid #4a4234;
    border-radius: 6px;
    padding: 6px 10px;
  }

  #shapes-new-pin-edit-output {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    color: #e8e2d5;
    border: 1px solid #6b5d3f;
    border-radius: 4px;
    font-family: monospace;
    font-size: 10.5px;
    padding: 4px 6px;
    resize: none;
  }

  #shapes-new-pin-edit-copy {
    background: none;
    border: 1px solid #4a4234;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 10px;
    white-space: nowrap;
  }
  ```

  Also remove `#shapes-edit-copy` from the shared button-style selector list (left by Task
  1's Step 10):

  ```css
  #shapes-reset,
  #shapes-layer-toggle,
  #shapes-mode-toggle,
  #shapes-edit-copy,
  #shapes-ref-load,
  #shapes-ref-clear {
  ```

  becomes:

  ```css
  #shapes-reset,
  #shapes-layer-toggle,
  #shapes-mode-toggle,
  #shapes-ref-load,
  #shapes-ref-clear {
  ```

  Add one new rule block in their place:

  ```css
  #shapes-export-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid #4a4234;
    border-radius: 6px;
    padding: 6px 10px;
  }

  #shapes-export-output {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    color: #e8e2d5;
    border: 1px solid #6b5d3f;
    border-radius: 4px;
    font-family: monospace;
    font-size: 10.5px;
    padding: 4px 6px;
    resize: none;
  }

  #shapes-export-copy {
    background: none;
    border: 1px solid #4a4234;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 10px;
    white-space: nowrap;
  }
  ```

  Apply the identical set of removals and addition to `web/public/map.css`.

- [ ] **Step 7: Typecheck both workspaces**

  ```bash
  cd client && npm run typecheck
  cd ../web && npm run typecheck
  ```

  Expected: both exit 0. A failure here almost certainly means a leftover reference to one
  of the deleted names (`renderPinExportOutput`, `renderNewPinExportOutput`,
  `pinExportOutput`, `pinExportCopy`, `newPinExportOutput`, `newPinExportCopy`) — search for
  each in the failing file.

- [ ] **Step 8: Build both workspaces**

  ```bash
  cd client && npm run build
  cd ../web && npm run build
  ```

  Expected: both succeed (this also catches any Astro/HTML id mismatch that `tsc` alone
  wouldn't).

- [ ] **Step 9: Manual browser verification**

  1. Reload the Shape Editor page. There should be exactly one export panel, below the
     reference-image toolbar, with the placeholder "No changes yet."
  2. Drag a shape vertex — the panel should show a `// --- Region/label adjustments ---`
     section with the expected `shapePoints` comment.
  3. Switch to pin mode, drag an existing pin, create a new one — the same panel should now
     show all three sections (region/label, pin adjustments, new pins) stacked, separated
     by blank lines.
  4. Click "Copy changes" and paste somewhere to confirm the clipboard contains the full
     combined text.
  5. Click "Reset all" — the panel goes back to empty/placeholder.

- [ ] **Step 10: Commit**

  ```bash
  git add client/src/renderer/map/shape-editor.ts web/src/map/shape-editor.ts client/src/renderer/popup.html web/src/pages/elden-ring/shape-editor.astro client/src/renderer/map.css web/public/map.css
  git commit -m "Consolidate Shape Editor's three export panels into one"
  ```
