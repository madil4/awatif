import { e as oe, B as R, a as se, F as re, f as D, M as ie, h as ae, S as q, P as le, i as F, j as O, k as j } from "./styles-Dc2qaz2G.js";
import { c as ue } from "./coupling-CX7jvXLk.js";
import { __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as ce, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
import { a as fe, s as Y, n as me, c as he } from "./pureFunctionsAny.generated-DgiBRKJh.js";
let Se, Ne, Re, Pe, Ce;
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
  Se = function() {
    const t = new oe(new R(), new se());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  Ne = function(t, s, r) {
    const d = new R(), f = 4, m = r.flatMap((b) => {
      const c = t[b], a = [
        c[0],
        c[1],
        c[2] - f
      ];
      return [
        ...c,
        ...a
      ];
    }), u = s.map((b) => de(b).map((c) => [
      ...t[c[0]],
      ...t[c[1]]
    ]).flat()).flat();
    return d.setAttribute("position", new re([
      ...m,
      ...u
    ], 3)), d;
  };
  function de(t) {
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
  Pe = function(t, s, r, d, f, m, u, b) {
    let a = [], e = [];
    const i = {
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
    }, o = new Map(s.map((l, w) => [
      w,
      /* @__PURE__ */ new Map()
    ])), h = new Map(s.map((l, w) => [
      w,
      /* @__PURE__ */ new Map()
    ])), y = ue(1e-4);
    for (let l = 0; l < s.length; l++) {
      const w = s[l], g = t[w][2];
      (m.get(l) ?? []).forEach((p) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const A = d[p].map((x) => t[x]), N = A.map((x, P) => P), G = (x) => {
          const P = f.get(x) ?? [];
          return new Map(P.map((S) => [
            S,
            t[r[S]]
          ]));
        }, B = G(l), T = l < s.length - 1 ? G(l + 1) : /* @__PURE__ */ new Map(), U = new Map([
          ...B,
          ...T
        ]), k = ((_b = (_a = b.get(p)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.meshSize) ?? 0.5, C = Me(A, Array.from(U.values())), { nodes: L, elements: z } = ce({
          points: C,
          polygon: N,
          maxMeshSize: k
        }), I = Math.max(1e-3, k * 0.02), { nodeMap: v, elementMap: K, elementsGlobal: J } = y.appendPatch({
          nodes: ge(L, g),
          elements: z
        });
        ({ nodes: a, elements: e } = y.getMesh());
        const _ = we(a, v);
        for (const x of B.keys()) {
          const P = B.get(x), S = X(a, v, _, P, g, I);
          S !== null && h.get(l).set(x, S);
        }
        for (const x of T.keys()) {
          const P = T.get(x), S = X(a, v, _, P, g, I);
          S !== null && o.get(l + 1).set(x, S);
        }
        const H = (_c = b.get(p)) == null ? void 0 : _c.analysisInput, Q = ((_d = H == null ? void 0 : H.material) == null ? void 0 : _d.elasticity) ?? 1, ee = (H == null ? void 0 : H.thickness) ?? 1, te = ((_e = H == null ? void 0 : H.material) == null ? void 0 : _e.poissonsRatio) ?? 1, W = H == null ? void 0 : H.cltLayup;
        K.forEach((x) => {
          var _a2;
          W ? (_a2 = n.cltLayups) == null ? void 0 : _a2.set(x, W) : (n.elasticities.set(x, Q), n.thicknesses.set(x, ee), n.poissonsRatios.set(x, te));
        });
        const ne = ((_g = (_f = b.get(p)) == null ? void 0 : _f.analysisInput) == null ? void 0 : _g.areaLoad) ?? 0;
        i.loads = be(a, J, i.loads, ne, v);
      });
    }
    for (let l = 0; l < s.length; l++) (f.get(l) ?? []).forEach((g) => {
      var _a, _b;
      if (l === 0) {
        const G = t[r[g]], B = [
          G[0],
          G[1],
          0
        ];
        o.get(l).set(g, a.length), a.push(B);
      }
      const E = h.get(l).get(g), p = o.get(l).get(g);
      if (E === void 0 || p === void 0) return;
      const { nodes: M, elements: A } = pe(a, E, p);
      l === 0 && i.supports.set(p, ((_b = (_a = u.get(g)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
        true,
        true,
        true,
        true,
        true,
        true
      ]);
      const N = e.length;
      A.forEach((G, B) => {
        const T = N + B;
        n.elasticities.set(T, 1e6), n.shearModuli.set(T, 1e6), n.areas.set(T, 1e6), n.torsionalConstants.set(T, 1e6), n.momentsOfInertiaY.set(T, 1e6), n.momentsOfInertiaZ.set(T, 1e6);
      }), a.push(...M), e.push(...A);
    });
    return {
      nodes: a,
      elements: e,
      nodeInputs: i,
      elementInputs: n
    };
  };
  function ge(t, s) {
    return t.map((r) => [
      r[0],
      r[1],
      s
    ]);
  }
  function pe(t, s, r) {
    const d = t[s], f = t[r];
    return !d || !f ? {
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
  function be(t, s, r, d, f) {
    const m = new Set(f);
    return s.forEach((u) => {
      const [b, c, a] = u.map((n) => t[n]), e = ye(b, c, a), i = d * e / 3;
      u.forEach((n) => {
        if (m.has(n)) {
          const o = [
            0,
            0,
            i,
            0,
            0,
            0
          ], h = r.get(n) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          r.set(n, fe(h, o));
        }
      });
    }), r;
  }
  function ye(t, s, r) {
    const d = Y(s, t), f = Y(r, t);
    return me(he(d, f)) / 2;
  }
  function Me(t, s, r = 0.01) {
    const d = r * r, f = t.slice();
    for (const m of s) {
      let u = false;
      for (const b of f) {
        const c = m[0] - b[0], a = m[1] - b[1];
        if (c * c + a * a <= d) {
          u = true;
          break;
        }
      }
      !u && xe(m, t, r) && f.push(m);
    }
    return f;
  }
  function X(t, s, r, d, f, m = 0.01) {
    if (s.length === 0) return null;
    const u = [
      d[0],
      d[1],
      f
    ], b = Z(u[0], u[1]), c = r.get(b);
    if (c !== void 0) return c;
    let a = null, e = Number.POSITIVE_INFINITY;
    for (const i of s) {
      const n = t[i], o = n[0] - u[0], h = n[1] - u[1], y = n[2] - u[2], l = o * o + h * h + y * y;
      l < e && (e = l, a = i);
    }
    return a === null ? null : e <= m * m ? a : null;
  }
  function we(t, s) {
    const r = /* @__PURE__ */ new Map();
    return s.forEach((d) => {
      const f = t[d];
      f && r.set(Z(f[0], f[1]), d);
    }), r;
  }
  function Z(t, s) {
    return `${Math.round(t * 1e6)}_${Math.round(s * 1e6)}`;
  }
  function xe(t, s, r = 1e-6) {
    if (Ee(t, s, r)) return true;
    let d = 0;
    const f = t[0], m = t[1];
    for (let u = 0, b = s.length - 1; u < s.length; b = u++) {
      const c = s[u][0], a = s[u][1], e = s[b][0], i = s[b][1];
      a > m != i > m && f < (e - c) * (m - a) / (i - a) + c && d++;
    }
    return d % 2 !== 0;
  }
  function Ee(t, s, r = 1e-6) {
    const d = t[0], f = t[1], m = r * r;
    for (let u = 0; u < s.length; u++) {
      const b = s[u], c = s[(u + 1) % s.length], a = b[0], e = b[1], i = c[0], n = c[1], o = i - a, h = n - e, y = d - a, l = f - e, w = o * o + h * h;
      if (w <= m) {
        const N = d - a, G = f - e;
        if (N * N + G * G <= m) return true;
        continue;
      }
      let g = (y * o + l * h) / w;
      g = Math.max(0, Math.min(1, g));
      const E = a + g * o, p = e + g * h, M = d - E, A = f - p;
      if (M * M + A * A <= m) return true;
    }
    return false;
  }
  function V(t, s = false) {
    const r = t[0].index !== null, d = new Set(Object.keys(t[0].attributes)), f = new Set(Object.keys(t[0].morphAttributes)), m = {}, u = {}, b = t[0].morphTargetsRelative, c = new R();
    let a = 0;
    for (let e = 0; e < t.length; ++e) {
      const i = t[e];
      let n = 0;
      if (r !== (i.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const o in i.attributes) {
        if (!d.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + o + '" attribute exists among all geometries, or in none of them.'), null;
        m[o] === void 0 && (m[o] = []), m[o].push(i.attributes[o]), n++;
      }
      if (n !== d.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (b !== i.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const o in i.morphAttributes) {
        if (!f.has(o)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        u[o] === void 0 && (u[o] = []), u[o].push(i.morphAttributes[o]);
      }
      if (s) {
        let o;
        if (r) o = i.index.count;
        else if (i.attributes.position !== void 0) o = i.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        c.addGroup(a, o, e), a += o;
      }
    }
    if (r) {
      let e = 0;
      const i = [];
      for (let n = 0; n < t.length; ++n) {
        const o = t[n].index;
        for (let h = 0; h < o.count; ++h) i.push(o.getX(h) + e);
        e += t[n].attributes.position.count;
      }
      c.setIndex(i);
    }
    for (const e in m) {
      const i = $(m[e]);
      if (!i) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      c.setAttribute(e, i);
    }
    for (const e in u) {
      const i = u[e][0].length;
      if (i === 0) break;
      c.morphAttributes = c.morphAttributes || {}, c.morphAttributes[e] = [];
      for (let n = 0; n < i; ++n) {
        const o = [];
        for (let y = 0; y < u[e].length; ++y) o.push(u[e][y][n]);
        const h = $(o);
        if (!h) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        c.morphAttributes[e].push(h);
      }
    }
    return c;
  }
  function $(t) {
    let s, r, d, f = -1, m = 0;
    for (let a = 0; a < t.length; ++a) {
      const e = t[a];
      if (s === void 0 && (s = e.array.constructor), s !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (r === void 0 && (r = e.itemSize), r !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (d === void 0 && (d = e.normalized), d !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (f === -1 && (f = e.gpuType), f !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      m += e.count * r;
    }
    const u = new s(m), b = new D(u, r, d);
    let c = 0;
    for (let a = 0; a < t.length; ++a) {
      const e = t[a];
      if (e.isInterleavedBufferAttribute) {
        const i = c / r;
        for (let n = 0, o = e.count; n < o; n++) for (let h = 0; h < r; h++) {
          const y = e.getComponent(n, h);
          b.setComponent(n + i, h, y);
        }
      } else u.set(e.array, c);
      c += e.count * r;
    }
    return f !== void 0 && (b.gpuType = f), b;
  }
  Ce = function() {
    return new ie(new R(), new ae({
      color: 16770764
    }));
  };
  Re = function(t, s, r) {
    var _a;
    const m = [];
    return ((_a = s[0]) == null ? void 0 : _a.length) > 2 && m.push(u(t, s)), r.length > 0 && m.push(b(t, r)), m.length > 0 ? V(m) : new R();
    function u(e, i, n = 0.3) {
      const o = [];
      for (let y = 0; y < i.length; y++) {
        const l = [];
        for (let M = 0; M < i[y].length; M++) {
          const A = i[y][M];
          l.push(e[A]);
        }
        if (l.length < 3) continue;
        c(l) && l.pop();
        const w = a(l), g = h(l, w * 0.3 / 2), E = new q();
        new le();
        for (let M = 0; M < g.length; M++) M == 0 ? E.moveTo(g[0][0], g[0][1]) : E.lineTo(g[M][0], g[M][1]);
        const p = new F(E, {
          depth: n,
          bevelEnabled: false
        });
        p.translate(0, 0, g[0][2] - n / 2), o.push(p);
      }
      return V(o);
      function h(y, l = 0) {
        const w = [], g = [];
        for (let p = 0; p < y.length; p++) g.push(new O(y[p][0], y[p][1]));
        let E = new D(new Float32Array([
          l,
          0,
          0
        ]), 3);
        for (let p = 0; p < g.length; p++) {
          let M = new O().subVectors(g[p - 1 < 0 ? g.length - 1 : p - 1], g[p]), A = new O().subVectors(g[p + 1 == g.length ? 0 : p + 1], g[p]), B = (A.angle() - M.angle()) * 0.5, T = A.angle() + Math.PI * 0.5, U = Math.tan(B - Math.PI * 0.5), k = new j().set(1, 0, 0, 0, -U, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), C = T, L = new j().set(Math.cos(C), -Math.sin(C), 0, 0, Math.sin(C), Math.cos(C), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), z = new j().set(1, 0, 0, g[p].x, 0, 1, 0, g[p].y, 0, 0, 1, 0, 0, 0, 0, 1), I = E.clone();
          I.needsUpdate = true, I.applyMatrix4(k), I.applyMatrix4(L), I.applyMatrix4(z), w.push([
            I.getX(0),
            I.getY(0),
            y[p][2]
          ]);
        }
        return w;
      }
    }
    function b(e, i) {
      const n = [], o = new q();
      o.lineTo(0 + 0.3, 0), o.lineTo(0 + 0.3, 0 + 0.3), o.lineTo(0, 0 + 0.3);
      for (let h = 0; h < i.length; h++) {
        const y = e[i[h]], l = new F(o, {
          depth: -4,
          bevelEnabled: false
        });
        l.translate(y[0] - 0.3 / 2, y[1] - 0.3 / 2, y[2]), n.push(l);
      }
      return V(n);
    }
    function c(e) {
      let i = false;
      const n = e[0], o = e[e.length - 1];
      return n[0] == o[0] && n[1] == o[1] && n[2] == o[2] && (i = true), i;
    }
    function a(e) {
      let i = 0;
      const n = c(e), o = n ? e.length - 1 : e.length;
      for (let h = 0; h < o; h++) {
        const [y, l] = e[h], w = (h + 1) % (n ? e.length : o), [g, E] = e[w];
        i += (g - y) * (E + l);
      }
      return i > 0 ? 1 : -1;
    }
  };
});
export {
  __tla,
  Se as a,
  Ne as b,
  Re as c,
  Pe as d,
  Ce as g
};
