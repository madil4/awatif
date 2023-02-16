export class ViewerLabel {
  private _canvas: HTMLCanvasElement;
  private _container: HTMLElement;
  private _max: HTMLElement;
  private _min: HTMLElement;

  constructor(colorMapperCanvas: HTMLCanvasElement) {
    this._canvas = colorMapperCanvas;
    this._container = document.createElement("div");
    this._max = document.createElement("div");
    this._min = document.createElement("div");

    this._max.innerText = "max:0";
    this._min.innerText = "min:0";
  }

  render() {
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
    this._max.style.cssText = maxMinCss;
    this._max.style.top = "0px";
    this._container.appendChild(this._max);

    this._min.style.cssText = maxMinCss;
    this._min.style.bottom = "0px";
    this._container.appendChild(this._min);

    this._container.style.position = "absolute";
    this._container.style.top = "10rem";
    this._container.style.left = "2rem";

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
    if (max != undefined) this._max.innerText = `max:${max}`;
    if (min != undefined) this._min.innerText = `min:${min}`;
  }
}
