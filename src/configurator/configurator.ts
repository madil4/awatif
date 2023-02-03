import { Pane } from "tweakpane";
import { Parameters } from "../interfaces";

export class Configurator {
  private _pane: Pane;

  constructor() {
    this._pane = new Pane({ title: "Parameters" });
    this._pane.element.style.width = "300px";
  }

  render(parameters: Parameters): HTMLElement {
    Object.keys(parameters).forEach((key) => {
      this._pane.addInput(parameters[key], "value", {
        min: parameters[key].min,
        max: parameters[key].max,
        step: parameters[key].step,
        label: key,
      });
    });

    return this._pane.element;
  }
}
