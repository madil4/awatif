import * as THREE from "three";
import { createRef } from "lit-html/directives/ref.js";

export const container = createRef<HTMLDivElement>();

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

let camera: THREE.PerspectiveCamera | undefined;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 500);

document.addEventListener("DOMContentLoaded", () => {
  camera = new THREE.PerspectiveCamera(75, 800 / 500, 0.1, 4000);
  camera.position.set(0, -1300, 0);

  container.value?.appendChild(renderer.domElement);
});

export function setup3DCube(
  angles: number[],
  heights: number[],
  widths: number[],
  sheetNumber: number,
  sheetLengths: number[],
  sheetThickness: number,
  fastenerPositionX: number[][],
  fastenerPositionZ: number[][]
): void {
  if (container.value?.children.length === 0)
    container.value?.appendChild(renderer.domElement);

  scene.clear();

  var axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);

  // Create a group to hold all beams
  const beamGroup = new THREE.Group();
  const sheetGroup = new THREE.Group();
  const geometryGroup = new THREE.Group();
  let sheetLength: number;
  let beamLength: number; // Declare `beamLength` outside the if-else blocks

  // loop through angles
  angles.forEach((angle, index) => {
    // parameter
    const width = widths[index];
    const height = heights[index];
    sheetLength = sheetLengths[index];
    beamLength = sheetLength;

    // calculate sheet rotation and offset
    let angleRad: number = THREE.MathUtils.degToRad(-angle);
    const setX = (sheetLength / 2) * Math.cos(angleRad);
    const setZ = (-sheetLength / 2) * Math.sin(angleRad);

    // create geometry
    // loop over sheet number
    let setY: number;
    let additionGap: number
    if (index % 2 !== 0) {
      additionGap = 200
    } else {
      additionGap = 200
    }

    for (let i = 0; i < sheetNumber; i++) {
      const [sheet] = createRectangular(
        sheetLength,
        sheetThickness,
        height - 40,
        "#3E8CA3",
        0.99,
        true
      );
      if (i == 0) {
        setY = width / 4;
      } else {
        setY = -width / 4;
      }

      sheet.rotation.y = angleRad;
      sheet.position.set(setX, setY, setZ);
      sheetGroup.add(sheet);
    }


    const [beam] = createRectangular(
      beamLength,
      width,
      height,
      "#B99B80",
      0.3,
      false
    );
    beam.rotation.y = angleRad;
    beam.position.set(setX, 0, setZ);
    beamGroup.add(beam);

    // fastener
    const dowels = new THREE.Group();
    // loop through coordinates
    fastenerPositionX[index].forEach((coordinateX, dowelIndex) => {
      // parameter
      let coordinateZ = fastenerPositionZ[index][dowelIndex];

      // Create the beams, sheets, and dowels
      const [dowel] = createDowel(6, width, 10, "#00FF00", 1);

      const angleRad: any = THREE.MathUtils.degToRad(angle);
      const rotatedXCoord =
        (coordinateX) * Math.cos(angleRad) - coordinateZ * Math.sin(angleRad);
      const rotatedYCoord =
        (coordinateX) * Math.sin(angleRad) + coordinateZ * Math.cos(angleRad);
      dowel.position.set(rotatedXCoord, 0, rotatedYCoord);
      dowels.add(dowel);
    });
    geometryGroup.add(dowels);
  });

  geometryGroup.add(beamGroup);
  geometryGroup.add(sheetGroup);
  geometryGroup.add(axesHelper);

  // Calculate the centroid of the group for camera positioning
  const box = new THREE.Box3().setFromObject(geometryGroup);
  const centroid = new THREE.Vector3();
  box.getCenter(centroid);

  // Add the group to the scene
  scene.add(geometryGroup);

  // CAMERA
  camera?.lookAt(centroid);

  // LIGHT
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, -10, 5);

  scene.add(light);

  if (camera) renderer.render(scene, camera);

  // Variables to track the mouse movement and rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  // Event listeners to implement drag-to-rotate behavior
  renderer.domElement.addEventListener("mousedown", function (event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  const updateRotation = (dx: number, dz: number): void => {
    geometryGroup.rotation.x += dz * 0.005; // Adjust multiplier for smoother rotation
    geometryGroup.rotation.z += dx * 0.005; // Ensure rotation axis is handled correctly
  };

  renderer.domElement.addEventListener("mousemove", function (event) {
    if (!isDragging) return;

    // Calculate the mouse movement difference
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Update the group's rotation based on mouse movement
    updateRotation(deltaX, deltaY); // Centralize rotation logic for reusability

    // Update the previous mouse position
    previousMousePosition = { x: event.clientX, y: event.clientY };

    if (camera) renderer.render(scene, camera);
  });

  renderer.domElement.addEventListener("mouseup", function () {
    isDragging = false;
  });

  renderer.domElement.addEventListener("mouseleave", function () {
    isDragging = false;
  });
}

// FUNCTIONS
function createRectangular(
  length: number,
  width: number,
  height: number,
  color: string,
  opacity: number,
  depthWrite: boolean
): [mesh: THREE.Mesh] {
  // Define the material with color and transparency properties
  const material = new THREE.MeshStandardMaterial({
    color: color, // Set the material color
    transparent: true, // Enable transparency of the material
    opacity: opacity, // Define the opacity level
    side: THREE.DoubleSide,
    depthWrite: depthWrite,
  });

  // Create the geometry for the rectangular prism
  const boxGeometry = new THREE.BoxGeometry(length, width, height);

  // Create the mesh using the defined geometry and material
  const rectangularMesh = new THREE.Mesh(boxGeometry, material);
  rectangularMesh.castShadow = true; // Allow the mesh to cast shadows

  // Return the mesh in a tuple, allowing for easy destructuring elsewhere in the code
  return [rectangularMesh];
}

function createDowel(
  radius: number,
  length: number,
  segments: number,
  color: string,
  opacity: number
): [THREE.Mesh] {
  // Define the material of the dowel with color and opacity properties
  const material = new THREE.MeshStandardMaterial({
    color: color, // Color in hexadecimal
    transparent: true, // Enable transparency
    opacity: opacity, // Set opacity level
  });

  // Create the geometry for the dowel as a cylinder
  const dowelGeometry = new THREE.CylinderGeometry(
    radius,
    radius,
    length,
    segments
  );

  // Create the mesh object using the geometry and material defined above
  const dowelMesh = new THREE.Mesh(dowelGeometry, material);
  dowelMesh.castShadow = true; // Enable casting shadows for this mesh

  // Return the mesh in a tuple, allowing for destructuring on receipt
  return [dowelMesh];
}