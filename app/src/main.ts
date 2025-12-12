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
  enabled: van.state(true),
};

const feMesh: FeMesh = {
  nodes: van.state([]),
  elements: van.state([]),
  visible: van.state(false),
};

// Events
// Sync toolbar mode with geometry and mesh visibility
van.derive(() => {
  if (toolbarMode.val === ToolbarMode.GEOMETRY) {
    geometry.enabled.val = true;
    geometry.visible.val = true;
  } else {
    geometry.enabled.val = false;
  }

  if (toolbarMode.val === ToolbarMode.MESH) feMesh.visible.val = true;
  else feMesh.visible.val = false;
});

// Update FE mesh when geometry changes
van.derive(() => {
  const meshData = getFeMesh(geometry);
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

// Utils
function getFeMesh(geometry: Geometry): {
  nodes: number[][];
  elements: number[][];
} {
  const nodes: number[][] = [];
  const elements: number[][] = [];
  let nodeIndex = 0;

  geometry.lines.val.forEach(([startIdx, endIdx]) => {
    const start = geometry.points.val[startIdx];
    const end = geometry.points.val[endIdx];

    // Create 4 nodes along the line (3 divisions)
    const lineNodes: number[] = [];
    for (let i = 0; i < 4; i++) {
      const t = i / 3; // 0, 1/3, 2/3, 1
      const node = [
        start[0] + t * (end[0] - start[0]),
        start[1] + t * (end[1] - start[1]),
        start[2] + t * (end[2] - start[2]),
      ];
      nodes.push(node);
      lineNodes.push(nodeIndex++);
    }

    // Create 3 line elements
    for (let i = 0; i < 3; i++) {
      elements.push([lineNodes[i], lineNodes[i + 1]]);
    }
  });

  return { nodes, elements };
}
