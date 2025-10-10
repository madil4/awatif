import * as THREE from "three";
import van, { State } from "vanjs-core";
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
  const hitPoint = van.state<THREE.Vector3 | null>(null);

  // Events: update hitPoint when mouse intersect grid
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const gridSize = gridInput.size.rawVal; // Todo: make it reactive when needed
  const gridDivisions = gridInput.division.rawVal;
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));
  const offset = -gridSize / 2;
  const step = gridSize / gridDivisions;
  const snap = (v: number) => Math.round((v - offset) / step) * step + offset;

  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(grid, false);
    if (hits.length) {
      const px = snap(hits[0].point.x);
      const py = snap(hits[0].point.y);
      const pz = snap(hits[0].point.z);
      const curr = hitPoint.rawVal;
      if (!curr || curr.x !== px || curr.y !== py || curr.z !== pz) {
        hitPoint.val = new THREE.Vector3(px, py, pz);
      }
    } else hitPoint.val = null;
  });

  // Events: add marker when hitPoint change
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff5555 })
  );
  marker.visible = false;
  group.add(marker);

  van.derive(() => {
    console.log(hitPoint.val);

    if (hitPoint.val) {
      marker.position.copy(hitPoint.val);
      marker.visible = true;
    } else marker.visible = false;

    render();
  });

  return group;
}
