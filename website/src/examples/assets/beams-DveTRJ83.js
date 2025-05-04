import { v as t, g as d, a as c } from "./styles-C_4VGeCN.js";
import { a as h, __tla as __tla_0 } from "./analyze-DDDIG0wq.js";
import { d as g, __tla as __tla_1 } from "./deform-C3_9Anee.js";
import { g as w } from "./getParameters-DLMS8EAe.js";
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
  const n = {
    length: {
      value: t.state(10),
      min: 1,
      max: 20
    },
    height: {
      value: t.state(10),
      min: 1,
      max: 10
    },
    xLoad: {
      value: t.state(10),
      min: 0,
      max: 10
    }
  }, l = t.state([]), e = t.state([]), m = t.state({}), o = t.state({}), r = t.state({}), u = t.state({});
  t.derive(() => {
    const v = n.length.value.val, p = n.height.value.val, i = n.xLoad.value.val;
    l.val = [
      [
        0,
        0,
        0
      ],
      [
        0,
        0,
        p
      ],
      [
        v,
        0,
        p
      ],
      [
        v,
        0,
        0
      ]
    ], e.val = [
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
            i,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      ])
    }, o.val = {
      elasticities: new Map(e.val.map((s, a) => [
        a,
        10
      ])),
      shearModuli: new Map(e.val.map((s, a) => [
        a,
        10
      ])),
      areas: new Map(e.val.map((s, a) => [
        a,
        10
      ])),
      torsionalConstants: new Map(e.val.map((s, a) => [
        a,
        10
      ])),
      momentsOfInertiaY: new Map(e.val.map((s, a) => [
        a,
        10
      ])),
      momentsOfInertiaZ: new Map(e.val.map((s, a) => [
        a,
        10
      ]))
    }, r.val = g(l.val, e.val, m.val, o.val), u.val = h(l.val, e.val, o.val, r.val);
  });
  document.body.append(w(n), d({
    mesh: {
      nodes: l,
      elements: e,
      nodeInputs: m,
      elementInputs: o,
      deformOutputs: r,
      analyzeOutputs: u
    },
    settingsObj: {
      deformedShape: true
    }
  }), c({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/beams/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
