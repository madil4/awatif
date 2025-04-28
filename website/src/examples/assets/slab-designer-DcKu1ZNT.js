import { d as Q, M as Z, B as O, h as $, f as tt, c as et, v as a, g as nt, a as ot, F as st, S as D, P as lt, i as _, j as L, k as at, l as B } from "./styles-C277HhWC.js";
import { m as j } from "./BufferGeometryUtils-BQhN9FF1.js";
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
const p = { points: a.state([]), columns: a.state([]), slabs: a.state([]) }, z = new Z(new O(), new $({ color: 16770764 })), I = new tt(new O(), new et());
I.frustumCulled = false;
I.material.depthTest = false;
const F = a.state([I]), ht = a.state([z]), C = a.state([]), b = a.state([]), K = a.state([]), N = a.state([]), V = a.state([]), k = a.state([]), W = a.state({ position: [10, 10, 0], rotation: [Math.PI / 2, 0, 0] }), A = a.state([]), G = a.state([]), y = 3;
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
  const f = [], g = t.length;
  N.val.forEach((n, o) => {
    const e = n.map((c) => g + c);
    f.push(e);
  }), A.val = [...A.rawVal, ...t, ...r], G.val = [...G.rawVal, ...s, ...f];
});
a.derive(() => {
  const t = [], s = [], r = [];
  W.val = { position: [10, 10, H == "1st-floor" ? 0 : y], rotation: [Math.PI / 2, 0, 0] };
  const f = [], g = [];
  if (b.val.length > 0) {
    for (let e = 0; e < b.val.length; e++) f.push([b.val[e][0], b.val[e][1], y]);
    const n = [], o = t.length;
    for (let e = 0; e < f.length; e++) t.push(f[e]), n.push(e + o);
    s.push([n]);
  }
  if (C.val.length > 0) {
    for (let n = 0; n < C.val.length; n++) {
      const o = C.val[n];
      g.push([[o[0], o[1], o[2]], [o[0], o[1], o[2] + y]]);
    }
    for (let n = 0; n < g.length; n++) {
      const o = t.length;
      t.push(...g[n]), r.push([o, o + 1]);
    }
  }
  p.points.val = t, p.columns.val = r, p.slabs.val = s;
});
a.derive(() => {
  p.points.val.length != 0 && (I.geometry = ft(p.points.val, p.slabs.val, p.columns.val), (p.columns.val.length > 0 || p.slabs.val[0][0].length > 2) && (z.geometry = pt(p.points.val, p.slabs.val, p.columns.val)), F.val = [...F.rawVal]);
});
document.body.append(nt({ objects3D: F, solids: ht, mesh: { nodes: A, elements: G }, drawingObj: { points: V, polylines: k, gridTarget: W }, settingsObj: { elements: false } }), it({ onToolbarClick: ut }), ot({ sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts", author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/" }));
function ft(t, s, r) {
  const f = new O(), g = r.map((e) => [t[e[0]], t[e[1]]].flat()).flat(), n = s.map((e) => o(e[0]).map((c) => [...t[c[0]], ...t[c[1]]]).flat()).flat();
  return f.setAttribute("position", new st([...g, ...n], 3)), f;
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
  return ((_a = s[0]) == null ? void 0 : _a[0].length) > 2 && n.push(o(t, s)), r.length > 0 && n.push(e(t, r)), j(n);
  function o(c, u, P = 0.3) {
    const w = [];
    for (let h = 0; h < u.length; h++) for (let d = 0; d < u[h].length; d++) {
      const v = [];
      for (let m = 0; m < u[h][d].length; m++) {
        const T = u[h][d][m];
        v.push(c[T]);
      }
      const i = M(v, -0.3 / 2), E = new D();
      new lt();
      for (let m = 0; m < i.length; m++) m == 0 ? E.moveTo(i[0][0], i[0][1]) : E.lineTo(i[m][0], i[m][1]);
      const l = new _(E, { depth: P, bevelEnabled: false });
      l.translate(0, 0, i[0][2] - P / 2), w.push(l);
    }
    return j(w);
    function M(h, d = 0) {
      const v = [], i = [];
      for (let l = 0; l < h.length; l++) i.push(new L(h[l][0], h[l][1]));
      let E = new at(new Float32Array([d, 0, 0]), 3);
      for (let l = 0; l < i.length; l++) {
        let m = new L().subVectors(i[l - 1 < 0 ? i.length - 1 : l - 1], i[l]), T = new L().subVectors(i[l + 1 == i.length ? 0 : l + 1], i[l]), R = (T.angle() - m.angle()) * 0.5, U = T.angle() + Math.PI * 0.5, X = Math.tan(R - Math.PI * 0.5), Y = new B().set(1, 0, 0, 0, -X, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), S = U, q = new B().set(Math.cos(S), -Math.sin(S), 0, 0, Math.sin(S), Math.cos(S), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), J = new B().set(1, 0, 0, i[l].x, 0, 1, 0, i[l].y, 0, 0, 1, 0, 0, 0, 0, 1), x = E.clone();
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
      const d = y, v = new _(w, { depth: d, bevelEnabled: false });
      v.translate(h[0] - 0.3 / 2, h[1] - 0.3 / 2, h[2]), P.push(v);
    }
    return j(P);
  }
}
function mt(t, s, r) {
  const f = s[0], g = s[1], n = [s, [f, g, r]], o = [[t, t + 1]];
  return { columnNodes: n, columnElements: o };
}
