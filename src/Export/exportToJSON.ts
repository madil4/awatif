export type ExportOptions = {
  nodes: boolean;
  elements: boolean;
  supports: boolean;
  loads: boolean;
  properties: boolean;
  analysisResults: boolean;
};

export function exportToJSON(
  nodes: any,
  elements: any,
  assignments: any[],
  analysisResults: any,
  exportOptions: ExportOptions
) {
  const jsonObject = {};

  if (exportOptions.nodes) Object.assign(jsonObject, { nodes });
  if (exportOptions.elements) Object.assign(jsonObject, { elements });

  const jsonAssignments = [];
  if (exportOptions.supports)
    jsonAssignments.push(...assignments.filter((a) => a.support));
  if (exportOptions.loads)
    jsonAssignments.push(...assignments.filter((a) => a.load));
  if (exportOptions.properties)
    jsonAssignments.push(...assignments.filter((a) => a.elasticity || a.area));
  if (jsonAssignments.length)
    Object.assign(jsonObject, { assignments: jsonAssignments });

  if (exportOptions.analysisResults)
    Object.assign(jsonObject, { analysisResults });

  return JSON.stringify(jsonObject);
}
