import * as THREE from "three";
import van, { State } from "vanjs-core";
import { GridInput } from "../grid/getGrid";

export type Polylines = Map<
  number,
  {
    points: State<number[][]>;
    branches: State<number[][]>;
  }
>;

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
  const group = new THREE.Group();
  const hitPoint = van.state<THREE.Vector3 | null>(null);
  const activePolyline = van.state<number | null>(null);

  const DEFAULT_COLOR = new THREE.Color("red");
  const ACTIVE_COLOR = new THREE.Color("yellow");
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: DEFAULT_COLOR, depthTest: false })
  );
  lines.userData.polyline = 0;
  group.add(lines);

  // Render a single polyline
  const toSegments = (branch: number[], points: number[][]) =>
    branch
      .map((_, i) =>
        i != branch.length - 1 ? [points[branch[i]], points[branch[i + 1]]] : []
      )
      .flat()
      .flat();

  van.derive(() => {
    const points = polylines.get(0)?.points.val ?? [];
    const branches = polylines.get(0)?.branches.val ?? [];
    const branch = branches[0];
    const buffer = toSegments(branch, points);
    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buffer, 3)
    );
    lines.geometry.computeBoundingSphere();

    render();
  });

  // Update hitPoint when mouse intersect grid
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };

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

  // Show active color when hovering
  raycaster.params.Line = { threshold: 0.15 };
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (activePolyline.val != null) return;

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) lines.material.color.copy(ACTIVE_COLOR);
    else lines.material.color.copy(DEFAULT_COLOR);

    render();
  });

  // Update line color based on active state
  van.derive(() => {
    const isActive = activePolyline.val !== null;
    lines.material.color.copy(isActive ? ACTIVE_COLOR : DEFAULT_COLOR);

    render();
  });

  // Add marker
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: "gray" })
  );
  marker.visible = false;
  group.add(marker);

  van.derive(() => {
    if (activePolyline.val === null) {
      marker.visible = false;
      render();
      return;
    }

    if (hitPoint.val) {
      marker.position.copy(hitPoint.val);
      marker.visible = true;
    } else marker.visible = false;

    render();
  });

  // Edit a single-branch of a single polyline: add points
  renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.button !== 0 || e.ctrlKey) return; // avoid right-click and ctrl+click
    if (activePolyline.val === null) return;

    const hp = hitPoint.rawVal;
    const poly = polylines.get(activePolyline.val);
    if (!hp || !poly) return;

    poly.points.val = [...poly.points.rawVal, [hp.x, hp.y, hp.z]];
    poly.branches.val[0] = [
      ...poly.branches.rawVal[0],
      poly.points.rawVal.length - 1,
    ];
  });

  // Select a polyline
  renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) {
      const key = hits[0].object.userData.polyline;
      if (key != undefined) activePolyline.val = key;
    }
  });

  // Deselect a polyline
  renderer.domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();
    activePolyline.val = null;
  });

  return group;
}
