import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type GridLine = {
  id: string; // label shown in the bubble, e.g. "A", "2", "Z1"
  ordinate: number;
  visible: boolean;
  bubble: "start" | "end"; // which end of the line carries the label
};

export type GridSystemParams = {
  x: GridLine[];
  y: GridLine[];
  z: GridLine[];
};

// No `geometryKind`: a grid system is not assigned to geometry
export type GridSystemTemplate = {
  name: string;
  defaultParams: GridSystemParams;

  getParamsTemplate: ({
    params,
  }: {
    params: State<GridSystemParams>;
  }) => TemplateResult;
};
