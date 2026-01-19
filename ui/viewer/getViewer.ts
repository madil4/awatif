import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Geometry, Mesh, Components, templates } from "@awatif/components";
import { getGrid, Grid } from "./grid/getGrid";
import { getGeometry } from "./geometry/getGeometry";
import { getMesh } from "./mesh/getMesh";
import { getLoads } from "./loads/getLoads";
import { getSupports } from "./supports/getSupports";
import { getDesign } from "./design/getDesign";
import { getPointResults } from "./pointResult/getPointResults";
import { Display } from "../display/getDisplay";

import "./style.css";

export function getViewer({
  geometry,
  mesh,
  components,
  display,
}: {
  geometry?: Geometry;
  mesh?: Mesh;
  components?: Components;
  display?: Display;
}): HTMLDivElement {
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 6);

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
  controls.enableRotate = false;
  controls.update();
  controls.addEventListener("change", render);

  // Objects
  const grid = {
    size: display?.grid?.size ?? van.state(10),
    division: display?.grid?.division ?? van.state(20),
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
        display,
      }),
    );

  if (mesh)
    scene.add(
      getMesh({
        mesh,
        render,
        display,
      }),
    );

  if (components && geometry) {
    scene.add(
      getLoads({
        geometry,
        components,
        templates,
        render,
        display,
      }),
    );

    scene.add(
      getSupports({
        geometry,
        components,
        templates,
        render,
        display,
      }),
    );

    scene.add(
      getDesign({
        geometry,
        components,
        templates,
        render,
        display,
      }),
    );
  }

  if (mesh && display?.pointResult) {
    scene.add(
      getPointResults({
        mesh,
        display: display.pointResult,
        render,
      }),
    );
  }

  render();

  return container;
}
