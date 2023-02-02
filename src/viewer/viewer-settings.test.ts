import { View } from "@tweakpane/core";
import { Pane } from "tweakpane";
import { ViewerSettings, ViewerSettingsState } from "./viewer-settings";

jest.mock("tweakpane");

describe("ViewerSettings", () => {
  let viewerSettings: ViewerSettings;

  const state: ViewerSettingsState = {
    supports: false,
    loads: false,
    deformed: false,
  };
  const pane = { element: { style: { width: "0px" } }, addInput: jest.fn() };
  (Pane as jest.Mock).mockReturnValue(pane);

  beforeEach(() => {
    viewerSettings = new ViewerSettings(state);
  });

  test("should create a setting pan on init", () => {
    expect(Pane).toHaveBeenCalledWith({ title: "Viewer Settings" });
    expect(pane.element.style.width).toBe("300px");
    expect(pane.addInput).toHaveBeenNthCalledWith(1, state, "supports");
    expect(pane.addInput).toHaveBeenNthCalledWith(2, state, "loads");
    expect(pane.addInput).toHaveBeenNthCalledWith(3, state, "deformed");
  });

  describe("render", () => {
    test("should render", () => {
      expect(viewerSettings.render()).toBe(pane.element);
    });
  });
});
