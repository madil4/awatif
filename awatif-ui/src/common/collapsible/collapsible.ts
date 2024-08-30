import "./styles.css";

export function collapsible(
  title: string,
  body: HTMLDivElement,
  width: string = "300px"
): HTMLElement {
  // init
  const details = document.createElement("details");
  const summary = document.createElement("summary");

  // update
  details.id = "collapsible";

  details.append(summary, body);

  summary.innerText = title;
  details.style.width = width;

  return details;
}
