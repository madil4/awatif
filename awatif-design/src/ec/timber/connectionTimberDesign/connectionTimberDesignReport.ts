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
  const index = 0;  // node index
  console.log("i: ", i);
  console.log("o: ", o);
  console.log("node: ", designInput.node);

  designInput.node

  let reportHeader = html`
    <br>
    <header class="header">
        <div class="header-left">
            <h6>Timber Truss Designer</h6>
            <p class="bolt">Awatif.co</p>
            <p class="normal">20.05.2024</p>
        </div>
        <div class="header-right">
            <img src="./awatif-logo.png" id="headerLogo" height=60px>
        </div>
    </header>`;


  let reportHeading = html`
    <br>
    <h1>Structural Report</h2>`;

  let reportSummary = html`
    <h2>Summary</h2>
    <p>Design of node: ${designInput.node}</p>
    <p>Connected elements: ${designOutput.elements[index]}</p>
    <div class="canvas-container" id="threejs-connection"></div>
    <table>
        <tr>
            <th>Timber</th>
            <th>Width</th>
            <th>Height</th>
            <th>Load</th>
        </tr>
        <tr>
        <td> ${ i.timberGrade }</td>
        <td> ${ i.width } mm</td>
        <td> ${ i.height } mm</td>
        <td> ${ o[index][0].force.toFixed(0) } kN</td>
        </tr>
    </table>
    <br>
    <p class="bolt">Checks</p>
    <table>
        <tr>
            <th>Fastener Check</th>
            <th>Member Check</th>
            <th>Block Failure</th>
        </tr>
        <tr>
        <td> ${ (o[index][0].fastenerCheck*100).toFixed(0) } %</td>
        <td> ${ (o[index][0].etaAxialCheck*100).toFixed(0) } %</td>
        <td> ${ (o[index][0].etaBlockFailure*100).toFixed(0) } %</td>
        </tr>
    </table>
    <br>
    <br>`;
  
  let reportLoadProperties = html`
    <h3>Load Properties</h3>
    <p>Service class ${renderMath(`${i.serviceClass}`)} and Load duration: ${renderMath(`${i.loadDurationClass}`)} result in a modification factor of ${renderMath(`k_{mod} = ${o[index][0].kMod}`)}</p>
    <p>${renderMath(` \\gamma = 1.3`)}</p>
    <p>Resistance reduction factor</p>
    <p>${renderMath(` \\chi = \\frac{k_{mod}}{\\gamma} = ${o[index][0].chi}`)}</p>
    <br>`;

  let reportFastenerProperties = html`
    <h3>Fastener Properties</h3>
    <p class="caption">EN 1995-1-1 Ch. 8.5.1.1</p>
    <p>Characteristic value for the yield moment</p>
    <p>${renderMath(` M_{yRk} = f_{ub} \\cdot d^{2.6} = ${o[index][0].Myrk} Nmm`)}</p>
    <p>Characteristic tensile strength parallel to the grain</p>
    <p>${renderMath(` f_{h0k} = 0.082 \\cdot (1 - 0.01 \\cdot d) \\cdot \\rho_{k} = ${o[index][0].fh0k} \\frac{N}{mm^2}`)}</p>
    <br>`;

  let reportSpacings = html`
    <h3>Spacings</h3>
    <p><b>Timber Spacings</b></p>
    <p class="caption">EN 1995-1-1 Ch. 8.6 Tab.8.5</p>

    <table>
        <tr>
            <th>a<sub>1</sub></th>
            <th>a<sub>2</sub></th>
            <th>a<sub>3t</sub></th>
            <th>a<sub>3c</sub></th>
            <th>a<sub>4t</sub></th>
            <th>a<sub>4c</sub></th>
        </tr>
        <tr>
        <td> ${o[index][0].minDistancesListTimber[0]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[1]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[2]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[3]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[4]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[5]} mm</td>
        </tr>
    </table>

    <p><b>Steel Spacings</b></p>
    <p class="caption">EN 1993-1-1 Ch. </p>

    <table>
        <tr>
            <th>a<sub>1</sub></th>
            <th>a<sub>2</sub></th>
            <th>a<sub>3</sub></th>
            <th>a<sub>4</sub></th>
        </tr>
        <tr>
        <td> ${o[index][0].minDistancesListTimber[0]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[1]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[2]} mm</td>
        <td> ${o[index][0].minDistancesListTimber[3]} mm</td>
        </tr>
    </table>

    <p><b>Final Spacings</b></p>

    <table>
        <p class="caption">Final spacings</p>
        <tr>
            <th>a<sub>1</sub></th>
            <th>a<sub>2</sub></th>
            <th>a<sub>3</sub></th>
            <th>a<sub>4</sub></th>
            <th>e<sub>1</sub></th>
        </tr>
        <tr>
        <td> ${o[index][0].distancesFinal[0]} mm</td>
        <td> ${o[index][0].distancesFinal[1]} mm</td>
        <td> ${o[index][0].distancesFinal[2]} mm</td>
        <td> ${o[index][0].distancesFinal[3]} mm</td>
        <td> ${o[index][0].distancesFinal[4]} mm</td>
        </tr>
    </table>
    <br>`;

  let reportFastenerCapacity = html`
    <h3>Fastener Capacity</h3>
    <p class="caption">EN 1995-1-1 Ch. 8.2.3-8.11</p>
    <p>Characteristic fastener capacities</p>
    <p class="caption">Equation f</p>
    <p>${renderMath(` F_{vRkf} = f_{hk} \\cdot t_{1}*d = ${o[index][0].Fvrk_f} kN`)}</p>
    <p class="caption">Equation g</p>
    <p>${renderMath(` F_{vRkg} = f_{hk} \\cdot t_{2}*d \\cdot ( \\sqrt{2+ \\frac{4 \\cdot M_{yRk}}{f_{hk} \\cdot d \\cdot t_{1}^2}} ) = ${o[index][0].Fvrk_g} kN`)}</p>
    <p class="caption">Equation h</p>
    <p>${renderMath(` F_{vRkh} = 2.3 \\cdot \\sqrt{2 \\cdot M_{yRk} \\cdot f_{hk} \\cdot d} = ${o[index][0].Fvrk_h} kN`)}</p>
    <p>Characteristic fastener capacity</p>
    <p>${renderMath(` F_{vRk} = ${Math.max(o[index][0].Fvrk_1, o[index][0].Fvrk_2)} kN`)}</p>
    <p>Design fastener capacity</p>
    <p>${renderMath(` F_{vRd} = ${ o[index][0].Fvrd } kN`)}</p>
    <br>`;

    let reportFastenerCapacityCheck = html`
      <h3>Fastener Check</h3>
      <table>
          <tr>
              <th>diameter</th>
              <th>no<sub>perp</sub></th>
              <th>no<sub>axial</sub></th>
              <th>no<sub>axial.eff</sub></th>
              <th>no<sub>total</sub></th>
              <th>no<sub>total.eff</sub></th>
              <th>F<sub>vRd.total</sub></th>
          </tr>
          <tr>
          <td>${i.fastenerDiameter} mm</td>
          <td>${o[index][0].noPerp} </td>
          <td>${o[index][0].noAxial} </td>
          <td>${o[index][0].noAxialEffective} </td>
          <td>${o[index][0].noTotal} </td>
          <td>${o[index][0].noTotalEffective} </td>
          <td>${o[index][0].FvrdTotal.toFixed(2)} kN</td>
          </tr>
      </table>

      <p>Fastener Capacity Check</p>
      <p>${renderMath(` \\eta = \\frac{N_{ed}}{F_{Rd.total}} = ${ (o[index][0].fastenerCheck * 100).toFixed(0) }`)} %</p>
      <br>`;

  let reportCompressionCheck = html`
    <h3>Compression Check</h3>
    <p class="caption">EN 1995-1-1 Abs. 6.1.7</p>
    <p>Member Compression Check</p>
    <p>Design load</p>
    <p>${renderMath('N_{cd} = ' + o[index][0].force + ' \\text{ kN}')}</p>
    <p>Characteristic compressive strength</p>
    <p>${renderMath('f_{c0k} = ' + o[index][0].fct0k + ' \\frac{N}{mm^2}')}</p>
    <p>Design compressive strength</p>
    <p>${renderMath('f_{c0d} = f_{c0k} \\cdot \\chi \\cdot 0.4 = ' + o[index][0].fctd + ' \\frac{N}{mm^2}')}</p>
    <p>Effective width</p>
    <p>${renderMath('b_{ef} = \\frac{B}{n_{sheet} + 1} - \\frac{t_{sheet}}{2} = ' + o[index][0].befct + ' \\text{ cm}')}</p>
    <p>Effective area</p>
    <p>${renderMath('A_{net} = H \\cdot b_{ef} = ' + o[index][0].Anet + ' \\text{ cm}^2')}</p>
    <p>Design compressive stress</p>
    <p>${renderMath('\\sigma_{c0d} = \\frac{N_{cd}}{A_{net}} = ' + o[index][0].sigmact0d + ' \\frac{N}{mm^2}')}</p>
    <p>Utilization</p>
    <p class="caption">EN 1995-1-1 Eq. 6.2</p>
    <p>${renderMath('\\eta = \\frac{\\sigma_{c0d}}{f_{c0d}} = ' + (o[index][0].etaAxialCheck * 100).toFixed(0) + ' \\%')}</p>
    <br>`;

  let reportTensionCheck = html`
    <h3>Tension Check</h3>
    <p class="caption">EN 1995-1-1 Abs. 6.1.7</p>
    <p>Member Tension Check</p>
    <p>Design load</p>
    <p>${renderMath('N_{td} = ' + o[index][0].force + ' \\text{ kN}')}</p>
    <p>Characteristic tensile strength</p>
    <p>${renderMath('f_{t0k} = ' + o[index][0].fct0k + ' \\frac{N}{mm^2}')}</p>
    <p>Design tensile strength</p>
    <p>${renderMath('f_{t0d} = f_{t0k} \\cdot \\chi \\cdot 0.4 = ' + o[index][0].fctd + ' \\frac{N}{mm^2}')}</p>
    <p>Effective width</p>
    <p>${renderMath('b_{ef} = \\frac{B}{n_{sheet} + 1} - \\frac{t_{sheet}}{2} = ' + o[index][0].befct + ' \\text{ cm}')}</p>
    <p>Effective area</p>
    <p>${renderMath('A_{net} = H \\cdot b_{ef} - n_{perp} \\cdot d \\cdot b_{ef} = ' + o[index][0].Anet + ' \\text{ cm}^2')}</p>
    <p>Design tensile stress</p>
    <p>${renderMath('\\sigma_{t0d} = \\frac{N_{td}}{A_{net}} = ' + o[index][0].sigmact0d + ' \\frac{N}{mm^2}')}</p>
    <p>Utilization</p>
    <p class="caption">EN 1995-1-1 Eq. 6.1</p>
    <p>${renderMath('\\eta = \\frac{\\sigma_{t0d}}{f_{t0d}} = ' + (o[index][0].etaAxialCheck * 100).toFixed(0) + ' \\%')}</p>
    <br>`;

  let reportAxialBlockFailureCheck = html`
    <h3>Axial Block Failure Check</h3>
    <p class="caption">EN 1995-1-1 Abs. 6.1.8</p>
    <p>Tensile strength</p>
    <p>${renderMath(`f_{u} = ${o[index][0].fub} \\frac{N}{mm^2}`)}</p>
    <p>${renderMath(`f_{y} = 435 \\frac{N}{mm^2}`)}</p>
    <p>${renderMath(`d_{0} = d + 0.6 mm = ${i.fastenerDiameter} + 6 `)} mm</p>
    <p>Effective areas</p>
    <p>${renderMath(` L_{h} = a_{2} \\cdot (n_{perp} - 1) = ${o[index][0].Lh} `)} mm</p>
    <p>${renderMath(` L_{v} = a_{1} \\cdot (n_{axial} - 1) + e_{1} = ${o[index][0].Lv} `)} mm</p>
    <p>${renderMath(` A_{nt} = (L_{h} - (n_{axial} - 1) \\cdot d_{0}) \\cdot t = ${o[index][0].Ant} cm^2`)}</p>
    <p>${renderMath(` A_{nv} = 2 \\cdot (L_{v} - (n_{perp} - 0.5) \\cdot d_{0}) \\cdot t = ${o[index][0].Anv} cm^2`)}</p>
    <p>Resistance</p>
    <p>${renderMath(` V_{eff.Rd} = \\frac{f_{u} \\cdot A_{nt}}{1.25} + \\frac{f_{y} \\cdot A_{nv}}{ \\sqrt{3} + 1 } = ${o[index][0].VeffRd} cm^2`)}</p>
    <p>Design axial load</p>
    <p>${renderMath(` N_{ed} = ${o[index][0].force} `)} kN</p>
    <p>Utilization</p>
    <p>${renderMath(` \\eta = \\frac{ N_{ed} }{ V_{eff.Rd}} = ${(o[index][0].etaBlockFailure*100).toFixed(0)} %`)}</p>
    <br>`;

  let reportMemberCheck; 

  if (o[index][0].force > 0) {
    reportMemberCheck = reportTensionCheck; 
  } else {
    reportMemberCheck = reportCompressionCheck; 
  };


  let reportContent = html`
    ${reportHeader}
    ${reportHeading}
    ${reportSummary}
    <h2>Input Parameters</h2>
    ${reportLoadProperties}
    ${reportFastenerProperties}
    ${reportSpacings}
    ${reportFastenerCapacity}
    <h2>Connection Design</h2>
    ${reportFastenerCapacityCheck}
    ${reportAxialBlockFailureCheck}
    <h2>Member Design</h2>
    ${reportMemberCheck}
    `

  return reportContent
}
