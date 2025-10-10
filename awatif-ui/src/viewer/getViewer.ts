import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getGrid, GridInput } from "./objects/grid/getGrid";
import { Polylines, getPolylines } from "./objects/polylines/getPolylines";

import "./style.css";

export function getViewer({
  gridInput,
  polylines,
}: {
  gridInput?: GridInput;
  polylines?: Polylines;
}): HTMLDivElement {
  // Init
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  const render = () => renderer.render(scene, camera);

  const container = document.createElement("div");
  container.id = "viewer";
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.update();

  // Add objects
  gridInput = {
    size: gridInput?.size ?? van.state(10),
    division: gridInput?.division ?? van.state(10),
  };

  scene.add(getGrid({ gridInput, render }));

  if (polylines)
    scene.add(
      getPolylines({
        polylines,
        gridInput,
        camera,
        renderer,
        render,
      })
    );

  render();

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
