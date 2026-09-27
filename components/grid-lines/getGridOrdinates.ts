import type { Components } from "../data-model";
import { ComponentsType } from "../data-model";
import type { GridLine, GridSystemParams } from "./data-model";

export type GridOrdinate = { id: string; ordinate: number; bubble: "start" | "end" };
export type GridOrdinates = { x: GridOrdinate[]; y: GridOrdinate[]; z: GridOrdinate[] };

// Visible lines of every grid system, per axis, sorted by ordinate. Lines at the
// same ordinate collapse into the first one so systems can overlap harmlessly.
// Shared by the viewer's drawing and by snapping, so they cannot disagree.
export function getGridOrdinates(components: Components["val"]): GridOrdinates {
  const result: GridOrdinates = { x: [], y: [], z: [] };

  for (const entry of components.get(ComponentsType.GRID_LINES) ?? []) {
    const params = entry.params as Partial<GridSystemParams> | undefined;

    for (const axis of ["x", "y", "z"] as const)
      for (const line of (params?.[axis] ?? []) as GridLine[])
        if (line.visible && Number.isFinite(line.ordinate))
          result[axis].push({
            id: line.id,
            ordinate: line.ordinate,
            bubble: line.bubble,
          });
  }

  for (const axis of ["x", "y", "z"] as const)
    result[axis] = result[axis]
      .sort((a, b) => a.ordinate - b.ordinate)
      .filter((l, i, all) => i === 0 || l.ordinate !== all[i - 1].ordinate);

  return result;
}
