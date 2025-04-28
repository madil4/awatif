import { v as s, g as I, a as b } from "./styles-C277HhWC.js";
import { a as k, __tla as __tla_0 } from "./analyze-DDDIG0wq.js";
import { d as S, __tla as __tla_1 } from "./deform-C3_9Anee.js";
import { g as A } from "./getParameters-mm0cZPxW.js";
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
  }, h = s.state([]), c = s.state([]), v = s.state({}), y = s.state({}), g = s.state({}), w = s.state({});
  s.derive(() => {
    const o = [], t = [], m = p.meshDensity.value.val, r = p.height.value.val, l = p.span.value.val, f = p.load.value.val;
    o.push(...[
      ...Array(m + 1).keys()
    ].map((e) => [
      0,
      0,
      r / m * e
    ])), t.push(...[
      ...Array(m).keys()
    ].map((e) => [
      e,
      e + 1
    ]));
    let n = o.length;
    o.push(...[
      ...Array(m).keys()
    ].map((e) => [
      l / m * (e + 1),
      0,
      r
    ])), t.push(...[
      ...Array(m - 1).keys()
    ].map((e) => [
      n + e,
      n + e + 1
    ])), t.push([
      n - 1,
      n
    ]), n = o.length;
    const M = n - 1;
    o.push(...[
      ...Array(m).keys()
    ].map((e) => [
      l,
      0,
      r - r / m * (e + 1)
    ])), t.push(...[
      ...Array(m - 1).keys()
    ].map((e) => [
      n + e,
      n + e + 1
    ])), t.push([
      n - 1,
      n
    ]);
    const d = {
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
            f,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      ])
    }, u = {
      elasticities: new Map(t.map((e, a) => [
        a,
        10
      ])),
      shearModuli: new Map(t.map((e, a) => [
        a,
        10
      ])),
      areas: new Map(t.map((e, a) => [
        a,
        10
      ])),
      torsionalConstants: new Map(t.map((e, a) => [
        a,
        10
      ])),
      momentsOfInertiaY: new Map(t.map((e, a) => [
        a,
        10
      ])),
      momentsOfInertiaZ: new Map(t.map((e, a) => [
        a,
        10
      ]))
    }, i = S(o, t, d, u), O = k(o, t, u, i);
    h.val = o, c.val = t, v.val = d, y.val = u, g.val = i, w.val = O;
  });
  document.body.append(A(p), I({
    mesh: {
      nodes: h,
      elements: c,
      nodeInputs: v,
      elementInputs: y,
      deformOutputs: g,
      analyzeOutputs: w
    },
    settingsObj: {
      deformedShape: true
    }
  }), b({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/1d-mesh/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
