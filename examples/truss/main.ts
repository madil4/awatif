import van from "vanjs-core";
import {
  getDisplay,
  getTooltips,
  getLayout,
  getViewer,
  Grid,
  Geometry,
  Mesh,
  ToolbarMode,
  getToolbar,
} from "@awatif/ui";
import { MeshComponents, lineMesh, getMesh } from "@awatif/components";

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

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  visible: van.state(false),
};

const toolbarMode = van.state(ToolbarMode.GEOMETRY);

// Events
van.derive(() => {
  if (toolbarMode.val === ToolbarMode.GEOMETRY) geometry.visible.val = true;

  if (toolbarMode.val === ToolbarMode.MESH) mesh.visible.val = true;
  else mesh.visible.val = false;
});

van.derive(() => {
  const meshComponents: MeshComponents = new Map(
    geometry.lines.val.map((_, i) => [i, lineMesh])
  );

  const meshData = getMesh(meshComponents, geometry);
  mesh.nodes.val = meshData.nodes;
  mesh.elements.val = meshData.elements;
});

document.body.append(
  getLayout({
    viewer: getViewer({ grid, geometry, mesh }),
    tooltips: getTooltips(),
    display: getDisplay({ grid, geometry, mesh }),
    toolbar: getToolbar({ toolbarMode }),
  })
);
