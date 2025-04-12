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
nodeInputs.val = {
  supports: new Map(
    boundaryIndices.map((i) => [i, [true, true, true, true, true, true]])
  ),
};

const viewerElm = getViewer({
  mesh: {
    nodes: van.state(nodes),
    elements: van.state(elements),
    nodeInputs,
  },
});

document.body.appendChild(viewerElm);
