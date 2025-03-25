import van from "vanjs-core";

import { Node } from "awatif-data-structure";
import { getViewer, getColorMap } from "awatif-ui";
import { getLegend } from "./getLegend";

const objects3D = van.state([]);
const values = van.state([0, 1, 2, 1]);

const points = van.state([
  [0, 0, 0],
  [5, 0, 0],
  [5, 0, 5],
  [0, 0, 5],
] as Node[]);
const polygon = van.state([0, 1, 2, 3]);

van.derive(() => {
  values.val; // to trigger reactivity

  objects3D.val = [getColorMap(points, polygon, values).val];
});

setTimeout(() => {
  values.val = [0, 1, 5, 1];
}, 1000);

document.body.append(
  getLegend(values, 10),
  getViewer({
    objects3D,
  })
);
