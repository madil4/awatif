import * as THREE from "three";
import van, { State } from "vanjs-core";
import { getText } from "../text/getText";

export function getAxes({
  displayScale,
  render,
}: {
  displayScale: State<number>;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

  van.derive(() => {
    group.clear();

    const s = displayScale.val; // display scale, matches the rest of the viewer
    const axisLen = 0.5 * s; // 1 unit at default size=10
    const labelSize = 0.3 * s;
    const labelOffset = axisLen + 0.2 * s;

    // X-axis (red)
    const xGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(axisLen, 0, 0),
    ]);
    const xLine = new THREE.Line(
      xGeom,
      new THREE.LineBasicMaterial({ color: 0xff0000, depthTest: false }),
    );
    xLine.renderOrder = 1;
    group.add(xLine);
    group.add(getText("X", [labelOffset, 0, 0], "#ff0000", labelSize));

    // Y-axis (green)
    const yGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, axisLen, 0),
    ]);
    const yLine = new THREE.Line(
      yGeom,
      new THREE.LineBasicMaterial({ color: 0x00ff00, depthTest: false }),
    );
    yLine.renderOrder = 1;
    group.add(yLine);
    group.add(getText("Y", [0, labelOffset, 0], "#00ff00", labelSize));

    render();
  });

  return group;
}
