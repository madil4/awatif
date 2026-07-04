import { describe, test, expect } from "vitest";
import type { LineElementForces } from "../data-model";
import { getDesign } from "./getDesign";

// Todo: Validate creep coefficient with RFEM
// Todo: Test a case when end moment governs (hard to reach)

const defaultParams = {
  width: 250,
  depth: 250,
  concreteGrade: "C30",
  steelGrade: "S500",
  steelArea: 2500,
  cover: 30,
  lengthFactor: 1,
  creepCoefficient: 0,
  braced: true,
  stirrupArea: 500,
};

describe("concrete-member", () => {
  test("1: Short column", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [500, 500], Mz: [0, 80] }]),
      length: 2,
      activeAnalysis: "linear",
    });

    expect(result.M02).toBe(80);
    expect(result.M01).toBe(0);
    expect(result.M0e).toBeCloseTo(80);
    expect(result.rm).toBeCloseTo(1);

    expect(result.lambda).toBeCloseTo(27.712812921102035);
    expect(result.lambdaLim).toBeCloseTo(35.618448936436934);
    expect(result.isSlender).toBe(false);

    expect(result.MEd).toBeCloseTo(80);
    expect(result.governingCase).toBe("M02");

    expect(result.NRd).toBeCloseTo(687.6058107891295);
    expect(result.MRd).toBeCloseTo(110.02507342171332);
    // Note: totalUtilization might be governed by shear min reinf if M is low.
    // In this case, 80 kNm is high enough to govern.
    expect(result.utilization).toBeGreaterThan(0.7);
  });

  test("2: Slender, single curvature", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([
        { N: [900, 900], Mz: [100, 100] },
        { N: [900, 900], Mz: [100, 100] },
        { N: [900, 900], Mz: [100, 100] },
      ]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.M02).toBe(100);
    expect(result.M01).toBe(100);
    expect(result.M0e).toBeCloseTo(100);
    expect(result.rm).toBeCloseTo(1);

    expect(result.lambda).toBeCloseTo(69.28203230275509);
    expect(result.lambdaLim).toBeCloseTo(26.548424446277593);
    expect(result.isSlender).toBe(true);

    expect(result.MEd).toBeCloseTo(839.8938431548574);
    expect(result.governingCase).toBe("M0Ed×β/(1−NEd/NB)");

    expect(result.NRd).toBeCloseTo(111.9543956156071);
    expect(result.MRd).toBeCloseTo(104.51196386758095);
    expect(result.utilization).toBeGreaterThan(8.0);
  });

  test("3: Slender, double curvature", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([
        { N: [1200, 1200], Mz: [-60, -40] },
        { N: [1200, 1200], Mz: [-40, 40] },
        { N: [1200, 1200], Mz: [40, 120] },
      ]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.M02).toBe(120);
    expect(result.M01).toBe(-60);
    expect(result.M0e).toBeCloseTo(48);
    expect(result.rm).toBeCloseTo(-0.5);

    expect(result.lambda).toBeCloseTo(69.28203230275509);
    expect(result.lambdaLim).toBeCloseTo(72.25934571720298);
    expect(result.isSlender).toBe(false);

    expect(result.MEd).toBeCloseTo(120);
    expect(result.governingCase).toBe("M02");

    expect(result.NRd).toBeCloseTo(947.4708589489643);
    expect(result.MRd).toBeCloseTo(94.74960292708772);
    expect(result.utilization).toBeGreaterThan(1.2);
  });

  test("4: Unstable column (NEd >= NB)", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [5000, 5000], Mz: [100, 100] }]),
      length: 10,
      activeAnalysis: "linear",
    });

    expect(result.MEd).toBe(Infinity);
    expect(result.governingCase).toBe("UNSTABLE (NEd ≥ NB)");
    expect(result.utilization).toBe(Infinity);
  });

  test("5: peak at mid-span due to local bow imperfection", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([
        { N: [900, 900], Mz: [0, 20] },
        { N: [900, 900], Mz: [20, 32] },
        { N: [900, 900], Mz: [32, 36] },
        { N: [900, 900], Mz: [36, 32] },
        { N: [900, 900], Mz: [32, 20] },
        { N: [900, 900], Mz: [20, 0] },
      ]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.M0e).toBeCloseTo(36);
    expect(result.MEd).toBeCloseTo(302.36178353574866);
    expect(result.governingCase).toBe("M0Ed×β/(1−NEd/NB)");
  });

  test("6: Minimum eccentricity governs", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [1000, 1000], Mz: [5, 5] }]),
      length: 1,
      activeAnalysis: "linear",
    });

    expect(result.isSlender).toBe(false);
    expect(result.MEd).toBeCloseTo(20);
    expect(result.governingCase).toBe("Min eccentricity");
  });

  test("7: Unbraced — rm forced to 1", () => {
    const result = getDesign({
      params: { ...defaultParams, braced: false },
      lineElementForces: getForces([{ N: [800, 800], Mz: [45, -45] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.rm).toBe(1);
  });

  test("8: Nonlinear bypass", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [800, 800], Mz: [45, -45] }]),
      length: 5,
      activeAnalysis: "nonlinear",
    });

    expect(result.MEd).toBeCloseTo(45);
    expect(result.governingCase).toBe("Max Internal Moment");
  });

  test("9: Shear check", () => {
    const result = getDesign({
      params: { ...defaultParams, stirrupArea: 500 },
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 0], Vy: [150, 150] }]),
      length: 2,
      activeAnalysis: "linear",
    });

    expect(result.VEd).toBe(150);
    expect(result.VRd_c).toBeGreaterThan(0);
    expect(result.VRd_max).toBeGreaterThanOrEqual(150);
    expect(result.shearUtilization).toBeGreaterThan(0);
    expect(result.utilization).toBe(result.shearUtilization);
  });

  test("10: Biaxial — no My input, biaxialUtilization equals sectionUtilization", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [500, 500], Mz: [0, 80] }]),
      length: 2,
      activeAnalysis: "linear",
    });

    // No My in input forces — biaxial fallback path (MEdy < 0.01 threshold)
    // MEdy comes from min eccentricity but maxAnalysisMomentY is 0
    // so the fallback condition (MEdy < 0.01 || MRdy < 0.001) checks maxAnalysisMomentY
    // Since input My=0, maxAnalysisMomentY=0 so biaxialUtilization = sectionUtilization
    expect(result.maxAnalysisMomentY).toBe(0);
    expect(result.biaxialUtilization).toBeCloseTo(result.sectionUtilization, 6);
    // Governing check should not be "Biaxial Check"
    expect(result.governingCheck).not.toBe("Biaxial Check");
  });

  test("11: Biaxial — equal Mz=My on square section produces higher utilization than uniaxial", () => {
    // Square section, equal moments on both axes — biaxial ratio = 2*(M/MRd)^a > M/MRd alone
    const uniaxial = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [500, 500], Mz: [0, 60] }]),
      length: 2,
      activeAnalysis: "linear",
    });

    const biaxial = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [500, 500], Mz: [0, 60], My: [0, 60] }]),
      length: 2,
      activeAnalysis: "linear",
    });

    // Exponent must be in [1, 2]
    expect(biaxial.biaxialExponent).toBeGreaterThanOrEqual(1.0);
    expect(biaxial.biaxialExponent).toBeLessThanOrEqual(2.0);

    // On a square section MRd ≈ MRdy, so biaxialRatio ≈ 2*(M/MRd)^a
    const a = biaxial.biaxialExponent;
    const expectedRatio = 2 * Math.pow(Math.abs(biaxial.MEd) / biaxial.MRd, a);
    expect(biaxial.biaxialRatio).toBeCloseTo(expectedRatio, 2);

    // Biaxial utilization must exceed uniaxial section utilization
    expect(biaxial.biaxialUtilization).toBeGreaterThan(uniaxial.sectionUtilization);
  });

  test("12: Vz shear check on weak axis", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 0], Vz: [100, 100] }]),
      length: 2,
      activeAnalysis: "linear",
    });

    expect(result.VEd_z).toBe(100);
    expect(result.VRd_c_y).toBeGreaterThan(0);
    expect(result.shearUtilizationY).toBeGreaterThan(0);
  });
});

// Helpers
function getForces(
  elements: {
    N: [number, number];
    Mz: [number, number];
    My?: [number, number];
    Vy?: [number, number];
    Vz?: [number, number];
  }[],
): LineElementForces {
  return {
    elementIndices: elements.map((_, i) => i),
    elementForces: elements.map((e) => ({
      N: e.N,
      Vy: e.Vy || ([0, 0] as [number, number]),
      Vz: e.Vz || ([0, 0] as [number, number]),
      Mx: [0, 0] as [number, number],
      My: e.My || ([0, 0] as [number, number]),
      Mz: e.Mz,
    })),
  };
}
