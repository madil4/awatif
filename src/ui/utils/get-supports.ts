import { AssignmentType, Model } from "../../interfaces";

export function getSupports(model: Model) {
  const supports: any = [];
  model.assignments?.forEach((assignment) => {
    if (assignment[1].type == AssignmentType.barSupports) {
      if (assignment[1].firstNode?.some((v) => v == true)) {
        supports.push(model.positions[model.connectivities[assignment[0]][0]]);
      }
      if (assignment[1].secondNode?.some((v) => v == true)) {
        supports.push(model.positions[model.connectivities[assignment[0]][1]]);
      }
    }
  });

  return supports;
}
