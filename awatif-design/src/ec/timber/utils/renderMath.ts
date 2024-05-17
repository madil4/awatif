import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import katex from "katex";

export function renderMath(latex: string) {
  return unsafeHTML(katex.renderToString(latex, { strict: false }));
}
