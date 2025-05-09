import { v as a, g as M, a as O } from "./styles-BHEEcEe8.js";
import { g as D } from "./getParameters-DUGbK7gy.js";
import { g as L, a as x, b as G, c as H, d as j, __tla as __tla_0 } from "./getSolids-Dv3yUbFZ.js";
import { __tla as __tla_1 } from "./getMesh-HOyv1-MH.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
import "./pureFunctionsAny.generated-Dh3LO6N2.js";
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
  const w = {
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
    slabData: a.state(/* @__PURE__ */ new Map())
  }, m = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({})
  }, i = [
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
  ], r = [
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
  ], f = L(), B = x(), b = a.state([
    B
  ]), T = a.state([
    f
  ]);
  a.derive(() => {
    const e = [], l = [], n = [], c = [], u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
    for (let o = 0; o < w.stories.value.val; o++) {
      const p = [], g = 4 * o;
      for (let t = 0; t < i.length; t++) p.push([
        i[t][0],
        i[t][1],
        i[t][2] + g
      ]);
      const y = [];
      let h = e.length;
      for (let t = 0; t < p.length; t++) e.push(p[t]), y.push(t + h);
      n.push(y), l.push(h), d.set(o, [
        o
      ]), v.set(o, {
        analysisInput: {
          areaLoad: 1,
          isOpening: false
        }
      });
      const S = [];
      for (let t = 0; t < r.length; t++) {
        const I = e.length;
        e.push([
          r[t][0],
          r[t][1],
          r[t][2] + g
        ]), c.push(I), S.push(c.length - 1);
      }
      u.set(o, S);
    }
    s.points.val = e, s.stories.val = l, s.slabs.val = n, s.columns.val = c, s.columnsByStory.val = u, s.slabsByStory.val = d, s.slabData.val = v;
  });
  a.derive(() => {
    const { nodes: e, elements: l, nodeInputs: n } = G(s.points.val, s.stories.val, s.columns.val, s.slabs.val, s.columnsByStory.val, s.slabsByStory.val, s.slabData.val);
    m.nodes.val = e, m.elements.val = l, m.nodeInputs.val = n, B.geometry = H(s.points.val, s.slabs.val, s.columns.val), f.geometry = j(s.points.val, s.slabs.val, s.columns.val), b.val = [
      ...b.rawVal
    ];
  });
  document.body.append(D(w), M({
    objects3D: b,
    solids: T,
    mesh: m,
    settingsObj: {
      nodes: false,
      loads: false
    }
  }), O({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/building/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }));
});
