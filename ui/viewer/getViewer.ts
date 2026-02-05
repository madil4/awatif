import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Geometry,
  Mesh,
  Components,
  templates as Templates,
} from "@awatif/components";
import { getGrid } from "./grid/getGrid";
import { getGeometry } from "./geometry/getGeometry";
import { getMesh } from "./mesh/getMesh";
import { getLoads } from "./loads/getLoads";
import { getSupports } from "./supports/getSupports";
import { getDesigns } from "./designs/getDesigns";
import { getPointResults } from "./pointResult/getPointResults";
import { getLineResults } from "./lineResult/getLineResults";
import { Display } from "../display/getDisplay";

import "./style.css";

export function getViewer({
  geometry,
  mesh,
  components,
  display,
  templates,
}: {
  geometry?: Geometry;
  mesh?: Mesh;
  components?: Components;
  display?: Display;
  templates?: typeof Templates;
}): HTMLDivElement {
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

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
  controls.addEventListener("change", render);

  // Objects
  const grid = {
    size: display?.grid?.size ?? van.state(10),
    spacing: display?.grid?.spacing ?? van.state(1),
  };

  const displayScale = van.state(grid.size.rawVal / 10);
  van.derive(() => {
    displayScale.val = grid.size.val / 10;
  });

  camera.position.set(
    grid.size.rawVal / 2,
    grid.size.rawVal / 2,
    7 * (grid.size.rawVal / 10),
  );
  controls.target.set(grid.size.rawVal / 2, grid.size.rawVal / 2, 0);
  controls.update();

  scene.add(getGrid({ grid, render }));

  if (geometry)
    scene.add(
      getGeometry({
        geometry,
        grid,
        displayScale,
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

  if (components && geometry && templates) {
    scene.add(
      getLoads({
        geometry,
        components,
        templates,
        displayScale,
        render,
        display,
      }),
    );

    scene.add(
      getSupports({
        geometry,
        components,
        templates,
        displayScale,
        render,
        display,
      }),
    );

    scene.add(
      getDesigns({
        geometry,
        components,
        templates,
        displayScale,
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
        displayScale,
        render,
      }),
    );
  }

  if (mesh && display?.lineResult) {
    scene.add(
      getLineResults({
        mesh,
        display: display.lineResult,
        displayScale,
        render,
      }),
    );
  }

  render();

  return container;
}
