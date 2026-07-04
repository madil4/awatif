import {
  getLineEndForces,
  getMaxAxialForce,
  getMaxMoment,
  getMidHeightMoment,
} from "../helpers";
import type { ActiveAnalysis, LineElementForces } from "../data-model";
import type { ImperfectionsParams } from "../../imperfections/imperfections";
import { ConcreteMemberParams } from "./concreteMember";
import {
  CONCRETE_NATIONAL_ANNEX_PARAMS,
  DEFAULT_CONCRETE_NATIONAL_ANNEX,
} from "./nationalAnnexes";
import type {
  ConcreteNationalAnnexCode,
  ConcreteNationalAnnexParams,
} from "./nationalAnnexes";
import { getMomentMagnification } from "./helpers/getMomentMagnification";
import {
  getSectionCapacity,
  getInteractionCurve,
} from "./helpers/getSectionCapacity";
import {
  EC2_CONSTANTS,
  parseMaterialProps,
  getStiffness,
} from "./helpers/shared";
import { getShearCapacity } from "./helpers/getShearCapacity";

export type ConcreteMemberDesign = {
  annex: ConcreteNationalAnnexCode;
  activeAnalysis?: ActiveAnalysis;
  // Geometry
  l: number; // Clear height (m)
  // Material
  fck: number; // Characteristic compressive strength of concrete (MPa)
  fcd: number; // Design compressive strength of concrete (MPa)
  fyk: number; // Characteristic yield strength of steel (MPa)
  fyd: number; // Design yield strength of steel (MPa)
  Ecm: number; // Mean secant modulus of concrete (MPa)
  AsMin: number; // min(0.10·NEd/fyd, 0.002·Ac) in mm²
  AsMax: number; // 0.04·Ac in mm²
  // Imperfections
  imperfections?: {
    globalInclination: boolean;
    theta0: number;
    localBow: boolean;
    bowRatioDenominator: number;
    direction: string;
  };
  // Unbraced Warning
  braced: boolean;
  // Stiffness
  EI: number; // Nominal stiffness (kNm²)
  EIelastic?: number; // Elastic stiffness Ecm×Ic (kNm²) — linear 1st-order analysis only
  Kc: number; // Concrete stiffness factor: 0.3/(1+0.5φef)
  rho: number; // Reinforcement ratio As/Ac
  // Internal Forces — z-axis (strong)
  startN: number; // Start axial force (kN)
  endN: number; // End axial force (kN)
  startMz: number; // Start moment z (kNm)
  endMz: number; // End moment z (kNm)
  maxAnalysisMoment: number; // Max absolute Mz from analysis (kNm)
  // Internal Forces — y-axis (weak)
  startMy: number; // Start moment y (kNm)
  endMy: number; // End moment y (kNm)
  maxAnalysisMomentY: number; // Max absolute My from analysis (kNm)
  // Slenderness Check — z-axis (linear only)
  l0?: number; // Effective length (m)
  i?: number; // Radius of gyration (mm)
  lambda?: number; // Slenderness ratio
  lambdaLim?: number; // Slenderness limit
  isSlender?: boolean;
  rm?: number; // Moment ratio M01/M02
  // Design Moments — z-axis
  M01?: number; // Lower end moment (kNm)
  M02?: number; // Higher end moment (kNm)
  M0e?: number; // Equivalent first-order moment (kNm)
  M0Ed?: number; // Effective first-order moment (kNm)
  NB?: number; // Buckling load (kN)
  MEd: number; // Design moment z (kNm)
  governingCase: string;
  eMin: number; // Minimum eccentricity (mm)
  MEdMin: number; // Minimum design moment NEd×eMin (kNm)
  // Slenderness Check — y-axis (linear only)
  l0_y?: number;
  i_y?: number;
  lambda_y?: number;
  lambdaLim_y?: number;
  isSlender_y?: boolean;
  rm_y?: number;
  // Design Moments — y-axis
  M01_y?: number;
  M02_y?: number;
  M0e_y?: number;
  NB_y?: number;
  MEdy: number; // Design moment y (kNm)
  governingCaseY: string;
  eMinY: number; // Minimum eccentricity y (mm)
  MEdMinY: number; // Minimum design moment y (kNm)
  d_y: number; // Effective depth for y-axis bending (mm)
  // Section Capacity — z-axis
  xNeutral: number; // Neutral axis depth (mm)
  d: number; // Effective depth (mm)
  epsilonS: number; // Tension steel strain at capacity
  epsilonSPrime: number; // Compression steel strain at capacity
  NEd: number; // Axial force (kN)
  NRd: number; // Axial capacity (kN)
  MRd: number; // Moment capacity z (kNm)
  interactionCurve: { N: number; M: number }[];
  // Section Capacity — y-axis
  MRdy: number; // Moment capacity y (kNm)
  // Biaxial check (EC2 §5.8.9)
  NRd0: number; // Pure axial capacity (kN)
  biaxialExponent: number; // Exponent a
  biaxialRatio: number; // (MEd/MRd)^a + (MEdy/MRdy)^a
  biaxialUtilization: number; // biaxialRatio (floored to sectionUtilization when MEdy≈0)
  // Utilization
  utilization: number;
  sectionUtilization: number;
  // Shear Check — Vy (z-axis bending)
  VEd: number; // Design shear force Vy (kN)
  VRd_c?: number;
  VRd_s?: number;
  VRd_max?: number;
  Asw_s_req?: number;
  Asw_s_prov?: number;
  Asw_s_min?: number;
  sl_max?: number;
  theta?: number;
  needsShearReinf?: boolean;
  shearUtilization: number;
  // Shear Check — Vz (y-axis bending)
  VEd_z: number; // Design shear force Vz (kN)
  VRd_c_y?: number;
  VRd_s_y?: number;
  VRd_max_y?: number;
  Asw_s_req_y?: number;
  theta_y?: number;
  needsShearReinf_y?: boolean;
  shearUtilizationY: number;
  governingCheck: string;
};

export function getDesign({
  params,
  lineElementForces,
  length,
  activeAnalysis,
  imperfections,
}: {
  params: ConcreteMemberParams;
  lineElementForces: LineElementForces;
  length: number;
  activeAnalysis: ActiveAnalysis;
  imperfections?: ImperfectionsParams;
}): ConcreteMemberDesign {
  const annex = DEFAULT_CONCRETE_NATIONAL_ANNEX;
  const annexParams = CONCRETE_NATIONAL_ANNEX_PARAMS[annex];

  // Geometry
  const b = params.width;
  const h = params.depth;
  const Ac = b * h;
  const As = params.steelArea;
  const d = h - params.cover - EC2_CONSTANTS.BAR_RADIUS_MM; // Effective depth (z-axis)
  const d_y = b - params.cover - EC2_CONSTANTS.BAR_RADIUS_MM; // Effective depth (y-axis)

  // Material
  const { fck, fyk, Ecm, fcd, fyd } = parseMaterialProps(
    params,
    annexParams,
  );

  const NEd = getMaxAxialForce(lineElementForces);
  const AsMin = Math.max((0.1 * NEd * 1000) / fyd, 0.002 * Ac);
  const AsMax = 0.04 * Ac;

  // Stiffness — z-axis (b·h³/12) and y-axis (h·b³/12)
  const rho = As / Ac;
  const { Kc, EI, EIelastic } = getStiffness(params, annexParams);
  const EI_y = getStiffnessY(params, annexParams); // kNm², y-axis: Kc·Ecd·(h·b³/12)

  // Internal Forces — z-axis
  const maxAnalysisMoment = getMaxMoment(lineElementForces);
  const midHeightMoment = getMidHeightMoment(lineElementForces);
  const { startN, endN, startMz, endMz } = getLineEndForces(lineElementForces);

  // Internal Forces — y-axis (private helpers, mirrors timber pattern)
  const { startMy, endMy } = getLineEndMomentsY(lineElementForces);
  const maxAnalysisMomentY = getMaxMomentY(lineElementForces);
  const midHeightMomentY = getMidHeightMomentY(lineElementForces);

  // Shear forces
  const VEd = getMaxShear(lineElementForces); // Vy
  const VEd_z = getMaxShearZ(lineElementForces); // Vz

  // Slenderness and Design Moment — z-axis
  let MEd: number;
  let governingCase: string;
  let slenderness: Record<string, any> = {};

  if (activeAnalysis === "linear") {
    const {
      MEd: m,
      governingCase: g,
      ...rest
    } = getMomentMagnification({
      As,
      Ac,
      h,
      length,
      lengthFactor: params.lengthFactor ?? 1,
      fcd,
      fyd,
      NEd,
      startMz,
      endMz,
      midHeightMoment,
      braced: params.braced,
      creepCoefficient: params.creepCoefficient,
      EI,
    });

    MEd = m;
    governingCase = g;
    slenderness = rest;
  } else {
    MEd = maxAnalysisMoment;
    governingCase = "Max Internal Moment";
  }

  // Slenderness and Design Moment — y-axis
  let MEdy: number;
  let governingCaseY: string;
  let slendernessY: Record<string, any> = {};

  if (activeAnalysis === "linear") {
    const {
      MEd: my,
      governingCase: gy,
      l0: l0_y,
      i: i_y,
      lambda: lambda_y,
      lambdaLim: lambdaLim_y,
      isSlender: isSlender_y,
      rm: rm_y,
      M01: M01_y,
      M02: M02_y,
      M0e: M0e_y,
      NB: NB_y,
    } = getMomentMagnification({
      As,
      Ac,
      h: b, // section depth in the bending direction for y-axis is the width b
      length,
      lengthFactor: params.lengthFactor ?? 1,
      fcd,
      fyd,
      NEd,
      startMz: startMy,
      endMz: endMy,
      midHeightMoment: midHeightMomentY,
      braced: params.braced,
      creepCoefficient: params.creepCoefficient,
      EI: EI_y, // y-axis stiffness: Kc·Ecd·(h·b³/12)
    });

    MEdy = my;
    governingCaseY = gy;
    slendernessY = { l0_y, i_y, lambda_y, lambdaLim_y, isSlender_y, rm_y, M01_y, M02_y, M0e_y, NB_y };
  } else {
    MEdy = maxAnalysisMomentY;
    governingCaseY = "Max Internal Moment";
  }

  // Min eccentricity — z-axis
  const eMin = Math.max(h / 30, 20); // mm
  const MEdMin = (NEd * eMin) / 1000; // kNm

  // Min eccentricity — y-axis
  const eMinY = Math.max(b / 30, 20); // mm
  const MEdMinY = (NEd * eMinY) / 1000; // kNm

  // Section Capacity — z-axis
  const { xNeutral, NRd, MRd, epsilonS, epsilonSPrime, utilization: sectionUtilization } =
    getSectionCapacity({ NEd, MEd, b, h, d, As, fcd, fyd });

  const interactionCurve = getInteractionCurve({ NEd, MEd, b, h, d, As, fcd, fyd });

  // Section Capacity — y-axis (swap b↔h, use d_y)
  const { MRd: MRdy } = getSectionCapacity({
    NEd,
    MEd: MEdy,
    b: h, // section width for y-axis bending is h
    h: b, // section depth for y-axis bending is b
    d: d_y,
    As,
    fcd,
    fyd,
  });

  // Biaxial interaction (EC2 §5.8.9, Eq. 5.39)
  const NRd0 = (Ac * fcd + As * fyd) / 1000; // kN, pure axial capacity
  const n = NEd / NRd0;
  const biaxialExponent = getBiaxialExponent(n);

  let biaxialRatio: number;
  let biaxialUtilization: number;

  if (maxAnalysisMomentY < 0.01 || MRdy < 0.001) {
    // No y-axis moment in analysis — biaxial check degenerates to uniaxial; floor to sectionUtilization
    biaxialRatio = sectionUtilization;
    biaxialUtilization = sectionUtilization;
  } else {
    biaxialRatio =
      Math.pow(Math.abs(MEd) / MRd, biaxialExponent) +
      Math.pow(Math.abs(MEdy) / MRdy, biaxialExponent);
    biaxialUtilization = biaxialRatio;
  }

  // Shear Check — Vy (z-axis bending plane)
  const shearResult = getShearCapacity({
    VEd,
    NEd,
    b,
    d,
    Asl: As / 2,
    fck,
    fcd,
    fyd,
    fyk,
    stirrupArea: params.stirrupArea,
    annexParams,
  });

  // Shear Check — Vz (y-axis bending plane), swap b/d
  // Note: getShearCapacity approximates Ac as b*(d/0.9); with {b:h, d:d_y},
  // Ac_approx ≈ h*(d_y/0.9) ≈ h*b = Ac, so the approximation holds.
  const shearResultY = getShearCapacity({
    VEd: VEd_z,
    NEd,
    b: h,
    d: d_y,
    Asl: As / 2,
    fck,
    fcd,
    fyd,
    fyk,
    stirrupArea: params.stirrupArea,
    annexParams,
  });

  const totalUtilization = Math.max(
    sectionUtilization,
    biaxialUtilization,
    shearResult.utilization,
    shearResultY.utilization,
  );

  const governingCheck = (() => {
    const checks = [
      { name: "Section Capacity", value: sectionUtilization },
      { name: "Biaxial Check", value: biaxialUtilization },
      { name: "Shear (Vy)", value: shearResult.utilization },
      { name: "Shear (Vz)", value: shearResultY.utilization },
    ];
    return checks.reduce((max, c) => (c.value > max.value ? c : max)).name;
  })();

  return {
    annex,
    l: length,
    fck,
    fcd,
    fyk,
    fyd,
    Ecm,
    imperfections,
    EI,
    EIelastic: activeAnalysis === "linear" ? EIelastic : undefined,
    Kc,
    rho,
    startN,
    endN,
    startMz,
    endMz,
    maxAnalysisMoment,
    startMy,
    endMy,
    maxAnalysisMomentY,
    ...slenderness,
    ...slendernessY,
    MEd,
    governingCase,
    MEdy,
    governingCaseY,
    AsMin,
    AsMax,
    xNeutral,
    d,
    d_y,
    NEd,
    NRd,
    MRd,
    MRdy,
    epsilonS,
    epsilonSPrime,
    NRd0,
    biaxialExponent,
    biaxialRatio,
    biaxialUtilization,
    utilization: totalUtilization,
    interactionCurve,
    activeAnalysis,
    braced: params.braced,
    eMin,
    MEdMin,
    eMinY,
    MEdMinY,
    // Shear Vy
    VEd,
    VRd_c: shearResult.VRd_c,
    VRd_s: shearResult.VRd_s,
    VRd_max: shearResult.VRd_max,
    Asw_s_req: shearResult.Asw_s_req,
    Asw_s_prov: shearResult.Asw_s_prov,
    Asw_s_min: shearResult.Asw_s_min,
    sl_max: shearResult.sl_max,
    theta: shearResult.theta,
    needsShearReinf: shearResult.needsShearReinf,
    shearUtilization: shearResult.utilization,
    // Shear Vz
    VEd_z,
    VRd_c_y: shearResultY.VRd_c,
    VRd_s_y: shearResultY.VRd_s,
    VRd_max_y: shearResultY.VRd_max,
    Asw_s_req_y: shearResultY.Asw_s_req,
    theta_y: shearResultY.theta,
    needsShearReinf_y: shearResultY.needsShearReinf,
    shearUtilizationY: shearResultY.utilization,
    sectionUtilization,
    governingCheck,
  };
}

// ── Private stiffness helper — y-axis ────────────────────────────────────────

function getStiffnessY(
  params: ConcreteMemberParams,
  annexParams: ConcreteNationalAnnexParams,
): number {
  // y-axis moment of inertia: h·b³/12 (depth × width³)
  const { Ecm } = parseMaterialProps(params, annexParams);
  const Ic_y = (params.depth * params.width ** 3) / 12; // mm⁴
  const Ecd = Ecm / annexParams.gammaCE;
  const Kc = 0.3 / (1 + 0.5 * params.creepCoefficient);
  return (Kc * Ecd * Ic_y) / 1e9; // kNm²
}

// ── Private force extractors (mirrors timber-member pattern) ──────────────────

function getLineEndMomentsY(lineElementForces: LineElementForces) {
  const elementForces = lineElementForces.elementForces;
  const firstForces = elementForces[0];
  const lastForces = elementForces[elementForces.length - 1];
  return {
    startMy: firstForces?.My[0] ?? 0,
    endMy: lastForces?.My[1] ?? 0,
  };
}

function getMaxMomentY(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxMy = 0;
  for (const forces of elementForces) {
    maxMy = Math.max(maxMy, Math.abs(forces.My[0]), Math.abs(forces.My[1]));
  }
  return maxMy;
}

function getMidHeightMomentY(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  if (elementForces.length === 0) return 0;
  const midIndex = Math.floor(elementForces.length / 2);
  const midForces = elementForces[midIndex];
  return Math.max(Math.abs(midForces.My[0]), Math.abs(midForces.My[1]));
}

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

function getMaxShearZ(lineElementForces: LineElementForces): number {
  const elementForces = lineElementForces.elementForces;
  let maxAbs = 0;
  for (const forces of elementForces) {
    maxAbs = Math.max(maxAbs, Math.abs(forces.Vz[0]), Math.abs(forces.Vz[1]));
  }
  return maxAbs;
}

// ── Biaxial exponent (EC2 §5.8.9, Table, linear interpolation) ───────────────

function getBiaxialExponent(n: number): number {
  // Breakpoints: {n=0.1 → a=1.0}, {n=0.7 → a=1.5}, {n=1.0 → a=2.0}
  if (n <= 0.1) return 1.0;
  if (n <= 0.7) return 1.0 + (0.5 * (n - 0.1)) / 0.6;
  if (n <= 1.0) return 1.5 + (0.5 * (n - 0.7)) / 0.3;
  return 2.0;
}
