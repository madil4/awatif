import type { TimberClassProps } from "./timberClasses";

export type TimberLoadDurationClass =
  | "permanent"
  | "long-term"
  | "medium-term"
  | "short-term"
  | "instantaneous";

export type TimberSectionType = "rectangular";

type TimberMaterialType = TimberClassProps["type"];
type ServiceClass = 1 | 2 | 3;

type KModTable = Record<
  TimberMaterialType,
  Record<ServiceClass, Record<TimberLoadDurationClass, number>>
>;

const EN_K_MOD: KModTable = {
  solid: {
    1: {
      permanent: 0.6,
      "long-term": 0.7,
      "medium-term": 0.8,
      "short-term": 0.9,
      instantaneous: 1.1,
    },
    2: {
      permanent: 0.6,
      "long-term": 0.7,
      "medium-term": 0.8,
      "short-term": 0.9,
      instantaneous: 1.1,
    },
    3: {
      permanent: 0.5,
      "long-term": 0.55,
      "medium-term": 0.65,
      "short-term": 0.7,
      instantaneous: 0.9,
    },
  },
  glulam: {
    1: {
      permanent: 0.6,
      "long-term": 0.7,
      "medium-term": 0.8,
      "short-term": 0.9,
      instantaneous: 1.1,
    },
    2: {
      permanent: 0.6,
      "long-term": 0.7,
      "medium-term": 0.8,
      "short-term": 0.9,
      instantaneous: 1.1,
    },
    3: {
      permanent: 0.5,
      "long-term": 0.55,
      "medium-term": 0.65,
      "short-term": 0.7,
      instantaneous: 0.9,
    },
  },
};

const EN_GAMMA_M: Record<TimberMaterialType, number> = {
  solid: 1.3,
  glulam: 1.25,
};

export function getKMod(
  materialType: TimberMaterialType,
  serviceClass: ServiceClass,
  loadDurationClass: TimberLoadDurationClass,
): number {
  return EN_K_MOD[materialType][serviceClass][loadDurationClass];
}

export function getGammaM(materialType: TimberMaterialType): number {
  return EN_GAMMA_M[materialType];
}

export function getKm(_sectionType: TimberSectionType): number {
  return 0.7;
}

export function getBetaC(materialType: TimberMaterialType): number {
  return materialType === "glulam" ? 0.1 : 0.2;
}
