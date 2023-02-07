import { Pane } from "tweakpane";
import { Parameters } from "../interfaces";

export class Configurator {
  private _pane: Pane;

  constructor(parameters: Parameters) {
    this._pane = new Pane({ title: "Parameters" });

    this._pane.element.style.width = "300px";

    Object.keys(parameters).forEach((key) => {
      this._pane.addInput(parameters[key], "value", {
        min: parameters[key].min,
        max: parameters[key].max,
        step: parameters[key].step,
        label: key,
      });
    });
  }

  getHTML(): HTMLElement {
    return this._pane.element;
  }
}
