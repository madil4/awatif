import { d as y, v as a, g as C, a as P } from "./styles-BHEEcEe8.js";
import { g as S, a as T, b as k, c as M } from "./getSolids-DVaIKP5j.js";
function x({ onToolbarClick: t }) {
  const n = document.createElement("div");
  return n.id = "drawing-toolbar", new y({ name: "toolbar", box: n, items: [{ type: "radio", id: "1st-floor", text: "Columns", checked: true, tooltip: "Create Columns" }, { type: "radio", id: "2nd-floor", text: "Slab", tooltip: "Create Slab" }], onClick(l) {
    t(l.target);
  } }), n;
}
function L() {
  const t = document.createElement("div"), n = navigator.userAgent.includes("Macintosh");
  return t.className = "snap-tip", t.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${n ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, t.classList.add("show"), document.addEventListener("keydown", (l) => {
    (l.ctrlKey || l.metaKey) && t.classList.remove("show");
  }), t;
}
const o = { points: a.state([]), columns: a.state([]), slabs: a.state([]) }, b = S(), h = T(), p = a.state([h]), D = a.state([b]), E = { nodes: a.state([]), elements: a.state([]) }, r = a.state([]), e = a.state([]), w = a.state([]), u = a.state([]), d = a.state([]), v = a.state([]), f = a.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), c = 4;
let g = "1st-floor";
function H(t) {
  g = t, f.val = { position: [10, 10, t == "1st-floor" ? 0 : c], rotation: [Math.PI / 2, 0, 0] }, d.val = t === "1st-floor" ? r.val : e.val, v.val = t === "1st-floor" ? w.val : u.val;
}
a.derive(() => {
  g == "1st-floor" && (r.val = d.val, w.val = v.val), g == "2nd-floor" && (e.val = d.val, u.val = v.val);
});
a.derive(() => {
  const t = [], n = [], l = [], m = [];
  if (e.val.length > 0) for (let s = 0; s < e.val.length; s++) l.push([e.val[s][0], e.val[s][1], c]), t.push([e.val[s][0], e.val[s][1], c]);
  if (r.val.length > 0) {
    for (let s = 0; s < r.val.length; s++) {
      const i = r.val[s];
      m.push([[i[0], i[1], i[2] + c]]);
    }
    for (let s = 0; s < m.length; s++) {
      const i = t.length;
      t.push(...m[s]), n.push(i);
    }
  }
  o.points.val = t, o.columns.val = n, o.slabs.val = u.val;
});
a.derive(() => {
  h.geometry = k(o.points.val, o.slabs.val, o.columns.val), b.geometry = M(o.points.val, o.slabs.val, o.columns.val), p.val = [...p.rawVal];
});
document.body.append(C({ objects3D: p, solids: D, mesh: E, drawingObj: { points: d, polylines: v, gridTarget: f } }), L(), x({ onToolbarClick: H }), P({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts", author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/" }));
