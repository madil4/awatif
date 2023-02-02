import { Pane } from "tweakpane";

export interface ViewerSettingsState {
  supports: boolean;
  loads: boolean;
  deformed: boolean;
}

export class ViewerSettings {
  private _pane: Pane;
  private _state: ViewerSettingsState;

  constructor(state?: ViewerSettingsState) {
    this._pane = new Pane({ title: "Viewer Settings" });
    this._state = state
      ? state
      : { supports: false, loads: false, deformed: false };

    this._pane.element.style.width = "300px";
    this._pane.addInput(this._state, "supports");
    this._pane.addInput(this._state, "loads");
    this._pane.addInput(this._state, "deformed");
  }

  render() {
    return this._pane.element;
  }
}
