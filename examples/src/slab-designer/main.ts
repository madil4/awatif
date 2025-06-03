import { getViewer, Parameters, getParameters, getToolbar, getReport, getDialog, getColorMap, getLegend, getTables, Drawing } from "awatif-ui";
import { deform, Mesh } from "awatif-fem";
import { Building } from "../building/data-model.js";
import { getBase, getBaseGeometry } from "../building/getBase.js";
import { getSolids, getSolidsGeometry } from "../building/getSolids.js";
import { getDrawingToolbar } from "./getDrawingToolbar.js";
import { getSnapTip } from "./getSnapTip.js";
import { getMesh } from "../building/getMesh.js";
import { setupThreeCanvas, template } from "./utils/template";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
  AnalyzeOutputs,
} from "awatif-fem";
import van, { State } from "vanjs-core";
import { cltBendingDesign, Glulam } from "./utils/clt-design";
import { createNodes, createText } from "./utils/threejsUtils";
import "./styles.css";



// Todo: Review reactive calls (.val vs .rawVal)
// Enums and Types
enum DrawingStory {
  first = "1st-floor",
  second = "2nd-floor",
}

// Init
const building: Building = {
  points: van.state([]),
  stories: van.state([0]), // only one story
  columns: van.state([]),
  slabs: van.state([]),
  columnsByStory: van.state(new Map()),
  slabsByStory: van.state(new Map()),
  columnData: van.state(new Map()),
  slabData: van.state(new Map()),
};

const solidsMesh = getSolids();
const base = getBase();
const solids = van.state([solidsMesh]);
const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});
const analyzeOutputs: State<AnalyzeOutputs> = van.state({});
const objects3D = van.state([]);
const distances = van.state([]);
const moments = van.state<number[]>([]);
const minMoment = van.state<number>(0);
const result = van.state();
const etaBendingMax = van.state([]);
const glulam: Glulam = { grade: "GL24h", f_mk: 24, E_mean: 11500 };

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
};

//* Drawing Data (Points - Polylines)
const sampleColumnPoints = [
  [3, 2, 0],
  [3, 11, 0],
  [12, 11, 0],
  [18, 11, 0],
  [18, 6, 0],
  [12, 6, 0],
  [12, 2, 0],
  [3, 6, 0],
] as [number, number, number][];
const sampleSlabPoints = [
  [3, 2, 4],
  [3, 11, 4],
  [18, 11, 4],
  [18, 6, 4],
  [12, 6, 4],
  [12, 2, 4],
] as [number, number, number][];
const sampleSlabPolylines = [[0, 1, 2, 3, 4, 5], []];

const drawingColumnPoints: Drawing["points"] = van.state([]);
const drawingColumnPolylines: Drawing["polylines"] = van.state([]);

const drawingSlabPoints: Drawing["points"] = van.state(sampleSlabPoints);
const drawingSlabPolylines: Drawing["polylines"] =
  van.state(sampleSlabPolylines);

const totalDrawingPoints: Drawing["points"] = van.state(sampleColumnPoints);
const totalDrawingPolylines: Drawing["polylines"] = van.state([]);

const gridTarget = van.state({
  position: [10, 10, 0] as [number, number, number],
  rotation: [Math.PI / 2, 0, 0] as [number, number, number],
});

// tables
const sampleColumnPointsData = van.state<[number, number, number][]>([]);
const sampleSlabPointsData = van.state<[number, number, number][]>([]);


for (let i = 0; i < sampleColumnPoints.length; i++) {
  sampleColumnPointsData.val.push(sampleColumnPoints[i]);
}

for (let i = 0; i < sampleSlabPoints.length; i++) {
  sampleSlabPointsData.val.push(sampleSlabPoints[i]);
}

const FLOOR_HEIGHT: number = 4;

let activeStory: DrawingStory = DrawingStory.first;

const tables = new Map();

// Update
tables.set("columns", {
  text: "Columns",
  fields: [
    { field: "A", text: "x-Coordinate" },
    { field: "B", text: "y-Coordinate"},
    { field: "C", text: "z-Coordinate"},
  ],
  data: sampleColumnPointsData,
});

tables.set("slabs", {
  text: "Slabs",
  fields: [
    { field: "A", text: "x-Coordinate" },
    { field: "B", text: "y-Coordinate"},
    { field: "C", text: "z-Coordinate"},
  ],
  data: sampleSlabPointsData,
});

// Events
// On toolbar click, update grid target and points
function onToolbarClick(floor: DrawingStory) {
  activeStory = floor;

  gridTarget.val = {
    position: [10, 10, floor == DrawingStory.first ? 0 : FLOOR_HEIGHT] as [
      number,
      number,
      number
    ],
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  totalDrawingPoints.val =
    floor === DrawingStory.first
      ? drawingColumnPoints.val
      : drawingSlabPoints.val;
  totalDrawingPolylines.val =
    floor === DrawingStory.first
      ? drawingColumnPolylines.val
      : drawingSlabPolylines.val;
}

// When drawings' data change, update story's data
van.derive(() => {
  if (activeStory == DrawingStory.first) {
    drawingColumnPoints.val = totalDrawingPoints.val;
    drawingColumnPolylines.val = totalDrawingPolylines.val;
  }
  if (activeStory == DrawingStory.second) {
    drawingSlabPoints.val = totalDrawingPoints.val;
    drawingSlabPolylines.val = totalDrawingPolylines.val;
  }
});

// When drawings data change, update building data model
van.derive(() => {
  const columnsByStory: Building["columnsByStory"]["val"] = new Map();
  const slabsByStory: Building["slabsByStory"]["val"] = new Map();
  const slabData: Building["slabData"]["val"] = new Map();

  const points = [];
  const columns = [];

  const storySlabsPoints: number[][] = [];
  const storyColumnsPoints: number[][][] = [];

  // slabs
  if (drawingSlabPoints.val.length > 0) {
    for (let i = 0; i < drawingSlabPoints.val.length; i++) {
      storySlabsPoints.push([
        drawingSlabPoints.val[i][0],
        drawingSlabPoints.val[i][1],
        FLOOR_HEIGHT,
      ]);

      points.push([
        drawingSlabPoints.val[i][0],
        drawingSlabPoints.val[i][1],
        FLOOR_HEIGHT,
      ]);
    }
  }

  slabsByStory.set(0, Array.from(drawingSlabPolylines.rawVal.keys()));

  const slabLoad: number = 10;
  slabData.set(0, {
    analysisInput: {
      areaLoad: slabLoad,
      isOpening: false,
      thickness: 1,
      material: { elasticity: 100, poissonsRatio: 0.3 },
    },
  });
  drawingSlabPolylines.rawVal.forEach((_, k) => {
    slabData.set(k, {
      analysisInput: {
        areaLoad: slabLoad,
        isOpening: false,
        thickness: 1,
        material: { elasticity: 100, poissonsRatio: 0.3 },
      },
    });
  });

  columns;
  const newColumnsIndices: number[] = [];
  if (drawingColumnPoints.val.length > 0) {
    for (let i = 0; i < drawingColumnPoints.val.length; i++) {
      const column = drawingColumnPoints.val[i];
      storyColumnsPoints.push([
        [column[0], column[1], column[2] + FLOOR_HEIGHT],
      ]);
    }

    for (let i = 0; i < storyColumnsPoints.length; i++) {
      const lastIndex = points.length;

      points.push(...storyColumnsPoints[i]);
      columns.push(lastIndex);
      newColumnsIndices.push(columns.length - 1);
    }
  }
  columnsByStory.set(0, newColumnsIndices);

  // Update state
  building.points.val = points;
  building.columns.val = columns;
  building.slabs.val = drawingSlabPolylines.val;
  building.columnsByStory.val = columnsByStory;
  building.slabsByStory.val = slabsByStory;
  building.slabData.val = slabData;
});

// When building data model changes, update base and solids geometry
van.derive(() => {
  const { nodes, elements, nodeInputs, elementInputs } = getMesh(
    building.points.val,
    building.stories.val,
    building.columns.val,
    building.slabs.val,
    building.columnsByStory.val,
    building.slabsByStory.val,
    building.columnData.val,
    building.slabData.val
  );

  mesh.deformOutputs.val = deform(nodes, elements, nodeInputs, elementInputs);

  // The base geometry is not used in this example, but can be uncommented if needed
  // base.geometry = getBaseGeometry(
  //   building.points.val,
  //   building.slabs.val,
  //   building.columns.val
  // );

  solidsMesh.geometry = getSolidsGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val
  );

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering

  // Update state
  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = nodeInputs;
  mesh.elementInputs.val = elementInputs;

  moments.val = [];       // clear old moments
  minMoment.val = Infinity; // reset before pushing new values

  // calc moments as deformations
  for (const value of mesh.deformOutputs.val.deformations.values()) {
    moments.val.push(value[2] * 10); 
  }
  
  minMoment.val = Math.min(...moments.val);

  // clt design 
  result.val = cltBendingDesign(glulam, 20, 3, 20, Math.abs(minMoment.val), 0.8);
});


// Report
const reportInput = {
  glulam, 
  nodes,
  minMoment,
  result,
  analyzeOutputs
};

// dialog
const clickedButton = van.state("");
const dialogBody = van.state(undefined);
van.derive(() => {
  if (clickedButton.val === "Tables") dialogBody.val = getTables({ tables });
  if (clickedButton.val === "Report") {
    dialogBody.val = getReport({ template, data: reportInput });
    setTimeout(() => {
      setupThreeCanvas();
    }, 0);
  }
});

document.body.append(
  getViewer({
    objects3D,
    solids,
    mesh,
    drawingObj: {
      points: totalDrawingPoints,
      polylines: totalDrawingPolylines,
      gridTarget,
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
    },
  }),
  getSnapTip(),
  getDrawingToolbar({ onToolbarClick }),
  getToolbar({
    clickedButton,
    buttons: ["Tables", "Report"],
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  }),
  getDialog({ dialogBody }),

);
