import { Pane } from "tweakpane";
import { getDocument } from "./utils/getDocument";

export enum ParameterType {
  Slider = "Slider",
}
interface SliderParameter {
  type: ParameterType.Slider;
  value: number;
  min: number;
  max: number;
  step: number;
}
type Parameter = SliderParameter;
export type Parameters = { [name: string]: Parameter };

export class Configurtor {
  private _container: HTMLElement;
  private _pane: Pane;

  constructor() {
    this._container = getDocument().createElement("div");
    this._pane = new Pane({ container: this._container, title: "Parameters" });

    this._container.style.width = "300px";
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

    return this._container;
  }
}
