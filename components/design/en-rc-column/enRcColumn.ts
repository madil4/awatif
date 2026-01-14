import { html } from "lit-html";
import { DesignTemplate } from "../data-model";

type EnRcColumnParams = {
  width: number;
  depth: number;
  concreteGrade: string;
  steelGrade: string;
  longitudinalBars: number;
  barDiameter: number;
  cover: number;
};

export const enRcColumn: DesignTemplate<EnRcColumnParams> = {
  name: "EN RC Column",
  defaultParams: {
    width: 300,
    depth: 300,
    concreteGrade: "C30",
    steelGrade: "S400",
    longitudinalBars: 4,
    barDiameter: 16,
    cover: 40,
  },

  getTemplate: ({ params }) => html``,
  getDesign: ({ params }) => {},
  getReport: ({ params }) => html``,
};
