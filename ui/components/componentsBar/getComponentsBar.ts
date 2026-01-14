import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { ComponentsType } from "@awatif/components";

import "./styles.css";

export type ComponentsBarMode = {
  componentsBarMode: State<ComponentsType | null>;
};

export function getComponentsBar({
  componentsBarMode,
}: ComponentsBarMode): HTMLElement {
  const container = document.createElement("div");
  const types = getComponentsTypes();

  const template = () => html`
    <div id="components-bar">
      ${types.map(
        (mode) => html`
          <button
            class="components-bar-button ${componentsBarMode.val === mode.value
              ? "active"
              : ""}"
            @click=${() =>
              (componentsBarMode.val =
                componentsBarMode.val === mode.value ? null : mode.value)}
          >
            ${mode.label}
          </button>
        `
      )}
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}

// Utils
function getComponentsTypes() {
  return Object.keys(ComponentsType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: ComponentsType[key as keyof typeof ComponentsType],
      label: getDisplayName(key),
    }));

  function getDisplayName(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  }
}
