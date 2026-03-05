import { v as a, g as k } from "./styles-I_-DKBYJ.js";
import { g as T } from "./getParameters-B55TXCbA.js";
import { g as R } from "./getTables-A2OxLVg7.js";
import { g as V } from "./getToolbar-C9bIbtqJ.js";
import { g as A } from "./getDialog-CsS9Zuv3.js";
import { g as j } from "./getReport-DdGkb799.js";
import { a as G } from "./analyze-safkwfFW.js";
import { d as L, __tla as __tla_0 } from "./deformCpp-CV9xCN_b.js";
import { g as _, a as E, d as H, b as D, c as I, __tla as __tla_1 } from "./getMesh-Dh3-ZoOn.js";
import { g as X, a as F, b as N, c as Z } from "./getTemplate-Cgz5PXwr.js";
import "./getLocalStiffnessMatrix-BSrjxkfr.js";
import "./complex-i8qiIvCl.js";
import "./coupling-CX7jvXLk.js";
import { __tla as __tla_2 } from "./getMesh-D74EaHsB.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./pureFunctionsAny.generated-DgiBRKJh.js";
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const v = {
    meshSize: {
      value: a.state(0.5),
      min: 0.5,
      max: 2,
      step: 0.1,
      label: "mesh size (m)"
    },
    loads: {
      value: a.state(30),
      min: 0,
      max: 100,
      label: "Load (kN/m\xB2)"
    },
    elasticity: {
      value: a.state(1e3),
      min: 100,
      max: 5e4,
      step: 100,
      label: "elasticity (mpa)"
    },
    poisson: {
      value: a.state(0.3),
      min: 0.1,
      max: 0.5,
      step: 0.05,
      label: "poisson's ratio"
    },
    thickness: {
      value: a.state(0.2),
      min: 0.1,
      max: 0.5,
      step: 0.05,
      label: "thickness (m)"
    }
  }, t = {
    points: a.state([]),
    stories: a.state([
      0
    ]),
    columns: a.state([]),
    slabs: a.state([]),
    columnsByStory: a.state(/* @__PURE__ */ new Map()),
    slabsByStory: a.state(/* @__PURE__ */ new Map()),
    columnData: a.state(/* @__PURE__ */ new Map()),
    slabData: a.state(/* @__PURE__ */ new Map())
  }, M = _(), C = E(), u = a.state([
    C
  ]), q = a.state([
    M
  ]), e = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({}),
    analyzeOutputs: a.state({})
  }, w = a.state(10), P = a.state(), J = [
    [
      3,
      2,
      0
    ],
    [
      3,
      11,
      0
    ],
    [
      12,
      11,
      0
    ],
    [
      18,
      11,
      0
    ],
    [
      18,
      6,
      0
    ],
    [
      12,
      6,
      0
    ],
    [
      12,
      2,
      0
    ],
    [
      3,
      6,
      0
    ]
  ], K = [
    [
      3,
      2,
      4
    ],
    [
      3,
      11,
      4
    ],
    [
      12,
      11,
      4
    ],
    [
      18,
      11,
      4
    ],
    [
      18,
      6,
      4
    ],
    [
      12,
      6,
      4
    ],
    [
      12,
      2,
      4
    ],
    [
      3,
      6,
      4
    ]
  ], Q = [
    [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    []
  ], r = a.state([]), o = a.state(K), p = a.state(Q), d = a.state(J), f = a.state([]), O = a.state({
    position: [
      10,
      10,
      0
    ],
    rotation: [
      Math.PI / 2,
      0,
      0
    ]
  }), S = a.state(""), x = a.state(void 0), g = 4;
  let b = "1st-floor";
  function U(l) {
    b = l, O.val = {
      position: [
        10,
        10,
        l == "1st-floor" ? 0 : g
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, d.val = l === "1st-floor" ? r.val : o.val, f.val = l === "1st-floor" ? [] : p.val;
  }
  function W() {
    b === "1st-floor" ? r.val = [] : (o.val = [], p.val = []), d.val = [], f.val = [], t.points.val = [], t.columns.val = [], t.slabs.val = [], t.columnsByStory.val = /* @__PURE__ */ new Map(), t.slabsByStory.val = /* @__PURE__ */ new Map(), t.columnData.val = /* @__PURE__ */ new Map(), t.slabData.val = /* @__PURE__ */ new Map(), e.nodes.val = [], e.elements.val = [], e.nodeInputs.val = {}, C.geometry = D(t.points.val, t.slabs.val, t.columns.val), M.geometry = I(t.points.val, t.slabs.val, t.columns.val), u.val = [
      ...u.rawVal
    ];
  }
  a.derive(() => {
    b == "1st-floor" && (r.val = d.val), b == "2nd-floor" && (o.val = d.val, p.val = f.val);
  });
  a.derive(() => {
    const l = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), n = [], y = [], z = [], h = [];
    if (o.val.length > 0) for (let s = 0; s < o.val.length; s++) z.push([
      o.val[s][0],
      o.val[s][1],
      g
    ]), n.push([
      o.val[s][0],
      o.val[s][1],
      g
    ]);
    m.set(0, Array.from(p.rawVal.keys())), p.rawVal.forEach((s, i) => {
      c.set(i, {
        analysisInput: {
          meshSize: v.meshSize.value.val,
          areaLoad: -v.loads.value.val * 1e3,
          isOpening: false,
          thickness: v.thickness.value.val,
          material: {
            elasticity: v.elasticity.value.val * 1e6,
            poissonsRatio: v.poisson.value.val
          }
        }
      });
    });
    const B = [];
    if (r.val.length > 0) {
      for (let s = 0; s < r.val.length; s++) {
        const i = r.val[s];
        h.push([
          [
            i[0],
            i[1],
            i[2] + g
          ]
        ]);
      }
      for (let s = 0; s < h.length; s++) {
        const i = n.length;
        n.push(...h[s]), y.push(i), B.push(y.length - 1);
      }
    }
    l.set(0, B), t.points.val = n, t.columns.val = y, t.slabs.val = p.val, t.columnsByStory.val = l, t.slabsByStory.val = m, t.slabData.val = c;
  });
  a.derive(() => {
    const { nodes: l, elements: m, nodeInputs: c, elementInputs: n } = H(t.points.val, t.stories.val, t.columns.val, t.slabs.val, t.columnsByStory.val, t.slabsByStory.val, t.columnData.val, t.slabData.val);
    C.geometry = D(t.points.val, [], t.columns.val), M.geometry = I(t.points.val, t.slabs.val, t.columns.val), u.val = [
      ...u.rawVal
    ], e.deformOutputs.val = L(l, m, c, n), e.analyzeOutputs.val = G(l, m, n, e.deformOutputs.val), w.val = Math.max(...Array.from(e.analyzeOutputs.val.bendingXX.values()).flat()) * 1e-3, P.val = X({
      f_mk: 24
    }, 55, 3, 20, w.val, 0.8), e.nodes.val = l, e.elements.val = m, e.nodeInputs.val = c, e.elementInputs.val = n;
  });
  a.derive(() => {
    S.val === "Tables" && (x.val = R({
      tables: /* @__PURE__ */ new Map([
        [
          "columns",
          {
            text: "Columns",
            fields: [
              {
                field: "A",
                text: "x-Coordinate"
              },
              {
                field: "B",
                text: "y-Coordinate"
              },
              {
                field: "C",
                text: "z-Coordinate"
              }
            ],
            data: r
          }
        ],
        [
          "slabs",
          {
            text: "Slabs",
            fields: [
              {
                field: "A",
                text: "x-Coordinate"
              },
              {
                field: "B",
                text: "y-Coordinate"
              },
              {
                field: "C",
                text: "z-Coordinate"
              }
            ],
            data: o
          }
        ]
      ])
    })), S.val === "Report" && (x.val = j({
      template: F,
      data: {
        designMomentInput: w,
        designOutputs: P
      }
    }));
  });
  document.body.append(T(v), k({
    objects3D: u,
    solids: q,
    mesh: e,
    drawingObj: {
      points: d,
      polylines: f,
      gridTarget: O
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
      solids: false,
      shellResults: "displacementZ"
    }
  }), N(), Z({
    onToolbarClick: U,
    onClearPoints: W
  }), V({
    clickedButton: S,
    buttons: [
      "Tables",
      "Report"
    ],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }), A({
    dialogBody: x
  }));
});
