import { Pane } from "tweakpane";
import { Parameters, ParameterType } from "../interfaces";

export class Configurator {
  private _pane: Pane;

  constructor(parameters: Parameters) {
    this._pane = new Pane({ title: "Parameters" });

    Object.entries(parameters).forEach(([key, parameter]) => {
      if (parameter.type === ParameterType.slider) {
        this._pane.addInput(parameter, "value", {
          min: parameter.min,
          max: parameter.max,
          step: parameter.step,
          label: parameter.label ?? key,
        });
      } else if (parameter.type === ParameterType.toggle) {
        this._pane.addInput(parameter, "value", {
          label: parameter.label ?? key,
        });
      }
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
