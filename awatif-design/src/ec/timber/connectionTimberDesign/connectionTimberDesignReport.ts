import { TemplateResult, html } from "lit-html";
import { renderMath } from "../utils/renderMath";
import {
  ConnectionTimberDesignerInput,
  ConnectionTimberDesignerOutput,
} from "./connectionTimberDesign";
import { setup3DCube } from "./utils/threejs3d";
import { createRef, ref } from "lit-html/directives/ref.js";

const container = createRef<HTMLDivElement>();

export function connectionTimberDesignReport(
  designInput: ConnectionTimberDesignerInput,
  designOutput: ConnectionTimberDesignerOutput
): TemplateResult {
  const i = designInput.connectionTimberDesign;
  const o = designOutput.connectionTimberDesign[0];
  let index = 0

  console.log("designOutput.designInput.coordinatesX", designOutput.connectionTimberDesign[0].coordinatesX)

  let node = designInput.node;
  let elements = designOutput.designInput.map( (v) => [v.element] ).flat()
  let angles = designOutput.designInput.map( (v) => [v.beamAngle] ).flat()
  let heights = designOutput.designInput.map( (v) => [v.height] ).flat()
  let widths = designOutput.designInput.map( (v) => [v.width] ).flat()
  let axialForces = designOutput.designInput.map( (v) => [v.axialForce.toFixed(0)] )
  let beamAngles = designOutput.designInput.map( (v) => [v.beamAngle.toFixed(0)] )
  let sheetNumber = i.sheetNo;
  let sheetLength = designOutput.connectionTimberDesign.map( (v) => [v.sheetLength] ).flat()
  let sheetThickness = i.sheetThickness;
  let fastenerPositionX = designOutput.connectionTimberDesign.map( (v) => [v.coordinatesX] ).flat()
  let fastenerPositionZ = designOutput.connectionTimberDesign.map( (v) => [v.coordinatesY] ).flat()

  
  console.log( "fastenerPositionX", fastenerPositionX )

  // document.addEventListener('DOMContentLoaded', () => setup3DCube(

  setup3DCube(
    container.value,
    node,
    elements,
    angles,
    heights,
    widths,
    sheetNumber,
    sheetLength,
    sheetThickness,
    fastenerPositionX,
    fastenerPositionZ
  )
  // function createTabs() {
   // elements.forEach((element, index) => {
   //   const tabElement = document.createElement("div")
   //   tabElement.textContent = element.toString()
   //   tabElement.classList.add("tab")



  let reportHeader = html` <br />
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
    <p>Connected elements: ${i.element}</p>
    <div class="canvas-container" ref=${ref(container)}></div>
    <table>
        <tr>
            <th>Node</th>
            <th>Beams</th>
            <th>Timber</th>
            <th>Widths</th>
            <th>Heights</th>
            <th>Angles</th>
            <th>Axial Loads</th>
        </tr>
        <tr>
        <td> ${ node }</td>
        <td> ${ elements }</td>
        <td> ${ i.timberGrade }</td>
        <td> ${ widths } mm</td>
        <td> ${ heights } mm</td>
        <td> ${ beamAngles }</td>
        <td> ${ axialForces } kN</td>
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
        <td> ${ (o.fastenerCheck*100).toFixed(0) } %</td>
        <td> ${ (o.etaAxialCheck*100).toFixed(0) } %</td>
        <td> ${ (o.etaBlockFailure*100).toFixed(0) } %</td>
        </tr>
    </table>
    <br>
    <br>`;
  
  let reportLoadProperties = html`
    <h3>Load Properties</h3>
    <p>Service class ${renderMath(`${i.serviceClass}`)} and Load duration: ${renderMath(`${i.loadDurationClass}`)} result in a modification factor of ${renderMath(`k_{mod} = ${o.kMod}`)}</p>
    <p>${renderMath(` \\gamma = 1.3`)}</p>
    <p>Resistance reduction factor</p>
    <p>${renderMath(` \\chi = \\frac{k_{mod}}{\\gamma} = ${o.chi}`)}</p>
    <br>`;

  let reportFastenerProperties = html`
    <h3>Fastener Properties</h3>
    <p class="caption">EN 1995-1-1 Ch. 8.5.1.1</p>
    <p>Characteristic value for the yield moment</p>
    <p>${renderMath(` M_{yRk} = f_{ub} \\cdot d^{2.6} = ${o.Myrk} Nmm`)}</p>
    <p>Characteristic tensile strength parallel to the grain</p>
    <p>${renderMath(` f_{h0k} = 0.082 \\cdot (1 - 0.01 \\cdot d) \\cdot \\rho_{k} = ${o.fh0k} \\frac{N}{mm^2}`)}</p>
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
        <td> ${o.minDistancesListTimber[0]} mm</td>
        <td> ${o.minDistancesListTimber[1]} mm</td>
        <td> ${o.minDistancesListTimber[2]} mm</td>
        <td> ${o.minDistancesListTimber[3]} mm</td>
        <td> ${o.minDistancesListTimber[4]} mm</td>
        <td> ${o.minDistancesListTimber[5]} mm</td>
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
        <td> ${o.minDistancesListTimber[0]} mm</td>
        <td> ${o.minDistancesListTimber[1]} mm</td>
        <td> ${o.minDistancesListTimber[2]} mm</td>
        <td> ${o.minDistancesListTimber[3]} mm</td>
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
        <td> ${o.distancesFinal[0]} mm</td>
        <td> ${o.distancesFinal[1]} mm</td>
        <td> ${o.distancesFinal[2]} mm</td>
        <td> ${o.distancesFinal[3]} mm</td>
        <td> ${o.distancesFinal[4]} mm</td>
        </tr>
    </table>
    <br>`;

  let reportFastenerCapacity = html`
    <h3>Fastener Capacity</h3>
    <p class="caption">EN 1995-1-1 Ch. 8.2.3-8.11</p>
    <p>Characteristic fastener capacities</p>
    <p class="caption">Equation f</p>
    <p>${renderMath(` F_{vRkf} = f_{hk} \\cdot t_{1}*d = ${o.Fvrk_f} kN`)}</p>
    <p class="caption">Equation g</p>
    <p>${renderMath(` F_{vRkg} = f_{hk} \\cdot t_{2}*d \\cdot ( \\sqrt{2+ \\frac{4 \\cdot M_{yRk}}{f_{hk} \\cdot d \\cdot t_{1}^2}} ) = ${o.Fvrk_g} kN`)}</p>
    <p class="caption">Equation h</p>
    <p>${renderMath(` F_{vRkh} = 2.3 \\cdot \\sqrt{2 \\cdot M_{yRk} \\cdot f_{hk} \\cdot d} = ${o.Fvrk_h} kN`)}</p>
    <p>Characteristic fastener capacity</p>
    <p>${renderMath(` F_{vRk} = ${Math.max(o.Fvrk_1, o.Fvrk_2)} kN`)}</p>
    <p>Design fastener capacity</p>
    <p>${renderMath(` F_{vRd} = ${ o.Fvrd } kN`)}</p>
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
          <td>${o.noPerp} </td>
          <td>${o.noAxial} </td>
          <td>${o.noAxialEffective.toFixed(2)} </td>
          <td>${o.noTotal} </td>
          <td>${o.noTotalEffective.toFixed(2)} </td>
          <td>${o.FvrdTotal.toFixed(2)} kN</td>
          </tr>
      </table>

      <p>Fastener Capacity Check</p>
      <p>${renderMath(` \\eta = \\frac{N_{ed}}{F_{Rd.total}} = ${ (o.fastenerCheck * 100).toFixed(0) }`)} %</p>
      <br>`;

  let reportCompressionCheck = html`
    <h3>Compression Check</h3>
    <p class="caption">EN 1995-1-1 Abs. 6.1.7</p>
    <p>Member Compression Check</p>
    <p>Design load</p>
    <p>${renderMath('N_{cd} = ' + axialForces[index] + ' \\text{ kN}')}</p>
    <p>Characteristic compressive strength</p>
    <p>${renderMath('f_{c0k} = ' + o.fct0k + ' \\frac{N}{mm^2}')}</p>
    <p>Design compressive strength</p>
    <p>${renderMath('f_{c0d} = f_{c0k} \\cdot \\chi \\cdot 0.4 = ' + o.fctd + ' \\frac{N}{mm^2}')}</p>
    <p>Effective width</p>
    <p>${renderMath('b_{ef} = \\frac{B}{n_{sheet} + 1} - \\frac{t_{sheet}}{2} = ' + o.befct + ' \\text{ cm}')}</p>
    <p>Effective area</p>
    <p>${renderMath('A_{net} = H \\cdot b_{ef} = ' + o.Anet + ' \\text{ cm}^2')}</p>
    <p>Design compressive stress</p>
    <p>${renderMath('\\sigma_{c0d} = \\frac{N_{cd}}{A_{net}} = ' + o.sigmact0d + ' \\frac{N}{mm^2}')}</p>
    <p>Utilization</p>
    <p class="caption">EN 1995-1-1 Eq. 6.2</p>
    <p>${renderMath('\\eta = \\frac{\\sigma_{c0d}}{f_{c0d}} = ' + (o.etaAxialCheck * 100).toFixed(0) + ' \\%')}</p>
    <br>`;

  let reportTensionCheck = html`
    <h3>Tension Check</h3>
    <p class="caption">EN 1995-1-1 Abs. 6.1.7</p>
    <p>Member Tension Check</p>
    <p>Design load</p>
    <p>${renderMath('N_{td} = ' + axialForces[index] + ' \\text{ kN}')}</p>
    <p>Characteristic tensile strength</p>
    <p>${renderMath('f_{t0k} = ' + o.fct0k + ' \\frac{N}{mm^2}')}</p>
    <p>Design tensile strength</p>
    <p>${renderMath('f_{t0d} = f_{t0k} \\cdot \\chi \\cdot 0.4 = ' + o.fctd + ' \\frac{N}{mm^2}')}</p>
    <p>Effective width</p>
    <p>${renderMath('b_{ef} = \\frac{B}{n_{sheet} + 1} - \\frac{t_{sheet}}{2} = ' + o.befct + ' \\text{ cm}')}</p>
    <p>Effective area</p>
    <p>${renderMath('A_{net} = H \\cdot b_{ef} - n_{perp} \\cdot d \\cdot b_{ef} = ' + o.Anet + ' \\text{ cm}^2')}</p>
    <p>Design tensile stress</p>
    <p>${renderMath('\\sigma_{t0d} = \\frac{N_{td}}{A_{net}} = ' + o.sigmact0d + ' \\frac{N}{mm^2}')}</p>
    <p>Utilization</p>
    <p class="caption">EN 1995-1-1 Eq. 6.1</p>
    <p>${renderMath('\\eta = \\frac{\\sigma_{t0d}}{f_{t0d}} = ' + (o.etaAxialCheck * 100).toFixed(0) + ' \\%')}</p>
    <br>`;

  let reportAxialBlockFailureCheck = html`
    <h3>Axial Block Failure Check</h3>
    <p class="caption">EN 1995-1-1 Abs. 6.1.8</p>
    <p>Tensile strength</p>
    <p>${renderMath(`f_{u} = ${o.fub} \\frac{N}{mm^2}`)}</p>
    <p>${renderMath(`f_{y} = 435 \\frac{N}{mm^2}`)}</p>
    <p>${renderMath(`d_{0} = d + 0.6 mm = ${i.fastenerDiameter} + 6 `)} mm</p>
    <p>Effective areas</p>
    <p>${renderMath(` L_{h} = a_{2} \\cdot (n_{perp} - 1) = ${o.Lh} `)} mm</p>
    <p>${renderMath(` L_{v} = a_{1} \\cdot (n_{axial} - 1) + e_{1} = ${o.Lv} `)} mm</p>
    <p>${renderMath(` A_{nt} = (L_{h} - (n_{axial} - 1) \\cdot d_{0}) \\cdot t = ${o.Ant} cm^2`)}</p>
    <p>${renderMath(` A_{nv} = 2 \\cdot (L_{v} - (n_{perp} - 0.5) \\cdot d_{0}) \\cdot t = ${o.Anv} cm^2`)}</p>
    <p>Resistance</p>
    <p>${renderMath(` V_{eff.Rd} = \\frac{f_{u} \\cdot A_{nt}}{1.25} + \\frac{f_{y} \\cdot A_{nv}}{ \\sqrt{3} + 1 } = ${o.VeffRd} cm^2`)}</p>
    <p>Design axial load</p>
    <p>${renderMath(` N_{ed} = ${axialForces[index]} `)} kN</p>
    <p>Utilization</p>
    <p>${renderMath(` \\eta = \\frac{ N_{ed} }{ V_{eff.Rd}} = ${(o.etaBlockFailure*100).toFixed(0)} %`)}</p>
    <br>`;

  let reportMemberCheck; 

  if (o.force > 0) {
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
