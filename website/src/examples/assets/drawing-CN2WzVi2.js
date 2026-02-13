import { w as k, v as o, g as C } from "./styles-I_-DKBYJ.js";
import { g as P } from "./getParameters-B55TXCbA.js";
import { g as T } from "./getToolbar-C9bIbtqJ.js";
function F({ onToolbarClick: t }) {
  const a = document.createElement("div");
  return a.id = "drawing-toolbar", new k({ name: "toolbar", box: a, items: [{ type: "radio", id: "1st-floor", text: "1st Floor", checked: true }, { type: "radio", id: "2nd-floor", text: "2nd Floor" }], onClick(n) {
    t(n.target);
  } }), a;
}
const m = o.state([]), v = o.state([]), d = o.state([[5, 5, 0], [10, 15, 0], [15, 10, 0]]), f = o.state([[10, 2, 5], [2, 2, 5], [2, 10, 5], [7, 10, 5]]), g = o.state([]), w = o.state([[0, 1, 2, 3], []]), i = o.state([]), p = o.state([]), h = { width: { value: o.state(2), min: 0.5, max: 5, step: 0.1 } }, E = o.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), b = 5;
i.val = d.val;
let u = "1st-floor";
function N(t) {
  u = t, E.val = { position: [10, 10, t === "1st-floor" ? 0 : b], rotation: [Math.PI / 2, 0, 0] }, i.val = t === "1st-floor" ? d.val : f.val, p.val = t === "1st-floor" ? g.val : w.val;
}
o.derive(() => {
  u == "1st-floor" && (d.val = i.val, g.val = p.val), u == "2nd-floor" && (f.val = i.val, w.val = p.val);
});
o.derive(() => {
  m.val = [], v.val = [];
  const t = [], a = [];
  d.val.forEach((s, r) => {
    const { columnNodes: c, columnElements: y } = V(r * 4, s, b, h.width.value.val);
    t.push(...c), a.push(...y);
  });
  const n = [];
  f.val.forEach((s) => {
    n.push(s);
  });
  const l = [], e = t.length;
  w.val.forEach((s) => {
    const r = s.map((c) => e + c);
    l.push(r);
  }), m.val = [...m.rawVal, ...t, ...n], v.val = [...v.rawVal, ...a, ...l];
});
document.body.append(P(h), C({ mesh: { nodes: m, elements: v }, drawingObj: { points: i, polylines: p, gridTarget: E } }), F({ onToolbarClick: N }), T({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/drawing/main.ts", author: "https://www.linkedin.com/in/madil4/" }));
function V(t, a, n, l) {
  const e = a[0], s = a[1], r = [a, [e - 0.5 * l, s - 0.5 * l, n], [e + 0.5 * l, s - 0.5 * l, n], [e, s + 0.5 * l, n]], c = [[t, t + 1], [t, t + 2], [t, t + 3]];
  return { columnNodes: r, columnElements: c };
}
