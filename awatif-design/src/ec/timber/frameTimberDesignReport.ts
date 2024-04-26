import { TemplateResult, html } from "lit-html";
import {
  FrameTimberDesignInput,
  FrameTimberDesignOutput,
} from "./frameTimberDesign";
import { renderMath } from "./utils/renderMath";

export function frameTimberDesignReport(
  designInput: FrameTimberDesignInput,
  designOutput: FrameTimberDesignOutput
): TemplateResult {
  const i = designInput.frameTimberDesign;
  const o = designOutput.frameTimberDesign;

  return html`
    <h2>Design for Tension of Element ${designInput.element}</h2>

    <h3>Axial stress in element</h3>
    <p>
      ${renderMath(`N = ${o.appliedForce.toFixed(3)}\\space KN`)} (from FEM
      analysis)
    </p>
    <p>
      ${renderMath(
        `\\sigma _{t0d} = \\frac{N}{A} = ${o.appliedStress.toFixed(
          3
        )} \\space MPa`
      )}
    </p>

    <h3>Axial stress capacity of element</h3>
    <p>${renderMath(`K_{modmed} = ${o.kmod.toFixed(1)}`)}</p>
    <p>
      ${renderMath(
        `f_{t0k} = ${i.tensileStrengthParallel.toFixed(3)} \\space MPa`
      )}
    </p>
    <p>${renderMath(`\\gamma_{m} = ${i.gammaM.toFixed(1)}`)}</p>
    <p>
      ${renderMath(
        `f_{t0d} = \\frac{k_{modmed} * f_{t0k}}{\\gamma_{m} } = ${o.capacityStress.toFixed(
          3
        )} \\space MPa`
      )}
    </p>

    <h3>Element verification</h3>
    <p>
      ${renderMath(
        `\\frac{\\sigma _{t0d}}{f_t0d} = ${o.utilizationRatio.toFixed(3)}`
      )}
    </p>
    <p>
      ${o.utilizationRatio > 1
        ? "section is not sufficient"
        : "section is sufficient"}
    </p>
  `;
}
