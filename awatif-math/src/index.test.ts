import { matrix } from ".";

describe("eigen", () => {
  test("Solve linear system Ax=B", () => {
    new matrix([1, 2, 3]).print("1");

    expect(true).toBe(true);
  });
});
