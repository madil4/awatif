import {
  Assignment,
  AssignmentType,
  Model,
  Parameters,
} from "../../../src/interfaces";

export function modeling(parameters: Parameters): Model {
  const span = parameters.span.value;
  const divisions = parameters.divisions.value;
  const height = parameters.height.value;

  const positions: [number, number, number][] = [];
  const connectivities: [number, number][] = [];
  const dx = span / divisions;
  const offset = -span / 2;

  for (let i = 0; i <= divisions; i++) {
    positions.push([dx * i + offset, 0, 0]); // bottom chord
  }
  for (let i = 0; i <= divisions; i++) {
    positions.push([dx * i + offset, height, 0]); // top chord
  }

  // bottom chord
  const bottomChord: number[] = [];
  for (let i = 0; i < divisions; i++) {
    connectivities.push([i, i + 1]);
    bottomChord.push(connectivities.length - 1);
  }

  // top chord
  const topChord: number[] = [];
  for (let i = 0; i < divisions; i++) {
    connectivities.push([divisions + 1 + i, divisions + 1 + i + 1]);
    topChord.push(connectivities.length - 1);
  }
  for (let i = 0; i <= divisions; i++) {
    connectivities.push([i, divisions + 1 + i]); // vertical post
  }

  // diagonal post
  for (let i = 0; i < divisions; i++) {
    if (i % 2 == 0) {
      connectivities.push([i, divisions + 1 + i + 1]);
    } else {
      connectivities.push([divisions + 1 + i, i + 1]);
    }
  }

  return {
    positions,
    connectivities,
    assignments: [
      {
        type: AssignmentType.barSupports,
        firstNode: [true, true],
        element: bottomChord[0],
      },
      {
        type: AssignmentType.barSupports,
        secondNode: [true, true],
        element: bottomChord[bottomChord.length - 1],
      },
      ...topChord.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barUniformLoad,
            yLoad: -100,
          } as Assignment)
      ),
      ...connectivities.map(
        (_, element) =>
          ({
            element: element,
            type: AssignmentType.bar,
            elasticity: 100,
            area: 100,
          } as Assignment)
      ),
    ],
  };
}
