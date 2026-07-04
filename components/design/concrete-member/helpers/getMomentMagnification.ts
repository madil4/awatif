export type MomentMagnificationInput = {
  braced: boolean; // true = braced (actual rm); false = unbraced (rm forced to 1)
  creepCoefficient: number;
  EI: number; // Nominal stiffness (kNm²) — pre-computed
  // Geometry
  As: number; // Total steel area (mm²)
  Ac: number; // Concrete area (mm²)
  h: number; // Section depth (mm)
  length: number; // Member clear height (m)
  lengthFactor: number; // Effective length factor (l0 = length × lengthFactor)
  // Material
  fcd: number; // Design concrete strength (MPa)
  fyd: number; // Design steel yield strength (MPa)
  // Forces
  NEd: number; // Design axial force (kN)
  startMz: number; // Start moment (kNm)
  endMz: number; // End moment (kNm)
  midHeightMoment: number; // Mid-height moment from analysis (kNm)
};

export type MomentMagnificationResult = {
  // Slenderness geometry
  l0: number;
  i: number;
  lambda: number;
  lambdaLim: number;
  isSlender: boolean;
  rm: number;
  // First-order moments
  M01: number;
  M02: number;
  M0e: number;
  // Magnification (only when slender)
  NB?: number;
  // Final design moment (includes min eccentricity check)
  MEd: number;
  governingCase: string;
};

export function getMomentMagnification({
  As,
  Ac,
  h,
  length,
  lengthFactor,
  fcd,
  fyd,
  NEd,
  startMz,
  endMz,
  midHeightMoment,
  braced,
  creepCoefficient,
  EI,
}: MomentMagnificationInput): MomentMagnificationResult {
  // Slenderness Check (§5.8.3.1)
  const A = Math.max(1 / (1 + 0.2 * creepCoefficient), 0.7);

  const omega = (As * fyd) / (Ac * fcd);
  const B = Math.max(Math.sqrt(1 + 2 * omega), 1.1);

  const absStart = Math.abs(startMz);
  const absEnd = Math.abs(endMz);
  const M02 = Math.max(absStart, absEnd); // always positive (larger)
  const M01Abs = Math.min(absStart, absEnd);
  const M01Raw = startMz * endMz < 0 ? -M01Abs : M01Abs; // Negative sign for double curvature (end moments have opposite signs)
  const EPS = 1e-6;
  const M01 = Math.abs(M01Raw) < EPS ? 0 : M01Raw; // to avoid showing -0
  const rm = braced ? (Math.abs(M01) < EPS || M02 < EPS ? 1 : M01 / M02) : 1; // M02 due to local bow and M01 due to a braced cantilever
  const C = 1.7 - rm;

  // λlim = 20 × A × B × C / √n
  const n = (NEd * 1000) / (Ac * fcd);
  const lambdaLim = (20 * A * B * C) / Math.sqrt(n);
  const l0 = length * lengthFactor;
  const i = h / Math.sqrt(12);
  const lambda = (l0 * 1000) / i;
  const isSlender = lambda > lambdaLim;

  // Moment Magnification (§5.8.7.3)
  const M0e = Math.max(
    Math.max(0.6 * M02 + 0.4 * M01, 0.4 * M02),
    midHeightMoment,
  ); // Equivalent first-order moment (§5.8.7.3, Eq. 5.32)
  let candidateMEd: number;
  let candidateCase: string;
  let NB: number | undefined;

  if (isSlender) {
    // Buckling load — §5, Eq. NB = π²EI/l₀²
    NB = (Math.PI ** 2 * EI) / l0 ** 2; // kN

    // Stability check
    if (NEd >= NB) {
      // Column exceeds buckling load — return infinite utilization signal
      return {
        l0,
        i,
        lambda,
        lambdaLim,
        isSlender,
        rm,
        M01,
        M02,
        M0e,
        NB,
        MEd: Infinity,
        governingCase: `UNSTABLE (NEd ≥ NB)`,
      };
    }

    // Design moment — §5.8.7.3 (c₀=8 conservative, β=π²/c₀)
    const beta = Math.PI ** 2 / 8;
    const MEdMid = M0e * (beta / (1 - NEd / NB));

    const useMagnified = MEdMid > M02;
    candidateMEd = useMagnified ? MEdMid : M02;
    candidateCase = useMagnified ? "M0Ed×β/(1−NEd/NB)" : "M02";
  } else {
    candidateMEd = M02;
    candidateCase = "M02";
  }

  // Min eccentricity gate (§6.1(4))
  const eMin = Math.max(h / 30, 20); // mm
  const MEdMin = (NEd * eMin) / 1000; // kNm
  const MEd = Math.max(candidateMEd, MEdMin);
  const governingCase =
    MEdMin > candidateMEd ? "Min eccentricity" : candidateCase;

  return {
    l0,
    i,
    lambda,
    lambdaLim,
    isSlender,
    rm,
    M01,
    M02,
    M0e,
    NB,
    MEd,
    governingCase,
  };
}
