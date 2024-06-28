import { x, a as app } from "./app-DFn3ZYI3.js";
import { a as analyze } from "./analyze-BdsS8fxq.js";
import { c as calculateElementAngle, t as timberBarConnectionDesigner, r as renderMath, l as logo, a as connectionTimberDesignReport, d as design, f as frameTimberDesign, b as connectionTimberDesign } from "./connectionTimberDesignReport-RUFFEKWG.js";
import "./pureFunctionsAny.generated-DNSg1shC.js";
import "./three.module-G6cHRXNE.js";
function createTruss(span, spacing, webType, leftHeight, rightHeight, leftOffset, rightOffset, positionOffset = 0) {
  const divisions = Math.round(span / spacing);
  let nodes = [];
  let elements = [];
  let topNodesIndices = [];
  let chordsIndices = [];
  let websIndices = [];
  for (let i = 0; i < divisions + 1; i++) {
    const x2 = i * spacing;
    const offsetSlope = (rightOffset - leftOffset) / span;
    const offset = leftOffset + offsetSlope * x2;
    nodes.push([positionOffset + x2, 0, offset]);
  }
  for (let i = 0; i < divisions + 1; i++) {
    const x2 = i * spacing;
    const heightSlope = (rightHeight - leftHeight) / span;
    const height = leftHeight + heightSlope * x2;
    const offsetSlope = (rightOffset - leftOffset) / span;
    const offset = leftOffset + offsetSlope * x2;
    nodes.push([positionOffset + x2, 0, offset + height]);
    topNodesIndices.push(nodes.length - 1);
  }
  if (webType === 1) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        [i, i + 1],
        // bottom
        [divisions + 1 + i, divisions + 1 + i + 1],
        // top
        [i, divisions + 1 + i],
        // vertical
        [i, divisions + 1 + i + 1]
        // diagonal
      );
      chordsIndices.push(elements.length - 3, elements.length - 4);
      websIndices.push(elements.length - 1, elements.length - 2);
    }
  }
  if (webType === 2) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        [i, i + 1],
        // bottom
        [divisions + 1 + i, divisions + 1 + i + 1],
        // top
        [i, divisions + 1 + i],
        // vertical
        [i + 1, divisions + 1 + i]
        // diagonal
      );
      chordsIndices.push(elements.length - 3, elements.length - 4);
      websIndices.push(elements.length - 1, elements.length - 2);
    }
  }
  if (webType === 3) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        [i, i + 1],
        // bottom
        [divisions + 1 + i, divisions + 1 + i + 1],
        // top
        [i, divisions + 1 + i],
        // vertical
        [i, divisions + 1 + i + 1],
        // diagonal
        [i + 1, divisions + 1 + i]
        // diagonal
      );
      chordsIndices.push(elements.length - 4, elements.length - 5);
      websIndices.push(
        elements.length - 1,
        elements.length - 2,
        elements.length - 3
      );
    }
  }
  elements.push([divisions, 2 * divisions + 1]);
  websIndices.push(elements.length - 1);
  return { nodes, elements, topNodesIndices, chordsIndices, websIndices };
}
function summaryReport(model) {
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
      sheetNo: 2
    }
  };
  const processedOutput = model.analysisOutputs;
  const designGlobalInputs = [];
  const designGlobalOutputs = [];
  model.elements.forEach((_, index) => {
    const width = 300;
    const height = 400;
    const axialForces2 = processedOutput.normal.get(index) ?? [0, 0];
    const axialForce = axialForces2[0];
    const angleDeg2 = calculateElementAngle(
      model.nodes[designInput.node],
      model.nodes[model.elements[index][0]],
      model.nodes[model.elements[index][1]]
    );
    const timberBarConnectionDesignerInput = {
      ...designInput.connectionTimberDesign,
      element: index,
      axialForce,
      beamAngle: angleDeg2,
      width,
      height,
      elementLength: 0
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
  let etafastenerCheck = designGlobalOutputs.map((v) => [v.etaFastenerCheck]).flat();
  let etaBlockFailure = designGlobalOutputs.map((v) => [v.etaBlockFailure]).flat();
  let etaAxialCheck = designGlobalOutputs.map((v) => [v.etaAxialCheck]).flat();
  let etaStability = designGlobalOutputs.map((v) => [v.etaStability]).flat();
  let fastenerDiameter = designInput.connectionTimberDesign.fastenerDiameter;
  const listLengths = calculateElementLength(elements, nodes);
  let embodiedCarbonTimberFactor = 0.3;
  let embodiedCarbonSteelFactor = 2.7;
  let volumeTimber = 0;
  let numberFastener = 0;
  let lengthsElement = 0;
  elements.forEach((_, index) => {
    volumeTimber += widths[index] * heights[index] * listLengths[index] / 1e3 ** 2;
    numberFastener += fastenerNumber[index];
    lengthsElement += listLengths[index];
  });
  let weightTimber = volumeTimber * 385;
  let embodiedCarbonTimber = embodiedCarbonTimberFactor * weightTimber;
  let volumeFastener = numberFastener * (fastenerDiameter / 10) ** 2 * Math.PI / 4 * (widths[0] / 10);
  let weightSteel = volumeFastener * 7850 / 1e3 ** 3;
  let embodiedCarbonSteel = embodiedCarbonSteelFactor * weightSteel;
  let reportHeader = x` <br />
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
  let reportHeading = x` <br />
    <h1>Structural Report</h1>`;
  let globalTable = x`
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
    (element, index) => {
      var _a;
      return x`<tr>
                <td>${index}</td>
                <td>${element.toString()}</td>
                <td>${listLengths[index].toFixed(1)}</td>
                <td>${widths[index]}</td>
                <td>${heights[index]}</td>
                <td>${(_a = axialForces.get(index)) == null ? void 0 : _a[0].toFixed(0)}</td>
                <td>${fastenerNumber[index]}</td>
                <td>${(etafastenerCheck[index] * 100).toFixed(0)}%</td>
                <td>${(etaBlockFailure[index] * 100).toFixed(0)}%</td>
                <td>${(etaAxialCheck[index] * 100).toFixed(0)}%</td>
                <td>${(etaStability[index] * 100).toFixed(0)}%</td>
              </tr>`;
    }
  )}
      </table>
    </div>
    <br>`;
  let reportContent = x` ${reportHeader} ${reportHeading} ${globalTable} `;
  return reportContent;
}
function calculateElementLength(elements, nodes) {
  let listLength = [];
  elements.forEach((element) => {
    const [nodeid1, nodeid2] = element;
    const node1 = nodes[nodeid1];
    const node2 = nodes[nodeid2];
    const [x1, , z1] = node1;
    const [x2, , z2] = node2;
    const dx = x2 - x1;
    const dz = z2 - z1;
    const length = Math.sqrt(dx * dx + dz * dz);
    listLength.push(length);
  });
  return listLength;
}
function toggleView() {
  this.classList.toggle("active");
  const content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}
const parameters = {
  span: {
    value: 20,
    min: 1,
    max: 25,
    label: "Span (m)",
    folder: "Geometry"
  },
  spacing: {
    value: 2.5,
    min: 1,
    max: 5,
    label: "Spacing (m)",
    folder: "Geometry"
  },
  webType: {
    value: 1,
    min: 1,
    max: 3,
    step: 1,
    label: "Web type",
    folder: "Geometry"
  },
  trimType: {
    value: 1,
    min: 1,
    max: 3,
    step: 1,
    label: "Trim type",
    folder: "Geometry"
  },
  leftHeight: {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Left height (m)",
    folder: "Geometry"
  },
  midHeight: {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Mid height (m)",
    folder: "Geometry"
  },
  rightHeight: {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Right height (m)",
    folder: "Geometry"
  },
  leftOffset: {
    value: 0,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Left offset (m)",
    folder: "Geometry"
  },
  midOffset: {
    value: 5,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Mid offset (m)",
    folder: "Geometry"
  },
  rightOffset: {
    value: 0,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Right offset (m)",
    folder: "Geometry"
  },
  supportType: {
    value: 1,
    min: 1,
    max: 2,
    step: 1,
    label: "Support type",
    folder: "Supports"
  },
  uniformLoad: {
    value: 50,
    min: 0,
    max: 1e3,
    step: 1,
    label: "Uniform load (KN/m)",
    folder: "Loads"
  },
  chordsArea: {
    value: 50,
    min: 1,
    max: 100,
    step: 1,
    label: "Chords area (cm2)",
    folder: "Sections & Materials"
  },
  chordsElasticity: {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Chords elasticity (gpa)",
    folder: "Sections & Materials"
  },
  websArea: {
    value: 50,
    min: 1,
    max: 100,
    step: 1,
    label: "Webs area (cm2)",
    folder: "Sections & Materials"
  },
  websElasticity: {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Webs elasticity (gpa)",
    folder: "Sections & Materials"
  }
};
const onParameterChange = (parameters2) => {
  let span = parameters2.span.value;
  let spacing = parameters2.spacing.value;
  const webType = parameters2.webType.value;
  const trimType = parameters2.trimType.value;
  const leftHeight = parameters2.leftHeight.value;
  const midHeight = parameters2.midHeight.value;
  const rightHeight = parameters2.rightHeight.value;
  const leftOffset = parameters2.leftOffset.value;
  const midOffset = parameters2.midOffset.value;
  const rightOffset = parameters2.rightOffset.value;
  const supportType = parameters2.supportType.value;
  const uniformLoad = parameters2.uniformLoad.value;
  const chordsArea = parameters2.chordsArea.value * 1e-4;
  const chordsElasticity = parameters2.chordsElasticity.value * 1e6;
  const websArea = parameters2.websArea.value * 1e-4;
  const websElasticity = parameters2.websElasticity.value * 1e6;
  let nodes = [];
  let elements = [];
  let analysisInputs = [];
  let supportIndices = [];
  let loadIndices = [];
  let chordsIndices = [];
  let websIndices = [];
  spacing = span / Math.round(span / spacing);
  const pairTrusses = Math.abs(midHeight - 0.5 * (leftHeight + rightHeight)) > 0.3 || Math.abs(midOffset - 0.5 * (leftOffset + rightOffset)) > 0.3;
  if (pairTrusses) {
    span = span / 2;
    spacing = span / Math.round(span / spacing);
    const trimDivisions = Math.round((span - 2 * spacing) / spacing);
    const trim = trimType >= 2 && trimDivisions >= 1;
    const leftHeightSlope = (leftHeight - midHeight) / span;
    const leftHeightTrim = leftHeight - leftHeightSlope * spacing;
    const leftOffsetSlope = (leftOffset - midOffset) / span;
    const leftOffsetTrim = leftOffset - leftOffsetSlope * spacing;
    const {
      nodes: leftNodes,
      elements: leftElements,
      topNodesIndices: leftTopNodesIndices,
      chordsIndices: leftChordsIndices,
      websIndices: leftWebsIndices
    } = createTruss(
      trim ? span - spacing : span,
      spacing,
      webType,
      trim ? leftHeightTrim : leftHeight,
      midHeight,
      trim ? leftOffsetTrim : leftOffset,
      midOffset,
      trim ? spacing : 0
    );
    nodes.push(...leftNodes);
    elements.push(...leftElements);
    loadIndices.push(...leftTopNodesIndices);
    chordsIndices.push(...leftChordsIndices);
    websIndices.push(...leftWebsIndices);
    const rightHeightSlope = (midHeight - rightHeight) / span;
    const rightOffsetSlope = (midOffset - rightOffset) / span;
    let adjustWebTyp = webType;
    if (webType === 1)
      adjustWebTyp = 2;
    if (webType === 2)
      adjustWebTyp = 1;
    const {
      nodes: rightNodes,
      elements: rightElements,
      topNodesIndices: rightTopNodesIndices,
      chordsIndices: rightChordsIndices,
      websIndices: rightWebsIndices
    } = createTruss(
      trim ? span - 2 * spacing : span - spacing,
      spacing,
      adjustWebTyp,
      midHeight - rightHeightSlope * spacing,
      trim ? rightHeight + rightHeightSlope * spacing : rightHeight,
      midOffset - rightOffsetSlope * spacing,
      trim ? rightOffset + rightOffsetSlope * spacing : rightOffset,
      span + spacing
    );
    chordsIndices.push(...offset1D(rightChordsIndices, elements.length));
    websIndices.push(...offset1D(rightWebsIndices, elements.length));
    elements.push(...offset2D(rightElements, nodes.length));
    loadIndices.push(...offset1D(rightTopNodesIndices, nodes.length));
    nodes.push(...rightNodes);
    if (trim) {
      nodes.push(
        [0, 0, trimType == 3 ? leftHeight + leftOffset : leftOffset],
        [2 * span, 0, trimType == 3 ? rightHeight + rightOffset : rightOffset]
      );
      loadIndices.push(nodes.length - 2, nodes.length - 1);
      const leftNodesOffset = (trimDivisions + 1 + 1) * 2;
      const rightNodesOffset = (trimDivisions + 1) * 2;
      const nodesOffset = leftNodesOffset + rightNodesOffset;
      elements.push(
        [0, nodesOffset],
        // from leftBottom to far left
        [trimDivisions + 2, nodesOffset],
        // from leftTop to far left
        [leftNodesOffset + trimDivisions, nodesOffset + 1],
        // from rightBottom to far right
        [leftNodesOffset + rightNodesOffset - 1, nodesOffset + 1]
        // from rightTop to far right
      );
      chordsIndices.push(
        elements.length - 1,
        elements.length - 2,
        elements.length - 3,
        elements.length - 4
      );
    }
    const divisions = trim ? Math.round((span - 1 * spacing) / spacing) : Math.round(span / spacing);
    const bottomLeft = divisions;
    const bottomRight = (divisions + 1) * 2;
    const topLeft = (divisions + 1) * 2 - 1;
    const topRight = topLeft + divisions + 1;
    if (webType === 1) {
      elements.push(
        [bottomLeft, bottomRight],
        [topLeft, topRight],
        [topLeft, bottomRight]
      );
      chordsIndices.push(elements.length - 3, elements.length - 2);
      websIndices.push(elements.length - 1);
    }
    if (webType === 2) {
      elements.push(
        [bottomLeft, bottomRight],
        [topLeft, topRight],
        [bottomLeft, topRight]
      );
      chordsIndices.push(elements.length - 3, elements.length - 2);
      websIndices.push(elements.length - 1);
    }
    if (webType === 3) {
      elements.push(
        [bottomLeft, bottomRight],
        [topLeft, topRight],
        [bottomLeft, topRight],
        [topLeft, bottomRight]
      );
      chordsIndices.push(elements.length - 4, elements.length - 3);
      websIndices.push(elements.length - 2, elements.length - 1);
    }
    if (trim) {
      const trussNodesLength = leftNodes.length + rightNodes.length;
      supportIndices.push(...[trussNodesLength, trussNodesLength + 1]);
    } else {
      if (supportType === 1)
        supportIndices.push(
          ...[0, leftNodes.length + rightNodes.length / 2 - 1]
        );
      else
        supportIndices.push(
          ...[leftNodes.length / 2, leftNodes.length + rightNodes.length - 1]
        );
    }
  } else {
    const trimDivisions = Math.round((span - 2 * spacing) / spacing);
    const trim = trimType >= 2 && trimDivisions >= 1;
    const heightSlope = (leftHeight - rightHeight) / span;
    const offsetSlope = (leftOffset - rightOffset) / span;
    const {
      nodes: trussNodes,
      elements: trussElements,
      topNodesIndices,
      chordsIndices: trussChordsIndices,
      websIndices: trussWebsIndices
    } = createTruss(
      trim ? span - 2 * spacing : span,
      spacing,
      webType,
      trim ? leftHeight - heightSlope * spacing : leftHeight,
      trim ? rightHeight + heightSlope * spacing : rightHeight,
      trim ? leftOffset - offsetSlope * spacing : leftOffset,
      trim ? rightOffset + offsetSlope * spacing : rightOffset,
      trim ? spacing : 0
    );
    nodes.push(...trussNodes);
    elements.push(...trussElements);
    loadIndices.push(...topNodesIndices);
    chordsIndices.push(...trussChordsIndices);
    websIndices.push(...trussWebsIndices);
    if (trim) {
      nodes.push(
        [0, 0, trimType == 3 ? leftHeight + leftOffset : leftOffset],
        [span, 0, trimType == 3 ? rightHeight + rightOffset : rightOffset]
      );
      loadIndices.push(...[nodes.length - 2, nodes.length - 1]);
      elements.push(
        [0, (trimDivisions + 1) * 2],
        // from leftBottom to far left
        [trimDivisions + 1, (trimDivisions + 1) * 2],
        // from leftTop to far left
        [trimDivisions, (trimDivisions + 1) * 2 + 1],
        // from rightBottom to far right
        [trimDivisions * 2 + 1, (trimDivisions + 1) * 2 + 1]
        // from righTop to far right
      );
      chordsIndices.push(
        elements.length - 1,
        elements.length - 2,
        elements.length - 3,
        elements.length - 4
      );
    }
    if (trim) {
      supportIndices.push(...[trussNodes.length, trussNodes.length + 1]);
    } else {
      if (supportType === 1)
        supportIndices.push(...[0, trussNodes.length / 2 - 1]);
      else
        supportIndices.push(...[trussNodes.length / 2, trussNodes.length - 1]);
    }
  }
  analysisInputs.push(
    ...supportIndices.map((i) => ({
      node: i,
      support: [true, true, true]
    }))
  );
  analysisInputs.push(
    ...loadIndices.map((i) => ({
      node: i,
      load: [0, 0, -uniformLoad * spacing]
    }))
  );
  analysisInputs.push(
    ...chordsIndices.map((i) => ({
      element: i,
      area: chordsArea,
      elasticity: chordsElasticity
    })),
    ...websIndices.map((i) => ({
      element: i,
      area: websArea,
      elasticity: websElasticity
    }))
  );
  const analysisOutputs = analyze(nodes, elements, analysisInputs);
  const designInputs = [
    ...elements.map((_, i) => ({
      element: i,
      frameTimberDesign: {
        tensileStrengthParallel: 2e5,
        serviceClass: "1",
        loadDuration: "permanent",
        material: "Solid timber",
        gammaG: 1,
        gammaM: 1.3
      }
    })),
    ...nodes.map((_, i) => ({
      node: i,
      connectionTimberDesign: {
        serviceClass: 1,
        loadDurationClass: "permanent",
        timberGrade: "GL28h",
        element: 2,
        fastenerGrade: "S235",
        fastenerDiameter: 8,
        sheetGrade: "S235",
        sheetThickness: 5,
        sheetNo: 2
      }
    }))
  ];
  const designOutputs = design(
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    [frameTimberDesign, connectionTimberDesign]
  );
  return {
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    designOutputs
  };
};
const offset2D = (list, offset) => list.map(([n1, n2]) => [n1 + offset, n2 + offset]);
const offset1D = (list, offset) => list.map((n) => n + offset);
app({
  parameters,
  onParameterChange,
  settings: { deformedShape: true, loads: false },
  reports: [summaryReport, connectionTimberDesignReport]
});
