---
name: awatif-model
description: Use only for creating structural models and running structural analysis. Do not use for design tasks.
---

# Awatif

## Output files

Each model lives in its own folder, `models/<model-name>/`, and ends up with:

| File | Written by | Purpose |
| --- | --- | --- |
| `model.ts` | You | The model: exports one `AppConfig`. The source of truth; the scripts never overwrite it. |
| `model.live.json` | `scripts/serve.mjs` (step 6), from the browser | The model as edited in the live app, in `AppConfig` shape. Written once the app opens in a browser, then on every edit. |

Nothing else is created: no `models/index.ts`, no HTML, image or report files. The live app (a URL served by `serve.mjs`) is the deliverable.

## Workflow

1. Create a `/models` folder in the project root if it does not exist.
2. Create a subfolder named after the model (e.g. `/models/2-storey-portal-frame`).
3. In that subfolder, create `model.ts` exporting the `AppConfig`. See `references/data-model.md` for awatif data-model definitions.
4. Check the model headlessly with the engine (`createEngine`, see `references/engine.md`):

   ```
   node <this skill's directory>/scripts/analyze.mjs models/<model-name>/model.ts
   ```

   It runs every load case and load combination, prints displacements, reactions and line force envelopes. Pass `--export <name>` if the file exports more than one config.

5. Check the results before handing over: the run succeeded, no line is listed without a design entry, and the reaction sums balance the applied loads. Fix the model and rerun if not.
6. Launch the live app, which is the deliverable. Run it in the background and give the user the URL:

   ```
   node <this skill's directory>/scripts/serve.mjs models/<model-name>/model.ts
   ```

   The app's interface is the `awatif-ui` design system (its components and its three.js viewer). Awatif is only the engine: `createEngine` (`scripts/engine.ts`) runs the analysis in the browser and re-runs it on every change. Pass `--port <n>` if 5173 is taken, `--open` to open the browser, `--export <name>` for a multi-config file. The server keeps running, so start it as a background process, and stop it when the user is done.

7. Report the key results (max displacement, reactions, governing forces per member) with units, and say how to work in the app (see "The live app").

## The live app

Everything is interactive and analysed in real time.

The app is laid out in the `awatif-ui` six regions: a toolbar, the model tree (left), the viewport, the inspector (right), a results drawer under the viewport, and a status bar. The viewport is the awatif-ui three.js viewer (`skills/awatif-ui/assets/awatif-viewer.js`: WebGL with OrbitControls, Z up). three.js is the mandatory viewer library: left-drag orbits, right-drag pans, the wheel zooms, double-click frames the model.

- **Make room.** Every region folds: the chevron in the tree, inspector and results headers, the **Tree / Results / Inspector** toolbar toggles, or **Maximise** (key M) to fold them all. Drag a region's inner edge to resize it; the View, Display, Assign and Inspector panels and the inspector groups fold too. The layout is remembered in the browser.
- **Plane views.** The **View** panel (top left of the viewport) switches between **3D** and a plane: **XY**, **XZ** or **YZ** at a location on its normal axis (e.g. XY at Z = 5 m), picked from the grid levels and point coordinates, typed, or stepped with the arrows. The camera looks straight at the plane, items off it are faint and cannot be picked, and **Edit geometry** draws on it. Grid lines are drawn on every level in 3D.
- **Select.** Click an item in the tree, the viewport (points, lines, polygons, load arrows) or a results table; all of them, and the inspector, show the same selection. **Shift+click** toggles items and **Shift+drag** boxes them (left to right adds, right to left removes) into a multi-selection; or type ids (`1, 3, 5-8`) in the **Assign** panel's Selection group. Esc clears it.
- **Assign to the selection** (Assign panel): **Loads** — a point load (Fx…Mz) on the selected points or a distributed load (w, direction) on the selected lines, in a load case (or a new one): **Add**, **Replace** that case's loads of that type, or **Remove**; **Support** type; **Section** (an existing design entry or a new one; each line keeps one); **Release** type; **Mesh and other** (mesh, local axes, imperfections with their parameters). Entries with the same template, parameters and load case are reused; entries left without geometry are dropped (design entries are kept). Loads are drawn with their values, and clicking an arrow selects its load entry.
- **Assign geometry by dragging.** Select a component entry (a support, load, design member, mesh and so on) and press **Pick points/lines/polygons** in the inspector. Drag a box **left to right** to add what it touches to the entry, **right to left** to remove it; a click toggles one item. Right-click or Esc leaves the mode.
- **Edit the geometry.** Press **Edit geometry** in the toolbar. Drag a point to move it, click empty space to add a point, click a point and then where the line should end (a point or empty space), right-click a point or line to delete it. New points lie on the model's work plane (`display.workPlane`, default `XZ`) and snap to grid lines. Ctrl+Z (or **Undo**) undoes.
- **Change parameters** in the inspector: an entry's name, template, geometry ids, load case and parameters (**Duplicate** copies it); a point's coordinates, support and loads; a line's end points, design member, release, mesh divisions and loads; a polygon's points and design member; combination factors; and the grid lines of a grid system (id, ordinate, shown, add and remove).
- **Add or delete** load cases, combinations and component entries with the **Add** menu over the tree and **Delete** in the inspector.
- **Switch** linear or nonlinear analysis and the load case or combination ("All loads" applies every load) in the toolbar.
- **Read results** in the drawer (Reactions, Displacements, governing line forces, Design utilization with Pass/Near limit/Fail) and in the inspector of a point or line. The viewport draws the deformed shape and the reactions; turn them and the loads on or off, and scale the deformation, in the Display panel. Its **Line results** select draws an internal force diagram on every member (Axial N, Shear Y/Z, Torsion, Bending Y/Z) with its values and a legend; bending sits on the tension side and N is positive in compression. The status bar shows the analysis status, lines without a design entry and the maximum displacement.
- **Edits are autosaved** to `model.live.json` next to the model, in the `AppConfig` shape of `model.ts`: `points`, `lines` and `polygons` as `[id, value]` pairs, then `loadCases`, `loadCombinations` and the component fields (`loads`, `supports`, `design`, ...) with load cases by name. `model.ts` is never overwritten.
- **`model.ts` is the starting point.** Saving it reloads the app from the file, which discards in-app edits. Before changing `model.ts` for the user, read `model.live.json` and fold in any edits they made in the app (its fields can replace the matching fields of the config).
- To answer questions about what the user sees in the app, read `model.live.json`, or rerun `analyze.mjs` after folding the edits into `model.ts`.

## Rules

- Do not invent loads, load cases or load combinations. Add them only when the user asks or the source gives explicit values.
- Every line needs a design entry for the model to run.
  - Known section and material supported by Awatif: use the matching template (`steel-member`, `concrete-member`, `timber-member`) with the actual section.
  - Unknown or unsupported section or material (e.g. HSS, W shapes): use a `generic-member` placeholder. Omit `params` for defaults, or set `elasticity`, `area`, `momentInertiaZ`, `momentInertiaY`, `shearModulus`, `torsionalConstant`. State in the design member name that it is a `placeholder`.
  - Do not size or check members.
- Always define `gridLines` (a `grid-system` entry) before modelling, at the column lines, load positions, major transitions, lines of symmetry and floor/eaves levels, so the geometry follows the intended layout.
- 2D frames lie in the XZ plane (Z up), the app's default work plane. For 3D models, set `display: { workPlane: "XY" }` so points drawn in the app land on the floor plan.
- For building foundations, use fixed supports unless the user specifies otherwise.
- Always run the analysis with `scripts/analyze.mjs` or the live app (`scripts/serve.mjs`); never compute or estimate results by hand. The user works in the live app, so always launch it; never hand over only the headless summary or a static viewer.
- Every viewer is three.js and interactive (orbit, pan, zoom, select). Never draw a model as a static image, SVG or 2D canvas. If the user wants a custom-branded viewer, build it with the `awatif-ui` skill, whose starter mounts the three.js viewer (`assets/awatif-viewer.js`). A model without loads still runs and gives zero results; say so instead of adding loads.
- Never use the UI that ships inside the awatif library: not `createApp` (or anything else that `awatif/templates` exports from its index), `getViewer`, `getReport`, or anything from `@awatif/ui`. Every interface uses the `awatif-ui` design system and its viewer. Use awatif for analysis only: `createEngine` (`scripts/engine.ts`), or `createStates`/`runAnalysis` and `@awatif/components`. Type-only imports (`import type { AppConfig } from "awatif/templates"`) are fine. `serve.mjs` refuses to load a model that imports awatif's UI at runtime.
- Loads act in the sign of their axis: gravity on `global-z` is a negative `w` or `Fz`.
- The solver is 3D: every rigid-body motion must be restrained, including rotation about a member's own axis. `Linear solver failed` usually means a mechanism (e.g. a beam on `pinned` + `x-roller` with a generic member); restrain it at a support rather than changing loads.

## Examples

- See `assets/templates` for built examples (`simpleBeam`, `portalFrame`, `flatSlab`, `demo`, `blank`).