import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
  AnalyzeOutputs,
} from "awatif-data-model";
import { setupThreeCanvas, template } from "./utils/template";
import { getViewer, Parameters, getParameters, getToolbar, getReport, getDialog, getColorMap, getLegend } from "awatif-ui";
import { deform } from "awatif-fem";
import { mesh } from "awatif-mesh";

import { cltBendingDesign, Glulam } from "./utils/clt-design";
import { createNodes, createText } from "./utils/threejsUtils";
import "./styles.css";


// Init
const parameters: Parameters = {
  xPosition: { value: van.state(15), min: 5, max: 20 },
  load: { value: van.state(-10), min: -10, max: 10, step: 1 },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});
const analyzeOutputs: State<AnalyzeOutputs> = van.state({});
const objects3D = van.state([]);
const distances = van.state([]);
const moments = van.state([]);
const results = van.state([]);
const etaBendingMax = van.state([]);
const glulam: Glulam = { grade: "GL24h", f_mk: 24, E_mean: 11500 };


// Events: on parameter change mesh & deform
van.derive(() => {
  const {
    nodes: meshNodes,
    elements: meshElements,
    boundaryIndices,
  } = mesh({
    points: [
      [0, 0, 0],
      [15, 0, 0],
      [parameters.xPosition.value.val, 10, 0],
      [0, 5, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: 2,
  });

  nodes.val = meshNodes.val;
  elements.val = meshElements.val;

  nodeInputs.val = {
    supports: new Map(boundaryIndices.val.map((i) => [i, [true, true, true, true, true, true]])),
    loads: new Map(nodes.val.map((_, i) => [i, [0, 0, parameters.load.value.val, 0, 0, 0]])),
  };
  
  const elementsVal = elements.val;
  elementInputs.val = {
    elasticities: new Map(elementsVal.map((_, i) => [i, 100])),
    thicknesses: new Map(elementsVal.map((_, i) => [i, 1])),
    poissonsRatios: new Map(elementsVal.map((_, i) => [i, 0.3])),
  };

  deformOutputs.val = deform(
    meshNodes.val,
    meshElements.val,
    nodeInputs.val,
    elementInputs.val
  );

  // calc moments
  let edgePoints = boundaryIndices.val.map(i => meshNodes.val[i]);
  distances.val = meshNodes.val.map(point => getDistanceToClosestEdge(point, edgePoints));
  moments.val = distances.val.map(distance => Math.abs(distance * parameters.load.value.val));
  
  // max Moment 
  const columns = [], points = [], texts = [];
  let maxMoment = Math.max(...moments.val);
  let maxMomentIndex = moments.val.indexOf(maxMoment);
  let node = meshNodes.val[maxMomentIndex]
  
  // clt design 
  results.val = moments.val.map(moment => cltBendingDesign(glulam, 20, 3, 20, Math.abs(moment), 0.8));
  etaBendingMax.val = results.val.map(result => Math.max(...result.eta));
  
  // annotation
  texts.push(...createText(node[0], node[1], node[2], 1, ["Node " + maxMomentIndex, "Myd = " + maxMoment.toFixed(0) + "kNm", "η = " + (etaBendingMax.val[maxMomentIndex] * 100).toFixed(0) + "%"], ""))
  points.push(createNodes(node[0], node[1], node[2], 0x00FF00))

  let i = 0
  for (let node of meshNodes.val) {
    // console.log( results.val[0].eta )
    // texts.push(...createText(node[0], node[1], node[2], 1, [results.val[i].eta], 0x00FF00))
    i++
  }
  
  objects3D.val = [getColorMap(meshNodes.val, elements.val, moments.val), ...texts, ...points];

});

// ---------------------------------------------------
// Report
// ---------------------------------------------------

const reportInput = {
  glulam, 
  nodes,
  moments,
  results,
  analyzeOutputs
};

// dialog
const clickedButton = van.state("");
const dialogBody = van.state(undefined);

van.derive(() => {
  if (clickedButton.val === "Report") {
    dialogBody.val = getReport({ template, data: reportInput });
    setTimeout(() => {
      setupThreeCanvas();
    }, 0);
  }
});

document.body.append(
  getParameters(parameters),
  getViewer({
    structure: {
      nodes,
      elements,
      nodeInputs: nodeInputs,
      elementInputs: elementInputs,
      deformOutputs: deformOutputs,
      analyzeOutputs: analyzeOutputs
    },
    settingsObj: {
      deformedShape: true,
      loads: false,
    },
    objects3D
  }),
  getLegend(moments),
  getDialog({ dialogBody }),
  getToolbar({
    clickedButton,
    buttons: ["Report"],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",
    author: "https://www.linkedin.com/in/mahjoubmusaab/",
  })
);


function getDistanceToClosestEdge(node: number[], edgeNodes: number[][]): number {
  return Math.min(...edgeNodes.map(edge => Math.hypot(node[0] - edge[0], node[1] - edge[1])));
}
