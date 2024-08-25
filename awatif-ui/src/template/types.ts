import { Parameters, Model, Settings } from "../types";

export type Template = {
  parameters?: Parameters;
  onParameterChange?: (() => Model) | ((parameters: Parameters) => Model);
  settings?: Settings;
};
