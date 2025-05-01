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

import "./styles.css";

import Stats from 'three/examples/jsm/libs/stats.module.js';

// Create stats panel
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// Style the stats panel
stats.dom.style.position = 'fixed';
stats.dom.style.top = '0';
stats.dom.style.right = '50px';
stats.dom.style.left = 'auto';
stats.dom.style.bottom = 'auto';
stats.dom.style.zIndex = '1000';
document.body.appendChild(stats.dom);


const vertexShaderStr = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vBarycentric;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);
  
  // Generate barycentric coordinates
  vBarycentric = vec3(1.0, 0.0, 0.0); // Default for first vertex
  #ifdef USE_BARYCENTRIC
      if (gl_VertexID % 3 == 1) vBarycentric = vec3(0.0, 1.0, 0.0);
      if (gl_VertexID % 3 == 2) vBarycentric = vec3(0.0, 0.0, 1.0);
  #endif

  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShaderStr = `
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 sideColor;
uniform vec3 edgeColor; // New: Color for edges
uniform float edgeThreshold; // Controls edge sensitivity (0.1-0.3)
uniform float edgeWidth; // Normalized width (0.001-0.01)
uniform float ringScale;
uniform float grainScale;
uniform float noiseScale;
uniform float roughness;
uniform vec3 lightDirection;

// Camera-based detection
uniform vec3 camPosition;
varying vec3 vWorldPosition;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vBarycentric; // Add this to your vertex shader

// Classic Perlin 3D Noise by Stefan Gustavson
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.7-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

 void main() {
    // Calculate screen-space derivatives
    vec2 dx = dFdx(vUv);
    vec2 dy = dFdy(vUv);
    float edge = length(vec2(dx.x, dy.x)) + length(vec2(dx.y, dy.y));
    edge = smoothstep(edgeWidth * 5.0, edgeWidth, edge);
    
    // if (edge > 0.0) {
    //   gl_FragColor = vec4(edgeColor, 1.0);
    //   return;
    // }

    // Determine if this is a top/bottom face (Y-axis normal)
    float isTopBottom = abs(normalize(vNormal).y);
    
    // Only show wood pattern if normal is mostly vertical (> 45°)
    if (isTopBottom > 0.7) {  // ~45 degree threshold
        // Wood grain pattern
        vec3 pos = vPosition * grainScale;
        float noise = cnoise(pos * noiseScale);
        float ringPattern = sin(pos.y * ringScale + noise * 5.0) * 0.5 + 0.5;
        ringPattern = pow(ringPattern, 3.0);
        vec3 woodColor = mix(color1, color2, ringPattern);
        woodColor += vec3(noise * 0.1);

        // Lighting calculation
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(lightDirection);
        float diff = max(dot(normal, lightDir), 0.0);
        float ambient = 0.3;
        float lighting = min(diff + ambient, 1.0);
        
        gl_FragColor = vec4(woodColor * lighting, 1.0);
    } else {
        // Solid color for sides with basic lighting
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(lightDirection);
        float diff = max(dot(normal, lightDir), 0.0) * 0.9 + 0.3; // Softer lighting
        
        // float blendFactor = smoothstep(0.6, 0.8, abs(normalize(vNormal).y));
        // vec3 finalColor = mix(sideColor, woodColor, blendFactor);
        gl_FragColor = vec4(sideColor * diff, 1.0);
    }

  }

`;

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

          shader.vertexShader = vertexShaderStr;
          shader.fragmentShader = fragmentShaderStr;
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