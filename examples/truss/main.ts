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
  points: van.state(
    new Map([
      [1, { id: 1, position: [-3, 0, 0] }],
      [2, { id: 2, position: [-1, 0, 0] }],
      [3, { id: 3, position: [1, 0, 0] }],
      [4, { id: 4, position: [3, 0, 0] }],
      [5, { id: 5, position: [-2.0, 1.5, 0] }],
      [6, { id: 6, position: [0.0, 1.5, 0] }],
      [7, { id: 7, position: [2.0, 1.5, 0] }],
    ])
  ),
  lines: van.state(
    new Map([
      [1, { id: 1, points: [1, 2] }],
      [2, { id: 2, points: [2, 3] }],
      [3, { id: 3, points: [3, 4] }],
      [4, { id: 4, points: [5, 6] }],
      [5, { id: 5, points: [6, 7] }],
      [6, { id: 6, points: [1, 5] }],
      [7, { id: 7, points: [7, 4] }],
      [8, { id: 8, points: [5, 2] }],
      [9, { id: 9, points: [2, 6] }],
      [10, { id: 10, points: [6, 3] }],
      [11, { id: 11, points: [3, 7] }],
    ])
  ),
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
