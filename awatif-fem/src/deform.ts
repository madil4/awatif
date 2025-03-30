import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-data-model";
import { flatten, lusolve, multiply, subset, index, lup, sparse } from "mathjs";
import { getGlobalStiffnessMatrix } from "./utils/getGlobalStiffnessMatrix";

export function deform(
  nodes: Node[],
  elements: Element[],
  nodeInputs: NodeInputs,
  elementInputs: ElementInputs
): DeformOutputs {
  const dof = nodes.length * 6;
  if (dof === 0) return; // don't run if there are no nodes

  const freeInd = getFreeIndices(nodeInputs.supports, dof);
  const appliedForces = getAppliedForces(nodeInputs.loads, dof);
  const stiffnesses = getGlobalStiffnessMatrix(
    nodes,
    elements,
    elementInputs,
    dof
  );

  const forcesFree = subset(appliedForces, index(freeInd));
  const stiffnessesFree = subset(stiffnesses, index(freeInd, freeInd));

  const forcesFreeSparse = sparse(forcesFree);
  const stiffnessesFreeSparse = sparse(stiffnessesFree);

  const lu = lup(stiffnessesFreeSparse);

  const deformationFree = lusolve(lu, forcesFree) as number[];

  const deformationsArray: number[] = subset(
    Array(dof).fill(0),
    index(freeInd),
    flatten(deformationFree)
  );

  const reactionsArray = multiply(stiffnesses, deformationsArray);

  const deformations: DeformOutputs["deformations"] = new Map();
  const reactions: DeformOutputs["reactions"] = new Map();

  nodes.forEach((_, i) => {
    const hasReaction = nodeInputs.supports?.get(i);

    deformations.set(i, [
      deformationsArray[i * 6],
      deformationsArray[i * 6 + 1],
      deformationsArray[i * 6 + 2],
      deformationsArray[i * 6 + 3],
      deformationsArray[i * 6 + 4],
      deformationsArray[i * 6 + 5],
    ]);

    if (hasReaction) {
      reactions.set(i, [
        reactionsArray[i * 6],
        reactionsArray[i * 6 + 1],
        reactionsArray[i * 6 + 2],
        reactionsArray[i * 6 + 3],
        reactionsArray[i * 6 + 4],
        reactionsArray[i * 6 + 5],
      ]);
    }
  });

  return {
    deformations,
    reactions,
  };
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

function getAppliedForces(
  forcesInputs: NodeInputs["loads"],
  dof: number
): number[] {
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
