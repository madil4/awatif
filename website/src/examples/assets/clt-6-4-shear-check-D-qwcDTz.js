import { v as c, g as J } from "./styles-I_-DKBYJ.js";
import { b as N } from "./oneWay-BO9bAq5d.js";
import { a as Q } from "./analyze-safkwfFW.js";
import { c as tt, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as et, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
import "./getLocalStiffnessMatrix-BSrjxkfr.js";
import "./complex-i8qiIvCl.js";
import "./__vite-browser-external-D7Ct-6yo.js";
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
  const { div: i } = c.tags, x = 2.4, h = 0.6, nt = 0.525, E = 0.15, ot = 237, F = 0.1, st = 1.05, at = 1.35, T = 0.2, A = 3, rt = 3.5, lt = 1.5, R = 264.65, L = 2.647, O = 0.3292, C = 0.9758, p = {
    nodes: c.state([]),
    elements: c.state([]),
    nodeInputs: c.state({}),
    elementInputs: c.state({}),
    deformOutputs: c.state({}),
    analyzeOutputs: c.state({})
  }, y = c.state(0.03), S = c.state(ot), D = c.state(0), $ = c.state(0), w = c.state(0), G = c.state(0), Y = c.state(0), X = c.state(0), H = c.state(0), B = c.state(0), U = c.state(0), K = c.state(0), W = c.state(0), V = c.state(0), Z = c.state(0);
  let P;
  ft();
  c.derive(() => {
    y.val, S.val, ct();
  });
  function ct() {
    var _a;
    const t = it(y.val, S.val);
    if (!t) return;
    (_a = P == null ? void 0 : P.dispose) == null ? void 0 : _a.call(P), P = tt(t.nodes, t.elements, t.supports, t.elementInputs), G.val = P.setupTimeMs;
    const n = performance.now(), s = P.solve(t.loads, {
      includeReactions: true
    });
    Y.val = performance.now() - n;
    const a = Q(t.nodes, t.elements, t.elementInputs, s);
    p.nodes.val = t.nodes, p.elements.val = t.elements, p.nodeInputs.val = {
      supports: t.supports,
      loads: t.loads
    }, p.elementInputs.val = t.elementInputs, p.deformOutputs.val = {
      deformations: s.deformations,
      reactions: s.reactions
    }, p.analyzeOutputs.val = a, D.val = t.nodes.length, $.val = t.elements.length, w.val = t.nodes.length * 6;
    const e = pt(t.nodes, t.elements, a);
    X.val = e.nxy, H.val = e.tauTorMpa, B.val = e.tauInplaneMpa, U.val = e.utilization, K.val = N(e.nxy, R), W.val = N(Math.abs(e.tauTorMpa), L), V.val = N(Math.abs(e.tauInplaneMpa), O), Z.val = N(e.utilization, C);
  }
  function it(t, n) {
    const { nodes: s, elements: a } = et({
      points: [
        [
          0,
          0,
          0
        ],
        [
          x,
          0,
          0
        ],
        [
          x,
          0,
          h
        ],
        [
          0,
          0,
          h
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3
      ],
      maxMeshSize: t
    }), e = s, o = a;
    if (!e.length || !o.length) return;
    const r = ut(e), u = mt(e, n), l = dt(), m = {
      cltLayups: new Map(o.map((M, d) => [
        d,
        l
      ]))
    };
    return {
      nodes: e,
      elements: o,
      supports: r,
      loads: u,
      elementInputs: m
    };
  }
  function ut(t) {
    const n = /* @__PURE__ */ new Map();
    return z(t, 0.5 * T, T).forEach((e) => {
      n.set(e, [
        true,
        true,
        true,
        false,
        false,
        false
      ]);
    }), z(t, x - 0.5 * T, T).forEach((e) => {
      n.set(e, [
        false,
        true,
        true,
        false,
        false,
        false
      ]);
    }), n;
  }
  function mt(t, n) {
    const s = /* @__PURE__ */ new Map(), a = n * 0.5, e = k(t, st, F), o = k(t, at, F);
    return b(s, e, -a), b(s, o, -a), s;
  }
  function k(t, n, s) {
    const a = s * 0.5, e = n - a, o = n + a, r = 1e-8, u = t.map((l, m) => ({
      node: l,
      nodeIndex: m
    })).filter(({ node: l }) => Math.abs(l[2] - h) < r && l[0] >= e - r && l[0] <= o + r).map(({ nodeIndex: l }) => l);
    return u.length > 0 ? u : [
      j(t, [
        n,
        0,
        h
      ])
    ];
  }
  function z(t, n, s) {
    const a = s * 0.5, e = n - a, o = n + a, r = 1e-8, u = t.map((l, m) => ({
      node: l,
      nodeIndex: m
    })).filter(({ node: l }) => Math.abs(l[2]) < r && l[0] >= e - r && l[0] <= o + r).map(({ nodeIndex: l }) => l);
    return u.length > 0 ? u : [
      j(t, [
        n,
        0,
        0
      ])
    ];
  }
  function b(t, n, s) {
    if (!n.length) return;
    const a = s / n.length;
    n.forEach((e) => {
      const o = t.get(e) ?? [
        0,
        0,
        0,
        0,
        0,
        0
      ];
      t.set(e, [
        o[0],
        o[1],
        o[2] + a,
        o[3],
        o[4],
        o[5]
      ]);
    });
  }
  function pt(t, n, s) {
    const a = s.membraneXY ?? /* @__PURE__ */ new Map(), e = s.membraneYY ?? /* @__PURE__ */ new Map(), o = nt, r = h * 0.5, u = E * 0.5, l = f(t, n, a, [
      o,
      r
    ]), m = f(t, n, e, [
      o - u,
      r + u
    ]), M = f(t, n, e, [
      o + u,
      r + u
    ]), d = f(t, n, e, [
      o - u,
      r - u
    ]), _ = f(t, n, e, [
      o + u,
      r - u
    ]), v = 0.5 * (m + M), I = (0.5 * (d + _) - v) / E / (A - 1) / 1e3, g = 3 * l / (E * (A - 1)) / 1e3, q = Math.abs(g) / rt + Math.abs(I) / lt;
    return {
      nxy: l,
      tauTorMpa: g,
      tauInplaneMpa: I,
      utilization: q
    };
  }
  function f(t, n, s, a) {
    const e = Mt(t, n, a, (r) => s.has(r));
    if (e === void 0) return 0;
    const o = s.get(e);
    return o ? (o[0] + o[1] + o[2]) / 3 : 0;
  }
  function Mt(t, n, s, a) {
    let e, o = Number.POSITIVE_INFINITY;
    return n.forEach((r, u) => {
      if (r.length !== 3 || a && !a(u)) return;
      const l = t[r[0]], m = t[r[1]], M = t[r[2]], d = (l[0] + m[0] + M[0]) / 3, _ = (l[2] + m[2] + M[2]) / 3, v = Math.hypot(d - s[0], _ - s[1]);
      v < o && (o = v, e = u);
    }), e;
  }
  function j(t, n) {
    let s = 0, a = Number.POSITIVE_INFINITY;
    return t.forEach((e, o) => {
      const r = Math.hypot(e[0] - n[0], e[1] - n[1], e[2] - n[2]);
      r < a && (a = r, s = o);
    }), s;
  }
  function dt() {
    return {
      layers: [
        {
          thickness: 40 * 1e-3,
          thetaDeg: 0,
          Ex: 12e3 * 1e3,
          Ey: 400 * 1e3,
          nuXY: 0.5,
          Gxy: 750 * 1e3,
          Gxz: 750 * 1e3,
          Gyz: 75 * 1e3
        },
        {
          thickness: 20 * 1e-3,
          thetaDeg: 90,
          Ex: 12e3 * 1e3,
          Ey: 400 * 1e3,
          nuXY: 0.5,
          Gxy: 750 * 1e3,
          Gxz: 750 * 1e3,
          Gyz: 75 * 1e3
        },
        {
          thickness: 40 * 1e-3,
          thetaDeg: 0,
          Ex: 12e3 * 1e3,
          Ey: 400 * 1e3,
          nuXY: 0.5,
          Gxy: 750 * 1e3,
          Gxz: 750 * 1e3,
          Gyz: 75 * 1e3
        }
      ],
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: true,
        strictSymmetryForElement: true
      }
    };
  }
  function ft() {
    const t = i({
      id: "page"
    });
    t.append(i({
      id: "viewer-wrap"
    }, J({
      mesh: p,
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
        displayScale: -2,
        customNumbers: [
          {
            folder: "Example 6.4",
            label: "F total [kN]",
            state: S,
            min: 50,
            max: 400,
            step: 1
          },
          {
            folder: "Example 6.4",
            label: "Max mesh size [m]",
            state: y,
            min: 0.02,
            max: 0.12,
            step: 5e-3
          }
        ]
      }
    })), i({
      id: "check-stats"
    }, i({
      class: "title"
    }, "CLT 6.4 In-plane Shear Check"), i("Solver path: C++ cached (WASM)"), i(() => `Nodes: ${D.val}`), i(() => `Elements: ${$.val}`), i(() => `DOF: ${w.val}`), i(() => `Setup (factorize): ${G.val.toFixed(2)} ms`), i(() => `Solve: ${Y.val.toFixed(2)} ms`), i({
      class: "spacer"
    }), i(() => `n_xy @ A-A [kN/m]: ${X.val.toFixed(2)} (ref ${R.toFixed(2)})`), i(() => `tau_tor,d [MPa]: ${H.val.toFixed(4)} (ref ${L.toFixed(4)})`), i(() => `tau_yz,d,inplane [MPa]: ${B.val.toFixed(4)} (ref ${O.toFixed(4)})`), i(() => `Utilization [-]: ${U.val.toFixed(4)} (ref ${C.toFixed(4)})`), i({
      class: "spacer"
    }), i(() => `Err n_xy [%]: ${K.val.toFixed(2)}`), i(() => `Err tau_tor [%]: ${W.val.toFixed(2)}`), i(() => `Err tau_inplane [%]: ${V.val.toFixed(2)}`), i(() => `Err utilization [%]: ${Z.val.toFixed(2)}`), i({
      class: "foot"
    }, "Reference: FEM-Design Theory of Laminated Composite Shells, Example 6.4"))), document.body.replaceChildren(t);
  }
});
