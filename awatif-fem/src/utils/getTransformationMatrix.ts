import * as mathjs from "mathjs";
import { Node } from "awatif-data-structure";
import { AnalysisType } from "./processAnalysisInputs";

// from global to local
function bar(node0: Node, node1: Node) {
  const vector = mathjs.subtract(node1, node0);
  const length = mathjs.norm(vector) as number;
  const cosX = mathjs.dot(vector, mathjs.matrix([1, 0, 0])) / length;
  const cosY = mathjs.dot(vector, mathjs.matrix([0, 1, 0])) / length;
  const cosZ = mathjs.dot(vector, mathjs.matrix([0, 0, 1])) / length;
  return mathjs.matrix([
    [cosX, cosY, cosZ, 0, 0, 0],
    [0, 0, 0, cosX, cosY, cosZ],
  ]);
}

// from global to local
function beam(node0: Node, node1: Node) {
  const vector = mathjs.subtract(node1, node0);
  const length = mathjs.norm(vector) as number;
  const l = mathjs.dot(vector, mathjs.matrix([1, 0, 0])) / length;
  const m = mathjs.dot(vector, mathjs.matrix([0, 1, 0])) / length;
  const n = mathjs.dot(vector, mathjs.matrix([0, 0, 1])) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);
  let lambda = mathjs.matrix([
    [l, m, n],
    [-m / D, l / D, 0],
    [(-l * n) / D, (-m * n) / D, D],
  ]);

  if (n === 1) {
    lambda = mathjs.matrix([
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0],
    ]);
  }

  if (n === -1) {
    lambda = mathjs.matrix([
      [0, 0, -1],
      [0, 1, 0],
      [1, 0, 0],
    ]);
  }

  return mathjs.kron(mathjs.identity(4) as mathjs.MathCollection, lambda);
}

export const getTransformationMatrix = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
