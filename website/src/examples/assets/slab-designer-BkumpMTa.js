import { d as Q, M as Z, B as I, h as $, f as tt, c as et, v as a, g as nt, a as ot, F as st, S as D, P as lt, i as _, j as B, k as at, l as j } from "./styles-C_4VGeCN.js";
import { m as F } from "./BufferGeometryUtils-zbM7fMO-.js";
function it({ onToolbarClick: t }) {
  const s = document.createElement("div");
  return s.id = "drawing-toolbar", new Q({ name: "toolbar", box: s, items: [{ type: "radio", id: "1st-floor", text: "Columns", checked: true, tooltip: "Create Columns" }, { type: "radio", id: "2nd-floor", text: "Slab", tooltip: "Create Slab" }], onClick(r) {
    t(r.target);
  } }), s;
}
function rt() {
  const t = ct();
  t.classList.add("show"), document.addEventListener("keydown", (s) => {
    s.ctrlKey && t.classList.remove("show");
  });
}
function ct() {
  const t = document.createElement("div");
  return t.className = "snap-tip", t.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">Ctrl</span>
      <span>to snap to grid points</span>
    `, document.body.appendChild(t), t;
}
rt();
const d = { points: a.state([]), columns: a.state([]), slabs: a.state([]) }, z = new Z(new I(), new $({ color: 16770764 })), L = new tt(new I(), new et());
L.frustumCulled = false;
L.material.depthTest = false;
const O = a.state([L]), ht = a.state([z]), C = a.state([]), b = a.state([]), K = a.state([]), N = a.state([]), V = a.state([]), k = a.state([]), W = a.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), A = a.state([]), G = a.state([]), y = 3;
let H = "1st-floor";
function ut(t) {
  H = t, W.val = { position: [10, 10, t == "1st-floor" ? 0 : y], rotation: [Math.PI / 2, 0, 0] }, V.val = t === "1st-floor" ? C.val : b.val, k.val = t === "1st-floor" ? K.val : N.val;
}
a.derive(() => {
  H == "1st-floor" && (C.val = V.val, K.val = k.val), H == "2nd-floor" && (b.val = V.val, N.val = k.val);
});
a.derive(() => {
  A.val = [], G.val = [];
  const t = [], s = [];
  C.val.forEach((n, o) => {
    const { columnNodes: e, columnElements: c } = mt(o * 2, n, y);
    t.push(...e), s.push(...c);
  });
  const r = [];
  b.val.forEach((n, o) => {
    r.push([n[0], n[1], y]);
  });
  const f = [], m = t.length;
  N.val.forEach((n, o) => {
    const e = n.map((c) => m + c);
    f.push(e);
  }), A.val = [...A.rawVal, ...t, ...r], G.val = [...G.rawVal, ...s, ...f];
});
a.derive(() => {
  const t = [], s = [], r = [];
  W.val = { position: [10, 10, H == "1st-floor" ? 0 : y], rotation: [Math.PI / 2, 0, 0] };
  const f = [], m = [];
  if (b.val.length > 0) {
    for (let e = 0; e < b.val.length; e++) f.push([b.val[e][0], b.val[e][1], y]);
    const n = [], o = t.length;
    for (let e = 0; e < f.length; e++) t.push(f[e]), n.push(e + o);
    s.push([n]);
  }
  if (C.val.length > 0) {
    for (let n = 0; n < C.val.length; n++) {
      const o = C.val[n];
      m.push([[o[0], o[1], o[2]], [o[0], o[1], o[2] + y]]);
    }
    for (let n = 0; n < m.length; n++) {
      const o = t.length;
      t.push(...m[n]), r.push([o, o + 1]);
    }
  }
  d.points.val = t, d.columns.val = r, d.slabs.val = s;
});
a.derive(() => {
  L.geometry = ft(d.points.val, d.slabs.val, d.columns.val), z.geometry = pt(d.points.val, d.slabs.val, d.columns.val), O.val = [...O.rawVal];
});
document.body.append(nt({ objects3D: O, solids: ht, mesh: { nodes: A, elements: G }, drawingObj: { points: V, polylines: k, gridTarget: W }, settingsObj: { elements: false } }), it({ onToolbarClick: ut }), ot({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts", author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/" }));
function ft(t, s, r) {
  const f = new I(), m = r.map((e) => [t[e[0]], t[e[1]]].flat()).flat(), n = s.map((e) => o(e[0]).map((c) => [...t[c[0]], ...t[c[1]]]).flat()).flat();
  return f.setAttribute("position", new st([...m, ...n], 3)), f;
  function o(e) {
    if (e.length === 2) return [e];
    const c = [];
    for (let u = 0; u < e.length; u++) c.push([e[u], e[(u + 1) % e.length]]);
    return c;
  }
}
function pt(t, s, r) {
  var _a;
  const n = [];
  return ((_a = s[0]) == null ? void 0 : _a[0].length) > 2 && n.push(o(t, s)), r.length > 0 && n.push(e(t, r)), n.length > 0 ? F(n) : new I();
  function o(c, u, P = 0.3) {
    const w = [];
    for (let h = 0; h < u.length; h++) for (let g = 0; g < u[h].length; g++) {
      const v = [];
      for (let p = 0; p < u[h][g].length; p++) {
        const T = u[h][g][p];
        v.push(c[T]);
      }
      const i = M(v, -0.3 / 2), E = new D();
      new lt();
      for (let p = 0; p < i.length; p++) p == 0 ? E.moveTo(i[0][0], i[0][1]) : E.lineTo(i[p][0], i[p][1]);
      const l = new _(E, { depth: P, bevelEnabled: false });
      l.translate(0, 0, i[0][2] - P / 2), w.push(l);
    }
    return F(w);
    function M(h, g = 0) {
      const v = [], i = [];
      for (let l = 0; l < h.length; l++) i.push(new B(h[l][0], h[l][1]));
      let E = new at(new Float32Array([g, 0, 0]), 3);
      for (let l = 0; l < i.length; l++) {
        let p = new B().subVectors(i[l - 1 < 0 ? i.length - 1 : l - 1], i[l]), T = new B().subVectors(i[l + 1 == i.length ? 0 : l + 1], i[l]), R = (T.angle() - p.angle()) * 0.5, U = T.angle() + Math.PI * 0.5, X = Math.tan(R - Math.PI * 0.5), Y = new j().set(1, 0, 0, 0, -X, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), S = U, q = new j().set(Math.cos(S), -Math.sin(S), 0, 0, Math.sin(S), Math.cos(S), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), J = new j().set(1, 0, 0, i[l].x, 0, 1, 0, i[l].y, 0, 0, 1, 0, 0, 0, 0, 1), x = E.clone();
        x.needsUpdate = true, x.applyMatrix4(Y), x.applyMatrix4(q), x.applyMatrix4(J), v.push([x.getX(0), x.getY(0), h[l][2]]);
      }
      return v;
    }
  }
  function e(c, u) {
    const P = [], w = new D();
    w.lineTo(0 + 0.3, 0), w.lineTo(0 + 0.3, 0 + 0.3), w.lineTo(0, 0 + 0.3);
    for (let M = 0; M < u.length; M++) {
      const h = c[u[M][0]];
      c[u[M][1]];
      const g = y, v = new _(w, { depth: g, bevelEnabled: false });
      v.translate(h[0] - 0.3 / 2, h[1] - 0.3 / 2, h[2]), P.push(v);
    }
    return F(P);
  }
}
function mt(t, s, r) {
  const f = s[0], m = s[1], n = [s, [f, m, r]], o = [[t, t + 1]];
  return { columnNodes: n, columnElements: o };
}
