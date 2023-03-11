import { Lut } from "three/examples/jsm/math/lut";

export class ViewerLabel {
  private _canvas: HTMLCanvasElement;
  private _container: HTMLElement;
  private _max: HTMLElement;
  private _min: HTMLElement;

  constructor() {
    this._canvas = new Lut().createCanvas();
    this._container = document.createElement("div");
    this._max = document.createElement("div");
    this._min = document.createElement("div");

    this._max.innerText = "max:0";
    this._min.innerText = "min:0";
  }

  render() {
    this._canvas.style.width = "1rem";
    this._canvas.style.height = "40vh";
    this._container.appendChild(this._canvas);

    const maxMinCss = `
      position: absolute;
      font: 12px Roboto Mono, Source Code Pro, Menlo, Courier, monospace;
      left: 1.5rem;
      z-index: 100;
      display:block;
      color: #ffffff;
    `;
    this._max.style.cssText = maxMinCss;
    this._max.style.top = "0rem";
    this._container.appendChild(this._max);

    this._min.style.cssText = maxMinCss;
    this._min.style.bottom = "0rem";
    this._container.appendChild(this._min);

    this._container.style.position = "absolute";
    this._container.style.top = "25vh";
    this._container.style.left = "1.5rem";

    return this._container;
  }

  update({
    hidden,
    max,
    min,
  }: {
    hidden?: boolean;
    max?: number;
    min?: number;
  }) {
    if (hidden != undefined) this._container.hidden = hidden;
    if (max != undefined)
      this._max.innerText = `max:${Math.round(max * 1000) / 1000}`;
    if (min != undefined)
      this._min.innerText = `min:${Math.round(min * 1000) / 1000}`;
  }
}
