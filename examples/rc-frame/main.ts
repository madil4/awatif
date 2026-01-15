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

/**
 * Two-dimensional reinforced concrete single-bay, two-storey frame
 *
 * Geometry:
 * - Storey height: 3.0 m
 * - Bay width: 6.0 m
 * - Columns: 300 × 300 mm
 * - Beams: 300 × 500 mm
 * - Column bases: fixed
 * - Beam–column joints: rigid
 *
 * Materials:
 * - Concrete: C30/37
 * - Reinforcement steel: B500
 */

// Frame geometry - 2D frame in XY plane
export const geometry: Geometry = {
  points: van.state(
    new Map([
      // Base level (y = 0)
      [1, [0, 0, 0]], // Left column base
      [2, [6, 0, 0]], // Right column base
      // First floor (y = 3)
      [3, [0, 3, 0]], // Left column at 1st floor
      [4, [6, 3, 0]], // Right column at 1st floor
      // Second floor / roof (y = 6)
      [5, [0, 6, 0]], // Left column at 2nd floor
      [6, [6, 6, 0]], // Right column at 2nd floor
    ])
  ),
  lines: van.state(
    new Map([
      // Columns (vertical members)
      [1, [1, 3]], // Left column, ground to 1st floor
      [2, [2, 4]], // Right column, ground to 1st floor
      [3, [3, 5]], // Left column, 1st to 2nd floor
      [4, [4, 6]], // Right column, 1st to 2nd floor
      // Beams (horizontal members)
      [5, [3, 4]], // Beam at 1st floor
      [6, [5, 6]], // Beam at 2nd floor (roof)
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
          geometry: [1, 2, 3, 4], // All column lines
          params: { divisions: 1 },
        },
        {
          name: "Beams",
          templateIndex: 0,
          geometry: [5, 6], // All beam lines
          params: { divisions: 1 },
        },
      ],
    ],
    [
      ComponentsType.LOADS,
      [
        // Vertical loads - representing permanent + variable loads
        // First floor loads (distributed load converted to nodal: ~30 kN/m * 6m / 2 = 90 kN per node)
        {
          name: "1st Floor Load - Left",
          templateIndex: 0,
          geometry: [3],
          params: { Fx: 0, Fy: -90000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "1st Floor Load - Right",
          templateIndex: 0,
          geometry: [4],
          params: { Fx: 0, Fy: -90000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        // Second floor / roof loads
        {
          name: "2nd Floor Load - Left",
          templateIndex: 0,
          geometry: [5],
          params: { Fx: 0, Fy: -60000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        {
          name: "2nd Floor Load - Right",
          templateIndex: 0,
          geometry: [6],
          params: { Fx: 0, Fy: -60000, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
        // Horizontal load at roof - simulates wind or initial imperfection for sway
        {
          name: "Horizontal Load (Sway)",
          templateIndex: 0,
          geometry: [5],
          params: { Fx: 5000, Fy: 0, Fz: 0, Mx: 0, My: 0, Mz: 0 },
        },
      ],
    ],
    [
      ComponentsType.SUPPORTS,
      [
        // Fixed supports at column bases (all DOF restrained)
        {
          name: "Left Column Base (Fixed)",
          templateIndex: 0,
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
        {
          name: "Right Column Base (Fixed)",
          templateIndex: 0,
          geometry: [2],
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
        // Columns: 300 × 300 mm, C30/37
        {
          name: "RC Column 300x300",
          templateIndex: 0,
          geometry: [1, 2, 3, 4], // All columns
          params: {
            width: 300,
            depth: 300,
            concreteGrade: "C30",
            steelGrade: "B500",
            steelArea: 1256, // 4Ø20 bars
            cover: 35,
          },
        },
        // Beams: 300 × 500 mm, C30/37
        {
          name: "RC Beam 300x500",
          templateIndex: 0,
          geometry: [5, 6], // All beams
          params: {
            width: 300,
            depth: 500,
            concreteGrade: "C30",
            steelGrade: "B500",
            steelArea: 1570, // 5Ø20 bars
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

// Internal forces calculation
van.derive(() => {
  // Get displacements from linear analysis
  const displacements = getDisplacements(
    mesh.nodes.val,
    mesh.elements.val,
    mesh.loads,
    mesh.supports,
    mesh.elementsProps
  );

  // Calculate internal forces
  const forces = getInternalForces(
    mesh.nodes.val,
    mesh.elements.val,
    displacements,
    mesh.elementsProps
  );

  // Store in mesh
  if (mesh.internalForces) {
    mesh.internalForces.val = forces;
  }

  // Store displacements in mesh for future use
  mesh.displacements = displacements;

  // Log internal forces for each element (for debugging/verification)
  console.log("\n=== Internal Forces (Linear Analysis) ===");
  forces.forEach((elementForces, elementIndex) => {
    const element = mesh.elements.val[elementIndex];
    console.log(
      `\nElement ${elementIndex} (nodes ${element[0]} → ${element[1]}):`
    );
    console.log(
      `  Axial (N):     start = ${(elementForces.N[0] / 1000).toFixed(
        2
      )} kN, end = ${(elementForces.N[1] / 1000).toFixed(2)} kN`
    );
    console.log(
      `  Shear-Y (Vy):  start = ${(elementForces.Vy[0] / 1000).toFixed(
        2
      )} kN, end = ${(elementForces.Vy[1] / 1000).toFixed(2)} kN`
    );
    console.log(
      `  Shear-Z (Vz):  start = ${(elementForces.Vz[0] / 1000).toFixed(
        2
      )} kN, end = ${(elementForces.Vz[1] / 1000).toFixed(2)} kN`
    );
    console.log(
      `  Moment-Z (Mz): start = ${(elementForces.Mz[0] / 1000).toFixed(
        2
      )} kNm, end = ${(elementForces.Mz[1] / 1000).toFixed(2)} kNm`
    );
  });
  console.log("\n");
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
