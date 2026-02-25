import { html } from "lit-html";
import { ReleaseTemplate } from "../data-model";

type LineReleaseParams = {
  type: "both-ends" | "start" | "end";
};

const releaseMap: Record<
  LineReleaseParams["type"],
  [boolean, boolean, boolean, boolean]
> = {
  "both-ends": [true, true, true, true],
  start: [true, true, false, false],
  end: [false, false, true, true],
};

export const lineRelease: ReleaseTemplate<LineReleaseParams> = {
  name: "Line Release",
  defaultParams: {
    type: "both-ends",
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Release At:</label>
        <select
          @change=${(e: Event) =>
            (params.val = {
              type: (e.target as HTMLSelectElement)
                .value as LineReleaseParams["type"],
            })}
        >
          <option
            value="both-ends"
            .selected=${params.val.type === "both-ends"}
          >
            Both Ends
          </option>
          <option value="start" .selected=${params.val.type === "start"}>
            Start Only
          </option>
          <option value="end" .selected=${params.val.type === "end"}>
            End Only
          </option>
        </select>
      </div>
    `;
  },

  getRelease: ({ params }) => {
    return { release: releaseMap[params.type] };
  },
};
