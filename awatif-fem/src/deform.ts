import {
  matrix,
  simplicialCholesky,
  SparseMatrix,
  gc,
  tripletVector,
  sparseMatrix,
} from "awatif-math";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "./data-model";
import { getGlobalStiffnessMatrix } from "./utils/getGlobalStiffnessMatrix";

export function deform(
  nodes: Node[],
  elements: Element[],
  nodeInputs: NodeInputs,
  elementInputs: ElementInputs
): DeformOutputs {
  if (nodes.length === 0) return;

  const dof = nodes.length * 6;

  const forces = getForces(nodeInputs.loads, dof);
  const stiffnesses = getGlobalStiffnessMatrix(
    nodes,
    elements,
    elementInputs,
    dof
  );

  const freeInd = getFreeIndices(nodeInputs.supports, dof);
  const zerosIndices = getZerosIndices(stiffnesses);
  const reducedIndices = freeInd.filter((f) => !zerosIndices.includes(f));

  const cholesky = new simplicialCholesky(
    getReducedMatrix(stiffnesses, reducedIndices)
  );
  const deformationReduced = cholesky.solve(
    new matrix(getReducedVector(forces, reducedIndices))
  );

  const tripleV = new tripletVector(reducedIndices.length);
  reducedIndices.forEach((v, i) => {
    tripleV.add(v, 0, deformationReduced.get(i, 0));
  });
  const deformationsAll = new sparseMatrix(dof, 1, tripleV);
  const reactionsAll = stiffnesses.matMul(deformationsAll);

  // Convert to Awatif's data model
  const deformations: DeformOutputs["deformations"] = new Map();
  const reactions: DeformOutputs["reactions"] = new Map();

  nodes.forEach((_, i) => {
    const hasReaction = nodeInputs.supports?.get(i);

    deformations.set(i, [
      deformationsAll.get(i * 6, 0),
      deformationsAll.get(i * 6 + 1, 0),
      deformationsAll.get(i * 6 + 2, 0),
      deformationsAll.get(i * 6 + 3, 0),
      deformationsAll.get(i * 6 + 4, 0),
      deformationsAll.get(i * 6 + 5, 0),
    ]);

    if (hasReaction) {
      reactions.set(i, [
        reactionsAll.get(i * 6, 0),
        reactionsAll.get(i * 6 + 1, 0),
        reactionsAll.get(i * 6 + 2, 0),
        reactionsAll.get(i * 6 + 3, 0),
        reactionsAll.get(i * 6 + 4, 0),
        reactionsAll.get(i * 6 + 5, 0),
      ]);
    }
  });

  gc.flush();

  return {
    deformations,
    reactions,
  };
}

// Utils
function getForces(forcesInputs: NodeInputs["loads"], dof: number): number[] {
  const forces: number[] = Array(dof).fill(0);

  forcesInputs?.forEach((force, index) => {
    forces[index * 6] = force[0];
    forces[index * 6 + 1] = force[1];
    forces[index * 6 + 2] = force[2];
    forces[index * 6 + 3] = force[3];
    forces[index * 6 + 4] = force[4];
    forces[index * 6 + 5] = force[5];
  });

  return forces;
}

function getFreeIndices(
  supports: NodeInputs["supports"],
  dof: number
): number[] {
  const toRemove: number[] = [];
  supports?.forEach((support, index) => {
    if (support[0]) toRemove.push(index * 6);
    if (support[1]) toRemove.push(index * 6 + 1);
    if (support[2]) toRemove.push(index * 6 + 2);
    if (support[3]) toRemove.push(index * 6 + 3);
    if (support[4]) toRemove.push(index * 6 + 4);
    if (support[5]) toRemove.push(index * 6 + 5);
  });

  return Array(dof)
    .fill(0)
    .map((_, i) => i)
    .filter((v) => !toRemove.includes(v));
}

function getZerosIndices(matrix: SparseMatrix): number[] {
  const matrixLength = matrix.rows();
  const zerosIndices: number[] = [];
  for (let i = 0; i < matrixLength; i++) {
    if (matrix.block(0, matrixLength, i, i + 1).nonZeros() === 0) {
      zerosIndices.push(i);
    }
  }
  return zerosIndices;
}

function getReducedMatrix(
  matrix: SparseMatrix,
  reducedInd: number[]
): SparseMatrix {
  const tripleV = new tripletVector(reducedInd.length * reducedInd.length);

  for (let i = 0; i < reducedInd.length; i++) {
    for (let j = 0; j < reducedInd.length; j++) {
      const row = reducedInd[i];
      const col = reducedInd[j];
      const value = matrix.get(row, col);
      tripleV.add(i, j, value);
    }
  }

  return new sparseMatrix(reducedInd.length, reducedInd.length, tripleV);
}

function getReducedVector(vector: number[], reducedInd: number[]): number[] {
  const reducedVector: number[] = [];

  reducedInd.forEach((i) => reducedVector.push(vector[i]));

  return reducedVector;
}
