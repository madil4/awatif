import { Element, Node } from "awatif-data-structure";

export function calculateElementLength(
  elements: Element[],
  nodes: Node[]
): number[] {
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

export function calculateElementLengthSingle(
  element: Element,
  nodes: Node[]
): number {
  const [nodeid1, nodeid2] = element;
  const node1 = nodes[nodeid1];
  const node2 = nodes[nodeid2];
  const [x1, , z1]: number[] = node1;
  const [x2, , z2]: number[] = node2;
  const dx: number = x2 - x1;
  const dz: number = z2 - z1;
  const length: number = Math.sqrt(dx * dx + dz * dz);

  return length;
}
