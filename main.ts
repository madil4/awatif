// Positions are in meters and forces are in Kilo-Newton,
// everything else propogate from these two assumptions
import van from "vanjs-core";
import {
  Components,
  getMesh,
  getLoads,
  getSupports,
  getElementsProps,
  getReport,
  getPositionsAndForces,
  getDesigns,
  Geometry,
  Mesh,
  ComponentsType,
  templates,
} from "@awatif/components";
import {
  getDisplay,
  getTooltips,
  getAnalysisStatus,
  getLayout,
  getViewer,
  getComponents,
  Display,
  getCanvas,
  getCanvasBar,
  CanvasButtons,
  AnalysisStatus,
} from "@awatif/ui";

const geometry: Geometry = {
  points: van.state(
    new Map([
      [1, [5, 2, 0]],
      [2, [5, 8, 0]],
    ]),
  ),
  lines: van.state(new Map([[1, [1, 2]]])),
  selection: van.state(null),
  designs: van.state(new Map()),
};

const components: Components = van.state(
  new Map([
    [
      ComponentsType.LOADS,
      [
        {
          name: "Lateral Load",
          templateId: "point-load",
          geometry: [2],
          params: {
            Fx: 400,
            Fy: 0,
            Fz: 0,
            Mx: 0,
            My: 0,
            Mz: 0,
          },
        },
      ],
    ],
    [
      ComponentsType.SUPPORTS,
      [
        {
          name: "Fixed Support",
          templateId: "point-support",
          geometry: [1],
          params: {
            Ux: true,
            Uy: true,
            Uz: true,
            Rx: true,
            Ry: true,
            Rz: true,
          },
        },
      ],
    ],
    [
      ComponentsType.DESIGN,
      [
        {
          name: "RC Beam",
          templateId: "rc-beam",
          geometry: [1],
        },
      ],
    ],
  ]),
);

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  geometryMapping: van.state({
    pointToNodes: new Map(),
    lineToElements: new Map(),
  }),
  loads: van.state(new Map()),
  supports: van.state(new Map()),
  elementsProps: van.state(new Map()),
  positions: van.state([]),
  displacements: van.state([]),
  internalForces: van.state(new Map()),
};

const display: Display = {
  grid: {
    size: van.state(10),
    spacing: van.state(0.5),
  },
  geometry: van.state(true),
  mesh: van.state(true),
  deformedShape: van.state(true),
  loads: van.state(true),
  supports: van.state(true),
  design: van.state(false),
  lineResult: van.state("Bendings"),
};

const analysisStatus: AnalysisStatus = van.state(true);

// Analysis events
van.derive(() => {
  try {
    // Mesh events
    const meshData = getMesh({
      geometry: {
        points: geometry.points.val,
        lines: geometry.lines.val,
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
    });

    // Supports events
    mesh.supports.val = getSupports({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      templates,
    });

    // Elements properties events
    mesh.elementsProps.val = getElementsProps({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      templates,
    });

    // Positions events
    const { positions, internalForces } = getPositionsAndForces(
      mesh.nodes.val,
      mesh.elements.val,
      mesh.loads.val,
      mesh.supports.val,
      mesh.elementsProps.val,
    );

    mesh.positions.val = positions;
    mesh.internalForces.val = internalForces;

    analysisStatus.val = true;
  } catch (e) {
    mesh.positions.val = [];
    mesh.displacements.val = [];
    mesh.internalForces.val = new Map();

    analysisStatus.val = false;
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
  if (componentsBarMode.val === ComponentsType.DESIGN)
    display.design.val = true;
});

// Canvas events
const canvas = van.state<HTMLDivElement | null>(null);
const canvasButton = van.state<CanvasButtons | null>(null);
van.derive(() => {
  if (canvasButton.val === CanvasButtons.REPORT) {
    display.design.val = true;

    canvas.val = getReport({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      internalForces: mesh.internalForces.val,
      designs: geometry.designs.val,
      templates,
    });
  } else {
    if (componentsBarMode.val !== ComponentsType.DESIGN)
      display.design.val = false;

    canvas.val = null;
  }
});

document.body.append(
  getLayout({
    viewer: getViewer({ geometry, mesh, components, display, templates }),
    display: getDisplay({ display }),
    header: [getCanvasBar({ canvasButton })],
    canvas: getCanvas({ canvas, canvasButton }),
    components: getComponents({
      geometry,
      components,
      componentsBarMode,
      templates,
    }),
    footer: [getAnalysisStatus(analysisStatus), getTooltips()],
  }),
);
