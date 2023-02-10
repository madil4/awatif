import { OrbitControls } from "./utils/OrbitControls";
import { AnalysisResults, Model } from "../interfaces";
import { LineSegments2 } from "./utils/lines/LineSegments2";
import { getColors } from "./utils/get-colors";
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

export interface ViewerState {
  supports: boolean;
  loads: boolean;
  deformed: boolean;
  results: string;
  cashed?: { [type: string]: { colors: number; max: number; min: number } };
}

export class Viewer {
  private _state: ViewerState;
  private _settingsPanel: ViewerSettingsPanel;
  private _label: ViewerLabel;
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _lines: LineSegments2;
  private _supports: Group;
  private _loads: Group;

  constructor(state?: ViewerState) {
    this._state = state
      ? state
      : {
          supports: false,
          loads: false,
          deformed: false,
          results: "none",
        };

    this._settingsPanel = new ViewerSettingsPanel(this._state);
    this._settingsPanel.expanded = false;

    this._label = new ViewerLabel();
    this._label.hidden = this._state.results == "none" ? true : false;

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
      this._state.results == "none" ? linesNoColor : linesColor;
    this._scene.add(this._lines);

    this._supports = new Group();
    this._supports.visible = this._state.supports;
    this._scene.add(this._supports);

    this._loads = new Group();
    this._loads.visible = this._state.loads;
    this._scene.add(this._loads);

    // handlers
    this._settingsPanel.onChange(() => {
      this._label.hidden = this._state.results == "none" ? true : false;
      this._lines.material =
        this._state.results == "none" ? linesNoColor : linesColor;
      this._supports.visible = this._state.supports;
      this._loads.visible = this._state.loads;

      if (this._state.cashed) {
        this._label.updateMaxMin(
          this._state.cashed[this._state.results].max,
          this._state.cashed[this._state.results].min
        );
      }
    });
  }

  get HTML(): HTMLElement {
    const container = document.createElement("div");

    const viewer = this._renderer.domElement;
    viewer.style.margin = "-1rem"; // only for storybook
    container.appendChild(viewer);

    const settings = this._settingsPanel.HTML;
    settings.style.position = "absolute";
    settings.style.top = "0px";
    settings.style.left = "2rem";
    container.appendChild(settings);

    const label = this._label.HTML;
    label.style.position = "absolute";
    label.style.top = "10rem";
    label.style.left = "2rem";
    container.appendChild(label);

    return container;
  }

  update(model: Model, analysisResults?: AnalysisResults): void {
    // lines
    (this._lines.geometry as any).setPositions(
      getPositions(model.connectivities, model.positions)
    );

    // supports
    getSupports(model).map((position) => {
      const cube = new Mesh(
        new BoxGeometry(0.25, 0.25, 0.25),
        new MeshBasicMaterial({ color: 0x00ff00 })
      );
      cube.position.fromArray(position);
      this._supports.add(cube);
    });

    // loads
    getUniformLoads(model).map((element: any[]) => {
      this.renderUniformLoad(element);
    });

    // colors per type
    (this._lines.geometry as any).setColors(
      getColors(model.connectivities, analysisResults, this._label.getColor)
    );

    // label max and min per type
    this._state.cashed = this.cashResult(analysisResults);

    if (this._state.cashed) {
      this._label.updateMaxMin(
        this._state.cashed[this._state.results]?.max,
        this._state.cashed[this._state.results]?.min
      );
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

  private cashResult(analysisResults: AnalysisResults | undefined) {
    if (!analysisResults) return;

    const stresses: number[] = [];
    const forces: number[] = [];

    Object.keys(analysisResults).forEach((key) => {
      stresses.push(analysisResults[key].stress);
      forces.push(analysisResults[key].force);
    });

    return {
      stress: {
        colors: 12,
        max: Math.max(...stresses),
        min: Math.min(...stresses),
      },
      force: { colors: 12, max: Math.max(...forces), min: Math.min(...forces) },
    };
  }
}
