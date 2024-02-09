import van from "vanjs-core";
import { App as AppType, ModelState, SettingsState } from "./types";
import { Viewer } from "./Viewer";
import { Parameters } from "./Parameters";
import { Settings } from "./Settings";
import { processAssignments } from "./utils/processAssignments";
import { processAnalysisResults } from "./utils/processAnalysisResults";

function App({ model, parameters, onParameterChange, settings }: AppType) {
  // init
  const modelOnChange = parameters && onParameterChange?.(parameters);
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
    gridSize: van.state(settings?.gridSize ?? 20),
    displayScale: van.state(settings?.displayScale ?? 1),
    nodes: van.state(settings?.nodes ?? true),
    elements: van.state(settings?.elements ?? true),
    nodesIndexes: van.state(settings?.nodesIndexes ?? false),
    elementsIndexes: van.state(settings?.elementsIndexes ?? false),
    orientations: van.state(settings?.orientations ?? false),
    supports: van.state(settings?.supports ?? true),
    loads: van.state(settings?.loads ?? true),
    deformedShape: van.state(settings?.deformedShape ?? false),
    elementResults: van.state(settings?.elementResults ?? "none"),
    nodeResults: van.state(settings?.nodeResults ?? "none"),
  };

  // update
  Viewer(modelState, settingsState);
  Settings(settingsState);

  // on parameter change
  if (parameters && onParameterChange) {
    Parameters(parameters, (e) => {
      // @ts-ignore
      parameters[e.target.key].value = e.value;

      const newModel = onParameterChange(parameters);

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

export const app = App;
