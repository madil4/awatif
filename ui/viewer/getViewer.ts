import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Geometry,
  Mesh,
  Components,
  templates as Templates,
} from "@awatif/components";
import { getGrid } from "./grid/getGrid";
import { getAxes } from "./axes/getAxes";
import { getGeometry } from "./geometry/getGeometry";
import { getMesh } from "./mesh/getMesh";
import { getLoads } from "./loads/getLoads";
import { getSupports } from "./supports/getSupports";
import { getReleases } from "./releases/getReleases";
import { getLineIndex } from "./lineIndex/getLineIndex";
import { getPointIndex } from "./pointIndex/getPointIndex";
import { getOrientation } from "./orientation/getOrientation";
import { getPointResults } from "./pointResult/getPointResults";
import { getLineResults } from "./lineResult/getLineResults";
import { getExtrudeSections } from "./extrudeSections/getExtrudeSections";
import { getView2D } from "./view2D/getView2D";
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
  display: Display;
  templates?: typeof Templates;
}): HTMLDivElement {
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
  controls.enableRotate = true;
  controls.addEventListener("change", render);

  const grid = display.grid;
  const displayScale = display.displayScale;

  getView2D({
    camera,
    controls,
    display,
    render,
  });

  // Objects
  scene.add(getGrid({ grid, render }));
  scene.add(getAxes({ displayScale, render }));

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
        controls,
      }),
    );

  if (mesh) {
    scene.add(
      getMesh({
        mesh,
        render,
        display,
      }),
    );

    scene.add(
      getPointResults({
        mesh,
        display: display.pointResult,
        displayScale,
        render,
      }),
    );

    scene.add(
      getLineResults({
        mesh,
        display: display.lineResult,
        displayScale,
        render,
      }),
    );
  }

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
      getReleases({
        geometry,
        components,
        templates,
        displayScale,
        render,
        display,
      }),
    );

    scene.add(
      getLineIndex({
        geometry,
        displayScale,
        render,
        display,
      }),
    );

    scene.add(
      getPointIndex({
        geometry,
        displayScale,
        render,
        display,
      }),
    );

    scene.add(
      getOrientation({
        geometry,
        displayScale,
        render,
        display,
      }),
    );

    scene.add(
      getExtrudeSections({
        geometry,
        components,
        templates,
        display: display.extrudeSections,
        render,
      }),
    );
  }

  render();

  return container;
}
