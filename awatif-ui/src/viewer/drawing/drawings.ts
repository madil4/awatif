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
  gridInput?: GridInput;
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  render: () => void;
}): void {
  // Init
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const gridSize = gridInput?.size?.val ?? 25;
  const gridDivisions = gridInput?.division?.val ?? 20;
  const ratio = gridDivisions / gridSize;
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
      const roundedPoint = new THREE.Vector3(
        Math.round(hits[0].point.x * ratio) / ratio,
        Math.round(hits[0].point.y * ratio) / ratio,
        Math.round(hits[0].point.z * ratio) / ratio
      );

      marker.position.copy(roundedPoint);
      marker.visible = true;
    } else {
      marker.visible = false;
    }

    render();
  });
}
