import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnalysisResult, DesignResult, Model, Node } from "../interfaces";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { getFullNodes } from "./utils/get-full-nodes";
import {
  GridHelper,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { ViewerSettingsPanel as ViewerSettingsPanel } from "./viewer-settings-panel";
import { ViewerLabel } from "./viewer-label";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { getResults } from "./utils/get-results";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { Sections3D } from "./utils/objects/sections-3d";
import { Nodes3D } from "./utils/objects/nodes-3d";
import { Supports3D } from "./utils/objects/supports-3d";
import { Loads3D } from "./utils/objects/loads-3d";

export interface Settings {
  nodes: boolean;
  supports: boolean;
  loads: boolean;
  sections: boolean;
  deformed: boolean;
  results: string;
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
  private _supports3D: Supports3D;
  private _loads3D: Loads3D;
  private _sections3D: Sections3D;

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
      nodes: false,
      supports: false,
      loads: false,
      sections: false,
      deformed: false,
      results: "none",
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

    this._supports3D = new Supports3D();
    this._supports3D.visible = this._settings.supports;
    this._scene.add(this._supports3D);

    this._loads3D = new Loads3D();
    this._loads3D.visible = this._settings.loads;
    this._scene.add(this._loads3D);

    this._sections3D = new Sections3D();
    this._sections3D.visible = this._settings.sections;
    this._scene.add(this._sections3D);

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

      this._supports3D.visible = this._settings.supports;
      this._loads3D.visible = this._settings.loads;
      this._sections3D.visible = this._settings.sections;

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

    this._supports3D.update(model);
    this._loads3D.update(model);
    this._sections3D.update(model);
  }
}
