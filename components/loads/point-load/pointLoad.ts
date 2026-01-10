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

      <div>
        <label>Moment Z:</label>
        <input
          type="number"
          .value=${params.val.Mz}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              Mz: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>
    `;
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
