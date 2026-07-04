import { html, svg } from "lit-html";
import { ConcreteMemberParams } from "./concreteMember";
import { ConcreteMemberDesign } from "./getDesign";

export function getReport({
  params,
  design,
}: {
  params: ConcreteMemberParams;
  design: ConcreteMemberDesign;
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
            This report is <strong>experimental</strong>. Results may contain errors
            until the stable release. Always verify with an independent
            calculation.
          </li>
          <li>
            Design follows <strong>${design.annex}</strong>.
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
            <span style="color: var(--text-secondary);">Size:</span>
            ${params.width} × ${params.depth} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);">Length:</span>
            ${design.l.toFixed(2)} m
          </div>
          <div>
            <span style="color: var(--text-secondary);">Cover:</span>
            ${params.cover} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);">A<sub>s</sub>:</span>
            ${params.steelArea} mm²
            <span style="color: var(--text-secondary); margin-left: 4px;"
              >[${design.AsMin.toFixed(0)} – ${design.AsMax.toFixed(0)} mm²]</span
            >
          </div>
          <div style="margin-top: 4px;">
            <span style="color: var(--text-secondary);">A<sub>s,w</sub>:</span>
            ${design.Asw_s_prov?.toFixed(2)} mm²/mm
            <span style="color: var(--text-secondary); margin-left: 4px;"
              >[min ${design.Asw_s_min?.toFixed(2)} mm²/mm]</span
            >
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
              const c = params.cover * scale;
              const x = 65 - w / 2;
              const y = 65 - h / 2;
              return svg`
                <!-- Concrete -->
                <rect
                  x="${x}"
                  y="${y}"
                  width="${w}"
                  height="${h}"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <!-- Corner Rebars -->
                <circle cx="${x + c}" cy="${y + c}" r="3" fill="currentColor" />
                <circle cx="${x + w - c}" cy="${y + c}" r="3" fill="currentColor" />
                <circle cx="${x + c}" cy="${y + h - c}" r="3" fill="currentColor" />
                <circle cx="${x + w - c}" cy="${y + h - c}" r="3" fill="currentColor" />

                <!-- Top steel layer label -->
                <text x="${x + w / 2}" y="${y + c}" fill="currentColor" font-size="8" text-anchor="middle" dominant-baseline="middle" opacity="0.6">As/2</text>

                <!-- Bottom steel layer label -->
                <text x="${x + w / 2}" y="${y + h - c}" fill="currentColor" font-size="8" text-anchor="middle" dominant-baseline="middle" opacity="0.6">As/2</text>

                <!-- Dimensions -->
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
        <div style="font-weight: 500; margin-bottom: 4px;">Material</div>
        <div>
          <span style="color: var(--text-secondary);">Concrete:</span>
          ${params.concreteGrade}, f<sub>ck</sub> = ${design.fck} MPa, f<sub
            >cd</sub
          >
          = ${design.fcd.toFixed(1)} MPa
        </div>
        <div>
          <span style="color: var(--text-secondary);">Steel:</span>
          ${params.steelGrade}, f<sub>yk</sub> = ${design.fyk} MPa, f<sub
            >yd</sub
          >
          = ${design.fyd.toFixed(0)} MPa
        </div>
        <div>
          <span style="color: var(--text-secondary);">E<sub>cm</sub>:</span>
          ${design.Ecm.toFixed(0)} MPa
        </div>
      </div>

      <!-- Imperfections -->
      <div style="${getSeparator()}">
        ${design.imperfections
          ? html`
              <div style="font-weight: 500; margin-bottom: 4px;">
                Imperfections (EN 1992-1-1 §5.2)
              </div>
              ${design.imperfections.globalInclination
                ? html`
                    <div>
                      <span style="color: var(--text-secondary);"
                        >Global Inclination:</span
                      >
                      Applied
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);">θ₀:</span>
                      ${design.imperfections.theta0.toFixed(4)} rad
                    </div>
                  `
                : html`
                    <div>
                      <span style="color: var(--text-secondary);"
                        >Global Inclination:</span
                      >
                      Not applied
                    </div>
                  `}
              ${design.imperfections.localBow
                ? html`
                    <div style="margin-top: 4px;">
                      <span style="color: var(--text-secondary);"
                        >Local Bow:</span
                      >
                      e₀ = L / ${design.imperfections.bowRatioDenominator}
                    </div>
                  `
                : html`
                    <div style="margin-top: 4px;">
                      <span style="color: var(--text-secondary);"
                        >Local Bow:</span
                      >
                      Not applied
                    </div>
                  `}
              <div style="margin-top: 4px;">
                <span style="color: var(--text-secondary);">Direction:</span>
                ${design.imperfections.direction === "positive"
                  ? "Positive X"
                  : "Negative X"}
              </div>
            `
          : html`
              <div
                style="padding: 8px 12px; border-radius: 4px; background: #f59e0b20; color: #f59e0b; font-size: 0.8rem;"
              >
                No imperfections applied. Consider adding geometric
                imperfections (EN 1992-1-1 §5.2) as they affect design results.
              </div>
            `}
      </div>

      <!-- Unbraced Warning -->
      ${!design.braced && design.activeAnalysis === "linear"
        ? html`
            <div style="${getSeparator()}">
              <div
                style="padding: 8px 12px; border-radius: 4px; background: #f59e0b20; color: #f59e0b; font-size: 0.8rem;"
              >
                Unbraced column: global second-order effects (P-Δ) must be
                accounted for by amplifying horizontal loads before running
                analysis (EN 1992-1-1 §5.8.7.3, Annex H). Only the member-level
                P-δ check is applied here.
              </div>
            </div>
          `
        : null}

      <!-- Stiffness -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 4px;">
          Stiffness (EN 1992-1-1 §5.8.7.2)
        </div>
        ${design.activeAnalysis === "linear"
          ? html`
              <div>
                <span style="color: var(--text-secondary);"
                  >EI<sub>el</sub>:</span
                >
                ${design.EIelastic!.toFixed(1)} kNm²
                <span
                  style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                  >(E<sub>cm</sub>×I<sub>c</sub>, 1st-order analysis)</span
                >
              </div>
            `
          : null}
        <div>
          <span style="color: var(--text-secondary);">ρ:</span>
          ${design.rho.toFixed(4)}
          ${design.rho < 0.01
            ? html`<span
                style="color: #f59e0b; font-size: 0.75rem; margin-left: 4px;"
                >⚠ ρ &lt; 0.01 — Eq. 5.26 requires ρ ≥ 0.01 (§5.8.7.2(3))</span
              >`
            : null}
        </div>
        <div>
          <span style="color: var(--text-secondary);">K<sub>c</sub>:</span>
          ${design.Kc.toFixed(3)}
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(0.3 / (1+0.5φ<sub>ef</sub>), Eq. 5.26)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">K<sub>s</sub>:</span>
          0
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(Eq. 5.26)</span
          >
        </div>
        <div>
          <span style="color: var(--text-secondary);">EI<sub>nom</sub>:</span>
          ${design.EI.toFixed(1)} kNm²
          <span
            style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
            >(K<sub>c</sub>×E<sub>cd</sub>×I<sub>c</sub>${design.activeAnalysis ===
            "linear"
              ? html`, for N<sub>B</sub>`
              : ""})</span
          >
        </div>
      </div>

      <!-- Internal Forces -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 8px;">Internal Forces</div>
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
          <div>${formatForce(design.startN, "kN")}</div>
          <div>${formatForce(design.endN, "kN")}</div>

          <div style="color: var(--text-secondary);">Mz</div>
          <div>${formatForce(design.startMz, "kNm")}</div>
          <div>${formatForce(design.endMz, "kNm")}</div>

          ${design.maxAnalysisMomentY > 0.01
            ? html`
                <div style="color: var(--text-secondary);">My</div>
                <div>${formatForce(design.startMy, "kNm")}</div>
                <div>${formatForce(design.endMy, "kNm")}</div>
              `
            : null}
        </div>
        <div style="margin-top: 6px;">
          <span style="color: var(--text-secondary);">Max |Mz|:</span>
          ${design.maxAnalysisMoment.toFixed(1)} kNm
        </div>
        ${design.maxAnalysisMomentY > 0.01
          ? html`
              <div style="margin-top: 4px;">
                <span style="color: var(--text-secondary);">Max |My|:</span>
                ${design.maxAnalysisMomentY.toFixed(1)} kNm
              </div>
            `
          : null}
        <div style="margin-top: 4px;">
          <span style="color: var(--text-secondary);">Max |Vy|:</span>
          ${design.VEd.toFixed(1)} kN
        </div>
        ${design.VEd_z > 0.01
          ? html`
              <div style="margin-top: 4px;">
                <span style="color: var(--text-secondary);">Max |Vz|:</span>
                ${design.VEd_z.toFixed(1)} kN
              </div>
            `
          : null}
      </div>

      <!-- Shear Check — Vy -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500; margin-bottom: 8px;">
          Shear Check — Vy (EN 1992-1-1 §6.2)
        </div>
        <div>
          <span style="color: var(--text-secondary);">V<sub>Ed</sub>:</span>
          ${design.VEd.toFixed(1)} kN
        </div>
        <div>
          <span style="color: var(--text-secondary);">V<sub>Rd,c</sub>:</span>
          ${design.VRd_c?.toFixed(1)} kN
        </div>

        ${design.needsShearReinf
          ? html`
              <div>
                <span style="color: var(--text-secondary);">V<sub>Rd,s</sub>:</span>
                ${design.VRd_s?.toFixed(1)} kN
              </div>
            `
          : ""}

        <div style="margin-top: 8px; font-size: 0.8rem;">
          <div>
            <span style="color: var(--text-secondary);">Stirrups A<sub>sw</sub>:</span>
            ${params.stirrupArea} mm²/m
          </div>
          <div>
            <span style="color: var(--text-secondary);">A<sub>sw,min</sub>:</span>
            ${((design.Asw_s_min ?? 0) * 1000).toFixed(1)} mm²/m
          </div>
        </div>
      </div>

      <!-- Shear Check — Vz (only when non-zero) -->
      ${design.VEd_z > 0.01
        ? html`
            <div style="${getSeparator()}">
              <div style="font-weight: 500; margin-bottom: 8px;">
                Shear Check — Vz (EN 1992-1-1 §6.2)
              </div>
              <div>
                <span style="color: var(--text-secondary);">V<sub>Ed,z</sub>:</span>
                ${design.VEd_z.toFixed(1)} kN
              </div>
              <div>
                <span style="color: var(--text-secondary);">V<sub>Rd,c</sub>:</span>
                ${design.VRd_c_y?.toFixed(1)} kN
              </div>
              ${design.needsShearReinf_y
                ? html`
                    <div>
                      <span style="color: var(--text-secondary);">V<sub>Rd,s</sub>:</span>
                      ${design.VRd_s_y?.toFixed(1)} kN
                    </div>
                  `
                : ""}
            </div>
          `
        : null}

      <!-- Slenderness Check — z-axis -->
      ${design.activeAnalysis === "linear"
        ? html`
            <div style="${getSeparator()}">
              <div style="font-weight: 500; margin-bottom: 8px;">
                Slenderness Check — Mz (EN 1992-1-1 §5.8.3)
              </div>
              <div>
                <span style="color: var(--text-secondary);">l₀/l:</span>
                ${params.lengthFactor}
              </div>
              <div>
                <span style="color: var(--text-secondary);">l₀:</span>
                ${design.l0!.toFixed(2)} m
              </div>
              <div>
                <span style="color: var(--text-secondary);">i:</span>
                ${design.i!.toFixed(1)} mm
              </div>
              <div>
                <span style="color: var(--text-secondary);"
                  >r<sub>m</sub>:</span
                >
                ${design.rm!.toFixed(2)}
                <span
                  style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                  >(${design.braced
                    ? design.rm === 1
                      ? "M₀₁ or M₀₂ ≈ 0"
                      : "M₀₁/M₀₂"
                    : "forced = 1 (unbraced)"},
                  C = ${(1.7 - design.rm!).toFixed(2)})</span
                >
              </div>
              <div>
                <span style="color: var(--text-secondary);">λ:</span>
                ${design.lambda!.toFixed(1)}
                <span style="color: var(--text-secondary);"> vs </span>
                <span style="color: var(--text-secondary);"
                  >λ<sub>lim</sub>:</span
                >
                ${design.lambdaLim!.toFixed(1)}
              </div>
              <div>
                <span
                  style="padding: 2px 8px; border-radius: 3px; font-size: 0.75rem; font-weight: 500; background: ${design.isSlender
                    ? "#f59e0b20"
                    : "#10b98120"}; color: ${design.isSlender
                    ? "#f59e0b"
                    : "#10b981"};"
                >
                  ${design.isSlender ? "SLENDER" : "NON-SLENDER"}
                </span>
              </div>

              ${design.maxAnalysisMomentY > 0.01
                ? html`
                    <div style="margin-top: 12px; font-weight: 500; margin-bottom: 4px;">
                      Slenderness — My
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);">i<sub>y</sub>:</span>
                      ${design.i_y!.toFixed(1)} mm
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);"
                        >r<sub>m,y</sub>:</span
                      >
                      ${design.rm_y!.toFixed(2)}
                      <span
                        style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                        >(C = ${(1.7 - design.rm_y!).toFixed(2)})</span
                      >
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);">λ<sub>y</sub>:</span>
                      ${design.lambda_y!.toFixed(1)}
                      <span style="color: var(--text-secondary);"> vs </span>
                      <span style="color: var(--text-secondary);"
                        >λ<sub>lim,y</sub>:</span
                      >
                      ${design.lambdaLim_y!.toFixed(1)}
                    </div>
                    <div>
                      <span
                        style="padding: 2px 8px; border-radius: 3px; font-size: 0.75rem; font-weight: 500; background: ${design.isSlender_y
                          ? "#f59e0b20"
                          : "#10b98120"}; color: ${design.isSlender_y
                          ? "#f59e0b"
                          : "#10b981"};"
                      >
                        ${design.isSlender_y ? "SLENDER" : "NON-SLENDER"}
                      </span>
                    </div>
                  `
                : null}
            </div>
          `
        : null}

      <!-- Design Moments — z-axis Magnification §5.8.7 -->
      ${design.activeAnalysis === "linear"
        ? html`
            <div style="${getSeparator()}">
              <div style="font-weight: 500; margin-bottom: 8px;">
                Design Moments (EN 1992-1-1 §5.8.7)
              </div>

              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px;">z-axis (Mz)</div>
              <div>
                <span style="color: var(--text-secondary);">M₀₁:</span>
                ${design.M01!.toFixed(2)} kNm
              </div>
              <div>
                <span style="color: var(--text-secondary);">M₀₂:</span>
                ${design.M02!.toFixed(2)} kNm
              </div>
              <div>
                <span style="color: var(--text-secondary);"
                  >M₀<sub>e</sub>:</span
                >
                ${design.M0e!.toFixed(2)} kNm
              </div>
              ${design.isSlender && design.NB != null
                ? html`
                    <div style="margin-top: 8px;">
                      <span style="color: var(--text-secondary);"
                        >N<sub>B</sub>:</span
                      >
                      ${design.NB.toFixed(0)} kN
                      <span
                        style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                        >(π²EI/l₀²)</span
                      >
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);"
                        >N<sub>Ed</sub>/N<sub>B</sub>:</span
                      >
                      ${(design.NEd / design.NB).toFixed(3)}
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);">β:</span>
                      ${(Math.PI ** 2 / 8).toFixed(3)}
                      <span
                        style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                        >(π²/c₀ = π²/8)</span
                      >
                    </div>
                  `
                : null}
              <div style="font-weight: 500; margin-top: 8px;">
                <span style="color: var(--text-secondary);"
                  >M<sub>Ed,z</sub>:</span
                >
                ${design.MEd === Infinity
                  ? "UNSTABLE"
                  : html`${design.MEd.toFixed(1)} kNm`}
                <span
                  style="color: var(--text-secondary); font-weight: 400; font-size: 0.75rem;"
                >
                  (${design.governingCase})
                </span>
              </div>

              ${design.maxAnalysisMomentY > 0.01
                ? html`
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 12px; margin-bottom: 4px;">y-axis (My)</div>
                    <div>
                      <span style="color: var(--text-secondary);">M₀₁:</span>
                      ${design.M01_y!.toFixed(2)} kNm
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);">M₀₂:</span>
                      ${design.M02_y!.toFixed(2)} kNm
                    </div>
                    <div>
                      <span style="color: var(--text-secondary);"
                        >M₀<sub>e</sub>:</span
                      >
                      ${design.M0e_y!.toFixed(2)} kNm
                    </div>
                    ${design.isSlender_y && design.NB_y != null
                      ? html`
                          <div style="margin-top: 8px;">
                            <span style="color: var(--text-secondary);"
                              >N<sub>B,y</sub>:</span
                            >
                            ${design.NB_y.toFixed(0)} kN
                          </div>
                          <div>
                            <span style="color: var(--text-secondary);"
                              >N<sub>Ed</sub>/N<sub>B,y</sub>:</span
                            >
                            ${(design.NEd / design.NB_y).toFixed(3)}
                          </div>
                        `
                      : null}
                    <div style="font-weight: 500; margin-top: 8px;">
                      <span style="color: var(--text-secondary);"
                        >M<sub>Ed,y</sub>:</span
                      >
                      ${design.MEdy === Infinity
                        ? "UNSTABLE"
                        : html`${design.MEdy.toFixed(1)} kNm`}
                      <span
                        style="color: var(--text-secondary); font-weight: 400; font-size: 0.75rem;"
                      >
                        (${design.governingCaseY})
                      </span>
                    </div>
                  `
                : null}
            </div>
          `
        : null}

      <!-- Design Moment — Nonlinear -->
      ${design.activeAnalysis === "nonlinear"
        ? html`
            <div style="${getSeparator()}">
              <div style="font-weight: 500; margin-bottom: 8px;">
                Design Moment
              </div>
              <div>
                <span style="color: var(--text-secondary);"
                  >e<sub>min</sub>:</span
                >
                ${design.eMin.toFixed(1)} mm
                <span
                  style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;"
                  >(max(h/30, 20) — §6.1(4))</span
                >
              </div>
              <div>
                <span style="color: var(--text-secondary);"
                  >M<sub>Ed,min</sub>:</span
                >
                ${design.MEdMin.toFixed(2)} kNm
              </div>
              <div style="font-weight: 500; margin-top: 8px;">
                <span style="color: var(--text-secondary);"
                  >M<sub>Ed,z</sub>:</span
                >
                ${design.MEd.toFixed(1)} kNm
                <span
                  style="color: var(--text-secondary); font-weight: 400; font-size: 0.75rem;"
                >
                  (${design.governingCase})
                </span>
              </div>
              ${design.MEd < design.MEdMin
                ? html`
                    <div
                      style="margin-top: 8px; padding: 8px 12px; border-radius: 4px; background: #f59e0b20; color: #f59e0b; font-size: 0.8rem;"
                    >
                      ⚠ M<sub>Ed</sub> = ${design.MEd.toFixed(2)} kNm &lt;
                      M<sub>Ed,min</sub> = ${design.MEdMin.toFixed(2)} kNm
                      (e<sub>min</sub> = ${design.eMin.toFixed(1)} mm per
                      §6.1(4)). Applied imperfections do not satisfy minimum
                      eccentricity. Consider increasing the local bow or adding
                      imperfections.
                    </div>
                  `
                : null}
              ${design.maxAnalysisMomentY > 0.01
                ? html`
                    <div style="margin-top: 8px; font-weight: 500;">
                      <span style="color: var(--text-secondary);"
                        >M<sub>Ed,y</sub>:</span
                      >
                      ${design.MEdy.toFixed(1)} kNm
                      <span
                        style="color: var(--text-secondary); font-weight: 400; font-size: 0.75rem;"
                      >
                        (${design.governingCaseY})
                      </span>
                    </div>
                  `
                : null}
            </div>
          `
        : null}

      <!-- Section Capacity -->
      <div style="${getSeparator()}">
        <div style="font-weight: 500;">
          Section Capacity (EN 1992-1-1 Strain Compatibility)
        </div>

        <div style="margin-top: 2px; margin-bottom: 12px;">
          <span
            style="padding: 2px 8px; border-radius: 3px; font-size: 0.75rem; font-weight: 500; background: ${design.xNeutral /
              design.d <
            0.45
              ? "#10b98120"
              : "#f59e0b20"}; color: ${design.xNeutral / design.d < 0.45
              ? "#10b981"
              : "#f59e0b"};"
          >
            ${design.xNeutral / design.d < 0.45
              ? "TENSION-CONTROLLED"
              : "COMPRESSION-CONTROLLED"}
          </span>
        </div>

        <div style="display: flex; gap: 16px; align-items: stretch;">
          <div
            style="flex: 1; display: flex; flex-direction: column; gap: 12px;"
          >
            <div
              style="display: grid; grid-template-columns: auto 1fr; gap: 4px 8px; font-size: 0.85rem;"
            >
              <div style="color: var(--text-secondary);">
                e<span style="font-size: 0.75rem; margin-left: 2px;">(M/N)</span
                >:
              </div>
              <div>
                ${design.NEd > 0
                  ? ((design.MEd / design.NEd) * 1e3).toFixed(0)
                  : "∞"}
                mm
              </div>

              <div style="color: var(--text-secondary);">
                x<sub>neutral</sub>:
              </div>
              <div>
                ${design.xNeutral.toFixed(1)} mm
                <span style="color: var(--text-secondary); font-size: 0.75rem;"
                  >(x/d = ${(design.xNeutral / design.d).toFixed(2)})</span
                >
              </div>

              <div style="color: var(--text-secondary);">Strains:</div>
              <div style="font-size: 0.8rem;">
                ε<sub>s</sub> = ${(design.epsilonS * 1000).toFixed(2)}‰, ε<sub
                  >s'</sub
                >
                = ${(design.epsilonSPrime * 1000).toFixed(2)}‰
              </div>
            </div>

            <div style="margin-top: auto; padding-bottom: 4px;">
              <div
                style="display: grid; grid-template-columns: auto 1fr 1fr; gap: 4px 12px; font-size: 0.8rem; background: rgba(128,128,128,0.05); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border);"
              >
                <div style="color: var(--text-secondary);"></div>
                <div
                  style="color: var(--text-secondary); text-align: right; border-bottom: 1px solid var(--border); padding-bottom: 2px; margin-bottom: 2px;"
                >
                  Applied
                </div>
                <div
                  style="color: var(--text-secondary); text-align: right; border-bottom: 1px solid var(--border); padding-bottom: 2px; margin-bottom: 2px;"
                >
                  Capacity*
                </div>

                <div style="color: var(--text-secondary); font-weight: 500;">
                  N
                </div>
                <div style="text-align: right;">
                  ${design.NEd.toFixed(0)} kN
                </div>
                <div
                  style="text-align: right; color: var(--text-primary); font-weight: 500;"
                >
                  ${design.NRd.toFixed(0)} kN
                </div>

                <div style="color: var(--text-secondary); font-weight: 500;">
                  Mz
                </div>
                <div style="text-align: right;">
                  ${design.MEd.toFixed(1)} kNm
                </div>
                <div
                  style="text-align: right; color: var(--text-primary); font-weight: 500;"
                >
                  ${design.MRd.toFixed(1)} kNm
                </div>

                ${design.maxAnalysisMomentY > 0.01
                  ? html`
                      <div style="color: var(--text-secondary); font-weight: 500;">
                        My
                      </div>
                      <div style="text-align: right;">
                        ${design.MEdy.toFixed(1)} kNm
                      </div>
                      <div
                        style="text-align: right; color: var(--text-primary); font-weight: 500;"
                      >
                        ${design.MRdy.toFixed(1)} kNm
                      </div>
                    `
                  : null}
              </div>
              <div
                style="margin-top: 4px; font-size: 0.7rem; color: var(--text-secondary); font-style: italic; text-align: right;"
              >
                *Capacity at same eccentricity
              </div>
            </div>
          </div>

          <div
            style="width: 140px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; padding: 4px; border: 1px solid var(--border); border-radius: 6px; background: rgba(128,128,128,0.02);"
          >
            ${getInteractionDiagramSvg(design)}
          </div>
        </div>
      </div>

      <!-- Biaxial Check (§5.8.9) — only when My is present -->
      ${design.maxAnalysisMomentY > 0.01
        ? html`
            <div style="${getSeparator()}">
              <div style="font-weight: 500; margin-bottom: 8px;">
                Biaxial Check (EN 1992-1-1 §5.8.9)
              </div>
              <div>
                <span style="color: var(--text-secondary);">N<sub>Rd,0</sub>:</span>
                ${design.NRd0.toFixed(0)} kN
                <span style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;">(A<sub>c</sub>·f<sub>cd</sub> + A<sub>s</sub>·f<sub>yd</sub>)</span>
              </div>
              <div>
                <span style="color: var(--text-secondary);">n = N<sub>Ed</sub>/N<sub>Rd,0</sub>:</span>
                ${(design.NEd / design.NRd0).toFixed(3)}
              </div>
              <div>
                <span style="color: var(--text-secondary);">Exponent a:</span>
                ${design.biaxialExponent.toFixed(2)}
                <span style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 4px;">(interpolated per §5.8.9 Table)</span>
              </div>
              <div style="margin-top: 8px; font-size: 0.8rem;">
                <div>
                  (M<sub>Ed,z</sub>/M<sub>Rd,z</sub>)<sup>a</sup> =
                  (${design.MEd.toFixed(1)}/${design.MRd.toFixed(1)})<sup>${design.biaxialExponent.toFixed(2)}</sup>
                  = ${Math.pow(Math.abs(design.MEd) / design.MRd, design.biaxialExponent).toFixed(3)}
                </div>
                <div>
                  (M<sub>Ed,y</sub>/M<sub>Rd,y</sub>)<sup>a</sup> =
                  (${design.MEdy.toFixed(1)}/${design.MRdy.toFixed(1)})<sup>${design.biaxialExponent.toFixed(2)}</sup>
                  = ${Math.pow(Math.abs(design.MEdy) / design.MRdy, design.biaxialExponent).toFixed(3)}
                </div>
              </div>
              <div style="font-weight: 500; margin-top: 8px;">
                <span style="color: var(--text-secondary);">Sum:</span>
                <span style="color: ${design.biaxialRatio > 1.0 ? "#ef4444" : "#10b981"};">
                  ${design.biaxialRatio.toFixed(3)}
                </span>
                <span style="color: var(--text-secondary);"> ≤ 1.0</span>
              </div>
            </div>
          `
        : null}

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

          ${getCheckRow("Section Capacity — Mz (§6.1)", design.sectionUtilization)}
          ${design.maxAnalysisMomentY > 0.01
            ? getCheckRow("Biaxial Bending (§5.8.9)", design.biaxialUtilization)
            : null}
          ${getCheckRow("Shear — Vy (§6.2)", design.shearUtilization)}
          ${design.VEd_z > 0.01
            ? getCheckRow("Shear — Vz (§6.2)", design.shearUtilizationY)
            : null}
          ${getCheckRow(
            "Min Reinforcement (§9.5.2)",
            params.steelArea > 0 ? design.AsMin / params.steelArea : 0,
          )}
          ${getCheckRow(
            "Max Reinforcement (§9.5.2)",
            design.AsMax > 0 ? params.steelArea / design.AsMax : 0,
          )}
          ${getCheckRow(
            "Min Stirrups (§9.2.2)",
            design.Asw_s_prov! > 0
              ? design.Asw_s_min! / design.Asw_s_prov!
              : 0,
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

function formatForce(value: number, unit: string) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)} ${unit}`;
}

function getCheckRow(label: string, value: number) {
  const color = value > 1.0 ? "#ef4444" : value > 0.7 ? "#f59e0b" : "#10b981";
  const display = value > 0 ? `${(value * 100).toFixed(1)}%` : "—";
  const status = value > 0 ? (value <= 1.0 ? "✓" : "✗") : "—";
  return html`
    <div>${label}</div>
    <div
      style="text-align: right; color: ${value > 0 ? color : "var(--text-secondary)"};"
    >
      ${display}
    </div>
    <div
      style="text-align: center; color: ${value > 0 ? color : "var(--text-secondary)"};"
    >
      ${status}
    </div>
  `;
}

function getInteractionDiagramSvg(design: ConcreteMemberDesign) {
  const curve = design.interactionCurve;
  if (!curve || curve.length === 0) return html``;

  let minN = Math.min(...curve.map((p) => p.N));
  let maxN = Math.max(...curve.map((p) => p.N));
  let maxM = Math.max(...curve.map((p) => p.M));

  const padding = 0.1;
  const rangeN = maxN - minN || 10;
  minN -= rangeN * padding;
  maxN += rangeN * padding;
  let minM = 0;
  maxM += maxM * padding || 10;

  if (minN > 0) minN = -rangeN * 0.1;
  if (maxN < 0) maxN = rangeN * 0.1;

  const svgWidth = 100;
  const svgHeight = 140;

  const mapX = (m: number) => ((m - minM) / (maxM - minM)) * svgWidth;
  const mapY = (n: number) =>
    svgHeight - ((n - minN) / (maxN - minN)) * svgHeight;

  const pointsStr = curve.map((p) => `${mapX(p.M)},${mapY(p.N)}`).join(" ");

  const mEdX = mapX(Math.abs(design.MEd));
  const nEdY = mapY(design.NEd);

  const signN = design.NEd < 0 ? -1 : 1;
  const capN = design.NRd === 0 ? 0 : design.NRd * signN;
  const capM = design.MRd;

  const capX = mapX(capM);
  const capY = mapY(capN);

  return svg`
    <svg width="100%" height="100%" viewBox="-25 -20 ${svgWidth + 45} ${svgHeight + 40}" style="overflow: visible; font-size: 8px; font-family: monospace;">
      <!-- Axes -->
      <line x1="0" y1="${mapY(0)}" x2="${svgWidth + 10}" y2="${mapY(0)}" stroke="var(--text-secondary)" stroke-width="0.5" />
      <line x1="${mapX(0)}" y1="-10" x2="${mapX(0)}" y2="${svgHeight + 10}" stroke="var(--text-secondary)" stroke-width="0.5" />

      <!-- Capacity Area/Curve -->
      <polyline points="${pointsStr}" fill="#10b98115" stroke="#10b981" stroke-width="1.5" stroke-linejoin="round" />

      <!-- Load ray -->
      <line x1="${mapX(0)}" y1="${mapY(0)}" x2="${capX}" y2="${capY}" stroke="var(--text-secondary)" stroke-width="1" stroke-dasharray="2 2" />

      <!-- Capacity point -->
      <circle cx="${capX}" cy="${capY}" r="2.5" fill="var(--bg)" stroke="#10b981" stroke-width="1.5" />

      <!-- Applied Load point -->
      ${
        isFinite(design.MEd)
          ? svg`<circle cx="${mEdX}" cy="${nEdY}" r="2.5" fill="#ef4444" />`
          : svg`
            <g transform="translate(${svgWidth + 15}, ${nEdY})">
              <path d="M 0 0 L -8 -4 M 0 0 L -8 4" fill="none" stroke="#ef4444" stroke-width="2" />
              <line x1="0" y1="0" x2="-15" y2="0" stroke="#ef4444" stroke-width="2" />
              <text x="2" y="3" fill="#ef4444" font-size="12px">∞</text>
            </g>
          `
      }

      <!-- Axis Tick Values -->
      <text x="${mapX(0) - 4}" y="${mapY(maxN - rangeN * padding) + 3}" fill="var(--text-secondary)" text-anchor="end">${Math.round(maxN - rangeN * padding)}</text>
      <text x="${mapX(maxM - maxM * padding) - 5}" y="${mapY(0) + 10}" fill="var(--text-secondary)" text-anchor="middle">${Math.round(maxM - maxM * padding)}</text>

      <!-- Labels -->
      <text x="${svgWidth + 14}" y="${mapY(0)}" fill="var(--text-secondary)" text-anchor="start" dominant-baseline="middle" font-size="10px">M</text>
      <text x="${mapX(0)}" y="-16" fill="var(--text-secondary)" text-anchor="middle" font-size="10px">N</text>
    </svg>
  `;
}
