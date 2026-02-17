import { CLTLayup } from "../../data-model";
import { computeLaminateESL } from "../laminate";
import {
  recoverLaminateInPlaneResultants,
  recoverLaminateInPlaneStressProfile,
} from "../stress/inPlane";

describe("CLT in-plane stress recovery", () => {
  test("coupled mode resultants match laminate A/B/D equations", () => {
    const layup = makeLayup({ shearCoupling: true }, [0.03, 0.04, 0.02], [0, 90, 0]);
    const eps0: [number, number, number] = [1.5e-4, -8e-5, 6e-5];
    const kappa: [number, number, number] = [4e-3, -3e-3, 2.5e-3];

    const esl = computeLaminateESL(layup);
    const expectedN = add3(mul3x3Vec3(esl.A, eps0), mul3x3Vec3(esl.B, kappa));
    const expectedM = add3(mul3x3Vec3(esl.B, eps0), mul3x3Vec3(esl.D, kappa));

    const actual = recoverLaminateInPlaneResultants(layup, eps0, kappa, {
      mode: "coupled",
    });

    expectVecClose(actual.N, expectedN, 9);
    expectVecClose(actual.M, expectedM, 9);
  });

  test("uncoupled mode resultants match A-eps0 and D-kappa equations", () => {
    const layup = makeLayup({ shearCoupling: false }, [0.03, 0.04, 0.02], [0, 90, 0]);
    const eps0: [number, number, number] = [1.2e-4, -6e-5, -4e-5];
    const kappa: [number, number, number] = [3e-3, -2e-3, 1.8e-3];

    const esl = computeLaminateESL(layup);
    const expectedN = mul3x3Vec3(esl.A, eps0);
    const expectedM = mul3x3Vec3(esl.D, kappa);

    const actual = recoverLaminateInPlaneResultants(layup, eps0, kappa, {
      mode: "uncoupled",
    });

    expectVecClose(actual.N, expectedN, 9);
    expectVecClose(actual.M, expectedM, 9);
  });

  test("through-thickness profile gives opposite extreme-fiber stress in pure bending", () => {
    const layup = makeLayup({ shearCoupling: true }, [0.03, 0.04, 0.03], [0, 90, 0]);
    const profiles = recoverLaminateInPlaneStressProfile(
      layup,
      [0, 0, 0],
      [1e-2, 0, 0],
      { mode: "coupled" },
    );

    const topLayerTop = profiles[0].points[0].stressShell[0];
    const bottomLayerBottom = profiles[2].points[2].stressShell[0];
    const middleLayerMid = profiles[1].points[1].stressShell[0];

    expect(topLayerTop).toBeGreaterThan(0);
    expect(bottomLayerBottom).toBeLessThan(0);
    expect(Math.abs(topLayerTop + bottomLayerBottom)).toBeLessThan(
      Math.max(1, Math.abs(topLayerTop)) * 1e-8,
    );
    expect(Math.abs(middleLayerMid)).toBeLessThan(
      Math.max(1, Math.abs(topLayerTop)) * 1e-8,
    );
  });
});

function makeLayup(
  options: Partial<CLTLayup["options"]>,
  thicknesses: number[],
  angles: number[],
): CLTLayup {
  return {
    layers: thicknesses.map((thickness, i) => ({
      thickness,
      thetaDeg: angles[i],
      Ex: 11e9,
      Ey: 370e6,
      nuXY: 0.2,
      Gxy: 690e6,
      Gxz: 690e6,
      Gyz: 69e6,
    })),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
      ...options,
    },
  };
}

function mul3x3Vec3(m: number[][], v: [number, number, number]): [number, number, number] {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

function add3(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function expectVecClose(
  actual: [number, number, number],
  expected: [number, number, number],
  digits: number,
) {
  expect(actual[0]).toBeCloseTo(expected[0], digits);
  expect(actual[1]).toBeCloseTo(expected[1], digits);
  expect(actual[2]).toBeCloseTo(expected[2], digits);
}
