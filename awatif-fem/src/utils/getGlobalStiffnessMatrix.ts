import {
  SparseMatrix,
  sparseMatrix,
  tripletVector,
  TripletVector,
} from "awatif-math";
import { multiply, transpose } from "mathjs";
import { Node, Element, ElementInputs } from "../data-model";
import { getTransformationMatrix } from "./getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./getLocalStiffnessMatrix";

export function getGlobalStiffnessMatrix(
  nodes: Node[],
  elements: Element[],
  elementInputs: ElementInputs,
  dof: number
): SparseMatrix {
  let tripleV = new tripletVector(elements.length * 6 * 6 * 9); // Not accurate but enough for now based on the assemble function

  elements.forEach((e, i) => {
    const elmNodes = e.map((e) => nodes[e]);
    const kLocal = getLocalStiffnessMatrix(elmNodes, elementInputs, i);
    const T = getTransformationMatrix(elmNodes);

    const kGlobal = multiply(transpose(T), multiply(kLocal, T));
    tripleV = assemble(tripleV, kGlobal, e);
  });

  return new sparseMatrix(dof, dof, tripleV);
}

function assemble(
  tripleV: TripletVector,
  kGlobal: number[][],
  element: number[]
): TripletVector {
  const isN2 = element.length === 3;
  const offset0 = 6 * element[0];
  const offset1 = 6 * element[1];
  const offset2 = isN2 ? 6 * element[2] : undefined;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      tripleV.add(offset0 + i, offset0 + j, kGlobal[i][j]);
      tripleV.add(offset1 + i, offset0 + j, kGlobal[i + 6][j]);
      if (isN2) tripleV.add(offset2 + i, offset0 + j, kGlobal[i + 12][j]);

      tripleV.add(offset0 + i, offset1 + j, kGlobal[i][j + 6]);
      tripleV.add(offset1 + i, offset1 + j, kGlobal[i + 6][j + 6]);
      if (isN2) tripleV.add(offset2 + i, offset1 + j, kGlobal[i + 12][j + 6]);

      if (isN2) {
        tripleV.add(offset0 + i, offset2 + j, kGlobal[i][j + 12]);
        tripleV.add(offset1 + i, offset2 + j, kGlobal[i + 6][j + 12]);
        tripleV.add(offset2 + i, offset2 + j, kGlobal[i + 12][j + 12]);
      }
    }
  }

  return tripleV;
}
