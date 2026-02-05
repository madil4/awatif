import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh } from "@awatif/components";
import { getText } from "../text/getText";

export type PointResultsDisplay = "None" | "Displacements" | "Reactions";

export function getPointResults({
  mesh,
  display,
  displayScale,
  render,
}: {
  mesh: Mesh;
  display: State<PointResultsDisplay>;
  displayScale: State<number>;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

  const clearGroup = () => {
    while (group.children.length) {
      const c = group.children[0];
      if (c instanceof THREE.Sprite)
        c.material.map?.dispose(), c.material.dispose();
      if (c instanceof THREE.ArrowHelper) c.dispose();
      if (c instanceof THREE.Line) c.geometry.dispose();
      if (c instanceof THREE.Mesh) c.geometry.dispose();
      group.remove(c);
    }
  };

  van.derive(() => {
    clearGroup();
    const nodes = mesh.nodes.val;
    if (!nodes?.length) return render();

    const s = displayScale.val;

    const isDisp = display.val === "Displacements" && mesh.displacements?.val;
    const isReact = display.val === "Reactions" && mesh.reactions?.val;
    const data = isDisp
      ? mesh.displacements!.val
      : isReact
      ? mesh.reactions!.val
      : null;
    if (!data) return render();

    const color = isDisp ? 0x00ff00 : 0xff0000;
    const colorStr = isDisp ? "#00ff00" : "#ff0000";
    const coneGeom = new THREE.ConeGeometry(0.04 * s, 0.08 * s, 8);
    const mat = new THREE.MeshBasicMaterial({ color });
    const scale = (isDisp ? 1 : 0.5) * s;
    const [p1, p2] = isDisp ? ["U", "R"] : ["R", "M"];

    data.forEach((r, i) => {
      const n = nodes[i];
      if (!n) return;
      const [vx, vy, , , , rz] = r;
      const origin = new THREE.Vector3(n[0], n[1], n[2]);
      // X arrow
      if (Math.abs(vx) > 0.001) {
        const dir = new THREE.Vector3(vx > 0 ? 1 : -1, 0, 0);
        group.add(
          new THREE.ArrowHelper(
            dir,
            origin,
            Math.abs(vx * scale),
            color,
            0.08 * s,
            0.04 * s
          )
        );
        group.add(
          getText(
            `${p1}x: ${vx.toFixed(2)}`,
            [n[0] + vx * scale + (vx > 0 ? 0.15 * s : -0.15 * s), n[1], n[2]],
            colorStr,
            0.15 * s
          )
        );
      }

      // Y arrow
      if (Math.abs(vy) > 0.001) {
        const dir = new THREE.Vector3(0, vy > 0 ? 1 : -1, 0);
        group.add(
          new THREE.ArrowHelper(
            dir,
            origin,
            Math.abs(vy * scale),
            color,
            0.08 * s,
            0.04 * s
          )
        );
        group.add(
          getText(
            `${p1}y: ${vy.toFixed(2)}`,
            [n[0], n[1] + vy * scale + (vy > 0 ? 0.15 * s : -0.15 * s), n[2]],
            colorStr,
            0.15 * s
          )
        );
      }

      // Rotation arc
      if (Math.abs(rz) > 0.0001) {
        const radius = 0.08 * s,
          start = Math.PI / 4,
          arc = Math.PI * 1.5;
        const ccw = rz < 0;
        const curve = new THREE.EllipseCurve(
          n[0],
          n[1],
          radius,
          radius,
          start,
          start + arc,
          ccw
        );
        const pts = curve
          .getPoints(24)
          .map((p) => new THREE.Vector3(p.x, p.y, n[2]));
        group.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color })
          )
        );

        // Cone arrowhead at arc end
        const endPt = pts[pts.length - 1];
        const prevPt = pts[pts.length - 2];
        const tangent = new THREE.Vector3()
          .subVectors(endPt, prevPt)
          .normalize();
        const cone = new THREE.Mesh(coneGeom, mat);
        cone.position.copy(endPt);
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
        group.add(cone);

        group.add(
          getText(
            `${p2}z: ${rz.toFixed(3)}`,
            [n[0] - radius - 0.15 * s, n[1], n[2]],
            colorStr,
            0.15 * s
          )
        );
      }
    });

    coneGeom.dispose();
    render();
  });

  group.userData.dispose = () => {
    clearGroup();
  };
  return group;
}
