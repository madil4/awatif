import { e as ne, B as R, a as oe, F as se, f as $, M as re, h as ie, S as W, i as q, j as z, k as O } from "./styles-I_-DKBYJ.js";
import { c as le } from "./coupling-CX7jvXLk.js";
import { __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as ae, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
import { a as ue, s as F, n as ce, c as fe } from "./pureFunctionsAny.generated-DgiBRKJh.js";
let Ie, Be, Se, Ce, Ne;
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
  Ie = function() {
    const t = new ne(new R(), new oe());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  Be = function(t, s, r) {
    const h = new R(), f = 4, u = r.flatMap((p) => {
      const a = t[p], l = [
        a[0],
        a[1],
        a[2] - f
      ];
      return [
        ...a,
        ...l
      ];
    }), d = s.map((p) => me(p).map((a) => [
      ...t[a[0]],
      ...t[a[1]]
    ]).flat()).flat();
    return h.setAttribute("position", new se([
      ...u,
      ...d
    ], 3)), h;
  };
  function me(t) {
    if (t.length === 2) return [
      t
    ];
    const s = [];
    for (let r = 0; r < t.length; r++) s.push([
      t[r],
      t[(r + 1) % t.length]
    ]);
    return s;
  }
  function j(t, s = false) {
    const r = t[0].index !== null, h = new Set(Object.keys(t[0].attributes)), f = new Set(Object.keys(t[0].morphAttributes)), u = {}, d = {}, p = t[0].morphTargetsRelative, a = new R();
    let l = 0;
    for (let e = 0; e < t.length; ++e) {
      const i = t[e];
      let o = 0;
      if (r !== (i.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const n in i.attributes) {
        if (!h.has(n)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + n + '" attribute exists among all geometries, or in none of them.'), null;
        u[n] === void 0 && (u[n] = []), u[n].push(i.attributes[n]), o++;
      }
      if (o !== h.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (p !== i.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const n in i.morphAttributes) {
        if (!f.has(n)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        d[n] === void 0 && (d[n] = []), d[n].push(i.morphAttributes[n]);
      }
      if (s) {
        let n;
        if (r) n = i.index.count;
        else if (i.attributes.position !== void 0) n = i.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        a.addGroup(l, n, e), l += n;
      }
    }
    if (r) {
      let e = 0;
      const i = [];
      for (let o = 0; o < t.length; ++o) {
        const n = t[o].index;
        for (let m = 0; m < n.count; ++m) i.push(n.getX(m) + e);
        e += t[o].attributes.position.count;
      }
      a.setIndex(i);
    }
    for (const e in u) {
      const i = Y(u[e]);
      if (!i) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      a.setAttribute(e, i);
    }
    for (const e in d) {
      const i = d[e][0].length;
      if (i === 0) break;
      a.morphAttributes = a.morphAttributes || {}, a.morphAttributes[e] = [];
      for (let o = 0; o < i; ++o) {
        const n = [];
        for (let y = 0; y < d[e].length; ++y) n.push(d[e][y][o]);
        const m = Y(n);
        if (!m) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        a.morphAttributes[e].push(m);
      }
    }
    return a;
  }
  function Y(t) {
    let s, r, h, f = -1, u = 0;
    for (let l = 0; l < t.length; ++l) {
      const e = t[l];
      if (s === void 0 && (s = e.array.constructor), s !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (r === void 0 && (r = e.itemSize), r !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (h === void 0 && (h = e.normalized), h !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (f === -1 && (f = e.gpuType), f !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      u += e.count * r;
    }
    const d = new s(u), p = new $(d, r, h);
    let a = 0;
    for (let l = 0; l < t.length; ++l) {
      const e = t[l];
      if (e.isInterleavedBufferAttribute) {
        const i = a / r;
        for (let o = 0, n = e.count; o < n; o++) for (let m = 0; m < r; m++) {
          const y = e.getComponent(o, m);
          p.setComponent(o + i, m, y);
        }
      } else d.set(e.array, a);
      a += e.count * r;
    }
    return f !== void 0 && (p.gpuType = f), p;
  }
  Ne = function() {
    return new re(new R(), new ie({
      color: 16770764
    }));
  };
  Se = function(t, s, r) {
    var _a;
    const u = [];
    return ((_a = s[0]) == null ? void 0 : _a.length) > 2 && u.push(d(t, s)), r.length > 0 && u.push(p(t, r)), u.length > 0 ? j(u) : new R();
    function d(e, i, o = 0.3) {
      const n = [];
      for (let y = 0; y < i.length; y++) {
        const c = [];
        for (let x = 0; x < i[y].length; x++) {
          const E = i[y][x];
          c.push(e[E]);
        }
        if (c.length < 3) continue;
        a(c) && c.pop();
        const M = l(c), g = m(c, M * 0.3 / 2), A = new W();
        for (let x = 0; x < g.length; x++) x == 0 ? A.moveTo(g[0][0], g[0][1]) : A.lineTo(g[x][0], g[x][1]);
        const b = new q(A, {
          depth: o,
          bevelEnabled: false
        });
        b.translate(0, 0, g[0][2] - o / 2), n.push(b);
      }
      return j(n);
      function m(y, c = 0) {
        const M = [], g = [];
        for (let b = 0; b < y.length; b++) g.push(new z(y[b][0], y[b][1]));
        let A = new $(new Float32Array([
          c,
          0,
          0
        ]), 3);
        for (let b = 0; b < g.length; b++) {
          let x = new z().subVectors(g[b - 1 < 0 ? g.length - 1 : b - 1], g[b]), E = new z().subVectors(g[b + 1 == g.length ? 0 : b + 1], g[b]), B = (E.angle() - x.angle()) * 0.5, T = E.angle() + Math.PI * 0.5, v = Math.tan(B - Math.PI * 0.5), H = new O().set(1, 0, 0, 0, -v, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), P = T, U = new O().set(Math.cos(P), -Math.sin(P), 0, 0, Math.sin(P), Math.cos(P), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), L = new O().set(1, 0, 0, g[b].x, 0, 1, 0, g[b].y, 0, 0, 1, 0, 0, 0, 0, 1), G = A.clone();
          G.needsUpdate = true, G.applyMatrix4(H), G.applyMatrix4(U), G.applyMatrix4(L), M.push([
            G.getX(0),
            G.getY(0),
            y[b][2]
          ]);
        }
        return M;
      }
    }
    function p(e, i) {
      const o = [], n = new W();
      n.lineTo(0 + 0.3, 0), n.lineTo(0 + 0.3, 0 + 0.3), n.lineTo(0, 0 + 0.3);
      for (let m = 0; m < i.length; m++) {
        const y = e[i[m]], c = new q(n, {
          depth: -4,
          bevelEnabled: false
        });
        c.translate(y[0] - 0.3 / 2, y[1] - 0.3 / 2, y[2]), o.push(c);
      }
      return j(o);
    }
    function a(e) {
      let i = false;
      const o = e[0], n = e[e.length - 1];
      return o[0] == n[0] && o[1] == n[1] && o[2] == n[2] && (i = true), i;
    }
    function l(e) {
      let i = 0;
      const o = a(e), n = o ? e.length - 1 : e.length;
      for (let m = 0; m < n; m++) {
        const [y, c] = e[m], M = (m + 1) % (o ? e.length : n), [g, A] = e[M];
        i += (g - y) * (A + c);
      }
      return i > 0 ? 1 : -1;
    }
  };
  Ce = function(t, s, r, h, f, u, d, p) {
    var _a, _b;
    let l = [], e = [];
    const i = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    }, o = {
      elasticities: /* @__PURE__ */ new Map(),
      cltLayups: /* @__PURE__ */ new Map(),
      thicknesses: /* @__PURE__ */ new Map(),
      poissonsRatios: /* @__PURE__ */ new Map(),
      shearModuli: /* @__PURE__ */ new Map(),
      areas: /* @__PURE__ */ new Map(),
      torsionalConstants: /* @__PURE__ */ new Map(),
      momentsOfInertiaY: /* @__PURE__ */ new Map(),
      momentsOfInertiaZ: /* @__PURE__ */ new Map()
    }, n = new Map(s.map((c, M) => [
      M,
      /* @__PURE__ */ new Map()
    ])), m = new Map(s.map((c, M) => [
      M,
      /* @__PURE__ */ new Map()
    ])), y = le(1e-4);
    for (let c = 0; c < s.length; c++) {
      const M = s[c], g = t[M][2];
      (u.get(c) ?? []).forEach((b) => {
        var _a2, _b2, _c, _d, _e, _f, _g;
        const E = h[b].map((w) => t[w]), S = E.map((w, C) => C), I = (w) => {
          const C = f.get(w) ?? [];
          return new Map(C.map((N) => [
            N,
            t[r[N]]
          ]));
        }, B = I(c), T = c < s.length - 1 ? I(c + 1) : /* @__PURE__ */ new Map(), v = new Map([
          ...B,
          ...T
        ]), H = ((_b2 = (_a2 = p.get(b)) == null ? void 0 : _a2.analysisInput) == null ? void 0 : _b2.meshSize) ?? 0.5, P = be(E, Array.from(v.values())), { nodes: U, elements: L } = ae({
          points: P,
          polygon: S,
          maxMeshSize: H
        }), { nodeMap: G, elementMap: Z, elementsGlobal: K } = y.appendPatch({
          nodes: he(U, g),
          elements: L
        });
        ({ nodes: l, elements: e } = y.getMesh());
        const V = ye(l, G);
        for (const w of B.keys()) {
          const C = B.get(w), N = X(l, G, V, C, g);
          N !== null && m.get(c).set(w, N);
        }
        for (const w of T.keys()) {
          const C = T.get(w), N = X(l, G, V, C, g);
          N !== null && n.get(c + 1).set(w, N);
        }
        const k = (_c = p.get(b)) == null ? void 0 : _c.analysisInput, J = ((_d = k == null ? void 0 : k.material) == null ? void 0 : _d.elasticity) ?? 1, Q = (k == null ? void 0 : k.thickness) ?? 1, ee = ((_e = k == null ? void 0 : k.material) == null ? void 0 : _e.poissonsRatio) ?? 1, _ = k == null ? void 0 : k.cltLayup;
        Z.forEach((w) => {
          var _a3;
          _ ? (_a3 = o.cltLayups) == null ? void 0 : _a3.set(w, _) : (o.elasticities.set(w, J), o.thicknesses.set(w, Q), o.poissonsRatios.set(w, ee));
        });
        const te = ((_g = (_f = p.get(b)) == null ? void 0 : _f.analysisInput) == null ? void 0 : _g.areaLoad) ?? 0;
        i.loads = ge(l, K, i.loads, te, G);
      });
    }
    for (let c = 0; c < s.length; c++) {
      const M = f.get(c) ?? [];
      for (const g of M) {
        if (c === 0) {
          const I = t[r[g]], B = [
            I[0],
            I[1],
            0
          ];
          n.get(c).set(g, l.length), l.push(B);
        }
        const A = m.get(c).get(g), b = n.get(c).get(g);
        if (A === void 0 || b === void 0) continue;
        const { nodes: x, elements: E } = de(l, A, b);
        c === 0 && i.supports.set(b, ((_b = (_a = d.get(g)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
          true,
          true,
          true,
          true,
          true,
          true
        ]);
        const S = e.length;
        E.forEach((I, B) => {
          const T = S + B;
          o.elasticities.set(T, 1e6), o.shearModuli.set(T, 1e6), o.areas.set(T, 1e6), o.torsionalConstants.set(T, 1e6), o.momentsOfInertiaY.set(T, 1e6), o.momentsOfInertiaZ.set(T, 1e6);
        }), l.push(...x), e.push(...E);
      }
    }
    return {
      nodes: l,
      elements: e,
      nodeInputs: i,
      elementInputs: o
    };
  };
  function he(t, s) {
    return t.map((r) => [
      r[0],
      r[1],
      s
    ]);
  }
  function de(t, s, r) {
    const h = t[s], f = t[r];
    return !h || !f ? {
      nodes: [],
      elements: []
    } : {
      nodes: [],
      elements: [
        [
          s,
          r
        ]
      ]
    };
  }
  function ge(t, s, r, h, f) {
    const u = new Set(f);
    return s.forEach((d) => {
      const [p, a, l] = d.map((o) => t[o]), e = pe(p, a, l), i = h * e / 3;
      d.forEach((o) => {
        if (u.has(o)) {
          const n = [
            0,
            0,
            i,
            0,
            0,
            0
          ], m = r.get(o) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          r.set(o, ue(m, n));
        }
      });
    }), r;
  }
  function pe(t, s, r) {
    const h = F(s, t), f = F(r, t);
    return ce(fe(h, f)) / 2;
  }
  function be(t, s, r = 0.01) {
    const h = r * r, f = t.slice();
    for (const u of s) {
      let d = false;
      for (const p of f) {
        const a = u[0] - p[0], l = u[1] - p[1];
        if (a * a + l * l <= h) {
          d = true;
          break;
        }
      }
      !d && Me(u, t, r) && f.push(u);
    }
    return f;
  }
  function X(t, s, r, h, f) {
    if (s.length === 0) return null;
    const u = [
      h[0],
      h[1],
      f
    ], d = D(u[0], u[1]), p = r.get(d);
    if (p !== void 0) return p;
    let a = null, l = Number.POSITIVE_INFINITY;
    for (const e of s) {
      const i = t[e], o = i[0] - u[0], n = i[1] - u[1], m = i[2] - u[2], y = o * o + n * n + m * m;
      y < l && (l = y, a = e);
    }
    return a === null ? null : a;
  }
  function ye(t, s) {
    const r = /* @__PURE__ */ new Map();
    return s.forEach((h) => {
      const f = t[h];
      f && r.set(D(f[0], f[1]), h);
    }), r;
  }
  function D(t, s) {
    return `${Math.round(t * 1e6)}_${Math.round(s * 1e6)}`;
  }
  function Me(t, s, r = 1e-6) {
    if (xe(t, s, r)) return true;
    let h = 0;
    const f = t[0], u = t[1];
    for (let d = 0, p = s.length - 1; d < s.length; p = d++) {
      const a = s[d][0], l = s[d][1], e = s[p][0], i = s[p][1];
      l > u != i > u && f < (e - a) * (u - l) / (i - l) + a && h++;
    }
    return h % 2 !== 0;
  }
  function xe(t, s, r = 1e-6) {
    const h = t[0], f = t[1], u = r * r;
    for (let d = 0; d < s.length; d++) {
      const p = s[d], a = s[(d + 1) % s.length], l = p[0], e = p[1], i = a[0], o = a[1], n = i - l, m = o - e, y = h - l, c = f - e, M = n * n + m * m;
      if (M <= u) {
        const S = h - l, I = f - e;
        if (S * S + I * I <= u) return true;
        continue;
      }
      let g = (y * n + c * m) / M;
      g = Math.max(0, Math.min(1, g));
      const A = l + g * n, b = e + g * m, x = h - A, E = f - b;
      if (x * x + E * E <= u) return true;
    }
    return false;
  }
});
export {
  __tla,
  Ie as a,
  Be as b,
  Se as c,
  Ce as d,
  Ne as g
};
