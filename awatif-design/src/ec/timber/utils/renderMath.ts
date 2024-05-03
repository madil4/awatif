import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import katex from "katex";

// reference: https://katex.org/docs/supported

export function renderMath(latex: string) {
  return unsafeHTML(katex.renderToString(latex));
}
