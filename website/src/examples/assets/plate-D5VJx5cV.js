import { v as t, g as p } from "./styles-Dc2qaz2G.js";
import { a as i } from "./analyze-Cqn-kN2k.js";
import { d as u, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as r } from "./getParameters-DCHP2-il.js";
import { g as d } from "./getToolbar-bwrSjPIY.js";
import { g as v, __tla as __tla_1 } from "./getMesh-D74EaHsB.js";
import "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
import "./complex-i8qiIvCl.js";
import "./__vite-browser-external-D7Ct-6yo.js";
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
    xPosition: {
      value: t.state(15),
      min: 5,
      max: 20
    },
    Ex: {
      value: t.state(100),
      min: 50,
      max: 500
    },
    Ey: {
      value: t.state(100),
      min: 50,
      max: 500
    },
    load: {
      value: t.state(-3),
      min: -10,
      max: 10,
      step: 1
    }
  }, a = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({}),
    deformOutputs: t.state({}),
    analyzeOutputs: t.state({})
  };
  t.derive(() => {
    const { nodes: m, elements: s, boundaryIndices: l } = v({
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
          n.xPosition.value.val,
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
    a.nodeInputs.val = {
      supports: new Map(l.map((o) => [
        o,
        [
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ])),
      loads: new Map(m.map((o, e) => [
        e,
        [
          0,
          0,
          n.load.value.val,
          0,
          0,
          0
        ]
      ]))
    }, a.nodes.val = m, a.elements.val = s, a.elementInputs.val = {
      elasticities: new Map(s.map((o, e) => [
        e,
        n.Ex.value.val
      ])),
      elasticitiesOrthogonal: new Map(s.map((o, e) => [
        e,
        n.Ey.value.val
      ])),
      thicknesses: new Map(s.map((o, e) => [
        e,
        1
      ])),
      poissonsRatios: new Map(s.map((o, e) => [
        e,
        0.3
      ])),
      shearModuli: new Map(s.map((o, e) => [
        e,
        100
      ]))
    }, a.deformOutputs.val = u(m, s, a.nodeInputs.val, a.elementInputs.val), a.analyzeOutputs.val = i(m, s, a.elementInputs.val, a.deformOutputs.val);
  });
  document.body.append(r(n), p({
    mesh: a,
    settingsObj: {
      nodes: false,
      deformedShape: true,
      loads: false,
      shellResults: "displacementZ"
    }
  }), d({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",
    author: "https://www.linkedin.com/in/mahjoubmusaab/"
  }));
});
