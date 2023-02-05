import { OrbitControls } from "./utils/OrbitControls";
import { AnalysisResults, Model } from "../interfaces";
import { LineSegments2 } from "./utils/lines/LineSegments2";
import { getColors } from "./utils/get-colors";
import { getPositions } from "./utils/get-positions";
import {
  BoxGeometry,
  DoubleSide,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { getSupports } from "./utils/get-supports";
import { getUniformLoads } from "./utils/get-uniform-loads";
import { ViewerSettingsPanel as ViewerSettingsPanel } from "./viewer-settings-panel";
import { ViewerLabel } from "./viewer-label";

export interface ViewerSettingsState {
  supports: boolean;
  loads: boolean;
  deformed: boolean;
  result: string;
}

export class Viewer {
  private _settingsState: ViewerSettingsState;
  private _settingsPanel: ViewerSettingsPanel;
  private _label: ViewerLabel;
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _lines: LineSegments2;

  constructor() {
    // settings state
    this._settingsState = {
      supports: false,
      loads: false,
      deformed: false,
      result: "none",
    };

    // setting panel
    this._settingsPanel = new ViewerSettingsPanel(this._settingsState);
    this._settingsPanel.setExpanded(false);

    // label
    this._label = new ViewerLabel();
    this._label.setHidden(true);

    // threeJS stuff
    // 3d renderer
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

    // handlers
    this._settingsPanel.onChange(() => {
      this._label.setHidden(
        this._settingsState.result == "none" ? true : false
      );
    });
  }

  getHTML(): HTMLElement {
    const container = document.createElement("div");

    const viewer = this._renderer.domElement;
    viewer.style.margin = "-1rem"; // only for storybook
    container.appendChild(viewer);

    const settings = this._settingsPanel.getHTML();
    settings.style.position = "absolute";
    settings.style.top = "0px";
    settings.style.left = "2rem";
    container.appendChild(settings);

    const label = this._label.getHTML();
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
    (this._lines.geometry as any).setColors(
      getColors(model.connectivities, analysisResults, this._label.getColor)
    );

    // supports
    getSupports(model).map((position) => {
      const cube = new Mesh(
        new BoxGeometry(0.25, 0.25, 0.25),
        new MeshBasicMaterial({ color: 0x00ff00 })
      );
      cube.position.fromArray(position);
      this._scene.add(cube);
    });

    // loads
    getUniformLoads(model).map((element: any[]) => {
      this.renderUniformLoad(element);
    });
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

    this._scene.add(plane);
  }
}
