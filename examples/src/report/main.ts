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
import { sheets } from "awatif-ui/src/sheets/sheets";

import "./template.css";
import { html } from "lit-html";

// Init
const params: Parameters = {
  xPosition: { value: van.state(600), min: 0, max: 1000 },
  zPosition: { value: van.state(0), min: 0, max: 500 },
};

const deformOutputs: State<DeformOutputs> = van.state({});
const analyzeOutputs: State<AnalyzeOutputs> = van.state({});


const nodes: State<Node[]> = van.state([
  [250, 0, 0],
  [600, 0, 0],
  [250, 0, 400],
]);

const elements: State<Element[]> = van.state([
  [0, 1],
  [1, 2],
]);

const nodeInputs: State<NodeInputs> = van.state({
  supports: new Map([
    [0, [true, true, true, true, true, true]],
    [2, [true, true, true, true, true, true]],
  ]),
  loads: new Map([[1, [0, 0, -1e3, 0, 0, 0]]]),
});

const elementInputs: State<ElementInputs> = van.state({
  elasticities: new Map([
    [0, 200],
    [1, 200],
  ]),
  areas: new Map([
    [0, 100],
    [1, 100],
  ]),
});

const structure = {
  nodes,
  elements,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
};

const sheetsObj = new Map();

// sheets

sheetsObj.set("nodes", {
  text: "Nodes",
  fields: [
    { field: "A", text: "X-coordinate", editable: { type: "float" } },
    { field: "B", text: "Y-coordinate", editable: { type: "float" } },
    { field: "C", text: "Z-coordinate", editable: { type: "float" } },
  ],
  data: nodes,
});

sheetsObj.set("sheets", {
  text: "Sheets",
  fields: [
    { field: "A", text: "Node 1", editable: { type: "float" } },
    { field: "B", text: "Node 2", editable: { type: "float" } },
  ],
  data: elements,
});

// events

// Events: on parameter change
van.derive(() => {
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

const sheetsElm = sheets({
  sheets: sheetsObj,
});

// Toolbar
const toolbarElm = toolbar(["tables", "report"]);

// Open Report Dialog on Toolbar Button Click
// Open Report Dialog on Toolbar Button Click
for (let i = 0; i < toolbarElm.length; i += 1) {
  if (toolbarElm[i].title === "report") {
    toolbarElm[i].on("click", () => {
      console.log("Report button clicked"); // Check if the button works
      // @ts-ignore
      const dialogObjReport = dialog({
        template: () => templateReport(structure),
      });
      document.body.appendChild(dialogObjReport);
    });
  } else if (toolbarElm[i].title === "tables") {
    toolbarElm[i].on("click", () => {
      console.log("Tables button clicked"); // Check if the button works
      // @ts-ignore
      const dialogObjTables = dialog({
        template: () => templateTables({ sheetsElm }),
      });
      console.log(dialogObjTables); // Check if the button works
      document.body.appendChild(dialogObjTables);
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
