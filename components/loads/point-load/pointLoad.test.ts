// @vitest-environment happy-dom
import { describe, expect, beforeEach, it } from "vitest";
import { render } from "lit-html";
import { pointLoad, type PointLoadParams } from "./pointLoad";

describe("pointLoad getParamsTemplate", () => {
  const inputParams: Array<keyof PointLoadParams> = ["Fx", "Fy"];

  describe.for(inputParams)("handles edge cases for %s input", (param) => {
    let params: { val: PointLoadParams };
    let inputs: NodeListOf<HTMLInputElement>;

    beforeEach(() => {
      params = { val: { ...pointLoad.defaultParams } };
      const container = document.createElement("div");
      render(pointLoad.getParamsTemplate({ params } as any), container);
      inputs = container.querySelectorAll("input");
    });

    const defaultParam = pointLoad.defaultParams[param];
    const cases = [
      { value: "-100", expected: -100 },
      { value: "0", expected: 0 },
      { value: "100", expected: 100 },
      { value: "-", expected: defaultParam },
      { value: ".", expected: defaultParam },
      { value: "abc", expected: defaultParam },
      { value: "", expected: defaultParam },
    ];

    it.for(cases)("processes $value as $expected", ({ value, expected }) => {
      const paramIndex = Object.keys(pointLoad.defaultParams).indexOf(param);
      const targetInput = inputs[paramIndex];

      targetInput.value = value;
      targetInput.dispatchEvent(new Event("input"));

      const nextValue = params.val[param];
      expect(nextValue).toBe(expected);
    });
  });
});
