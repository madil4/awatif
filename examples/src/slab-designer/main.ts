import van from "vanjs-core";
import {
  getToolbar,
  getViewer,
  Drawing,
  getDialog,
  getTables,
  getReport,
  getParameters,
  Parameters,
} from "awatif-ui";
import { deform, Mesh, analyze } from "awatif-fem";
import { Building } from "../building/data-model";
import { getBase, getBaseGeometry } from "../building/getBase";
import { getSolids, getSolidsGeometry } from "../building/getSolids";
import { getDrawingToolbar } from "./drawingToolbar/getDrawingToolbar";
import { getSnapTip } from "./getSnapTip";
import { getMesh } from "../building/getMesh";
import { getDesign } from "./design/getDesign";
import { getTemplate } from "./design/getTemplate";

// Todo: Review reactive calls (.val vs .rawVal)
// Init
enum DrawingStory {
  first = "1st-floor",
  second = "2nd-floor",
}

const parameters: Parameters = {
  meshSize: {
    value: van.state(0.5),
    min: 0.5,
    max: 2,
    step: 0.1,
    label: "mesh size (m)",
  },
  loads: {
    value: van.state(30),
    min: 0,
    max: 100,
    label: "Load (kN/m²)",
  },
  elasticity: {
    value: van.state(1000),
    min: 100,
    max: 50000,
    step: 100,
    label: "elasticity (mpa)",
  },
  poisson: {
    value: van.state(0.3),
    min: 0.1,
    max: 0.5,
    step: 0.05,
    label: "poisson's ratio",
  },
  thickness: {
    value: van.state(0.2),
    min: 0.1,
    max: 0.5,
    step: 0.05,
    label: "thickness (m)",
  },
};

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
const objects3D = van.state([base]);
const solids = van.state([solidsMesh]);

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const designMomentInput = van.state(10);
const designOutputs = van.state();

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
  [12, 11, 4],
  [18, 11, 4],
  [18, 6, 4],
  [12, 6, 4],
  [12, 2, 4],
  [3, 6, 4],
] as [number, number, number][];
const sampleSlabPolylines = [[0, 1, 2, 3, 4, 5, 6], []];

const drawingColumnPoints: Drawing["points"] = van.state([]);

const drawingSlabPoints: Drawing["points"] = van.state(sampleSlabPoints);
const drawingSlabPolylines: Drawing["polylines"] =
  van.state(sampleSlabPolylines);

const totalDrawingPoints: Drawing["points"] = van.state(sampleColumnPoints);
const totalDrawingPolylines: Drawing["polylines"] = van.state([]);

const gridTarget = van.state({
  position: [10, 10, 0] as [number, number, number],
  rotation: [Math.PI / 2, 0, 0] as [number, number, number],
});

const clickedButton = van.state("");
const dialogBody = van.state(undefined);

const FLOOR_HEIGHT: number = 4;

let activeStory: DrawingStory = DrawingStory.first;

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
    floor === DrawingStory.first ? [] : drawingSlabPolylines.val;
}

function onClearPoints() {
  // Clear drawing data based on active story
  if (activeStory === DrawingStory.first) {
    drawingColumnPoints.val = [];
  } else {
    drawingSlabPoints.val = [];
    drawingSlabPolylines.val = [];
  }

  // Clear total drawing data
  totalDrawingPoints.val = [];
  totalDrawingPolylines.val = [];

  // Clear building model data
  building.points.val = [];
  building.columns.val = [];
  building.slabs.val = [];
  building.columnsByStory.val = new Map();
  building.slabsByStory.val = new Map();
  building.columnData.val = new Map();
  building.slabData.val = new Map();

  // Clear mesh data
  mesh.nodes.val = [];
  mesh.elements.val = [];
  mesh.nodeInputs.val = {};

  base.geometry = getBaseGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val
  );

  solidsMesh.geometry = getSolidsGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val
  );

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering
}

// When drawings' data change, update story's data
van.derive(() => {
  if (activeStory == DrawingStory.first) {
    drawingColumnPoints.val = totalDrawingPoints.val;
    // drawingSlabPolylines.val = totalDrawingPolylines.val;
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
  const lastIndex = points.length;

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

  drawingSlabPolylines.rawVal.forEach((_, k) => {
    slabData.set(k, {
      analysisInput: {
        meshSize: parameters.meshSize.value.val,
        areaLoad: -parameters.loads.value.val * 1e3, // Convert kN/m² to N/m²
        isOpening: false,
        thickness: parameters.thickness.value.val,
        material: {
          elasticity: parameters.elasticity.value.val * 1e6, // Convert mpa to N/m²
          poissonsRatio: parameters.poisson.value.val,
        },
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

// When building data model changes, analyze, update base and solids geometry
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

  base.geometry = getBaseGeometry(
    building.points.val,
    [], // Hide slabs
    building.columns.val
  );

  solidsMesh.geometry = getSolidsGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val
  );

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering

  // Analyze
  mesh.deformOutputs.val = deform(nodes, elements, nodeInputs, elementInputs);
  mesh.analyzeOutputs.val = analyze(
    nodes,
    elements,
    elementInputs,
    mesh.deformOutputs.val
  );

  // Design
  designMomentInput.val =
    Math.max(...Array.from(mesh.analyzeOutputs.val.bendingXX.values()).flat()) *
    1e-3; // Convert Nm to kNm

  designOutputs.val = getDesign(
    { grade: "GL24h", f_mk: 24, E_mean: 11500 },
    55,
    3,
    20,
    designMomentInput.val,
    0.8
  );

  // Update state
  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = nodeInputs;
  mesh.elementInputs.val = elementInputs;
});

// When clickedButton changes, update dialog body
van.derive(() => {
  if (clickedButton.val === "Tables")
    dialogBody.val = getTables({
      tables: new Map([
        [
          "columns",
          {
            text: "Columns",
            fields: [
              { field: "A", text: "x-Coordinate" },
              { field: "B", text: "y-Coordinate" },
              { field: "C", text: "z-Coordinate" },
            ],
            data: drawingColumnPoints,
          },
        ],
        [
          "slabs",
          {
            text: "Slabs",
            fields: [
              { field: "A", text: "x-Coordinate" },
              { field: "B", text: "y-Coordinate" },
              { field: "C", text: "z-Coordinate" },
            ],
            data: drawingSlabPoints,
          },
        ],
      ]),
    });

  if (clickedButton.val === "Report") {
    dialogBody.val = getReport({
      template: getTemplate,
      data: {
        designMomentInput,
        designOutputs,
      },
    });
  }
});

document.body.append(
  getParameters(parameters),
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
      solids: false,
      shellResults: "displacementZ",
    },
  }),
  getSnapTip(),
  getDrawingToolbar({ onToolbarClick, onClearPoints }),
  getToolbar({
    clickedButton,
    buttons: ["Tables", "Report"],
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  }),
  getDialog({ dialogBody })
);
