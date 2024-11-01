import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { parameters, Parameters, viewer } from "awatif-ui";

// Init
const params: Parameters = {
  span: {
    value: van.state(15),
    min: 5,
    max: 20,
    step: 1,
    label: "span (m)",
  },
  divisions: {
    value: van.state(5),
    min: 2,
    max: 5,
    step: 1,
  },
  height: {
    value: van.state(2),
    min: 1,
    max: 5,
    step: 0.1,
    label: "height (m)",
  },
  elasticity: {
    value: van.state(10),
    min: 1,
    max: 250,
    step: 1,
    label: "Elasticity (gpa)",
  },
  area: {
    value: van.state(10),
    min: 1,
    max: 300,
    step: 1,
    label: "area (cm2)",
  },
  load: {
    value: van.state(250),
    min: 1,
    max: 500,
    step: 1,
    label: "load (kN)",
  },
};

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);
const analysisInputsState: State<AnalysisInputs> = van.state({});
const analysisOutputsState: State<AnalysisOutputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  const span = params.span.value.val;
  const divisions = params.divisions.value.val;
  const height = params.height.value.val;
  const elasticity = params.elasticity.value.val * 1e6;
  const area = params.area.value.val * 1e-4;
  const load = params.load.value.val;

  const nodes: Node[] = [];
  const elements: Element[] = [];
  const dx = span / divisions;

  const bottomChordNodes: Node[] = [];
  for (let i = 0; i <= divisions; i++) {
    const node: Node = [dx * i, 0, 0]; // bottom chord
    nodes.push(node);
    bottomChordNodes.push(node);
  }

  for (let i = 0; i <= divisions; i++) {
    nodes.push([dx * i, 0, height]); // top chord
  }

  // bottom chord
  for (let i = 0; i < divisions; i++) {
    elements.push([i, i + 1]);
  }

  // top chord
  for (let i = 0; i < divisions; i++) {
    elements.push([divisions + 1 + i, divisions + 1 + i + 1]);
  }

  for (let i = 0; i <= divisions; i++) {
    elements.push([i, divisions + 1 + i]); // vertical post
  }

  // diagonal post
  for (let i = 0; i < divisions; i++) {
    if (i < divisions / 2) {
      elements.push([i, divisions + 1 + i + 1]);
    } else {
      elements.push([divisions + 1 + i, i + 1]);
    }
  }

  const analysisInputs: AnalysisInputs = {
    sections: new Map(),
    materials: new Map(),
    pointSupports: new Map(),
    pointLoads: new Map(),
  };

  elements.forEach((_, i) => {
    analysisInputs.materials?.set(i, { elasticity });
    analysisInputs.sections?.set(i, { area });
  });

  analysisInputs.pointSupports?.set(0, [true, true, true, true, true, true]);
  analysisInputs.pointSupports?.set(divisions, [
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  bottomChordNodes.forEach((_, i) =>
    analysisInputs.pointLoads?.set(i, [0, 0, -load, 0, 0, 0])
  );

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  // update state
  nodesState.val = nodes;
  elementsState.val = elements;
  analysisInputsState.val = analysisInputs;
  analysisOutputsState.val = analysisOutputs;
});

document.body.append(
  parameters(params),
  viewer({
    structure: {
      nodes: nodesState,
      elements: elementsState,
      analysisInputs: analysisInputsState,
      analysisOutputs: analysisOutputsState,
    },
    settingsObj: {
      deformedShape: true,
    },
  })
);
