import { w as T, v as d, b as A, L as B, B as M, c as C, F as D, a as O, g as j } from "./styles-DC0SXaq4.js";
import { g as L } from "./getDialog-BHHgEfUK.js";
function z({ fields: a, data: l }) {
  const n = document.createElement("div"), e = new T({ name: Math.random().toString().substring(2), box: n, selectType: "cell", recordHeight: 26, show: { columnMenu: false, lineNumbers: true }, columns: F(a), records: h(l.rawVal, a) });
  return n.setAttribute("id", "table"), new ResizeObserver(() => e.refresh()).observe(n), e.onChange = (r) => {
    if (!a[r.detail.column]) return;
    const t = b[r.detail.column];
    e.records[r.detail.index][t] = r.detail.value.new, l.val = m(e.records, a);
  }, e.onDelete = (r) => {
    r.detail.force = true, r.onComplete = () => {
      l.val = m(e.records, a);
    };
  }, e.onPaste = (r) => {
    r.onComplete = () => {
      e.mergeChanges(), l.val = m(e.records, a);
    };
  }, d.derive(() => {
    e.records = h(l.val, a), e.refresh();
  }), n;
}
const b = "ABCDEFGHIJKLMNOPRST";
function F(a) {
  return b.split("").map((n) => ({ field: n, text: '<div style="text-align: center">' + n + "</div>", size: "90px", resizable: true, sortable: true, editable: { type: "text" } })).map((n) => {
    const e = a.find((s) => s.field === n.field);
    return e ? { ...n, ...e } : n;
  });
}
function h(a, l) {
  const n = Array.isArray(a) ? a : r(a, l), e = Array(50).fill(0).map((t, o) => ({ recid: o })), s = b.split("");
  for (let t = 0; t < n.length; t++) for (let o = 0; o < n[t].length; o++) e[t][s[o]] = n[t][o];
  return e;
  function r(t, o) {
    const f = /* @__PURE__ */ new Map();
    return o.forEach((u) => f.set(u.field, u)), Object.keys(t).map((u) => [f.get(u).text, t[u]]);
  }
}
function m(a, l) {
  if (b.includes(l[0].field)) return e(a, l);
  return s(a, l);
  function e(r, t) {
    let o = [...Array(r.length)].map(() => [...Array(t.length)]);
    const f = b.split("");
    for (let c = 0; c < o.length; c++) for (let i = 0; i < o[c].length; i++) o[c][i] = r[c][f[i]] ?? "";
    return o.slice(0, u(o) + 1);
    function u(c) {
      for (let i = c.length - 1; i >= 0; i--) if (c[i].some((E) => E !== "")) return i;
    }
  }
  function s(r, t) {
    return Object.fromEntries(t.map(({ field: o }, f) => [o, r[f].B]));
  }
}
function I({ tables: a }) {
  const l = document.createElement("div"), n = document.createElement("div"), e = [], s = /* @__PURE__ */ new Map();
  a.forEach((t, o) => {
    e.push({ id: o, text: t.text }), s.set(o, z({ fields: t.fields, data: t.data }));
  });
  const r = new A({ box: n, name: "tabs", active: e[0].id, flow: "up", tabs: e });
  return l.id = "tables", n.id = "tabs", l.append(s.values().next().value, n), r.onClick = (t) => {
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
document.body.append(O({ clickedButton: y, buttons: ["Tables"], sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts", author: "https://www.linkedin.com/in/cal-mense/" }), L({ dialogBody: x }), j({ objects3D: p }));
