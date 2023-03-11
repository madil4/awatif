import {
  Assignment,
  AssignmentType,
  Element,
  Model,
  Node,
  Parameters,
} from "../../../src/interfaces";

export function modeling(parameters: Parameters): Model {
  const span = parameters.span.value as number;
  const divisions = parameters.divisions.value as number;
  const height = parameters.height.value as number;
  const elasticity = (parameters.elasticity.value as number) * 1e6;
  const area = (parameters.area.value as number) * 1e-4;
  const load = parameters.load.value as number;
  const strength = (parameters.strength.value as number) * 1e3;

  const nodes: Node[] = [];
  const elements: Element[] = [];
  const dx = span / divisions;
  const offset = -span / 2;

  for (let i = 0; i <= divisions; i++) {
    nodes.push([dx * i + offset, 0, 0]); // bottom chord
  }
  for (let i = 0; i <= divisions; i++) {
    nodes.push([dx * i + offset, height, 0]); // top chord
  }

  // bottom chord
  const bottomChord: number[] = [];
  for (let i = 0; i < divisions; i++) {
    elements.push([i, i + 1]);
    bottomChord.push(elements.length - 1);
  }

  // top chord
  for (let i = 1; i < divisions - 1; i++) {
    elements.push([divisions + 1 + i, divisions + 1 + i + 1]);
  }

  for (let i = 1; i < divisions; i++) {
    elements.push([i, divisions + 1 + i]); // vertical post
  }

  // diagonal post
  for (let i = 0; i < divisions; i++) {
    if (i < divisions / 2) {
      elements.push([i, divisions + 1 + i + 1]);
    } else {
      elements.push([divisions + 1 + i, i + 1]);
    }
  }

  return {
    nodes,
    elements,
    assignments: [
      {
        type: AssignmentType.barSupports,
        firstNode: [true, true, true],
        element: bottomChord[0],
      },
      {
        type: AssignmentType.barSupports,
        secondNode: [true, true, true],
        element: bottomChord[bottomChord.length - 1],
      },
      ...bottomChord.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barUniformLoad,
            yLoad: -load,
          } as Assignment)
      ),
      ...elements.map(
        (_, element) =>
          ({
            element: element,
            type: AssignmentType.bar,
            elasticity: elasticity,
            area: area,
          } as Assignment)
      ),
      ...elements.map(
        (_, element) =>
          ({
            element: element,
            type: AssignmentType.steelDesign,
            strength: strength,
          } as Assignment)
      ),
    ],
  };
}
