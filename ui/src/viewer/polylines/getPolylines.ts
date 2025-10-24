import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Grid } from "../grid/getGrid";

export type Polylines = Map<
  number,
  {
    points: State<number[][]>;
    segments: State<number[][]>;
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

  van.derive(() => {
    const points = polylines.get(0)?.points.val ?? [];
    const segments = polylines.get(0)?.segments.val ?? [];

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        segments
          .map(([n1, n2]) => [points[n1], points[n2]])
          .flat()
          .flat(),
        3
      )
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
      const polyPoints = polylines.get(0)?.points.val ?? [];
      points.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(polyPoints.flat(), 3)
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

  // Set modes
  let editPolyline: number | null = null;
  let dragPoint: number | null = null;
  let appendPoint: number | null = null;
  let pointerdown = false;
  domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.button !== 0) return; // avoid right-click

    if (mode.val !== Mode.EDIT) return;

    const hits = raycaster.intersectObject(points, false);
    if (!hits.length) return;

    pointerdown = true;
    dragPoint = hits[0].index ?? null;
  });

  domElement.addEventListener("pointermove", () => {
    if (!pointerdown) return;

    if (mode.val !== Mode.EDIT) return;

    const hits = raycaster.intersectObject(points, false);
    if (hits.length) return;

    mode.val = Mode.DRAG;
  });

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
      if (pointHits.length) {
        mode.val = Mode.APPEND;
        appendPoint = pointHits[0].index ?? null;
      }
    } else if (mode.val === Mode.DRAG) {
      mode.val = Mode.EDIT;
      dragPoint = null;
    }

    pointerdown = false;
  });

  domElement.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();

    if (raycaster.intersectObject(points, false).length) return; // reserved for removing points

    if (mode.val === Mode.APPEND) {
      mode.val = Mode.EDIT;
    } else {
      mode.val = Mode.SELECT;
      editPolyline = null;
    }

    appendPoint = null;
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

  // remove point
  domElement.addEventListener("contextmenu", (e: PointerEvent) => {
    e.preventDefault();
    if (mode.val !== Mode.EDIT) return;

    const hits = raycaster.intersectObject(points, false);
    if (!hits.length) return;

    const polyline = polylines.get(editPolyline!);
    if (!polyline) return;

    const polyPoints = polyline.points.rawVal;
    const segments = polyline.segments.rawVal;

    const i = hits[0].index ?? null;
    if (i === null) return;

    const newPoints = polyPoints.filter((_, idx) => idx !== i);
    const newSegments = segments
      .filter(([a, b]) => a !== i && b !== i)
      .map(
        ([a, b]) => [a > i ? a - 1 : a, b > i ? b - 1 : b] as [number, number]
      );

    if (!newSegments.length) {
      polyline.points.val = [];
      polyline.segments.val = [];
      return;
    }

    const used = new Set<number>(newSegments.flat());
    const indexMap = new Map<number, number>();
    const compactPoints: number[][] = [];
    newPoints.forEach((p, idx) => {
      if (used.has(idx)) {
        indexMap.set(idx, compactPoints.length);
        compactPoints.push(p);
      }
    });

    polyline.points.val = compactPoints;
    polyline.segments.val = newSegments.map(([a, b]) => [
      indexMap.get(a)!,
      indexMap.get(b)!,
    ]);
  });

  /* ---- Interactions with hit points ---- */

  // Setup hitPoint
  const hitPoint = van.state<number[] | null>(null);
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
      if (!curr || curr[0] !== px || curr[1] !== py || curr[2] !== pz) {
        hitPoint.val = [px, py, pz];
      }
    } else hitPoint.val = null;
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

    polyPoints[dragPoint] = hp;
    polyline.points.val = [...polyPoints];
  });

  /* ---- Append Mode  ---- */
  // Add append marker
  const marker = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute([0, 0, 0], 3)
    ),
    new THREE.PointsMaterial({
      color: EDIT_COLOR,
      size: 8,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  marker.visible = false;
  group.add(marker);
  van.derive(() => {
    if (!hitPoint.val) return;

    marker.position.set(...(hitPoint.val as [number, number, number]));
    marker.visible = mode.val === Mode.APPEND;

    render();
  });

  // Append point
  domElement.addEventListener("pointerup", (e: PointerEvent) => {
    if (
      e.button !== 0 ||
      mode.val !== Mode.APPEND ||
      editPolyline === null ||
      appendPoint === null
    )
      return;

    const hp = hitPoint.rawVal;
    const polyline = polylines.get(editPolyline);
    if (!hp || !polyline) return;

    // If hit is exactly the same as the current append point, do nothing
    const currentPoint = polyline.points.rawVal[appendPoint];
    if (currentPoint && currentPoint.every((val, i) => val === hp[i])) return;

    // Try to find an existing point with identical coordinates to reuse its index
    const polyPoints = polyline.points.rawVal;
    const matchIndex = polyPoints.findIndex(
      (p) => p && p.every((val, i) => val === hp[i])
    );

    // Resolve the index we will connect to: reuse existing or create a new one
    let targetIndex: number;
    if (matchIndex !== -1) {
      // Reuse existing point index
      targetIndex = matchIndex;
    } else {
      // Add a new point and use its index
      const newPoints = [...polyPoints, hp];
      polyline.points.val = newPoints;
      targetIndex = newPoints.length - 1;
    }

    polyline.segments.val = [
      ...polyline.segments.rawVal,
      [appendPoint, targetIndex],
    ];

    appendPoint = targetIndex;
  });

  return group;
}
