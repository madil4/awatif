import { EnRcColumnParams } from "./enRcColumn";

export function getElementsProps(params: EnRcColumnParams) {
  const width = params.width / 1000;
  const depth = params.depth / 1000;

  const area = width * depth;

  const momentInertia = (width * Math.pow(depth, 3)) / 12;

  const fck = parseInt(params.concreteGrade.substring(1)); // Extract number from "C30"
  const fcm = fck + 8;
  const elasticity = 22000 * Math.pow(fcm / 10, 0.3) * 1e6; // Convert MPa to Pa

  const shearModulus = elasticity / (2 * (1 + 0.2));

  const a = Math.max(width, depth);
  const b = Math.min(width, depth);
  const torsionalConstant =
    a *
    Math.pow(b, 3) *
    (1 / 3 - 0.21 * (b / a) * (1 - Math.pow(b, 4) / (12 * Math.pow(a, 4))));

  return {
    elasticity,
    area,
    momentInertia,
    shearModulus,
    torsionalConstant,
  };
}
