import type { DesignTemplate } from "../data-model";
import { getParamsTemplate } from "./getParamsTemplate";
import { getElementsProps } from "./getElementsProps";
import { getReport } from "./getReport";
import { getDesign } from "./getDesign";
import type { TimberMemberDesign } from "./getDesign";
import type { TimberLoadDurationClass } from "./eurocodeFactors";

export type TimberMemberParams = {
  width: number; // b (mm)
  depth: number; // h (mm)
  timberClass: string; // e.g. "C24", "GL24h"
  serviceClass: 1 | 2 | 3;
  loadDurationClass: TimberLoadDurationClass;
  lengthFactor?: number; // l₀/l — effective buckling length ratio
};

export const timberMember: DesignTemplate<
  TimberMemberParams,
  TimberMemberDesign
> = {
  name: "Timber Member",
  defaultParams: {
    width: 100,
    depth: 200,
    timberClass: "C24",
    serviceClass: 1,
    loadDurationClass: "medium-term",
    lengthFactor: 1,
  },

  getParamsTemplate,
  getElementsProps,
  getDesign,
  getReport,

  getSection: (params: TimberMemberParams): [number, number][] => {
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
