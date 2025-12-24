import { Mesh } from "../../../data-model";
import {
  cross,
  dot,
  identity,
  kron,
  MathCollection,
  Matrix,
  norm,
  subtract,
  zeros,
} from "mathjs";

// from global to local
export function getTransformationMatrix(
  nodes: NonNullable<Mesh["nodes"]>
): number[][] {
  if (nodes.length === 2) return getTransformationMatrixFrame(nodes);
  else return getTransformationMatrixShell(nodes);
}

function getTransformationMatrixFrame(
  nodes: NonNullable<Mesh["nodes"]>
): number[][] {
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

function getTransformationMatrixShell(
  nodes: NonNullable<Mesh["nodes"]>
): number[][] {
  const nodesCount = 3;
  const dimensions = 3;
  const dof = 6;
  const totalDof = nodesCount * dof;

  const globalCoordinates = [nodes[0], nodes[1], nodes[2]];
  const localCoordinates = (
    zeros(dimensions, nodesCount) as Matrix
  ).toArray() as number[][];

  for (let i = 0; i < dimensions; i++) {
    for (let j = 0; j < nodesCount; j++) {
      localCoordinates[i][j] = globalCoordinates[j][i];
    }
  }

  const dN_dxi = [-1.0, 1.0, 0.0];
  const dN_det = [-1.0, 0.0, 1.0];
  const jacobianMatrix = (
    zeros(dimensions, 2) as Matrix
  ).toArray() as number[][];

  for (let i = 0; i < dimensions; i++) {
    for (let k = 0; k < nodesCount; k++) {
      jacobianMatrix[i][0] += localCoordinates[i][k] * dN_dxi[k];
      jacobianMatrix[i][1] += localCoordinates[i][k] * dN_det[k];
    }
  }

  const dX_dxi = jacobianMatrix.map((row) => row[0]);
  const dX_det = jacobianMatrix.map((row) => row[1]);
  let normalVector = cross(dX_dxi, dX_det) as number[];
  let length = norm(normalVector) as number;

  if (length === 0) {
    console.warn("Degenerate triangle: nodes are collinear or coincident.");
    return (zeros(totalDof, totalDof) as Matrix).toArray() as number[][];
  }

  normalVector = normalVector.map((v) => v / length);
  const localZ = [...normalVector];

  const globalIdentityMatrix = (
    identity(dimensions) as Matrix
  ).toArray() as number[][];
  const dotProductWithGlobalX = normalVector[0];
  let localX: number[];

  if (Math.abs(dotProductWithGlobalX) > 1 - 1e-10) {
    const dotProductWithGlobalZ = normalVector[2];
    localX = globalIdentityMatrix.map(
      (row, l) => row[2] - dotProductWithGlobalZ * normalVector[l]
    );
  } else {
    localX = globalIdentityMatrix.map(
      (row, l) => row[0] - dotProductWithGlobalX * normalVector[l]
    );
  }

  length = norm(localX) as number;
  if (length === 0) {
    console.warn("Degenerate local X-axis detected.");
    return (zeros(totalDof, totalDof) as Matrix).toArray() as number[][];
  }
  localX = localX.map((v) => v / length);

  let localY = cross(localZ, localX) as number[];
  length = norm(localY) as number;
  if (length === 0) {
    console.warn("Degenerate local Y-axis detected.");
    return (zeros(totalDof, totalDof) as Matrix).toArray() as number[][];
  }
  localY = localY.map((v) => v / length);

  const transformationMatrixLocal = [localX, localY, localZ];

  const transformationMatrixGlobal = (
    zeros(totalDof, totalDof) as Matrix
  ).toArray() as number[][];

  for (let nodeIdx = 0; nodeIdx < nodesCount; nodeIdx++) {
    const translationalDofOffset = nodeIdx * dof;
    const rotationalDofOffset = translationalDofOffset + dimensions;

    for (let i = 0; i < dimensions; i++) {
      for (let j = 0; j < dimensions; j++) {
        transformationMatrixGlobal[translationalDofOffset + i][
          translationalDofOffset + j
        ] = transformationMatrixLocal[i][j];
        transformationMatrixGlobal[rotationalDofOffset + i][
          rotationalDofOffset + j
        ] = transformationMatrixLocal[i][j];
      }
    }
  }

  return transformationMatrixGlobal;
}
