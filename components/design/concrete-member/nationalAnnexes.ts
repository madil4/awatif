export type ConcreteNationalAnnexCode =
  | "EN 1992-1-1"
  | "NEN-EN 1992-1-1+C2:2011/NB:2016";

export type ConcreteNationalAnnexParams = {
  gammaC: number;
  gammaS: number;
  gammaCE: number;
  alphaCc: number;
  cRdC: number;
  vMinCoefficient: number;
  k1: number;
};

export const DEFAULT_CONCRETE_NATIONAL_ANNEX: ConcreteNationalAnnexCode =
  "EN 1992-1-1";

export const CONCRETE_NATIONAL_ANNEX_PARAMS: Record<
  ConcreteNationalAnnexCode,
  ConcreteNationalAnnexParams
> = {
  "EN 1992-1-1": {
    gammaC: 1.5,
    gammaS: 1.15,
    gammaCE: 1.2,
    alphaCc: 0.85,
    cRdC: 0.18 / 1.5,
    vMinCoefficient: 0.035,
    k1: 0.15,
  },
  "NEN-EN 1992-1-1+C2:2011/NB:2016": {
    gammaC: 1.5,
    gammaS: 1.15,
    gammaCE: 1.2,
    alphaCc: 1.0,
    cRdC: 0.18 / 1.5,
    vMinCoefficient: 0.035,
    k1: 0.15,
  },
};
