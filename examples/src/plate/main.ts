import van from "vanjs-core";
import { deform, analyze, Mesh } from "awatif-fem";
import { getViewer, Parameters, getParameters, getToolbar } from "awatif-ui";
import { getMesh } from "awatif-mesh";

// Init
const parameters: Parameters = {
  xPosition: { value: van.state(15), min: 5, max: 20 },
  load: { value: van.state(-50), min: -100, max: 100, step: 1 },
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

// Events: on parameter change mesh & deform
van.derive(() => {
  const { nodes, elements, boundaryIndices } = getMesh({
    points: [
      [0, 0, 0],
      [15, 0, 0],
      [parameters.xPosition.value.val, 10, 0],
      [0, 5, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: 0.5,
  });

  mesh.nodeInputs.val = {
    supports: new Map(
      boundaryIndices.map((i) => [i, [true, true, true, true, true, true]])
    ),
    loads: new Map(
      nodes.map((_, i) => [i, [0, 0, parameters.load.value.val, 0, 0, 0]])
    ),
  };
  mesh.nodes.val = nodes;
  mesh.elements.val = elements;

  mesh.elementInputs.val = {
    elasticities: new Map(elements.map((_, i) => [i, 100])),
    thicknesses: new Map(elements.map((_, i) => [i, 1])),
    poissonsRatios: new Map(elements.map((_, i) => [i, 0.3])),
  };

  mesh.deformOutputs.val = deform(
    nodes,
    elements,
    mesh.nodeInputs.val,
    mesh.elementInputs.val
  );

  mesh.analyzeOutputs.val = analyze(
    nodes,
    elements,
    mesh.elementInputs.val,
    mesh.deformOutputs.val
  );
});

document.body.append(
  getParameters(parameters),
  getViewer({
    mesh,
    settingsObj: {
      deformedShape: true,
      loads: false,
      shellResults: "displacementZ",
    },
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",
    author: "https://www.linkedin.com/in/mahjoubmusaab/",
  })
);
