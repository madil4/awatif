import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Grid } from "../grid/getGrid";

export type Polylines = {
  points: State<number[][]>;
  segments: State<number[][]>;
};

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

  /* ---- Constants ---- */
  const POINT_SIZE = grid.size.val * 0.7;
  const POLYLINE_COLOR = new THREE.Color("yellow");

  enum Mode {
    EDIT,
    DRAG,
    APPEND,
  }

  /* ---- State Management ---- */
  const mode = van.state<Mode>(Mode.EDIT);
  let dragPoint: number | null = null;
  let appendPoint: number | null = null;
  let isPointerDown = false;

  /* ---- Rendering ---- */

  // Render lines
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: POLYLINE_COLOR, depthTest: false })
  );
  group.add(lines);
  van.derive(() => {
    const segments = polylines.segments.val;
    const polyPoints = polylines.points.val;
    const positions: number[] = [];

    segments.forEach(([startIndex, endIndex]) => {
      const start = polyPoints[startIndex];
      const end = polyPoints[endIndex];
      if (start && end) {
        positions.push(...start, ...end);
      }
    });

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    lines.geometry.computeBoundingSphere();

    render();
  });

  // Render points
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: POLYLINE_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  group.add(points);
  van.derive(() => {
    const polyPoints = polylines.points.val.flat();
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(polyPoints, 3)
    );
    points.geometry.computeBoundingSphere();

    render();
  });

  /* ---- Mouse Events ---- */
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };
  raycaster.params.Points = { threshold: 0.2 };

  const hitPoint = van.state<number[] | null>(null);
  const gridSize = grid.size.rawVal;
  const gridDivisions = grid.division.rawVal;
  const gridObj = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));
  const offset = -gridSize / 2;
  const step = gridSize / gridDivisions;
  const snap = (v: number) => Math.round((v - offset) / step) * step + offset;

  domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.button !== 0) return;
    if (mode.val !== Mode.EDIT && mode.val !== Mode.APPEND) return;

    const hits = raycaster.intersectObject(points, false);
    if (!hits.length) return;

    isPointerDown = true;
    dragPoint = hits[0].index ?? null;
  });

  domElement.addEventListener("pointermove", (e: PointerEvent) => {
    // Update pointer position
    const rect = domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);

    // Update hit point on grid
    const gridHits = raycaster.intersectObject(gridObj, false);
    if (gridHits.length) {
      const px = snap(gridHits[0].point.x);
      const py = snap(gridHits[0].point.y);
      const pz = snap(gridHits[0].point.z);
      const curr = hitPoint.rawVal;
      if (!curr || curr[0] !== px || curr[1] !== py || curr[2] !== pz) {
        hitPoint.val = [px, py, pz];
      }
    } else {
      hitPoint.val = null;
    }

    // Handle drag mode transition
    if (isPointerDown && (mode.val === Mode.EDIT || mode.val === Mode.APPEND)) {
      const hits = raycaster.intersectObject(points, false);
      if (!hits.length) {
        mode.val = Mode.DRAG;
      }
    }
  });

  domElement.addEventListener("pointerup", (e: PointerEvent) => {
    if (e.button !== 0) return;

    const pointHits = raycaster.intersectObject(points, false);

    if (mode.val === Mode.EDIT) {
      if (pointHits.length) {
        mode.val = Mode.APPEND;
        appendPoint = pointHits[0].index ?? null;
      } else {
        handleNewPolyline();
      }
    } else if (mode.val === Mode.DRAG) {
      mode.val = Mode.EDIT;
      dragPoint = null;
    } else if (mode.val === Mode.APPEND) {
      handleAppendPoint();
    }

    isPointerDown = false; // important to be at this level
  });

  domElement.addEventListener("contextmenu", (e: PointerEvent) => {
    e.preventDefault();

    const pointHits = raycaster.intersectObject(points, false);

    // Remove point
    if (mode.val === Mode.EDIT || mode.val === Mode.APPEND) {
      if (pointHits.length) {
        handleRemovePoint(pointHits[0].index ?? null);
        return;
      }
    }

    // Exit modes
    if (pointHits.length) return;

    if (mode.val === Mode.APPEND) {
      mode.val = Mode.EDIT;
    }
    appendPoint = null;
  });

  function handleRemovePoint(pointIndex: number | null) {
    if (pointIndex === null) return;

    const polyPoints = polylines.points.rawVal;
    const polySegments = polylines.segments.rawVal;

    if (!polyPoints[pointIndex]) return;

    const remainingPoints = polyPoints.filter((_, idx) => idx !== pointIndex);
    const adjustedSegments = polySegments
      .filter(([a, b]) => a !== pointIndex && b !== pointIndex)
      .map(
        ([a, b]) =>
          [a > pointIndex ? a - 1 : a, b > pointIndex ? b - 1 : b] as [
            number,
            number
          ]
      );

    if (!adjustedSegments.length) {
      polylines.points.val = [];
      polylines.segments.val = [];
      appendPoint = null;
      mode.val = Mode.EDIT;
      return;
    }

    const used = new Set<number>(adjustedSegments.flat());
    const indexMap = new Map<number, number>();
    const compactPoints: number[][] = [];
    remainingPoints.forEach((p, idx) => {
      if (used.has(idx)) {
        indexMap.set(idx, compactPoints.length);
        compactPoints.push(p);
      }
    });

    polylines.points.val = compactPoints;
    polylines.segments.val = adjustedSegments.map(([a, b]) => [
      indexMap.get(a)!,
      indexMap.get(b)!,
    ]);

    if (appendPoint !== null) {
      const adjustedAppend =
        appendPoint > pointIndex ? appendPoint - 1 : appendPoint;
      appendPoint = indexMap.get(adjustedAppend) ?? null;
      if (appendPoint === null) mode.val = Mode.EDIT;
    }
  }

  function handleAppendPoint() {
    if (appendPoint === null) return;

    const hp = hitPoint.rawVal;
    if (!hp) return;

    const polyPoints = polylines.points.rawVal;
    const polySegments = polylines.segments.rawVal;

    const currentPoint = polyPoints[appendPoint];
    if (!currentPoint) return;

    if (currentPoint.every((val: number, i: number) => val === hp[i])) return;

    const matchIndex = polyPoints.findIndex(
      (p: number[]) => p && p.every((val: number, i: number) => val === hp[i])
    );

    let targetIndex: number;
    if (matchIndex !== -1) {
      targetIndex = matchIndex;
    } else {
      polylines.points.val = [...polyPoints, hp];
      targetIndex = polylines.points.rawVal.length - 1;
    }

    polylines.segments.val = [...polySegments, [appendPoint, targetIndex]];

    appendPoint = targetIndex;
  }

  function handleNewPolyline() {
    const hp = hitPoint.rawVal;
    if (!hp) return;

    mode.val = Mode.APPEND;
    const existingIndex = polylines.points.rawVal.findIndex((p) =>
      p.every((val: number, i: number) => val === hp[i])
    );

    if (existingIndex !== -1) {
      appendPoint = existingIndex;
      return;
    }

    polylines.points.val = [...polylines.points.rawVal, hp];
    appendPoint = polylines.points.rawVal.length - 1;
  }

  /* ---- Reactive Updates ---- */
  // Drag point
  van.derive(() => {
    if (mode.val !== Mode.DRAG || dragPoint === null || hitPoint.val === null)
      return;

    const hp = hitPoint.val;
    const polyPoints = polylines.points.rawVal;
    if (!hp || !polyPoints[dragPoint]) return;

    if (polyPoints[dragPoint].every((val: number, i: number) => val === hp[i]))
      return;

    polyPoints[dragPoint] = hp;
    polylines.points.val = [...polyPoints];
  });

  // Show marker
  const marker = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute([0, 0, 0], 3)
    ),
    new THREE.PointsMaterial({
      color: POLYLINE_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  group.add(marker);
  van.derive(() => {
    if (!hitPoint.val) {
      marker.visible = false;
      render();
      return;
    }

    marker.visible = mode.val === Mode.APPEND || mode.val === Mode.EDIT;
    marker.position.set(...(hitPoint.val as [number, number, number]));

    render();
  });

  // Show preview line
  const previewLine = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineDashedMaterial({
      color: POLYLINE_COLOR,
      dashSize: POINT_SIZE * 0.025,
      gapSize: POINT_SIZE * 0.025,
      depthTest: false,
    })
  );
  group.add(previewLine);
  van.derive(() => {
    if (mode.val !== Mode.APPEND || appendPoint === null || !hitPoint.val) {
      previewLine.visible = false;
      render();
      return;
    }

    const fromPoint = polylines.points.rawVal[appendPoint];
    const toPoint = hitPoint.val;

    if (!fromPoint || !toPoint) {
      previewLine.visible = false;
      render();
      return;
    }

    previewLine.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([...fromPoint, ...toPoint], 3)
    );
    previewLine.computeLineDistances();
    previewLine.visible = true;

    render();
  });

  return group;
}
