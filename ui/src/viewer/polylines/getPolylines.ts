import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Grid } from "../grid/getGrid";

export type Polylines = State<
  {
    points: State<number[][]>;
    segments: State<number[][]>;
  }[]
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

  /* ---- Constants ---- */
  const DEFAULT_COLOR = new THREE.Color("red");
  const EDIT_COLOR = new THREE.Color("yellow");
  const POINT_SIZE = 5;

  enum Mode {
    NEW,
    EDIT,
    DRAG,
    APPEND,
  }
  const editModes = [Mode.EDIT, Mode.APPEND, Mode.DRAG];

  /* ---- State Management ---- */
  const mode = van.state<Mode>(Mode.NEW);
  let editPolyline: number | null = null;
  let dragPoint: number | null = null;
  let appendPoint: number | null = null;
  let pointerdown = false;

  /* ---- Rendering ---- */

  // Render lines
  const linesGroup = new THREE.Group();
  group.add(linesGroup);
  van.derive(() => {
    linesGroup.clear();

    polylines.val.forEach(({ points, segments }, idx) => {
      const lines = new THREE.LineSegments(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: DEFAULT_COLOR, depthTest: false })
      );
      lines.userData.polyline = idx;
      linesGroup.add(lines);

      van.derive(() => {
        lines.geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            segments.val
              .map((seg: number[]) => [points.val[seg[0]], points.val[seg[1]]])
              .flat()
              .flat(),
            3
          )
        );
        lines.geometry.computeBoundingSphere();

        lines.material.color.copy(
          editModes.includes(mode.val) && editPolyline === idx
            ? EDIT_COLOR
            : DEFAULT_COLOR
        );

        render();
      });
    });
  });

  // Render points
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: EDIT_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  group.add(points);

  van.derive(() => {
    points.visible = editModes.includes(mode.val);

    if (points.visible && editPolyline != null) {
      const polyPoints = polylines.val[editPolyline]?.points.val ?? [];
      points.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(polyPoints.flat(), 3)
      );
      points.geometry.computeBoundingSphere();
    }

    render();
  });

  /* ---- Raycaster Setup ---- */
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };
  raycaster.params.Points = { threshold: 0.2 };

  function updatePointer(e: PointerEvent) {
    const rect = domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
  }

  /* ---- Grid & Hit Detection ---- */
  const hitPoint = van.state<number[] | null>(null);
  const gridSize = grid.size.rawVal;
  const gridDivisions = grid.division.rawVal;
  const gridObj = new THREE.Mesh(new THREE.PlaneGeometry(gridSize, gridSize));
  const offset = -gridSize / 2;
  const step = gridSize / gridDivisions;
  const snap = (v: number) => Math.round((v - offset) / step) * step + offset;

  /* ---- Mode Management & Event Handlers ---- */
  domElement.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.button !== 0) return;
    if (mode.val !== Mode.EDIT) return;

    const hits = raycaster.intersectObject(points, false);
    if (!hits.length) return;

    pointerdown = true;
    dragPoint = hits[0].index ?? null;
  });

  domElement.addEventListener("pointermove", (e: PointerEvent) => {
    updatePointer(e);

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
    if (pointerdown && mode.val === Mode.EDIT) {
      const hits = raycaster.intersectObject(points, false);
      if (!hits.length) {
        mode.val = Mode.DRAG;
      }
    }

    // Show hover effect in NEW mode
    if (mode.val === Mode.NEW) {
      const hits = raycaster.intersectObject(linesGroup);
      if (hits.length) {
        (hits[0].object as any).material!.color.copy(EDIT_COLOR);
        marker.visible = false;
      } else {
        linesGroup.children.forEach((l) =>
          (l as any).material.color.copy(DEFAULT_COLOR)
        );
        marker.visible = true;
      }
      render();
    }
  });

  domElement.addEventListener("pointerup", (e: PointerEvent) => {
    if (e.button !== 0) return;

    if (mode.val === Mode.NEW) {
      handleNewPolylineClick();
    } else if (mode.val === Mode.EDIT) {
      const pointHits = raycaster.intersectObject(points, false);
      if (pointHits.length) {
        mode.val = Mode.APPEND;
        appendPoint = pointHits[0].index ?? null;
      } else {
        const lineHits = raycaster.intersectObject(linesGroup);
        if (lineHits.length) {
          mode.val = Mode.EDIT;
          editPolyline = lineHits[0].object.userData.polyline;
        }
      }
    } else if (mode.val === Mode.DRAG) {
      mode.val = Mode.EDIT;
      dragPoint = null;
    } else if (mode.val === Mode.APPEND) {
      handleAppendPoint();
    }

    pointerdown = false;
  });

  domElement.addEventListener("contextmenu", (e: PointerEvent) => {
    e.preventDefault();

    // Remove point if right-clicking on edit point
    if (mode.val === Mode.EDIT) {
      const hits = raycaster.intersectObject(points, false);
      if (hits.length) {
        handleRemovePoint(hits[0].index ?? null);
        return;
      }
    }

    // Exit modes
    if (raycaster.intersectObject(points, false).length) return;

    if (mode.val === Mode.APPEND) {
      mode.val = Mode.EDIT;
    } else {
      mode.val = Mode.NEW;
      editPolyline = null;
    }
    appendPoint = null;
  });

  /* ---- Point Operations ---- */
  function handleRemovePoint(pointIndex: number | null) {
    if (pointIndex === null || editPolyline === null) return;

    const polyline = polylines.val[editPolyline];
    if (!polyline) return;

    const polyPoints = polyline.points.rawVal;
    const segments = polyline.segments.rawVal;

    const newPoints = polyPoints.filter((_, idx) => idx !== pointIndex);
    const newSegments = segments
      .filter(([a, b]) => a !== pointIndex && b !== pointIndex)
      .map(
        ([a, b]) =>
          [a > pointIndex ? a - 1 : a, b > pointIndex ? b - 1 : b] as [
            number,
            number
          ]
      );

    if (!newSegments.length) {
      polyline.points.val = [];
      polyline.segments.val = [];
      mode.val = Mode.NEW;
      editPolyline = null;
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
  }

  function handleAppendPoint() {
    if (editPolyline === null || appendPoint === null) return;

    const hp = hitPoint.rawVal;
    const polyline = polylines.val[editPolyline];
    if (!hp || !polyline) return;

    const currentPoint = polyline.points.rawVal[appendPoint];
    if (
      currentPoint &&
      currentPoint.every((val: number, i: number) => val === hp[i])
    )
      return;

    const polyPoints = polyline.points.rawVal;
    const matchIndex = polyPoints.findIndex(
      (p: number[]) => p && p.every((val: number, i: number) => val === hp[i])
    );

    let targetIndex: number;
    if (matchIndex !== -1) {
      targetIndex = matchIndex;
    } else {
      const newPoints = [...polyPoints, hp];
      polyline.points.val = newPoints;
      targetIndex = newPoints.length - 1;
    }

    polyline.segments.val = [
      ...polyline.segments.rawVal,
      [appendPoint, targetIndex],
    ];

    appendPoint = targetIndex;
  }

  function handleNewPolylineClick() {
    const hp = hitPoint.rawVal;
    if (!hp) return;

    const lineHits = raycaster.intersectObject(linesGroup);
    if (lineHits.length) {
      mode.val = Mode.EDIT;
      editPolyline = lineHits[0].object.userData.polyline;
      return;
    }

    const newPoints = [hp];
    const newSegments: [number, number][] = [];
    const newPolyline = {
      points: van.state(newPoints),
      segments: van.state(newSegments),
    };
    polylines.val = [...polylines.val, newPolyline];

    mode.val = Mode.APPEND;
    appendPoint = 0;
    editPolyline = polylines.val.length - 1;
  }

  // Reactive drag point update
  van.derive(() => {
    if (
      mode.val !== Mode.DRAG ||
      editPolyline === null ||
      dragPoint === null ||
      hitPoint.val === null
    )
      return;

    const hp = hitPoint.val;
    const polyline = polylines.val[editPolyline];
    if (!hp || !polyline) return;

    const polyPoints = polyline.points.rawVal;
    if (polyPoints[dragPoint].every((val: number, i: number) => val === hp[i]))
      return;

    polyPoints[dragPoint] = hp;
    polyline.points.val = [...polyPoints];
  });

  /* ---- Visual Markers ---- */
  const marker = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute([0, 0, 0], 3)
    ),
    new THREE.PointsMaterial({
      color: EDIT_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
      visible: false,
    })
  );
  group.add(marker);

  van.derive(() => {
    if (!hitPoint.val) {
      marker.material.visible = false;
      return;
    }

    marker.material.visible = mode.val === Mode.APPEND || mode.val === Mode.NEW;
    marker.position.set(...(hitPoint.val as [number, number, number]));

    render();
  });

  return group;
}
