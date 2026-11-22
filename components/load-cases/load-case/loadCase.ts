import { html } from "lit-html";
import { LoadCaseTemplate } from "../data-model";

export const loadCase: LoadCaseTemplate = {
  name: "Load Case",
  defaultParams: {},

  getParamsTemplate: () => html`
    <div>
      <label
        >Rename this load case in the list, then assign loads to it from the
        Loads panel.</label
      >
    </div>
  `,
};
