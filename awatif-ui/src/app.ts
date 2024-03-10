import van from "vanjs-core";
import { App, ModelState, SettingsState } from "./types";
import { viewer } from "./viewer";
import { parameters } from "./parameters";
import { settings } from "./settings";
import { processAssignments } from "./utils/processAssignments";
import { processAnalysisResults } from "./utils/processAnalysisResults";

export function app({
  model,
  parameters: parameterObj,
  onParameterChange,
  settings: settingsObj,
}: App) {
  // init
  const modelOnChange = parameterObj && onParameterChange?.(parameterObj);
  const modelState: ModelState = van.state({
    nodes: model?.nodes ?? modelOnChange?.nodes ?? [],
    elements: model?.elements ?? modelOnChange?.elements ?? [],
    assignments: processAssignments(
      model?.assignments ?? modelOnChange?.assignments ?? []
    ),
    analysisResults: processAnalysisResults(
      model?.analysisResults ??
        modelOnChange?.analysisResults ?? { default: [] }
    ),
  });
  const settingsState: SettingsState = {
    gridSize: van.state(settingsObj?.gridSize ?? 20),
    displayScale: van.state(settingsObj?.displayScale ?? 1),
    nodes: van.state(settingsObj?.nodes ?? true),
    elements: van.state(settingsObj?.elements ?? true),
    nodesIndexes: van.state(settingsObj?.nodesIndexes ?? false),
    elementsIndexes: van.state(settingsObj?.elementsIndexes ?? false),
    orientations: van.state(settingsObj?.orientations ?? false),
    supports: van.state(settingsObj?.supports ?? true),
    loads: van.state(settingsObj?.loads ?? true),
    deformedShape: van.state(settingsObj?.deformedShape ?? false),
    elementResults: van.state(settingsObj?.elementResults ?? "none"),
    nodeResults: van.state(settingsObj?.nodeResults ?? "none"),
  };

  // update
  viewer(modelState, settingsState);
  settings(settingsState);

  // on parameter change
  if (parameterObj && onParameterChange) {
    parameters(parameterObj, (e) => {
      // @ts-ignore
      parameterObj[e.target.key].value = e.value;

      const newModel = onParameterChange(parameterObj);

      // consider updating only if there a change instead of a brute change
      modelState.val = {
        nodes: newModel.nodes ?? [],
        elements: newModel.elements ?? [],
        assignments: processAssignments(newModel.assignments ?? []),
        analysisResults: processAnalysisResults(
          newModel.analysisResults ?? { default: [] }
        ),
      };
    });
  }
}
