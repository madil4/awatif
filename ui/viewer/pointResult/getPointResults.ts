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
    const colorStr = "#ff0000";
    const coneGeom = new THREE.ConeGeometry(0.05 * s, 0.15 * s, 8);
    const mat = new THREE.MeshBasicMaterial({ color });
    const maxArrowLength = 0.3 * s;
    const maxArcRadius = 0.15 * s;
    const maxAppliedForce = getMaxComponentMagnitude(mesh.loads.val, 0, 3);
    const maxReactionForce = getMaxComponentMagnitude(reactions, 0, 3);
    const forceReference = Math.max(maxAppliedForce, maxReactionForce, 1);
    const maxAppliedMoment = getMaxComponentMagnitude(mesh.loads.val, 3, 6);
    const maxReactionMoment = getMaxComponentMagnitude(reactions, 3, 6);
    const momentReference = Math.max(maxAppliedMoment, maxReactionMoment, 1);

    reactions.forEach((r, i) => {
      const n = nodes[i];
      if (!n) return;
      const [vx, vy, , , , rz] = r;
      const origin = new THREE.Vector3(n[0], n[1], n[2]);
      const xLength = (Math.abs(vx) / forceReference) * maxArrowLength;
      const yLength = (Math.abs(vy) / forceReference) * maxArrowLength;
      const radius = (Math.abs(rz) / momentReference) * maxArcRadius;

      // X arrow
      if (Math.abs(vx) > 0.001) {
        const dir = new THREE.Vector3(vx > 0 ? 1 : -1, 0, 0);
        group.add(
          new THREE.ArrowHelper(
            dir,
            origin,
            xLength,
            color,
            getArrowHeadLength(xLength, s),
            getArrowHeadWidth(xLength, s),
          ),
        );
        group.add(
          getText(
            `Rx: ${vx.toFixed(2)}`,
            [n[0] + dir.x * (xLength + 0.15 * s), n[1], n[2]],
            colorStr,
            0.3 * s,
          ),
        );
      }

      // Y arrow
      if (Math.abs(vy) > 0.001) {
        const dir = new THREE.Vector3(0, vy > 0 ? 1 : -1, 0);
        group.add(
          new THREE.ArrowHelper(
            dir,
            origin,
            yLength,
            color,
            getArrowHeadLength(yLength, s),
            getArrowHeadWidth(yLength, s),
          ),
        );
        group.add(
          getText(
            `Ry: ${vy.toFixed(2)}`,
            [n[0], n[1] + dir.y * (yLength + 0.15 * s), n[2]],
            colorStr,
            0.3 * s,
          ),
        );
      }

      // Rotation arc
      if (Math.abs(rz) > 0.0001 && radius > 0) {
        const start = Math.PI / 4;
        const arc = Math.PI * 1.5;
        const ccw = rz < 0;
        const curve = new THREE.EllipseCurve(
          n[0],
          n[1],
          radius,
          radius,
          start,
          start + arc,
          ccw,
        );
        const pts = curve
          .getPoints(24)
          .map((p) => new THREE.Vector3(p.x, p.y, n[2]));
        group.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color }),
          ),
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
            `Mz: ${rz.toFixed(3)}`,
            [n[0] - radius - 0.15 * s, n[1], n[2]],
            colorStr,
            0.3 * s,
          ),
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

function getMaxComponentMagnitude(
  data:
    | Map<number, [number, number, number, number, number, number]>
    | [number, number, number, number, number, number][],
  startIndex: number,
  endIndex: number,
): number {
  if (data instanceof Map) {
    return Math.max(
      0,
      ...Array.from(data.values()).flatMap((values) =>
        values.slice(startIndex, endIndex).map((value) => Math.abs(value)),
      ),
    );
  }

  return Math.max(
    0,
    ...data.flatMap((values) =>
      values.slice(startIndex, endIndex).map((value) => Math.abs(value)),
    ),
  );
}

function getArrowHeadLength(length: number, displayScale: number): number {
  return Math.min(0.15 * displayScale, length * 0.6);
}

function getArrowHeadWidth(length: number, displayScale: number): number {
  return Math.min(0.1 * displayScale, length * 0.4);
}
