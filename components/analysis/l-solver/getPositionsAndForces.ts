import { index, subset, add, sparse, lup, lusolve, flatten } from "mathjs";
import { getGlobalStiffnessMatrix } from "./helpers/getGlobalStiffnessMatrix";
import { getTransformationMatrix } from "./helpers/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./helpers/getLocalStiffnessMatrix";
import { multiply } from "mathjs";
import type { Mesh } from "../../data-model";

export function getPositionsAndForces(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  loads: Mesh["loads"]["val"],
  supports: Mesh["supports"]["val"],
  elementsProps: Mesh["elementsProps"]["val"],
): {
  positions: NonNullable<Mesh["positions"]["val"]>;
  internalForces: Mesh["internalForces"]["val"];
} {
  const internalForces: Mesh["internalForces"]["val"] = new Map();
  if (!nodes || !elements)
    return { positions: [], internalForces: internalForces };
  if (nodes.length === 0 || elements.length === 0)
    return { positions: [], internalForces: internalForces };

  const dof = nodes.length * 6;
  const originalPositions = nodes.flat();

  const freeInd = getFreeIndices(supports, dof);
  const appliedForces = getAppliedForces(loads, dof);
  const stiffnesses = getGlobalStiffnessMatrix(
    nodes,
    elements,
    elementsProps,
    dof,
  );

  const forcesFree = subset(appliedForces, index(freeInd));
  const stiffnessesFree = subset(stiffnesses, index(freeInd, freeInd));

  const stiffnessesFreeSparse = sparse(stiffnessesFree);

  const lu = lup(stiffnessesFreeSparse);
  const deformationFree = lusolve(lu, forcesFree);

  const deformations: number[] = subset(
    Array(dof).fill(0),
    index(freeInd),
    flatten(deformationFree),
  );

  const displacements = nodes
    .map((_, i) => [
      deformations[i * 6],
      deformations[i * 6 + 1],
      deformations[i * 6 + 2],
    ])
    .flat();

  const positions = add(originalPositions, displacements) as number[];

  elements.forEach((e, i) => {
    const elmNodes = e.map((e) => nodes[e]);
    const dxGlobal = e.reduce(
      (a, b) => a.concat(deformations.slice(b * 6, b * 6 + 6)),
      [] as number[],
    );
    const T = getTransformationMatrix(elmNodes);
    const dxLocal = multiply(T, dxGlobal);

    const kLocal = getLocalStiffnessMatrix(elmNodes, elementsProps, i);
    let fLocal = multiply(kLocal, dxLocal);

    internalForces.set(i, {
      N: [fLocal[0], -fLocal[6]],
      Vy: [fLocal[1], -fLocal[7]],
      Vz: [fLocal[2], -fLocal[8]],
      Mx: [fLocal[3], -fLocal[9]],
      My: [fLocal[4], -fLocal[10]],
      Mz: [fLocal[5], -fLocal[11]],
    });
  });

  return { positions, internalForces };
}

// Utils
function getFreeIndices(
  supports: Mesh["supports"]["val"] | undefined,
  dof: number,
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
  forcesInputs: Mesh["loads"]["val"] | undefined,
  dof: number,
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
