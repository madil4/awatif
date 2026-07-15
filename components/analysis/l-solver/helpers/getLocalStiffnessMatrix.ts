import { inv, multiply, norm, subtract } from "mathjs";
import type { Mesh } from "../../../data-model";
import { getShellLocalStiffnessMatrix } from "./getShellLocalStiffnessMatrix";

export function getLocalStiffnessMatrix(
  nodes: Mesh["nodes"]["val"],
  elementsProps: Mesh["elementsProps"]["val"] | undefined,
  index: number,
  releases?: Mesh["releases"]["val"],
): number[][] {
  if (!nodes || !elementsProps) return [];

  // Releases apply only to two-node frame elements.
  if (nodes.length === 3) {
    const properties = elementsProps.get(index);
    return getShellLocalStiffnessMatrix(
      nodes,
      properties?.elasticity ?? 0,
      properties?.poissonRatio ?? 0,
      properties?.thickness ?? 0,
    );
  }

  const elementProps = elementsProps.get(index);
  const Iz = elementProps?.momentInertiaZ ?? 0;
  const Iy = elementProps?.momentInertiaY ?? 0;
  const E = elementProps?.elasticity ?? 0;
  const A = elementProps?.area ?? 0;
  const G = elementProps?.shearModulus ?? 0;
  const J = elementProps?.torsionalConstant ?? 0;
  const L = norm(subtract(nodes[0], nodes[1])) as number;

  const EA = (E * A) / L;
  const EIz = (E * Iz) / L ** 3;
  const EIy = (E * Iy) / L ** 3;
  const GJ = (G * J) / L;

  const K = [
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

  const elementReleases = releases?.get(index);
  if (elementReleases && elementReleases.some(Boolean)) {
    const releasedDofIndices: number[] = [];
    if (elementReleases[0]) releasedDofIndices.push(4);
    if (elementReleases[1]) releasedDofIndices.push(5);
    if (elementReleases[2]) releasedDofIndices.push(10);
    if (elementReleases[3]) releasedDofIndices.push(11);
    return condenseStiffnessMatrix(K, releasedDofIndices);
  }

  return K;
}

function condenseStiffnessMatrix(
  K: number[][],
  releasedIndices: number[],
): number[][] {
  const n = K.length;
  const allIndices = Array.from({ length: n }, (_, i) => i);
  const freeIndices = allIndices.filter((i) => !releasedIndices.includes(i));
  const Kff = freeIndices.map((i) => freeIndices.map((j) => K[i][j]));
  const Kfr = freeIndices.map((i) => releasedIndices.map((j) => K[i][j]));
  const Krf = releasedIndices.map((i) => freeIndices.map((j) => K[i][j]));
  const Krr = releasedIndices.map((i) => releasedIndices.map((j) => K[i][j]));
  const correction = multiply(Kfr, multiply(inv(Krr), Krf)) as number[][];
  const condensedFf = Kff.map((row, i) =>
    row.map((value, j) => value - correction[i][j]),
  );
  const result = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < freeIndices.length; i++) {
    for (let j = 0; j < freeIndices.length; j++) {
      result[freeIndices[i]][freeIndices[j]] = condensedFf[i][j];
    }
  }
  return result;
}
