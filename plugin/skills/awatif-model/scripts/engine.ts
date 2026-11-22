import van, { type State } from "vanjs-core";
import {
  initPositionsAndForcesCpp,
  initTriangleMesh,
  resolveTemplates,
  type ComponentTemplates,
  type Components,
  type Geometry,
  type Mesh,
} from "@awatif/components";
import type { AnalysisStatus, Display } from "@awatif/ui";
import {
  createComponents,
  createGeometry,
  createStates,
  type LoadCaseIds,
} from "awatif/templates/createStates";
import { runAnalysis } from "awatif/templates/runAnalysis";
import type { AppConfig, Model } from "awatif/templates/data-model";

export type Results = {
  status: AnalysisStatus["val"];
  analysis: "linear" | "nonlinear";
  // Load case or combination name the run used; `null` applies every load
  activeLoad: string | null;
  nodes: Mesh["nodes"]["val"];
  elements: Mesh["elements"]["val"];
  geometryMapping: Mesh["geometryMapping"]["val"];
  displacements: Mesh["displacements"]["val"];
  reactions: Mesh["reactions"]["val"];
  internalForces: Mesh["internalForces"]["val"];
  designs: Geometry["designs"]["val"];
};

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

// The state and analysis pipeline of an app, without any UI: change an input
// and the pipeline re-runs, then subscribers receive the new results.
//
// Positions are in meters and forces are in Kilo-Newton, everything else
// propagates from these two assumptions.
export async function createEngine(config: AppConfig = {}): Promise<Engine> {
  await initPositionsAndForcesCpp();
  // Polygons need the Triangle WASM; frame-only models run without it
  if (hasPolygons(config)) await initTriangleMesh();

  const templates = resolveTemplates(config.plugins);
  const { geometry, components, display, mesh, loadCaseIds } =
    createStates(config);

  const analysisStatus: AnalysisStatus = van.state({ success: true });
  const activeAnalysis = van.state<"linear" | "nonlinear">(
    config.analysis ?? "linear",
  );

  // Load case and combination names of the current model, for setActiveLoad
  let combinationIds = getCombinationIds(components.val);
  let caseIds = loadCaseIds;

  const getAll = (): Results => ({
    status: analysisStatus.val,
    analysis: activeAnalysis.val,
    activeLoad: getActiveLoadName(display, caseIds, combinationIds),
    nodes: mesh.nodes.val,
    elements: mesh.elements.val,
    geometryMapping: mesh.geometryMapping.val,
    displacements: mesh.displacements.val,
    reactions: mesh.reactions.val,
    internalForces: mesh.internalForces.val,
    designs: geometry.designs.val,
  });

  const subscribers = new Set<(results: Results) => void>();
  const subscribe = (callback: (results: Results) => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  runAnalysis({
    geometry,
    components,
    mesh,
    display,
    analysisStatus,
    activeAnalysis,
    templates,
  });

  // A run ends when it writes the status (loading runs aside); designs derive
  // from its forces in the same flush, so read them a tick later
  let first = true;
  const firstRun = new Promise<void>((resolve) => {
    van.derive(() => {
      const status = analysisStatus.val;
      if (status.loading) return;
      setTimeout(() => {
        if (first) {
          first = false;
          resolve();
        }
        const results = getAll();
        subscribers.forEach((callback) => callback(results));
      });
    });
  });
  await firstRun;

  const next = () =>
    new Promise<Results>((resolve) => {
      const unsubscribe = subscribe((results) => {
        unsubscribe();
        resolve(results);
      });
    });

  return {
    getAll,
    subscribe,
    next,

    setModel(model) {
      // Keep the active load case or combination across edits when it still exists
      // (`null`, every load applied, stays `null`)
      const allLoads = display.activeLoadSelection.val === null;
      const activeName = getActiveLoadName(display, caseIds, combinationIds);
      const fresh = createGeometry(model);
      const created = createComponents(model);
      caseIds = created.loadCaseIds;
      combinationIds = getCombinationIds(created.components.val);
      loadCaseIds.clear();
      created.loadCaseIds.forEach((id, name) => loadCaseIds.set(name, id));

      geometry.points.val = fresh.points.val;
      geometry.lines.val = fresh.lines.val;
      geometry.polygons.val = fresh.polygons.val;
      components.val = created.components.val;
      const keptCase = activeName !== null ? caseIds.get(activeName) : undefined;
      const keptCombination =
        activeName !== null ? combinationIds.get(activeName) : undefined;
      const firstCase = [...caseIds.values()][0];
      display.activeLoadSelection.val = allLoads
        ? null
        : keptCase
        ? { kind: "case", id: keptCase }
        : keptCombination
          ? { kind: "combination", id: keptCombination }
          : firstCase
            ? { kind: "case", id: firstCase }
            : null;
    },

    setParams(componentName, params) {
      let found = false;
      const map = new Map(components.val);
      map.forEach((entries, type) => {
        map.set(
          type,
          entries.map((e) => {
            if (e.name !== componentName) return e;
            found = true;
            return { ...e, params: { ...e.params, ...params } };
          }),
        );
      });
      if (!found) throw new Error(`Unknown component "${componentName}".`);
      components.val = map;
    },

    setAnalysis(analysis) {
      activeAnalysis.val = analysis;
    },

    setActiveLoad(name) {
      if (name === null) {
        display.activeLoadSelection.val = null;
        return;
      }
      const caseId = caseIds.get(name);
      if (caseId) {
        display.activeLoadSelection.val = { kind: "case", id: caseId };
        return;
      }
      const combinationId = combinationIds.get(name);
      if (combinationId) {
        display.activeLoadSelection.val = {
          kind: "combination",
          id: combinationId,
        };
        return;
      }
      throw new Error(`Unknown load case or combination "${name}".`);
    },

    states: {
      geometry,
      components,
      mesh,
      display,
      analysisStatus,
      activeAnalysis,
    },
    loadCaseIds,
    templates,
  };
}

function hasPolygons(config: AppConfig): boolean {
  const polygons = config.polygons;
  if (!polygons) return false;
  return polygons instanceof Map ? polygons.size > 0 : polygons.length > 0;
}

// Load combination name -> id; combinations get uuids in createComponents
function getCombinationIds(components: Components["val"]): Map<string, string> {
  const ids = new Map<string, string>();
  components.forEach((entries) =>
    entries.forEach((e) => {
      if (e.templateId === "load-combination" && e.id) ids.set(e.name, e.id);
    }),
  );
  return ids;
}

function getActiveLoadName(
  display: Display,
  caseIds: LoadCaseIds,
  combinationIds: Map<string, string>,
): string | null {
  const selection = display.activeLoadSelection.val;
  if (!selection) return null;
  const ids = selection.kind === "case" ? caseIds : combinationIds;
  for (const [name, id] of ids) if (id === selection.id) return name;
  return null;
}
