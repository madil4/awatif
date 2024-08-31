import "./styles.css";

export function collapsible(title: string, body: HTMLDivElement): HTMLElement {
  // init
  const collapsibleElm = document.createElement("details");
  const summary = document.createElement("summary");

  // update
  collapsibleElm.id = "collapsible";

  summary.innerText = title;

  collapsibleElm.append(summary, body);

  return collapsibleElm;
}
