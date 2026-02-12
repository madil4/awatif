import { v as s, g as A } from "./styles-Dc2qaz2G.js";
import { a as H } from "./analyze-Cqn-kN2k.js";
import { d as Z, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as K } from "./getParameters-CW47FUlS.js";
import { g as q } from "./getToolbar-bwrSjPIY.js";
import { g as U, a as W, b as J, c as Q, d as tt, __tla as __tla_1 } from "./getSolids-DFu1cZRc.js";
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
  const { div: N, h3: et, p: h } = s.tags, st = 3.2, at = 1e3, I = [
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
  ], m = {
    stories: {
      value: s.state(12),
      min: 3,
      max: 20,
      step: 1,
      label: "stories"
    },
    grid: {
      value: s.state(2.4),
      min: 1.8,
      max: 4,
      step: 0.2,
      label: "grid (m)"
    },
    meshSize: {
      value: s.state(2),
      min: 0.6,
      max: 3.5,
      step: 0.1,
      label: "mesh size (m)"
    },
    load: {
      value: s.state(3.5),
      min: -10,
      max: 10,
      step: 0.1,
      label: "load (kN/m\xB2)"
    }
  }, o = {
    points: s.state([]),
    stories: s.state([]),
    columns: s.state([]),
    slabs: s.state([]),
    columnsByStory: s.state(/* @__PURE__ */ new Map()),
    slabsByStory: s.state(/* @__PURE__ */ new Map()),
    columnData: s.state(/* @__PURE__ */ new Map()),
    slabData: s.state(/* @__PURE__ */ new Map())
  }, G = U(), Y = W(), w = s.state([
    Y
  ]), nt = s.state([
    G
  ]), v = {
    nodes: s.state([]),
    elements: s.state([]),
    nodeInputs: s.state({}),
    elementInputs: s.state({}),
    deformOutputs: s.state({}),
    analyzeOutputs: s.state({})
  }, x = s.state(0), T = s.state(0), F = s.state(0), _ = s.state(0), L = s.state(0), j = s.state(0), k = s.state(0), P = s.state(0), y = [], ot = performance.now();
  let D = false;
  const lt = pt();
  s.derive(() => {
    const e = V(m.stories.value.val, 3, 20), t = f(m.grid.value.val, 1.8, 4), a = f(m.meshSize.value.val, 0.6, 3.5), n = f(m.load.value.val, -10, 10);
    m.stories.value.val !== e && (m.stories.value.val = e), m.grid.value.val !== t && (m.grid.value.val = t), m.meshSize.value.val !== a && (m.meshSize.value.val = a), m.load.value.val !== n && (m.load.value.val = n), mt();
  });
  s.derive(() => {
    Y.geometry = J(o.points.val, o.slabs.val, o.columns.val), G.geometry = Q(o.points.val, o.slabs.val, o.columns.val), w.val = [
      ...w.rawVal
    ];
    let e = [], t = [], a = {}, n = {};
    try {
      const u = tt(o.points.val, o.stories.val, o.columns.val, o.slabs.val, o.columnsByStory.val, o.slabsByStory.val, o.columnData.val, o.slabData.val);
      e = u.nodes, t = u.elements, a = u.nodeInputs, n = u.elementInputs;
    } catch (u) {
      console.error("CLT tower benchmark mesh build failed", u);
    }
    if (!e.length || !t.length) {
      v.nodes.val = [], v.elements.val = [], v.nodeInputs.val = {}, v.elementInputs.val = {}, v.deformOutputs.val = {}, v.analyzeOutputs.val = {}, x.val = 0, T.val = 0, F.val = 0;
      return;
    }
    x.val = e.length, T.val = t.length, F.val = e.length * 6;
    const l = performance.now(), r = Z(e, t, a, n), i = performance.now() - l;
    D || (D = true, L.val = i, j.val = performance.now() - ot), y.push(i), y.length > 50 && y.shift(), P.val = y.length, _.val = i, k.val = vt(y), v.deformOutputs.val = r, v.analyzeOutputs.val = H(e, t, n, r), v.nodes.val = e, v.elements.val = t, v.nodeInputs.val = a, v.elementInputs.val = n;
  });
  function rt() {
    const e = N({
      id: "page"
    }), t = N({
      id: "stats"
    }, et("CLT Tower Benchmark"), h(() => `Nodes: ${x.val}`), h(() => `Elements: ${T.val}`), h(() => `DOF: ${F.val}`), h(() => `Fresh start wall: ${j.val.toFixed(2)} ms`), h(() => `First solve: ${L.val.toFixed(2)} ms`), h(() => `Current solve: ${_.val.toFixed(2)} ms`), h(() => `Median solve (last ${P.val}): ${k.val.toFixed(2)} ms`));
    e.append(N({
      id: "viewer-wrap"
    }, A({
      objects3D: w,
      solids: nt,
      mesh: v,
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
    })), K(m), q({
      sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower-benchmark/main.ts",
      author: "https://www.linkedin.com/in/musaabmahjoub/"
    }), t), document.body.append(e);
  }
  rt();
  function mt() {
    const e = V(m.stories.value.val, 3, 20), t = f(m.grid.value.val, 1.8, 4), a = f(m.meshSize.value.val, 0.6, 3.5), n = f(m.load.value.val, -10, 10), l = [], r = [], i = [], u = [], c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), R = it(t);
    for (let b = 0; b < e; b++) {
      const z = st * (b + 1), E = l.length;
      I.forEach(([S, g]) => l.push([
        S,
        g,
        z
      ]));
      const X = I.map((S, g) => E + g);
      u.push(X);
      const O = u.length - 1;
      r.push(E), p.set(b, [
        O
      ]), M.set(O, {
        analysisInput: {
          meshSize: a,
          areaLoad: -n * at,
          isOpening: false,
          cltLayup: lt
        }
      });
      const C = [];
      R.forEach(([S, g]) => {
        l.push([
          S,
          g,
          z
        ]), i.push(l.length - 1);
        const B = i.length - 1;
        C.push(B), b === 0 && d.set(B, {
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
      }), c.set(b, C);
    }
    o.points.val = l, o.stories.val = r, o.columns.val = i, o.slabs.val = u, o.columnsByStory.val = c, o.slabsByStory.val = p, o.columnData.val = d, o.slabData.val = M;
  }
  function it(e) {
    const [t, a, n, l] = ut(I), r = [], i = 1e-6;
    for (let c = t; c <= a + i; c += e) for (let p = n; p <= l + i; p += e) {
      const d = [
        $(c),
        $(p)
      ];
      ct(d, I) && r.push(d);
    }
    const u = /* @__PURE__ */ new Map();
    return r.forEach((c) => u.set(`${c[0]}_${c[1]}`, c)), Array.from(u.values());
  }
  function ut(e) {
    let t = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY;
    return e.forEach(([r, i]) => {
      t = Math.min(t, r), a = Math.max(a, r), n = Math.min(n, i), l = Math.max(l, i);
    }), [
      t,
      a,
      n,
      l
    ];
  }
  function ct(e, t) {
    const [a, n] = e;
    let l = false;
    for (let r = 0, i = t.length - 1; r < t.length; i = r++) {
      const [u, c] = t[r], [p, d] = t[i];
      c > n != d > n && a < (p - u) * (n - c) / (d - c) + u && (l = !l);
    }
    return l;
  }
  function vt(e) {
    if (!e.length) return 0;
    const t = [
      ...e
    ].sort((n, l) => n - l), a = Math.floor(t.length / 2);
    return t.length % 2 === 0 ? 0.5 * (t[a - 1] + t[a]) : t[a];
  }
  function $(e) {
    return Math.round(e * 1e3) / 1e3;
  }
  function f(e, t, a) {
    return Number.isFinite(e) ? Math.max(t, Math.min(a, e)) : t;
  }
  function V(e, t, a) {
    return Math.round(f(e, t, a));
  }
  function pt() {
    const a = [
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
      layers: a.map((l, r) => ({
        thickness: l * 1e-3,
        thetaDeg: n[r],
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
