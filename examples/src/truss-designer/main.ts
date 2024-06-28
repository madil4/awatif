import { app, Model, Parameters } from "awatif-ui";
import { analyze } from "awatif-fem";
import { AnalysisInput, Node, Element } from "awatif-data-structure";
import { createTruss } from "./createTruss";
import { design, DesignInput } from "awatif-design";
import {
  connectionTimberDesign,
  connectionTimberDesignReport,
  frameTimberDesign,
  summaryReport,
} from "awatif-design/src/ec/timber";

export const parameters: Parameters = {
  span: {
    value: 20,
    min: 1,
    max: 25,
    label: "Span (m)",
    folder: "Geometry",
  },
  spacing: {
    value: 2.5,
    min: 1,
    max: 5,
    label: "Spacing (m)",
    folder: "Geometry",
  },
  webType: {
    value: 1,
    min: 1,
    max: 3,
    step: 1,
    label: "Web type",
    folder: "Geometry",
  },
  trimType: {
    value: 1,
    min: 1,
    max: 3,
    step: 1,
    label: "Trim type",
    folder: "Geometry",
  },
  leftHeight: {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Left height (m)",
    folder: "Geometry",
  },
  midHeight: {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Mid height (m)",
    folder: "Geometry",
  },
  rightHeight: {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Right height (m)",
    folder: "Geometry",
  },
  leftOffset: {
    value: 0,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Left offset (m)",
    folder: "Geometry",
  },
  midOffset: {
    value: 5,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Mid offset (m)",
    folder: "Geometry",
  },
  rightOffset: {
    value: 0,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Right offset (m)",
    folder: "Geometry",
  },
  supportType: {
    value: 1,
    min: 1,
    max: 2,
    step: 1,
    label: "Support type",
    folder: "Supports",
  },
  uniformLoad: {
    value: 50,
    min: 0,
    max: 1000,
    step: 1,
    label: "Uniform load (KN/m)",
    folder: "Loads",
  },
  chordsArea: {
    value: 50,
    min: 1,
    max: 100,
    step: 1,
    label: "Chords area (cm2)",
    folder: "Sections & Materials",
  },
  chordsElasticity: {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Chords elasticity (gpa)",
    folder: "Sections & Materials",
  },
  websArea: {
    value: 50,
    min: 1,
    max: 100,
    step: 1,
    label: "Webs area (cm2)",
    folder: "Sections & Materials",
  },
  websElasticity: {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Webs elasticity (gpa)",
    folder: "Sections & Materials",
  },
};

export const onParameterChange = (parameters: Parameters): Model => {
  let span = parameters.span.value;
  let spacing = parameters.spacing.value;
  const webType = parameters.webType.value;
  const trimType = parameters.trimType.value;
  const leftHeight = parameters.leftHeight.value;
  const midHeight = parameters.midHeight.value;
  const rightHeight = parameters.rightHeight.value;
  const leftOffset = parameters.leftOffset.value;
  const midOffset = parameters.midOffset.value;
  const rightOffset = parameters.rightOffset.value;
  const supportType = parameters.supportType.value;
  const uniformLoad = parameters.uniformLoad.value;
  const chordsArea = parameters.chordsArea.value * 1e-4;
  const chordsElasticity = parameters.chordsElasticity.value * 1e6;
  const websArea = parameters.websArea.value * 1e-4;
  const websElasticity = parameters.websElasticity.value * 1e6;

  let nodes: Node[] = [];
  let elements: Element[] = [];
  let analysisInputs: AnalysisInput[] = [];
  let supportIndices: number[] = [];
  let loadIndices: number[] = [];
  let chordsIndices: number[] = [];
  let websIndices: number[] = [];

  spacing = span / Math.round(span / spacing); // make sure the span is correct without rounding errors
  const pairTrusses =
    Math.abs(midHeight - 0.5 * (leftHeight + rightHeight)) > 0.3 ||
    Math.abs(midOffset - 0.5 * (leftOffset + rightOffset)) > 0.3;

  if (pairTrusses) {
    span = span / 2;
    spacing = span / Math.round(span / spacing); // new spacing due to new span

    const trimDivisions = Math.round((span - 2 * spacing) / spacing);
    const trim = trimType >= 2 && trimDivisions >= 1;

    // left truss
    const leftHeightSlope = (leftHeight - midHeight) / span;
    const leftHeightTrim = leftHeight - leftHeightSlope * spacing;
    const leftOffsetSlope = (leftOffset - midOffset) / span;
    const leftOffsetTrim = leftOffset - leftOffsetSlope * spacing;

    const {
      nodes: leftNodes,
      elements: leftElements,
      topNodesIndices: leftTopNodesIndices,
      chordsIndices: leftChordsIndices,
      websIndices: leftWebsIndices,
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

    // right truss
    const rightHeightSlope = (midHeight - rightHeight) / span;
    const rightOffsetSlope = (midOffset - rightOffset) / span;

    // adjust webType for symmetry
    let adjustWebTyp = webType;
    if (webType === 1) adjustWebTyp = 2;
    if (webType === 2) adjustWebTyp = 1;

    const {
      nodes: rightNodes,
      elements: rightElements,
      topNodesIndices: rightTopNodesIndices,
      chordsIndices: rightChordsIndices,
      websIndices: rightWebsIndices,
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

    // connecting trim
    if (trim) {
      nodes.push(
        [0, 0, trimType == 3 ? leftHeight + leftOffset : leftOffset],
        [2 * span, 0, trimType == 3 ? rightHeight + rightOffset : rightOffset]
      );
      loadIndices.push(nodes.length - 2, nodes.length - 1);

      // leftTrussNodes + rightTrussNodes
      const leftNodesOffset = (trimDivisions + 1 + 1) * 2;
      const rightNodesOffset = (trimDivisions + 1) * 2;
      const nodesOffset = leftNodesOffset + rightNodesOffset;
      elements.push(
        [0, nodesOffset], // from leftBottom to far left
        [trimDivisions + 2, nodesOffset], // from leftTop to far left
        [leftNodesOffset + trimDivisions, nodesOffset + 1], // from rightBottom to far right
        [leftNodesOffset + rightNodesOffset - 1, nodesOffset + 1] // from rightTop to far right
      );

      chordsIndices.push(
        elements.length - 1,
        elements.length - 2,
        elements.length - 3,
        elements.length - 4
      );
    }

    // connect the pair
    const divisions = trim
      ? Math.round((span - 1 * spacing) / spacing)
      : Math.round(span / spacing);
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

    // supports
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
    // not pair of trusses
    const trimDivisions = Math.round((span - 2 * spacing) / spacing);
    const trim = trimType >= 2 && trimDivisions >= 1;
    const heightSlope = (leftHeight - rightHeight) / span;
    const offsetSlope = (leftOffset - rightOffset) / span;

    const {
      nodes: trussNodes,
      elements: trussElements,
      topNodesIndices,
      chordsIndices: trussChordsIndices,
      websIndices: trussWebsIndices,
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

    // connecting trim
    if (trim) {
      nodes.push(
        [0, 0, trimType == 3 ? leftHeight + leftOffset : leftOffset],
        [span, 0, trimType == 3 ? rightHeight + rightOffset : rightOffset]
      );

      loadIndices.push(...[nodes.length - 2, nodes.length - 1]); // for loads

      elements.push(
        [0, (trimDivisions + 1) * 2], // from leftBottom to far left
        [trimDivisions + 1, (trimDivisions + 1) * 2], // from leftTop to far left
        [trimDivisions, (trimDivisions + 1) * 2 + 1], // from rightBottom to far right
        [trimDivisions * 2 + 1, (trimDivisions + 1) * 2 + 1] // from righTop to far right
      );

      chordsIndices.push(
        elements.length - 1,
        elements.length - 2,
        elements.length - 3,
        elements.length - 4
      );
    }

    // supports
    if (trim) {
      supportIndices.push(...[trussNodes.length, trussNodes.length + 1]);
    } else {
      if (supportType === 1)
        supportIndices.push(...[0, trussNodes.length / 2 - 1]);
      else
        supportIndices.push(...[trussNodes.length / 2, trussNodes.length - 1]);
    }
  }

  // analysisInputs - supports
  analysisInputs.push(
    ...supportIndices.map((i) => ({
      node: i,
      support: [true, true, true] as [boolean, boolean, boolean],
    }))
  );

  // analysisInputs - loads
  analysisInputs.push(
    ...loadIndices.map((i) => ({
      node: i,
      load: [0, 0, -uniformLoad * spacing] as [number, number, number],
    }))
  );

  // analysisInputs - properties
  analysisInputs.push(
    ...chordsIndices.map((i) => ({
      element: i,
      area: chordsArea,
      elasticity: chordsElasticity,
    })),
    ...websIndices.map((i) => ({
      element: i,
      area: websArea,
      elasticity: websElasticity,
    }))
  );

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  // design
  const designInputs: DesignInput[] = [
    ...elements.map((_, i) => ({
      element: i,
      frameTimberDesign: {
        tensileStrengthParallel: 20e4,
        serviceClass: "1",
        loadDuration: "permanent",
        material: "Solid timber",
        gammaG: 1,
        gammaM: 1.3,
      },
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
        sheetNo: 2,
      },
    })),
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
    designOutputs,
  };
};

// helpers
const offset2D = (list: [number, number][], offset: number): Element[] =>
  list.map(([n1, n2]) => [n1 + offset, n2 + offset]);

const offset1D = (list: number[], offset: number) =>
  list.map((n) => n + offset);

app({
  parameters,
  onParameterChange,
  settings: { deformedShape: true, loads: false },
  reports: [summaryReport, connectionTimberDesignReport],
});
