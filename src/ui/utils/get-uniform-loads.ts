import { AssignmentType, Model, Node } from "../../interfaces";

export const getUniformLoads = (model: Model): [Node, Node][] => {
  const loads: [Node, Node][] = [];
  model.assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.barUniformLoad) {
      loads.push([
        model.nodes[model.elements[assignment.element!][0]],
        model.nodes[model.elements[assignment.element!][1]],
      ]);
    }
  });

  return loads;
};
