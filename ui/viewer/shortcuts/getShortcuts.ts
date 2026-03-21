import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function getShortcuts({
  camera,
  controls,
  scene,
  render,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  scene: THREE.Scene;
  render: () => void;
}) {
  let lastKey = "";

  const VIEWS: Record<string, THREE.Vector3> = {
    "1": new THREE.Vector3(0, -1, 0), // Front
    "2": new THREE.Vector3(0, 0, 1), // Top
    "3": new THREE.Vector3(1, 0, 0), // Right
    "4": new THREE.Vector3(0, 1, 0), // Rear
    "5": new THREE.Vector3(0, 0, -1), // Bottom
    "6": new THREE.Vector3(-1, 0, 0), // Left
    "0": new THREE.Vector3(1, -1, 1).normalize(), // Isometric
  };

  const updateView = (direction: THREE.Vector3) => {
    const distance = camera.position.distanceTo(controls.target);
    camera.position
      .copy(direction)
      .multiplyScalar(distance)
      .add(controls.target);
    controls.update();
    render();
  };

  const fitView = () => {
    const boundingBox = new THREE.Box3();
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        boundingBox.expandByObject(child);
      }
    });

    if (boundingBox.isEmpty()) {
      boundingBox.setFromObject(scene);
    }

    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    // cameraDistance *= 1.03; // zoom out a little

    const direction = camera.position.clone().sub(controls.target).normalize();
    camera.position.copy(direction.multiplyScalar(cameraDistance).add(center));

    controls.target.copy(center);
    controls.update();
    render();
  };

  const zoom = (delta: number) => {
    const distance = camera.position.distanceTo(controls.target);
    const newDistance = distance * delta;
    const direction = camera.position.clone().sub(controls.target).normalize();
    camera.position
      .copy(direction)
      .multiplyScalar(newDistance)
      .add(controls.target);
    controls.update();
    render();
  };

  window.addEventListener("keydown", (e) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    const key = e.key.toLowerCase();

    // View shortcuts
    if (VIEWS[key]) {
      updateView(VIEWS[key]);
    }

    // Fit view "vf"
    if (lastKey === "v" && key === "f") {
      fitView();
    }

    // Zoom
    if (key === "+" || key === "=") zoom(0.8);
    if (key === "-") zoom(1.2);

    // Rotate view (Shift + Arrows)
    if (e.shiftKey && e.key.startsWith("Arrow")) {
      const ANGLE_STEP = (15 * Math.PI) / 180;
      const direction = camera.position.clone().sub(controls.target);
      const up = new THREE.Vector3(0, 0, 1);
      const right = new THREE.Vector3().crossVectors(up, direction).normalize();

      if (e.key === "ArrowLeft") direction.applyAxisAngle(up, ANGLE_STEP);
      if (e.key === "ArrowRight") direction.applyAxisAngle(up, -ANGLE_STEP);

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const polarAngle = direction.angleTo(up);
        const delta = e.key === "ArrowUp" ? -ANGLE_STEP : ANGLE_STEP;

        // Clamp polar angle to [0.001, PI - 0.001] to match OrbitControls 
        // and avoid pole weird behavior
        const newPolarAngle = Math.max(
          0.001,
          Math.min(Math.PI - 0.001, polarAngle + delta),
        );
        const effectiveDelta = newPolarAngle - polarAngle;

        // If at the pole, the 'right' vector might be zero. 
        // Pick a natural horizontal fallback from the camera.
        const rotationAxis =
          right.lengthSq() > 0
            ? right
            : new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);

        direction.applyAxisAngle(rotationAxis, effectiveDelta);
      }

      camera.position.copy(direction.add(controls.target));
      controls.update();
      render();
      e.preventDefault();
    }

    // Pan view (Arrows without Shift)
    if (!e.shiftKey && e.key.startsWith("Arrow")) {
      const distance = camera.position.distanceTo(controls.target);
      const PAN_STEP = 0.1 * distance;

      const horizontal = new THREE.Vector3().setFromMatrixColumn(
        camera.matrixWorld,
        0,
      );
      const vertical = new THREE.Vector3().setFromMatrixColumn(
        camera.matrixWorld,
        1,
      );

      const offset = new THREE.Vector3();
      if (e.key === "ArrowLeft") offset.copy(horizontal).multiplyScalar(-PAN_STEP);
      if (e.key === "ArrowRight") offset.copy(horizontal).multiplyScalar(PAN_STEP);
      if (e.key === "ArrowUp") offset.copy(vertical).multiplyScalar(PAN_STEP);
      if (e.key === "ArrowDown") offset.copy(vertical).multiplyScalar(-PAN_STEP);

      camera.position.add(offset);
      controls.target.add(offset);

      controls.update();
      render();
      e.preventDefault();
    }

    lastKey = key;
  });
}
