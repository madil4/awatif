import { Node, Element, AnalysisInputs } from "awatif-data-structure";
import {
  flatten,
  lusolve,
  Matrix,
  multiply,
  subset,
  zeros,
  index,
} from "mathjs";
import { getStiffnesses } from "./utils/getStiffnesses";
import { getFreeIndices } from "./utils/getFreeIndices";
import { getAppliedForces } from "./utils/getAppliedForces";

// to be removed after refactoring the solver
enum AnalysisType {
  Bar,
  Beam,
}

export function deform(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInputs,
  analysisType: AnalysisType
): { deformations: number[]; reactions: number[] } {
  const dof = nodes.length * (analysisType === AnalysisType.Bar ? 3 : 6);

  const freeInd = getFreeIndices[analysisType](
    analysisInputs.pointSupports,
    dof
  );
  const stiffnesses = getStiffnesses[analysisType](
    nodes,
    elements,
    analysisInputs.materials,
    analysisInputs.sections,
    dof
  );
  const appliedForces = getAppliedForces[analysisType](
    analysisInputs.pointLoads,
    dof
  );

  const K = subset(stiffnesses, index(freeInd, freeInd));
  const F = subset(appliedForces, index(freeInd));
  const dxFree = lusolve(K, F);

  const deformations = (
    subset(zeros(dof), index(freeInd), flatten(dxFree)) as Matrix
  ).toArray() as number[];
  const reactions = multiply(stiffnesses, deformations);

  return {
    deformations,
    reactions,
  };
}
