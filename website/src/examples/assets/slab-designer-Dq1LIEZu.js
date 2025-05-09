import { d as T, v as o, g as x, a as I } from "./styles-BHEEcEe8.js";
import { g as k, a as L, b as M, c as N } from "./getSolids-DVaIKP5j.js";
function H({ onToolbarClick: t }) {
  const n = document.createElement("div");
  return n.id = "drawing-toolbar", new T({ name: "toolbar", box: n, items: [{ type: "radio", id: "1st-floor", text: "Columns", checked: true, tooltip: "Create Columns" }, { type: "radio", id: "2nd-floor", text: "Slab", tooltip: "Create Slab" }], onClick(c) {
    t(c.target);
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
const l = { points: o.state([]), columns: o.state([]), slabs: o.state([]) }, E = k(), P = L(), y = o.state([P]), j = o.state([E]), d = o.state([]), i = o.state([]), S = o.state([]), b = o.state([]), u = o.state([]), g = o.state([]), C = o.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), v = o.state([]), p = o.state([]), r = 4;
let h = "1st-floor";
function D(t) {
  h = t, C.val = { position: [10, 10, t == "1st-floor" ? 0 : r], rotation: [Math.PI / 2, 0, 0] }, u.val = t === "1st-floor" ? d.val : i.val, g.val = t === "1st-floor" ? S.val : b.val;
}
o.derive(() => {
  h == "1st-floor" && (d.val = u.val, S.val = g.val), h == "2nd-floor" && (i.val = u.val, b.val = g.val);
});
o.derive(() => {
  v.val = [], p.val = [];
  const t = [], n = [];
  d.val.forEach((a, m) => {
    const { columnNodes: f, columnElements: w } = G(m * 2, a, r);
    t.push(...f), n.push(...w);
  });
  const c = [];
  i.val.forEach((a, m) => {
    c.push([a[0], a[1], r]);
  });
  const e = [], s = t.length;
  b.val.forEach((a, m) => {
    const f = a.map((w) => s + w);
    e.push(f);
  }), v.val = [...v.rawVal, ...t, ...c], p.val = [...p.rawVal, ...n, ...e];
});
o.derive(() => {
  const t = [], n = [];
  C.val = { position: [10, 10, h == "1st-floor" ? 0 : r], rotation: [Math.PI / 2, 0, 0] };
  const c = [], e = [];
  if (t.length, i.val.length > 0) for (let s = 0; s < i.val.length; s++) c.push([i.val[s][0], i.val[s][1], r]), t.push([i.val[s][0], i.val[s][1], r]);
  if (d.val.length > 0) {
    for (let s = 0; s < d.val.length; s++) {
      const a = d.val[s];
      e.push([[a[0], a[1], a[2] + r]]);
    }
    for (let s = 0; s < e.length; s++) {
      const a = t.length;
      t.push(...e[s]), n.push(a);
    }
  }
  l.points.val = t, l.columns.val = n, l.slabs.val = b.val;
});
o.derive(() => {
  P.geometry = M(l.points.val, l.slabs.val, l.columns.val), E.geometry = N(l.points.val, l.slabs.val, l.columns.val), y.val = [...y.rawVal];
});
document.body.append(x({ objects3D: y, solids: j, mesh: { nodes: v, elements: p }, drawingObj: { points: u, polylines: g, gridTarget: C }, settingsObj: { elements: false } }), H({ onToolbarClick: D }), I({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts", author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/" }));
function G(t, n, c) {
  const e = n[0], s = n[1], a = [[e, s, 0], [e, s, c]], m = [[t, t + 1]];
  return { columnNodes: a, columnElements: m };
}
