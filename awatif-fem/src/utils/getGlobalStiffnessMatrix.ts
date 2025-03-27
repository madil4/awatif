import { Node, Element, ElementInputs } from "awatif-data-model";
import { e, multiply, transpose } from "mathjs";
import { getTransformationMatrix } from "./getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./getLocalStiffnessMatrix";

export function getGlobalStiffnessMatrix(
  nodes: Node[],
  elements: Element[],
  elementInputs: ElementInputs,
  dof: number
): number[][] {
  let stiffnessMatrix = Array(dof)
    .fill(0)
    .map(() => Array(dof).fill(0));

  elements.forEach((e, i) => {
    const elmNodes = e.map((e) => nodes[e]);
    const kLocal = getLocalStiffnessMatrix(elmNodes, elementInputs, i);
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
      if (isN2) stiffnessMatrix[offset2 + i][offset0 + j] += kGlobal[i + 12][j];

      stiffnessMatrix[offset0 + i][offset1 + j] += kGlobal[i][j + 6];
      stiffnessMatrix[offset1 + i][offset1 + j] += kGlobal[i + 6][j + 6];
      if (isN2)
        stiffnessMatrix[offset2 + i][offset1 + j] += kGlobal[i + 12][j + 6];

      if (isN2) {
        stiffnessMatrix[offset0 + i][offset2 + j] += kGlobal[i][j + 12];
        stiffnessMatrix[offset1 + i][offset2 + j] += kGlobal[i + 6][j + 12];
        stiffnessMatrix[offset2 + i][offset2 + j] += kGlobal[i + 12][j + 12];
      }
    }
  }

  return stiffnessMatrix;
}
