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
  getParameters,
} from "@awatif/ui";
import { getMesh, Geometry, Mesh, MeshComponents } from "@awatif/components";

const geometry: Geometry = {
  points: van.state(
    new Map([
      [1, [-3, 0, 0]],
      [2, [-1, 0, 0]],
      [3, [1, 0, 0]],
      [4, [3, 0, 0]],
      [5, [-2.0, 1.5, 0]],
      [6, [0.0, 1.5, 0]],
      [7, [2.0, 1.5, 0]],
    ])
  ),
  lines: van.state(
    new Map([
      [1, [1, 2]],
      [2, [2, 3]],
      [3, [3, 4]],
      [4, [5, 6]],
      [5, [6, 7]],
      [6, [1, 5]],
      [7, [7, 4]],
      [8, [5, 2]],
      [9, [2, 6]],
      [10, [6, 3]],
      [11, [3, 7]],
    ])
  ),
  visible: van.state(true),
  selection: van.state(null),
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  visible: van.state(false),
};

const meshComponents: MeshComponents = van.state([
  {
    name: "Top Chords",
    templateIndex: 0,
    geometry: [4, 5],
    params: { divisions: 3 },
  },
  {
    name: "Bottom Chords",
    templateIndex: 0,
    geometry: [1, 2, 3],
    params: { divisions: 3 },
  },
  {
    name: "Webs",
    templateIndex: 0,
    geometry: [6, 7, 8, 9, 10, 11],
    params: { divisions: 5 },
  },
]);

const grid: Grid = {
  size: van.state(10),
  division: van.state(20),
};

const toolbarMode = van.state(ToolbarMode.GEOMETRY);
const activeComponent = van.state<number | null>(null);

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
    components: getComponents({
      toolbarMode,
      geometry,
      meshComponents,
      activeComponent,
    }),
    toolbar: getToolbar({ toolbarMode }),
    parameters: getParameters({
      meshComponents,
      activeComponent,
      toolbarMode,
    }),
  })
);
