import { v as i, g as U } from "./styles-Dc2qaz2G.js";
import { g as G, a as Q, m as $, t as K, s as F, i as T, l as P, b as x, c as ee, f as te } from "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
import { d as se, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function ne(n, t, s, e) {
    let o = Array(e).fill(0).map(() => Array(e).fill(0));
    return t.forEach((l, c) => {
      const r = l.map((S) => n[S]), a = G(r, s, c), f = Q(r), p = $(K(f), $(a, f));
      o = oe(o, p, l);
    }), o;
  }
  function oe(n, t, s) {
    const e = s.length === 3, o = 6 * s[0], l = 6 * s[1], c = e ? 6 * s[2] : void 0;
    for (let r = 0; r < 6; r++) for (let a = 0; a < 6; a++) n[o + r][o + a] += t[r][a], n[l + r][o + a] += t[r + 6][a], e && (n[c + r][o + a] += t[r + 12][a]), n[o + r][l + a] += t[r][a + 6], n[l + r][l + a] += t[r + 6][a + 6], e && (n[c + r][l + a] += t[r + 12][a + 6]), e && (n[o + r][c + a] += t[r][a + 12], n[l + r][c + a] += t[r + 6][a + 12], n[c + r][c + a] += t[r + 12][a + 12]);
    return n;
  }
  function ae(n, t, s, e) {
    var _a;
    if (n.length === 0 || t.length === 0) throw new Error("createCachedDeformSolver requires non-empty nodes/elements");
    const o = n.length * 6, l = le(s, o), c = Array.from(((_a = s == null ? void 0 : s.keys) == null ? void 0 : _a.call(s)) ?? []), r = performance.now(), a = ne(n, t, e, o), f = F(a, T(l, l)), p = P(x(f)), S = performance.now() - r;
    return {
      dof: o,
      freeDof: l.length,
      setupTimeMs: S,
      solve: (V = /* @__PURE__ */ new Map(), X = {}) => {
        const Y = ce(V, o), B = F(Y, T(l)), J = ee(p, B), d = F(Array(o).fill(0), T(l), te(J)), I = re(n.length, d);
        if (!(X.includeReactions ?? false) || c.length === 0) return {
          deformations: I,
          reactions: /* @__PURE__ */ new Map()
        };
        const L = /* @__PURE__ */ new Map();
        return c.forEach((h) => {
          L.set(h, [
            v(a[h * 6], d),
            v(a[h * 6 + 1], d),
            v(a[h * 6 + 2], d),
            v(a[h * 6 + 3], d),
            v(a[h * 6 + 4], d),
            v(a[h * 6 + 5], d)
          ]);
        }), {
          deformations: I,
          reactions: L
        };
      }
    };
  }
  function re(n, t) {
    const s = /* @__PURE__ */ new Map();
    for (let e = 0; e < n; e++) s.set(e, [
      t[e * 6],
      t[e * 6 + 1],
      t[e * 6 + 2],
      t[e * 6 + 3],
      t[e * 6 + 4],
      t[e * 6 + 5]
    ]);
    return s;
  }
  function v(n, t) {
    let s = 0;
    for (let e = 0; e < n.length; e++) s += n[e] * t[e];
    return s;
  }
  function le(n, t) {
    const s = Array(t).fill(false);
    return n == null ? void 0 : n.forEach((e, o) => {
      e[0] && (s[o * 6] = true), e[1] && (s[o * 6 + 1] = true), e[2] && (s[o * 6 + 2] = true), e[3] && (s[o * 6 + 3] = true), e[4] && (s[o * 6 + 4] = true), e[5] && (s[o * 6 + 5] = true);
    }), Array(t).fill(0).map((e, o) => o).filter((e) => !s[e]);
  }
  function ce(n, t) {
    const s = Array(t).fill(0);
    return n == null ? void 0 : n.forEach((e, o) => {
      s[o * 6] = e[0], s[o * 6 + 1] = e[1], s[o * 6 + 2] = e[2], s[o * 6 + 3] = e[3], s[o * 6 + 4] = e[4], s[o * 6 + 5] = e[5];
    }), s;
  }
  const { div: A, h3: ie, p: m } = i.tags, z = 10, ue = 2.45, fe = 28, me = 6, N = i.state(4.335), O = i.state(0), k = i.state(0), j = i.state(0), q = i.state(0), H = i.state(0), W = i.state(0), Z = i.state(0), u = {
    nodes: i.state([]),
    elements: i.state([]),
    nodeInputs: i.state({}),
    elementInputs: i.state({}),
    deformOutputs: i.state({}),
    analyzeOutputs: i.state({})
  };
  let R = [], w = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), M = {}, b, _ = false, D = true, C = false;
  const g = [], pe = performance.now();
  he();
  const de = E("cpp");
  j.val = de ?? 0;
  q.val = performance.now() - pe;
  Ae();
  _ = true;
  setTimeout(() => ve(u.nodes.val, u.elements.val), 0);
  i.derive(() => {
    if (N.val, !!_) {
      if (D) {
        D = false;
        return;
      }
      ge();
    }
  });
  function he() {
    const { nodes: n, elements: t } = Se(z, ue, fe, me);
    W.val = n.length, Z.val = t.length, H.val = n.length * 6, w = ye(n), R = we(n, t), y = Me(n, N.val, R);
    const s = Fe();
    M = {
      cltLayups: new Map(t.map((e, o) => [
        o,
        s
      ]))
    }, u.nodes.val = n, u.elements.val = t, u.elementInputs.val = M, u.nodeInputs.val = {
      supports: w,
      loads: y
    };
  }
  function ve(n, t) {
    b = ae(n, t, w, M), g.length = 0, E("cached");
  }
  function E(n = "auto") {
    var _a, _b, _c, _d;
    if (!((_b = (_a = u.nodes) == null ? void 0 : _a.val) == null ? void 0 : _b.length) || !((_d = (_c = u.elements) == null ? void 0 : _c.val) == null ? void 0 : _d.length)) return;
    Ne(y, N.val, R);
    const t = {
      supports: w,
      loads: y
    }, s = performance.now(), o = n === "cached" || n === "auto" && !!b ? b.solve(y, {
      includeReactions: false
    }) : se(u.nodes.val, u.elements.val, t, M, {
      includeReactions: false
    }), l = performance.now() - s;
    return g.push(l), g.length > 40 && g.shift(), O.val = l, k.val = Te(g), u.nodeInputs.val = t, u.deformOutputs.val = o, l;
  }
  function ge() {
    C || (C = true, requestAnimationFrame(() => {
      C = false, E("auto");
    }));
  }
  function Se(n, t, s, e) {
    const o = [];
    for (let c = 0; c < e; c++) for (let r = 0; r < s; r++) o.push([
      r * n / (s - 1),
      c * t / (e - 1),
      0
    ]);
    const l = [];
    for (let c = 0; c < e - 1; c++) for (let r = 0; r < s - 1; r++) {
      const a = c * s + r, f = a + 1, p = (c + 1) * s + r, S = p + 1;
      l.push([
        a,
        f,
        p
      ]), l.push([
        f,
        S,
        p
      ]);
    }
    return {
      nodes: o,
      elements: l
    };
  }
  function ye(n) {
    return new Map(n.map((t, s) => ({
      node: t,
      i: s
    })).filter(({ node: t }) => Math.abs(t[0]) < 1e-8 || Math.abs(t[0] - z) < 1e-8).map(({ i: t }) => [
      t,
      [
        true,
        true,
        true,
        false,
        false,
        false
      ]
    ]));
  }
  function we(n, t) {
    const s = Array(n.length).fill(0);
    for (const e of t) {
      const [o, l, c] = e.map((f) => n[f]), a = Math.abs((l[0] - o[0]) * (c[1] - o[1]) - (c[0] - o[0]) * (l[1] - o[1])) * 0.5 / 3;
      s[e[0]] += a, s[e[1]] += a, s[e[2]] += a;
    }
    return s;
  }
  function Me(n, t, s) {
    return new Map(n.map((e, o) => [
      o,
      [
        0,
        0,
        -t * s[o],
        0,
        0,
        0
      ]
    ]));
  }
  function Ne(n, t, s) {
    if (n) for (let e = 0; e < s.length; e++) {
      const o = n.get(e);
      o ? o[2] = -t * s[e] : n.set(e, [
        0,
        0,
        -t * s[e],
        0,
        0,
        0
      ]);
    }
  }
  function Fe() {
    const s = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], e = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: s.map((o, l) => ({
        thickness: o * 1e-3,
        thetaDeg: e[l],
        Ex: 11e3 * 1e3,
        Ey: 0.1 * 1e3,
        nuXY: 0,
        Gxy: 690 * 1e3,
        Gxz: 690 * 1e3,
        Gyz: 69 * 1e3
      })),
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: true
      }
    };
  }
  function Te(n) {
    if (!n.length) return 0;
    const t = [
      ...n
    ].sort((e, o) => e - o), s = Math.floor(t.length / 2);
    return t.length % 2 === 0 ? 0.5 * (t[s - 1] + t[s]) : t[s];
  }
  function Ae() {
    const n = A({
      id: "page"
    }), t = A({
      id: "stats"
    }, ie("CLT Realtime Benchmark"), m("Fresh-start solver path: C++/WASM one-shot"), m("Interactive solver path: JS cached factorization"), m(() => `Nodes: ${W.val}`), m(() => `Elements: ${Z.val}`), m(() => `DOF: ${H.val}`), m(() => `Fresh start wall (model init + first solve): ${q.val.toFixed(2)} ms`), m(() => `First solve (assemble + factorize + solve): ${j.val.toFixed(2)} ms`), m(() => `Current solve: ${O.val.toFixed(2)} ms`), m(() => `Median solve (last ${g.length}): ${k.val.toFixed(2)} ms`));
    n.append(A({
      id: "viewer-wrap"
    }, U({
      mesh: u,
      settingsObj: {
        deformedShape: true,
        shellResults: "displacementZ",
        shellResultScales: {
          displacementZ: 1e3
        },
        shellResultUnits: {
          displacementZ: "mm"
        },
        showFrameResults: false,
        nodes: false,
        nodesIndexes: false,
        elementsIndexes: false,
        loads: true,
        supports: true,
        displayScale: -3,
        customNumbers: [
          {
            folder: "Analysis Inputs",
            label: "q [kN/m2]",
            state: N,
            min: -50,
            max: 50,
            step: 0.01
          }
        ]
      }
    })), t), document.body.append(n);
  }
});
