import { Pane } from "tweakpane";
import { Settings } from "./viewer";

export class ViewerSettingsPanel {
  private _settings: Settings;
  private _pane: Pane;

  constructor(settings: Settings) {
    this._settings = settings;
    this._pane = new Pane({ title: "Viewer Settings" });

    this._pane.addInput(this._settings, "supports");
    this._pane.addInput(this._settings, "loads");
    this._pane.addInput(this._settings, "deformed");
    this._pane.addInput(this._settings, "results", {
      options: {
        none: "none",
        stress: "stress",
        force: "force",
        deformationX: "deformationX",
        deformationY: "deformationY",
        steel: "steel",
      },
    });

    this._pane.expanded = this._settings.expanded;
  }

  render() {
    this._pane.element.style.position = "absolute";
    this._pane.element.style.top = "0px";
    this._pane.element.style.left = "2rem";
    this._pane.element.style.width = "300px";

    return this._pane.element;
  }

  onChange(cb: () => void) {
    return this._pane.on("change", () => cb());
  }
}
