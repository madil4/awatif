import { Pane } from "tweakpane";
import { Parameters } from "../interfaces";

export class Configurator {
  private _pane: Pane;

  constructor(parameters: Parameters) {
    this._pane = new Pane({ title: "Parameters" });

    Object.keys(parameters).forEach((key) => {
      this._pane.addInput(parameters[key], "value", {
        min: parameters[key].min,
        max: parameters[key].max,
        step: parameters[key].step,
        label: key,
      });
    });
  }

  render(): HTMLElement {
    this._pane.element.style.width = "300px";

    return this._pane.element;
  }
}
