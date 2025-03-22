import van, { State } from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer, layout, title, grid, marketing } from "awatif-ui";
import { html, TemplateResult } from "lit-html";

import {
  BasicInputs,
  getBasicInputs,
  getSectionProperties,
  getMonteCarloPoints,
} from "../../../marketplace/getSectionProperties";
import { convert2DTo3D } from "./utils/convert2DTo3D";
import { handleNumericalData } from "./utils/handleNumericalData";

// init
const bf = 165; // Flange width
const tf = 10.2; // Flange thickness
const d = 201; // Depth of the section
const tw = 6.2; // Web thickness

const vertices: State<[number, number][]> = van.state([
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

const materialProperties = van.state({
  modulusOfElasticity: 200000,
  shearModulus: 30000,
  massDensity: 200,
});
const sectionProperties = van.state({
  area: 0,
  Ixx: 0,
  Iyy: 0,
  centroid_x: 0,
  centroid_y: 0,
  rx: 0,
  ry: 0,
  Sxt: 0,
  Sxb: 0,
  Syt: 0,
  Syb: 0,
  PNAx: 0,
  PNAy: 0,
  Zxp: 0,
  Zyp: 0,
});

const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial({
    color: "#c5d62f",
  })
);

const filledArea = new THREE.Mesh(
  new THREE.ShapeGeometry(),
  new THREE.MeshBasicMaterial({
    visible: false,
    side: THREE.DoubleSide,
  })
);

const points = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.PointsMaterial({
    color: "#c5d62f",
  })
);

const objects3D = van.state([lines, filledArea, points]);
const sheetsObj = new Map();

sheetsObj.set("SectionGeometry", {
  text: "Section Geometry",
  data: vertices,
  fields: [
    { field: "A", text: "X-coordinate", editable: { type: "float" } },
    { field: "B", text: "Y-coordinate", editable: { type: "float" } },
  ],
});

// sheetsObj.set("MaterialProperties", {
//   text: "Material Properties",
//   data: materialProperties,
//   fields: [
//     // formatting
//     { field: "A", text: "Material Property", size: "150px", editable: false },
//     { field: "B", text: "Value", editable: { type: "float" } },
//     // value
//     {
//       field: "modulusOfElasticity",
//       text: "Modulus of Elasticity",
//       editable: { type: "float" },
//     },
//     {
//       field: "shearModulus",
//       text: "Shear Modulus",
//       editable: { type: "float" },
//     },
//     { field: "massDensity", text: "Mass Density", editable: { type: "float" } },
//   ],
// });

// events
const onSheetChange = ({ sheet, data }) => {
  if (sheet == "SectionGeometry") {
    vertices.val = handleNumericalData(data, 2);
  } else if (sheet == "MaterialProperties") {
    materialProperties.val = {
      modulusOfElasticity: data[0][1],
      shearModulus: data[1][1],
      massDensity: data[2][1],
    };
  }
};

// on vertices changes: render lines, filledArea and Monte Carlo Points; generate outputs
van.derive(() => {
  // Lines
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      convert2DTo3D(vertices.val.flat(), { x: 0, y: 2 }),
      3
    )
  );

  // Area
  const shape = new THREE.Shape();
  shape.moveTo(vertices.val[0][0], vertices.val[0][1]);
  for (var i = 1; i < vertices.val.length; ++i)
    shape.lineTo(vertices.val[i][0], vertices.val[i][1]);

  filledArea.geometry = new THREE.ShapeGeometry(shape);
  filledArea.rotation.x = Math.PI / 2; // Rotate to xz plane

  // get basic inputs
  const basicInputs: BasicInputs = getBasicInputs(vertices.val);

  // Monte Carlo Points
  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      convert2DTo3D(getMonteCarloPoints(basicInputs).flat(), { x: 0, y: 2 }),
      3
    )
  );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering

  // section properties output
  sectionProperties.val = getSectionProperties(basicInputs);
});

document.body.append(
  layout({
    topLeft: { element: title("Section Designer") },
    topRight: {
      element: marketing({
        getStarted: getGetStartedHtml(),
        author: getAuthorHtml(),
      }),
    },
    main: {
      element: sheets({ sheets: sheetsObj, onChange: onSheetChange }),
      title: "Inputs",
    },
    preview: {
      element: grid({
        fields: [
          // formatting
          { field: "A", text: "Parameter", size: "225px", editable: false },
          { field: "B", text: "Value" },
          // value
          { field: "area", text: "Area" },
          { field: "Ixx", text: "Ixx" },
          { field: "Iyy", text: "Iyy" },
          { field: "centroid_x", text: "Centroid X" },
          { field: "centroid_y", text: "Centroid Y" },
          { field: "rx", text: "Radius of Gyration X" },
          { field: "ry", text: "Radius of Gyration Y" },
          { field: "Sxt", text: "Elastic Section Modulus X (Top)" },
          { field: "Sxb", text: "Elastic Section Modulus X (Bottom)" },
          { field: "Syt", text: "Elastic Section Modulus Y (Top)" },
          { field: "Syb", text: "Elastic Section Modulus Y (Bottom)" },
          { field: "PNAx", text: "Plastic Neutral Axis X" },
          { field: "PNAy", text: "Plastic Neutral Axis Y" },
          { field: "Zxp", text: "Plastic Section Modulus X" },
          { field: "Zyp", text: "Plastic Section Modulus Y" },
        ],
        data: sectionProperties,
      }),
      title: "Output",
    },
    right: {
      element: viewer({
        objects3D,
        settingsObj: {
          gridSize: 450,
          flipAxes: true,
        },
      }),
    },
  })
);

// Utils

function getGetStartedHtml(): TemplateResult {
  return html`<p>
      In this short video you will learn why we build the app and how to use it:
    </p>
    <iframe
      width="315"
      height="560"
      src="https://www.youtube.com/embed/1lZi7Bl3SbQ?si=gQvEAUnyrLskUmuG"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`;
}

function getAuthorHtml(): TemplateResult {
  return html`
    <div style="display: flex; align-items: center;">
      <img
        width="45%"
        style="border-radius: 10%; filter: grayscale(100%); margin-right: 1rem;"
        src="https://awatif.co/img/services/kaison.jpg"
      />
      <div style="flex: 1 1 auto;">
        <p style="line-height: 1.6">
          Hi, I'm Kaison Cheung, a
          <strong>structural engineering software developer</strong> with
          experience in concrete design. I specialize in
          <strong>creating BIM and design automation tools</strong>
          using Python, C#, and JavaScript, aimed at improving efficiency and
          precision in structural engineering workflows. My commitment to
          advancing the field goes beyond my job and own projects—I'm dedicated
          to fostering an open-source structural engineering community through
          Awatif, where I collaborate with others to develop innovative
          solutions for the industry.
        </p>

        <p>
          If you'd like to chat about structural engineering, software
          development, or anything else, feel free to connect with me on
          LinkedIn:
          <a href="https://www.linkedin.com/in/siu-kai-cheung/" target="_blank"
            >https://www.linkedin.com/in/siu-kai-cheung/</a
          >
        </p>
      </div>
    </div>
  `;
}
