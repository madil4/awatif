# Templates

`createApp` wires a structural model into a running Awatif app: it builds the
reactive state, runs the mesh → solve → design pipeline, and mounts the UI.
A new app is one call.

```ts
import { createApp, portalFrame } from "./templates";

await createApp(portalFrame);
```

Or describe your own model inline — ids are optional, and load cases are
referenced by name:

```ts
import { createApp } from "./templates";

await createApp({
  points: [
    [0, 0, 0],
    [6, 0, 0],
  ],
  lines: [[1, 2]],

  loadCases: ["Dead", "Live"],
  loadCombinations: [{ name: "ULS", factors: { Dead: 1.35, Live: 1.5 } }],

  supports: [
    { name: "Bases", templateId: "point-support", geometry: [1, 2], params: { type: "pinned" } },
  ],
  loads: [
    {
      name: "Roof",
      templateId: "distributed-load",
      geometry: [1],
      params: { w: 20, direction: "global-z" },
      loadCase: "Dead",
    },
  ],
  mesh: [{ name: "Mesh", templateId: "line-mesh", geometry: [1], params: { divisions: 8 } }],
  design: [{ name: "Beam", templateId: "concrete-member", geometry: [1] }],
});
```

## Config

| Field | Notes |
| --- | --- |
| `points`, `lines`, `polygons` | A plain list (1-based ids), a list of `[id, value]` pairs, or a `Map` |
| `loadCases` | Names; uuids are generated for you |
| `loadCombinations` | `{ name, factors: { <load case name>: factor } }` |
| `loads`, `supports`, `releases`, `localAxes`, `imperfections`, `mesh`, `design` | Component entries; `loadCase` is a load case **name** |
| `extraComponents` | Escape hatch: a raw `Map<ComponentsType, ComponentEntry[]>` |
| `display` | Plain values (`workPlane`, `view2D`, `deformationScale`, `activeLoadCase`, …) |
| `canvasButtons` | Canvas bar buttons, default `["Report"]` |
| `analysis` | `"linear"` (default) or `"nonlinear"` |
| `autoCenter` | Frame the model on start, default `true`; `false` keeps the grid framing and `display.displayScale` |
| `plugins` | Third-party component packages; their templates join the built-ins |
| `container` | Mount target, default `document.body`; `null` returns the element unmounted |

`createApp` returns the live state — `geometry`, `components`, `mesh`,
`display`, `analysisStatus`, `activeAnalysis`, `loadCaseIds` and the mounted
`element` — so anything the template does not cover can still be driven
directly.

## Plugins

Custom components live in their own package — no fork, no pull request. A
plugin is a name and a set of templates, keyed by component type:

```ts
// awatif-plugin-wind/index.ts
import { ComponentsType, definePlugin } from "@awatif/components";
import { areaLoad } from "./areaLoad";

export default definePlugin({
  name: "awatif-plugin-wind",
  templates: {
    [ComponentsType.LOADS]: { "wind:area-load": areaLoad },
  },
});
```

An app opts in by passing it to `createApp`, and from there the component is
indistinguishable from a built-in — it shows up in the components bar, the
viewer, the analysis pipeline and the report:

```ts
import { createApp, portalFrame } from "./templates";
import wind from "awatif-plugin-wind";

await createApp({
  ...portalFrame,
  plugins: [wind],
  loads: [
    {
      name: "Gust",
      templateId: "wind:area-load",
      geometry: [2],
      params: { pressure: 1.2 },
      loadCase: "Wind",
    },
  ],
});
```

A template implements the interface of its component type — `LoadTemplate`,
`MeshTemplate`, `DesignTemplate`, `LocalAxesTemplate`, … all exported from
`@awatif/components`.

### Labels

A load template does not draw its own numbers. The viewer labels every
non-zero component of whatever `getLoad` returns, with its magnitude and the
axis it acts on (`20 kN/m (Global Z)`), in the local or global system the
template declared — so a plugin shows correct values in the viewer without
writing a line of `three.js`.

Implement `getLabel` to word it differently, for instance to show the
quantity the user reasons about rather than the one the solver receives:

```ts
getLabel: ({ params }) => `s = ${getSnow(params).s.toFixed(2)} kN/m²`,
```

It returns one string (`"\n"` separates lines) or `null` for no label at all.
For text beyond the label, `getText` is exported too, and draws the same
sprite the rest of the viewer uses.

Template ids are global, so prefix them with the plugin's namespace
(`wind:area-load`). `resolveTemplates` throws if a plugin shadows a built-in
or another plugin, rather than silently replacing it. It can also be called
directly when composing the pieces by hand:

```ts
const templates = resolveTemplates([wind]);
runAnalysis({ geometry, components, mesh, display, analysisStatus, activeAnalysis, templates });
```

## Models

Ready-made starting points in `models/`: `blank`, `simpleBeam`, `portalFrame`,
`flatSlab`, `demo` (the one `main.ts` runs), and `customComponent` — a
duopitch frame whose snow load comes from a plugin (`models/custom-component/`),
the worked example of the section above. They are plain `AppConfig` objects,
so spreading and overriding works:

```ts
await createApp({ ...simpleBeam, analysis: "nonlinear" });
```

## Pieces

`createApp` is a composition of parts that can be used on their own:
`createStates` (or `createGeometry` / `createComponents` / `createDisplay` /
`createMesh`) for state, and `runAnalysis` for the pipeline.

> Note: these are *app* templates. The *component* templates (`point-load`,
> `line-mesh`, `concrete-member`, …) referenced by `templateId` live in
> `components/templates.ts`.
