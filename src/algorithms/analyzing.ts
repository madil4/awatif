import { norm, subtract } from "mathjs";
import {
  Model,
  AnalysisResultType,
  AssignmentType,
  AnalysisResult,
} from "../interfaces";
import { deforming } from "./deforming";

export function analyzing(model: Model): AnalysisResult[] {
  const deformedNodes = deforming(model);
  model.deformedNodes = deformedNodes;

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

  const analysisResults: AnalysisResult[] = [];
  model.elements.forEach((element, index) => {
    const bar = bars.get(index) ?? { area: 0, elasticity: 0 };
    const L0 = norm(
      subtract(model.nodes[element[1]], model.nodes[element[0]])
    ) as number;
    const L = norm(
      subtract(deformedNodes[element[1]], deformedNodes[element[0]])
    ) as number;
    const stress = (bar.elasticity * (L - L0)) / L;

    const d0 = subtract(deformedNodes[element[0]], model.nodes[element[0]]);
    const d1 = subtract(deformedNodes[element[1]], model.nodes[element[1]]);

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
