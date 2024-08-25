import { Node, Element, AnalysisInputs } from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { template, Parameters, Structure } from "awatif-ui";

const parameters: Parameters = {
  dx: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "dx (m)",
  },
  dy: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "dy (m)",
  },
  dz: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "dz (m)",
  },
  divisions: {
    value: 4,
    min: 1,
    max: 10,
    step: 1,
  },
  load: {
    value: 30,
    min: 1,
    max: 50,
    step: 0.5,
    label: "load (kN)",
  },
};

function onParameterChange(parameters: Parameters): Structure {
  const dx = parameters.dx.value;
  const dy = parameters.dy.value;
  const dz = parameters.dz.value;
  const divisions = parameters.divisions.value;

  let nodes: Node[] = [];
  let elements: Element[] = [];

  // nodes
  for (let i = 0; i <= divisions; i++) {
    nodes.push(
      [0, 0, dz * i],
      [dx, 0, dz * i],
      [dx, dy, dz * i],
      [0, dy, dz * i]
    );
  }
  nodes = nodes.map((v) => [6 + v[0], 6 + v[1], v[2]]); // center structure in the grid

  // beams
  for (let i = 0; i < divisions * 4; ) {
    i += 4;
    elements.push([i, i + 1], [i + 1, i + 2], [i + 2, i + 3], [i + 3, i]);
    elements.push([i, i + 2]);
  }

  // columns
  for (let i = 0; i < divisions * 4; i++) {
    elements.push([i, i + 4]);
  }

  // diagonals
  for (let i = 0; i < divisions * 4; i += 4) {
    elements.push([i, i + 5], [i + 3, i + 6]);
    elements.push([i, i + 7], [i + 1, i + 6]);
  }

  const analysisInputs: AnalysisInputs = {
    materials: new Map(),
    sections: new Map(),
    pointLoads: new Map(),
    pointSupports: new Map(),
  };

  elements.forEach((_, i) => {
    analysisInputs.materials?.set(i, { elasticity: 100 });
    analysisInputs.sections?.set(i, { area: 10 });
  });
  const fixed: any = [true, true, true, true, true, true];
  analysisInputs.pointSupports?.set(0, fixed);
  analysisInputs.pointSupports?.set(1, fixed);
  analysisInputs.pointSupports?.set(2, fixed);
  analysisInputs.pointSupports?.set(3, fixed);
  analysisInputs.pointLoads?.set(nodes.length - 2, [
    parameters.load.value,
    0,
    0,
    0,
    0,
    0,
  ]);

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

template({
  parameters,
  onParameterChange,
  settings: {
    deformedShape: true,
    gridSize: 15,
  },
});
