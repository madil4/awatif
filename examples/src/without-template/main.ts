import van from "vanjs-core";
import * as THREE from "three";
import { Structure } from "awatif-data-structure";
import { viewer } from "awatif-ui";

// init
const structure: Structure = {
  nodes: van.state([]),
  elements: van.state([]),
};

const lines = new THREE.LineSegments(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);
const objects3D = van.state([lines]);

// update
setTimeout(() => {
  const buffer = [0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 5];
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(buffer, 3)
  );

  // to trigger render
  objects3D.val = [...objects3D.rawVal];
}, 100);

const viewerElm = viewer({ structure, objects3D });
document.body.appendChild(viewerElm);
