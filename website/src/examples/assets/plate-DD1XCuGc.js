import { v as e, g as v, a as c } from "./styles-BHEEcEe8.js";
import { g as h } from "./getParameters-DUGbK7gy.js";
import { d as g, __tla as __tla_0 } from "./deformCpp-wF9UoRJI.js";
import { g as w, __tla as __tla_1 } from "./getMesh-BFRjMVyf.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
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
  }, m = e.state([]), n = e.state([]), p = e.state({}), l = e.state({}), u = e.state({});
  e.derive(() => {
    const { nodes: i, elements: r, boundaryIndices: d } = w({
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
      maxMeshSize: 0.5
    });
    m.val = i, n.val = r, p.val = {
      supports: new Map(d.map((a) => [
        a,
        [
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ])),
      loads: new Map(m.val.map((a, t) => [
        t,
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
    l.val = {
      elasticities: new Map(s.map((a, t) => [
        t,
        100
      ])),
      thicknesses: new Map(s.map((a, t) => [
        t,
        1
      ])),
      poissonsRatios: new Map(s.map((a, t) => [
        t,
        0.3
      ]))
    }, u.val = g(i, r, p.val, l.val);
  });
  document.body.append(h(o), v({
    mesh: {
      nodes: m,
      elements: n,
      nodeInputs: p,
      elementInputs: l,
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
