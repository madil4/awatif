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
  const elasticity = parameters.elasticity.value * 1e6;
  const area = parameters.area.value * 1e-4;
  const load = parameters.load.value;
  const strength = parameters.strength.value * 1e3;

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
  for (let i = 1; i < divisions - 1; i++) {
    connectivities.push([divisions + 1 + i, divisions + 1 + i + 1]);
  }

  for (let i = 1; i < divisions; i++) {
    connectivities.push([i, divisions + 1 + i]); // vertical post
  }

  // diagonal post
  for (let i = 0; i < divisions; i++) {
    if (i < divisions / 2) {
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
      ...bottomChord.map(
        (element) =>
          ({
            element: element,
            type: AssignmentType.barUniformLoad,
            yLoad: -load,
          } as Assignment)
      ),
      ...connectivities.map(
        (_, element) =>
          ({
            element: element,
            type: AssignmentType.bar,
            elasticity: elasticity,
            area: area,
          } as Assignment)
      ),
      ...connectivities.map(
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
