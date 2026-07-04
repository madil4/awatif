import { SteelMemberParams } from "./steelMember";
import { STEEL_PROFILES, E_STEEL, G_STEEL } from "./steelProfiles";

export function getElementsProps({
  params,
}: {
  params: SteelMemberParams;
  activeAnalysis: string;
}) {
  const profile = STEEL_PROFILES[params.profile];
  if (!profile) {
    return {
      elasticity: E_STEEL * 1e3,
      area: 0.005,
      momentInertiaZ: 0.00008,
      momentInertiaY: 0.00001,
      shearModulus: G_STEEL * 1e3,
      torsionalConstant: 0,
    };
  }

  return {
    elasticity: E_STEEL * 1e3,       // MPa → kN/m²
    area: profile.A / 1e6,           // mm² → m²
    momentInertiaZ: profile.Iy / 1e12, // mm⁴ → m⁴ (strong axis)
    momentInertiaY: profile.Iz / 1e12, // mm⁴ → m⁴ (weak axis)
    shearModulus: G_STEEL * 1e3,     // MPa → kN/m²
    torsionalConstant: profile.It / 1e12, // mm⁴ → m⁴
  };
}
