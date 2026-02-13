import { v as h } from "./styles-I_-DKBYJ.js";
import { a as b } from "./analyze-Dwq0MGTd.js";
import { c as C, __tla as __tla_0 } from "./deformCached-BS-uK4aA.js";
import { d as _, __tla as __tla_1 } from "./deformCpp-77svjSoa.js";
import { d as D, __tla as __tla_2 } from "./getMesh-Bg5rMFTq.js";
let H, ne, j, W, Q, R, Z, ee, J, te, U, K, q;
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const F = 3.2, Y = 1e3, y = [
    [
      0,
      0
    ],
    [
      24,
      0
    ],
    [
      24,
      10
    ],
    [
      14,
      10
    ],
    [
      14,
      18
    ],
    [
      0,
      18
    ]
  ];
  let f = null, x = false;
  function T() {
    var _a, _b;
    (_b = f == null ? void 0 : (_a = f.solver).dispose) == null ? void 0 : _b.call(_a), f = null;
  }
  j = function() {
    return {
      stories: {
        value: h.state(6),
        min: 3,
        max: 20,
        step: 1,
        label: "stories"
      },
      grid: {
        value: h.state(2.4),
        min: 1.8,
        max: 4,
        step: 0.2,
        label: "grid (m)"
      },
      meshSize: {
        value: h.state(2),
        min: 0.6,
        max: 3.5,
        step: 0.1,
        label: "mesh size (m)"
      },
      load: {
        value: h.state(3.5),
        min: -10,
        max: 10,
        step: 0.1,
        label: "load (kN/m\xB2)"
      }
    };
  };
  U = function(e) {
    return {
      stories: P(e.stories, 3, 20),
      grid: I(e.grid, 1.8, 4),
      meshSize: I(e.meshSize, 0.6, 3.5),
      load: I(e.load, -10, 10)
    };
  };
  Z = function(e) {
    return {
      stories: e.stories.value.val,
      grid: e.grid.value.val,
      meshSize: e.meshSize.value.val,
      load: e.load.value.val
    };
  };
  H = function(e, n) {
    e.stories.value.val !== n.stories && (e.stories.value.val = n.stories), e.grid.value.val !== n.grid && (e.grid.value.val = n.grid), e.meshSize.value.val !== n.meshSize && (e.meshSize.value.val = n.meshSize), e.load.value.val !== n.load && (e.load.value.val = n.load);
  };
  J = function() {
    const t = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], s = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: t.map((a, l) => ({
        thickness: a * 1e-3,
        thetaDeg: s[l],
        Ex: 11e3 * 1e6,
        Ey: 370 * 1e6,
        nuXY: 0.2,
        Gxy: 690 * 1e6,
        Gxz: 690 * 1e6,
        Gyz: 69 * 1e6
      })),
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: true
      }
    };
  };
  K = function(e, n, t) {
    const s = [], a = [], l = [], c = [], i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), d = A(n.grid);
    for (let m = 0; m < n.stories; m++) {
      const S = F * (m + 1), w = s.length;
      y.forEach(([v, p]) => s.push([
        v,
        p,
        S
      ]));
      const E = y.map((v, p) => w + p);
      c.push(E);
      const N = c.length - 1;
      a.push(w), o.set(m, [
        N
      ]), r.set(N, {
        analysisInput: {
          meshSize: n.meshSize,
          areaLoad: -n.load * Y,
          isOpening: false,
          cltLayup: t
        }
      });
      const z = [];
      d.forEach(([v, p]) => {
        s.push([
          v,
          p,
          S
        ]), l.push(s.length - 1);
        const M = l.length - 1;
        z.push(M), m === 0 && u.set(M, {
          analysisInput: {
            support: [
              true,
              true,
              true,
              true,
              true,
              true
            ]
          }
        });
      }), i.set(m, z);
    }
    e.points.val = s, e.stories.val = a, e.columns.val = l, e.slabs.val = c, e.columnsByStory.val = i, e.slabsByStory.val = o, e.columnData.val = u, e.slabData.val = r;
  };
  W = function(e, n) {
    try {
      const t = D(e.points.val, e.stories.val, e.columns.val, e.slabs.val, e.columnsByStory.val, e.slabsByStory.val, e.columnData.val, e.slabData.val);
      return !t.nodes.length || !t.elements.length ? null : {
        nodes: t.nodes,
        elements: t.elements,
        nodeInputs: t.nodeInputs,
        elementInputs: t.elementInputs
      };
    } catch (t) {
      return console.error(n, t), null;
    }
  };
  q = function(e, n) {
    const t = (n == null ? void 0 : n.includeAnalyze) ?? false, s = (n == null ? void 0 : n.includeReactions) ?? false, a = (n == null ? void 0 : n.useCached) ?? false, l = (n == null ? void 0 : n.cacheKey) ?? `n:${e.nodes.length}|e:${e.elements.length}`, c = (o) => t ? b(e.nodes, e.elements, e.elementInputs, o) : {}, i = (o) => !(o == null ? void 0 : o.deformations) || o.deformations.size === 0;
    try {
      const o = performance.now(), r = a || x ? O(e, s, l) : _(e.nodes, e.elements, e.nodeInputs, e.elementInputs, {
        includeReactions: s
      });
      if (i(r)) throw new Error("deform produced empty deformation map");
      const d = performance.now() - o, m = c(r);
      return {
        deformOutputs: r,
        analyzeOutputs: m,
        solveMs: d
      };
    } catch (o) {
      if (!a) {
        x = true, T(), console.warn("Tower one-shot solve failed, switching to cached JS solver", o);
        try {
          const u = performance.now(), r = O(e, s, l);
          if (i(r)) throw new Error("cached solver produced empty deformation map");
          const d = performance.now() - u, m = c(r);
          return {
            deformOutputs: r,
            analyzeOutputs: m,
            solveMs: d
          };
        } catch (u) {
          return console.error("Tower solve failed after JS fallback", u), null;
        }
      }
      return T(), console.error("Tower cached solve failed", o), null;
    }
  };
  function O(e, n, t) {
    return (!f || f.key !== t) && (T(), f = {
      key: t,
      solver: C(e.nodes, e.elements, e.nodeInputs.supports, e.elementInputs)
    }), f.solver.solve(e.nodeInputs.loads, {
      includeReactions: n
    });
  }
  Q = function(e) {
    T(), e.nodes.val = [], e.elements.val = [], e.nodeInputs.val = {}, e.elementInputs.val = {}, e.deformOutputs.val = {}, e.analyzeOutputs.val = {};
  };
  R = function(e, n) {
    e.nodes.val = n.nodes, e.elements.val = n.elements, e.nodeInputs.val = n.nodeInputs, e.elementInputs.val = n.elementInputs;
  };
  ee = function(e, n) {
    e.deformOutputs.val = n.deformOutputs, e.analyzeOutputs.val = n.analyzeOutputs;
  };
  ne = function() {
    return {
      solids: true,
      elements: true,
      nodes: false,
      loads: false,
      deformedShape: true,
      shellResults: "displacementZ",
      shellResultScales: {
        displacementZ: 1e3
      },
      shellResultUnits: {
        displacementZ: "mm"
      },
      showFrameResults: false
    };
  };
  te = function(e) {
    if (!e.length) return 0;
    const n = [
      ...e
    ].sort((s, a) => s - a), t = Math.floor(n.length / 2);
    return n.length % 2 === 0 ? 0.5 * (n[t - 1] + n[t]) : n[t];
  };
  function A(e) {
    const [n, t, s, a] = B(y), l = [], c = 1e-6;
    for (let o = n; o <= t + c; o += e) for (let u = s; u <= a + c; u += e) {
      const r = [
        g(o),
        g(u)
      ];
      G(r, y) && l.push(r);
    }
    const i = /* @__PURE__ */ new Map();
    return l.forEach((o) => i.set(`${o[0]}_${o[1]}`, o)), Array.from(i.values());
  }
  function B(e) {
    let n = Number.POSITIVE_INFINITY, t = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return e.forEach(([l, c]) => {
      n = Math.min(n, l), t = Math.max(t, l), s = Math.min(s, c), a = Math.max(a, c);
    }), [
      n,
      t,
      s,
      a
    ];
  }
  function G(e, n) {
    const [t, s] = e;
    let a = false;
    for (let l = 0, c = n.length - 1; l < n.length; c = l++) {
      const [i, o] = n[l], [u, r] = n[c];
      o > s != r > s && t < (u - i) * (s - o) / (r - o) + i && (a = !a);
    }
    return a;
  }
  function g(e) {
    return Math.round(e * 1e3) / 1e3;
  }
  function I(e, n, t) {
    return Number.isFinite(e) ? Math.max(n, Math.min(t, e)) : n;
  }
  function P(e, n, t) {
    return Math.round(I(e, n, t));
  }
});
export {
  __tla,
  H as a,
  ne as b,
  j as c,
  W as d,
  Q as e,
  R as f,
  Z as g,
  ee as h,
  J as i,
  te as m,
  U as n,
  K as r,
  q as s
};
