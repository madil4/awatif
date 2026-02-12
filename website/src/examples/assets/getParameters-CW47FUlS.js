import { n as f } from "./styles-Dc2qaz2G.js";
function g(t) {
  const n = document.createElement("div"), o = new f({ title: "Parameters", container: n }), u = m(t), r = /* @__PURE__ */ new Map();
  return n.setAttribute("id", "parameters"), r.set("root", o), Object.entries(t).forEach(([s, e]) => {
    var _a;
    const i = e.min ?? 0, l = e.max ?? 50, a = e.step ?? 0.5;
    e.folder && !r.get(e.folder) && r.set(e.folder, o.addFolder({ title: e.folder })), (_a = r.get(e.folder ?? "root")) == null ? void 0 : _a.addBinding(u, s, { min: i, max: l, step: a, label: e.label || s });
  }), o.on("change", (s) => {
    const e = s.target.key;
    if (!e || !t[e]) return;
    const i = t[e], l = i.min, a = i.max, d = Number(s.value);
    if (!Number.isFinite(d)) return;
    let c = d;
    typeof l == "number" && (c = Math.max(l, c)), typeof a == "number" && (c = Math.min(a, c)), i.value.val = c;
  }), n;
}
const m = (t) => Object.entries(t).reduce((n, [o, u]) => (n[o] = u.value.val, n), {});
export {
  g
};
