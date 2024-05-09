import * as mathjs from "mathjs";
import { AnalysisType, ProcessedAnalysisInputs } from "./processAnalysisInputs";

function bar(
  pa: ProcessedAnalysisInputs,
  index: number,
  L: number,
  code: number[]
) {
  const A = pa.areas.get(index) || 0;
  const E = pa.elasticities.get(index) || 0;
  const one = code[0] / code[4];

  let kLocal = mathjs.matrix([
    [one, -1],
    [-1, one],
  ]);

  return mathjs.multiply(kLocal, (E * A) / L);
}

function beam(
  pa: ProcessedAnalysisInputs,
  index: number,
  L: number,
  code: number[]
) {
  const Iz = pa.momentOfInertiaZs.get(index) || 0;
  const Iy = pa.momentOfInertiaYs.get(index) || 0;
  const E = pa.elasticities.get(index) || 0;
  const A = pa.areas.get(index) || 0;
  const G = pa.shearModuluses.get(index) || 0;
  const J = pa.torsionalConstants.get(index) || 0;

  const EA = (E * A) / L;
  const EIz = (E * Iz) / L ** 3;
  const EIy = (E * Iy) / L ** 3;
  const GJ = (G * J) / L;

  const six = code[0];
  const two = code[1];

  return mathjs.matrix([
    [EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0],
    [0, 12 * EIz, 0, 0, 0, six * L * EIz, 0, -12 * EIz, 0, 0, 0, six * L * EIz],
    [
      0,
      0,
      12 * EIy,
      0,
      -six * L * EIy,
      0,
      0,
      0,
      -12 * EIy,
      0,
      -six * L * EIy,
      0,
    ],
    [0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0],
    [
      0,
      0,
      -six * L * EIy,
      0,
      4 * EIy * L ** two,
      0,
      0,
      0,
      six * L * EIy,
      0,
      two * EIy * L ** two,
      0,
    ],
    [
      0,
      six * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** two,
      0,
      -six * L * EIz,
      0,
      0,
      0,
      two * EIz * L ** two,
    ],
    [-EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0],
    [
      0,
      -12 * EIz,
      0,
      0,
      0,
      -six * EIz * L,
      0,
      12 * EIz,
      0,
      0,
      0,
      -six * EIz * L,
    ],
    [0, 0, -12 * EIy, 0, six * L * EIy, 0, 0, 0, 12 * EIy, 0, six * L * EIy, 0],
    [0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0],
    [
      0,
      0,
      -six * L * EIy,
      0,
      two * EIy * L ** two,
      0,
      0,
      0,
      six * L * EIy,
      0,
      4 * EIy * L ** two,
      0,
    ],
    [
      0,
      six * L * EIz,
      0,
      0,
      0,
      two * EIz * L ** two,
      0,
      -six * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** two,
    ],
  ]);
}

export const getStiffnessMatrix = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
