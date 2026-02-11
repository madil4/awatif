import { e as ee, B as P, a as te, F as ne, f as $, M as oe, h as se, S as _, P as re, i as W, j as L, k as j } from "./styles-Dc2qaz2G.js";
import { a as ie } from "./coupling-bgRfBz9p.js";
import { __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as le, __tla as __tla_1 } from "./getMesh-DmUdekin.js";
import { a as ae, s as F, n as ue, c as ce } from "./pureFunctionsAny.generated-DgiBRKJh.js";
let Ae, Ie, Te, Be, Ge;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  Ae = function() {
    const t = new ee(new P(), new te());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  Te = function(t, i, s) {
    const b = new P(), f = 4, c = s.flatMap((d) => {
      const l = t[d], a = [
        l[0],
        l[1],
        l[2] - f
      ];
      return [
        ...l,
        ...a
      ];
    }), h = i.map((d) => fe(d).map((l) => [
      ...t[l[0]],
      ...t[l[1]]
    ]).flat()).flat();
    return b.setAttribute("position", new ne([
      ...c,
      ...h
    ], 3)), b;
  };
  function fe(t) {
    if (t.length === 2) return [
      t
    ];
    const i = [];
    for (let s = 0; s < t.length; s++) i.push([
      t[s],
      t[(s + 1) % t.length]
    ]);
    return i;
  }
  function O(t, i = false) {
    const s = t[0].index !== null, b = new Set(Object.keys(t[0].attributes)), f = new Set(Object.keys(t[0].morphAttributes)), c = {}, h = {}, d = t[0].morphTargetsRelative, l = new P();
    let a = 0;
    for (let e = 0; e < t.length; ++e) {
      const r = t[e];
      let n = 0;
      if (s !== (r.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const o in r.attributes) {
        if (!b.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + o + '" attribute exists among all geometries, or in none of them.'), null;
        c[o] === void 0 && (c[o] = []), c[o].push(r.attributes[o]), n++;
      }
      if (n !== b.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (d !== r.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const o in r.morphAttributes) {
        if (!f.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        h[o] === void 0 && (h[o] = []), h[o].push(r.morphAttributes[o]);
      }
      if (i) {
        let o;
        if (s) o = r.index.count;
        else if (r.attributes.position !== void 0) o = r.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        l.addGroup(a, o, e), a += o;
      }
    }
    if (s) {
      let e = 0;
      const r = [];
      for (let n = 0; n < t.length; ++n) {
        const o = t[n].index;
        for (let p = 0; p < o.count; ++p) r.push(o.getX(p) + e);
        e += t[n].attributes.position.count;
      }
      l.setIndex(r);
    }
    for (const e in c) {
      const r = Y(c[e]);
      if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      l.setAttribute(e, r);
    }
    for (const e in h) {
      const r = h[e][0].length;
      if (r === 0) break;
      l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[e] = [];
      for (let n = 0; n < r; ++n) {
        const o = [];
        for (let y = 0; y < h[e].length; ++y) o.push(h[e][y][n]);
        const p = Y(o);
        if (!p) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        l.morphAttributes[e].push(p);
      }
    }
    return l;
  }
  function Y(t) {
    let i, s, b, f = -1, c = 0;
    for (let a = 0; a < t.length; ++a) {
      const e = t[a];
      if (i === void 0 && (i = e.array.constructor), i !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (s === void 0 && (s = e.itemSize), s !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (b === void 0 && (b = e.normalized), b !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (f === -1 && (f = e.gpuType), f !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      c += e.count * s;
    }
    const h = new i(c), d = new $(h, s, b);
    let l = 0;
    for (let a = 0; a < t.length; ++a) {
      const e = t[a];
      if (e.isInterleavedBufferAttribute) {
        const r = l / s;
        for (let n = 0, o = e.count; n < o; n++) for (let p = 0; p < s; p++) {
          const y = e.getComponent(n, p);
          d.setComponent(n + r, p, y);
        }
      } else h.set(e.array, l);
      l += e.count * s;
    }
    return f !== void 0 && (d.gpuType = f), d;
  }
  Ge = function() {
    return new oe(new P(), new se({
      color: 16770764
    }));
  };
  Be = function(t, i, s) {
    var _a;
    const c = [];
    return ((_a = i[0]) == null ? void 0 : _a.length) > 2 && c.push(h(t, i)), s.length > 0 && c.push(d(t, s)), c.length > 0 ? O(c) : new P();
    function h(e, r, n = 0.3) {
      const o = [];
      for (let y = 0; y < r.length; y++) {
        const u = [];
        for (let M = 0; M < r[y].length; M++) {
          const T = r[y][M];
          u.push(e[T]);
        }
        if (u.length < 3) continue;
        l(u) && u.pop();
        const E = a(u), m = p(u, E * 0.3 / 2), A = new _();
        new re();
        for (let M = 0; M < m.length; M++) M == 0 ? A.moveTo(m[0][0], m[0][1]) : A.lineTo(m[M][0], m[M][1]);
        const g = new W(A, {
          depth: n,
          bevelEnabled: false
        });
        g.translate(0, 0, m[0][2] - n / 2), o.push(g);
      }
      return O(o);
      function p(y, u = 0) {
        const E = [], m = [];
        for (let g = 0; g < y.length; g++) m.push(new L(y[g][0], y[g][1]));
        let A = new $(new Float32Array([
          u,
          0,
          0
        ]), 3);
        for (let g = 0; g < m.length; g++) {
          let M = new L().subVectors(m[g - 1 < 0 ? m.length - 1 : g - 1], m[g]), T = new L().subVectors(m[g + 1 == m.length ? 0 : g + 1], m[g]), B = (T.angle() - M.angle()) * 0.5, x = T.angle() + Math.PI * 0.5, H = Math.tan(B - Math.PI * 0.5), U = new j().set(1, 0, 0, 0, -H, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), C = x, k = new j().set(Math.cos(C), -Math.sin(C), 0, 0, Math.sin(C), Math.cos(C), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), z = new j().set(1, 0, 0, m[g].x, 0, 1, 0, m[g].y, 0, 0, 1, 0, 0, 0, 0, 1), G = A.clone();
          G.needsUpdate = true, G.applyMatrix4(U), G.applyMatrix4(k), G.applyMatrix4(z), E.push([
            G.getX(0),
            G.getY(0),
            y[g][2]
          ]);
        }
        return E;
      }
    }
    function d(e, r) {
      const n = [], o = new _();
      o.lineTo(0 + 0.3, 0), o.lineTo(0 + 0.3, 0 + 0.3), o.lineTo(0, 0 + 0.3);
      for (let p = 0; p < r.length; p++) {
        const y = e[r[p]], u = new W(o, {
          depth: -4,
          bevelEnabled: false
        });
        u.translate(y[0] - 0.3 / 2, y[1] - 0.3 / 2, y[2]), n.push(u);
      }
      return O(n);
    }
    function l(e) {
      let r = false;
      const n = e[0], o = e[e.length - 1];
      return n[0] == o[0] && n[1] == o[1] && n[2] == o[2] && (r = true), r;
    }
    function a(e) {
      let r = 0;
      const n = l(e), o = n ? e.length - 1 : e.length;
      for (let p = 0; p < o; p++) {
        const [y, u] = e[p], E = (p + 1) % (n ? e.length : o), [m, A] = e[E];
        r += (m - y) * (A + u);
      }
      return r > 0 ? 1 : -1;
    }
  };
  Ie = function(t, i, s, b, f, c, h, d) {
    let a = [], e = [];
    const r = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    }, n = {
      elasticities: /* @__PURE__ */ new Map(),
      cltLayups: /* @__PURE__ */ new Map(),
      thicknesses: /* @__PURE__ */ new Map(),
      poissonsRatios: /* @__PURE__ */ new Map(),
      shearModuli: /* @__PURE__ */ new Map(),
      areas: /* @__PURE__ */ new Map(),
      torsionalConstants: /* @__PURE__ */ new Map(),
      momentsOfInertiaY: /* @__PURE__ */ new Map(),
      momentsOfInertiaZ: /* @__PURE__ */ new Map()
    }, o = new Map(i.map((u, E) => [
      E,
      /* @__PURE__ */ new Map()
    ])), p = new Map(i.map((u, E) => [
      E,
      /* @__PURE__ */ new Map()
    ])), y = ie(1e-4);
    for (let u = 0; u < i.length; u++) {
      const E = i[u], m = t[E][2];
      (c.get(u) ?? []).forEach((g) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const T = b[g].map((w) => t[w]), R = T.map((w, N) => N), S = (w) => {
          const N = f.get(w) ?? [];
          return new Map(N.map((I) => [
            I,
            t[s[I]]
          ]));
        }, B = S(u), x = u < i.length - 1 ? S(u + 1) : /* @__PURE__ */ new Map(), H = new Map([
          ...B,
          ...x
        ]), U = ((_b = (_a = d.get(g)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.meshSize) ?? 0.5, C = pe(T, Array.from(H.values())), { nodes: k, elements: z } = le({
          points: C,
          polygon: R,
          maxMeshSize: U
        }), { nodeMap: G, elementMap: D, elementsGlobal: X } = y.appendPatch({
          nodes: me(k, m),
          elements: z
        });
        ({ nodes: a, elements: e } = y.getMesh());
        for (const w of B.keys()) {
          const N = B.get(w), I = q(a, G, N, m);
          I !== null && p.get(u).set(w, I);
        }
        for (const w of x.keys()) {
          const N = x.get(w), I = q(a, G, N, m);
          I !== null && o.get(u + 1).set(w, I);
        }
        const v = (_c = d.get(g)) == null ? void 0 : _c.analysisInput, Z = ((_d = v == null ? void 0 : v.material) == null ? void 0 : _d.elasticity) ?? 1, J = (v == null ? void 0 : v.thickness) ?? 1, K = ((_e = v == null ? void 0 : v.material) == null ? void 0 : _e.poissonsRatio) ?? 1, V = v == null ? void 0 : v.cltLayup;
        D.forEach((w) => {
          var _a2;
          V ? (_a2 = n.cltLayups) == null ? void 0 : _a2.set(w, V) : (n.elasticities.set(w, Z), n.thicknesses.set(w, J), n.poissonsRatios.set(w, K));
        });
        const Q = ((_g = (_f = d.get(g)) == null ? void 0 : _f.analysisInput) == null ? void 0 : _g.areaLoad) ?? 0;
        r.loads = de(a, X, r.loads, Q, G);
      });
    }
    for (let u = 0; u < i.length; u++) (f.get(u) ?? []).forEach((m) => {
      var _a, _b;
      if (u === 0) {
        const S = t[s[m]], B = [
          S[0],
          S[1],
          0
        ];
        o.get(u).set(m, a.length), a.push(B);
      }
      const A = p.get(u).get(m), g = o.get(u).get(m);
      if (A === void 0 || g === void 0) throw new Error(`Column ${m} at story ${u} is not fully connected to slab nodes.`);
      const { nodes: M, elements: T } = he(a, A, g);
      u === 0 && r.supports.set(g, ((_b = (_a = h.get(m)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
        true,
        true,
        true,
        true,
        true,
        true
      ]);
      const R = e.length;
      T.forEach((S, B) => {
        const x = R + B;
        n.elasticities.set(x, 1e6), n.shearModuli.set(x, 1e6), n.areas.set(x, 1e6), n.torsionalConstants.set(x, 1e6), n.momentsOfInertiaY.set(x, 1e6), n.momentsOfInertiaZ.set(x, 1e6);
      }), a.push(...M), e.push(...T);
    });
    return {
      nodes: a,
      elements: e,
      nodeInputs: r,
      elementInputs: n
    };
  };
  function me(t, i) {
    return t.map((s) => [
      s[0],
      s[1],
      i
    ]);
  }
  function he(t, i, s) {
    const b = t[i], f = t[s];
    return !b || !f ? {
      nodes: [],
      elements: []
    } : {
      nodes: [],
      elements: [
        [
          i,
          s
        ]
      ]
    };
  }
  function de(t, i, s, b, f) {
    const c = new Set(f);
    return i.forEach((h) => {
      const [d, l, a] = h.map((n) => t[n]), e = ge(d, l, a), r = b * e / 3;
      h.forEach((n) => {
        if (c.has(n)) {
          const o = [
            0,
            0,
            r,
            0,
            0,
            0
          ], p = s.get(n) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          s.set(n, ae(p, o));
        }
      });
    }), s;
  }
  function ge(t, i, s) {
    const b = F(i, t), f = F(s, t);
    return ue(ce(b, f)) / 2;
  }
  function pe(t, i, s = 0.01) {
    const b = s * s, f = t.slice();
    for (const c of i) {
      let h = false;
      for (const d of f) {
        const l = c[0] - d[0], a = c[1] - d[1], e = c[2] - d[2];
        if (l * l + a * a + e * e <= b) {
          h = true;
          break;
        }
      }
      !h && be(c, t) && f.push(c);
    }
    return f;
  }
  function q(t, i, s, b, f = 0.01) {
    const c = [
      s[0],
      s[1],
      b
    ];
    let h = null, d = Number.POSITIVE_INFINITY;
    for (const l of i) {
      const a = t[l], e = a[0] - c[0], r = a[1] - c[1], n = a[2] - c[2], o = e * e + r * r + n * n;
      o < d && (d = o, h = l);
    }
    return d <= f * f ? h : null;
  }
  function be(t, i) {
    let s = 0;
    const b = t[0], f = t[1];
    for (let c = 0, h = i.length - 1; c < i.length; h = c++) {
      const d = i[c][0], l = i[c][1], a = i[h][0], e = i[h][1];
      l > f != e > f && b < (a - d) * (f - l) / (e - l) + d && s++;
    }
    return s % 2 !== 0;
  }
});
export {
  __tla,
  Ae as a,
  Ie as b,
  Te as c,
  Be as d,
  Ge as g
};
