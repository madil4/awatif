import { html, svg } from "lit-html";
import { SteelMemberParams } from "./steelMember";
import { SteelMemberDesign } from "./getDesign";
import { STEEL_GRADES } from "./steelProfiles";

export function getReport({
  params,
  design,
}: {
  params: SteelMemberParams;
  design: SteelMemberDesign;
}) {
  const grade = STEEL_GRADES[params.steelGrade];

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
          <li>
            Only <strong>I/H-sections (Class 1–3)</strong> are supported. Class
            4 (slender) sections are not. Combined beam-column interaction (Eq.
            6.61/6.62) and LTB are not yet implemented.
          </li>
        </ul>
      </div>

      <!-- Geometry -->
      <div
        style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start;"
      >
        <div>
          <div style="font-weight: 500; margin-bottom: 4px;">Geometry</div>
          <div>
            <span style="color: var(--text-secondary);">Profile:</span>
            ${params.profile}
          </div>
          <div>
            <span style="color: var(--text-secondary);">h × b:</span>
            ${design.profileProps.h} × ${design.profileProps.b} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);"
              >t<sub>w</sub> / t<sub>f</sub>:</span
            >
            ${design.profileProps.tw} / ${design.profileProps.tf} mm
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
            <span style="color: var(--text-secondary);">W<sub>pl,y</sub>:</span>
            ${(design.Wpl_y / 1e3).toFixed(1)} ×10³ mm³
          </div>
          <div>
            <span style="color: var(--text-secondary);">W<sub>pl,z</sub>:</span>
            ${(design.Wpl_z / 1e3).toFixed(1)} ×10³ mm³
          </div>
        </div>

        <div
          style="display: flex; justify-content: center; align-items: center; margin-left: 16px; margin-right: 8px;"
        >
          ${getISectionSvg(design)}
        </div>
      </div>

      <!-- Material -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Material (EN 1993-1-1)
        </div>
        <div>
          <span style="color: var(--text-secondary);">Steel grade:</span>
          ${params.steelGrade}
        </div>
        <div>
          <span style="color: var(--text-secondary);">f<sub>y</sub>:</span>
          ${design.fy} MPa
        </div>
        <div>
          <span style="color: var(--text-secondary);">f<sub>u</sub>:</span>
          ${grade?.fu ?? "—"} MPa
        </div>
        <div>
          <span style="color: var(--text-secondary);">γ<sub>M0</sub>:</span>
          ${design.gammaM0}
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(§6.1)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">γ<sub>M1</sub>:</span>
          ${design.gammaM1}
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(§6.1)</span
          >
        </div>
      </div>

      <!-- Section Classification -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Section Classification (Cl. 5.2)
        </div>
        <div>
          <span style="color: var(--text-secondary);">ε:</span>
          ${design.eps.toFixed(3)}
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >Flange c<sub>f</sub>/t<sub>f</sub>:</span
          >
          ${design.profileProps.b > 0
            ? (
                (design.profileProps.b -
                  design.profileProps.tw -
                  2 * design.profileProps.r) /
                2 /
                design.profileProps.tf
              ).toFixed(2)
            : "—"}
          → Class ${design.flangeClass}
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >Web c<sub>w</sub>/t<sub>w</sub>:</span
          >
          ${(
            (design.profileProps.h -
              2 * design.profileProps.tf -
              2 * design.profileProps.r) /
            design.profileProps.tw
          ).toFixed(2)}
          → Class ${design.webClass}
        </div>
        <div>
          <span style="color: var(--text-secondary);">Section class:</span>
          <strong>Class ${design.sectionClass}</strong>
        </div>
        ${design.sectionClass === 3
          ? html`<div
              style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b;"
            >
              Class 3 — elastic modulus W<sub>el,y</sub> used for bending
              resistance
            </div>`
          : ""}
      </div>

      <!-- Internal Forces -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">Internal Forces</div>
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
          <span style="color: var(--text-secondary);">M<sub>Ed,y</sub>:</span>
          ${design.MEd.toFixed(1)} kNm
        </div>
        ${design.MEd_z > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >M<sub>Ed,z</sub>:</span
              >
              ${design.MEd_z.toFixed(1)} kNm
            </div>`
          : ""}
        <div>
          <span style="color: var(--text-secondary);">V<sub>Ed,y</sub>:</span>
          ${design.VEd.toFixed(1)} kN
        </div>
        ${design.VEd_z > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >V<sub>Ed,z</sub>:</span
              >
              ${design.VEd_z.toFixed(1)} kN
            </div>`
          : ""}
      </div>

      <!-- Resistances -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">Resistances</div>
        <div>
          <span style="color: var(--text-secondary);">N<sub>pl,Rd</sub>:</span>
          ${design.N_pl_Rd.toFixed(1)} kN
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(Cl. 6.2.3/6.2.4)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">M<sub>c,y,Rd</sub>:</span>
          ${design.M_c_Rd.toFixed(1)} kNm
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(Cl. 6.2.5)</span
          >
        </div>
        ${design.MEd_z > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >M<sub>c,z,Rd</sub>:</span
              >
              ${design.M_c_z_Rd.toFixed(1)} kNm
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(Cl. 6.2.5)</span
              >
            </div>`
          : ""}
        <div>
          <span style="color: var(--text-secondary);"
            >V<sub>pl,y,Rd</sub>:</span
          >
          ${design.V_pl_Rd.toFixed(1)} kN
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(Cl. 6.2.6)</span
          >
        </div>
        ${design.VEd_z > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >V<sub>pl,z,Rd</sub>:</span
              >
              ${design.V_pl_z_Rd.toFixed(1)} kN
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(Cl. 6.2.6)</span
              >
            </div>`
          : ""}
        ${design.util_MV > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >M<sub>V,Rd</sub>:</span
              >
              ${design.M_V_Rd.toFixed(1)} kNm
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(Cl. 6.2.8)</span
              >
            </div>`
          : ""}
        ${design.util_MN > 0
          ? html`<div>
              <span style="color: var(--text-secondary);"
                >M<sub>N,y,Rd</sub>:</span
              >
              ${design.M_N_y_Rd.toFixed(1)} kNm
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(Cl. 6.2.9)</span
              >
            </div>`
          : ""}
      </div>

      <!-- Column Buckling -->
      ${design.bucklingCheck
        ? html`<div style="${getSeparator()}">
            <div style="font-weight: 500; margin-bottom: 4px;">
              Column Buckling (Cl. 6.3.1)
            </div>
            <div>
              <span style="color: var(--text-secondary);">L<sub>cr</sub>:</span>
              ${(design.bucklingCheck.L_cr / 1000).toFixed(2)} m
            </div>
            <div>
              <span style="color: var(--text-secondary);">λ̄<sub>y</sub>:</span>
              ${design.bucklingCheck.lambda_y.toFixed(3)}
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(curve ${design.bucklingCheck.curve_y}, χ<sub>y</sub> =
                ${design.bucklingCheck.chi_y.toFixed(3)})</span
              >
            </div>
            <div>
              <span style="color: var(--text-secondary);">λ̄<sub>z</sub>:</span>
              ${design.bucklingCheck.lambda_z.toFixed(3)}
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(curve ${design.bucklingCheck.curve_z}, χ<sub>z</sub> =
                ${design.bucklingCheck.chi_z.toFixed(3)})</span
              >
            </div>
            <div>
              <span style="color: var(--text-secondary);"
                >N<sub>b,Rd</sub>:</span
              >
              ${design.bucklingCheck.N_b_Rd.toFixed(1)} kN
              <span
                style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                >(${design.bucklingCheck.governingAxis}-axis governs)</span
              >
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

          ${getCheckRow("Tension (Cl. 6.2.3)", design.util_tension)}
          ${getCheckRow("Compression (Cl. 6.2.4)", design.util_compression)}
          ${getCheckRow("Bending (Cl. 6.2.5)", design.util_bending)}
          ${getCheckRow("Shear y (Cl. 6.2.6)", design.util_shear)}
          ${getCheckRow("Shear z (Cl. 6.2.6)", design.util_shear_z)}
          ${getCheckRow("M+V Interaction (Cl. 6.2.8)", design.util_MV)}
          ${getCheckRow("M+N Interaction (Cl. 6.2.9)", design.util_MN)}
          ${getCheckRow(
            "Biaxial Bending (Eq. 6.41)",
            design.util_bending_biaxial,
          )}
          ${design.bucklingCheck
            ? getCheckRow(
                "Buckling (Cl. 6.3.1)",
                design.bucklingCheck.utilization,
              )
            : ""}
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

// ── Helpers ──────────────────────────────────────────────────────────

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

function getISectionSvg(design: SteelMemberDesign) {
  const { h, b, tw, tf } = design.profileProps;
  const maxDim = Math.max(h, b);
  const scale = 100 / maxDim;

  const sw = b * scale; // scaled flange width
  const sh = h * scale; // scaled height
  const stw = tw * scale; // scaled web thickness
  const stf = tf * scale; // scaled flange thickness

  const x = 65 - sw / 2;
  const y = 65 - sh / 2;

  return svg`
    <svg width="120" height="120" viewBox="0 0 130 130" style="overflow: visible; color: var(--text-primary);">
      <!-- Top flange -->
      <rect x="${x}" y="${y}" width="${sw}" height="${stf}"
        fill="none" stroke="currentColor" stroke-width="1.5" />
      <!-- Bottom flange -->
      <rect x="${x}" y="${y + sh - stf}" width="${sw}" height="${stf}"
        fill="none" stroke="currentColor" stroke-width="1.5" />
      <!-- Web -->
      <rect x="${65 - stw / 2}" y="${y + stf}" width="${stw}" height="${sh - 2 * stf}"
        fill="none" stroke="currentColor" stroke-width="1.5" />

      <!-- Dimension: width (top) -->
      <line x1="${x}" y1="${y - 8}" x2="${x + sw}" y2="${y - 8}" stroke="currentColor" stroke-width="0.5" />
      <line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y - 6}" stroke="currentColor" stroke-width="0.5" />
      <line x1="${x + sw}" y1="${y - 10}" x2="${x + sw}" y2="${y - 6}" stroke="currentColor" stroke-width="0.5" />
      <text x="${x + sw / 2}" y="${y - 12}" fill="currentColor" font-size="8" text-anchor="middle">
        ${b}
      </text>

      <!-- Dimension: height (right) -->
      <line x1="${x + sw + 8}" y1="${y}" x2="${x + sw + 8}" y2="${y + sh}" stroke="currentColor" stroke-width="0.5" />
      <line x1="${x + sw + 6}" y1="${y}" x2="${x + sw + 10}" y2="${y}" stroke="currentColor" stroke-width="0.5" />
      <line x1="${x + sw + 6}" y1="${y + sh}" x2="${x + sw + 10}" y2="${y + sh}" stroke="currentColor" stroke-width="0.5" />
      <text x="${x + sw + 12}" y="${y + sh / 2}" fill="currentColor" font-size="8" text-anchor="middle" dominant-baseline="middle"
        transform="rotate(90 ${x + sw + 12} ${y + sh / 2})">
        ${h}
      </text>
    </svg>
  `;
}
