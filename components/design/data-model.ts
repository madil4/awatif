import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type DesignTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;

  getDesign: ({ params }: { params: Params }) => {
    design: {
      // Placeholder: design-specific data structure
      // This could include material properties, dimensions, etc.
      [key: string]: unknown;
    };
  };

  getReport?: ({ params }: { params: Params }) => HTMLElement;
};
