import { Node, Element, ElementInputs } from "awatif-data-structure";
import { multiply, transpose } from "mathjs";
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
    const n0 = nodes[e[0]];
    const n1 = nodes[e[1]];

    // Frame element
    if (e.length === 2) {
      const kLocal = getLocalStiffnessMatrix([n0, n1], elementInputs, i);
      const T = getTransformationMatrix(n0, n1);
      const kGlobal = multiply(transpose(T), multiply(kLocal, T));

      stiffnessMatrix = assemble(stiffnessMatrix, kGlobal, e[0], e[1]);
    }

    // Plate element
    if (e.length === 3) {
      const n2 = nodes[e[2]];

      const kLocal = getLocalStiffnessMatrix([n0, n1, n2], elementInputs, i);
      console.table(kLocal);
      // const T = getTransformationMatrix(n0, n1);
      // const kGlobal = multiply(transpose(T), multiply(kLocal, T));

      // stiffnessMatrix = assemble(stiffnessMatrix, kGlobal, e[0], e[1]);
    }
  });

  return stiffnessMatrix;
}

function assemble(
  stiffnessMatrix: number[][],
  k: number[][],
  i0: number,
  i1: number
): number[][] {
  const offset0 = 6 * i0;
  const offset1 = 6 * i1;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      stiffnessMatrix[offset0 + i][offset0 + j] += k[i][j];
      stiffnessMatrix[offset1 + i][offset0 + j] += k[i + 6][j];
      stiffnessMatrix[offset0 + i][offset1 + j] += k[i][j + 6];
      stiffnessMatrix[offset1 + i][offset1 + j] += k[i + 6][j + 6];
    }
  }

  return stiffnessMatrix;
}
