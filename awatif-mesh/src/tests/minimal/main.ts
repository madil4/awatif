import van from "vanjs-core";
import { getViewer } from "awatif-ui";

import { mesh } from "../.././mesh";

const nodes = van.state([]);
const elements = van.state([]);
const polygon = van.state([0, 1, 3]);

// Mimic a second call after a parameter change
setTimeout(() => {
  polygon.val = [0, 1, 2];
}, 1000);

van.derive(() => {
  const { nodes: meshNodes, elements: meshElements } = mesh({
    points: [
      [0, 0, 0],
      [10, 0, 0],
      [10, 0, 10],
      [5, 0, 3],
    ],
    polygon: polygon.val,
  });

  nodes.val = meshNodes.val;
  elements.val = meshElements.val;
});

const viewerElm = getViewer({
  structure: {
    nodes,
    elements,
  },
});

document.body.appendChild(viewerElm);
