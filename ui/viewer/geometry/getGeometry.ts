import * as THREE from "three";
import van from "vanjs-core";
import { Grid } from "../grid/getGrid";
import { Geometry } from "@awatif/components";

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
  let dragPoint: number | null = null; // Point ID
  let appendPoint: number | null = null; // Point ID
  let isPointerDown = false;

  // Initialize nextPointId based on existing points
  const getNextPointId = () => {
    const points = geometry.points.rawVal;
    if (points.size === 0) return 1;
    return Math.max(...points.keys()) + 1;
  };
  let nextPointId = getNextPointId();

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
    const pointsMap = geometry.points.val;
    const positions: number[] = [];

    lineIndices.forEach(([startId, endId]) => {
      const start = pointsMap.get(startId);
      const end = pointsMap.get(endId);
      if (start && end) {
        positions.push(...start.position, ...end.position);
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
    const pointsMap = geometry.points.val;
    const flatPositions: number[] = [];
    pointsMap.forEach((point) => {
      flatPositions.push(...point.position);
    });
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(flatPositions, 3)
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
    // Convert hit index to point ID
    const hitIndex = hits[0].index ?? null;
    if (hitIndex !== null) {
      const pointsArray = Array.from(geometry.points.val.values());
      if (hitIndex < pointsArray.length) {
        dragPoint = pointsArray[hitIndex].id;
      }
    }
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
        const hitIndex = pointHits[0].index ?? null;
        if (hitIndex !== null) {
          const pointsArray = Array.from(geometry.points.val.values());
          if (hitIndex < pointsArray.length) {
            appendPoint = pointsArray[hitIndex].id;
          }
        }
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
      if (mode.val === Mode.EDIT) {
        const hitIndex = pointHits[0].index ?? null;
        if (hitIndex !== null) {
          const pointsArray = Array.from(geometry.points.val.values());
          if (hitIndex < pointsArray.length) {
            handleRemovePoint(pointsArray[hitIndex].id);
          }
        }
      }
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

  function handleRemovePoint(pointId: number | null) {
    if (pointId === null) return;

    const pointsMap = new Map(geometry.points.rawVal);
    const geometryLines = geometry.lines.rawVal;

    if (!pointsMap.has(pointId)) return;

    // Remove the point
    pointsMap.delete(pointId);

    // Filter out lines that reference this point
    const adjustedLines = geometryLines.filter(
      ([a, b]) => a !== pointId && b !== pointId
    );

    if (!adjustedLines.length) {
      geometry.points.val = new Map();
      geometry.lines.val = [];
      appendPoint = null;
      mode.val = Mode.EDIT;
      return;
    }

    // Remove unused points
    const usedPointIds = new Set<number>(adjustedLines.flat());
    const compactPoints = new Map<number, { id: number; position: [number, number, number] }>();
    pointsMap.forEach((point, id) => {
      if (usedPointIds.has(id)) {
        compactPoints.set(id, point);
      }
    });

    geometry.points.val = compactPoints;
    geometry.lines.val = adjustedLines;

    if (appendPoint === pointId) {
      appendPoint = null;
      mode.val = Mode.EDIT;
    }
  }

  function handleAppendPoint() {
    if (appendPoint === null) return;

    const hp = hitPoint.rawVal;
    if (!hp) return;

    const pointsMap = geometry.points.rawVal;
    const geometryLines = geometry.lines.rawVal;

    const currentPoint = pointsMap.get(appendPoint);
    if (!currentPoint) return;

    if (currentPoint.position.every((val: number, i: number) => val === hp[i])) return;

    // Check if a point with this position already exists
    let targetId: number | null = null;
    for (const [id, point] of pointsMap) {
      if (point.position.every((val: number, i: number) => val === hp[i])) {
        targetId = id;
        break;
      }
    }

    if (targetId === null) {
      // Create new point
      targetId = nextPointId++;
      const newPointsMap = new Map(pointsMap);
      newPointsMap.set(targetId, { id: targetId, position: hp as [number, number, number] });
      geometry.points.val = newPointsMap;
    }

    geometry.lines.val = [...geometryLines, [appendPoint, targetId]];

    appendPoint = targetId;
  }

  function handleNewGeometry() {
    const hp = hitPoint.rawVal;
    if (!hp) return;

    mode.val = Mode.APPEND;
    const pointsMap = geometry.points.rawVal;

    // Check if a point with this position already exists
    for (const [id, point] of pointsMap) {
      if (point.position.every((val: number, i: number) => val === hp[i])) {
        appendPoint = id;
        return;
      }
    }

    // Create new point
    const newId = nextPointId++;
    const newPointsMap = new Map(pointsMap);
    newPointsMap.set(newId, { id: newId, position: hp as [number, number, number] });
    geometry.points.val = newPointsMap;
    appendPoint = newId;
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
    const pointsMap = geometry.points.rawVal;
    const point = pointsMap.get(dragPoint);
    if (!hp || !point) return;

    if (point.position.every((val: number, i: number) => val === hp[i]))
      return;

    const newPointsMap = new Map(pointsMap);
    newPointsMap.set(dragPoint, { id: dragPoint, position: hp as [number, number, number] });
    geometry.points.val = newPointsMap;
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

    const fromPoint = geometry.points.rawVal.get(appendPoint);
    const toPoint = hitPoint.val;

    if (!fromPoint || !toPoint) {
      previewLine.visible = false;
      render();
      return;
    }

    previewLine.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([...fromPoint.position, ...toPoint], 3)
    );
    previewLine.computeLineDistances();
    previewLine.visible = true;

    render();
  });

  return group;
}
