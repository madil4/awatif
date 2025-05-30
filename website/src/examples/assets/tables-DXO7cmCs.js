import { w as T, v as d, a as A, L as B, B as M, b as C, F as D, g as O } from "./styles-CcZBryOO.js";
import { g as j } from "./getToolbar-BsSk1QiP.js";
import { g as L } from "./getDialog-CgmQbszm.js";
function z({ fields: r, data: l }) {
  const n = document.createElement("div"), e = new T({ name: Math.random().toString().substring(2), box: n, selectType: "cell", recordHeight: 26, show: { columnMenu: false, lineNumbers: true }, columns: F(r), records: h(l.rawVal, r) });
  return n.setAttribute("id", "table"), new ResizeObserver(() => e.refresh()).observe(n), e.onChange = (a) => {
    if (!r[a.detail.column]) return;
    const t = m[a.detail.column];
    e.records[a.detail.index][t] = a.detail.value.new, l.val = b(e.records, r);
  }, e.onDelete = (a) => {
    a.detail.force = true, a.onComplete = () => {
      l.val = b(e.records, r);
    };
  }, e.onPaste = (a) => {
    a.onComplete = () => {
      e.mergeChanges(), l.val = b(e.records, r);
    };
  }, d.derive(() => {
    e.records = h(l.val, r), e.refresh();
  }), n;
}
const m = "ABCDEFGHIJKLMNOPRST";
function F(r) {
  return m.split("").map((n) => ({ field: n, text: '<div style="text-align: center">' + n + "</div>", size: "90px", resizable: true, sortable: true, editable: { type: "text" } })).map((n) => {
    const e = r.find((s) => s.field === n.field);
    return e ? { ...n, ...e } : n;
  });
}
function h(r, l) {
  const n = Array.isArray(r) ? r : a(r, l), e = Array(50).fill(0).map((t, o) => ({ recid: o })), s = m.split("");
  for (let t = 0; t < n.length; t++) for (let o = 0; o < n[t].length; o++) e[t][s[o]] = n[t][o];
  return e;
  function a(t, o) {
    const f = /* @__PURE__ */ new Map();
    return o.forEach((u) => f.set(u.field, u)), Object.keys(t).map((u) => [f.get(u).text, t[u]]);
  }
}
function b(r, l) {
  if (m.includes(l[0].field)) return e(r, l);
  return s(r, l);
  function e(a, t) {
    let o = [...Array(a.length)].map(() => [...Array(t.length)]);
    const f = m.split("");
    for (let c = 0; c < o.length; c++) for (let i = 0; i < o[c].length; i++) o[c][i] = a[c][f[i]] ?? "";
    return o.slice(0, u(o) + 1);
    function u(c) {
      for (let i = c.length - 1; i >= 0; i--) if (c[i].some((E) => E !== "")) return i;
    }
  }
  function s(a, t) {
    return Object.fromEntries(t.map(({ field: o }, f) => [o, a[f].B]));
  }
}
function I({ tables: r }) {
  const l = document.createElement("div"), n = document.createElement("div"), e = [], s = /* @__PURE__ */ new Map();
  r.forEach((t, o) => {
    e.push({ id: o, text: t.text }), s.set(o, z({ fields: t.fields, data: t.data }));
  });
  const a = new A({ box: n, name: "tabs", active: e[0].id, flow: "up", tabs: e });
  return l.id = "tables", n.id = "tabs", l.append(s.values().next().value, n), a.onClick = (t) => {
    l.firstChild.replaceWith(s.get(t.target));
  }, l;
}
const g = d.state([[0, 0, 0], [5, 0, 5], [10, 0, 0]]), w = new B(new M(), new C()), p = d.state([w]), v = /* @__PURE__ */ new Map();
v.set("polyline", { text: "Polyline", fields: [{ field: "A", text: "X-coordinate", min: "25", editable: { type: "float" } }, { field: "B", text: "Y-coordinate", editable: { type: "float" } }, { field: "C", text: "Z-coordinate", editable: { type: "float" } }], data: g });
d.derive(() => g.val = v.get("polyline").data.val);
d.derive(() => {
  w.geometry.setAttribute("position", new D(g.val.flat(), 3)), p.val = [...p.rawVal];
});
const y = d.state(""), x = d.state(void 0);
d.derive(() => {
  y.val === "Tables" && (x.val = I({ tables: v }));
});
document.body.append(j({ clickedButton: y, buttons: ["Tables"], sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts", author: "https://www.linkedin.com/in/cal-mense/" }), L({ dialogBody: x }), O({ objects3D: p }));
