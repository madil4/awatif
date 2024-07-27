import { AnalysisInputs } from "awatif-data-structure";

// to be removed after refactoring the solver
enum AnalysisType {
  Bar,
  Beam,
}

function bar(
  supportsInputs: AnalysisInputs["pointSupports"],
  dof: number
): number[] {
  const supports: number[] = [];

  supportsInputs?.forEach((support, index) => {
    if (support[0]) supports.push(index * 3);
    if (support[1]) supports.push(index * 3 + 1);
    if (support[2]) supports.push(index * 3 + 2);
  });

  return Array(dof)
    .fill(0)
    .map((_, i) => i)
    .filter((v) => !supports.includes(v));
}

function beam(
  supportsInputs: AnalysisInputs["pointSupports"],
  dof: number
): number[] {
  const supports: number[] = [];

  supportsInputs?.forEach((support, index) => {
    if (support[0]) supports.push(index * 6);
    if (support[1]) supports.push(index * 6 + 1);
    if (support[2]) supports.push(index * 6 + 2);
    if (support[3]) supports.push(index * 6 + 3);
    if (support[4]) supports.push(index * 6 + 4);
    if (support[5]) supports.push(index * 6 + 5);
  });

  return Array(dof)
    .fill(0)
    .map((_, i) => i)
    .filter((v) => !supports.includes(v));
}

export const getFreeIndices = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
