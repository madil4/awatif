import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnalysisResult, DesignResult, Model, Node } from "../interfaces";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { getFullNodes } from "./utils/get-full-nodes";
import {
  GridHelper,
  Group,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { getSupports } from "./utils/get-supports";
import { getUniformLoads } from "./utils/get-uniform-loads";
import { ViewerSettingsPanel as ViewerSettingsPanel } from "./viewer-settings-panel";
import { ViewerLabel } from "./viewer-label";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { getResults } from "./utils/get-results";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { renderUniformLoads } from "./utils/render-uniform-loads";
import { renderSupports } from "./utils/render-supports";
import { Profiles } from "./utils/3d-objects/profiles";
import { getBarProperties } from "./utils/get-bar-properties";
import { Nodes3D } from "./utils/3d-objects/nodes-3d";

export interface Settings {
  supports: boolean;
  loads: boolean;
  deformed: boolean;
  results: string;
  nodes: boolean;
  profiles: boolean;
  expanded: boolean;
  visible: boolean;
}

export class Viewer {
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: PerspectiveCamera;

  private _settings: Settings;
  private _settingsPanel: ViewerSettingsPanel;
  private _label: ViewerLabel;

  private _nodes: {
    undeformed: Node[];
    deformed: Node[];
  };
  private _results?: {
    [type: string]: { colors: number[]; max: number; min: number };
  };

  private _lines: LineSegments2;
  private _nodes3D: Nodes3D;
  private _supports: Group;
  private _loads: Group;
  private _profiles: Profiles;

  constructor(settings?: Partial<Settings>) {
    this._renderer = new WebGLRenderer({ antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._scene = new Scene();
    this._camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );
    if (window.innerHeight / window.innerWidth > 1.6) {
      this._camera.position.set(0, 2, 40);
    } else {
      this._camera.position.set(0, 2, 30);
    }
    this._renderer.setAnimationLoop(() => {
      this._renderer.render(this._scene, this._camera);
    });
    new OrbitControls(this._camera, this._renderer.domElement);

    this._settings = {
      supports: false,
      loads: false,
      deformed: false,
      results: "none",
      nodes: false,
      profiles: false,
      expanded: false,
      visible: true,
      ...settings,
    };
    this._settingsPanel = new ViewerSettingsPanel(this._settings);
    this._label = new ViewerLabel();
    this._label.update({
      hidden: this._settings.results == "none" ? true : false,
    });

    // 3D objects
    const grid = new GridHelper(50, 10);
    grid.position.set(0, -10, 0);
    this._scene.add(grid);

    const linesNoColor = new LineMaterial({
      color: 0xffffff,
      linewidth: 2,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
    });
    const linesColor = new LineMaterial({
      color: 0xffffff,
      vertexColors: true,
      linewidth: 2,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
    });
    this._lines = new LineSegments2();
    this._lines.material =
      this._settings.results == "none" ? linesNoColor : linesColor;
    this._scene.add(this._lines);

    this._nodes3D = new Nodes3D();
    this._nodes3D.visible = this._settings.nodes;
    this._scene.add(this._nodes3D);

    this._supports = new Group();
    this._supports.visible = this._settings.supports;
    this._scene.add(this._supports);

    this._loads = new Group();
    this._loads.visible = this._settings.loads;
    this._scene.add(this._loads);

    this._profiles = new Profiles();
    this._profiles.visible = this._settings.profiles;
    this._scene.add(this._profiles);

    // event handlers
    this._settingsPanel.onChange(() => {
      this._label.update({
        hidden: this._settings.results == "none" ? true : false,
      });

      this._lines.material =
        this._settings.results == "none" ? linesNoColor : linesColor;
      const fullNodes = this._settings.deformed
        ? this._nodes.deformed
        : this._nodes.undeformed;
      this._lines.geometry.setPositions(fullNodes.flat());

      this._nodes3D.update(fullNodes);
      this._nodes3D.visible = this._settings.nodes;

      this._supports.visible = this._settings.supports;
      this._loads.visible = this._settings.loads;
      this._profiles.visible = this._settings.profiles;

      if (this._results && this._settings.results != "none") {
        this._label.update({
          max: this._results[this._settings.results].max,
          min: this._results[this._settings.results].min,
        });
        this._lines.geometry.setColors(
          this._results[this._settings.results].colors
        );
      }
    });

    document.body.appendChild(this.render()); // keep it at the end
  }

  render(): HTMLElement {
    document.body.style.padding = "0px"; // due to storybook
    document.body.style.margin = "0px"; // due to html default

    const container = document.createElement("div");
    container.appendChild(this._renderer.domElement);
    container.appendChild(this._settingsPanel.render());
    container.appendChild(this._label.render());

    return container;
  }

  update(
    model: Model,
    analysisResults?: AnalysisResult[],
    designResults?: DesignResult[]
  ): void {
    this._nodes = {
      undeformed: getFullNodes(model.nodes, model.elements),
      deformed: getFullNodes(
        model.deformedNodes ?? model.nodes,
        model.elements
      ),
    };
    this._results = getResults(model.elements, analysisResults, designResults);
    const fullNodes = this._settings.deformed
      ? this._nodes.deformed
      : this._nodes.undeformed;

    // lines
    this._lines.geometry = new LineSegmentsGeometry(); // to save topology
    this._lines.geometry.setPositions(fullNodes.flat());

    this._nodes3D.update(fullNodes);

    if (this._results && this._settings.results != "none") {
      this._label.update({
        max: this._results[this._settings.results]?.max,
        min: this._results[this._settings.results]?.min,
      });
      this._lines.geometry.setColors(
        this._results[this._settings.results].colors
      );
    }

    this._supports.clear();
    getSupports(model).map((position) => {
      this._supports.add(renderSupports(position));
    });

    this._loads.clear();
    getUniformLoads(model).map((element) => {
      this._loads.add(renderUniformLoads(element));
    });

    this._profiles.update(model.nodes, model.elements, getBarProperties(model));
  }
}
