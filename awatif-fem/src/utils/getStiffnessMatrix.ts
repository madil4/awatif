import * as mathjs from "mathjs";
import { AnalysisInputs } from "awatif-data-structure";

// to be removed after refactoring the solver
enum AnalysisType {
  Bar,
  Beam,
}

function bar(analysisInputs: AnalysisInputs, index: number, L: number) {
  const A = analysisInputs.sections?.get(index)?.area || 0;
  const E = analysisInputs.materials?.get(index)?.elasticity || 0;

  let kLocal = mathjs.matrix([
    [1, -1],
    [-1, 1],
  ]);

  return mathjs.multiply(kLocal, (E * A) / L);
}

function beam(analysisInputs: AnalysisInputs, index: number, L: number) {
  const Iz = analysisInputs.sections?.get(index)?.momentOfInertiaZ || 0;
  const Iy = analysisInputs.sections?.get(index)?.momentOfInertiaY || 0;
  const E = analysisInputs.materials?.get(index)?.elasticity || 0;
  const A = analysisInputs.sections?.get(index)?.area || 0;
  const G = analysisInputs.materials?.get(index)?.shearModulus || 0;
  const J = analysisInputs.sections?.get(index)?.torsionalConstant || 0;

  const EA = (E * A) / L;
  const EIz = (E * Iz) / L ** 3;
  const EIy = (E * Iy) / L ** 3;
  const GJ = (G * J) / L;

  return mathjs.matrix([
    [EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0],
    [0, 12 * EIz, 0, 0, 0, 6 * L * EIz, 0, -12 * EIz, 0, 0, 0, 6 * L * EIz],
    [0, 0, 12 * EIy, 0, -6 * L * EIy, 0, 0, 0, -12 * EIy, 0, -6 * L * EIy, 0],
    [0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
    ],
    [-EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0],
    [0, -12 * EIz, 0, 0, 0, -6 * EIz * L, 0, 12 * EIz, 0, 0, 0, -6 * EIz * L],
    [0, 0, -12 * EIy, 0, 6 * L * EIy, 0, 0, 0, 12 * EIy, 0, 6 * L * EIy, 0],
    [0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
    ],
  ]);
}

export const getStiffnessMatrix = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
