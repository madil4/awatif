import { v as m, g as G } from "./styles-Dc2qaz2G.js";
import { a as O } from "./coupling-CX7jvXLk.js";
import { d as k, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const { div: y, h3: U, p: i } = m.tags, E = 4, F = 3, I = 3.2, v = 0, $ = 0.1, D = 1e-4, A = 1e3, w = 1, H = 1e-12, N = m.state(0.35), g = m.state(4), M = m.state("coupled"), _ = m.state(0), T = m.state(0), C = m.state(0), B = m.state(0), R = m.state(0), f = {
    nodes: m.state([]),
    elements: m.state([]),
    nodeInputs: m.state({}),
    elementInputs: m.state({}),
    deformOutputs: m.state({}),
    analyzeOutputs: m.state({})
  }, Y = K();
  m.derive(() => {
    N.val, g.val, M.val, P();
  });
  Q();
  function P() {
    const e = W(M.val), s = Math.max($, N.val), n = S([
      0,
      0,
      v
    ], [
      E,
      0,
      0
    ], [
      0,
      0,
      I
    ], s), l = S([
      E,
      0,
      v
    ], [
      0,
      F,
      0
    ], [
      0,
      0,
      I
    ], s), t = j(n, l, e), o = X(t.nodes), u = Z(t.nodes, t.elements, t.wallAElementIndices, -g.val), c = q(t.elements), r = k(t.nodes, t.elements, {
      supports: o,
      loads: u
    }, c, {
      includeReactions: false
    });
    f.nodes.val = t.nodes, f.elements.val = t.elements, f.nodeInputs.val = {
      supports: o,
      loads: u
    }, f.elementInputs.val = c, f.deformOutputs.val = r, _.val = t.nodes.length, T.val = t.elements.length;
    const a = L(r.deformations, t.wallANodeIndices, w), d = L(r.deformations, t.wallBNodeIndices, w);
    C.val = a * A, B.val = d * A, R.val = a > H ? d / a * 100 : 0;
  }
  function S(e, s, n, l) {
    const t = b(x(s), l), o = b(x(n), l), u = [];
    for (let r = 0; r < o; r++) for (let a = 0; a < t; a++) {
      const d = a / (t - 1), p = r / (o - 1);
      u.push([
        e[0] + s[0] * d + n[0] * p,
        e[1] + s[1] * d + n[1] * p,
        e[2] + s[2] * d + n[2] * p
      ]);
    }
    const c = [];
    for (let r = 0; r < o - 1; r++) for (let a = 0; a < t - 1; a++) {
      const d = r * t + a, p = d + 1, h = (r + 1) * t + a, z = h + 1;
      c.push([
        d,
        p,
        h
      ]), c.push([
        p,
        z,
        h
      ]);
    }
    return {
      nodes: u,
      elements: c
    };
  }
  function j(e, s, n) {
    if (n === "coupled") {
      const t = O(e, s, D);
      return {
        nodes: t.nodes,
        elements: t.elements,
        wallANodeIndices: t.wallANodeMap,
        wallBNodeIndices: t.wallBNodeMap,
        wallAElementIndices: t.wallAElementMap
      };
    }
    const l = e.nodes.length;
    return {
      nodes: [
        ...e.nodes,
        ...s.nodes
      ],
      elements: [
        ...e.elements,
        ...s.elements.map((t) => [
          t[0] + l,
          t[1] + l,
          t[2] + l
        ])
      ],
      wallANodeIndices: e.nodes.map((t, o) => o),
      wallBNodeIndices: s.nodes.map((t, o) => o + l),
      wallAElementIndices: e.elements.map((t, o) => o)
    };
  }
  function q(e) {
    return {
      cltLayups: new Map(e.map((s, n) => [
        n,
        Y
      ]))
    };
  }
  function b(e, s) {
    return Math.max(2, Math.ceil(e / Math.max(s, 0.05)) + 1);
  }
  function x(e) {
    return Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  }
  function X(e) {
    return new Map(e.map((s, n) => ({
      node: s,
      index: n
    })).filter(({ node: s }) => Math.abs(s[2] - v) < 1e-8).map(({ index: s }) => [
      s,
      [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    ]));
  }
  function Z(e, s, n, l) {
    const t = Array(e.length).fill(0);
    n.forEach((u) => {
      const c = s[u];
      if (!c || c.length !== 3) return;
      const a = J(e[c[0]], e[c[1]], e[c[2]]) / 3;
      t[c[0]] += a, t[c[1]] += a, t[c[2]] += a;
    });
    const o = /* @__PURE__ */ new Map();
    for (let u = 0; u < t.length; u++) t[u] <= 0 || o.set(u, [
      0,
      l * t[u],
      0,
      0,
      0,
      0
    ]);
    return o;
  }
  function J(e, s, n) {
    const l = s[0] - e[0], t = s[1] - e[1], o = s[2] - e[2], u = n[0] - e[0], c = n[1] - e[1], r = n[2] - e[2], a = t * r - o * c, d = o * u - l * r, p = l * c - t * u;
    return 0.5 * Math.sqrt(a * a + d * d + p * p);
  }
  function L(e, s, n) {
    if (!e) return 0;
    let l = 0;
    return s.forEach((t) => {
      var _a;
      const o = ((_a = e.get(t)) == null ? void 0 : _a[n]) ?? 0;
      l = Math.max(l, Math.abs(o));
    }), l;
  }
  function K() {
    const n = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], l = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: n.map((t, o) => ({
        thickness: t * 1e-3,
        thetaDeg: l[o],
        Ex: 11e3 * 1e3,
        Ey: 370 * 1e3,
        nuXY: 0.2,
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
  function Q() {
    const e = y({
      id: "page"
    }), s = y({
      id: "stats"
    }, U("CLT Wall Coupling"), i(() => `Mode: ${V(W(M.val))}`), i(() => `Nodes: ${_.val}`), i(() => `Elements: ${T.val}`), i(() => `max |Uy| wall A: ${C.val.toFixed(2)} mm`), i(() => `max |Uy| wall B: ${B.val.toFixed(2)} mm`), i(() => `transfer (B/A): ${R.val.toFixed(1)} %`));
    e.append(y({
      id: "viewer-wrap"
    }, G({
      mesh: f,
      settingsObj: {
        deformedShape: true,
        shellResults: "displacementY",
        shellResultScales: {
          displacementY: 1e3
        },
        shellResultUnits: {
          displacementY: "mm"
        },
        showFrameResults: false,
        nodes: false,
        nodesIndexes: false,
        elementsIndexes: false,
        loads: true,
        supports: true,
        displayScale: -2.2,
        customSelects: [
          {
            folder: "Analysis Inputs",
            label: "Wall coupling",
            state: M,
            options: {
              Coupled: "coupled",
              Uncoupled: "uncoupled"
            }
          }
        ],
        customNumbers: [
          {
            folder: "Analysis Model",
            label: "Max mesh size [m]",
            state: N,
            min: 0.1,
            max: 1.2,
            step: 0.05
          },
          {
            folder: "Analysis Inputs",
            label: "Wall pressure [kN/m2]",
            state: g,
            min: -50,
            max: 50,
            step: 0.1
          }
        ]
      }
    })), s), document.body.append(e);
  }
  function W(e) {
    return e === "coupled" || e === "Coupled" ? "coupled" : "uncoupled";
  }
  function V(e) {
    return e === "coupled" ? "Coupled" : "Uncoupled";
  }
});
