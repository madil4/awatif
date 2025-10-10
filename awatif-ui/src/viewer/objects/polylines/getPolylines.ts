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
  const activePolyline = van.state<number | null>(null);
  const DEFAULT_COLOR = new THREE.Color("red");
  const ACTIVE_COLOR = new THREE.Color("yellow");

  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: DEFAULT_COLOR, depthTest: false })
  );
  lines.userData.polyline = 0;
  group.add(lines);

  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: ACTIVE_COLOR,
      size: 8,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  points.visible = false;
  group.add(points);

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

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(toSegments(branches[0], points), 3)
    );
    lines.geometry.computeBoundingSphere();

    lines.material.color.copy(
      activePolyline.val !== null ? ACTIVE_COLOR : DEFAULT_COLOR
    );

    render();
  });

  // Render points for a single polyline
  van.derive(() => {
    const isActive = activePolyline.val !== null;
    points.visible = isActive;

    if (isActive) {
      const pts = polylines.get(0)?.points.val ?? [];
      const branches = polylines.get(0)?.branches.val ?? [];
      const branch = branches[0] ?? [];
      const pointBuffer = branch
        .map((idx) => pts[idx])
        .filter((p): p is number[] => Array.isArray(p))
        .flat();

      points.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(pointBuffer, 3)
      );
      points.geometry.computeBoundingSphere();
    }

    render();
  });

  // Setup raycaster
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
  });

  /* ---- Select Mode ---- */

  // Show active color when hovering
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (activePolyline.val != null) return; // only in select mode

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) lines.material.color.copy(ACTIVE_COLOR);
    else lines.material.color.copy(DEFAULT_COLOR);

    render();
  });

  // Select a polyline on click
  renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    if (activePolyline.val !== null) return; // only in select mode

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) activePolyline.val = hits[0].object.userData.polyline;
  });

  /* ---- Edit Mode ---- */

  // setup newPoint
  const newPoint = van.state<THREE.Vector3 | null>(null);

  const gridSize = gridInput.size.rawVal; // Todo: make it reactive when needed
  const gridDivisions = gridInput.division.rawVal;
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));
  const offset = -gridSize / 2;
  const step = gridSize / gridDivisions;
  const snap = (v: number) => Math.round((v - offset) / step) * step + offset;
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (activePolyline.val === null) return; // only in edit mode

    const hits = raycaster.intersectObject(grid, false);
    if (hits.length) {
      const px = snap(hits[0].point.x);
      const py = snap(hits[0].point.y);
      const pz = snap(hits[0].point.z);
      const curr = newPoint.rawVal;
      if (!curr || curr.x !== px || curr.y !== py || curr.z !== pz) {
        newPoint.val = new THREE.Vector3(px, py, pz);
      }
    } else newPoint.val = null;
  });

  // Deselect a polyline
  renderer.domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    if (activePolyline.val === null) return; // only in edit mode

    e.preventDefault();
    activePolyline.val = null;
  });

  // // Add marker
  // const marker = new THREE.Mesh(
  //   new THREE.SphereGeometry(0.1, 16, 16),
  //   new THREE.MeshBasicMaterial({ color: "gray" })
  // );
  // marker.visible = false;
  // group.add(marker);

  // van.derive(() => {
  //   if (activePolyline.val === null) {
  //     marker.visible = false;
  //     render();
  //     return;
  //   }

  //   if (hitPoint.val) {
  //     marker.position.copy(hitPoint.val);
  //     marker.visible = true;
  //   } else marker.visible = false;

  //   render();
  // });

  // // Edit a single-branch of a single polyline: add points
  // renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
  //   if (e.button !== 0 || e.ctrlKey) return; // avoid right-click and ctrl+click
  //   if (activePolyline.val === null) return;

  //   const hp = newPoint.rawVal;
  //   const poly = polylines.get(activePolyline.val);
  //   if (!hp || !poly) return;

  //   poly.points.val = [...poly.points.rawVal, [hp.x, hp.y, hp.z]];
  //   poly.branches.val[0] = [
  //     ...poly.branches.rawVal[0],
  //     poly.points.rawVal.length - 1,
  //   ];
  // });

  return group;
}
