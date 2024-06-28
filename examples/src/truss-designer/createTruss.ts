import { Node, Element } from "awatif-data-structure";

export function createTruss(
  span: number,
  spacing: number,
  webType: number,
  leftHeight: number,
  rightHeight: number,
  leftOffset: number,
  rightOffset: number,
  positionOffset: number = 0
): {
  nodes: Node[];
  elements: Element[];
  topNodesIndices: number[];
  chordsIndices: number[];
  websIndices: number[];
} {
  const divisions = Math.round(span / spacing);

  let nodes: Node[] = [];
  let elements: Element[] = [];
  let topNodesIndices: number[] = [];
  let chordsIndices: number[] = [];
  let websIndices: number[] = [];

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
        [i, i + 1], // bottom
        [divisions + 1 + i, divisions + 1 + i + 1], // top
        [i, divisions + 1 + i], // vertical
        [i, divisions + 1 + i + 1] // diagonal
      );
      chordsIndices.push(elements.length - 3, elements.length - 4);
      websIndices.push(elements.length - 1, elements.length - 2);
    }
  }

  if (webType === 2) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        [i, i + 1], // bottom
        [divisions + 1 + i, divisions + 1 + i + 1], // top
        [i, divisions + 1 + i], // vertical
        [i + 1, divisions + 1 + i] // diagonal
      );
      chordsIndices.push(elements.length - 3, elements.length - 4);
      websIndices.push(elements.length - 1, elements.length - 2);
    }
  }

  if (webType === 3) {
    for (let i = 0; i < divisions; i++) {
      elements.push(
        [i, i + 1], // bottom
        [divisions + 1 + i, divisions + 1 + i + 1], // top
        [i, divisions + 1 + i], // vertical
        [i, divisions + 1 + i + 1], // diagonal
        [i + 1, divisions + 1 + i] // diagonal
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
