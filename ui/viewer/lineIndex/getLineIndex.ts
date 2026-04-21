import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Geometry } from "@awatif/components";
import { getText } from "../text/getText";

export function getLineIndex({
  geometry,
  displayScale,
  render,
  display,
}: {
  geometry: Geometry;
  displayScale: State<number>;
  render: () => void;
  display?: { lineIndex: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  if (display?.lineIndex) {
    van.derive(() => {
      group.visible = display.lineIndex.val;
      render();
    });
  }

  van.derive(() => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const s = displayScale.val;
    const lines = geometry.lines.val;
    const points = geometry.points.val;

    lines.forEach((line, lineId) => {
      const startPoint = points.get(line[0]);
      const endPoint = points.get(line[1]);
      if (!startPoint || !endPoint) return;

      const midpoint: [number, number, number] = [
        (startPoint[0] + endPoint[0]) / 2,
        (startPoint[1] + endPoint[1]) / 2,
        (startPoint[2] + endPoint[2]) / 2,
      ];

      group.add(
        getText(`${lineId}`, midpoint, "#ffffff", 0.3 * s, {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 30,
        }),
      );
    });

    render();
  });

  return group;
}
