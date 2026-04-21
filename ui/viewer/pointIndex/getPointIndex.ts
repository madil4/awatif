import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Geometry } from "@awatif/components";
import { getText } from "../text/getText";

export function getPointIndex({
  geometry,
  displayScale,
  render,
  display,
}: {
  geometry: Geometry;
  displayScale: State<number>;
  render: () => void;
  display?: { pointIndex: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  if (display?.pointIndex) {
    van.derive(() => {
      group.visible = display.pointIndex.val;
      render();
    });
  }

  van.derive(() => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const s = displayScale.val;
    const points = geometry.points.val;

    points.forEach((point, pointId) => {
      group.add(
        getText(`${pointId}`, point, "#000000", 0.3 * s, {
          backgroundColor: "rgba(255, 200, 0, 0.85)",
          borderRadius: 30,
        }),
      );
    });

    render();
  });

  return group;
}
