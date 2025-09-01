import { g as ee, __tla as __tla_0 } from "./getMesh-DmUdekin.js";
import { a as Z, s as V, n as te, c as ne, d as se, m as oe } from "./pureFunctionsAny.generated-Dh3LO6N2.js";
import { f as re, B as C, b as ie, F as le, h as q, M as ae, i as ue, S as W, P as ce, j as F, k as _, l as L } from "./styles-CHgmIz-C.js";
let Ee, Me, Ae, Te, xe;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  Me = function(t, l, o, d, h, u, m, f) {
    let n = [], c = [];
    const e = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    }, s = {
      elasticities: /* @__PURE__ */ new Map(),
      thicknesses: /* @__PURE__ */ new Map(),
      poissonsRatios: /* @__PURE__ */ new Map(),
      shearModuli: /* @__PURE__ */ new Map(),
      areas: /* @__PURE__ */ new Map(),
      torsionalConstants: /* @__PURE__ */ new Map(),
      momentsOfInertiaY: /* @__PURE__ */ new Map(),
      momentsOfInertiaZ: /* @__PURE__ */ new Map()
    }, a = new Map(l.map((i, g) => [
      Number(g),
      /* @__PURE__ */ new Map()
    ])), r = new Map(l.map((i, g) => [
      Number(g),
      /* @__PURE__ */ new Map()
    ]));
    for (let i in l) {
      const g = l[i], y = t[g][2];
      u.get(Number(i)).forEach((p) => {
        var _a, _b, _c, _d, _e;
        const b = d[p].map((M) => t[M]), w = b.map((M, A) => A), B = (M) => {
          const A = h.get(M) ?? [];
          return new Map(A.map((S) => [
            S,
            t[o[S]]
          ]));
        }, v = B(Number(i)), T = Number(i) < l.length - 1 ? B(Number(i) + 1) : /* @__PURE__ */ new Map(), E = new Map([
          ...v,
          ...T
        ]), I = ((_a = f.get(p).analysisInput) == null ? void 0 : _a.meshSize) ?? 0.5, U = ge(b, Array.from(E.values())), { nodes: P, elements: R } = ee({
          points: U,
          polygon: w,
          maxMeshSize: I
        }), H = n.length, k = c.length, N = R.map((M) => M.map((A) => A + H)), z = P.map((M, A) => A + H), $ = R.map((M, A) => A + k);
        n = [
          ...n,
          ...fe(P, y)
        ], c = [
          ...c,
          ...N
        ];
        for (const M of v.keys()) {
          const A = v.get(M), S = Y(n, z, A, y);
          S !== null && r.get(Number(i)).set(M, S);
        }
        for (const M of T.keys()) {
          const A = T.get(M), S = Y(n, z, A, y);
          S !== null && a.get(Number(i) + 1).set(M, S);
        }
        const j = (_b = f.get(p)) == null ? void 0 : _b.analysisInput, J = ((_c = j == null ? void 0 : j.material) == null ? void 0 : _c.elasticity) ?? 1, K = (j == null ? void 0 : j.thickness) ?? 1, Q = ((_d = j == null ? void 0 : j.material) == null ? void 0 : _d.poissonsRatio) ?? 1;
        $.forEach((M) => {
          s.elasticities.set(M, J), s.thicknesses.set(M, K), s.poissonsRatios.set(M, Q);
        });
        const D = ((_e = f.get(p).analysisInput) == null ? void 0 : _e.areaLoad) ?? 0;
        e.loads = he(n, N, e.loads, D, z);
      });
    }
    for (let i = 0; i < l.length; i++) h.get(i).forEach((y) => {
      var _a, _b;
      if (i === 0) {
        const T = t[o[y]], E = [
          T[0],
          T[1],
          0
        ];
        a.get(i).set(y, n.length), n.push(E);
      }
      const G = r.get(i).get(y), p = a.get(i).get(y), { nodes: x, elements: b } = me(n, G, p);
      i === 0 && e.supports.set(p, ((_b = (_a = m.get(y)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
        true,
        true,
        true,
        true,
        true,
        true
      ]);
      const w = c.length;
      b.forEach((T, E) => {
        s.elasticities.set(w + E, 1e6), s.shearModuli.set(w + E, 1e6), s.areas.set(w + E, 1e6), s.torsionalConstants.set(w + E, 1e6), s.momentsOfInertiaY.set(w + E, 1e6), s.momentsOfInertiaZ.set(w + E, 1e6);
      }), n = [
        ...n,
        ...x
      ], c = [
        ...c,
        ...b
      ];
      const B = n.length, v = c.length;
      x.map((T, E) => E + B), b.map((T, E) => E + v);
    });
    return {
      nodes: n,
      elements: c,
      nodeInputs: e,
      elementInputs: s
    };
  };
  function fe(t, l) {
    return t.map((o) => [
      o[0],
      o[1],
      l
    ]);
  }
  function me(t, l, o, d = 1) {
    const h = t[l], u = t[o];
    if (!h || !u) return {
      nodes: [],
      elements: []
    };
    let m = [], f = [];
    const n = V(u, h), c = se(n, d);
    for (let e = 0; e < d - 1; e++) m.push(Z(h, oe(c, e + 1)));
    if (d == 1) f.push([
      l,
      o
    ]);
    else {
      let e = t.length;
      for (let s = 0; s < d; s++) s == 0 ? f.push([
        l,
        e
      ]) : s == d - 1 ? f.push([
        e,
        o
      ]) : (f.push([
        e,
        e + 1
      ]), e++);
    }
    return {
      nodes: m,
      elements: f
    };
  }
  function he(t, l, o, d, h) {
    return l.forEach((m) => {
      const [f, n, c] = m.map((a) => t[a]), e = u(f, n, c), s = d * e / 3;
      m.forEach((a) => {
        if (h.includes(a)) {
          const r = [
            0,
            0,
            s,
            0,
            0,
            0
          ], i = o.get(a) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          o.set(a, Z(i, r));
        }
      });
    }), o;
    function u(m, f, n) {
      const c = V(f, m), e = V(n, m);
      return te(ne(c, e)) / 2;
    }
  }
  function ge(t, l, o = 0.01) {
    const d = o * o, h = t.slice();
    for (const u of l) {
      let m = false;
      for (const f of t) {
        const n = u[0] - f[0], c = u[1] - f[1], e = u[2] - f[2];
        if (n * n + c * c + e * e <= d) {
          m = true;
          break;
        }
      }
      !m && de(u, t) && h.push(u);
    }
    return h;
  }
  function Y(t, l, o, d, h = 0.1) {
    const u = [
      o[0],
      o[1],
      d
    ];
    for (const m of l) {
      const f = t[m], n = f[0] - u[0], c = f[1] - u[1], e = f[2] - u[2];
      if (n * n + c * c + e * e <= h * h) return m;
    }
    return null;
  }
  function de(t, l) {
    let o = 0;
    const d = t[0], h = t[1];
    for (let u = 0, m = l.length - 1; u < l.length; m = u++) {
      const f = l[u][0], n = l[u][1], c = l[m][0], e = l[m][1];
      n > h != e > h && d < (c - f) * (h - n) / (e - n) + f && o++;
    }
    return o % 2 !== 0;
  }
  Ee = function() {
    const t = new re(new C(), new ie());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  Ae = function(t, l, o) {
    const d = new C(), h = 4, u = o.flatMap((f) => {
      const n = t[f], c = [
        n[0],
        n[1],
        n[2] - h
      ];
      return [
        ...n,
        ...c
      ];
    }), m = l.map((f) => pe(f).map((n) => [
      ...t[n[0]],
      ...t[n[1]]
    ]).flat()).flat();
    return d.setAttribute("position", new le([
      ...u,
      ...m
    ], 3)), d;
  };
  function pe(t) {
    if (t.length === 2) return [
      t
    ];
    const l = [];
    for (let o = 0; o < t.length; o++) l.push([
      t[o],
      t[(o + 1) % t.length]
    ]);
    return l;
  }
  function O(t, l = false) {
    const o = t[0].index !== null, d = new Set(Object.keys(t[0].attributes)), h = new Set(Object.keys(t[0].morphAttributes)), u = {}, m = {}, f = t[0].morphTargetsRelative, n = new C();
    let c = 0;
    for (let e = 0; e < t.length; ++e) {
      const s = t[e];
      let a = 0;
      if (o !== (s.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (const r in s.attributes) {
        if (!d.has(r)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + '. All geometries must have compatible attributes; make sure "' + r + '" attribute exists among all geometries, or in none of them.'), null;
        u[r] === void 0 && (u[r] = []), u[r].push(s.attributes[r]), a++;
      }
      if (a !== d.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". Make sure all geometries have the same number of attributes."), null;
      if (f !== s.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const r in s.morphAttributes) {
        if (!h.has(r)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        m[r] === void 0 && (m[r] = []), m[r].push(s.morphAttributes[r]);
      }
      if (l) {
        let r;
        if (o) r = s.index.count;
        else if (s.attributes.position !== void 0) r = s.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". The geometry must have either an index or a position attribute"), null;
        n.addGroup(c, r, e), c += r;
      }
    }
    if (o) {
      let e = 0;
      const s = [];
      for (let a = 0; a < t.length; ++a) {
        const r = t[a].index;
        for (let i = 0; i < r.count; ++i) s.push(r.getX(i) + e);
        e += t[a].attributes.position.count;
      }
      n.setIndex(s);
    }
    for (const e in u) {
      const s = X(u[e]);
      if (!s) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      n.setAttribute(e, s);
    }
    for (const e in m) {
      const s = m[e][0].length;
      if (s === 0) break;
      n.morphAttributes = n.morphAttributes || {}, n.morphAttributes[e] = [];
      for (let a = 0; a < s; ++a) {
        const r = [];
        for (let g = 0; g < m[e].length; ++g) r.push(m[e][g][a]);
        const i = X(r);
        if (!i) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        n.morphAttributes[e].push(i);
      }
    }
    return n;
  }
  function X(t) {
    let l, o, d, h = -1, u = 0;
    for (let c = 0; c < t.length; ++c) {
      const e = t[c];
      if (l === void 0 && (l = e.array.constructor), l !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (o === void 0 && (o = e.itemSize), o !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (d === void 0 && (d = e.normalized), d !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (h === -1 && (h = e.gpuType), h !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      u += e.count * o;
    }
    const m = new l(u), f = new q(m, o, d);
    let n = 0;
    for (let c = 0; c < t.length; ++c) {
      const e = t[c];
      if (e.isInterleavedBufferAttribute) {
        const s = n / o;
        for (let a = 0, r = e.count; a < r; a++) for (let i = 0; i < o; i++) {
          const g = e.getComponent(a, i);
          f.setComponent(a + s, i, g);
        }
      } else m.set(e.array, n);
      n += e.count * o;
    }
    return h !== void 0 && (f.gpuType = h), f;
  }
  xe = function() {
    return new ae(new C(), new ue({
      color: 16770764
    }));
  };
  Te = function(t, l, o) {
    var _a;
    const u = [];
    return ((_a = l[0]) == null ? void 0 : _a.length) > 2 && u.push(m(t, l)), o.length > 0 && u.push(f(t, o)), u.length > 0 ? O(u) : new C();
    function m(e, s, a = 0.3) {
      const r = [];
      for (let g = 0; g < s.length; g++) {
        const y = [];
        for (let w = 0; w < s[g].length; w++) {
          const B = s[g][w];
          y.push(e[B]);
        }
        if (y.length < 3) continue;
        n(y) && y.pop();
        const G = c(y), p = i(y, G * 0.3 / 2), x = new W();
        new ce();
        for (let w = 0; w < p.length; w++) w == 0 ? x.moveTo(p[0][0], p[0][1]) : x.lineTo(p[w][0], p[w][1]);
        const b = new F(x, {
          depth: a,
          bevelEnabled: false
        });
        b.translate(0, 0, p[0][2] - a / 2), r.push(b);
      }
      return O(r);
      function i(g, y = 0) {
        const G = [], p = [];
        for (let b = 0; b < g.length; b++) p.push(new _(g[b][0], g[b][1]));
        let x = new q(new Float32Array([
          y,
          0,
          0
        ]), 3);
        for (let b = 0; b < p.length; b++) {
          let w = new _().subVectors(p[b - 1 < 0 ? p.length - 1 : b - 1], p[b]), B = new _().subVectors(p[b + 1 == p.length ? 0 : b + 1], p[b]), E = (B.angle() - w.angle()) * 0.5, I = B.angle() + Math.PI * 0.5, U = Math.tan(E - Math.PI * 0.5), P = new L().set(1, 0, 0, 0, -U, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), R = I, H = new L().set(Math.cos(R), -Math.sin(R), 0, 0, Math.sin(R), Math.cos(R), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), k = new L().set(1, 0, 0, p[b].x, 0, 1, 0, p[b].y, 0, 0, 1, 0, 0, 0, 0, 1), N = x.clone();
          N.needsUpdate = true, N.applyMatrix4(P), N.applyMatrix4(H), N.applyMatrix4(k), G.push([
            N.getX(0),
            N.getY(0),
            g[b][2]
          ]);
        }
        return G;
      }
    }
    function f(e, s) {
      const a = [], r = new W();
      r.lineTo(0 + 0.3, 0), r.lineTo(0 + 0.3, 0 + 0.3), r.lineTo(0, 0 + 0.3);
      for (let i = 0; i < s.length; i++) {
        const g = e[s[i]], y = new F(r, {
          depth: -4,
          bevelEnabled: false
        });
        y.translate(g[0] - 0.3 / 2, g[1] - 0.3 / 2, g[2]), a.push(y);
      }
      return O(a);
    }
    function n(e) {
      let s = false;
      const a = e[0], r = e[e.length - 1];
      return a[0] == r[0] && a[1] == r[1] && a[2] == r[2] && (s = true), s;
    }
    function c(e) {
      let s = 0;
      const a = n(e), r = a ? e.length - 1 : e.length;
      for (let i = 0; i < r; i++) {
        const [g, y] = e[i], G = (i + 1) % (a ? e.length : r), [p, x] = e[G];
        s += (p - g) * (x + y);
      }
      return s > 0 ? 1 : -1;
    }
  };
});
export {
  __tla,
  Ee as a,
  Me as b,
  Ae as c,
  Te as d,
  xe as g
};
