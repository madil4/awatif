import { v as e, m as l, g as c, n as p, a as d } from "./styles-CHgmIz-C.js";
import { g as u } from "./getParameters-CL7Q-jKZ.js";
import { g, __tla as __tla_0 } from "./getMesh-DmUdekin.js";
import { n as b, s as v } from "./pureFunctionsAny.generated-Dh3LO6N2.js";
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
  const i = {
    boundary: {
      value: e.state(10),
      min: 1,
      max: 10,
      step: 0.1,
      label: "Boundary point"
    }
  }, a = e.state([]), m = e.state([]), r = e.state([]), n = e.state([
    l(a, m, r)
  ]);
  e.derive(() => {
    const t = [
      i.boundary.value.val,
      0,
      3
    ], { nodes: s, elements: o } = g({
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
        t,
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
      ],
      maxMeshSize: 1
    });
    a.val = s, m.val = o, r.val = h(t, a.val), n.val = [
      ...n.rawVal
    ];
  });
  document.body.append(u(i), c({
    mesh: {
      nodes: a,
      elements: m
    },
    objects3D: n
  }), p(r), d({
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/color-map/main.ts",
    author: "https://www.linkedin.com/in/siu-kai-cheung/"
  }));
  function h(t, s) {
    return s.map((o) => b(v(o, t)));
  }
});
