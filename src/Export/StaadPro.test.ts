import { exportToStaadPro } from "./StaadPro";

describe("StaadPro", () => {
  it("should export to StaadPro", () => {
    const nodes = [
      [0, 0, 0],
      [5, 0, 1],
      [2, 0, 1],
    ];
    const elements = [
      [0, 1],
      [1, 2],
    ];

    const result = exportToStaadPro(nodes, elements);

    expect(result).toBe("0,0,0,5,0,1,2,0,10,1,1,2");
  });
});
