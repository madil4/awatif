import { v as e, g as v, a as c } from "./styles-C277HhWC.js";
import { g as h } from "./getParameters-mm0cZPxW.js";
import { d as g, __tla as __tla_0 } from "./deform-C3_9Anee.js";
import { g as w, __tla as __tla_1 } from "./getMesh-Bm83U438.js";
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
  }, n = e.state([]), m = e.state([]), l = e.state({}), p = e.state({}), u = e.state({});
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
      maxMeshSize: 2
    });
    n.val = i, m.val = r, l.val = {
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
      loads: new Map(n.val.map((t, a) => [
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
    const s = m.val;
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
    }, u.val = g(i, r, l.val, p.val);
  });
  document.body.append(h(o), v({
    mesh: {
      nodes: n,
      elements: m,
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
