import van from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
  Structure,
} from "awatif-data-structure";

import { viewer } from "../viewer/viewer";
import { parameters } from "../parameters/parameters";
import { Parameters } from "../parameters/parameters";
import { Settings } from "../viewer/settings/settings";

export type StructureObj = {
  nodes?: Node[];
  elements?: Element[];
  analysisInputs?: AnalysisInputs;
  analysisOutputs?: AnalysisOutputs;
};

export type SettingsObj = {
  gridSize?: number;
  displayScale?: number;
  nodes?: boolean;
  elements?: boolean;
  nodesIndexes?: boolean;
  elementsIndexes?: boolean;
  orientations?: boolean;
  supports?: boolean;
  loads?: boolean;
  deformedShape?: boolean;
  elementResults?: string;
  nodeResults?: string;
};

export function template({
  parameters: parameterObj,
  onParameterChange,
  settings,
}: {
  parameters?: Parameters;
  onParameterChange?:
    | (() => StructureObj)
    | ((parameters: Parameters) => StructureObj);
  settings?: SettingsObj;
}) {
  // init
  const structure = onParameterChange?.(parameterObj ?? {}) ?? {};
  const structureState: Structure = {
    nodes: van.state(structure.nodes ?? []),
    elements: van.state(structure?.elements ?? []),
    analysisInputs: van.state(structure?.analysisInputs ?? {}),
    analysisOutputs: van.state(structure?.analysisOutputs ?? {}),
  };

  const settingsState: Settings = {
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

  const viewerElement = viewer(structureState, settingsState);

  // update
  document.body.appendChild(viewerElement);

  // on parameter change
  if (parameterObj && onParameterChange) {
    const parametersElement = parameters(parameterObj, (e) => {
      // @ts-ignore
      parameterObj[e.target.key].value = e.value;

      const structure = onParameterChange(parameterObj);
      if (structureState.nodes)
        structureState.nodes.val = structure.nodes ?? [];
      if (structureState.elements)
        structureState.elements.val = structure.elements ?? [];
      if (structureState.analysisInputs)
        structureState.analysisInputs.val = structure.analysisInputs ?? {};
      if (structureState.analysisOutputs)
        structureState.analysisOutputs.val = structure.analysisOutputs ?? {};
    });

    document.body.appendChild(parametersElement);
  }
}
