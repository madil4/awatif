import { v as a, g as I, a as z } from "./styles-DC0SXaq4.js";
import { a as M } from "./analyze-BYwPRdme.js";
import { d as C, __tla as __tla_0 } from "./deformCpp-CS-wCYO-.js";
import { g as _ } from "./getParameters-B4liUM_S.js";
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
    span: {
      value: a.state(15),
      min: 5,
      max: 20,
      step: 1,
      label: "span (m)"
    },
    divisions: {
      value: a.state(5),
      min: 2,
      max: 5,
      step: 1
    },
    height: {
      value: a.state(2),
      min: 1,
      max: 5,
      step: 0.1,
      label: "height (m)"
    },
    elasticity: {
      value: a.state(10),
      min: 1,
      max: 250,
      step: 1,
      label: "Elasticity (gpa)"
    },
    area: {
      value: a.state(10),
      min: 1,
      max: 300,
      step: 1,
      label: "area (cm2)"
    },
    load: {
      value: a.state(250),
      min: 1,
      max: 500,
      step: 1,
      label: "load (kN)"
    }
  }, c = a.state([]), d = a.state([]), v = a.state({}), h = a.state({}), f = a.state({}), b = a.state({});
  a.derive(() => {
    const g = n.span.value.val, e = n.divisions.value.val, w = n.height.value.val, y = n.elasticity.value.val * 1e6, x = n.area.value.val * 1e-4, O = n.load.value.val, l = [], s = [], i = g / e, p = [];
    for (let t = 0; t <= e; t++) {
      const o = [
        i * t,
        0,
        0
      ];
      l.push(o), p.push(o);
    }
    for (let t = 0; t <= e; t++) l.push([
      i * t,
      0,
      w
    ]);
    for (let t = 0; t < e; t++) s.push([
      t,
      t + 1
    ]);
    for (let t = 0; t < e; t++) s.push([
      e + 1 + t,
      e + 1 + t + 1
    ]);
    for (let t = 0; t <= e; t++) s.push([
      t,
      e + 1 + t
    ]);
    for (let t = 0; t < e; t++) t < e / 2 ? s.push([
      t,
      e + 1 + t + 1
    ]) : s.push([
      e + 1 + t,
      t + 1
    ]);
    const r = {
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
          e,
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
      loads: new Map(p.map((t, o) => [
        o,
        [
          0,
          0,
          -O,
          0,
          0,
          0
        ]
      ]))
    }, u = {
      elasticities: new Map(s.map((t, o) => [
        o,
        y
      ])),
      areas: new Map(s.map((t, o) => [
        o,
        x
      ]))
    }, m = C(l, s, r, u), S = M(l, s, u, m);
    c.val = l, d.val = s, v.val = r, h.val = u, f.val = m, b.val = S;
  });
  document.body.append(_(n), I({
    mesh: {
      nodes: c,
      elements: d,
      nodeInputs: v,
      elementInputs: h,
      deformOutputs: f,
      analyzeOutputs: b
    },
    settingsObj: {
      deformedShape: true
    }
  }), z({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/truss/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
