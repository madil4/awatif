import { TemplateResult, html } from "lit-html";
import {
  FrameTimberDesignInput,
  FrameTimberDesignOutput,
} from "./frameTimberDesign";

export function frameTimberDesignReport(
  // @ts-ignore
  designInput: FrameTimberDesignInput,
  // @ts-ignore
  designOutput: FrameTimberDesignOutput
): TemplateResult {
  return html`<ul>
    <li>Here are the result:</li>
  </ul>`;
}
