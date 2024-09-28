import van, { State } from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer, layout, title, grid } from "awatif-ui";

import { getSectionProperties } from "./properties";

// init
const bf = 165; // Flange width
const tf = 10.2; // Flange thickness
const d = 201; // Depth of the section
const tw = 6.2; // Web thickness

const vertices: State<number[][]> = van.state([
  // Bottom flange (starting from bottom left corner as origin)
  [0, 0], // Bottom left corner of the flange (origin)
  [bf, 0], // Bottom right corner of the flange
  [bf, tf], // Move vertically to the top of the flange
  [(bf - tw) / 2 + tw, tf], // Move horizontally to the edge of the web
  [(bf - tw) / 2 + tw, d - tf], // Move vertically to the bottom of the top flange
  [bf, d - tf], // Move horizontally to the edge of the top flange
  [bf, d], // Move vertically to the top of the section
  [0, d], // Move horizontally to the top left corner of the section
  [0, d - tf], // Move down to the bottom of the top flange
  [(bf - tw) / 2, d - tf], // Move horizontally to the edge of the web
  [(bf - tw) / 2, tf], // Move vertically to the bottom of the web
  [0, tf], // Move horizontally to the bottom left corner of the flange
  [0, 0], // Closing the section loop
]);

const materialProperties: State<number[][]> = van.state([[10, 1000, 100]]);
const sectionProperties = van.state([[0, 0, 0, 0, 0]]);

const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);

const filledArea = new THREE.Mesh(
  new THREE.ShapeGeometry(),
  new THREE.MeshBasicMaterial({
    color: "#046b58",
  })
);

const objects3D = van.state([lines, filledArea]);
const sheetsObj = new Map();

sheetsObj.set("SectionGeometry", {
  text: "Section Geometry",
  data: vertices,
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
  ],
});

sheetsObj.set("MaterialProperties", {
  text: "Material Properties",
  data: materialProperties,
  columns: [
    {
      field: "0",
      text: "Modulus of Elasticity",
      editable: { type: "float" },
    },
    { field: "1", text: "Shear Modulus", editable: { type: "float" } },
    { field: "2", text: "Mass Density", editable: { type: "float" } },
  ],
});

// events
const onSheetChange = ({ sheet, data }) => {
  if (sheet == "SectionGeometry") {
    vertices.val = data;
  } else if (sheet == "MaterialProperties") {
    materialProperties.val = data;
  }
};

// on vertices changes: render lines and filledArea
van.derive(() => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices.val.flat(), 2)
  );

  const shape = new THREE.Shape();
  shape.moveTo( vertices.val[0][0], vertices.val[0][1] );
  for (var i = 1; i < vertices.val.length; ++ i)
      shape.lineTo( vertices.val[i][0], vertices.val[i][1] );
  shape.lineTo( vertices.val[0][0], vertices.val[0][1] );

  filledArea.geometry = new THREE.ShapeGeometry( shape );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});

// on vertices changes: generate outputs
van.derive(() => {
  sectionProperties.val = getSectionProperties(vertices.val);
});

document.body.append(
  layout({
    topLeft: { element: title("Section Designer") },
    main: { element: sheets(sheetsObj, onSheetChange), title: "Inputs" },
    preview: {
      element: grid(
        [
          { field: "0", text: "Area" },
          { field: "1", text: "Ixx" },
          { field: "2", text: "Iyy" },
          { field: "3", text: "Centroid X" },
          { field: "4", text: "Centroid Y" },
        ],
        sectionProperties
      ),
      title: "Output",
    },
    right: {
      element: viewer({
        objects3D,
        settingsObj: {
          gridSize: 200,
        },
      }),
    },
  })
);
