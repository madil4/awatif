import van from "vanjs-core";
import { getDisplay, getLayout, getViewer, Grid, Geometry } from "@awatif/ui";

const grid: Grid = {
  size: van.state(10),
  division: van.state(20),
};

const geometry: Geometry = {
  points: van.state([
    [0, 0, 0],
    [2, 2, 0],
    [4, 0, 0],
  ]),
  lines: van.state([
    [0, 1],
    [1, 2],
  ]),
  visible: van.state(true),
};

document.body.append(
  getLayout({
    viewer: getViewer({ grid, geometry }),
    display: getDisplay({ grid, geometry }),
  })
);
