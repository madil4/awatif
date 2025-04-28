import van, { State } from "vanjs-core";
import { Parameters, getParameters, getToolbar, getViewer } from "awatif-ui";
import { Building, ColumnData, SlabData } from "./data-model";
import { getBaseGeometry } from "./getBaseGeometry";
import { getSolidsGeometry } from "./getSolidsGeometry";
import {
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh as Math3js,
  MeshPhongMaterial,
  Object3D,
} from "three";
import { Mesh } from "awatif-fem";
import { getMesh } from "./getMesh";

const parameters: Parameters = {
  stories: { value: van.state(2), min: 1, max: 5, step: 1 },
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

const columnsSample: number[][] = [
  [0, 0, 4],
  [0, 10, 4],
  [18, 10, 4],
  [18, 0, 4],
  [6, 0, 4],
  [6, 10, 4],
];

const slabLoad: number = 1;

const solidsMesh = new Math3js(
  new BufferGeometry(),
  new MeshPhongMaterial({ color: 0xffe6cc })
);
const base = new LineSegments(new BufferGeometry(), new LineBasicMaterial());
base.frustumCulled = false;
base.material.depthTest = false; // don't know why but is solves the rendering order issue

const objects3D: State<Object3D[]> = van.state([base]);
const solids: State<Object3D[]> = van.state([solidsMesh]);
const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
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

  for (let j = 0; j < parameters.stories.value.val; j++) {
    const storySlabsPoints: [number, number, number][] = [];

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

    slabs.push(storySlabIndices);

    stories.push(lastIndex);
    slabsByStory.set(j, [j]);
    slabData.set(j, {
      analysisInput: { areaLoad: slabLoad, isOpening: false },
    });

    // columns
    const newColumnsIndices: number[] = [];
    for (let i = 0; i < columnsSample.length; i++) {
      const lastIndex = points.length;

      points.push([
        columnsSample[i][0],
        columnsSample[i][1],
        columnsSample[i][2] + z,
      ]);
      columns.push(lastIndex);
      newColumnsIndices.push(columns.length - 1);
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

  const { nodes, elements, nodeInputs } = getMesh(
    building.points.val,
    building.stories.val,
    building.columns.val,
    building.slabs.val,
    building.columnsByStory.val,
    building.slabsByStory.val,
    building.slabData.val
  );
  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = nodeInputs;

  objects3D.val = [...objects3D.rawVal]; // just to trigger re-rendering
});

document.body.append(
  getParameters(parameters),
  getViewer({
    objects3D,
    solids,
    mesh,
    settingsObj: { loads: false },
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/solids/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  })
);
