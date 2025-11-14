import van from "vanjs-core";
import { getDisplay, getLayout, getViewer } from "@awatif/ui";

const grid = {
  size: van.state(10),
  division: van.state(20),
};

const geometry = {
  points: van.state([
    [0, 0, 0],
    [2, 2, 0],
    [4, 0, 0],
  ]),
  lines: van.state([
    [0, 1],
    [1, 2],
  ]),
};

document.body.append(
  getLayout({
    viewer: getViewer({ geometry, grid }),
    display: getDisplay({ grid }),
  })
);
