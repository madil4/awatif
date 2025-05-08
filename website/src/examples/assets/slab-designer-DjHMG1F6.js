import { d as x, v as o, g as I, a as T } from "./styles-BHEEcEe8.js";
import { g as k, a as L, b as M, c as N } from "./getSolids-7PBVWHgp.js";
function H({ onToolbarClick: t }) {
  const n = document.createElement("div");
  return n.id = "drawing-toolbar", new x({ name: "toolbar", box: n, items: [{ type: "radio", id: "1st-floor", text: "Columns", checked: true, tooltip: "Create Columns" }, { type: "radio", id: "2nd-floor", text: "Slab", tooltip: "Create Slab" }], onClick(l) {
    t(l.target);
  } }), n;
}
function O() {
  const t = V();
  t.classList.add("show"), document.addEventListener("keydown", (n) => {
    n.ctrlKey && t.classList.remove("show");
  });
}
function V() {
  const t = document.createElement("div");
  return t.className = "snap-tip", t.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">Ctrl</span>
      <span>to snap to grid points</span>
    `, document.body.appendChild(t), t;
}
O();
const c = { points: o.state([]), columns: o.state([]), slabs: o.state([]) }, E = k(), P = L(), w = o.state([P]), j = o.state([E]), m = o.state([]), d = o.state([]), S = o.state([]), y = o.state([]), h = o.state([]), g = o.state([]), C = o.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), v = o.state([]), u = o.state([]), p = 4;
let b = "1st-floor";
function D(t) {
  b = t, C.val = { position: [10, 10, t == "1st-floor" ? 0 : p], rotation: [Math.PI / 2, 0, 0] }, h.val = t === "1st-floor" ? m.val : d.val, g.val = t === "1st-floor" ? S.val : y.val;
}
o.derive(() => {
  b == "1st-floor" && (m.val = h.val, S.val = g.val), b == "2nd-floor" && (d.val = h.val, y.val = g.val);
});
o.derive(() => {
  v.val = [], u.val = [];
  const t = [], n = [];
  m.val.forEach((s, a) => {
    const { columnNodes: e, columnElements: f } = G(a * 2, s, p);
    t.push(...e), n.push(...f);
  });
  const l = [];
  d.val.forEach((s, a) => {
    l.push([s[0], s[1], p]);
  });
  const i = [], r = t.length;
  y.val.forEach((s, a) => {
    const e = s.map((f) => r + f);
    i.push(e);
  }), v.val = [...v.rawVal, ...t, ...l], u.val = [...u.rawVal, ...n, ...i];
});
o.derive(() => {
  const t = [], n = [], l = [];
  C.val = { position: [10, 10, b == "1st-floor" ? 0 : p], rotation: [Math.PI / 2, 0, 0] };
  const i = [], r = [];
  if (d.val.length > 0) {
    for (let e = 0; e < d.val.length; e++) i.push([d.val[e][0], d.val[e][1], p]);
    const s = [], a = t.length;
    for (let e = 0; e < i.length; e++) t.push(i[e]), s.push(e + a);
    n.push(s);
  }
  if (m.val.length > 0) {
    for (let s = 0; s < m.val.length; s++) {
      const a = m.val[s];
      r.push([[a[0], a[1], a[2] + p]]);
    }
    for (let s = 0; s < r.length; s++) {
      const a = t.length;
      t.push(...r[s]), l.push(a);
    }
  }
  c.points.val = t, c.columns.val = l, c.slabs.val = n;
});
o.derive(() => {
  P.geometry = M(c.points.val, c.slabs.val, c.columns.val), E.geometry = N(c.points.val, c.slabs.val, c.columns.val), w.val = [...w.rawVal];
});
document.body.append(I({ objects3D: w, solids: j, mesh: { nodes: v, elements: u }, drawingObj: { points: h, polylines: g, gridTarget: C }, settingsObj: { elements: false } }), H({ onToolbarClick: D }), T({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts", author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/" }));
function G(t, n, l) {
  const i = n[0], r = n[1], s = [[i, r, 0], [i, r, l]], a = [[t, t + 1]];
  return { columnNodes: s, columnElements: a };
}
