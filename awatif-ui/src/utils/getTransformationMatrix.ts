import * as THREE from "three";
import { Node } from "../types";

// from global to local
export function getTransformationMatrix(node1: Node, node2: Node) {
  const n1 = new THREE.Vector3(...node1);
  const n2 = new THREE.Vector3(...node2);
  const vector = n2.clone().sub(n1);
  const length = vector.length();
  const l = vector.dot(new THREE.Vector3(1, 0, 0)) / length;
  const m = vector.dot(new THREE.Vector3(0, 1, 0)) / length;
  const n = vector.dot(new THREE.Vector3(0, 0, 1)) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);

  let lambda = new THREE.Matrix3().fromArray(
    [
      [l, m, n],
      [-m / D, l / D, 0],
      [(-l * n) / D, (-m * n) / D, D],
    ].flat()
  );

  if (n === 1) {
    lambda = new THREE.Matrix3().fromArray(
      [
        [0, 0, 1],
        [0, 1, 0],
        [-1, 0, 0],
      ].flat()
    );
  }

  if (n === -1) {
    lambda = new THREE.Matrix3().fromArray(
      [
        [0, 0, -1],
        [0, 1, 0],
        [1, 0, 0],
      ].flat()
    );
  }

  return new THREE.Matrix4().setFromMatrix3(lambda);
}
