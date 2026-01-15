import { DesignTemplate } from "../data-model";
import { getParamsTemplate } from "./getParamsTemplate";
import { getElementsProps } from "./getElementsProps";
import { getReport } from "./getReport";
import { getDesign } from "./getDesign";

export type EnRcColumnParams = {
  width: number;
  depth: number;
  concreteGrade: string;
  steelGrade: string;
  steelArea: number;
  cover: number;
};

export const enRcColumn: DesignTemplate<EnRcColumnParams> = {
  name: "EN RC Column",
  defaultParams: {
    width: 300,
    depth: 300,
    concreteGrade: "C30",
    steelGrade: "S400",
    steelArea: 400,
    cover: 40,
  },
  getParamsTemplate,
  getElementsProps,
  getReport,
  getDesign,
};
