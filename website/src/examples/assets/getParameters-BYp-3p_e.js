import { P as r } from "./styles-BT9ucHwM.js";
function f(n) {
  const t = document.createElement("div"),
    o = new r({ title: "Parameters", container: t }),
    d = i(n),
    s = new Map();
  return (
    t.setAttribute("id", "parameters"),
    s.set("root", o),
    Object.entries(n).forEach(([l, e]) => {
      var c;
      e.folder && !s.get(e.folder) && s.set(e.folder, o.addFolder({ title: e.folder })), (c = s.get(e.folder ?? "root")) == null || c.addBinding(d, l, { min: e.min || 0, max: e.max || 50, step: e.step || 0.5, label: e.label || l });
    }),
    o.on("change", (l) => {
      n[l.target.key].value.val = l.value;
    }),
    t
  );
}
const i = (n) => Object.entries(n).reduce((t, [o, d]) => ((t[o] = d.value.val), t), {});
export { f as g };
