import { Pane } from "tweakpane";
import { Configurtor, Parameters, ParameterType } from "./configurator";
import { getDocument } from "./utils/getDocument";

jest.mock("tweakpane");
jest.mock("./utils/getDocument");

describe("Configurator", () => {
  const container = { style: { width: "0px" } };
  const document = { createElement: jest.fn().mockReturnValue(container) };
  (getDocument as jest.Mock).mockReturnValue(document);

  test("should create a new Pane on init", () => {
    new Configurtor();

    expect(getDocument).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith("div");
    expect(Pane).toHaveBeenCalledWith({ container, title: "Parameters" });
    expect(container.style.width).toBe("300px");
  });

  describe("render", () => {
    const pane = { addInput: jest.fn() };
    (Pane as jest.Mock).mockReturnValue(pane);
    const configurator = new Configurtor();

    test("should render a slider", () => {
      const parameters: Parameters = {
        height: {
          type: ParameterType.Slider,
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
      expect(rendered).toBe(container);
    });

    test("should render multiple sliders", () => {
      const parameters: Parameters = {
        height: {
          type: ParameterType.Slider,
          value: 50,
          min: 0,
          max: 100,
          step: 1,
        },
        width: {
          type: ParameterType.Slider,
          value: 40,
          min: 0,
          max: 50,
          step: 2,
        },
      };

      const rendered = configurator.render(parameters);

      expect(pane.addInput).toHaveBeenCalledTimes(2);
      expect(pane.addInput).toHaveBeenCalledWith(parameters.height, "value", {
        min: parameters.height.min,
        max: parameters.height.max,
        step: parameters.height.step,
        label: "height",
      });
      expect(pane.addInput).toHaveBeenCalledWith(parameters.width, "value", {
        min: parameters.width.min,
        max: parameters.width.max,
        step: parameters.width.step,
        label: "width",
      });
      expect(rendered).toBe(container);
    });
  });
});
