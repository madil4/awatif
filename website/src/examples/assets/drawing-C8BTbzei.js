import { c as k, v as o, g as x } from "./styles-CcZBryOO.js";
import { g as C } from "./getParameters-wBkc0XBG.js";
import { g as P } from "./getToolbar-BsSk1QiP.js";
function T({ onToolbarClick: t }) {
  const n = document.createElement("div");
  return n.id = "drawing-toolbar", new k({ name: "toolbar", box: n, items: [{ type: "radio", id: "1st-floor", text: "1st Floor", checked: true }, { type: "radio", id: "2nd-floor", text: "2nd Floor" }], onClick(s) {
    t(s.target);
  } }), n;
}
const m = o.state([]), v = o.state([]), d = o.state([[5, 5, 0], [10, 15, 0], [15, 10, 0]]), g = o.state([[10, 2, 5], [2, 2, 5], [2, 10, 5], [7, 10, 5]]), h = o.state([]), w = o.state([[0, 1, 2, 3], []]), i = o.state([]), p = o.state([]), y = { width: { value: o.state(2), min: 0.5, max: 5, step: 0.1 } }, E = o.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), b = 5;
i.val = d.val;
let f = "1st-floor";
function F(t) {
  f = t, E.val = { position: [10, 10, t === "1st-floor" ? 0 : b], rotation: [Math.PI / 2, 0, 0] }, i.val = t === "1st-floor" ? d.val : g.val, p.val = t === "1st-floor" ? h.val : w.val;
}
o.derive(() => {
  f == "1st-floor" && (d.val = i.val, h.val = p.val), f == "2nd-floor" && (g.val = i.val, w.val = p.val);
});
o.derive(() => {
  m.val = [], v.val = [];
  const t = [], n = [];
  d.val.forEach((a, r) => {
    const { columnNodes: c, columnElements: u } = N(r * 4, a, b, y.width.value.val);
    t.push(...c), n.push(...u);
  });
  const s = [];
  g.val.forEach((a, r) => {
    s.push(a);
  });
  const l = [], e = t.length;
  w.val.forEach((a, r) => {
    const c = a.map((u) => e + u);
    l.push(c);
  }), m.val = [...m.rawVal, ...t, ...s], v.val = [...v.rawVal, ...n, ...l];
});
document.body.append(C(y), x({ mesh: { nodes: m, elements: v }, drawingObj: { points: i, polylines: p, gridTarget: E } }), T({ onToolbarClick: F }), P({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/drawing/main.ts", author: "https://www.linkedin.com/in/madil4/" }));
function N(t, n, s, l) {
  const e = n[0], a = n[1], r = [n, [e - 0.5 * l, a - 0.5 * l, s], [e + 0.5 * l, a - 0.5 * l, s], [e, a + 0.5 * l, s]], c = [[t, t + 1], [t, t + 2], [t, t + 3]];
  return { columnNodes: r, columnElements: c };
}
