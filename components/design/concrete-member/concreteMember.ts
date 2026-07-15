import type { DesignTemplate } from "../data-model";
import { getParamsTemplate } from "./getParamsTemplate";
import { getElementsProps } from "./getElementsProps";
import { getReport } from "./getReport";
import { ConcreteMemberDesign, getDesign } from "./getDesign";

export type ConcreteMemberParams = {
  width: number; // b (mm)
  depth: number; // h (mm)
  concreteGrade: string; // e.g., "C30" n/mm2 (MPa)
  steelGrade: string; // e.g., "S500" n/mm2 (MPa)
  steelArea: number; // As (mm²)
  cover: number; // cnom (mm)
  lengthFactor?: number; // l0/l
  creepCoefficient: number; // φef
  braced: boolean;
  // Shear reinforcement
  stirrupArea: number; // Asw/s (mm²/m)
};

export const concreteMember: DesignTemplate<
  ConcreteMemberParams,
  ConcreteMemberDesign
> = {
  name: "Concrete Frame",
  geometryKind: "line",
  defaultParams: {
    width: 350,
    depth: 350,
    concreteGrade: "C30",
    steelGrade: "S500",
    steelArea: 2500,
    cover: 30,
    lengthFactor: 2,
    creepCoefficient: 0,
    braced: true,
    stirrupArea: 500,
  },

  getParamsTemplate,
  getElementsProps,
  getDesign,
  getReport,

  getSection: (params: ConcreteMemberParams): [number, number][] => {
    const w = params.width / 2000; // half-width in m
    const h = params.depth / 2000; // half-depth in m

    return [
      [-w, -h],
      [w, -h],
      [w, h],
      [-w, h],
    ];
  },
};
