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
  getPositions,
  getDisplacements,
  getInternalForces,
  getDesignResults,
  Geometry,
  Mesh,
  ComponentsType,
  templates,
} from "@awatif/components";
import {
  getDisplay,
  getTooltips,
  getLayout,
  getViewer,
  getComponents,
  Display,
  getCanvas,
  getCanvasBar,
  CanvasButtons,
} from "@awatif/ui";

const geometry: Geometry = {
  points: van.state(
    new Map([
      [1, [0, -3, 0]],
      [2, [0, 3.2, 0]],
    ]),
  ),
  lines: van.state(new Map([[1, [1, 2]]])),
  selection: van.state(null),
  designs: van.state(new Map()),
};

const components: Components = van.state(
  new Map([
    [
      ComponentsType.MESH,
      [
        {
          name: "Line Mesh",
          templateId: "line-mesh",
          geometry: [1],
          params: { divisions: 4 },
        },
      ],
    ],
    [
      ComponentsType.LOADS,
      [
        {
          name: "Axial Load",
          templateId: "point-load",
          geometry: [2],
          params: {
            Fx: 0,
            Fy: -633,
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
          name: "Basic Design",
          templateId: "basic",
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
    division: van.state(20),
  },
  geometry: van.state(true),
  mesh: van.state(true),
  deformedShape: van.state(true),
  loads: van.state(true),
  supports: van.state(true),
  design: van.state(false),
};

// Mesh events
van.derive(() => {
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
});

// Loads events
van.derive(() => {
  mesh.loads.val = getLoads({
    components: components.val,
    geometryMapping: mesh.geometryMapping.val,
    templates,
  });
});

// Supports events
van.derive(() => {
  mesh.supports.val = getSupports({
    components: components.val,
    geometryMapping: mesh.geometryMapping.val,
    templates,
  });
});

// Elements properties events
van.derive(() => {
  mesh.elementsProps.val = getElementsProps({
    components: components.val,
    geometryMapping: mesh.geometryMapping.val,
    templates,
  });
});

// Positions events
van.derive(() => {
  const positions = getPositions(
    mesh.nodes.val,
    mesh.elements.val,
    mesh.loads.val,
    mesh.supports.val,
    mesh.elementsProps.val,
  );

  mesh.positions.val = positions;
});

// Internal forces events
// Todo: Check units
van.derive(() => {
  const displacements = getDisplacements(
    mesh.nodes.val,
    mesh.elements.val,
    mesh.loads.val,
    mesh.supports.val,
    mesh.elementsProps.val,
  );

  const forces = getInternalForces(
    mesh.nodes.val,
    mesh.elements.val,
    displacements,
    mesh.elementsProps.val,
  );

  mesh.internalForces.val = forces;
  mesh.displacements.val = displacements;
});

// Designs events
van.derive(() => {
  mesh.internalForces.val; // Trigger when internal forces change

  if (geometry.designs) {
    geometry.designs.val = getDesignResults({
      mesh,
      components,
      templates,
    });
  }
});

// Components events
const componentsBarMode = van.state<ComponentsType | null>(null);
van.derive(() => {
  if (componentsBarMode.val === ComponentsType.MESH) display.mesh.val = true;
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
      designResults: geometry.designs?.val,
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
    display: getDisplay({ display }),
    viewer: getViewer({ geometry, mesh, components, display, templates }),
    header: [getCanvasBar({ canvasButton })],
    canvas: getCanvas({ canvas, canvasButton }),
    components: getComponents({
      geometry,
      components,
      componentsBarMode,
      templates,
    }),
    tooltips: getTooltips(),
  }),
);
