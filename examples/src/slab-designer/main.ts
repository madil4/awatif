import van, { State } from "vanjs-core";
import { Object3D } from "three";
import { getToolbar, getViewer, Drawing } from "awatif-ui";
import { Element, Node } from "awatif-fem";
import { toolbar } from "./toolbar.js";
import { getBase, getBaseGeometry } from "../building/getBase.js";
import { getSolids, getSolidsGeometry } from "../building/getSolids.js";
import { Building } from "../building/data-model.js";

// Snap Tip
import { initSnapTip } from "./snapTip.js";
initSnapTip();

// Enums and Types
enum DrawingLevel {
  first = "1st-floor",
  second = "2nd-floor",
}

//Init
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
const objects3D: State<Object3D[]> = van.state([base]);
const solids: State<Object3D[]> = van.state([solidsMesh]);

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

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);

const FLOOR_HEIGHT: number = 4;

//* Events
// On toolbar click, update grid target and points
let activeFloor: DrawingLevel = DrawingLevel.first;

function onToolbarClick(floor: DrawingLevel) {
  activeFloor = floor;

  gridTarget.val = {
    position: [10, 10, floor == DrawingLevel.first ? 0 : FLOOR_HEIGHT] as [number, number, number],
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  totalDrawingPoints.val = floor === DrawingLevel.first ? drawingColumnPoints.val : drawingSlabPoints.val;
  totalDrawingPolylines.val = floor === DrawingLevel.first ? drawingColumnPolylines.val : drawingSlabPolylines.val;
}

// On point or polyline change, update floor points
van.derive(() => {
  if (activeFloor == DrawingLevel.first) {
    drawingColumnPoints.val = totalDrawingPoints.val;
    drawingColumnPolylines.val = totalDrawingPolylines.val;
  }
  if (activeFloor == DrawingLevel.second) {
    drawingSlabPoints.val = totalDrawingPoints.val;
    drawingSlabPolylines.val = totalDrawingPolylines.val;
  }
});

van.derive(() => {
  nodes.val = [];
  elements.val = [];

  // create columns
  const columnsNodes: Node[] = [];
  const columnsElements: Element[] = [];
  drawingColumnPoints.val.forEach((point, pointIndex) => {
    const { columnNodes, columnElements } = createColumn(
      pointIndex * 2,
      point,
      FLOOR_HEIGHT,
    );

    columnsNodes.push(...columnNodes);
    columnsElements.push(...columnElements);
  });


  // create slabs
  const slabsNodes: Node[] = [];
  drawingSlabPoints.val.forEach((point, pointIndex) => {
    slabsNodes.push([point[0], point[1], FLOOR_HEIGHT]);
  });

  const slabsElements: Element[] = [];
  const baseIndex = columnsNodes.length;
  drawingSlabPolylines.val.forEach((polyline, polylineIndex) => {
    const newPolyline = polyline.map((v) => baseIndex + v);
    slabsElements.push(newPolyline);
  });


  // add columns and slabs
  nodes.val = [...nodes.rawVal, ...columnsNodes, ...slabsNodes];
  elements.val = [...elements.rawVal, ...columnsElements, ...slabsElements];
})

// When number of stories changes, update building data model
van.derive(() => {
  const points = [];
  const slabs = [];
  const columns = [];

  gridTarget.val = {
    position: [10, 10, activeFloor == DrawingLevel.first ? 0 : FLOOR_HEIGHT] as [number, number, number],
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  const storySlabsPoints: number[][] = [];
  const storyColumnsPoints: number[][][] = [];

  // slabs
  if (drawingSlabPoints.val.length > 0 ){
    for (let i = 0; i < drawingSlabPoints.val.length; i++)
      storySlabsPoints.push([
        drawingSlabPoints.val[i][0],
        drawingSlabPoints.val[i][1],
        FLOOR_HEIGHT,
      ]);

    const storySlabIndices: number[] = [];
    const lastIndex = points.length;
    for (let i = 0; i < storySlabsPoints.length; i++) {
      points.push(storySlabsPoints[i]);
      storySlabIndices.push(i + lastIndex);
    }

    slabs.push(storySlabIndices);
  }

  // columns
  if (drawingColumnPoints.val.length > 0){
    for (let i = 0; i < drawingColumnPoints.val.length; i++) {
      const column = drawingColumnPoints.val[i];
      storyColumnsPoints.push([
        [column[0], column[1], column[2] + FLOOR_HEIGHT]
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
  building.slabs.val = slabs;
});

// When building data model changes, update base and solids geometry
van.derive(() => {
  // console.log('[Columns]:', building.columns.val)
  // console.log('[Slabs]:', building.slabs.val)
  // console.log('[Points]:', building.points.val)

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
      mesh: {
        nodes,
        elements,
      },
      drawingObj: {
        points: totalDrawingPoints,
        polylines: totalDrawingPolylines,
        gridTarget
      },
      settingsObj:{
        elements: false
      }
  }),
  toolbar({ onToolbarClick }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  }),
);

function createColumn(
  baseIndex: number,
  baseNode: Node,
  height: number
): { columnNodes: Node[]; columnElements: Element[] } {
  const x = baseNode[0];
  const y = baseNode[1];

  const newNodes: Node[] = [
    [x, y, 0],
    [x, y, height]
  ];
  const newElements: Element[] = [ [baseIndex, baseIndex + 1] ];

  return { columnNodes: newNodes, columnElements: newElements };
}