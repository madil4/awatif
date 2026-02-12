import { v as n, g as Y } from "./styles-Dc2qaz2G.js";
import { a as _ } from "./analyze-Cqn-kN2k.js";
import { d as C, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as F } from "./getParameters-CW47FUlS.js";
import { g as L } from "./getToolbar-bwrSjPIY.js";
import { g as j, a as P, b as V, c as R, d as X, __tla as __tla_1 } from "./getSolids-DFu1cZRc.js";
import "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
import "./complex-i8qiIvCl.js";
import "./coupling-CX7jvXLk.js";
import { __tla as __tla_2 } from "./getMesh-D74EaHsB.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./pureFunctionsAny.generated-DgiBRKJh.js";
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const A = 3.2, k = 1e3, g = [
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
  ], r = {
    stories: {
      value: n.state(12),
      min: 3,
      max: 20,
      step: 1,
      label: "stories"
    },
    grid: {
      value: n.state(2.4),
      min: 1.8,
      max: 4,
      step: 0.2,
      label: "grid (m)"
    },
    meshSize: {
      value: n.state(2),
      min: 0.6,
      max: 3.5,
      step: 0.1,
      label: "mesh size (m)"
    },
    load: {
      value: n.state(3.5),
      min: -10,
      max: 10,
      step: 0.1,
      label: "load (kN/m\xB2)"
    }
  }, l = {
    points: n.state([]),
    stories: n.state([]),
    columns: n.state([]),
    slabs: n.state([]),
    columnsByStory: n.state(/* @__PURE__ */ new Map()),
    slabsByStory: n.state(/* @__PURE__ */ new Map()),
    columnData: n.state(/* @__PURE__ */ new Map()),
    slabData: n.state(/* @__PURE__ */ new Map())
  }, E = j(), O = P(), N = n.state([
    O
  ]), Z = n.state([
    E
  ]), i = {
    nodes: n.state([]),
    elements: n.state([]),
    nodeInputs: n.state({}),
    elementInputs: n.state({}),
    deformOutputs: n.state({}),
    analyzeOutputs: n.state({})
  }, H = J();
  n.derive(() => {
    const e = B(r.stories.value.val, 3, 20), t = h(r.grid.value.val, 1.8, 4), a = h(r.meshSize.value.val, 0.6, 3.5), o = h(r.load.value.val, -10, 10);
    r.stories.value.val !== e && (r.stories.value.val = e), r.grid.value.val !== t && (r.grid.value.val = t), r.meshSize.value.val !== a && (r.meshSize.value.val = a), r.load.value.val !== o && (r.load.value.val = o), K();
  });
  n.derive(() => {
    O.geometry = V(l.points.val, l.slabs.val, l.columns.val), E.geometry = R(l.points.val, l.slabs.val, l.columns.val), N.val = [
      ...N.rawVal
    ];
    let e = [], t = [], a = {}, o = {};
    try {
      const s = X(l.points.val, l.stories.val, l.columns.val, l.slabs.val, l.columnsByStory.val, l.slabsByStory.val, l.columnData.val, l.slabData.val);
      e = s.nodes, t = s.elements, a = s.nodeInputs, o = s.elementInputs;
    } catch (s) {
      console.error("CLT tower mesh build failed", s);
    }
    if (!e.length || !t.length) {
      i.nodes.val = [], i.elements.val = [], i.nodeInputs.val = {}, i.elementInputs.val = {}, i.deformOutputs.val = {}, i.analyzeOutputs.val = {};
      return;
    }
    i.deformOutputs.val = C(e, t, a, o), i.analyzeOutputs.val = _(e, t, o, i.deformOutputs.val), i.nodes.val = e, i.elements.val = t, i.nodeInputs.val = a, i.elementInputs.val = o;
  });
  document.body.append(F(r), Y({
    objects3D: N,
    solids: Z,
    mesh: i,
    settingsObj: {
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
    }
  }), L({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower/main.ts",
    author: "https://www.linkedin.com/in/musaabmahjoub/"
  }));
  function K() {
    const e = B(r.stories.value.val, 3, 20), t = h(r.grid.value.val, 1.8, 4), a = h(r.meshSize.value.val, 0.6, 3.5), o = h(r.load.value.val, -10, 10), s = [], m = [], c = [], p = [], u = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), D = $(t);
    for (let f = 0; f < e; f++) {
      const S = A * (f + 1), M = s.length;
      g.forEach(([y, b]) => s.push([
        y,
        b,
        S
      ]));
      const G = g.map((y, b) => M + b);
      p.push(G);
      const T = p.length - 1;
      m.push(M), v.set(f, [
        T
      ]), I.set(T, {
        analysisInput: {
          meshSize: a,
          areaLoad: -o * k,
          isOpening: false,
          cltLayup: H
        }
      });
      const x = [];
      D.forEach(([y, b]) => {
        s.push([
          y,
          b,
          S
        ]), c.push(s.length - 1);
        const w = c.length - 1;
        x.push(w), f === 0 && d.set(w, {
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
      }), u.set(f, x);
    }
    l.points.val = s, l.stories.val = m, l.columns.val = c, l.slabs.val = p, l.columnsByStory.val = u, l.slabsByStory.val = v, l.columnData.val = d, l.slabData.val = I;
  }
  function $(e) {
    const [t, a, o, s] = q(g), m = [], c = 1e-6;
    for (let u = t; u <= a + c; u += e) for (let v = o; v <= s + c; v += e) {
      const d = [
        z(u),
        z(v)
      ];
      U(d, g) && m.push(d);
    }
    const p = /* @__PURE__ */ new Map();
    return m.forEach((u) => p.set(`${u[0]}_${u[1]}`, u)), Array.from(p.values());
  }
  function q(e) {
    let t = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return e.forEach(([m, c]) => {
      t = Math.min(t, m), a = Math.max(a, m), o = Math.min(o, c), s = Math.max(s, c);
    }), [
      t,
      a,
      o,
      s
    ];
  }
  function U(e, t) {
    const [a, o] = e;
    let s = false;
    for (let m = 0, c = t.length - 1; m < t.length; c = m++) {
      const [p, u] = t[m], [v, d] = t[c];
      u > o != d > o && a < (v - p) * (o - u) / (d - u) + p && (s = !s);
    }
    return s;
  }
  function z(e) {
    return Math.round(e * 1e3) / 1e3;
  }
  function h(e, t, a) {
    return Number.isFinite(e) ? Math.max(t, Math.min(a, e)) : t;
  }
  function B(e, t, a) {
    return Math.round(h(e, t, a));
  }
  function J() {
    const a = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], o = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: a.map((s, m) => ({
        thickness: s * 1e-3,
        thetaDeg: o[m],
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
  }
});
