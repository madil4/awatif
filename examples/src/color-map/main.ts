import * as math from "mathjs";
import van, { State } from "vanjs-core";
import { Element, Node } from "awatif-fem";
import {
  getParameters,
  Parameters,
  getViewer,
  getColorMap,
  getLegend,
  getToolbar,
} from "awatif-ui";
import { getMesh } from "awatif-mesh";

// Init
const parameters: Parameters = {
  boundary: {
    value: van.state(10),
    min: 1,
    max: 10,
    step: 0.1,
    label: "Boundary point",
  },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);

const distances = van.state([]);
const objects3D = van.state([getColorMap(nodes, elements, distances)]);

// Events: on parameter change
van.derive(() => {
  const boundaryNode = [parameters.boundary.value.val, 0, 3] as Node;

  const { nodes: meshNodes, elements: meshElements } = getMesh({
    points: [
      [0, 0, 0],
      [5, 0, 0],
      boundaryNode,
      [8, 0, 7],
      [15, 0, 5],
      [15, 0, 0],
      [20, 0, 0],
      [20, 0, 10],
      [0, 0, 10],
      [0, 0, 0],
    ],
    polygon: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    maxMeshSize: 1,
  });
  nodes.val = meshNodes;
  elements.val = meshElements;

  distances.val = getDistancesFromNode(boundaryNode, nodes.val);

  objects3D.val = [...objects3D.rawVal]; // just to trigger viewer render
});

document.body.append(
  getParameters(parameters),
  getViewer({
    mesh: { nodes, elements },
    objects3D,
  }),
  getLegend(distances),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/color-map/main.ts",
    author: "https://www.linkedin.com/in/siu-kai-cheung/",
  })
);

// Utils
function getDistancesFromNode(node: Node, points: Node[]): number[] {
  return points.map((point) => math.norm(math.subtract(point, node)) as number);
}
