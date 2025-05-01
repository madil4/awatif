import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Node, Mesh } from "awatif-fem";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Settings, getSettings } from "./settings/getSettings";
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
import { drawing, Drawing } from "./drawing/drawing";
// @ts-ignore
import solidsVertexShader from './shaders/solidsVertex.glsl?raw';
// @ts-ignore
import solidsFragmentShader from './shaders/solidsFragment.glsl?raw';

import "./styles.css";

import Stats from 'three/examples/jsm/libs/stats.module.js';

// Create stats panel
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
stats.dom.style.position = 'fixed';
stats.dom.style.top = '0';
stats.dom.style.right = '50px';
stats.dom.style.left = 'auto';
stats.dom.style.bottom = 'auto';
stats.dom.style.zIndex = '1000';
document.body.appendChild(stats.dom);

export type SettingsObj = {
  gridSize?: number;
  displayScale?: number;
  nodes?: boolean;
  elements?: boolean;
  nodesIndexes?: boolean;
  elementsIndexes?: boolean;
  orientations?: boolean;
  supports?: boolean;
  loads?: boolean;
  deformedShape?: boolean;
  elementResults?: string;
  nodeResults?: string;
  flipAxes?: boolean;
  solids?: boolean;
};

export function getViewer({
  mesh,
  settingsObj,
  drawingObj,
  objects3D,
  solids,
}: {
  mesh?: Mesh;
  settingsObj?: SettingsObj;
  drawingObj?: Drawing;
  objects3D?: State<THREE.Object3D[]>;
  solids?: State<THREE.Object3D[]>;
}): HTMLDivElement {
  // init
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const viewerElm = document.createElement("div");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x28292e);
  const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    2 * 1e6 // supported view till 1e6
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  const settings = getDefaultSettings(settingsObj);
  const derivedDisplayScale = van.derive(() =>
    settings.displayScale.val === 0
      ? 1
      : settings.displayScale.val > 0
      ? settings.displayScale.val
      : -1 / settings.displayScale.val
  );
  const derivedNodes = deriveNodes(mesh, settings);
  const gridObj = grid(settings.gridSize.rawVal);

  // update
  viewerElm.appendChild(getSettings(settings, mesh, solids));

  viewerElm.setAttribute("id", "viewer");
  viewerElm.appendChild(renderer.domElement);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);

  const gridSize = settings.gridSize.rawVal;
  const z2fit = gridSize * 0.5 + (gridSize * 0.5) / Math.tan(45 * 0.5);
  camera.position.set(0.5 * gridSize, 0.8 * -z2fit, 0.5 * gridSize);
  controls.target.set(0.5 * gridSize, 0.5 * gridSize, 0);
  controls.minDistance = 1;
  controls.maxDistance = z2fit * 2.5;
  controls.zoomSpeed = 10;
  controls.update();

  scene.add(gridObj, axes(settings.gridSize.rawVal, settings.flipAxes.rawVal));
  

  // Events
  // on size change
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.target?.clientWidth;
      const height = entry.target?.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      viewerRender();
    }
  });
  resizeObserver.observe(viewerElm);

  // on controls change
  controls.addEventListener("change", viewerRender);

  // on mesh or settings change: render
  van.derive(() => {
    mesh?.nodes?.val;
    mesh?.elements?.val;
    mesh?.nodeInputs?.val;
    mesh?.elementInputs?.val;
    mesh?.deformOutputs?.val;
    mesh?.analyzeOutputs?.val;

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

    setTimeout(viewerRender); // setTimeout to ensure render is called after all updates are done in that event tick
  });

  // Object's functions (Actions)
  function viewerRender() {
    renderer.render(scene, camera);
    stats.update();
  }

  // Optional inputs
  if (solids) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(30, 25, -10);
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.height = 1024;
    scene.add(light1);

    const d = 10;
    light1.shadow.camera.left = -d;
    light1.shadow.camera.right = d;
    light1.shadow.camera.top = d;
    light1.shadow.camera.bottom = -d;
    light1.shadow.camera.far = 1000;

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.color.setHSL(11, 43, 96);
    light2.position.set(-10, 0, 30);
    scene.add(light2);

    // Events: on solids change add/remove objects from the scene
    van.derive(() => {
      if (!solids?.val.length) return;

      scene.remove(...solids.oldVal);
      
      solids.rawVal.forEach( (solid) => {
        (solid.geometry as THREE.BufferGeometry).computeVertexNormals();
        solid.material.onBeforeCompile = (shader: THREE.ShaderMaterial) => {
          shader.uniforms.color1 = { value: new THREE.Color(0xF5DEB3) };//0xffe6cc
          shader.uniforms.color2 = { value: new THREE.Color(0xD2B48C) };//0x8B4513
          shader.uniforms.sideColor = { value: new THREE.Color(0xA89070) }; // Dark beige
          shader.uniforms.ringScale = { value: 17. };
          shader.uniforms.grainScale = { value: 1. };
          shader.uniforms.noiseScale = { value: .5 };
          shader.uniforms.roughness = { value: .0 };
          shader.uniforms.lightDirection = { value: new THREE.Vector3(1, 1, 10).normalize() }
          shader.uniforms.edgeColor = { value: new THREE.Color(0x000000) };
          shader.uniforms.edgeThreshold = { value: 0.1 };
          shader.uniforms.edgeWidth = { value: 0.002 };
          shader.uniforms.camPosition = { value: new THREE.Vector3().copy(camera.position)};

          shader.vertexShader = solidsVertexShader;
          shader.fragmentShader = solidsFragmentShader;
          shader.extensions = {
            derivatives: true // Required for alternative edge methods
          },
          shader.defines = {
            USE_BARYCENTRIC: true
          }
          
          // shader.transparent = false;  // Force opaque rendering
          // shader.depthWrite = true;   // Enable depth buffer writing
          // shader.depthTest = true;    // Enable depth testing
          // shader.alphaTest = 0;       // Disable alpha testing
          // shader.side = THREE.DoubleSide  // Render both sides if needed
          shader.lights = false;
        }
          
        console.log("Starting timber shader compilation..", solid.material);
        // solid.renderOrder = 10;  // Highest priority
      });

      scene.add(...solids.rawVal);

      viewerRender();
    });

    // Events: on solids settings change update visibility
    van.derive(() => {
      solids.rawVal.forEach((solid) => (solid.visible = settings.solids.val));

      viewerRender();
    });
  }

  if (objects3D) {
    // Events: on objects3D change add/remove objects from the scene
    van.derive(() => {
      if (!objects3D?.val.length) return;

      scene.remove(...objects3D.oldVal);

      scene.add(...objects3D.rawVal);

      viewerRender();
    });
  }

  if (mesh) {
    scene.add(
      nodes(settings, derivedNodes, derivedDisplayScale),
      elements(mesh, settings, derivedNodes),
      nodesIndexes(settings, derivedNodes, derivedDisplayScale),
      elementsIndexes(mesh, settings, derivedNodes, derivedDisplayScale),
      supports(mesh, settings, derivedNodes, derivedDisplayScale),
      loads(mesh, settings, derivedNodes, derivedDisplayScale),
      orientations(mesh, settings, derivedNodes, derivedDisplayScale),
      elementResults(mesh, settings, derivedNodes, derivedDisplayScale),
      nodeResults(mesh, settings, derivedNodes, derivedDisplayScale)
    );
  }

  if (drawingObj)
    drawing({
      drawingObj,
      gridObj,
      scene,
      camera,
      controls,
      gridSize,
      derivedDisplayScale,
      viewerRender,
    });

  return viewerElm;
}

// Utils
function getDefaultSettings(settingsObj: SettingsObj): Settings {
  return {
    gridSize: van.state(settingsObj?.gridSize ?? 20),
    displayScale: van.state(settingsObj?.displayScale ?? 1),
    nodes: van.state(settingsObj?.nodes ?? true),
    elements: van.state(settingsObj?.elements ?? true),
    nodesIndexes: van.state(settingsObj?.nodesIndexes ?? false),
    elementsIndexes: van.state(settingsObj?.elementsIndexes ?? false),
    orientations: van.state(settingsObj?.orientations ?? false),
    supports: van.state(settingsObj?.supports ?? true),
    loads: van.state(settingsObj?.loads ?? true),
    deformedShape: van.state(settingsObj?.deformedShape ?? false),
    elementResults: van.state(settingsObj?.elementResults ?? "none"),
    nodeResults: van.state(settingsObj?.nodeResults ?? "none"),
    flipAxes: van.state(settingsObj?.flipAxes ?? false),
    solids: van.state(settingsObj?.solids ?? true),
  };
}

function deriveNodes(
  mesh: Mesh | undefined,
  settings: Settings
): Mesh["nodes"] {
  return van.derive(() => {
    if (!settings.deformedShape.val) return mesh?.nodes?.val ?? [];

    return (
      mesh?.nodes?.val.map((node, index) => {
        const d = mesh?.deformOutputs?.val.deformations
          ?.get(index)
          ?.slice(0, 3) ?? [0, 0, 0];
        return node.map((n, i) => n + d[i]) as Node;
      }) ?? []
    );
  });
}