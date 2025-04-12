import { v as e, g as n, a as r } from "./styles-aHt-Mdxa.js";
import { g as i } from "./getParameters-DjGKBsKO.js";
import { m as l, __tla as __tla_0 } from "./mesh-7kUITnI2.js";
import "./complex-ViNjxWW9.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const a = {
    boundary: {
      value: e.state(5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Boundary point"
    }
  }, t = e.state([]), s = e.state([]);
  e.derive(() => {
    const { nodes: o, elements: m } = l({
      points: [
        [
          0,
          0,
          0
        ],
        [
          5,
          0,
          0
        ],
        [
          a.boundary.value.val,
          0,
          3
        ],
        [
          8,
          0,
          7
        ],
        [
          15,
          0,
          5
        ],
        [
          15,
          0,
          0
        ],
        [
          20,
          0,
          0
        ],
        [
          20,
          0,
          10
        ],
        [
          0,
          0,
          10
        ],
        [
          0,
          0,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ]
    });
    t.val = o, s.val = m;
  });
  document.body.append(i(a), n({
    mesh: {
      nodes: t,
      elements: s
    }
  }), r({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/2d-mesh/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
