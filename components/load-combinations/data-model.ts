import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Components } from "../data-model";

export type LoadCombinationEntry = {
  loadCaseId: string;
  factor: number;
};

export type LoadCombinationParams = {
  entries: LoadCombinationEntry[];
};

export type LoadCombinationTemplate = {
  name: string;
  defaultParams: LoadCombinationParams;

  // Needs the full components map to resolve load case ids to their names
  getParamsTemplate: ({
    params,
    components,
  }: {
    params: State<LoadCombinationParams>;
    components?: Components["val"];
  }) => TemplateResult;
};
