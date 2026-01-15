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
  Geometry,
  Mesh,
  ComponentsType,
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

export const geometry: Geometry = {
  points: van.state(
    new Map([
      [1, [-3, 0, 0]],
      [2, [3, 0, 0]],
      [3, [-3, 3, 0]],
      [4, [3, 3, 0]],
      [5, [-3, 6, 0]],
      [6, [3, 6, 0]],
    ])
  ),
  lines: van.state(
    new Map([
      [1, [1, 3]],
      [2, [2, 4]],
      [3, [3, 5]],
      [4, [4, 6]],
      [5, [3, 4]],
      [6, [5, 6]],
    ])
  ),
  selection: van.state(null),
};

export const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  geometryMapping: van.state({
    pointToNodes: new Map(),
    lineToElements: new Map(),
  }),
  internalForces: van.state(new Map()),
};

export const components: Components = van.state(
  new Map([
    [
      ComponentsType.MESH,
      [
        {
          name: "Columns",
          templateIndex: 0,
          geometry: [1, 2, 3, 4],
          params: { divisions: 1 },
        },
        {
          name: "Beams",
          templateIndex: 0,
          geometry: [5, 6],
          params: { divisions: 1 },
        },
      ],
    ],
    [
      ComponentsType.LOADS,
      [
        {
          name: "1st Floor Load",
          templateIndex: 0,
          geometry: [3, 4],
          params: { Fx: 0, Fy: -90000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "2nd Floor Load",
          templateIndex: 0,
          geometry: [5, 6],
          params: { Fx: 0, Fy: -60000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "Horizontal Load (Sway)",
          templateIndex: 0,
          geometry: [5, 3],
          params: { Fx: 5000, Fy: 0, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
      ],
    ],
    [
      ComponentsType.SUPPORTS,
      [
        {
          name: "Column Base (Fixed)",
          templateIndex: 0,
          geometry: [1, 2],
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
          name: "RC Column 300x300",
          templateIndex: 0,
          geometry: [1, 2, 3, 4],
          params: {
            width: 300,
            depth: 300,
            concreteGrade: "C30",
            steelGrade: "B500",
            steelArea: 1256, // 4Ø20 bars
            cover: 35,
          },
        },
      ],
    ],
  ])
);

// Mesh events
van.derive(() => {
  const meshData = getMesh({
    geometry: {
      points: geometry.points.val,
      lines: geometry.lines.val,
    },
    components: components.val,
  });

  mesh.nodes.val = meshData.nodes;
  mesh.elements.val = meshData.elements;
  mesh.geometryMapping.val = meshData.geometryMapping;
});

// Loads events
van.derive(() => {
  const loadsData = getLoads({
    geometryMapping: mesh.geometryMapping.val,
    components: components.val,
  });

  mesh.loads = loadsData.loads;
});

// Supports events
van.derive(() => {
  const supportsData = getSupports({
    geometryMapping: mesh.geometryMapping.val,
    components: components.val,
  });

  mesh.supports = supportsData.supports;
});

// Elements properties events
van.derive(() => {
  const elementsPropsData = getElementsProps({
    geometryMapping: mesh.geometryMapping.val,
    components: components.val,
  });

  mesh.elementsProps = elementsPropsData.elementsProps;
});

// Positions events (linear analysis)
van.derive(() => {
  const positions = getPositions(
    mesh.nodes.val,
    mesh.elements.val,
    mesh.loads,
    mesh.supports,
    mesh.elementsProps
  );

  mesh.positions = positions;
});

// Internal forces events
van.derive(() => {
  const displacements = getDisplacements(
    mesh.nodes.val,
    mesh.elements.val,
    mesh.loads,
    mesh.supports,
    mesh.elementsProps
  );

  const forces = getInternalForces(
    mesh.nodes.val,
    mesh.elements.val,
    displacements,
    mesh.elementsProps
  );

  if (mesh.internalForces) mesh.internalForces.val = forces;
  mesh.displacements = displacements;
});

// Components events
export const componentsBarMode = van.state<ComponentsType | null>(null);

van.derive(() => {
  if (componentsBarMode.val === ComponentsType.MESH) display.mesh.val = true;
  if (componentsBarMode.val === ComponentsType.LOADS) display.loads.val = true;
  if (componentsBarMode.val === ComponentsType.SUPPORTS)
    display.supports.val = true;
});

// Canvas events
export const canvasButton = van.state<CanvasButtons | null>(null);
export const canvas = van.state<HTMLDivElement | null>(null);

van.derive(() => {
  if (canvasButton.val === CanvasButtons.REPORT) {
    canvas.val = getReport({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      internalForces: mesh.internalForces?.val,
    });
  } else {
    canvas.val = null;
  }
});

export const display: Display = {
  grid: {
    size: van.state(15),
    division: van.state(30),
  },
  geometry: van.state(true),
  mesh: van.state(true),
  deformedShape: van.state(true),
  loads: van.state(true),
  supports: van.state(true),
};

document.body.append(
  getLayout({
    display: getDisplay({ display }),
    viewer: getViewer({ geometry, mesh, components, display }),
    header: [getCanvasBar({ canvasButton })],
    canvas: getCanvas({ canvas, canvasButton }),
    components: getComponents({
      geometry,
      components,
      componentsBarMode,
    }),
    tooltips: getTooltips(),
  })
);
