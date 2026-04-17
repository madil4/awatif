import { describe, expect, test } from "vitest";
import { pointSupport } from "./pointSupport";

describe("pointSupport", () => {
  test("maps roller presets to the expected restrained translations", () => {
    expect(
      pointSupport.getSupport({
        params: { type: "horizontal-roller" },
      }).support,
    ).toEqual([false, true, true, false, false, false]);

    expect(
      pointSupport.getSupport({
        params: { type: "vertical-roller" },
      }).support,
    ).toEqual([true, false, true, false, false, false]);

    expect(
      pointSupport.getSupport({
        params: { type: "z-roller" },
      }).support,
    ).toEqual([true, true, false, false, false, false]);
  });
});
