import * as THREE from "three";
import { Node } from "awatif-fem";
import { getAverage } from "./getAverage";

// from global to local
export function getTransformationMatrixShell(
  n1: Node,
  n2: Node,
  n3: Node
): THREE.Matrix4 {
  // Based on thesis: Development of Membrane, Plate and Flat Shell Elements in Java Chapter 5.4
  // https://vtechworks.lib.vt.edu/server/api/core/bitstreams/edb7e2db-eebf-43e9-aa1f-cfca4b8a46e9/content

  const j = getAverage([n2, n3]);
  const k = getAverage([n1, n3]);
  const i = getAverage([n1, n2]);
  const x = new THREE.Vector3(...j).sub(new THREE.Vector3(...k)).normalize();
  const r = new THREE.Vector3(...n3).sub(new THREE.Vector3(...i)).normalize();
  const z = x.clone().cross(r).normalize();
  const y = z.clone().cross(x).normalize();

  return new THREE.Matrix4().makeBasis(x, y, z);
}
