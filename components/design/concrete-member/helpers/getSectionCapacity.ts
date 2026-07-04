import { EC2_CONSTANTS } from "./shared";

const { ES, EPSILON_CU3 } = EC2_CONSTANTS;

export type SectionCapacityInput = {
  NEd: number; // Design axial force (kN)
  MEd: number; // Design bending moment (kNm)
  b: number; // Section width (mm)
  h: number; // Section total depth (mm)
  d: number; // Effective depth (mm)
  As: number; // Total reinforcement area (mm²)
  fcd: number; // Design concrete strength (MPa)
  fyd: number; // Design steel yield strength (MPa)
};

export type SectionCapacityResult = {
  xNeutral: number; // Neutral axis depth (mm)
  NRd: number; // Axial capacity (kN)
  MRd: number; // Moment capacity (kNm)
  epsilonS: number; // Tension steel strain
  epsilonSPrime: number; // Compression steel strain
  utilization: number; // Utilization ratio
};

export function getSectionCapacity({
  NEd,
  MEd,
  b,
  h,
  d,
  As,
  fcd,
  fyd,
}: SectionCapacityInput): SectionCapacityResult {
  const dPrime = h - d; // Symmetric reinforcement

  // Handle zero load case
  if (Math.abs(NEd) < 1 && Math.abs(MEd) < 1) {
    return {
      xNeutral: h / 2,
      NRd: 0,
      MRd: 0,
      epsilonS: 0,
      epsilonSPrime: 0,
      utilization: 0,
    };
  }

  // Calculate target eccentricity in mm (MEd in kNm, NEd in kN)
  // e = M/N = kNm/kN = m, multiply by 1000 to get mm
  const targetEcc =
    Math.abs(NEd) > 1 ? (Math.abs(MEd) / Math.abs(NEd)) * 1000 : Infinity;

  // Find neutral axis depth at ultimate capacity with same eccentricity
  const xNeutral = findNeutralAxisDepth(
    targetEcc,
    b,
    h,
    d,
    dPrime,
    As,
    fcd,
    fyd,
  );

  // Get capacity forces at this neutral axis position (returns N and Nmm)
  const forces = getSectionForces(xNeutral, b, h, d, dPrime, As, fcd, fyd);

  // Convert to kN and kNm for consistency with design forces
  const NRd = Math.abs(forces.N) / 1000; // N to kN
  const MRd = Math.abs(forces.M) / 1e6; // Nmm to kNm
  const { epsilonS, epsilonSPrime } = forces;

  // Utilization
  let utilization: number;
  if (NRd > 0.1) {
    utilization = Math.abs(NEd) / NRd;
  } else if (MRd > 0.001) {
    utilization = Math.abs(MEd) / MRd;
  } else {
    utilization = 1.0;
  }

  return { xNeutral, NRd, MRd, epsilonS, epsilonSPrime, utilization };
}

/**
 * Calculate section forces (N, M) for a given neutral axis depth
 * Uses strain compatibility and rectangular stress block (EN 1992-1-1 §3.1.7)
 */
function getSectionForces(
  x: number,
  b: number,
  h: number,
  d: number,
  dPrime: number,
  As: number,
  fcd: number,
  fyd: number,
): { N: number; M: number; epsilonS: number; epsilonSPrime: number } {
  const AsHalf = As / 2;

  if (x <= 0) {
    const Fs = AsHalf * fyd;
    const FsPrime = AsHalf * fyd;
    const N = -(Fs + FsPrime);
    const M = Fs * (d - h / 2) - FsPrime * (h / 2 - dPrime);
    const epsilonYd = fyd / ES;
    return { N, M, epsilonS: epsilonYd, epsilonSPrime: epsilonYd };
  }

  const lambda = 0.8;
  const eta = 1.0;
  const isFullCompression = x >= h;

  const aBlock = isFullCompression ? h : lambda * x;
  const Fc = eta * fcd * b * aBlock;
  const yFc = aBlock / 2;

  let epsilonS: number;
  let epsilonSPrime: number;

  if (isFullCompression) {
    const epsilonYd = fyd / ES;
    epsilonS = -epsilonYd;
    epsilonSPrime = -epsilonYd;
  } else {
    epsilonS = (EPSILON_CU3 * (d - x)) / x;
    epsilonSPrime = (EPSILON_CU3 * (x - dPrime)) / x;
  }

  let sigmaS: number;
  let sigmaSPrime: number;

  if (isFullCompression) {
    sigmaS = getSteelStress(epsilonS, fyd);
    sigmaSPrime = getSteelStress(epsilonSPrime, fyd);
  } else {
    sigmaS = getSteelStress(epsilonS, fyd);
    sigmaSPrime = getSteelStress(-epsilonSPrime, fyd);
  }

  const Fs = AsHalf * sigmaS;
  const FsPrime = AsHalf * sigmaSPrime;

  const N = Fc - Fs - FsPrime;

  const Mc = Fc * (h / 2 - yFc);
  const Ms = Fs * (d - h / 2);
  const MsPrime = FsPrime * (dPrime - h / 2);

  const M = Mc + Ms + MsPrime;

  return { N, M, epsilonS, epsilonSPrime };
}

function getSteelStress(strain: number, fyd: number): number {
  const stressElastic = strain * ES;
  return Math.max(-fyd, Math.min(fyd, stressElastic));
}

/**
 * Find neutral axis depth that gives the same eccentricity as applied loads
 * Uses bisection method to find x where M/N = e = MEd/NEd
 */
function findNeutralAxisDepth(
  targetEccentricity: number,
  b: number,
  h: number,
  d: number,
  dPrime: number,
  As: number,
  fcd: number,
  fyd: number,
): number {
  if (!isFinite(targetEccentricity)) {
    let xMin = 0.01;
    let xMax = h;

    for (let i = 0; i < 100; i++) {
      const xMid = (xMin + xMax) / 2;
      const { N } = getSectionForces(xMid, b, h, d, dPrime, As, fcd, fyd);

      if (Math.abs(N) < 100) return xMid;

      if (N > 0) xMax = xMid;
      else xMin = xMid;
    }
    return (xMin + xMax) / 2;
  }

  let xMin = 0.1;
  let xMax = 20 * h;

  for (let i = 0; i < 100; i++) {
    const xMid = (xMin + xMax) / 2;
    const { N, M } = getSectionForces(xMid, b, h, d, dPrime, As, fcd, fyd);

    // Use error = M - e * N. We want to find where this is zero.
    // Since N is in Newtons and M is in Nmm, and targetEccentricity is in mm,
    // the units match (Nmm).
    const error = M - targetEccentricity * N;

    if (Math.abs(xMax - xMin) < 0.01) return xMid;

    // For a compression member, increasing x increases N and decreases M,
    // so error = M - e*N decreases as x increases.
    if (error > 0) {
      xMin = xMid;
    } else {
      xMax = xMid;
    }
  }

  return (xMin + xMax) / 2;
}

export function getInteractionCurve({
  b,
  h,
  d,
  As,
  fcd,
  fyd,
}: SectionCapacityInput): { N: number; M: number }[] {
  const dPrime = h - d;
  const points: { N: number; M: number }[] = [];

  const xValues = [
    0, 0.01, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
    0.65, 0.7, 0.75, 0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 3.0, 5.0, 10.0, 100.0,
  ].map((factor) => factor * h);

  for (const x of xValues) {
    const { N, M } = getSectionForces(x, b, h, d, dPrime, As, fcd, fyd);
    points.push({ N: N / 1000, M: M / 1e6 }); // Convert to kN and kNm
  }

  // Add pure compression point smoothly (x = infinity essentially)
  const pureComp = getSectionForces(1000 * h, b, h, d, dPrime, As, fcd, fyd);
  points.push({ N: pureComp.N / 1000, M: pureComp.M / 1e6 });

  return points;
}
