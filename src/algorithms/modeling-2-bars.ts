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
  const load100: Assignment = {
    type: AssignmentType.barUniformLoad,
    load: 100,
  };
  const design200: Assignment = {
    type: AssignmentType.steelDesign,
    strength: 200,
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
      { element: 0, ...bar },
      { element: 1, ...bar },
      { element: 0, ...support },
      { element: 1, ...support },
      { element: 0, ...load100 },
      { element: 0, ...design200 },
      { element: 1, ...design200 },
    ],
  };
}
