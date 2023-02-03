import { OrbitControls } from "./utils/OrbitControls";
import { AnalysisResults, Model } from "../interfaces";
import { LineSegments2 } from "./utils/lines/LineSegments2";
import { Lut } from "./utils/lut";
import { convertToColors } from "./utils/convert-to-colors";
import { convertToPositions } from "./utils/convert-to-positions";
import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class Viewer {
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _lines: LineSegments2;
  private _colorMapper: Lut;

  constructor() {
    this._renderer = new WebGLRenderer({ antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._scene = new Scene();
    this._camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      50
    );
    this._camera.position.set(0, 2, 10);
    this._renderer.setAnimationLoop(() => {
      this._renderer.render(this._scene, this._camera);
    });

    // orbit controls
    new OrbitControls(this._camera, this._renderer.domElement);

    // grid
    const grid = new GridHelper(10, 10);
    grid.position.set(0, -2, 0);
    this._scene.add(grid);

    // lines
    this._lines = new LineSegments2();
    (this._lines.material as any).linewidth = 2;
    (this._lines.material as any).vertexColors = true;
    (this._lines.material as any).color.set("white");
    (this._lines.material as any).resolution.set(
      window.innerWidth,
      window.innerHeight
    );
    this._scene.add(this._lines);

    // colorMapper
    this._colorMapper = new Lut("cooltowarm");
  }

  render(): HTMLElement {
    return this._renderer.domElement;
  }

  update(model: Model, analysisResults?: AnalysisResults) {
    (this._lines.geometry as any).setPositions(
      convertToPositions(model.connectivities, model.positions)
    );
    (this._lines.geometry as any).setColors(
      convertToColors(model.connectivities, analysisResults, this._colorMapper)
    );
  }
}
