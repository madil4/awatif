import { html } from "lit-html";
import { LoadTemplate } from "../data-model";

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
    Fz: -100, // Default downward force
    Mx: 0,
    My: 0,
    Mz: 0,
  },

  getTemplate: ({ params }) => {
    return html`<div>
      <label>Force X (Fx):</label>
      <input
        type="number"
        .value=${params.val.Fx}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            Fx: Number((e.target as HTMLInputElement).value),
          })}
      />

      <label>Force Y (Fy):</label>
      <input
        type="number"
        .value=${params.val.Fy}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            Fy: Number((e.target as HTMLInputElement).value),
          })}
      />

      <label>Force Z (Fz):</label>
      <input
        type="number"
        .value=${params.val.Fz}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            Fz: Number((e.target as HTMLInputElement).value),
          })}
      />

      <label>Moment X (Mx):</label>
      <input
        type="number"
        .value=${params.val.Mx}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            Mx: Number((e.target as HTMLInputElement).value),
          })}
      />

      <label>Moment Y (My):</label>
      <input
        type="number"
        .value=${params.val.My}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            My: Number((e.target as HTMLInputElement).value),
          })}
      />

      <label>Moment Z (Mz):</label>
      <input
        type="number"
        .value=${params.val.Mz}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            Mz: Number((e.target as HTMLInputElement).value),
          })}
      />
    </div>`;
  },

  getLoad: ({ params }) => {
    const { Fx, Fy, Fz, Mx, My, Mz } = params;

    // Return load values: [Fx, Fy, Fz, Mx, My, Mz]
    // Fx, Fy, Fz: Force components in x, y, z directions
    // Mx, My, Mz: Moment components about x, y, z axes
    return {
      load: [Fx, Fy, Fz, Mx, My, Mz],
    };
  },
};
