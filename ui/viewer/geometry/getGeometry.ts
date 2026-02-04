import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Grid } from "../grid/getGrid";
import { Geometry } from "@awatif/components";

export function getGeometry({
  geometry,
  grid,
  camera,
  rendererElm,
  render,
  display,
}: {
  geometry: Geometry;
  grid: Grid;
  camera: THREE.Camera;
  rendererElm: HTMLCanvasElement;
  render: () => void;
  display?: { geometry: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  /* ---- Constants ---- */
  const GEOMETRY_COLOR = new THREE.Color("yellow");
  const POINT_SIZE = 7;

  enum Mode {
    EDIT,
    DRAG,
    APPEND,
    SELECT,
  }

  /* ---- State Management ---- */
  const mode = van.state<Mode>(Mode.EDIT);
  let dragPoint: number | null = null; // Point ID
  let appendPoint: number | null = null; // Point ID
  let isPointerDown = false;

  // Selection box state
  let selectionStart: { x: number; y: number } | null = null;
  let selectionEnd: { x: number; y: number } | null = null;

  // Selection box DOM element
  const selectionBox = document.createElement("div");
  selectionBox.style.cssText = `
    position: fixed;
    border: 1px solid yellow;
    background: rgba(255, 255, 0, 0.1);
    pointer-events: none;
    display: none;
    z-index: 1000; // TODO:put a logical number
  `;
  document.body.appendChild(selectionBox);

  // Coordinate tooltip DOM element
  const coordTooltip = document.createElement("div");
  coordTooltip.style.cssText = `
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    pointer-events: none;
    display: none;
    z-index: 1001;
    white-space: nowrap;
  `;
  document.body.appendChild(coordTooltip);

  // Initialize nextPointId based on existing points
  const getNextPointId = () => {
    const points = geometry.points.rawVal;
    if (points.size === 0) return 1;
    return Math.max(...points.keys()) + 1;
  };
  let nextPointId = getNextPointId();

  // Initialize nextLineId based on existing lines
  const getNextLineId = () => {
    const lines = geometry.lines.rawVal;
    if (lines.size === 0) return 1;
    return Math.max(...lines.keys()) + 1;
  };
  let nextLineId = getNextLineId();

  /* ---- Rendering ---- */

  // Render lines
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: GEOMETRY_COLOR, depthTest: false }),
  );
  lines.renderOrder = 3; // Ensure geometry lines render on top of mesh
  group.add(lines);
  van.derive(() => {
    if (!display?.geometry || !display.geometry.val) return;

    const linesMap = geometry.lines.val;
    const pointsMap = geometry.points.val;
    const positions: number[] = [];

    linesMap.forEach((line) => {
      const [startId, endId] = line;
      const start = pointsMap.get(startId);
      const end = pointsMap.get(endId);
      if (start && end) {
        positions.push(...start, ...end);
      }
    });

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    lines.geometry.computeBoundingSphere();

    render();
  });
  van.derive(() => {
    if (!display?.geometry) return;
    lines.visible = display.geometry.val;

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
    }),
  );
  points.renderOrder = 4; // Render geometry points on top of everything
  group.add(points);

  van.derive(() => {
    const pointsMap = geometry.points.val;
    const flatPositions: number[] = [];
    pointsMap.forEach((point) => {
      flatPositions.push(...point);
    });
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(flatPositions, 3),
    );
    points.geometry.computeBoundingSphere();

    render();
  });
  van.derive(() => {
    if (!display?.geometry) return;
    points.visible = display.geometry.val;

    render();
  });

  // Render selected lines highlight
  const SELECTION_COLOR = new THREE.Color("cyan");
  const selectedLines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({
      color: SELECTION_COLOR,
      depthTest: false,
      linewidth: 2,
    }),
  );
  selectedLines.renderOrder = 5; // Render on top of everything
  group.add(selectedLines);

  van.derive(() => {
    const selection = geometry.selection.val;
    if (!selection || selection.lines.length === 0) {
      selectedLines.visible = false;
      render();
      return;
    }

    const linesMap = geometry.lines.rawVal;
    const pointsMap = geometry.points.rawVal;
    const positions: number[] = [];

    for (const lineId of selection.lines) {
      const line = linesMap.get(lineId);
      if (!line) continue;
      const [startId, endId] = line;
      const start = pointsMap.get(startId);
      const end = pointsMap.get(endId);
      if (start && end) {
        positions.push(...start, ...end);
      }
    }

    selectedLines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    selectedLines.geometry.computeBoundingSphere();
    selectedLines.visible = true;

    render();
  });

  // Render selected points highlight
  const selectedPoints = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: SELECTION_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
    }),
  );
  selectedPoints.renderOrder = 6; // Render on top of everything
  group.add(selectedPoints);

  van.derive(() => {
    const selection = geometry.selection.val;
    if (!selection || selection.points.length === 0) {
      selectedPoints.visible = false;
      render();
      return;
    }

    const pointsMap = geometry.points.rawVal;
    const positions: number[] = [];

    for (const pointId of selection.points) {
      const point = pointsMap.get(pointId);
      if (point) {
        positions.push(...point);
      }
    }

    selectedPoints.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    selectedPoints.geometry.computeBoundingSphere();
    selectedPoints.visible = true;

    render();
  });

  /* ---- Mouse Events ---- */
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line = { threshold: 0.15 };
  raycaster.params.Points = { threshold: 0.2 };

  const hitPoint = van.state<number[] | null>(null);
  const gridObj = new THREE.Mesh(
    new THREE.PlaneGeometry(grid.size.rawVal, grid.size.rawVal),
  );

  van.derive(() => {
    const gridSize = grid.size.val;
    gridObj.geometry.dispose();
    gridObj.geometry = new THREE.PlaneGeometry(gridSize, gridSize);
    gridObj.position.set(gridSize / 2, gridSize / 2, 0);
    gridObj.updateMatrixWorld();
  });

  const getSnapFunction = () => {
    const step = grid.spacing.rawVal;
    return (v: number) => Math.round(v / step) * step;
  };

  rendererElm.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.button !== 0) return;

    // Selection mode: only when selection is not null
    if (geometry.selection.rawVal !== null) {
      selectionStart = { x: e.clientX, y: e.clientY };
      selectionEnd = { x: e.clientX, y: e.clientY };
      isPointerDown = true;
      return;
    }

    if (mode.val !== Mode.EDIT && mode.val !== Mode.APPEND) return;

    const hits = raycaster.intersectObject(points, false);
    if (!hits.length) {
      isPointerDown = true;
      return;
    }

    isPointerDown = true;
    // Convert hit index to point ID
    const hitIndex = hits[0].index ?? null;
    if (hitIndex !== null) {
      const pointsEntries = Array.from(geometry.points.val.entries());
      if (hitIndex < pointsEntries.length) {
        dragPoint = pointsEntries[hitIndex][0]; // Get the key (ID)
      }
    }
  });

  rendererElm.addEventListener("pointermove", (e: PointerEvent) => {
    // Update pointer position
    const rect = rendererElm.getBoundingClientRect();
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

    // Handle selection box update (only when selection is not null)
    if (isPointerDown && selectionStart && geometry.selection.rawVal !== null) {
      selectionEnd = { x: e.clientX, y: e.clientY };
      mode.val = Mode.SELECT;
      updateSelectionBox();
      return;
    }

    // Handle drag mode transition
    if (isPointerDown && mode.val === Mode.EDIT) {
      const hits = raycaster.intersectObject(points, false);
      if (hits.length) {
        mode.val = Mode.DRAG;
      }
    }
  });

  function updateSelectionBox() {
    if (!selectionStart || !selectionEnd) {
      selectionBox.style.display = "none";
      return;
    }
    const left = Math.min(selectionStart.x, selectionEnd.x);
    const top = Math.min(selectionStart.y, selectionEnd.y);
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    const isAddMode = selectionEnd.x >= selectionStart.x;

    selectionBox.style.left = `${left}px`;
    selectionBox.style.top = `${top}px`;
    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;
    selectionBox.style.borderStyle = isAddMode ? "solid" : "dashed";
    selectionBox.style.display = "block";
  }

  rendererElm.addEventListener("pointerup", (e: PointerEvent) => {
    if (e.button !== 0) return;

    const pointHits = raycaster.intersectObject(points, false);

    // In Select mode, only handle selection - no editing or dragging
    if (geometry.selection.rawVal !== null) {
      handleSelection();
      selectionStart = null;
      selectionEnd = null;
      selectionBox.style.display = "none";
      mode.val = Mode.EDIT;
      isPointerDown = false;
      return;
    }

    if (mode.val === Mode.SELECT) {
      handleSelection();
      selectionStart = null;
      selectionEnd = null;
      selectionBox.style.display = "none";
      mode.val = Mode.EDIT;
    } else if (mode.val === Mode.EDIT) {
      if (pointHits.length) {
        mode.val = Mode.APPEND;
        const hitIndex = pointHits[0].index ?? null;
        if (hitIndex !== null) {
          const pointsEntries = Array.from(geometry.points.val.entries());
          if (hitIndex < pointsEntries.length) {
            appendPoint = pointsEntries[hitIndex][0]; // Get the key (ID)
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

  function toScreenCoords(point: [number, number, number]): {
    x: number;
    y: number;
  } {
    const vec = new THREE.Vector3(...point);
    vec.project(camera);
    const rect = rendererElm.getBoundingClientRect();
    return {
      x: ((vec.x + 1) / 2) * rect.width + rect.left,
      y: ((-vec.y + 1) / 2) * rect.height + rect.top,
    };
  }

  function lineIntersectsBox(
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    left: number,
    top: number,
    right: number,
    bottom: number,
  ): boolean {
    // Check if either endpoint is inside the box
    const p1InBox =
      p1.x >= left && p1.x <= right && p1.y >= top && p1.y <= bottom;
    const p2InBox =
      p2.x >= left && p2.x <= right && p2.y >= top && p2.y <= bottom;
    if (p1InBox || p2InBox) return true;

    // Check if line crosses any edge of the box
    const edges: [number, number, number, number][] = [
      [left, top, right, top], // top
      [left, bottom, right, bottom], // bottom
      [left, top, left, bottom], // left
      [right, top, right, bottom], // right
    ];

    for (const [x1, y1, x2, y2] of edges) {
      if (segmentsIntersect(p1.x, p1.y, p2.x, p2.y, x1, y1, x2, y2)) {
        return true;
      }
    }
    return false;
  }

  function segmentsIntersect(
    ax: number,
    ay: number,
    bx: number,
    by: number,
    cx: number,
    cy: number,
    dx: number,
    dy: number,
  ): boolean {
    const d = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
    if (d === 0) return false;

    const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / d;
    const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / d;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }

  function handleSelection() {
    if (!selectionStart || !selectionEnd) return;

    const left = Math.min(selectionStart.x, selectionEnd.x);
    const right = Math.max(selectionStart.x, selectionEnd.x);
    const top = Math.min(selectionStart.y, selectionEnd.y);
    const bottom = Math.max(selectionStart.y, selectionEnd.y);

    const isAddMode = selectionEnd.x >= selectionStart.x; // Left-to-right = add
    const pointsMap = geometry.points.rawVal;
    const linesMap = geometry.lines.rawVal;

    // Find points in box
    const pointsInBox: number[] = [];
    pointsMap.forEach((point, pointId) => {
      const screen = toScreenCoords(point);
      if (
        screen.x >= left &&
        screen.x <= right &&
        screen.y >= top &&
        screen.y <= bottom
      ) {
        pointsInBox.push(pointId);
      }
    });

    // Find lines in box
    const linesInBox: number[] = [];
    linesMap.forEach((line, lineId) => {
      const [startId, endId] = line;
      const start = pointsMap.get(startId);
      const end = pointsMap.get(endId);
      if (!start || !end) return;

      const startScreen = toScreenCoords(start);
      const endScreen = toScreenCoords(end);

      if (lineIntersectsBox(startScreen, endScreen, left, top, right, bottom)) {
        linesInBox.push(lineId);
      }
    });

    const currentPoints = geometry.selection.rawVal?.points ?? [];
    const currentLines = geometry.selection.rawVal?.lines ?? [];

    if (isAddMode) {
      // Add to selection
      const newPoints = [...new Set([...currentPoints, ...pointsInBox])];
      const newLines = [...new Set([...currentLines, ...linesInBox])];
      geometry.selection.val = { points: newPoints, lines: newLines };
    } else {
      // Remove from selection
      const newPoints = currentPoints.filter((id) => !pointsInBox.includes(id));
      const newLines = currentLines.filter((id) => !linesInBox.includes(id));
      geometry.selection.val = { points: newPoints, lines: newLines };
    }
  }

  rendererElm.addEventListener("contextmenu", (e: PointerEvent) => {
    e.preventDefault();

    // In Select mode, don't allow editing
    if (geometry.selection.rawVal !== null) return;

    const pointHits = raycaster.intersectObject(points, false);

    // Remove point
    if (pointHits.length) {
      if (mode.val === Mode.EDIT) {
        const hitIndex = pointHits[0].index ?? null;
        if (hitIndex !== null) {
          const pointsEntries = Array.from(geometry.points.val.entries());
          if (hitIndex < pointsEntries.length) {
            handleRemovePoint(pointsEntries[hitIndex][0]); // Get the key (ID)
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
    const linesMap = geometry.lines.rawVal;

    if (!pointsMap.has(pointId)) return;

    // Remove the point
    pointsMap.delete(pointId);

    // Filter out lines that reference this point
    const adjustedLines = new Map<number, [number, number]>();
    linesMap.forEach((line, id) => {
      if (line[0] !== pointId && line[1] !== pointId) {
        adjustedLines.set(id, line);
      }
    });

    if (adjustedLines.size === 0) {
      geometry.points.val = new Map();
      geometry.lines.val = new Map();
      appendPoint = null;
      mode.val = Mode.EDIT;
      return;
    }

    // Remove unused points
    const usedPointIds = new Set<number>();
    adjustedLines.forEach((line) => {
      usedPointIds.add(line[0]);
      usedPointIds.add(line[1]);
    });
    const compactPoints = new Map<number, [number, number, number]>();
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
    const linesMap = geometry.lines.rawVal;

    const currentPoint = pointsMap.get(appendPoint);
    if (!currentPoint) return;

    if (currentPoint.every((val: number, i: number) => val === hp[i])) return;

    // Check if a point with this position already exists
    let targetId: number | null = null;
    for (const [id, point] of pointsMap) {
      if (point.every((val: number, i: number) => val === hp[i])) {
        targetId = id;
        break;
      }
    }

    if (targetId === null) {
      // Create new point
      targetId = nextPointId++;
      const newPointsMap = new Map(pointsMap);
      newPointsMap.set(targetId, hp as [number, number, number]);
      geometry.points.val = newPointsMap;
    }

    // Create new line
    const newLineId = nextLineId++;
    const newLinesMap = new Map(linesMap);
    newLinesMap.set(newLineId, [appendPoint, targetId]);
    geometry.lines.val = newLinesMap;

    appendPoint = targetId;
  }

  function handleNewGeometry() {
    const hp = hitPoint.rawVal;
    if (!hp) return;

    mode.val = Mode.APPEND;
    const pointsMap = geometry.points.rawVal;

    // Check if a point with this position already exists
    for (const [id, point] of pointsMap) {
      if (point.every((val: number, i: number) => val === hp[i])) {
        appendPoint = id;
        return;
      }
    }

    // Create new point
    const newId = nextPointId++;
    const newPointsMap = new Map(pointsMap);
    newPointsMap.set(newId, hp as [number, number, number]);
    geometry.points.val = newPointsMap;
    appendPoint = newId;
  }

  function removeOrphanAppendPoint() {
    if (appendPoint === null) return;

    const linesMap = geometry.lines.rawVal;
    let isUsed = false;
    for (const line of linesMap.values()) {
      if (line[0] === appendPoint || line[1] === appendPoint) {
        isUsed = true;
        break;
      }
    }

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

    if (point.every((val: number, i: number) => val === hp[i])) return;

    const newPointsMap = new Map(pointsMap);
    newPointsMap.set(dragPoint, hp as [number, number, number]);
    geometry.points.val = newPointsMap;
  });

  // Show marker
  const marker = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute([0, 0, 0], 3),
    ),
    new THREE.PointsMaterial({
      color: GEOMETRY_COLOR,
      size: POINT_SIZE,
      sizeAttenuation: false,
      depthTest: false,
    }),
  );
  group.add(marker);

  van.derive(() => {
    if (!hitPoint.val || geometry.selection.val !== null) {
      marker.visible = false;
      coordTooltip.style.display = "none";
      render();
      return;
    }

    const isMarkerVisible = mode.val === Mode.APPEND || mode.val === Mode.EDIT;
    marker.visible = isMarkerVisible;
    marker.position.set(...(hitPoint.val as [number, number, number]));

    // Update coordinate tooltip
    if (isMarkerVisible) {
      const [x, y] = hitPoint.val;
      coordTooltip.textContent = `(${x.toFixed(2)}, ${y.toFixed(2)})`;

      // Position tooltip near the marker in screen space
      const vec = new THREE.Vector3(
        ...(hitPoint.val as [number, number, number]),
      );
      vec.project(camera);
      const rect = rendererElm.getBoundingClientRect();
      const screenX = ((vec.x + 1) / 2) * rect.width + rect.left;
      const screenY = ((-vec.y + 1) / 2) * rect.height + rect.top;

      coordTooltip.style.left = `${screenX + 15}px`;
      coordTooltip.style.top = `${screenY - 10}px`;
      coordTooltip.style.display = "block";
    } else {
      coordTooltip.style.display = "none";
    }

    render();
  });

  // Show preview line
  const previewLine = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineDashedMaterial({
      color: GEOMETRY_COLOR,
      dashSize: POINT_SIZE * 0.01 * 2,
      gapSize: POINT_SIZE * 0.01,
      depthTest: false,
    }),
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
      new THREE.Float32BufferAttribute([...fromPoint, ...toPoint], 3),
    );
    previewLine.computeLineDistances();
    previewLine.visible = true;

    render();
  });

  return group;
}
