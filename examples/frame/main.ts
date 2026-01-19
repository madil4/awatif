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
  Design,
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

// Todo: find a better place to import templates
import { lineMesh } from "@awatif/components/mesh/line-mesh/lineMesh";
import { pointLoad } from "@awatif/components/loads/point-load/pointLoad";
import { pointSupport } from "@awatif/components/supports/point-support/pointSupport";
import { basic } from "@awatif/components/design/basic/basic";

export const templates = new Map<ComponentsType, Map<string, any>>([
  [ComponentsType.MESH, new Map([["line-mesh", lineMesh]])],
  [ComponentsType.LOADS, new Map([["point-load", pointLoad]])],
  [ComponentsType.SUPPORTS, new Map([["point-support", pointSupport]])],
  [ComponentsType.DESIGN, new Map([["basic", basic]])],
]);

export const geometry: Geometry = {
  points: van.state(
    new Map([
      [1, [-3, -3, 0]],
      [2, [3, -3, 0]],
      [3, [-3, 0, 0]],
      [4, [3, 0, 0]],
      [5, [-3, 3, 0]],
      [6, [3, 3, 0]],
    ]),
  ),
  lines: van.state(
    new Map([
      [1, [1, 3]],
      [2, [2, 4]],
      [3, [3, 5]],
      [4, [4, 6]],
      [5, [3, 4]],
      [6, [5, 6]],
    ]),
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
          templateId: "line-mesh",
          geometry: [1, 2, 3, 4],
          params: { divisions: 8 },
        },
        {
          name: "Beams",
          templateId: "line-mesh",
          geometry: [5, 6],
          params: { divisions: 4 },
        },
      ],
    ],
    [
      ComponentsType.LOADS,
      [
        {
          name: "1st Floor Load",
          templateId: "point-load",
          geometry: [3, 4],
          params: { Fx: 0, Fy: -90000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "2nd Floor Load",
          templateId: "point-load",
          geometry: [5, 6],
          params: { Fx: 0, Fy: -60000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "Horizontal Load (Sway)",
          templateId: "point-load",
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
          templateId: "point-support",
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
          name: "Beam 200x400",
          templateId: "basic", // basic template
          geometry: [1, 2, 3, 4, 5, 6],
          params: {
            elasticity: 30, // GPa (C30 concrete)
            area: 80000, // mm² (200x400mm)
            momentInertia: 1066666667, // mm⁴ (200x400mm beam)
            shearModulus: 12.5, // GPa (concrete)
            torsionalConstant: 533333333, // mm⁴ (approx for 200x400mm)
          },
        },
      ],
    ],
  ]),
);

export const design: Design = {
  designResults: van.state(new Map()),
};

export const display: Display = {
  grid: {
    size: van.state(10),
    division: van.state(30),
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
  const loadsData = getLoads({
    geometryMapping: mesh.geometryMapping.val,
    components: components.val,
    templates,
  });

  mesh.loads = loadsData.loads;
});

// Supports events
van.derive(() => {
  const supportsData = getSupports({
    geometryMapping: mesh.geometryMapping.val,
    components: components.val,
    templates,
  });

  mesh.supports = supportsData.supports;
});

// Elements properties events
van.derive(() => {
  const elementsPropsData = getElementsProps({
    geometryMapping: mesh.geometryMapping.val,
    components: components.val,
    templates,
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
    mesh.elementsProps,
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
    mesh.elementsProps,
  );

  const forces = getInternalForces(
    mesh.nodes.val,
    mesh.elements.val,
    displacements,
    mesh.elementsProps,
  );

  if (mesh.internalForces) mesh.internalForces.val = forces;
  mesh.displacements = displacements;
});

// Design results events
van.derive(() => {
  mesh.internalForces?.val; // Trigger when internal forces change

  design.designResults.val = getDesignResults({
    mesh,
    components,
    templates,
  });
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
    display.design.val = true;
    canvas.val = getReport({
      components: components.val,
      geometryMapping: mesh.geometryMapping.val,
      internalForces: mesh.internalForces?.val,
      designResults: design.designResults.val,
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
