# Awatif Data Model

Sources: `templates/data-model.ts`, `templates/createStates.ts`, `components/data-model.ts`, `components/templates.ts`, `components/plugins.ts`, `components/*/data-model.ts`.

Units (`createApp.ts`): positions in **meters**, forces in **kN**.

## 1. AppConfig

`createApp(config: AppConfig = {})`. `AppConfig = Model & { ... }`.

### Model

| Field | Type | Notes |
| --- | --- | --- |
| `points` | `Ided<Point>` | `Point = [x, y, z]` |
| `lines` | `Ided<Line>` | `Line = [pointId, pointId]` |
| `polygons` | `Ided<Polygon>` | `Polygon = number[]` (ordered point ids, min 3) |
| `loadCases` | `string[]` | Names; uuids generated |
| `loadCombinations` | `LoadCombination[]` | `{ name, factors: Record<loadCaseName, number> }` |
| `gridLines` | `Entry[]` | `templateId: "grid-system"` |
| `loads` | `Entry[]` | |
| `supports` | `Entry[]` | |
| `releases` | `Entry[]` | |
| `localAxes` | `Entry[]` | |
| `imperfections` | `Entry[]` | |
| `mesh` | `Entry[]` | |
| `design` | `Entry[]` | |
| `extraComponents` | `Map<ComponentsType, ComponentEntry[]>` | Escape hatch for types without a dedicated field |

### AppConfig-only fields

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `display` | `DisplayOptions` | see §5 | |
| `canvasButtons` | `string[]` | `["Report"]` | `"Report"` is wired to the design report |
| `analysis` | `"linear" \| "nonlinear"` | `"linear"` | |
| `plugins` | `Plugin[]` | `[]` | Templates join the built-ins, referenced by `templateId` |
| `autoCenter` | `boolean` | `true` | `false` keeps grid framing and `display.displayScale` |
| `container` | `HTMLElement \| null` | `document.body` | `null` mounts nothing, returns element |

### Helper types

| Type | Definition |
| --- | --- |
| `Ided<T>` | `Map<number, T> \| [number, T][] \| T[]` — plain list gets 1-based ids; pairs or Map keep authored ids |
| `Entry` | `Omit<ComponentEntry, "id" \| "loadCase"> & { loadCase?: string }` — `loadCase` is the load case **name** |
| `LoadCombination` | `{ name: string; factors: Record<string, number> }` |

An unknown `loadCase` name throws: `Unknown load case "<name>". Declare it in \`loadCases\` first.`

### createApp returns `App`

| Field | Type |
| --- | --- |
| `element` | `HTMLElement` |
| `geometry` | `Geometry` |
| `components` | `Components` |
| `mesh` | `Mesh` |
| `display` | `Display` |
| `analysisStatus` | `AnalysisStatus` |
| `activeAnalysis` | `State<"linear" \| "nonlinear">` |
| `loadCaseIds` | `Map<string, string>` (load case name → id) |

## 2. Component entry

```ts
type ComponentEntry = {
  id?: string;
  name: string;
  templateId: string;                 // key in the template registry
  geometry: number[];                 // ids of points / lines / polygons, per template's geometryKind
  params?: Record<string, unknown>;   // shape defined by the template's Params
  loadCase?: string;                  // id of a LOAD_CASES component
};
type Components = State<Map<ComponentsType, ComponentEntry[]>>;
type ActiveComponent = { type: ComponentsType; index: number } | null;
```

### ComponentsType

| Value | Name | Model field | Built-in templates |
| --- | --- | --- | --- |
| 0 | `MESH` | `mesh` | `line-mesh`, `triangle-mesh` |
| 1 | `LOADS` | `loads` | `point-load`, `distributed-load` |
| 2 | `SUPPORTS` | `supports` | `point-support` |
| 3 | `RELEASES` | `releases` | `releases` |
| 4 | `ANALYSIS` | — | none registered |
| 5 | `DESIGN` | `design` | `generic-member`, `generic-shell`, `concrete-member`, `steel-member`, `timber-member` |
| 6 | `IMPERFECTIONS` | `imperfections` | `imperfections` |
| 7 | `SPECIAL` | — | none registered |
| 8 | `LOCAL_AXES` | `localAxes` | `local-axes` |
| 9 | `LOAD_CASES` | `loadCases` (names) | `load-case` |
| 10 | `LOAD_COMBINATIONS` | `loadCombinations` | `load-combination` |
| 11 | `GRID_LINES` | `gridLines` | `grid-system` |

`createComponents` generates entries for load cases (`templateId: "load-case"`, `geometry: []`) and load combinations (`templateId: "load-combination"`, `geometry: []`, `params: { entries: [{ loadCaseId, factor }] }`).

## 3. Built-in components

Registry: `templates: Map<ComponentsType, Map<string, template>>` (`components/templates.ts`).

| Type | `templateId` | `name` | `geometryKind` | `params` | `defaultParams` |
| --- | --- | --- | --- | --- | --- |
| MESH | `line-mesh` | Line Mesh | `line` | `{ divisions: number }` | `{ divisions: 8 }` |
| MESH | `triangle-mesh` | Triangle Mesh | `polygon` | `{ maxTriangleArea: number }` | `{ maxTriangleArea: 1 }` |
| LOADS | `point-load` | Point Load | `point` | `{ Fx, Fy, Fz, Mx, My, Mz: number }` | all `0` |
| LOADS | `distributed-load` | Distributed Load | `line` | `{ w: number; direction }` | `{ w: 0, direction: "local-z" }` |
| SUPPORTS | `point-support` | Point Support | `point` | `{ type }` | `{ type: "pinned" }` |
| RELEASES | `releases` | Releases | `line` | `{ type }` | `{ type: "both-ends" }` |
| LOCAL_AXES | `local-axes` | Local Axes | `line` | `{ angle: 0 \| 90 }` | `{ angle: 0 }` |
| IMPERFECTIONS | `imperfections` | Imperfections | `line` | see below | see below |
| LOAD_CASES | `load-case` | Load Case | — | `{}` | `{}` |
| LOAD_COMBINATIONS | `load-combination` | Load Combination | — | `{ entries: { loadCaseId: string; factor: number }[] }` | `{ entries: [] }` |
| GRID_LINES | `grid-system` | Grid System | — | `{ x, y, z: GridLine[] }` | see below |
| DESIGN | `generic-member` | Generic Frame | `line` | see below | see below |
| DESIGN | `generic-shell` | Generic Shell | `polygon` | see below | see below |
| DESIGN | `concrete-member` | Concrete Frame | `line` | see below | see below |
| DESIGN | `steel-member` | Steel Frame | `line` | see below | see below |
| DESIGN | `timber-member` | Timber Frame | `line` | see below | see below |

### Enumerated params

| Template | Param | Values |
| --- | --- | --- |
| `distributed-load` | `direction` | `"local-y"`, `"local-z"`, `"global-x"`, `"global-y"`, `"global-z"` |
| `point-support` | `type` | `"fixed"`, `"pinned"`, `"x-roller"`, `"y-roller"`, `"z-roller"` |
| `releases` | `type` | `"both-ends"`, `"start"`, `"end"` |

`point-load` `[Fx, Fy, Fz, Mx, My, Mz]` → `load` as given. `distributed-load` → `load` is `[Fx..Mz]` with `w` on the axis of `direction`; `coordinateSystem` is `"local"` for `local-*`, `"global"` for `global-*`.

Support DOFs `[Ux, Uy, Uz, Rx, Ry, Rz]`:

| `type` | Value |
| --- | --- |
| `fixed` | `[true, true, true, true, true, true]` |
| `pinned` | `[true, true, true, false, false, false]` |
| `x-roller` | `[false, true, true, false, false, false]` |
| `y-roller` | `[true, false, true, false, false, false]` |
| `z-roller` | `[true, true, false, false, false, false]` |

Release `[My_start, Mz_start, My_end, Mz_end]`:

| `type` | Value |
| --- | --- |
| `both-ends` | `[true, true, true, true]` |
| `start` | `[true, true, false, false]` |
| `end` | `[false, false, true, true]` |

### `imperfections`

| Param | Type | Default | Note |
| --- | --- | --- | --- |
| `globalInclination` | boolean | `true` | EC2 §5.2(5) |
| `theta0` | number | `0.005` | θ₀ [rad] (1/200) |
| `localBow` | boolean | `false` | EC2 §5.2(7), Table 5.1 |
| `bowRatioDenominator` | number | `400` | e₀ = L/d |
| `direction` | string | `"z-negative"` | `"y-positive"`, `"y-negative"`, `"z-positive"`, `"z-negative"` |

### `grid-system`

`GridLine = { id: string; ordinate: number; visible: boolean; bubble: "start" | "end" }`

| Axis | Default lines (`id` @ ordinate) | `bubble` |
| --- | --- | --- |
| `x` | `A`@0, `B`@5, `C`@10 | `end` |
| `y` | `1`@0, `2`@5, `3`@10 | `start` |
| `z` | `Z1`@0 | `end` |

### Design templates

| Template | Param | Type | Default | Unit / note |
| --- | --- | --- | --- | --- |
| `generic-member` | `elasticity` | number | `32836` | MPa |
| | `area` | number | `625` | cm² |
| | `momentInertiaZ` | number | `32552` | cm⁴ |
| | `momentInertiaY` | number | `32552` | cm⁴ |
| | `shearModulus` | number | `13682` | MPa |
| | `torsionalConstant` | number | `54912` | cm⁴ |
| `generic-shell` | `elasticity` | number | `32836` | MPa |
| | `poissonRatio` | number | `0.2` | |
| | `thickness` | number | `50` | mm |
| `concrete-member` | `width` | number | `350` | mm (b) |
| | `depth` | number | `350` | mm (h) |
| | `concreteGrade` | string | `"C30"` | |
| | `steelGrade` | string | `"S500"` | |
| | `steelArea` | number | `2500` | mm² (As) |
| | `cover` | number | `30` | mm (cnom) |
| | `lengthFactor?` | number | `2` | l0/l |
| | `creepCoefficient` | number | `0` | φef |
| | `braced` | boolean | `true` | |
| | `stirrupArea` | number | `500` | mm²/m (Asw/s) |
| `steel-member` | `profile` | string | `"IPE 300"` | |
| | `steelGrade` | string | `"S235"` | |
| | `lengthFactor?` | number | `1` | l₀/l |
| `timber-member` | `width` | number | `100` | mm (b) |
| | `depth` | number | `200` | mm (h) |
| | `timberClass` | string | `"C24"` | |
| | `serviceClass` | `1 \| 2 \| 3` | `1` | |
| | `loadDurationClass` | `TimberLoadDurationClass` | `"medium-term"` | |
| | `lengthFactor?` | number | `1` | l₀/l |

Design value lists:

| Param | Values |
| --- | --- |
| concrete `concreteGrade` (UI options) | C12, C16, C20, C25, C30, C35, C40, C45, C50, C55, C60, C70, C80, C90 |
| steel `steelGrade` (`STEEL_GRADES`, EN 10025) | S235 (fy 235, fu 360), S275 (275, 430), S355 (355, 510), S460 (460, 540) |
| steel `profile` (`STEEL_PROFILES`) | `"IPE 80"`–`"IPE 600"` (18), `"HEA 100"`–`"HEA 600"` (19), `"HEB 100"`–`"HEB 600"` (19) |
| timber `timberClass` (`TIMBER_CLASSES`) | Solid (EN 338): C14, C16, C18, C20, C22, C24, C27, C30, C35, C40, C45, C50. Glulam (EN 14080): GL24h, GL28h, GL32h |
| timber `loadDurationClass` | `"permanent"`, `"long-term"`, `"medium-term"`, `"short-term"`, `"instantaneous"` |

## 4. Template interfaces

Common to all: `name: string`, `defaultParams: Params`, `getParamsTemplate({ params: State<Params> }) => TemplateResult`. `geometryKind` is absent on load case, load combination and grid system.

| Interface | `geometryKind` | Extra members |
| --- | --- | --- |
| `LoadTemplate<Params>` | `"point" \| "line"` | `getLoad({ params }) => { load: [Fx,Fy,Fz,Mx,My,Mz]; coordinateSystem?: "local" \| "global" }`; optional `getLabel({ params }) => string \| null`; optional `getObject3D({ params, position, displayScale })`; optional `getLineObject3D({ params, startPosition, endPosition, displayScale })` |
| `SupportTemplate<Params>` | `"point"` | `getSupport({ params }) => { support: [bool ×6] }`; optional `getObject3D({ params, position, displayScale })` |
| `ReleaseTemplate<Params>` | `"line"` | `getRelease({ params }) => { release: [bool ×4] }`; optional `getObject3D({ params, startPosition, endPosition, displayScale })` |
| `LocalAxesTemplate<Params>` | `"line"` | `getAngle({ params }) => 0 \| 90` |
| `ImperfectionsTemplate<Params>` | `"line"` | — |
| `MeshTemplate<Params>` | `"line"` | `getMesh({ params }) => { nodes, elements }` (parametric nodes along the line) |
| `PolygonMeshTemplate<Params>` | `"polygon"` | `getPolygonMesh({ points: [x,y,z][], params }) => { nodes, elements }` (3D nodes) |
| `DesignTemplate<Params, Design>` | `"line" \| "polygon"` | `getParamsTemplate({ params, activeAnalysis })`; `getElementsProps({ params, activeAnalysis }) => ElementProps`; optional `getReport({ params, design }) => TemplateResult`; optional `getDesign({ params, lineElementForces, length, activeAnalysis, imperfections? }) => Design`; optional `getSection(params) => [number, number][]` |
| `LoadCaseTemplate<Params = Record<string, never>>` | — | — |
| `LoadCombinationTemplate` | — | `getParamsTemplate({ params, components? })` |
| `GridSystemTemplate` | — | — |

```ts
type ActiveAnalysis = "linear" | "nonlinear";
type LineElementForces = { elementIndices: number[]; elementForces: InternalForces[] };
type LocalAxesAngle = 0 | 90;
```

## 5. Plugins

```ts
type Plugin = {
  name: string;                       // shown in collision errors
  version?: string;
  templates: Partial<Record<ComponentsType, Record<string, any>>>;
};
type ComponentTemplates = Map<ComponentsType, Map<string, any>>;
definePlugin(plugin: Plugin): Plugin                        // identity, for typing
resolveTemplates(plugins: Plugin[] = [], base = builtIns): ComponentTemplates
```

- Template ids are global; prefix with the plugin namespace (`acme:wind-load`).
- `resolveTemplates` does not mutate `base`; it throws if a plugin id collides with a built-in or another plugin in the same component type.

## 6. Display

### DisplayOptions → `Display` (`createDisplay`)

| `DisplayOptions` field | `Display` state | Type | Default |
| --- | --- | --- | --- |
| `gridSize` | `grid.size` | number | `10` |
| `gridSpacing` | `grid.spacing` | number | `0.5` |
| `gridInfinite` | `grid.infinite` | boolean | `true` |
| `workPlane` | `workPlane.plane` | `"XZ" \| "XY" \| "YZ"` | `"XZ"` |
| `workPlaneOffset` | `workPlane.offset` | number | `0` |
| `displayScale` | `displayScale` | number | `1` |
| `deformationScale` | `deformationScale` | number | `1` |
| `view2D` | `view2D` | boolean | `true` |
| `geometry` | `geometry` | boolean | `true` |
| `mesh` | `mesh` | boolean | `true` |
| `deformedShape` | `deformedShape` | boolean | `true` |
| `loads` | `loads` | boolean | `true` |
| `supports` | `supports` | boolean | `true` |
| `gridLines` | `gridLines` | boolean | `true` |
| `releases` | `releases` | boolean | `true` |
| `lineIndex` | `lineIndex` | boolean | `false` |
| `pointIndex` | `pointIndex` | boolean | `false` |
| `orientation` | `orientation` | boolean | `false` |
| `extrude` | `extrude` | boolean | `false` |
| `pointResult` | `pointResult` | `"None" \| "Displacements" \| "Reactions"` | `"None"` |
| `lineResult` | `lineResult` | `"None" \| "Axial" \| "ShearY" \| "ShearZ" \| "BendingY" \| "BendingZ" \| "Torsion"` | `"None"` |
| `activeLoadCase` (name) | `activeLoadSelection` | `ActiveLoadSelection` | first load case, else `null` |

```ts
type ActiveLoadSelection =
  | { kind: "case"; id: string }
  | { kind: "combination"; id: string }
  | null;
```

## 7. Runtime state

### Geometry

| Field | Type |
| --- | --- |
| `points` | `State<Map<number, [x, y, z]>>` |
| `lines` | `State<Map<number, [pointId, pointId]>>` |
| `polygons` | `State<Map<number, number[]>>` |
| `selection` | `State<{ points: number[]; lines: number[]; polygons: number[] } \| null>` |
| `designs` | `State<Map<number, any>>` |

### Mesh

| Field | Type | Note |
| --- | --- | --- |
| `nodes` | `State<number[][]>` | `[[x, y, z], ...]` |
| `elements` | `State<number[][]>` | `[[node1, node2], ...]` |
| `geometryMapping` | `State<{ pointToNodes, lineToElements, polygonToElements }>` | each `Map<number, number[]>` |
| `supports` | `State<Map<number, [bool ×6]>>` | `[Ux, Uy, Uz, Rx, Ry, Rz]` |
| `loads` | `State<Map<number, [n ×6]>>` | `[Fx, Fy, Fz, Mx, My, Mz]` |
| `releases` | `State<Map<number, [bool ×4]>>` | `[My_start, Mz_start, My_end, Mz_end]` |
| `elementsProps` | `State<Map<number, ElementProps>>` | |
| `positions` | `State<number[]>` | `[x1, y1, z1, x2, ...]` |
| `displacements` | `State<number[]>` | `[u1x, u1y, u1z, u2x, ...]` |
| `reactions` | `State<[n ×6][]>` | |
| `internalForces` | `State<Map<number, InternalForces>>` | |

```ts
type ElementProps = {
  elasticity: number; area: number; momentInertiaZ: number; momentInertiaY: number;
  shearModulus: number; torsionalConstant: number;
  thickness?: number;     // shell (3-node) elements only
  poissonRatio?: number;  // shell (3-node) elements only
};

type InternalForces = {   // each [start, end]
  N: [n, n];    // axial
  Vy: [n, n];   // local-y shear; paired with sagging-negative bending
  Vz: [n, n];   // local-z shear; paired with sagging-negative bending
  Mx: [n, n];   // torsion
  My: [n, n];   // local-y bending; sagging negative
  Mz: [n, n];   // local-z bending; sagging negative
};
```

### Nonlinear solver settings

```ts
type SimSettings = { tol: number; maximum_iter: number };
defaultSimSettings = { tol: 1e-3, maximum_iter: 500 };   // hosted solver caps maximum_iter at 500
```

## 8. Example models (`templates/models/`)

| Export | Contents |
| --- | --- |
| `blank` | `loadCases: ["Dead"]` |
| `simpleBeam` | 6 m beam, 3 points / 2 lines, Dead+Live, ULS+SLS, pinned + x-roller, point load, `line-mesh`, `concrete-member` |
| `portalFrame` | 6 × 4 m frame, `grid-system`, Dead+Live+Wind, 2 ULS combinations, fixed bases, `distributed-load`, `line-mesh`, `concrete-member` |
| `flatSlab` | 5 × 4 m polygon, pinned corners, `triangle-mesh` (`maxTriangleArea: 0.25`), `generic-shell`, `display: { workPlane: "XY", view2D: false }` |
| `demo` | the model `main.ts` runs |
| `customComponent`, `snowPlugin` | duopitch frame with plugin template `snow:snow-load` (`LOADS`); `snowPlugin = definePlugin({ name: "awatif-plugin-snow", templates: { [ComponentsType.LOADS]: { "snow:snow-load": snowLoad } } })` |

Minimal config:

```ts
await createApp({
  points: [[0, 0, 0], [6, 0, 0]],
  lines: [[1, 2]],
  loadCases: ["Dead", "Live"],
  loadCombinations: [{ name: "ULS", factors: { Dead: 1.35, Live: 1.5 } }],
  supports: [{ name: "Bases", templateId: "point-support", geometry: [1, 2], params: { type: "pinned" } }],
  loads: [{ name: "Roof", templateId: "distributed-load", geometry: [1], params: { w: 20, direction: "global-z" }, loadCase: "Dead" }],
  mesh: [{ name: "Mesh", templateId: "line-mesh", geometry: [1], params: { divisions: 8 } }],
  design: [{ name: "Beam", templateId: "concrete-member", geometry: [1] }],
});
```
