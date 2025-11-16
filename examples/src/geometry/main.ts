import van from "vanjs-core";
import {
  getDisplay,
  getHeader,
  getLayout,
  getViewer,
  Grid,
  Geometry,
  ToolbarMode,
  getToolbar,
} from "@awatif/ui";

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

const toolbarMode = van.state(ToolbarMode.GEOMETRY);

van.derive(() => {
  if (toolbarMode.val === ToolbarMode.GEOMETRY) {
    geometry.enabled.val = true;
    geometry.visible.val = true;
  } else {
    geometry.enabled.val = false;
  }
});

document.body.append(
  getLayout({
    viewer: getViewer({ grid, geometry }),
    header: getHeader(),
    display: getDisplay({ grid, geometry }),
    toolbar: getToolbar({ toolbarMode }),
  })
);
