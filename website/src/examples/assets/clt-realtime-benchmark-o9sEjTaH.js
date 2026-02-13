import { v as a, g as O } from "./styles-I_-DKBYJ.js";
import { c as A, __tla as __tla_0 } from "./deformCached-BS-uK4aA.js";
import { d as D, __tla as __tla_1 } from "./deformCpp-77svjSoa.js";
import "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
import "./complex-i8qiIvCl.js";
Promise.all([
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
  const { div: w, h3: E, p: u } = a.tags, b = 10, j = 2.45, H = 28, W = 6, g = a.state(4.335), C = a.state(0), F = a.state(0), k = a.state(0), R = a.state(0), $ = a.state(0), x = a.state(0), z = a.state(0), l = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({}),
    analyzeOutputs: a.state({})
  };
  let N = [], v = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), h = {}, S, G = false, I = true, y = false;
  const d = [], Z = performance.now();
  X();
  const q = T("cpp");
  k.val = q ?? 0;
  R.val = performance.now() - Z;
  ee();
  G = true;
  setTimeout(() => Y(l.nodes.val, l.elements.val), 0);
  a.derive(() => {
    if (g.val, !!G) {
      if (I) {
        I = false;
        return;
      }
      _();
    }
  });
  function X() {
    const { nodes: t, elements: e } = B(b, j, H, W);
    x.val = t.length, z.val = e.length, $.val = t.length * 6, v = J(t), N = U(t, e), p = V(t, g.val, N);
    const s = K();
    h = {
      cltLayups: new Map(e.map((n, o) => [
        o,
        s
      ]))
    }, l.nodes.val = t, l.elements.val = e, l.elementInputs.val = h, l.nodeInputs.val = {
      supports: v,
      loads: p
    };
  }
  function Y(t, e) {
    var _a;
    (_a = S == null ? void 0 : S.dispose) == null ? void 0 : _a.call(S), S = A(t, e, v, h), d.length = 0, T("cached");
  }
  function T(t = "auto") {
    var _a, _b, _c, _d;
    if (!((_b = (_a = l.nodes) == null ? void 0 : _a.val) == null ? void 0 : _b.length) || !((_d = (_c = l.elements) == null ? void 0 : _c.val) == null ? void 0 : _d.length)) return;
    Q(p, g.val, N);
    const e = {
      supports: v,
      loads: p
    }, s = performance.now(), o = t === "cached" || t === "auto" && !!S ? S.solve(p, {
      includeReactions: false
    }) : D(l.nodes.val, l.elements.val, e, h, {
      includeReactions: false
    }), r = performance.now() - s;
    return d.push(r), d.length > 40 && d.shift(), C.val = r, F.val = P(d), l.nodeInputs.val = e, l.deformOutputs.val = o, r;
  }
  function _() {
    y || (y = true, requestAnimationFrame(() => {
      y = false, T("auto");
    }));
  }
  function B(t, e, s, n) {
    const o = [];
    for (let c = 0; c < n; c++) for (let m = 0; m < s; m++) o.push([
      m * t / (s - 1),
      c * e / (n - 1),
      0
    ]);
    const r = [];
    for (let c = 0; c < n - 1; c++) for (let m = 0; m < s - 1; m++) {
      const i = c * s + m, f = i + 1, M = (c + 1) * s + m, L = M + 1;
      r.push([
        i,
        f,
        M
      ]), r.push([
        f,
        L,
        M
      ]);
    }
    return {
      nodes: o,
      elements: r
    };
  }
  function J(t) {
    return new Map(t.map((e, s) => ({
      node: e,
      i: s
    })).filter(({ node: e }) => Math.abs(e[0]) < 1e-8 || Math.abs(e[0] - b) < 1e-8).map(({ i: e }) => [
      e,
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
  function U(t, e) {
    const s = Array(t.length).fill(0);
    for (const n of e) {
      const [o, r, c] = n.map((f) => t[f]), i = Math.abs((r[0] - o[0]) * (c[1] - o[1]) - (c[0] - o[0]) * (r[1] - o[1])) * 0.5 / 3;
      s[n[0]] += i, s[n[1]] += i, s[n[2]] += i;
    }
    return s;
  }
  function V(t, e, s) {
    return new Map(t.map((n, o) => [
      o,
      [
        0,
        0,
        -e * s[o],
        0,
        0,
        0
      ]
    ]));
  }
  function Q(t, e, s) {
    if (t) for (let n = 0; n < s.length; n++) {
      const o = t.get(n);
      o ? o[2] = -e * s[n] : t.set(n, [
        0,
        0,
        -e * s[n],
        0,
        0,
        0
      ]);
    }
  }
  function K() {
    const s = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], n = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: s.map((o, r) => ({
        thickness: o * 1e-3,
        thetaDeg: n[r],
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
  function P(t) {
    if (!t.length) return 0;
    const e = [
      ...t
    ].sort((n, o) => n - o), s = Math.floor(e.length / 2);
    return e.length % 2 === 0 ? 0.5 * (e[s - 1] + e[s]) : e[s];
  }
  function ee() {
    const t = w({
      id: "page"
    }), e = w({
      id: "stats"
    }, E("CLT Realtime Benchmark"), u("Fresh-start solver path: C++/WASM one-shot"), u("Interactive solver path: JS cached factorization"), u(() => `Nodes: ${x.val}`), u(() => `Elements: ${z.val}`), u(() => `DOF: ${$.val}`), u(() => `Fresh start wall (model init + first solve): ${R.val.toFixed(2)} ms`), u(() => `First solve (assemble + factorize + solve): ${k.val.toFixed(2)} ms`), u(() => `Current solve: ${C.val.toFixed(2)} ms`), u(() => `Median solve (last ${d.length}): ${F.val.toFixed(2)} ms`));
    t.append(w({
      id: "viewer-wrap"
    }, O({
      mesh: l,
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
            state: g,
            min: -50,
            max: 50,
            step: 0.01
          }
        ]
      }
    })), e), document.body.append(t);
  }
});
