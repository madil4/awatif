import van from "vanjs-core";
import { render, TemplateResult } from "lit-html";

export function getReport({
  template,
  data,
}: {
  template: (data: any) => TemplateResult;
  data: any;
}): HTMLElement {
  // Init
  const element = document.createElement("div");

  // Events: On data change render the template
  van.derive(() => {
    render(template(data), element);
  });

  return element;
}
