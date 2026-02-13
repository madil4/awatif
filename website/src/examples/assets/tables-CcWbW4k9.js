import { L as n, B as r, a as d, v as e, F as c, g as m } from "./styles-I_-DKBYJ.js";
import { g as f } from "./getTables-A2OxLVg7.js";
import { g as b } from "./getToolbar-C9bIbtqJ.js";
import { g as p } from "./getDialog-CsS9Zuv3.js";
const a = e.state([[0, 0, 0], [5, 0, 5], [10, 0, 0]]), i = new n(new r(), new d()), t = e.state([i]), o = /* @__PURE__ */ new Map();
o.set("polyline", { text: "Polyline", fields: [{ field: "A", text: "X-coordinate", min: "25", editable: { type: "float" } }, { field: "B", text: "Y-coordinate", editable: { type: "float" } }, { field: "C", text: "Z-coordinate", editable: { type: "float" } }], data: a });
e.derive(() => a.val = o.get("polyline").data.val);
e.derive(() => {
  i.geometry.setAttribute("position", new c(a.val.flat(), 3)), t.val = [...t.rawVal];
});
const l = e.state(""), s = e.state(void 0);
e.derive(() => {
  l.val === "Tables" && (s.val = f({ tables: o }));
});
document.body.append(b({ clickedButton: l, buttons: ["Tables"], sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts", author: "https://www.linkedin.com/in/cal-mense/" }), p({ dialogBody: s }), m({ objects3D: t }));
