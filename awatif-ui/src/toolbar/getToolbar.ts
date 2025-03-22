import { State } from "vanjs-core";
import { html, render, TemplateResult } from "lit-html";

import "./styles.css";

export function getToolbar({
  buttons,
  clickedButton,
  author,
  sourceCode,
}: {
  buttons?: string[];
  clickedButton?: State<string>;
  author?: string;
  sourceCode?: string;
}): HTMLElement {
  // Init
  const element = document.createElement("div");

  const template = html`
    <div class="buttons-container">
      ${buttons?.map(
        (button) =>
          html`<button class="btn btn-text" @click=${onButtonClick}>
            ${button}
          </button>`
      )}
      <button class="btn btn-icon" @click=${onIconClick}>
        ${getAwatifSvg()}
      </button>
    </div>

    <div id="dropdown-menu" style="display: none;">
      <a
        href="${sourceCode ? sourceCode : "https://github.com/madil4/awatif"}"
        class="dropdown-link"
        >Source Code</a
      >
      ${author
        ? html`<a href="${author}" class="dropdown-link">Message Author</a>`
        : ""}
      <a href="https://awatif.co/examples" class="dropdown-link"
        >More Examples</a
      >
    </div>
  `;

  // Update
  element.id = "toolbar";

  render(template, element);

  // Events
  // On button click set clickedButton value
  function onButtonClick(e: Event) {
    const button = e.target as HTMLButtonElement;
    clickedButton.val = ""; // A hack to trigger vanjs update
    setTimeout(() => (clickedButton.val = button.innerText));
  }

  // onIconClick toggle dropdown menu
  function onIconClick(e: Event) {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }

  return element;
}

// Utils
function getAwatifSvg(): TemplateResult {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 35 35">
    <path
      d="M2,29.14l9.86-16.87c1.86,3.34,4.56,7.62,3.34,11.57a7.61,7.61,0,0,1-2.61,3.68,7.78,7.78,0,0,1-5,1.61c-1.48,0-3,0-4.47,0A4.5,4.5,0,0,0,2,29.14Z"
    ></path>
    <path
      d="M12.86,10.43l5.71-10L35.12,29.14H31a13.92,13.92,0,0,1-8.44-3.54,18.23,18.23,0,0,1-3.44-4.5c-.55-.92-1.08-1.85-1.61-2.79-1.25-2.21-2.56-4.39-3.85-6.58Z"
    ></path>
  </svg>`;
}
