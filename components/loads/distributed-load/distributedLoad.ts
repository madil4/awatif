import * as THREE from "three";
import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { LoadTemplate } from "../data-model";
import { getText } from "../getText";

type DistributedLoadParams = {
  w: number; // kN/m, perpendicular to member (local y-axis)
};

export const distributedLoad: LoadTemplate<DistributedLoadParams> = {
  name: "Distributed Load",
  geometryKind: "line",
  defaultParams: {
    w: 0,
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Load (kN/m):</label>
        <input
          type="number"
          placeholder="0"
          step="1"
          .value=${live(params.val.w)}
          @input=${(e: Event) => {
            const w = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(w)) return;
            params.val = { ...params.val, w };
          }}
        />
      </div>
    `;
  },

  // Returns load per unit length in LOCAL element coordinates [Nx, Qy, Qz, Mx, My, Mz]
  // The aggregator transforms to global axes using the element's direction vector
  getLoad: ({ params }) => ({
    load: [0, params.w, 0, 0, 0, 0],
  }),

  getLineObject3D: ({ params, startPosition, endPosition, displayScale }) => {
    const group = new THREE.Group();
    const w = params.w;

    if (w === 0) return group;

    const [x1, y1, z1] = startPosition;
    const [x2, y2, z2] = endPosition;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L === 0) return group;

    // Local y unit vector (perpendicular to member, 90° clockwise in XY plane)
    const perpX = dy / L;
    const perpY = -dx / L;

    const ARROW_LENGTH = 0.25 * displayScale;
    const ARROW_HEAD_LENGTH = 0.12 * displayScale;
    const ARROW_HEAD_WIDTH = 0.08 * displayScale;
    const COLOR = 0x00aaff; // Blue for distributed loads

    const direction = new THREE.Vector3(
      w > 0 ? perpX : -perpX,
      w > 0 ? perpY : -perpY,
      0,
    );
    const offset = direction
      .clone()
      .multiplyScalar(ARROW_LENGTH + 0.05 * displayScale);

    // Number of arrows along the member (at least 2, at most 8)
    const numArrows = Math.min(
      8,
      Math.max(2, Math.round(L / (0.6 * displayScale)) + 1),
    );

    for (let i = 0; i <= numArrows; i++) {
      const t = i / numArrows;
      const px = x1 + t * dx;
      const py = y1 + t * dy;
      const pz = z1 + t * dz;

      const origin = new THREE.Vector3(
        px - offset.x,
        py - offset.y,
        pz - offset.z,
      );

      const arrow = new THREE.ArrowHelper(
        direction.clone(),
        origin,
        ARROW_LENGTH,
        COLOR,
        ARROW_HEAD_LENGTH,
        ARROW_HEAD_WIDTH,
      );
      setMaterialOnTop(arrow);
      group.add(arrow);
    }

    // Cap line connecting arrow tips
    const capStart = new THREE.Vector3(
      x1 - offset.x,
      y1 - offset.y,
      z1 - offset.z,
    );
    const capEnd = new THREE.Vector3(
      x2 - offset.x,
      y2 - offset.y,
      z2 - offset.z,
    );
    const capGeometry = new THREE.BufferGeometry().setFromPoints([
      capStart,
      capEnd,
    ]);
    const capMaterial = new THREE.LineBasicMaterial({
      color: COLOR,
      depthTest: false,
    });
    const capLine = new THREE.Line(capGeometry, capMaterial);
    capLine.renderOrder = 5;
    group.add(capLine);

    // Label at midpoint
    const midX = (x1 + x2) / 2 + offset.x + direction.x * 0.15 * displayScale;
    const midY = (y1 + y2) / 2 + offset.y + direction.y * 0.15 * displayScale;
    const midZ = (z1 + z2) / 2 + offset.z;

    const label = getText(
      `${Math.abs(w)} kN/m`,
      [midX, midY, midZ],
      "#ffffff",
      0.3 * displayScale,
      { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    );
    group.add(label);

    group.renderOrder = 5;
    return group;

    function setMaterialOnTop(object: THREE.Object3D) {
      object.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const material = (child as THREE.Mesh).material as THREE.Material;
          material.depthTest = false;
        }
      });
    }
  },
};
