import {
  Matrix,
  matrix,
  SparseMatrix,
  sparseMatrix,
  tripletVector,
  TripletVector,
} from "awatif-math";
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
    const kLocal = new matrix(
      getLocalStiffnessMatrix(elmNodes, elementInputs, i)
    ); // 20mm
    const T = getTransformationMatrix(elmNodes); // 20mm

    const kGlobal = T.transpose().matMul(kLocal).matMul(T); // 40mm
    tripleV = assemble(tripleV, kGlobal, e);
  });

  return new sparseMatrix(dof, dof, tripleV);
}

function assemble(
  tripleV: TripletVector,
  kGlobal: Matrix,
  element: number[]
): TripletVector {
  const isN2 = element.length === 3;
  const offset0 = 6 * element[0];
  const offset1 = 6 * element[1];
  const offset2 = isN2 ? 6 * element[2] : undefined;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      tripleV.add(offset0 + i, offset0 + j, kGlobal.get(i, j));
      tripleV.add(offset1 + i, offset0 + j, kGlobal.get(i + 6, j));
      if (isN2) tripleV.add(offset2 + i, offset0 + j, kGlobal.get(i + 12, j));

      tripleV.add(offset0 + i, offset1 + j, kGlobal.get(i, j + 6));
      tripleV.add(offset1 + i, offset1 + j, kGlobal.get(i + 6, j + 6));
      if (isN2)
        tripleV.add(offset2 + i, offset1 + j, kGlobal.get(i + 12, j + 6));

      if (isN2) {
        tripleV.add(offset0 + i, offset2 + j, kGlobal.get(i, j + 12));
        tripleV.add(offset1 + i, offset2 + j, kGlobal.get(i + 6, j + 12));
        tripleV.add(offset2 + i, offset2 + j, kGlobal.get(i + 12, j + 12));
      }
    }
  }

  return tripleV;
}
