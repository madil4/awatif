import * as THREE from "three";
import { State } from "vanjs-core";
import { GridInput } from "../objects/grid/getGrid";

export type DrawingInput = {
  points?: State<[number, number, number][]>;
};

export function drawing({
  drawingInput,
  gridInput,
  camera,
  scene,
  renderer,
  render,
}: {
  drawingInput: DrawingInput;
  gridInput: GridInput;
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  render: () => void;
}): void {
  // Init
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const gridSize = gridInput.size.rawVal;
  const gridDivisions = gridInput.division.rawVal;
  const step = gridSize / gridDivisions;
  const offset = -gridSize / 2;
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));

  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff5555 })
  );

  // Update
  marker.visible = false;
  scene.add(marker);

  // Events
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(grid, false);
    if (hits.length) {
      const p = hits[0].point;
      const snap = (v: number) =>
        Math.round((v - offset) / step) * step + offset;
      const roundedPoint = new THREE.Vector3(snap(p.x), snap(p.y), p.z);

      marker.position.copy(roundedPoint);
      marker.visible = true;
    } else {
      marker.visible = false;
    }

    render();
  });
}
