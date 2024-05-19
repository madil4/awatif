import { TemplateResult, html } from "lit-html";
import { renderMath } from "../utils/renderMath";
import {
  ConnectionTimberDesignerGlobalOutput,
  ConnectionTimberDesignerInput,
  ConnectionTimberDesignerOutput,
} from "./connectionTimberDesign";
import { createRef } from "lit-html/directives/ref.js";
import {
  Element,
  Node,
} from "../../../../../awatif-data-structure/src";

const container = createRef<HTMLDivElement>();

function sumOfList(numbers: number[]): number {
  return numbers.reduce((acc, current) => acc + current, 0);
}

function calculateElementLength(elements: Element[], nodes: Node[]): number[] {

  let listLength: number[] = []
  elements.forEach((element, index) => {
    const [nodeid1, nodeid2] = element
    const node1 = nodes[nodeid1]
    const node2 = nodes[nodeid2]
    const [x1, , z1]: number[] = node1
    const [x2, , z2]: number[] = node2
    const dx: number = x2 - x1;
    const dz: number = z2 - z1;
    const length: number = (Math.sqrt(dx * dx + dz * dz))
    listLength.push(length)
  })
  return listLength
}

export function connectionTimberDesignReport(
  designInput: ConnectionTimberDesignerInput,
  designOutput: ConnectionTimberDesignerOutput
): TemplateResult {

  let nodes = designOutput.ConnectionTimberDesignerGlobalOutput.nodes
  let elements = designOutput.ConnectionTimberDesignerGlobalOutput.elements
  let widths = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalInputs.map( (v) => [v.width] ).flat()   
  let heights = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalInputs.map( (v) => [v.height] ).flat()   
  let axialForces = designOutput.ConnectionTimberDesignerGlobalOutput.processedOutput.normal
  let fastenerNumber = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalOutputs.map( (v) => [v.noTotal] ).flat()  
  let etafastenerCheck = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalOutputs.map( (v) => [v.fastenerCheck] ).flat()  
  let etaBlockFailure = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalOutputs.map( (v) => [v.etaBlockFailure] ).flat()  
  let etaAxialCheck = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalOutputs.map( (v) => [v.etaAxialCheck] ).flat()  
  let etaStability = designOutput.ConnectionTimberDesignerGlobalOutput.designGlobalOutputs.map( (v) => [v.etaStability] ).flat()  
  let fastenerDiameter = designInput.connectionTimberDesign.fastenerDiameter
  // calculate lengths of elements
  const listLengths = calculateElementLength(elements, nodes)

  console.log(listLengths)
  
  // calculate sums
  let embodiedCarbonTimberFactor = 0.3  //CO2/kg
  let embodiedCarbonSteelFactor = 2.7   //CO2/kg
  let volumeTimber:number  = 0
  let numberFastener:number  = 0
  let lengthsElement:number  = 0
  elements.forEach((element, index) => {
    volumeTimber += (widths[index]  * heights[index] * listLengths[index] / 1000**2)
    numberFastener += fastenerNumber[index]
    lengthsElement += listLengths[index]
  })

  let weightTimber = embodiedCarbonTimberFactor * 385
  let embodiedCarbonTimber = embodiedCarbonTimberFactor * weightTimber
  let volumeFastener = numberFastener * (fastenerDiameter/10)**2 * Math.PI / 4 * (widths[0]/10)
  let weightSteel = volumeFastener * 7850 / 1000**3
  let embodiedCarbonSteel = embodiedCarbonSteelFactor * weightSteel //CO2/kg


  function updateTable(elements: any[]): void {
    const table = document.getElementById('data-table') as HTMLTableElement; // Safely assert the element as HTMLTableElement
  
    elements.forEach((element, index) => {

        const row = table.insertRow(); // Insert a new row at the end of the table
        const axialForce = axialForces.get(index)??[0, 0]
  
        // Create a cell for each item and append text nodes with the data
        const cellBeams = row.insertCell();
        const cellNodes = row.insertCell();
        const cellLengths = row.insertCell();
        const cellWidths = row.insertCell();
        const cellHeights = row.insertCell();
        const cellAxialForce = row.insertCell();
        const cellFastenerNumber = row.insertCell();

        const cellFastenerCheck = row.insertCell();
        const cellBlockFailure = row.insertCell();
        const cellAxialCheck = row.insertCell();
        const cellStability = row.insertCell();

        // Assigning the text content for each cell based on the element's properties
        cellBeams.textContent = index.toString();
        cellNodes.textContent = element.toString();
        cellLengths.textContent = listLengths[index].toFixed(1).toString();
        cellWidths.textContent = widths[index].toString();
        cellHeights.textContent = heights[index].toString();
        cellAxialForce.textContent = axialForce[0].toFixed(0).toString()
        cellFastenerNumber.textContent = fastenerNumber[index].toString();
        cellFastenerCheck.textContent = `${(etafastenerCheck[index]*100).toFixed(0)}%`
        cellBlockFailure.textContent = `${(etaBlockFailure[index]*100).toFixed(0)}%`;
        cellAxialCheck.textContent = `${(etaAxialCheck[index]*100).toFixed(0)}%`;
        cellStability.textContent = `${(etaStability[index]*100).toFixed(0)}%`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {updateTable(elements);});

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
    <h1>Structural Report</h1>`;

  let globalTable = html`
    <h2>Quantities</h2> 
     <br>
    <button class="collapsible"><h7>Quantities</h7></button>
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
            <td>${renderMath(`${embodiedCarbonTimber.toFixed(1)}\\space kgCO2e`)}</td>
        </tr>   
            <td>Fastener</td>
            <td>${renderMath(`No = ${numberFastener}`)}</td>
            <td>${renderMath(`${volumeFastener.toFixed(1)}\\space cm^3`)}</td>
            <td>${renderMath(`${embodiedCarbonSteel.toFixed(1)}\\space kgCO2e`)}</td>
      </table>
    </div>
    <br>
    <br>
    <button class="collapsible"><h7>Table</h7></button>
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
        <!-- Rows will be added dynamically here -->
      </table>
    </div>
    <br>`;

  let reportContent = html`
    ${reportHeader}
    ${reportHeading}
    ${globalTable}
    `

  return reportContent
}

// JavaScript for collapsible
document.addEventListener('DOMContentLoaded', () => {
  const coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});
