import * as THREE from "three";
import van, { State } from "vanjs-core";
import type { GridOrdinates } from "@awatif/components";
import { getText } from "../text/getText";

const LINE_COLOR = 0x8a8a8a;
// Extent used along an axis that has no lines of its own
const FALLBACK_RANGE: [number, number] = [0, 10];

export function getGridLines({
  gridOrdinates,
  displayScale,
  render,
  display,
}: {
  gridOrdinates: State<GridOrdinates>;
  displayScale: State<number>;
  render: () => void;
  display?: { gridLines: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  if (display?.gridLines)
    van.derive(() => {
      group.visible = display.gridLines.val;
      render();
    });

  van.derive(() => {
    group.children.forEach((child) => {
      if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    });
    group.clear();

    const s = displayScale.val;
    const { x, y, z } = gridOrdinates.val;
    const rangeOf = (lines: { ordinate: number }[]): [number, number] =>
      lines.length
        ? [lines[0].ordinate, lines[lines.length - 1].ordinate]
        : FALLBACK_RANGE;

    const [minX, maxX] = rangeOf(x);
    const [minY, maxY] = rangeOf(y);
    const [minZ, maxZ] = rangeOf(z);
    // Level lines are drawn on; a model with no named levels sits at Z = 0
    const levels = z.length ? z.map((l) => l.ordinate) : [0];
    const bubbleLevel = levels[0];

    // Distance the line runs past the model to reach its bubble
    const reach = 1 * s;
    const positions: number[] = [];
    const segment = (a: number[], b: number[]) => positions.push(...a, ...b);

    const bubble = (id: string, at: number[]) =>
      group.add(
        getText(id, at as [number, number, number], "#000000", 0.4 * s, {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 60,
        }),
      );

    // A line is drawn along `min..max`, extended at the end that carries its bubble
    const extent = (min: number, max: number, at: "start" | "end") => [
      at === "start" ? min - reach : min,
      at === "end" ? max + reach : max,
    ];

    for (const level of levels) {
      for (const line of x) {
        const [a, b] = extent(minY, maxY, line.bubble);
        segment([line.ordinate, a, level], [line.ordinate, b, level]);
        if (level === bubbleLevel)
          bubble(line.id, [
            line.ordinate,
            line.bubble === "start" ? a : b,
            level,
          ]);
      }

      for (const line of y) {
        const [a, b] = extent(minX, maxX, line.bubble);
        segment([a, line.ordinate, level], [b, line.ordinate, level]);
        if (level === bubbleLevel)
          bubble(line.id, [
            line.bubble === "start" ? a : b,
            line.ordinate,
            level,
          ]);
      }
    }

    // Levels are only distinguishable in elevation, so tie them together with
    // a vertical line through every X-Y intersection and label each level
    if (levels.length > 1) {
      for (const lx of x)
        for (const ly of y)
          segment([lx.ordinate, ly.ordinate, minZ], [lx.ordinate, ly.ordinate, maxZ]);

      for (const line of z) {
        const at = line.bubble === "start" ? minX - reach : maxX + reach;
        bubble(line.id, [at, minY, line.ordinate]);
      }
    }

    if (positions.length) {
      const geometry = new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      const lines = new THREE.LineSegments(
        geometry,
        new THREE.LineDashedMaterial({
          color: LINE_COLOR,
          dashSize: 0.3 * s,
          gapSize: 0.15 * s,
        }),
      );
      lines.computeLineDistances();
      group.add(lines);
    }

    render();
  });

  return group;
}
