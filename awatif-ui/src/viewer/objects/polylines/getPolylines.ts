import * as THREE from "three";
import { State } from "vanjs-core";
import { GridInput } from "../grid/getGrid";

export type Polylines = {
  points?: State<[number, number, number][]>;
};

export function getPolylines({
  polylines,
  gridInput,
  camera,
  renderer,
  render,
}: {
  polylines: Polylines;
  gridInput: GridInput;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  render: () => void;
}): THREE.Group {
  // Init
  const group = new THREE.Group();
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
  group.add(marker);

  // Events
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(grid, false);
    if (hits.length) {
      const hitPoint = hits[0].point;
      const snap = (v: number) =>
        Math.round((v - offset) / step) * step + offset;
      const roundedPoint = new THREE.Vector3(
        snap(hitPoint.x),
        snap(hitPoint.y),
        hitPoint.z
      );

      marker.position.copy(roundedPoint);
      marker.visible = true;
      console.log(roundedPoint);
    } else {
      marker.visible = false;
    }

    render();
  });

  return group;
}
