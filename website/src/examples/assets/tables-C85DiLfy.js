import { L as n, B as d, b as r, v as e, F as c, a as b, g as f } from "./styles-CHgmIz-C.js";
import { g as m } from "./getTables-BYhgSG7f.js";
import { g as p } from "./getDialog-pbQItXqo.js";
const a = e.state([[0, 0, 0], [5, 0, 5], [10, 0, 0]]), i = new n(new d(), new r()), t = e.state([i]), o = /* @__PURE__ */ new Map();
o.set("polyline", { text: "Polyline", fields: [{ field: "A", text: "X-coordinate", min: "25", editable: { type: "float" } }, { field: "B", text: "Y-coordinate", editable: { type: "float" } }, { field: "C", text: "Z-coordinate", editable: { type: "float" } }], data: a });
e.derive(() => a.val = o.get("polyline").data.val);
e.derive(() => {
  i.geometry.setAttribute("position", new c(a.val.flat(), 3)), t.val = [...t.rawVal];
});
const l = e.state(""), s = e.state(void 0);
e.derive(() => {
  l.val === "Tables" && (s.val = m({ tables: o }));
});
document.body.append(b({ clickedButton: l, buttons: ["Tables"], sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts", author: "https://www.linkedin.com/in/cal-mense/" }), p({ dialogBody: s }), f({ objects3D: t }));
