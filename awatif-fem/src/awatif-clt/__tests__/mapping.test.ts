import { assembleMembrane9x9To18x18 } from "../../utils/getLocalStiffnessMatrix";

function zeros(r: number, c: number): number[][] {
  return Array.from({ length: r }, () => Array(c).fill(0));
}

describe("membrane 9x9 -> shell 18x18 mapping", () => {
  test("maps mixed node/dof off-diagonal terms to the expected shell indices", () => {
    const K18 = zeros(18, 18);
    const Km9 = zeros(9, 9);

    // row 0 -> node1 ux, col 4 -> node2 uy
    Km9[0][4] = 1234;
    Km9[4][0] = 1234;

    assembleMembrane9x9To18x18(K18, Km9);

    expect(K18[0][7]).toBe(1234);
    expect(K18[7][0]).toBe(1234);
  });
});
