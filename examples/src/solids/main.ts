import van, { State } from "vanjs-core";
import { Object3D } from "three";
import { Mesh } from "awatif-fem";
import { Parameters, getParameters, getToolbar, getViewer } from "awatif-ui";
import { Building, ColumnData, SlabData } from "./data-model";
import { getMesh } from "./getMesh";
import { base, getBaseGeometry } from "./getBase";
import { getSolidsGeometry, solids as solidsMesh } from "./getSolids";

type SimpleBuilding = {
  points: State<number[][]>;
  columns: State<number[][]>; // [start, end] Todo: change to [end] get start from the story below
  slabs: State<number[][][]>;
};

const simpleBuilding: SimpleBuilding = {
  points: van.state([]),
  columns: van.state([]),
  slabs: van.state([]),
};

const building: Building = {
  points: van.state([]),
  stories: van.state([]),
  columns: van.state([]),
  slabs: van.state([]),
  columnsByStory: van.state(new Map<number, number[]>()),
  slabsByStory: van.state(new Map<number, number[]>()),
  columnData: van.state(new Map<number, ColumnData>()),
  slabData: van.state(new Map<number, SlabData>()),
};

const slabSample: number[][] = [
  [0, 0, 4],
  [0, 10, 4],
  [18, 10, 4],
  [18, 0, 4],
  [0, 0, 4],
];

const columnsSample: number[][][] = [
  [
    [0, 0, 0],
    [0, 0, 4],
  ],
  [
    [0, 10, 0],
    [0, 10, 4],
  ],
  [
    [18, 10, 0],
    [18, 10, 4],
  ],
  [
    [18, 0, 0],
    [18, 0, 4],
  ],
  [
    [6, 0, 0],
    [6, 0, 4],
  ],
  [
    [6, 10, 0],
    [6, 10, 4],
  ],
];

const slabLoad: number = 1;

const parameters: Parameters = {
  stories: { value: van.state(2), min: 1, max: 5, step: 1 },
};

const objects3D: State<Object3D[]> = van.state([base]);
const solids: State<Object3D[]> = van.state([solidsMesh]);
const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

// Events
// When number of stories changes, update building data model
van.derive(() => {
  const points: [number, number, number][] = [];
  const stories: number[] = [];
  const slabs: number[][] = [];
  const columns: number[] = [];
  const columnsByStory = new Map<number, number[]>();
  const slabsByStory = new Map<number, number[]>();
  const slabData = new Map<number, SlabData>();

  const simpleSlabs = [];
  const simpleColumns = [];

  for (let j = 0; j < parameters.stories.value.val; j++) {
    const storySlabsPoints: [number, number, number][] = [];
    const storyColumnsPoints: [number, number, number][][] = [];

    const FLOOR_HEIGHT = 4;
    const z: number = FLOOR_HEIGHT * j;

    // slabs
    for (let i = 0; i < slabSample.length; i++)
      storySlabsPoints.push([
        slabSample[i][0],
        slabSample[i][1],
        slabSample[i][2] + z,
      ]);

    const storySlabIndices: number[] = [];
    let lastIndex = points.length;
    for (let i = 0; i < storySlabsPoints.length; i++) {
      points.push(storySlabsPoints[i]);
      storySlabIndices.push(i + lastIndex);
    }

    simpleSlabs.push([storySlabIndices]);

    slabs.push(storySlabIndices);
    stories.push(lastIndex);
    slabsByStory.set(j, [j]);
    slabData.set(j, {
      analysisInput: { areaLoad: slabLoad, isOpening: false },
    });

    // columns
    for (let i = 0; i < columnsSample.length; i++) {
      const column = columnsSample[i];
      storyColumnsPoints.push([
        [column[0][0], column[0][1], column[0][2] + z],
        [column[1][0], column[1][1], column[1][2] + z],
      ]);
    }

    const newColumnsIndices: number[] = [];
    for (let i = 0; i < storyColumnsPoints.length; i++) {
      lastIndex = points.length;
      points.push(...storyColumnsPoints[i]);
      columns.push(lastIndex + 1);
      newColumnsIndices.push(columns.length - 1);

      simpleColumns.push([lastIndex, lastIndex + 1]);
    }

    columnsByStory.set(j, newColumnsIndices);
  }

  // Update state
  building.points.val = points;
  building.stories.val = stories;
  building.slabs.val = slabs;
  building.columns.val = columns;
  building.columnsByStory.val = columnsByStory;
  building.slabsByStory.val = slabsByStory;
  building.slabData.val = slabData;

  simpleBuilding.points.val = points;
  simpleBuilding.slabs.val = simpleSlabs;
  simpleBuilding.columns.val = simpleColumns;
});

// When building data model changes, update base and solids geometry
van.derive(() => {
  base.geometry = getBaseGeometry(
    simpleBuilding.points.val,
    simpleBuilding.slabs.val,
    simpleBuilding.columns.val
  );

  solidsMesh.geometry = getSolidsGeometry(
    simpleBuilding.points.val,
    simpleBuilding.slabs.val,
    simpleBuilding.columns.val
  );

  getMesh(building);

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering
});

document.body.append(
  getParameters(parameters),
  getViewer({ objects3D, solids, mesh, settingsObj: { loads: false } }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/solids/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  })
);
