import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getGrid, GridInput } from "./objects/grid/getGrid";
import { DrawingInput, drawing } from "./drawing/drawings";

import "./style.css";

export function getViewer({
  gridInput,
  drawingInput,
}: {
  gridInput?: GridInput;
  drawingInput?: DrawingInput;
}): HTMLDivElement {
  // Init
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const container = document.createElement("div");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  const render = () => renderer.render(scene, camera);

  // Update
  container.id = "viewer";
  container.appendChild(renderer.domElement);

  camera.position.set(0, 0, 20);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  scene.add(getGrid({ gridInput, render }));

  render();

  if (drawingInput)
    drawing({ drawingInput, gridInput, scene, camera, renderer, render });

  // Events
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  });

  controls.addEventListener("change", render);

  return container;
}
