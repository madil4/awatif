export type TimberNationalAnnexCode =
  | "EN 1995-1-1"
  | "NEN-EN 1995-1-1+C1+A1:2011/NB:2013";

export const DEFAULT_TIMBER_NATIONAL_ANNEX: TimberNationalAnnexCode =
  "EN 1995-1-1";

export const K_CR_BY_NATIONAL_ANNEX: Record<TimberNationalAnnexCode, number> = {
  "EN 1995-1-1": 0.67,
  "NEN-EN 1995-1-1+C1+A1:2011/NB:2013": 1.0,
};
