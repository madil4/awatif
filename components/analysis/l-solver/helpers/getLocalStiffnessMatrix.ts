import { norm, subtract } from "mathjs";
import type { Mesh } from "../../../data-model";

export function getLocalStiffnessMatrix(
  nodes: Mesh["nodes"]["val"],
  elementsProps: Mesh["elementsProps"]["val"] | undefined,
  index: number,
): number[][] {
  if (!nodes || !elementsProps) return [];

  if (nodes.length === 2)
    return getLocalStiffnessMatrixFrame(nodes, elementsProps, index);

  return [];
}

function getLocalStiffnessMatrixFrame(
  nodes: Mesh["nodes"]["val"],
  elementsProps: Mesh["elementsProps"]["val"] | undefined,
  index: number,
): number[][] {
  if (!nodes || !elementsProps) return [];

  const elementProps = elementsProps?.get(index);

  const Iz = elementProps?.momentInertia ?? 0;
  const Iy = elementProps?.momentInertia ?? 0;
  const E = elementProps?.elasticity ?? 0;
  const A = elementProps?.area ?? 0;
  const G = elementProps?.shearModulus ?? 0;
  const J = elementProps?.torsionalConstant ?? 0;
  const L = norm(subtract(nodes[0], nodes[1])) as number;

  const EA = (E * A) / L;
  const EIz = (E * Iz) / L ** 3;
  const EIy = (E * Iy) / L ** 3;
  const GJ = (G * J) / L;

  return [
    [EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0],
    [0, 12 * EIz, 0, 0, 0, 6 * L * EIz, 0, -12 * EIz, 0, 0, 0, 6 * L * EIz],
    [0, 0, 12 * EIy, 0, -6 * L * EIy, 0, 0, 0, -12 * EIy, 0, -6 * L * EIy, 0],
    [0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
    ],
    [-EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0],
    [0, -12 * EIz, 0, 0, 0, -6 * EIz * L, 0, 12 * EIz, 0, 0, 0, -6 * EIz * L],
    [0, 0, -12 * EIy, 0, 6 * L * EIy, 0, 0, 0, 12 * EIy, 0, 6 * L * EIy, 0],
    [0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
    ],
  ];
}
