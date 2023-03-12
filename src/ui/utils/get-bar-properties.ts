import {
  AssignmentType,
  BarPropertiesAssignment,
  Model,
} from "../../interfaces";

export const getBarProperties = (
  model: Model
): Map<number, BarPropertiesAssignment> => {
  const barProperties: Map<number, BarPropertiesAssignment> = new Map();

  model.assignments?.forEach((assignment) => {
    if (assignment.type === AssignmentType.barProperties) {
      barProperties.set(assignment.element ?? -1, assignment);
    }
  });

  return barProperties;
};
