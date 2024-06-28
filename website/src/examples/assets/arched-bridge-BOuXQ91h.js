import { a as app } from "./app-DFn3ZYI3.js";
import { Q as QuadraticBezierCurve3, V as Vector3 } from "./three.module-G6cHRXNE.js";
const parameters = {
  xSpan: {
    value: 16,
    min: 1,
    max: 20,
    step: 0.1,
    label: "xSpan (m)"
  },
  xDivisions: {
    value: 14,
    min: 5,
    max: 20,
    step: 1
  },
  ySpan: {
    value: 5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "ySpan (m)"
  },
  yDivisions: {
    value: 3,
    min: 1,
    max: 5,
    step: 1
  },
  height: {
    value: 9,
    min: 0,
    max: 15,
    step: 0.1,
    label: "height (m)"
  },
  heightOffset: {
    value: 0,
    min: -10,
    max: 10,
    step: 0.1,
    label: "height offset (m)"
  }
};
function onParameterChange(parameters2) {
  const xSpan = parameters2.xSpan.value;
  const xDivisions = parameters2.xDivisions.value;
  const ySpan = parameters2.ySpan.value;
  const yDivisions = parameters2.yDivisions.value;
  const height = parameters2.height.value;
  const heightOffset = parameters2.heightOffset.value;
  const curve = new QuadraticBezierCurve3(
    new Vector3(0, 0, 0),
    new Vector3(0 + xSpan / 2 + heightOffset, 0, height),
    new Vector3(0 + xSpan, 0, 0)
  );
  const nodes = [];
  const elements = [];
  for (let i = 0; i <= yDivisions; i++) {
    nodes.push(
      ...curve.getPoints(xDivisions).map((v) => {
        v.setY(0 + i * (ySpan / yDivisions));
        return v.toArray();
      })
    );
  }
  for (let y = 0; y <= (yDivisions + 1) * xDivisions; y += xDivisions + 1) {
    for (let x = 0; x < xDivisions; x++) {
      elements.push([y + x, y + x + 1]);
    }
  }
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
  const analysisInputs = [
    ...startSupports.map(
      (i) => ({
        node: i,
        support: [true, true, true]
      })
    ),
    ...endSupports.map(
      (i) => ({
        node: i,
        support: [true, true, true]
      })
    )
  ];
  return { nodes, elements, analysisInputs };
}
app({
  parameters,
  onParameterChange
});
