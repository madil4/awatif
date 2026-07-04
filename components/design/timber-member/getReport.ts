import { html, svg } from "lit-html";
import type { TimberMemberParams } from "./timberMember";
import type { TimberMemberDesign } from "./getDesign";

export function getReport({
  params,
  design,
}: {
  params: TimberMemberParams;
  design: TimberMemberDesign;
}) {
  return html`
    <div
      style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);"
    >
      <!-- Beta / Limitations Notice -->
      <div
        style="margin-bottom: 12px; padding: 8px 12px; border-radius: 4px; background: transparent; border: 1px solid var(--text-secondary); font-size: 0.78rem; line-height: 1.6; color: var(--text-secondary); opacity: 0.6;"
      >
        <div style="font-weight: 600; margin-bottom: 4px;">
          Experimental — Use with caution
        </div>
        <ul style="margin: 0; padding-left: 16px;">
          <li>
            This report is <strong>experimental</strong>. Results may contain
            errors until the stable release. Always verify with an independent
            calculation.
          </li>
          <li>
            Design follows <strong>${design.annex}</strong>.
          </li>
          <li>LTB and deflection are not yet implemented.</li>
        </ul>
      </div>

      <!-- Geometry -->
      <div
        style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start;"
      >
        <div>
          <div style="font-weight: 500; margin-bottom: 4px;">Geometry</div>
          <div>
            <span style="color: var(--text-secondary);">Size:</span>
            ${params.width} × ${params.depth} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);">Length:</span>
            ${design.l.toFixed(2)} m
          </div>
          <div>
            <span style="color: var(--text-secondary);">A:</span>
            ${design.A.toFixed(0)} mm²
          </div>
          <div>
            <span style="color: var(--text-secondary);">W<sub>y</sub>:</span>
            ${(design.Wy / 1e3).toFixed(1)} ×10³ mm³
          </div>
          <div>
            <span style="color: var(--text-secondary);">W<sub>z</sub>:</span>
            ${(design.Wz / 1e3).toFixed(1)} ×10³ mm³
          </div>
        </div>

        <div
          style="display: flex; justify-content: center; align-items: center; margin-left: 16px; margin-right: 8px;"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 130 130"
            style="overflow: visible; color: var(--text-primary);"
          >
            ${(() => {
              const maxDim = Math.max(params.width, params.depth);
              const scale = 100 / maxDim;
              const w = params.width * scale;
              const h = params.depth * scale;
              const x = 65 - w / 2;
              const y = 65 - h / 2;
              return svg`
                <rect
                  x="${x}" y="${y}" width="${w}" height="${h}"
                  fill="none" stroke="currentColor" stroke-width="1.5"
                />
                <!-- Width (Top) -->
                <line x1="${x}" y1="${y - 8}" x2="${x + w}" y2="${y - 8}" stroke="currentColor" stroke-width="0.5" />
                <line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y - 6}" stroke="currentColor" stroke-width="0.5" />
                <line x1="${x + w}" y1="${y - 10}" x2="${x + w}" y2="${y - 6}" stroke="currentColor" stroke-width="0.5" />
                <text x="${x + w / 2}" y="${y - 12}" fill="currentColor" font-size="8" text-anchor="middle">
                  ${params.width}
                </text>
                <!-- Depth (Right) -->
                <line x1="${x + w + 8}" y1="${y}" x2="${x + w + 8}" y2="${y + h}" stroke="currentColor" stroke-width="0.5" />
                <line x1="${x + w + 6}" y1="${y}" x2="${x + w + 10}" y2="${y}" stroke="currentColor" stroke-width="0.5" />
                <line x1="${x + w + 6}" y1="${y + h}" x2="${x + w + 10}" y2="${y + h}" stroke="currentColor" stroke-width="0.5" />
                <text x="${x + w + 12}" y="${y + h / 2}" fill="currentColor" font-size="8" text-anchor="middle" dominant-baseline="middle" transform="rotate(90 ${x + w + 12} ${y + h / 2})">
                  ${params.depth}
                </text>
              `;
            })()}
          </svg>
        </div>
      </div>

      <!-- Material -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Material (EN 1995-1-1)
        </div>
        <div>
          <span style="color: var(--text-secondary);">Timber class:</span>
          ${params.timberClass}
          (${design.classProps.type === "solid" ? "Solid timber" : "Glulam"})
        </div>
        <div>
          <span style="color: var(--text-secondary);">Service class:</span>
          ${params.serviceClass}
        </div>
        <div>
          <span style="color: var(--text-secondary);">Load duration:</span>
          ${params.loadDurationClass}
        </div>
      </div>

      <!-- Design factors -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">Design Factors</div>
        <div>
          <span style="color: var(--text-secondary);">k<sub>mod</sub>:</span>
          ${design.kMod}
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(Table 3.1)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">γ<sub>M</sub>:</span>
          ${design.gammaM}
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(Table 2.3)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >k<sub>h</sub> (bending):</span
          >
          ${design.kH_m.toFixed(3)}
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(§3.2/3.3)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >k<sub>h</sub> (tension):</span
          >
          ${design.kH_t.toFixed(3)}
        </div>
      </div>

      <!-- Design Strengths -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Design Strengths
        </div>
        <div>
          <span style="color: var(--text-secondary);">f<sub>m,d</sub>:</span>
          ${design.fm_d.toFixed(2)} MPa
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(f<sub>m,k</sub> = ${design.classProps.fm_k} MPa)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">f<sub>t,0,d</sub>:</span>
          ${design.ft_0_d.toFixed(2)} MPa
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(f<sub>t,0,k</sub> = ${design.classProps.ft_0_k} MPa)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">f<sub>c,0,d</sub>:</span>
          ${design.fc_0_d.toFixed(2)} MPa
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(f<sub>c,0,k</sub> = ${design.classProps.fc_0_k} MPa)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">f<sub>v,d</sub>:</span>
          ${design.fv_d.toFixed(2)} MPa
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(f<sub>v,k</sub> = ${design.classProps.fv_k} MPa)</span
          >
        </div>
      </div>

      <!-- Internal Forces & Stresses -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Internal Forces & Stresses
        </div>
        <div>
          <span style="color: var(--text-secondary);">N<sub>Ed</sub>:</span>
          ${design.NEd >= 0 ? "+" : ""}${design.NEd.toFixed(1)} kN
          <span style="color: var(--text-secondary); font-size: 0.75rem;">
            (${design.NEd > 0
              ? "compression"
              : design.NEd < 0
                ? "tension"
                : "none"})
          </span>
        </div>
        <div>
          <span style="color: var(--text-secondary);">M<sub>y,Ed</sub>:</span>
          ${design.MEd.toFixed(1)} kNm
        </div>
        ${design.MEd_weak > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >M<sub>z,Ed</sub>:</span
              >
              ${design.MEd_weak.toFixed(1)} kNm
            </div>`
          : null}
        <div>
          <span style="color: var(--text-secondary);">V<sub>y,Ed</sub>:</span>
          ${design.VEd.toFixed(1)} kN
        </div>
        ${design.VEd_z > 0
          ? html`<div>
              <span style="color: var(--text-secondary);">V<sub>z,Ed</sub>:</span>
              ${design.VEd_z.toFixed(1)} kN
            </div>`
          : null}
        <div style="margin-top: 4px;">
          <span style="color: var(--text-secondary);">σ<sub>m,y,d</sub>:</span>
          ${design.sigma_m_y_d.toFixed(2)} MPa
        </div>
        ${design.sigma_m_z_d > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >σ<sub>m,z,d</sub>:</span
              >
              ${design.sigma_m_z_d.toFixed(2)} MPa
            </div>`
          : null}
        <div>
          <span style="color: var(--text-secondary);">τ<sub>d</sub>:</span>
          ${design.tau_d.toFixed(2)} MPa
        </div>

        ${design.sigma_t_0_d > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >σ<sub>t,0,d</sub>:</span
              >
              ${design.sigma_t_0_d.toFixed(2)} MPa
            </div>`
          : null}
        ${design.sigma_c_0_d > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >σ<sub>c,0,d</sub>:</span
              >
              ${design.sigma_c_0_d.toFixed(2)} MPa
            </div>`
          : null}
      </div>

      <!-- Column Buckling -->
      ${design.bucklingCheck
        ? html`<div style="${getSeparator()}">
            <div style="font-weight: 500; margin-bottom: 4px;">
              Column Buckling (Eq. 6.23/6.24)
            </div>
            <div>
              <span style="color: var(--text-secondary);">L<sub>ef</sub>:</span>
              ${(design.bucklingCheck.L_ef / 1000).toFixed(2)} m
            </div>
            <div>
              <span style="color: var(--text-secondary);"
                >λ<sub>rel,y</sub>:</span
              >
              ${design.bucklingCheck.lambda_rel_y.toFixed(3)}
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(k<sub>c,y</sub> =
                ${design.bucklingCheck.k_c_y.toFixed(3)})</span
              >
            </div>
            <div>
              <span style="color: var(--text-secondary);"
                >λ<sub>rel,z</sub>:</span
              >
              ${design.bucklingCheck.lambda_rel_z.toFixed(3)}
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(k<sub>c,z</sub> =
                ${design.bucklingCheck.k_c_z.toFixed(3)})</span
              >
            </div>
            <div>
              <span style="color: var(--text-secondary);"
                >Eq. 6.23 (y-axis):</span
              >
              ${(design.bucklingCheck.util_y * 100).toFixed(1)}%
            </div>
            <div>
              <span style="color: var(--text-secondary);"
                >Eq. 6.24 (z-axis):</span
              >
              ${(design.bucklingCheck.util_z * 100).toFixed(1)}%
            </div>
          </div>`
        : ""}

      <!-- Utilization Checks -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 8px;">
          Utilization Checks
        </div>
        <div
          style="display: grid; grid-template-columns: 1fr auto auto; gap: 4px 12px; font-size: 0.85rem;"
        >
          <div style="color: var(--text-secondary); font-size: 0.75rem;">
            Check
          </div>
          <div style="color: var(--text-secondary); font-size: 0.75rem;">
            Ratio
          </div>
          <div style="color: var(--text-secondary); font-size: 0.75rem;">
            Status
          </div>

          ${getCheckRow("Bending (Eq. 6.11/6.12)", design.util_bending)}
          ${getCheckRow("Tension (Eq. 6.1)", design.util_tension)}
          ${getCheckRow("Compression (Eq. 6.2)", design.util_compression)}
          ${getCheckRow("Shear (Eq. 6.13)", design.util_shear)}
          ${getCheckRow(
            `Combined (${design.combinedEq})`,
            design.util_combined,
          )}
        </div>
      </div>

      <!-- Governing Utilization -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 8px;">Utilization</div>
        <div
          style="display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: center;"
        >
          <div style="color: var(--text-secondary);">Governing:</div>
          <div>
            <span
              style="font-weight: 500; color: ${design.utilization > 1.0
                ? "#ef4444"
                : design.utilization > 0.7
                  ? "#f59e0b"
                  : "#10b981"};"
            >
              ${(design.utilization * 100).toFixed(1)}%
            </span>
            <span
              style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
              >(${design.governingCheck})</span
            >
          </div>

          <div style="color: var(--text-secondary);">Status:</div>
          <div>
            <span
              style="padding: 2px 8px; border-radius: 3px; font-size: 0.75rem; font-weight: 500; background: ${design.utilization <=
              1.0
                ? "#10b98120"
                : "#ef444420"}; color: ${design.utilization <= 1.0
                ? "#10b981"
                : "#ef4444"};"
            >
              ${design.utilization <= 1.0 ? "PASS" : "FAIL"}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helpers
function getSeparator() {
  return "border-top: 1px solid var(--border); padding-top: 12px; margin-bottom: 12px;";
}

function getCheckRow(label: string, value: number) {
  const color = value > 1.0 ? "#ef4444" : value > 0.7 ? "#f59e0b" : "#10b981";
  const display = value > 0 ? `${(value * 100).toFixed(1)}%` : "—";
  const status = value > 0 ? (value <= 1.0 ? "✓" : "✗") : "—";
  return html`
    <div>${label}</div>
    <div
      style="text-align: right; color: ${value > 0
        ? color
        : "var(--text-secondary)"};"
    >
      ${display}
    </div>
    <div
      style="text-align: center; color: ${value > 0
        ? color
        : "var(--text-secondary)"};"
    >
      ${status}
    </div>
  `;
}
