import { v as t, g as A } from "./styles-Dc2qaz2G.js";
import { g as j } from "./getParameters-CW47FUlS.js";
import { g as F } from "./getTables-C50jlml9.js";
import { g as Z } from "./getToolbar-bwrSjPIY.js";
import { g as H } from "./getDialog-CtFr1A6T.js";
import { g as V } from "./getReport-DnJ9dzV2.js";
import { a as _ } from "./analyze-Cqn-kN2k.js";
import { d as U, __tla as __tla_0 } from "./deformCpp-CgkBkVyO.js";
import { g as Y, a as q, d as J, b as K, c as Q, __tla as __tla_1 } from "./getSolids-DFu1cZRc.js";
import { g as W, a as $, b as tt, c as at } from "./getTemplate-CjqaHiue.js";
import "./getLocalStiffnessMatrix-CZ_j2Fhc.js";
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
  const o = 4, m = {
    stories: {
      value: t.state(3),
      min: 1,
      max: 8,
      step: 1,
      label: "stories"
    },
    meshSize: {
      value: t.state(0.5),
      min: 0.1,
      max: 2,
      step: 0.1,
      label: "mesh size (m)"
    },
    loads: {
      value: t.state(4.335),
      min: -50,
      max: 50,
      step: 0.1,
      label: "Load (kN/m\xB2)"
    }
  }, a = {
    points: t.state([]),
    stories: t.state([
      0
    ]),
    columns: t.state([]),
    slabs: t.state([]),
    columnsByStory: t.state(/* @__PURE__ */ new Map()),
    slabsByStory: t.state(/* @__PURE__ */ new Map()),
    columnData: t.state(/* @__PURE__ */ new Map()),
    slabData: t.state(/* @__PURE__ */ new Map())
  }, N = Y(), R = q(), w = t.state([
    R
  ]), st = t.state([
    N
  ]), s = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({}),
    deformOutputs: t.state({}),
    analyzeOutputs: t.state({})
  }, h = t.state(0), M = t.state(), E = [
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
  ], et = [
    [
      3,
      2,
      o
    ],
    [
      3,
      11,
      o
    ],
    [
      12,
      11,
      o
    ],
    [
      18,
      11,
      o
    ],
    [
      18,
      6,
      o
    ],
    [
      12,
      6,
      o
    ],
    [
      12,
      2,
      o
    ],
    [
      3,
      6,
      o
    ]
  ], lt = [
    [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  ], u = t.state(E), p = t.state(et), g = t.state(lt), f = t.state(E), S = t.state([]), G = t.state({
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
  }), x = t.state(""), T = t.state(void 0);
  let v = "1st-floor";
  function ot(l) {
    v = l, G.val = {
      position: v === "1st-floor" ? [
        10,
        10,
        0
      ] : [
        10,
        10,
        o
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, f.val = v === "1st-floor" ? u.val : p.val, S.val = v === "1st-floor" ? [] : g.val;
  }
  function nt() {
    v === "1st-floor" ? u.val = [] : (p.val = [], g.val = []), f.val = v === "1st-floor" ? u.val : p.val, S.val = v === "1st-floor" ? [] : g.val;
  }
  t.derive(() => {
    v === "1st-floor" ? u.val = f.val : (p.val = f.val, g.val = S.val);
  });
  t.derive(() => {
    m.stories.value.val, m.meshSize.value.val, m.loads.value.val, u.val, p.val, g.val;
    const l = [], e = [], r = [], n = [], c = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), D = g.val.filter((i) => i.length >= 3);
    if (m.stories.value.val < 1 || u.val.length === 0 || p.val.length === 0 || D.length === 0) {
      a.points.val = [], a.stories.val = [], a.columns.val = [], a.slabs.val = [], a.columnsByStory.val = /* @__PURE__ */ new Map(), a.slabsByStory.val = /* @__PURE__ */ new Map(), a.columnData.val = /* @__PURE__ */ new Map(), a.slabData.val = /* @__PURE__ */ new Map();
      return;
    }
    const k = rt();
    for (let i = 0; i < m.stories.value.val; i++) {
      const z = o * (i + 1), B = e.length;
      p.val.forEach((d) => {
        e.push([
          d[0],
          d[1],
          z
        ]);
      }), l.push(B);
      const O = [];
      D.forEach((d) => {
        const y = d.map((X) => B + X), L = n.length;
        n.push(y), O.push(L), I.set(L, {
          analysisInput: {
            meshSize: m.meshSize.value.val,
            areaLoad: -m.loads.value.val * 1e3,
            isOpening: false,
            cltLayup: k
          }
        });
      }), b.set(i, O);
      const P = [];
      u.val.forEach((d) => {
        e.push([
          d[0],
          d[1],
          z
        ]), r.push(e.length - 1);
        const y = r.length - 1;
        P.push(y), i === 0 && C.set(y, {
          analysisInput: {
            support: [
              true,
              true,
              true,
              true,
              true,
              true
            ]
          }
        });
      }), c.set(i, P);
    }
    a.points.val = e, a.stories.val = l, a.columns.val = r, a.slabs.val = n, a.columnsByStory.val = c, a.slabsByStory.val = b, a.columnData.val = C, a.slabData.val = I;
  });
  t.derive(() => {
    var _a;
    const { nodes: l, elements: e, nodeInputs: r, elementInputs: n } = J(a.points.val, a.stories.val, a.columns.val, a.slabs.val, a.columnsByStory.val, a.slabsByStory.val, a.columnData.val, a.slabData.val);
    if (R.geometry = K(a.points.val, [], a.columns.val), N.geometry = Q(a.points.val, a.slabs.val, a.columns.val), w.val = [
      ...w.rawVal
    ], !l.length || !e.length) {
      s.nodes.val = [], s.elements.val = [], s.nodeInputs.val = {}, s.elementInputs.val = {}, s.deformOutputs.val = {}, s.analyzeOutputs.val = {}, h.val = 0, M.val = void 0;
      return;
    }
    s.deformOutputs.val = U(l, e, r, n), s.analyzeOutputs.val = _(l, e, n, s.deformOutputs.val);
    const c = Array.from(((_a = s.analyzeOutputs.val.bendingXX) == null ? void 0 : _a.values()) ?? []).flat();
    h.val = c.length ? Math.max(...c) * 1e-3 : 0, M.val = W({
      f_mk: 24
    }, 55, 3, 20, h.val, 0.8), s.nodes.val = l, s.elements.val = e, s.nodeInputs.val = r, s.elementInputs.val = n;
  });
  t.derive(() => {
    x.val === "Tables" && (T.val = F({
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
            data: u
          }
        ],
        [
          "slabs",
          {
            text: "Slab boundary",
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
            data: p
          }
        ]
      ])
    })), x.val === "Report" && (T.val = V({
      template: $,
      data: {
        designMomentInput: h,
        designOutputs: M
      }
    }));
  });
  document.body.append(j(m), A({
    objects3D: w,
    solids: st,
    mesh: s,
    drawingObj: {
      points: f,
      polylines: S,
      gridTarget: G
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
      solids: false,
      shellResults: "displacementZ",
      shellResultScales: {
        displacementZ: 1e3
      },
      shellResultUnits: {
        displacementZ: "mm"
      },
      showFrameResults: false
    }
  }), tt(), at({
    onToolbarClick: ot,
    onClearPoints: nt
  }), Z({
    clickedButton: x,
    buttons: [
      "Tables",
      "Report"
    ],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-multi-story-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }), H({
    dialogBody: T
  }));
  function rt() {
    const r = [
      30,
      40,
      30,
      40,
      30,
      40,
      30
    ], n = [
      0,
      90,
      0,
      90,
      0,
      90,
      0
    ];
    return {
      layers: r.map((c, b) => ({
        thickness: c * 1e-3,
        thetaDeg: n[b],
        Ex: 11e3 * 1e6,
        Ey: 370 * 1e6,
        nuXY: 0.2,
        Gxy: 690 * 1e6,
        Gxz: 690 * 1e6,
        Gyz: 69 * 1e6
      })),
      options: {
        shearCoupling: true,
        noGlueAtNarrowSide: false,
        strictSymmetryForElement: true
      }
    };
  }
});
