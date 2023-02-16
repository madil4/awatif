import { Parameters, Model, Assignment, AssignmentType } from "../interfaces";

export function modeling2Bars(parameters: Parameters): Model {
  const bar: Assignment = {
    type: AssignmentType.bar,
    area: 1,
    elasticity: 200,
  };
  const support: Assignment = {
    type: AssignmentType.barSupports,
    firstNode: [true, true],
    secondNode: [false, false],
  };
  const load: Assignment = {
    type: AssignmentType.barUniformLoad,
    load: 100,
  };
  const design: Assignment = {
    type: AssignmentType.steelDesign,
    strength: 100,
  };

  return {
    positions: [
      [-5, 0, 0],
      [0, parameters.height.value, 0],
      [5, 0, 0],
    ],
    connectivities: [
      [0, 1],
      [2, 1],
    ],
    assignments: [
      [0, bar],
      [1, bar],
      [0, support],
      [1, support],
      [0, load],
      [0, design],
      [1, design],
    ],
  };
}
