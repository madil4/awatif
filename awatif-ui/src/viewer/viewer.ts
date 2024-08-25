import * as THREE from "three";
import van from "vanjs-core";
import { Node } from "awatif-data-structure";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Settings, SettingsState } from "./settings/types";
import { settings } from "./settings/settings";
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

import { ModelState } from "../types";

import "./styles.css";

export function viewer(
  model: ModelState,
  settingsObj: Settings
): HTMLDivElement {
  // init
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const container = document.createElement("div");
  const settingsState: SettingsState = {
    gridSize: van.state(settingsObj.gridSize ?? 20),
    displayScale: van.state(settingsObj.displayScale ?? 1),
    nodes: van.state(settingsObj.nodes ?? true),
    elements: van.state(settingsObj.elements ?? true),
    nodesIndexes: van.state(settingsObj.nodesIndexes ?? false),
    elementsIndexes: van.state(settingsObj.elementsIndexes ?? false),
    orientations: van.state(settingsObj.orientations ?? false),
    supports: van.state(settingsObj.supports ?? true),
    loads: van.state(settingsObj.loads ?? true),
    deformedShape: van.state(settingsObj.deformedShape ?? false),
    elementResults: van.state(settingsObj.elementResults ?? "none"),
    nodeResults: van.state(settingsObj.nodeResults ?? "none"),
  };
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
    settingsState.displayScale.val === 0
      ? 1
      : settingsState.displayScale.val > 0
      ? settingsState.displayScale.val
      : -1 / settingsState.displayScale.val
  );
  const derivedNodes = van.derive(() => {
    if (!settingsState.deformedShape.val) return model.val.nodes;

    return model.val.nodes.map((node, index) => {
      const d = model.val.analysisOutputs.nodes
        ?.get(index)
        ?.deformation?.slice(0, 3) ?? [0, 0, 0];
      return node.map((n, i) => n + d[i]) as Node;
    });
  });

  // update
  const settingElement = settings(model, settingsState);

  container.setAttribute("id", "viewer");
  container.appendChild(renderer.domElement);
  container.appendChild(settingElement);

  scene.add(
    grid(settingsState.gridSize.rawVal),
    axes(settingsState.gridSize.rawVal),
    nodes(settingsState, derivedNodes, derivedDisplayScale),
    elements(model, settingsState, derivedNodes),
    nodesIndexes(settingsState, derivedNodes, derivedDisplayScale),
    elementsIndexes(model, settingsState, derivedNodes, derivedDisplayScale),
    supports(model, settingsState, derivedNodes, derivedDisplayScale),
    loads(model, settingsState, derivedNodes, derivedDisplayScale),
    orientations(model, settingsState, derivedNodes, derivedDisplayScale),
    elementResults(model, settingsState, derivedNodes, derivedDisplayScale),
    nodeResults(model, settingsState, derivedNodes, derivedDisplayScale)
  );

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const gridSize = settingsState.gridSize.rawVal;
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

    settingsState.displayScale.val;
    settingsState.nodes.val;
    settingsState.elements.val;
    settingsState.nodesIndexes.val;
    settingsState.elementsIndexes.val;
    settingsState.orientations.val;
    settingsState.supports.val;
    settingsState.loads.val;
    settingsState.deformedShape.val;
    settingsState.elementResults.val;
    settingsState.nodeResults.val;

    setTimeout(() => renderer.render(scene, camera)); // to ensure render is called after all updates are done in that event tick
  });

  return container;
}
