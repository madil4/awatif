import { g as q, __tla as __tla_0 } from "./getMesh-BFRjMVyf.js";
import { a as O, s as V, n as D, c as Y, d as $, m as J } from "./pureFunctionsAny.generated-Dh3LO6N2.js";
import { e as K, B as S, b as Q, F as Z, f as F, M as ee, h as te, S as j, P as ne, i as _, j as z, k as C } from "./styles-Bn9nRx26.js";
let me, fe, he, de, ge;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  fe = function(t, a, i, b, p, c, f, h) {
    let n = [], l = [];
    const e = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    }, r = {
      elasticities: /* @__PURE__ */ new Map(),
      thicknesses: /* @__PURE__ */ new Map(),
      poissonsRatios: /* @__PURE__ */ new Map()
    };
    for (let s in a) {
      const o = a[s], u = t[o][2];
      c.get(Number(s)).forEach((y) => {
        var _a, _b, _c, _d;
        const m = b[y].map((w) => t[w]), A = m.map((w, v) => v), d = p.get(Number(s)).map((w) => t[i[w]]), E = ie(m, d), { nodes: T, elements: U } = q({
          points: E,
          polygon: A,
          maxMeshSize: 1
        }), R = n.length, H = l.length, M = U.map((w) => w.map((v) => v + R)), k = T.map((w, v) => v + R), I = l.map((w, v) => v + H);
        n = [
          ...n,
          ...se(T, u)
        ], l = [
          ...l,
          ...M
        ];
        const G = (_a = h.get(y)) == null ? void 0 : _a.analysisInput, P = ((_b = G == null ? void 0 : G.material) == null ? void 0 : _b.elasticity) ?? 1, N = (G == null ? void 0 : G.thickness) ?? 1, B = ((_c = G == null ? void 0 : G.material) == null ? void 0 : _c.poissonsRatio) ?? 1;
        I.forEach((w) => {
          r.elasticities.set(w, P), r.thicknesses.set(w, N), r.poissonsRatios.set(w, B);
        });
        const X = ((_d = h.get(y).analysisInput) == null ? void 0 : _d.areaLoad) ?? 0;
        e.loads = re(n, M, e.loads, X, k);
      });
    }
    for (let s = 0; s < a.length; s++) {
      const o = a[s], u = t[o][2], g = s > 0 ? t[a[s - 1]][2] : 0;
      p.get(s).forEach((x) => {
        var _a, _b;
        const m = t[i[x]], A = [
          m[0],
          m[1],
          u
        ], d = [
          m[0],
          m[1],
          g
        ], { nodes: E, elements: T } = oe(A, d, n.length);
        s === 0 && e.supports.set(n.length + E.length - 1, ((_b = (_a = f.get(x)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
          true,
          true,
          true,
          true,
          true,
          true
        ]), n = [
          ...n,
          ...E
        ], l = [
          ...l,
          ...T
        ];
        const U = n.length, R = l.length;
        E.map((H, M) => M + U), T.map((H, M) => M + R);
      });
    }
    return {
      nodes: n,
      elements: l,
      nodeInputs: e,
      elementInputs: r
    };
  };
  function se(t, a) {
    return t.map((i) => [
      i[0],
      i[1],
      a
    ]);
  }
  function oe(t, a, i, b = 3) {
    let p = [
      [
        ...t
      ]
    ], c = [];
    const f = V(a, t), h = $(f, b);
    for (let n = 0; n < b; n++) p.push(O(t, J(h, n + 1))), c.push([
      i + n,
      i + n + 1
    ]);
    return {
      nodes: p,
      elements: c
    };
  }
  function re(t, a, i, b, p) {
    return a.forEach((f) => {
      const [h, n, l] = f.map((s) => t[s]), e = c(h, n, l), r = b * e / 3;
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
          i.set(s, O(u, o));
        }
      });
    }), i;
    function c(f, h, n) {
      const l = V(h, f), e = V(n, f);
      return D(Y(l, e)) / 2;
    }
  }
  function ie(t, a, i = 0.01) {
    const b = i * i, p = t.slice();
    for (const c of a) {
      let f = false;
      for (const h of t) {
        const n = c[0] - h[0], l = c[1] - h[1], e = c[2] - h[2];
        if (n * n + l * l + e * e <= b) {
          f = true;
          break;
        }
      }
      f || p.push(c);
    }
    return p;
  }
  me = function() {
    const t = new K(new S(), new Q());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  he = function(t, a, i) {
    const b = new S(), p = 4, c = i.flatMap((h) => {
      const n = t[h], l = [
        n[0],
        n[1],
        n[2] - p
      ];
      return [
        ...n,
        ...l
      ];
    }), f = a.map((h) => le(h).map((n) => [
      ...t[n[0]],
      ...t[n[1]]
    ]).flat()).flat();
    return b.setAttribute("position", new Z([
      ...c,
      ...f
    ], 3)), b;
  };
  function le(t) {
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
  function L(t, a = false) {
    const i = t[0].index !== null, b = new Set(Object.keys(t[0].attributes)), p = new Set(Object.keys(t[0].morphAttributes)), c = {}, f = {}, h = t[0].morphTargetsRelative, n = new S();
    let l = 0;
    for (let e = 0; e < t.length; ++e) {
      const r = t[e];
      let s = 0;
      if (i !== (r.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const o in r.attributes) {
        if (!b.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + o + '" attribute exists among all geometries, or in none of them.'), null;
        c[o] === void 0 && (c[o] = []), c[o].push(r.attributes[o]), s++;
      }
      if (s !== b.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (h !== r.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const o in r.morphAttributes) {
        if (!p.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        f[o] === void 0 && (f[o] = []), f[o].push(r.morphAttributes[o]);
      }
      if (a) {
        let o;
        if (i) o = r.index.count;
        else if (r.attributes.position !== void 0) o = r.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        n.addGroup(l, o, e), l += o;
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
      const r = W(c[e]);
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
        const u = W(o);
        if (!u) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        n.morphAttributes[e].push(u);
      }
    }
    return n;
  }
  function W(t) {
    let a, i, b, p = -1, c = 0;
    for (let l = 0; l < t.length; ++l) {
      const e = t[l];
      if (a === void 0 && (a = e.array.constructor), a !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (i === void 0 && (i = e.itemSize), i !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (b === void 0 && (b = e.normalized), b !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (p === -1 && (p = e.gpuType), p !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      c += e.count * i;
    }
    const f = new a(c), h = new F(f, i, b);
    let n = 0;
    for (let l = 0; l < t.length; ++l) {
      const e = t[l];
      if (e.isInterleavedBufferAttribute) {
        const r = n / i;
        for (let s = 0, o = e.count; s < o; s++) for (let u = 0; u < i; u++) {
          const g = e.getComponent(s, u);
          h.setComponent(s + r, u, g);
        }
      } else f.set(e.array, n);
      n += e.count * i;
    }
    return p !== void 0 && (h.gpuType = p), h;
  }
  ge = function() {
    return new ee(new S(), new te({
      color: 16770764
    }));
  };
  de = function(t, a, i) {
    var _a;
    const c = [];
    return ((_a = a[0]) == null ? void 0 : _a.length) > 2 && c.push(f(t, a)), i.length > 0 && c.push(h(t, i)), c.length > 0 ? L(c) : new S();
    function f(e, r, s = 0.3) {
      const o = [];
      for (let g = 0; g < r.length; g++) {
        const y = [];
        for (let E = 0; E < r[g].length; E++) {
          const T = r[g][E];
          y.push(e[T]);
        }
        if (y.length < 3) continue;
        n(y) && y.pop();
        const x = l(y), m = u(y, x * 0.3 / 2), A = new j();
        new ne();
        for (let E = 0; E < m.length; E++) E == 0 ? A.moveTo(m[0][0], m[0][1]) : A.lineTo(m[E][0], m[E][1]);
        const d = new _(A, {
          depth: s,
          bevelEnabled: false
        });
        d.translate(0, 0, m[0][2] - s / 2), o.push(d);
      }
      return L(o);
      function u(g, y = 0) {
        const x = [], m = [];
        for (let d = 0; d < g.length; d++) m.push(new z(g[d][0], g[d][1]));
        let A = new F(new Float32Array([
          y,
          0,
          0
        ]), 3);
        for (let d = 0; d < m.length; d++) {
          let E = new z().subVectors(m[d - 1 < 0 ? m.length - 1 : d - 1], m[d]), T = new z().subVectors(m[d + 1 == m.length ? 0 : d + 1], m[d]), H = (T.angle() - E.angle()) * 0.5, M = T.angle() + Math.PI * 0.5, k = Math.tan(H - Math.PI * 0.5), I = new C().set(1, 0, 0, 0, -k, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), G = M, P = new C().set(Math.cos(G), -Math.sin(G), 0, 0, Math.sin(G), Math.cos(G), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), N = new C().set(1, 0, 0, m[d].x, 0, 1, 0, m[d].y, 0, 0, 1, 0, 0, 0, 0, 1), B = A.clone();
          B.needsUpdate = true, B.applyMatrix4(I), B.applyMatrix4(P), B.applyMatrix4(N), x.push([
            B.getX(0),
            B.getY(0),
            g[d][2]
          ]);
        }
        return x;
      }
    }
    function h(e, r) {
      const s = [], o = new j();
      o.lineTo(0 + 0.3, 0), o.lineTo(0 + 0.3, 0 + 0.3), o.lineTo(0, 0 + 0.3);
      for (let u = 0; u < r.length; u++) {
        const g = e[r[u]], y = new _(o, {
          depth: -4,
          bevelEnabled: false
        });
        y.translate(g[0] - 0.3 / 2, g[1] - 0.3 / 2, g[2]), s.push(y);
      }
      return L(s);
    }
    function n(e) {
      let r = false;
      const s = e[0], o = e[e.length - 1];
      return s[0] == o[0] && s[1] == o[1] && s[2] == o[2] && (r = true), r;
    }
    function l(e) {
      let r = 0;
      const s = n(e), o = s ? e.length - 1 : e.length;
      for (let u = 0; u < o; u++) {
        const [g, y] = e[u], x = (u + 1) % (s ? e.length : o), [m, A] = e[x];
        r += (m - g) * (A + y);
      }
      return r > 0 ? 1 : -1;
    }
  };
});
export {
  __tla,
  me as a,
  fe as b,
  he as c,
  de as d,
  ge as g
};
