import {
  app,
  Node,
  Element,
  Assignment,
  Parameters,
} from "../../awatif-ui/src";
import { analyze } from "../../awatif-fem/";
import {
  TimberDesignAssignment,
  timberDesign,
} from "../../awatif-design/src/ec/timber/timberDesign";
import { design } from "../../awatif-design/src/design";
import { timberDesignTemplate } from "../../awatif-design/src/ec/timber/timberDesignTemplate";

const parameters: Parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 },
};

function onParameterChange(parameters: Parameters) {
  const nodes: Node[] = [
    [5, 0, 0],
    [parameters.xPosition.value, 0, parameters.zPosition.value],
    [5, 0, 8],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
  ];

  const assignments: Array<Assignment | TimberDesignAssignment> = [
    {
      node: 0,
      support: [true, true, true],
    },
    {
      node: 2,
      support: [true, true, true],
    },
    {
      node: 1,
      load: [0, 0, -10],
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200,
      timberDesign: {
        strength: 0,
      },
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200,
    },
  ];

  const analysisResults = analyze(nodes, elements, assignments);

  const designResults = design(nodes, elements, assignments, analysisResults, [
    timberDesign,
  ]);

  return { nodes, elements, assignments, analysisResults, designResults };
}

app({ parameters, onParameterChange, report: timberDesignTemplate });
