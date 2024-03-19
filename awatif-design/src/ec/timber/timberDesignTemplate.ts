import { BeamResult, Element } from "../../../../awatif-data-structure/";
import { TimberDesignAssignment, TimberDesignResult } from "./timberDesign";
import { TemplateResult, html } from "lit-html";

export function timberDesignTemplate(
  // timberDesignInput: TimberDesignAssignment["timberDesign"],
  // analysisResult: BeamResult,
  timberDesignResult: TimberDesignResult
): TemplateResult {
  return html`<ul>
    <li>Here are the result:</li>
    <li>${timberDesignResult.timberDesign.utilizationFactor}</li>
    <li>${timberDesignResult.timberDesign.forTemplate}</li>
  </ul>`;
}
