import { matrix, simplicialCholesky, sparseMatrix, tripletVector, gc } from ".";

describe("eigen", () => {
  test("Solve linear system Ax=B", () => {
    /* The matrix has to be symmetric, positive definite, and has non-zero rows and columns.
    A = [
      [4, 2],
      [2, 3],
    ] 
    */

    const tripleV = new tripletVector(4);
    tripleV.add(0, 0, 2);
    tripleV.add(0, 0, 2); // It will be add to the one above
    tripleV.add(1, 0, 2);
    tripleV.add(0, 1, 2);
    tripleV.add(1, 1, 3);

    const cholesky = new simplicialCholesky(new sparseMatrix(2, 2, tripleV));
    const x = cholesky.solve(new matrix([10, 8]));

    expect([x.get(0, 0), x.get(1, 0)]).toEqual([1.75, 1.5]);

    gc.flush(); // It is important to call this function to free memory
  });
});
