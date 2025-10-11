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

  // Render lines
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: DEFAULT_COLOR, depthTest: false })
  );
  lines.userData.polyline = 0;
  group.add(lines);
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

  // Render points
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
  raycaster.params.Points = { threshold: 0.2 };
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
  });

  // setup hitPoint
  const hitPoint = van.state<THREE.Vector3 | null>(null);

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
      const curr = hitPoint.rawVal;
      if (!curr || curr.x !== px || curr.y !== py || curr.z !== pz) {
        hitPoint.val = new THREE.Vector3(px, py, pz);
      }
    } else hitPoint.val = null;
  });

  /* ---- Non-Active Mode ---- */

  // Trigger active mode
  renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    if (activePolyline.val !== null) return; // only in non-active mode

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) activePolyline.val = hits[0].object.userData.polyline;
  });

  // Show active color when hovering
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (activePolyline.val != null) return; // only in non-active mode

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) lines.material.color.copy(ACTIVE_COLOR);
    else lines.material.color.copy(DEFAULT_COLOR);

    render();
  });

  /* ---- Active Mode ---- */

  // Trigger non-active mode
  renderer.domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();
    activePolyline.val = null;
  });

  /* ---- Dragging Mode ---- */

  // Setup dragPoint
  const dragPoint = van.state<number | null>(null);
  let pointerdown = false;
  renderer.domElement.addEventListener("pointerdown", () => {
    pointerdown = true;
  });
  renderer.domElement.addEventListener("pointermove", () => {
    if (activePolyline.val === null) return; // only in active mode
    if (!pointerdown) return;

    const pointHits = raycaster.intersectObject(points, false);
    if (pointHits.length) dragPoint.val = pointHits[0].index ?? null;
  });
  renderer.domElement.addEventListener("pointerup", () => {
    pointerdown = false;
    dragPoint.val = null;
  });

  // Drag the point
  renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (dragPoint.rawVal === null) return; // only in drag mode

    const poly = polylines.get(activePolyline.rawVal!); // activePolyline is not null because dragPoint is not null
    const hp = hitPoint.rawVal;
    if (!poly || !hp) return;

    const existing = poly.points.rawVal[dragPoint.rawVal];
    if (
      !existing ||
      existing[0] !== hp.x ||
      existing[1] !== hp.y ||
      existing[2] !== hp.z
    ) {
      const nextPts = [...poly.points.rawVal];
      nextPts[dragPoint.rawVal] = [hp.x, hp.y, hp.z];
      poly.points.val = nextPts;
    }
  });

  /* ---- Append Mode  ---- */

  // // Setup appendMode
  // const appendMode = van.state<number | null>(null);
  // renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
  //   if (activePolyline.val === null) return; // only in edit mode

  //   const pointHits = raycaster.intersectObject(points, false);
  //   if (pointHits.length) appendMode.val = pointHits[0].index ?? null;
  // });

  // // Add marker
  // const marker = new THREE.Points(
  //   new THREE.BufferGeometry().setAttribute(
  //     "position",
  //     new THREE.Float32BufferAttribute([0, 0, 0], 3)
  //   ),
  //   new THREE.PointsMaterial({
  //     color: ACTIVE_COLOR,
  //     size: 8,
  //     sizeAttenuation: false,
  //     depthTest: false,
  //   })
  // );
  // marker.visible = false;
  // group.add(marker);
  // van.derive(() => {
  //   if (!hitPoint.val) return;

  //   marker.position.copy(hitPoint.val);
  //   marker.visible = appendMode.val !== null;

  //   render();
  // });

  // // Add a new point without branching
  // renderer.domElement.addEventListener("pointerdown", (e: PointerEvent) => {
  //   if (appendMode.val === null || activePolyline.val === null) return; // only in append mode
  //   if (e.button !== 0 || e.ctrlKey) return; // avoid right-click and ctrl+click

  //   const poly = polylines.get(activePolyline.val);
  //   const hp = hitPoint.rawVal;
  //   if (!poly || !hp) return;

  //   const branch = poly.branches.rawVal[0] ?? [];

  //   poly.points.val = [...poly.points.rawVal, [hp.x, hp.y, hp.z]];

  //   const nextBranches = [...poly.branches.rawVal];
  //   nextBranches[0] = [...branch, poly.points.rawVal.length - 1];
  //   poly.branches.val = nextBranches;
  // });

  return group;
}
