import van from "vanjs-core";
import {
  ComponentEntry,
  Components,
  ComponentsType,
  Geometry,
} from "@awatif/components";

type Snapshot = {
  points: Map<number, [number, number, number]>;
  lines: Map<number, [number, number]>;
  components: Map<ComponentsType, ComponentEntry[]>;
};

const HISTORY_LIMIT = 50;
const COALESCE_MS = 150;

export function setupUndo({
  geometry,
  components,
}: {
  geometry: Geometry;
  components: Components;
}): void {
  const history: Snapshot[] = [];
  let applying = false;
  let pendingTimer: number | null = null;

  // Append mode creates a temporary standalone point before the first line.
  // Undo history should only keep points that are part of committed geometry.
  const snapshot = (): Snapshot => ({
    points: getCommittedPoints(geometry.points.val, geometry.lines.val),
    lines: new Map(geometry.lines.val),
    components: structuredClone(components.val),
  });

  history.push(snapshot());

  van.derive(() => {
    geometry.points.val;
    geometry.lines.val;
    components.val;

    if (applying) return;

    if (pendingTimer !== null) clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(() => {
      pendingTimer = null;
      history.push(snapshot());
      if (history.length > HISTORY_LIMIT) history.shift();
    }, COALESCE_MS);
  });

  window.addEventListener("keydown", (e) => {
    if (!(e.metaKey || e.ctrlKey) || e.key !== "z" || e.shiftKey) return;

    // Let inputs keep native text undo (e.g. component rename field).
    const target = e.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    )
      return;

    if (pendingTimer !== null) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
      history.push(snapshot());
      if (history.length > HISTORY_LIMIT) history.shift();
    }

    if (history.length < 2) return;

    e.preventDefault();
    history.pop();
    const prev = history[history.length - 1];

    applying = true;
    geometry.points.val = new Map(prev.points);
    geometry.lines.val = new Map(prev.lines);
    components.val = structuredClone(prev.components);
    queueMicrotask(() => {
      applying = false;
    });
  });
}

// Helpers
function getCommittedPoints(
  points: Map<number, [number, number, number]>,
  lines: Map<number, [number, number]>,
): Map<number, [number, number, number]> {
  const usedPointIds = new Set<number>();
  for (const [startId, endId] of lines.values()) {
    usedPointIds.add(startId);
    usedPointIds.add(endId);
  }

  const committedPoints = new Map<number, [number, number, number]>();
  for (const [pointId, point] of points) {
    if (usedPointIds.has(pointId)) {
      committedPoints.set(pointId, point);
    }
  }

  return committedPoints;
}
