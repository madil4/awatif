import { html } from "lit-html";
import { EnRcColumnParams } from "./enRcColumn";
import { LineElementForces } from "../data-model";

export function getReport(
  params: EnRcColumnParams,
  lineId: number,
  lineElementForces?: LineElementForces
) {
  // Extract forces at line ends (first element start, last element end)
  let startN = 0,
    endN = 0,
    startMz = 0,
    endMz = 0,
    startVy = 0,
    endVy = 0;
  let hasForces = false;

  if (lineElementForces && lineElementForces.elementForces.length > 0) {
    const firstForces = lineElementForces.elementForces[0];
    const lastForces =
      lineElementForces.elementForces[
        lineElementForces.elementForces.length - 1
      ];

    startN = firstForces.N[0];
    endN = lastForces.N[1];
    startMz = firstForces.Mz[0];
    endMz = lastForces.Mz[1];
    startVy = firstForces.Vy[0];
    endVy = lastForces.Vy[1];
    hasForces = true;
  }

  return html`
    <div
      style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);"
    >
      <!-- Section Properties -->
      <div style="margin-bottom: 12px;">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Section Properties
        </div>
        <div>
          <span style="color: var(--text-secondary);">Size:</span>
          ${params.width} × ${params.depth} mm
        </div>
        <div>
          <span style="color: var(--text-secondary);">Concrete:</span>
          ${params.concreteGrade}
        </div>
        <div>
          <span style="color: var(--text-secondary);">Steel:</span>
          ${params.steelGrade}, As = ${params.steelArea} mm²
        </div>
        <div>
          <span style="color: var(--text-secondary);">Cover:</span>
          ${params.cover} mm
        </div>
      </div>

      <!-- Internal Forces -->
      ${hasForces
        ? html`
            <div
              style="border-top: 1px solid var(--border); padding-top: 12px;"
            >
              <div style="font-weight: 500; margin-bottom: 8px;">
                Internal Forces (Linear Analysis)
              </div>
              <div
                style="display: grid; grid-template-columns: auto 1fr 1fr; gap: 4px 12px;"
              >
                <div style="color: var(--text-secondary);"></div>
                <div style="color: var(--text-secondary); font-size: 0.75rem;">
                  Start
                </div>
                <div style="color: var(--text-secondary); font-size: 0.75rem;">
                  End
                </div>

                <div style="color: var(--text-secondary);">N</div>
                <div>${formatForce(startN, "kN")}</div>
                <div>${formatForce(endN, "kN")}</div>

                <div style="color: var(--text-secondary);">Vy</div>
                <div>${formatForce(startVy, "kN")}</div>
                <div>${formatForce(endVy, "kN")}</div>

                <div style="color: var(--text-secondary);">Mz</div>
                <div>${formatForce(startMz, "kNm")}</div>
                <div>${formatForce(endMz, "kNm")}</div>
              </div>
            </div>
          `
        : html`
            <div
              style="color: var(--text-secondary); font-style: italic; border-top: 1px solid var(--border); padding-top: 12px;"
            >
              No internal forces available
            </div>
          `}
    </div>
  `;
}

// Utils
function formatForce(value: number, unit: string) {
  const kilo = value / 1000;
  return `${kilo >= 0 ? "+" : ""}${kilo.toFixed(1)} ${unit}`;
}
