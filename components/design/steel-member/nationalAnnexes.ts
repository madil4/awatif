export type SteelNationalAnnexCode =
  | "EN 1993-1-1"
  | "NEN-EN 1993-1-1:2006+C2+A1/NB:2016";

export type SteelNationalAnnexParams = {
  gammaM0: number;
  gammaM1: number;
};

export const DEFAULT_STEEL_NATIONAL_ANNEX: SteelNationalAnnexCode =
  "EN 1993-1-1";

export const STEEL_NATIONAL_ANNEX_PARAMS: Record<
  SteelNationalAnnexCode,
  SteelNationalAnnexParams
> = {
  "EN 1993-1-1": {
    gammaM0: 1.0,
    gammaM1: 1.0,
  },
  "NEN-EN 1993-1-1:2006+C2+A1/NB:2016": {
    gammaM0: 1.0,
    gammaM1: 1.0,
  },
};
