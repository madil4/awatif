import { norm, subtract, multiply, inv } from "mathjs";
import type { Mesh } from "../../../data-model";

export function getLocalStiffnessMatrix(
  nodes: Mesh["nodes"]["val"],
  elementsProps: Mesh["elementsProps"]["val"] | undefined,
  index: number,
  releases?: Mesh["releases"]["val"],
): number[][] {
  if (!nodes || !elementsProps) return [];

  const elementProps = elementsProps?.get(index);

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
    // Map [My_start, Mz_start, My_end, Mz_end] to local DOF indices
    const releasedDofIndices: number[] = [];
    if (elementReleases[0]) releasedDofIndices.push(4); // My_start
    if (elementReleases[1]) releasedDofIndices.push(5); // Mz_start
    if (elementReleases[2]) releasedDofIndices.push(10); // My_end
    if (elementReleases[3]) releasedDofIndices.push(11); // Mz_end
    return condenseStiffnessMatrix(K, releasedDofIndices);
  }

  return K;
}

// Helpers
function condenseStiffnessMatrix(
  K: number[][],
  releasedIndices: number[],
): number[][] {
  const n = K.length;
  const allIndices = Array.from({ length: n }, (_, i) => i);
  const freeIndices = allIndices.filter((i) => !releasedIndices.includes(i));

  // Extract sub-matrices
  const Kff = freeIndices.map((i) => freeIndices.map((j) => K[i][j]));
  const Kfr = freeIndices.map((i) => releasedIndices.map((j) => K[i][j]));
  const Krf = releasedIndices.map((i) => freeIndices.map((j) => K[i][j]));
  const Krr = releasedIndices.map((i) => releasedIndices.map((j) => K[i][j]));

  // K_condensed_ff = Kff - Kfr * inv(Krr) * Krf
  const correction = multiply(Kfr, multiply(inv(Krr), Krf)) as number[][];
  const condensedFf = Kff.map((row, i) =>
    row.map((val, j) => val - correction[i][j]),
  );

  // Reconstruct full matrix with zeros at released DOFs
  const result = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < freeIndices.length; i++) {
    for (let j = 0; j < freeIndices.length; j++) {
      result[freeIndices[i]][freeIndices[j]] = condensedFf[i][j];
    }
  }

  return result;
}
