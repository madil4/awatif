import { Lut } from "./utils/lut";

export class ViewerLabel {
  private _colorMapper: Lut;
  private _canvas: HTMLCanvasElement;
  private _container: HTMLElement;
  private _max: HTMLElement;
  private _min: HTMLElement;

  constructor() {
    this._colorMapper = new Lut("rainbow");
    this._canvas = this._colorMapper.createCanvas();
    this._container = document.createElement("div");
    this._max = document.createElement("div");
    this._min = document.createElement("div");

    this._canvas.style.width = "15px";
    this._container.appendChild(this._canvas);

    const maxMinCss = `
      position: absolute;
      font: 12px Roboto Mono, Source Code Pro, Menlo, Courier, monospace;
      left:22px;
      z-index: 100;
      display:block;
      color: #ffffff;
    `;
    this._max.innerText = "test";
    this._max.style.cssText = maxMinCss;
    this._max.style.top = "0px";
    this._container.appendChild(this._max);

    this._min.innerText = "min:-50";
    this._min.style.cssText = maxMinCss;
    this._min.style.bottom = "0px";
    this._container.appendChild(this._min);
  }

  set hidden(value: boolean) {
    this._container.hidden = value;
  }

  get HTML() {
    return this._container;
  }

  getColor = (value: number): number[] =>
    this._colorMapper.getColor(value).toArray();

  updateMaxMin = ({ max, min }: { max: number; min: number }) => {
    this._max.innerText = `max:${max}`;
    this._min.innerText = `min:${min}`;
  };
}
