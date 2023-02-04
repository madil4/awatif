import { AssignmentType, Model } from "../../interfaces";

export function getUniformLoads(model: Model) {
  const loads: number[][][] = [];
  model.assignments?.forEach((assignment) => {
    if (assignment[1].type == AssignmentType.barUniformLoad) {
      loads.push([
        model.positions[model.connectivities[assignment[0]][0]],
        model.positions[model.connectivities[assignment[0]][1]],
      ]);
    }
  });

  return loads;
}
