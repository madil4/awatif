import { v as e, g as d } from "./styles-Cdc-plZG.js";
import { a as c } from "./analyze-0pMPybQW.js";
import { d as h, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
import { g } from "./getParameters-B2ePh5MK.js";
import { g as w } from "./getToolbar-Cw4M9lWb.js";
import "./complex-i8qiIvCl.js";
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
  }, o = e.state([]), t = e.state([]), m = e.state({}), l = e.state({}), r = e.state({}), i = e.state({});
  e.derive(() => {
    const p = n.length.value.val, v = n.height.value.val, u = n.xLoad.value.val;
    o.val = [
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
    }, l.val = {
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
    }, r.val = h(o.val, t.val, m.val, l.val), i.val = c(o.val, t.val, l.val, r.val);
  });
  document.body.append(g(n), d({
    mesh: {
      nodes: o,
      elements: t,
      nodeInputs: m,
      elementInputs: l,
      deformOutputs: r,
      analyzeOutputs: i
    },
    settingsObj: {
      deformedShape: true
    }
  }), w({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/beams/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
