import { Pane } from "tweakpane";
import { Settings } from "./viewer";

export class ViewerSettingsPanel {
  private _pane: Pane;

  constructor(settings: Settings) {
    this._pane = new Pane({ title: "Viewer Settings" });

    this._pane.addInput(settings, "supports");
    this._pane.addInput(settings, "loads");
    this._pane.addInput(settings, "deformed");
    this._pane.addInput(settings, "points");
    this._pane.addInput(settings, "results", {
      options: {
        none: "none",
        "stress (mpa)": "stress",
        "force (kn)": "force",
        "deformationX (mm)": "deformationX",
        "deformationY (mm)": "deformationY",
        design: "steel",
      },
    });

    this._pane.expanded = settings.expanded;
    this._pane.hidden = !settings.visible;
  }

  render() {
    this._pane.element.style.position = "absolute";
    this._pane.element.style.width = "18rem";
    this._pane.element.style.top = "0rem";
    this._pane.element.style.left = "1.5rem";

    return this._pane.element;
  }

  onChange(cb: () => void) {
    return this._pane.on("change", () => cb());
  }
}
