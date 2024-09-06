import van, { State } from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer } from "awatif-ui";

// init
const polyline: State<number[][]> = van.state([
  [0, 0, 0],
  [5, 0, 5],
  [10, 0, 0],
]);
const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);
const objects3D = van.state([lines]);
const sheetsObj = new Map();

// update
sheetsObj.set("polyline", {
  text: "Polyline",
  data: polyline.rawVal,
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
    { field: "2", text: "Z-coordinate", editable: { type: "float" } },
  ],
});

// events
const onSheetChange = ({ index, field, value }) => {
  const newPolyline = [...polyline.rawVal];
  newPolyline[index][field] = value;

  polyline.val = newPolyline;
};

// on polyline: update lines buffer and render it
van.derive(() => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(polyline.val.flat(), 3)
  );

  objects3D.val = [...objects3D.rawVal]; // To trigger rendering
});

document.body.append(sheets(sheetsObj, onSheetChange));
document.body.appendChild(viewer({ objects3D }));
