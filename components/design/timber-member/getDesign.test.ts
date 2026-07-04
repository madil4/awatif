import { describe, test, expect } from "vitest";
import type { LineElementForces } from "../data-model";
import { getDesign } from "./getDesign";

// ── Helpers ──────────────────────────────────────────────────────────
function getForces(
  elements: { N: [number, number]; Mz: [number, number]; My?: [number, number]; Vy?: [number, number] }[],
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
  width: 100, // mm
  depth: 200, // mm
  timberClass: "C24",
  serviceClass: 1 as const,
  loadDurationClass: "medium-term",
};

// C24 properties for hand verification:
//   fm_k = 24, ft_0_k = 14, fc_0_k = 21
//   k_mod (service class 1, medium-term) = 0.80
//   γ_M (solid) = 1.30
//   A = 100×200 = 20000 mm²
//   W_y = 100×200²/6 = 666666.67 mm³
// FEM convention: positive N = compression, negative N = tension

describe("timber-member", () => {
  test("1: Pure tension", () => {
    // N = -100 kN tension (negative = tension in FEM), no bending
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [-100, -100], Mz: [0, 0] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    // σ_t = 100e3 / 20000 = 5 MPa
    expect(result.sigma_t_0_d).toBeCloseTo(5.0);
    expect(result.sigma_c_0_d).toBe(0);
    expect(result.sigma_m_y_d).toBeCloseTo(0);

    // k_h for tension: max(100,200) = 200 > 150 → k_h = 1.0
    expect(result.kH_t).toBeCloseTo(1.0);

    // f_t,0,d = 0.80 × 1.0 × 14 / 1.30 = 8.615...
    expect(result.ft_0_d).toBeCloseTo(8.615384615384616);

    // utilization = 5 / 8.615... = 0.5804
    expect(result.util_tension).toBeCloseTo(5.0 / result.ft_0_d);
    expect(result.governingCheck).toBe("Tension (Eq. 6.1)");
  });

  test("2: Pure compression", () => {
    // N = +150 kN compression (positive = compression in FEM), no bending
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [150, 150], Mz: [0, 0] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    // σ_c = 150e3 / 20000 = 7.5 MPa
    expect(result.sigma_c_0_d).toBeCloseTo(7.5);
    expect(result.sigma_t_0_d).toBe(0);

    // f_c,0,d = 0.80 × 21 / 1.30 = 12.923...
    expect(result.fc_0_d).toBeCloseTo(12.923076923076923);

    // utilization = 7.5 / 12.923... = 0.5804
    expect(result.util_compression).toBeCloseTo(7.5 / result.fc_0_d);
    expect(result.governingCheck).toBe("Compression (Eq. 6.2)");
  });

  test("3: Pure bending", () => {
    // No axial, M = 10 kNm
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 10] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    // W_y = 100 × 200² / 6 = 666666.67 mm³
    expect(result.Wy).toBeCloseTo(666666.6666666666);

    // σ_m = 10e6 / 666666.67 = 15.0 MPa
    expect(result.sigma_m_y_d).toBeCloseTo(15.0);
    expect(result.sigma_t_0_d).toBe(0);
    expect(result.sigma_c_0_d).toBe(0);

    // k_h for bending: h=200 > 150 → k_h = 1.0
    expect(result.kH_m).toBeCloseTo(1.0);

    // f_m,d = 0.80 × 1.0 × 24 / 1.30 = 14.769...
    expect(result.fm_d).toBeCloseTo(14.769230769230769);

    // utilization = 15 / 14.769... = 1.0156
    expect(result.util_bending).toBeCloseTo(15.0 / result.fm_d);
    expect(result.governingCheck).toBe("Bending (Eq. 6.11/6.12)");
  });

  test("4: Combined bending + tension (Eq. 6.17)", () => {
    // N = -50 kN tension (negative), M = 5 kNm
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [-50, -50], Mz: [0, 5] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    // σ_t = 50e3 / 20000 = 2.5 MPa
    // σ_m = 5e6 / 666666.67 = 7.5 MPa
    expect(result.sigma_t_0_d).toBeCloseTo(2.5);
    expect(result.sigma_m_y_d).toBeCloseTo(7.5);

    // Eq. 6.17: σ_t/f_t + σ_m/f_m
    const expected = 2.5 / result.ft_0_d + 7.5 / result.fm_d;
    expect(result.util_combined).toBeCloseTo(expected);
    expect(result.combinedEq).toBe("Eq. 6.17/6.18");
  });

  test("5: Combined bending + compression (Eq. 6.19/6.20)", () => {
    // N = +100 kN compression (positive), M = 5 kNm
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [100, 100], Mz: [0, 5] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    // σ_c = 100e3 / 20000 = 5 MPa
    // σ_m = 5e6 / 666666.67 = 7.5 MPa
    expect(result.sigma_c_0_d).toBeCloseTo(5.0);
    expect(result.sigma_m_y_d).toBeCloseTo(7.5);

    // Eq. 6.19: (σ_c/f_c)² + σ_m/f_m — note squared term
    const expected =
      Math.pow(5.0 / result.fc_0_d, 2) + 7.5 / result.fm_d;
    expect(result.util_combined).toBeCloseTo(expected);
    expect(result.combinedEq).toBe("Eq. 6.19/6.20");
  });

  test("6: k_h size effect for small section", () => {
    // h = 100mm < 150mm → k_h for bending = min((150/100)^0.2, 1.3)
    const smallParams = { ...defaultParams, depth: 100 };
    const result = getDesign({
      params: smallParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 1] }]),
      length: 1,
      activeAnalysis: "linear",
    });

    const expectedKh = Math.min(Math.pow(150 / 100, 0.2), 1.3);
    expect(result.kH_m).toBeCloseTo(expectedKh);

    // f_m,d should be higher due to k_h
    const fm_d_with_kh = (0.8 * expectedKh * 24) / 1.3;
    expect(result.fm_d).toBeCloseTo(fm_d_with_kh);
  });

  test("7: Glulam class (GL24h)", () => {
    const glulamParams = {
      ...defaultParams,
      timberClass: "GL24h",
      depth: 400,
    };
    const result = getDesign({
      params: glulamParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 10] }]),
      length: 5,
      activeAnalysis: "linear",
    });

    // γ_M = 1.25 for glulam
    expect(result.gammaM).toBe(1.25);

    // GL24h: fm_k = 24, ft_0_k = 19.2, fc_0_k = 24
    expect(result.classProps.fm_k).toBe(24);
    expect(result.classProps.ft_0_k).toBe(19.2);
    expect(result.classProps.fc_0_k).toBe(24);

    // k_h for glulam bending: h=400 < 600 → k_h = min((600/400)^0.1, 1.1)
    const expectedKh = Math.min(Math.pow(600 / 400, 0.1), 1.1);
    expect(result.kH_m).toBeCloseTo(expectedKh);

    // f_m,d = 0.80 × k_h × 24 / 1.25
    const fm_d = (0.8 * expectedKh * 24) / 1.25;
    expect(result.fm_d).toBeCloseTo(fm_d);
  });

  // ── Column Buckling Tests (Eq. 6.21–6.29) ───────────────────────────

  test("9: Buckling — slender member in pure compression → Eq. 6.23/6.24 governs", () => {
    // C24, 100×200, L=4m, lengthFactor=1 → L_ef=4000mm
    // i_y = 200/√12 = 57.74, i_z = 100/√12 = 28.87
    // λ_y = 4000/57.74 = 69.28, λ_z = 4000/28.87 = 138.56
    // λ_rel,y = (69.28/π)×√(21/7400)=22.06×0.05330=1.175
    // λ_rel,z = (138.56/π)×√(21/7400)=44.12×0.05330=2.351
    // Both > 0.3 → buckling check applies; z governs (larger λ_rel)
    // β_c = 0.2 (solid)
    // k_y = 0.5×(1+0.2×(1.175-0.3)+1.175²) = 0.5×(1+0.175+1.381) = 1.278
    // k_c,y = 1/(1.278+√(1.278²-1.175²))=1/(1.278+√(0.249))=1/(1.278+0.499)=0.563
    // N=150kN, σ_c=150e3/20000=7.5MPa, fc_0_d=12.923 MPa
    // Eq.6.23: 7.5/(0.563×12.923) = 7.5/7.276 = 1.031 → over 1.0
    const result = getDesign({
      params: { ...defaultParams, lengthFactor: 1 },
      lineElementForces: getForces([{ N: [150, 150], Mz: [0, 0] }]),
      length: 4,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeDefined();
    const bc = result.bucklingCheck!;
    expect(bc.lambda_rel_y).toBeGreaterThan(0.3);
    expect(bc.lambda_rel_z).toBeGreaterThan(bc.lambda_rel_y); // z-axis more slender
    expect(bc.k_c_z).toBeLessThan(bc.k_c_y); // z-axis more reduced
    expect(bc.utilization).toBeCloseTo(Math.max(bc.util_y, bc.util_z), 5);
    expect(result.combinedEq).toBe("Eq. 6.23/6.24");
    // Buckling combined util > plain compression util (k_c < 1 reduces capacity)
    expect(result.util_combined).toBeGreaterThan(result.util_compression);
  });

  test("10: Buckling — stocky member (both λ_rel ≤ 0.3) → bucklingCheck undefined", () => {
    // C24, 100×200, L=0.5m, lengthFactor=1 → L_ef=500mm
    // i_z=28.87mm, λ_z=500/28.87=17.32
    // λ_rel,z=(17.32/π)×√(21/7400)=5.51×0.05330=0.294 < 0.3 → no buckling
    const result = getDesign({
      params: { ...defaultParams, lengthFactor: 1 },
      lineElementForces: getForces([{ N: [100, 100], Mz: [0, 0] }]),
      length: 0.5,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeUndefined();
    expect(result.combinedEq).toBe("Eq. 6.19/6.20"); // original check preserved
  });

  test("11: Buckling — compression + bending → km applies on z-axis (Eq. 6.24)", () => {
    // C24, 100×200, L=4m, lengthFactor=1
    // Same slenderness as test 9 → k_c_y≈0.563, k_c_z≈0.166
    // N=50kN, M=2kNm → σ_c=2.5MPa, σ_m=3.0MPa, fc_0_d=12.923, fm_d from test
    // Eq.6.23 (y): 2.5/(0.563×12.923) + 3.0/fm_d
    // Eq.6.24 (z): 2.5/(0.166×12.923) + 0.7×3.0/fm_d  ← km=0.7
    const result = getDesign({
      params: { ...defaultParams, lengthFactor: 1 },
      lineElementForces: getForces([{ N: [50, 50], Mz: [2, 2] }]),
      length: 4,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeDefined();
    const bc = result.bucklingCheck!;
    // Eq.6.24 bending term should use km=0.7 (less than Eq.6.23's 1.0)
    // With same σ_m_y_d and fm_d, the bending part of util_z < bending part of util_y
    const sigma_m = result.sigma_m_y_d;
    const fm_d = result.fm_d;
    const bendingRatio = sigma_m / fm_d;
    // util_y bending contribution = 1.0 × bendingRatio
    // util_z bending contribution = 0.7 × bendingRatio
    expect(bc.util_y - result.sigma_c_0_d / (bc.k_c_y * result.fc_0_d)).toBeCloseTo(bendingRatio, 5);
    expect(bc.util_z - result.sigma_c_0_d / (bc.k_c_z * result.fc_0_d)).toBeCloseTo(0.7 * bendingRatio, 5);
  });

  test("13: Nonlinear analysis — bucklingCheck skipped even with lengthFactor", () => {
    const result = getDesign({
      params: { ...defaultParams, lengthFactor: 1 },
      lineElementForces: getForces([{ N: [150, 150], Mz: [0, 0] }]),
      length: 4,
      activeAnalysis: "nonlinear",
    });

    expect(result.bucklingCheck).toBeUndefined();
    expect(result.combinedEq).toBe("Eq. 6.19/6.20");
  });

  test("12: Buckling — no lengthFactor → bucklingCheck undefined", () => {
    const result = getDesign({
      params: defaultParams, // no lengthFactor
      lineElementForces: getForces([{ N: [150, 150], Mz: [0, 0] }]),
      length: 4,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeUndefined();
    expect(result.combinedEq).toBe("Eq. 6.19/6.20");
  });

  // ── Biaxial Moment Tests ──────────────────────────────────────────────

  test("14: Pure biaxial bending — Eq. 6.11 and 6.12", () => {
    // C24, 100×200, Mz=10kNm (strong), My=3kNm (weak)
    // W_y = b×h²/6 = 100×200²/6 = 666666.67 mm³
    // W_z = h×b²/6 = 200×100²/6 = 333333.33 mm³
    // σ_m,y,d = 10e6 / 666666.67 = 15.0 MPa
    // σ_m,z,d = 3e6 / 333333.33 = 9.0 MPa
    // f_m,d = 0.8 × 1.0 × 24 / 1.3 = 14.769...
    // k_m = 0.7
    // Eq. 6.11: 15/f_m,d + 0.7×9/f_m,d = (15 + 6.3)/14.769 = 21.3/14.769
    // Eq. 6.12: 0.7×15/f_m,d + 9/f_m,d = (10.5 + 9)/14.769 = 19.5/14.769
    // util_bending = max(Eq.6.11, Eq.6.12) = 21.3/14.769
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [0, 0], Mz: [0, 10], My: [0, 3] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    expect(result.Wz).toBeCloseTo((200 * 100 * 100) / 6);
    expect(result.sigma_m_y_d).toBeCloseTo(15.0);
    expect(result.sigma_m_z_d).toBeCloseTo(9.0);
    expect(result.MEd_weak).toBeCloseTo(3.0);

    const fm_d = result.fm_d;
    const eq611 = 15.0 / fm_d + 0.7 * 9.0 / fm_d;
    const eq612 = 0.7 * 15.0 / fm_d + 9.0 / fm_d;
    expect(result.util_bending).toBeCloseTo(Math.max(eq611, eq612));
    expect(result.util_bending).toBeGreaterThan(15.0 / fm_d); // biaxial > uniaxial
  });

  test("15: Biaxial bending + tension — Eq. 6.17/6.18", () => {
    // N=-50kN tension, Mz=5kNm (strong), My=2kNm (weak)
    // σ_t = 50e3/20000 = 2.5 MPa
    // σ_m,y,d = 5e6/666666.67 = 7.5 MPa
    // σ_m,z,d = 2e6/333333.33 = 6.0 MPa
    // Eq. 6.17: σ_t/f_t + σ_m,y/f_m + 0.7×σ_m,z/f_m
    // Eq. 6.18: σ_t/f_t + 0.7×σ_m,y/f_m + σ_m,z/f_m
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [-50, -50], Mz: [0, 5], My: [0, 2] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    expect(result.sigma_m_z_d).toBeCloseTo(6.0);
    const ft = result.ft_0_d;
    const fm = result.fm_d;
    const eq617 = 2.5 / ft + 7.5 / fm + 0.7 * 6.0 / fm;
    const eq618 = 2.5 / ft + 0.7 * 7.5 / fm + 6.0 / fm;
    expect(result.util_combined).toBeCloseTo(Math.max(eq617, eq618));
    expect(result.combinedEq).toBe("Eq. 6.17/6.18");
  });

  test("16: Biaxial bending + compression — Eq. 6.19/6.20", () => {
    // N=+100kN compression, Mz=5kNm (strong), My=2kNm (weak)
    // σ_c = 5.0 MPa, σ_m,y,d = 7.5 MPa, σ_m,z,d = 6.0 MPa
    // Eq. 6.19: (σ_c/f_c)² + σ_m,y/f_m + 0.7×σ_m,z/f_m
    // Eq. 6.20: (σ_c/f_c)² + 0.7×σ_m,y/f_m + σ_m,z/f_m
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([{ N: [100, 100], Mz: [0, 5], My: [0, 2] }]),
      length: 3,
      activeAnalysis: "linear",
    });

    const fc = result.fc_0_d;
    const fm = result.fm_d;
    const comp_sq = Math.pow(5.0 / fc, 2);
    const eq619 = comp_sq + 7.5 / fm + 0.7 * 6.0 / fm;
    const eq620 = comp_sq + 0.7 * 7.5 / fm + 6.0 / fm;
    expect(result.util_combined).toBeCloseTo(Math.max(eq619, eq620));
    expect(result.combinedEq).toBe("Eq. 6.19/6.20");
    // Biaxial combined > uniaxial combined (test 5 had util for Mz=5kNm only)
    expect(result.util_combined).toBeGreaterThan(comp_sq + 7.5 / fm);
  });

  test("17: Biaxial + column buckling — Eq. 6.23/6.24 includes both moment terms", () => {
    // C24, 100×200, L=4m, lengthFactor=1, N=50kN, Mz=2kNm, My=1kNm
    // σ_m,y,d = 2e6/666666.67 = 3.0 MPa
    // σ_m,z,d = 1e6/333333.33 = 3.0 MPa
    // Eq.6.23: σ_c/(k_c,y×f_c) + σ_m,y/f_m + 0.7×σ_m,z/f_m
    // Eq.6.24: σ_c/(k_c,z×f_c) + 0.7×σ_m,y/f_m + σ_m,z/f_m
    const result = getDesign({
      params: { ...defaultParams, lengthFactor: 1 },
      lineElementForces: getForces([{ N: [50, 50], Mz: [0, 2], My: [0, 1] }]),
      length: 4,
      activeAnalysis: "linear",
    });

    expect(result.bucklingCheck).toBeDefined();
    const bc = result.bucklingCheck!;
    const fc = result.fc_0_d;
    const fm = result.fm_d;
    const ratio_y = result.sigma_m_y_d / fm;
    const ratio_z = result.sigma_m_z_d / fm;
    const sigma_c = result.sigma_c_0_d;

    const expected_y = sigma_c / (bc.k_c_y * fc) + ratio_y + 0.7 * ratio_z;
    const expected_z = sigma_c / (bc.k_c_z * fc) + 0.7 * ratio_y + ratio_z;
    expect(bc.util_y).toBeCloseTo(expected_y);
    expect(bc.util_z).toBeCloseTo(expected_z);
    expect(result.util_combined).toBeCloseTo(Math.max(expected_y, expected_z));
  });

  test("8: Pure shear", () => {
    // V = 10 kN, C24, 100x200 mm
    const result = getDesign({
      params: defaultParams,
      lineElementForces: getForces([
        { N: [0, 0], Mz: [0, 0], Vy: [10, 10] } as any,
      ]),
      length: 2,
      activeAnalysis: "linear",
    });

    // f_v,k = 4.0, k_mod = 0.8, γ_M = 1.3
    // f_v,d = 0.8 * 4.0 / 1.3 = 2.4615...
    expect(result.fv_d).toBeCloseTo((0.8 * 4.0) / 1.3);

    // A = 20000, k_cr = 0.67, A_eff = 13400
    // τ_d = 1.5 * 10000 / 13400 = 1.1194...
    expect(result.tau_d).toBeCloseTo((1.5 * 10000) / (0.67 * 20000));

    expect(result.util_shear).toBeCloseTo(result.tau_d / result.fv_d);
    expect(result.governingCheck).toBe("Shear (Eq. 6.13)");
  });
});
