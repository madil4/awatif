One rule runs the whole system: **the interface mirrors the data model.** Every app is built on the same `Model`: geometry (points, lines, polygons), load cases and combinations, and component entries (`loads`, `supports`, `releases`, `localAxes`, `imperfections`, `mesh`, `design`, `gridLines`). The same regions hold the same parts of that model in every app. Color, type and spacing come only from tokens. Within that frame an app is free to arrange what is inside a region.

Units are fixed by the model: positions in meters, forces in kN. Show them as the model gives them and never convert.

## Content fundamentals

- Write sentence case everywhere. Panel and group titles are typed in sentence case and shown uppercase by the `overline` style.
- Say what happens, in the imperative: "Run analysis", "Add load", "Fit to model". No exclamation marks, no emoji, no "please".
- Show the unit with every number: `6.00 m`, `20 kN/m`, `32836 MPa`. Set the value in `data` and the unit in `ink-muted`. Design parameters keep the template's own unit (MPa, cm², cm⁴, mm); do not convert them.
- Name things the way the model does. Geometry has numeric ids, so label it by kind and id: "Point 2", "Line 3", "Polygon 1". Component entries use their authored `name` ("Roof", "Bases") exactly; show the template's name as secondary text ("Distributed load"). Load cases are referred to by name ("Dead"), never by uuid.
- Write enum values for people: show "Local z" for `local-z`, "X roller" for `x-roller`. Use `data-mono` only where the raw value is the point (template ids, coordinates, point-id pairs).
- Fix decimals per quantity, not per cell.
- A status is always a word plus an icon plus a color: "Pass", "Near limit", "Fail", "Running", "Not run". Color alone never says it, because green and red here are separated by hue only.
- Empty states say what is missing and the one action that fixes it: "No load cases yet. Add a load case before adding loads." An unknown load case is an error, so say it like the model does: `Unknown load case "Snow". Declare it in load cases first.`

## Layout skeleton

Every app uses these six regions, in this arrangement. This is the part that stays the same.

| Region | Position | Holds | Default size |
| --- | --- | --- | --- |
| Toolbar | top, full width | logo and model name; analysis (linear or nonlinear); the active load case or combination; canvas buttons such as Report | `layout-toolbar` |
| Model tree | left | the model, one group per model field | `layout-left` |
| Viewport | center, fills all remaining space | the model drawn on `viewport`; floating display options, view controls and legend | remaining |
| Inspector | right | the selected component entry or geometry item | `layout-right` |
| Data drawer | bottom of the center column | tabs of results tables: reactions, internal forces, design | `layout-bottom` |
| Status bar | bottom, full width | selection, analysis status, units | `layout-statusbar` |

Rules that keep apps consistent:

- Never move a region to another side and never add a seventh. Omit a region the app does not need (a read-only viewer drops the inspector); the viewport grows to fill the space.
- The viewport takes all leftover space. Panels resize and collapse; the toolbar and status bar do not.
- Docked panels sit on `surface-panel` with `border` hairlines between them and no shadow. Only things that float over the viewport (display options, view controls, the contour legend, menus, dialogs) use `surface-raised` with `shadow-float` and `radius-lg`.
- Selection is shared. Choosing an entry in the tree highlights its `geometry` ids in the viewport (`elem-selected`, plus a heavier line) and fills the inspector. Choosing geometry in the viewport selects it in the tree.

## Data model to UI

**The tree.** One group per model field, in the model's own order. A group with no entries is hidden, not shown empty. Entries use their `name`; the secondary text is the template name; counts go in the group's `meta`.

| Group | Model field | Entries | Component type |
| --- | --- | --- | --- |
| Geometry | `points`, `lines`, `polygons` | sub-groups Points, Lines, Polygons; items "Point 2", "Line 1" | geometry |
| Load cases | `loadCases` | by name ("Dead", "Live", "Wind") | `LOAD_CASES` |
| Load combinations | `loadCombinations` | by name; factors per load case | `LOAD_COMBINATIONS` |
| Grid lines | `gridLines` | the grid system | `GRID_LINES` |
| Loads | `loads` | point load, distributed load | `LOADS` |
| Supports | `supports` | point support | `SUPPORTS` |
| Releases | `releases` | releases | `RELEASES` |
| Local axes | `localAxes` | local axes | `LOCAL_AXES` |
| Imperfections | `imperfections` | imperfections | `IMPERFECTIONS` |
| Mesh | `mesh` | line mesh, triangle mesh | `MESH` |
| Design | `design` | generic, concrete, steel and timber frame; generic shell | `DESIGN` |

`ANALYSIS` and `SPECIAL` have no templates and no tree group. Analysis lives in the toolbar and status bar; plugin templates appear under the group of their component type, labelled by their template name.

**The inspector.** A component entry is `{ name, templateId, geometry, params, loadCase }`, so the inspector always has the same anatomy, top to bottom:

1. Header: the entry's `name` in `h3`, the template name beneath it in `caption`.
2. **Assignment** group: the geometry ids the entry applies to (labelled by kind: Points, Lines, Polygons), and, for loads, the load case as a select of load case names.
3. **Parameters** group: the template's params, one row each. Pick the control by the param's type: number → editable number with its unit; string with a fixed list (concrete grade, steel profile, timber class) → select; boolean → checkbox; enumerated value (`direction`, support `type`, release `type`) → select with readable labels.
4. For design entries, a **Design** group with utilization and a check badge.

Use the template's own defaults when an entry is added, and show them as ordinary values. Group extra design parameters under named sub-groups of Parameters (Section, Material, Reinforcement) when a template has more than about eight.

**Display options** are a floating panel top-right in the viewport, mirroring `DisplayOptions`:

- Show: Geometry, Mesh, Deformed shape, Loads, Supports, Grid lines, Releases.
- Labels: Point index, Line index, Orientation. Also Extrude.
- Results: Point results (None, Displacements, Reactions) and Line results (None, Axial, Shear Y, Shear Z, Bending Y, Bending Z, Torsion), as selects.
- View: a 2D/3D toggle and the work plane (XZ, XY, YZ) top-left, as small buttons. Display scale and deformation scale are number inputs in the same panel.

**The load selection** in the toolbar is one select, grouped Load cases and Load combinations. It decides whose results every table and diagram shows.

**Results** appear in three places and nowhere else: diagrams and contours in the viewport, tables in the data drawer, and utilization badges in the inspector. Drawer tabs: Reactions, Internal forces (N, Vy, Vz, Mx, My, Mz at each element's start and end), Design.

## Visual foundations

**Color.** Surfaces and text come from the neutral tokens: text is `ink`, units and headers `ink-muted`, hints `ink-faint`, all on `surface-panel` (or `surface-canvas`, `surface-sunken`, `surface-selected`). `brand` is the logo teal and stays an identity color for the mark and large shapes. Use `action` with `on-action` text for the one primary button per view. `accent` is the single warm highlight for selection; use one accent item per view. Both themes are first-class: light and dark are built from the same token names and every pair is at least 4.5:1 (3:1 for borders, icons and drawn marks). The viewport changes theme with the app.

**Type.** Nunito for all interface text. Work in `ui` (13px); everything in tables and the inspector is `ui`, `ui-strong`, `data` or `label`. Numbers go in `data`, which turns on tabular figures so decimals align. Use `h1` to `h3` only in dialogs, reports and the inspector title, and `display` only for empty states and splash. `data-mono` is a system monospace added for coordinates, id pairs and template ids; drop it if you prefer Nunito there.

**Spacing and size.** A 4px scale (`space-1` to `space-7`). Panel bodies pad `space-3`; controls sit `space-2` apart. Rows are `layout-row` (28px) and `layout-row-compact` (24px) in dense results tables. Buttons and inputs are `layout-control` (32px) or `layout-control-sm` (28px); use the small size inside panels, toolbars and the inspector.

**Shape and edges.** `radius-sm` for rows, inputs and checkboxes, `radius-md` for buttons and panels, `radius-lg` for floating overlays, `radius-pill` for badges. Separate docked areas with `border` hairlines, not shadows or fills.

**Focus.** Every interactive element shows a 2px solid `focus-ring` outline with a 2px offset. It is at least 3:1 on `surface-panel`, `surface-canvas` and `viewport`.

**Motion.** None by default. Panel collapse and hover fills may use 120ms ease-out; nothing animates in the viewport except camera moves the user starts.

## Viewport

Draw each model part in its own color on `viewport`, and give it one line style so it also reads without color:

| Model part | Token | Style |
| --- | --- | --- |
| Points | `elem-point` | filled dot |
| Lines | `elem-line` | solid, heaviest |
| Polygons | `elem-polygon` | outline plus 20% face fill |
| Mesh | `elem-mesh` | thin, dots at nodes |
| Grid lines | `elem-gridline` | dash-dot, labelled bubble in `ink` |
| Loads | `elem-load` | arrows |
| Supports | `elem-support` | fixed, pinned and roller symbols |
| Releases | `elem-release` | hinge symbol at the member end |
| Local axes | `elem-axis` | triad, axes labelled y and z |
| Reactions | `elem-reaction` | arrows; a different hue from loads |
| Selection | `elem-selected` | heavier line under the item |
| Hover | `elem-hover` | highlight, with its tree row |
| Deformed shape | `elem-deformed` over dashed `elem-undeformed` | |

Line results (N, Vy, Vz, Mx, My, Mz) are signed: color them with the diverging ramp `div-neg-2` to `div-pos-2`. In this model sagging bending is negative; say so in the legend note. Point results that only grow (displacements) and utilization use the sequential ramp `contour-1` to `contour-9`. Do not mix the ramps or invent a third. Every colored result view has a `ContourLegend` bottom-left with unit and min and max values.

## Flexibility

What every app keeps: the six regions and their arrangement, the tree groups and their order, the inspector anatomy (Header, Assignment, Parameters, Design), tokens for every color and size, the status word-icon-color rule, shared selection.

What an app may change: which regions are shown, panel widths and collapsed state, which tabs the data drawer has, which display options are offered, the toolbar's canvas buttons, the templates a plugin adds, and what is drawn in the viewport. Spend that freedom on the model, not on new colors or new type sizes. If an app needs a color or size that is not a token, add it here first.

## Iconography

No icon set was supplied. Until one is chosen, use a single outline set at 16px with a 1.5px stroke and round caps, which matches Nunito's rounded terminals, drawn in `ink-muted` and `ink` when active. The only icons the components ship are the four status icons (check, warning triangle, cross, info), a disclosure chevron and the checkbox tick. The logo is `assets/logo.svg`.
