import { TemplateResult, html } from "lit-html";
import { renderMath } from "../utils/renderMath";
import {
  ConnectionTimberDesignerInput,
  ConnectionTimberDesignerOutput,
} from "./connectionTimberDesign";

export function connectionTimberDesignReport(
  designInput: ConnectionTimberDesignerInput,
  designOutput: ConnectionTimberDesignerOutput
): TemplateResult {
  const i = designInput.connectionTimberDesign;
  const o = designOutput.connectionTimberDesign;

  return html`
    <h2>Design of Connection #${designInput.node}</h2>

    <h3>Axial stress in elements</h3>
    <p>${renderMath(`ratio = ${o[0].fastenerCheck}`)}</p>
  `;
}
