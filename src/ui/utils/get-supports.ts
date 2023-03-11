import { AssignmentType, Model, Node } from "../../interfaces";

export function getSupports(model: Model): Node[] {
  const supports: Node[] = [];
  model.assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.barSupports) {
      if (assignment.firstNode?.some((v) => v == true)) {
        supports.push(model.nodes[model.elements[assignment.element!][0]]);
      }
      if (assignment.secondNode?.some((v) => v == true)) {
        supports.push(model.nodes[model.elements[assignment.element!][1]]);
      }
    }
  });

  return supports;
}
