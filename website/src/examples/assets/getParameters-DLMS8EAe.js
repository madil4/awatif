import { p as c } from "./styles-C_4VGeCN.js";
function a(n) {
  const t = document.createElement("div"), o = new c({ title: "Parameters", container: t }), d = r(n), s = /* @__PURE__ */ new Map();
  return t.setAttribute("id", "parameters"), s.set("root", o), Object.entries(n).forEach(([l, e]) => {
    var _a;
    e.folder && !s.get(e.folder) && s.set(e.folder, o.addFolder({ title: e.folder })), (_a = s.get(e.folder ?? "root")) == null ? void 0 : _a.addBinding(d, l, { min: e.min || 0, max: e.max || 50, step: e.step || 0.5, label: e.label || l });
  }), o.on("change", (l) => {
    n[l.target.key].value.val = l.value;
  }), t;
}
const r = (n) => Object.entries(n).reduce((t, [o, d]) => (t[o] = d.value.val, t), {});
export {
  a as g
};
