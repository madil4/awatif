import { norm, subtract } from "mathjs";
import {
  Model,
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
} from "../interfaces";
import { deforming } from "./deforming";

export function analyzing(model: Model): AnalysisResults {
  const deformedPositions = deforming(model);
  model.deformedPositions = deformedPositions;

  const bars: Map<number, { area: number; elasticity: number }> = new Map();
  model.assignments?.forEach((assignment) => {
    if (
      assignment.type == AssignmentType.bar &&
      assignment.element != undefined
    )
      bars.set(assignment.element, {
        area: assignment.area,
        elasticity: assignment.elasticity,
      });
  });

  const analysisResults: AnalysisResults = [];
  model.connectivities.forEach((element, index) => {
    const bar = bars.get(index) ?? { area: 0, elasticity: 0 };
    const L0 = norm(
      subtract(model.positions[element[1]], model.positions[element[0]])
    ) as number;
    const L = norm(
      subtract(deformedPositions[element[1]], deformedPositions[element[0]])
    ) as number;
    const stress = (bar.elasticity * (L - L0)) / L;

    const d0 = subtract(
      deformedPositions[element[0]],
      model.positions[element[0]]
    );
    const d1 = subtract(
      deformedPositions[element[1]],
      model.positions[element[1]]
    );

    analysisResults.push({
      element: index,
      type: AnalysisResultType.bar,
      stress: stress,
      force: stress * bar.area,
      deformation: [d0, d1],
    });
  });

  return analysisResults;
}
