import { SparseMatrix, sparseMatrix } from "awatif-math";

export function getFreeStiffnessMatrix(full: SparseMatrix, freeInd: number[]) {
  const free = new sparseMatrix(freeInd.length, freeInd.length);

  for (let i = 0; i < freeInd.length; i++) {
    for (let j = 0; j < freeInd.length; j++) {
      const row = freeInd[i];
      const col = freeInd[j];
      const value = full.get(row, col);
      free.set(i, j, value);
    }
  }

  return free;
}
