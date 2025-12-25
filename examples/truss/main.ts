import van from "vanjs-core";
import {
  getDisplay,
  getTooltips,
  getLayout,
  getViewer,
  Grid,
  ToolbarMode,
  getToolbar,
  getComponents,
} from "@awatif/ui";
import {
  MeshComponents,
  lineMesh,
  getMesh,
  Geometry,
  Mesh,
} from "@awatif/components";

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

const grid: Grid = {
  size: van.state(10),
  division: van.state(20),
};

const toolbarMode = van.state(ToolbarMode.GEOMETRY);
const meshComponents: MeshComponents = van.state(new Map([[0, lineMesh]]));

// Toolbar events
van.derive(() => {
  if (toolbarMode.val === ToolbarMode.GEOMETRY) geometry.visible.val = true;

  if (toolbarMode.val === ToolbarMode.MESH) mesh.visible.val = true;
  else mesh.visible.val = false;
});

// Mesh events
van.derive(() => {
  const meshData = getMesh({
    geometry: {
      points: geometry.points.val,
      lines: geometry.lines.val,
    },
    meshComponents: meshComponents.val,
  });

  mesh.nodes.val = meshData.nodes;
  mesh.elements.val = meshData.elements;
});

document.body.append(
  getLayout({
    viewer: getViewer({ grid, geometry, mesh }),
    tooltips: getTooltips(),
    display: getDisplay({ grid, geometry, mesh }),
    components: getComponents({ meshComponents, toolbarMode }),
    toolbar: getToolbar({ toolbarMode }),
  })
);
