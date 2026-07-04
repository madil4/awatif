import { ConcreteMemberParams } from "./concreteMember";
import { getStiffness, parseMaterialProps } from "./helpers/shared";
import type { ActiveAnalysis } from "../data-model";
import {
  CONCRETE_NATIONAL_ANNEX_PARAMS,
  DEFAULT_CONCRETE_NATIONAL_ANNEX,
} from "./nationalAnnexes";

export function getElementsProps({
  params,
  activeAnalysis,
}: {
  params: ConcreteMemberParams;
  activeAnalysis: ActiveAnalysis;
}) {
  const width = params.width / 1000; // Convert mm to m
  const depth = params.depth / 1000; // Convert mm to m

  const area = width * depth;
  const momentInertiaZ = (width * Math.pow(depth, 3)) / 12; // bh³/12 — strong axis
  const momentInertiaY = (depth * Math.pow(width, 3)) / 12; // hb³/12 — weak axis

  const annexParams =
    CONCRETE_NATIONAL_ANNEX_PARAMS[DEFAULT_CONCRETE_NATIONAL_ANNEX];
  const { EI, EIelastic } = getStiffness(params, annexParams);
  const { Ecm } = parseMaterialProps(params, annexParams);

  const effectiveElasticity =
    activeAnalysis === "nonlinear"
      ? EI / momentInertiaZ // EC2 §5.8.7.2 — Kc×Ecd (Eq. 5.26)
      : EIelastic / momentInertiaZ; // Ecm

  const nu = 0.2; // Poisson's ratio for concrete (EC2 §3.1.3)
  const shearModulus = (Ecm * 1e3) / (2 * (1 + nu)); // kN/m²

  // Saint-Venant torsional constant for rectangular section (Roark)
  const ratio = depth / width; // h/b (ensure h >= b for formula; flip if needed)
  const beta = ratio >= 1
    ? (1 / 3) * (1 - 0.63 / ratio)
    : (1 / 3) * (1 - 0.63 * ratio); // symmetric: use shorter/longer side
  const torsionalConstant = beta * Math.pow(width, 3) * depth; // m⁴

  return {
    elasticity: effectiveElasticity,
    area,
    momentInertiaZ,
    momentInertiaY,
    shearModulus,
    torsionalConstant,
  };
}
