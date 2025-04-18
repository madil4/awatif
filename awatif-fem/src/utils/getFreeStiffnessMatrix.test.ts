import { sparseMatrix, tripletVector } from "awatif-math";
import { getFreeStiffnessMatrix } from "./getFreeStiffnessMatrix";

describe.only("getFreeStiffnessMatrix", () => {
  it("should return the correct free stiffness matrix", () => {
    // full sparse matrix
    /*
    const fullMatrix = [
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3],
    ];
    */
    const fullCoefs = new tripletVector(3);
    fullCoefs.add(0, 0, 1);
    fullCoefs.add(1, 1, 2);
    fullCoefs.add(2, 2, 3);

    const full = new sparseMatrix(3, 3, fullCoefs);

    // free nodes
    const freeInd = [0, 2];

    // get free
    const free = getFreeStiffnessMatrix(full, freeInd);

    // assert
    expect(free.get(0, 0)).toBe(1);
    expect(free.get(1, 1)).toBe(3);
  });
});
