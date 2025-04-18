import { matrix, simplicialCholesky, sparseMatrix, tripletVector } from ".";

describe("eigen", () => {
  test("Solve linear system Ax=B", () => {
    /* The matrix has to be symmetric and positive definite
    A = [
      [4, 2],
      [2, 3],
    ] 
    */

    // You can assemble it item by item
    const ACoefficients = new tripletVector(4);
    ACoefficients.add(0, 0, 4);
    ACoefficients.add(1, 0, 2);
    ACoefficients.add(0, 1, 2);
    ACoefficients.add(1, 1, 3);

    // Or block by block and add matching blocks
    const ACoefficients2 = new tripletVector(4);
    ACoefficients2.addBlock(
      0,
      0,
      new matrix([
        [3, 2],
        [2, 2],
      ])
    );
    ACoefficients2.addBlock(
      0,
      0,
      new matrix([
        [1, 0],
        [0, 1],
      ])
    );

    const chol = new simplicialCholesky(new sparseMatrix(2, 2, ACoefficients2));
    const x = chol.solve(new matrix([10, 8]));

    expect([x.get(0, 0), x.get(1, 0)]).toEqual([1.75, 1.5]);
  });
});
