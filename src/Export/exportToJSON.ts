import { Model } from "../App/App.types";
import { ExportOptions } from "./Export";

export function exportToJSON(model: Model, exportOptions: ExportOptions) {
  const jsonObject = {};

  if (exportOptions.nodes) Object.assign(jsonObject, { nodes: model.nodes });
  if (exportOptions.elements)
    Object.assign(jsonObject, { elements: model.elements });

  const jsonAssignments = [];
  if (exportOptions.supports)
    jsonAssignments.push(...model.assignments.filter((a: any) => a.support));
  if (exportOptions.loads)
    jsonAssignments.push(...model.assignments.filter((a: any) => a.load));
  if (exportOptions.properties)
    jsonAssignments.push(
      ...model.assignments.filter((a: any) => a.elasticity || a.area)
    );
  if (jsonAssignments.length)
    Object.assign(jsonObject, { assignments: jsonAssignments });

  if (exportOptions.analysisResults)
    Object.assign(jsonObject, { analysisResults: model.analysisResults });

  return JSON.stringify(jsonObject);
}
