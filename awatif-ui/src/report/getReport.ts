import { render, TemplateResult } from "lit-html";
import van from "vanjs-core";

export function getReport({
  template,
  data,
}: {
  template: (data: any) => TemplateResult;
  data: any;
}): HTMLElement {
  const element = document.createElement("div");

  van.derive(() => {
    render(template(data), element);
  });

  return element;
}
