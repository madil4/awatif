import van, { type State } from "vanjs-core";
import {
  ComponentsType,
  getReport,
  initPositionsAndForcesCpp,
  initTriangleMesh,
  resolveTemplates,
  type Components,
  type Geometry,
  type Mesh,
} from "@awatif/components";
import {
  getCanvas,
  getCanvasBar,
  getComponents,
  getDisplay,
  getLayout,
  getViewer,
  setupUndo,
  type AnalysisStatus,
  type Display,
} from "@awatif/ui";
import type { AppConfig } from "./data-model";
import { createStates, type LoadCaseIds } from "./createStates";
import { runAnalysis } from "./runAnalysis";

export type App = {
  element: HTMLElement;
  geometry: Geometry;
  components: Components;
  mesh: Mesh;
  display: Display;
  analysisStatus: AnalysisStatus;
  activeAnalysis: State<"linear" | "nonlinear">;
  // Load case name -> id, for reading or rewriting components afterwards
  loadCaseIds: LoadCaseIds;
};

// Everything a structural model needs to become a running app: state, the
// analysis pipeline, and the mounted UI.
//
// Positions are in meters and forces are in Kilo-Newton, everything else
// propagates from these two assumptions.
export async function createApp(config: AppConfig = {}): Promise<App> {
  await initPositionsAndForcesCpp();
  await initTriangleMesh();

  // Built-in components plus whatever the app's plugins bring; from here on
  // nothing distinguishes the two
  const componentTemplates = resolveTemplates(config.plugins);

  const { geometry, components, display, mesh, loadCaseIds } =
    createStates(config);

  const analysisStatus: AnalysisStatus = van.state({ success: true });
  const activeAnalysis = van.state<"linear" | "nonlinear">(
    config.analysis ?? "linear",
  );

  setupUndo({ geometry, components });

  runAnalysis({
    geometry,
    components,
    mesh,
    display,
    analysisStatus,
    activeAnalysis,
    templates: componentTemplates,
  });

  // Components events
  const componentsBarMode = van.state<ComponentsType | null>(null);
  van.derive(() => {
    if (
      componentsBarMode.val === ComponentsType.LOADS ||
      componentsBarMode.val === ComponentsType.LOAD_CASES
    )
      display.loads.val = true;
    if (componentsBarMode.val === ComponentsType.SUPPORTS)
      display.supports.val = true;
  });

  // Canvas events
  const canvas = van.state<HTMLDivElement | null>(null);
  const canvasButton = van.state<string | null>(null);
  van.derive(() => {
    if (canvasButton.val === "Report") {
      display.lineIndex.val = true;

      canvas.val = getReport({
        components: components.val,
        geometryMapping: mesh.geometryMapping.val,
        internalForces: mesh.internalForces.val,
        designs: geometry.designs.val,
        templates: componentTemplates,
        activeSelection: display.activeLoadSelection?.val,
      });
    } else {
      display.lineIndex.val = false;

      canvas.val = null;
    }
  });

  // HTML structure
  const element = getLayout({
    viewer: getViewer({
      geometry,
      mesh,
      components,
      display,
      templates: componentTemplates,
    }),
    display: getDisplay({ display, components }),
    header: [
      getCanvasBar({
        canvasButton,
        buttons: config.canvasButtons ?? ["Report"],
      }),
    ],
    canvas: getCanvas({ canvas, canvasButton }),
    components: getComponents({
      geometry,
      components,
      componentsBarMode,
      templates: componentTemplates,
      analysisStatus,
      activeAnalysis,
      display,
    }),
  });

  // `container: null` hands the element back unmounted
  if (config.container !== null) (config.container ?? document.body).append(element);

  return {
    element,
    geometry,
    components,
    mesh,
    display,
    analysisStatus,
    activeAnalysis,
    loadCaseIds,
  };
}
