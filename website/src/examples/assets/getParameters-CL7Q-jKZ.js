import { o as c } from "./styles-CHgmIz-C.js";
function a(o) {
  const t = document.createElement("div"), n = new c({ title: "Parameters", container: t }), d = r(o), s = /* @__PURE__ */ new Map();
  return t.setAttribute("id", "parameters"), s.set("root", n), Object.entries(o).forEach(([l, e]) => {
    var _a;
    e.folder && !s.get(e.folder) && s.set(e.folder, n.addFolder({ title: e.folder })), (_a = s.get(e.folder ?? "root")) == null ? void 0 : _a.addBinding(d, l, { min: e.min || 0, max: e.max || 50, step: e.step || 0.5, label: e.label || l });
  }), n.on("change", (l) => {
    o[l.target.key].value.val = l.value;
  }), t;
}
const r = (o) => Object.entries(o).reduce((t, [n, d]) => (t[n] = d.value.val, t), {});
export {
  a as g
};
