import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getGrid, Grid } from "./grid/getGrid";
import { Geometry, getGeometry } from "./geometry/getGeometry";

import "./style.css";

export function getViewer({
  grid,
  geometry,
}: {
  grid?: Grid;
  geometry?: Geometry;
}): HTMLDivElement {
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

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.update();
  controls.addEventListener("change", render);

  // Objects
  grid = {
    size: grid?.size ?? van.state(10),
    division: grid?.division ?? van.state(20),
  };

  scene.add(getGrid({ grid, render }));

  if (geometry)
    scene.add(
      getGeometry({
        geometry,
        grid,
        camera,
        rendererElm: renderer.domElement,
        render,
      })
    );

  render();

  return container;
}
