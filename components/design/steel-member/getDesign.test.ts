import { describe, test, expect } from "vitest";
import type { LineElementForces } from "../data-model";
import { getDesign } from "./getDesign";

// ── Helpers ──────────────────────────────────────────────────────────
function getForces(
  elements: { N: [number, number]; Mz: [number, number]; Vy?: [number, number]; My?: [number, number] }[],
): LineElementForces {
  return {
    elementIndices: elements.map((_, i) => i),
    elementForces: elements.map((e) => ({
      N: e.N,
      Vy: e.Vy ?? ([0, 0] as [number, number]),
      Vz: [0, 0] as [number, number],
      Mx: [0, 0] as [number, number],
      My: e.My ?? ([0, 0] as [number, number]),
      Mz: e.Mz,
    })),
  };
}

// ── Default params ──────────────────────────────────────────────────
const defaultParams = {
  profile: "IPE 300",
  steelGrade: "S235",
};

// IPE 300 + S235 reference values:
//   A = 5381 mm², Wpl_y = 628400 mm³, fy = 235 MPa, γ_M0 = 1.0
//   N_pl_Rd = 5381 × 235 / 1000 = 1264.535 kN
//   M_c_Rd  = 628400 × 235 / 1e6 = 147.674 kNm
// FEM convention: positive N = compression, negative N = tension

describe("steel-member", () => {
  test("1: Pure tension", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [-500, -500], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.N_pl_Rd).toBeCloseTo(1264.535);
    expect(result.util_tension).toBeCloseTo(500 / 1264.535);
    expect(result.util_compression).toBe(0);
    expect(result.util_bending).toBeCloseTo(0);
    expect(result.governingCheck).toBe("Tension (Cl. 6.2.3)");
  });

  test("2: Pure compression", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [800, 800], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.util_compression).toBeCloseTo(800 / 1264.535);
    expect(result.util_tension).toBe(0);
    expect(result.governingCheck).toBe("Compression (Cl. 6.2.4)");
  });

  test("3: Pure bending", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 100] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.M_c_Rd).toBeCloseTo(147.674);
    expect(result.util_bending).toBeCloseTo(100 / 147.674);
    expect(result.util_tension).toBe(0);
    expect(result.util_compression).toBe(0);
    expect(result.governingCheck).toBe("Bending (Cl. 6.2.5)");
  });

  test("4: Bending + tension (independent checks)", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [-200, -200], Mz: [0, 50] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.util_tension).toBeCloseTo(200 / 1264.535);
    expect(result.util_bending).toBeCloseTo(50 / 147.674);
    // Bending governs (50/147.674 ≈ 0.338 > 200/1264.535 ≈ 0.158)
    expect(result.governingCheck).toBe("Bending (Cl. 6.2.5)");
  });

  test("5: Different grade (S355)", () => {
    const result = getDesign({
      params: { profile: "IPE 300", steelGrade: "S355" },
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 100] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.fy).toBe(355);
    expect(result.N_pl_Rd).toBeCloseTo((5381 * 355) / 1000);
    expect(result.M_c_Rd).toBeCloseTo((628400 * 355) / 1e6);
    expect(result.util_bending).toBeCloseTo(100 / result.M_c_Rd);
  });

  test("6: Different profile (HEB 300)", () => {
    const result = getDesign({
      params: { profile: "HEB 300", steelGrade: "S235" },
      lineElementForces: getForces([{ N: [1000, 1000], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    // HEB 300: A = 14908 mm²
    expect(result.A).toBe(14908);
    expect(result.N_pl_Rd).toBeCloseTo((14908 * 235) / 1000);
    expect(result.util_compression).toBeCloseTo(1000 / result.N_pl_Rd);
    expect(result.governingCheck).toBe("Compression (Cl. 6.2.4)");
  });

  test("7: Pure shear", () => {
    // IPE 300 + S235
    // A_v = 5381 - 2×150×10.7 + (7.1 + 2×15)×10.7 = 2567.97 mm²
    // h_w×tw = (300-2×10.7)×7.1 = 278.6×7.1 = 1978.06 mm² → A_v formula governs
    // V_pl_Rd = 2567.97 × (235/√3) / 1000 ≈ 348.42 kN
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 0], Vy: [100, 100] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.A_v).toBeCloseTo(2567.97, 1);
    expect(result.VEd).toBeCloseTo(100);
    expect(result.V_pl_Rd).toBeCloseTo(2567.97 * (235 / Math.sqrt(3)) / 1000, 2);
    expect(result.util_shear).toBeCloseTo(100 / result.V_pl_Rd, 3);
    expect(result.util_tension).toBe(0);
    expect(result.util_compression).toBe(0);
    expect(result.util_bending).toBe(0);
    expect(result.governingCheck).toBe("Shear y (Cl. 6.2.6)");
  });

  test("8: M+V interaction — high shear triggers reduction (Cl. 6.2.8)", () => {
    // IPE 300 + S235, VEd = 300 kN > 0.5 × V_pl_Rd ≈ 174 kN, MEd = 130 kNm
    // V_pl_Rd ≈ 348.42 kN, util_shear ≈ 0.861
    // ρ = (2×300/348.42 − 1)² ≈ 0.521
    // A_w = 278.6 × 7.1 = 1978.06 mm²
    // M_V_Rd ≈ 130.84 kNm, util_MV ≈ 130/130.84 ≈ 0.994 → governs over shear
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 130], Vy: [300, 300] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    const V_pl_Rd = result.V_pl_Rd;
    const rho = Math.pow((2 * 300) / V_pl_Rd - 1, 2);
    const A_w = 278.6 * 7.1;
    const expectedM_V_Rd = (628400 - (rho * A_w ** 2) / (4 * 7.1)) * 235 / 1e6;

    expect(result.M_V_Rd).toBeCloseTo(expectedM_V_Rd, 2);
    expect(result.util_MV).toBeCloseTo(130 / expectedM_V_Rd, 3);
    expect(result.util_MV).toBeGreaterThan(result.util_bending); // interaction governs over plain bending
    expect(result.governingCheck).toBe("M+V Interaction (Cl. 6.2.8)");
  });

  test("9: M+V — low shear does not trigger reduction (Cl. 6.2.8)", () => {
    // VEd = 100 kN ≤ 0.5 × V_pl_Rd → util_MV = 0, M_V_Rd = M_c_Rd
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 80], Vy: [100, 100] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.util_MV).toBe(0);
    expect(result.M_V_Rd).toBeCloseTo(result.M_c_Rd);
  });

  test("10: M+N interaction — compression + bending triggers reduction (Cl. 6.2.9)", () => {
    // IPE 300 + S235, NEd = 500 kN (compression), MEd = 80 kNm
    // N_pl_Rd = 1264.535 kN
    // n = 500 / 1264.535 ≈ 0.3955
    // a = min((5381 − 2×150×10.7) / 5381, 0.5) = min(0.4035, 0.5) = 0.4035
    // M_N_y_Rd = 147.674 × (1 − 0.3955) / (1 − 0.5×0.4035) ≈ 111.84 kNm
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [500, 500], Mz: [0, 80] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    const n = 500 / result.N_pl_Rd;
    const a = Math.min((5381 - 2 * 150 * 10.7) / 5381, 0.5);
    const expectedM_N_y_Rd = Math.min(result.M_c_Rd * (1 - n) / (1 - 0.5 * a), result.M_c_Rd);

    expect(result.M_N_y_Rd).toBeCloseTo(expectedM_N_y_Rd, 2);
    expect(result.util_MN).toBeCloseTo(80 / expectedM_N_y_Rd, 3);
    expect(result.util_MN).toBeGreaterThan(result.util_bending); // interaction governs over plain bending
    expect(result.governingCheck).toBe("M+N Interaction (Cl. 6.2.9)");
  });

  test("11: M+N — no axial force does not activate check (Cl. 6.2.9)", () => {
    // NEd = 0 → util_MN = 0
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 80] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.util_MN).toBe(0);
  });

  test("12: Classification — IPE 300 + S235 is Class 1 (Cl. 5.2)", () => {
    // ε = 1.0; c_f/tf = 56.45/10.7 = 5.28 ≤ 9ε → flange Class 1
    // c_w/tw = 248.6/7.1 = 35.0 ≤ 72ε → web Class 1
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 100] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.eps).toBeCloseTo(1.0);
    expect(result.flangeClass).toBe(1);
    expect(result.webClass).toBe(1);
    expect(result.sectionClass).toBe(1);
    // Class 1 → uses Wpl_y (same as before)
    expect(result.M_c_Rd).toBeCloseTo(147.674);
  });

  // ── Column Buckling Tests (Cl. 6.3.1) ───────────────────────────────

  test("14: Buckling — IPE 300 + S235, L=5m, lengthFactor=1 — z-axis governs", () => {
    // IPE 300: A=5381, Iz=6038000 → i_z=√(6038000/5381)=33.495 mm
    // L_cr=5000mm, λ̄_z=(5000/33.495/π)×√(235/210000)=1.591
    // h/b=2.0>1.2, tf=10.7≤40 → curve z = b (α=0.34)
    // Φ_z=0.5×(1+0.34×(1.591-0.2)+1.591²)=2.002, χ_z=1/(2.002+√(2.002²-1.591²))=0.311
    // N_b,Rd,z=0.311×5381×235/1000≈393 kN; util=100/393≈0.254
    const result = getDesign({
      params: { profile: "IPE 300", steelGrade: "S235", lengthFactor: 1 },
      lineElementForces: getForces([{ N: [100, 100], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeDefined();
    const bc = result.bucklingCheck!;
    expect(bc.L_cr).toBeCloseTo(5000);
    expect(bc.lambda_z).toBeCloseTo(1.591, 2);
    expect(bc.curve_z).toBe("b");
    expect(bc.chi_z).toBeCloseTo(0.311, 2);
    expect(bc.governingAxis).toBe("z");
    expect(bc.N_b_Rd).toBeGreaterThan(390);
    expect(bc.N_b_Rd).toBeLessThan(400);
    expect(bc.utilization).toBeCloseTo(100 / bc.N_b_Rd, 3);
    expect(result.governingCheck).toBe("Buckling (Cl. 6.3.1)");
  });

  test("15: Buckling — very short member (L=0.3m) → λ̄ ≤ 0.2, χ = 1.0", () => {
    // L_cr=300mm, i_z≈33.5mm → λ̄_z≈(300/33.5/π)×√(235/210000)≈0.0955 ≤ 0.2 → χ=1.0
    const result = getDesign({
      params: { profile: "IPE 300", steelGrade: "S235", lengthFactor: 1 },
      lineElementForces: getForces([{ N: [100, 100], Mz: [0, 0] }]),
      length: 0.3,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeDefined();
    expect(result.bucklingCheck!.chi_y).toBe(1.0);
    expect(result.bucklingCheck!.chi_z).toBe(1.0);
  });

  test("16: Buckling — no lengthFactor → bucklingCheck is undefined", () => {
    const result = getDesign({
      params: { profile: "IPE 300", steelGrade: "S235" },
      lineElementForces: getForces([{ N: [500, 500], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeUndefined();
  });

  test("17: Nonlinear analysis — bucklingCheck skipped even with lengthFactor", () => {
    const result = getDesign({
      params: { profile: "IPE 300", steelGrade: "S235", lengthFactor: 1 },
      lineElementForces: getForces([{ N: [100, 100], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "nonlinear",
    });

    expect(result.bucklingCheck).toBeUndefined();
    expect(result.governingCheck).not.toBe("Buckling (Cl. 6.3.1)");
  });

  // ── Biaxial Bending Tests (Eq. 6.41) ────────────────────────────────

  test("18: Derived Wpl_z and Wel_z for IPE 300", () => {
    // IPE 300: Iz=6038000, b=150, tf=10.7, h=300, tw=7.1
    // Wel_z = 2×6038000/150 = 80506.7 mm³ (published: 80500 mm³ ✓)
    // Wpl_z = 10.7×150²/2 + (300-2×10.7)×7.1²/4 = 120375 + 3511 = 123886 mm³ (~1% below published 125200)
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 0] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.Wel_z).toBeCloseTo(80507, 0);
    expect(result.Wpl_z).toBeCloseTo(123886, 0);
    // M_c_z_Rd = Wpl_z × fy / γ_M0 / 1e6 = 123886 × 235 / 1e6 ≈ 29.113 kNm
    expect(result.M_c_z_Rd).toBeCloseTo((123886 * 235) / 1e6, 2);
  });

  test("19: Pure weak-axis bending — biaxial check active, strong-axis check zero", () => {
    // IPE 300 + S235, My=10 kNm (weak axis), Mz=0
    // util_bending_biaxial = 0/M_c_Rd + 10/M_c_z_Rd = 10/29.113 ≈ 0.344
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 0], My: [0, 10] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.MEd_z).toBeCloseTo(10);
    expect(result.MEd).toBeCloseTo(0);
    expect(result.util_bending).toBeCloseTo(0);
    expect(result.util_bending_biaxial).toBeCloseTo(10 / result.M_c_z_Rd, 4);
    expect(result.governingCheck).toBe("Biaxial Bending (Eq. 6.41)");
  });

  test("20: Biaxial bending — linear interaction sum (Eq. 6.41)", () => {
    // IPE 300 + S235, Mz=80 kNm (strong), My=15 kNm (weak)
    // util_bending_biaxial = 80/147.674 + 15/29.113
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 80], My: [0, 15] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    const expected = result.MEd / result.M_c_Rd + result.MEd_z / result.M_c_z_Rd;
    expect(result.util_bending_biaxial).toBeCloseTo(expected, 6);
    expect(result.util_bending_biaxial).toBeGreaterThan(result.util_bending);
  });

  test("21: No weak-axis moment — biaxial check inactive (shows 0)", () => {
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 100] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.MEd_z).toBe(0);
    expect(result.util_bending_biaxial).toBe(0);
  });

  test("13: Classification — HEA 300 + S355 is Class 3, uses Wel_y (Cl. 5.2)", () => {
    // ε = √(235/355) = 0.814; c_f/tf = 8.48 > 10ε=8.14 → flange Class 3
    // c_w/tw = 24.47 ≤ 72ε=58.6 → web Class 1 → section Class 3
    // M_c_Rd = Wel_y × fy / γ_M0 = 1260000 × 355 / 1e6 = 447.3 kNm
    const result = getDesign({
      params: { profile: "HEA 300", steelGrade: "S355" },
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 200] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    expect(result.eps).toBeCloseTo(Math.sqrt(235 / 355));
    expect(result.flangeClass).toBe(3);
    expect(result.webClass).toBe(1);
    expect(result.sectionClass).toBe(3);
    // Class 3 → uses Wel_y = 1260000, NOT Wpl_y = 1383000
    expect(result.M_c_Rd).toBeCloseTo((1260000 * 355) / 1e6, 1); // 447.3 kNm
  });
});
