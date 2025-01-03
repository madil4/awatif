import van, { State } from "vanjs-core";
import { Node, Element } from "awatif-data-structure";
import { parameters, Parameters, viewer } from "awatif-ui";

// Init
const params: Parameters = {
  radius: {
    value: van.state(4),
    min: 1,
    max: 20,
    step: 0.1,
  },
  points: {
    value: van.state(10),
    min: 1,
    max: 20,
    step: 1,
  },
  circumferences: {
    value: van.state(10),
    min: 1,
    max: 20,
    step: 1,
  },
};

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);

// Events: on parameter change
van.derive(() => {
  const radius = params.radius.value.val;
  const points = params.points.value.val;
  const circumferences = params.circumferences.value.val;

  let nodes: Node[] = [];
  const elements: Element[] = [];

  for (let circum = 0; circum < circumferences; circum++) {
    const cirum1Angle = (1 / 2) * Math.PI - (Math.PI * circum) / circumferences;
    const cirum2Angle =
      (1 / 2) * Math.PI - (Math.PI * (circum + 1)) / circumferences;
    const circum1Z = Math.sin(cirum1Angle) * radius;
    const circum2Z = Math.sin(cirum2Angle) * radius;
    const circum1Radius = radius * Math.cos(Math.asin(circum1Z / radius));
    const circum2Radius = radius * Math.cos(Math.asin(circum2Z / radius));
    for (let point = 0; point < points; point++) {
      const point1Angle = (Math.PI * 2 * point) / points;
      const point2Angle = (Math.PI * 2 * (point + 1)) / points;
      const point1_1: Node = [
        Math.cos(point1Angle) * circum1Radius,
        Math.sin(point1Angle) * circum1Radius,
        circum1Z,
      ];
      const point1_2: Node = [
        Math.cos(point2Angle) * circum1Radius,
        Math.sin(point2Angle) * circum1Radius,
        circum1Z,
      ];
      const point2_1: Node = [
        Math.cos(point1Angle) * circum2Radius,
        Math.sin(point1Angle) * circum2Radius,
        circum2Z,
      ];
      const point2_2: Node = [
        Math.cos(point2Angle) * circum2Radius,
        Math.sin(point2Angle) * circum2Radius,
        circum2Z,
      ];

      nodes.push(point1_1, point1_2, point2_1, point2_2);
      elements.push(
        [nodes.length - 4, nodes.length - 3],
        [nodes.length - 4, nodes.length - 2],
        [nodes.length - 4, nodes.length - 1]
      );
    }
  }

  nodes = nodes.map((v) => [10 + v[0], 10 + v[1], v[2]]); // center model in the grid

  // update state
  nodesState.val = nodes;
  elementsState.val = elements;
});

document.body.append(
  parameters(params),
  viewer({
    structure: {
      nodes: nodesState,
      elements: elementsState,
    },
  })
);
