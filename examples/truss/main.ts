import van from "vanjs-core";
import {
  Components,
  getMesh,
  getLoads,
  getSupports,
  getElementsProps,
  getReport,
  getPositions,
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
      [2, [-1, 0, 0]],
      [3, [1, 0, 0]],
      [4, [3, 0, 0]],
      [5, [-2.0, 1.5, 0]],
      [6, [0.0, 1.5, 0]],
      [7, [2.0, 1.5, 0]],
    ])
  ),
  lines: van.state(
    new Map([
      [1, [1, 2]],
      [2, [2, 3]],
      [3, [3, 4]],
      [4, [5, 6]],
      [5, [6, 7]],
      [6, [1, 5]],
      [7, [7, 4]],
      [8, [5, 2]],
      [9, [2, 6]],
      [10, [6, 3]],
      [11, [3, 7]],
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
};

export const components: Components = van.state(
  new Map([
    [
      ComponentsType.MESH,
      [
        {
          name: "Top Chords",
          templateIndex: 0,
          geometry: [4, 5],
          params: { divisions: 3 },
        },
        {
          name: "Bottom Chords",
          templateIndex: 0,
          geometry: [1, 2, 3],
          params: { divisions: 3 },
        },
        {
          name: "Webs",
          templateIndex: 0,
          geometry: [6, 7, 8, 9, 10, 11],
          params: { divisions: 5 },
        },
      ],
    ],
    [
      ComponentsType.LOADS,
      [
        {
          name: "Point Load at Node 5",
          templateIndex: 0,
          geometry: [5],
          params: { Fx: 0, Fy: -1000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "Point Load at Node 6",
          templateIndex: 0,
          geometry: [6],
          params: { Fx: 0, Fy: -1500, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "Point Load at Node 7",
          templateIndex: 0,
          geometry: [7],
          params: { Fx: 0, Fy: -1000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
      ],
    ],
    [
      ComponentsType.SUPPORTS,
      [
        {
          name: "Left Support",
          templateIndex: 0,
          geometry: [1],
          params: {
            Ux: true,
            Uy: true,
            Uz: true,
            Rx: false,
            Ry: false,
            Rz: false,
          },
        },
        {
          name: "Right Support",
          templateIndex: 0,
          geometry: [4],
          params: {
            Ux: false,
            Uy: true,
            Uz: true,
            Rx: false,
            Ry: false,
            Rz: false,
          },
        },
      ],
    ],
    [
      ComponentsType.DESIGN,
      [
        {
          name: "EN RC Column",
          templateIndex: 0,
          geometry: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          params: {
            width: 1,
            depth: 1,
            concreteGrade: "C30",
            steelGrade: "S400",
            steelArea: 400,
            cover: 40,
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
    components: components.val, // Todo: get components from design components
  });

  mesh.elementsProps = elementsPropsData.elementsProps;
});

// Positions events
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
    canvas.val = getReport({ components: components.val });
  } else {
    canvas.val = null;
  }
});

export const display: Display = {
  grid: {
    size: van.state(10),
    division: van.state(20),
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
    toolbar: [getCanvasBar({ canvasButton })],
    canvas: getCanvas({ canvas, canvasButton }),
    components: getComponents({
      geometry,
      components,
      componentsBarMode,
    }),
    tooltips: getTooltips(),
  })
);
