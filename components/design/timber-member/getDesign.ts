import type { LineElementForces } from "../data-model";
import { getMaxMoment } from "../helpers";
import type { TimberMemberParams } from "./timberMember";
import { TIMBER_CLASSES } from "./timberClasses";
import type { TimberClassProps } from "./timberClasses";
import { getBetaC, getGammaM, getKm, getKMod } from "./eurocodeFactors";
import {
  DEFAULT_TIMBER_NATIONAL_ANNEX,
  K_CR_BY_NATIONAL_ANNEX,
} from "./nationalAnnexes";
import type { TimberNationalAnnexCode } from "./nationalAnnexes";

export type TimberMemberDesign = {
  annex: TimberNationalAnnexCode;

  // Material
  timberClass: string;
  classProps: TimberClassProps;
  kMod: number;
  gammaM: number;
  kH_m: number; // size-effect factor for bending
  kH_t: number; // size-effect factor for tension

  // Design strengths (MPa)
  fm_d: number; // Bending design strength
  ft_0_d: number; // Tension parallel design strength
  fc_0_d: number; // Compression parallel design strength
  fv_d: number; // Shear design strength

  // Section
  b: number; // Width (mm)
  h: number; // Depth (mm)
  A: number; // Area (mm²)
  Wy: number; // Section modulus about strong y-axis (mm³) — b×h²/6
  Wz: number; // Section modulus about weak z-axis (mm³) — h×b²/6
  l: number; // Member length (m)

  // Stresses (MPa)
  sigma_m_y_d: number; // Strong-axis bending stress (from solver Mz)
  sigma_m_z_d: number; // Weak-axis bending stress (from solver My)
  sigma_t_0_d: number; // Tension stress (0 if compression)
  sigma_c_0_d: number; // Compression stress (0 if tension)
  tau_d: number; // Shear stress

  // Internal forces
  NEd: number; // Axial force (kN) — positive = compression (FEM convention)
  MEd: number; // Max strong-axis bending moment (kNm) — solver Mz
  MEd_weak: number; // Max weak-axis bending moment (kNm) — solver My
  VEd: number; // Max in-plane shear force (kN) — solver Vy
  VEd_z: number; // Max out-of-plane shear force (kN) — solver Vz

  // Utilization ratios
  util_bending: number; // Eq. 6.11
  util_tension: number; // Eq. 6.1
  util_compression: number; // Eq. 6.2
  util_shear: number; // Eq. 6.13
  util_combined: number; // Eq. 6.17, 6.19, or 6.23/6.24

  combinedEq: string; // Which combined equation governs

  utilization: number; // Governing (max of all)
  governingCheck: string; // Name of governing check

  bucklingCheck?: {
    L_ef: number; // Effective buckling length (mm)
    lambda_rel_y: number; // Relative slenderness, y-axis (Eq. 6.21)
    lambda_rel_z: number; // Relative slenderness, z-axis (Eq. 6.22)
    k_c_y: number; // Instability factor, y-axis
    k_c_z: number; // Instability factor, z-axis
    util_y: number; // Eq. 6.23 utilization
    util_z: number; // Eq. 6.24 utilization
    utilization: number; // max(util_y, util_z)
  };
};

export function getDesign({
  params,
  lineElementForces,
  length,
  activeAnalysis,
}: {
  params: TimberMemberParams;
  lineElementForces: LineElementForces;
  length: number;
  activeAnalysis: "linear" | "nonlinear";
}): TimberMemberDesign {
  const cls = TIMBER_CLASSES[params.timberClass];
  if (!cls) throw new Error(`Unknown timber class: ${params.timberClass}`);
  const annex = DEFAULT_TIMBER_NATIONAL_ANNEX;

  // ── Material factors ───────────────────────────────────────────────
  const kMod = getKMod(
    cls.type,
    params.serviceClass,
    params.loadDurationClass,
  );
  const gammaM = getGammaM(cls.type);

  // ── Size-effect factors ────────────────────────────────────────────
  const kH_m = getKh(cls.type, params.depth, cls.rho_k); // bending: use h
  const kH_t = getKh(cls.type, Math.max(params.width, params.depth), cls.rho_k); // tension: max dim

  // ── Design strengths (f_d = k_mod × k_h × f_k / γ_M) ─────────────
  const fm_d = (kMod * kH_m * cls.fm_k) / gammaM;
  const ft_0_d = (kMod * kH_t * cls.ft_0_k) / gammaM;
  const fc_0_d = (kMod * cls.fc_0_k) / gammaM; // no k_h for compression
  const fv_d = (kMod * cls.fv_k) / gammaM;

  // ── Section properties ─────────────────────────────────────────────
  const b = params.width;
  const h = params.depth;
  const A = b * h;
  const Wy = (b * h * h) / 6; // strong-axis: b×h²/6
  const Wz = (h * b * b) / 6; // weak-axis:   h×b²/6

  // ── Internal forces ────────────────────────────────────────────────
  // FEM convention: positive N = compression, negative N = tension
  // Solver Mz = strong-axis (in-plane) bending → Eurocode σ_m,y,d
  // Solver My = weak-axis (out-of-plane) bending → Eurocode σ_m,z,d
  const NEd = getSignedMaxAxialForce(lineElementForces); // kN
  const MEd = getMaxMoment(lineElementForces); // kNm, always positive (solver Mz)
  const MEd_weak = getMaxWeakAxisMoment(lineElementForces); // kNm (solver My)
  const VEd = getSignedMaxShearForce(lineElementForces); // kN (solver Vy, in-plane)
  const VEd_z = getMaxOutOfPlaneShear(lineElementForces); // kN (solver Vz, out-of-plane)

  // ── Stresses (MPa) ────────────────────────────────────────────────
  //  N in kN → ×1e3 to get N, A in mm² → σ in N/mm² = MPa
  //  M in kNm → ×1e6 to get Nmm, W in mm³ → σ in MPa
  //  V in kN → ×1e3 to get N, A in mm² → τ in MPa
  const sigma_m_y_d = (MEd * 1e6) / Wy;
  const sigma_m_z_d = Wz > 0 ? (MEd_weak * 1e6) / Wz : 0;
  const sigma_c_0_d = NEd > 0 ? (NEd * 1e3) / A : 0; // compression (positive N)
  const sigma_t_0_d = NEd < 0 ? (Math.abs(NEd) * 1e3) / A : 0; // tension (negative N)

  const kCr = K_CR_BY_NATIONAL_ANNEX[annex];
  const A_eff = kCr * A;
  const V_resultant = Math.sqrt(VEd * VEd + VEd_z * VEd_z); // resultant shear (kN)
  const tau_d = (1.5 * V_resultant * 1e3) / A_eff;

  // ── Utilization checks ─────────────────────────────────────────────
  const km = getKm("rectangular");
  const ratio_y = fm_d > 0 ? sigma_m_y_d / fm_d : 0;
  const ratio_z = fm_d > 0 ? sigma_m_z_d / fm_d : 0;

  // Biaxial bending check — Eq. 6.11 and 6.12
  const util_bending = Math.max(
    ratio_y + km * ratio_z, // Eq. 6.11
    km * ratio_y + ratio_z, // Eq. 6.12
  );

  const util_tension = ft_0_d > 0 ? sigma_t_0_d / ft_0_d : 0; // Eq. 6.1
  const util_compression = fc_0_d > 0 ? sigma_c_0_d / fc_0_d : 0; // Eq. 6.2
  const util_shear = fv_d > 0 ? tau_d / fv_d : 0; // Eq. 6.13

  // Combined checks with biaxial moments
  let util_combined: number;
  let combinedEq: string;

  if (NEd > 0) {
    // Bending + compression — Eq. 6.19 and 6.20
    const comp_sq = fc_0_d > 0 ? Math.pow(sigma_c_0_d / fc_0_d, 2) : 0;
    util_combined = Math.max(
      comp_sq + ratio_y + km * ratio_z, // Eq. 6.19
      comp_sq + km * ratio_y + ratio_z, // Eq. 6.20
    );
    combinedEq = "Eq. 6.19/6.20";
  } else if (NEd < 0) {
    // Bending + tension — Eq. 6.17 and 6.18
    const tens = ft_0_d > 0 ? sigma_t_0_d / ft_0_d : 0;
    util_combined = Math.max(
      tens + ratio_y + km * ratio_z, // Eq. 6.17
      tens + km * ratio_y + ratio_z, // Eq. 6.18
    );
    combinedEq = "Eq. 6.17/6.18";
  } else {
    util_combined = util_bending; // pure bending, same as Eq. 6.11/6.12
    combinedEq = "Eq. 6.11/6.12";
  }

  // ── Column Buckling (EN 1995-1-1 §6.3.2, Eq. 6.21–6.29) ───────────
  let bucklingCheck: TimberMemberDesign["bucklingCheck"] | undefined;

  if (
    params.lengthFactor &&
    sigma_c_0_d > 0 &&
    activeAnalysis !== "nonlinear"
  ) {
    const L_ef = params.lengthFactor * length * 1000; // m → mm
    const betaC = getBetaC(cls.type);

    // Radii of gyration — rectangular section
    const i_y = h / Math.sqrt(12);
    const i_z = b / Math.sqrt(12);

    // Slenderness ratios
    const lambda_y = L_ef / i_y;
    const lambda_z = L_ef / i_z;

    // Relative slenderness (Eq. 6.21–6.22)
    const lambda_rel_y =
      (lambda_y / Math.PI) * Math.sqrt(cls.fc_0_k / cls.E0_05);
    const lambda_rel_z =
      (lambda_z / Math.PI) * Math.sqrt(cls.fc_0_k / cls.E0_05);

    // If both axes are stocky (λ_rel ≤ 0.3), no buckling reduction needed
    if (lambda_rel_y <= 0.3 && lambda_rel_z <= 0.3) {
      // Keep existing Eq. 6.19 combined check unchanged — bucklingCheck stays undefined
    } else {
      // Instability factors (Eq. 6.27–6.28)
      const calcKc = (lambda_rel: number): number => {
        if (lambda_rel <= 0.3) return 1.0;
        const k =
          0.5 * (1 + betaC * (lambda_rel - 0.3) + lambda_rel * lambda_rel);
        return 1 / (k + Math.sqrt(k * k - lambda_rel * lambda_rel));
      };
      const k_c_y = calcKc(lambda_rel_y);
      const k_c_z = calcKc(lambda_rel_z);

      // Buckling + bending (Eq. 6.23/6.24) — replaces Eq. 6.19/6.20
      const util_y =
        (fc_0_d > 0 ? sigma_c_0_d / (k_c_y * fc_0_d) : 0) +
        ratio_y +
        km * ratio_z; // Eq. 6.23
      const util_z =
        (fc_0_d > 0 ? sigma_c_0_d / (k_c_z * fc_0_d) : 0) +
        km * ratio_y +
        ratio_z; // Eq. 6.24

      // Overwrite combined check
      util_combined = Math.max(util_y, util_z);
      combinedEq = "Eq. 6.23/6.24";

      bucklingCheck = {
        L_ef,
        lambda_rel_y,
        lambda_rel_z,
        k_c_y,
        k_c_z,
        util_y,
        util_z,
        utilization: util_combined,
      };
    }
  }

  // ── Governing check ────────────────────────────────────────────────
  const checks = [
    { name: "Bending (Eq. 6.11/6.12)", value: util_bending },
    { name: "Tension (Eq. 6.1)", value: util_tension },
    { name: "Compression (Eq. 6.2)", value: util_compression },
    { name: "Shear (Eq. 6.13)", value: util_shear },
    { name: `Combined (${combinedEq})`, value: util_combined },
  ];

  const governing = checks.reduce((max, c) => (c.value > max.value ? c : max));

  return {
    annex,
    timberClass: params.timberClass,
    classProps: cls,
    kMod,
    gammaM,
    kH_m,
    kH_t,
    fm_d,
    ft_0_d,
    fc_0_d,
    b,
    h,
    A,
    Wy,
    Wz,
    l: length,
    sigma_m_y_d,
    sigma_m_z_d,
    sigma_t_0_d,
    sigma_c_0_d,
    NEd,
    MEd,
    MEd_weak,
    util_bending,
    util_tension,
    util_compression,
    util_shear,
    util_combined,
    combinedEq,

    utilization: governing.value,
    governingCheck: governing.name,
    fv_d,
    tau_d,
    VEd,
    VEd_z,
    bucklingCheck,
  };
}

// Helpers
function getSignedMaxShearForce(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxAbs = 0;
  let signed = 0;
  for (const forces of elementForces) {
    for (const v of forces.Vy) {
      if (Math.abs(v) > maxAbs) {
        maxAbs = Math.abs(v);
        signed = v;
      }
    }
  }
  return signed;
}

function getMaxOutOfPlaneShear(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxVz = 0;
  for (const forces of elementForces) {
    maxVz = Math.max(maxVz, Math.abs(forces.Vz[0]), Math.abs(forces.Vz[1]));
  }
  return maxVz;
}

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

function getMaxWeakAxisMoment(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxMy = 0;
  for (const forces of elementForces) {
    maxMy = Math.max(maxMy, Math.abs(forces.My[0]), Math.abs(forces.My[1]));
  }
  return maxMy;
}

/**
 * Compute k_h — size-effect factor (EN 1995-1-1, §3.2 / §3.3).
 * For bending, h is the section depth. For tension, h is the largest
 * cross-section dimension.
 */
function getKh(type: "solid" | "glulam", dim: number, rho_k: number): number {
  if (type === "solid") {
    if (rho_k > 700) return 1.0;
    return dim < 150 ? Math.min(Math.pow(150 / dim, 0.2), 1.3) : 1.0;
  }
  // glulam
  return dim < 600 ? Math.min(Math.pow(600 / dim, 0.1), 1.1) : 1.0;
}
