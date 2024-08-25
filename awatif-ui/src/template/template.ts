import van from "vanjs-core";

import { Template } from "./types";
import { viewer } from "../viewer/viewer";
import { parameters } from "../parameters/parameters";

import { Model, ModelState } from "../types";

export function template({
  parameters: parameterObj,
  onParameterChange,
  settings,
}: Template) {
  // init
  const model = onParameterChange?.(parameterObj ?? {}) ?? {};
  const modelState: ModelState = van.state(getModelState(model));

  // update
  const viewerElement = viewer(modelState, settings ?? {});
  document.body.appendChild(viewerElement);

  // on parameter change
  if (parameterObj && onParameterChange) {
    const parametersElement = parameters(parameterObj, (e) => {
      // @ts-ignore
      parameterObj[e.target.key].value = e.value;

      modelState.val = getModelState(onParameterChange(parameterObj));
    });

    document.body.appendChild(parametersElement);
  }
}

// utils functions
const getModelState = (model?: Model): ModelState["val"] => ({
  nodes: model?.nodes ?? [],
  elements: model?.elements ?? [],
  analysisInputs: model?.analysisInputs ?? {},
  analysisOutputs: model?.analysisOutputs ?? {},
});
