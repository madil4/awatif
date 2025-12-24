import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Grid } from "../grid/getGrid";

export type Geometry = {
  points: State<number[][]>;
  lines: State<number[][]>;
  visible: State<boolean>;
};

export function getGeometry({
  geometry,
  grid,
  camera,
  rendererElm: domElement,
  render,
}: {
  geometry: Geometry;
  grid: Grid;
  camera: THREE.Camera;
  rendererElm: HTMLCanvasElement;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

  /* ---- Constants ---- */
  const GEOMETRY_COLOR = new THREE.Color("yellow");
  const POINT_SIZE = 7;

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
    new THREE.LineBasicMaterial({ color: GEOMETRY_COLOR, depthTest: false })
  );
  lines.renderOrder = 3; // Ensure geometry lines render on top of mesh
  group.add(lines);
  van.derive(() => {
    if (!geometry.visible.val) return;

    const lineIndices = geometry.lines.val;
    const geometryPoints = geometry.points.val;
    const positions: number[] = [];

    lineIndices.forEach(([startIndex, endIndex]) => {
      const start = geometryPoints[startIndex];
      const end = geometryPoints[endIndex];
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
  van.derive(() => {
    lines.visible = geometry.visible.val;

    render();
  });

  // Render points
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: GEOMETRY_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  points.renderOrder = 4; // Render geometry points on top of everything
  group.add(points);

  van.derive(() => {
    const geometryPoints = geometry.points.val.flat();
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(geometryPoints, 3)
    );
    points.geometry.computeBoundingSphere();

    render();
  });
  van.derive(() => {
    points.visible = geometry.visible.val;

    render();
  });

  /* ---- Mouse Events ---- */
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };
  raycaster.params.Points = { threshold: 0.2 };

  const hitPoint = van.state<number[] | null>(null);
  const gridObj = new THREE.Mesh(
    new THREE.PlaneGeometry(grid.size.rawVal, grid.size.rawVal)
  );
  van.derive(() => {
    const gridSize = grid.size.val;
    gridObj.geometry.dispose();
    gridObj.geometry = new THREE.PlaneGeometry(gridSize, gridSize);
  });
  const getSnapFunction = () => {
    const gridSize = grid.size.rawVal;
    const offset = -gridSize / 2;
    const step = gridSize / grid.division.rawVal;
    return (v: number) => Math.round((v - offset) / step) * step + offset;
  };

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
      const snap = getSnapFunction();
      const px = snap(gridHits[0].point.x);
      const py = snap(gridHits[0].point.y);
      const pz = 0; // Grid is in XY plane, so Z should always be 0
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
        handleNewGeometry();
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
    if (pointHits.length) {
      if (mode.val === Mode.EDIT) handleRemovePoint(pointHits[0].index ?? null);
      return;
    }

    // Exit modes
    if (pointHits.length) return;

    if (mode.val === Mode.APPEND) {
      removeOrphanAppendPoint();
      mode.val = Mode.EDIT;
    }
    appendPoint = null;
  });

  function handleRemovePoint(pointIndex: number | null) {
    if (pointIndex === null) return;

    const geometryPoints = geometry.points.rawVal;
    const geometryLines = geometry.lines.rawVal;

    if (!geometryPoints[pointIndex]) return;

    const remainingPoints = geometryPoints.filter(
      (_, idx) => idx !== pointIndex
    );
    const adjustedLines = geometryLines
      .filter(([a, b]) => a !== pointIndex && b !== pointIndex)
      .map(
        ([a, b]) =>
          [a > pointIndex ? a - 1 : a, b > pointIndex ? b - 1 : b] as [
            number,
            number,
          ]
      );

    if (!adjustedLines.length) {
      geometry.points.val = [];
      geometry.lines.val = [];
      appendPoint = null;
      mode.val = Mode.EDIT;
      return;
    }

    const used = new Set<number>(adjustedLines.flat());
    const indexMap = new Map<number, number>();
    const compactPoints: number[][] = [];
    remainingPoints.forEach((p, idx) => {
      if (used.has(idx)) {
        indexMap.set(idx, compactPoints.length);
        compactPoints.push(p);
      }
    });

    geometry.points.val = compactPoints;
    geometry.lines.val = adjustedLines.map(([a, b]) => [
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

    const geometryPoints = geometry.points.rawVal;
    const geometryLines = geometry.lines.rawVal;

    const currentPoint = geometryPoints[appendPoint];
    if (!currentPoint) return;

    if (currentPoint.every((val: number, i: number) => val === hp[i])) return;

    const matchIndex = geometryPoints.findIndex(
      (p: number[]) => p && p.every((val: number, i: number) => val === hp[i])
    );

    let targetIndex: number;
    if (matchIndex !== -1) {
      targetIndex = matchIndex;
    } else {
      geometry.points.val = [...geometryPoints, hp];
      targetIndex = geometry.points.rawVal.length - 1;
    }

    geometry.lines.val = [...geometryLines, [appendPoint, targetIndex]];

    appendPoint = targetIndex;
  }

  function handleNewGeometry() {
    const hp = hitPoint.rawVal;
    if (!hp) return;

    mode.val = Mode.APPEND;
    const existingIndex = geometry.points.rawVal.findIndex((p) =>
      p.every((val: number, i: number) => val === hp[i])
    );

    if (existingIndex !== -1) {
      appendPoint = existingIndex;
      return;
    }

    geometry.points.val = [...geometry.points.rawVal, hp];
    appendPoint = geometry.points.rawVal.length - 1;
  }

  function removeOrphanAppendPoint() {
    if (appendPoint === null) return;

    const lines = geometry.lines.rawVal;
    const isUsed = lines.some(
      ([a, b]) => a === appendPoint || b === appendPoint
    );

    if (!isUsed) {
      handleRemovePoint(appendPoint);
    }
  }

  /* ---- Reactive Updates ---- */
  // Drag point
  van.derive(() => {
    if (mode.val !== Mode.DRAG || dragPoint === null || hitPoint.val === null)
      return;

    const hp = hitPoint.val;
    const geometryPoints = geometry.points.rawVal;
    if (!hp || !geometryPoints[dragPoint]) return;

    if (
      geometryPoints[dragPoint].every((val: number, i: number) => val === hp[i])
    )
      return;

    geometryPoints[dragPoint] = hp;
    geometry.points.val = [...geometryPoints];
  });

  // Show marker
  const marker = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute([0, 0, 0], 3)
    ),
    new THREE.PointsMaterial({
      color: GEOMETRY_COLOR,
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
      color: GEOMETRY_COLOR,
      dashSize: POINT_SIZE * 0.025,
      gapSize: POINT_SIZE * 0.025,
      depthTest: false,
    })
  );
  previewLine.renderOrder = 1; // Ensure preview line renders on top of grid
  group.add(previewLine);

  van.derive(() => {
    if (mode.val !== Mode.APPEND || appendPoint === null || !hitPoint.val) {
      previewLine.visible = false;
      render();
      return;
    }

    const fromPoint = geometry.points.rawVal[appendPoint];
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
