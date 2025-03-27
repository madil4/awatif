import van from "vanjs-core";

import { Node } from "awatif-data-model";
import { getViewer } from "awatif-ui";
import { mesh } from "../.././mesh";

const points = van.state([
  [0, 0, 0],
  [10, 0, 0],
  [10, 10, 0],
] as Node[]);
const polygon = van.state([0, 1, 2]);

const { nodes, elements, boundaryIndices } = mesh({ points, polygon });

// Add supports at boundary nodes
const nodeInputs = van.state({});
van.derive(() => {
  nodeInputs.val = {
    supports: new Map(
      boundaryIndices.val.map((i) => [i, [true, true, true, true, true, true]])
    ),
  };
});

const viewerElm = getViewer({
  structure: {
    nodes,
    elements,
    nodeInputs,
  },
});

document.body.appendChild(viewerElm);
