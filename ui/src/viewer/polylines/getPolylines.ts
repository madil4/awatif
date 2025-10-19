import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Grid } from "../grid/getGrid";

export type Polylines = Map<
  number,
  {
    points: State<number[][]>;
    branches: State<number[][]>;
  }
>;

export function getPolylines({
  polylines,
  grid,
  camera,
  domElement,
  render,
}: {
  polylines: Polylines;
  grid: Grid;
  camera: THREE.Camera;
  domElement: HTMLCanvasElement;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

  enum Mode {
    SELECT,
    EDIT,
    DRAG,
    APPEND,
  }
  const mode = van.state<Mode>(Mode.SELECT);
  const editModes = [Mode.EDIT, Mode.APPEND, Mode.DRAG];

  /* ---- Rendering ---- */
  const DEFAULT_COLOR = new THREE.Color("red");
  const EDIT_COLOR = new THREE.Color("yellow");

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

  /* ---- Set Modes ---- */

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

  // Set edit and append mode together because they depend on each other
  let editPolyline: number | null = null;
  domElement.addEventListener("pointerup", (e: PointerEvent) => {
    if (e.button !== 0) return; // avoid right-click

    if (mode.val === Mode.SELECT) {
      const lineHits = raycaster.intersectObject(lines, false);
      if (lineHits.length) {
        mode.val = Mode.EDIT;
        editPolyline = lineHits[0].object.userData.polyline;
      }
    } else if (mode.val === Mode.EDIT) {
      const pointHits = raycaster.intersectObject(points, false);
      if (pointHits.length) mode.val = Mode.APPEND;
    }
  });

  // Set Drag mode
  let pointerdown = false;
  let previousMode: Mode = mode.val;
  domElement.addEventListener("pointerdown", () => {
    previousMode = mode.val;
    pointerdown = true;
  });
  domElement.addEventListener("pointermove", () => {
    if (mode.val !== Mode.EDIT) return;
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

    if (raycaster.intersectObject(points, false).length) return; // reserved for deleting points

    if (mode.val === Mode.APPEND) mode.val = Mode.EDIT;
    else {
      mode.val = Mode.SELECT;
      editPolyline = null;
    }
  });

  /* ---- Interactions without hit points ---- */

  // Show active color when hovering
  domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (mode.val !== Mode.SELECT) return;

    const hits = raycaster.intersectObject(lines, false);
    if (hits.length) lines.material.color.copy(EDIT_COLOR);
    else lines.material.color.copy(DEFAULT_COLOR);

    render();
  });

  // Remove point from end of branch
  domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    if (mode.val !== Mode.EDIT || editPolyline === null) return;

    const hits = raycaster.intersectObject(points, false);
    if (!hits.length) return;

    const poly = polylines.get(editPolyline);
    if (!poly) return;

    const branchIdx = 0;
    const branch = poly.branches.val[branchIdx] ?? [];
    const pointIdx = hits[0].index ?? null;
    if (pointIdx === null) return;

    if (pointIdx !== branch.length - 1) return; // if point is not at the end of branch

    const newBranches = [...poly.branches.val];
    newBranches[branchIdx] = branch.slice(0, -1);
    poly.branches.val = newBranches;
  });

  /* ---- Interactions with hit points ---- */

  // Setup hitPoint
  const hitPoint = van.state<THREE.Vector3 | null>(null);
  const gridSize = grid.size.rawVal; // Todo: make it reactive when needed
  const gridDivisions = grid.division.rawVal;
  const gridObj = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));
  const offset = -gridSize / 2;
  const step = gridSize / gridDivisions;
  const snap = (v: number) => Math.round((v - offset) / step) * step + offset;
  domElement.addEventListener("pointermove", (e: PointerEvent) => {
    if (!editModes.includes(mode.val)) return;

    const hits = raycaster.intersectObject(gridObj, false);
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

  // Setup dragPoint
  let dragPoint: number | null = null;
  domElement.addEventListener("pointerdown", () => {
    if (mode.val !== Mode.EDIT) return;
    const hits = raycaster.intersectObject(points, false);
    if (hits.length) dragPoint = hits[0].index ?? null;
  });
  domElement.addEventListener("pointerup", () => {
    if (mode.val !== Mode.EDIT) return;
    dragPoint = null;
  });

  // Drag the point
  van.derive(() => {
    if (
      mode.val !== Mode.DRAG ||
      editPolyline === null ||
      dragPoint === null ||
      hitPoint.val === null
    )
      return;

    const hp = hitPoint.val;
    const polyline = polylines.get(editPolyline);
    if (!hp || !polyline) return;

    const polyPoints = polyline.points.rawVal;
    if (polyPoints[dragPoint].every((val, i) => val === hp[i])) return;

    polyPoints[dragPoint] = [hp.x, hp.y, hp.z];
    polyline.points.val = [...polyPoints];
  });

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
