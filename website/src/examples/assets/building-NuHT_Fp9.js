import { v as m, g as V, a as C } from "./styles-BHEEcEe8.js";
import { g as R } from "./getParameters-DUGbK7gy.js";
import { g as k, __tla as __tla_0 } from "./getMesh-CMeRczJW.js";
import { b as G, s as P, n as $, c as q, d as J, a as K } from "./pureFunctionsAny.generated-CaW_ywTZ.js";
import { g as Q, a as U, b as W, c as X } from "./getSolids-7PBVWHgp.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function Y(t, c, a, d, u, p, r) {
    let s = [], e = [];
    const g = {
      supports: /* @__PURE__ */ new Map(),
      loads: /* @__PURE__ */ new Map()
    };
    for (let l in c) {
      const h = c[l], i = t[h][2];
      p.get(Number(l)).forEach((v) => {
        var _a;
        const b = d[v].map((f) => t[f]), B = b.map((f, y) => y), _ = u.get(Number(l)).map((f) => t[a[f]]), S = [
          ...b,
          ..._
        ], { nodes: E, elements: O } = k({
          points: S,
          polygon: B,
          maxMeshSize: 1
        }), M = s.length, T = e.length, I = O.map((f) => f.map((y) => y + M)), A = E.map((f, y) => y + M);
        e.map((f, y) => y + T), s = [
          ...s,
          ...Z(E, i)
        ], e = [
          ...e,
          ...I
        ];
        const F = ((_a = r.get(v).analysisInput) == null ? void 0 : _a.areaLoad) ?? 0;
        g.loads = ts(s, I, g.loads, F, A);
      });
    }
    for (let l = 0; l < c.length; l++) {
      const h = c[l], i = t[h][2], w = l > 0 ? t[c[l - 1]][2] : 0;
      u.get(l).forEach((o) => {
        const b = t[a[o]], B = [
          b[0],
          b[1],
          i
        ], _ = [
          b[0],
          b[1],
          w
        ], { nodes: S, elements: E } = ss(B, _, s.length);
        s = [
          ...s,
          ...S
        ], e = [
          ...e,
          ...E
        ];
        const O = s.length, M = e.length;
        S.map((T, I) => I + O), E.map((T, I) => I + M);
      });
    }
    return {
      nodes: s,
      elements: e,
      nodeInputs: g
    };
  }
  function Z(t, c) {
    return t.map((a) => [
      a[0],
      a[1],
      c
    ]);
  }
  function ss(t, c, a, d = 3) {
    let u = [
      [
        ...t
      ]
    ], p = [];
    const r = P(c, t), s = J(r, d);
    for (let e = 0; e < d; e++) u.push(G(t, K(s, e + 1))), p.push([
      a + e,
      a + e + 1
    ]);
    return {
      nodes: u,
      elements: p
    };
  }
  function ts(t, c, a, d, u) {
    return c.forEach((r) => {
      const [s, e, g] = r.map((i) => t[i]), l = p(s, e, g), h = d * l / 3;
      r.forEach((i) => {
        if (u.includes(i)) {
          const w = [
            0,
            0,
            -h,
            0,
            0,
            0
          ], v = a.get(i) ?? [
            0,
            0,
            0,
            0,
            0,
            0
          ];
          a.set(i, G(v, w));
        }
      });
    }), a;
    function p(r, s, e) {
      const g = P(s, r), l = P(e, r);
      return $(q(g, l)) / 2;
    }
  }
  const H = {
    stories: {
      value: m.state(2),
      min: 1,
      max: 5,
      step: 1
    }
  }, n = {
    points: m.state([]),
    stories: m.state([]),
    columns: m.state([]),
    slabs: m.state([]),
    columnsByStory: m.state(/* @__PURE__ */ new Map()),
    slabsByStory: m.state(/* @__PURE__ */ new Map()),
    slabData: m.state(/* @__PURE__ */ new Map())
  }, x = {
    nodes: m.state([]),
    elements: m.state([]),
    nodeInputs: m.state({})
  }, N = [
    [
      0,
      0,
      4
    ],
    [
      0,
      10,
      4
    ],
    [
      18,
      10,
      4
    ],
    [
      18,
      0,
      4
    ],
    [
      0,
      0,
      4
    ]
  ], L = [
    [
      0,
      0,
      4
    ],
    [
      0,
      10,
      4
    ],
    [
      18,
      10,
      4
    ],
    [
      18,
      0,
      4
    ],
    [
      6,
      0,
      4
    ],
    [
      6,
      10,
      4
    ]
  ], j = Q(), z = U(), D = m.state([
    z
  ]), es = m.state([
    j
  ]);
  m.derive(() => {
    const t = [], c = [], a = [], d = [], u = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (let s = 0; s < H.stories.value.val; s++) {
      const e = [], l = 4 * s;
      for (let o = 0; o < N.length; o++) e.push([
        N[o][0],
        N[o][1],
        N[o][2] + l
      ]);
      const h = [];
      let i = t.length;
      for (let o = 0; o < e.length; o++) t.push(e[o]), h.push(o + i);
      a.push(h), c.push(i), p.set(s, [
        s
      ]), r.set(s, {
        analysisInput: {
          areaLoad: 1,
          isOpening: false
        }
      });
      const v = [];
      for (let o = 0; o < L.length; o++) {
        const b = t.length;
        t.push([
          L[o][0],
          L[o][1],
          L[o][2] + l
        ]), d.push(b), v.push(d.length - 1);
      }
      u.set(s, v);
    }
    n.points.val = t, n.stories.val = c, n.slabs.val = a, n.columns.val = d, n.columnsByStory.val = u, n.slabsByStory.val = p, n.slabData.val = r;
  });
  m.derive(() => {
    const { nodes: t, elements: c, nodeInputs: a } = Y(n.points.val, n.stories.val, n.columns.val, n.slabs.val, n.columnsByStory.val, n.slabsByStory.val, n.slabData.val);
    x.nodes.val = t, x.elements.val = c, x.nodeInputs.val = a, z.geometry = W(n.points.val, n.slabs.val, n.columns.val), j.geometry = X(n.points.val, n.slabs.val, n.columns.val), D.val = [
      ...D.rawVal
    ];
  });
  document.body.append(R(H), V({
    objects3D: D,
    solids: es,
    mesh: x,
    settingsObj: {
      nodes: false,
      loads: false
    }
  }), C({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/building/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
