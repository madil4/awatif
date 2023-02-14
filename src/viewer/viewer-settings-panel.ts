import { Pane } from "tweakpane";

export interface ViewerSettingsState {
  supports: boolean;
  loads: boolean;
  deformed: boolean;
  results: string;
}

export class ViewerSettingsPanel {
  private _state: ViewerSettingsState;
  private _pane: Pane;

  constructor(state: ViewerSettingsState) {
    this._state = state;
    this._pane = new Pane({ title: "Viewer Settings" });

    this._pane.addInput(this._state, "supports");
    this._pane.addInput(this._state, "loads");
    this._pane.addInput(this._state, "deformed");
    this._pane.addInput(this._state, "results", {
      options: {
        none: "none",
        stress: "stress",
        force: "force",
        steel: "steel",
      },
    });
  }

  render() {
    this._pane.element.style.width = "300px";

    return this._pane.element;
  }

  update({ expanded }: { expanded?: boolean }) {
    if (expanded != undefined) this._pane.expanded = expanded;
  }

  onChange(cb: () => void) {
    return this._pane.on("change", () => cb());
  }
}
