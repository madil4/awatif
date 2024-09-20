import van from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer, layout, title } from "awatif-ui";

// init
// init
const bf = 165; // Flange width
const tf = 10.2; // Flange thickness
const d = 201; // Depth of the section
const tw = 6.2; // Web thickness

const sectionGeometry: number[][] = [
  // Bottom flange (starting from bottom left corner as origin)
  [0, 0],                    // Bottom left corner of the flange (origin)
  [bf, 0],                   // Bottom right corner of the flange
  [bf, tf],                  // Move vertically to the top of the flange
  [(bf - tw) / 2 + tw, tf],  // Move horizontally to the edge of the web
  [(bf - tw) / 2 + tw, d - tf], // Move vertically to the bottom of the top flange
  [bf, d - tf],              // Move horizontally to the edge of the top flange
  [bf, d],                   // Move vertically to the top of the section
  [0, d],                    // Move horizontally to the top left corner of the section
  [0, d - tf],               // Move down to the bottom of the top flange
  [(bf - tw) / 2, d - tf],   // Move horizontally to the edge of the web
  [(bf - tw) / 2, tf],       // Move vertically to the bottom of the web
  [0, tf],                   // Move horizontally to the bottom left corner of the flange
  [0, 0]                     // Closing the section loop
];

const materialProperties: number[][] = [
  [10, 1000, 100],
]

const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);
const objects3D = van.state([lines]);
const sheetsObj = new Map();

// update
sheetsObj.set("Section Geometry", {
  text: "Section Geometry",
  data: sectionGeometry,
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
  ],
});

sheetsObj.set("Material Properties", {
  text: "Material Properties",
  data: materialProperties,
  columns: [
    { field: "0", text: "Modulus of Elasticity", editable: { type: "float" } },
    { field: "1", text: "Shear Modulus", editable: { type: "float" } },
    { field: "2", text: "Mass Density", editable: { type: "float" } },
  ],
});


// events
const onSheetChange = ({ data }) => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(data.flat(), 2)
  );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
};

onSheetChange({ data: sectionGeometry }); // trigger the first render

document.body.append(
  layout({
    topLeft: title("Section Designer"),
    main: sheets(sheetsObj, onSheetChange),
    right: viewer({ objects3D }),
  })
);
