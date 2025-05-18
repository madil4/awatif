import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-fem";
import { getViewer, Parameters, getParameters, getToolbar } from "awatif-ui";
import { deform } from "awatif-fem";
import { getMesh } from "awatif-mesh";
import { getNodalLoadsFromSlabAreaLoad } from "../building/getMesh"; // Import new function

// Plate dimensions and material properties
const a = 10; // m
const h = 0.15; // m
const E_x = 1.0e10; // Pa
const E_y = 0.5e10; // Pa
const G_xy = 1.0e9; // Pa
const nu_xy = 0.25;

// Init
const parameters: Parameters = {
  xPosition: { value: van.state(10), min: 5, max: 20 },
  load: { value: van.state(-50), min: -1000, max: 1000, step: 1 }, // Pressure load (N/m²)
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});

// Events: on parameter change mesh & deform
van.derive(() => {
  const {
    nodes: meshNodes,
    elements: meshElements,
    boundaryIndices,
  } = getMesh({
    points: [
      [0, 0, 0], // Bottom-left corner
      [parameters.xPosition.value.val, 0, 0], // Bottom-right corner
      [a, a, 0], // Top-right corner
      [0, a, 0], // Top-left corner
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: 0.1,
  });
  nodes.val = meshNodes;
  elements.val = meshElements;

  // Distribute pressure load using the new function
  const allNodeIndices = Array.from({ length: meshNodes.length }, (_, i) => i);
  nodeInputs.val = {
    supports: new Map(
      boundaryIndices.map((i) => [i, [true, true, true, true, true, true]])
    ),
    loads: new Map(),
  };
  nodeInputs.val.loads = getNodalLoadsFromSlabAreaLoad(
    meshNodes,
    meshElements,
    nodeInputs.val.loads,
    parameters.load.value.val, // Pressure load
    allNodeIndices
  );

  // Aggregate total load to verify
  let totalAppliedLoad = 0;
  nodeInputs.val.loads.forEach((loadVector) => {
    // Sum the z-component (index 2) of each nodal load, assuming negative for downward load
    totalAppliedLoad += -loadVector[2]; // Negative because loadVector[2] is negative for downward load
  });
  const expectedLoad = parameters.load.value.val * 10 * 10; // Pressure * Area
  console.log(
    `Total applied load: ${totalAppliedLoad.toFixed(
      2
    )} N, Expected: ${expectedLoad.toFixed(2)} N, Difference: ${(
      totalAppliedLoad - expectedLoad
    ).toFixed(2)} N`
  );

  const elementsVal = elements.val;

  elementInputs.val = {
    elasticities: new Map(elementsVal.map((_, i) => [i, E_x])),
    elasticitiesOrthogonal: new Map(elementsVal.map((_, i) => [i, E_y])),
    shearModuli: new Map(elementsVal.map((_, i) => [i, G_xy])),
    poissonsRatios: new Map(elementsVal.map((_, i) => [i, nu_xy])),
    thicknesses: new Map(elementsVal.map((_, i) => [i, h])),
  };

  deformOutputs.val = deform(
    meshNodes,
    meshElements,
    nodeInputs.val,
    elementInputs.val
  );

  // Aggregate and log maximum displacement
  if (deformOutputs.val.deformations) {
    let maxZDisplacement = 0;
    deformOutputs.val.deformations.forEach((deformation) => {
      const dz = deformation[2]; // Isolate Z-axis displacement
      const absDz = Math.abs(dz); // Consider magnitude (positive/negative deflection)
      maxZDisplacement = Math.max(maxZDisplacement, absDz);
    });
    console.log(
      `Maximum Z-displacement: ${(maxZDisplacement * 1000).toFixed(6)} mm`
    );
  }
});

document.body.append(
  getParameters(parameters),
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
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",
    author: "https://www.linkedin.com/in/mahjoubmusaab/",
  })
);
