import { Model } from "../types";
import { Parameters } from "../parameters/types";
import { Settings } from "../viewer/settings/types";

export type Template = {
  parameters?: Parameters;
  onParameterChange?: (() => Model) | ((parameters: Parameters) => Model);
  settings?: Settings;
};
