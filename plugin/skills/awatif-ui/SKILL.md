---
name: awatif-ui
description: Design system for structural analysis and modeling viewer apps built on the Awatif data model (points, lines, polygons, load cases, component entries like loads, supports, mesh, design). Use whenever you build, style, extend or review a web UI that shows a structural model, a model tree, an inspector for loads/supports/members, internal-force or utilization results, or a 3D/2D model viewport. Also use for any one-off tool in this family, even if the user only says "make a viewer", "add a results panel", "make it match our other apps" or asks about Nunito, the teal logo, colors, tokens or layout.
---

# Structural viewer design system

> **Interactive Awatif models:** to let a user work on a model (box-select geometry for loads and supports, draw and move points and lines, edit parameters, see results update live), launch the live Awatif app with the `awatif-model` skill's `scripts/serve.mjs`. That app is built on this design system (`AppShell`, `TreeView`, `PropertyGrid`, `DataTable`, `awatif-ui.js`, `awatif-viewer.js`) and runs Awatif's engine (`createEngine`) for the analysis; its source is `skills/awatif-model/scripts/app/`. The starter here does not run analysis; use it for custom-branded viewers and dashboards.
>
> **Never use the UI that ships inside the awatif library** (`createApp`, `getViewer`, `getReport` or anything from `@awatif/ui`). Every interface comes from this design system; awatif is used for analysis only.

One rule runs the system: **the interface mirrors the data model.** Every app shows the same Awatif `Model` in the same six regions, styled only from tokens, so apps built months apart look like one product. Inside that frame an app is free to arrange its own content.

## Quick start

Scaffold a working starter first, then replace the example model and mount the app's own viewport.

```bash
# one self-contained HTML file (CSS, JS, Nunito and logo inlined; React 18.3.1 and three 0.183.2 load from jsDelivr)
python scripts/scaffold.py out/viewer.html --title "Portal frame" --single-file

# or a folder with linked assets (tokens.css, components/, fonts/, logo.svg, awatif-ui.js, awatif-viewer.js)
python scripts/scaffold.py out/viewer --title "Portal frame"
```

The starter already has the toolbar, model tree, inspector, status bar and an interactive three.js viewport wired to a small example model. To finish an app:

1. Replace `MODEL` in the inline script with the app's real model (positions in m, forces in kN).
2. Keep the three.js viewport. `assets/awatif-viewer.js` (global `AwatifViewer`, ES module behind an import map for `three` and `three/addons/`) draws points, lines, polygons, mesh nodes, grid lines, supports, releases and loads from the `elem-*` tokens, follows the theme, and handles orbit (left-drag), pan (right-drag), zoom (wheel), click-to-select and double-click to fit. Its API: `createViewer(el, model, { onSelect, onHover, onSelectionChange, onAssign, onEdit, onModeExit, hoverInfo, geometryKind, workPlane, workPlaneOffset, snap })` returns `{ select(id), setSelection({ point, line, polygon }), setSelectionFilter({ point, line, polygon }), setLoadSelection(name), setModel(model), setMode(mode, { kind }), setView(null | { plane, offset }), getView(), setResults(results, { deformed, reactions, scale, diagram, diagramScale, diagramLabels }), setDisplay({ loads, loadLabels, supports, gridLines, mesh }), setWorkPlane(plane, offset), deformationScale(), diagramRange(), fit(), render(), dispose(), three }`. Ids are the tree ids (`point-2`, `line-1`, `supports-0`, `loads-1`).
   - Modes: `view` (click selects a point, line, polygon or load arrow; Shift+click toggles geometry in the multi-selection and Shift+drag boxes it, both reported through `onSelectionChange({ point, line, polygon })`), `assign` (box left to right adds, right to left removes geometry of `kind` for the active entry through `onAssign(ids, add)`; right-click or Esc calls `onModeExit`), `edit` (drag, add and delete points, draw lines; reported through `onEdit({ type: 'move-point' | 'add-point' | 'add-line' | 'delete-point' | 'delete-line', ... })`). The viewer never changes the model itself; the app applies the edit and calls `setModel`.
   - `setView({ plane: 'XY' | 'XZ' | 'YZ', offset })` shows one plane with an orthographic camera (left-drag pans); geometry off it is faint and cannot be picked, and the plane becomes the work plane. `setView(null)` returns to 3D. Grid lines are drawn on every level in 3D.
   - `setResults({ nodes, elements, displacements, reactions })` draws the deformed shape (`elem-deformed` over dashed `elem-undeformed`) and reaction arrows (`elem-reaction`), the shape of an Awatif engine run.
   - Add `internalForces` and `lineToElements` (the engine's `geometryMapping.lineToElements`) to the results and pass `diagram: 'N' | 'Vy' | 'Vz' | 'Mx' | 'My' | 'Mz'` to draw that line result on the members: filled with the diverging `div-*` ramp, symmetric about zero, with one value per line labelled, at midspan when the force is uniform along the line and otherwise at its largest magnitude (`diagramLabels: false` hides them; `diagramScale` multiplies the size). Bending is drawn on the tension side. `diagramRange()` returns `{ key, min, max, scale }` for the `ContourLegend`.
   - `three.root` is cleared on every redraw; draw anything else into a group of your own on `viewer.three.scene` and call `viewer.render()`. `window.onViewerReady(element, viewer)` runs once it is mounted.
3. Add what the app needs from the optional regions: a data drawer (`bottom`) with `Tabs` + `DataTable`, floating display options (`overlays.topRight`), a `ContourLegend` (`overlays.bottomLeft`).

Run scripts from the skill folder (paths above are relative to it). The scaffold needs only Python 3 and no packages.

## Non-negotiables

These are what make the apps look related. Break one only if the user asks.

- **Six regions, fixed arrangement:** toolbar (top), model tree (left), viewport (center, takes all remaining space), inspector (right), data drawer (under the viewport), status bar (bottom). Omit a region the app doesn't need; never move one to another side and never add a seventh. `StructViewer.AppShell` implements this.
- **The viewport is three.js and interactive.** three.js (pinned `0.183.2`, matching the plugin's dependency) is the mandatory viewport library: mount `AwatifViewer.createViewer`, or build on its `three` handles. Orbit, pan, zoom and click-to-select always work, with Z up. Never replace it with a static image, SVG or 2D canvas, never pull in another 3D library, and never use awatif's own viewer (`getViewer` from `@awatif/ui`).
- **Tokens only.** Every color, size, radius, shadow and type style comes from `assets/tokens.css` (`var(--ink)`, `var(--space-3)`, class `.ui`). No hex values or arbitrary px in app code. If an app needs something that isn't a token, add it to `assets/tokens.json` and rebuild (see below), so the next app gets it too.
- **Nunito** for all interface text (bundled variable font). Body size is `ui` (13px). Numbers go in the `data` style, which turns on tabular figures so decimals align.
- **Light and dark are both first-class.** Switch with `data-theme="light|dark"` on `<html>`. All text pairs are at least 4.5:1, borders and drawn marks at least 3:1.
- **Units come from the model:** meters and kN. Show the unit with every number (`6.00 m`, `20 kN/m`) and never convert.
- **Status = icon + word + color.** "Pass", "Near limit", "Fail", "Running", "Not run" always carry a word and an icon, because green and red differ by hue only. Use `StatusBadge`.
- **Shared selection.** The tree, viewport, tables and inspector show the same selected item.
- **Docked panels have hairline borders and no shadow.** Only things floating over the viewport (display options, legend, menus, dialogs) use `surface-raised` + `shadow-float`.
- **Viewport colors per model part** come from the `elem-*` tokens, each with its own line style so it reads without color. Results use exactly two ramps: sequential (`contour-1`..`contour-9`) for displacements and utilization, diverging (`div-neg-2`..`div-pos-2`) for signed internal forces. Sagging bending is negative in this model; say so in the legend note. Don't mix ramps or invent a third.
- **Writing:** sentence case, imperative buttons ("Run analysis"), no emoji or exclamation marks. Name things as the model does: "Point 2", "Line 1" for geometry; the authored `name` ("Roof", "Bases") for component entries, with the template name as secondary text.

## Data model to UI

| Model | Where it appears |
| --- | --- |
| `points`, `lines`, `polygons` | Tree group "Geometry" with sub-groups; items "Point 2", "Line 1" |
| `loadCases`, `loadCombinations` | Tree groups; also the grouped load-selection `Select` in the toolbar |
| `gridLines`, `loads`, `supports`, `releases`, `localAxes`, `imperfections`, `mesh`, `design` | One tree group each, in this order. Hide empty groups |
| A component entry `{ name, templateId, geometry, params, loadCase }` | Inspector: Header, then **Assignment**, **Parameters**, **Design** groups |
| `DisplayOptions` | Floating panel top-right of the viewport |
| Reactions, internal forces (N, Vy, Vz, Mx, My, Mz), design | Tabs in the data drawer; utilization badge in the inspector |

Use `assets/awatif-ui.js` (global `AwatifUI`) so every app builds these the same way instead of re-deriving them:

```js
const tree = AwatifUI.buildTree(model);                 // nodes for <TreeView>
const ins  = AwatifUI.inspector(model, selectedId);     // { title, sub, groups } for <PropertyGrid>
const opts = AwatifUI.loadSelectionOptions(model);      // grouped options for the toolbar <Select>
```

It accepts the model's `Ided` shapes (Map, `[id, T][]` or plain list), picks controls from each template's params (number with unit, select for enums and steel/concrete/timber lists, checkbox for booleans), and shows enum values for people ("X roller", "Local z"). When a plugin adds a template it doesn't know, it still lists the params as plain rows.

## Components

`assets/components/bundle.js` + `bundle.css` expose `window.StructViewer` (React 18): `AppShell`, `Panel`, `TreeView`, `PropertyGrid`, `DataTable`, `Tabs`, `ContourLegend`, `StatusBadge`, `Button`, `Select`, `Checkbox`. Prop types are in `assets/components/index.d.ts`.

Read these when you need them (don't load all up front):

- `references/components.md`: what each component is for, props, do and don't. Read before using or extending a component.
- `references/brand-book.md`: full content rules, layout table, visual foundations, viewport legend, what an app may and may not change. Read when designing something the starter doesn't cover.
- `references/awatif-data-model.md`: the Awatif data model (AppConfig, component entries, built-in templates and params, display options, internal-force conventions). Read when you need exact field names, templates or params.

Not a React app? The tokens (`tokens.css`), the type classes and the markup/class names carry over; the bundle does not. Re-implement the component the same way, from `references/components.md` and the CSS in `bundle.css`, rather than inventing a new look.

## Flexibility

An app may change: which regions it shows, panel widths and collapsed state, which drawer tabs and display options it offers, toolbar canvas buttons, the templates a plugin adds, and everything drawn in the viewport. Spend that freedom on the model. Keep the tree order, the inspector anatomy, the tokens and the status rule.

## Changing the system

`assets/tokens.json` is the single source of truth. After editing it:

```bash
python scripts/build_tokens_css.py     # regenerates assets/tokens.css
```

Grammar notes: colors are lists with per-theme values (`{"light": "...", "dark": "..."}`), an alias is written `"{accent}"`, and type styles are grouped (Display, Headings, Interface, Data). If you change a color, re-check contrast (4.5:1 text, 3:1 marks) in both themes.

## Checking your work

Before handing an app back, confirm: the three.js viewport renders and orbits, pans, zooms and selects, all six regions behave (or are deliberately omitted), no hard-coded colors or px values, both themes render, every number shows its unit, every status has icon + word, and selecting an entry updates the tree, viewport and inspector together.
