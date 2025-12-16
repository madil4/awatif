import { Mesh } from "../data-model";
import { multiply, transpose } from "mathjs";
import { getTransformationMatrix } from "./getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./getLocalStiffnessMatrix";

export function getGlobalStiffnessMatrix(
  nodes: Mesh["nodes"],
  elements: Mesh["elements"],
  elementsProps: Mesh["elementsProps"],
  dof: number
): number[][] {
  let stiffnessMatrix = Array(dof)
    .fill(0)
    .map(() => Array(dof).fill(0));

  if (!nodes || !elements || !elementsProps) return stiffnessMatrix;

  elements.forEach((e, i) => {
    const elmNodes = e.map((e) => nodes[e]);
    const kLocal = getLocalStiffnessMatrix(elmNodes, elementsProps, i);
    const T = getTransformationMatrix(elmNodes);

    const kGlobal = multiply(transpose(T), multiply(kLocal, T));
    stiffnessMatrix = assemble(stiffnessMatrix, kGlobal, e);
  });

  return stiffnessMatrix;
}

function assemble(
  stiffnessMatrix: number[][],
  kGlobal: number[][],
  element: number[]
): number[][] {
  const isN2 = element.length === 3;
  const offset0 = 6 * element[0];
  const offset1 = 6 * element[1];
  const offset2 = isN2 ? 6 * element[2] : undefined;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      stiffnessMatrix[offset0 + i][offset0 + j] += kGlobal[i][j];
      stiffnessMatrix[offset1 + i][offset0 + j] += kGlobal[i + 6][j];

      stiffnessMatrix[offset0 + i][offset1 + j] += kGlobal[i][j + 6];
      stiffnessMatrix[offset1 + i][offset1 + j] += kGlobal[i + 6][j + 6];
    }
  }

  return stiffnessMatrix;
}
