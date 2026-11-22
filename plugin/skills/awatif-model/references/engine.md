## Awatif Engine

Source: `scripts/engine.ts`, built on awatif's `createStates` and `runAnalysis`.
Run it on a model with `scripts/analyze.mjs` (see SKILL.md); import `createEngine`
directly only for studies the runner does not cover (parameter sweeps, nonlinear).
The engine is headless. The interactive app for the user is `scripts/serve.mjs`,
which runs this same engine in the browser behind the `awatif-ui` interface
(`scripts/app/`); never awatif's own UI (`createApp`, `@awatif/ui`).

`setModel` keeps the active load case or combination when the new model still
has it (and keeps "all loads" as `null`); otherwise it falls back to the first case.

```ts
// The state and analysis pipeline of an app, without any UI: change an input
// and the pipeline re-runs, then subscribers receive the new results.
//
// Positions are in meters and forces are in Kilo-Newton, everything else
// propagates from these two assumptions.
export async function createEngine(config: AppConfig = {}): Promise<Engine>

export type Engine = {
  // Snapshot of the latest run
  getAll(): Results;
  // Called after every completed run; returns the unsubscribe function
  subscribe(callback: (results: Results) => void): () => void;
  // Resolves with the results of the next completed run
  next(): Promise<Results>;

  // Each of these changes state, which re-runs the pipeline
  setModel(model: Model): void;
  setParams(componentName: string, params: Record<string, unknown>): void;
  setAnalysis(analysis: "linear" | "nonlinear"): void;
  // A load case or load combination by name; `null` applies every load
  setActiveLoad(name: string | null): void;

  // The live states behind the results, for anything the API does not cover
  states: {
    geometry: Geometry;
    components: Components;
    mesh: Mesh;
    display: Display;
    analysisStatus: AnalysisStatus;
    activeAnalysis: State<"linear" | "nonlinear">;
  };
  loadCaseIds: LoadCaseIds;
  templates: ComponentTemplates;
};

export type Results = {
  status: { success: boolean; error?: string; unassignedLines?: number[]; iterations?: number };
  analysis: "linear" | "nonlinear";
  activeLoad: string | null; // load case or combination name of the run
  nodes: number[][]; // mesh nodes [x, y, z]
  elements: number[][]; // mesh elements [node, node]
  geometryMapping: { pointToNodes; lineToElements; polygonToElements }; // Map<id, index[]>
  displacements: number[]; // [u1x, u1y, u1z, u2x, ...] per node, m
  reactions: [Fx, Fy, Fz, Mx, My, Mz][]; // per node, kN / kNm
  internalForces: Map<element, InternalForces>; // see data-model.md §7
  designs: Map<lineId, Design>; // design template output per line
};
```

Notes:

- The first run uses the first load case. Results are for one load case or combination at a time; set each with `setActiveLoad` and `await next()`.
- Call `next()` before the setter so the run is not missed: `const r = engine.next(); engine.setActiveLoad("ULS-1"); await r;`
- Reactions oppose the applied loads: their sum is equal and opposite to the total load.
- `nonlinear` runs on a hosted solver and needs network access.

## `scripts/analyze.mjs` output

For every load case and combination it prints the status, the maximum displacement, the reactions with their sum, and the min/max line force envelopes (N, Vy, Vz, Mx, My, Mz). Points and lines use the model's own ids. Nothing is written to disk. The script exits with code 1 if any run failed.
