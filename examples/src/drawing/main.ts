import van, { State } from "vanjs-core";
import { Element, Node } from "awatif-data-structure";
import { viewer, Drawing, Parameters, parameters } from "awatif-ui";
import { toolbar } from "./toolbar";
import { mesh } from "awatif-mesh";

// Todo: mesh is only working in one plane, make it in 3D
// Todo: figure a way to combine the column Structure with the slab Structure

// Init
const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const points: Drawing["points"] = van.state([]);
const points1: Drawing["points"] = van.state([
  [5, 5, 0],
  [15, 15, 0],
  [10, 15, 0],
]);
const points2: Drawing["points"] = van.state([
  [5, 5, 5],
  [15, 15, 5],
  [10, 15, 5],
]);
const polylines: Drawing["polylines"] = van.state([[0, 1, 2]]);
points.val = points1.val;

const floorState = van.state("1st-floor");

const height = 5;

const params: Parameters = {
  width: { value: van.state(3), min: 0.5, max: 5, step: 0.1 },
};

const gridTarget = van.state({
  position: [10, 10, 0] as [number, number, number],
  rotation: [Math.PI / 2, 0, 0] as [number, number, number],
});

// Events
// On points1 change draw columns
van.derive(() => {
  nodes.val = [];
  elements.val = [];

  points1.val.forEach((point, pointIndex) => {
    const { newNodes, newElements } = createThreeColumns(
      pointIndex * 4,
      point,
      height,
      params.width.value.val
    );

    nodes.val = [...nodes.rawVal, ...newNodes];
    elements.val = [...elements.rawVal, ...newElements];
  });

  // polylines
  // const { nodes: nodes1, elements: elements2 } = mesh({
  //   points: points2,
  //   polygon: van.state(polylines.val[0]),
  // });
  // nodes.val = [...nodes.rawVal, ...nodes1.rawVal];
  // elements.val = [
  //   ...elements.rawVal,
  //   ...elements2.rawVal.map((e) => e.map((e) => e + nodes.rawVal.length - 1)),
  // ];
});

// On toolbar click, update grid target and points
function onToolbarClick(floor: string) {
  gridTarget.val = {
    position: [10, 10, floor === "1st-floor" ? 0 : height] as [
      number,
      number,
      number
    ],
    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
  };

  points.val = floor === "1st-floor" ? points1.val : points2.val;

  floorState.val = floor;
}

van.derive(() => {
  if (floorState.rawVal == "1st-floor") points1.val = points.val;
  if (floorState.rawVal == "2nd-floor") points2.val = points.val;
});

document.body.append(
  parameters(params),
  viewer({
    structure: {
      nodes,
      elements,
    },
    drawingObj: {
      points,
      gridTarget,
    },
  }),
  toolbar({ onToolbarClick })
);

// Utils
function createThreeColumns(
  baseIndex: number,
  baseNode: Node,
  height: number,
  width: number
): { newNodes: Node[]; newElements: Element[] } {
  const x = baseNode[0];
  const y = baseNode[1];

  const newNodes: Node[] = [
    baseNode,
    [x - 0.5 * width, y - 0.5 * width, height],
    [x + 0.5 * width, y - 0.5 * width, height],
    [x, y + 0.5 * width, height],
  ];
  const newElements: Element[] = [
    [baseIndex, baseIndex + 1],
    [baseIndex, baseIndex + 2],
    [baseIndex, baseIndex + 3],
  ];

  return { newNodes, newElements };
}
