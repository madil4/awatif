import * as THREE from "three";
import van from "vanjs-core";
import { Node } from "awatif-data-structure";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ModelState, SettingsState } from "./types";
import { nodes } from "./objects/nodes";
import { elements } from "./objects/elements";
import { grid } from "./objects/grid";
import { supports } from "./objects/supports";
import { loads } from "./objects/loads";
import { nodesIndexes } from "./objects/nodesIndexes";
import { elementsIndexes } from "./objects/elementsIndexes";
import { axes } from "./objects/axes";
import { orientations } from "./objects/orientations";
import { elementResults } from "./objects/elementResults";
import { nodeResults } from "./objects/nodeResults";

export function viewer(
  model: ModelState,
  settings: SettingsState
): HTMLCanvasElement {
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
  const derivedDisplayScale = van.derive(() =>
    settings.displayScale.val === 0
      ? 1
      : settings.displayScale.val > 0
      ? settings.displayScale.val
      : -1 / settings.displayScale.val
  );
  const derivedNodes = van.derive(() => {
    if (!settings.deformedShape.val) return model.val.nodes;

    return model.val.nodes.map((node, index) => {
      const d = model.val.analysisOutputs.nodes
        ?.get(index)
        ?.deformation?.slice(0, 3) ?? [0, 0, 0];
      return node.map((n, i) => n + d[i]) as Node;
    });
  });

  // update
  scene.add(
    grid(settings.gridSize.rawVal),
    axes(settings.gridSize.rawVal),
    nodes(settings, derivedNodes, derivedDisplayScale),
    elements(model, settings, derivedNodes),
    nodesIndexes(settings, derivedNodes, derivedDisplayScale),
    elementsIndexes(model, settings, derivedNodes, derivedDisplayScale),
    supports(model, settings, derivedNodes, derivedDisplayScale),
    loads(model, settings, derivedNodes, derivedDisplayScale),
    orientations(model, settings, derivedNodes, derivedDisplayScale),
    elementResults(model, settings, derivedNodes, derivedDisplayScale),
    nodeResults(model, settings, derivedNodes, derivedDisplayScale)
  );

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const gridSize = settings.gridSize.rawVal;
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

  return renderer.domElement;
}
