export function createTruss2D(
  span: number,
  spacing: number,
  webType: number,
  leftHeight: number,
  rightHeight: number,
  leftOffset: number,
  rightOffset: number,
  positionOffset: number = 0
): {
  nodes: any;
  elements: any;
  topNodesIndices: any;
  chordsIndices: any;
  websIndices: any;
} {
  const divisions = Math.round(span / spacing);

  let nodes = [];
  let elements = [];
  let topNodesIndices = [];
  let chordsIndices = [];
  let websIndices = [];

  // nodes - bottom
  for (let i = 0; i < divisions + 1; i++) {
    const x = i * spacing;
    const offsetSlope = (rightOffset - leftOffset) / span;
    const offset = leftOffset + offsetSlope * x;

    nodes.push([positionOffset + x, 0, offset]);
  }

  // node - top
  for (let i = 0; i < divisions + 1; i++) {
    const x = i * spacing;
    const heightSlope = (rightHeight - leftHeight) / span;
    const height = leftHeight + heightSlope * x;
    const offsetSlope = (rightOffset - leftOffset) / span;
    const offset = leftOffset + offsetSlope * x;

    nodes.push([positionOffset + x, 0, offset + height]);
    topNodesIndices.push(nodes.length - 1);
  }

  // elements - web types
  if (webType === 1) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        ...[
          [i, i + 1], // bottom
          [divisions + 1 + i, divisions + 1 + i + 1], // top
          [i, divisions + 1 + i], // vertical
          [i, divisions + 1 + i + 1], // diagonal
        ]
      );
      chordsIndices.push(elements.length - 3, elements.length - 4);
      websIndices.push(elements.length - 1, elements.length - 2);
    }
  }

  if (webType === 2) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        ...[
          [i, i + 1], // bottom
          [divisions + 1 + i, divisions + 1 + i + 1], // top
          [i, divisions + 1 + i], // vertical
          [i + 1, divisions + 1 + i], // diagonal
        ]
      );
      chordsIndices.push(elements.length - 3, elements.length - 4);
      websIndices.push(elements.length - 1, elements.length - 2);
    }
  }

  if (webType === 3) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        ...[
          [i, i + 1], // bottom
          [divisions + 1 + i, divisions + 1 + i + 1], // top
          [i, divisions + 1 + i], // vertical
          [i, divisions + 1 + i + 1], // diagonal
          [i + 1, divisions + 1 + i], // diagonal
        ]
      );
      chordsIndices.push(elements.length - 4, elements.length - 5);
      websIndices.push(
        elements.length - 1,
        elements.length - 2,
        elements.length - 3
      );
    }
  }

  // element - closing
  elements.push([divisions, 2 * divisions + 1]);
  websIndices.push(elements.length - 1);

  return { nodes, elements, topNodesIndices, chordsIndices, websIndices };
}

export function createTruss3D(
  span: number,
  spacing: number,
  width: number,
  webType: number,
  leftHeight: number,
  rightHeight: number,
  leftOffset: number,
  rightOffset: number,
  positionOffset: number = 0
): {
  nodes: any;
  elements: any;
  botNodesIndices: any;
  topNodesIndices: any;
  chordsIndices: any;
  websIndices: any;
} {
  const divisions = Math.round(span / spacing);
  //const divisionsEven = divisions % 2 === 0;

  let nodes = [];
  let elements = [];
  let botNodesIndices = [];
  let topNodesIndices = [];
  let chordsIndices = [];
  let websIndices = [];

  // nodes - bottom
  for (let i = 0; i < divisions + 1; i++) {
    const x = i * spacing;
    //const y = j * spacingY;
    const offsetSlope = (rightOffset - leftOffset) / span;
    const offset = leftOffset + offsetSlope * x;
    nodes.push([positionOffset + x, 0, offset]);
    botNodesIndices.push(nodes.length - 1);
  }

  // nodes - top
  for (let i = 0; i < divisions + 1; i++) {
    const x = i * spacing;
    const y = width / 2;
    const heightSlope = (rightHeight - leftHeight) / span;
    const height = leftHeight + heightSlope * x;
    const offsetSlope = (rightOffset - leftOffset) / span;
    const offset = leftOffset + offsetSlope * x;

    nodes.push(
      [positionOffset + x, y, offset + height],
      [positionOffset + x, -y, offset + height]
    );
    topNodesIndices.push(nodes.length - 2, nodes.length - 1);
  }

  // bottom elements
  for (let i = 0; i < divisions; i++) {
    elements.push(...[[i, i + 1]]);
    chordsIndices.push(elements.length - 1);
  }
  // top width elements
  for (let i = 0; i < topNodesIndices.length; i += 2) {
    elements.push(...[[topNodesIndices[i], topNodesIndices[i + 1]]]);
    websIndices.push(elements.length - 1);
  }
  // top elements
  for (let i = 0; i < topNodesIndices.length - 2; i += 2) {
    elements.push(
      ...[
        [topNodesIndices[i], topNodesIndices[i + 2]],
        [topNodesIndices[i + 1], topNodesIndices[i + 3]],
      ]
    );
    chordsIndices.push(elements.length - 2, elements.length - 1);
  }
  // vertical elements
  for (
    let i = 0, j = 0;
    i < divisions + 1 || j < topNodesIndices.length - 2;
    i++, j += 2
  ) {
    elements.push(
      ...[
        [i, topNodesIndices[j]],
        [i, topNodesIndices[j + 1]],
      ]
    );
    websIndices.push(elements.length - 2, elements.length - 1);
  }
  // elements - web types
  if (webType === 1) {
    for (
      let i = 0, j = 0;
      i < divisions || j < topNodesIndices.length - 2;
      i++, j += 2
    ) {
      elements.push(
        ...[
          [topNodesIndices[j + 1], topNodesIndices[j + 2]], //top -Y Y
          [i, topNodesIndices[j + 2]], // diagonal
          [i, topNodesIndices[j + 3]], // diagonal
        ]
      );
      websIndices.push(
        elements.length - 3,
        elements.length - 2,
        elements.length - 1
      );
    }
  }

  if (webType === 2) {
    for (
      let i = 0, j = 0;
      i < divisions || j < topNodesIndices.length - 2;
      i++, j += 2
    ) {
      elements.push(
        ...[
          [topNodesIndices[j], topNodesIndices[j + 3]], //top Y -Y
          [i + 1, topNodesIndices[j]], // diagonal
          [i + 1, topNodesIndices[j + 1]], // diagonal
        ]
      );
      websIndices.push(
        elements.length - 3,
        elements.length - 2,
        elements.length - 1
      );
    }
  }
  if (webType === 3) {
    for (
      let i = 0, j = 0;
      i < divisions || j < topNodesIndices.length - 2;
      i++, j += 2
    ) {
      elements.push(
        ...[
          [topNodesIndices[j + 1], topNodesIndices[j + 2]], //top -Y Y
          [topNodesIndices[j], topNodesIndices[j + 3]], //top Y -Y
          [i, topNodesIndices[j + 2]], // diagonal
          [i, topNodesIndices[j + 3]], // diagonal
          [i + 1, topNodesIndices[j]], // diagonal
          [i + 1, topNodesIndices[j + 1]], // diagonal
        ]
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
  }

  return {
    nodes,
    elements,
    botNodesIndices,
    topNodesIndices,
    chordsIndices,
    websIndices,
  };
}
