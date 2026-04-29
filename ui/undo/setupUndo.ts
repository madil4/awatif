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

  const snapshot = (): Snapshot => ({
    points: new Map(geometry.points.val),
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
