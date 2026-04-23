import { multiply, transpose } from "mathjs";
import type { Mesh, NodalDofVector } from "../data-model";
import { getTransformationMatrix } from "./l-solver/helpers/getTransformationMatrix";

export function getReactions(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  internalForces: Mesh["internalForces"]["val"],
  loads: Mesh["loads"]["val"],
  supports: Mesh["supports"]["val"],
): Mesh["reactions"]["val"] {
  if (!nodes?.length) return [];

  const nodeCount = nodes.length;

  // Accumulate element forces at each node in global coordinates
  const globalForces = Array.from(
    { length: nodeCount },
    (): NodalDofVector => [0, 0, 0, 0, 0, 0],
  );

  elements?.forEach((element, elementIndex) => {
    const forces = internalForces.get(elementIndex);
    if (!forces) return;

    const elementNodes = element.map((nodeIndex) => nodes[nodeIndex]);
    const T = getTransformationMatrix(elementNodes); // global → local
    const TT = transpose(T) as number[][]; // local → global

    // Reconstruct the full 12-DOF local force vector from stored internal forces
    const fLocal = [
      forces.N[0],
      forces.Vy[0],
      forces.Vz[0],
      forces.Mx[0],
      forces.My[0],
      forces.Mz[0],
      -forces.N[1],
      -forces.Vy[1],
      -forces.Vz[1],
      -forces.Mx[1],
      -forces.My[1],
      -forces.Mz[1],
    ];

    // Transform to global: f_global = T^T * f_local
    const fGlobal = multiply(TT, fLocal) as number[];

    // Accumulate: first 6 DOFs → start node, last 6 → end node
    const startNode = element[0];
    const endNode = element[1];
    for (let d = 0; d < 6; d++) {
      globalForces[startNode][d] += fGlobal[d];
      globalForces[endNode][d] += fGlobal[d + 6];
    }
  });

  // Reaction = element forces at node - applied load, only at restrained DOFs
  return globalForces.map((forces, nodeIndex) => {
    const support = supports?.get(nodeIndex);
    const load = loads?.get(nodeIndex);

    return [
      reactionDof(support?.[0], forces[0], load?.[0]),
      reactionDof(support?.[1], forces[1], load?.[1]),
      reactionDof(support?.[2], forces[2], load?.[2]),
      reactionDof(support?.[3], forces[3], load?.[3]),
      reactionDof(support?.[4], forces[4], load?.[4]),
      reactionDof(support?.[5], forces[5], load?.[5]),
    ] as NodalDofVector;
  });
}

function reactionDof(
  isRestrained: boolean | undefined,
  elementForce: number,
  appliedLoad = 0,
): number {
  if (!isRestrained) return 0;
  const value = elementForce - appliedLoad;
  return Math.abs(value) < 1e-9 ? 0 : value;
}
