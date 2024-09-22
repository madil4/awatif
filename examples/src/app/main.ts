import van from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer, layout, title, grid } from "awatif-ui";

// init
const inputPolyline = van.state([
  [0, 0, 0],
  [5, 0, 5],
  [10, 0, 0],
]);
const outputLines = van.state([]);
const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);
const objects3D = van.state([lines]);
const sheetsObj = new Map();

// update
sheetsObj.set("polyline", {
  text: "Polyline",
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
    { field: "2", text: "Z-coordinate", editable: { type: "float" } },
  ],
  data: inputPolyline,
});

// events
const onSheetChange = ({ data }) => (inputPolyline.val = data);

// on inputPolyline change: render lines
van.derive(() => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(inputPolyline.val.flat(), 3)
  );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});

// on inputPolyline change: compute length
van.derive(() => {
  const lengths = [];

  for (let i = 0; i < inputPolyline.val.length - 1; i++) {
    lengths.push([
      getLength(inputPolyline.rawVal[i], inputPolyline.rawVal[i + 1]).toFixed(
        2
      ),
      `${i} - ${i + 1}`,
    ]);
  }

  outputLines.val = lengths;
});

document.body.append(
  layout({
    topLeft: title("App Example"),
    preview: grid(
      [
        { field: "0", text: "Line Length" },
        { field: "1", text: "Between" },
      ],
      outputLines
    ),
    main: sheets(sheetsObj, onSheetChange),
    right: viewer({ objects3D }),
  })
);

// Helpers
function getLength(point1: number[], point2: number[]): number {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
  );
}
