import { norm, subtract } from "mathjs";
import {
  Model,
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
} from "../interfaces";
import { minimizing } from "./minimizing";

export function analyzing(model: Model): AnalysisResults {
  const oldPositions = { ...model.positions };
  const newPositions = minimizing(model).positions;

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
      subtract(oldPositions[element[1]], oldPositions[element[0]])
    ) as number;
    const L = norm(
      subtract(newPositions[element[1]], newPositions[element[0]])
    ) as number;
    const stress = (bar.elasticity * (L - L0)) / L;

    analysisResults.push({
      element: index,
      type: AnalysisResultType.bar,
      stress: stress,
      force: stress * bar.area,
    });
  });

  return analysisResults;
}
