import { v as s, g as I } from "./styles-I_-DKBYJ.js";
import { a as b } from "./analyze-safkwfFW.js";
import { d as k, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as S } from "./getParameters-B55TXCbA.js";
import { g as A } from "./getToolbar-C9bIbtqJ.js";
import "./getLocalStiffnessMatrix-BSrjxkfr.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const p = {
    meshDensity: {
      value: s.state(7),
      min: 1,
      max: 7,
      step: 1,
      label: "mesh density"
    },
    span: {
      value: s.state(10),
      min: 1,
      max: 20
    },
    height: {
      value: s.state(10),
      min: 1,
      max: 10
    },
    load: {
      value: s.state(10),
      min: 0,
      max: 20
    }
  }, h = s.state([]), c = s.state([]), v = s.state({}), y = s.state({}), g = s.state({}), f = s.state({});
  s.derive(() => {
    const o = [], e = [], m = p.meshDensity.value.val, r = p.height.value.val, l = p.span.value.val, w = p.load.value.val;
    o.push(...[
      ...Array(m + 1).keys()
    ].map((t) => [
      0,
      0,
      r / m * t
    ])), e.push(...[
      ...Array(m).keys()
    ].map((t) => [
      t,
      t + 1
    ]));
    let n = o.length;
    o.push(...[
      ...Array(m).keys()
    ].map((t) => [
      l / m * (t + 1),
      0,
      r
    ])), e.push(...[
      ...Array(m - 1).keys()
    ].map((t) => [
      n + t,
      n + t + 1
    ])), e.push([
      n - 1,
      n
    ]), n = o.length;
    const M = n - 1;
    o.push(...[
      ...Array(m).keys()
    ].map((t) => [
      l,
      0,
      r - r / m * (t + 1)
    ])), e.push(...[
      ...Array(m - 1).keys()
    ].map((t) => [
      n + t,
      n + t + 1
    ])), e.push([
      n - 1,
      n
    ]);
    const i = {
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
          o.length - 1,
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
          M,
          [
            w,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      ])
    }, u = {
      elasticities: new Map(e.map((t, a) => [
        a,
        10
      ])),
      shearModuli: new Map(e.map((t, a) => [
        a,
        10
      ])),
      areas: new Map(e.map((t, a) => [
        a,
        10
      ])),
      torsionalConstants: new Map(e.map((t, a) => [
        a,
        10
      ])),
      momentsOfInertiaY: new Map(e.map((t, a) => [
        a,
        10
      ])),
      momentsOfInertiaZ: new Map(e.map((t, a) => [
        a,
        10
      ]))
    }, d = k(o, e, i, u), O = b(o, e, u, d);
    h.val = o, c.val = e, v.val = i, y.val = u, g.val = d, f.val = O;
  });
  document.body.append(S(p), I({
    mesh: {
      nodes: h,
      elements: c,
      nodeInputs: v,
      elementInputs: y,
      deformOutputs: g,
      analyzeOutputs: f
    },
    settingsObj: {
      deformedShape: true
    }
  }), A({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/1d-mesh/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
