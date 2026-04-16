import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Geometry } from "@awatif/components";
import { getElementLocalAxes } from "../common/getElementLocalAxes";

export function getOrientation({
  geometry,
  displayScale,
  render,
  display,
}: {
  geometry: Geometry;
  displayScale: State<number>;
  render: () => void;
  display?: { orientation: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();
  group.renderOrder = 100;

  const clearGroup = () => {
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.LineSegments || child instanceof THREE.Line) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
      group.remove(child);
    }
  };

  if (display?.orientation) {
    van.derive(() => {
      group.visible = display.orientation.val;
      render();
    });
  }

  van.derive(() => {
    clearGroup();

    if (display?.orientation && !display.orientation.val) {
      return render();
    }

    const s = displayScale.val;
    const lines = geometry.lines.val;
    const points = geometry.points.val;

    lines.forEach((line) => {
      const startPoint = points.get(line[0]);
      const endPoint = points.get(line[1]);
      if (!startPoint || !endPoint) return;

      const start = new THREE.Vector3(
        startPoint[0],
        startPoint[1],
        startPoint[2] ?? 0,
      );
      const end = new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2] ?? 0);
      const axes = getElementLocalAxes(start, end);
      if (!axes) return;

      const { localX, localY, localZ, length } = axes;
      const origin = start
        .clone()
        .add(localX.clone().multiplyScalar(length * 0.35));
      const axisLength = Math.min(0.45 * s, length * 0.28);
      const helper = new THREE.AxesHelper(axisLength);
      const rotation = new THREE.Matrix4();
      rotation.makeBasis(localX, localY, localZ);

      helper.position.copy(origin);
      helper.setRotationFromMatrix(rotation);
      helper.setColors(0xff0000, 0x00ff00, 0x0000ff);
      helper.renderOrder = 100;
      if (Array.isArray(helper.material)) {
        helper.material.forEach((material) => {
          material.depthTest = false;
        });
      } else {
        helper.material.depthTest = false;
      }

      group.add(helper);
    });

    render();
  });

  group.userData.dispose = () => {
    clearGroup();
  };

  return group;
}
