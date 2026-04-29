import * as THREE from "three";
import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { LoadTemplate } from "../data-model";
import { getText } from "../getText";

type DistributedLoadParams = {
  w: number; // kN/m
  direction: "local-y" | "local-z" | "global-x" | "global-y" | "global-z";
};

export const distributedLoad: LoadTemplate<DistributedLoadParams> = {
  name: "Distributed Load",
  geometryKind: "line",
  defaultParams: {
    w: 0,
    direction: "local-z",
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
      <div>
        <label>Direction:</label>
        <select
          .value=${live(params.val.direction)}
          @change=${(e: Event) => {
            const direction = (e.target as HTMLSelectElement)
              .value as DistributedLoadParams["direction"];
            params.val = { ...params.val, direction };
          }}
        >
          <option value="local-y">Local Y</option>
          <option value="local-z">Local Z</option>
          <option value="global-x">Global X</option>
          <option value="global-y">Global Y</option>
          <option value="global-z">Global Z</option>
        </select>
      </div>
    `;
  },

  // Returns load per unit length.
  // For "local" coordinateSystem: [Nx, Qy, Qz, Mx, My, Mz] in element local coords.
  // For "global" coordinateSystem: [Fx, Fy, Fz, Mx, My, Mz] in global coords.
  getLoad: ({ params }) => {
    const w = params.w;
    const direction = params.direction ?? "local-y";
    switch (direction) {
      case "local-y":
        return { load: [0, w, 0, 0, 0, 0], coordinateSystem: "local" };
      case "local-z":
        return { load: [0, 0, w, 0, 0, 0], coordinateSystem: "local" };
      case "global-x":
        return {
          load: [w, 0, 0, 0, 0, 0],
          coordinateSystem: "global",
        };
      case "global-y":
        return {
          load: [0, w, 0, 0, 0, 0],
          coordinateSystem: "global",
        };
      case "global-z":
        return {
          load: [0, 0, w, 0, 0, 0],
          coordinateSystem: "global",
        };
    }
  },

  getLineObject3D: ({ params, startPosition, endPosition, displayScale }) => {
    const group = new THREE.Group();
    const w = params.w;
    const direction = params.direction ?? "local-y";

    if (w === 0) return group;

    const [x1, y1, z1] = startPosition;
    const [x2, y2, z2] = endPosition;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L === 0) return group;

    // Compute arrow direction vector
    let arrowDir: THREE.Vector3;
    const sign = w > 0 ? 1 : -1;

    if (direction === "local-y") {
      // Perpendicular to element, 90° clockwise in XY plane (legacy 2D convention)
      const perpX = dy / L;
      const perpY = -dx / L;
      arrowDir = new THREE.Vector3(sign * perpX, sign * perpY, 0);
    } else if (direction === "local-z") {
      // Local z: project global Z perpendicular to element axis
      const lxVec = new THREE.Vector3(dx / L, dy / L, dz / L);
      const globalZ = new THREE.Vector3(0, 0, 1);
      const dot = lxVec.dot(globalZ);
      let lzVec: THREE.Vector3;
      if (Math.abs(dot) < 0.99) {
        lzVec = globalZ
          .clone()
          .sub(lxVec.clone().multiplyScalar(dot))
          .normalize();
      } else {
        // Vertical member: use global X as reference
        const globalX = new THREE.Vector3(1, 0, 0);
        const dotX = lxVec.dot(globalX);
        lzVec = globalX
          .clone()
          .sub(lxVec.clone().multiplyScalar(dotX))
          .normalize();
      }
      arrowDir = lzVec.multiplyScalar(sign);
    } else {
      // Global directions
      if (direction === "global-x") arrowDir = new THREE.Vector3(sign, 0, 0);
      else if (direction === "global-y")
        arrowDir = new THREE.Vector3(0, sign, 0);
      else arrowDir = new THREE.Vector3(0, 0, sign); // global-z
    }

    const colorMap: Record<DistributedLoadParams["direction"], number> = {
      "local-y": 0x00ff00,
      "local-z": 0x0000ff,
      "global-x": 0xff0000,
      "global-y": 0x00ff00,
      "global-z": 0x0000ff,
    };
    const COLOR = colorMap[direction];

    const ARROW_LENGTH = 0.25 * displayScale;
    const ARROW_HEAD_LENGTH = 0.12 * displayScale;
    const ARROW_HEAD_WIDTH = 0.08 * displayScale;

    const offset = arrowDir
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
        arrowDir.clone(),
        origin,
        ARROW_LENGTH,
        COLOR,
        ARROW_HEAD_LENGTH,
        ARROW_HEAD_WIDTH,
      );
      setMaterialOnTop(arrow);
      group.add(arrow);
    }

    // Cap line connecting arrow tails
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
    const dirLabelsMap: Record<DistributedLoadParams["direction"], string> = {
      "local-y": "Local Y",
      "local-z": "Local Z",
      "global-x": "Global X",
      "global-y": "Global Y",
      "global-z": "Global Z",
    };
    const dirLabel = dirLabelsMap[direction];

    const midX = (x1 + x2) / 2 + offset.x + arrowDir.x * 0.15 * displayScale;
    const midY = (y1 + y2) / 2 + offset.y + arrowDir.y * 0.15 * displayScale;
    const midZ = (z1 + z2) / 2 + offset.z + arrowDir.z * 0.15 * displayScale;

    const label = getText(
      `${Math.abs(w)} kN/m (${dirLabel})`,
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
