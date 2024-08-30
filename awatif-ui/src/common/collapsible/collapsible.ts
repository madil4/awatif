import "./styles.css";

export function collapsible(title: string, body: HTMLDivElement): HTMLElement {
  // init
  const details = document.createElement("details");
  const summary = document.createElement("summary");

  // update
  details.id = "collapsible";

  details.append(summary, body);

  summary.innerText = title;

  return details;
}
