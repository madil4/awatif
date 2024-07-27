import { AnalysisInputs } from "awatif-data-structure";

// to be removed after refactoring the solver
enum AnalysisType {
  Bar,
  Beam,
}

export function bar(
  forcesInputs: AnalysisInputs["pointLoads"],
  dof: number
): number[] {
  const forces: number[] = Array(dof).fill(0);

  forcesInputs?.forEach((force, index) => {
    forces[index * 3] = force[0];
    forces[index * 3 + 1] = force[1];
    forces[index * 3 + 2] = force[2];
  });

  return forces;
}

export function beam(
  forcesInputs: AnalysisInputs["pointLoads"],
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

export const getAppliedForces = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
