import van from "vanjs-core";
import { Node } from "awatif-fem";

import { getViewer } from "../viewer/getViewer";
import { getColorMap } from "./getColorMap";
import { getLegend } from "./getLegend";

const nodes = van.state([
  [0, 0, 0],
  [5, 0, 0],
  [5, 0, 5],
  [0, 0, 5],
] as Node[]);
const elements = van.state([
  [0, 1, 2],
  [0, 2, 3],
]);
const values = van.state([0, 0, 10, 0]);
const objects3D = van.state([getColorMap(nodes, elements, values)]);

setTimeout(() => {
  values.val = [1, 5, 0, 0];

  objects3D.val = [...objects3D.rawVal]; // just to trigger viewer render
}, 1000);

document.body.append(
  getLegend(values),
  getViewer({
    mesh: { nodes, elements },
    objects3D,
  })
);
