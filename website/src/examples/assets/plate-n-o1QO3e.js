import { v as e, g as v, a as c } from "./styles-CpURnv7o.js";
import { g as h } from "./getParameters-C7XsMMMg.js";
import { d as w } from "./deform-DIFTkfEQ.js";
import { m as b, __tla as __tla_0 } from "./mesh-BjRsSqZX.js";
import "./pureFunctionsAny.generated-B4njVAtx.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const o = {
    xPosition: {
      value: e.state(15),
      min: 5,
      max: 20
    },
    load: {
      value: e.state(-50),
      min: -100,
      max: 100,
      step: 1
    }
  }, m = e.state([]), n = e.state([]), l = e.state({}), p = e.state({}), u = e.state({});
  e.derive(() => {
    const { nodes: i, elements: r, boundaryIndices: d } = b({
      points: [
        [
          0,
          0,
          0
        ],
        [
          15,
          0,
          0
        ],
        [
          o.xPosition.value.val,
          10,
          0
        ],
        [
          0,
          5,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3
      ],
      maxMeshSize: 2
    });
    m.val = i, n.val = r, l.val = {
      supports: new Map(d.map((t) => [
        t,
        [
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ])),
      loads: new Map(m.val.map((t, a) => [
        a,
        [
          0,
          0,
          o.load.value.val,
          0,
          0,
          0
        ]
      ]))
    };
    const s = n.val;
    p.val = {
      elasticities: new Map(s.map((t, a) => [
        a,
        100
      ])),
      thicknesses: new Map(s.map((t, a) => [
        a,
        1
      ])),
      poissonsRatios: new Map(s.map((t, a) => [
        a,
        0.3
      ]))
    }, u.val = w(i, r, l.val, p.val);
  });
  document.body.append(h(o), v({
    mesh: {
      nodes: m,
      elements: n,
      nodeInputs: l,
      elementInputs: p,
      deformOutputs: u
    },
    settingsObj: {
      deformedShape: true,
      loads: false
    }
  }), c({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",
    author: "https://www.linkedin.com/in/mahjoubmusaab/"
  }));
});
