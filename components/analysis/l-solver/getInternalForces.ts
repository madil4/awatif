import {
  multiply,
  subset,
  index,
  index as mathIndex,
  sparse,
  lup,
  lusolve,
  flatten,
} from "mathjs";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./utils/getLocalStiffnessMatrix";
import { getGlobalStiffnessMatrix } from "./utils/getGlobalStiffnessMatrix";
import type { Mesh, ElementForces } from "../../data-model.js";
import { Elements, Nodes } from "../../mesh/data-model.js";

/**
 * Calculate internal forces (N, V, M) for all elements from displacements
 *
 * @param nodes - Node coordinates
 * @param elements - Element connectivity
 * @param displacements - Global displacement vector [u1x, u1y, u1z, r1x, r1y, r1z, u2x, ...]
 * @param elementsProps - Element properties (E, A, I, etc.)
 * @returns Map of element index to internal forces at element ends
 */
export function getInternalForces(
  nodes: Nodes,
  elements: Elements,
  displacements: number[],
  elementsProps: NonNullable<Mesh["elementsProps"]>["val"] | undefined,
): Map<number, ElementForces> {
  const internalForces = new Map<number, ElementForces>();

  if (!nodes || !elements || !displacements || !elementsProps) {
    return internalForces;
  }

  elements.forEach((element, elementIndex) => {
    const elmNodes = element.map((nodeIdx) => nodes[nodeIdx]);

    // Extract element displacements from global displacement vector (12 DOF)
    const node1Idx = element[0];
    const node2Idx = element[1];

    const elementDisplacementsGlobal = [
      displacements[node1Idx * 6 + 0], // u1x
      displacements[node1Idx * 6 + 1], // u1y
      displacements[node1Idx * 6 + 2], // u1z
      displacements[node1Idx * 6 + 3], // r1x
      displacements[node1Idx * 6 + 4], // r1y
      displacements[node1Idx * 6 + 5], // r1z
      displacements[node2Idx * 6 + 0], // u2x
      displacements[node2Idx * 6 + 1], // u2y
      displacements[node2Idx * 6 + 2], // u2z
      displacements[node2Idx * 6 + 3], // r2x
      displacements[node2Idx * 6 + 4], // r2y
      displacements[node2Idx * 6 + 5], // r2z
    ];

    // Get transformation matrix (global to local)
    const T = getTransformationMatrix(elmNodes);

    // Transform displacements to local coordinates: u_local = T * u_global
    const elementDisplacementsLocal = multiply(
      T,
      elementDisplacementsGlobal,
    ) as number[];

    // Get local stiffness matrix
    const kLocal = getLocalStiffnessMatrix(
      elmNodes,
      elementsProps,
      elementIndex,
    );

    // Calculate local forces: f_local = K_local * u_local
    const localForces = multiply(kLocal, elementDisplacementsLocal) as number[];

    // Extract internal forces at element ends
    // Local force vector: [Fx1, Fy1, Fz1, Mx1, My1, Mz1, Fx2, Fy2, Fz2, Mx2, My2, Mz2]
    internalForces.set(elementIndex, {
      N: [localForces[0], -localForces[6]], // Axial forces (tension positive)
      Vy: [localForces[1], -localForces[7]], // Shear in local y
      Vz: [localForces[2], -localForces[8]], // Shear in local z
      Mx: [localForces[3], -localForces[9]], // Torsion about local x
      My: [localForces[4], -localForces[10]], // Bending about local y
      Mz: [localForces[5], -localForces[11]], // Bending about local z
    });
  });

  return internalForces;
}

/**
 * Get displacements from linear analysis results
 * This extends the existing getPositions to return full displacement vector
 *
 * @param nodes - Node coordinates
 * @param elements - Element connectivity
 * @param loads - Applied loads
 * @param supports - Support conditions
 * @param elementsProps - Element properties
 * @returns Full displacement vector [u1x, u1y, u1z, r1x, r1y, r1z, u2x, ...]
 */
export function getDisplacements(
  nodes: Nodes,
  elements: Elements,
  loads: NonNullable<Mesh["loads"]>["val"] | undefined,
  supports: NonNullable<Mesh["supports"]>["val"] | undefined,
  elementsProps: NonNullable<Mesh["elementsProps"]>["val"] | undefined,
): number[] {
  if (!nodes || !elements) return [];
  if (nodes.length === 0 || elements.length === 0) return [];

  const dof = nodes.length * 6;

  const freeInd = getFreeIndices(supports, dof);
  const appliedForces = getAppliedForces(loads, dof);
  const stiffnesses = getGlobalStiffnessMatrix(
    nodes,
    elements,
    elementsProps,
    dof,
  );

  const forcesFree = subset(appliedForces, mathIndex(freeInd));
  const stiffnessesFree = subset(stiffnesses, mathIndex(freeInd, freeInd));

  const stiffnessesFreeSparse = sparse(stiffnessesFree);

  const lu = lup(stiffnessesFreeSparse);
  const displacementFree = lusolve(lu, forcesFree);

  const displacements: number[] = subset(
    Array(dof).fill(0),
    mathIndex(freeInd),
    flatten(displacementFree),
  );

  return displacements;
}

// Utility functions
function getFreeIndices(
  supports: NonNullable<Mesh["supports"]>["val"] | undefined,
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
  forcesInputs: NonNullable<Mesh["loads"]>["val"] | undefined,
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
