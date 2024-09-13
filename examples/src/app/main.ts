import van from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer, layout, title } from "awatif-ui";

// init
const polyline: number[][] = [
  [0, 0, 0],
  [5, 0, 5],
  [10, 0, 0],
];
const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);
const objects3D = van.state([lines]);
const sheetsObj = new Map();

// update
sheetsObj.set("polyline", {
  text: "Polyline",
  data: polyline,
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
    { field: "2", text: "Z-coordinate", editable: { type: "float" } },
  ],
});

// events
const onSheetChange = ({ data }) => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(data.flat(), 3)
  );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
};

onSheetChange({ data: polyline }); // trigger the first render

document.body.append(
  layout({
    topLeft: title("App Example"),
    main: sheets(sheetsObj, onSheetChange),
    right: viewer({ objects3D }),
  })
);
