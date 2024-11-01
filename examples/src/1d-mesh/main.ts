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
  meshDensity: {
    value: van.state(7),
    min: 1,
    max: 7,
    step: 1,
    label: "mesh density",
  },
  span: { value: van.state(10), min: 1, max: 20 },
  height: { value: van.state(10), min: 1, max: 10 },
  load: { value: van.state(10), min: 0, max: 20 },
};

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);
const analysisInputsState: State<AnalysisInputs> = van.state({});
const analysisOutputsState: State<AnalysisOutputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  const nodes: Node[] = [];
  const elements: Element[] = [];
  const count = params.meshDensity.value.val;
  const height = params.height.value.val;
  const span = params.span.value.val;
  const load = params.load.value.val;

  // beam 1
  nodes.push(
    ...[...Array(count + 1).keys()].map(
      (i) => [0, 0, (height / count) * i] as Node
    )
  );
  elements.push(...[...Array(count).keys()].map((i) => [i, i + 1] as Element));

  // beam 2
  let s = nodes.length;
  nodes.push(
    ...[...Array(count).keys()].map(
      (i) => [(span / count) * (i + 1), 0, height] as Node
    )
  );
  elements.push(
    ...[...Array(count - 1).keys()].map((i) => [s + i, s + i + 1] as Element)
  );
  elements.push([s - 1, s]); // connecting beam

  // beam 3
  s = nodes.length;
  const loadNode = s - 1;
  nodes.push(
    ...[...Array(count).keys()].map(
      (i) => [span, 0, height - (height / count) * (i + 1)] as Node
    )
  );
  elements.push(
    ...[...Array(count - 1).keys()].map((i) => [s + i, s + i + 1] as Element)
  );
  elements.push([s - 1, s]); // connecting beam

  const analysisInputs: AnalysisInputs = {
    sections: new Map(),
    materials: new Map(),
    pointSupports: new Map(),
    pointLoads: new Map(),
  };

  elements.forEach((_, i) => {
    analysisInputs.materials?.set(i, {
      elasticity: 10,
      shearModulus: 10,
    });
    analysisInputs.sections?.set(i, {
      area: 10,
      torsionalConstant: 10,
      momentOfInertiaY: 10,
      momentOfInertiaZ: 10,
    });
  });

  analysisInputs.pointSupports?.set(0, [true, true, true, true, true, true]);
  analysisInputs.pointSupports?.set(nodes.length - 1, [
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  analysisInputs.pointLoads?.set(loadNode, [load, 0, 0, 0, 0, 0]);

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
