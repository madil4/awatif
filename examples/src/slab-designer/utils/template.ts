import { html } from "lit-html";
import van, { State } from "vanjs-core";
import * as THREE from "three";

//@ts-ignore
import logo from "./awatif-logo.jpg";
//@ts-ignore
import bending_stress_image from "./clt-bending-stress.png";

export const template = ({ glulam, nodes, minMoment, result, analyzeOutputs }) => {
  const nodesNames = [...nodes.val];
  const nodeIndices = nodesNames.map((_, index) => index);
  const selectedNode = van.state(nodeIndices[0]);

  const maxEtas = result.val.eta
  const maxEta = Math.max(...maxEtas);
  let index = maxEtas.indexOf(maxEta);


  return html`
    <header class="header">
      <div class="header-left">
        <p class="header-title">Report</p>
        <a href="https://awatif.co" class="header-link" target="_blank">https://awatif.co</a>
      </div>
      <div class="header-right">
        <img src="${logo}" id="headerLogo" alt="Logo" />
      </div>
    </header>

    <br/>
    <h1>Cross-Laminated Timber (CLT)</h1>
    <p class="caption">EN 1995-1-1: 2004</p>

    <br/>
    <h2>Bending Design</h2>
    <p class="caption">EN 1995-1-1: 2004</p>
    <p class="p1">The following shows the results of the maximum node.</p>

    <h3>Summary Table</h3>
    <table>
      <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Unit</th>
      </tr>
      <tr>
        <td>Slab Height</td>
        <td>${result.val.slabHeight}</td>
        <td>mm</td>
      </tr>
      <tr>
        <td>Moment of Inertia</td>
        <td>${result.val.inertia.toFixed(0)}</td>
        <td>mm⁴</td>
      </tr>
      <tr>
        <td>Bending Moment</td>
        <td>${minMoment.val.toFixed(1)}</td>
        <td>kNm</td>
      </tr>
      <tr>
        <td>Bending Stress</td>
        <td>${result.val.bendingStressMax.toFixed(1)}</td>
        <td>N/mm²</td>
      </tr>
      <tr>
        <td>Bending Resistance</td>
        <td>${result.val.f_md.toFixed(1)}</td>
        <td>N/mm²</td>
      </tr>
      <tr>
        <td>Maximum Utilization Ratio</td>
        <td>${(result.val.etaMax * 100).toFixed(0)}</td>
        <td>%</td>
      </tr>
    </table>

    <br/>

    <h3>Bending Stress Layout Table</h3>
    <table>
      <tr>
        <th>Layer</th>
        <th>z-Coordinate</th>
        <th>Bending Stress</th>
        <th>Utilization Ratio</th>
      </tr>
      <tbody id="stressTable">
        ${result.val.bendingStress.map((stress, i) => html`
          <tr>
            <td>Layer ${i + 1}</td>
            <td>${result.val.zCordsFromMid[i]} mm</td>
            <td>${stress.toFixed(2)} N/mm²</td>
            <td>${(result.val.eta[i] * 100).toFixed(0)}%</td>
          </tr>
        `)}
      </tbody>
    </table>

    <br/><br/>

    <h3>Structural Sketch</h3>
    <canvas id="threeCanvas" width="600" height="400" style="border:1px solid #ccc;"></canvas>

    <br/><br/>
  `;
};

export const setupThreeCanvas = () => {
  const canvas = document.getElementById('threeCanvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error("Canvas not found!");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-400, 400, 300, -300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0xffffff); // white background
  renderer.setSize(canvas.width, canvas.height);

  camera.position.z = 500;

  // Load the image as a texture
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(bending_stress_image, (texture) => {
    // Optional: Avoid filtering artifacts
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const aspectRatio = texture.image.width / texture.image.height;
    const height = 300; // Adjust to fit your canvas
    const width = height * aspectRatio;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: false, // set to true only if image has alpha
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0); // Center in canvas
    scene.add(plane);

    drawText("CLT Bending Stress", new THREE.Vector3(-220, 200, 0), scene);
    drawText("Layer 1", new THREE.Vector3(70, 85, 0), scene);
    drawText("Layer 2", new THREE.Vector3(70, 35, 0), scene);
    drawText("Layer 3", new THREE.Vector3(70, -15, 0), scene);
    drawText("Layer 4", new THREE.Vector3(70, -65, 0), scene);
    drawText("Layer 5", new THREE.Vector3(70, -115, 0), scene);



    renderer.render(scene, camera);
  });
};


export const drawText = (
  text: string,
  position: THREE.Vector3,
  scene: THREE.Scene,
  fontSize = 36,
  color = "#000000"
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const scale = window.devicePixelRatio || 1;

  // Canvas size
  canvas.width = 512 * scale;
  canvas.height = 128 * scale;

  context.scale(scale, scale);
  context.font = `${fontSize}px Arial`;
  context.fillStyle = color;
  context.textBaseline = "top";
  context.fillText(text, 10, 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  const geometry = new THREE.PlaneGeometry(250, 60);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);

  scene.add(mesh);
};
