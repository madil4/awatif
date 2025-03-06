import {
  Node,
  Element,
  AnalyzeOutputs,
  DeformOutputs,
  ElementInputs,
  NodeInputs,
} from "awatif-data-structure";
import { deform, analyze } from "awatif-fem";
import van from "vanjs-core";
import { State } from "vanjs-core/debug";
import { Parameters, parameters, viewer } from "awatif-ui";
import { templateReport, templateTables } from "./template";
import { toolbar } from "awatif-ui/src/toolbar/toolbar";
import { dialog } from "awatif-ui/src/dialog/dialog";
import { table } from "awatif-ui/src/table/table";

import "./template.css";

// Init
const params: Parameters = {
  xPosition: { value: van.state(600), min: 0, max: 1000 },
  zPosition: { value: van.state(0), min: 0, max: 500 },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});
const analyzeOutputs: State<AnalyzeOutputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  nodes.val = [
    [250, 0, 0],
    [params.xPosition.value.val, 0, params.zPosition.value.val],
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

let structure = {
  nodes,
  elements,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
};

// Toolbar
const toolbarElm = toolbar(["report"]);

// Open Report Dialog on Toolbar Button Click
for (let i = 0; i < toolbarElm.length; i += 1) {
  if (toolbarElm[i].title === "report") {
    toolbarElm[i].on("click", () => {
      console.log("Report button clicked"); // Check if the button works
      // @ts-ignore
      const dialogObjReport = dialog({
        template: () => templateReport(
          structure
        ),
      });
      console.log(structure)
      document.body.appendChild(dialogObjReport);
    });
  }
}

document.body.append(
  parameters(params),
  viewer({
    structure,
    settingsObj: {
      gridSize: 1000,
    },
  })
);
