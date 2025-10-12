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
  domElement,
  render,
}: {
  polylines: Polylines;
  gridInput: GridInput;
  camera: THREE.Camera;
  domElement: HTMLCanvasElement;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

  /* ---- Modes ---- */
  enum Mode {
    SELECT,
    EDIT,
    DRAG,
    APPEND,
  }
  const mode = van.state<Mode>(Mode.SELECT);

  // Setup raycaster
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };
  raycaster.params.Points = { threshold: 0.2 };
  domElement.addEventListener("pointermove", (e: PointerEvent) => {
    const rect = domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
  });

  // Set Edit mode
  const editPolyline = van.state<number | null>(null);
  domElement.addEventListener("pointerup", (e: PointerEvent) => {
    if (e.button !== 0) return; // avoid right-click

    const hits = raycaster.intersectObject(lines, false);
    if (!hits.length) return;

    mode.val = Mode.EDIT;
    editPolyline.val = hits[0].object.userData.polyline;
  });

  // Set Append mode
  domElement.addEventListener("pointerup", (e: PointerEvent) => {
    if (e.button !== 0) return; // avoid right-click

    if (mode.val !== Mode.EDIT) return;

    const hits = raycaster.intersectObject(points, false);
    if (hits.length) mode.val = Mode.APPEND;
  });

  // Set Drag mode
  let pointerdown = false;
  let previousMode: Mode = mode.val;
  domElement.addEventListener("pointerdown", () => {
    previousMode = mode.val;
    pointerdown = true;
  });
  domElement.addEventListener("pointermove", () => {
    if (!pointerdown) return;
    mode.val = Mode.DRAG;
  });
  domElement.addEventListener("pointerup", () => {
    if (mode.val === Mode.DRAG) mode.val = previousMode;
    pointerdown = false;
  });

  // Revert back to edit or select modes
  domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();

    if (mode.val === Mode.APPEND) mode.val = Mode.EDIT;
    else mode.val = Mode.SELECT;
  });

  domElement.addEventListener("pointermove", () => {
    console.log(Mode[mode.val]);
  });

  /* ---- Rendering ---- */
  const DEFAULT_COLOR = new THREE.Color("red");
  const EDIT_COLOR = new THREE.Color("yellow");

  // Render lines
  const editModes = [Mode.EDIT, Mode.APPEND, Mode.DRAG];

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
      editModes.includes(mode.val) ? EDIT_COLOR : DEFAULT_COLOR
    );

    render();
  });

  // Render points
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: EDIT_COLOR,
      size: 8,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  points.visible = false;
  group.add(points);

  van.derive(() => {
    points.visible = editModes.includes(mode.val);

    if (points.visible) {
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

  /* ---- Interactions ---- */
  // Show active color when hovering
  domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (mode.val !== Mode.SELECT) return;

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) lines.material.color.copy(EDIT_COLOR);
    else lines.material.color.copy(DEFAULT_COLOR);

    render();
  });

  // Deselect a polyline
  domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    if (mode.val !== Mode.EDIT) return;

    editPolyline.val = null;
  });

  // setup hitPoint
  // const hitPoint = van.state<THREE.Vector3 | null>(null);

  // const gridSize = gridInput.size.rawVal; // Todo: make it reactive when needed
  // const gridDivisions = gridInput.division.rawVal;
  // const grid = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));
  // const offset = -gridSize / 2;
  // const step = gridSize / gridDivisions;
  // const snap = (v: number) => Math.round((v - offset) / step) * step + offset;

  // renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
  //   if (editPolyline.rawVal === null) return; // only in edit mode

  //   const hits = raycaster.intersectObject(grid, false);
  //   if (hits.length) {
  //     const px = snap(hits[0].point.x);
  //     const py = snap(hits[0].point.y);
  //     const pz = snap(hits[0].point.z);
  //     const curr = hitPoint.rawVal;
  //     if (!curr || curr.x !== px || curr.y !== py || curr.z !== pz) {
  //       hitPoint.val = new THREE.Vector3(px, py, pz);
  //     }
  //   } else hitPoint.val = null;
  // });

  // // Remove point from end of branch
  // renderer.domElement.addEventListener("contextmenu", (e: MouseEvent) => {
  //   if (activePolyline.rawVal === null) return; // only in active mode

  //   const hits = raycaster.intersectObject(points, false);
  //   if (!hits.length) return;

  //   const poly = polylines.get(activePolyline.rawVal);
  //   if (!poly) return;

  //   const branch = poly.branches.rawVal[0] ?? [];
  //   const pointIdx = hits[0].index ?? null;
  //   if (pointIdx === null) return;

  //   // if point is not at the end of branch
  //   if (pointIdx !== branch.length - 1) return;

  //   const nextBranches = [...poly.branches.rawVal];
  //   nextBranches[0] = branch.slice(0, -1);
  //   poly.branches.val = nextBranches;
  // });

  /* ---- Dragging Mode ---- */

  // Setup dragPoint
  // const dragPoint = van.state<number | null>(null);
  // let pointerdown = false;
  // renderer.domElement.addEventListener("pointerdown", () => {
  //   pointerdown = true;
  // });
  // renderer.domElement.addEventListener("pointermove", () => {
  //   if (activePolyline.rawVal === null) return; // only in active mode
  //   if (!pointerdown) return;

  //   const pointHits = raycaster.intersectObject(points, false);
  //   if (pointHits.length) dragPoint.val = pointHits[0].index ?? null;
  // });
  // renderer.domElement.addEventListener("pointerup", () => {
  //   pointerdown = false;
  //   setTimeout(() => (dragPoint.val = null)); // Set append point 1st then remove drag point
  // });

  // // Drag the point
  // renderer.domElement.addEventListener("pointermove", (e: PointerEvent) => {
  //   if (dragPoint.rawVal === null) return; // only in drag mode

  //   const poly = polylines.get(activePolyline.rawVal!); // activePolyline is not null because dragPoint is not null
  //   const hp = hitPoint.rawVal;
  //   if (!poly || !hp) return;

  //   const existing = poly.points.rawVal[dragPoint.rawVal];
  //   if (
  //     !existing ||
  //     existing[0] !== hp.x ||
  //     existing[1] !== hp.y ||
  //     existing[2] !== hp.z
  //   ) {
  //     const nextPts = [...poly.points.rawVal];
  //     nextPts[dragPoint.rawVal] = [hp.x, hp.y, hp.z];
  //     poly.points.val = nextPts;
  //   }
  // });

  /* ---- Append Mode  ---- */

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
