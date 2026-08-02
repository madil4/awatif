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
        (c.material.map?.dispose(), c.material.dispose());
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

    if (display.val === "None") return render();

    const s = displayScale.val;
    const color = 0xff0000;
    const labelColor = "#ffffff";
    const arrowLength = 0.3 * s;
    const arrowHeadLength = 0.15 * s;
    const arrowHeadWidth = 0.1 * s;
    const offsetDistance = 0.15 * s;

    // Arrow along a global axis, offset from the node in the value's direction
    const addAxisArrow = (axis: "x" | "y" | "z", value: number, n: number[]) => {
      const dir = new THREE.Vector3();
      dir[axis] = value > 0 ? 1 : -1;
      const origin = new THREE.Vector3(n[0], n[1], n[2]);
      origin[axis] += dir[axis] * offsetDistance;

      group.add(
        setMaterialOnTop(
          new THREE.ArrowHelper(
            dir,
            origin,
            arrowLength,
            color,
            arrowHeadLength,
            arrowHeadWidth,
          ),
        ),
      );
    };

    // One box holding every label, centered above and to the left of the node
    const addLabels = (labels: string[], n: number[]) => {
      if (!labels.length) return;

      group.add(
        getText(
          labels.join("\n"),
          [n[0] - 0.7 * s, n[1] + 0.45 * s, n[2]],
          labelColor,
          0.3 * s,
          { backgroundColor: "rgba(120, 0, 0, 0.75)" },
        ),
      );
    };

    if (display.val === "Reactions") {
      if (!mesh.reactions?.val) return render();

      const reactions = mesh.reactions.val;
      const momentRadius = 0.18 * s;
      const coneGeom = new THREE.ConeGeometry(0.05 * s, 0.15 * s, 8);
      const mat = new THREE.MeshBasicMaterial({ color });
      mat.depthTest = false;

      reactions.forEach((r, i) => {
        const n = nodes[i];
        if (!n) return;
        const [vx, vy, , , , rz] = r;
        const labels: string[] = [];

        // X arrow
        if (Math.abs(vx) > 0.001) {
          addAxisArrow("x", vx, n);
          labels.push(`Rx: ${vx.toFixed(2)} KN`);
        }

        // Y arrow
        if (Math.abs(vy) > 0.001) {
          addAxisArrow("y", vy, n);
          labels.unshift(`Ry: ${vy.toFixed(2)} KN`);
        }

        // Rotation arc
        if (Math.abs(rz) > 0.0001) {
          const start = Math.PI / 4;
          const arc = Math.PI * 1.5;
          const ccw = rz < 0;
          const curve = new THREE.EllipseCurve(
            n[0],
            n[1],
            momentRadius,
            momentRadius,
            start,
            start + arc,
            ccw,
          );
          const pts = curve
            .getPoints(24)
            .map((p) => new THREE.Vector3(p.x, p.y, n[2]));
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color, depthTest: false }),
          );
          line.renderOrder = 5;
          group.add(line);

          // Cone arrowhead at arc end
          const endPt = pts[pts.length - 1];
          const prevPt = pts[pts.length - 2];
          const tangent = new THREE.Vector3()
            .subVectors(endPt, prevPt)
            .normalize();
          const cone = new THREE.Mesh(coneGeom, mat);
          cone.position.copy(endPt);
          cone.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            tangent,
          );
          cone.renderOrder = 5;
          group.add(cone);

          labels.push(`Mz: ${rz.toFixed(3)} kNm`);
        }

        addLabels(labels, n);
      });

      coneGeom.dispose();
      return render();
    }

    if (display.val === "Displacements") {
      if (!mesh.displacements?.val) return render();

      // [u1x, u1y, u1z, u2x, u2y, u2z, ...] — translations only
      const displacements = mesh.displacements.val;

      nodes.forEach((n, i) => {
        const dx = displacements[i * 3];
        const dy = displacements[i * 3 + 1];
        const dz = displacements[i * 3 + 2];
        if (dx === undefined || dy === undefined || dz === undefined) return;

        // Arrows are skipped at exactly zero, where direction is undefined
        if (dx !== 0) addAxisArrow("x", dx, n);
        if (dy !== 0) addAxisArrow("y", dy, n);
        if (dz !== 0) addAxisArrow("z", dz, n);

        addLabels(
          [
            `Dx: ${dx.toFixed(4)} m`,
            `Dy: ${dy.toFixed(4)} m`,
            `Dz: ${dz.toFixed(4)} m`,
          ],
          n,
        );
      });
    }

    render();
  });

  group.userData.dispose = () => {
    clearGroup();
  };
  return group;
}

function setMaterialOnTop<T extends THREE.Object3D>(object: T): T {
  object.traverse((child) => {
    if ((child as THREE.Mesh).material) {
      const material = (child as THREE.Mesh).material as THREE.Material;
      material.depthTest = false;
    }
  });
  return object;
}
