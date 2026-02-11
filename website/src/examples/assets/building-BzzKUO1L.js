import { v as a, g as D } from "./styles-Dc2qaz2G.js";
import { g as O } from "./getParameters-DCHP2-il.js";
import { g as L } from "./getToolbar-bwrSjPIY.js";
import { g as x, a as G, b as H, c as j, d as C, __tla as __tla_0 } from "./getMesh-Dk2BzuA0.js";
import "./coupling-CX7jvXLk.js";
import { __tla as __tla_1 } from "./deformCpp-CgkBkVyO.js";
import { __tla as __tla_2 } from "./getMesh-D74EaHsB.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
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
  const S = {
    stories: {
      value: a.state(2),
      min: 1,
      max: 5,
      step: 1
    }
  }, s = {
    points: a.state([]),
    stories: a.state([]),
    columns: a.state([]),
    slabs: a.state([]),
    columnsByStory: a.state(/* @__PURE__ */ new Map()),
    slabsByStory: a.state(/* @__PURE__ */ new Map()),
    columnData: a.state(/* @__PURE__ */ new Map()),
    slabData: a.state(/* @__PURE__ */ new Map())
  }, i = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({})
  }, c = [
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
  ], l = [
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
  ], B = x(), M = G(), v = a.state([
    M
  ]), T = a.state([
    B
  ]);
  a.derive(() => {
    const o = [], m = [], p = [], n = [], b = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    for (let e = 0; e < S.stories.value.val; e++) {
      const u = [], y = 4 * e;
      for (let t = 0; t < c.length; t++) u.push([
        c[t][0],
        c[t][1],
        c[t][2] + y
      ]);
      const w = [];
      let f = o.length;
      for (let t = 0; t < u.length; t++) o.push(u[t]), w.push(t + f);
      p.push(w), m.push(f), d.set(e, [
        e
      ]), h.set(e, {
        analysisInput: {
          areaLoad: 1,
          isOpening: false
        }
      });
      const I = [];
      for (let t = 0; t < l.length; t++) {
        const r = o.length;
        o.push([
          l[t][0],
          l[t][1],
          l[t][2] + y
        ]), n.push(r), I.push(n.length - 1);
      }
      if (e === 0) {
        const t = n.length - l.length;
        for (let r = 0; r < l.length; r++) g.set(t + r, {
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
      }
      b.set(e, I);
    }
    s.points.val = o, s.stories.val = m, s.slabs.val = p, s.columns.val = n, s.columnsByStory.val = b, s.slabsByStory.val = d, s.columnData.val = g, s.slabData.val = h;
  });
  a.derive(() => {
    const { nodes: o, elements: m, nodeInputs: p, elementInputs: n } = H(s.points.val, s.stories.val, s.columns.val, s.slabs.val, s.columnsByStory.val, s.slabsByStory.val, s.columnData.val, s.slabData.val);
    i.nodes.val = o, i.elements.val = m, i.nodeInputs.val = p, i.elementInputs.val = n, M.geometry = j(s.points.val, s.slabs.val, s.columns.val), B.geometry = C(s.points.val, s.slabs.val, s.columns.val), v.val = [
      ...v.rawVal
    ];
  });
  document.body.append(O(S), D({
    objects3D: v,
    solids: T,
    mesh: i,
    settingsObj: {
      nodes: false,
      loads: false
    }
  }), L({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/building/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
