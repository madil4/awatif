import { Pane } from "tweakpane";
import { ParameterType, Parameters } from "../interfaces";
import { Configurator } from "./configurator";

jest.mock("tweakpane");

describe("Configurator", () => {
  let configurator: Configurator;

  const pane = { addInput: jest.fn(), element: { style: { width: "0px" } } };
  (Pane as jest.Mock).mockReturnValue(pane);

  beforeEach(() => {
    configurator = new Configurator();
  });

  test("should create a new Pane on init", () => {
    expect(Pane).toHaveBeenCalledWith({ title: "Parameters" });
    expect(pane.element.style.width).toBe("300px");
  });

  describe("render", () => {
    test("should render a slider", () => {
      const parameters: Parameters = {
        height: {
          type: ParameterType.slider,
          value: 50,
          min: 0,
          max: 100,
          step: 1,
        },
      };

      const rendered = configurator.render(parameters);

      expect(pane.addInput).toHaveBeenCalledWith(parameters.height, "value", {
        min: parameters.height.min,
        max: parameters.height.max,
        step: parameters.height.step,
        label: "height",
      });
      expect(rendered).toBe(pane.element);
    });

    test("should render multiple sliders", () => {
      const parameters: Parameters = {
        height: {
          type: ParameterType.slider,
          value: 50,
          min: 0,
          max: 100,
          step: 1,
        },
        width: {
          type: ParameterType.slider,
          value: 40,
          min: 0,
          max: 50,
          step: 2,
        },
      };

      const rendered = configurator.render(parameters);

      expect(pane.addInput).toHaveBeenCalledTimes(2);
      expect(pane.addInput).toHaveBeenNthCalledWith(
        1,
        parameters.height,
        "value",
        {
          min: parameters.height.min,
          max: parameters.height.max,
          step: parameters.height.step,
          label: "height",
        }
      );
      expect(pane.addInput).toHaveBeenNthCalledWith(
        2,
        parameters.width,
        "value",
        {
          min: parameters.width.min,
          max: parameters.width.max,
          step: parameters.width.step,
          label: "width",
        }
      );
      expect(rendered).toBe(pane.element);
    });
  });
});
