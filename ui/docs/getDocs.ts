import { html, render } from "lit-html";

import "./styles.css";

export function getDocs(): HTMLDivElement {
  const container = document.createElement("div");
  container.id = "docs";

  const tips = [
    {
      title: "Draw Structure",
      text: "Left-click to draw structure; click a node to connect a beam; right-click to cancel drawing.",
    },
    {
      title: "Delete Node",
      text: "Right-click a node to delete it.",
    },
    {
      title: "Move Node",
      text: "Click and drag a node to reposition it.",
    },
    {
      title: "Assign Components",
      text: "Click a component in the list, then drag to assign geometry; drag the opposite way to unassign.",
    },
    {
      title: "Zoom",
      text: "Scroll the mouse wheel to zoom in and out.",
    },
    {
      title: "Pan",
      text: "Right-click and drag to move the view.",
    },
  ];

  const template = html`
    <h3>Quick Start Guide</h3>

    ${tips.map(
      (tip, i) => html`
        <div class="doc-item">
          <span class="doc-number">${i + 1}.</span>
          <span><strong>${tip.title}</strong> ${tip.text}</span>
        </div>
      `,
    )}

    <div class="doc-contact">
      For help, feedback, bug reports, or suggestions, please reach out at
      <a href="mailto:mohamed@awatif.co">mohamed@awatif.co</a>.
    </div>
  `;

  render(template, container);
  return container;
}
