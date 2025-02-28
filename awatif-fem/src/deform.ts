import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-data-structure";
import { flatten, lusolve, multiply, subset, index } from "mathjs";
import { getGlobalStiffnessMatrix } from "./utils/getGlobalStiffnessMatrix";
import { getFreeIndices } from "./utils/getFreeIndices";

export function deform(
  nodes: Node[],
  elements: Element[],
  nodeInputs: NodeInputs,
  elementInputs: ElementInputs
): DeformOutputs {
  const dof = nodes.length * 6;

  const freeInd = getFreeIndices(
    nodeInputs.supports,
    elementInputs,
    elements,
    dof
  );

  const appliedForces = getAppliedForces(nodeInputs.loads, dof);

  const stiffnesses = getGlobalStiffnessMatrix(
    nodes,
    elements,
    elementInputs,
    dof
  );

  const forcesFree = subset(appliedForces, index(freeInd));
  const stiffnessesFree = subset(stiffnesses, index(freeInd, freeInd));
  const deformationFree = lusolve(stiffnessesFree, forcesFree) as number[];

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
