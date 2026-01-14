import van from "vanjs-core";
import {
  Components,
  getMesh,
  getLoads,
  getSupports,
  getPositions,
  Geometry,
  Mesh,
} from "@awatif/components";
import {
  getDisplay,
  getTooltips,
  getLayout,
  getViewer,
  ToolbarMode,
  getToolbar,
  getComponents,
  getParameters,
  Display,
  getReport,
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
  geometryMapping: {
    pointToNodes: new Map(),
    lineToElements: new Map(),
  },
};

export const components: Components = van.state(
  new Map([
    [
      "MESH",
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
      "LOADS",
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
      "SUPPORTS",
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
  mesh.geometryMapping = meshData.geometryMapping;
});

// Loads events
van.derive(() => {
  if (!mesh.geometryMapping) return;
  mesh.nodes.val; // to trigger re-assigning of geometryMapping

  const loadsData = getLoads({
    geometryMapping: mesh.geometryMapping,
    components: components.val,
  });

  mesh.loads = loadsData.loads;
});

// Supports events
van.derive(() => {
  if (!mesh.geometryMapping) return;
  mesh.nodes.val; // to trigger re-assigning of geometryMapping

  const supportsData = getSupports({
    geometryMapping: mesh.geometryMapping,
    components: components.val,
  });

  mesh.supports = supportsData.supports;
});

// Positions events
van.derive(() => {
  if (!mesh.nodes.val || !mesh.elements.val) return;
  if (!mesh.loads || !mesh.supports) return;

  const defaultProps = {
    elasticity: 50e6,
    area: 0.001,
    momentInertia: 8.333e-8,
    shearModulus: 79.3e6,
    torsionalConstant: 1.4e-7,
  };

  const elementsPropsMap = new Map<number, typeof defaultProps>();
  mesh.elements.val.forEach((_, index) => {
    elementsPropsMap.set(index, defaultProps);
  });

  const positions = getPositions(
    mesh.nodes.val,
    mesh.elements.val,
    mesh.loads,
    mesh.supports,
    elementsPropsMap
  );

  mesh.positions = positions;
});

// Toolbar events
export const toolbarMode = van.state<ToolbarMode | null>(null);

van.derive(() => {
  if (toolbarMode.val === ToolbarMode.MESH) display.mesh.val = true;
  if (toolbarMode.val === ToolbarMode.LOADS) display.loads.val = true;
  if (toolbarMode.val === ToolbarMode.SUPPORTS) display.supports.val = true;
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
export const activeComponent = van.state<number | null>(null);
export const report = getReport();

document.body.append(
  getLayout({
    header: [report.button],
    display: getDisplay({ display }),
    components: getComponents({
      toolbarMode,
      geometry,
      components,
      activeComponent,
    }),
    toolbar: getToolbar({ toolbarMode }),
    parameters: getParameters({
      components,
      activeComponent,
      toolbarMode,
    }),
    tooltips: getTooltips(),
    viewer: getViewer({ geometry, mesh, components, display }),
    canvas: report.panel,
  })
);
