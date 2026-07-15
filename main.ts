// Positions are in meters and forces are in Kilo-Newton,
// everything else propogate from these two assumptions
import van from "vanjs-core";
import {
  Components,
  getMesh,
  getLoads,
  getSupports,
  getReleases,
  getElementsProps,
  getReport,
  getPositionsAndForcesCpp,
  getNlPositionsAndForcesRemote,
  initPositionsAndForcesCpp,
  initTriangleMesh,
  getReactions,
  getDesigns,
  Geometry,
  Mesh,
  ComponentsType,
  LoadSelection,
  templates,
} from "@awatif/components";
import {
  getDisplay,
  getLayout,
  getViewer,
  getComponents,
  Display,
  getCanvas,
  getCanvasBar,
  AnalysisStatus,
  setupUndo,
} from "@awatif/ui";

await initPositionsAndForcesCpp();
await initTriangleMesh();

const geometry: Geometry = {
  points: van.state(
    new Map([
      [1, [3.5, 0, 2]],
      [2, [3.5, 0, 8]],
      [3, [5.5, 0, 2]],
      [4, [6.5, 0, 2]],
      [5, [6.5, 0, 8]],
      [6, [5.5, 0, 8]],
    ]),
  ),
  lines: van.state(new Map([[1, [1, 2]]])),
  polygons: van.state(new Map([[1, [3, 4, 5, 6]]])),
  selection: van.state(null),
  designs: van.state(new Map()),
};

const components: Components = van.state(
  new Map([
    [
      ComponentsType.LOADS,
      [
        {
          name: "Axial + Transverse Load",
          templateId: "point-load",
          geometry: [2],
          params: {
            Fx: 10,
            Fy: 0,
            Fz: -500,
            Mx: 0,
            My: 0,
            Mz: 0,
          },
          loadCase: "dead",
        },
        {
          name: "Wall Load",
          templateId: "point-load",
          geometry: [6],
          params: {
            Fx: 150,
            Fy: 0,
            Fz: -500,
            Mx: 0,
            My: 0,
            Mz: 0,
          },
          loadCase: "dead",
        },
      ],
    ],
    [
      ComponentsType.SUPPORTS,
      [
        {
          name: "Fixed Support",
          templateId: "point-support",
          geometry: [1, 3, 4],
          params: {
            type: "fixed",
          },
        },
      ],
    ],
    [
      ComponentsType.MESH,
      [
        {
          name: "Line Mesh",
          templateId: "line-mesh",
          geometry: [1],
          params: {
            divisions: 8,
          },
        },
        {
          name: "Triangle Mesh",
          templateId: "triangle-mesh",
          geometry: [1], // polygon id
          params: {
            maxTriangleArea: 0.2,
          },
        },
      ],
    ],
    [
      ComponentsType.DESIGN,
      [
        {
          name: "Concrete Frame",
          templateId: "concrete-member",
          geometry: [1],
        },
        {
          name: "Generic Shell",
          templateId: "generic-shell",
          geometry: [1], // polygon id
        },
      ],
    ],
  ]),
);

const display: Display = {
  grid: {
    size: van.state(10),
    spacing: van.state(0.5),
  },
  displayScale: van.state(1),
  deformationScale: van.state(50),
  view2D: van.state(true),
  geometry: van.state(true),
  mesh: van.state(true),
  deformedShape: van.state(true),
  loads: van.state(true),
  supports: van.state(true),
  releases: van.state(true),
  lineIndex: van.state(false),
  pointIndex: van.state(false),
  orientation: van.state(false),
  extrude: van.state(false),
  pointResult: van.state("None"),
  lineResult: van.state("None"),
  loadCase: van.state<LoadSelection>("dead"),
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  geometryMapping: van.state({
    pointToNodes: new Map(),
    lineToElements: new Map(),
    polygonToElements: new Map(),
  }),
  loads: van.state(new Map()),
  supports: van.state(new Map()),
  releases: van.state(new Map()),
  elementsProps: van.state(new Map()),
  positions: van.state([]),
  displacements: van.state([]),
  reactions: van.state([]),
  internalForces: van.state(new Map()),
};

const analysisStatus: AnalysisStatus = van.state({ success: true });
const activeAnalysis = van.state<"linear" | "nonlinear">("linear");

setupUndo({ geometry, components });

// Events
// Analysis events
let latestAnalysis = 0;

van.derive(async () => {
  const analysis = ++latestAnalysis;
  const assignedLineIds = new Set<number>();
  (components.val.get(ComponentsType.DESIGN) ?? []).forEach((c) => {
    // Only line-kind design components reference line IDs (polygon designs
    // reference polygon IDs, an independent number space)
    const template = templates.get(ComponentsType.DESIGN)?.get(c.templateId);
    if (template?.geometryKind !== "line") return;
    c.geometry.forEach((id) => assignedLineIds.add(id));
  });
  const unassignedLines = [...geometry.lines.val.keys()].filter(
    (id) => !assignedLineIds.has(id),
  );
  const warningPayload = unassignedLines.length > 0 ? { unassignedLines } : {};

  try {
    // Mesh events
    const meshData = getMesh({
      geometry: {
        points: geometry.points.val,
        lines: geometry.lines.val,
        polygons: geometry.polygons.val,
      },
      components: components.val,
      templates,
    });

    mesh.nodes.val = meshData.nodes;
    mesh.elements.val = meshData.elements;
    mesh.geometryMapping.val = meshData.geometryMapping;

    // Loads events
    mesh.loads.val = getLoads({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      templates,
      activeLoadCase: display.loadCase?.val,
      nodes: mesh.nodes.val,
      elements: mesh.elements.val,
    });

    // Supports events
    mesh.supports.val = getSupports({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      templates,
    });

    // Releases events
    mesh.releases.val = getReleases({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      templates,
    });

    // Elements properties events
    mesh.elementsProps.val = getElementsProps({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      templates,
      elements: mesh.elements.val,
    });

    // Positions events
    const selectedAnalysis = activeAnalysis.val;
    const hasShells = mesh.elements.val.some((e) => e.length === 3);
    if (selectedAnalysis === "nonlinear" && hasShells)
      throw new Error("Nonlinear analysis does not support shell elements");
    if (selectedAnalysis === "nonlinear") {
      analysisStatus.val = {
        success: true,
        loading: true,
        ...warningPayload,
      };
    }

    const result: {
      positions: Mesh["positions"]["val"];
      internalForces: Mesh["internalForces"]["val"];
      iterationCount?: number;
    } =
      selectedAnalysis === "nonlinear"
        ? await getNlPositionsAndForcesRemote(
          mesh.nodes.val,
          mesh.elements.val,
          mesh.loads.val,
          mesh.supports.val,
          mesh.elementsProps.val,
          mesh.releases.val,
        )
        : getPositionsAndForcesCpp(
          mesh.nodes.val,
          mesh.elements.val,
          mesh.loads.val,
          mesh.supports.val,
          mesh.elementsProps.val,
          mesh.releases.val,
        );

    if (analysis !== latestAnalysis) return;

    mesh.positions.val = result.positions;
    mesh.internalForces.val = result.internalForces;
    mesh.reactions.val = getReactions(
      mesh.nodes.val,
      mesh.elements.val,
      mesh.internalForces.val,
      mesh.loads.val,
      mesh.supports.val,
    );

    analysisStatus.val = {
      success: true,
      iterations:
        selectedAnalysis === "nonlinear" ? result.iterationCount : undefined,
      ...warningPayload,
    };
  } catch (e) {
    if (analysis !== latestAnalysis) return;

    mesh.positions.val = [];
    mesh.displacements.val = [];
    mesh.reactions.val = [];
    mesh.internalForces.val = new Map();

    analysisStatus.val = { success: false, ...warningPayload };
  }
});

// Designs events
van.derive(() => {
  geometry.designs.val = getDesigns({
    mesh: {
      nodes: mesh.nodes.val,
      elements: mesh.elements.val,
      geometryMapping: mesh.geometryMapping.val,
      internalForces: mesh.internalForces.val,
    },
    components: components.val,
    templates,
  });
});

// Components events
const componentsBarMode = van.state<ComponentsType | null>(null);
van.derive(() => {
  if (componentsBarMode.val === ComponentsType.LOADS) display.loads.val = true;
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
      templates,
      activeLoadCase: display.loadCase?.val,
    });
  } else {
    display.lineIndex.val = false;

    canvas.val = null;
  }
});

// HTML structure
document.body.append(
  getLayout({
    viewer: getViewer({ geometry, mesh, components, display, templates }),
    display: getDisplay({ display }),
    header: [
      getCanvasBar({
        canvasButton,
        buttons: ["Report"],
      }),
    ],
    canvas: getCanvas({ canvas, canvasButton }),
    components: getComponents({
      geometry,
      components,
      componentsBarMode,
      templates,
      analysisStatus,
      activeAnalysis,
      display,
    }),
  }),
);
