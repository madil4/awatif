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

    if (display.val !== "Reactions" || !mesh.reactions?.val) return render();

    const s = displayScale.val;
    const reactions = mesh.reactions.val;
    const color = 0xff0000;
    const labelColor = "#ffffff";
    const arrowLength = 0.3 * s;
    const arrowHeadLength = 0.15 * s;
    const arrowHeadWidth = 0.1 * s;
    const offsetDistance = 0.15 * s;
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
        const dir = new THREE.Vector3(vx > 0 ? 1 : -1, 0, 0);
        const offset = new THREE.Vector3(dir.x * offsetDistance, 0, 0);
        group.add(
          setMaterialOnTop(
            new THREE.ArrowHelper(
              dir,
              new THREE.Vector3(n[0] + offset.x, n[1], n[2]),
              arrowLength,
              color,
              arrowHeadLength,
              arrowHeadWidth,
            ),
          ),
        );
        labels.push(`Rx: ${vx.toFixed(2)}`);
      }

      // Y arrow
      if (Math.abs(vy) > 0.001) {
        const dir = new THREE.Vector3(0, vy > 0 ? 1 : -1, 0);
        const offset = new THREE.Vector3(0, dir.y * offsetDistance, 0);
        group.add(
          setMaterialOnTop(
            new THREE.ArrowHelper(
              dir,
              new THREE.Vector3(n[0], n[1] + offset.y, n[2]),
              arrowLength,
              color,
              arrowHeadLength,
              arrowHeadWidth,
            ),
          ),
        );
        labels.unshift(`Ry: ${vy.toFixed(2)}`);
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
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
        cone.renderOrder = 5;
        group.add(cone);

        labels.push(`Mz: ${rz.toFixed(3)}`);
      }

      if (labels.length > 0) {
        const labelX = n[0] - 0.7 * s;
        const labelTopY = n[1] + 0.45 * s;
        const labelSpacing = 0.22 * s;

        labels.forEach((text, index) => {
          group.add(
            getText(
              text,
              [labelX, labelTopY - index * labelSpacing, n[2]],
              labelColor,
              0.3 * s,
              { backgroundColor: "rgba(120, 0, 0, 0.75)" },
            ),
          );
        });
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

function setMaterialOnTop<T extends THREE.Object3D>(object: T): T {
  object.traverse((child) => {
    if ((child as THREE.Mesh).material) {
      const material = (child as THREE.Mesh).material as THREE.Material;
      material.depthTest = false;
    }
  });
  return object;
}
