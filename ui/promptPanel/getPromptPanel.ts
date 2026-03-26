import van from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getPromptPanel(): HTMLElement {
  const container = document.createElement("div");
  const isOpen = van.state(false);

  const template = () => html`
    <div id="prompt-panel" class="${isOpen.val ? "open" : "closed"}">
      ${isOpen.val
        ? html`
            <div class="prompt-panel-shell">
              <div class="prompt-panel-header">
                <h2>Prompt</h2>
                <button
                  type="button"
                  class="prompt-panel-close"
                  @click=${() => (isOpen.val = false)}
                  title="Close prompt panel"
                  aria-label="Close prompt panel"
                >
                  ×
                </button>
              </div>
              <div class="prompt-panel-body">
                Prompt panel placeholder. We can add the real prompt experience
                here next.
              </div>
            </div>
          `
        : ""}

      <button
        type="button"
        class="prompt-panel-trigger"
        @click=${() => (isOpen.val = !isOpen.val)}
        aria-expanded=${isOpen.val ? "true" : "false"}
        title=${isOpen.val ? "Close prompt panel" : "Open prompt panel"}
      >
        ${isOpen.val ? "Close Prompt" : "Open Prompt"}
      </button>
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
