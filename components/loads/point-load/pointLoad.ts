import * as THREE from "three";
import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { LoadTemplate } from "../data-model";
import { getText } from "../getText";

type PointLoadParams = {
  Fx: number;
  Fy: number;
  Fz: number;
  Mx: number;
  My: number;
  Mz: number;
};

export const pointLoad: LoadTemplate<PointLoadParams> = {
  name: "Point Load",
  defaultParams: {
    Fx: 0,
    Fy: 0,
    Fz: 0,
    Mx: 0,
    My: 0,
    Mz: 0,
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Force X (KN):</label>
        <input
          type="number"
          placeholder="0"
          step="10"
          .value=${live(params.val.Fx)}
          @input=${(e: Event) => {
            const Fx = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(Fx)) return;
            params.val = { ...params.val, Fx };
          }}
        />
      </div>

      <div>
        <label>Force Y (KN):</label>
        <input
          type="number"
          placeholder="0"
          step="10"
          .value=${live(params.val.Fy)}
          @input=${(e: Event) => {
            const Fy = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(Fy)) return;
            params.val = { ...params.val, Fy };
          }}
        />
      </div>
    `;
  },

  getLoad: ({ params }) => ({
    load: [params.Fx, params.Fy, params.Fz, params.Mx, params.My, params.Mz],
  }),

  getObject3D: ({ params, position, displayScale }) => {
    const Fx = params.Fx;
    const Fy = params.Fy;
    const group = new THREE.Group();

    const ARROW_LENGTH = 0.3 * displayScale;
    const ARROW_HEAD_LENGTH = 0.15 * displayScale;
    const ARROW_HEAD_WIDTH = 0.1 * displayScale;
    const COLOR_X = 0xff0000; // Red for X direction
    const COLOR_Y = 0x00ff00; // Green for Y direction

    group.position.set(position[0], position[1], position[2]);
    group.renderOrder = 5;

    const OFFSET = 0.15 * displayScale; // Offset distance from the point

    if (Fx !== 0) {
      const direction = new THREE.Vector3(Fx > 0 ? 1 : -1, 0, 0);
      const offset = new THREE.Vector3((Fx > 0 ? 1 : -1) * OFFSET, 0, 0);
      const arrowX = new THREE.ArrowHelper(
        direction,
        offset,
        ARROW_LENGTH,
        COLOR_X,
        ARROW_HEAD_LENGTH,
        ARROW_HEAD_WIDTH,
      );
      setMaterialOnTop(arrowX);
      group.add(arrowX);

      const labelX = getText(
        `${Math.abs(Fx)} KN`,
        [
          offset.x + direction.x * (ARROW_LENGTH + 0.4 * displayScale),
          offset.y,
          offset.z,
        ],
        "#ffffff",
        0.3 * displayScale,
        { backgroundColor: "rgba(0, 0, 0, 0.6)" },
      );
      group.add(labelX);
    }

    if (Fy !== 0) {
      const direction = new THREE.Vector3(0, Fy > 0 ? 1 : -1, 0);
      const offset = new THREE.Vector3(0, (Fy > 0 ? 1 : -1) * OFFSET, 0);
      const arrowY = new THREE.ArrowHelper(
        direction,
        offset,
        ARROW_LENGTH,
        COLOR_Y,
        ARROW_HEAD_LENGTH,
        ARROW_HEAD_WIDTH,
      );
      setMaterialOnTop(arrowY);
      group.add(arrowY);

      const labelY = getText(
        `${Math.abs(Fy)} KN`,
        [
          offset.x,
          offset.y + direction.y * (ARROW_LENGTH + 0.3 * displayScale),
          offset.z,
        ],
        "#ffffff",
        0.3 * displayScale,
        { backgroundColor: "rgba(0, 0, 0, 0.6)" },
      );
      group.add(labelY);
    }

    return group;

    function setMaterialOnTop(object: THREE.Object3D) {
      object.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const material = (child as THREE.Mesh).material as THREE.Material;
          material.depthTest = false; // Disable depth testing so arrows always appear on top
        }
      });
    }
  },
};
