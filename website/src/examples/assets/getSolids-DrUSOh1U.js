import { g as D, __tla as __tla_0 } from "./getMesh-BFRjMVyf.js";
import { a as X, s as V, n as ee, c as te, d as ne, m as oe } from "./pureFunctionsAny.generated-Dh3LO6N2.js";
import { e as se, B as P, b as re, F as ie, f as Z, M as le, h as ae, S as j, P as ue, i as W, j as _, k as L } from "./styles-CcZBryOO.js";
let we, ye, Me, Ae, Ee;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  ye = function(n, u, i, p, b, f, m, c) {
    let o = [], a = [];
    const e = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    }, t = {
      elasticities: /* @__PURE__ */ new Map(),
      thicknesses: /* @__PURE__ */ new Map(),
      poissonsRatios: /* @__PURE__ */ new Map(),
      shearModuli: /* @__PURE__ */ new Map(),
      areas: /* @__PURE__ */ new Map(),
      torsionalConstants: /* @__PURE__ */ new Map(),
      momentsOfInertiaY: /* @__PURE__ */ new Map(),
      momentsOfInertiaZ: /* @__PURE__ */ new Map()
    }, l = new Map(u.map((r, h) => [
      Number(h),
      /* @__PURE__ */ new Map()
    ])), s = new Map(u.map((r, h) => [
      Number(h),
      /* @__PURE__ */ new Map()
    ]));
    for (let r in u) {
      const h = u[r], y = n[h][2];
      f.get(Number(r)).forEach((g) => {
        var _a, _b, _c, _d;
        const d = p[g].map((M) => n[M]), w = d.map((M, A) => A), N = (M) => {
          const A = b.get(M) ?? [];
          return new Map(A.map((R) => [
            R,
            n[i[R]]
          ]));
        }, C = N(Number(r)), T = Number(r) < u.length - 1 ? N(Number(r) + 1) : /* @__PURE__ */ new Map(), E = new Map([
          ...C,
          ...T
        ]), k = he(d, Array.from(E.values())), { nodes: S, elements: H } = D({
          points: k,
          polygon: w,
          maxMeshSize: 0.2
        }), v = o.length, I = a.length, U = H.map((M) => M.map((A) => A + v)), G = S.map((M, A) => A + v), q = H.map((M, A) => A + I);
        o = [
          ...o,
          ...ce(S, y)
        ], a = [
          ...a,
          ...U
        ];
        for (const M of C.keys()) {
          const A = C.get(M), R = F(o, G, A, y);
          R !== null && s.get(Number(r)).set(M, R);
        }
        for (const M of T.keys()) {
          const A = T.get(M), R = F(o, G, A, y);
          R !== null && l.get(Number(r) + 1).set(M, R);
        }
        const z = (_a = c.get(g)) == null ? void 0 : _a.analysisInput, $ = ((_b = z == null ? void 0 : z.material) == null ? void 0 : _b.elasticity) ?? 1, J = (z == null ? void 0 : z.thickness) ?? 1, K = ((_c = z == null ? void 0 : z.material) == null ? void 0 : _c.poissonsRatio) ?? 1;
        q.forEach((M) => {
          t.elasticities.set(M, $), t.thicknesses.set(M, J), t.poissonsRatios.set(M, K);
        });
        const Q = ((_d = c.get(g).analysisInput) == null ? void 0 : _d.areaLoad) ?? 0;
        e.loads = me(o, U, e.loads, Q, G);
      });
    }
    for (let r = 0; r < u.length; r++) b.get(r).forEach((y) => {
      var _a, _b;
      if (r === 0) {
        const T = n[i[y]], E = [
          T[0],
          T[1],
          0
        ];
        l.get(r).set(y, o.length), o.push(E);
      }
      const B = s.get(r).get(y), g = l.get(r).get(y), { nodes: x, elements: d } = fe(o, B, g);
      r === 0 && e.supports.set(g, ((_b = (_a = m.get(y)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
        true,
        true,
        true,
        true,
        true,
        true
      ]);
      const w = a.length;
      d.forEach((T, E) => {
        t.elasticities.set(w + E, 1e6), t.shearModuli.set(w + E, 1e6), t.areas.set(w + E, 1e6), t.torsionalConstants.set(w + E, 1e6), t.momentsOfInertiaY.set(w + E, 1e6), t.momentsOfInertiaZ.set(w + E, 1e6);
      }), o = [
        ...o,
        ...x
      ], a = [
        ...a,
        ...d
      ];
      const N = o.length, C = a.length;
      x.map((T, E) => E + N), d.map((T, E) => E + C);
    });
    return {
      nodes: o,
      elements: a,
      nodeInputs: e,
      elementInputs: t
    };
  };
  function ce(n, u) {
    return n.map((i) => [
      i[0],
      i[1],
      u
    ]);
  }
  function fe(n, u, i, p = 1) {
    const b = n[u], f = n[i];
    if (!b || !f) return {
      nodes: [],
      elements: []
    };
    let m = [], c = [];
    const o = V(f, b), a = ne(o, p);
    for (let e = 0; e < p - 1; e++) m.push(X(b, oe(a, e + 1)));
    if (p == 1) c.push([
      u,
      i
    ]);
    else {
      let e = n.length;
      for (let t = 0; t < p; t++) t == 0 ? c.push([
        u,
        e
      ]) : t == p - 1 ? c.push([
        e,
        i
      ]) : (c.push([
        e,
        e + 1
      ]), e++);
    }
    return {
      nodes: m,
      elements: c
    };
  }
  function me(n, u, i, p, b) {
    return u.forEach((m) => {
      const [c, o, a] = m.map((l) => n[l]), e = f(c, o, a), t = p * e / 3;
      m.forEach((l) => {
        if (b.includes(l)) {
          const s = [
            0,
            0,
            -t,
            0,
            0,
            0
          ], r = i.get(l) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          i.set(l, X(r, s));
        }
      });
    }), i;
    function f(m, c, o) {
      const a = V(c, m), e = V(o, m);
      return ee(te(a, e)) / 2;
    }
  }
  function he(n, u, i = 0.01) {
    const p = i * i, b = n.slice();
    for (const f of u) {
      let m = false;
      for (const c of n) {
        const o = f[0] - c[0], a = f[1] - c[1], e = f[2] - c[2];
        if (o * o + a * a + e * e <= p) {
          m = true;
          break;
        }
      }
      m || b.push(f);
    }
    return b;
  }
  function F(n, u, i, p, b = 0.1) {
    const f = [
      i[0],
      i[1],
      p
    ];
    for (const m of u) {
      const c = n[m], o = c[0] - f[0], a = c[1] - f[1], e = c[2] - f[2];
      if (o * o + a * a + e * e <= b * b) return m;
    }
    return null;
  }
  we = function() {
    const n = new se(new P(), new re());
    return n.frustumCulled = false, n.material.depthTest = false, n;
  };
  Me = function(n, u, i) {
    const p = new P(), b = 4, f = i.flatMap((c) => {
      const o = n[c], a = [
        o[0],
        o[1],
        o[2] - b
      ];
      return [
        ...o,
        ...a
      ];
    }), m = u.map((c) => ge(c).map((o) => [
      ...n[o[0]],
      ...n[o[1]]
    ]).flat()).flat();
    return p.setAttribute("position", new ie([
      ...f,
      ...m
    ], 3)), p;
  };
  function ge(n) {
    if (n.length === 2) return [
      n
    ];
    const u = [];
    for (let i = 0; i < n.length; i++) u.push([
      n[i],
      n[(i + 1) % n.length]
    ]);
    return u;
  }
  function O(n, u = false) {
    const i = n[0].index !== null, p = new Set(Object.keys(n[0].attributes)), b = new Set(Object.keys(n[0].morphAttributes)), f = {}, m = {}, c = n[0].morphTargetsRelative, o = new P();
    let a = 0;
    for (let e = 0; e < n.length; ++e) {
      const t = n[e];
      let l = 0;
      if (i !== (t.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const s in t.attributes) {
        if (!p.has(s)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + s + '" attribute exists among all geometries, or in none of them.'), null;
        f[s] === void 0 && (f[s] = []), f[s].push(t.attributes[s]), l++;
      }
      if (l !== p.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (c !== t.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const s in t.morphAttributes) {
        if (!b.has(s)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        m[s] === void 0 && (m[s] = []), m[s].push(t.morphAttributes[s]);
      }
      if (u) {
        let s;
        if (i) s = t.index.count;
        else if (t.attributes.position !== void 0) s = t.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        o.addGroup(a, s, e), a += s;
      }
    }
    if (i) {
      let e = 0;
      const t = [];
      for (let l = 0; l < n.length; ++l) {
        const s = n[l].index;
        for (let r = 0; r < s.count; ++r) t.push(s.getX(r) + e);
        e += n[l].attributes.position.count;
      }
      o.setIndex(t);
    }
    for (const e in f) {
      const t = Y(f[e]);
      if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      o.setAttribute(e, t);
    }
    for (const e in m) {
      const t = m[e][0].length;
      if (t === 0) break;
      o.morphAttributes = o.morphAttributes || {}, o.morphAttributes[e] = [];
      for (let l = 0; l < t; ++l) {
        const s = [];
        for (let h = 0; h < m[e].length; ++h) s.push(m[e][h][l]);
        const r = Y(s);
        if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        o.morphAttributes[e].push(r);
      }
    }
    return o;
  }
  function Y(n) {
    let u, i, p, b = -1, f = 0;
    for (let a = 0; a < n.length; ++a) {
      const e = n[a];
      if (u === void 0 && (u = e.array.constructor), u !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (i === void 0 && (i = e.itemSize), i !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (p === void 0 && (p = e.normalized), p !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (b === -1 && (b = e.gpuType), b !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      f += e.count * i;
    }
    const m = new u(f), c = new Z(m, i, p);
    let o = 0;
    for (let a = 0; a < n.length; ++a) {
      const e = n[a];
      if (e.isInterleavedBufferAttribute) {
        const t = o / i;
        for (let l = 0, s = e.count; l < s; l++) for (let r = 0; r < i; r++) {
          const h = e.getComponent(l, r);
          c.setComponent(l + t, r, h);
        }
      } else m.set(e.array, o);
      o += e.count * i;
    }
    return b !== void 0 && (c.gpuType = b), c;
  }
  Ee = function() {
    return new le(new P(), new ae({
      color: 16770764
    }));
  };
  Ae = function(n, u, i) {
    var _a;
    const f = [];
    return ((_a = u[0]) == null ? void 0 : _a.length) > 2 && f.push(m(n, u)), i.length > 0 && f.push(c(n, i)), f.length > 0 ? O(f) : new P();
    function m(e, t, l = 0.3) {
      const s = [];
      for (let h = 0; h < t.length; h++) {
        const y = [];
        for (let w = 0; w < t[h].length; w++) {
          const N = t[h][w];
          y.push(e[N]);
        }
        if (y.length < 3) continue;
        o(y) && y.pop();
        const B = a(y), g = r(y, B * 0.3 / 2), x = new j();
        new ue();
        for (let w = 0; w < g.length; w++) w == 0 ? x.moveTo(g[0][0], g[0][1]) : x.lineTo(g[w][0], g[w][1]);
        const d = new W(x, {
          depth: l,
          bevelEnabled: false
        });
        d.translate(0, 0, g[0][2] - l / 2), s.push(d);
      }
      return O(s);
      function r(h, y = 0) {
        const B = [], g = [];
        for (let d = 0; d < h.length; d++) g.push(new _(h[d][0], h[d][1]));
        let x = new Z(new Float32Array([
          y,
          0,
          0
        ]), 3);
        for (let d = 0; d < g.length; d++) {
          let w = new _().subVectors(g[d - 1 < 0 ? g.length - 1 : d - 1], g[d]), N = new _().subVectors(g[d + 1 == g.length ? 0 : d + 1], g[d]), E = (N.angle() - w.angle()) * 0.5, k = N.angle() + Math.PI * 0.5, S = Math.tan(E - Math.PI * 0.5), H = new L().set(1, 0, 0, 0, -S, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), v = k, I = new L().set(Math.cos(v), -Math.sin(v), 0, 0, Math.sin(v), Math.cos(v), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), U = new L().set(1, 0, 0, g[d].x, 0, 1, 0, g[d].y, 0, 0, 1, 0, 0, 0, 0, 1), G = x.clone();
          G.needsUpdate = true, G.applyMatrix4(H), G.applyMatrix4(I), G.applyMatrix4(U), B.push([
            G.getX(0),
            G.getY(0),
            h[d][2]
          ]);
        }
        return B;
      }
    }
    function c(e, t) {
      const l = [], s = new j();
      s.lineTo(0 + 0.3, 0), s.lineTo(0 + 0.3, 0 + 0.3), s.lineTo(0, 0 + 0.3);
      for (let r = 0; r < t.length; r++) {
        const h = e[t[r]], y = new W(s, {
          depth: -4,
          bevelEnabled: false
        });
        y.translate(h[0] - 0.3 / 2, h[1] - 0.3 / 2, h[2]), l.push(y);
      }
      return O(l);
    }
    function o(e) {
      let t = false;
      const l = e[0], s = e[e.length - 1];
      return l[0] == s[0] && l[1] == s[1] && l[2] == s[2] && (t = true), t;
    }
    function a(e) {
      let t = 0;
      const l = o(e), s = l ? e.length - 1 : e.length;
      for (let r = 0; r < s; r++) {
        const [h, y] = e[r], B = (r + 1) % (l ? e.length : s), [g, x] = e[B];
        t += (g - h) * (x + y);
      }
      return t > 0 ? 1 : -1;
    }
  };
});
export {
  __tla,
  we as a,
  ye as b,
  Me as c,
  Ae as d,
  Ee as g
};
