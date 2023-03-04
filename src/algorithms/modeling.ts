import { Parameters, Model, Assignment, AssignmentType } from "../interfaces";

export function modeling(parameters: Parameters): Model {
  const bar: Assignment = {
    type: AssignmentType.bar,
    area: 1,
    elasticity: 200,
  };
  const support: Assignment = {
    type: AssignmentType.barSupports,
    firstNode: [true, true, true],
  };
  const load100: Assignment = {
    type: AssignmentType.barUniformLoad,
    xLoad: 100,
  };
  const design200: Assignment = {
    type: AssignmentType.steelDesign,
    strength: 200,
  };

  return {
    positions: [
      [-10, 0, 10],
      [10, 0, 10],
      [0, 0, -10],
      [0, parameters.height.value, 0],
    ],
    connectivities: [
      [0, 3],
      [1, 3],
      [2, 3],
    ],
    assignments: [
      { element: 0, ...bar },
      { element: 1, ...bar },
      { element: 2, ...bar },
      { element: 0, ...support },
      { element: 1, ...support },
      { element: 2, ...support },
      { element: 0, ...load100 },
      { element: 1, ...load100 },
      { element: 2, ...load100 },
      { element: 0, ...design200 },
      { element: 1, ...design200 },
      { element: 2, ...design200 },
    ],
  };
}
