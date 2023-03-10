import { AssignmentType, Model } from "../../interfaces";

export function getSupports(model: Model) {
  const supports: any = [];
  model.assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.barSupports) {
      if (assignment.firstNode?.some((v) => v == true)) {
        supports.push(
          model.positions[model.connectivities[assignment.element!][0]]
        );
      }
      if (assignment.secondNode?.some((v) => v == true)) {
        supports.push(
          model.positions[model.connectivities[assignment.element!][1]]
        );
      }
    }
  });

  return supports;
}
