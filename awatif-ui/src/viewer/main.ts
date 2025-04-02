import van from "vanjs-core";
import { getViewer } from "./getViewer";
import { Node } from "awatif-fem";

const nodes = van.state([
  // To test orientation for beams
  [0, 0, 0],
  [4, 0, 5],
  // To test orientation for shells
  [5, 3, 0],
  [10, 0, 0],
  [5, 0, 5],
] as Node[]);
const elements = van.state([
  [0, 1],
  [2, 3, 4],
]);

const viewerElm = getViewer({
  structure: { nodes, elements },
  settingsObj: { orientations: true },
});

document.body.appendChild(viewerElm);
