import { renderMath } from "../utils/renderMath";
import { Element, Node } from "awatif-data-structure";
import { ModelState } from "../../../../../awatif-ui/src/types";
import { TemplateResult, html } from "lit-html";
import { timberBarConnectionDesigner } from "./utils/timberBarConnectionDesigner";
import { calculateElementAngle } from "./utils/calcBeamAngle";
import {
  TimberBarConnectionDesignerLocalInput,
  TimberBarConnectionDesignerOutput,
} from "./utils/types";

// @ts-ignore
import logo from "./utils/awatif-logo.jpg";

export function summaryReport(model: ModelState["val"]): TemplateResult {
  const designInput = {
    node: 2,
    connectionTimberDesign: {
      serviceClass: 1,
      loadDurationClass: "permanent",
      timberGrade: "GL28h",
      element: 2,
      fastenerGrade: "S235",
      fastenerDiameter: 8,
      sheetGrade: "S235",
      sheetThickness: 5,
      sheetNo: 2,
    },
  };
  const processedOutput = model.analysisOutputs;
  const designGlobalInputs: any[] = [];
  const designGlobalOutputs: TimberBarConnectionDesignerOutput[] = [];

  // global all elements
  model.elements.forEach((_, index) => {
    // get area and dimensions
    const width = 300;
    const height = 400;

    // get forces
    const axialForces = processedOutput.normal.get(index) ?? [0, 0];
    const axialForce = axialForces[0];

    // get the angle
    const angleDeg2 = calculateElementAngle(
      model.nodes[designInput.node],
      model.nodes[model.elements[index][0]],
      model.nodes[model.elements[index][1]]
    );

    // combining global and local input parameters
    const timberBarConnectionDesignerInput: TimberBarConnectionDesignerLocalInput =
      {
        ...designInput.connectionTimberDesign,
        element: index,
        axialForce: axialForce,
        beamAngle: angleDeg2,
        width: width,
        height: height,
        elementLength: 0,
      };
    const timberBarOutput = timberBarConnectionDesigner(
      timberBarConnectionDesignerInput
    );

    designGlobalInputs.push(timberBarConnectionDesignerInput);
    designGlobalOutputs.push(timberBarOutput);
  });

  let nodes = model.nodes;
  let elements = model.elements;
  let widths = designGlobalInputs.map((v) => [v.width]).flat();
  let heights = designGlobalInputs.map((v) => [v.height]).flat();
  let axialForces = processedOutput.normal;
  let fastenerNumber = designGlobalOutputs.map((v) => [v.noTotal]).flat();
  let etafastenerCheck = designGlobalOutputs
    .map((v) => [v.etaFastenerCheck])
    .flat();
  let etaBlockFailure = designGlobalOutputs
    .map((v) => [v.etaBlockFailure])
    .flat();
  let etaAxialCheck = designGlobalOutputs.map((v) => [v.etaAxialCheck]).flat();
  let etaStability = designGlobalOutputs.map((v) => [v.etaStability]).flat();
  let fastenerDiameter = designInput.connectionTimberDesign.fastenerDiameter;
  // calculate lengths of elements
  const listLengths = calculateElementLength(elements, nodes);

  // calculate sums
  let embodiedCarbonTimberFactor = 0.3; //CO2/kg
  let embodiedCarbonSteelFactor = 2.7; //CO2/kg
  let volumeTimber: number = 0;
  let numberFastener: number = 0;
  let lengthsElement: number = 0;
  elements.forEach((_, index) => {
    volumeTimber +=
      (widths[index] * heights[index] * listLengths[index]) / 1000 ** 2;
    numberFastener += fastenerNumber[index];
    lengthsElement += listLengths[index];
  });

  let weightTimber = volumeTimber * 385;
  let embodiedCarbonTimber = embodiedCarbonTimberFactor * weightTimber;
  let volumeFastener =
    ((numberFastener * (fastenerDiameter / 10) ** 2 * Math.PI) / 4) *
    (widths[0] / 10);
  let weightSteel = (volumeFastener * 7850) / 1000 ** 3;
  let embodiedCarbonSteel = embodiedCarbonSteelFactor * weightSteel; //CO2/kg

  let reportHeader = html` <br />
    <br />
    <header class="header">
      <div class="header-left">
        <h6>Timber Truss Designer</h6>
        <p class="bolt">Awatif.co</p>
        <p class="normal">20.05.2024</p>
      </div>
      <div class="header-right">
        <img src=${logo} id="headerLogo" height="60px" />
      </div>
    </header>`;

  let reportHeading = html` <br />
    <h1>Structural Report</h1>`;

  let globalTable = html`
    <h2>Quantities</h2> 
     <br>
    <button class="collapsible" @click=${toggleView}><h7>Quantities</h7></button>
    <div class="content" style="display: none;">
    <br>
      <table id="quantities">
          <tr>
            <th colspan="3">Quantities</th> 
            <th colspan="1">Fastener</th>
          </tr>
          <tr>
            <th>Material</th>
            <th>Quantities</th>
            <th>Volume</th>
            <th>A1-A3</th>
        </tr>   
            <td>Timber</td>
            <td>${renderMath(`L = ${lengthsElement.toFixed(1)}m`)}</td>
            <td>${renderMath(`${volumeTimber.toFixed(1)}\\space m^3`)}</td>
            <td>${renderMath(
              `${embodiedCarbonTimber.toFixed(1)}\\space kgCO2e`
            )}</td>
        </tr>   
            <td>Fastener</td>
            <td>${renderMath(`No = ${numberFastener}`)}</td>
            <td>${renderMath(`${volumeFastener.toFixed(1)}\\space cm^3`)}</td>
            <td>${renderMath(
              `${embodiedCarbonSteel.toFixed(1)}\\space kgCO2e`
            )}</td>
      </table>
    </div>
    <br>
    <br>
    <button class="collapsible" @click=${toggleView}><h7>Table</h7></button>
    <div class="content" style="display: none;">
    <br>
      <table id="data-table">
          <tr>
            <th colspan="6">Beams</th> 
            <th colspan="1">Fastener</th>
            <th colspan="4">Checks</th>
          </tr>
          <tr>
            <th>Beams</th>
            <th>Nodes</th>
            <th>Lengths</th>
            <th>Widths</th>
            <th>Heights</th>
            <th>Axial Force</th>
            <th>Number</th>
            <th>Fastener</th>
            <th>Sheet</th>
            <th>Member</th>
            <th>Stability</th>
        </tr>   
        
          ${elements.map(
            (element, index) =>
              html`<tr>
                <td>${index}</td>
                <td>${element.toString()}</td>
                <td>${listLengths[index].toFixed(1)}</td>
                <td>${widths[index]}</td>
                <td>${heights[index]}</td>
                <td>${axialForces.get(index)?.[0].toFixed(0)}</td>
                <td>${fastenerNumber[index]}</td>
                <td>${(etafastenerCheck[index] * 100).toFixed(0)}%</td>
                <td>${(etaBlockFailure[index] * 100).toFixed(0)}%</td>
                <td>${(etaAxialCheck[index] * 100).toFixed(0)}%</td>
                <td>${(etaStability[index] * 100).toFixed(0)}%</td>
              </tr>`
          )}
      </table>
    </div>
    <br>`;

  let reportContent = html` ${reportHeader} ${reportHeading} ${globalTable} `;

  return reportContent;
}

function calculateElementLength(elements: Element[], nodes: Node[]): number[] {
  let listLength: number[] = [];
  elements.forEach((element) => {
    const [nodeid1, nodeid2] = element;
    const node1 = nodes[nodeid1];
    const node2 = nodes[nodeid2];
    const [x1, , z1]: number[] = node1;
    const [x2, , z2]: number[] = node2;
    const dx: number = x2 - x1;
    const dz: number = z2 - z1;
    const length: number = Math.sqrt(dx * dx + dz * dz);
    listLength.push(length);
  });
  return listLength;
}

function toggleView() {
  // @ts-ignore
  this.classList.toggle("active");
  // @ts-ignore
  const content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}
