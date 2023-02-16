import { AssignmentType, Model } from "../../interfaces";

export function getUniformLoads(model: Model) {
  const loads: number[][][] = [];
  model.assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.barUniformLoad) {
      loads.push([
        model.positions[model.connectivities[assignment.element][0]],
        model.positions[model.connectivities[assignment.element][1]],
      ]);
    }
  });

  return loads;
}
