import { TemplateResult, html } from "lit-html";
import {
  FrameTimberDesignInput,
  FrameTimberDesignOutput,
} from "./frameTimberDesign";

export function frameTimberDesignReport(
  designInput: FrameTimberDesignInput,
  designOutput: FrameTimberDesignOutput
): TemplateResult {
  const i = designInput.frameTimberDesign;
  const o = designOutput.frameTimberDesign;
  return html`
    <h2>Design for Tension of Element ${designInput.element}</h2>

    <h3>Axial stress in element</h3>
    <p>N: ${o.appliedForce.toFixed(5)} KN (from FEM analysis)</p>
    <p>Sigma: N/A ${o.appliedStress.toFixed(3)} MPa</p>

    <h3>Axial stress capacity of element</h3>
    <p>Kmodmed: ${o.kmod.toFixed(1)}</p>
    <p>Ft0k: ${i.tensileStrengthParallel.toFixed(3)}</p>
    <p>gammaM: ${i.gammaM.toFixed(1)}</p>
    <p>Ft0d (k * f/gammaM): ${o.capacityStress.toFixed(3)} MPa</p>

    <h3>Element verification</h3>
    <p>(k * f/gammaM): ${o.utilizationRatio.toFixed(3)} < 1</p>
    <p>
      ${Math.abs(o.utilizationRatio) > 1
        ? "section is not sufficient"
        : "section is sufficient"}
    </p>
  `;
}
