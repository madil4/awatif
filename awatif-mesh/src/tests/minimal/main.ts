import van from "vanjs-core";

import { Node } from "awatif-data-model";
import { getViewer } from "awatif-ui";
import { mesh } from "../.././mesh";

const points = van.state([
  [0, 0, 0],
  [10, 0, 0],
  [10, 0, 10],
  [5, 0, 3],
] as Node[]);
const polygon = van.state([0, 1, 3]);

const { nodes, elements } = mesh({ points, polygon });

// Mimic a second call after a parameter change
setTimeout(() => {
  polygon.val = [0, 1, 2];
}, 1000);

const viewerElm = getViewer({
  structure: {
    nodes,
    elements,
  },
});

document.body.appendChild(viewerElm);
