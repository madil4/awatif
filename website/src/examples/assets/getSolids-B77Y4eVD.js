import { g as D, __tla as __tla_0 } from "./getMesh-DmUdekin.js";
import { a as X, s as O, n as ee, c as te, d as ne, m as se } from "./pureFunctionsAny.generated-Dh3LO6N2.js";
import { f as oe, B as C, b as re, F as ie, h as Z, M as le, i as ae, S as V, P as ue, j as W, k as j, l as _ } from "./styles-BpMgv57_.js";
let Me, we, Ee, xe, Ae;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  we = function(t, l, o, d, h, u, f, m) {
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
        var _a, _b, _c, _d;
        const b = d[p].map((M) => t[M]), w = b.map((M, A) => A), N = (M) => {
          const A = h.get(M) ?? [];
          return new Map(A.map((R) => [
            R,
            t[o[R]]
          ]));
        }, S = N(Number(i)), T = Number(i) < l.length - 1 ? N(Number(i) + 1) : /* @__PURE__ */ new Map(), E = new Map([
          ...S,
          ...T
        ]), U = he(b, Array.from(E.values())), { nodes: P, elements: H } = D({
          points: U,
          polygon: w,
          maxMeshSize: 0.5
        }), v = n.length, k = c.length, I = H.map((M) => M.map((A) => A + v)), G = P.map((M, A) => A + v), q = H.map((M, A) => A + k);
        n = [
          ...n,
          ...ce(P, y)
        ], c = [
          ...c,
          ...I
        ];
        for (const M of S.keys()) {
          const A = S.get(M), R = F(n, G, A, y);
          R !== null && r.get(Number(i)).set(M, R);
        }
        for (const M of T.keys()) {
          const A = T.get(M), R = F(n, G, A, y);
          R !== null && a.get(Number(i) + 1).set(M, R);
        }
        const z = (_a = m.get(p)) == null ? void 0 : _a.analysisInput, $ = ((_b = z == null ? void 0 : z.material) == null ? void 0 : _b.elasticity) ?? 1, J = (z == null ? void 0 : z.thickness) ?? 1, K = ((_c = z == null ? void 0 : z.material) == null ? void 0 : _c.poissonsRatio) ?? 1;
        q.forEach((M) => {
          s.elasticities.set(M, $), s.thicknesses.set(M, J), s.poissonsRatios.set(M, K);
        });
        const Q = ((_d = m.get(p).analysisInput) == null ? void 0 : _d.areaLoad) ?? 0;
        e.loads = me(n, I, e.loads, Q, G);
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
      const B = r.get(i).get(y), p = a.get(i).get(y), { nodes: x, elements: b } = fe(n, B, p);
      i === 0 && e.supports.set(p, ((_b = (_a = f.get(y)) == null ? void 0 : _a.analysisInput) == null ? void 0 : _b.support) ?? [
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
      const N = n.length, S = c.length;
      x.map((T, E) => E + N), b.map((T, E) => E + S);
    });
    return {
      nodes: n,
      elements: c,
      nodeInputs: e,
      elementInputs: s
    };
  };
  function ce(t, l) {
    return t.map((o) => [
      o[0],
      o[1],
      l
    ]);
  }
  function fe(t, l, o, d = 1) {
    const h = t[l], u = t[o];
    if (!h || !u) return {
      nodes: [],
      elements: []
    };
    let f = [], m = [];
    const n = O(u, h), c = ne(n, d);
    for (let e = 0; e < d - 1; e++) f.push(X(h, se(c, e + 1)));
    if (d == 1) m.push([
      l,
      o
    ]);
    else {
      let e = t.length;
      for (let s = 0; s < d; s++) s == 0 ? m.push([
        l,
        e
      ]) : s == d - 1 ? m.push([
        e,
        o
      ]) : (m.push([
        e,
        e + 1
      ]), e++);
    }
    return {
      nodes: f,
      elements: m
    };
  }
  function me(t, l, o, d, h) {
    return l.forEach((f) => {
      const [m, n, c] = f.map((a) => t[a]), e = u(m, n, c), s = d * e / 3;
      f.forEach((a) => {
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
          o.set(a, X(i, r));
        }
      });
    }), o;
    function u(f, m, n) {
      const c = O(m, f), e = O(n, f);
      return ee(te(c, e)) / 2;
    }
  }
  function he(t, l, o = 0.01) {
    const d = o * o, h = t.slice();
    for (const u of l) {
      let f = false;
      for (const m of t) {
        const n = u[0] - m[0], c = u[1] - m[1], e = u[2] - m[2];
        if (n * n + c * c + e * e <= d) {
          f = true;
          break;
        }
      }
      !f && ge(u, t) && h.push(u);
    }
    return h;
  }
  function F(t, l, o, d, h = 0.1) {
    const u = [
      o[0],
      o[1],
      d
    ];
    for (const f of l) {
      const m = t[f], n = m[0] - u[0], c = m[1] - u[1], e = m[2] - u[2];
      if (n * n + c * c + e * e <= h * h) return f;
    }
    return null;
  }
  function ge(t, l) {
    let o = 0;
    const d = t[0], h = t[1];
    for (let u = 0, f = l.length - 1; u < l.length; f = u++) {
      const m = l[u][0], n = l[u][1], c = l[f][0], e = l[f][1];
      n > h != e > h && d < (c - m) * (h - n) / (e - n) + m && o++;
    }
    return o % 2 !== 0;
  }
  Me = function() {
    const t = new oe(new C(), new re());
    return t.frustumCulled = false, t.material.depthTest = false, t;
  };
  Ee = function(t, l, o) {
    const d = new C(), h = 4, u = o.flatMap((m) => {
      const n = t[m], c = [
        n[0],
        n[1],
        n[2] - h
      ];
      return [
        ...n,
        ...c
      ];
    }), f = l.map((m) => de(m).map((n) => [
      ...t[n[0]],
      ...t[n[1]]
    ]).flat()).flat();
    return d.setAttribute("position", new ie([
      ...u,
      ...f
    ], 3)), d;
  };
  function de(t) {
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
  function L(t, l = false) {
    const o = t[0].index !== null, d = new Set(Object.keys(t[0].attributes)), h = new Set(Object.keys(t[0].morphAttributes)), u = {}, f = {}, m = t[0].morphTargetsRelative, n = new C();
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
      if (m !== s.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (const r in s.morphAttributes) {
        if (!h.has(r)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + e + ".  .morphAttributes must be consistent throughout all geometries."), null;
        f[r] === void 0 && (f[r] = []), f[r].push(s.morphAttributes[r]);
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
      const s = Y(u[e]);
      if (!s) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
      n.setAttribute(e, s);
    }
    for (const e in f) {
      const s = f[e][0].length;
      if (s === 0) break;
      n.morphAttributes = n.morphAttributes || {}, n.morphAttributes[e] = [];
      for (let a = 0; a < s; ++a) {
        const r = [];
        for (let g = 0; g < f[e].length; ++g) r.push(f[e][g][a]);
        const i = Y(r);
        if (!i) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        n.morphAttributes[e].push(i);
      }
    }
    return n;
  }
  function Y(t) {
    let l, o, d, h = -1, u = 0;
    for (let c = 0; c < t.length; ++c) {
      const e = t[c];
      if (l === void 0 && (l = e.array.constructor), l !== e.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (o === void 0 && (o = e.itemSize), o !== e.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (d === void 0 && (d = e.normalized), d !== e.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (h === -1 && (h = e.gpuType), h !== e.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      u += e.count * o;
    }
    const f = new l(u), m = new Z(f, o, d);
    let n = 0;
    for (let c = 0; c < t.length; ++c) {
      const e = t[c];
      if (e.isInterleavedBufferAttribute) {
        const s = n / o;
        for (let a = 0, r = e.count; a < r; a++) for (let i = 0; i < o; i++) {
          const g = e.getComponent(a, i);
          m.setComponent(a + s, i, g);
        }
      } else f.set(e.array, n);
      n += e.count * o;
    }
    return h !== void 0 && (m.gpuType = h), m;
  }
  Ae = function() {
    return new le(new C(), new ae({
      color: 16770764
    }));
  };
  xe = function(t, l, o) {
    var _a;
    const u = [];
    return ((_a = l[0]) == null ? void 0 : _a.length) > 2 && u.push(f(t, l)), o.length > 0 && u.push(m(t, o)), u.length > 0 ? L(u) : new C();
    function f(e, s, a = 0.3) {
      const r = [];
      for (let g = 0; g < s.length; g++) {
        const y = [];
        for (let w = 0; w < s[g].length; w++) {
          const N = s[g][w];
          y.push(e[N]);
        }
        if (y.length < 3) continue;
        n(y) && y.pop();
        const B = c(y), p = i(y, B * 0.3 / 2), x = new V();
        new ue();
        for (let w = 0; w < p.length; w++) w == 0 ? x.moveTo(p[0][0], p[0][1]) : x.lineTo(p[w][0], p[w][1]);
        const b = new W(x, {
          depth: a,
          bevelEnabled: false
        });
        b.translate(0, 0, p[0][2] - a / 2), r.push(b);
      }
      return L(r);
      function i(g, y = 0) {
        const B = [], p = [];
        for (let b = 0; b < g.length; b++) p.push(new j(g[b][0], g[b][1]));
        let x = new Z(new Float32Array([
          y,
          0,
          0
        ]), 3);
        for (let b = 0; b < p.length; b++) {
          let w = new j().subVectors(p[b - 1 < 0 ? p.length - 1 : b - 1], p[b]), N = new j().subVectors(p[b + 1 == p.length ? 0 : b + 1], p[b]), E = (N.angle() - w.angle()) * 0.5, U = N.angle() + Math.PI * 0.5, P = Math.tan(E - Math.PI * 0.5), H = new _().set(1, 0, 0, 0, -P, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), v = U, k = new _().set(Math.cos(v), -Math.sin(v), 0, 0, Math.sin(v), Math.cos(v), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), I = new _().set(1, 0, 0, p[b].x, 0, 1, 0, p[b].y, 0, 0, 1, 0, 0, 0, 0, 1), G = x.clone();
          G.needsUpdate = true, G.applyMatrix4(H), G.applyMatrix4(k), G.applyMatrix4(I), B.push([
            G.getX(0),
            G.getY(0),
            g[b][2]
          ]);
        }
        return B;
      }
    }
    function m(e, s) {
      const a = [], r = new V();
      r.lineTo(0 + 0.3, 0), r.lineTo(0 + 0.3, 0 + 0.3), r.lineTo(0, 0 + 0.3);
      for (let i = 0; i < s.length; i++) {
        const g = e[s[i]], y = new W(r, {
          depth: -4,
          bevelEnabled: false
        });
        y.translate(g[0] - 0.3 / 2, g[1] - 0.3 / 2, g[2]), a.push(y);
      }
      return L(a);
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
        const [g, y] = e[i], B = (i + 1) % (a ? e.length : r), [p, x] = e[B];
        s += (p - g) * (x + y);
      }
      return s > 0 ? 1 : -1;
    }
  };
});
export {
  __tla,
  Me as a,
  we as b,
  Ee as c,
  xe as d,
  Ae as g
};
