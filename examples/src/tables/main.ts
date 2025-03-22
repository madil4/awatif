import van from "vanjs-core";
import * as THREE from "three";
import { getViewer, getTables, getToolbar, getDialog } from "awatif-ui";

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

const tables = new Map();

// update
tables.set("polyline", {
  text: "Polyline",
  fields: [
    {
      field: "A",
      text: "X-coordinate",
      min: "25",
      editable: { type: "float" },
    },
    { field: "B", text: "Y-coordinate", editable: { type: "float" } },
    { field: "C", text: "Z-coordinate", editable: { type: "float" } },
  ],
  data: inputPolyline,
});

// events
const onTablesChange = ({ data }) => (inputPolyline.val = data);

// on inputPolyline change: render lines
van.derive(() => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(inputPolyline.val.flat(), 3)
  );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});

// dialog
const clickedButton = van.state("");
const dialogBody = van.state(undefined);
van.derive(() => {
  if (clickedButton.val === "Tables")
    dialogBody.val = getTables({ tables, onChange: onTablesChange });
});

document.body.append(
  getToolbar({
    clickedButton,
    buttons: ["Tables"],
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts",
    author: "https://www.linkedin.com/in/cal-mense/",
  }),
  getDialog({ dialogBody }),
  getViewer({ objects3D })
);
