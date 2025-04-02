import {
  Node,
  Element,
  AnalyzeOutputs,
  DeformOutputs,
  ElementInputs,
  NodeInputs,
} from "awatif-fem";
import { deform, analyze } from "awatif-fem";
import van from "vanjs-core";
import { State } from "vanjs-core/debug";
import {
  getDialog,
  getReport,
  getToolbar,
  Parameters,
  getParameters,
  getViewer,
} from "awatif-ui";
import { template } from "./template";

// Init
const parameters: Parameters = {
  xPosition: { value: van.state(600), min: 0, max: 1000 },
  zPosition: { value: van.state(0), min: 0, max: 500 },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});
const analyzeOutputs: State<AnalyzeOutputs> = van.state({});

const structure = {
  nodes,
  elements,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
};

// Events: on parameter change
van.derive(() => {
  nodes.val = [
    [250, 0, 0],
    [parameters.xPosition.value.val, 0, parameters.zPosition.value.val],
    [250, 0, 400],
  ];
  elements.val = [
    [0, 1],
    [1, 2],
  ];

  nodeInputs.val = {
    supports: new Map([
      [0, [true, true, true, true, true, true]],
      [2, [true, true, true, true, true, true]],
    ]),
    loads: new Map([[1, [0, 0, -1e3, 0, 0, 0]]]),
  };

  elementInputs.val = {
    elasticities: new Map([
      [0, 200],
      [1, 200],
    ]),
    areas: new Map([
      [0, 100],
      [1, 100],
    ]),
  };

  deformOutputs.val = deform(
    nodes.val,
    elements.val,
    nodeInputs.val,
    elementInputs.val
  );

  analyzeOutputs.val = analyze(
    nodes.val,
    elements.val,
    elementInputs.val,
    deformOutputs.val
  );
});

// report
const clickedButton = van.state("");
const dialogBody = van.state(undefined);

van.derive(() => {
  if (clickedButton.val === "Report")
    dialogBody.val = getReport({ template, data: structure });
});

document.body.append(
  getToolbar({
    clickedButton,
    buttons: ["Report"],
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/report/main.ts",
    author: "https://www.linkedin.com/in/cal-mense/",
  }),
  getDialog({ dialogBody }),
  getParameters(parameters),
  getViewer({
    structure,
    settingsObj: {
      gridSize: 1000,
    },
  })
);
