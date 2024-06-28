import { app, Parameters, Model } from "awatif-ui";
import { Node, Element, AnalysisInput } from "awatif-data-structure";
import * as THREE from "three";

export const parameters: Parameters = {
  xSpan: {
    value: 16,
    min: 1,
    max: 20,
    step: 0.1,
    label: "xSpan (m)",
  },
  xDivisions: {
    value: 14,
    min: 5,
    max: 20,
    step: 1,
  },
  ySpan: {
    value: 5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "ySpan (m)",
  },
  yDivisions: {
    value: 3,
    min: 1,
    max: 5,
    step: 1,
  },
  height: {
    value: 9,
    min: 0,
    max: 15,
    step: 0.1,
    label: "height (m)",
  },
  heightOffset: {
    value: 0,
    min: -10,
    max: 10,
    step: 0.1,
    label: "height offset (m)",
  },
};

export function onParameterChange(parameters: Parameters): Model {
  const xSpan = parameters.xSpan.value;
  const xDivisions = parameters.xDivisions.value;
  const ySpan = parameters.ySpan.value;
  const yDivisions = parameters.yDivisions.value;
  const height = parameters.height.value;
  const heightOffset = parameters.heightOffset.value;

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

  const analysisInputs: AnalysisInput[] = [
    ...startSupports.map(
      (i) =>
        ({
          node: i,
          support: [true, true, true],
        } as AnalysisInput)
    ),
    ...endSupports.map(
      (i) =>
        ({
          node: i,
          support: [true, true, true],
        } as AnalysisInput)
    ),
  ];

  return { nodes, elements, analysisInputs };
}

app({
  parameters,
  onParameterChange,
});
