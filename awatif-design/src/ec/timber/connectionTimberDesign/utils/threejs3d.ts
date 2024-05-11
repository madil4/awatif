// Import necessary modules from Three.js
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // Enable shadow mapping

/**
 * Function to set up a 3D scene with beams, dowels, and sheets
 */
export function setup3DCube(
  container: HTMLDivElement | undefined,
  node: number,
  elements: number[],
  angles: number[],
  heights: number[],
  widths: number[],
  sheetThickness: number,
  sheetNumber: number,
  fastenerPositionX: number[],
  fastenerPositionZ: number[]
): void {
  scene.clear();
  // Get the container where the 3D cube will be rendered
  if (!container) {
    console.error("Canvas container not found!");
    return;
  }

  // input
  const beamLength = 400;
  const sheetLength = 200;

  // Ensure a default size if the container has no explicit size
  const canvasWidth = container.clientWidth || 800;
  const canvasHeight = container.clientHeight || 500;

  // Create the scene and set the background color

  // Create a perspective camera for 3D projection
  const camera = new THREE.PerspectiveCamera(
    45,
    canvasWidth / canvasHeight,
    0.1,
    4000
  );

  // Create the renderer and add it to the specified container

  renderer.setSize(canvasWidth, canvasHeight);
  container.appendChild(renderer.domElement);

  // Create a group to hold all beams
  const beamGroup = new THREE.Group();
  const sheetGroup = new THREE.Group();
  const geometryGroup = new THREE.Group();

  let x0 = Math.max(...heights);
  let z0 = Math.max(...heights);
  x0 = 300;
  z0 = 300;

  const [beamBlock] = createRectangular(
    x0,
    widths[0],
    z0,
    0,
    0,
    "block",
    "yellow",
    0.2
  );
  beamGroup.add(beamBlock);

  const [sheetBlock] = createRectangular(
    x0,
    sheetThickness,
    z0,
    0,
    0,
    "block",
    "blue",
    0.5
  );
  sheetGroup.add(sheetBlock);

  // Add beams, dowels, and sheets at specific angles and positions
  angles.forEach((angle, beamIndex) => {
    const [beam] = createRectangular(
      beamLength,
      widths[beamIndex],
      heights[beamIndex],
      x0,
      z0,
      angle,
      "yellow",
      0.2
    );
    beamGroup.add(beam);

    const [sheet] = createRectangular(
      sheetLength,
      sheetThickness,
      heights[beamIndex],
      x0,
      z0,
      angle,
      "blue",
      0.5
    );
    sheetGroup.add(sheet);

    fastenerPositionX.forEach((coordinateX, dowelIndex) => {
      // Create the beams, sheets, and dowels
      const [beams, sheets, dowels] = createBeamsAndDowelsWithEndPivot(
        sheetLength,
        sheetThickness,
        "red",
        beamLength,
        heights[beamIndex],
        widths[beamIndex],
        "yellow",
        angle,
        0.2,
        8,
        widths[0],
        32,
        "black",
        THREE.MathUtils.degToRad(90),
        1,
        coordinateX,
        fastenerPositionZ[dowelIndex]
      );

      // Set the position of the dowels based on provided coordinates
      // dowels.position.set(coordinateX, 0, fastenerPositionZ[dowelIndex]);

      // Add beams, sheets, and dowels to the main group
      beamGroup.add(dowels);
    });
  });

  // const mergedSheets = BufferGeometryUtils.mergeGeometries(sheetGroup)
  // geometryGroup.add(beamGroup);
  // geometryGroup.add(sheetGroup);

  // Assuming `scene` and `group` are already created and populated with meshes:
  const material = new THREE.MeshStandardMaterial({
    color: "blue",
    metalness: 0.5,
    roughness: 0.5,
  });
  const mergedMesh = mergeGroupMeshes(sheetGroup, material);
  geometryGroup.add(mergedMesh);

  // Calculate the centroid of the group for camera positioning
  const box = new THREE.Box3().setFromObject(geometryGroup);
  const centroid = new THREE.Vector3();
  box.getCenter(centroid);

  // Align the group's centroid to the origin
  geometryGroup.position.sub(centroid);

  // Add the group to the scene
  scene.add(geometryGroup);

  // Position the camera to look directly down the x-axis from the front
  const distance = 1000; // Adjust this value to control how far away the camera is
  camera.position.set(centroid.x, centroid.y + distance, centroid.z + distance);
  camera.lookAt(centroid);

  // Add a light source that casts shadows
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 10, 5);
  light.castShadow = true;

  // Adjust the shadow properties for the light
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 20;
  light.shadow.camera.left = -10;
  light.shadow.camera.right = 10;
  light.shadow.camera.top = 10;
  light.shadow.camera.bottom = -10;

  // scene.add(light);

  // Variables to track the mouse movement and rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  // Event listeners to implement drag-to-rotate behavior
  renderer.domElement.addEventListener("mousedown", function (event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  renderer.domElement.addEventListener("mousemove", function (event) {
    if (!isDragging) return;

    // Calculate the mouse movement difference
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Update the group's rotation based on mouse movement
    geometryGroup.rotation.y += -deltaX * 0.01;
    geometryGroup.rotation.x += -deltaY * 0.01;

    // Update the previous mouse position
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  renderer.domElement.addEventListener("mouseup", function () {
    isDragging = false;
  });

  renderer.domElement.addEventListener("mouseleave", function () {
    isDragging = false;
  });

  // Animation loop
  function animate(): void {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // Start the animation
  animate();
}

function createRectangular(
  length: number,
  width: number,
  height: number,
  x0: number,
  z0: number,
  angles: any,
  color: string,
  opacity: number
): [mesh: THREE.Mesh] {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: color,
    transparent: true,
    opacity: opacity,
  });

  const box = new THREE.BoxGeometry(length, width, height);
  const mesh = new THREE.Mesh(box, material);
  const angle: any = THREE.MathUtils.degToRad(angles);
  mesh.castShadow = true;
  if (angles == "block") {
    mesh.position.set(0, 0, 0);
  } else if (angles == 0) {
    mesh.position.set(-x0 / 2 - length / 2, 0, 0);
  } else if (angles == 90) {
    mesh.rotation.y = angle;
    mesh.position.set(0, 0, z0 / 2 + length / 2);
  } else {
    mesh.rotation.y = angle;
    mesh.position.set(
      -x0 / 2 - (length / 2) * Math.cos(angle),
      0,
      z0 / 2 + (length / 2) * Math.sin(angle)
    );
  }
  // group.add(mesh);
  return [mesh];
}

function createBeamsAndDowelsWithEndPivot(
  sheetLength: number,
  sheetThickness: number,
  sheetColor: string,
  beamLength: number,
  beamHeight: number,
  beamWidth: number,
  beamColor: string,
  beamRotationAngle: number,
  beamOpacity: number,
  dowelRadius: number,
  dowelHeight: number,
  dowelSegments: number,
  dowelColor: string,
  dowelRotationAngle: number,
  dowelOpacity: number,
  coordinateX: number,
  coordinateY: number
): [dowels: THREE.Group] {
  // Create the dowels group
  const dowels = new THREE.Group();
  const dowelMaterial = new THREE.MeshStandardMaterial({
    color: dowelColor,
    transparent: true,
    opacity: dowelOpacity,
  });
  const dowelGeometry = new THREE.CylinderGeometry(
    dowelRadius,
    dowelRadius,
    dowelHeight,
    dowelSegments
  );
  const dowel = new THREE.Mesh(dowelGeometry, dowelMaterial);
  dowel.castShadow = true;
  dowel.rotation.y = -dowelRotationAngle;
  // dowel.position.set(dowelHeight / 2, 0, 0); // Center the dowel
  dowel.position.set(
    -beamLength * Math.cos(beamRotationAngle),
    0,
    -beamHeight * Math.sin(beamRotationAngle)
  ); // Align the midpoint of the beam end
  // dowel.position.set( coordinateX , 0, coordinateY ); // Align the midpoint of the beam end
  dowels.add(dowel);

  // Return all groups
  return [dowels];
}

function mergeGroupMeshesold(
  group: THREE.Group,
  material: THREE.Material
): THREE.Mesh {
  const geometries: THREE.BufferGeometry[] = [];

  // Iterate through all children in the group
  group.children.forEach((child) => {
    // Check if the child is a mesh
    if (child instanceof THREE.Mesh) {
      // Clone and apply the mesh's transformation to its geometry
      const geometry = child.geometry.clone();
      geometry.applyMatrix4(child.matrixWorld);
      geometries.push(geometry);
    }
  });

  // Merge all geometries into a single buffer geometry
  const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);

  // Create a single mesh from the merged geometry
  const mergedMesh = new THREE.Mesh(mergedGeometry, material);

  // Enable casting shadows if any mesh in the group does so
  mergedMesh.castShadow = group.children.some(
    (child) => (child as THREE.Mesh).castShadow
  );

  return mergedMesh;
}

function mergeGroupMeshes(
  group: THREE.Group,
  material: THREE.Material
): THREE.Mesh {
  const geometries: THREE.BufferGeometry[] = [];

  // Iterate through all children in the group
  group.children.forEach((child) => {
    // Check if the child is a mesh and has a valid geometry
    if (child instanceof THREE.Mesh && child.geometry) {
      // Clone and apply the mesh's transformation to its geometry
      const geometry = child.geometry.clone();
      geometry.applyMatrix4(child.matrixWorld); // Apply the mesh's transformation
      geometries.push(geometry);
    }
  });

  // Verify that geometries have been correctly collected
  if (geometries.length === 0) {
    console.warn("No valid geometries found for merging.");
    return new THREE.Mesh(); // Return an empty mesh as a fallback
  }

  // Merge all geometries into a single buffer geometry
  const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);

  // Create a single mesh from the merged geometry
  const mergedMesh = new THREE.Mesh(mergedGeometry, material);

  // Enable casting shadows if any mesh in the group does so
  mergedMesh.castShadow = group.children.some(
    (child) => (child as THREE.Mesh).castShadow
  );

  return mergedMesh;
}
