import van, { State } from "vanjs-core";
import * as THREE from "three";
import { Node, Element, NodeInputs } from "awatif-fem";
import { getToolbar, getParameters, Parameters, getViewer } from "awatif-ui";

// Init
const parameters: Parameters = {
  xSpan: {
    value: van.state(16),
    min: 1,
    max: 20,
    step: 0.1,
    label: "xSpan (m)",
  },
  xDivisions: {
    value: van.state(14),
    min: 5,
    max: 20,
    step: 1,
  },
  ySpan: {
    value: van.state(5),
    min: 1,
    max: 10,
    step: 0.1,
    label: "ySpan (m)",
  },
  yDivisions: {
    value: van.state(3),
    min: 1,
    max: 5,
    step: 1,
  },
  height: {
    value: van.state(9),
    min: 0,
    max: 15,
    step: 0.1,
    label: "height (m)",
  },
  heightOffset: {
    value: van.state(0),
    min: -10,
    max: 10,
    step: 0.1,
    label: "height offset (m)",
  },
};

// Todo: refactor this State prefix, it is not needed, see color-map example
const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);
const nodeInputsState: State<NodeInputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  const xSpan = parameters.xSpan.value.val;
  const xDivisions = parameters.xDivisions.value.val;
  const ySpan = parameters.ySpan.value.val;
  const yDivisions = parameters.yDivisions.value.val;
  const height = parameters.height.value.val;
  const heightOffset = parameters.heightOffset.value.val;

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0 + xSpan / 2 + heightOffset, 0, height),
    new THREE.Vector3(0 + xSpan, 0, 0)
  );

  const nodes: Node[] = [];
  const elements: Element[] = [];

  // nodes
  for (let i = 0; i <= yDivisions; i++) {
    nodes.push(
      ...curve.getPoints(xDivisions).map((v) => {
        v.setY(0 + i * (ySpan / yDivisions));
        return v.toArray();
      })
    );
  }

  // main beams
  for (let y = 0; y <= (yDivisions + 1) * xDivisions; y += xDivisions + 1) {
    for (let x = 0; x < xDivisions; x++) {
      elements.push([y + x, y + x + 1]);
    }
  }

  // secondary beams
  for (let y = 0; y < yDivisions * (xDivisions + 1); y += xDivisions + 1) {
    for (let x = 0; x < xDivisions + 1; x++) {
      elements.push([x + y, x + xDivisions + 1 + y]);
    }
  }

  const startSupports = [...Array(yDivisions + 1).keys()].map(
    (i) => (xDivisions + 1) * i
  );
  const endSupports = [...Array(yDivisions + 1).keys()].map(
    (i) => (xDivisions + 1) * i + xDivisions
  );

  const nodeInputs: NodeInputs = {
    supports: new Map([
      ...(startSupports.map((i) => [
        i,
        [true, true, true, true, true, true],
      ]) as any),
      ...(endSupports.map((i) => [
        i,
        [true, true, true, true, true, true],
      ]) as Array<[number, boolean[]]>),
    ]),
  };

  // update state
  nodesState.val = nodes;
  elementsState.val = elements;
  nodeInputsState.val = nodeInputs;
});

document.body.append(
  getParameters(parameters),
  getViewer({
    mesh: {
      nodes: nodesState,
      elements: elementsState,
      nodeInputs: nodeInputsState,
    },
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/curves/main.ts",
    author: "https://www.linkedin.com/in/madil4/",
  })
);
