import { w as T, v as a, g as k, a as O } from "./styles-BpMgv57_.js";
import { g as L } from "./getTables-D0BrkIf5.js";
import { g as z } from "./getDialog-DnXaRX0f.js";
import { d as E, a as R, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as V, a as A, b as H, c as M, d as x, __tla as __tla_1 } from "./getSolids-B77Y4eVD.js";
import "./complex-i8qiIvCl.js";
import { __tla as __tla_2 } from "./getMesh-DmUdekin.js";
import "./__vite-browser-external-D7Ct-6yo.js";
import "./pureFunctionsAny.generated-Dh3LO6N2.js";
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
  function j({ onToolbarClick: s, onClearPoints: i }) {
    const o = document.createElement("div");
    return o.id = "drawing-toolbar", new T({
      name: "toolbar",
      box: o,
      items: [
        {
          type: "radio",
          id: "1st-floor",
          text: "Columns",
          checked: true,
          tooltip: "Create Columns"
        },
        {
          type: "radio",
          id: "2nd-floor",
          text: "Slab",
          tooltip: "Create Slab"
        },
        {
          type: "break"
        },
        {
          type: "button",
          id: "clear-points",
          text: "Clear Points",
          tooltip: "Remove all points of selected level",
          icon: "w2ui-icon-cross"
        }
      ],
      onClick(l) {
        l.target === "clear-points" ? i() : s(l.target);
      }
    }), o;
  }
  function G() {
    const s = document.createElement("div"), i = navigator.userAgent.includes("Macintosh");
    return s.className = "snap-tip", s.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${i ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `, s.classList.add("show"), document.addEventListener("keydown", (o) => {
      (o.ctrlKey || o.metaKey) && s.classList.remove("show");
    }), s;
  }
  const t = {
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
  }, w = V(), h = A(), m = a.state([
    h
  ]), K = a.state([
    w
  ]), n = {
    nodes: a.state([]),
    elements: a.state([]),
    nodeInputs: a.state({}),
    elementInputs: a.state({}),
    deformOutputs: a.state({}),
    analyzeOutputs: a.state({})
  }, _ = [
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
  ], F = [
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
  ], N = [
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
  ], p = a.state([]), r = a.state(F), d = a.state(N), v = a.state(_), y = a.state([]), B = a.state({
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
  }), I = a.state(""), P = a.state(void 0), u = 4;
  let b = "1st-floor";
  function Z(s) {
    b = s, B.val = {
      position: [
        10,
        10,
        s == "1st-floor" ? 0 : u
      ],
      rotation: [
        Math.PI / 2,
        0,
        0
      ]
    }, v.val = s === "1st-floor" ? p.val : r.val, y.val = s === "1st-floor" ? [] : d.val;
  }
  function $() {
    b === "1st-floor" ? p.val = [] : (r.val = [], d.val = []), v.val = [], y.val = [], t.points.val = [], t.columns.val = [], t.slabs.val = [], t.columnsByStory.val = /* @__PURE__ */ new Map(), t.slabsByStory.val = /* @__PURE__ */ new Map(), t.columnData.val = /* @__PURE__ */ new Map(), t.slabData.val = /* @__PURE__ */ new Map(), n.nodes.val = [], n.elements.val = [], n.nodeInputs.val = {}, h.geometry = M(t.points.val, t.slabs.val, t.columns.val), w.geometry = x(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ];
  }
  a.derive(() => {
    b == "1st-floor" && (p.val = v.val), b == "2nd-floor" && (r.val = v.val, d.val = y.val);
  });
  a.derive(() => {
    const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = [], g = [], D = [], f = [];
    if (l.length, r.val.length > 0) for (let e = 0; e < r.val.length; e++) D.push([
      r.val[e][0],
      r.val[e][1],
      u
    ]), l.push([
      r.val[e][0],
      r.val[e][1],
      u
    ]);
    i.set(0, Array.from(d.rawVal.keys()));
    const C = -1;
    o.set(0, {
      analysisInput: {
        areaLoad: C,
        isOpening: false,
        thickness: 1,
        material: {
          elasticity: 300,
          poissonsRatio: 0.3
        }
      }
    }), d.rawVal.forEach((e, c) => {
      o.set(c, {
        analysisInput: {
          areaLoad: C,
          isOpening: false,
          thickness: 1,
          material: {
            elasticity: 300,
            poissonsRatio: 0.3
          }
        }
      });
    });
    const S = [];
    if (p.val.length > 0) {
      for (let e = 0; e < p.val.length; e++) {
        const c = p.val[e];
        f.push([
          [
            c[0],
            c[1],
            c[2] + u
          ]
        ]);
      }
      for (let e = 0; e < f.length; e++) {
        const c = l.length;
        l.push(...f[e]), g.push(c), S.push(g.length - 1);
      }
    }
    s.set(0, S), t.points.val = l, t.columns.val = g, t.slabs.val = d.val, t.columnsByStory.val = s, t.slabsByStory.val = i, t.slabData.val = o;
  });
  a.derive(() => {
    const { nodes: s, elements: i, nodeInputs: o, elementInputs: l } = H(t.points.val, t.stories.val, t.columns.val, t.slabs.val, t.columnsByStory.val, t.slabsByStory.val, t.columnData.val, t.slabData.val);
    n.deformOutputs.val = E(s, i, o, l), n.analyzeOutputs.val = R(s, i, l, n.deformOutputs.val), h.geometry = M(t.points.val, [], t.columns.val), w.geometry = x(t.points.val, t.slabs.val, t.columns.val), m.val = [
      ...m.rawVal
    ], n.nodes.val = s, n.elements.val = i, n.nodeInputs.val = o, n.elementInputs.val = l;
  });
  a.derive(() => {
    I.val === "Tables" && (P.val = L({
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
            data: p
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
            data: r
          }
        ]
      ])
    }));
  });
  document.body.append(k({
    objects3D: m,
    solids: K,
    mesh: n,
    drawingObj: {
      points: v,
      polylines: y,
      gridTarget: B
    },
    settingsObj: {
      nodes: false,
      loads: false,
      deformedShape: true,
      solids: false,
      shellResults: "displacementZ"
    }
  }), G(), j({
    onToolbarClick: Z,
    onClearPoints: $
  }), O({
    clickedButton: I,
    buttons: [
      "Tables"
    ],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/slab-designer/main.ts",
    author: "https://www.linkedin.com/in/abderrahmane-mazri-4638a81b8/"
  }), z({
    dialogBody: P
  }));
});
