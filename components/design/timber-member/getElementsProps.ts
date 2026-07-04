import { TimberMemberParams } from "./timberMember";
import { TIMBER_CLASSES } from "./timberClasses";

export function getElementsProps({
  params,
}: {
  params: TimberMemberParams;
  activeAnalysis: string;
}) {
  const width = params.width / 1000; // mm → m
  const depth = params.depth / 1000; // mm → m

  const area = width * depth;
  const momentInertiaZ = (width * Math.pow(depth, 3)) / 12; // bh³/12 — strong axis
  const momentInertiaY = (depth * Math.pow(width, 3)) / 12; // hb³/12 — weak axis

  const cls = TIMBER_CLASSES[params.timberClass];
  // E0_mean and G_mean are in N/mm² = MPa → convert to kN/m² (×1e3)
  const elasticity = cls ? cls.E0_mean * 1e3 : 11000e3;
  const shearModulus = cls ? cls.G_mean * 1e3 : 690e3; // C24 fallback

  // Saint-Venant torsional constant for rectangular section (Roark)
  const ratio = depth / width; // h/b
  const beta = ratio >= 1
    ? (1 / 3) * (1 - 0.63 / ratio)
    : (1 / 3) * (1 - 0.63 * ratio);
  const torsionalConstant = beta * Math.pow(width, 3) * depth; // m⁴

  return {
    elasticity,
    area,
    momentInertiaZ,
    momentInertiaY,
    shearModulus,
    torsionalConstant,
  };
}
