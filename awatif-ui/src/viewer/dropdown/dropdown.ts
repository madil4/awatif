import { html, render, TemplateResult } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";
import { w2field } from "w2ui";
import van, { State } from "vanjs-core";
import "w2ui/w2ui-2.0.min.css";

// Dropdown component
export function dropdown(list: string[]): TemplateResult {
  const inputRef = createRef<HTMLInputElement>(); // Reference for the input element

  // Return lit-html template
  return html`
    <div style="height: 20px"></div>
    <div class="w2ui-field w2ui-span4">
      <label>List</label>
      <div>
        <input
          type="list"
          placeholder="Type to search"
          ${ref(inputRef)} <!-- Attach the reference -->
        />
        <span class="legend">Text</span>
      </div>
    </div>
    <div style="height: 10px"></div>
  `;

  // Once the template is rendered, initialize `w2field`
  setTimeout(() => {
    const inputEl = inputRef.value; // Get the rendered input element
    if (inputEl) {
      new w2field("list", {
        el: inputEl,
        items: list,
        match: "contains",
        markSearch: true,
        onSelect(event) {
          console.log("Selected:", event.detail.item);
        },
      });
    }
  }, 0); // Delay to ensure DOM is rendered
}
