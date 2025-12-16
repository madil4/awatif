import van from "vanjs-core";
import {
  getDisplay,
  getTooltips,
  getLayout,
  getViewer,
  Grid,
  Geometry,
  FeMesh,
  ToolbarMode,
  getToolbar,
} from "@awatif/ui";
import { Mesh } from "../components/mesh/data-model";
import { lineMesh } from "../components/mesh/lineMesh";
import { getFeMesh } from "../components/mesh/getFeMesh";

const toolbarMode = van.state(ToolbarMode.GEOMETRY);

const grid: Grid = {
  size: van.state(10),
  division: van.state(20),
};

const geometry: Geometry = {
  points: van.state([
    [-3, 0, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [3, 0, 0],
    [-2.0, 1.5, 0],
    [0.0, 1.5, 0],
    [2.0, 1.5, 0],
  ]),
  lines: van.state([
    [0, 1],
    [1, 2],
    [2, 3],
    [4, 5],
    [5, 6],
    [0, 4],
    [6, 3],
    [4, 1],
    [1, 5],
    [5, 2],
    [2, 6],
  ]),
  visible: van.state(true),
};

const feMesh: FeMesh = {
  nodes: van.state([]),
  elements: van.state([]),
  visible: van.state(false),
};

const mesh: Mesh = new Map([
  [
    1,
    {
      ...lineMesh,
      params: van.state({
        divisions: 3,
      }),
    },
  ],
]);

// Events
// Sync toolbar mode with geometry and mesh visibility
van.derive(() => {
  if (toolbarMode.val === ToolbarMode.GEOMETRY) geometry.visible.val = true;

  if (toolbarMode.val === ToolbarMode.MESH) feMesh.visible.val = true;
  else feMesh.visible.val = false;
});

// Update FE mesh when mesh components change
van.derive(() => {
  const meshData = getFeMesh(mesh, geometry);
  feMesh.nodes.val = meshData.nodes;
  feMesh.elements.val = meshData.elements;
});

document.body.append(
  getLayout({
    viewer: getViewer({ grid, geometry, feMesh }),
    tooltips: getTooltips(),
    display: getDisplay({ grid, geometry, feMesh }),
    toolbar: getToolbar({ toolbarMode }),
  })
);
