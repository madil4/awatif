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
        label: parameters[key].label ?? key,
      });
    });

    document.body.appendChild(this.render());
  }

  render(): HTMLElement {
    this._pane.element.style.width = "20rem";
    this._pane.element.style.position = "absolute";
    this._pane.element.style.right = "1.5rem";
    if (window.innerWidth < 690) {
      this._pane.element.style.bottom = "0rem";
    } else {
      this._pane.element.style.top = "1.5rem";
    }

    return this._pane.element;
  }

  onChange(cb: () => void): void {
    cb();
    this._pane.on("change", () => {
      cb();
    });
  }
}
