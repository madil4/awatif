import { html } from "lit-html";
import { SupportTemplate } from "../data-model";

type PointSupportParams = {
  Ux: boolean; // Translation restraint in X
  Uy: boolean; // Translation restraint in Y
  Uz: boolean; // Translation restraint in Z
  Rx: boolean; // Rotation restraint about X
  Ry: boolean; // Rotation restraint about Y
  Rz: boolean; // Rotation restraint about Z
};

export const pointSupport: SupportTemplate<PointSupportParams> = {
  name: "Point Support",
  defaultParams: {
    Ux: true,
    Uy: true,
    Uz: true,
    Rx: false,
    Ry: false,
    Rz: false,
  },

  getTemplate: ({ params }) => {
    return html`
      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Ux}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Ux: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Ux (Translation X)
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Uy}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Uy: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Uy (Translation Y)
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Uz}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Uz: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Uz (Translation Z)
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Rx}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Rx: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Rx (Rotation about X)
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Ry}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Ry: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Ry (Rotation about Y)
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Rz}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Rz: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Rz (Rotation about Z)
        </label>
      </div>
    `;
  },

  getSupport: ({ params }) => {
    const { Ux, Uy, Uz, Rx, Ry, Rz } = params;

    // Return support values: [Ux, Uy, Uz, Rx, Ry, Rz]
    // true = restrained, false = free
    return {
      support: [Ux, Uy, Uz, Rx, Ry, Rz],
    };
  },
};
