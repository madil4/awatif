import { html } from "lit-html";
import { LocalAxesAngle, LocalAxesTemplate } from "../data-model";

type LocalAxesParams = {
  angle: LocalAxesAngle;
};

export const localAxes: LocalAxesTemplate<LocalAxesParams> = {
  name: "Local Axes",
  geometryKind: "line",
  defaultParams: {
    angle: 0,
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Section Rotation:</label>
        <select
          @change=${(e: Event) =>
            (params.val = {
              angle: Number(
                (e.target as HTMLSelectElement).value,
              ) as LocalAxesAngle,
            })}
        >
          <option value="0" .selected=${params.val.angle === 0}>0°</option>
          <option value="90" .selected=${params.val.angle === 90}>90°</option>
        </select>
      </div>
    `;
  },

  getAngle: ({ params }) => params.angle,
};
