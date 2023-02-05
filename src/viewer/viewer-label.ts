import { Lut } from "./utils/lut";

export class ViewerLabel {
  private _colorMapper: Lut;
  private _canvas: HTMLCanvasElement;

  constructor() {
    this._colorMapper = new Lut("rainbow");
    this._canvas = this._colorMapper.createCanvas();

    this._canvas.style.width = "15px";
  }

  setHidden(value: boolean) {
    this._canvas.hidden = value;
  }

  getHTML() {
    return this._canvas;
  }

  getColor = (value: number): number[] =>
    this._colorMapper.getColor(value).toArray();
}
