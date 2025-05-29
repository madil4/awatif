import { v as e, g as n } from "./styles-Cdc-plZG.js";
import { g as r } from "./getParameters-B2ePh5MK.js";
import { g as i } from "./getToolbar-Cw4M9lWb.js";
import { g as l, __tla as __tla_0 } from "./getMesh-BFRjMVyf.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const t = {
    boundary: {
      value: e.state(5),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Boundary point"
    }
  }, o = e.state([]), a = e.state([]);
  e.derive(() => {
    const { nodes: s, elements: m } = l({
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
          t.boundary.value.val,
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
    o.val = s, a.val = m;
  });
  document.body.append(r(t), n({
    mesh: {
      nodes: o,
      elements: a
    }
  }), i({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/2d-mesh/main.ts",
    author: "https://www.linkedin.com/in/madil4/"
  }));
});
