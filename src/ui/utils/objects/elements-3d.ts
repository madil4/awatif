import { Vector2 } from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { Node } from "../../../interfaces";

export class Elements3D extends LineSegments2 {
  private _materialWithoutColors: LineMaterial;
  private _materialWithColors: LineMaterial;

  constructor() {
    super();

    this._materialWithoutColors = new LineMaterial({
      color: 0xffffff,
      linewidth: 2,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
    });
    this._materialWithColors = new LineMaterial({
      color: 0xffffff,
      vertexColors: true,
      linewidth: 2,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
    });

    this.material = this._materialWithoutColors;
  }

  update({
    elements,
    colors,
  }: {
    elements?: [Node, Node][];
    colors?: number[];
  }) {
    if (elements) {
      this.geometry = new LineSegmentsGeometry();
      this.geometry.setPositions(elements.flat().flat());
    }

    if (colors) this.geometry.setColors(colors);
  }

  isColored(isColored: boolean) {
    this.material = isColored
      ? this._materialWithColors
      : this._materialWithoutColors;
  }
}
