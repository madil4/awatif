import { ConcreteMemberParams } from "../concreteMember";
import type { ConcreteNationalAnnexParams } from "../nationalAnnexes";

// Eurocode EN 1992-1-1 material constants
export const EC2_CONSTANTS = {
  ES: 200000, // Steel modulus of elasticity (MPa)
  EPSILON_CU3: 0.0035, // Ultimate concrete strain
  BAR_RADIUS_MM: 10, // Assumed bar radius (mm)
} as const;

export function parseMaterialProps(
  params: Pick<ConcreteMemberParams, "concreteGrade" | "steelGrade">,
  annexParams: ConcreteNationalAnnexParams,
) {
  const fckMatch = params.concreteGrade.match(/C(\d+)/);
  const fck = fckMatch ? parseInt(fckMatch[1]) : 30;
  const fykMatch = params.steelGrade.match(/S(\d+)/);
  const fyk = fykMatch ? parseInt(fykMatch[1]) : 500;
  const fcm = fck + 8;
  const Ecm = 22000 * Math.pow(fcm / 10, 0.3); // MPa
  const fcd = (annexParams.alphaCc * fck) / annexParams.gammaC;
  const fyd = fyk / annexParams.gammaS;
  return { fck, fyk, fcm, Ecm, fcd, fyd };
}

export function getStiffness(
  params: ConcreteMemberParams,
  annexParams: ConcreteNationalAnnexParams,
): {
  Kc: number;
  EI: number; // kNm² — nominal stiffness (Ks=0, Eq. 5.26)
  EIelastic: number; // kNm² — elastic (Ecm×Ic)
} {
  const { Ecm } = parseMaterialProps(params, annexParams);
  const Ic = (params.width * params.depth ** 3) / 12; // mm⁴
  const Ecd = Ecm / annexParams.gammaCE; // MPa
  const Kc = 0.3 / (1 + 0.5 * params.creepCoefficient);
  return {
    Kc,
    EI: (Kc * Ecd * Ic) / 1e9,
    EIelastic: (Ecm * Ic) / 1e9,
  };
}
