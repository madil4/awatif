import { c as g, v as h, d as v } from "./styles-CHgmIz-C.js";
function E({ fields: o, data: l }) {
  const n = document.createElement("div"), e = new g({ name: Math.random().toString().substring(2), box: n, selectType: "cell", recordHeight: 26, show: { columnMenu: false, lineNumbers: true }, columns: w(o), records: b(l.rawVal, o) });
  return n.setAttribute("id", "table"), new ResizeObserver(() => e.refresh()).observe(n), e.onChange = (s) => {
    if (!o[s.detail.column]) return;
    const t = f[s.detail.column];
    e.records[s.detail.index][t] = s.detail.value.new, l.val = m(e.records, o);
  }, e.onDelete = (s) => {
    s.detail.force = true, s.onComplete = () => {
      l.val = m(e.records, o);
    };
  }, e.onPaste = (s) => {
    s.onComplete = () => {
      e.mergeChanges(), l.val = m(e.records, o);
    };
  }, h.derive(() => {
    e.records = b(l.val, o), e.refresh();
  }), n;
}
const f = "ABCDEFGHIJKLMNOPRST";
function w(o) {
  return f.split("").map((n) => ({ field: n, text: '<div style="text-align: center">' + n + "</div>", size: "90px", resizable: true, sortable: true, editable: { type: "text" } })).map((n) => {
    const e = o.find((i) => i.field === n.field);
    return e ? { ...n, ...e } : n;
  });
}
function b(o, l) {
  const n = Array.isArray(o) ? o : s(o, l), e = Array(50).fill(0).map((t, r) => ({ recid: r })), i = f.split("");
  for (let t = 0; t < n.length; t++) for (let r = 0; r < n[t].length; r++) e[t][i[r]] = n[t][r];
  return e;
  function s(t, r) {
    const d = /* @__PURE__ */ new Map();
    return r.forEach((u) => d.set(u.field, u)), Object.keys(t).map((u) => [d.get(u).text, t[u]]);
  }
}
function m(o, l) {
  if (f.includes(l[0].field)) return e(o, l);
  return i(o, l);
  function e(s, t) {
    let r = [...Array(s.length)].map(() => [...Array(t.length)]);
    const d = f.split("");
    for (let c = 0; c < r.length; c++) for (let a = 0; a < r[c].length; a++) r[c][a] = s[c][d[a]] ?? "";
    return r.slice(0, u(r) + 1);
    function u(c) {
      for (let a = c.length - 1; a >= 0; a--) if (c[a].some((p) => p !== "")) return a;
    }
  }
  function i(s, t) {
    return Object.fromEntries(t.map(({ field: r }, d) => [r, s[d].B]));
  }
}
function y({ tables: o }) {
  const l = document.createElement("div"), n = document.createElement("div"), e = [], i = /* @__PURE__ */ new Map();
  o.forEach((t, r) => {
    e.push({ id: r, text: t.text }), i.set(r, E({ fields: t.fields, data: t.data }));
  });
  const s = new v({ box: n, name: "tabs", active: e[0].id, flow: "up", tabs: e });
  return l.id = "tables", n.id = "tabs", l.append(i.values().next().value, n), s.onClick = (t) => {
    l.firstChild.replaceWith(i.get(t.target));
  }, l;
}
export {
  y as g
};
