import { Lut } from "three/addons/math/Lut.js";
import * as THREE from "three";
import * as math from "mathjs";
import van, { State } from "vanjs-core";
import { Node, Structure, Element } from "awatif-data-structure";
import { Settings } from "../settings/settings";

export function contours(
  structure: Structure,
  settings: Settings,
  derivedNodes: State<Node[]>
): THREE.Mesh {
  let contourMesh = getContourBaseMesh(
    structure.nodes.val,
    structure.elements.val
  );
  van.derive(() => {
    if (!settings.contours.val) return;

    contourMesh = getContourBaseMesh(
      structure.nodes.val,
      structure.elements.val
    );

    const values = getContourValues(settings, structure);
    contourMesh = addColorToMesh(contourMesh);
  });

  return contourMesh;
}

// Utils ------------------------------------------------------
function getContourBaseMesh(nodes: Node[], elements: Element[]): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
    })
  );
  mesh.geometry.computeVertexNormals();
  // itemSize = 3 because there are 3 values (components) per vertex
  mesh.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodes.flat(), 3)
  );

  mesh.geometry.setIndex(new THREE.Uint16BufferAttribute(elements.flat(), 1));

  const colors = nodes.map((node) => [1, 0, 1]).flat();
  mesh.geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  return mesh;
}

function getContourValues(settings: Settings, structure: Structure): number[] {
  const contourOption = settings.contours.val;
  if (contourOption.startsWith("deformations")) {
    const deformations = structure.deformOutputs?.val.deformations;
    const deformationAxesMap = {
      X: 0,
      Y: 1,
      Z: 2,
    };
    const deformtionAxis = contourOption.slice(-1);
    return structure.nodes?.val.map(
      (node, i) => deformations.get(i)[deformationAxesMap[deformtionAxis]]
    );
  }

  // return zeros by default
  return structure.nodes?.val.map((node, i) => 0);
}

function addContourValues(values: number[], mesh: THREE.Mesh): THREE.Mesh {
  mesh.geometry.setAttribute(
    "pressure",
    new THREE.Float32BufferAttribute(values, 1)
  );
  return mesh;
}

function addColorToMesh(mesh: THREE.Mesh): THREE.Mesh {
  const geometry = mesh.geometry;
  const pressures = geometry.attributes.pressure;
  const colors = geometry.attributes.color;
  const color = new THREE.Color();

  let lut = new Lut();
  lut.setColorMap("rainbow");

  lut.setMax(Math.max(...pressures.array));
  lut.setMin(Math.min(...pressures.array));

  for (let i = 0; i < pressures.array.length; i++) {
    const colorValue = pressures.array[i];

    color.copy(lut.getColor(colorValue)).convertSRGBToLinear();
    colors.setXYZ(i, color.r, color.g, color.b);
  }

  colors.needsUpdate = true;

  return mesh;
}
