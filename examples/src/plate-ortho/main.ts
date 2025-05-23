import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-fem";
import { getViewer } from "awatif-ui";
import { deform } from "awatif-fem";

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});

// Plate dimensions and material properties - matching analytical.py
const a = 10.0; // m (length in x direction)
const b = 10.0; // m (length in y direction)
const h = 0.15; // m (thickness)
const p0 = 1000.0; // N/m² (pressure)
const E_x = 1.0e10; // Pa (Young's modulus in x direction)
const E_y = 1.0e10; // Pa (Young's modulus in y direction)
const nu_xy = 0.25; // Poisson's ratio
const G_xy = (0.5 * E_x) / (1 + nu_xy); // = 4.0e9 Pa

// Create a refined hardcoded mesh for a rectangular plate
// Using a 5x5 grid of nodes, creating 32 triangular elements

// Generate nodes in a 5x5 grid
const meshNodes: Node[] = [];
const numDivisions = 5;
for (let j = 0; j < numDivisions; j++) {
  for (let i = 0; i < numDivisions; i++) {
    meshNodes.push([
      (i * a) / (numDivisions - 1),
      (j * b) / (numDivisions - 1),
      0,
    ]);
  }
}

// Generate triangular elements
const meshElements: Element[] = [];
for (let j = 0; j < numDivisions - 1; j++) {
  for (let i = 0; i < numDivisions - 1; i++) {
    // Calculate node indices for this grid cell
    const bottomLeft = j * numDivisions + i;
    const bottomRight = bottomLeft + 1;
    const topLeft = (j + 1) * numDivisions + i;
    const topRight = topLeft + 1;

    // Add two triangles for each grid cell
    meshElements.push([bottomLeft, bottomRight, topLeft]);
    meshElements.push([bottomRight, topRight, topLeft]);
  }
}

// Identify boundary nodes (nodes on the edges of the plate)
const boundaryIndices: number[] = [];
for (let i = 0; i < meshNodes.length; i++) {
  const [x, y] = meshNodes[i];
  if (x === 0 || x === a || y === 0 || y === b) {
    boundaryIndices.push(i);
  }
}

// Setup node inputs (supports and loads)
const nodeInputs2: NodeInputs = {
  supports: new Map<
    number,
    [boolean, boolean, boolean, boolean, boolean, boolean]
  >(),
  loads: new Map<number, [number, number, number, number, number, number]>(),
};

// Apply fixed supports at boundary nodes
boundaryIndices.forEach((i) => {
  nodeInputs2.supports!.set(i, [true, true, true, false, false, false]);
});

// Apply equivalent nodal forces for uniform pressure
// For each triangular element:
// 1. Calculate the area
// 2. Calculate the centroid
// 3. Calculate local coordinates relative to centroid
// 4. Apply equivalent nodal forces formula

// Initialize loads for all nodes to zero
for (let i = 0; i < meshNodes.length; i++) {
  nodeInputs2.loads!.set(i, [0, 0, 0, 0, 0, 0]);
}

// Process each element to calculate and apply equivalent nodal forces
meshElements.forEach((element, elemIdx) => {
  // Get the three nodes of the triangle
  const [i, j, k] = element;
  const node1 = meshNodes[i];
  const node2 = meshNodes[j];
  const node3 = meshNodes[k];

  // Calculate the area of the triangle
  const area = calculateTriangleArea(node1, node2, node3);

  // Calculate the centroid of the triangle
  const centroid = [
    (node1[0] + node2[0] + node3[0]) / 3,
    (node1[1] + node2[1] + node3[1]) / 3,
    (node1[2] + node2[2] + node3[2]) / 3,
  ];

  // Calculate local coordinates relative to centroid
  const local1 = [
    node1[0] - centroid[0],
    node1[1] - centroid[1],
    node1[2] - centroid[2],
  ];
  const local2 = [
    node2[0] - centroid[0],
    node2[1] - centroid[1],
    node2[2] - centroid[2],
  ];
  const local3 = [
    node3[0] - centroid[0],
    node3[1] - centroid[1],
    node3[2] - centroid[2],
  ];

  // Calculate equivalent nodal forces for each node
  // For uniform pressure p0:
  // - Transverse force: F = (p0 * area) / 3
  // - Moment about x-axis: Mx = (p0 * area * y) / 12
  // - Moment about y-axis: My = (p0 * area * x) / 12

  const transverseForce = (p0 * area) / 3;

  // Node 1
  const moment1x = (p0 * area * local1[1]) / 12;
  const moment1y = (p0 * area * local1[0]) / 12;

  // Node 2
  const moment2x = (p0 * area * local2[1]) / 12;
  const moment2y = (p0 * area * local2[0]) / 12;

  // Node 3
  const moment3x = (p0 * area * local3[1]) / 12;
  const moment3y = (p0 * area * local3[0]) / 12;

  // Apply forces and moments to nodes (add to existing values)
  // Note: Negative transverse force because pressure acts downward in z-direction

  // Node 1
  const existingLoad1 = nodeInputs2.loads!.get(i) || [0, 0, 0, 0, 0, 0];
  nodeInputs2.loads!.set(i, [
    existingLoad1[0],
    existingLoad1[1],
    existingLoad1[2] - transverseForce, // Negative for downward force
    existingLoad1[3] + moment1x,
    existingLoad1[4] + moment1y,
    existingLoad1[5],
  ] as [number, number, number, number, number, number]);

  // Node 2
  const existingLoad2 = nodeInputs2.loads!.get(j) || [0, 0, 0, 0, 0, 0];
  nodeInputs2.loads!.set(j, [
    existingLoad2[0],
    existingLoad2[1],
    existingLoad2[2] - transverseForce, // Negative for downward force
    existingLoad2[3] + moment2x,
    existingLoad2[4] + moment2y,
    existingLoad2[5],
  ] as [number, number, number, number, number, number]);

  // Node 3
  const existingLoad3 = nodeInputs2.loads!.get(k) || [0, 0, 0, 0, 0, 0];
  nodeInputs2.loads!.set(k, [
    existingLoad3[0],
    existingLoad3[1],
    existingLoad3[2] - transverseForce, // Negative for downward force
    existingLoad3[3] + moment3x,
    existingLoad3[4] + moment3y,
    existingLoad3[5],
  ] as [number, number, number, number, number, number]);
});

// Setup element inputs
const elementInputs2: ElementInputs = {
  elasticities: new Map<number, number>(),
  elasticitiesOrthogonal: new Map<number, number>(),
  shearModuli: new Map<number, number>(),
  poissonsRatios: new Map<number, number>(),
  thicknesses: new Map<number, number>(),
};

// Apply material properties to all elements
meshElements.forEach((_, i) => {
  elementInputs2.elasticities!.set(i, E_x);
  elementInputs2.elasticitiesOrthogonal!.set(i, E_y);
  elementInputs2.shearModuli!.set(i, G_xy);
  elementInputs2.poissonsRatios!.set(i, nu_xy);
  elementInputs2.thicknesses!.set(i, h);
});

// Run deformation analysis
deformOutputs.val = deform(
  meshNodes,
  meshElements,
  nodeInputs2,
  elementInputs2
);

// Calculate maximum displacement
let maxZDisplacement = 0;
deformOutputs.val!.deformations!.forEach((deformation) => {
  const dz = deformation[2]; // Z-axis displacement
  const absDz = Math.abs(dz);
  maxZDisplacement = Math.max(maxZDisplacement, absDz);
});

// Convert to mm for comparison with analytical solution
const maxDisplacementMm = maxZDisplacement * 1000;

// Expected value from analytical solution
const expectedDisplacementMm = 13.541176;

// Log results for debugging
console.log(`Maximum Z-displacement: ${maxDisplacementMm.toFixed(6)} mm`);
console.log(
  `Expected displacement from analytical solution: ${expectedDisplacementMm.toFixed(
    6
  )} mm`
);
console.log(
  `Difference: ${(maxDisplacementMm - expectedDisplacementMm).toFixed(6)} mm`
);
console.log(
  `Relative error: ${(
    ((maxDisplacementMm - expectedDisplacementMm) / expectedDisplacementMm) *
    100
  ).toFixed(2)}%`
);
console.log(
  `Mesh details: ${numDivisions}x${numDivisions} grid (${meshNodes.length} nodes, ${meshElements.length} elements)`
);

// update state
nodes.val = meshNodes;
elements.val = meshElements;
nodeInputs.val = nodeInputs2;
elementInputs.val = elementInputs2;

document.body.append(
  getViewer({
    mesh: {
      nodes,
      elements,
      nodeInputs: nodeInputs,
      elementInputs: elementInputs,
      deformOutputs: deformOutputs,
    },
    settingsObj: {
      deformedShape: true,
      loads: false,
    },
  })
);

// Helper function to calculate triangle area
function calculateTriangleArea(n1: Node, n2: Node, n3: Node): number {
  const a = [n2[0] - n1[0], n2[1] - n1[1], n2[2] - n1[2]];
  const b = [n3[0] - n1[0], n3[1] - n1[1], n3[2] - n1[2]];
  const cross = [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const norm = Math.sqrt(cross[0] ** 2 + cross[1] ** 2 + cross[2] ** 2);
  return norm / 2;
}
