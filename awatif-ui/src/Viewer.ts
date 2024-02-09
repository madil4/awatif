import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ModelState, SettingsState, Node } from "./types";
import { Nodes } from "./objects/Nodes";
import { Elements } from "./objects/Elements";
import { Grid } from "./objects/Grid";
import { Supports } from "./objects/Supports";
import { Loads } from "./objects/Loads";
import { NodesIndexes } from "./objects/NodesIndexes";
import { ElementsIndexes } from "./objects/ElementsIndexes";
import { Axes } from "./objects/Axes";
import { Orientations } from "./objects/Orientations";
import { ElementResults } from "./objects/ElementResults";
import { NodeResults } from "./objects/NodeResults";

export function Viewer(model: ModelState, settings: SettingsState) {
  // init
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2 * 1e6 // supported view till 1e6
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  const gridSize = settings.gridSize.val;
  const displayScale = van.derive(() =>
    settings.displayScale.val === 0
      ? 1
      : settings.displayScale.val > 0
      ? settings.displayScale.val
      : -1 / settings.displayScale.val
  );
  const nodes = van.derive(() => {
    if (!settings.deformedShape.val) return model.val.nodes;

    return model.val.nodes.map((node, index) => {
      const d = model.val.analysisResults.deformation.get(index) ?? [0, 0, 0];
      return node.map((n, i) => n + d[i]) as Node;
    });
  });

  // update
  scene.add(
    Grid(gridSize),
    Axes(gridSize),
    Nodes(nodes, settings, displayScale),
    Elements(nodes, model, settings),
    NodesIndexes(nodes, settings, displayScale),
    ElementsIndexes(nodes, model, settings, displayScale),
    Supports(nodes, model, settings, displayScale),
    Loads(nodes, model, settings, displayScale),
    Orientations(nodes, model, settings, displayScale),
    ElementResults(nodes, model, settings, displayScale),
    NodeResults(nodes, model, settings, displayScale)
  );

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.margin = "0";

  const z2fit = gridSize * 0.5 + (gridSize * 0.5) / Math.tan(45 * 0.5);
  camera.position.set(0.5 * gridSize, 0.8 * -z2fit, 0.5 * gridSize);
  controls.target.set(0.5 * gridSize, 0.5 * gridSize, 0);
  controls.minDistance = 1;
  controls.maxDistance = z2fit * 1.5;
  controls.zoomSpeed = 10;
  controls.update();

  // on windows resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });

  // on controls change
  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });

  // on settings or model change: render
  van.derive(() => {
    model.val;

    settings.displayScale.val;
    settings.nodes.val;
    settings.elements.val;
    settings.nodesIndexes.val;
    settings.elementsIndexes.val;
    settings.orientations.val;
    settings.supports.val;
    settings.loads.val;
    settings.deformedShape.val;
    settings.elementResults.val;
    settings.nodeResults.val;

    setTimeout(() => renderer.render(scene, camera)); // to ensure render is called after all updates are done in that event tick
  });
}
