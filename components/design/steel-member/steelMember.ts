import type { DesignTemplate } from "../data-model";
import { getParamsTemplate } from "./getParamsTemplate";
import { getElementsProps } from "./getElementsProps";
import { getReport } from "./getReport";
import { SteelMemberDesign, getDesign } from "./getDesign";
import { STEEL_PROFILES } from "./steelProfiles";

export type SteelMemberParams = {
  profile: string; // e.g. "IPE 300"
  steelGrade: string; // e.g. "S235"
  lengthFactor?: number; // l₀/l — effective buckling length ratio
};

export const steelMember: DesignTemplate<
  SteelMemberParams,
  SteelMemberDesign
> = {
  name: "Steel Frame",
  geometryKind: "line",
  defaultParams: {
    profile: "IPE 300",
    steelGrade: "S235",
    lengthFactor: 1,
  },

  getParamsTemplate,
  getElementsProps,
  getDesign,
  getReport,

  getSection: (params: SteelMemberParams): [number, number][] => {
    const p = STEEL_PROFILES[params.profile];
    if (!p) return [];

    // I-section polygon, centered at origin, mm → m (÷ 2000 for half-dims)
    const hh = p.h / 2000; // half height
    const bh = p.b / 2000; // half flange width
    const wh = p.tw / 2000 / 2; // half web thickness
    const tf = p.tf / 1000; // flange thickness in m

    return [
      // Bottom flange (bottom-left, clockwise)
      [-bh, -hh],
      [bh, -hh],
      [bh, -hh + tf],
      [wh, -hh + tf],
      // Web right side up to top flange
      [wh, hh - tf],
      [bh, hh - tf],
      // Top flange
      [bh, hh],
      [-bh, hh],
      [-bh, hh - tf],
      [-wh, hh - tf],
      // Web left side down to bottom flange
      [-wh, -hh + tf],
      [-bh, -hh + tf],
    ];
  },
};
