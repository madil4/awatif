import { computeLaminateESL } from "../laminate";
import { CLTLayup } from "../../data-model";
import { getLocalStiffnessMatrixShell } from "../../utils/getLocalStiffnessMatrix";

function baseLayup(options: CLTLayup["options"]): CLTLayup {
  return {
    layers: [
      {
        thickness: 0.015,
        thetaDeg: 0,
        Ex: 11600e6,
        Ey: 450e6,
        nuXY: 0.4,
        Gxy: 690e6,
        Gxz: 690e6,
        Gyz: 100e6,
      },
      {
        thickness: 0.04,
        thetaDeg: 90,
        Ex: 8000e6,
        Ey: 270e6,
        nuXY: 0.4,
        Gxy: 500e6,
        Gxz: 500e6,
        Gyz: 50e6,
      },
      {
        thickness: 0.035,
        thetaDeg: 0,
        Ex: 11600e6,
        Ey: 450e6,
        nuXY: 0.4,
        Gxy: 690e6,
        Gxz: 690e6,
        Gyz: 100e6,
      },
    ],
    options,
  };
}

function toUnits(esl: ReturnType<typeof computeLaminateESL>) {
  return {
    A: esl.A.map((row) => row.map((v) => v / 1e3)), // kN/m
    B: esl.B.map((row) => row.map((v) => v / 1e3)), // kN
    D: esl.D.map((row) => row.map((v) => v / 1e3)), // kNm
    S: esl.S.map((row) => row.map((v) => v / 1e3)), // kN/m
  };
}

function expectMatrixClose(
  actual: number[][],
  expected: number[][],
  absTol = 1e-2,
  relTol = 1e-3,
): void {
  for (let i = 0; i < expected.length; i++) {
    for (let j = 0; j < expected[0].length; j++) {
      const diff = Math.abs(actual[i][j] - expected[i][j]);
      const limit = Math.max(absTol, relTol * Math.abs(expected[i][j]));
      expect(diff).toBeLessThanOrEqual(limit);
    }
  }
}

describe("computeLaminateESL chapter 6.1 verification", () => {
  test("6.1.1.1 shear coupling ON, glue at narrow side", () => {
    const esl = computeLaminateESL(baseLayup({ shearCoupling: true, noGlueAtNarrowSide: false }));
    const r = toUnits(esl);

    expectMatrixClose(r.D, [[602.7, 10.33, 0], [10.33, 98.35, 0], [0, 0, 40.14]], 0.2);
    expectMatrixClose(r.B, [[-4560, -29, 0], [-29, 3036, 0], [0, 0, -76]], 20);
    expectMatrixClose(r.A, [[594460, 13400, 0], [13400, 344400, 0], [0, 0, 54500]], 30);
    expectMatrixClose(r.S, [[5979, 0], [0, 21320]], 80);

    expect(esl.rho13).toBeCloseTo(0.1638, 3);
    expect(esl.rho23).toBeCloseTo(0.8528, 3);
    expect(esl.alphaDeg).toBeCloseTo(0, 1);
  });

  test("6.1.1.2 shear coupling ON, no glue at narrow side", () => {
    const esl = computeLaminateESL(baseLayup({ shearCoupling: true, noGlueAtNarrowSide: true }));
    const r = toUnits(esl);

    expectMatrixClose(r.D, [[596.4, 0, 0], [0, 74.67, 0], [0, 0, 40.14]], 0.2);
    expectMatrixClose(r.B, [[-4640, 0, 0], [0, 3200, 0], [0, 0, -76]], 25);
    expectMatrixClose(r.A, [[580000, 0, 0], [0, 320000, 0], [0, 0, 54500]], 30);
    expectMatrixClose(r.S, [[5986, 0], [0, 16668]], 150);

    expect(esl.rho13).toBeCloseTo(0.1640, 3);
    expect(esl.rho23).toBeCloseTo(0.6667, 3);
  });

  test("6.1.2.1 shear coupling OFF (5/6), glue at narrow side", () => {
    const esl = computeLaminateESL(baseLayup({ shearCoupling: false, noGlueAtNarrowSide: false }));
    const r = toUnits(esl);

    expectMatrixClose(r.D, [[46.43, 1.277, 0], [1.277, 44.64, 0], [0, 0, 5.325]], 0.02);
    expectMatrixClose(r.B, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1e-6);
    expectMatrixClose(r.A, [[594460, 13400, 0], [13400, 344400, 0], [0, 0, 54500]], 30);
    expectMatrixClose(r.S, [[30417, 0], [0, 20833]], 80);
  });

  test("6.1.2.2 shear coupling OFF (5/6), no glue at narrow side", () => {
    const esl = computeLaminateESL(baseLayup({ shearCoupling: false, noGlueAtNarrowSide: true }));
    const r = toUnits(esl);

    expectMatrixClose(r.D, [[44.71, 0, 0], [0, 42.67, 0], [0, 0, 5.325]], 0.02);
    expectMatrixClose(r.B, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1e-6);
    expectMatrixClose(r.A, [[580000, 0, 0], [0, 320000, 0], [0, 0, 54500]], 30);
    expectMatrixClose(r.S, [[30417, 0], [0, 20833]], 80);
  });
});

describe("symmetry enforcement in shell element path", () => {
  test("symmetric layup has B ~ 0 and is accepted", () => {
    const symmetricLayup: CLTLayup = {
      layers: [
        {
          thickness: 0.03,
          thetaDeg: 0,
          Ex: 11600e6,
          Ey: 450e6,
          nuXY: 0.4,
          Gxy: 690e6,
          Gxz: 690e6,
          Gyz: 100e6,
        },
        {
          thickness: 0.02,
          thetaDeg: 90,
          Ex: 8000e6,
          Ey: 270e6,
          nuXY: 0.4,
          Gxy: 500e6,
          Gxz: 500e6,
          Gyz: 50e6,
        },
        {
          thickness: 0.03,
          thetaDeg: 0,
          Ex: 11600e6,
          Ey: 450e6,
          nuXY: 0.4,
          Gxy: 690e6,
          Gxz: 690e6,
          Gyz: 100e6,
        },
      ],
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: true,
      },
    };

    const esl = computeLaminateESL(symmetricLayup);
    const bNorm = Math.hypot(...esl.B.flat());
    expect(bNorm).toBeLessThan(1e-6);

    expect(() =>
      getLocalStiffnessMatrixShell(
        [
          [0, 0, 0],
          [1, 0, 0],
          [0, 1, 0],
        ],
        {
          cltLayups: new Map([[0, symmetricLayup]]),
        },
        0,
      ),
    ).not.toThrow();
  });

  test("unsymmetric layup throws when strict symmetry is enabled", () => {
    const unsymmetric = baseLayup({
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
      symmetryTolerance: 1e-6,
    });

    expect(() =>
      getLocalStiffnessMatrixShell(
        [
          [0, 0, 0],
          [1, 0, 0],
          [0, 1, 0],
        ],
        {
          cltLayups: new Map([[0, unsymmetric]]),
        },
        0,
      ),
    ).toThrow("Unsymmetric laminate requires A–B–D coupling; not supported yet.");
  });
});
