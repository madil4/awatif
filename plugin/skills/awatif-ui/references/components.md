# Components

React components in `assets/components/bundle.js` (global `window.StructViewer`, needs React 18 and `bundle.css`). Prop types are in `assets/components/index.d.ts`.

## AppShell

AppShell is the one layout every viewer app is built on: toolbar on top, model tree left, viewport in the middle, inspector right, data drawer under the viewport, status bar at the bottom.

You provide each region as a node: `toolbar`, `left`, `right`, `bottom`, `statusbar`. The model view goes in as `children` and fills the viewport; it is always the three.js viewer (`assets/awatif-viewer.js`, see SKILL.md), never SVG or a 2D canvas; pass `overlays` (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`) for things that float over it. The shell needs a parent with a definite height.

What goes where, from the model:
- `toolbar`: the logo, the model name in `h3`, analysis (Linear and Nonlinear as pressed ghost buttons), the load selection as a grouped `Select` (Load cases, Load combinations), and canvas buttons such as Report.
- `left`: a `Panel` with `flush` holding the `TreeView` of the model, one group per model field.
- `right`: a `Panel` with `flush` holding the inspector: the entry's name and template, then a `PropertyGrid` (Assignment, Parameters, Design).
- `bottom`: `Tabs` (Reactions, Internal forces, Design) above a `DataTable` in compact density.
- `overlays.topLeft`: view controls (2D or 3D, work plane). `overlays.topRight`: the display options (checkboxes and the Point results and Line results selects). `overlays.bottomLeft`: the `ContourLegend` when a result is colored.
- `statusbar`: selection, analysis status as a `StatusBadge`, and the units (m, kN).

Use it like this:
- Omit a region by leaving the prop out; the viewport grows to fill the space. Do not move a region to a different side and do not add a seventh.
- Resize with `leftWidth`, `rightWidth` and `bottomHeight`. The defaults are `layout-left`, `layout-right` and `layout-bottom`. Pass `onResize(region, px)` to give the open regions a drag handle on their inner edge, and keep the sizes in state.
- Let the user fold regions to enlarge the viewport: pass `collapsed: { left, right, bottom }` and `onToggle(region)`. A folded side becomes a narrow rail and a folded drawer a single bar, each a button that opens it again (labelled by `leftLabel`, `rightLabel`, `bottomLabel`). Put a `sv-collapse-btn` in the region's own header to fold it, and offer a toolbar command that folds every region at once.
- In the toolbar use `sv-toolbar__sep` between groups and `sv-toolbar__spacer` to push the canvas buttons to the right.
- Keep one shared selection: the tree, the viewport and the tables show the same item, and the inspector describes it.

Do not:
- Put a shadow on a docked region. Only overlays use `surface-raised` and `shadow-float`.
- Color the viewport background yourself; it is `viewport` and follows the theme.

## Panel

Panel is the titled container for everything in a region: a header with an uppercase overline title and optional actions, then a body.

You provide `title` (typed in sentence case; the panel uppercases it), `children`, and optionally `actions` (small ghost buttons) for the header. Set `collapsible` for groups the user can fold, and `defaultOpen={false}` to start folded, or control it with `open` and `onToggle(open)`. Several panels can stack in one side region; a folded one shrinks to its header.

Use it like this:
- Inside `AppShell` regions, use `flush` so the body has no padding and a `TreeView`, `PropertyGrid` or `DataTable` runs edge to edge.
- Outside the shell (dialogs, floating tools), leave the frame: `border` hairline and `radius-md`.
- Pad free content with `space-3`, which the default body does.
- Keep titles to one or two words that match the data structure: "Model", "Inspector", "Member forces".

Do not:
- Add shadows. Docked panels are separated by hairlines only.
- Nest panels inside panels; use a `PropertyGrid` group title instead.

## TreeView

TreeView lists the model: one group per model field, in the model's own order, with each component entry under its group.

You provide `nodes` as `{ id, label, meta?, icon?, group?, children? }`, a `selectedId`, `onSelect(id, node)` and optionally `defaultExpanded` (ids). A node with `group: true` is a group title: shown as an overline, it only expands and collapses and is never selected.

Use it like this:
- Order the groups as the model does: Geometry (Points, Lines, Polygons), Load cases, Load combinations, Grid lines, Loads, Supports, Releases, Local axes, Imperfections, Mesh, Design. Hide a group that has no entries instead of showing it empty.
- Label entries with their authored `name` ("Roof", "Bases") and put the template's name in `meta` ("Distributed load"). Label geometry by kind and id ("Point 2", "Line 1") and put counts in the sub-group's `meta`. Load cases and combinations are labelled by name.
- The selected row fills with `surface-selected` and its label turns bold. Selecting an entry highlights its geometry in the viewport; keep the viewport, tables and inspector in step.
- Rows are keyboard operable: arrow keys expand and collapse, Enter or Space selects.

Do not:
- Select a group row, or nest deeper than four levels.
- Put commands in rows; use the toolbar or the panel header actions (an "Add" ghost button).
- Add a group for `ANALYSIS` or `SPECIAL`; they have no templates.

## PropertyGrid

PropertyGrid shows the fields of the selected item in the inspector: groups of label and value rows, with the control that fits each field.

You provide `groups` as `{ title?, collapsible?, open?, defaultOpen?, rows: [{ label, value, unit?, numeric?, control?, options?, key?, placeholder? }] }`. A `collapsible` group folds to its title; it keeps its own open state unless you pass `open` and handle `onGroupToggle(title, open)`. `value` may be a string, a number, a boolean (checkbox) or a node such as a `StatusBadge`. Set `control` to `input` (or `editable: true`), `select` (with `options`) or `checkbox`; leave it off for read-only text. Pass `onChange(key, value)` to receive edits, and give the grid a `key` that changes with the selection so its fields reset.

Use it like this:
- Build every component entry with the same anatomy: an Assignment group (geometry ids as an editable list such as `1, 3, 5–8` — `AwatifUI.formatIds` — and, for loads, the load case), a Parameters group (the template's params), and for design entries a Design group.
- Pick the control from the param's type: number → input with its `unit`; fixed list (grade, profile, class) → select; boolean → checkbox; enumerated value (`direction`, support `type`, release `type`) → select with readable labels and the raw value as the option value.
- Put the unit in `unit`, not in the label or value, and keep the template's own unit (kN/m, MPa, mm, cm²). Numbers use `data` so decimals align.
- Group a long design template under named sub-groups (Section, Material, Reinforcement) once Parameters passes about eight rows.
- Read-only values are plain text, not disabled inputs.

Do not:
- Show a field the template does not define, or rename a param; labels are the template's param names in sentence case.
- Use the grid for results across many items; use `DataTable`.

## DataTable

DataTable lists many items against the same fields: reactions per support node, internal forces per mesh element, design checks per design entry.

You provide `columns` as `{ key, label, unit?, width?, numeric?, mono?, render? }` and `rows` as objects with a unique `id` plus a value per column key. Pass `selectedId` and `onSelect(id, row)` to share selection with the tree and viewport. Set `density="compact"` for long results tables (24px rows).

Use it like this:
- Put the identifier first with `mono: true` (a node or element number, or the entry name in a design table). Mark numeric columns `numeric: true`: they right-align and use tabular figures, so give each column a fixed number of decimals.
- Put the unit in the column header (`unit: 'kN'`), never in each cell. Internal forces are N, Vy, Vz, Mx, My and Mz at each element's start and end; reactions are Fx, Fy, Fz, Mx, My and Mz.
- Show values for the active load selection from the toolbar, and say so in the drawer's tab or the status bar. Signed values keep their sign; in this model sagging bending is negative.
- Put the status in the last column with `render` returning a `StatusBadge`.
- Give the table a container with a fixed height (the data drawer) and let it scroll; the header is sticky.

Do not:
- Use zebra striping; hover and selection fills are the only row fills.
- Sort or filter silently; show the active sort in the header label if the app adds it.

## Tabs

Tabs switches between sibling views that share one region, most often the tables in the data drawer.

You provide `tabs` as `{ id, label, meta? }` and either `value` with `onChange(id)` or `defaultValue`. Tabs renders only the tab list; you render the content for the active id below it.

Use it like this:
- Use it at the top of the data drawer for Reactions, Internal forces and Design. Put the row count in `meta`.
- The active tab uses `ink-link` for its label and a 2px underline, so the state is not color alone.
- Keep labels to one or two words in sentence case, matching the names in the README.

Do not:
- Use tabs in the left or right panels; those are one scroll of groups (`Panel`, `PropertyGrid`).
- Use more than five tabs in a region; move extras into a `Select`.

## ContourLegend

ContourLegend explains the colors of a result view: a banded color bar with tick values, the quantity and its unit.

You provide `title`, `unit`, `min` and `max`; choose `scale="sequential"` (default, nine `contour-*` steps) or `"diverging"` (five `div-*` steps, for signed quantities). Optional: `ticks` (default 5), `decimals` (default 2), `height` and a `note`.

Use it like this:
- Float it bottom-left over the viewport through `AppShell`'s `overlays.bottomLeft`. It sits on `surface-raised` with `shadow-float` so it reads on any viewport content.
- Show it whenever a result is colored; never color a result without it.
- Use `sequential` for quantities that only grow: the Displacements point result and utilization. Use `diverging` for the signed line results: Axial, Shear Y, Shear Z, Torsion, Bending Y and Bending Z. Give a diverging legend a symmetric range so zero sits in the middle, and put the sign convention in `note`: in this model "Sagging is negative".
- Title it with the result's name as the display option shows it ("Bending Y") and keep the model's unit (m, kN, kN·m); keep decimals fixed for the whole view.

Do not:
- Mix the two ramps in one view, or add stops.
- Show more than one legend at a time.

## StatusBadge

StatusBadge shows the state of a check, an analysis or a model item as an icon, a word and a color together.

You provide `status` (`ok`, `warn`, `fail`, `info`, `neutral`) and the word as `children`. The icon is drawn for you: a check, a warning triangle, a cross, an "i" or a dash.

Use it like this:
- Use the same words everywhere: "Pass", "Near limit", "Fail" for design checks; "Running", "Analysis complete", "Not run" for analysis state.
- Place it in the last column of a results table, in the inspector's Design check group, and in the status bar.
- Choose `warn` for a utilization approaching the limit and `fail` for one past it; the app, not the badge, decides the threshold and shows it in the legend.

Do not:
- Show a status with color only, or with a word and no badge icon. Green and red here differ by hue alone, so the icon and word carry the meaning.
- Use `accent` or `brand` for a status.

## Button

Button triggers a command. Labels are verbs in sentence case ("Run analysis", "Add load case").

You provide `children` as the label, an optional `icon` node, and `onClick`. Use `variant` for emphasis and `size` for density.

Use it like this:
- `primary` (`action` fill, `on-action` text): the one main command in a view, for example Run analysis. Never two in the same view.
- `secondary`: ordinary commands in dialogs and panels. `ghost`: toolbar commands and view modes.
- `danger`: destructive commands only, and it always opens a confirmation.
- `size="sm"` (28px) inside toolbars and panel headers; the default (32px) in dialogs and forms.
- For a mode toggle, set `pressed` on `ghost`; pressed buttons fill with `surface-selected` and an `action` border, so the state is not color alone.

Do not:
- Use `brand` as a button fill; its white-text contrast is too low.
- Disable a button without a way to learn why; put the reason in a tooltip or the status bar.

## Select

Select chooses one value from a fixed list: a load case, an enumerated template param, a steel profile, a result type.

You provide `options` and either `value` with `onChange(value)` or `defaultValue`. An option is a string, `{ value, label }`, or a group `{ label, options }`. Give it an accessible name with `aria-label` or `labelledBy` (the id of its visible label). `size="md"` (32px) in dialogs; the default 28px inside panels, toolbars and the inspector.

Use it like this:
- Show people-readable labels and keep the model's raw value as `value`: label "Local z", value `local-z`; label "X roller", value `x-roller`.
- Use it for enumerated template params (`direction`, support `type`, release `type`), design lists (concrete grade, steel profile, timber class), the load case of a load, and the toolbar's load selection, grouped Load cases and Load combinations.
- Use it for Point results and Line results in the display options.
- Use it for lists of five or more. For two to four exclusive modes in a toolbar, use pressed ghost `Button`s instead (for example Linear and Nonlinear).

Do not:
- Put a Select where the list is user-extensible without an "Add" command next to it.
- Use the Select to trigger actions; that is a `Button` or a menu.

## Checkbox

Checkbox turns one option on or off: a display option, or a boolean template param such as `braced` or `localBow`.

You provide the label as `children` and either `checked` with `onChange(checked)` or `defaultChecked`. In a `PropertyGrid` row the row label names it, so pass no children and use `labelledBy`.

Use it like this:
- Use it for the Show, Labels and Extrude display options (Geometry, Mesh, Deformed shape, Loads, Supports, Grid lines, Releases; Point index, Line index, Orientation; Extrude), stacked in one column.
- Use it for boolean params in the inspector (`globalInclination`, `localBow`, `braced`).
- A checked box fills with `action` and shows a tick, so the state is not color alone.

Do not:
- Use it to choose between exclusive modes; use `Select` or pressed `Button`s.
- Use it to run something; a checkbox only sets state.

