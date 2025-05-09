import van from "vanjs-core";
import { getToolbar, getViewer, Drawing } from "awatif-ui";
import { Mesh } from "awatif-fem";
import { Building } from "../building/data-model.js";
import { getBase, getBaseGeometry } from "../building/getBase.js";
import { getSolids, getSolidsGeometry } from "../building/getSolids.js";
import { getDrawingToolbar } from "./getDrawingToolbar.js";
import { getSnapTip } from "./getSnapTip.js";

// Enums and Types
enum DrawingStory {
  first = "1st-floor",
  second = "2nd-floor",
}

// Init
const building: Building = {
  points: van.state([]),
  stories: van.state([]),
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
};

//* Drawing Data (Points - Polylines)
const drawingColumnPoints: Drawing["points"] = van.state([]);
const drawingSlabPoints: Drawing["points"] = van.state([]);

const drawingColumnPolylines: Drawing["polylines"] = van.state([]);
const drawingSlabPolylines: Drawing["polylines"] = van.state([]);

const totalDrawingPoints: Drawing["points"] = van.state([]);
const totalDrawingPolylines: Drawing["polylines"] = van.state([]);

const gridTarget = van.state({
  position: [10, 10, 0] as [number, number, number],
  rotation: [Math.PI / 2, 0, 0] as [number, number, number],
});

const FLOOR_HEIGHT: number = 4;

// Events
// On toolbar click, update grid target and points
let activeStory: DrawingStory = DrawingStory.first;
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

  // columns
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
    }
  }

  // Update state
  building.points.val = points;
  building.columns.val = columns;
  building.slabs.val = drawingSlabPolylines.val;
});

// When building data model changes, update base and solids geometry
van.derive(() => {
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
  }),
  getSnapTip(),
  getDrawingToolbar({ onToolbarClick }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  })
);
