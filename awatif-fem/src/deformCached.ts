import {
  flatten,
  index,
  lup,
  lusolve,
  sparse,
  subset,
} from "mathjs";
import {
  DeformOutputs,
  Element,
  ElementInputs,
  Node,
  NodeInputs,
} from "./data-model";
import { getGlobalStiffnessMatrix } from "./utils/getGlobalStiffnessMatrix";

export type CachedDeformSolver = {
  dof: number;
  freeDof: number;
  setupTimeMs: number;
  solve: (
    loads?: NodeInputs["loads"],
    options?: {
      includeReactions?: boolean;
    },
  ) => DeformOutputs;
};

export function createCachedDeformSolver(
  nodes: Node[],
  elements: Element[],
  supports: NodeInputs["supports"],
  elementInputs: ElementInputs,
): CachedDeformSolver {
  if (nodes.length === 0 || elements.length === 0) {
    throw new Error("createCachedDeformSolver requires non-empty nodes/elements");
  }

  const dof = nodes.length * 6;
  const freeIndices = getFreeIndices(supports, dof);
  const supportNodeIndices = Array.from(supports?.keys?.() ?? []);
  const setupStart = performance.now();

  const globalStiffness = getGlobalStiffnessMatrix(
    nodes,
    elements,
    elementInputs,
    dof,
  );
  const stiffnessesFree = subset(globalStiffness, index(freeIndices, freeIndices));
  const lu = lup(sparse(stiffnessesFree)) as any;
  const setupTimeMs = performance.now() - setupStart;

  return {
    dof,
    freeDof: freeIndices.length,
    setupTimeMs,
    solve: (
      loads: NodeInputs["loads"] = new Map(),
      options: { includeReactions?: boolean } = {},
    ): DeformOutputs => {
      const appliedForces = getAppliedForces(loads, dof);
      const forcesFree = subset(appliedForces, index(freeIndices));
      const deformationFree = lusolve(lu, forcesFree);

      const deformationsArray: number[] = subset(
        Array(dof).fill(0),
        index(freeIndices),
        flatten(deformationFree),
      ) as number[];

      const deformations = toNodeVectorMap(nodes.length, deformationsArray);
      const includeReactions = options.includeReactions ?? false;
      if (!includeReactions || supportNodeIndices.length === 0) {
        return {
          deformations,
          reactions: new Map(),
        };
      }

      const reactions: DeformOutputs["reactions"] = new Map();
      supportNodeIndices.forEach((nodeIndex) => {
        reactions.set(nodeIndex, [
          dotRow(globalStiffness[nodeIndex * 6], deformationsArray),
          dotRow(globalStiffness[nodeIndex * 6 + 1], deformationsArray),
          dotRow(globalStiffness[nodeIndex * 6 + 2], deformationsArray),
          dotRow(globalStiffness[nodeIndex * 6 + 3], deformationsArray),
          dotRow(globalStiffness[nodeIndex * 6 + 4], deformationsArray),
          dotRow(globalStiffness[nodeIndex * 6 + 5], deformationsArray),
        ]);
      });

      return {
        deformations,
        reactions,
      };
    },
  };
}

function toNodeVectorMap(nodeCount: number, values: number[]) {
  const mapped: DeformOutputs["deformations"] = new Map();

  for (let i = 0; i < nodeCount; i++) {
    mapped.set(i, [
      values[i * 6],
      values[i * 6 + 1],
      values[i * 6 + 2],
      values[i * 6 + 3],
      values[i * 6 + 4],
      values[i * 6 + 5],
    ]);
  }

  return mapped;
}

function dotRow(row: number[], vector: number[]): number {
  let sum = 0;
  for (let i = 0; i < row.length; i++) {
    sum += row[i] * vector[i];
  }
  return sum;
}

function getFreeIndices(
  supports: NodeInputs["supports"],
  dof: number,
): number[] {
  const fixed = Array(dof).fill(false);
  supports?.forEach((support, index) => {
    if (support[0]) fixed[index * 6] = true;
    if (support[1]) fixed[index * 6 + 1] = true;
    if (support[2]) fixed[index * 6 + 2] = true;
    if (support[3]) fixed[index * 6 + 3] = true;
    if (support[4]) fixed[index * 6 + 4] = true;
    if (support[5]) fixed[index * 6 + 5] = true;
  });

  return Array(dof)
    .fill(0)
    .map((_, i) => i)
    .filter((v) => !fixed[v]);
}

function getAppliedForces(
  loads: NodeInputs["loads"],
  dof: number,
): number[] {
  const forces = Array(dof).fill(0);
  loads?.forEach((force, index) => {
    forces[index * 6] = force[0];
    forces[index * 6 + 1] = force[1];
    forces[index * 6 + 2] = force[2];
    forces[index * 6 + 3] = force[3];
    forces[index * 6 + 4] = force[4];
    forces[index * 6 + 5] = force[5];
  });

  return forces;
}
