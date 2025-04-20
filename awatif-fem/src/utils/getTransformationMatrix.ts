import { cross, kronecker, Matrix, matrix } from "awatif-math";
import { Node } from ".././data-model";

// from global to local
export function getTransformationMatrix(nodes: Node[]): Matrix {
  if (nodes.length === 2)
    return getTransformationMatrixFrame(nodes[0], nodes[1]);

  if (nodes.length === 3)
    return getTransformationMatrixPlate(nodes[0], nodes[1], nodes[2]);
}

// Utils
function getTransformationMatrixFrame(n0: Node, n1: Node): Matrix {
  const vector = new matrix(n1).matSub(new matrix(n0));
  const length = vector.norm();
  const l = vector.dot(new matrix([1, 0, 0])) / length;
  const m = vector.dot(new matrix([0, 1, 0])) / length;
  const n = vector.dot(new matrix([0, 0, 1])) / length;
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

  return kronecker(matrix.identity(4, 4), new matrix(lambda));
}

function getTransformationMatrixPlate(n1: Node, n2: Node, n3: Node): Matrix {
  // Based on thesis: Development of Membrane, Plate and Flat Shell Elements in Java Chapter 5.4
  // https://vtechworks.lib.vt.edu/server/api/core/bitstreams/edb7e2db-eebf-43e9-aa1f-cfca4b8a46e9/content

  const j = getAverage([n2, n3]);
  const k = getAverage([n1, n3]);
  const i = getAverage([n1, n2]);
  const x = j.matSub(k).div(j.matSub(k).norm());
  const r = new matrix(n3).matSub(i).div(j.matSub(k).norm());
  const z = cross(x, r).div(cross(x, r).norm());
  const y = cross(z, x).div(cross(z, x).norm());

  const lambda = [
    [x.get(0, 0), y.get(0, 0), z.get(0, 0)],
    [x.get(1, 0), y.get(1, 0), z.get(1, 0)],
    [x.get(2, 0), y.get(2, 0), z.get(2, 0)],
  ];

  return kronecker(matrix.identity(6, 6), new matrix(lambda));

  // utils
  function getAverage(Nodes: Node[]): Matrix {
    const sum = Nodes.reduce(
      (acc, n) => [acc[0] + n[0], acc[1] + n[1], acc[2] + n[2]],
      [0, 0, 0]
    );

    const count = Nodes.length;
    return new matrix([sum[0] / count, sum[1] / count, sum[2] / count]);
  }
}
