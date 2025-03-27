import van from "vanjs-core";
import { getViewer } from "awatif-ui";

import { mesh } from "../.././mesh";

const { nodes, elements, boundaryIndices } = mesh({
  points: [
    [0, 0, 0],
    [10, 0, 0],
    [10, 10, 0],
  ],
  polygon: [0, 1, 2],
});

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
