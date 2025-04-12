import { Node } from ".././data-model";
import {
  cross,
  divide,
  dot,
  identity,
  kron,
  MathCollection,
  norm,
  subtract,
} from "mathjs";

// from global to local
export function getTransformationMatrix(nodes: Node[]): number[][] {
  if (nodes.length === 2)
    return getTransformationMatrixFrame(nodes[0], nodes[1]);

  if (nodes.length === 3)
    return getTransformationMatrixPlate(nodes[0], nodes[1], nodes[2]);
}

function getTransformationMatrixFrame(n0: Node, n1: Node): number[][] {
  const vector = subtract(n1, n0);
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

export function getTransformationMatrixPlate(
  n1: Node,
  n2: Node,
  n3: Node
): number[][] {
  // Based on thesis: Development of Membrane, Plate and Flat Shell Elements in Java Chapter 5.4
  // https://vtechworks.lib.vt.edu/server/api/core/bitstreams/edb7e2db-eebf-43e9-aa1f-cfca4b8a46e9/content

  const j = getAverage([n2, n3]);
  const k = getAverage([n1, n3]);
  const i = getAverage([n1, n2]);
  const x = divide(subtract(j, k), norm(subtract(j, k))) as MathCollection;
  const r = divide(subtract(n3, i), norm(subtract(j, k))) as MathCollection;
  const z = divide(cross(x, r), norm(cross(x, r))) as MathCollection;
  const y = divide(cross(z, x), norm(cross(z, x)));

  const lambda = [
    [x[0], y[0], z[0]],
    [x[1], y[1], z[1]],
    [x[2], y[2], z[2]],
  ];

  return kron(identity(6) as MathCollection, lambda).toArray() as number[][];

  // utils
  function getAverage(Nodes: Node[]): Node {
    const sum = Nodes.reduce(
      (acc, n) => [acc[0] + n[0], acc[1] + n[1], acc[2] + n[2]],
      [0, 0, 0]
    );

    const count = Nodes.length;
    return [sum[0] / count, sum[1] / count, sum[2] / count];
  }
}
