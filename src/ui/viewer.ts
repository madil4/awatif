import { OrbitControls } from "./utils/OrbitControls";
import { AnalysisResults, DesignResults, Model } from "../interfaces";
import { LineSegments2 } from "./utils/lines/LineSegments2";
import { getPositions } from "./utils/get-positions";
import {
  BoxGeometry,
  DoubleSide,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { getSupports } from "./utils/get-supports";
import { getUniformLoads } from "./utils/get-uniform-loads";
import { ViewerSettingsPanel as ViewerSettingsPanel } from "./viewer-settings-panel";
import { ViewerLabel } from "./viewer-label";
import { LineMaterial } from "./utils/lines/LineMaterial";
import { cacheResults } from "./utils/cache-results";
import { Lut } from "./utils/lut";

export interface Settings {
  supports: boolean;
  loads: boolean;
  deformed: boolean;
  results: string;
  expanded: boolean;
}

export class Viewer {
  private _settings: Settings;
  private _settingsPanel: ViewerSettingsPanel;
  private _colorMapper: Lut;
  private _label: ViewerLabel;
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _lines: LineSegments2;
  private _supports: Group;
  private _loads: Group;
  private _cached?: {
    [type: string]: { colors: number[]; max: number; min: number };
  };

  constructor(settings?: Partial<Settings>) {
    this._settings = {
      supports: false,
      loads: false,
      deformed: false,
      results: "none",
      expanded: false,
      ...settings,
    };

    this._settingsPanel = new ViewerSettingsPanel(this._settings);

    this._colorMapper = new Lut();

    this._label = new ViewerLabel(this._colorMapper.createCanvas());
    this._label.update({
      hidden: this._settings.results == "none" ? true : false,
    });

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

    new OrbitControls(this._camera, this._renderer.domElement);

    const grid = new GridHelper(10, 10);
    grid.position.set(0, -2, 0);
    this._scene.add(grid);

    const linesNoColor = new LineMaterial({
      color: "white",
      linewidth: 2,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
    });
    const linesColor = new LineMaterial({
      color: "white",
      vertexColors: true,
      linewidth: 2,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
    });
    this._lines = new LineSegments2();
    this._lines.material =
      this._settings.results == "none" ? linesNoColor : linesColor;
    this._scene.add(this._lines);

    this._supports = new Group();
    this._supports.visible = this._settings.supports;
    this._scene.add(this._supports);

    this._loads = new Group();
    this._loads.visible = this._settings.loads;
    this._scene.add(this._loads);

    // on settings change
    this._settingsPanel.onChange(() => {
      this._label.update({
        hidden: this._settings.results == "none" ? true : false,
      });
      this._lines.material =
        this._settings.results == "none" ? linesNoColor : linesColor;
      this._supports.visible = this._settings.supports;
      this._loads.visible = this._settings.loads;

      if (this._cached) {
        (this._lines.geometry as any).setColors(
          this._cached[this._settings.results].colors
        );
        this._label.update({
          max: this._cached[this._settings.results].max,
          min: this._cached[this._settings.results].min,
        });
      }
    });

    document.body.appendChild(this.render());
  }

  render(): HTMLElement {
    const container = document.createElement("div");

    this._renderer.domElement.style.margin = "-1rem"; // only for storybook
    container.appendChild(this._renderer.domElement);
    container.appendChild(this._settingsPanel.render());
    container.appendChild(this._label.render());

    return container;
  }

  update(
    model: Model,
    analysisResults?: AnalysisResults,
    designResults?: DesignResults
  ): void {
    (this._lines.geometry as any).setPositions(
      getPositions(model.connectivities, model.positions)
    );

    getSupports(model).map((position) => {
      const cube = new Mesh(
        new BoxGeometry(0.25, 0.25, 0.25),
        new MeshBasicMaterial({ color: 0x00ff00 })
      );
      cube.position.fromArray(position);
      this._supports.add(cube);
    });

    getUniformLoads(model).map((element: any[]) => {
      this.renderUniformLoad(element);
    });

    this._cached = cacheResults(
      model.connectivities,
      analysisResults,
      designResults,
      this.getColor
    );

    if (this._cached && this._settings.results != "none") {
      (this._lines.geometry as any).setColors(
        this._cached[this._settings.results].colors
      );
      this._label.update({
        max: this._cached[this._settings.results]?.max,
        min: this._cached[this._settings.results]?.min,
      });
    }
  }

  private renderUniformLoad(element: any[]) {
    const start = new Vector3(...element[0]);
    const end = new Vector3(...element[1]);
    const vector = end.clone().sub(start);
    const normal = start.clone().cross(end).normalize();
    const length = start.distanceTo(end);

    const beforeNormal = new Vector3(0, 0, 1);
    const cross = normal.clone().cross(beforeNormal).normalize();
    const angle = beforeNormal.angleTo(normal);
    const rotation = new Quaternion()
      .setFromAxisAngle(cross, angle)
      .normalize();

    const plane = new Mesh(
      new PlaneGeometry(length, 0.5),
      new MeshBasicMaterial({
        color: 0x00ff00,
        side: DoubleSide,
      })
    );

    plane.position.copy(start);
    plane.applyQuaternion(rotation);

    const xAxis = new Vector3(1, 0, 0).applyQuaternion(rotation);
    const angle2 = xAxis.angleTo(vector);
    if (xAxis.cross(vector).z > 0) {
      plane.rotateZ(angle2);
    } else {
      plane.rotateZ(-angle2);
    }
    plane.translateX(length / 2);
    plane.translateY(0.5);

    this._loads.add(plane);
  }

  private getColor = (value: number, max: number, min: number): number[] => {
    this._colorMapper.setMax(max);
    this._colorMapper.setMin(min);
    return this._colorMapper.getColor(value).toArray();
  };
}
