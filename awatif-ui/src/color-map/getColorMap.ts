import van, { State } from "vanjs-core";
import * as THREE from "three";

import { Node } from "awatif-data-structure";
import { mesh } from "awatif-mesh";
import { getContours } from "./getContours";

// Todo: Better to remove reactivity since we are creating new objects3D every time.
export function getColorMap(
  points: State<Node[]>, // Points that define the vertices of the polygon and ones inside the polygon.
  polygon: State<number[]>, // Polygon that defines the shape of the mesh.
  values: State<number[]> // Values used to color the mesh.
): State<THREE.Mesh> {
  const { nodes, elements } = mesh({
    points,
    polygon,
    maxMeshSize: null,
    maxNumSteinerPoints: 0,
    minMeshAngleDegrees: 1,
  });

  const contourMesh = getContours(
    nodes,
    elements,
    values,
    van.state("color-map")
  );
  return contourMesh;
}
