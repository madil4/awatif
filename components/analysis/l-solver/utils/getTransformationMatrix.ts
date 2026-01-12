import { dot, identity, kron, MathCollection, norm, subtract } from "mathjs";
import { Nodes } from "../../../mesh/data-model";

// from global to local
export function getTransformationMatrix(nodes: Nodes): number[][] {
  if (nodes.length === 2) return getTransformationMatrixFrame(nodes);

  return [];
}

function getTransformationMatrixFrame(nodes: Nodes): number[][] {
  const vector = subtract(nodes[1], nodes[0]) as number[];
  const length = norm(vector) as number;
  const l = dot(vector, [1, 0, 0]) / length;
  const m = dot(vector, [0, 1, 0]) / length;
  const n = dot(vector, [0, 0, 1]) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);
  let lambda = [
    [l, m, n],
    [-m / D, l / D, 0],
    [(-l * n) / D, (-m * n) / D, D],
  ];

  if (n === 1) {
    lambda = [
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0],
    ];
  }

  if (n === -1) {
    lambda = [
      [0, 0, -1],
      [0, 1, 0],
      [1, 0, 0],
    ];
  }

  return kron(identity(4) as MathCollection, lambda).toArray() as number[][];
}
