import { g as O, __tla as __tla_0 } from "./getMesh-HOyv1-MH.js";
import { a as V, s as z, n as F, c as D, d as X, m as q } from "./pureFunctionsAny.generated-Dh3LO6N2.js";
import { f as Y, B as v, c as $, F as J, h as j, M as K, i as Q, S as k, P as Z, j as C, k as I, l as N } from "./styles-BHEEcEe8.js";
let ue, ae, ce, me, fe;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  ae = function(t, a, i, y, p, c, f) {
    let l = [], n = [];
    const m = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    };
    for (let e in a) {
      const r = a[e], s = t[r][2];
      c.get(Number(e)).forEach((u) => {
        var _a;
        const b = y[u].map((w) => t[w]), A = b.map((w, M) => M), d = p.get(Number(e)).map((w) => t[i[w]]), E = oe(b, d), { nodes: h, elements: x } = O({
          points: E,
          polygon: A,
          maxMeshSize: 1
        }), T = l.length, H = n.length, G = x.map((w) => w.map((M) => M + T)), S = h.map((w, M) => M + T);
        n.map((w, M) => M + H), l = [
          ...l,
          ...ee(h, s)
        ], n = [
          ...n,
          ...G
        ];
        const U = ((_a = f.get(u).analysisInput) == null ? void 0 : _a.areaLoad) ?? 0;
        m.loads = ne(l, G, m.loads, U, S);
      });
    }
    for (let e = 0; e < a.length; e++) {
      const r = a[e], s = t[r][2], o = e > 0 ? t[a[e - 1]][2] : 0;
      p.get(e).forEach((g) => {
        const b = t[i[g]], A = [
          b[0],
          b[1],
          s
        ], d = [
          b[0],
          b[1],
          o
        ], { nodes: E, elements: h } = te(A, d, l.length);
        l = [
          ...l,
          ...E
        ], n = [
          ...n,
          ...h
        ];
        const x = l.length, T = n.length;
        E.map((H, G) => G + x), h.map((H, G) => G + T);
      });
    }
    return {
      nodes: l,
      elements: n,
      nodeInputs: m
    };
  };
  function ee(t, a) {
    return t.map((i) => [
      i[0],
      i[1],
      a
    ]);
  }
  function te(t, a, i, y = 3) {
    let p = [
      [
        ...t
      ]
    ], c = [];
    const f = z(a, t), l = X(f, y);
    for (let n = 0; n < y; n++) p.push(V(t, q(l, n + 1))), c.push([
      i + n,
      i + n + 1
    ]);
    return {
      nodes: p,
      elements: c
    };
  }
  function ne(t, a, i, y, p) {
    return a.forEach((f) => {
      const [l, n, m] = f.map((s) => t[s]), e = c(l, n, m), r = y * e / 3;
      f.forEach((s) => {
        if (p.includes(s)) {
          const o = [
            0,
            0,
            -r,
            0,
            0,
            0
          ], u = i.get(s) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          i.set(s, V(u, o));
        }
      });
    }), i;
    function c(f, l, n) {
      const m = z(l, f), e = z(n, f);
      return F(D(m, e)) / 2;
    }
  }
  function oe(t, a, i = 0.01) {
    const y = i * i, p = t.slice();
    for (const c of a) {
      let f = false;
      for (const l of t) {
        const n = c[0] - l[0], m = c[1] - l[1], e = c[2] - l[2];
        if (n * n + m * m + e * e <= y) {
          f = true;
          break;
        }
      }
      f || p.push(c);
    }
    return p;
  }
  ue = function() {
    const t = new Y(new v(), new $());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  ce = function(t, a, i) {
    const y = new v(), p = 4, c = i.flatMap((l) => {
      const n = t[l], m = [
        n[0],
        n[1],
        n[2] - p
      ];
      return [
        ...n,
        ...m
      ];
    }), f = a.map((l) => re(l).map((n) => [
      ...t[n[0]],
      ...t[n[1]]
    ]).flat()).flat();
    return y.setAttribute("position", new J([
      ...c,
      ...f
    ], 3)), y;
  };
  function re(t) {
    if (t.length === 2) return [
      t
    ];
    const a = [];
    for (let i = 0; i < t.length; i++) a.push([
      t[i],
      t[(i + 1) % t.length]
    ]);
    return a;
  }
  function P(t, a = false) {
    const i = t[0].index !== null, y = new Set(Object.keys(t[0].attributes)), p = new Set(Object.keys(t[0].morphAttributes)), c = {}, f = {}, l = t[0].morphTargetsRelative, n = new v();
    let m = 0;
    for (let e = 0; e < t.length; ++e) {
      const r = t[e];
      let s = 0;
      if (i !== (r.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const o in r.attributes) {
        if (!y.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + o + '" attribute exists among all geometries, or in none of them.'), null;
        c[o] === void 0 && (c[o] = []), c[o].push(r.attributes[o]), s++;
      }
      if (s !== y.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (l !== r.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const o in r.morphAttributes) {
        if (!p.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        f[o] === void 0 && (f[o] = []), f[o].push(r.morphAttributes[o]);
      }
      if (a) {
        let o;
        if (i) o = r.index.count;
        else if (r.attributes.position !== void 0) o = r.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        n.addGroup(m, o, e), m += o;
      }
    }
    if (i) {
      let e = 0;
      const r = [];
      for (let s = 0; s < t.length; ++s) {
        const o = t[s].index;
        for (let u = 0; u < o.count; ++u) r.push(o.getX(u) + e);
        e += t[s].attributes.position.count;
      }
      n.setIndex(r);
    }
    for (const e in c) {
      const r = L(c[e]);
      if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      n.setAttribute(e, r);
    }
    for (const e in f) {
      const r = f[e][0].length;
      if (r === 0) break;
      n.morphAttributes = n.morphAttributes || {}, n.morphAttributes[e] = [];
      for (let s = 0; s < r; ++s) {
        const o = [];
        for (let g = 0; g < f[e].length; ++g) o.push(f[e][g][s]);
        const u = L(o);
        if (!u) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        n.morphAttributes[e].push(u);
      }
    }
    return n;
  }
  function L(t) {
    let a, i, y, p = -1, c = 0;
    for (let m = 0; m < t.length; ++m) {
      const e = t[m];
      if (a === void 0 && (a = e.array.constructor), a !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (i === void 0 && (i = e.itemSize), i !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (y === void 0 && (y = e.normalized), y !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (p === -1 && (p = e.gpuType), p !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      c += e.count * i;
    }
    const f = new a(c), l = new j(f, i, y);
    let n = 0;
    for (let m = 0; m < t.length; ++m) {
      const e = t[m];
      if (e.isInterleavedBufferAttribute) {
        const r = n / i;
        for (let s = 0, o = e.count; s < o; s++) for (let u = 0; u < i; u++) {
          const g = e.getComponent(s, u);
          l.setComponent(s + r, u, g);
        }
      } else f.set(e.array, n);
      n += e.count * i;
    }
    return p !== void 0 && (l.gpuType = p), l;
  }
  fe = function() {
    return new K(new v(), new Q({
      color: 16770764
    }));
  };
  me = function(t, a, i) {
    var _a;
    const c = [];
    return ((_a = a[0]) == null ? void 0 : _a.length) > 2 && c.push(f(t, a)), i.length > 0 && c.push(l(t, i)), c.length > 0 ? P(c) : new v();
    function f(e, r, s = 0.3) {
      const o = [];
      for (let g = 0; g < r.length; g++) {
        const b = [];
        for (let x = 0; x < r[g].length; x++) {
          const T = r[g][x];
          b.push(e[T]);
        }
        if (b.length < 3) continue;
        n(b) && b.pop();
        const A = m(b), d = u(b, A * 0.3 / 2), E = new k();
        new Z();
        for (let x = 0; x < d.length; x++) x == 0 ? E.moveTo(d[0][0], d[0][1]) : E.lineTo(d[x][0], d[x][1]);
        const h = new C(E, {
          depth: s,
          bevelEnabled: false
        });
        h.translate(0, 0, d[0][2] - s / 2), o.push(h);
      }
      return P(o);
      function u(g, b = 0) {
        const A = [], d = [];
        for (let h = 0; h < g.length; h++) d.push(new I(g[h][0], g[h][1]));
        let E = new j(new Float32Array([
          b,
          0,
          0
        ]), 3);
        for (let h = 0; h < d.length; h++) {
          let x = new I().subVectors(d[h - 1 < 0 ? d.length - 1 : h - 1], d[h]), T = new I().subVectors(d[h + 1 == d.length ? 0 : h + 1], d[h]), S = (T.angle() - x.angle()) * 0.5, U = T.angle() + Math.PI * 0.5, w = Math.tan(S - Math.PI * 0.5), M = new N().set(1, 0, 0, 0, -w, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), R = U, _ = new N().set(Math.cos(R), -Math.sin(R), 0, 0, Math.sin(R), Math.cos(R), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), W = new N().set(1, 0, 0, d[h].x, 0, 1, 0, d[h].y, 0, 0, 1, 0, 0, 0, 0, 1), B = E.clone();
          B.needsUpdate = true, B.applyMatrix4(M), B.applyMatrix4(_), B.applyMatrix4(W), A.push([
            B.getX(0),
            B.getY(0),
            g[h][2]
          ]);
        }
        return A;
      }
    }
    function l(e, r) {
      const s = [], o = new k();
      o.lineTo(0 + 0.3, 0), o.lineTo(0 + 0.3, 0 + 0.3), o.lineTo(0, 0 + 0.3);
      for (let u = 0; u < r.length; u++) {
        const g = e[r[u]], b = new C(o, {
          depth: -4,
          bevelEnabled: false
        });
        b.translate(g[0] - 0.3 / 2, g[1] - 0.3 / 2, g[2]), s.push(b);
      }
      return P(s);
    }
    function n(e) {
      let r = false;
      const s = e[0], o = e[e.length - 1];
      return s[0] == o[0] && s[1] == o[1] && s[2] == o[2] && (r = true), r;
    }
    function m(e) {
      let r = 0;
      const s = n(e), o = s ? e.length - 1 : e.length;
      for (let u = 0; u < o; u++) {
        const [g, b] = e[u], A = (u + 1) % (s ? e.length : o), [d, E] = e[A];
        r += (d - g) * (E + b);
      }
      return r > 0 ? 1 : -1;
    }
  };
});
export {
  __tla,
  ue as a,
  ae as b,
  ce as c,
  me as d,
  fe as g
};
