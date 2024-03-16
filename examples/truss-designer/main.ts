import { ParametersType } from "../Parameters/Parameters";
import { createTruss2D, createTruss3D } from "./createTruss";
import { analyzeBarElements, Assignment } from "awatif";

export const parameters: ParametersType = {
  // @ts-ignore
  "Geometry/trussType": { value: true, label: "Toggle 2D/3D" },
  "Geometry/span": { value: 25, min: 5, max: 25, label: "Span (m)" },
  "Geometry/width": { value: 2, min: 1, max: 6, step: 1, label: "Width (m)" },
  "Geometry/spacing": { value: 2.5, min: 1, max: 5, label: "Spacing (m)" },
  "Geometry/webType": { value: 1, min: 1, max: 3, step: 1, label: "Web type" },
  "Geometry/trimType": {
    value: 1,
    min: 1,
    max: 3,
    step: 1,
    label: "Trim type",
  },
  "Geometry/leftHeight": {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Left height (m)",
  },
  "Geometry/midHeight": {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Mid height (m)",
  },
  "Geometry/rightHeight": {
    value: 2.5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Right height (m)",
  },
  "Geometry/leftOffset": {
    value: 0,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Left offset (m)",
  },
  "Geometry/midOffset": {
    value: 5,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Mid offset (m)",
  },
  "Geometry/rightOffset": {
    value: 0,
    min: 0,
    max: 10,
    step: 0.1,
    label: "Right offset (m)",
  },
  "Supports/supportType": {
    value: 1,
    min: 1,
    max: 2,
    step: 1,
    label: "Support type",
  },
  "Loads/uniformLoad": {
    value: 200,
    min: 0,
    max: 1000,
    step: 1,
    label: "Uniform load (KN/m)",
  },
  "Sections & Materials/chordsArea": {
    value: 50,
    min: 1,
    max: 100,
    step: 1,
    label: "Chords area (cm2)",
  },
  "Sections & Materials/chordsElasticity": {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Chords elasticity (gpa)",
  },
  "Sections & Materials/websArea": {
    value: 50,
    min: 1,
    max: 100,
    step: 1,
    label: "Webs area (cm2)",
  },
  "Sections & Materials/websElasticity": {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Webs elasticity (gpa)",
  },
};

export const onParameterChange = (parameters: any) => {
  let trussType = parameters["Geometry/trussType"].value;

  if (trussType == true) {
    let span = parameters["Geometry/span"].value;
    let width = parameters["Geometry/width"].value;
    let spacing = parameters["Geometry/spacing"].value;
    const webType = parameters["Geometry/webType"].value;
    const trimType = parameters["Geometry/trimType"].value;
    const leftHeight = parameters["Geometry/leftHeight"].value;
    const midHeight = parameters["Geometry/midHeight"].value;
    const rightHeight = parameters["Geometry/rightHeight"].value;
    const leftOffset = parameters["Geometry/leftOffset"].value;
    const midOffset = parameters["Geometry/midOffset"].value;
    const rightOffset = parameters["Geometry/rightOffset"].value;
    const supportType = parameters["Supports/supportType"].value;
    const uniformLoad = parameters["Loads/uniformLoad"].value;
    const chordsArea =
      parameters["Sections & Materials/chordsArea"].value * 1e-4;
    const chordsElasticity =
      parameters["Sections & Materials/chordsElasticity"].value * 1e6;
    const websArea = parameters["Sections & Materials/websArea"].value * 1e-4;
    const websElasticity =
      parameters["Sections & Materials/websElasticity"].value * 1e6;

    let nodes = [];
    let elements = [];
    let assignments: Assignment[] = [];
    let supportIndices = [];
    let loadIndices = [];
    let chordsIndices = [];
    let websIndices = [];
    let botNodesIndices = [];

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
        botNodesIndices: leftBotNodesIndices,
        topNodesIndices: leftTopNodesIndices,
        chordsIndices: leftChordsIndices,
        websIndices: leftWebsIndices,
      } = createTruss3D(
        trim ? span - spacing : span,
        spacing,
        width,
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
      botNodesIndices.push(...leftBotNodesIndices);

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
        botNodesIndices: rightBotNodesIndices,
        topNodesIndices: rightTopNodesIndices,
        chordsIndices: rightChordsIndices,
        websIndices: rightWebsIndices,
      } = createTruss3D(
        trim ? span - 2 * spacing : span - spacing,
        spacing,
        width,
        adjustWebTyp,
        midHeight - rightHeightSlope * spacing,
        trim ? rightHeight + rightHeightSlope * spacing : rightHeight,
        midOffset - rightOffsetSlope * spacing,
        trim ? rightOffset + rightOffsetSlope * spacing : rightOffset,
        span + spacing
      );

      const divisions = trim
        ? Math.round((span - 1 * spacing) / spacing)
        : Math.round(span / spacing);

      chordsIndices.push(...offset1D(rightChordsIndices, elements.length));
      websIndices.push(...offset1D(rightWebsIndices, elements.length));
      elements.push(...offset2D(rightElements, nodes.length));
      loadIndices.push(...offset1D(rightTopNodesIndices, nodes.length));
      nodes.push(...rightNodes);
      botNodesIndices.push(
        ...offset1D(rightBotNodesIndices, nodes.length - (divisions * 6 + 3))
      );

      // connecting trim
      if (trim) {
        nodes.push(
          [
            0,
            trimType == 3 ? -width / 2 : 0,
            trimType == 3 ? leftHeight + leftOffset : leftOffset,
          ],
          [
            0,
            trimType == 3 ? width / 2 : 0,
            trimType == 3 ? leftHeight + leftOffset : leftOffset,
          ],
          [
            2 * span,
            trimType == 3 ? -width / 2 : 0,
            trimType == 3 ? rightHeight + rightOffset : rightOffset,
          ],
          [
            2 * span,
            trimType == 3 ? width / 2 : 0,
            trimType == 3 ? rightHeight + rightOffset : rightOffset,
          ]
        );
        loadIndices.push(nodes.length - 2, nodes.length - 1);

        // leftTrussNodes + rightTrussNodes
        const leftNodesOffset = (trimDivisions + 1 + 1) * 2;
        const rightNodesOffset = (trimDivisions + 1) * 2;
        const nodesOffset = leftNodesOffset + rightNodesOffset;

        if (trimType == 2) {
          elements.push(
            ...[
              [loadIndices[0], nodes.length - 3], // from leftTop to far left bot
              [loadIndices[1], nodes.length - 3], // from leftTop to far left bot
              [0, nodes.length - 3], // Connecting H to far left bot
              [loadIndices[loadIndices.length - 4], nodes.length - 1], //from right top to far right bot
              [loadIndices[loadIndices.length - 3], nodes.length - 1], //from right top to far right bot
              [nodesOffset, nodes.length - 1], // Connecting H to far left bot
            ]
          );
          chordsIndices.push(
            elements.length - 6,
            elements.length - 5,
            elements.length - 4,
            elements.length - 3,
            elements.length - 2,
            elements.length - 1
          );
        } else {
          elements.push(
            ...[
              [nodesOffset, nodes.length - 1],
              [nodesOffset, nodes.length - 2],
              [0, nodes.length - 3],
              [0, nodes.length - 4],
              [nodesOffset + rightNodesOffset - 1, nodes.length - 1],
              [nodesOffset + rightNodesOffset, nodes.length - 2],
              [nodes.length - 2, nodes.length - 1],
              [loadIndices[0], nodes.length - 3],
              [loadIndices[1], nodes.length - 4],
              [nodes.length - 4, nodes.length - 3],
              webType == 1
                ? [nodesOffset + rightNodesOffset - 1, nodes.length - 2]
                : [nodesOffset + rightNodesOffset, nodes.length - 1],
              webType == 1
                ? [loadIndices[0], nodes.length - 4]
                : [loadIndices[1], nodes.length - 3],
            ]
          );
          chordsIndices.push(
            elements.length - 12,
            elements.length - 11,
            elements.length - 10,
            elements.length - 9,
            elements.length - 8,
            elements.length - 7,
            elements.length - 5,
            elements.length - 4
          );

          websIndices.push(
            elements.length - 6,
            elements.length - 3,
            elements.length - 2,
            elements.length - 1
          );
        }

        if (trimType == 3 && webType == 3) {
          elements.push(
            ...[
              [nodesOffset + rightNodesOffset - 1, nodes.length - 2],
              [leftNodesOffset / 2, nodes.length - 4],
            ]
          );
          websIndices.push(elements.length - 2, elements.length - 1);
        }
      }

      // connect the pair
      //const divisions = trim
      //  ? Math.round((span - 1 * spacing) / spacing)
      //  : Math.round(span / spacing);
      const bottomLeft = divisions;
      const bottomRight = (divisions + 1) * 3;
      const topLefty = bottomRight - 1;
      const topRighty = (divisions + 1) * 4;
      const topLeftyy = topLefty - 1;
      const topRightyy = topRighty - 1;

      elements.push(
        [bottomLeft, bottomRight],
        [topLefty, topRighty],
        [topLeftyy, topRightyy]
      );
      chordsIndices.push(
        elements.length - 3,
        elements.length - 2,
        elements.length - 1
      );

      if (webType === 1) {
        elements.push(
          [topLefty, bottomRight],
          [topLeftyy, bottomRight],
          [topLeftyy, topRighty]
        );

        websIndices.push(
          elements.length - 3,
          elements.length - 2,
          elements.length - 1
        );
      }
      if (webType === 2) {
        elements.push(
          [topRighty, bottomLeft],
          [topRightyy, bottomLeft],
          [topLefty, topRightyy]
        );

        websIndices.push(
          elements.length - 3,
          elements.length - 2,
          elements.length - 1
        );
      }
      if (webType === 3) {
        elements.push(
          [topLefty, bottomRight],
          [topLeftyy, bottomRight],
          [topLefty, topRightyy],
          [topLeftyy, topRighty],
          [bottomLeft, topRighty],
          [bottomLeft, topRightyy]
        );

        websIndices.push(
          elements.length - 6,
          elements.length - 5,
          elements.length - 4,
          elements.length - 3,
          elements.length - 2,
          elements.length - 1
        );
      }

      // supports
      if (trim) {
        const trussNodesLength = leftNodes.length + rightNodes.length;
        supportIndices.push(
          ...[trussNodesLength],
          [trussNodesLength + 1],
          [trussNodesLength + 2],
          [trussNodesLength + 3]
        );
      } else {
        if (supportType === 1) supportIndices.push(...[0, divisions * 4 + 2]);
        else
          supportIndices.push(
            ...[
              divisions + 1,
              divisions + 2,
              divisions * 6 + 1,
              divisions * 6 + 2,
            ]
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
        botNodesIndices,
        chordsIndices: trussChordsIndices,
        websIndices: trussWebsIndices,
      } = createTruss3D(
        trim ? span - 2 * spacing : span,
        spacing,
        width,
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
          [
            0,
            trimType == 3 ? -width / 2 : 0,
            trimType == 3 ? leftHeight + leftOffset : leftOffset,
          ],
          [
            0,
            trimType == 3 ? width / 2 : 0,
            trimType == 3 ? leftHeight + leftOffset : leftOffset,
          ],
          [
            span,
            trimType == 3 ? -width / 2 : 0,
            trimType == 3 ? rightHeight + rightOffset : rightOffset,
          ],
          [
            span,
            trimType == 3 ? width / 2 : 0,
            trimType == 3 ? rightHeight + rightOffset : rightOffset,
          ]
        );

        topNodesIndices.push(
          nodes.length - 4,
          nodes.length - 3,
          nodes.length - 2,
          nodes.length - 1
        );

        loadIndices.push(
          ...[
            nodes.length - 4,
            nodes.length - 3,
            nodes.length - 2,
            nodes.length - 1,
          ]
        ); // for loads

        if (trimType == 2) {
          elements.push(
            ...[
              [topNodesIndices[0], topNodesIndices[topNodesIndices.length - 3]], //far left top to left bottom +y
              [topNodesIndices[1], topNodesIndices[topNodesIndices.length - 3]], //far left top to left bottom -y
              [
                topNodesIndices[topNodesIndices.length - 6],
                topNodesIndices[topNodesIndices.length - 1],
              ], //far right top to right bottom +y
              [
                topNodesIndices[topNodesIndices.length - 5],
                topNodesIndices[topNodesIndices.length - 1],
              ], //far right top to right bottom -y
              [botNodesIndices[0], topNodesIndices[topNodesIndices.length - 3]], // connecting H left
              [
                botNodesIndices.length - 1,
                topNodesIndices[topNodesIndices.length - 1],
              ], // connecting H right
            ]
          );
          chordsIndices.push(
            elements.length - 6,
            elements.length - 5,
            elements.length - 4,
            elements.length - 3,
            elements.length - 2,
            elements.length - 1
          );
        } else {
          elements.push(
            ...[
              [topNodesIndices[0], topNodesIndices[topNodesIndices.length - 3]], // top left +y
              [topNodesIndices[1], topNodesIndices[topNodesIndices.length - 4]], // top left -y
              [
                topNodesIndices[topNodesIndices.length - 6],
                topNodesIndices[topNodesIndices.length - 1],
              ], // top right +y
              [
                topNodesIndices[topNodesIndices.length - 5],
                topNodesIndices[topNodesIndices.length - 2],
              ], // top right -y
              [botNodesIndices[0], topNodesIndices[topNodesIndices.length - 3]], // left bot to top +y
              [botNodesIndices[0], topNodesIndices[topNodesIndices.length - 4]], // left bot to top -y
              [
                botNodesIndices[botNodesIndices.length - 1],
                topNodesIndices[topNodesIndices.length - 1],
              ], // right bot to top +y
              [
                botNodesIndices[botNodesIndices.length - 1],
                topNodesIndices[topNodesIndices.length - 2],
              ], // right bot to top -y
              [
                topNodesIndices[topNodesIndices.length - 3],
                topNodesIndices[topNodesIndices.length - 4],
              ], // connecting H left
              [
                topNodesIndices[topNodesIndices.length - 2],
                topNodesIndices[topNodesIndices.length - 1],
              ], // connecting H left
            ]
          );

          chordsIndices.push(
            elements.length - 10,
            elements.length - 9,
            elements.length - 8,
            elements.length - 7,
            elements.length - 6,
            elements.length - 5,
            elements.length - 4,
            elements.length - 3
          );

          websIndices.push(elements.length - 2, elements.length - 1);
        }
      }

      // supports
      if (trim) {
        supportIndices.push(
          ...[
            topNodesIndices[topNodesIndices.length - 4],
            topNodesIndices[topNodesIndices.length - 3],
            topNodesIndices[topNodesIndices.length - 2],
            topNodesIndices[topNodesIndices.length - 1],
          ]
        );
      } else {
        if (supportType === 1)
          supportIndices.push(...[0, botNodesIndices.length - 1]);
        else
          supportIndices.push(
            ...[
              topNodesIndices[0],
              topNodesIndices[1],
              topNodesIndices[topNodesIndices.length - 2],
              topNodesIndices[topNodesIndices.length - 1],
            ]
          );
      }
    }

    // assignments - supports
    assignments.push(
      ...supportIndices.map((i) => ({
        node: i,
        support: [true, true, true] as [boolean, boolean, boolean],
      }))
    );

    // assignments - loads
    assignments.push(
      ...loadIndices.map((i) => ({
        node: i,
        load: [0, 0, -uniformLoad * spacing] as [number, number, number],
      }))
    );

    // assignments - properties
    assignments.push(
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

    // @ts-ignore
    self.$k = "er";
    const analysisResults = analyzeBarElements(nodes, elements, assignments);

    return { nodes, elements, assignments, analysisResults };
  } else {
    let span = parameters["Geometry/span"].value;
    let spacing = parameters["Geometry/spacing"].value;
    const webType = parameters["Geometry/webType"].value;
    const trimType = parameters["Geometry/trimType"].value;
    const leftHeight = parameters["Geometry/leftHeight"].value;
    const midHeight = parameters["Geometry/midHeight"].value;
    const rightHeight = parameters["Geometry/rightHeight"].value;
    const leftOffset = parameters["Geometry/leftOffset"].value;
    const midOffset = parameters["Geometry/midOffset"].value;
    const rightOffset = parameters["Geometry/rightOffset"].value;
    const supportType = parameters["Supports/supportType"].value;
    const uniformLoad = parameters["Loads/uniformLoad"].value;
    const chordsArea =
      parameters["Sections & Materials/chordsArea"].value * 1e-4;
    const chordsElasticity =
      parameters["Sections & Materials/chordsElasticity"].value * 1e6;
    const websArea = parameters["Sections & Materials/websArea"].value * 1e-4;
    const websElasticity =
      parameters["Sections & Materials/websElasticity"].value * 1e6;

    let nodes = [];
    let elements = [];
    let assignments: Assignment[] = [];
    let supportIndices = [];
    let loadIndices = [];
    let chordsIndices = [];
    let websIndices = [];

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
      } = createTruss2D(
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
      } = createTruss2D(
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
      } = createTruss2D(
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
          ...[
            [0, (trimDivisions + 1) * 2], // from leftBottom to far left
            [trimDivisions + 1, (trimDivisions + 1) * 2], // from leftTop to far left
            [trimDivisions, (trimDivisions + 1) * 2 + 1], // from rightBottom to far right
            [trimDivisions * 2 + 1, (trimDivisions + 1) * 2 + 1], // from righTop to far right
          ]
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
          supportIndices.push(
            ...[trussNodes.length / 2, trussNodes.length - 1]
          );
      }
    }

    // assignments - supports
    assignments.push(
      ...supportIndices.map((i) => ({
        node: i,
        support: [true, true, true] as [boolean, boolean, boolean],
      }))
    );

    // assignments - loads
    assignments.push(
      ...loadIndices.map((i) => ({
        node: i,
        load: [0, 0, -uniformLoad * spacing] as [number, number, number],
      }))
    );

    // assignments - properties
    assignments.push(
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

    // @ts-ignore
    self.$k = "er";
    const analysisResults = analyzeBarElements(nodes, elements, assignments);

    return { nodes, elements, assignments, analysisResults };
  }
};

// helpers
/*const offset3D = (list:[number, number, number][], offset: number) =>
  list.map(([n1, n2, n3]) => [n1 + offset, n2 + offset, n3 + offset]);*/

const offset2D = (list: [number, number][], offset: number) =>
  list.map(([n1, n2]) => [n1 + offset, n2 + offset]);

const offset1D = (list: number[], offset: number) =>
  list.map((n) => n + offset);
