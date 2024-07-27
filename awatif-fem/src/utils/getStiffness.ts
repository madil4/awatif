import * as mathjs from "mathjs";
import { MaterialInput, SectionInput } from "awatif-data-structure";

// to be removed after refactoring the solver
enum AnalysisType {
  Bar,
  Beam,
}

function bar(
  section?: SectionInput,
  material?: MaterialInput,
  Length?: number
): number[][] {
  const A = section?.area ?? 0;
  const E = material?.elasticity ?? 0;
  const L = Length ?? 1;

  let kLocal = mathjs.matrix([
    [1, -1],
    [-1, 1],
  ]);

  return mathjs.multiply(kLocal, (E * A) / L).toArray() as number[][];
}

function beam(
  section?: SectionInput,
  material?: MaterialInput,
  Length?: number
): number[][] {
  const Iz = section?.momentOfInertiaZ ?? 0;
  const Iy = section?.momentOfInertiaY ?? 0;
  const E = material?.elasticity ?? 0;
  const A = section?.area ?? 0;
  const G = material?.shearModulus ?? 0;
  const J = section?.torsionalConstant ?? 0;
  const L = Length ?? 1;

  const EA = (E * A) / L;
  const EIz = (E * Iz) / L ** 3;
  const EIy = (E * Iy) / L ** 3;
  const GJ = (G * J) / L;

  return mathjs
    .matrix([
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
    ])
    .toArray() as number[][];
}

export const getStiffness = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
