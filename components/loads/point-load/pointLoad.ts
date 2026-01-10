import { html } from "lit-html";
import { LoadTemplate } from "../data-model";
import * as THREE from "three";

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
    Fy: -100,
    Fz: 0,
    Mx: 0,
    My: 0,
    Mz: 0,
  },

  getTemplate: ({ params }) => {
    return html`
      <div>
        <label>Force X:</label>
        <input
          type="number"
          .value=${params.val.Fx}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              Fx: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Force Y:</label>
        <input
          type="number"
          .value=${params.val.Fy}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              Fy: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>
    `;
  },

  getLoad: ({ params }) => ({
    load: [params.Fx, params.Fy, params.Fz, params.Mx, params.My, params.Mz],
  }),

  getObject3D: ({ params, position }) => {
    const { Fx, Fy } = params;
    const group = new THREE.Group();

    const ARROW_LENGTH = 1.5 * 0.5;
    const ARROW_HEAD_LENGTH = 0.3 * 0.5;
    const ARROW_HEAD_WIDTH = 0.2 * 0.5;
    const COLOR_X = 0xff0000; // Red for X direction
    const COLOR_Y = 0x00ff00; // Green for Y direction

    group.position.set(position[0], position[1], position[2]);
    group.renderOrder = 4;

    const OFFSET = 0.25; // Offset distance from the point

    if (Fx !== 0) {
      const direction = new THREE.Vector3(Fx > 0 ? 1 : -1, 0, 0);
      const offset = new THREE.Vector3((Fx > 0 ? 1 : -1) * OFFSET, 0, 0);
      const arrowX = new THREE.ArrowHelper(
        direction,
        offset,
        ARROW_LENGTH,
        COLOR_X,
        ARROW_HEAD_LENGTH,
        ARROW_HEAD_WIDTH
      );
      group.add(arrowX);
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
        ARROW_HEAD_WIDTH
      );
      group.add(arrowY);
    }

    return group;
  },
};
