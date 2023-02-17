import {
  AnalysisResult,
  AnalysisResultType,
  AssignmentType,
  DesignResult,
  DesignResultType,
  Model,
} from "../interfaces";

export function designing(
  model: Model,
  analysisResults: AnalysisResult[]
): DesignResult[] {
  const strengths: Map<number, number> = new Map();
  const stresses: Map<number, number> = new Map();

  model.assignments?.forEach((assignment) => {
    if (assignment.type == AssignmentType.steelDesign)
      strengths.set(assignment.element ?? -1, assignment.strength);
  });
  analysisResults?.forEach((result) => {
    if (result.type == AnalysisResultType.bar)
      stresses.set(result.element, result.stress);
  });

  return model.connectivities.map((_, index) => {
    const stress = stresses.get(index) ?? 0;
    const strength = strengths.get(index) ?? 1;
    return {
      element: index,
      type: DesignResultType.steel,
      ratio: Math.abs(stress / strength),
    };
  });
}
