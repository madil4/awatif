import van from "vanjs-core";
import { Mesh } from "awatif-fem";
import { Parameters, getParameters, getToolbar, getViewer } from "awatif-ui";
import { Building } from "./data-model";
import { getMesh } from "./getMesh";
import { getBase, getBaseGeometry } from "./getBase";
import { getSolids, getSolidsGeometry } from "./getSolids";
import { column } from "mathjs";

const parameters: Parameters = {
  stories: { value: van.state(2), min: 1, max: 5, step: 1 },
};

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

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
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

const solidsMesh = getSolids();
const base = getBase();
const objects3D = van.state([base]);
const solids = van.state([solidsMesh]);

// Events
// When number of stories changes, update building data model
van.derive(() => {
  const points: Building["points"]["val"] = [];
  const stories: Building["stories"]["val"] = [];
  const slabs: Building["slabs"]["val"] = [];
  const columns: Building["columns"]["val"] = [];
  const columnsByStory: Building["columnsByStory"]["val"] = new Map();
  const slabsByStory: Building["slabsByStory"]["val"] = new Map();
  const columnData: Building["columnData"]["val"] = new Map();
  const slabData: Building["slabData"]["val"] = new Map();

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

    const slabLoad: number = 1;
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

    // fixed supports for ground level columns
    if (j === 0) {
      const initialNumColumns = columns.length - columnsSample.length;
      for (let i = 0; i < columnsSample.length; i++) {
        columnData.set(initialNumColumns + i, {
          analysisInput: {
            support: [true, true, true, true, true, true],
          },
        });
      }
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
  building.columnData.val = columnData;
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
  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = nodeInputs;
  mesh.elementInputs.val = elementInputs;

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
  getParameters(parameters),
  getViewer({
    objects3D,
    solids,
    mesh,
    settingsObj: { nodes: false, loads: false },
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/building/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/",
  })
);
