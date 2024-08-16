import { Node } from "awatif-data-structure";
import {
  dot,
  identity,
  kron,
  MathCollection,
  matrix,
  norm,
  subtract,
} from "mathjs";

// from global to local
export function getTransformationMatrix(node0: Node, node1: Node): number[][] {
  const vector = subtract(node1, node0);
  const length = norm(vector) as number;
  const l = dot(vector, matrix([1, 0, 0])) / length;
  const m = dot(vector, matrix([0, 1, 0])) / length;
  const n = dot(vector, matrix([0, 0, 1])) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);
  let lambda = matrix([
    [l, m, n],
    [-m / D, l / D, 0],
    [(-l * n) / D, (-m * n) / D, D],
  ]);

  if (n === 1) {
    lambda = matrix([
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0],
    ]);
  }

  if (n === -1) {
    lambda = matrix([
      [0, 0, -1],
      [0, 1, 0],
      [1, 0, 0],
    ]);
  }

  return kron(identity(4) as MathCollection, lambda).toArray() as number[][];
}
