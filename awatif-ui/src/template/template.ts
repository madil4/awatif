import van from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
  Structure,
} from "awatif-data-structure";

import { viewer, SettingsObj } from "../viewer/viewer";
import { parameters } from "../parameters/parameters";
import { Parameters } from "../parameters/parameters";

export type StructureObj = {
  nodes?: Node[];
  elements?: Element[];
  analysisInputs?: AnalysisInputs;
  analysisOutputs?: AnalysisOutputs;
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
  const structureObj = onParameterChange?.(parameterObj ?? {}) ?? {};
  const structureState: Structure = {
    nodes: van.state(structureObj.nodes ?? []),
    elements: van.state(structureObj?.elements ?? []),
    analysisInputs: van.state(structureObj?.analysisInputs ?? {}),
    analysisOutputs: van.state(structureObj?.analysisOutputs ?? {}),
  };

  const viewerElement = viewer({
    structure: structureState,
    settingsObj: settings,
  });

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
