import type { LineElementForces } from "../data-model";
import { getMaxMoment } from "../helpers";
import { SteelMemberParams } from "./steelMember";
import {
  STEEL_PROFILES,
  STEEL_GRADES,
  SteelProfileProps,
} from "./steelProfiles";
import {
  DEFAULT_STEEL_NATIONAL_ANNEX,
  STEEL_NATIONAL_ANNEX_PARAMS,
} from "./nationalAnnexes";
import type { SteelNationalAnnexCode } from "./nationalAnnexes";

const E_STEEL = 210000; // Modulus of elasticity (MPa)

/**
 * Get the signed axial force with the largest absolute value.
 * FEM convention: positive = compression, negative = tension.
 */
function getSignedMaxAxialForce(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxAbs = 0;
  let signed = 0;
  for (const forces of elementForces) {
    for (const n of forces.N) {
      if (Math.abs(n) > maxAbs) {
        maxAbs = Math.abs(n);
        signed = n;
      }
    }
  }
  return signed;
}

/** Get the maximum absolute shear force (Vy, associated with Mz bending). */
function getMaxShear(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxAbs = 0;
  for (const forces of elementForces) {
    for (const v of forces.Vy) {
      if (Math.abs(v) > maxAbs) maxAbs = Math.abs(v);
    }
  }
  return maxAbs;
}

/** Get the maximum absolute weak-axis shear force (Vz, associated with My bending). */
function getMaxWeakAxisShear(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxAbs = 0;
  for (const forces of elementForces) {
    for (const v of forces.Vz) {
      if (Math.abs(v) > maxAbs) maxAbs = Math.abs(v);
    }
  }
  return maxAbs;
}

/** Get the maximum absolute weak-axis moment (My). */
function getMaxWeakAxisMoment(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxAbs = 0;
  for (const forces of elementForces) {
    maxAbs = Math.max(maxAbs, Math.abs(forces.My[0]), Math.abs(forces.My[1]));
  }
  return maxAbs;
}

function getClassification({
  b,
  tw,
  tf,
  r,
  h,
  fy,
  NEd,
  N_pl_Rd,
}: {
  b: number;
  tw: number;
  tf: number;
  r: number;
  h: number;
  fy: number;
  NEd: number;
  N_pl_Rd: number;
}) {
  const eps = Math.sqrt(235 / fy);

  // Flange (outstand element, Table 5.2 Sheet 2)
  const c_f = (b - tw - 2 * r) / 2;
  const flange_ratio = c_f / tf;
  const flangeClass =
    flange_ratio <= 9 * eps
      ? 1
      : flange_ratio <= 10 * eps
        ? 2
        : flange_ratio <= 14 * eps
          ? 3
          : 4;

  // Web (internal element, Table 5.2 Sheet 1)
  const c_w = h - 2 * tf - 2 * r;
  const web_ratio = c_w / tw;
  const significantAxial = Math.abs(NEd) > 0.1 * N_pl_Rd;
  let webClass: number;
  if (!significantAxial) {
    // Pure bending limits
    webClass =
      web_ratio <= 72 * eps
        ? 1
        : web_ratio <= 83 * eps
          ? 2
          : web_ratio <= 124 * eps
            ? 3
            : 4;
  } else {
    // Conservative pure compression limits (MVP scope)
    webClass =
      web_ratio <= 33 * eps
        ? 1
        : web_ratio <= 38 * eps
          ? 2
          : web_ratio <= 42 * eps
            ? 3
            : 4;
  }

  return {
    eps,
    c_f,
    flange_ratio,
    flangeClass,
    c_w,
    web_ratio,
    webClass,
    sectionClass: Math.max(flangeClass, webClass) as 1 | 2 | 3 | 4,
  };
}

export type SteelMemberDesign = {
  annex: SteelNationalAnnexCode;

  // Profile
  profile: string;
  profileProps: SteelProfileProps;

  // Material
  steelGrade: string;
  fy: number; // Yield strength (MPa)
  gammaM0: number;
  gammaM1: number;

  // Section classification (Cl. 5.2)
  eps: number; // ε = √(235/fy)
  flangeClass: number; // Flange class (1–4)
  webClass: number; // Web class (1–4)
  sectionClass: 1 | 2 | 3 | 4; // Governing class

  // Section
  A: number; // Area (mm²)
  Wpl_y: number; // Plastic section modulus, strong axis (mm³)
  Wpl_z: number; // Plastic section modulus, weak axis (mm³) — derived
  Wel_z: number; // Elastic section modulus, weak axis (mm³) — derived
  l: number; // Member length (m)

  // Internal forces
  NEd: number; // Axial force (kN), positive = compression
  MEd: number; // Max strong-axis bending moment (kNm), always positive
  MEd_z: number; // Max weak-axis bending moment (kNm), always positive
  VEd: number; // Max strong-axis shear force (kN), always positive
  VEd_z: number; // Max weak-axis shear force (kN), always positive

  // Resistances
  N_pl_Rd: number; // Plastic axial resistance (kN)
  M_c_Rd: number; // Strong-axis bending resistance (kNm)
  M_c_z_Rd: number; // Weak-axis bending resistance (kNm)
  A_v: number; // Strong-axis shear area (mm²)
  A_v_z: number; // Weak-axis shear area (mm²)
  V_pl_Rd: number; // Strong-axis plastic shear resistance (kN)
  V_pl_z_Rd: number; // Weak-axis plastic shear resistance (kN)
  M_V_Rd: number; // Reduced bending resistance under high shear (kNm); equals M_c_Rd when inactive
  M_N_y_Rd: number; // Reduced bending resistance under axial force (kNm); equals M_c_Rd when inactive

  // Utilization ratios
  util_tension: number; // Cl. 6.2.3
  util_compression: number; // Cl. 6.2.4
  util_bending: number; // Cl. 6.2.5
  util_shear: number; // Cl. 6.2.6 strong axis
  util_shear_z: number; // Cl. 6.2.6 weak axis (0 when VEd_z = 0)
  util_MV: number; // Cl. 6.2.8 (0 when VEd ≤ 0.5 × V_pl_Rd or MEd = 0)
  util_MN: number; // Cl. 6.2.9 (0 when NEd = 0 or MEd = 0)
  util_bending_biaxial: number; // Eq. 6.41 (0 when MEd_z = 0)

  utilization: number; // Governing (max of all)
  governingCheck: string; // Name of governing check

  bucklingCheck?: {
    L_cr: number; // Critical buckling length (mm)
    lambda_y: number; // Non-dimensional slenderness, y-axis
    lambda_z: number; // Non-dimensional slenderness, z-axis
    curve_y: string; // Buckling curve, y-axis ("a", "b", "c", or "d")
    curve_z: string; // Buckling curve, z-axis
    chi_y: number; // Reduction factor, y-axis
    chi_z: number; // Reduction factor, z-axis
    N_b_Rd: number; // Governing buckling resistance (kN)
    governingAxis: "y" | "z"; // Governing axis
    utilization: number; // N_Ed / N_b_Rd
  };
};

export function getDesign({
  params,
  lineElementForces,
  length,
  activeAnalysis,
}: {
  params: SteelMemberParams;
  lineElementForces: LineElementForces;
  length: number;
  activeAnalysis: "linear" | "nonlinear";
}): SteelMemberDesign {
  const profileProps = STEEL_PROFILES[params.profile];
  if (!profileProps) throw new Error(`Unknown profile: ${params.profile}`);

  const grade = STEEL_GRADES[params.steelGrade];
  if (!grade) throw new Error(`Unknown steel grade: ${params.steelGrade}`);

  const { A, Wpl_y, Wel_y, Iy, Iz, h, b, tw, tf, r } = profileProps;
  const { fy } = grade;
  const annex = DEFAULT_STEEL_NATIONAL_ANNEX;
  const { gammaM0, gammaM1 } = STEEL_NATIONAL_ANNEX_PARAMS[annex];

  // ── Internal forces ────────────────────────────────────────────────
  const NEd = getSignedMaxAxialForce(lineElementForces); // kN
  const MEd = getMaxMoment(lineElementForces); // kNm, always positive
  const MEd_z = getMaxWeakAxisMoment(lineElementForces); // kNm, always positive
  const VEd = getMaxShear(lineElementForces); // kN, always positive
  const VEd_z = getMaxWeakAxisShear(lineElementForces); // kN, always positive

  // ── Resistances ────────────────────────────────────────────────────
  // N in N = A(mm²) × fy(N/mm²), convert to kN: ÷ 1000
  const N_pl_Rd = (A * fy) / (gammaM0 * 1000);

  // ── Cross-section classification (Cl. 5.2) ─────────────────────────
  const { eps, flangeClass, webClass, sectionClass } =
    getClassification({ b, tw, tf, r, h, fy, NEd, N_pl_Rd });

  if (sectionClass === 4)
    throw new Error(
      `Section ${params.profile} classifies as Class 4 under these loads — not supported.`
    );

  // Class 1/2 → plastic modulus; Class 3 → elastic modulus
  const W_y = sectionClass <= 2 ? Wpl_y : Wel_y;
  // M in Nmm = W_y(mm³) × fy(N/mm²), convert to kNm: ÷ 1e6
  const M_c_Rd = (W_y * fy) / (gammaM0 * 1e6);

  // Weak-axis section moduli derived from stored dimensions
  // Wel_z = 2·Iz/b (exact); Wpl_z = tf·b²/2 + (h−2tf)·tw²/4 (~1% conservative, omits root fillets)
  const Wel_z = (2 * Iz) / b;
  const Wpl_z = (tf * b * b) / 2 + ((h - 2 * tf) * tw * tw) / 4;
  const W_z = sectionClass <= 2 ? Wpl_z : Wel_z;
  const M_c_z_Rd = (W_z * fy) / (gammaM0 * 1e6);
  // Shear area — EN 1993-1-1 §6.2.6(3), for rolled I- and H-sections
  const h_w = h - 2 * tf; // clear web height (mm)
  const A_v = Math.max(A - 2 * b * tf + (tw + 2 * r) * tf, h_w * tw); // η = 1.0
  // V in N = A_v(mm²) × (fy/√3)(MPa), convert to kN: ÷ 1000
  const V_pl_Rd = (A_v * (fy / Math.sqrt(3))) / (gammaM0 * 1000);
  // Weak-axis shear area — flanges resist lateral (z-axis) shear in I/H-sections
  const A_v_z = 2 * b * tf;
  const V_pl_z_Rd = (A_v_z * (fy / Math.sqrt(3))) / (gammaM0 * 1000);

  // ── Utilization ratios ─────────────────────────────────────────────
  const util_tension = NEd < 0 ? Math.abs(NEd) / N_pl_Rd : 0; // Cl. 6.2.3
  const util_compression = NEd > 0 ? NEd / N_pl_Rd : 0; // Cl. 6.2.4
  const util_bending = M_c_Rd > 0 ? MEd / M_c_Rd : 0; // Cl. 6.2.5
  const util_shear = V_pl_Rd > 0 ? VEd / V_pl_Rd : 0; // Cl. 6.2.6
  const util_shear_z = V_pl_z_Rd > 0 ? VEd_z / V_pl_z_Rd : 0; // Cl. 6.2.6 weak axis

  // M+V interaction (Cl. 6.2.8) — only when shear is high
  const A_w = h_w * tw; // web area (mm²)
  let M_V_Rd = M_c_Rd;
  let util_MV = 0;
  if (VEd > 0.5 * V_pl_Rd) {
    const rho = Math.pow((2 * VEd) / V_pl_Rd - 1, 2);
    M_V_Rd = Math.max(
      0,
      ((W_y - (rho * A_w ** 2) / (4 * tw)) * fy) / (gammaM0 * 1e6),
    );
    util_MV = M_V_Rd > 0 ? MEd / M_V_Rd : 0;
  }

  // M+N interaction (Cl. 6.2.9) — only when axial force is present
  const n = Math.abs(NEd) / N_pl_Rd;
  const a = Math.min((A - 2 * b * tf) / A, 0.5);
  const M_N_y_Rd = Math.min(M_c_Rd * (1 - n) / (1 - 0.5 * a), M_c_Rd);
  const util_MN = NEd !== 0 && MEd > 0 ? MEd / M_N_y_Rd : 0;

  // Biaxial bending (Eq. 6.41) — linear safe-side form; only active when weak-axis moment present
  const util_bending_biaxial = MEd_z > 0
    ? MEd / M_c_Rd + MEd_z / M_c_z_Rd
    : 0;

  // ── Column Buckling (EN 1993-1-1 §6.3.1) ──────────────────────────
  let bucklingCheck: SteelMemberDesign["bucklingCheck"] | undefined;
  let util_buckling = 0;

  if (params.lengthFactor && NEd > 0 && activeAnalysis !== "nonlinear") {
    const L_cr = params.lengthFactor * length * 1000; // m → mm

    // Radii of gyration
    const i_y = Math.sqrt(Iy / A);
    const i_z = Math.sqrt(Iz / A);

    // Non-dimensional slenderness (§6.3.1.3, Eq. 6.50)
    const lambda_y = (L_cr / i_y / Math.PI) * Math.sqrt(fy / E_STEEL);
    const lambda_z = (L_cr / i_z / Math.PI) * Math.sqrt(fy / E_STEEL);

    // Buckling curve selection — Table 6.2, rolled I- and H-sections
    const hb = h / b;
    let curve_y: string;
    let curve_z: string;
    if (tf <= 40) {
      if (hb > 1.2) { curve_y = "a"; curve_z = "b"; }
      else           { curve_y = "b"; curve_z = "c"; }
    } else {
      // 40 < tf ≤ 100
      if (hb > 1.2) { curve_y = "b"; curve_z = "c"; }
      else           { curve_y = "c"; curve_z = "d"; }
    }

    // Imperfection factors — Table 6.1
    const alpha: Record<string, number> = { a: 0.21, b: 0.34, c: 0.49, d: 0.76 };

    // Reduction factor χ per axis (Eq. 6.49)
    const calcChi = (lambda: number, curve: string): number => {
      if (lambda <= 0.2) return 1.0;
      const al = alpha[curve];
      const phi = 0.5 * (1 + al * (lambda - 0.2) + lambda * lambda);
      return Math.min(1.0, 1 / (phi + Math.sqrt(phi * phi - lambda * lambda)));
    };

    const chi_y = calcChi(lambda_y, curve_y);
    const chi_z = calcChi(lambda_z, curve_z);

    // Buckling resistances (kN)
    const N_b_Rd_y = (chi_y * A * fy) / (gammaM1 * 1000);
    const N_b_Rd_z = (chi_z * A * fy) / (gammaM1 * 1000);

    const governingAxis = N_b_Rd_y <= N_b_Rd_z ? "y" : "z";
    const N_b_Rd = Math.min(N_b_Rd_y, N_b_Rd_z);
    util_buckling = N_b_Rd > 0 ? NEd / N_b_Rd : 0;

    bucklingCheck = {
      L_cr,
      lambda_y,
      lambda_z,
      curve_y,
      curve_z,
      chi_y,
      chi_z,
      N_b_Rd,
      governingAxis,
      utilization: util_buckling,
    };
  }

  // ── Governing check ────────────────────────────────────────────────
  const checks = [
    { name: "Tension (Cl. 6.2.3)", value: util_tension },
    { name: "Compression (Cl. 6.2.4)", value: util_compression },
    { name: "Bending (Cl. 6.2.5)", value: util_bending },
    { name: "Shear y (Cl. 6.2.6)", value: util_shear },
    { name: "Shear z (Cl. 6.2.6)", value: util_shear_z },
    { name: "M+V Interaction (Cl. 6.2.8)", value: util_MV },
    { name: "M+N Interaction (Cl. 6.2.9)", value: util_MN },
    { name: "Biaxial Bending (Eq. 6.41)", value: util_bending_biaxial },
    { name: "Buckling (Cl. 6.3.1)", value: util_buckling },
  ];

  const governing = checks.reduce((max, c) => (c.value > max.value ? c : max));

  return {
    annex,
    profile: params.profile,
    profileProps,
    steelGrade: params.steelGrade,
    fy,
    gammaM0,
    gammaM1,
    eps,
    flangeClass,
    webClass,
    sectionClass,
    A,
    Wpl_y,
    Wpl_z,
    Wel_z,
    l: length,
    NEd,
    MEd,
    MEd_z,
    VEd,
    VEd_z,
    N_pl_Rd,
    M_c_Rd,
    M_c_z_Rd,
    A_v,
    A_v_z,
    V_pl_Rd,
    V_pl_z_Rd,
    M_V_Rd,
    M_N_y_Rd,
    util_tension,
    util_compression,
    util_bending,
    util_shear,
    util_shear_z,
    util_MV,
    util_MN,
    util_bending_biaxial,
    utilization: governing.value,
    governingCheck: governing.name,
    bucklingCheck,
  };
}
