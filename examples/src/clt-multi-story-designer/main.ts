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
import { CLTLayup, Mesh, analyze, deform } from "awatif-fem";
import { Building } from "../building/data-model";
import { getBase, getBaseGeometry } from "../building/getBase";
import { getSolids, getSolidsGeometry } from "../building/getSolids";
import { getDrawingToolbar } from "../slab-designer/drawingToolbar/getDrawingToolbar";
import { getSnapTip } from "../slab-designer/getSnapTip";
import { getMesh } from "../building/getMesh";
import { getDesign } from "../slab-designer/design/getDesign";
import { getTemplate } from "../slab-designer/design/getTemplate";

enum DrawingLevel {
  columns = "1st-floor",
  slab = "2nd-floor",
}

const FLOOR_HEIGHT = 4;

const parameters: Parameters = {
  stories: {
    value: van.state(3),
    min: 1,
    max: 8,
    step: 1,
    label: "stories",
  },
  meshSize: {
    value: van.state(0.5),
    min: 0.1,
    max: 2,
    step: 0.1,
    label: "mesh size (m)",
  },
  loads: {
    value: van.state(4.335),
    min: -50,
    max: 50,
    step: 0.1,
    label: "Load (kN/m²)",
  },
};

const building: Building = {
  points: van.state([]),
  stories: van.state([0]),
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

const designMomentInput = van.state(0);
const designOutputs = van.state();

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
  [3, 2, FLOOR_HEIGHT],
  [3, 11, FLOOR_HEIGHT],
  [12, 11, FLOOR_HEIGHT],
  [18, 11, FLOOR_HEIGHT],
  [18, 6, FLOOR_HEIGHT],
  [12, 6, FLOOR_HEIGHT],
  [12, 2, FLOOR_HEIGHT],
  [3, 6, FLOOR_HEIGHT],
] as [number, number, number][];

const sampleSlabPolylines = [[0, 1, 2, 3, 4, 5, 6]];

const drawingColumnPoints: Drawing["points"] = van.state(sampleColumnPoints);
const drawingSlabPoints: Drawing["points"] = van.state(sampleSlabPoints);
const drawingSlabPolylines: Drawing["polylines"] = van.state(sampleSlabPolylines);

const totalDrawingPoints: Drawing["points"] = van.state(sampleColumnPoints);
const totalDrawingPolylines: Drawing["polylines"] = van.state([]);

const gridTarget = van.state({
  position: [10, 10, 0] as [number, number, number],
  rotation: [Math.PI / 2, 0, 0] as [number, number, number],
});

const clickedButton = van.state("");
const dialogBody = van.state(undefined);

let activeLevel: DrawingLevel = DrawingLevel.columns;

function onToolbarClick(level: string) {
  activeLevel = level as DrawingLevel;

  gridTarget.val = {
    position:
      activeLevel === DrawingLevel.columns
        ? ([10, 10, 0] as [number, number, number])
        : ([10, 10, FLOOR_HEIGHT] as [number, number, number]),
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  totalDrawingPoints.val =
    activeLevel === DrawingLevel.columns
      ? drawingColumnPoints.val
      : drawingSlabPoints.val;

  totalDrawingPolylines.val =
    activeLevel === DrawingLevel.columns ? [] : drawingSlabPolylines.val;
}

function onClearPoints() {
  if (activeLevel === DrawingLevel.columns) {
    drawingColumnPoints.val = [];
  } else {
    drawingSlabPoints.val = [];
    drawingSlabPolylines.val = [];
  }

  totalDrawingPoints.val =
    activeLevel === DrawingLevel.columns ? drawingColumnPoints.val : drawingSlabPoints.val;
  totalDrawingPolylines.val =
    activeLevel === DrawingLevel.columns ? [] : drawingSlabPolylines.val;
}

van.derive(() => {
  if (activeLevel === DrawingLevel.columns) {
    drawingColumnPoints.val = totalDrawingPoints.val;
  } else {
    drawingSlabPoints.val = totalDrawingPoints.val;
    drawingSlabPolylines.val = totalDrawingPolylines.val;
  }
});

van.derive(() => {
  parameters.stories.value.val;
  parameters.meshSize.value.val;
  parameters.loads.value.val;
  drawingColumnPoints.val;
  drawingSlabPoints.val;
  drawingSlabPolylines.val;

  const stories = [] as number[];
  const points: [number, number, number][] = [];
  const columns: number[] = [];
  const slabs: number[][] = [];

  const columnsByStory: Building["columnsByStory"]["val"] = new Map();
  const slabsByStory: Building["slabsByStory"]["val"] = new Map();
  const columnData: Building["columnData"]["val"] = new Map();
  const slabData: Building["slabData"]["val"] = new Map();

  const slabLoops = drawingSlabPolylines.val.filter((polyline) => polyline.length >= 3);

  if (
    parameters.stories.value.val < 1 ||
    drawingColumnPoints.val.length === 0 ||
    drawingSlabPoints.val.length === 0 ||
    slabLoops.length === 0
  ) {
    building.points.val = [];
    building.stories.val = [];
    building.columns.val = [];
    building.slabs.val = [];
    building.columnsByStory.val = new Map();
    building.slabsByStory.val = new Map();
    building.columnData.val = new Map();
    building.slabData.val = new Map();
    return;
  }

  const cltLayup = buildSevenLayerCLTLayup();

  for (let story = 0; story < parameters.stories.value.val; story++) {
    const zTop = FLOOR_HEIGHT * (story + 1);

    const slabStart = points.length;
    drawingSlabPoints.val.forEach((pt) => {
      points.push([pt[0], pt[1], zTop]);
    });
    stories.push(slabStart);

    const storySlabIndices: number[] = [];
    slabLoops.forEach((polyline) => {
      const slab = polyline.map((localIndex) => slabStart + localIndex);
      const slabIndex = slabs.length;

      slabs.push(slab);
      storySlabIndices.push(slabIndex);

      slabData.set(slabIndex, {
        analysisInput: {
          meshSize: parameters.meshSize.value.val,
          // Solver runs in SI base units here (N, m).
          areaLoad: -parameters.loads.value.val * 1e3,
          isOpening: false,
          cltLayup,
        },
      });
    });
    slabsByStory.set(story, storySlabIndices);

    const storyColumnsIndices: number[] = [];
    drawingColumnPoints.val.forEach((pt) => {
      points.push([pt[0], pt[1], zTop]);

      columns.push(points.length - 1);
      const columnIndex = columns.length - 1;
      storyColumnsIndices.push(columnIndex);

      if (story === 0) {
        columnData.set(columnIndex, {
          analysisInput: {
            support: [true, true, true, true, true, true],
          },
        });
      }
    });

    columnsByStory.set(story, storyColumnsIndices);
  }

  building.points.val = points;
  building.stories.val = stories;
  building.columns.val = columns;
  building.slabs.val = slabs;
  building.columnsByStory.val = columnsByStory;
  building.slabsByStory.val = slabsByStory;
  building.columnData.val = columnData;
  building.slabData.val = slabData;
});

van.derive(() => {
  const { nodes, elements, nodeInputs, elementInputs } = getMesh(
    building.points.val,
    building.stories.val,
    building.columns.val,
    building.slabs.val,
    building.columnsByStory.val,
    building.slabsByStory.val,
    building.columnData.val,
    building.slabData.val,
  );

  base.geometry = getBaseGeometry(building.points.val, [], building.columns.val);
  solidsMesh.geometry = getSolidsGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val,
  );
  objects3D.val = [...objects3D.rawVal];

  if (!nodes.length || !elements.length) {
    mesh.nodes.val = [];
    mesh.elements.val = [];
    mesh.nodeInputs.val = {};
    mesh.elementInputs.val = {};
    mesh.deformOutputs.val = {};
    mesh.analyzeOutputs.val = {};
    designMomentInput.val = 0;
    designOutputs.val = undefined;
    return;
  }

  mesh.deformOutputs.val = deform(nodes, elements, nodeInputs, elementInputs);
  mesh.analyzeOutputs.val = analyze(
    nodes,
    elements,
    elementInputs,
    mesh.deformOutputs.val,
  );

  const bendingXX = Array.from(mesh.analyzeOutputs.val.bendingXX?.values() ?? []).flat();
  designMomentInput.val = bendingXX.length ? Math.max(...bendingXX) * 1e-3 : 0;

  designOutputs.val = getDesign(
    { grade: "GL24h", f_mk: 24, E_mean: 11500 },
    55,
    3,
    20,
    designMomentInput.val,
    0.8,
  );

  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = nodeInputs;
  mesh.elementInputs.val = elementInputs;
});

van.derive(() => {
  if (clickedButton.val === "Tables") {
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
            text: "Slab boundary",
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
  }

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
      shellResultScales: {
        displacementZ: 1000,
      },
      shellResultUnits: {
        displacementZ: "mm",
      },
      showFrameResults: false,
    },
  }),
  getSnapTip(),
  getDrawingToolbar({ onToolbarClick, onClearPoints }),
  getToolbar({
    clickedButton,
    buttons: ["Tables", "Report"],
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/clt-multi-story-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  }),
  getDialog({ dialogBody }),
);

function buildSevenLayerCLTLayup(): CLTLayup {
  const mmToM = 1e-3;
  const nmm2ToNm2 = 1e6;
  const pattern = [30, 40, 30, 40, 30, 40, 30];
  const angles = [0, 90, 0, 90, 0, 90, 0];

  return {
    layers: pattern.map((thkMm, i) => ({
      thickness: thkMm * mmToM,
      thetaDeg: angles[i],
      Ex: 11000 * nmm2ToNm2,
      Ey: 370 * nmm2ToNm2,
      nuXY: 0.2,
      Gxy: 690 * nmm2ToNm2,
      Gxz: 690 * nmm2ToNm2,
      Gyz: 69 * nmm2ToNm2,
    })),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };
}
