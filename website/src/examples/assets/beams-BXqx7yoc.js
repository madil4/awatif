import { v as e, g as d, a as c } from "./styles-BHEEcEe8.js";
import { a as h } from "./analyze-y02jKfMs.js";
import { d as g, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
import { g as w } from "./getParameters-DUGbK7gy.js";
import "./complex-i8qiIvCl.js";
import "./pureFunctionsAny.generated-CaW_ywTZ.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const n = {
    length: {
      value: e.state(10),
      min: 1,
      max: 20
    },
    height: {
      value: e.state(10),
      min: 1,
      max: 10
    },
    xLoad: {
      value: e.state(10),
      min: 0,
      max: 10
    }
  }, l = e.state([]), t = e.state([]), m = e.state({}), o = e.state({}), r = e.state({}), i = e.state({});
  e.derive(() => {
    const p = n.length.value.val, v = n.height.value.val, u = n.xLoad.value.val;
    l.val = [
      [
        0,
        0,
        0
      ],
      [
        0,
        0,
        v
      ],
      [
        p,
        0,
        v
      ],
      [
        p,
        0,
        0
      ]
    ], t.val = [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ], m.val = {
      supports: /* @__PURE__ */ new Map([
        [
          0,
          [
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ],
        [
          3,
          [
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ]
      ]),
      loads: /* @__PURE__ */ new Map([
        [
          2,
          [
            u,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      ])
    }, o.val = {
      elasticities: new Map(t.val.map((s, a) => [
        a,
        10
      ])),
      shearModuli: new Map(t.val.map((s, a) => [
        a,
        10
      ])),
      areas: new Map(t.val.map((s, a) => [
        a,
        10
      ])),
      torsionalConstants: new Map(t.val.map((s, a) => [
        a,
        10
      ])),
      momentsOfInertiaY: new Map(t.val.map((s, a) => [
        a,
        10
      ])),
      momentsOfInertiaZ: new Map(t.val.map((s, a) => [
        a,
        10
      ]))
    }, r.val = g(l.val, t.val, m.val, o.val), i.val = h(l.val, t.val, o.val, r.val);
  });
  document.body.append(w(n), d({
    mesh: {
      nodes: l,
      elements: t,
      nodeInputs: m,
      elementInputs: o,
      deformOutputs: r,
      analyzeOutputs: i
    },
    settingsObj: {
      deformedShape: true
    }
  }), c({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/beams/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
